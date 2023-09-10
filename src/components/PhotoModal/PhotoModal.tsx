import { Box, Modal, MobileStepper, Button } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';

type PhotoModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  photoArr: string[];
};

function PhotoModal({ isOpen, handleClose, photoArr }: PhotoModalProps) {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = photoArr.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <Box
        sx={{
          width: '80%',
          height: '80%',
          backgroundColor: 'white',
          mt: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{ height: '100%', width: '100%' }}
          component="img"
          src={photoArr[activeStep]}
        />
        <Box>
          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        </Box>
      </Box>
    </Modal>
  );
}

export default PhotoModal;
