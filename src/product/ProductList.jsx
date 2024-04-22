import React, { useEffect, useState } from 'react'
import AuthUser from '../AuthUser';

function ProductList() {
  const productURL='/dashboard/products';
  const [products,setProducts]=useState()
  const {http}=AuthUser()
  useEffect(()=>{
    getProductList();
  })
  const getProductList=()=>{
    try {
      http.get(productURL).then((res)=>{
        debugger
          let data=res.data;
          if(data.response){
            setProducts(data.products);
          }else{
            console.log(data.message || 'Something went wrong!');
          }
      })
    } catch (error) {
      console.log(error);
    }
  }
  const renderListOfProducts = (products) => {
    return products?.map(product => 
      <tr>
      <th>1</th>
      <th>fgdg</th>
      <th>ldfgldfg ldfgdf dfgdf</th>
      <th>noting</th>
    </tr>)
  }
  return (
    <div className='p-4 bg-gradient'>
      <table className='table table-bordered table-striped '>
        <thead>
          <tr>
            <th>SN</th>
            <th>Title</th>
            <th>Discription</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {renderListOfProducts(products)}
         
        </tbody>
      </table>
    </div>
  )
}

export default ProductList