import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Modal } from '@mui/material';
import { Rating } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import HorizontalLinearStepper from '../components/Stepper';
import { BsStar } from 'react-icons/bs'

export default function Historyorder() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [openData, setOpenData] = useState([]);
    const [modal, setModal] = useState(false)
    const [product, setProduct] = useState('')
    const [rating, setRating] = useState('')
    const [review, setReview] = useState('')
    const [loading,setLoading] = useState(false)
    const [stepper, setStepper] = useState(false)

    const showStepper = () => setStepper(true)
    const closeStepper = () => setStepper(false)
    const showModal = (val) => {
        setProduct(val)
        setModal(true);
    };
    const closeModal = () => {
        setProduct('')
        setReview('')
        setRating('')
        setModal(false);
    };

   const handleClick = (id) => {
        setOpenData((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    };
    
    const handleChange = (e, type) => {
        const val = e.target.value
        const obj = {
            'rating':(value)=>setRating(value),
            'review':(value)=>setReview(value),
        }
        obj[type](val)
    }

    const data = [
        {
            id:'1',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product B' }
            ],
        },
        {
            id:'2',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product A' },
                { name: 'Product B' },
                { name: 'Product C' },
                { name: 'Product D' },
            ],
        },
        {
            id:'3',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product A' }
            ],
        },
        {
            id:'1',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product B' }
            ],
        },
        {
            id:'2',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product A' },
                { name: 'Product B' },
                { name: 'Product C' },
                { name: 'Product D' },
            ],
        },
        {
            id:'3',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product A' }
            ],
        },
        {
            id:'1',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product B' }
            ],
        },
        {
            id:'2',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product A' },
                { name: 'Product B' },
                { name: 'Product C' },
                { name: 'Product D' },
            ],
        },
        {
            id:'3',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product A' }
            ],
        },
        {
            id:'1',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product B' }
            ],
        },
        {
            id:'2',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product A' },
                { name: 'Product B' },
                { name: 'Product C' },
                { name: 'Product D' },
            ],
        },
        {
            id:'3',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product A' }
            ],
        },
        {
            id:'1',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product B' }
            ],
        },
        {
            id:'2',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product A' },
                { name: 'Product B' },
                { name: 'Product C' },
                { name: 'Product D' },
            ],
        },
        {
            id:'3',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product A' }
            ],
        },
        {
            id:'1',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product B' }
            ],
        },
        {
            id:'2',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product A' },
                { name: 'Product B' },
                { name: 'Product C' },
                { name: 'Product D' },
            ],
        },
        {
            id:'3',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product A' }
            ],
        },
        {
            id:'1',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product B' }
            ],
        },
        {
            id:'2',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product A' },
                { name: 'Product B' },
                { name: 'Product C' },
                { name: 'Product D' },
            ],
        },
        {
            id:'3',
            date:'12-02-2022',
            receiver:'Reciever',
            city:'Malang',
            price:'Rp.15.000',
            status:'success',
            cart: [
                { name: 'Product A' }
            ],
        },
    ]

    if (!isLoggedIn) {
        navigate('/login')
    } else {
        if (loading) {
            return <Loading />
        } else {
            return (
                <Layout>
                    <div className='w-full flex flex-col sm:flex-row mt-12 min-h-[80vh]'>
                        <Sidebar active="history-order" />
                        <div className='basis-5/6'>
                            <p className='font-bold text-lg'>History Order</p>
                            <div className='flex flex-col gap-4 p-4'>
                                <List
                                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                >
                                    <ListItemButton>
                                        <div className='w-full h-full flex p-2 font-bold'>
                                            <div className='basis-1/5'>Transaction Date</div>
                                            <div className='basis-1/5'>Receiver</div>
                                            <div className='basis-1/5'>City</div>
                                            <div className='basis-1/5'>Total</div>
                                            <div className='basis-1/5'>Status</div>
                                        </div>
                                    </ListItemButton>
                                    <div className='h-[60vh] overflow-y-scroll border-t-2 border-slate-100'>
                                        {
                                            data.map((item, idx) => (
                                                < div key={idx}>
                                                    <ListItemButton onClick={() => handleClick(idx)}>
                                                        <div className='w-full h-full flex p-2'>
                                                            <div className='basis-1/5'>{item.date}</div>
                                                            <div className='basis-1/5'>{item.receiver}</div>
                                                            <div className='basis-1/5'>{item.city}</div>
                                                            <div className='basis-1/5'>{item.price}</div>
                                                            <div className='basis-1/5 flex justify-between'>{item.status}
                                                                <span>{openData[idx] ? <ExpandLess /> : <ExpandMore />}</span>
                                                            </div>
                                                        </div>
                                                    </ListItemButton>
                                                    <Collapse in={openData[idx]} timeout="auto" unmountOnExit>
                                                        <List component="div" disablePadding>
                                                            {item.cart.map((subitem, idx) => (
                                                                <div className='w-full h-full justify-between flex p-6 bg-gray-100' key={idx}>
                                                                    <div className='basis-3/5'>{subitem.name}</div>
                                                                    <div className='flex-1'>
                                                                        Rp.15.000
                                                                    </div>
                                                                    <div className='basis-1/5'>
                                                                        <button className='rounded p-2 bg-red-600 text-white text-sm flex items-center gap-2' onClick={() => showModal(subitem)}> <BsStar/> Give Ratings </button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </List>
                                                    </Collapse>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </List>
                                <Modal
                                    open={modal}
                                    onClose={closeModal}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <div className='absolute rounded top-[20%] left-[40%] bg-white border-2 p-4 flex flex-col'>
                                        <p className='font-bold text-2xl'>{product.name}</p>
                                        <p className=''>Rating</p>
                                        <Rating name="size-large" value={rating} onChange={(e) => handleChange(e,'rating')} size="large" />
                                        <p className=''>Review</p>
                                        <textarea id='input-detail' value={review} className="border-[0.1rem] rounded p-2 w-full h-48" onChange={(e)=> handleChange(e,'review')} placeholder="Detail"></textarea>
                                        <button className='rounded p-2 bg-red-600 text-white my-4 flex gap-2 items-center justify-center' onClick={()=>closeModal()}> <BsStar/> Give Ratings </button>
                                    </div>
                                </Modal>
                                <button className='rounded p-2 bg-red-600 text-white my-4' onClick={()=>showStepper()}> tes stepper </button>
                                <Modal
                                    open={stepper}
                                    onClose={closeStepper}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <div className='absolute rounded p-6 pt-8 bg-white w-1/2 top-[20%] left-1/4'>
                                        <HorizontalLinearStepper />
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </Layout>
            )
        }
    }
}