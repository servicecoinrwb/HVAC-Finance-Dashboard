import { formatCurrency, excelDateToJSDateString } from './helpers';

// NOTE: This file assumes jsPDF and its autoTable plugin are loaded globally
// via <script> tags in your main index.html file.

const generatePdf = (docData) => {
    // More robust check for both the main library and the autoTable plugin
    if (!window.jspdf || !window.jspdf.jsPDF || !window.jspdf.jsPDF.autoTable) {
        alert('The PDF generation library is still loading. Please wait a moment and try again.');
        return;
    }

    const { jsPDF } = window.jspdf;
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
    doc.text(`Date: ${new Date(data.date).toLocaleDateString()}`, 200, 52, { align: 'right' });
    if (data.dueDate) {
        doc.text(`Due Date: ${new Date(data.dueDate).toLocaleDateString()}`, 200, 59, { align: 'right' });
    }

    // --- Customer Info ---
    let y = 80;
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Bill To:', 20, y);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(12);
    y += 7;
    doc.text(data.customerName, 20, y);
    if (customer?.billingAddress) {
        y += 7;
        doc.text(customer.billingAddress.street, 20, y);
        y += 7;
        doc.text(`${customer.billingAddress.city}, ${customer.billingAddress.state} ${customer.billingAddress.zip}`, 20, y);
    }
    if (workOrder) {
        y += 10;
        doc.setFont(undefined, 'bold');
        doc.text('Service Location:', 20, y);
        doc.setFont(undefined, 'normal');
        y += 7;
        doc.text(`${workOrder.Company} - ${workOrder.City}, ${workOrder.State}`, 20, y);
    }

    y += 15;

    // --- Line Items Table ---
    const tableHead = [['Description', 'Qty', 'Rate', 'Amount']];
    const tableBody = data.lineItems.map(item => [
        item.description,
        item.quantity,
        formatCurrency(item.rate),
        formatCurrency(item.amount)
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
    const finalX = 200; // Right edge alignment
    doc.setFontSize(12);
    doc.text('Subtotal:', finalX - 50, y, { align: 'right' });
    doc.text(formatCurrency(data.subtotal), finalX, y, { align: 'right' });
    if (data.discount > 0) {
        y += 7;
        doc.text('Discount:', finalX - 50, y, { align: 'right' });
        doc.text(`-${formatCurrency(data.discount)}`, finalX, y, { align: 'right' });
    }
    if (data.lateFee > 0) {
        y += 7;
        doc.text('Late Fee:', finalX - 50, y, { align: 'right' });
        doc.text(formatCurrency(data.lateFee), finalX, y, { align: 'right' });
    }
    y += 7;
    doc.setFont(undefined, 'bold');
    doc.text('Total:', finalX - 50, y, { align: 'right' });
    doc.text(formatCurrency(data.total), finalX, y, { align: 'right' });

    // --- Serviced Assets Section ---
    if (workOrder && customer) {
        const location = (customer.locations || []).find(l => l.name === workOrder.Company && l.locNum === workOrder['Loc #']);
        const assetsToDisplay = workOrder.servicedAssets 
            ? (location?.assets || []).filter(asset => workOrder.servicedAssets.includes(asset.name))
            : (location?.assets || []);

        if (assetsToDisplay.length > 0) {
            y = doc.lastAutoTable.finalY > y ? doc.lastAutoTable.finalY : y;
            y += 15;
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text('Serviced Assets:', 20, y);
            y += 7;
            const assetBody = assetsToDisplay.map(asset => [
                asset.name,
                asset.brand,
                asset.model,
                asset.serialNumber
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

    doc.save(`${type}-${data.id}.pdf`);
};

export const generateInvoicePdf = (invoice, workOrders, customers) => {
    const workOrder = (workOrders || []).find(wo => wo.id === invoice.workOrderId);
    const customer = (customers || []).find(c => c.id === invoice.customerId);
    generatePdf({ type: 'Invoice', data: invoice, workOrder, customer });
};

export const generateQuotePdf = (quote, customers) => {
    const customer = (customers || []).find(c => c.id === quote.customerId);
    generatePdf({ type: 'Quote', data: quote, customer });
};
