

const Validate = (values) => {
  let errors={};

  if(!values.firstname.trim()){
    errors.firstname="firstname required";
  }
  if(!values.lastname.trim()){
    errors.lastname="lastname required";
  }
  if(!values.email){
    errors.email="email required";
  }else if(!/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  ){
    errors.email="email Invalid";
  }
  if(!values.password){
    errors.password="password required";
  }else if(values.password.length < 6){
    errors.password="password need to be 6 character or more ";
  }



  return errors;
}

export default Validate;
