import { HttpService } from "./https.service";
import { BASE_URL } from "../../config/config";

const http = new HttpService();

export class SubscriptionService {
  // Fetch active subscription plans. Pass geo_pricing:true to have the backend
  // add USD display fields for visitors outside India (INR fields untouched).
  async getPlanDetails(data: any) {
    const path = BASE_URL + "/get/subscription/plans/detail";
    const response = await http.postRequest(path, data, null);
    return response;
  }
}
