import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import positions from '../../db/positions';
import Position from '../../db/types';
import Map from '../../components/Map/Map';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import DrawerPositions from '../../components/DrawerPositions/DrawerPositions';
import PhotoModal from '../../components/PhotoModal/PhotoModal';

type ResponseType = {
  c19: {
    remote_sensor: Array<{ online: boolean; id: number }>;
  };
};

export default function MainPage() {
  const [positionsData, setPositionsData] = useState<Position[]>(positions);
  const [stations, setStations] = useState<Position[]>([]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [photoModalOpen, setPhotoModalOpen] = useState<boolean>(false);
  const [photoPos, setPhotoPos] = useState<string>('');
  const [filters, setFilters] = useState({
    searchInput: '',
    equipmentTypeFilter: 'All',
    boxingTypeFilter: 'All',
  });
  const [indexMarkerType, setIndexMarkerType] = useState<number>(0);

  useEffect(() => {
    const { searchInput, equipmentTypeFilter, boxingTypeFilter } = filters;

    const newStations = positionsData.filter((item) => {
      return Object.keys(item).find((key) => {
        if (item[key as keyof Position].toString().includes(searchInput)) {
          if (
            (equipmentTypeFilter === 'All' ||
              item.equipmentType === equipmentTypeFilter) &&
            (boxingTypeFilter === 'All' || boxingTypeFilter === item.boxingType)
          )
            return true;
        }
        return false;
      });
    });
    setStations(newStations);
  }, [positionsData, filters]);

  const fetchWorkingSatus = () => {
    axios
      .get('https://server.ermakov-evgeny.ru/proxy')
      .then((response: AxiosResponse<ResponseType>) => {
        const newStations = [...positions];
        newStations.forEach((item) => {
          const findedStation = response.data.c19.remote_sensor.find(
            (sensor) => sensor.id === item.mlatNumber
          );
          // eslint-disable-next-line no-param-reassign
          item.isWorking = findedStation?.online || false;
        });
        setPositionsData(newStations);
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchWorkingSatus();
    const intervalID = setInterval(fetchWorkingSatus, 10000);
    return () => clearInterval(intervalID);
  }, []);

  const photoModalHandler = (id: string) => {
    setPhotoPos(id);
    setPhotoModalOpen(true);
  };

  const getPhotoFromPositionsArr = () => {
    let photoArr: string[] = [];
    positions.forEach((item) => {
      if (item.id === photoPos) photoArr = item.image;
    });
    return photoArr;
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Map positions={stations} indexMarkerType={indexMarkerType} />
      <BottomMenu
        drawerOpenCallBack={() => setDrawerOpen(!drawerOpen)}
        indexMarkerType={indexMarkerType}
        indexMarkerTypeHandler={() => {
          if (indexMarkerType === 2) setIndexMarkerType(0);
          else setIndexMarkerType(indexMarkerType + 1);
        }}
      />
      <DrawerPositions
        positions={stations}
        isOpen={drawerOpen}
        setOpen={() => setDrawerOpen(false)}
        searchInput={filters.searchInput}
        setSearchInput={(value: string) => {
          const newFilters = {
            ...filters,
            searchInput: value,
          };

          const newPos = positions.filter((pos) => {
            // eslint-disable-next-line no-restricted-syntax
            for (const key in pos) {
              if (pos[key as keyof Position].toString().includes(value)) {
                return true;
              }
            }
            return false;
          });
          setFilters(newFilters);
          setStations(newPos);
        }}
        equipmentTypeFilter={filters.equipmentTypeFilter}
        setEquipmentTypeFilter={(value: string) => {
          const newFilters = {
            ...filters,
            equipmentTypeFilter: value,
          };
          const newPos = positions.filter((pos) => {
            if (value === 'All') return true;
            return pos.equipmentType === value;
          });
          setFilters(newFilters);
          setStations(newPos);
        }}
        boxingTypeFilter={filters.boxingTypeFilter}
        setBoxingTypeFilter={(value: string) => {
          const newFilters = {
            ...filters,
            boxingTypeFilter: value,
          };

          const newPos = positions.filter((pos) => {
            if (value === 'All') return true;
            return pos.boxingType === value;
          });
          setFilters(newFilters);
          setStations(newPos);
        }}
        photoModalHandler={photoModalHandler}
      />
      <PhotoModal
        isOpen={photoModalOpen}
        handleClose={() => setPhotoModalOpen(false)}
        photoArr={getPhotoFromPositionsArr()}
      />
    </div>
  );
}
