import React from 'react'
import {useNavigate, useLocation} from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi'
import Logo from './Logo';
export default function RouterPreviousPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const changeNavigaion = () => {
        //Jezeli strona główna to nie cofaj
        if(location.pathname !== '/')
            navigate(-1)
    }
  return (
        <button className='bg-sky-500 p-2 rounded-full self-start ml-12' onClick={changeNavigaion} >
            <BiArrowBack color='white' size={32}/>
        </button>
  )
}
