import React, { useEffect, useState, useCallback } from 'react';
import Header from '../auth/Header';
import AuthUser from '../AuthUser';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import SkeletonProductList from '../skeleton/SkeletonProductList';

function Home() {
  const { http } = AuthUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [pageNumber, setPageNumber] = useState(1);
  const [limit] = useState(8);
  // const [fetchMore, setFetchMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  let pageNumber=1;
  let fetchMore=true;
  useEffect(() => {
    getProductList(1, searchQuery);
    const handleScroll = (e) => {
      if (fetchMore && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1) {
        loadMoreProducts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchMore, searchQuery]);

  const getProductList = async (page = 1, query = '') => {
    setLoading(true);
    try {
      const res = await http.post('/products', { page, limit, name: query });
      const newProducts = res.data.data.products;
      if (newProducts.length > 0) {
        setProducts((prev) => (page === 1 ? newProducts : [...prev, ...newProducts]));
        // setFetchMore(true);
      } else if(query){
        setProducts((prev) => newProducts);
        fetchMore=false;
      }else{
        fetchMore=false;

      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = () => {
    const nextPage = pageNumber + 1;
    // setPageNumber(nextPage);
    pageNumber=nextPage;
    getProductList(nextPage, searchQuery);
  };

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
  };

  const tagColors = ['bg-info', 'bg-secondary', 'bg-success', 'bg-primary', 'bg-danger', 'bg-warning', 'bg-light', 'bg-dark'];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    // setPageNumber(1);
    pageNumber=1;
    fetchMore=true;
    getProductList(1, value);
  };

  return (
    <>
      <Header />
      <div className='container-fluid'>
        <div className="row text-center bg-secondary p-3 text-white">
          <h5>Home Section</h5>
        </div>
        <div className="row d-flex justify-content-end">
          <div className="col-md-3">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className='rounded mt-2 p-2 w-100'
              placeholder='Search product here'
            />
          </div>
        </div>
        {loading && products.length === 0 ?
          <div className="row">
            {Array(12).fill().map((_, idx) => (
              <div className="col-md-3" key={idx}>
                <SkeletonProductList key={idx} />
              </div>
            ))}
          </div> :
          <div className="row mt-2">
            {products.length <= 0 ? <p className="text-center">Product not available</p> :
              products.map((product) => (
                <div className="col-lg-3 col-md-4 col-sm-6 d-flex align-items-stretch" key={product.id}>
                  <div className="card m-2 home-image-container">
                    <Link to={`/product/details/${product.id}`}>
                      <img src={product.media.length > 0 ? product.media[0].original_url : "/images/test.jpeg"} className="card-img-top" alt="product-images" height="280px" />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">{truncateText(product.description, 8)}</p>
                      {TagBadges(product.tags)?.map((tag, index) => (
                        <span key={index} className={`badge rounded-pill text-dark m-2 p-1 px-2 ${tagColors[index % tagColors.length]}`}>
                          {tag}
                        </span>
                      ))}
                      <br />
                      <Link to={`/product/details/${product.id}`} className="btn btn-primary btn-sm">Read Me</Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        }
      </div>
    </>
  );
}

export default Home;
