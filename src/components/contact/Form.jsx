import { useState } from "react";
import axios  from "axios";
const Form = () => {

  const handleSubmit = async (event)=>{
    event.preventDefault();

    const contentbody={
      name, email,phone,message
    }
    console.log("bodycontent:",contentbody)
  

    try{
      const {data}= await axios({
        url:"",
        method:"POST",
        data:contentbody
      }).then((res)=>{
        console.log(res);
       
        setName('')
        setPhone('')
        setEmail('')
        setMessage('')
      });
      console.log("Response Back",data)
    }
    catch(error){
      console.log("Error:",error)
    }

    // send data over server



    // const response=await fetch('https://cloudagent.co.ke/backend/api/v1/login',
    // {
    //   method:'POST',
    //   headers:{
    //     'Content-Type':'application/json',
    //   },
    //   body:JSON.stringify({name,email,phone,message})
    // }
    // console.log("body:",body)
    // );
    // if (response.ok) {
    //   const data = await response.json();
    //   localStorage.setItem('token', data.access_token);
    //   const myValue = localStorage.getItem('token');
    //   setLoading(false);
    //   toast.notify(`Message sent Successfully`);
    //   push('contact');
    // } else {
    //   const errorData = await response.json();
    //   setError(errorData.message);
    //   setLoading(false);
    //   toast.notify(errorData.message, {
    //     duration: 5,
    //     type: 'error',
    //   });
    //   toast.notify(errorData.message);
    //   console.log(errorData.message);
    // }
  }

  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [phone, setPhone]=useState("");
  const [subject, setSubject]=useState("");
  const [message,setMessage]=useState("")
  

  console.log("Name:",name)
  console.log("Email:",email)
  console.log("Phone:",phone)
  console.log("Subject:",subject)
  console.log("Message:",message)
  return (
    <form className="contact_form" action="#">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <input
              id="form_name"
              name="form_name"
              className="form-control"
              required="required"
              type="text"
              placeholder="Name"
              value={name}
              onChange={({target})=>setName(target?.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <input
              id="form_email"
              name="form_email"
              className="form-control required email"
              required="required"
              type="email"
              placeholder="Email"
              value={email}
              onChange={({target})=>setEmail(target?.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <input
              id="form_phone"
              name="form_phone"
              className="form-control required phone"
              required="required"
              type="phone"
              placeholder="Phone"
              value={phone}
              onChange={({target})=>setPhone(target?.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <input
              id="form_subject"
              name="form_subject"
              className="form-control required"
              required="required"
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={({target})=>setSubject(target?.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-12">
          <div className="form-group">
            <textarea
              id="form_message"
              name="form_message"
              className="form-control required"
              rows="8"
              required="required"
              placeholder="Your Message"
              value={message}
              onChange={({target})=>setMessage(target?.value)}
            ></textarea>
          </div>
          {/* End .col */}

          <div className="form-group mb0">
            <button type="submit" className="btn btn-lg btn-thm" onClick={handleSubmit}>
              Send Message
            </button>
          </div>
          {/* End button submit */}
        </div>
      </div>
    </form>
  );
};

export default Form;
