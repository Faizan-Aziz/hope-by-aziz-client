import { useNavigate, useParams } from "react-router-dom"
import PageTitle from "../../../../componenets/page-title";
import { Form, Input, Select, Upload, Button, message } from 'antd'
import "../../../../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Turtle, Pencil } from "lucide-react";



const CampaignForm = () => {

    const [form] = Form.useForm(); // Use Ant Design's form hook
    const params = useParams();
    const [selectedImageFiles, setSelectedImageFiles] = useState<any[]>([])
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);   // Store image URLs
    const [loading, setLoading] = useState(false)
    const [campaigndataforUpdate, setcampaigndataforUpdate] = useState<any | null>()
    const [imagesForupdate, setimagesForupdate] =useState<string[]>([]); 
    const Navigate = useNavigate();



    //from here i can write the update code login
    const getdatacampaigndataForupadte = async () => {
        try {
            const response = await axios.get(`/api/campaigns/get/${params.id}`);
            console.log("API Response:", response.data); // Debugging
            if (Array.isArray(response.data) && response.data.length > 0) {
                setcampaigndataforUpdate(response.data[0]);  // Extract the first object from the array 
                setimagesForupdate(response.data[0].images || []); //Its takes fucking two days to solve form.setFieldsValue method in Ant Design expects a single object ({...}) as its argument. However, your API returns an array of objects ([{...}] 
            } else {                                         //By extracting the first object from the array (response.data[0]), you ensure that the form receives the correct data structure.
                message.error("No data found for this campaign");
            }
        } catch (error: any) {
            message.error(error.message || "Failed to fetch campaign data");
        }
    };


    useEffect(() => {
        if (params.id) {
            getdatacampaigndataForupadte();
        }
    }, []);


    //this login help to render the form is add scenario or update scenario  //this mean the form have the add scenario
    let showform = false;

    if (!params.id) {
        showform = true; // Create mode
    }
    if (params.id && campaigndataforUpdate) {
        showform = true; // Edit mode, wait for data
    }


    useEffect(() => {
        if (campaigndataforUpdate) {

            // console.log("Setting form values:", campaigndataforUpdate); // Debugging

            form.setFieldsValue(campaigndataforUpdate); // Set form values

            // console.log("Form Initial Values:", form.getFieldsValue());
        }
    }, [campaigndataforUpdate]);



    // Convert image URLs to fileList format so that antd design upload component can understand that and Manages which files appear in the upload list and file have property like 1name uid url 
    const getFileListFromUrls = (urls: string[]) => {
        return urls.map((url, index) => ({
            uid: `existing-image-${index}`, // Unique ID for each image
            name: `image-${index}`, // Name of the image
            url: url, // URL of the image
        }));
    };



    //this will upload the images to the cloud and return the images url to the state
    const uploadImagesToCloudinary = async () => {
        const urls = [];

        for (const file of selectedImageFiles) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "Hope-By-Aziz");
            formData.append("cloud_name", "dovqlntrq");

            try {
                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dovqlntrq/image/upload",
                    formData
                );
                urls.push(response.data.secure_url);
            } catch (error) {
                console.error("Upload error:", error);
            }
        }

        setUploadedImages(urls); // Store uploaded URLs in state
        return urls;
    };






    //this will submit the form to the server to save data
    const onsubmit = async (values: any) => {
        try {
            setLoading(true)
            const imageUrls = await uploadImagesToCloudinary(); // Upload images and get URLs

            // values.images = imageUrls; // Save URLs in form data // this will lost the previous value of imagesForupdate because we call here uploadImagesToCloudinary

            values.images = [...imagesForupdate, ...imageUrls]; // Combine existing and new images

            console.log("Form data:", values);

            // You can now send `values` (including `values.images`) to your backend

            if (!params.id) {
                await axios.post('/api/campaigns/create', values)
                message.success("Campaign Created Successfully!");
            }
            else {
                await axios.put(`/api/campaigns/update/${params.id}`, values)
                message.success("Campaign Updated Successfully!");
            }
            Navigate(-1)
        } catch (error: any) {
            message.error(error.message);
        } finally {
            setLoading(false)
        }
    };




    return (
        <div>
            <PageTitle title={params.id ? "Edit Campaign" : "Create Campaign"} />

            <Form
                form={form} // Bind the form instance
                layout='vertical'
                className="flex flex-col gap-5 CampaignformmarginBottom"
                onFinish={onsubmit}

            >


                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: "Please Enter the Campaign Name" }]}

                >
                    <Input placeholder="Enter Campaign Name" />
                </Form.Item>


                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: "Please Enter the description Please" }]}

                >
                    <Input.TextArea placeholder="Enter The Best Description For Your Campaign" />
                </Form.Item>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    <Form.Item
                        name="organizer"
                        label="Organizer"
                        rules={[{ required: true, message: "Please Enter the Organizer " }]}

                    >
                        <Input placeholder="Enter The Organizer Detail" />
                    </Form.Item>


                    <Form.Item
                        name="targetamount"
                        label="Target Amount"
                        rules={[{ required: true, message: "Please Enter The Target Amount " },
                        { pattern: /^\d+$/, message: "Only numbers are allowed" }, // Ensures numbers only
                        ]}

                    >
                        <Input placeholder="Enter A Realistic Target Amount To Raise." />
                    </Form.Item>


                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: "Please Select the Category" }]}

                    >

                        <Select placeholder="Select a category">
                            <Select.Option value="Education">Education</Select.Option>
                            <Select.Option value="Health">Health</Select.Option>
                            <Select.Option value="Food">Food</Select.Option>
                            <Select.Option value="Emergency">Emergency</Select.Option>
                            <Select.Option value="Environment">Environment</Select.Option>
                            <Select.Option value="Animal">Animal</Select.Option>
                            <Select.Option value="Human rights">Human Rights</Select.Option>
                            <Select.Option value="Sponor A Student">Sponsor a Student</Select.Option>
                            <Select.Option value="Research & Technology">Research & Technology</Select.Option>
                            <Select.Option value="others">Others</Select.Option>
                        </Select>
                    </Form.Item>


                    <Form.Item
                        name="startDate"
                        label="Start Date"
                        rules={[{ required: true, message: "Please Enter The Start Day Of Campaign" }]}

                    >
                        <Input type="Date" />
                    </Form.Item>


                    <Form.Item
                        name="endDate"
                        label="End Date"
                        rules={[{ required: true, message: "Please Enter The End Day Of Campaign" }]}

                    >
                        <Input type="Date" />
                    </Form.Item>



                    <Form.Item
                        name="isActive"
                        label="Is Active"
                        rules={[{ required: true, message: "Please Select the Status Of Campaign" }]}

                    >
                        <Select placeholder="Select the Status Of The Campaign" >
                            <Select.Option value={true}>YES</Select.Option>
                            <Select.Option value={false}>NO</Select.Option>
                        </Select>
                    </Form.Item>



                    {/* <Form.Item
                      name="showDonorInCampaignPage"
                      label="Show donors on Campaign page"
                      rules={[{ required: ture, message: "Please Select The Status" }]}
                  >
                      <Select placeholder ="Select the Status Of Donor To Show On The Page" >
                          <Select.Option value={true}>YES</Select.Option>
                          <Select.Option value={false}>NO</Select.Option>
                      </Select>
                  </Form.Item> */}




                    <Form.Item
                        name="images"
                        label="Images"
                        rules={[{ required: true, message: "Please upload at least one image" }]}


                    >
                        <Upload
                            listType="picture-card"
                            accept="image/*" // Restricts file selection to images only

                            beforeUpload={(file: any) => {
                                setSelectedImageFiles((prev: any) => [...prev, file])  //beforeupload runs when a user selects a file, before it uploads. 
                                //INFO : If you don't use the spread operator, the new file will replace the existing state
                                return false
                            }}

                            fileList={[
                                ...getFileListFromUrls(imagesForupdate || []), //Existing images By using the spread operator, you flatten the array bescuse it created the nested array and filelist need only one array object it will merge its elements directly into the fileList:
                                ...selectedImageFiles.map((file: any) => ({    //Manages which files appear in the upload list and file have property like 1name uid url 
                                    ...file,                                   // Spread the existing properties of the file object
                                    url: URL.createObjectURL(file),            //Add/override the `url` property for image preview
                                }))]}

                                onRemove={(file: any) => {
                                    if (file.url && imagesForupdate.length > 0) {
                                        // Remove existing image (from `imagesForupdate`)
                                        setimagesForupdate((prev: any) =>
                                            prev.filter((url: string) => url !== file.url)
                                        );
                                    } else {
                                        // Remove newly selected image (from `selectedImageFiles`)
                                        setSelectedImageFiles((prev: any) =>
                                            prev.filter((item: any) => item.uid !== file.uid)
                                        );
                                    }
                                }}
                        >
                            <span className="text-sm">
                                Upload Images
                            </span>
                        </Upload>
                    </Form.Item>

                </div>


                <div className="flex justify-end gap-5">

                    <Button onClick={() => Navigate(-1)} disabled={loading} >Cancel</Button>

                    <Button type="primary" htmlType="submit" loading={loading}>
                        {params.id ? "Update" : "Create"}
                    </Button>

                </div>


            </Form>



        </div>
    )
}

export default CampaignForm