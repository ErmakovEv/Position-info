import {
  YMaps,
  Map as YandexMap,
  RouteButton,
  TypeSelector,
  ZoomControl,
  RulerControl,
  // Clusterer,
  // withYMaps,
  // useYMaps,
} from '@pbe/react-yandex-maps';
import CustomPlacemark from '../CustomPlacemark/CustomPlacemark';
import Position from '../../db/types';

type MapProps = {
  positions: Position[];
  indexMarkerType: number;
};

function Map({ positions, indexMarkerType }: MapProps) {
  return (
    <YMaps query={{ apikey: '5bf1dfe2-6837-415a-8c4d-7eabd85d601c' }}>
      <YandexMap
        defaultState={{ center: [59.938784, 30.314997], zoom: 10 }}
        width="100vw"
        height="100vh"
      >
        <ZoomControl
          options={{
            position: { right: 30, top: '50vh' },
            size: 'small',
          }}
        />
        <RouteButton options={{ float: 'right' }} />
        <TypeSelector />
        <RulerControl state={{ position: { right: 10, bottom: 30 } }} />

        {positions.map((pos) => (
          <CustomPlacemark
            position={pos}
            indexMarkerType={indexMarkerType}
            key={pos.id}
          />
        ))}

        {/* <Clusterer
        options={{
          preset: 'islands#invertedRedClusterIcons',
          groupByCoordinates: false,
        }}
      >
        {objects.features.map((item) => (
          <Placemark
            key={item.id}
            modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
            geometry={item.geometry.coordinates}
            options={{ preset: 'islands#blueSouvenirsIcon' }}
            properties={{
              balloonContentBody: '123',
              // iconCaption: item.showLabel || showLabels ? item.label : null,
              hintContent: '123',
              iconContent: '5',
            }}
          />
        ))}
      </Clusterer> */}
      </YandexMap>
    </YMaps>
  );
}

export default Map;
