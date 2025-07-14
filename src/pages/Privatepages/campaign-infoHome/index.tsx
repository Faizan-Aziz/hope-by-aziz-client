import { useNavigate , useParams} from "react-router-dom"
import PageTitle from "../../../componenets/page-title"
import { Button, message,Spin,Image} from "antd"
import { useEffect, useState } from "react"
import axios from "axios"
import DonationCard from "./DonationCard"



const Infopage = () => {
    
    const [Loading, setLoading] = useState(false);
    const [CampaignData, setCampaign] = useState<any>([]);
    const Navigate= useNavigate()
    const params=useParams();

    const getdata = async()=>{
        try {

            setLoading(true)
            const response = await axios.get(`/api/campaigns/get/${params.id}`) 
            setCampaign(response.data[0])
            console.log(response.data[0])

        } catch (error:any) {
            message.error(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getdata()
    }, [])
    

  return (

    <div>
        <Button
        onClick= {() => Navigate('/')}>
        Back to Campaigns</Button>


        {Loading && (
        <div className="flex jsutify-center items-center h-96"><Spin/></div>
        )}


        {CampaignData && (
            <div className="mt-5">
               <PageTitle title={CampaignData.name}/> 

            <div className="grid md:grid-cols-3 grid-cols-1 mt-5 gap-5 ">

             <div className="col-span-2">
             <img src={CampaignData.images?.[0]} alt={CampaignData.name} className="rounded w-full md:h-[500px] object-cover"/>
             


             <div className="flex gap-5 mt-5">
                {CampaignData.images?.map((image:any,index:any )=>(
                    <Image src={image} key={index} className="rounded"
                    height={80}
                    width={100}/>
                ))}
             </div>


            <p className="text-lg text-gray-700 leading-relaxed mt-5">
                {CampaignData.description}
            </p>


             </div>


             <div className="col-span-1">
               <DonationCard campaigndata ={CampaignData}
                 reloadCampaignData= {getdata}
                 />
             </div>

                
            </div>
            </div>
        )}
    </div>
  )
}

export default Infopage