import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import SideNav from "./Components/SideNav";
import Header from './Components/Header';
import { Link } from "react-router-dom";
import GraphLayout from './Components/GraphLayout';
import GraphLayout2 from './Components/GraphLayout2';

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState('All');
  const [types, setTypes] = useState([]);
  const [totCount, setTotCount] = useState(0);
  const [mostPrev, setMostPrev] = useState('');
  const [mostPrevState, setMostPrevState] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [states, setStates] = useState([]);
  const [breweryTypeCount, setBreweryTypeCount] = useState([]);
  const [breweryTypeCountCities, setBreweryTypeCountCities] = useState([]);

  useEffect(() => {
    fetchAllBreweries().catch(console.error);
  }, []);

  useEffect(() => {
    if (filteredResults && filteredResults.length > 0) {
      const uniqueTypes = getUniqueTypes(filteredResults);
      setTypes(uniqueTypes);
      const uniqueStates = getUniqueStates(filteredResults);
      setStates(uniqueStates);
    }
  }, [filteredResults]);

  const handleTypeDropdownChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleStateDropdownChange = (e) => {
    setSelectedState(e.target.value);
  };

  const fetchAllBreweries = async () => {
    const response = await fetch(
      "https://api.openbrewerydb.org/v1/breweries"
    );
    const json = await response.json();
    setList(json);
    const usBreweries = json.filter((brewery) => brewery.country === 'United States');
    setList(usBreweries);

    const uniqueTypes = getUniqueTypes(usBreweries);
    const uniqueStates = getUniqueStates(usBreweries);
    setTypes(uniqueTypes);
    setStates(uniqueStates);
    setFilteredResults(usBreweries);
    setTotCount(usBreweries.length);

    const mostCommonType = findMostCommonType(usBreweries);
    setMostPrev(mostCommonType);
    const mostCommonState = findMostCommonState(usBreweries);
    setMostPrevState(mostCommonState);
    const typCount = getTypCount(usBreweries);
    setBreweryTypeCount(typCount);
    const typCountCity = getTypCountCities(usBreweries);
    console.log(typCountCity);
    setBreweryTypeCountCities(typCountCity);
  };

  const getTypCount = (filteredData) => {
    const typCounts = {};
    filteredData.forEach((brew) => {
      const type = brew.brewery_type;
      typCounts[type] = (typCounts[type] || 0) + 1;
    });
    return Object.entries(typCounts);
  };

  const getTypCountCities = (filteredData) => {
    const typCountsCities = {};
    filteredData.forEach((brew) => {
      const city = brew.state;
      
      if (city) {
        if (!typCountsCities[city]) {
          typCountsCities[city] = 1;
        } else {
          typCountsCities[city]++;
        }
      }
    });
  
    const result = Object.entries(typCountsCities).map(([city, count]) => ({
      city,
      count,
    }));
  
    return result;
  };

  

  const findMostCommonType = (filteredData) => {
    const typeCounts = {};
    let mostCommonType = '';
    let maxCount = 0;

    filteredData.forEach((brew) => {
      const type = brew.brewery_type;
      typeCounts[type] = (typeCounts[type] || 0) + 1;

      if (typeCounts[type] > maxCount) {
        maxCount = typeCounts[type];
        mostCommonType = type;
      }
    });

    return mostCommonType;
  };

  const findMostCommonState = (filteredData) => {
    const stateCounts = {};
    let mostCommonState = '';
    let maxCount = 0;

    filteredData.forEach((brew) => {
      const state = brew.state;
      stateCounts[state] = (stateCounts[state] || 0) + 1;

      if (stateCounts[state] > maxCount) {
        maxCount = stateCounts[state];
        mostCommonState = state;
      }
    });

    return mostCommonState;
  };

  const getUniqueTypes = (filteredData) => {
    return Array.from(
      new Set(
        filteredData
          .filter((brew) => brew.name && brew.phone && brew.city && brew.state)
          .map((brew) => brew.brewery_type)
      )
    );
  };

  const getUniqueStates = (filteredData) => {
    return Array.from(
      new Set(
        filteredData
          .filter((brew) => brew.name && brew.phone && brew.city && brew.brewery_type)
          .map((brew) => brew.state)
      )
    );
  };

  const filterBreweries = () => {
    if (selectedType === 'All' && selectedState === 'All' && !searchInput) {
      setFilteredResults(list);
    } else {
      const filteredData = list.filter((brew) => {
        const typeMatch = selectedType === 'All' || brew.brewery_type === selectedType;
        const stateMatch = selectedState === 'All' || brew.state === selectedState;
        const searchMatch =
          !searchInput ||
          Object.values(brew)
            .join('')
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        return typeMatch && stateMatch && searchMatch;
      });
      setFilteredResults(filteredData);
    }
  };

  useEffect(() => {
    filterBreweries();
  }, [selectedType, selectedState, searchInput]);

  return (
    <div>
      <div className="header-layout">
        <Header input={totCount} input2={mostPrev} input3={mostPrevState} />
      </div>
      <div className="row">
        <div className="whole-page" style={{ overflow: 'auto', maxHeight: '75vh' }}>
          <div>
            <input
              className='searchDiv'
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <label htmlFor="typeDropdown" className='dropdown'>Type:</label>
            <select id="typeDropdown" value={selectedType} onChange={handleTypeDropdownChange}>
              <option value="All">All</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <label htmlFor="stateDropdown" className='dropdown'>State:</label>
            <select id="stateDropdown" value={selectedState} onChange={handleStateDropdownChange}>
              <option value="All">All</option>
              {states.map((stte) => (
                <option key={stte} value={stte}>
                  {stte}
                </option>
              ))}
            </select>
          </div>
          <div>
          </div>
          {filteredResults && filteredResults.length > 0 && (
            <table>
              <tbody>
                <tr>
                  <td></td>
                  <td><div className='table-header-blocks'>Name</div></td>
                  <td><div className='table-header-blocks'>Type</div></td>
                  <td><div className='table-header-blocks'>State</div></td>
                  <td><div className='table-header-blocks'>Phone</div></td>
                  <td><div className='table-header-blocks'>Details</div></td>
                  <td></td>
                </tr>
                {filteredResults.map((brew) => (
                  (brew.name && brew.address_1 && brew.brewery_type && brew.phone) && (
                    <tr key={brew.id}>
                      <td width="1%"></td>
                      <td width="40%" align='left'>
                        <div className='table-data-blocks'>{brew.name}</div>
                      </td>
                      <td width="10%" align='left'>
                        <div className='table-data-blocks'>{brew.brewery_type}</div>
                      </td>
                      <td width="20%" align='left'>
                        <div className='table-data-blocks'>{brew.state}</div>
                      </td>
                      <td width="15%" align='left'>
                        <div className='table-data-blocks'>{brew.phone}</div>
                      </td>
                      <td width="10%" align='center'>
                        <div className='table-data-blocks'>
                          <Link to={`/brewDetails/${brew.id}`}>🔗</Link>
                        </div>
                      </td>
                      <td width="2%"></td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="graphs-column">
          <div className='graphLay'>
            <GraphLayout breweryTypeCounts={breweryTypeCount} />
          </div>
          <div className='graphLay'>
            <GraphLayout2 breweryTypeCounts={breweryTypeCountCities} />
          </div>
        </div>
      </div>
      <div className='sideNav'>
        <SideNav />
      </div>
    </div>
  );
}

export default App;
