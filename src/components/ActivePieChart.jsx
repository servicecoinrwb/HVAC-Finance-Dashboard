import React, { useState, useCallback } from 'react';
import { ResponsiveContainer, PieChart, Pie, Sector, Tooltip, Cell } from 'recharts';

export const ActivePieChart = ({ data, onSliceClick }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback((_, index) => {
        setActiveIndex(index);
    }, [setActiveIndex]);

    const renderActiveShape = (props) => {
        const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
        return (
            <g className="cursor-pointer" onClick={() => onSliceClick(payload.name)}>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="font-bold text-lg">
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
            </g>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Tooltip 
                    contentStyle={{ backgroundColor: '#334155', border: '1px solid #475569', borderRadius: '0.5rem' }} 
                    labelStyle={{ color: '#cbd5e1' }} 
                    itemStyle={{ color: '#f1f5f9' }} 
                    formatter={(value) => `$${value.toFixed(2)}`} 
                />
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                    onClick={(data) => onSliceClick(data.name)}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};
