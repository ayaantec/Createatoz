import React from 'react'
import './customLoader.css'
import Spinner from '../images/loading-loading-forever.gif'

function CustomLoader() {
    console.log("loader in  component")
    return (
        <div className='fp-container'>
            <img src={Spinner} className='fp-loader' alt="loading"/>
        </div>
    )
}

export default CustomLoader
