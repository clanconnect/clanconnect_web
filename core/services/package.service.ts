import { HttpService } from "./https.service";
import { BASE_URL } from "../../config/config";

const http = new HttpService();

export class PackageService {
  async packageTypes() {
    const path =
      BASE_URL + `/get/packages/types`;
    try {
      const response = await http.getRequest(path, null);
      return response;
    } catch (error) {
      throw new Error(`influencerShippingAddressList :: ${error}`);
    }
  }

  async getPackagePlanDetails(data: any) {
    const path = BASE_URL + "/get/package/plans/detail";
    const response = await http.postRequest(path, data, null);
    return response;
  }

  async packageHelpQuery(data: any) {
    const path = BASE_URL + "/request-a-demo";
    const response = await http.postRequest(path, data, null);
    return response;
  }

}