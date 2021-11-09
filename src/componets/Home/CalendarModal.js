import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./ModalTerms.css";
import "./CalendarModal.css";
import { useDispatch } from "react-redux";
import { modalActions } from "../../store/index";
import FullCalendar from "@fullcalendar/react";
// import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ProgressReport from "../ProgressReport/ProgressReport";
const events = [{ title: "Today", date: new Date() }];
const CalendarModal = () => {
  const dispatch = useDispatch();
  const showCalendar = useSelector((state) => state.modal.calendar);
  return (
    <Modal className="modal-main-body" show={showCalendar}>
      <Modal.Header className="header-container-calendar container  ">
        <div className="headingWrapper row m-0 align-items-center">
          <span className=" col-3 col-lg-2 px-1 py-2 text-center logo rounded-xl font-weight-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="130"
              id="logo"
              height="36"
              viewBox="0 0 272.369 62.256"
            >
              <g
                id="Group_4004"
                data-name="Group 4004"
                transform="translate(-221.947 -112.426)"
              >
                <g
                  id="Group_3567"
                  data-name="Group 3567"
                  transform="translate(221.947 112.426)"
                >
                  <path
                    id="Path_4576"
                    data-name="Path 4576"
                    d="M270.393,159.832a23.7,23.7,0,0,1-16.873,7,23.278,23.278,0,1,1,0-46.551,23.7,23.7,0,0,1,16.873,7V117.242a31.746,31.746,0,0,0-16.873-4.816,31.131,31.131,0,1,0,0,62.256,31.746,31.746,0,0,0,16.873-4.816Z"
                    transform="translate(-221.947 -112.426)"
                  ></path>
                  <path
                    id="Path_4577"
                    data-name="Path 4577"
                    d="M510.883,156.275a14.43,14.43,0,0,0-13.811,6.025V148.931a31.6,31.6,0,0,0-2.465-2.035v49.455a31.6,31.6,0,0,0,2.465-2.035v-25.68C499.459,168.6,509.574,167.763,510.883,156.275Z"
                    transform="translate(-443.979 -140.496)"
                  ></path>
                  <path
                    id="Path_4578"
                    data-name="Path 4578"
                    d="M344.223,198.571s1.754,23.182,25.552,20.812C369.775,219.383,368.733,197.007,344.223,198.571Z"
                    transform="translate(-321.519 -182.85)"
                  ></path>
                </g>
                <g
                  id="Group_3568"
                  data-name="Group 3568"
                  transform="translate(300.794 123.787)"
                >
                  <path
                    id="Path_4579"
                    data-name="Path 4579"
                    d="M672.841,202.5a9.194,9.194,0,0,1,4.889,8.5,9.992,9.992,0,0,1-3.348,7.758,11.827,11.827,0,0,1-8.236,3.029H650.364V184.6H665.03a11.544,11.544,0,0,1,8.024,2.976,9.669,9.669,0,0,1,3.294,7.492A9.07,9.07,0,0,1,672.841,202.5Zm-7.811-11.052H657.7v8.183h7.333a3.814,3.814,0,0,0,2.843-1.169,4.015,4.015,0,0,0,1.142-2.923,4.066,4.066,0,0,0-1.116-2.922A3.794,3.794,0,0,0,665.03,191.451ZM657.7,214.937h8.449a4.132,4.132,0,0,0,3.082-1.248,4.336,4.336,0,0,0,1.222-3.162,4.271,4.271,0,0,0-1.222-3.109,4.136,4.136,0,0,0-3.082-1.249H657.7Z"
                    transform="translate(-650.364 -183.002)"
                  ></path>
                  <path
                    id="Path_4580"
                    data-name="Path 4580"
                    d="M828.638,214.8h-6.855v-38.79h6.855Z"
                    transform="translate(-789.954 -176.011)"
                  ></path>
                  <path
                    id="Path_4581"
                    data-name="Path 4581"
                    d="M909.043,261.843a14.176,14.176,0,1,1,4.091-9.99A13.57,13.57,0,0,1,909.043,261.843ZM893.9,257.114a7.446,7.446,0,0,0,10.309,0,7.713,7.713,0,0,0,0-10.521,7.446,7.446,0,0,0-10.309,0,7.862,7.862,0,0,0,0,10.521Z"
                    transform="translate(-841.454 -226.348)"
                  ></path>
                  <path
                    id="Path_4582"
                    data-name="Path 4582"
                    d="M1079.031,261.843a14.176,14.176,0,1,1,4.092-9.99A13.569,13.569,0,0,1,1079.031,261.843Zm-15.144-4.729a7.447,7.447,0,0,0,10.309,0,7.713,7.713,0,0,0,0-10.521,7.446,7.446,0,0,0-10.309,0,7.861,7.861,0,0,0,0,10.521Z"
                    transform="translate(-979.879 -226.348)"
                  ></path>
                  <path
                    id="Path_4583"
                    data-name="Path 4583"
                    d="M1261.824,237.825a9.448,9.448,0,0,1,7.306,2.975,11.316,11.316,0,0,1,2.737,7.971v16.366h-6.854V249.249a5.448,5.448,0,0,0-1.169-3.72,4.159,4.159,0,0,0-3.294-1.328,4.5,4.5,0,0,0-3.64,1.541,6.741,6.741,0,0,0-1.3,4.463v14.931h-6.854V249.249a5.448,5.448,0,0,0-1.169-3.72,4.16,4.16,0,0,0-3.295-1.328,4.568,4.568,0,0,0-3.64,1.568,6.579,6.579,0,0,0-1.355,4.437v14.931h-6.854V238.569h6.854v2.816q2.391-3.559,7.386-3.56a7.8,7.8,0,0,1,7.227,3.826Q1256.51,237.825,1261.824,237.825Z"
                    transform="translate(-1124.362 -226.348)"
                  ></path>
                  <path
                    id="Path_4584"
                    data-name="Path 4584"
                    d="M1476.164,187.608a4.266,4.266,0,0,1-4.2-4.2,4.12,4.12,0,0,1,1.249-2.976,3.99,3.99,0,0,1,2.949-1.275,4.052,4.052,0,0,1,3,1.275,4.124,4.124,0,0,1,1.248,2.976,4.033,4.033,0,0,1-1.248,2.949A4.094,4.094,0,0,1,1476.164,187.608Zm3.454,29.756h-6.855V190.8h6.855Z"
                    transform="translate(-1319.413 -178.575)"
                  ></path>
                  <path
                    id="Path_4585"
                    data-name="Path 4585"
                    d="M1561.075,241.7v-3.135h6.855v26.568h-6.855V262a10.432,10.432,0,0,1-8.661,3.879,12.155,12.155,0,0,1-9.14-4.038,15.04,15.04,0,0,1,0-19.926,12.086,12.086,0,0,1,9.14-4.091A10.435,10.435,0,0,1,1561.075,241.7Zm-12.647,15.569a7.714,7.714,0,0,0,10.522,0,7.343,7.343,0,0,0,2.125-5.42,7.168,7.168,0,0,0-2.125-5.367,7.573,7.573,0,0,0-10.522,0,7.263,7.263,0,0,0-2.072,5.367A7.443,7.443,0,0,0,1548.428,257.273Z"
                    transform="translate(-1374.408 -226.348)"
                  ></path>
                </g>
              </g>
            </svg>
          </span>
          <span className=" col-1 round-bottons">
            <i className="fa fa-arrow-left fa-sm"></i>
          </span>
          <span className="col-4  ">Tuesday, November 2, 2021</span>
        </div>
      </Modal.Header>
      <Modal.Body className="modal-body-container">
        <div className="bg-white rounded-xl px-4 py-2 my-2">
          <div className="streaks pt-1 pb-2 border-bottom row m-0 align-items-center">
            <span className="h4 m-0"> Streak count </span>
          </div>
          <div className="row m-0 pt-2">
            <div className="col-6 text-center">
              <h4>Current Streak</h4>
              <h5>0</h5>
            </div>
            <div className="col-6 text-center">
              <h4>Longest Streak</h4>
              <h5>3</h5>
            </div>
          </div>
        </div>
        <div className="row calendar-container ">
            <div className="col-12 h4 ">Calendar</div>
          <div id="caledarBody" className="col-lg-9 col-md-6">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              dateClick={(e) => alert(e.dateStr)}
            />
          </div>
         
            <div className="col-lg-3 col-md-6 col-12 color-indicater m-auto">
              <div className="row m-0 mb-2 ">
                <span className="round-bottons round-indication round-indication-green mr-2"></span>
                Completed
              </div>
              <div className="row m-0 mb-2">
                <span className="round-bottons round-indication round-indication-orange mr-2"></span>
                Partially Completed
              </div>
              <div className="row m-0 mb-2">
                <span className="round-bottons round-indication round-indication-red mr-2"></span>
                Incomplete
              </div>
            </div>
          </div>
       <ProgressReport/>
      </Modal.Body>
    </Modal>
  );
};

export default CalendarModal;
