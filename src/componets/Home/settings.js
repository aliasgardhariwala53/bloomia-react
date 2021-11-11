import React, { useState, useEffect } from "react";
import Calender from "./Calender";
import GoalSet from "./GoalSet";
import "./settings.css";
import Footer from "./Footer";
import Subscription from "./Subscription";
import EmailNotification from "./EmailNotification";
import Select from "react-select";

import ModalTerms from './ModelTerms'

const Settings = (props) => {
  const [aboutApp, setAboutApp] = useState(false)
  var arr = [...Array(60)].map((item, index) => index + 1);

  var arr2 = [...Array(20)].map((item, index) => index + 1);

  const [disabledreverse, setDisabledreverse] = useState(true);
  const enableReverse = () => {
    setDisabledreverse(!disabledreverse);
  };
  const [selecttime, setSelecttime] = useState({
    a1: 1,
    a2: 1,
    a3: 1,
    b1: 1,
    b2: 1,
    b3: 1,
    c1: 0,
    c2: 0,
    c3: 0,
  });

  let setGoalTime =
    (selecttime.a1 + selecttime.a2) * selecttime.a3 +
    (selecttime.b1 + selecttime.b2) * selecttime.b3;
  const dropdownChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSelecttime({ ...selecttime, [name]: Number(value) });
  };


  useEffect(() => {
    props.onSubmitForm(selecttime);

    // props.onChangeFilter(selecttime);
  }, [selecttime]);
  // useEffect(()=> {
  //   setSelecttime({ ...selecttime, setGoalTime:setGoalTime })
  //   }, [setGoalTime])
  const submitFormTime = (e) => {
    e.preventDefault();
  };

  const onGetSets = (value) => {
    props.setchange(value);
  };

  return (
    <div className="container mt-5">
      <div className="row px-2 justify-content-evenly">
        <ModalTerms onenable={aboutApp} setAboutApp={setAboutApp}/>
      


        <div className="col-12 col-sm-8  text-center text-sm-start">
          

          <div className="h6 d-flex w-100 justify-content-center justify-content-sm-start">Kegel Exercise
          <span className=" round-bottons round-bottons-sm p-1">
            <i onClick={()=>setAboutApp(true)} className="fa fa-question-circle fa-sm"></i>
          </span>
          </div>
          <span>
            <h4>
              <select id="cars" name="carlist" form="carform ">
                <option value="volvo">Beginner</option>
                <option value="saab">Quick</option>
                <option value="opel">Advanced</option>
                <option value="audi">Quick</option>
              </select>
            </h4>
          </span>
        </div>
        
        <div className="col-1 button-color fa-icon  d-flex justify-content-center align-items-center rounded-circle">
          <i className="fas  fa-sm">W</i>
        </div>
        <div className="col-1 fa-icon d-flex justify-content-center align-items-center  rounded-circle">
          <i className="fas fa-fill-drip fa-sm"></i>
        </div>
        <div className="col-1 fa-icon d-flex justify-content-center align-items-center rounded-circle ">
          <i className="fas fa-volume-up fa-sm"></i>
        </div>
      </div>

      <form
        onSubmit={submitFormTime}
        className="row formSetting position-relative m-2"
      >
        <div className="col-12">
          <h6 className="float-left mt-3">Long Squeeze</h6>
        </div>
        <div className=" form-group col-4">
          <select
            id="cars"
            name="a1"
            className="form-control"
            value={props.selected.a1}
            onChange={dropdownChangeHandler}
          >
            {arr.map((object, i) => (
              <option value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <div className="title-section">Squeeze Seconds</div>
        </div>
        <div className=" form-group col-4">
          <select
            id="cars"
            name="a2"
            className="form-control"
            value={props.selected.a2}
            onChange={dropdownChangeHandler}
          >
            {arr.map((object, i) => (
              <option value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <div className="title-section">Rest Seconds</div>
        </div>
        <div className=" form-group col-4">
          <select
            id="cars"
            name="a3"
            className="form-control"
            value={props.selected.a3}
            onChange={dropdownChangeHandler}
          >
            {arr2.map((object, i) => (
              <option value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <div className="title-section">Reps</div>
        </div>

        <div className="col-12 mt-3">
          <h6 className="float-left">Short Squeeze</h6>
        </div>
        <div className=" form-group col-4">
          <select
            id="cars"
            name="b1"
            className="form-control"
            value={props.selected.b1}
            onChange={dropdownChangeHandler}
          >
            {arr.map((object, i) => (
              <option value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <div className="title-section">Squeeze Seconds</div>
        </div>
        <div className=" form-group col-4">
          <select
            id="cars"
            name="b2"
            className="form-control"
            value={props.selected.b2}
            onChange={dropdownChangeHandler}
          >
            {arr.map((object, i) => (
              <option value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <div className="title-section">Rest Seconds</div>
        </div>
        <div className=" form-group col-4">
          <select
            id="cars"
            name="b3"
            className="form-control"
            value={props.selected.b3}
            onChange={dropdownChangeHandler}
          >
            {arr2.map((object, i) => (
              <option value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <div className="title-section">Reps</div>
        </div>

        <div className="fieldsettoggle form-check form-switch">
          <input
            className=" form-check-input"
            onClick={enableReverse}
            type="checkbox"
            id="flexSwitchCheckDefault"
          />
        </div>
        <fieldset className="row my-4" disabled={disabledreverse}>
          <div className="col-12">
            <h6 className="float-left mt-3 mb-3">
              Reverse Kegel Exercise{" "}
              <span>
                <i className="far fa-question-circle fa-sm"></i>
              </span>
            </h6>
          </div>

          <div className=" form-group col-4">
            <select
              id="cars"
              name="c1"
              className="form-control"
              value={props.selected.c1}
              onChange={dropdownChangeHandler}
            >
              {arr.map((object, i) => (
                <option value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <div className="title-section">Squeeze Seconds</div>
          </div>
          <div className=" form-group col-4">
            <select
              id="cars"
              name="c2"
              className="form-control"
              value={props.selected.c2}
              onChange={dropdownChangeHandler}
            >
              {arr.map((object, i) => (
                <option value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <div className="title-section">Rest Seconds</div>
          </div>
          <div className=" form-group col-4">
            <select
              id="cars"
              name="c3"
              className="form-control"
              value={props.selected.c3}
              onChange={dropdownChangeHandler}
            >
              {arr2.map((object, i) => (
                <option style={{ backgroundColor: "black" }} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <div className="title-section">Reps</div>
          </div>
        </fieldset>
      </form>
      <Calender />
      <GoalSet onGoaltime={setGoalTime} onGetSets={onGetSets} />
      <EmailNotification />
      <Subscription />
      <Footer />
    </div>
  );
};

export default Settings;
