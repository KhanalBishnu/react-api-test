import React, { useEffect, useState } from "react";
import AuthUser from "../AuthUser";
import Spinner from "../components/Spinner";
import ProductTableRow from "./ProductTableRow";
import { toast } from "react-toastify";
import Pagination from "../layout/Pagination";

function ProductList() {
  const productURL = "/dashboard/products";
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  
  // for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit=10;

  const { http } = AuthUser();
  useEffect(() => {
    getProductList();
  }, [currentPage]);
  const getProductList = () => {
    try {
      setLoading(true);
      let productlist=`${productURL}/getList`;
      http.post(productlist, { page: currentPage,limit:limit }).then((res) => {
        let data = res.data;
        if (data.response) {
          setProducts(data.products);
          setTotalPages(data.totalQuries);
        } else {
          toast.success(data.message);
          console.log(data.message || "Something went wrong!");
        }
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  // update function for product
  const handleUpdate = (productId, formData) => {
    let newFormData = { ...formData, id: productId };
    setLoading(true);
    http.post(`${productURL}/update`, newFormData).then((res) => {
      let data = res.data;
      setLoading(false);
      if (data.response) {
        toast.success(data.message);
        getProductList();
        // setProducts(products.map((product) => {
        //   if (product.id === productId) {
        //     return { ...product, ...newFormData };
        //   }
        //   return product;
        // }));
      } else if (data.message) {
        if (typeof data.message === "object") {
          Object.keys(data.message).forEach((key) => {
            data.message[key].forEach((err) => {
              toast.error(err);
            });
          });
        }
        if (typeof data.message == "string") {
          toast.error(data.message);
        }
      }
    });
  };

  const handleDeleteProduct=(productId)=>{
    console.log(productId);
    setLoading(true);
    http.get(`${productURL}/delete/`+productId).then((res)=>{
      let data=res.data;
      setLoading(false);
      if(data.response){
        toast.success(data.message);
        setProducts(products.filter((product) => product.id !== productId));
      }else{
        toast.error(data.message);
      }
    })
  }
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
};


  const renderListOfProducts = (products) => {
    return products?.map((product, index) => (
      <ProductTableRow
        key={product.id}
        index={index}
        product={product}
        onUpdate={handleUpdate}
        onDelete={handleDeleteProduct}
      />
    ));
  };
  return (
    <div
      className="p-4 bg-gradient"
      style={{ height: "92vh", overflow: "auto" }}
    >
      {loading ? (
        <Spinner />
      ) : (<>
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
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} limit={limit} />
      </>
      )}
    </div>
  );
}
export default ProductList;
