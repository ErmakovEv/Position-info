export default interface Position {
  id: string;
  name: string;
  equipmentType: 'receiver' | 'receiver-transmitter' | 'server';
  positionType: 'building' | 'trailer' | 'open-platform';
  boxingType: 'box' | 'termobox' | 'rock';
  accessType: 'convoy' | 'letter' | 'free';
  isWorking: boolean;
  description: string;
  contacts: string;
  image: string[];
  ip: string;
  vlan: number;
  projectNumber: number;
  coordinates: number[];
}
