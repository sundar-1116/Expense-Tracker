import React from 'react';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({ data = [] }) => {
    const chartData = prepareExpenseBarChartData(data);
    
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Last 30 Days Expenses</h2>
            <CustomBarChart data={chartData} />
        </div>
    );
};

export default Last30DaysExpenses;