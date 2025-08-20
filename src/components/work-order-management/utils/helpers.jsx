// --- Date & Time Conversion ---

/**
 * Converts an Excel serial date number to a JS Date object.
 * @param {number} d - The Excel serial date number.
 * The number 25569 is the offset in days between the UNIX epoch (1970-01-01) and Excel's epoch, accounting for Excel's 1900 leap year bug.
 */
export const excelToJSDate = (d) => d && typeof d === 'number' ? new Date(Math.round((d - 25569) * 86400 * 1000)) : null;

/**
 * Converts a JS Date object to an Excel serial date number.
 * @param {Date} d - The JavaScript Date object.
 */
export const jsDateToExcel = (d) => d ? (d.getTime() / 86400000) + 25569 : null;

/**
 * Converts an Excel serial date number to a "YYYY-MM-DD" string.
 * @param {number} d - The Excel serial date number.
 */
export const excelDateToYYYYMMDD = (d) => {
    const date = excelToJSDate(d);
    return date ? date.toISOString().split('T')[0] : '';
};

/**
 * Converts a "YYYY-MM-DD" string to an Excel serial date number, avoiding timezone issues.
 * @param {string} s - The date string in "YYYY-MM-DD" format.
 */
export const yyyymmddToExcel = (s) => {
    if (!s) return null;
    // Creates the date in UTC to prevent local timezone from shifting the date.
    const date = new Date(Date.UTC(...s.split('-').map((val, i) => i === 1 ? parseInt(val) - 1 : parseInt(val))));
    return jsDateToExcel(date);
};


// --- Formatting ---

/**
 * Formats an Excel date number into a readable string like "Aug 20, 2025".
 * @param {number} d - The Excel serial date number.
 */
export const excelDateToJSDateString = (d) => {
    const date = excelToJSDate(d);
    return date ? date.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) : null;
};

/**
 * Formats a time string (e.g., "14:30") into a 12-hour format with AM/PM (e.g., "2:30 PM").
 * @param {string} timeStr - The time string in "HH:mm" format.
 */
export const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [h, m] = timeStr.split(':');
    const hours = parseInt(h, 10);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const hh = ((hours + 11) % 12 + 1);
    return `${hh}:${m} ${suffix}`;
};

/**
 * Formats an ISO 8601 timestamp into a readable local date and time string.
 * @param {string} iso - The ISO 8601 timestamp string.
 */
export const formatTimestamp = (iso) => iso ? new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }) : '';

/**
 * Formats a number as a US currency string.
 * @param {number} a - The amount to format.
 */
export const formatCurrency = (a) => a === null || a === undefined ? "N/A" : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(a);


// --- Dynamic Styling ---

const styleMaps = {
    priority: {
        'emergency': 'bg-red-100 text-red-800 border-red-500',
        'urgent': 'bg-orange-100 text-orange-800 border-orange-500',
        'regular': 'bg-blue-100 text-blue-800 border-blue-500',
        'low': 'bg-gray-100 text-gray-800 border-gray-500',
        'default': 'bg-gray-100 text-gray-800 border-gray-500'
    },
    status: {
        'completed': 'bg-green-100 text-green-800',
        'scheduled': 'bg-blue-100 text-blue-800',
        'open': 'bg-yellow-100 text-yellow-800',
        'in progress': 'bg-purple-100 text-purple-800',
        'on hold': 'bg-pink-100 text-pink-800',
        'cancelled': 'bg-red-100 text-red-800',
        'default': 'bg-gray-100 text-gray-800'
    },
    customerType: {
        'national account': 'bg-blue-100 text-blue-800',
        'commercial': 'bg-purple-100 text-purple-800',
        'residential': 'bg-green-100 text-green-800',
        'maintenance': 'bg-yellow-100 text-yellow-800',
        'default': 'bg-gray-100 text-gray-800'
    },
    techStatus: {
        'available': 'bg-green-100 text-green-800',
        'on site': 'bg-blue-100 text-blue-800',
        'en route': 'bg-yellow-100 text-yellow-800',
        'on break': 'bg-gray-100 text-gray-800',
        'on call': 'bg-teal-100 text-teal-800',
        'day off': 'bg-slate-200 text-slate-800',
        'default': 'bg-gray-100 text-gray-800'
    }
};

/**
 * A generic function to get TailwindCSS class strings for different categories.
 * @param {('priority'|'status'|'customerType'|'techStatus')} type - The category of style.
 * @param {string} value - The specific value to look up (e.g., 'emergency', 'completed').
 * @returns {string} The corresponding CSS classes.
 */
export const getDynamicStyles = (type, value) => {
    const map = styleMaps[type];
    if (!map) return styleMaps.status.default;
    return map[value?.toLowerCase()] || map['default'];
};