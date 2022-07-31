/* eslint-disable react-hooks/exhaustive-deps */
/** @format */
import { useState, useMemo, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reduxAction } from "../utils/redux/actions/action";

import Homepage from "../pages/Homepage";
import Custom404 from "../pages/404";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/Dashboard";
import ListSubmissionUmkm from "../pages/Merchandise/admin/ListSubmissionUmkm";

import { TokenContext } from "../utils/Context";
import Cultures from "../pages/Cultures/Cultures";
import DetailCulture from "../pages/Cultures/DetailCulture";
import AddCultures from "../pages/Cultures/admin/AddCultures";
import EditCultures from "../pages/Cultures/admin/EditCultures";
import ListCulture from "../pages/Cultures/admin/ListCulture";

import Events from "../pages/Events/Events";
import MyEvent from "../pages/Events/MyEvent";
import DetailEvent from "../pages/Events/DetailEvent";
import ApplyEvent from "../pages/Events/admin/ApplyEvent";
import ListSubmissionEvent from "../pages/Events/admin/ListSubmissionEvent";
import DetailSubmissionEvent from "../pages/Events/admin/DetailSubmissionEvent";
import JoinedEvent from "../pages/Events/JoinedEvent";

import MyProduct from "../pages/Merchandise/MyProduct";
import AddProduct from "../pages/Merchandise/AddProduct";
import UpgradeAccount from "../pages/Merchandise/UpgradeAccount";
import EditProduct from "../pages/Merchandise/EditProduct";
import HistoryOrder from "../pages/Merchandise/HistoryOrder";
import Cart from "../pages/Merchandise/Cart";
import Verification from "../pages/Verification";
import Merchandise from "../pages/Merchandise/Merchandise";
import DetailMerchandise from "../pages/Merchandise/DetailMerchandise";
import BCA from "../pages/Payment/BCA";

const RoutesApp = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const jwtToken = useMemo(() => ({ token, setToken }), [token]);

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      dispatch(reduxAction("IS_LOGGED_IN", true));
    } else {
      dispatch(reduxAction("IS_LOGGED_IN", false));
    }
  }, [isLoggedIn]);

  return (
    <TokenContext.Provider value={jwtToken}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:eventID" element={<DetailEvent />} />
          <Route path="/cultures" element={<Cultures />} />
          <Route path="/culture/:cultureID" element={<DetailCulture />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upgrade-account" element={<UpgradeAccount />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-event" element={<MyEvent />} />
          <Route path="/apply-event" element={<ApplyEvent />} />
          <Route
            path="/list-submission-umkm"
            element={<ListSubmissionUmkm />}
          />
          <Route path="/list-culture-admin" element={<ListCulture />} />
          <Route path="/add-culture" element={<AddCultures />} />
          <Route path="/edit-culture/:id" element={<EditCultures />} />
          <Route
            path="/list-submission-event"
            element={<ListSubmissionEvent />}
          />
          <Route
            path="/submission-event/:id"
            element={<DetailSubmissionEvent />}
          />
          <Route path="/my-product" element={<MyProduct />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/joined-event" element={<JoinedEvent />} />
          <Route path="/history-order" element={<HistoryOrder />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/verification/:id" element={<Verification />} />
          <Route path="/merchandise" element={<Merchandise />} />
          <Route
            path="/merchandise/:productsID"
            element={<DetailMerchandise />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment/bca/:eventID" element={<BCA />} />
          <Route path="*" element={<Custom404 />} />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  );
};

export default RoutesApp;
