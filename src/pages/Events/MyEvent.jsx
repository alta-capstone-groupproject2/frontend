/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Sidebar from "../../components/Sidebar";
import { TbTicket } from "react-icons/tb";
import { TiPlus } from "react-icons/ti";
import { BiDownload } from "react-icons/bi";
import { Pagination } from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/apiRequest";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";
import CurrencyFormat from "react-currency-format";

function MyEvent() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currTime, setCurrTime] = useState("");
  const [myEvents, setMyEvents] = useState("");
  const [pdfFile, setPdfFile] = useState([]);

  const [totalPg, setTotalPg] = useState(false);
  const [nowPage, setNowPage] = useState();

  useEffect(() => {
    loadPage(1);
  }, []);

  const loadPage = (pg) => {
    setNowPage(pg);
    apiGetMyEvent(pg);
  };

  const apiGetMyEvent = async (page) => {
    setLoading(true);
    await apiRequest(`users/events?limit=5&page=${page}`, "get", false, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        const { code, currentTime, message, data, totalpage } = result;
        switch (code) {
          case "200":
            !totalPg && setTotalPg(totalpage);
            apiGetPdf(data);
            setCurrTime(currentTime);
            setMyEvents(data);
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
      });
  };

  const apiGetPdf = async (data) => {
    let users = [];
    let promises = [];
    for (let i = 0; i < data.length; i++) {
      promises.push(
        await apiRequest(`/events/attendees/${data[i].eventID}`, "get", false, {
          Authorization: `Bearer ${token}`,
        }).then((res) => {
          users.push({ data: res.data });
        })
      );
    }
    Promise.all(promises)
      .then(() => {
        setPdfFile(users);
      })
      .catch((err) => {
        const errorMsg = err.message;
        let msg;
        if (err.response.data) msg = err.response.data.message;
        Swal.fire(errorMsg, msg, "error");
      })
      .finally(() => setLoading(false));
  };

  const apiDeleteMyEvent = (id) => {
    setLoading(true);
    apiRequest(`events/${id}`, "delete", false, {
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
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    Swal.fire(
      "Delete Event",
      "Are you sure to delete this event",
      "question"
    ).then((result) => {
      if (result.isConfirmed) {
        apiDeleteMyEvent(id);
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
          <Link to="/apply-event">
            <div className="bg-red-600 hover:bg-red-700 text-white shadow-md text-4xl p-3 fixed bottom-[9%] right-[3%] block whitespace-no-wrap cursor-pointer rounded-full">
              <TiPlus />
            </div>
          </Link>
          <div className="w-full flex flex-col sm:flex-row mt-12 min-h-[80vh]">
            <Sidebar active="my-event" />
            <div className="basis-5/6">
              <p className="font-bold text-lg">My Event</p>
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
                {myEvents.length < 1 ? (
                  <div className="p-20 text-slate-300 flex justify-center items-center text-4xl">
                    No Result
                  </div>
                ) : (
                  myEvents.map((event, idx) => (
                    <div
                      className="shadow rounded-lg overflow-hidden bg-white flex items-center"
                      key={event.eventID}
                    >
                      <img src={event.image} alt="" className="w-48" />
                      <div className="pl-8 py-4 break-all flex-1">
                        <p className="font-bold text-4xl flex justify-between items-center">
                          {event.eventName}
                          {event.endDate < currTime && (
                            <span className="bg-red-600 rounded-full px-2 py-[0.1rem] text-white text-sm">
                              Event End
                            </span>
                          )}
                        </p>
                        <p className="flex justify-between">
                          <span>
                            <span className="text-slate-400">Hosted by:</span>
                            {event.hostedBy}
                          </span>
                          <span className="flex flex-col gap-2">
                            <span className="rounded text-xs py-[0.1rem] text-center font-bold px-2 bg-red-600 text-white">
                              Status : {event.status}
                            </span>
                          </span>
                        </p>
                        <div className=" flex justify-between">
                          <div className="flex flex-col text-xs">
                            <b>From</b>
                            <span className="ml-2">
                              {moment(event.startDate, "DD-MM-YYYY").format(
                                "dddd"
                              )}
                              ,{" "}
                              {moment
                                .utc(event.startDate)
                                .format("DD MMMM YYYY, HH:mm")}
                            </span>
                            <b>To</b>
                            <span className="ml-2">
                              {moment(event.endDate, "DD-MM-YYYY").format(
                                "dddd"
                              )}
                              ,{" "}
                              {moment
                                .utc(event.endDate)
                                .format("DD MMMM YYYY, HH:mm")}
                            </span>
                          </div>
                          <div className="mt-2 flex flex-col items-end">
                            <div className="flex items-center gap-2">
                              <TbTicket />
                              <CurrencyFormat
                                className="font-bold"
                                value={event.price}
                                displayType={"text"}
                                thousandSeparator={"."}
                                decimalSeparator={","}
                                prefix={"Rp."}
                              />
                            </div>
                            <a
                              href={pdfFile[idx].data}
                              target="_blank"
                              className="flex mt-4 items-center gap-2 text-red-600"
                              rel="noreferrer"
                            >
                              <BiDownload /> List Attendees.pdf{" "}
                            </a>
                          </div>
                        </div>
                        <p>{event.address}</p>
                        <p className="text-slate-400 mt-4">About this event</p>
                        <p className="truncate w-96">{event.details}</p>
                      </div>
                      <div className="text-center px-14">
                        <button
                          className="shadow-md rounded py-2 px-10 font-bold text-red-600"
                          id={`del-event-${event.eventID}`}
                          onClick={() => handleDelete(event.eventID)}
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

export default MyEvent;
