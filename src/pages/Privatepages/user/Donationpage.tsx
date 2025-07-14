import React, { useEffect } from 'react'
import PageTitle from '../../../componenets/page-title'
import { useState } from 'react';
import UserStore from '../../../store/UserStore';
import { message } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import {Table} from 'antd';



const Donationpage = () => {

  const {currentUser}= UserStore();
  const [donations, setDonations] = useState<any[]>([]);
  const [Loading, setLoading] = useState(false);



  const getData=async()=>{

    try {
      setLoading(true)
      const response = await axios.get(`/api/donations/get-donations-by-user/${currentUser?._id}`)
      setDonations(response.data)
      // console.log(response.data)

      
    } catch (error:any) {
      message.error(error.message)
    }
    finally{
    setLoading(false)
    }

  }

  useEffect(() => {
  getData()
  },[])

  const columns =[
    {
      title : 'Campaign',
      dataIndex: 'campaign',                                               // Your state → dataSource → dataIndex → displays value
      render :(text:string , record : any) => record.campaign.name         //render used if the campagin is in nested loop
    },
    {
      title : 'Amount',
      dataIndex: 'amount',
      key : 'amount',
      render :(text:string , record : any) => `$${record.amount}`
    },
    {
      title : 'Payment Id',
      dataIndex: 'paymentID',
      key : 'paymentId'
      
    },
    {
      title : 'Date & Time',
      dataIndex: 'createdAt',
      key : 'createdAt',
      render : (text:string , record : any) => dayjs(record.createdAt).format("MMMM DD, YYYY h:mm A")

    }

    
  ]

  
  
  return (
    <div>

      <PageTitle title="Donations"/>
      <Table columns ={columns} dataSource={donations}  loading={Loading}/> 

    </div>

  )
}

export default Donationpage