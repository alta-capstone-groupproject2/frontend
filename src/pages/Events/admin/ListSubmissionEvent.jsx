/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { LayoutAdmin } from "../../../components/Layout";
import { SidebarAdmin } from "../../../components/Sidebar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../../utils/apiRequest";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import { Pagination } from "@mui/material";

function ListSubmissionEvent() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currTime, setCurrTime] = useState("");
  const [myEvents, setMyEvents] = useState("");
  const [totalPg, setTotalPg] = useState(false);
  const [nowPage, setNowPage] = useState();

  useEffect(() => {
    loadPage(1);
  }, []);

  const loadPage = (pg) => {
    setNowPage(pg);
    apiGetMySubEvent(pg);
  };

  const apiGetMySubEvent = async (page) => {
    setLoading(true);
    await apiRequest(`events/submissions?limit=5&page=${page}`, "get", false, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        console.log(result);
        const { code, currentTime, message, data, totalpage } = result;
        console.log(result);
        switch (code) {
          case "200":
            !totalPg && setTotalPg(totalpage);
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
      })
      .finally(() => setLoading(false));
  };

  if (!isLoggedIn) {
    navigate("/login");
  } else {
    if (loading) {
      return <Loading />;
    } else {
      return (
        <LayoutAdmin>
          <div className="min-h-[80vh] flex">
            <SidebarAdmin active="eventSub" />
            <div className="p-6 basis-5/6">
              <p className="font-bold text-lg">Submission Event</p>
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
                  myEvents.map((event) => (
                    <div
                      className="shadow rounded-lg overflow-hidden bg-white flex items-center"
                      key={event.eventID}
                    >
                      <div
                        className="pl-8 py-4 break-all flex-1"
                        id={`div-goto-detail-${event.eventID}`}
                      >
                        <p className="font-bold text-4xl flex justify-between items-center">
                          {event.nameEvent}
                          {event.endDate < currTime && (
                            <span className="bg-red-600 rounded-full px-2 py-[0.1rem] text-white text-sm">
                              Event End
                            </span>
                          )}
                        </p>
                        <p className="flex justify-between">
                          <span>
                            <span className="text-slate-400">
                              Applied by :{" "}
                            </span>{" "}
                            {event.username}
                          </span>
                          <span className="flex border-red-600 border-2 py-[0.1rem] rounded px-2 text-red-600 text-xs font-bold items-center">
                            Status : {event.status}
                          </span>
                        </p>
                        <p>
                          <span className="text-slate-400">City : </span>{" "}
                          {event.city}
                        </p>
                        <div>
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
                        </div>
                        <p>{event.address}</p>
                      </div>
                      <div className="text-center px-14">
                        <button
                          className="shadow-md rounded py-2 px-10 font-bold text-red-600"
                          id={`del-event-${event.eventID}`}
                          onClick={() =>
                            navigate(`/submission-event/${event.eventID}`)
                          }
                        >
                          Detail
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

export default ListSubmissionEvent;
