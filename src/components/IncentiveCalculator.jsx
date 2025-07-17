import React, { useState, useMemo } from 'react';
import { DollarSign, Percent } from 'lucide-react';

const initialPercentBrackets = [
    { min: 10000, max: Infinity, rate: 10.0 },
    { min: 8000, max: 9999, rate: 8.0 },
    { min: 5000, max: 7999, rate: 5.0 },
    { min: 3500, max: 4999, rate: 3.0 },
    { min: 0, max: 3499, rate: 1.5 },
];

const initialHourlyBrackets = [
    { min: 10000, max: Infinity, bonus: 10.0 },
    { min: 8000, max: 9999, bonus: 8.0 },
    { min: 5000, max: 7999, bonus: 5.0 },
    { min: 3500, max: 4999, bonus: 2.0 },
    { min: 0, max: 3499, bonus: 0 },
];

const IncentiveCalculator = () => {
    // State for Percent-based calculator
    const [percentBrackets, setPercentBrackets] = useState(initialPercentBrackets);
    const [actualSalesPercent, setActualSalesPercent] = useState(0);

    // State for Hourly-based calculator
    const [hourlyBrackets, setHourlyBrackets] = useState(initialHourlyBrackets);
    const [actualSalesHourly, setActualSalesHourly] = useState(0);
    const [hoursWorked, setHoursWorked] = useState(0);

    const handlePercentBracketChange = (index, field, value) => {
        const newBrackets = [...percentBrackets];
        newBrackets[index][field] = parseFloat(value) || 0;
        setPercentBrackets(newBrackets);
    };

    const handleHourlyBracketChange = (index, field, value) => {
        const newBrackets = [...hourlyBrackets];
        newBrackets[index][field] = parseFloat(value) || 0;
        setHourlyBrackets(newBrackets);
    };

    const calculatedPercentBonus = useMemo(() => {
        const bracket = percentBrackets.find(b => actualSalesPercent >= b.min && actualSalesPercent <= b.max);
        if (!bracket) return 0;
        return (actualSalesPercent * (bracket.rate / 100));
    }, [actualSalesPercent, percentBrackets]);

    const calculatedHourlyBonus = useMemo(() => {
        const bracket = hourlyBrackets.find(b => actualSalesHourly >= b.min && actualSalesHourly <= b.max);
        if (!bracket || !hoursWorked) return 0;
        return hoursWorked * bracket.bonus;
    }, [actualSalesHourly, hoursWorked, hourlyBrackets]);

    return (
        <div className="space-y-8">
            {/* Percent Incentive Calculator */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Percent Incentive Calculator</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Bonus Bracket Table */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Bonus Brackets</h4>
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase">
                                <tr>
                                    <th className="p-2">Sales Bracket</th>
                                    <th className="p-2">% Scale</th>
                                </tr>
                            </thead>
                            <tbody>
                                {percentBrackets.map((bracket, index) => (
                                    <tr key={index} className="border-b border-slate-200 dark:border-slate-700">
                                        <td className="p-2 font-mono bg-blue-100 dark:bg-blue-900/50">
                                            ${bracket.min.toLocaleString()}{bracket.max === Infinity ? '+' : ` - $${bracket.max.toLocaleString()}`}
                                        </td>
                                        <td className="p-2 bg-blue-100 dark:bg-blue-900/50">
                                            <input 
                                                type="number"
                                                value={bracket.rate}
                                                onChange={(e) => handlePercentBracketChange(index, 'rate', e.target.value)}
                                                className="w-20 bg-transparent text-right font-mono"
                                            /> %
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Calculation Section */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Bonus Calculation</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Actual Sales</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input 
                                        type="number"
                                        value={actualSalesPercent}
                                        onChange={(e) => setActualSalesPercent(parseFloat(e.target.value) || 0)}
                                        className="w-full bg-yellow-100 dark:bg-yellow-800/50 pl-10 p-2 rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg text-center">
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Estimated Bonus</p>
                                <p className="text-3xl font-bold text-green-500">${calculatedPercentBonus.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hourly Incentive Calculator */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Hourly Incentive Calculator</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Bonus Bracket Table */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Bonus Brackets</h4>
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase">
                                <tr>
                                    <th className="p-2">Sales Bracket</th>
                                    <th className="p-2">Bonus per Hour</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hourlyBrackets.map((bracket, index) => (
                                    <tr key={index} className="border-b border-slate-200 dark:border-slate-700">
                                        <td className="p-2 font-mono bg-blue-100 dark:bg-blue-900/50">
                                            ${bracket.min.toLocaleString()}{bracket.max === Infinity ? '+' : ` - $${bracket.max.toLocaleString()}`}
                                        </td>
                                        <td className="p-2 bg-blue-100 dark:bg-blue-900/50">
                                            $ <input 
                                                type="number"
                                                value={bracket.bonus}
                                                onChange={(e) => handleHourlyBracketChange(index, 'bonus', e.target.value)}
                                                className="w-20 bg-transparent text-right font-mono"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Calculation Section */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Bonus Calculation</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Actual Sales</label>
                                 <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input 
                                        type="number"
                                        value={actualSalesHourly}
                                        onChange={(e) => setActualSalesHourly(parseFloat(e.target.value) || 0)}
                                        className="w-full bg-yellow-100 dark:bg-yellow-800/50 pl-10 p-2 rounded-md"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Hours Worked</label>
                                <input 
                                    type="number"
                                    value={hoursWorked}
                                    onChange={(e) => setHoursWorked(parseFloat(e.target.value) || 0)}
                                    className="w-full bg-yellow-100 dark:bg-yellow-800/50 p-2 rounded-md"
                                />
                            </div>
                            <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg text-center">
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Estimated Bonus</p>
                                <p className="text-3xl font-bold text-green-500">${calculatedHourlyBonus.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncentiveCalculator;
