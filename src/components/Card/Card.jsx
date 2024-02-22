import React from 'react'
import Foto from '../../assets/richard-burlton-HTpmedSyZag-unsplash.jpg'
import Button from '../Button/Button.jsx'
import ButtonStyle from '../Button/button.module.css'
import { Link } from 'react-router-dom'
const Card = () => {
  return (

    <div className='inline-flex overflow-hidden flex-col rounded-xl w-1/3 bg-white mt-5 ml-5'>
        <div className='rounded-tl-full'>
        <p className='py-2 px-5  text-white bg-rosa object-left-top absolute rounded-tl-xl rounded-br-xl'>Japon</p>
        <img  src={Foto} alt="Foto de producto" />
        </div>
        <div className='p-5'>
            <h2 className='text-xl font-bold'>
                Texto de ejemplo, <br/>aaaaaaaaa
            </h2>
            <p className='text-precio font-bold text-x my-3'>$30.99</p>
            <Link to={'/Details'} style={{ textDecoration: 'none' }}>
            <button className='bg-rosa text-white py-2 px-5 hover:border-white' >Detalles</button>
            </Link>
        </div>  
    </div>
    
  )
}

export default Card