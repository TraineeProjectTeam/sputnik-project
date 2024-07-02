import { IMarker, Map } from 'entities/map';

export const MapPage = () => {
  const markers: IMarker[] = [
    {
      geocode: [48.86, 2.3522],
      popUp: 'Hello, I am pop up 1',
      id: '1',
    },
    {
      geocode: [48.85, 2.3522],
      popUp: 'Hello, I am pop up 2',
      id: '2',
    },
    {
      geocode: [48.855, 2.34],
      popUp: 'Hello, I am pop up 3',
      id: '3',
    },
  ];

  return <Map markers={markers} />;
};
