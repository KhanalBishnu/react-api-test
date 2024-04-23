import React, { useEffect, useState } from "react";
import AuthUser from "../AuthUser";
import Spinner from "../components/Spinner";

function ProductList() {
  const productURL = "/dashboard/products";
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  const { http } = AuthUser();
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
  const renderListOfProducts = (products) => {
    return products?.map((product, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{product.title}</td>
        <td>{product.description}</td>
        <td>{product.tags}</td>
        <td>
          <a href="" className="btn btn-primary">
            Edit
          </a>
          <a href="" className="btn btn-danger ">
            Delete
          </a>
        </td>
      </tr>
    ));
  };
  return (
    <div className="p-4 bg-gradient" style={{ height: "92vh" }}>
      {loading ? (
       <Spinner />
      ) : (
        <table className="table table-bordered table-striped ">
          <thead>
            <tr>
              <th>SN</th>
              <th>Title</th>
              <th>Discription</th>
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
