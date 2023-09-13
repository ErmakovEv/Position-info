import { useState } from 'react';
import positions from '../../db/positions';
import Position from '../../db/types';
import Map from '../../components/Map/Map';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import DrawerPositions from '../../components/DrawerPositions/DrawerPositions';
import PhotoModal from '../../components/PhotoModal/PhotoModal';

export const MARKER_TYPE_ARRAY = ['projectNumber', 'projectName', 'workStatus'];

export default function MainPage() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [photoModalOpen, setPhotoModalOpen] = useState<boolean>(false);
  const [photoPos, setPhotoPos] = useState<string>('');
  const [filters, setFilters] = useState({
    searchInput: '',
    equipmentTypeFilter: 'All',
    boxingTypeFilter: 'All',
  });
  const [indexMarkerType, setIndexMarkerType] = useState<number>(0);

  const filterPositions = () => {
    return positions
      .filter((pos) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const key in pos) {
          if (
            pos[key as keyof Position].toString().includes(filters.searchInput)
          ) {
            return true;
          }
        }
        return false;
      })
      .filter((pos) => {
        if (filters.equipmentTypeFilter === 'All') return true;
        return pos.equipmentType === filters.equipmentTypeFilter;
      })
      .filter((pos) => {
        if (filters.boxingTypeFilter === 'All') return true;
        return pos.boxingType === filters.boxingTypeFilter;
      });
  };

  const filteredPositions = filterPositions();

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
      <Map positions={filteredPositions} indexMarkerType={indexMarkerType} />
      <BottomMenu
        drawerOpenCallBack={() => setDrawerOpen(!drawerOpen)}
        indexMarkerType={indexMarkerType}
        indexMarkerTypeHandler={() => {
          if (indexMarkerType === 2) setIndexMarkerType(0);
          else setIndexMarkerType(indexMarkerType + 1);
        }}
      />
      <DrawerPositions
        positions={filteredPositions}
        isOpen={drawerOpen}
        setOpen={() => setDrawerOpen(false)}
        searchInput={filters.searchInput}
        setSearchInput={(value: string) => {
          const newFilters = {
            ...filters,
            searchInput: value,
          };
          setFilters(newFilters);
        }}
        equipmentTypeFilter={filters.equipmentTypeFilter}
        setEquipmentTypeFilter={(value: string) => {
          const newFilters = {
            ...filters,
            equipmentTypeFilter: value,
          };
          setFilters(newFilters);
        }}
        boxingTypeFilter={filters.boxingTypeFilter}
        setBoxingTypeFilter={(value: string) => {
          const newFilters = {
            ...filters,
            boxingTypeFilter: value,
          };
          setFilters(newFilters);
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
