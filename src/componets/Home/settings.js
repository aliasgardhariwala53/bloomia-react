import React,{ useState} from "react";
import "./settings.css"



const Settings = (props) => {
    
    const [disabledreverse, setDisabledreverse] = useState(true);
    const enableReverse =()=>{
        setDisabledreverse(!disabledreverse);
    }
    const [selecttime, setSelecttime] = useState({
        
        a1: 1,
        a2: 1,
        a3: 1,
        b1: 1,
        b2: 1,
        b3: 1,
        c1: 0,
        c2: 0,
        c3: 0
        
      });
      const dropdownChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSelecttime({ ...selecttime, [name]: Number(value) });
    };
    
    // useEffect(()=> {
        
    //     // console.log(selecttime);
    //     props.onChangeFilter(selecttime);
    //   }, [selecttime])
      const submitFormTime = (e) => {
        e.preventDefault();
        props.onSubmitForm(selecttime);
       
        
      };
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <h5>Kegel Exercise</h5>
          <span>
            <h3>
              {/* <select id="cars" name="carlist" form="carform ">
                <option value="volvo">Beginner</option>
                <option value="saab">Quick</option>
                <option value="opel">Advanced</option>
                <option value="audi">Quick</option>
              </select> */}
            </h3>
          </span>
        </div>
        <div className="col-1 "></div>
        <div className="col-1 offset-3 d-flex justify-content-center align-items-center bg-primary rounded-circle h-25 pt-2 mt-3">
          <p>w</p>
        </div>
        <div className="col-1  d-flex justify-content-center align-items-center bg-primary rounded-circle h-25 pt-2 mt-3">
          <p>w</p>
        </div>
        <div className="col-1  d-flex justify-content-center align-items-center bg-primary rounded-circle h-25 pt-2 mt-3">
          <p>w</p>
        </div>
      </div>

      <form onSubmit={submitFormTime} className="row formSetting ">
        <div className="col-12">
          <h4 className="float-left">Long Squeeze</h4>
        </div>
        <div className=" form-group col-4">
          <select id="cars" name="a1" className="form-control" value={props.selected.a1} onChange={dropdownChangeHandler}>
           
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className=" form-group col-4">
          <select id="cars" name="a2" className="form-control" value={props.selected.a2} onChange={dropdownChangeHandler}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className=" form-group col-4">
          <select id="cars" name="a3" className="form-control" value={props.selected.a3} onChange={dropdownChangeHandler}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        
        <div className="col-12">
          <h4 className="float-left">Short Squeeze</h4>
        </div>
        <div className=" form-group col-4">
          <select id="cars" name="b1" className="form-control" value={props.selected.b1} onChange={dropdownChangeHandler}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className=" form-group col-4">
          <select id="cars" name="b2" className="form-control" value={props.selected.b2} onChange={dropdownChangeHandler}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className=" form-group col-4">
          <select id="cars" name="b3" className="form-control" value={props.selected.b3} onChange={dropdownChangeHandler}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
       

        <input className="fieldsettoggle" type="button" onClick={enableReverse} checked data-toggle="toggle" data-style="ios"/>
        <fieldset className="row m-0" disabled={disabledreverse}>
        <div className="col-12">
          <h4 className="float-left">Reverse Kegel Exercise</h4>
        </div>

        <div className=" form-group col-4">
          <select id="cars" name="c1" className="form-control" value={props.selected.c1} onChange={dropdownChangeHandler}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className=" form-group col-4">
          <select id="cars" name="c2" className="form-control" value={props.selected.c2} onChange={dropdownChangeHandler}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className=" form-group col-4">
          <select id="cars" name="c3" className="form-control" value={props.selected.c3} onChange={dropdownChangeHandler}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        </fieldset>
       
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Settings;
