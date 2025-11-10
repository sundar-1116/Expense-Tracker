import React from 'react';
import moment from 'moment';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({ data = [] }) => {
    // debug logs
    console.log('Last30DaysExpenses: incoming data', data);

    // build chart data expected by CustomBarChart:
    // { month: 'DD MMM', amount: number, category: 'Expenses' }
    const aggregateByDay = (txs = []) => {
        const map = {};
        txs.forEach(tx => {
            if (!tx) return;
            const date = tx.date || tx.createdAt || tx._id; // fallback keys
            const day = moment(date).format('DD MMM');
            const amt = Number(tx.amount) || 0;
            map[day] = (map[day] || 0) + amt;
        });
        const result = Object.keys(map).map(day => ({
            month: day,
            amount: map[day],
            category: 'Expenses'
        }));
        // sort by real date
        result.sort((a, b) => moment(a.month, 'DD MMM').toDate() - moment(b.month, 'DD MMM').toDate());
        return result;
    };

    const chartData = aggregateByDay(data || []);
    console.log('Last30DaysExpenses: prepared chartData', chartData);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Last 30 Days Expenses</h2>

            {(!data || data.length === 0) ? (
                <p className="text-sm text-gray-400">No expenses in the last 30 days</p>
            ) : (!chartData || chartData.length === 0) ? (
                <p className="text-sm text-gray-400">No chart data available</p>
            ) : (
                <CustomBarChart data={chartData} />
            )}
        </div>
    );
};

export default Last30DaysExpenses;