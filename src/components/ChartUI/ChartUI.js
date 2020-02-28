import React from 'react';
import { LineChart, Bar, BarChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ComposedChart } from 'recharts';

function ChartUI(props) {
    const translator = {
        'total_assets': 'Total Assets', 'current_assets': 'Current Assets', 'non_current_assets': 'Non-current Assets', 'total_liabilities': 'Total Liabilities',
        'current_liabilities': 'Current Liabilities', 'non_current_liabilities': 'Non-current Liabilities', 'company': 'company', 'year': 'year',
        'equity': 'Equity', 'revenue': 'Revenue', 'profit_loss': 'Profit/Loss', 'cash_and_equivalents': 'Cash and cash equivalents',
        'current_ratio': 'Current Ratio', 'debt_ratio': 'Debt Ratio', 'roi': 'Return on investment', 'roe': 'Return on equity', 'net_profit_margin': 'Net profit margin'
    };
    if (props.line) {
        return (
            <ResponsiveContainer width="80%" height={200}>
                <LineChart width={730} height={250} data={props.companyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={props.ratio} stroke={props.stroke} name={translator[props.ratio]} />
                </LineChart>
            </ResponsiveContainer>
        );
    } else {
        return (
            <ResponsiveContainer width="80%" height={200}>
                <BarChart width={730} height={250} data={props.companyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={props.ratio} fill={props.secondary} name={translator[props.ratio]} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

export default ChartUI;