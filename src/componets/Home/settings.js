import React, { useState, useEffect ,useRef} from "react";
import Calender from "./Calender";
import GoalSet from "./GoalSet";
import "./settings.css";
import Footer from "./Footer";
import Subscription from "./Subscription";
import EmailNotification from "./EmailNotification";
import Select from "react-select";

import ModalTerms from "./ModelTerms";
import { getGoalStreakUrl } from "../../services/Network";
import { HttpCall } from "../../services/UseHttps";

const Settings = (props) => {
  const selectRef = useRef()
  const [aboutApp, setAboutApp] = useState(false);
  var arr = [...Array(60)].map((item, index) => index + 1);

  var arr2 = [...Array(20)].map((item, index) => index + 1);

  const [disabledreverse, setDisabledreverse] = useState(true);
  const enableReverse = () => {
    setDisabledreverse(!disabledreverse);
  };
  const [level, setLevel] = useState(0)
  const [changes, setChanges] = useState(true)
  const [begginer, setbegginer] = useState({
    
    long:8,
    longReps:12,
    longRest:23,
    short:1,
    shortReps:2,
    shortRest:2,
  })
  const [advance, setAdvance] = useState({
    long:10,
    longReps:21,
    longRest:30,
    short:1,
    shortReps:2,
    shortRest:2,
  })

  const [selectedOption, setselectedOption] = useState([{
    a1: 18,
    a2: 15,
    a3: 19,
    b1: 12,
    b2: 12,
    b3: 1,
    c1: 0,
    c2: 0,
    c3: 0,
  },{
    a1: 30,
    a2: 18,
    a3: 18,
    b1: 18,
    b2: 1,
    b3: 1,
    c1: 0,
    c2: 0,
    c3: 0,
  },{
    a1: 39,
    a2: 16,
    a3: 1,
    b1: 1,
    b2: 1,
    b3: 1,
    c1: 0,
    c2: 0,
    c3: 0,
  },{//Quiq
    a1: 15,
    a2: 31,
    a3: 9,
    b1: 12,
    b2: 17,
    b3: 1,
    c1: 0,
    c2: 0,
    c3: 0,
  }])

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
  const obj = {
    setting:
      "beginner: { long: 8,longRest:10,longReps:2, short: 72,shortRest:10,shortReps:2 },intermediate: {long: 8,longRest:10,longReps:2, short: 72,shortRest:10,shortReps:2 },advance: {long: 8,longRest:10,longReps:2, short: 72,shortRest:10,shortReps:2 },quick: {long: 8,longRest:10,longReps:2, short: 72,shortRest:10,shortReps:2 }",
  };
  const onsetGoal = (e) => {
    e.preventDefault();
    
    HttpCall(`${getGoalStreakUrl}`, "PUT", obj)
      .then((response) => {
       console.log(response);
      })
      .catch((error) => {});
    
  };

  let setGoalTime =
    (selecttime.a1 + selecttime.a2) * selecttime.a3 +
    (selecttime.b1 + selecttime.b2) * selecttime.b3;
    let newArr=[...selectedOption]
  const dropdownChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    newArr[level][name]=Number(value);
    setselectedOption(newArr);
    setSelecttime({ ...selecttime, [name]: Number(value) });
    setChanges(!changes)
  };

  const LevelChangeHandler = (e) => {
    console.log("LevelChangeHandler",e.target.value);
    setLevel(e.target.value)
  };
  let newlevel=level;
  useEffect(() => {
    console.log("ooooooooooooooooooooooooooooooooooppppaaaaaaaaaaaaaaaggggggggggggggggggiiiiiiiiiii",selectedOption[level]);
    props.onSubmitForm(selectedOption[newlevel]);

  }, [level,changes,selectedOption[newlevel]]);


  const submitFormTime = (e) => {
    e.preventDefault();
  };

  const onGetSets = (value) => {
    props.setchange(value);
  };
  


  return (
    <div className="container mt-5">
      <div className="row px-2 justify-content-evenly">
        <ModalTerms onenable={aboutApp} setAboutApp={setAboutApp} />

        <div className="col-12 col-sm-8  text-center text-sm-start">
          <div className="h6 d-flex w-100 justify-content-center justify-content-sm-start">
            Kegel Exercise
            <span className=" round-bottons round-bottons-sm p-1">
              <i
                onClick={() => setAboutApp(true)}
                className="fa fa-question-circle fa-sm"
              ></i>
            </span>
          </div>
          <span>
            <h4>
              <select  value={level} onChange={LevelChangeHandler} id="cars" name="carlist" form="carform ">
                <option value="0">Beginner</option>
                <option value="1">Intermediate</option>
                <option value="2">Advanced</option>
                <option value="3">Quick</option>
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
            value={selectedOption[level].a1}
            
            onChange={dropdownChangeHandler}
          >
            {arr.map((object, i) => (
              <option value={i }>{i }</option>
            ))}
          </select>
          <div className="title-section">Squeeze Seconds</div>
        </div>
        <div className=" form-group col-4">
          <select
            id="cars"
            name="a2"
            className="form-control"
            value={selectedOption[level].a2}
            onChange={dropdownChangeHandler}
          >
            {arr.map((object, i) => (
              <option value={i }>{i}</option>
            ))}
          </select>
          <div className="title-section">Rest Seconds</div>
        </div>
        <div className=" form-group col-4">
          <select
            id="cars"
            name="a3"
            className="form-control"
            value={selectedOption[level].a3}
            onChange={dropdownChangeHandler}
          >
            {arr2.map((object, i) => (
              <option value={i}>{i }</option>
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
            value={selectedOption[level].b1}
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
            value={selectedOption[level].b2}
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
            value={selectedOption[level].b3}
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
              value={selectedOption[level].c1}
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
              value={selectedOption[level].c2}
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
              value={selectedOption[level].c3}
              onChange={dropdownChangeHandler}
            >
              {arr2.map((object, i) => (
                <option  value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <div className="title-section">Reps</div>
          </div>
        </fieldset>
      </form>
      <Calender />
      <GoalSet selecttime={selectedOption} onGetSets={onGetSets} />
      <EmailNotification />
      <Subscription />
      <Footer />
    </div>
  );
};

export default Settings;
