import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import CurrencyFormat from 'react-currency-format';
import { apiRequest } from '../utils/apiRequest';
import Swal from 'sweetalert2';

function Addproduct() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [detail, setDetail] = useState('')
    const [isNameError,setIsNameError] = useState(false)
    const [loading, setLoading] = useState(false)

    const apiPostProduct = () => {
        setLoading(true)
        const formData = new FormData();
        formData.append("image",image)
        formData.append("name",name)
        formData.append("stock",stock)
        formData.append("price",price)
        formData.append("details",detail)

        apiRequest("products", "post", formData, {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        })
        .then((res) => {
            const { code,message } = res;
            
        switch (code) {
            case '200':
                Swal.fire(`Success`, message, 'success')
                .then(() => navigate('/my-product'));
                break;

            case '400': Swal.fire(`Failed`,message,'error'); break;
            default: Swal.fire(`Code ${code}`,message,'info'); break;
            }
        })
        .catch((err) => {
            const errorMsg = err.message
            let msg
            if (err.response.data) msg = err.response.data.message 
            Swal.fire(errorMsg,msg,'error'); 
        })
        .finally(()=>setLoading(false))
    }

    const checkFile = (target, size, reqTypes, message, callback) => {
        const file = target.files[0]
        if (file) {
            let passed = 0
            if (file.size > size) {
                Swal.fire('File to large', message.size , 'error')
                target.value=null
            } else { passed++ }
            if (!reqTypes.includes(file.type)) {
                Swal.fire('Wrong input', message.format , 'error')
                target.value=null
            } else { passed++ }
            passed === 2 && callback(file)  
        }
    }

    const handleChange = (e, type) => {
    const val = e.target
      const obj = {
        'image': (target) => checkFile(
            target,
              1050000,
              ['image/jpg','image/jpeg','image/png'],
              {
                  size: 'file input must below 1.05 Mb',
                  format: 'format file must jpg,jpeg,png'
              },
              setImage
        ),
        'name': (target) => { setName(target.value)},
        'price': (target)=>setPrice(target.value.split('.').join("")),
        'stock': (target)=>setStock(target.value.split('.').join("")),
        'detail': (target)=>setDetail(target.value)
      }
      obj[type](val)
    }

    const handleSubmit = () => {
        const regText = /^[A-Za-z ]+$/;
        let passed = 0
        image !== "" && passed++
        if (name !== "" && regText.test(name)) {
            passed++
            const tempName = name
            setName(tempName.trim())
        } else {
            setIsNameError(true)
        }
        stock !== "" && passed++
        price !== "" && passed++
        detail !== "" && passed++
        
        passed === 5 ? apiPostProduct() : Swal.fire('Important', 'all field must be filled', 'error')
    }

    if (!isLoggedIn) {
        navigate('/login')
    } else {
        if (loading) {
            return <Loading />
        } else {
            return (
                <Layout>
                    <div className='w-full flex flex-col sm:flex-row mt-12 min-h-[80vh]'>
                        <Sidebar active={"umkm"} />
                        <div className="basis-5/6">
                            <p className='font-bold text-lg'>Add Product</p>
                            <div className="pr-20">
                                <div className="flex flex-row my-2 items-center">
                                    <label className="basis-1/6">
                                        Product Name
                                    </label>
                                    <div className="basis-5/6">
                                        <input id='input-name' type={"text"} value={name} onChange={(e) => handleChange(e, "name")} className="border-[0.1rem] rounded p-2 w-full" placeholder="Title"></input>
                                        {isNameError && <span className='text-xs text-red-600'>Field must be filled and only alphabetic characters</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="pr-20">
                                <div className="flex flex-row my-2 items-center">
                                    <label className="basis-1/6">
                                        Image
                                    </label>
                                    <div className="basis-5/6 ">
                                        <div className="flex items-end border-[0.1rem] rounded p-2 w-full gap-2">
                                            <input id='input-photo' type={"file"} accept="image/jpg,image/jpeg,image/png" onChange={(e) => handleChange(e, "image")} ></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pr-20">
                                <div className="flex flex-row my-2 items-center">
                                    <label className="basis-1/6">
                                        Price
                                    </label>
                                    <div className="basis-5/6">
                                        <div className="border-[0.1rem] flex rounded w-full">
                                            <div className='bg-slate-200 p-2'>Rp.</div>
                                            <CurrencyFormat id='input-price' thousandSeparator="." decimalSeparator=',' value={price} onChange={(e) => handleChange(e, "price")} className="p-2 w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pr-20">
                                <div className="flex flex-row my-2 items-center">
                                    <label className="basis-1/6">
                                        Stock
                                    </label>
                                    <div className="basis-5/6">
                                        <CurrencyFormat id='input-stock' value={stock} onChange={(e) => handleChange(e, "stock")} className="border-[0.1rem] rounded p-2 w-full" />
                                    </div>
                                </div>
                            </div>
                            <div className='pr-20'>
                                <div className="flex flex-row my-2 items-center">
                                    <label className="basis-1/6 self-start">
                                        Detail
                                    </label>
                                    <div className="basis-5/6">
                                        <textarea id='input-detail' type={"text"} value={detail} onChange={(e) => handleChange(e, "detail")} className="border-[0.1rem] rounded p-2 w-full h-56" placeholder="Detail" />
                                    </div>
                                </div>
                            </div>
                            <div className='pr-20'>
                                <div className="flex flex-row my-5 mb-10 items-center justify-end">
                                    <button id='button-submit' className="font-bold py-2 px-20 bg-red-600 hover:bg-red-700 text-white rounded" onClick={() => handleSubmit()}>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            )
        }
    }
}

export default Addproduct