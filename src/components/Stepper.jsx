import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CurrencyFormat from 'react-currency-format';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const steps = ['Detail', 'Method', 'Finish'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
    
const Page = [
    (    
        <div className='flex flex-col gap-2 pt-0 text-sm'>
            <p className='font-bold text-lg my-2'>
                Payment Details
                <p className='font-thin'>Enter your personal detail to complete the transaction</p>
            </p>
            <div className="flex flex-row items-center">
                <label className="basis-1/6">
                    Reciever
                </label>
                <div className="basis-5/6">
                    <input id='input-name' type={"text"} className="border-[0.1rem] rounded p-2 w-full" placeholder="Name"></input>
                    {/* {isNameError && <span className='text-xs text-red-600'>Field must be filled and only alphabetic characters</span>} */}
                </div>
            </div>
            <div className="flex flex-row items-center">
                <label className="basis-1/6">
                    Address
                </label>
                <div className="basis-5/6">
                    <input id='input-host' type={"text"} className="border-[0.1rem] rounded p-2 w-full" placeholder="Address"></input>
                    {/* {isHostError && <span className='text-xs text-red-600'>Field must be filled and only alphabetic characters</span>} */}
                </div>
            </div>
            <div className="flex flex-row items-center">
                <label className="basis-1/6">
                    Phone
                </label>
                <div className="basis-5/6">
                    <div className="border-[0.1rem] flex rounded w-full">
                        <div className='bg-slate-200 p-2'>+62</div>
                        <CurrencyFormat id='input-phone' className="p-2 w-full" maxLength={13} />
                    </div>
                    {/* {isPhoneError && <span className='text-xs text-red-600'>Minimum phone number is 10</span>} */}
                </div>
            </div>
        </div>   
    ),
    (    
        <div className='flex flex-col gap-2 pt-0 text-sm'>
            <p className='font-bold text-lg my-2'>
                Payment Method
                <p className='font-thin'>Choose your payment method</p>
            </p>
            <div className="flex flex-row items-center">
                <label className="basis-1/6">
                    Bank
                </label>
                <div className="basis-5/6">
                    <ToggleButtonGroup
                        color='primary'
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                        size='large'
                    >
                        <ToggleButton value="permata" aria-label="left aligned">
                            <img src={'https://www.lokernas.id/wp-content/uploads/2020/02/1200px-PermataBank_logo.svg_.png'} alt="" width={50} />
                        </ToggleButton>
                        <ToggleButton value="mandiri" aria-label="centered">
                            <img src={'https://logos-download.com/wp-content/uploads/2016/06/Mandiri_logo.png'} alt="" width={50} />
                        </ToggleButton>
                        <ToggleButton value="bri" aria-label="right aligned">
                            <img src={'https://rekreartive.com/wp-content/uploads/2019/04/Logo-BRI-Bank-Rakyat-Indonesia-PNG-Terbaru.png'} alt="" width={50} />
                        </ToggleButton>
                        <ToggleButton value="bni" aria-label="justified">
                            <img src={'https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/1200px-BNI_logo.svg.png'} alt="" width={50} />
                        </ToggleButton>
                        <ToggleButton value="bca" aria-label="justified">
                            <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1280px-Bank_Central_Asia.svg.png'} alt="" width={50} />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
            <div className="flex flex-row items-center">
                <label className="basis-1/6">
                    CardHolder Name
                </label>
                <div className="basis-5/6">
                    <input id='input-name' type={"text"} className="border-[0.1rem] rounded p-2 w-full" placeholder="-"></input>
                    {/* {isNameError && <span className='text-xs text-red-600'>Field must be filled and only alphabetic characters</span>} */}
                </div>
            </div>
            <div className="flex flex-row items-center">
                <label className="basis-1/6">
                    Card Number
                </label>
                <div className="basis-5/6">
                    <input id='input-name' type={"text"} className="border-[0.1rem] rounded p-2 w-full" placeholder="-"></input>
                    {/* {isNameError && <span className='text-xs text-red-600'>Field must be filled and only alphabetic characters</span>} */}
                </div>
            </div>
        </div>   
    ),
    (    
        <div>
            <div className='flex flex-col gap-2 pt-0 text-sm'>
                <p className='font-bold text-lg my-2'>
                    Finish Payment
                    <p className='font-thin'>Complete transaction</p>
                </p>
                <div className="flex flex-row items-center"></div>
            </div>
        </div>   
    )
  ]

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
        <div className='p-4 pb-0'>
            {Page[activeStep]}
            <p className='border-t-2 mt-4 text-sm pt-2 flex justify-between border-slate-100'>
               Total : <span className='text-lg'> Rp.15.000</span>               
            </p>              
        </div>            
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}