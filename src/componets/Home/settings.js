import React, { useState,useEffect } from "react";
import "./settings.css";

const Settings = (props) => {
  var n = 60;
  var arr = [...Array(n)].map((item, index) => index + 1);

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
  const dropdownChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSelecttime({ ...selecttime, [name]: Number(value) });
  };
  
  useEffect(()=> {
    
    // console.log(selecttime);
    props.onSubmitForm(selecttime);
      // props.onChangeFilter(selecttime);
    }, [selecttime])
  const submitFormTime = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <h5>Kegel Exercise</h5>
          <span>
            <h3>
              <select id="cars" name="carlist" form="carform ">
                <option value="volvo">Beginner</option>
                <option value="saab">Quick</option>
                <option value="opel">Advanced</option>
                <option value="audi">Quick</option>
              </select>
            </h3>
          </span>
        </div>
        <div className="col-1 "></div>
        <div className="col-1 button-color fa-icon offset-3 d-flex justify-content-center align-items-center rounded-circle">
          <i  className="fas  fa-sm">
            W
          </i>
        </div>
        <div className="col-1 fa-icon d-flex justify-content-center align-items-center  rounded-circle">
          <i  className="fas fa-fill-drip fa-sm"></i>
        </div>
        <div className="col-1 fa-icon d-flex justify-content-center align-items-center rounded-circle ">
          <i  className="fas fa-volume-up fa-sm"></i>
        </div>
      </div>

      <form onSubmit={submitFormTime} className="row formSetting ">
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
              <option value={i+1}>{i + 1}</option>
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
            {arr.map((object, i) => (
              <option value={i+1}>{i + 1}</option>
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
            {arr.map((object, i) => (
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
            <h6 className="float-left mt-5">Reverse Kegel Exercise <span ><i className="far fa-question-circle fa-sm"></i></span></h6>
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
              {arr.map((object, i) => (
                <option style={{backgroundColor:"black"}}value={i + 1}>{i + 1}</option>
                ))}
            </select>
                <div className="title-section">Reps</div>
          </div>
        </fieldset>

        {/* <button type="submit" className="btn btn-primary">
          Submit
        </button> */}
      </form>
    </div>
  );
};

export default Settings;
