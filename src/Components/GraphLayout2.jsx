import React from 'react';
import { BarChart, Bar, Rectangle,XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraphLayout2 = ({ breweryTypeCounts }) => {
    return (
        <ResponsiveContainer >
          <BarChart width="100%" 
          height={300}
            data={breweryTypeCounts}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" stroke="black" /> 
            <YAxis stroke="black"/>
            <Tooltip />
            <Bar dataKey="count" fill="darkblue" />
          </BarChart>
        </ResponsiveContainer>
      );
};

export default GraphLayout2;
