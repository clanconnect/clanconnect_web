import { HttpService } from "./https.service";
import { BASE_URL } from "../../config/config";

const http = new HttpService();

export class CaptchaService{
  async verifyCaptcha(data: any) {
    const path = BASE_URL + '/captcha/verify';
    const response = await http.postRequest(path, data, null);
    return response;
  };
}