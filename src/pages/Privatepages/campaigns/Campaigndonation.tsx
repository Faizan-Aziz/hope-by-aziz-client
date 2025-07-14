import { message, Modal ,Table } from "antd"
import axios from "axios"
import dayjs from "dayjs"
import { useEffect, useState } from "react"


const Campaigndonation = ({
    open,
    setopen,
    selectCampaign
   }: {
    open: boolean,
    setopen: (open: boolean) => void,
    selectCampaign: any
  }) => {

    const [doantions, setdonations] = useState([])
    const [loading, setLoading] = useState(false)
    const getdata = async ()=>{
        try {
            setLoading(true)
            const response = await axios.get(`/api/donations/get-donations-by-campaign/${selectCampaign._id}`);
            setdonations(response.data)

        } catch (error:any) {
            message.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
      getdata()
    }, [])

     const columns =[
        {
          title : 'User',
          dataIndex: 'user',                                               // Your state → dataSource → dataIndex → displays value
          render :(text:string , record : any) => record.user.name        //render used if the campagin is in nested loop
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
        <Modal
        open={open}
        onCancel={() => setopen(false)}
        onClose={() => setopen(false)}
        title={<div style={{ marginBottom: 15 }}>{`Donations for ${selectCampaign?.name}`}</div>}
        centered
        width={800}
        footer={null}
       
      >
         <Table columns ={columns} dataSource={doantions}  loading={loading}/> 
        </Modal>
    )
  }
  
  export default Campaigndonation