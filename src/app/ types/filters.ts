//app/types/filters.ts
export type Location = {
    lat: number;
    lng: number;
  };
  
  export type Filters = {
    service: string;
    radius: number;
    location: Location;
  };
  