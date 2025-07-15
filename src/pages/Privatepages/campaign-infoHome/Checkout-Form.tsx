import { Modal, Button, message as antdmessage } from 'antd';
import  { useState } from 'react';
import { PaymentElement, AddressElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import useUserStore from '../../../store/UserStore'; // Ensure correct import

const CheckoutForm = (props: any) => {
  const { open, onClose, campaignData, message, amount ,reloadCampaignData } = props;

  const { currentUser } = useUserStore(); // Fix: Use parentheses to invoke the hook
  const [Loading, setLoading] = useState(false)
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
   try {
    
    setLoading(true)
    event.preventDefault();

    if (!stripe || !elements) {
      antdmessage.error("Stripe.js has not finished loading. Please try again.");
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: 'if_required',
    });

    console.log("Payment Result:", result); // Debugging

    if (result.error) {
      antdmessage.error(result.error.message);
    } else {
      antdmessage.success("Donation Successful");
      await axios.post("/api/donations/create", {
        user: currentUser?._id,
        campaign: campaignData._id,
        amount,
        message,
        paymentID: result.paymentIntent.id,

        
      });
      onClose();
      reloadCampaignData();
    }

   } catch (error:any) {
    
    antdmessage.error(error.message)

   }
   finally{

    setLoading(false)

   }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="COMPLETE YOUR DONATION PAYMENT"
      footer={null}
    >
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <AddressElement
          options={{
            mode: "billing",
            allowedCountries: ["US"],
          }}
        />
        <div className="flex justify-end gap-5 mt-5">
          <Button onClick={onClose} disabled={Loading}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={Loading}>
            Donate
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CheckoutForm;