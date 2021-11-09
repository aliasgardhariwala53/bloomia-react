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
  const [ThreeMonth, setThreeMonth] = useState({});
  const [lastYear, setlastYear] = useState({});
  const [Days30, setDays30] = useState({});
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
        let empAge = [];
        let labels = Object.keys(response.data.data[0]).sort(function (
          dateA,
          dateB
        ) {
          return new Date(dateA) - new Date(dateB);
        });

        for (const iterator of Object.values(response.data.data[0])) {
          empAge.push(iterator.setCount);
        }

        setlastYear({
          ...lastYear,
          labels: labels,
          datasets: [
            {
              label: "Sales of 2020",
              data: empAge,
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
        let empAge2 = [];
        let labels = Object.keys(response.data.data[0]).sort(function (
          dateA,
          dateB
        ) {
          return new Date(dateA) - new Date(dateB);
        });

        for (const iterator of Object.values(response.data.data[0])) {
          empAge2.push(iterator.setCount);
        }

        setThreeMonth({
          ...ThreeMonth,
          labels: labels,
          datasets: [
            {
              label: "Sales of 2020",
              data: empAge2,
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
        let empAge3 = [];
        let labels2 = [];

        for (const iterator of Object.values(response.data.data)) {
          console.log("helllloooo dostod3", iterator.setCount);
          empAge3.push(iterator.setCount);
          labels2.push(iterator.date);
        }

        setDays30({
          ...Days30,
          labels: labels2,
          datasets: [
            {
              label: "Sales of 2020",
              data: empAge3,
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
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 14,
    },
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 3000,
            stepSize: 100,
          },
          gridLines: {
            display: false
        }
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
      <div className="d-flex justify-content-between">
        <div>Progress Report</div>
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
      <Line
        data={
          (optionSelect === 1 && Days30) ||
          (optionSelect === 2 && ThreeMonth) ||
          (optionSelect === 3 && lastYear)
        }
        legend={legend}
        options={options}
      />
    </Card>
  );
};

export default ProgressReport;
