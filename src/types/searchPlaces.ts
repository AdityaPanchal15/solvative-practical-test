export interface ISearchBoxProps {
  placeholder?: string;
  disabled?: boolean;
  onSearch: (value: string) => void;
};

export interface ITableProps {
  filteredCities: Array<City>;
  currentPage: number;
  totalLoadData: number;
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