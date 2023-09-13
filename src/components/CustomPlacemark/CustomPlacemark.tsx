import { Placemark } from '@pbe/react-yandex-maps';
import Position from '../../db/types';

const PLACEMARK_TYPE_ARRAY = ['Icon', 'StretchyIcon', 'CircleDotIcon'];

type PlacemarkProps = {
  position: Position;
  indexMarkerType: number;
};

function CustomPlacemark({ position, indexMarkerType }: PlacemarkProps) {
  const getColorIcon = () => {
    if (indexMarkerType === 2) {
      if (position.isWorking) return 'darkGreen';
      return 'red';
    }

    switch (position.equipmentType) {
      case 'receiver':
        return 'blue';
      case 'receiver-transmitter':
        return 'orange';
      default:
        return 'brown';
    }
  };

  const getContentIcon = () => {
    if (indexMarkerType === 0) {
      return position.projectNumber;
    }
    return position.name;
  };

  return (
    <Placemark
      key={position.id}
      // modules={['geoObject.addon.hint']}
      modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
      geometry={position.coordinates}
      options={{
        preset: `islands#${getColorIcon()}${
          PLACEMARK_TYPE_ARRAY[indexMarkerType]
        }`,
      }}
      properties={{
        balloonContentBody: `
      <div>
        <div>
          ${position.id}
          ${position.name}
        </div>
        <div>
          ${position.equipmentType}
          ${position.boxingType}
          ${position.positionType}
        </div>
        <div>
          serv#:${position.mlatNumber}
          ip:${position.ip}
          vlan:${position.vlan}
        </div>
        <div>
          доступ: ${position.accessType}
        </div>
    </div>`,
        // iconCaption: item.showLabel || showLabels ? item.label : null,
        hintContent: `${position.id} ${position.name}`,
        iconContent: getContentIcon(),
      }}
    />
  );
}

export default CustomPlacemark;
