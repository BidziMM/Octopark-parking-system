import React from 'react'
import image from '../Assets/green_gradient_bg.png'
import { Link } from 'react-router-dom'

export default function IconButtons({text, Icon, to}) {
  return (
    <Link to={to} style={{backgroundImage:`url(${image})`}} className='p-2 rounded-md flex flex-1 flex-col justify-items-center items-center mx-4 text-slate-50'>
      <Icon className='mr-1' size={64} /> 
      <h1 className='text-xl'>{text}</h1>
    </Link>
  )
}
