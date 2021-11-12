import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction" 
import "./Calender.css";
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
     
      <div className="row m-0 align-items-center mb-3">
        <span className="h5 m-0 width-fit-content m-2">Track Your Progress</span>
        <span id="some" className="ml-auto"></span>
      </div>
      <div className="bg-custom rounded-xl p-3 m-2">
        <div className="row m-0 mt-2 ">
          <div className="col-6 text-center">
            <div>Current Streak : 0</div>
          </div>
          <div className="col-6 text-center">
            <div>Longest Streak : 3</div>
          </div>
        </div>
       
     <FullCalendar 
        plugins={[ dayGridPlugin,interactionPlugin ]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
      />
       
        <div className="row m-0 mt-2 align-items-center justify-content-center ">
          <span className="width-fit-content w-auto" >For more details</span>
          <span className="ml-2 w-auto">
            <span className="round-bottons ">
              <i onClick={()=>dispatch(modalActions.calendarHandler())} className="fas fa-chevron-right fa-sm"></i>
            </span>
          </span>
        </div>
      </div>
    
    </>
  );
};

export default Calender;
