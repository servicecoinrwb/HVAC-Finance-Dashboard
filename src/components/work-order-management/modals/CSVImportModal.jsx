import React, { useState } from 'react';
import { X } from 'lucide-react';

// Note: You might need to install papaparse: npm install papaparse
// and import it: import Papa from 'papaparse';
// Or ensure it's loaded globally via a <script> tag in your index.html.

const CSVImportModal = ({ type, onClose, onImport }) => {
    const [csvData, setCsvData] = useState('');
    const [parsedData, setParsedData] = useState([]);
    const [errors, setErrors] = useState([]);
    const [showPreview, setShowPreview] = useState(false);

    const sampleData = {
        invoices: 'Invoice #,Work Order,Customer,Date,Amount,Status,Description,Due Date\nINV-005,6748425-01,Synergy Management,1/15/2025,1500.00,Draft,HVAC Installation,2/15/2025',
        quotes: 'Quote #,Customer,Description,Date,Amount,Status,Valid Until,Notes\nQT-005,ABC Company,Air conditioning repair,1/15/2025,850.00,Draft,2/15/2025,Emergency repair needed',
        customers: 'Name,Type,Contact Name,Contact Email,Contact Phone,Street,City,State,Zip\nNew Company,Commercial,John Doe,john@company.com,555-1234,123 Main St,Southfield,MI,48075'
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'text/csv') {
            const reader = new FileReader();
            reader.onload = (event) => {
                setCsvData(event.target.result);
            };
            reader.readAsText(file);
        }
    };

    const parseCSV = () => {
        if (!csvData.trim()) {
            setErrors(['Please upload a CSV file or paste CSV data']);
            return;
        }

        const simpleParse = (csvText) => {
            const lines = csvText.trim().split('\n');
            const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
            const data = lines.slice(1).map(line => {
                const values = line.split(',').map(v => v.replace(/"/g, '').trim());
                return headers.reduce((obj, header, index) => {
                    obj[header] = values[index] || '';
                    return obj;
                }, {});
            });
            return { data, errors: [] };
        };

        let result;
        if (window.Papa) {
            result = window.Papa.parse(csvData, { header: true, skipEmptyLines: true, dynamicTyping: false });
        } else {
            result = simpleParse(csvData);
        }

        if (result.errors.length > 0) {
            setErrors(result.errors.map(e => typeof e === 'string' ? e : e.message));
            return;
        }

        setErrors([]);
        setParsedData(result.data);
        setShowPreview(true);
    };

    const handleImport = () => {
        if (parsedData.length === 0) return;
        onImport(parsedData);
        alert(`Successfully imported ${parsedData.length} ${type}!`);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Import {type.charAt(0).toUpperCase() + type.slice(1)} from CSV</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={28} />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto flex-1">
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">Upload CSV File</label>
                            <input 
                                type="file" 
                                accept=".csv" 
                                onChange={handleFileUpload}
                                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        <div className="text-center text-gray-500 dark:text-gray-400">OR</div>

                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">Paste CSV Data</label>
                            <textarea
                                value={csvData}
                                onChange={(e) => setCsvData(e.target.value)}
                                placeholder={`Paste your CSV data here...\n\nExpected format:\n${sampleData[type]}`}
                                rows="8"
                                className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white font-mono text-sm"
                            />
                        </div>

                        {errors.length > 0 && (
                            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Validation Errors:</h4>
                                <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                                    {errors.map((error, index) => (
                                        <li key={index}>• {error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {showPreview && parsedData.length > 0 && (
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Preview ({parsedData.length} records ready):</h4>
                                {/* A more detailed preview table could be rendered here */}
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 flex justify-between gap-4">
                    <button 
                        onClick={parseCSV}
                        disabled={!csvData.trim()}
                        className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        Parse & Validate
                    </button>
                    <div className="flex gap-4">
                        <button onClick={onClose} className="text-gray-700 dark:text-gray-300 font-bold py-2 px-4">Cancel</button>
                        <button onClick={handleImport} disabled={parsedData.length === 0} className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 disabled:bg-gray-400">
                            Import {parsedData.length > 0 ? parsedData.length : ''} Records
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CSVImportModal;