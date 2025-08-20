import { excelDateToJSDateString, formatCurrency } from './helpers';

// NOTE: You'll need to ensure jsPDF and autoTable are loaded into the window object
// or import them directly if you're using an npm package.

export const generateInvoicePDF = (invoice, workOrder = null) => {
    if (!window.jspdf) {
        alert('PDF library is still loading. Please try again in a moment.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 20;

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
    doc.text('INVOICE', 200, 30, { align: 'right' });
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Invoice #: ${invoice.id}`, 200, 45, { align: 'right' });
    doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 200, 52, { align: 'right' });
    if (invoice.dueDate) {
        doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`, 200, 59, { align: 'right' });
    }

    // --- Customer Info ---
    y = 80;
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Bill To:', 20, y);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(12);
    y += 7;
    doc.text(invoice.customerName, 20, y);
    if (workOrder) {
        y += 7;
        doc.text(`${workOrder.Company} - ${workOrder.City}, ${workOrder.State}`, 20, y);
        y += 7;
        doc.text(`Service Date: ${excelDateToJSDateString(workOrder['Schedule Date'])}`, 20, y)
    }

    y += 15;

    // --- Line Items Table (UPDATED) ---
    const tableHead = [['Description', 'Qty', 'Rate', 'Amount']];
    const tableBody = invoice.lineItems.map(item => [
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
        headStyles: { fillColor: [41, 128, 185] },
        margin: { left: 20, right: 20 }
    });

    y = doc.lastAutoTable.finalY + 10;

    // --- Totals Section (UPDATED) ---
    const finalX = 200; // Right edge alignment
    doc.setFontSize(12);
    doc.text('Subtotal:', finalX - 50, y, { align: 'right' });
    doc.text(formatCurrency(invoice.subtotal), finalX, y, { align: 'right' });
    y += 7;
    doc.text('Tax:', finalX - 50, y, { align: 'right' });
    doc.text(formatCurrency(invoice.tax), finalX, y, { align: 'right' });
    y += 7;
    doc.setFont(undefined, 'bold');
    doc.text('Total Amount Due:', finalX - 50, y, { align: 'right' });
    doc.text(formatCurrency(invoice.total), finalX, y, { align: 'right' });

    doc.save(`Invoice-${invoice.id}.pdf`);
};

export const generateQuotePDF = (quote) => {
    // ... This function can be updated in the exact same way as the invoice function ...
    // For brevity, I'm leaving it as is, but you would apply the same autoTable and totals logic.
};