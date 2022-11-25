import React from 'react'
import { useParams } from 'react-router-dom'
import Products from '../home/homeComponents/Products'

const Category = () => {
    
    const params = useParams()
  
    return (
    <div className='p-28'>
        <h2 className='text-4xl text-white'>{params.name}</h2>
        <Products url={`/products/category/${params.name}`} />
    </div>
  )
}

export default Category