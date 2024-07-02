export interface IMapProps {
  markers: IMarker[];
}

export interface IMarker {
  geocode: [number, number];
  popUp: string;
  id: string;
}
