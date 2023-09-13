import { Box, IconButton } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCommentIcon from '@mui/icons-material/AddComment';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ICON_ARRAY = [
  <FmdBadIcon sx={{ color: '#514f4f' }} />,
  <AddCommentIcon sx={{ color: '#514f4f' }} />,
  <AddCircleIcon sx={{ color: '#514f4f' }} />,
];

type BottomMenuProps = {
  drawerOpenCallBack: () => void;
  indexMarkerType: number;
  indexMarkerTypeHandler: () => void;
};

function BottomMenu({
  drawerOpenCallBack,
  indexMarkerType,
  indexMarkerTypeHandler,
}: BottomMenuProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        zIndex: 1000,
        bottom: '12%',
        width: '100%',
      }}
    >
      <Box
        sx={{
          bgcolor: 'white',
          width: 200,
          height: 50,
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          boxShadow: '1px 2px 1px rgba(0,0,0,.15)',
        }}
      >
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          onClick={() => drawerOpenCallBack()}
        >
          <FormatListBulletedIcon sx={{ color: '#514f4f' }} />
        </IconButton>
        <IconButton onClick={indexMarkerTypeHandler}>
          {ICON_ARRAY[indexMarkerType]}
        </IconButton>
        <IconButton>
          <LogoutIcon sx={{ color: '#514f4f' }} />
        </IconButton>
      </Box>
    </div>
  );
}

export default BottomMenu;
