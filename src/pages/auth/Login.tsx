
import "../../App.css"; 
import Welcomecontent from "./Welcome-content";
import {App,Form, Input , Button, message} from "antd"
import { Link, useNavigate } from 'react-router-dom'
import Cookies from"js-cookie";
import { useState } from "react";
import axios from "axios";
import ChatBoticon from "../Chatbot/ChatBoticon";
import IndexChatbot from "../Chatbot/IndexChatbot";




const Login = () => {

   const { message } = App.useApp();  //I already wrap the app by antdApp but here i used the component message of Antdapp outside the wrap so declared it first here
   const [Loading, setLoading] = useState(false)
   const Navigate= useNavigate();

  const onsubmit= async (values : any) =>{
    
       try {
        setLoading(true)
        const response=await axios.post('/user/Login' , values)
        message.success("login Successfull")
        Cookies.set("token" , response.data.token) 
        Navigate('/')
       } catch (error:any) {
        
        message.error(error.response.data.message || error.message)
        //  console.log(error);  //error required all the info of the axios when server response back
        //  console.log(error.response);
        //  console.log(error.response?.data);
       }finally{
        setLoading(false)
       }
  }
   

  return (

    <>
    <div className='grid grid-cols-1 md:grid-cols-2 h-screen'> 

        <div className='welcome-content primarycolor bg-amber-300 hidden md:flex justify-center items-center'>
            <Welcomecontent/> 
        </div>

       <div className=' flex items-center justify-center p-4 bg-[#f0f4f8] md:bg-transparent '>
          
          <Form className="flex flex-col gap-5 w-96"
          layout="vertical"
          onFinish={onsubmit}>

          <h1 className="text-2xl !font-bold primarytext">Login to your account </h1>
          <hr />


          <Form.Item

            label="Email"
            name='email'
            rules={[{ required: true, message: 'Please Enter Your Email' }]}
          >
            <Input placeholder="xyz@gmail.com" />
       
          </Form.Item>

          <Form.Item

            label="Password"
            name='password'
            rules={[{ required: true, message: 'Please Enter Your Password' }]}
          >
            <Input.Password placeholder="Please Enter your Password" />
       
          </Form.Item>
          
          <Button type="primary" htmlType="submit"  loading ={Loading}>Login</Button>

          <span className="text-sm">
           Don't Have an account ? <Link to={"/RegisterPage"}>Register from here</Link>
          </span>
         
          </Form>

           

        </div>
        
    </div>

    <IndexChatbot/>
    </>
  )
}

export default Login