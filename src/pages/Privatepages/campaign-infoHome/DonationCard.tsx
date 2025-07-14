import { Progress , InputNumber,Input,Button , message as messageantd} from "antd"
import axios from "axios";
import { useState } from "react";
const { TextArea } = Input; // ✅ Extract TextArea from Input
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './Checkout-Form.tsx'; // Adjust the path as needed




const stripePublicKey= 'pk_test_51QRgpMBhPO0WsVVIMumvo9M9rAFFewpZjF0ipajtmkTluvln8UhNFdvKCR317HlYGswY6mZlhnNSVWMkYV0JHK1W0004ISSn0q'

const stripePromise = loadStripe(stripePublicKey)

const DonationCard = ({campaigndata , reloadCampaignData} : {
  campaigndata:any , reloadCampaignData : ()=> void}) => {

    const [amount, setamount] = useState(1);
    const [message, setmessage] = useState("")
    const [Loading , setLoading] = useState(false)
    const [clientSecrettoken , setclientSecrettoken] = useState("")
    const [showCheckoutForm, setshowCheckoutForm] = useState(false)


    const getclientSecretToken = async ()=>{

    try {

      setLoading(true);

      const response = await axios.post('/api/payments/create-payment-intent', { amount });
      setclientSecrettoken(response.data.clientSecret) //this secret key help you to create the mean cardUI
      setshowCheckoutForm(true)
      

    } catch (error:any) {

      messageantd.error(error.message)

    } finally{

      setLoading(false)

    }

    }

    const options = {
      // passing the client secret obtained from the server
      clientSecret: clientSecrettoken,
    };

  return (

    <div className="p-5 border border-gray-300 ">
    
    <div>
        <Progress
          percent={parseFloat(
            ((campaigndata.collectedAmout / campaigndata.targetamount) * 100).toFixed(2)
          )}
        />

              <h1 className='text-xm text-black mt-1'>
                ${campaigndata.collectedAmout} raised of ${campaigndata.targetamount}
              </h1>


              <div className="flex flex-col mt-7">
                <label htmlFor="" className="text-sm text-gray-600">Amount</label>
                <InputNumber 
                style={{width : '100%'}}
                type="number" value={amount}
                onChange={(value:any) => setamount(value)} 
                min={1}/>
              </div>



              <div className="flex flex-col mt-5">
                <label htmlFor="" className="text-sm text-gray-600">Message</label>
                <Input.TextArea style={{width : '100%'}}  value={message} onChange={(e) => setmessage(e.target.value)} />
              </div>

            
              <Button type="primary" block className="font-bold mt-7"
              onClick={getclientSecretToken}
              loading={Loading}
              >
              Donate</Button>

              {clientSecrettoken && (
                  <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm 
                  open={showCheckoutForm}
                  onClose={()=> {
                    setclientSecrettoken("")
                    setshowCheckoutForm(false);

                  }}
                  campaignData={campaigndata}
                  message={message}
                  amount={amount}
                  reloadCampaignData={()=>{
                    reloadCampaignData()
                    setamount(1)
                    setmessage("")
                  }}
                  />
                  </Elements>
              )}

    </div>

    </div>

  )  
}

export default DonationCard