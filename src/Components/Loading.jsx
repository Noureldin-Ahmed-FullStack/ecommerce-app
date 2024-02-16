import React from 'react'
import { HashLoader } from 'react-spinners';
import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {
  return (
    <div className='loading-container'>
        <HashLoader color="#4fa74f" size={100}/>
    </div>
  )
}
