import React from 'react'
import {useDate} from '../Utility/calcTime'
import RouterPreviousPage from './RouterPreviousPage'

export default function DisplayCurrentDate() {
    const time = useDate()
  return (
    <div className='pt-3 px-5 text-2xl flex w-full items-center flex'>
        <RouterPreviousPage/>
        <span className='flex-1 text-center'>{time.time}</span>
        <span className='flex-1 text-center'>{time.date}</span>
    </div>
  )
}
