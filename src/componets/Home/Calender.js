import React,{useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction" 
import Calendar from 'react-calendar'
import "./Calender.css";
import CalendarModal from './CalendarModal'
import { useDispatch } from "react-redux";
import { modalActions } from "../../store/index";
const Calender = () => {
  const dispatch = useDispatch()
  // const [aboutApp, setAboutApp] = useState(false)
    const handleDateClick=(arg)=>{
        alert(arg.dateStr)
    }
  return (
    <>
     
      <div class="row m-0 align-items-center mb-3">
        <span class="h5 m-0 width-fit-content m-2">Track Your Progress</span>
        <span id="some" class="ml-auto"></span>
      </div>
      <div class="bg-custom rounded-xl p-3 m-2">
        <div class="row m-0 mt-2 ">
          <div class="col-6 text-center">
            <div>Current Streak : 0</div>
          </div>
          <div class="col-6 text-center">
            <div>Longest Streak : 3</div>
          </div>
        </div>
       
     <FullCalendar 
        plugins={[ dayGridPlugin,interactionPlugin ]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
      />
       
        <div class="row m-0 mt-2 align-items-center justify-content-center ">
          <span class="width-fit-content w-auto" >For more details</span>
          <span class="ml-2 w-auto">
            <span class="round-bottons ">
              <i onClick={()=>dispatch(modalActions.calendarHandler())} class="fas fa-chevron-right fa-sm"></i>
            </span>
          </span>
        </div>
      </div>
    
    </>
  );
};

export default Calender;
