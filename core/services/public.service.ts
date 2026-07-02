import {HttpService} from './https.service';
import { BASE_URL } from '../../config/config';
import axios from 'axios';
// import { LetUsHelpYou } from '../../components/let-us-help-you/let-us-help-you';
const http = new HttpService();

export class PublicService {
  async getLocation() {
    try {
      const path = BASE_URL + '/public/location';
      const response = await http.getRequest(path, null);
      return response;
    } catch (error) {
      throw new Error(`getLocation :: ${error}`);
    }
  }

  static async getGenre() {
    const path = BASE_URL + '/public/genre';
    const response = await http.getRequest(path, null);
    return response;
  }
  async getLanguage() {
    const path = BASE_URL + '/public/language';
    const response = await http.getRequest(path, null);
    return response;
  }

  static async sendOtp(data: any) {
    const path = BASE_URL + '/otp/send';
    const response = await http.postRequest(path, data, null);
    return response;
  }

  static async verifyOtp(data: any) {
    const path = BASE_URL + '/otp/verify';
    const response = await http.postRequest(path, data, null);
    return response;
  }

  static async verifyOtpEmail(data: any) {
    const path = BASE_URL + '/otp/verify';
    const response = await http.postRequest(path, data, null);
    return response;
  }

  static async industryList() {
    const path = BASE_URL + '/public/industry';
    const response = await http.getRequest(path, null);
    return response;
  }

  static async getProductPrimaryCategory() {
    const path = BASE_URL + '/public/product_primary_category';
    const response = await http.getRequest(path, null);
    return response;
  }

  // get Campaign Details Via Query Parameters OR Key
  async influencerCampaignDetail(
    key: string | null,
    campaign_id: string | null,
    smId: string | number | null
  ): Promise<Response> {
    let path = '';
    let token = null;
    if (key !== null) {
      path = BASE_URL + `/influencer/campaign?key=${key}`;
      token = 'token';
    } else if (campaign_id !== null) {
      path =
        BASE_URL +
        `/influencer/campaign?campaignId=${campaign_id}&smId=${smId}`;
    }
    const response: any = await http.getRequest(path, token, key ?? '');
    return response;
  }

// when social media connect on d/f tag then get the campaign details for active the deliverable
  async campaignDetailForDeliverable(
    key: string | null,
    campaign_id: string | null,
    smId: string | number | null
  ) {
    let path = '';
    let token = null;
    if (key !== null) {
      path = BASE_URL + `/influencer/campaign?key=${key}`;
      token = 'token';
    } else if (campaign_id !== null) {
      path =
        BASE_URL +
        `/influencer/campaign?campaignId=${campaign_id}&smId=${smId}`;
    }
    const response: any = await http.getRequest(path, token, key ?? '');
    return response;
  }

  //get gstin detail
  async getGSTINDetail(data: any) {
    const path = BASE_URL + `/check/gst`;
    const response = await http.postRequest(path, data, null);
    return response;
  }

  async instagramVerify(params: string) {
    const path = `https://smapi.clanconnect.ai/instagram/public_profile?instagram_handle_name=${params}`;
    const response = await http.getRequest(path, {
      headers: {
        authorization: 'HellowncdgudEkjncinUnjnjcOnc83hnU',
      },
    });
    return response;
  }

  async youtubeVerify(params: string) {
    const path = `https://smapi.clanconnect.ai/youtube/public_profile?channel_id=${params}`;
    const response = await http.getRequest(path, {
      headers: {
        authorization: 'HellowncdgudEkjncinUnjnjcOnc83hnU',
      },
    });
    return response;
  }

  async getPinCodeDetail(params: string) {
    const path = `https://api.postalpincode.in/pincode/${params}`;
    // const response = await http.getRequest(path, {
    //     headers: {
    //         authorization: '',
    //     },
    // });
    const response = await axios.get(path);
    return {status: response.status, data: response.data};
  }

  async getIFSCDetails(params: string) {
    const promise = new Promise(async (resolve, reject) => {
      const response: any = await axios
        .get(`https://ifsc.razorpay.com/${params}`)
        .then((res: any) => {
          resolve({data: res.data, status: res.status});
        })
        .catch((error: any) => {
          reject({status: error.response.status, data: []});
        });
    });

    return promise;
  }

