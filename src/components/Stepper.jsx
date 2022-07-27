import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import CurrencyFormat from 'react-currency-format';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { MdOutlineDangerous } from 'react-icons/md';
import { CircularProgress } from '@mui/material';
import { Autocomplete } from '@mui/material';
import moment from 'moment';

const steps = ['Payment Details', 'Finish Payment'];

export default function HorizontalLinearStepper( { isSuccess,paymentCode,searchMap,totalPrice,inputAddress,cart,apiPost,loadApi,handleSubmitPayment,handleChangePayment,bank,address,receiver,phone,error,setError,handleReset } ) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep + 1 === steps.length) {
      window.print()
      
    } else {
      if (handleSubmitPayment()) {
        apiPost()
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      } else {
        setError(true)
      }
    }
  };
    
const Page = [
    (    
        <div className='flex flex-col gap-2 pt-0 text-sm'>
            <div className='font-bold text-lg my-2'>
                Payment Details
                <p className='font-thin'>Enter your personal detail to complete the transaction</p>
            </div>
            <div className="flex flex-row items-center">
                <label className="basis-1/6">
                    Bank
                </label>
                <div className="basis-5/6">
                    <ToggleButtonGroup
                        color='primary'
                        value={bank}
                        exclusive
                        onChange={(e,val)=>handleChangePayment(val,'bank')}
                        size='large'
                    >
                        <ToggleButton value="permata">
                            <img src={'https://www.lokernas.id/wp-content/uploads/2020/02/1200px-PermataBank_logo.svg_.png'} alt="" width={50} />
                        </ToggleButton>
                        <ToggleButton value="mandiri">
                            <img src={'https://logos-download.com/wp-content/uploads/2016/06/Mandiri_logo.png'} alt="" width={50} />
                        </ToggleButton>
                        <ToggleButton value="bri">
                            <img src={'https://rekreartive.com/wp-content/uploads/2019/04/Logo-BRI-Bank-Rakyat-Indonesia-PNG-Terbaru.png'} alt="" width={50} />
                        </ToggleButton>
                        <ToggleButton value="bni">
                            <img src={'https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/1200px-BNI_logo.svg.png'} alt="" width={50} />
                        </ToggleButton>
                        <ToggleButton value="bca">
                            <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1280px-Bank_Central_Asia.svg.png'} alt="" width={50} />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
            <div className="flex flex-row items-center">
                <label className="basis-1/6">
                    Receiver
                </label>
                <div className="basis-5/6">
                    <input id='input-name' type={"text"} value={receiver} onChange={(e)=>handleChangePayment(e,'receiver')} className="border-[0.1rem] rounded p-2 w-full" placeholder="Name"></input>
                    {/* {isNameError && <span className='text-xs text-red-600'>Field must be filled and only alphabetic characters</span>} */}
                </div>
            </div>
            <div className="flex flex-row items-center">
                <label className="basis-1/6">
                    Address
                </label>
                <div className="basis-5/6">
                  <Autocomplete
                        value={address}
                        onChange={(event, newValue) => handleChangePayment(newValue,'address')}
                        inputValue={inputAddress}
                        onInputChange={(event, newInputValue) => handleChangePayment(newInputValue,'inputAddress')}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        noOptionsText={'Address Not Found...'}
                        options={searchMap.map((item) => item.label)}
                        renderInput={(params) => (
                          <div ref={params.InputProps.ref}>
                                <input type="text" {...params.inputProps} className='border-[0.1rem] rounded p-2 w-full'/>
                            </div>)}
                    />
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
                        <CurrencyFormat id='input-phone' className="p-2 w-full" maxLength={13} value={phone} onChange={(e)=>handleChangePayment(e,'phone')} />
                    </div>
                    {/* {isPhoneError && <span className='text-xs text-red-600'>Minimum phone number is 10</span>} */}
                </div>
            </div>
            {error && (
              <div className="flex flex-row text-red-600 items-center justify-end">
                *All Field Must be filled
              </div>
            )}
        </div>   
    ),
    (loadApi ? (
        <div className='flex flex-col gap-2 text-sm w-full p-12 justify-center items-center'>
          <CircularProgress />
          Payment in progress ...
        </div>
    ) : (
        !isSuccess ? (  
            <div>
              <div className='flex flex-col gap-2 pt-0 text-sm'>
                  <div className='font-bold text-lg my-2 flex items-center justify-between'>
                      <div>
                        Finish Payment
                        <p className='font-thin'>Complete transaction</p>
                      </div>
                      <MdOutlineDangerous className='text-4xl font-bold text-red-600'/>
                  </div>
                  <div className="flex justify-center gap-2 items-center">
                    <span className='text-4xl font-bold'> Transaction Payment Failed </span> 
                </div>
                  <div className="flex justify-center gap-2 items-center">
                    <span className='text-2xl font-thin cursor-pointer' onClick={()=>apiPost()}> Try Again </span> 
                </div>
              </div>
            </div>
        ): (
        <div>
            <div className='flex flex-col gap-2 pt-0 text-sm'>
                <div className='font-bold text-lg my-2 flex items-center justify-between'>
                    <div>
                      Finish Payment {isSuccess}
                      <p className='font-thin'>Complete transaction</p>
                    </div>
                    <IoMdCheckmarkCircleOutline className='text-4xl font-bold text-green-600'/>
                </div>
                <div className="flex justify-center gap-2 items-center">
                    <span className='text-2xl font-bold'> {paymentCode} </span> 
                </div>
                <div className="flex justify-center">
                  <div className='p-1 rounded space-x-1 text-xs items-center bg-orange-100 text-orange-800'>
                    payment due date : <span className='font-bold'>{ moment().add(1,'days').format('DD MMMM YYYY, h:mm a')}</span> 
                  </div>        
                </div>
                <div className='border-dashed border-b-2 border-slate-200 pb-2'>
                  <div className="flex justify-between items-center">
                    <p className='basis-1/2'>Receiver</p>
                    <p className='basis-1/2'>{receiver}</p>
                  </div>
                  <div className="flex justify-between items-start">
                    <p className='basis-1/2'>Address</p>
                    <p className='basis-1/2'>{address}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className='basis-1/2'>Phone</p>
                    <p className='basis-1/2'>{phone}</p>
                  </div>
                </div>
                  <div className="font-bold text-sm flex justify-between items-center">
                    <p className='basis-1/3'> <u> Product </u></p>
                    <p className='basis-1/3 text-center'> <u> Qty </u></p>
                    <p className='basis-1/3 text-right'> <u> Price </u></p>
                  </div>
            {
              cart.map((item,idx) => (
                <div className="flex justify-between items-center" key={idx}>
                  <p className='basis-1/3'>{item.name}</p>
                  <p className='basis-1/3 text-center'>{item.qty}</p>
                  <CurrencyFormat className='basis-1/3 text-right' value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp.'} />
                </div>
                ))
            }
            </div>  
            <p className='border-t-2 border-dashed mt-4 text-sm pt-2 flex justify-between border-slate-300'>
              Total :
              <CurrencyFormat className='font-bold' value={totalPrice} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp.'} /> 
            </p>   
        </div > 
        )  
    ) 
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
      <React.Fragment>
      <div className='p-4 pb-0'>
          {Page[activeStep]}           
      </div>            
        <Box sx={{ display: 'flex', justifyContent:'end', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Print' : 'Next'}
          </Button>
        </Box>
      </React.Fragment>
    </Box>
  );
}
