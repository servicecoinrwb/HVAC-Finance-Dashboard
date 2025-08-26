import React, { useMemo, createContext, useContext, useState, useEffect } from 'react';
import { Award, Trophy } from 'lucide-react';

// --- CONTEXT AND HELPERS ---
// In your actual application, these would be in separate files (e.g., context/WorkOrderContext.js, utils/helpers.js)
// They are kept here so the component remains runnable.

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

// The context is created here. Your app will provide the value for this context.
const WorkOrderContext = createContext({
    workOrders: [],
    technicians: []
});

// The hook used by the component to access the data.
const useWorkOrderContext = () => {
    return useContext(WorkOrderContext);
};
// --- END OF CONTEXT AND HELPERS ---


const ReportingView = () => {
    // The component now fully relies on the context for its data.
    // It will be empty until your app provides real data through the WorkOrderContext.Provider.
    const { workOrders, technicians } = useWorkOrderContext();
    const [isPrinting, setIsPrinting] = useState(false);


    // A guard clause to handle the initial loading state before data is available.
    if (!workOrders || !technicians) {
        return <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading leaderboard data...</div>;
    }

    const completedOrders = workOrders.filter(wo => wo['Order Status'] === 'Completed');
    
    const totalRevenue = completedOrders.reduce((sum, wo) => sum + (wo.NTE || 0), 0);
    
    const jobsByTech = useMemo(() => {
        if (!technicians || !completedOrders) return [];
        const techCounts = technicians
            .filter(t => t.name !== 'Unassigned')
            .map(tech => {
                const count = completedOrders.filter(wo => wo.technicianId === tech.id).length;
                return { name: tech.name, count, id: tech.id };
            });
        return techCounts.sort((a, b) => b.count - a.count);
    }, [completedOrders, technicians]);

    const maxJobs = Math.max(...jobsByTech.map(t => t.count), 0);
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    const medalColor = (index) => {
        if (index === 0) return 'text-yellow-500';
        if (index === 1) return 'text-gray-400 dark:text-gray-500';
        if (index === 2) return 'text-yellow-600';
        return 'text-gray-500';
    };

    const handlePrintCertificate = () => {
        // Check if the PDF generation libraries have been loaded onto the window object.
        if (typeof window.jspdf === 'undefined' || typeof window.html2canvas === 'undefined') {
            console.error("PDF generation libraries are not loaded yet.");
            alert("PDF generation script is still loading. Please try again in a moment.");
            return;
        }

        setIsPrinting(true);
        const input = document.getElementById('leaderboard-view');
        const { jsPDF } = window.jspdf; // Destructure from the window object.

        window.html2canvas(input, { 
            scale: 2, // Improve resolution
            useCORS: true 
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            // A4 page size: 210mm wide, 297mm tall.
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasWidth / canvasHeight;
            const width = pdfWidth;
            const height = width / ratio;

            // If the content is taller than the page, it will be scaled down.
            // This simple implementation fits the whole component on one page.
            pdf.addImage(imgData, 'PNG', 0, 0, width, height > pdfHeight ? pdfHeight : height);
            pdf.save("technician-leaderboard.pdf");
            setIsPrinting(false);
        }).catch(err => {
            console.error("Failed to generate PDF", err);
            setIsPrinting(false);
        });
    };

    return (
        <div id="leaderboard-view" className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-gray-200 dark:border-slate-600">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Technician Leaderboard</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">{currentMonth} Standings</p>
                </div>
                <button 
                    onClick={handlePrintCertificate} 
                    disabled={isPrinting}
                    className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-4 sm:mt-0 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                    <Trophy size={20} /> 
                    {isPrinting ? 'Generating PDF...' : "Print Winner's Certificate"}
                </button>
            </div>
            
            <div className="space-y-3 my-6">
                {jobsByTech.length > 0 && jobsByTech.some(t => t.count > 0) ? (
                    jobsByTech.map((tech, index) => (
                        <div 
                            key={tech.id} 
                            className={`p-3 rounded-lg flex items-center gap-4 transition-all ${index === 0 ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-500/30' : 'bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600'}`}
                        >
                            <div className="w-10 text-center font-bold text-lg">
                                {index < 3 ? <Award size={28} className={medalColor(index)} /> : <span className="text-gray-500 dark:text-gray-400">{index + 1}</span>}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <p className="font-bold text-md text-gray-700 dark:text-gray-200">{tech.name}</p>
                                    {index === 0 && (
                                        <span className="bg-yellow-200 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">Top Performer</span>
                                    )}
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-4 mt-1">
                                    <div 
                                        className="bg-blue-500 h-4 rounded-full flex items-center justify-end pr-2 text-white text-xs font-bold" 
                                        style={{ width: `${maxJobs > 0 ? (tech.count / maxJobs) * 100 : 0}%` }}
                                    >
                                        {tech.count > 0 && tech.count}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                        No completed jobs to rank yet for this month.
                    </p>
                )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-600">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 rounded-lg text-center">
                        <h4 className="text-md font-semibold text-gray-600 dark:text-gray-400">Completed Jobs</h4>
                        <p className="text-3xl font-bold text-green-600">{completedOrders.length}</p>
                    </div>
                     <div className="p-4 bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 rounded-lg text-center">
                        <h4 className="text-md font-semibold text-gray-600 dark:text-gray-400">Total Revenue</h4>
                        <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalRevenue)}</p>
                    </div>
                 </div>
            </div>
        </div>
    );
};

// The main App component now demonstrates how to integrate ReportingView.
// Your main application will control the theme and provide the data.
export default function App() {
    // In your real app, you would fetch data from your backend/Firestore
    // and manage your theme state here or in a higher-level component.
    const [appData] = useState({
        workOrders: [], // This would be populated with your actual data
        technicians: [] // This would be populated with your actual data
    });

    // --- FIX: Load external libraries from a CDN ---
    // This effect runs once when the App component mounts. It dynamically creates
    // script tags for jspdf and html2canvas and adds them to the document.
    useEffect(() => {
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve();
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
                document.body.appendChild(script);
            });
        };

        Promise.all([
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'),
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js')
        ]).then(() => {
            console.log('PDF generation libraries loaded successfully.');
        }).catch(error => {
            console.error(error);
        });

    }, []);


    return (
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen p-4">
            <div className="flex items-center justify-center">
                <div className="w-full">
                    <WorkOrderContext.Provider value={appData}>
                        <ReportingView />
                    </WorkOrderContext.Provider>
                </div>
            </div>
        </div>
    );
}
