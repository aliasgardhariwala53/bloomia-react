

const Validate = (values) => {
  let errors={};

  if(!values.first_name.trim()){
    errors.first_name="firstname required";
  }
  if(!values.last_name.trim()){
    errors.last_name="lastname required";
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
  if(!values.contact){
    errors.contact="contact required";
  }else if(values.contact.length !== 10){
    errors.contact="contact need to be 10 Number ";
  }

  if (values.first_name && values.last_name && values.email && values.password && values.contact && values.contact.length !== 10 && values.password.length >= 6) {
    errors.isSignup=true;
  }



  return errors;
}

export default Validate;
