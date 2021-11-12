import React, { useState, useEffect } from "react";
import "./GoalSet.css";
import { HttpCall } from "../../services/UseHttps";
import { setGoalUrl } from "../../services/Network";
const GoalSet = (props) => {

  const [disable, setdisable] = useState(false);
  const [level, setlevel] = useState(0);
  const disableHandler = () => {
    setdisable(!disable);
  };
  const [goalseted, setgoalseted] = useState(false);
  const [settingGoal, setSettingGoal] = useState({
    set: "1",
    setType: "Beginner",
    totalGoalTime: props.onGoaltime,
  });
  

  let setGoalTime =((props.selecttime[level].a1 + props.selecttime[level].a2) * props.selecttime[level].a3 +(props.selecttime[level].b1 + props.selecttime[level].b2) * props.selecttime[level].b3);

  const handleGoals = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSettingGoal({ ...settingGoal, [name]: value });
  };
  const onsetGoal = (e) => {
    e.preventDefault();
    console.log("heeeellllllllllllllllo", settingGoal);
    HttpCall(`${setGoalUrl}`, "PUT", settingGoal)
      .then((response) => {
        setdisable(false);
      })
      .catch((error) => {});
    setgoalseted(!goalseted);
  };

  useEffect(() => {
    props.onGetSets(settingGoal.set); //gettings sets
  }, [goalseted]);


  useEffect(() => {
    setSettingGoal({
      ...settingGoal,
      totalGoalTime: props.onGoaltime * settingGoal.set,
    });
  switch (settingGoal.setType) {
    case "Beginner":
      setlevel(0)
      break;
    case "Intermediate":
      setlevel(1)
      break;
    case "Advanced":
      setlevel(2)
      break;
    case "Quick":
      setlevel(3)
      break;
  
    default:
      break;
  }
  }, [settingGoal.set,props.onGoaltime,settingGoal.setType]);

  let A = new Date(setGoalTime * settingGoal.set * 1000)
    .toISOString()
    .substr(14, 5)
    .replace(":", " Min ");
  return (
    <div className="p-3 Your-goal row align-items-center m-2">
      <span className="h5 m-0 w-auto text-left">Your Goal</span>
      {!disable && (
        <span
          className="ml-auto custom-button-sign-up px-4 py-2 text-light "
          onClick={disableHandler}
        >
          Modify
        </span>
      )}
      {disable && (
        <div className="w-100 border-top-black mt-2 pt-3">
          <form onSubmit={onsetGoal}>
            <div className="row m-1 align-items-center">
              <div className="col-sm-4 col-12">
                <div className=" text-sm-left ">Sets</div>
                <input
                  id="sets"
                  className="input-sets"
                  type="number"
                  name="set"
                  step="1"
                  value={settingGoal.set}
                  min="1"
                  onChange={handleGoals}
                />
              </div>
              <div className="col-12 offset-sm-2 col-sm-6 ">
                <div className=" text-sm-left  pt-3">Select Type</div>
                <div className="form-group">
                  <h5>
                    <select
                      className="select-level"
                      onChange={handleGoals}
                      id="cars"
                      name="setType"
                      value={settingGoal.setType}
                      form="carform "
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Quick">Quick</option>
                    </select>
                  </h5>
                </div>
              </div>
            </div>

            <div className="row m-0 align-items-center justify-content-center">
              <button
                type="submit"
                className=" btn custom-button-sign-up width-fit-content px-5 py-2 text-light mt-2"
              >
                Set Goal
              </button>
              <span className="m-auto w-auto">
                <input
                  type="number"
                  value={settingGoal.goaltotaltime}
                  onChange={handleGoals}
                  name="goaltotaltime"
                  hidden
                />
                {A} Secs a day.
              </span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default GoalSet;
