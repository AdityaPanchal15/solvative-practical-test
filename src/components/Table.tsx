import React, { useMemo } from "react";
import { ITableProps } from "../types/searchPlaces";

const Table: React.FC<ITableProps> = ({ filteredCities, currentPage, totalLoadData, searchedPlace, setTotalLoadData, setCurrentPage }) => {
  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);

  // Use useMemo to cache paginatedData and avoid unnecessary recalculations
  const paginatedData = useMemo(() => 
    filteredCities.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage),
    [filteredCities, currentPage, itemsPerPage]
  );

  return (
    <>
      <table className="custom-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {!!!searchedPlace && <tr><td colSpan={3} align="center">Start searching</td></tr>}
          {paginatedData.length ? paginatedData.map((city, index) => (
            <tr key={city.id}>
              <td>{index + 1 + currentPage * itemsPerPage}</td>
              <td>{city.city}</td>
              <td className="country-info">
                <img
                  src={`https://flagsapi.com/${city.countryCode}/flat/32.png`}
                  alt={`${city.country} flag`}
                  className="country-flag"
                />
                <span className="country-name">{city.country}</span>
              </td>
            </tr>
          )) : !!searchedPlace && <tr><td colSpan={3} align="center">No result found</td></tr>}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-container">
        <div className="pagination">
          { totalPages > 1 && Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`page-btn ${currentPage === index ? "active" : ""}`}
              onClick={() => setCurrentPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Items Per Page Selector */}
        <div className="items-per-page">
          <label htmlFor="totalLoadData">Show</label>
          <select
            id="totalLoadData"
            value={totalLoadData}
            onChange={(e) => setTotalLoadData(Math.min(10, Math.max(5, Number(e.target.value))))}
          >
            {[...Array(6)].map((_, i) => {
              const value = 5 + i;
              return <option key={value} value={value}>{value}</option>;
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export default Table;
