import React, { useState, useContext } from "react";
import { TextField } from '@mui/material'
import imgVector from '../../assets/images/HP-KK-01-BANNERP1-RUANG-KREATIF-1.jpg'
import logo from '../../assets/images/logo.png'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from "../../utils/Context";
import { apiRequest } from "../../utils/apiRequest";
import Loading from "../../components/Loading"
import Swal from "sweetalert2";

const Signup = () => {
    const { token, setToken } = useContext(TokenContext);

    const navigate = useNavigate()

    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [isEmailError,setIsEmailError] = useState(false)
    const [isPwdError, setIsPwdError] = useState(false)
    const [isNameError, setIsNameError] = useState(false)
    const [loading, setLoading] = useState(false)

    const postRegister = () => {
      setLoading(true)
      
      const body = { username, email, pwd }  
      
      apiRequest("register", "post", body)
          .then((res) => {
              const { code,message,data } = res;
              const { token,role } = data;
              
            switch (code) {
                case 200:
                  localStorage.setItem("token", token);
                  setToken(token);
                  role==='admin' ? navigate('/admin') : navigate('/')
                  break;

                case 400: Swal.fire(`Failed`,message,'error'); break;
                
                default: Swal.fire(`Code ${code}`,message,'info'); break;
              }
          })
        .catch((err) => {
            const errorMsg = err.message
            const { message } = err.response.data  
            Swal.fire(errorMsg,message,'error'); 
          })
          .finally(()=>setLoading(false))
    }
    
    const handleChange = (e, type) => {
      const val = e.target.value
      const obj = {
        'username': (val) => { setUsername(val); isNameError && setIsNameError(false)},
        'email': (val) => { setEmail(val);isEmailError && setIsEmailError(false) },
        'password': (val) => { setPwd(val); isPwdError && setIsPwdError(false) }
      }
      obj[type](val)
    }
    
    const handleSubmit = () => {
        // eslint-disable-next-line no-useless-escape
        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        let passed = 0
      
        username !== '' ? passed+=1 : setIsPwdError(true)
        re.test(email) ? passed+=1 : setIsEmailError(true)
        pwd !== '' ? passed+=1 : setIsPwdError(true)
        
        passed === 3 && postRegister()
    }

    if (token === "0") {
        if (loading) {
            return <Loading />
        } else {
            return (
                <div className='flex min-h-screen items-center'>
                    <div className='basis-full overflow-hidden relative' >
                        <div className="h-screen w-full absolute bg-black opacity-20" />
                        <img src={imgVector} alt="" className='h-screen w-auto object-cover' />
                    </div>
                    <div className='basis-full flex justify-center'>
                        <div className='flex-col gap-8 flex w-1/2'>
                            <img src={logo} alt="" id="img-goto-home" className="cursor-pointer w-2/3 self-center" onClick={()=>navigate('/')} />
                            <div className='flex flex-col gap-3 '>
                                <p className="font-bold text-3xl">Sign Up</p>
                                <div className='flex flex-col gap-1'>
                                    <TextField id="input-username" type="text" value={username} label="Username" variant="outlined" onChange={(e) => handleChange(e,'username')} error={isNameError}/>
                                    {isNameError && <span className='text-xs text-red-600'>Please check your username again</span>}
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <TextField id="input-email" type="email" value={email} label="Email" variant="outlined" onChange={(e) => handleChange(e,'email')} error={isEmailError}/>
                                    {isEmailError && <span className='text-xs text-red-600'>Please check your email again</span>}
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <TextField id="input-password" type="password" value={pwd} label="Password" variant="outlined" onChange={(e) => handleChange(e,'password')} error={isPwdError}/>
                                    {isPwdError && <span className='text-xs text-red-600'>Please check your password again</span>}
                                </div>
                            </div>
                            <div className='flex flex-col items-center font-bold'>
                                <button id="button-submit" className="bg-red-600 hover:bg-red-800 py-2 px-16 rounded text-white" onClick={() => handleSubmit()}>Sign Up</button>
                                <p className='font-normal mt-6'>
                                  Already have an account?<Link id="link-goto-login" to={'/login'}><span className="text-red-600 hover:text-red-800"> Login</span></Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    } else {
        return <Navigate to={'/'} />
    }
}

export default Signup