  async PincodeCheckForDelivery(param1: any, param2: string) {
    const path = `https://affiliate.clanconnect.ai/api/prouct/pincode-check?product_id=${param1}&pincode=${param2}`;
    // const response = await http.getRequest(path, {
    //     headers: {
    //         authorization: '',
    //     },
    // });
    const response = await axios.get(path);
    return {status: response.status, data: response.data};
  }

  static async emailSendOtp(data: any) {
    const path = BASE_URL + '/email/otp/send';
    const response = await http.postRequest(path, data, null);
    return response;
  }

  static async emailVerifyOtp(data: any) {
    const path = BASE_URL + '/email/otp/verify';
    const response = await http.postRequest(path, data, null);
    return response;
  }

  async checkInfluencerHandleInDB(data: {
    platform: string;
    handle_name: string;
  }) {
    const path = BASE_URL + `/check/influencer/handlename`;
    const response = await http.postRequest(path, data, null);
    return response;
  }

  async checkEmailIsRegister(data: {email: string; user_type: string}) {
    const path = BASE_URL + `/check/email/register`;
    const response = await http.postRequest(path, data, null);
    return response;
  }

  async checkVerifiedUser(data: {mobile: number; email: string}) {
    const path = BASE_URL + `/check/verified_user`;
    const response = await http.postRequest(path, data, null);
    return response;
  }

  static async clanShopSendOtp(data: any) {
    const path = BASE_URL + '/clanshop/otp/send';
    const response = await http.postRequest(path, data, null);
    return response;
  }

  async requestADemo(data: any): Promise<any> {
    try {
      const path = BASE_URL + `/request-a-demo`;
      const response = await http.postRequest(path, data, null);
      return response;
    } catch (error) {
      throw new Error(`Request a Demo :: ${error}`);
    }
  }

  async getAgencyRoles() {
    try {
      const path = BASE_URL + '/public/agency_roles';
      const response = await http.getRequest(path, null);
      return response;
    } catch (error) {
      throw new Error(`getAgencyRoles :: ${error}`);
    }
  };


  async get_audience_location(platform: ('instagram' | 'youtube')) {
    try {
      const path = BASE_URL + `/public/audience/location?platform=${platform}`;
      const response = await http.getRequest(path, null);
      return response;
    } catch (error) {
      throw new Error(`getAgencyRoles :: ${error}`);
    }
  };

  async get_audience_age_range(platform: ('instagram' | 'youtube')) {
    try {
      const path = BASE_URL + `/public/audience/age-range?platform=${platform}`;
      const response = await http.getRequest(path, null);
      return response;
    } catch (error) {
      throw new Error(`getAgencyRoles :: ${error}`);
    }
  };

  // async letUsHelpYou(data: any): Promise<any> {
  //   try {
  //     const path = BASE_URL + `/let-us-help-you`;
  //     const response = await http.postRequest(path, data, null);
  //     return response;
  //   } catch (error) {
  //     throw new Error(`Request a Demo :: ${error}`);
  //   }
  // }

  async recordFbConversionLead(data:any): Promise <any>{
    try {
      const path = BASE_URL + "/conversion/leadEvent";
      const response = await http.postRequest(path, data, null);
      return response;
    } catch (error) {
      throw new Error("recordFbConversionLead Error :: " + error);
    }  
  }

  async recordFbConversionPageView(data:any): Promise <any>{
    try {
      const path = BASE_URL + "/conversion/pageViewEvent";
      const response = await http.postRequest(path, data, null);
      return response;
    } catch (error) {
      throw new Error("recordFbConversionPageView Error :: " + error);
    }  
  }

  // To get community links Telegram and whatsapp both
  async get_community_links(){//(platform: ('all' | 'whatsapp' | 'telegram')) {
    try {
      // const path = BASE_URL + `/influencer/community_links?platform=${platform}`;
      const path = BASE_URL + `/influencer/community_links`;
      const response = await http.getRequest(path, null);
      return response;
    } catch (error) {
      throw new Error(`getAgencyRoles :: ${error}`);
    }
  };

}
