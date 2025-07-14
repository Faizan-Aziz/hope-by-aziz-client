import { Button, message, Table, Modal ,Tooltip } from "antd"
import PageTitle from "../../../componenets/page-title"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "../../../App.css";
import { Trash2, Pencil, ListCheck } from "lucide-react";
import Campaigndonation from "./Campaigndonation";



const CampaignsPage = () => {

  const Navigate = useNavigate();
  const [loading, setloading] = useState(false)
  const [campaign, setcampaign] = useState([])
  const [selectedCampaign, setSelectedCampaign] = useState()
  const [showCampaignDonations, setShowCampaignDonation] = useState(false)



  const getdata = async () => {
    try {
      setloading(true)
      const response = await axios.get('/api/campaigns/get-all')
      setcampaign(response.data)
    } catch (error: any) {

      message.error(error)
    } finally {
      setloading(false)
    }
  }


  useEffect(() => {
    getdata()
  }, [])



  //this trigger the delete funtionality
  const onDelete = async (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this campaign?",
      onOk: async () => {
        try {
          setloading(true);
          await axios.delete(`/api/campaigns/delete/${id}`);
          message.success("Campaign Deleted Successfully");

          // Update the campaign state by removing the deleted campaign
          setcampaign((prevCampaigns) =>
            prevCampaigns.filter((campaign: any) => campaign._id !== id)
          );

          // Refetch data after deletion (second way)
          // await getdata();
        } catch (error: any) {
          message.error(error.response?.data?.message || "Failed to delete campaign");
        } finally {
          setloading(false);
        }
      },
    });
  };


  //define Table coloumn 
  const columns = [
    {
      title: "Name",
      dataIndex: "name", // This should match a key in campaign data
      key: "name"
    },
    {
      title: "Organizer",
      dataIndex: "organizer",
      key: "organizer"
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category"
    },
    {
      title: "Target Amount",
      dataIndex: "targetamount",
      key: "targetamount",
      render: (targetamount: Number) => `$${targetamount}`
    },
    {
      title: "Collected Amount",
      dataIndex: "collectedAmout",
      key: "collectedAmout",
      render: (collectedAmout: Number) => `$${collectedAmout}` //the second $ is a part of JavaScript template literal syntax, which helps to insert the variable collectedAmout inside the string.
    },
    {
      title: "Is Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => isActive ? "Yes" : "No"

    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => dayjs(createdAt).format("MMM DD, YYYY  hh:mm A")
    },
    {
      title: "Action",                                // In the render function of Ant Design's <Table>,
      Key: "action",                                    // the parameters text, record, and index represent different aspects of each row's data. 
      render: (record: any) => (                         //1.  text	The cell value of the current column
        //2.  record	The entire row object (all fields of that row)
        //3.  index	The row position (0, 1, 2, …) in dataSource
        <div className="flex gap-5">
         <Tooltip title="View Donations">
          <Button size="small">
            <ListCheck size={15}
              onClick={() => {
                setSelectedCampaign(record);
                setShowCampaignDonation(true);
              }} />
          </Button>
          </Tooltip>

          <Button size="small">
            <Trash2 size={15}
              onClick={() => onDelete(record._id)} />
          </Button>

          <Button size="small">
            <Pencil size={15}
              onClick={() => Navigate(`/admin/campaigns/edit/${record._id}`)} />
          </Button>

        </div>
      )

    }
  ];

  return (

    <div>

      <div className=" flex justify-between ">
        <PageTitle title="Campaigns" />
        <Button type="primary" onClick={() => Navigate('/admin/campaigns/create')}>Create Campaign</Button>
      </div>

      <Table columns={columns} dataSource={campaign} loading={loading} rowKey="_id" pagination={{ pageSize: 5 }} className="tablecss" bordered />

  
     {showCampaignDonations && (
     <Campaigndonation 
     open={showCampaignDonations}
     setopen={setShowCampaignDonation}
     selectCampaign={selectedCampaign}
     />
     )}

    </div>


  )
}

export default CampaignsPage