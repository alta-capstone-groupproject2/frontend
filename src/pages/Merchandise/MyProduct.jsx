/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Sidebar from "../../components/Sidebar";
import { TiPlus } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/apiRequest";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";
import CurrencyFormat from "react-currency-format";

function MyProduct() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [myProducts, setMyProducts] = useState("");

  useEffect(() => {
    apiGetMyProduct();
  }, []);

  const apiGetMyProduct = async () => {
    setLoading(true);
    await apiRequest("users/products", "get", false, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        const { code, message, data } = result;
        console.log(data);
        switch (code) {
          case "200":
            setMyProducts(data);
            break;
          case "400":
            Swal.fire("Failed", message, "error");
            break;
          default:
            Swal.fire("Something Wrong", message, "info");
            break;
        }
      })
      .catch((err) => {
        const errorMsg = err.message;
        let msg;
        if (err.response.data) msg = err.response.data.message;
        Swal.fire(errorMsg, msg, "error");
      })
      .finally(() => setLoading(false));
  };

  const apiDeleteCulture = (id) => {
    setLoading(true);
    apiRequest(`products/${id}`, "delete", false, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        const { code, message } = result;
        console.log(result);
        switch (code) {
          case "204":
            Swal.fire("Success", message, "success");
            break;
          case "400":
            Swal.fire("Failed", message, "error");
            break;
          default:
            Swal.fire("Something Wrong", message, "info");
            break;
        }
      })
      .catch((err) => {
        const errorMsg = err.message;
        let msg;
        if (err.response.data) msg = err.response.data.message;
        Swal.fire(errorMsg, msg, "error");
      })
      .finally(() => apiGetMyProduct());
  };

  const handleDelete = (id) => {
    Swal.fire(
      "Delete product",
      "Are you sure to delete this product",
      "question"
    ).then((result) => {
      if (result.isConfirmed) {
        apiDeleteCulture(id);
      }
    });
  };

  if (!isLoggedIn) {
    navigate("/login");
  } else {
    if (loading) {
      return <Loading />;
    } else {
      return (
        <Layout>
          <Link to="/add-product">
            <div className="bg-red-600 hover:bg-red-700 text-white shadow-md text-4xl p-3 fixed bottom-[9%] right-[3%] block whitespace-no-wrap cursor-pointer rounded-full">
              <TiPlus />
            </div>
          </Link>
          <div className="w-full flex flex-col sm:flex-row mt-12 min-h-[80vh]">
            <Sidebar active="umkm" />
            <div className=" basis-5/6">
              <p className="font-bold text-lg">My Product</p>
              <div className="flex flex-col gap-4 p-4">
                {myProducts.length < 1 ? (
                  <div className="p-20 text-slate-300 flex justify-center items-center text-4xl">
                    No Result
                  </div>
                ) : (
                  myProducts.map((product) => (
                    <div
                      className="shadow rounded-lg overflow-hidden bg-white flex items-center"
                      key={product.productID}
                    >
                      <img
                        src={product.image}
                        alt=""
                        className="w-48 cursor-pointer"
                      />
                      <div className="pl-8 py-4 break-all flex-1">
                        <p className="font-bold text-4xl flex justify-between items-center">
                          {product.productName}
                        </p>
                        <p className="font-bold text-2xl flex gap-2 items-center">
                          <CurrencyFormat
                            className="font-bold"
                            value={product.price}
                            displayType={"text"}
                            thousandSeparator={"."}
                            decimalSeparator={","}
                            prefix={"Rp."}
                          />
                          <span>| Stock : {product.stock}</span>
                        </p>
                        <p className="break-all truncate w-96">
                          {product.details}
                        </p>
                      </div>
                      <div className="text-center gap-4 flex flex-col px-14">
                        <button
                          className="shadow-md rounded py-2 px-10 font-bold bg-red-600 text-white"
                          id={`edit-product-${""}`}
                          onClick={() =>
                            navigate(`/edit-product/${product.productID}`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="shadow-md rounded py-2 px-10 font-bold text-red-600"
                          id={`del-product-${""}`}
                          onClick={() => handleDelete(product.productID)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </Layout>
      );
    }
  }
}

export default MyProduct;
