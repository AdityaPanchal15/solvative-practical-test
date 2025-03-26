export interface ISearchBoxProps {
  placeholder?: string;
  disabled?: boolean;
  searchedPlace: string;
  setSearchedPlace: (value: string) => void;
  onSearch: () => void;
};

export interface ITableProps {
  filteredCities: Array<City>;
  currentPage: number;
  totalLoadData: number;
  searchedPlace: string;
  setTotalLoadData: (count: number) => void;
  setCurrentPage: (page: number) => void;
};


export interface City {
  id: number;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  latitude: number;
  longitude: number;
  population: number;
};