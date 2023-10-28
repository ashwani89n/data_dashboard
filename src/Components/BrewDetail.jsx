import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideNav from "./SideNav";


const BrewDetail = () => {
  let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);

    useEffect(() => {
        fetchAllBreweries().catch(console.error);
      }, []);
    
      const fetchAllBreweries = async () => {
        const response = await fetch(
          `https://api.openbrewerydb.org/v1/breweries?by_ids=${params.symbol}`
        );
        const json = await response.json();
        console.log(json);
        setFullDetails(json);
      };

    return (
    <>
     {fullDetails && fullDetails.length > 0 && (
  <table>
    <tbody>
      {fullDetails.map((brew) => (  
        <div key={brew.id} className="detailView">
        <tr >
          <td width="50%" align='left'>
            <div >Name</div>
          </td>
          <td width="50%" align='left'>
            <div >: {brew.name}</div>
          </td>
        </tr>
        <tr >
          <td align='left'>
            <div >Brewery Type</div>
          </td>
          <td align='left'>
            <div >: {brew.brewery_type.toUpperCase()}</div>
          </td>
        </tr>
        <tr>
                    <td align='left'>
                      <div >Address</div>
                    </td>
                    <td align='left'>
                      <div >: {brew.address_1}</div>
                    </td>
				  </tr>
				  <tr>
                    <td align='left'>
                      <div >City</div>
                    </td>
                    <td align='left'>
                      <div >: {brew.city}</div>
                    </td>
				  </tr>
				  <tr>
                    <td align='left'>
                      <div >State</div>
                    </td>
                    <td align='left'>
                      <div >: {brew.state}</div>
                    </td>
				  </tr>
				  <tr>
                    <td align='left'>
                      <div >Postal Code</div>
                    </td>
                    <td align='left'>
                      <div >: {brew.postal_code}</div>
                    </td>
				  </tr>
				  
				  <tr>
                    <td align='left'>
                      <div >Country</div>
                    </td>
                    <td align='left'>
                      <div >: {brew.country}</div>
                    </td>
				  </tr>
				  <tr >
                    <td align='left'>
                      <div >Phone</div>
                    </td>
                    <td align='left'>
                      <div >: {brew.phone}</div>
                    </td>
				  </tr><tr>
                    <td align='left'>
                      <div >Website URL</div>
                    </td>
                    <td width="40%" align='left'>
                      <div >: {brew.website_url}</div>
                    </td>
				  </tr>
        </div>
      ))}
      
    </tbody>
  </table>
)}

    <div className='sideNav'>
        <SideNav />
      </div></>
    );
  };
  
  export default BrewDetail;

