import { formatCurrency, excelDateToJSDateString } from './helpers';

// Utility function to safely format dates
const formatDate = (dateString) => {
    try {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid Date';
        return date.toLocaleDateString();
    } catch (error) {
        console.warn('Date formatting error:', error);
        return 'Invalid Date';
    }
};

// Validate document data before generation
const validateDocData = (docData) => {
    const { type, data } = docData;
    
    if (!type || !data) {
        throw new Error('Missing document type or data');
    }
    
    if (!data.id || !data.customerName) {
        throw new Error('Missing required fields: id or customerName');
    }
    
    if (!data.lineItems || !Array.isArray(data.lineItems)) {
        throw new Error('Line items are required and must be an array');
    }
    
    if (data.lineItems.length === 0) {
        throw new Error('At least one line item is required');
    }
    
    return true;
};

// Check if PDF libraries are properly loaded
const checkPdfLibraries = () => {
    if (!window.jspdf || !window.jspdf.jsPDF) {
        throw new Error('jsPDF library is not loaded. Please refresh the page and try again.');
    }
    
    const { jsPDF } = window.jspdf;
    const testDoc = new jsPDF();
    
    if (typeof testDoc.autoTable !== 'function') {
        throw new Error('autoTable plugin is not available. Please ensure jspdf-autotable is loaded.');
    }
    
    return { jsPDF };
};

