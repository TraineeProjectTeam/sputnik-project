import './map.scss';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Icon, divIcon } from 'leaflet';
import customIconUrl from '../assets/icon.svg';
import { useMapStore } from '../model/map.store';

export const Map = () => {
  const { pickupPoints } = useMapStore();

  const customIcon = new Icon({
    iconUrl: customIconUrl,
    iconSize: [30, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const customClusterIcon = (cluster: { getChildCount: () => unknown }) => {
    return divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: 'cluster-icon',
    });
  };

  return (
    <MapContainer center={[+pickupPoints[0].latitude, +pickupPoints[0].logitude]} zoom={13}>
      <TileLayer
        attribution="Google Maps"
        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        maxZoom={19}
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
      />
      <MarkerClusterGroup
        chunkedLoading
        showCoverageOnHover={false}
        iconCreateFunction={customClusterIcon}
      >
        {pickupPoints?.map((marker) => (
          <Marker
            position={[+marker.logitude, +marker.latitude]}
            icon={customIcon}
            key={`${marker.logitude}-${marker.latitude}`}
          >
            <Popup>
              {Object.values(marker.address).map((field: string) => (
                <div key={field}>{field}</div>
              ))}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
