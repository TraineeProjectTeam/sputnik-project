export interface IMapProps {
  markers: IMarker[];
}

export interface IAdress {
  region: string;
  city: string;
  street_name: string;
  street_number: string;
}

export interface IMarker {
  address: IAdress;
  logitude: string;
  latitude: string;
}
