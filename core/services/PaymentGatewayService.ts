import { HttpService } from "./https.service";
import { BASE_URL } from '../../config/config';
import { CreateOrder } from 'custom-type';
// import { ClanShopCreateOrder } from 'custom_type';

const http = new HttpService();

export class PaymentGatewayService {

  async createOrder(data: CreateOrder):Promise<any> {
    const path = BASE_URL + '/create/order';
    try {
        const response = await http.postRequest(path, data, null);
        return response;
    } catch (error) {
        throw new Error(`Create Plan Service :: ${error}`)
    }
  };

  async clanShopCreateOrder(data: any):Promise<any> {
    const path = BASE_URL + '/clanshop/create/order';
    try {
      const response = await http.postRequest(path, data, null);
      return response;
    } catch (error) {
      throw new Error(`Create Plan Service :: ${error}`)
    }
  };

  async clanShopUpdateOrderDetail(data: any):Promise<any> {
    const path = BASE_URL + '/clanshop/payment/info';
    try {
      const response = await http.postRequest(path, data, null);
      return response;
    } catch (error) {
      throw new Error(`Create Plan Service :: ${error}`)
    }
  };

  // To fetch orders confirmed page details
  async getConfirmedOrderDetails(payment_id: string | number) {
    try {
      const path = BASE_URL + `/orders/confirmed?payment_id=${payment_id}`;
      const response = await http.getRequest(path, null);
      return response;
    } catch (error) {
      throw new Error(`getReviewCampaigns :: ${error}`);
    }
  }

  async createPackageOrder(data: CreateOrder):Promise<any> {
    const path = BASE_URL + '/create/package/order';
    try {
        const response = await http.postRequest(path, data, null);
        return response;
    } catch (error) {
        throw new Error(`Create Plan Service :: ${error}`)
    }
  };

  async updatePackageOrderDetail(data: any) {
    const path = BASE_URL + '/package/payment/info';
    try {
      const response = await http.postRequest(path, data, null);
      return response;
    } catch (error) {
      throw new Error(`Create Plan Service :: ${error}`)
    }
  }

  // To fetch orders confirmed page details
  async getConfirmedPackageOrderDetails(payment_id: string | number) {
    try {
      const path = BASE_URL + `/package/orders/confirmed?payment_id=${payment_id}`;
      const response = await http.getRequest(path, null);
      return response;
    } catch (error) {
      throw new Error(`getReviewCampaigns :: ${error}`);
    }
  }

}