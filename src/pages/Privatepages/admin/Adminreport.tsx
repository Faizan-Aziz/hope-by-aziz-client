import React from 'react'
import PageTitle from '../../../componenets/page-title'

import { useState ,useEffect } from 'react'
import axios from 'axios'
import { message, Spin, Table } from 'antd'
import ReportCard from './reportcard'
import dayjs from 'dayjs'
import {Table as AntdTable} from 'antd';




const Adminreport = () => {

    const [Loading,setLoading] = useState(false)
    const [reports, setreports] = useState ({
        totalUser :0,
        totalCampaign : 0,
        totalDonation: 0,
        totalAmount: 0,
        lastFiveDonation: [] ,  
    })

    const getdata = async ()=>{
        try {
            
        setLoading(true);    
        const response= await axios.get("/api/reports/admin-reports");
        
        setreports(response.data)

        } catch (error:any) {
            message.error(error.message)
            
        }finally{
           setLoading(false);
        }
    }

    useEffect(() => {
    getdata()
    }, [])

      const columns =[
              {
                title : 'Campaign',
                dataIndex: 'campaign',                                                // Your state → dataSource → dataIndex → displays value
                render :(text:string , record : any) => record.campaign.name         //render used if the campagin is in nested loop
              },
              {
                title : 'Donor',
                dataIndex: 'donor',                                               
                render :(text:string , record : any) => record.user.name        
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
        <PageTitle title="Admin Reports"/>
        {Loading && (
            <div className='flex justify-center items-center h-96'>
                <Spin/>
            </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        <ReportCard title="Total Users" value={reports.totalUser}/>
        <ReportCard title="Total Campaigns" value={reports.totalCampaign}/>
        <ReportCard title="Total Donations" value={reports.totalDonation}/>
        <ReportCard 
        title="Amount Collected"
        value={reports.totalAmount}
        showCurrency
        />




        </div>

          <div className='mt-7'>
              <h1 className='text-lg font-bold mb-5'>Last 5 Donations</h1>
              <AntdTable columns ={columns} dataSource={reports.lastFiveDonation}  loading={Loading}/> 
          </div>
    </div>
  )
}

export default Adminreport