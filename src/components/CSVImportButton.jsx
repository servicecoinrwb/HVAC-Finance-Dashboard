import React from 'react';
import { Upload } from 'lucide-react';

export const CSVImportButton = ({ type, label, acceptTypes = ".csv" }) => {
    const fileInputRef = React.useRef(null);

    return (
        <div className="inline-block">
            <input
                ref={fileInputRef}
                type="file"
                accept={acceptTypes}
                onChange={(e) => {
                    if (e.target.files[0]) {
                        window.handleEnhancedCSVImport?.(e.target.files[0], type);
                        e.target.value = '';
                    }
                }}
                style={{ display: 'none' }}
            />
            <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-2 rounded-md transition-colors"
            >
                <Upload size={16} />
                {label}
            </button>
        </div>
    );
};