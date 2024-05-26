import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../Spinner';
import Header from '../../auth/Header';
import AuthUser from '../../AuthUser';
import { IoCheckmark } from "react-icons/io5";


function ProductDetails() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const { http } = AuthUser();
    useEffect(() => {
        http.get(`/product/details/${id}`).then((res) => {
            setProduct(res.data.data)
            setLoading(false)
        })
    }, [])

    const  TagBadges=(tags) =>{
        const tagsArray = tags.split(',');
        return tagsArray;
      }
    return (
        <>
            <Header />
            <div className='container-fluid'>
                <div className="row text-center bg-secondary p-3 text-white">
                    <h5>Product Detail Section</h5>
                </div>
                {loading ?
                    <Spinner content="Loading..." /> :
                    <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">{product.title}</h3>
                            <h6 className="card-subtitle">testing purpose</h6>
                            <div className="row">
                                <div className="col-lg-5 col-md-5 col-sm-6">
                                    <div className="white-box text-center">
                                        <img src={product.media.length>0?product.media[0].original_url:'/images/test.jpeg'} className="" width="100%" height="100%" />
                                    </div>
                                </div>
                                <div className="col-lg-7 col-md-7 col-sm-6">
                                    <h4 className="box-title mt-5">Product description</h4>
                                    <p>{product.description}</p>
                                    {/* <h2 className="mt-5">
                                        $153<small className="text-success">(36%off)</small>
                                    </h2> */}
                                    {/* <button className="btn btn-dark btn-rounded mr-1" data-toggle="tooltip" title="" data-original-title="Add to cart">
                                        <i className="fa fa-shopping-cart"></i>
                                    </button> */}
                                    <button className="btn btn-primary btn-rounded">Buy Now</button>
                                    <h3 className="box-title mt-5">Tag Highlights</h3>
                                    <ul className="list-unstyled">
                                        {
                                            TagBadges(product.tags).map((tag,i)=>(
                                                <li key={i}><IoCheckmark/>{tag}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div >
        </>
    )
}

export default ProductDetails