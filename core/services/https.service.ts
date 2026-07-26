import axios from "axios";
import { LocalService } from "./local.service";
import { Methods } from "../utility/methods";

export class HttpService {
  private http = axios.create();
  private localService = new LocalService();
  private methods = new Methods();

  /*
     If User Header is null then auto set dynamic server header
    */

  // ---------------------------------------------------------------- Dynamic Header / Server Header ----------------------------------------------------------//
  private getHTTPOption(): any {
    let jwtToken: any = "";
    const md5Authorization = this.methods.getAuthKey();
    jwtToken = this.localService.getToken();

    // check for null or unidentified token
    if (
      jwtToken == null ||
      jwtToken === "undefined" ||
      jwtToken === "no token found"
    ) {
      jwtToken = "";
    }

    const httpOptions = {
      headers: {
        Authorization: md5Authorization,
        token: jwtToken,
        "Content-Type": "application/json ; charset=UTF-8",
      },
    };

    return httpOptions;
  }

  //  ---------------------------------------------------------------- Custom Header ---------------------------------------------------------------- //
  private getSMAPIOptions(): any {
    const httpOptions = {
      headers: {
        authorization: "HellowncdgudEkjncinUnjnjcOnc83hnU",
      },
    };

    return httpOptions;
  }

  // ---------------------------------------------------------------- Upload Header ---------------------------------------------------------------- //
  private getUploadingOption(): any {
    let jwtToken: any = "";
    const md5Authorization = this.methods.getAuthKey();
    jwtToken = this.localService.getToken();

    // check for null or unidentified token
    if (
      jwtToken == null ||
      jwtToken === "undefined" ||
      jwtToken === "no token found"
    ) {
      jwtToken = "";
    }

    const httpOptions = {
      headers: {
        Authorization: md5Authorization,
        token: jwtToken,
      },
    };

    return httpOptions;
  };

  //if campaign is without login setToken
  private setCustomToken(token: string): any {
    let jwtToken: any = "";
    const md5Authorization = this.methods.getAuthKey();
    jwtToken = this.localService.getToken();

    // check for null or unidentified token
    if (
      jwtToken == null ||
      jwtToken === "undefined" ||
      jwtToken === "no token found"
    ) {
      jwtToken = token;
    }

    const httpOptions = {
      headers: {
        Authorization: md5Authorization,
        token: jwtToken,
      },
    };

    return httpOptions;
  }

  // ---------------------------------------------------------------- Get Request ---------------------------------------------------------------- //
  // async getRequest(url: string, options: any, key?: string) {
  //   let asyncResult: any;
  //   try {
  //     if (options == null || options === "" || options === "undefined") {
  //       options = this.getHTTPOption();
  //     } else if ((options + "").toString().toLocaleLowerCase() === "file") {
  //       options = this.getUploadingOption();
  //     } else if (options === "sm_api") {
  //       options = this.getSMAPIOptions();
  //     } else if ((options + "").toString().toLocaleLowerCase() === "token") {
  //       options = this.setCustomToken(key ?? '');
  //     }

  //     asyncResult = new Promise(async (resolve, reject) => {
  //       this.http.get(url, options).then(async (response) => {
  //         const token = response.headers['token'];
  //         if ((token + '').toString().toLocaleLowerCase() !== 'undefined') {
  //           this.localService.setToken(token);
  //         };
  //         resolve(response);
  //       }).catch((error) => reject(JSON.stringify(error)));
  //     });

  //     asyncResult = await this.http
  //       .get(url, options)
  //       .catch((e) => console.warn("get Request Error :: " + e));

  //         const token = asyncResult.headers['token'];
  //         if ((token + '').toString().toLocaleLowerCase() !== 'undefined') {
  //           this.localService.setToken(token);
  //         };

  //     if (asyncResult.status >= 400 && asyncResult.status <= 499) {
  //       throw new Error(
  //         "Resource Not found error, Status Code=" + asyncResult.status
  //       );
  //     };
      
  //     return asyncResult.data;
  //   } catch (error) {
  //     throw new Error("Get Request Error :: " + error);
  //   } finally {
  //   }
  // };


  async getRequest(url: string, options: any, key?: string){
    let response:{[key:string]:any} = {};
    try{
      if (options == null || options === "" || options === "undefined") {
        options = this.getHTTPOption();
      } else if ((options + "").toString().toLocaleLowerCase() === "file") {
        options = this.getUploadingOption();
      } else if (options === "sm_api") {
        options = this.getSMAPIOptions();
      } else if ((options + "").toString().toLocaleLowerCase() === "token") {
        options = this.setCustomToken(key ?? '');
      }

      response = await axios.get(url, options);
      
      //save token in local storage
      const token = response.headers['token'];
      if ((token + '').toString().toLocaleLowerCase() !== 'undefined') {
        this.localService.setToken(token);
      };

      response =  response.data;
    }catch(error:any){
      response["info"] =  `Get Request Error ==> ${new Error (error.toString())} stack ==> ${new Error (error.toString()).stack}`
      // alert(`Get Request Error :: ${new Error (error.toString())} Line no: ${new Error (error.toString()).stack}`);
      // console.log(error.toString())
    }finally{
      return response;
    }
  }

  // ---------------------------------------------------------------- Post Request ----------------------------------------------------------------

  async postRequest(url: string, payload: any, options: any) {
    let result: any;
    try {
      if (options == null || options === "" || options === "undefined") {
        options = this.getHTTPOption();
      } else if ((options + "").toString().toLocaleLowerCase() === "file") {
        options = this.getUploadingOption();
      }

      result = new Promise(async (resolve, reject) => {
        this.http
          .post(url, payload, options)
          .then((res) => {
            const token = res.headers['token'];
            if ((token + '').toString().toLocaleLowerCase() !== 'undefined') {
              this.localService.setToken(token);
            };
            resolve(res.data)
          })
          .catch((errors) => {
            //handle errors
            console.log(`Request Error HTTPS :: URL(${url}) :: Options(${JSON.stringify(options)}) ERROR :: `, errors)
            // errors.response is undefined for network-level failures (no HTTP
            // response at all — e.g. the API is unreachable / CORS-blocked / the
            // ngrok tunnel is down). Guard before reading .status so it doesn't
            // throw its own TypeError and mask the real "request failed" reason.
            if (errors?.response?.status === 401) {
              window.location.href = '/login';
            }
            reject(errors?.response ?? errors)
          });
      });


      return result;
    } catch (error: any) {
      //     console.log(`unauthorized access :: URL(${url}) :: Options(${JSON.stringify(options)}) error ==>`, error)
      //   if (error.status === 401) {
      //     window.location.href = '/login';
      //   }
    }
  }

  //previous method Post Request
  // async postRequest(url: string, payload: any, options: any) {
  //     let result: any;

  //     try {
  //         if (options == null || options === '' || options === 'undefined') {
  //             options = this.getHTTPOption();
  //         } else if (
  //             (options + '').toString().toLocaleLowerCase() === 'file'
  //         ) {
  //             options = this.getUploadingOption();
  //         }

  //         result = await this.http.post(url, payload, options);

  //         /*
  //         //previous Code

  //         if (result.status >= 400 && result.status <= 499) {

  //             throw new Error(
  //                 'Resource Not found error, Status Code=' + result.status
  //             );
  //         }

  //         const token = result.headers.get('token') + '';
  //         if((token + '').toString().toLocaleLowerCase() !== 'undefined'){
  //             this.localService.setToken(token);
  //         }

  //         */

  //         return result.data;
  //     } catch (error) {}

  // }
}
