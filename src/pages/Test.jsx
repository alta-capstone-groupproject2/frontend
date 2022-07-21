import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Test() {
let [searchParams, setSearchParams] = useSearchParams();
    const [nama,setNama] = useState('')
    const [city,setCity] = useState('')
    useEffect(() => {
        searchParams.get('name') ? setNama(searchParams.get('name')) : setNama('')
        searchParams.get('city') ? setCity(searchParams.get('city')) : setCity('')
    }, [])
    const handleChange = (e,type) => {
        const val = e.target.value

    // menngubah format searchParams yg awalnya {[key,value],[key,value]} jadi {key:value,key:value} 
    // agar key name dan city yg ada di searchParams tidak hilang kalau ada salah satu yg berubah
        const params = {}
        searchParams.forEach((value, key) => {
                params[key]=value
        });
        let newSearch = {...params}
        
        if (type === 'name') {
    // kondisi kalau input tidak kosong maka akan mengupdate atau menambahi key name pada searchParams  
    // kalau inputnya kosong maka searchParams dengan key name akan dihapus
            if (val !== '') {
                newSearch = {...newSearch,'name':val}
                setSearchParams(newSearch)
            } else {
                searchParams.delete('name')
                setSearchParams(searchParams)
            }
        } else {
            if (val !== '') {
                newSearch = {...newSearch,'city':val}
                setSearchParams(newSearch)
            } else {
                searchParams.delete('city')
                setSearchParams(searchParams)
            }
        }
    }
    const handleSubmit = () => {
        searchParams.get('name') ? setNama(searchParams.get('name')) : setNama('')
        searchParams.get('city') ? setCity(searchParams.get('city')) : setCity('')
    }

    return (
        <div>
            Test <br />
            <p>
                nama : {nama}
            </p>
            <p>
                city : {city}
            </p>
            <div><input type="text" placeholder='Name' onChange={(e)=>handleChange(e,'name')}/></div>  
            <div><input type="text" placeholder='City' onChange={(e)=>handleChange(e,'city')}/></div>
            <button onClick={()=>handleSubmit()}>sub</button>
        </div>
    )
}

export default Test