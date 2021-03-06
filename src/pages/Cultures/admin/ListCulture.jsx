/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { LayoutAdmin } from "../../../components/Layout";
import { SidebarAdmin } from "../../../components/Sidebar";
import { apiRequest } from "../../../utils/apiRequest";
import Loading from "../../../components/Loading";

function ListCulture() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cultures, setCultures] = useState([]);
  const [totalPg, setTotalPg] = useState(false);
  const [nowPage, setNowPage] = useState();

  useEffect(() => {
    loadPage(1);
  }, []);

  const loadPage = (pg) => {
    setNowPage(pg);
    apiGetCultures(pg);
  };

  const apiGetCultures = async (page) => {
    setLoading(true);
    await apiRequest(`cultures?limit=5&page=${page}`, "get", false, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        const { code, message, data, totalpage } = result;
        console.log(result);
        switch (code) {
          case "200":
            !totalPg && setTotalPg(totalpage);
            setCultures(data);
            break;
          case "400":
            Swal.fire("Failed", message, "error");
            break;
          default:
            Swal.fire(`Something Wrong ${code}`, message, "info");
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
    apiRequest(`cultures/${id}`, "delete", false, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        const { code, message } = result;
        console.log(result);
        switch (code) {
          case "200":
            Swal.fire("Success", message, "success");
            break;
          case "400":
            Swal.fire("Failed", message, "error");
            break;
          default:
            Swal.fire(`Something Wrong ${code}`, message, "info");
            break;
        }
      })
      .catch((err) => {
        const errorMsg = err.message;
        let msg;
        if (err.response.data) msg = err.response.data.message;
        Swal.fire(errorMsg, msg, "error");
      })
      .finally(() => loadPage(1));
  };

  const handleDelete = (id) => {
    Swal.fire(
      "Delete Event",
      "Are you sure to delete this culture",
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
        <LayoutAdmin>
          <Link to="/add-culture">
            <div className="bg-red-600 hover:bg-red-700 text-white shadow-md text-4xl p-3 fixed bottom-[9%] right-[3%] block whitespace-no-wrap cursor-pointer rounded-full">
              <TiPlus />
            </div>
          </Link>
          <div className="min-h-[80vh] flex">
            <SidebarAdmin active="culture" />
            <div className="p-6 basis-5/6">
              <p className="font-bold text-lg">Culture</p>
              <div className="flex flex-col gap-4 p-4">
                <div className="flex justify-between">
                  <p>
                    Page : {nowPage} of {totalPg}
                  </p>
                  <Pagination
                    count={totalPg}
                    page={nowPage}
                    onChange={(e, pg) => loadPage(pg)}
                    shape="rounded"
                  />
                </div>
                {cultures.length < 1 ? (
                  <div className="p-20 text-slate-300 flex justify-center items-center text-4xl">
                    No Result
                  </div>
                ) : (
                  cultures.map((culture) => (
                    <div
                      className="shadow rounded-lg overflow-hidden bg-white flex items-center py-4"
                      key={culture.cultureID}
                    >
                      <img src={culture.image} alt="" className="w-48" />
                      <div className="px-8 py-4 break-all flex-1">
                        <p className="font-bold text-4xl flex justify-between items-center w-full">
                          {culture.name}
                        </p>
                        <p>{culture.city}</p>
                      </div>
                      <div className="text-center px-14 flex flex-col gap-4">
                        <button
                          className="shadow-md rounded py-2 px-10 font-bold bg-red-600 text-white"
                          id={`edit-event-${culture.culture_id}`}
                          onClick={() =>
                            navigate(`/edit-culture/${culture.cultureID}`)
                          }
                        >
                          Detail
                        </button>
                        <button
                          className="shadow-md rounded py-2 px-10 font-bold text-red-600"
                          id={`del-event-${culture.culture_id}`}
                          onClick={() => handleDelete(culture.cultureID)}
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
        </LayoutAdmin>
      );
    }
  }
}

export default ListCulture;
