import { Box, IconButton } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import LogoutIcon from '@mui/icons-material/Logout';

type BottomMenuProps = {
  drawerOpenCallBack: () => void;
};

function BottomMenu({ drawerOpenCallBack }: BottomMenuProps) {
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
        <IconButton>
          <FmdBadIcon sx={{ color: '#514f4f' }} />
        </IconButton>
        <IconButton>
          <LogoutIcon sx={{ color: '#514f4f' }} />
        </IconButton>
      </Box>
    </div>
  );
}

export default BottomMenu;
