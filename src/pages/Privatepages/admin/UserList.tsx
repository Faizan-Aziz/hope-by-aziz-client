import React, { useEffect, useState } from 'react'
import PageTitle from '../../../componenets/page-title'
import axios from 'axios'
import { message } from 'antd'
import dayjs from 'dayjs'
import {Table as AntdTable2} from 'antd';


const UserList = () => {
    const [User, setUser] = useState()
    const [Loading , setLoading] =useState(false)

    const getdata = async () =>{
        try {
            
            setLoading(true)
            const response = await axios.get("/user/all-user");
            setUser(response.data.user)
           

        } catch (error:any) {
            message.error(error.message)  
        }finally{
         setLoading(false)
        }
    }

     useEffect(() => {
     getdata()
     }, [])
     

    const columns = [
        {
           title :"ID",
           dataIndex : "_id",
           key : "_id",
        },
        {
            title :"Name",
            dataIndex : "name",
            key : "name",
        },
        {
            title :"Email",
            dataIndex : "email",
            key : "email",
        },
        {
            title :"Is Active",
            dataIndex : "isActive",
            render : (isActive : boolean) => isActive ? 'Active' :'Inactive'
        },
        {
            title :"Joined At",
            dataIndex : "createdAt",
            render : (createdAt : string) => dayjs(createdAt).format('MMMM DD YYYY , hh:mm A')
        }
    ]
  return (
    <div>
        <PageTitle title="Users" />

        <AntdTable2 columns ={columns} dataSource={User}  loading={Loading} pagination={{ pageSize: 5 }}/> 
    </div>
    
  )
}

export default UserList