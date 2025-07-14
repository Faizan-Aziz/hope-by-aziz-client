import { useEffect, useState } from 'react'
import PageTitle from '../../../componenets/page-title'
import { message,Spin,Progress } from 'antd'
import axios from 'axios'
import "../../../App.css";
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'antd';
import IndexChatbot from '../../Chatbot/IndexChatbot';
import ChatBoticon from '../../Chatbot/ChatBoticon';





const Home = () => {

  const [Campaign, setCampaign] = useState([])
  const [loading, setLoading] = useState(false)
  const Navigate=useNavigate();

  const getdata = async () => {

    try {

      setLoading(true)
      const response = await axios.get('/api/campaigns/get-all')
      setCampaign(response.data)
      console.log(response.data)

    } catch (error: any) {
      message.error(error)
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
  getdata()
  }, [])
  

  return (
    <>
    <div>

      <PageTitle title="Campaigns" />

      {loading && (
        <div className="flex jsutify-center items-center h-96"><Spin/></div>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 '>

      {Campaign.map((campaign:any)=>(
      <div className='rounded border border-solid border-gray-200 cursor-pointer hover:border-gray-800'
      key={campaign._id}
      onClick={()=>Navigate(`/campaign/${campaign._id}`)}
      >
          
        <img src={campaign.images[0]} alt={campaign.name} className="rounded-t w-full h-52 object-cover"/>
         

         <div className='flex flex-col gap-1 p-3 font-semibold'>
            {/* Campaign Name with Tooltip */}
            <Tooltip title={campaign.name}>
              <h1 className='text-sm truncate'>
                {campaign.name}
              </h1>
            </Tooltip>
         </div>



        <div className='pl-3 pr-3 pb-2'>
            <Progress
              percent={parseFloat(
                ((campaign.collectedAmout / campaign.targetamount) * 100).toFixed(2)
              )}
            />
              <h1 className='text-xm text-black mt-0.5'>
                ${campaign.collectedAmout} raised of ${campaign.targetamount}
              </h1>



        </div>  
        </div>
        ))}
        </div>

     </div>

    <IndexChatbot/>
     
     </>

  )
}

export default Home