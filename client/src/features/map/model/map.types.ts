import { IAdress } from 'shared/ui/forms';

export interface IMapProps {
  markers: IMarker[];
}

export interface IMarker {
  address: IAdress;
  logitude: string;
  latitude: string;
}

export interface IMapStore {
  pickupPoint: IMarker | null;
  pickupPoints: IMarker[];
  isLoading: boolean;
  getPickupPoint: (id: string) => void;
  getPickupPoints: () => void;
}
