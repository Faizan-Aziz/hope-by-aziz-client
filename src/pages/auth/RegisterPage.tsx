
import axios from "axios";
import "../../App.css";
import Welcomecontent from "./Welcome-content";
import { Form, Input, Button, message } from "antd"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";
import IndexChatbot from "../Chatbot/IndexChatbot";

const RegisterPage = () => {


  const navigate = useNavigate();
  const [Loading, setloading] = useState(false);
  const onsubmit = async (values: any) => {
    try {

      setloading(true)
      await axios.post("/user/RegisterPage", values);
      message.success("Register successfull, please Login to continue")
      navigate("/Login")

    } catch (error: any) {
      message.error(error.response.data.message || error.message)   // message.error () this is the UI funtion from Antdeign which display  message in popup or notifization  
      // When using Axios for API requests, response.data contains the server’s response.
    } finally {
      setloading(false)
    }

  }



  return (

    <>
    <div className='grid grid-cols-1 md:grid-cols-2 h-screen'>

        <div className='welcome-content primarycolor bg-amber-300 hidden md:flex justify-center items-center'>
        <Welcomecontent />
      </div>

      <div className=' flex items-center justify-center p-4 bg-[#f0f4f8] md:bg-transparent '>
      

        <Form className="flex flex-col gap-5 w-96"
          layout="vertical"
          onFinish={onsubmit}>

          <h1 className="text-2xl !font-bold primarytext self-center">Register your account </h1>
          <hr />

          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              { required: true, message: "Please Enter Your Full Name" },
              { min: 3, message: "Full Name must be at least 3 characters long" },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: "Full Name can only contain letters"
              },
            ]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>



          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please Enter Your Email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input placeholder="xyz@gmail.com" />
          </Form.Item>



          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 8, message: "Password must be at least 8 characters" },
              { pattern: /[0-9]/, message: "Password must contain at least one number" },
              { pattern: /^\S*$/, message: "Password cannot contain spaces" } // This prevents spaces and In the down Button Loading is the proprty in Antdesign which disabled the button if if in loading
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>


          <Button type="primary" htmlType="submit" loading={Loading} >Register</Button>

          <span className="text-sm">
            Have an account ? <Link to={"/Login"}>Login From Here</Link>
          </span>

        </Form>


      </div>

    </div>

    <IndexChatbot/>
    </>
  )
}

export default RegisterPage