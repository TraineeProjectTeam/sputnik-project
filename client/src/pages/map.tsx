import { IMarker, Map, getPickupPointsRequest } from 'entities/map';
import { useEffect, useState } from 'react';

export const MapPage = () => {
  const [markers, setMarkers] = useState<IMarker[]>([]);

  useEffect(() => {
    getPickupPointsRequest().then((res) => setMarkers(res.data));

    return () => {
      setMarkers([]);
    };
  }, []);

  return <Map markers={markers} />;
};
