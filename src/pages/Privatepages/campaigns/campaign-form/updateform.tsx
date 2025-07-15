import  { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Switch, message } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

interface CampaignData {
    name: string;
    description: string;
    organizer: string;
    targetamount: number;
    category: string;
    startDate: string | null;
    endDate: string | null;
    isActive: boolean;
}

const EditCampaign: React.FC = () => {
    const [form] = Form.useForm();
    const { id } = useParams();
    const [campaignData, setCampaignData] = useState<CampaignData | null>(null);

    const fetchCampaignData = async () => {
        try {
            const response = await axios.get(`/api/campaigns/get/${id}`);
            console.log("Fetched campaign data from API:", response.data);

            if (response.data) {
                const updatedData: CampaignData = {
                    ...response.data,
                    startDate: response.data.startDate ? moment(response.data.startDate).format("YYYY-MM-DD") : null,
                    endDate: response.data.endDate ? moment(response.data.endDate).format("YYYY-MM-DD") : null,
                };

                setCampaignData(updatedData);
                console.log("Updated campaign data:", updatedData);
            }
        } catch (error) {
            console.error("Error fetching campaign data:", error);
            message.error("Failed to load campaign data");
        }
    };

    useEffect(() => {
        if (id) fetchCampaignData();
    }, [id]);

    useEffect(() => {
        if (campaignData) {
            form.setFieldsValue({
                name: campaignData.name || "",
                description: campaignData.description || "",
                organizer: campaignData.organizer || "",
                targetamount: campaignData.targetamount || "",
                category: campaignData.category || "",
                startDate: campaignData.startDate ? moment(campaignData.startDate, "YYYY-MM-DD") : null,
                endDate: campaignData.endDate ? moment(campaignData.endDate, "YYYY-MM-DD") : null,
                isActive: campaignData.isActive ?? false,
            });
        }
    }, [campaignData]);

    return (
        <div>
            <h2>Edit Campaign</h2>
            <Form form={form}>
                <Form.Item name="name" label="Campaign Name">
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="organizer" label="Organizer">
                    <Input />
                </Form.Item>
                <Form.Item name="targetamount" label="Target Amount">
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="category" label="Category">
                    <Input />
                </Form.Item>
                <Form.Item name="startDate" label="Start Date">
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item name="endDate" label="End Date">
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item name="isActive" label="Active" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item>
                    <Button type="primary">Update</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditCampaign;
