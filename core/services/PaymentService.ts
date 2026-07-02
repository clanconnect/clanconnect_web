// import { PaymentGatewayService, LocalService } from "../../core/services";
import { PaymentGatewayService } from "./PaymentGatewayService";
import { LocalService } from "./local.service";
const Logo = '/assets/images/clan_connect/clan-logo.png';
// import { RazorpayOptions } from 'react-razorpay';
import { CreateOrder } from "custom-type";
import { PAYMENT_GATEWAY_KEY } from "../../config/config";
import * as gtUtil from "../../core/utility/constant";

const paymentGatewayService: PaymentGatewayService = new PaymentGatewayService();
const localService: LocalService = new LocalService();

async function createOrder(orderDetail: CreateOrder) {
  try {
    const response: any = await paymentGatewayService.createPackageOrder(orderDetail);
    return response;
  } catch (error) {
    throw new Error(`CreaterOrder`);
  }
}

async function updateOrderDetail(payment_id: string, props: any) {
  try {
    const response = await paymentGatewayService.updatePackageOrderDetail({
      user_id: props?.user_id || 0,
      account_id: props?.account_id || 0,
      influencer_id: props?.influencer_id || 0,
      account_type: props?.account_type || '',
      account_name: props?.account_name || '',
      login_email: props?.login_email || '',
      login_mobile: props?.login_mobile || '',
      razorpay_payment_id: payment_id,
      campaign_id: props.campaignReducer?.createCampaign?.campaign_id || props?.selectedCampaign?.campaign_id || 0,
      brand_id: props?.brand_id || 0,
      state: props?.state || '',
      address: props?.address || '',
      pincode: props?.pincode || '',
      pan: props?.pan || '',
      gstin: props?.gstin || ''
    });
    if (response.status === gtUtil.Constants.SUCCESS) {
      return payment_id
    } else {
      localService.toastify(response.info, "error", 1000);
      return ''
    }
  } catch (error) {
    console.error(`Update Order Detail Error :: ${error}`);
    return ''
  } finally {
    // getSubscriptionDetail();
  }
}

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// async function makeRazorpayPayment(data: any, props: any, razorpay: any): Promise<any> {
async function makeRazorpayPayment(data: any, props: any): Promise<any> {
  const res = {
    status: false,
    paymentId: '',
    message: 'Payment failed.',
    error: null
  }
  try {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      res.message = 'Razorpay SDK failed to load';
      return res;
    }
    // First Create order
    const razorpayOrder: any = await createOrder({
      user_id: props?.user_id || 0,
      account_id: props?.account_id || 0,
      influencer_id: props?.influencer_id || 0,
      account_type: props?.account_type || '',
      account_name: props?.account_name || '',
      login_email: props?.login_email || '',
      login_mobile: props?.login_mobile || '',
      plan_id: data.plan_id,
      orderDetail: {
        amount: data.amount + '00',
        currency: 'INR',
        notes: {
          key1: 'LS purchase',
        },
      },
      campaign_id: props.campaignReducer?.createCampaign?.campaign_id || props?.selectedCampaign?.campaign_id || 0,
      brand_id: props?.brand_id || 0,
      state: props?.state || '',
      address: props?.address || '',
      pincode: props?.pincode || '',
      pan: props?.pan || '',
      gstin: props?.gstin || ''
    });
    // If Order is Created, the User Makes a Payment
    if (razorpayOrder.status === gtUtil.Constants.SUCCESS) {
      const paymentPromise = new Promise<any>((resolve, reject) => {
        // const RAZORPAY_OPTIONS: (RazorpayOptions) = {
        const RAZORPAY_OPTIONS = {
          key: PAYMENT_GATEWAY_KEY,
          amount: razorpayOrder.data.rows[0].amount_due + '00',
          currency: 'INR',
          name: 'ClanConnect',
          description: `${data?.user_type} ${data.description}`,
          image: Logo,
          order_id: razorpayOrder.data.rows[0].id,
          handler: function (response: any) {
            // Payment successful
            updateOrderDetail(response.razorpay_payment_id, props)
              .then((response) => {
                res.status = true;
                res.message = 'Payment success'
                res.paymentId = response
                resolve(res);
              })
              .catch(error => {
                res.status = false;
                res.message = 'Payment failed'
                res.error = error
                console.error("Update Order Detail Error:", error);
                reject(res); // Reject with appropriate error message
              });
          },
          prefill: {
            name: props.account_name,
            email: props.login_email,
            contact: props.login_mobile,
          },
          notes: {
            address: 'Razorpay Corporate Office',
          },
          theme: {
            color: '#00aae5',
          },
          modal: {
            ondismiss: function () {
              res.status = false;
              res.message = 'Payment cancelled'
              reject(res); // Reject with appropriate error message on cancellation
            }
          }
        };
        // const rzpay = new razorpay(RAZORPAY_OPTIONS);
        // rzpay.open();
        const rzp = new window.Razorpay(RAZORPAY_OPTIONS);
        rzp.open();
        // e.preventDefault();
      });

      return paymentPromise;
    } else {
      // Order creation failed
      localService.toastify(razorpayOrder.info);
      return res
    }
  } catch (error: any) {
    // Error occurred during payment process
    res.error = error;
    console.error("Make Payment Error:", error);
    return res;
  }
}

export { makeRazorpayPayment };