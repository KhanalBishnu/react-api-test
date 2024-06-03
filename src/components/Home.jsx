import React, { useEffect, useState } from 'react'
import Header from '../auth/Header'
import AuthUser from '../AuthUser'
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
function Home() {
  const { http } = AuthUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(null);
  const [limit, setLimit] = useState(8);
  let fetch=true;
  let newPage=1;

  useEffect(() => {
    getProductLIst();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getProductLIst = async (page=1) => {
    await  http.post('/products', { page, limit }).then((res) => {
      setLoading(false)
      if(res.data.data.products.length>0){
        setProducts(prevItems => [...prevItems, ...res.data.data.products]);
      }else{
        fetch=false;
      }
     
    }).catch(function (error) {
      console.error(error);
    });
    setPageNumber(prev=>prev+1);


  }
  function handleScroll(e) {
    e.preventDefault();
    if(fetch){
      if (
        window.innerHeight + e.target.documentElement.scrollTop + 1 >=
        e.target.documentElement.scrollHeight
      ) {
        // setPageNumber(prev=>prev+1);
        newPage=newPage+1;
        getProductLIst(newPage)
      }
    }
  }

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const TagBadges = (tags) => {
    const tagsArray = tags.split(',');
    return tagsArray;
  }
  const tagColors = ['bg-info', 'bg-secondary', 'bg-success', 'bg-primary', 'bg-danger', 'bg-warning', 'bg-light', 'bg-dark'];

  return (
    <>

      <Header />
      <div className='container-fluid'>
        <div className="row text-center bg-secondary p-3 text-white">
          <h5>Home Section</h5>
        </div>
        {loading ?
          <Spinner content="Loading..." /> :
          <div className="row mt-2">
            {
              products?.map((product) => (
                <div className="col-lg-3 col-md-4  col-sm-6 d-flex align-items-stretch " key={product.id}>
                  <div className="card m-2 home-image-container">
                    <Link to={`/product/details/${product.id}`}>
                      <img src={product.media.length > 0 ? product.media[0].original_url : "/images/test.jpeg"} className="card-img-top" alt="product-images" height="280px" />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">{truncateText(product.description, 8)}</p>
                      {
                        TagBadges(product.tags)?.map((tag, index) => (
                          <span key={index} className={`badge rounded-pill text-dark m-2 p-1  px-2 ${tagColors[index % tagColors.length]}`}>
                            {tag}
                          </span>
                        ))
                      }<br />

                      <Link to={`/product/details/${product.id}`} className="btn btn-primary btn-sm">Read Me</Link>
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