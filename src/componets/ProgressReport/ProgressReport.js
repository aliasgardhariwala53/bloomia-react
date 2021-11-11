import React, { useState, useEffect } from "react";
import "./ProgressReport.css";
import { Line } from "react-chartjs-2";
import Card from "../UI/Card";
import axios from "axios";
import { HttpCall } from "../../services/UseHttps";
import {
  getReportLastYearUrl,
  getReportMonthUrl,
  getLastDaysUrl,
} from "../../services/Network";
const ProgressReport = () => {
  //sets
  const [ThreeMonth, setThreeMonth] = useState({});
  const [lastYear, setlastYear] = useState({});
  const [Days30, setDays30] = useState({});
  //Time
  const [ThreeMonthTime, setThreeMonthTime] = useState({});
  const [lastYearTime, setlastYearTime] = useState({});
  const [Days30Time, setDays30Time] = useState({});
  //option select
  const [optionSelect, setOptionSelect] = useState(1);

  const dataYear = {
    yearNumber: 1,
  };
  const data3Month = {
    monthNumber: 3,
  };
  const data30Days = {
    dayNumber: 30,
  };

  useEffect(() => {
    HttpCall(`${getReportLastYearUrl}`, "POST", dataYear)
      .then((response) => {
        let dataYearSets = [];
        let dataYearTime = [];
        let labels = Object.keys(response.data.data[0]).sort(function (
          dateA,
          dateB
        ) {
          return new Date(dateA) - new Date(dateB);
        });

        for (const iterator of Object.values(response.data.data[0])) {
          dataYearSets.push(iterator.setCount);
          dataYearTime.push(iterator.setTime);
        }

        setlastYear({
          ...lastYear,
          labels: labels,
          datasets: [
            {
              
              data: dataYearSets,
              fill: true,
              backgroundColor: "#a7dbfa ",
              borderColor: "#8da8c6",
              borderWidth: 1,
            },
          ],
        });
        setlastYearTime({
          ...lastYearTime,
          labels: labels,
          datasets: [
            {
              
              data: dataYearTime,
              fill: true,
              backgroundColor: "#a7dbfa ",
              borderColor: "#8da8c6",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        // handleError(error);
      });

    HttpCall(`${getReportMonthUrl}`, "POST", data3Month)
      .then((response) => {
        console.log(
          "geeeeeeeeeeeeeeeeetttttttttttttt report",
          response.data.data[0]
        );
        let data3MonthSets = [];
        let data3MonthTime = [];
        let labels = Object.keys(response.data.data[0]).sort(function (
          dateA,
          dateB
        ) {
          return new Date(dateA) - new Date(dateB);
        });

        for (const iterator of Object.values(response.data.data[0])) {
          data3MonthSets.push(iterator.setCount);
          data3MonthTime.push(iterator.setTime);
        }

        setThreeMonth({
          ...ThreeMonth,
          labels: labels,
          datasets: [
            {
             
              data: data3MonthSets,
              fill: true,
              backgroundColor: "#a7dbfa ",
              borderColor: "#8da8c6",
              borderWidth: 1,
            },
          ],
        });
        setThreeMonthTime({
          ...ThreeMonthTime,
          labels: labels,
          datasets: [
            {
             
              data: data3MonthTime,
              fill: true,
              backgroundColor: "#a7dbfa ",
              borderColor: "#8da8c6",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        // handleError(error);
      });

    HttpCall(`${getLastDaysUrl}`, "POST", data30Days)
      .then((response) => {
        console.log(
          "geeeeeeeeeeeeeeeeettttttttttt92468489489418948924894ttt report",
          response.data.data
        );
        let data30DaysSets = [];
        let data30DaysTime = [];
        let labels = [];

        for (const iterator of Object.values(response.data.data)) {
          console.log("helllloooo dostod3", iterator.setCount);
          data30DaysSets.push(iterator.setCount);
          data30DaysTime.push(iterator.setTime);
          labels.push(iterator.date);
        }

        setDays30({
          ...Days30,
          labels: labels,
          datasets: [
            {
             
              data: data30DaysSets,
              fill: true,
              backgroundColor: "#a7dbfa ",
              borderColor: "#8da8c6",
              borderWidth: 1,
            },
          ],
        });
        setDays30Time({
          ...Days30Time,
          labels: labels,
          datasets: [
            {
              
              data: data30DaysTime,
              fill: true,
              backgroundColor: "#a7dbfa ",

              borderColor: "#8da8c6",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        // handleError(error);
      });
  }, []);

  const legend = {
    display: false,
  };
  const optionsSets = {
    maintainAspectRatio : false,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: "#000",
            fontSize:16
          },
          gridLines: {
            display: true,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 3000,
            fontColor: "#000",
            stepSize: 500,
            fontSize:18
          },
          gridLines: {
            display: false,
          },
          scaleLabel: {
            display: true,
            fontColor: "#000",
            fontSize:16,
            labelString: "Number of Sets",
          },
        },
      ],
    },
  };
  const optionsTime = {
    maintainAspectRatio : false,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: "#000",
            fontSize: 16,
          },
          gridLines: {
            display: true,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 500,
            fontColor: "#000",
            stepSize: 50,
            fontSize:16
          },
          gridLines: {
            display: false,
          },
          scaleLabel: {
            display: true,
            fontSize:18,
            fontColor: "#000",
            labelString: "Time of Exercise(seconds)",
          },
        },
      ],
    },
  };
  const handlechange1 = () => {
    setOptionSelect(1);
  };
  const handlechange2 = () => {
    setOptionSelect(2);
  };
  const handlechange3 = () => {
    setOptionSelect(3);
  };
  return (
    <Card>
      <div className="d-flex justify-content-between graph-header pb-2">
        <div className="h4">Progress Report</div>
        <div className="dropdown">
          <button
            class="btn btn-light border  dropdown-toggle"
            type="button"
            data-toggle="dropdown"
          >
            Last One Year
          </button>
          <ul className="dropdown-menu">
            <li className="btn" onClick={handlechange1}>
              Last 30 days
            </li>
            <li className="btn" onClick={handlechange2}>
              Last 3 Month
            </li>
            <li className="btn" onClick={handlechange3}>
              Last One Year
            </li>
          </ul>
        </div>
      </div>
      <div className="sets-graph-container my-2">
        <Line
          data={
            (optionSelect === 1 && Days30Time) ||
            (optionSelect === 2 && ThreeMonthTime) ||
            (optionSelect === 3 && lastYearTime)
          }
          legend={legend}
          options={optionsTime}
        />
      </div>
      <div  className="Time-graph-container my-3">
        <Line
          data={
            (optionSelect === 1 && Days30) ||
            (optionSelect === 2 && ThreeMonth) ||
            (optionSelect === 3 && lastYear)
          }
          legend={legend}
          options={optionsSets}
        />
      </div>
    </Card>
  );
};

export default ProgressReport;