const generatePdf = (docData) => {
    try {
        // Validate libraries and data
        const { jsPDF } = checkPdfLibraries();
        validateDocData(docData);
        
        const doc = new jsPDF();
        const { type, data, workOrder, customer } = docData;

        // --- Header ---
        doc.setFontSize(24);
        doc.setFont(undefined, 'bold');
        doc.text('MECHANICAL TEMP', 20, 30);
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text('23093 Telegraph Rd', 20, 40);
        doc.text('Southfield, MI 48033', 20, 47);
        doc.text('Phone: (313) 282-4758', 20, 54);
        doc.text('Email: office@mechanicaltemp.com', 20, 61);

        doc.setFontSize(20);
        doc.setFont(undefined, 'bold');
        doc.text(type.toUpperCase(), 200, 30, { align: 'right' });
        
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text(`${type} #: ${data.id}`, 200, 45, { align: 'right' });
        doc.text(`Date: ${formatDate(data.date)}`, 200, 52, { align: 'right' });
        
        if (data.dueDate) {
            doc.text(`Due Date: ${formatDate(data.dueDate)}`, 200, 59, { align: 'right' });
        }

        // --- Customer Info ---
        let y = 80;
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Bill To:', 20, y);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(12);
        y += 7;
        doc.text(data.customerName || 'Unknown Customer', 20, y);
        
        if (customer?.billingAddress) {
            y += 7;
            doc.text(customer.billingAddress.street || '', 20, y);
            y += 7;
            const city = customer.billingAddress.city || '';
            const state = customer.billingAddress.state || '';
            const zip = customer.billingAddress.zip || '';
            doc.text(`${city}, ${state} ${zip}`.trim(), 20, y);
        }
        
        if (workOrder) {
            y += 10;
            doc.setFont(undefined, 'bold');
            doc.text('Service Location:', 20, y);
            doc.setFont(undefined, 'normal');
            y += 7;
            const company = workOrder.Company || 'N/A';
            const city = workOrder.City || '';
            const state = workOrder.State || '';
            doc.text(`${company} - ${city}, ${state}`, 20, y);
        }

        y += 15;

        // --- Line Items Table ---
        const tableHead = [['Description', 'Qty', 'Rate', 'Amount']];
        const tableBody = data.lineItems.map(item => [
            item.description || 'No description',
            item.quantity || 0,
            formatCurrency(item.rate || 0),
            formatCurrency(item.amount || 0)
        ]);

        doc.autoTable({
            startY: y,
            head: tableHead,
            body: tableBody,
            theme: 'striped',
            headStyles: { fillColor: [22, 163, 74] },
            margin: { left: 20, right: 20 }
        });

        y = doc.lastAutoTable.finalY + 10;

        // --- Totals Section ---
        const finalX = 200;
        doc.setFontSize(12);
        doc.text('Subtotal:', finalX - 50, y, { align: 'right' });
        doc.text(formatCurrency(data.subtotal || 0), finalX, y, { align: 'right' });
        
        if (data.discount && data.discount > 0) {
            y += 7;
            doc.text('Discount:', finalX - 50, y, { align: 'right' });
            doc.text(`-${formatCurrency(data.discount)}`, finalX, y, { align: 'right' });
        }
        
        if (data.lateFee && data.lateFee > 0) {
            y += 7;
            doc.text('Late Fee:', finalX - 50, y, { align: 'right' });
            doc.text(formatCurrency(data.lateFee), finalX, y, { align: 'right' });
        }
        
        y += 7;
        doc.setFont(undefined, 'bold');
        doc.text('Total:', finalX - 50, y, { align: 'right' });
        doc.text(formatCurrency(data.total || 0), finalX, y, { align: 'right' });

        // --- Serviced Assets Section ---
        if (workOrder && customer) {
            const locations = customer.locations || [];
            const location = locations.find(l => 
                l.name === workOrder.Company && l.locNum === workOrder['Loc #']
            );
            
            if (location?.assets && location.assets.length > 0) {
                const assetsToDisplay = workOrder.servicedAssets 
                    ? location.assets.filter(asset => workOrder.servicedAssets.includes(asset.name))
                    : location.assets;

                if (assetsToDisplay.length > 0) {
                    y = Math.max(doc.lastAutoTable.finalY, y) + 15;
                    doc.setFontSize(14);
                    doc.setFont(undefined, 'bold');
                    doc.text('Serviced Assets:', 20, y);
                    y += 7;
                    
                    const assetBody = assetsToDisplay.map(asset => [
                        asset.name || 'N/A',
                        asset.brand || 'N/A',
                        asset.model || 'N/A',
                        asset.serialNumber || 'N/A'
                    ]);
                    
                    doc.autoTable({
                        startY: y,
                        head: [['Name', 'Brand', 'Model', 'Serial #']],
                        body: assetBody,
                        theme: 'grid',
                        headStyles: { fillColor: [100, 116, 139] },
                        margin: { left: 20, right: 20 }
                    });
                }
            }
        }

        // Save the PDF
        const filename = `${type}-${data.id}.pdf`;
        doc.save(filename);
        
        console.log(`PDF generated successfully: ${filename}`);
        
    } catch (error) {
        console.error('PDF Generation Error:', error);
        
        // User-friendly error messages
        let userMessage = 'Failed to generate PDF. ';
        if (error.message.includes('library')) {
            userMessage += 'Please refresh the page and try again.';
        } else if (error.message.includes('required')) {
            userMessage += 'Missing required information.';
        } else {
            userMessage += 'Please try again or contact support.';
        }
        
        alert(userMessage);
        return false; // Return false to indicate failure
    }
};

export const generateInvoicePdf = (invoice, workOrders, customers) => {
    try {
        // Validate input parameters
        if (!invoice) {
            throw new Error('Invoice data is required');
        }
        if (!invoice.id) {
            throw new Error('Invoice ID is required');
        }

        const workOrder = (workOrders || []).find(wo => wo.id === invoice.workOrderId);
        const customer = (customers || []).find(c => c.id === invoice.customerId);
        
        const result = generatePdf({ type: 'Invoice', data: invoice, workOrder, customer });
        return result !== false; // Return true if successful
    } catch (error) {
        console.error('Invoice PDF generation failed:', error);
        alert('Failed to generate invoice PDF: ' + error.message);
        return false;
    }
};

export const generateQuotePdf = (quote, customers) => {
    try {
        // Validate input parameters  
        if (!quote) {
            throw new Error('Quote data is required');
        }
        if (!quote.id) {
            throw new Error('Quote ID is required');
        }

        const customer = (customers || []).find(c => c.id === quote.customerId);
        
        const result = generatePdf({ type: 'Quote', data: quote, customer });
        return result !== false; // Return true if successful
    } catch (error) {
        console.error('Quote PDF generation failed:', error);
        alert('Failed to generate quote PDF: ' + error.message);
        return false;
    }
};