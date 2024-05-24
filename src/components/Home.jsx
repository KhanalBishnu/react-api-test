import React, { useEffect, useState } from 'react'
import Header from '../auth/Header'
import AuthUser from '../AuthUser'
import Spinner from './Spinner';
function Home() {
  const {http}=AuthUser();
  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(true);


  useEffect(()=>{
    http.post('/products').then((res)=>{
      console.log(res);
      setLoading(false)
      setProducts(res.data.data.products);

    })
  },[]);

  const truncateText= (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const  TagBadges=(tags) =>{
    const tagsArray = tags.split(',');
    return tagsArray;
  }
  const tagColors = ['bg-info', 'bg-secondary', 'bg-success','bg-primary', 'bg-danger', 'bg-warning',  'bg-light', 'bg-dark'];

  return (
    <>

      <Header />
      <div className='container-fluid'>
        <div className="row text-center bg-secondary p-3 text-white">
          <h5>Home Section</h5>
        </div>
        {loading ?
          <Spinner content="Loading..." /> :
          <div className="row">
              {
                products?.map((product)=>(
                  <div className="col-lg-3 col-md-4  col-sm-6 d-flex align-items-stretch" key={product.id}>
                        <div className="card m-3">
                      <img src={product.media.length>0?product.media[0].original_url:""} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{truncateText(product.description,8)}</p>
                        {
                          TagBadges(product.tags)?.map((tag, index) => (
                            <span key={index} className={`badge rounded-pill text-dark m-2 p-1  px-2 ${tagColors[index % tagColors.length]}`}>
                              {tag}
                            </span>
                          ))
                        }<br />

                        <a href="#" className="btn btn-primary">Read Me</a>
                      </div>
                    </div>
                  </div>
                ))
              }
          </div>
        }
      </div >
    </>
  )
}

export default Home