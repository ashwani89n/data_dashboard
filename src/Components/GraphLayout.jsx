import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraphLayout = ({ breweryTypeCounts }) => {
    return (
        <ResponsiveContainer >
        <LineChart  width="100%" 
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
          <XAxis dataKey="0" stroke="black" />
          <YAxis stroke="black"/>
          <Tooltip />
          <Line type="monotone" dataKey="1" stroke="darkblue" />
        </LineChart>
      </ResponsiveContainer>
      );
};

export default GraphLayout;
