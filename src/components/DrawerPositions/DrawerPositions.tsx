// import * as React from 'react';
// import Box from '@mui/material/Box';
import {
  Box,
  Drawer,
  ListItem,
  List,
  Divider,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircleIcon from '@mui/icons-material/Circle';
import Position from '../../db/types';

// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

type DrawerPositionsType = {
  positions: Position[];
  isOpen: boolean;
  setOpen: () => void;
  searchInput: string;
  setSearchInput: (value: string) => void;
  equipmentTypeFilter: string;
  setEquipmentTypeFilter: (filter: string) => void;
  boxingTypeFilter: string;
  setBoxingTypeFilter: (filter: string) => void;
  photoModalHandler: (id: string) => void;
};

export default function DrawerPositions({
  positions,
  isOpen,
  setOpen,
  searchInput,
  setSearchInput,
  equipmentTypeFilter,
  setEquipmentTypeFilter,
  boxingTypeFilter,
  setBoxingTypeFilter,
  photoModalHandler,
}: DrawerPositionsType) {
  return (
    <Drawer anchor="left" open={isOpen} onClose={() => setOpen()}>
      <Box sx={{ mb: 2, width: '300px', zIndex: 1001 }}>
        <List>
          <ListItem button>
            <TextField
              id="outlined-basic"
              label="Поиск"
              variant="outlined"
              sx={{ width: '100%' }}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Оборудование
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={equipmentTypeFilter}
                onChange={(e) => setEquipmentTypeFilter(e.target.value)}
              >
                <div style={{ display: 'flex' }}>
                  <div>
                    <FormControlLabel
                      value="All"
                      control={<Radio />}
                      label="Все"
                    />
                    <FormControlLabel
                      value="receiver"
                      control={<Radio />}
                      label="ПрС"
                      disabled={
                        !positions.find(
                          (item) => item.equipmentType === 'receiver'
                        )
                      }
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="receiver-transmitter"
                      control={<Radio />}
                      label="ПрПС"
                      disabled={
                        !positions.find(
                          (item) =>
                            item.equipmentType === 'receiver-transmitter'
                        )
                      }
                    />
                    <FormControlLabel
                      value="server"
                      control={<Radio />}
                      label="ЦДП"
                      disabled={
                        !positions.find(
                          (item) => item.equipmentType === 'server'
                        )
                      }
                    />
                  </div>
                </div>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Исполнение
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={boxingTypeFilter}
                onChange={(e) => setBoxingTypeFilter(e.target.value)}
              >
                <div style={{ display: 'flex' }}>
                  <div>
                    <FormControlLabel
                      value="All"
                      control={<Radio />}
                      label="Все"
                    />
                    <FormControlLabel
                      value="box"
                      control={<Radio />}
                      label="Бокс"
                      disabled={
                        !positions.find((item) => item.boxingType === 'box')
                      }
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="termobox"
                      control={<Radio />}
                      label="Тербокс"
                      disabled={
                        !positions.find(
                          (item) => item.boxingType === 'termobox'
                        )
                      }
                    />
                    <FormControlLabel
                      value="rock"
                      control={<Radio />}
                      label="Шкаф"
                      disabled={
                        !positions.find((item) => item.boxingType === 'rock')
                      }
                    />
                  </div>
                </div>
              </RadioGroup>
            </FormControl>
          </ListItem>
          {/* <ListItem>
            <ListItemText primary="Исполнение" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Позиция" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Ввод в эксплуатацию" />
          </ListItem>
          <Divider /> */}
        </List>
      </Box>
      <Divider />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {positions.map((item) => (
            <div key={item.id}>
              <ListItem>
                {/* <ListItemText primary={item.name} /> */}
                <Accordion sx={{ width: 300 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    {/* <Box
                     
                    > */}
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box sx={{ display: 'flex' }}>
                        <Typography variant="body2">
                          <span>{item.projectNumber}.</span>
                        </Typography>
                        <Typography variant="body2">
                          <span>{item.name}</span>
                        </Typography>
                      </Box>

                      <CircleIcon
                        sx={{ mr: 2, color: item.isWorking ? 'green' : 'red' }}
                        fontSize="small"
                      />
                    </Box>

                    {/* </Box> */}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">
                      id: <span style={{ fontWeight: 900 }}>{item.id}</span>
                    </Typography>
                    <Typography variant="body2">
                      Тип оборудования:{' '}
                      <span style={{ fontWeight: 900 }}>
                        {item.equipmentType}
                      </span>
                    </Typography>
                    <Typography variant="body2">
                      Исполнение:{' '}
                      <span style={{ fontWeight: 900 }}>{item.boxingType}</span>
                    </Typography>
                    <Typography variant="body2">
                      Тип позиции:{' '}
                      <span style={{ fontWeight: 900 }}>
                        {item.positionType}
                      </span>
                    </Typography>
                    <Typography variant="body2">
                      Доступ:{' '}
                      <span style={{ fontWeight: 900 }}>{item.accessType}</span>
                    </Typography>
                    <Typography variant="body2">
                      serv#:{' '}
                      <span style={{ fontWeight: 900 }}>{item.mlatNumber}</span>{' '}
                      vlan: <span style={{ fontWeight: 900 }}>{item.vlan}</span>{' '}
                      ip: <span style={{ fontWeight: 900 }}>{item.ip}</span>
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{ display: 'block', margin: '0 auto' }}
                      onClick={() => photoModalHandler(item.id)}
                    >
                      <Typography variant="body2">Фото</Typography>
                    </Button>
                  </AccordionDetails>
                </Accordion>
              </ListItem>
            </div>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
