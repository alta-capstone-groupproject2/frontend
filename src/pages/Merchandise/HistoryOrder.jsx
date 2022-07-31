/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import { Rating } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import Layout from "../../components/Layout";
import Sidebar from "../../components/Sidebar";
import { BsStar } from "react-icons/bs";
import { apiRequest } from "../../utils/apiRequest";
import Swal from "sweetalert2";
import CurrencyFormat from "react-currency-format";

export default function HistoryOrder() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [historys, setHistorys] = useState([]);
  const [openData, setOpenData] = useState([]);
  const [selectProduct, setSelectProduct] = useState("");
  const [modal, setModal] = useState(false);
  const [product, setProduct] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiGetHistory();
  }, []);

  const apiGetHistory = async () => {
    setLoading(true);
    await apiRequest("orders", "get", false, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        const { code, message, data } = result;
        switch (code) {
          case "200":
            setHistorys(data);
            break;
          case "400":
            Swal.fire("Failed", message, "error");
            break;
          default:
            Swal.fire(`Something Wrong${code}`, message, "info");
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

  const apiPostRating = (id) => {
    setLoading(true);
    const body = {
      review: review,
      ratings: rating,
    };

    apiRequest(`products/ratings/${id}`, "post", body, {
      Authorization: `Bearer ${token}`,
    })
      .then((res) => {
        const { code, message } = res;

        switch (code) {
          case "200":
            Swal.fire(`Success`, message, "success");
            break;

          case "400":
            Swal.fire(`Failed`, message, "error");
            break;

          default:
            Swal.fire(`Code ${code}`, message, "info");
            break;
        }
      })
      .catch((err) => {
        const errorMsg = err.message;
        let msg = "";
        if (err.response.data) msg = err.response.data.message;
        Swal.fire(errorMsg, msg, "error");
      })
      .finally(() => {
        apiGetHistory();
        closeModal();
      });
  };

  const showModal = (val) => {
    setSelectProduct(val.id);
    setProduct(val);
    setModal(true);
  };

  const closeModal = () => {
    setProduct("");
    setReview("");
    setRating("");
    setModal(false);
  };

  const handleClick = (id) => {
    setOpenData((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const handleChange = (e, type) => {
    const val = e.target.value;
    const obj = {
      rating: (value) => setRating(value),
      review: (value) => setReview(value),
    };
    obj[type](val);
  };

  const handleSubmit = () => {
    if (rating !== "" && review !== "" && selectProduct !== "")
      apiPostRating(selectProduct);
  };

  if (!isLoggedIn) {
    navigate("/login");
  } else {
    if (loading) {
      return <Loading />;
    } else {
      return (
        <Layout>
          <div className="w-full flex flex-col sm:flex-row mt-12 min-h-[80vh]">
            <Sidebar active="history-order" />
            <div className="basis-5/6">
              <p className="font-bold text-lg">History Order</p>
              <div className="flex flex-col gap-4 p-4">
                <List
                  sx={{ width: "100%", bgcolor: "background.paper" }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton>
                    <div className="w-full h-full flex text-center p-2 font-bold">
                      <div className="basis-1/5">Transaction Date</div>
                      <div className="basis-1/5">Receiver</div>
                      <div className="basis-1/5">Address</div>
                      <div className="basis-1/5">Total</div>
                      <div className="basis-1/5">Status</div>
                    </div>
                  </ListItemButton>
                  <div className="h-[60vh] overflow-y-scroll border-t-2 border-slate-100">
                    {historys.map((item, idx) => (
                      <div key={idx}>
                        <ListItemButton onClick={() => handleClick(idx)}>
                          <div className="w-full h-full text-center flex p-2">
                            <div className="basis-1/5">{item.date}</div>
                            <div className="basis-1/5">{item.receiver}</div>
                            <div className="basis-1/5">{item.address}</div>
                            <div className="basis-1/5">
                              <CurrencyFormat
                                value={item.totalprice}
                                displayType={"text"}
                                thousandSeparator={"."}
                                decimalSeparator={","}
                                prefix={"Rp. "}
                              />
                            </div>
                            <div className="basis-1/5 flex justify-between">
                              {item.status}
                              <span>
                                {openData[idx] ? (
                                  <ExpandLess />
                                ) : (
                                  <ExpandMore />
                                )}
                              </span>
                            </div>
                          </div>
                        </ListItemButton>
                        <Collapse
                          in={openData[idx]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            {item.product.map((subitem, idx) => (
                              <div
                                className="w-full h-full justify-between flex p-6 bg-gray-100"
                                key={subitem.productID}
                              >
                                <div className="basis-3/5">{subitem.name}</div>
                                <div className="flex-1">{subitem.qty}</div>
                                <div className="basis-1/5">
                                  <button
                                    className="rounded p-2 bg-red-600 text-white text-sm flex items-center gap-2"
                                    onClick={() => showModal(subitem)}
                                  >
                                    {" "}
                                    <BsStar /> Give Ratings{" "}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </List>
                        </Collapse>
                      </div>
                    ))}
                  </div>
                </List>
                <Modal
                  open={modal}
                  onClose={closeModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <div className="absolute rounded top-[20%] left-[40%] bg-white border-2 p-4 flex flex-col">
                    <p className="font-bold text-2xl">{product.name}</p>
                    <p className="">Rating</p>
                    <Rating
                      name="size-large"
                      value={rating}
                      onChange={(e) => handleChange(e, "rating")}
                      size="large"
                    />
                    <p className="">Review</p>
                    <textarea
                      id="input-detail"
                      value={review}
                      className="border-[0.1rem] rounded p-2 w-full h-48"
                      onChange={(e) => handleChange(e, "review")}
                      placeholder="Detail"
                    ></textarea>
                    <button
                      className="rounded p-2 bg-red-600 text-white my-4 flex gap-2 items-center justify-center"
                      onClick={() => handleSubmit()}
                    >
                      {" "}
                      <BsStar /> Give Ratings{" "}
                    </button>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </Layout>
      );
    }
  }
}
