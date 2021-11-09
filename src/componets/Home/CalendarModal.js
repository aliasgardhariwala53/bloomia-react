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
import BloomiaLogo from "../../assets/BloomiaLogo";
const events = [{ title: "Today", date: new Date() }];
const CalendarModal = () => {
  const dispatch = useDispatch();
  const showCalendar = useSelector((state) => state.modal.calendar);
  return (
    <Modal className="modal-main-body" show={showCalendar}>
      <Modal.Header className="header-container-calendar container  ">
        <div className="headingWrapper row m-0 align-items-center">
          <span className=" col-3 col-lg-2 px-1 py-2 text-center logo rounded-xl font-weight-600">
           <BloomiaLogo/>
          </span>
          <span className=" col-1 round-bottons">
            <i className="fa fa-arrow-left fa-sm" onClick={()=>dispatch(modalActions.calendarHandler())} ></i>
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
