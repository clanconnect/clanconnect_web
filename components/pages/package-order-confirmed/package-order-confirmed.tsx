'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from '@/lib/router';
// import {
//   PaymentGatewayService,
//   LocalService,
// } from '../../../core/services';
import { PaymentGatewayService } from '../../../core/services/PaymentGatewayService';
import { LocalService } from '../../../core/services/local.service';
import OrderConfirmedTemplate from './order-confirmed-template';
import DateTimeComponent from '../common/helpers/date-time-component';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Skeleton } from '@mui/material';
import * as gtUtil from "../../../core/utility/constant";

const paymentGateway: PaymentGatewayService = new PaymentGatewayService();
const localService: LocalService = new LocalService();

export const PackageOrderConfirmed = () => {
  const [searchParams] = useSearchParams();
  const payment_id = searchParams.get('payment_id');
  const campaign_id = searchParams.get('campaign_id') || '0'
  const campaign_planId = searchParams.get('campaign_planId') || '0'
  const [loading, setLoading] = useState<boolean>(false)

  const [order, setOrderDetails] = useState({
    name: '',
    email: '',
    contact: '',
    order_id: '',
    status: '',
    payment_id: '',
    amount: '',
    plan_start: '',
    plan_end: '',
    plan_type: '',
    plan_name: '',
    account_type: ''
  })

  async function getOrderDetails(payment_id: string | number) {
    try {
      setLoading(true);
      const response: any = await paymentGateway.getConfirmedPackageOrderDetails(payment_id);
      if (response.status === gtUtil.Constants.SUCCESS) {
        setOrderDetails({...order, ...response.data.rows[0]})
        setLoading(false);
        if (window.gtag) {
          window.gtag('event', 'purchase', {
            transaction_id: response.data.rows[0]?.order_id,
            affiliation: 'Purchase Confirmation',
            value: response.data.rows[0]?.amount,
            currency: 'INR',
            tax: (response.data.rows[0].amount - response.data.rows[0].net_amount),
            items: [response.data.rows[0]],
          });
        }    
      } else {
        localService.toastify(response.info, 'info', 1000);
        // setAvailablePlan(null);
      }
    } catch (error) {
      console.error(`getSubsctiption Detail in Subscription Influencer :: ${JSON.stringify(error)}`);
    }
  }

  useEffect(() => {
    if (payment_id) {
      // console.log('Payment ID:', payment_id);
      getOrderDetails(payment_id);
    }
    // getSubscriptionDetail();
  }, []);

  function get_header_content(){
    try{
      if (['Brand', 'Advertiser'].includes(order?.account_type) && ['New Campaign', 'Republish Campaign', 'New Paid Campaign', 'New Barter Campaign', 'Upgrade Barter Proposal Limit'].includes(order?.plan_name)){
        switch (order?.plan_name){
          case 'New Campaign':
            return "Congratulations! You can now run the campaign on the platform"
          case 'New Paid Campaign':
            return "Congratulations! You can now run the campaign on the platform"
          case 'New Barter Campaign':
            return "Congratulations! You can now run the campaign on the platform"
          case 'Republish Campaign':
            return "Payment Received. You can now run the campaign with your shortlisted influencers"
          case 'Upgrade Barter Proposal Limit':
            return "Congratulations! You will able to view 50+ more proposals"
          default:
            return "Congratulations! You can now run the campaign on the platform"
        }
      }
      else if (['Brand', 'Advertiser'].includes(order?.account_type)){
        return "Your payment is successful."
      }else{
        return "Your payment is successful."
      }
    } catch (error) {
      console.error(`handle transaction confirmation heading content Error :: ${error}`);
    }
  }

  function get_header_title(){
    try{
      if (['New Campaign', 'Republish Campaign', 'New Paid Campaign', 'New Barter Campaign'].includes(order?.plan_name)){
        return "Payment details:"
      }else{
        return "Your Payment details:"
      }
    } catch (error) {
      console.error(`handle transaction confirmation heading title Error :: ${error}`);
    }
  }

  const renderCustomerDetails = () => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="customer details table">
          <TableBody>
            <TableRow>
              <TableCell className="pr-2">Customer Name:</TableCell>
              <TableCell>{order.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pr-2">Customer Email:</TableCell>
              <TableCell>{order.email || '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pr-2">Customer Phone:</TableCell>
              <TableCell>{order.contact || '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pr-2">Order id:</TableCell>
              <TableCell>{order.order_id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pr-2">Status:</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pr-2">RazorPay Payment ID:</TableCell>
              <TableCell>{order.payment_id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pr-2">Total Price:</TableCell>
              <TableCell>{order.amount}</TableCell>
            </TableRow>
            {[null, ''].includes(campaign_id) && (
              <>
                <TableRow>
                  <TableCell className="pr-2">Plan start date:</TableCell>
                  <TableCell><DateTimeComponent dateTimeString={order.plan_start} /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="pr-2">Plan end date:</TableCell>
                  <TableCell><DateTimeComponent dateTimeString={order.plan_end} /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="pr-2">Plan Type:</TableCell>
                  <TableCell>{order.plan_type}</TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <OrderConfirmedTemplate
      userType={order?.account_type}
      planName={order?.plan_name}
      campaignPlanId={campaign_planId}
      campaignId={campaign_id}
    >
      <span className="pb-5 d-block mt-0 text-center">{get_header_content()}</span>
      <strong className='d-block pb-1'>{get_header_title()}</strong>
      { loading 
        ? 
          <Skeleton height={40} /> 
        : 
          renderCustomerDetails()
      }
    </OrderConfirmedTemplate>
  )
}