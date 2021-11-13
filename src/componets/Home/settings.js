import React, { useState, useEffect } from "react";
import Calender from "./Calender";
import "./settings.css";
import Footer from "./Footer";
import { useDispatch,useSelector } from 'react-redux'
import { modalActions } from "../../store";
import ModalTerms from "./ModelTerms";
import { PutGoalPresetUrl,getGoalPresetUrl } from "../../services/Network";
import { HttpCall } from "../../services/UseHttps";
import PremiumPlan from "./Subscription/PremiumPlan";
import SubscriptionWrapper from "../UI/SubscriptionWrapper";
import useAvoidFirstExecution from "../../CustomHooks/useAvoidFirstExecution";

const Settings = (props) => {
  const dispatch = useDispatch();
  const Theme = useSelector(state => state.modal.theme)
  var arr = [...Array(60)].map((item, index) => index + 1);
  var arr2 = [...Array(20)].map((item, index) => index + 1);
  const [disabledreverse, setDisabledreverse] = useState(true);
  const enableReverse = () => {
    setDisabledreverse(!disabledreverse);
  };
  const [level, setLevel] = useState(0);

  const [selectedOption, setselectedOption] = useState([
    {
      a1: 1,
      a2: 1,
      a3: 1,
      b1: 1,
      b2: 1,
      b3: 1,
      c1: 0,
      c2: 0,
      c3: 0,
    },
    {
      a1: 2,
      a2: 2,
      a3: 2,
      b1: 2,
      b2: 2,
      b3: 2,
      c1: 0,
      c2: 0,
      c3: 0,
    },
    {
      a1: 3,
      a2: 3,
      a3: 3,
      b1: 3,
      b2: 3,
      b3: 3,
      c1: 0,
      c2: 0,
      c3: 0,
    },
    {
      //Quiq
      a1: 4,
      a2: 4,
      a3: 4,
      b1: 4,
      b2: 4,
      b3: 4,
      c1: 0,
      c2: 0,
      c3: 0,
    },
  ]);

  
  let labels=[];
  useEffect(() => {
    HttpCall(`${getGoalPresetUrl}`, "GET")
      .then((response) => {
        
        for (const iterator of Object.values(JSON.parse(response.data.data[0].setting))) {
          labels.push(iterator);
        }
        setselectedOption(labels)
      })
      .catch((error) => {});
  }, []);
  
  useAvoidFirstExecution(() => {
    
    const obj = {
      setting: JSON.stringify({ ...selectedOption }),
    };
    HttpCall(`${PutGoalPresetUrl}`, "PUT", obj)
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {});

  }, [selectedOption]);

  let newArr = [...selectedOption];
  const dropdownChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    newArr[level][name] = Number(value);
    setselectedOption(newArr);
    // setSelecttime({ ...selecttime, [name]: Number(value) });
   
  };

  const LevelChangeHandler = (e) => {
    console.log("LevelChangeHandler", e.target.value);
    setLevel(e.target.value);
  };
  let newlevel = level;
  useEffect(() => {
    props.onSubmitForm(selectedOption[newlevel]);
  }, [level, selectedOption[newlevel]]);

  const submitFormTime = (e) => {
    e.preventDefault();
  };

  const onGetSets = (value) => {
    props.setchange(value);
  };

  return (
    
    <div className="container mt-3">
      <div className="row px-2 justify-content-evenly">
        <ModalTerms />

        <div className="col-12 col-sm-8  text-center text-sm-start">
          <div className="h6 d-flex w-100 justify-content-center justify-content-sm-start">
            Kegel Exercise
            <span className=" round-bottons round-bottons-sm p-1">
              <i
                onClick={() => dispatch(modalActions.termHandler())}
                className="fa fa-question-circle fa-sm"
              ></i>
            </span>
          </div>
          <span>
            <h4>
              <select
                value={level}
                onChange={LevelChangeHandler}
                id="cars"
                name="carlist"
                form="carform "
              >
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
        <div className={` ${Theme?'':'bg-blue'} col-1 fa-icon d-flex justify-content-center align-items-center  rounded-circle`}>
          <i className={` ${Theme?'':'text-light'} fas fa-fill-drip fa-sm`} onClick={()=>dispatch(modalActions.themeHandler())}></i>
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
              <option value={i}>{i}</option>
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
              <option value={i}>{i}</option>
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
              <option value={i}>{i}</option>
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
                <option value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <div className="title-section">Reps</div>
          </div>
        </fieldset>
      </form>
      <Calender />
     <PremiumPlan/>
     
     <SubscriptionWrapper selecttime={selectedOption} onGetSets={onGetSets}/>
      <Footer />
    </div>
  );
};

export default Settings;
