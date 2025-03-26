import React, { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import Table from "../components/Table";
import { City } from "../types/searchPlaces";

const SearchPlacePage: React.FC = () => {
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalLoadData, setTotalLoadData] = useState(5);
  const [loading, setLoading] = useState(false);
  const [searchedPlace, setSearchedPlace] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchCities(totalLoadData);
    }, 500); // 500ms delay

    return () => clearTimeout(handler); // Cleanup function
  }, [searchedPlace]);

  const fetchCities = async (limit: number) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/geo/cities?limit=${limit}`, {
        method: "GET",
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_API_KEY,
          "x-rapidapi-host": import.meta.env.VITE_API_HOST,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      const apiData: City[] = data.data.map((city: any) => ({
        id: city.id,
        city: city.city,
        name: city.name,
        country: city.country,
        countryCode: city.countryCode,
        region: city.region,
        regionCode: city.regionCode,
        latitude: city.latitude,
        longitude: city.longitude,
        population: city.population,
      }));
  
      if(!!searchedPlace) {
        setFilteredCities(apiData.filter((item) => item.city.toLowerCase().includes(searchedPlace.toLowerCase())));
      } else {
        setFilteredCities([]);
      }
  
      setCurrentPage(0);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="container">
      {/* Search Box */}
      <SearchBox searchedPlace={searchedPlace} setSearchedPlace={setSearchedPlace} onSearch={() => fetchCities(totalLoadData)} />

      {/* Table */}
      {loading && <div className="spinner"></div>}
      <Table filteredCities={filteredCities} searchedPlace={searchedPlace} totalLoadData={totalLoadData} setTotalLoadData={setTotalLoadData} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default SearchPlacePage;
