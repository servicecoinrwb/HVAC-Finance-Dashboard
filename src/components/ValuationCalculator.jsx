import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Users, Building, Star, DollarSign, Download } from 'lucide-react';

const ValuationCalculator = () => {
  const [financials, setFinancials] = useState({
    netProfit: '',
    ownerSalary: '',
    ownerPerks: '',
    depreciation: '',
    amortization: '',
    interestExpense: ''
  });

  const [scorecard, setScorecard] = useState({
    recurringRevenue: 0, // 0=lower, 1=average, 2=higher
    ownerInvolvement: 0,
    customerBase: 0,
    profitabilityTrend: 0,
    technicianTeam: 0,
    brandMarketing: 0
  });

  const [sde, setSde] = useState(0);
  const [multiple, setMultiple] = useState(2.75);
  const [estimatedValue, setEstimatedValue] = useState(0);

  // Calculate SDE whenever financials change
  useEffect(() => {
    const values = Object.values(financials).map(v => parseFloat(v) || 0);
    const calculatedSde = values.reduce((sum, val) => sum + val, 0);
    setSde(calculatedSde);
  }, [financials]);

  // Calculate multiple based on scorecard
  useEffect(() => {
    const totalScore = Object.values(scorecard).reduce((sum, val) => sum + val, 0);
    const avgScore = totalScore / 6;
    
    // Map average score to multiple range
    if (avgScore <= 0.5) {
      setMultiple(2.0 + (avgScore * 1.5)); // 2.0 - 2.75
    } else if (avgScore <= 1.5) {
      setMultiple(2.75 + ((avgScore - 0.5) * 0.75)); // 2.75 - 3.5
    } else {
      setMultiple(3.5 + ((avgScore - 1.5) * 2)); // 3.5 - 4.5+
    }
  }, [scorecard]);

  // Calculate estimated value
  useEffect(() => {
    setEstimatedValue(sde * multiple);
  }, [sde, multiple]);

  const handleFinancialChange = (field, value) => {
    setFinancials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleScorecardChange = (field, value) => {
    setScorecard(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getMultipleDescription = () => {
    if (multiple < 2.75) return "Conservative Range";
    if (multiple < 3.5) return "Average Range";
    return "Premium Range";
  };

  const getMultipleColor = () => {
    if (multiple < 2.75) return "text-red-600 dark:text-red-400";
    if (multiple < 3.5) return "text-yellow-600 dark:text-yellow-400";
    return "text-green-600 dark:text-green-400";
  };

  const exportToCSV = () => {
    const data = [
      ['HVAC Business Valuation Calculator'],
      [''],
      ['Financial Information'],
      ['Pre-Tax Net Profit', formatCurrency(parseFloat(financials.netProfit) || 0)],
      ['Owner Salary', formatCurrency(parseFloat(financials.ownerSalary) || 0)],
      ['Owner Perks', formatCurrency(parseFloat(financials.ownerPerks) || 0)],
      ['Depreciation', formatCurrency(parseFloat(financials.depreciation) || 0)],
      ['Amortization', formatCurrency(parseFloat(financials.amortization) || 0)],
      ['Interest Expense', formatCurrency(parseFloat(financials.interestExpense) || 0)],
      ['Seller Discretionary Earnings (SDE)', formatCurrency(sde)],
      [''],
      ['Valuation Results'],
      ['SDE', formatCurrency(sde)],
      ['Multiple', multiple.toFixed(2) + 'x'],
      ['Estimated Business Value', formatCurrency(estimatedValue)]
    ];

    const csvContent = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hvac-business-valuation.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const scorecardOptions = [
    {
      field: 'recurringRevenue',
      title: 'Recurring Revenue',
      icon: <TrendingUp className="w-5 h-5" />,
      options: [
        '< 15% of revenue from service contracts',
        '15% - 30% from service contracts',
        '> 30% from stable service contracts'
      ]
    },
    {
      field: 'ownerInvolvement',
      title: 'Owner Involvement',
      icon: <Users className="w-5 h-5" />,
      options: [
        'Business relies entirely on you',
        'You are key, but have manager/lead tech',
        'Business runs on systems, with or without you'
      ]
    },
    {
      field: 'customerBase',
      title: 'Customer Base',
      icon: <Building className="w-5 h-5" />,
      options: [
        'Top 5 customers > 30% of revenue',
        'Some customer concentration exists',
        'No single customer > 5% of revenue'
      ]
    },
    {
      field: 'profitabilityTrend',
      title: 'Profitability Trend',
      icon: <DollarSign className="w-5 h-5" />,
      options: [
        'Profits flat, declining, or unpredictable',
        'Profits stable and consistent',
        'Clear year-over-year profit growth'
      ]
    },
    {
      field: 'technicianTeam',
      title: 'Technician Team',
      icon: <Users className="w-5 h-5" />,
      options: [
        'High turnover; hard to find help',
        'Stable team, normal turnover',
        'Experienced, loyal techs, low turnover'
      ]
    },
    {
      field: 'brandMarketing',
      title: 'Brand & Marketing',
      icon: <Star className="w-5 h-5" />,
      options: [
        'Little online presence; word-of-mouth only',
        'Basic website and some reviews',
        'Strong brand, great reviews, active marketing'
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="bg-blue-600 text-white p-6">
        <div className="flex items-center gap-3">
          <Calculator className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">HVAC Business Valuation Calculator</h1>
            <p className="text-blue-100 mt-1">Calculate your Seller's Discretionary Earnings (SDE) and estimate your business value</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 p-6">
        {/* Financial Information Section */}
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Financial Information</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Enter your typical annual figures to calculate your SDE:</p>
            
            <div className="space-y-4">
              {[
                { key: 'netProfit', label: 'Pre-Tax Net Profit', desc: 'From your income statement' },
                { key: 'ownerSalary', label: '+ Owner\'s Salary', desc: 'Your total salary and distributions' },
                { key: 'ownerPerks', label: '+ Owner\'s Perks', desc: 'Health insurance, vehicle costs, etc.' },
                { key: 'depreciation', label: '+ Depreciation', desc: 'From income statement or tax return' },
                { key: 'amortization', label: '+ Amortization', desc: 'From your income statement' },
                { key: 'interestExpense', label: '+ Interest Expense', desc: 'Total interest on business debt' }
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
                  </div>
                  <div className="w-32">
                    <input
                      type="number"
                      value={financials[key]}
                      onChange={(e) => handleFinancialChange(key, e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-600">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Seller's Discretionary Earnings (SDE)</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Your total earnings figure</p>
                </div>
                <div className="text-2xl font-bold text-blue-600">{formatCurrency(sde)}</div>
              </div>
            </div>
          </div>

          {/* Final Valuation */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border-2 border-green-200 dark:border-green-800">
            <h2 className="text-2xl font-semibold mb-4 text-green-800 dark:text-green-200">Final Valuation</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-700 dark:text-slate-300">Your SDE:</span>
                <span className="font-semibold">{formatCurrency(sde)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700 dark:text-slate-300">x Valuation Multiple:</span>
                <span className={`font-semibold ${getMultipleColor()}`}>
                  {multiple.toFixed(2)}x ({getMultipleDescription()})
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-slate-800 dark:text-white">Estimated Business Value:</span>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">{formatCurrency(estimatedValue)}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={exportToCSV}
              className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Results to CSV
            </button>
          </div>
        </div>

        {/* Valuation Multiple Scorecard */}
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Valuation Multiple Scorecard</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Rate each factor to determine your valuation multiple:</p>
            
            <div className="space-y-6">
              {scorecardOptions.map(({ field, title, icon, options }) => (
                <div key={field} className="space-y-3">
                  <div className="flex items-center gap-2">
                    {icon}
                    <h3 className="font-semibold text-slate-800 dark:text-white">{title}</h3>
                  </div>
                  <div className="space-y-2">
                    {options.map((option, index) => (
                      <label key={index} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name={field}
                          value={index}
                          checked={scorecard[field] === index}
                          onChange={(e) => handleScorecardChange(field, parseInt(e.target.value))}
                          className="w-4 h-4 text-blue-600 border-slate-300 dark:border-slate-600 focus:ring-blue-500"
                        />
                        <span className={`text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 ${
                          index === 0 ? 'text-red-600 dark:text-red-400' : 
                          index === 1 ? 'text-yellow-600 dark:text-yellow-400' : 
                          'text-green-600 dark:text-green-400'
                        }`}>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-600">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">How to Interpret Your Multiple:</h4>
                <div className="text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span><strong>Conservative (2.0x - 2.75x):</strong> Higher risk factors present</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span><strong>Average (2.75x - 3.5x):</strong> Mixed risk profile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span><strong>Premium (3.5x - 4.5x+):</strong> Lower risk, strong fundamentals</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 dark:bg-slate-700 p-6 border-t">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Example Calculation:</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            An HVAC business with $200,000 SDE, solid service contracts, stable team, and growing profits 
            might earn a 3.5x multiple: $200,000 × 3.5 = $700,000 estimated value.
          </p>
        </div>
        <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
          <p><strong>Disclaimer:</strong> This calculator provides estimates for informational purposes only. 
          Actual business valuations may vary significantly based on market conditions, buyer preferences, 
          and other factors not captured in this tool. Consult with a business broker or valuation professional 
          for a comprehensive analysis.</p>
        </div>
      </div>
    </div>
  );
};

export default ValuationCalculator;

// Instructions for adding to App.jsx:
// 1. Add this import at the top with other component imports:
// import ValuationCalculator from './components/ValuationCalculator';

// 2. Add this button in the navigation section (around line 804):
// <button onClick={() => setActiveSection('valuation')} className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === 'valuation' ? 'text-cyan-600 dark:text-white border-b-2 border-cyan-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}>Business Valuation</button>

// 3. Add this case in the main render section (around line 835):
// {activeSection === 'valuation' && <ValuationCalculator />}