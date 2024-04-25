import React, { useEffect, useState } from "react";
import AuthUser from "../AuthUser";
import Spinner from "../components/Spinner";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ProductTableRow from "./ProductTableRow";



function ProductList() {
  const productURL = "/dashboard/products";
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  const { http } = AuthUser();
  // bootstrap modal 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    getProductList();
  }, []);
  const getProductList = () => {
    try {
      http.get(productURL).then((res) => {
        let data = res.data;
        if (data.response) {
          setProducts(data.products);
        } else {
          console.log(data.message || "Something went wrong!");
        }
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = (productId,formData) => {
    console.log(formData);
    debugger
};

  const renderListOfProducts = (products) => {
    return products?.map((product, index) => (
      <ProductTableRow key={product.id} index={index} product={product} onUpdate={handleUpdate} />
    ));
  };
  return (
    <div className="p-4 bg-gradient" style={{ height: "92vh",overflow:'auto' }}>
      {loading ? (
       <Spinner />
      ) : (
        <table className="table table-bordered table-striped ">
          <thead>
            <tr>
              <th>SN</th>
              <th>Title</th>
              {/* <th>Discription</th> */}
              <th>Image</th>
              <th>Tags</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderListOfProducts(products)}</tbody>
        </table>
      )}
    </div>
  );
}

export default ProductList;
