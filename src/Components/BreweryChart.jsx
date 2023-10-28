import React, { Component, useEffect, useState } from "react";

const BrewweryChart = ({ symbol, market }) => {
    const [histData, setHistData] = useState(null);
    
    useEffect(() => {
        const getBrewHist = async () => {
          const response = await fetch(
          `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&e=${market}&limit=30&api_key=` +
              API_KEY
          );
      
          const json = await response.json();
          setHistData(json.Data.Data);
        };
        getBrewHist().catch(console.error);
      }, []);

      return (
        <div>
          {histData ? (
            <div>
              
            </div>
          ) : null}
        </div>
      );
    
  };

export default BrewweryChart;