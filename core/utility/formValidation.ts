interface ErrorTypes {
  status: boolean;
  message: string;
}

export class FormValidation {
  GetNameValidate(name: string): ErrorTypes {
    if (name.trim()) {
      if (name.length > 2) {
        return { status: true, message: '' };
      } else {
        return {
          status: false,
          message: 'Please enter valid name',
        };
      }
    } else {
      return { status: false, message: 'This field is required' };
    }
  }

  StateNameValidate(name: string): ErrorTypes {
    if (name.trim()) {
      if (name.length > 2) {
        return { status: true, message: '' };
      } else {
        return {
          status: false,
          message: 'Please enter valid state name',
        };
      }
    } else {
      return { status: false, message: 'This field is required' };
    }
  }

  //To use where name should not contain the number
  GetNameValidate2(name: string): ErrorTypes {
    if (!name.trim()) {
      return { status: false, message: 'This field is required' };
    } else if (name.length <= 2) {
      return { status: false, message: 'Please enter a valid name (minimum 3 characters)' };
    } else if (/\d/.test(name)) {
      return { status: false, message: 'Name cannot contain numbers' };
    } else {
      return { status: true, message: '' };
    }
  }

  IsvalidYear(year: string) {
    const yearPattern = new RegExp(/^(19[5-9]\d|200[0-5])$/);
    const status = { status: false, message: 'Please enter valid year' };
    if (yearPattern.test(year)) {
      status.status = true;
      status.message = '';
    } else {
      status.status = false;
      status.message = 'Please enter valid year';
    }
    return status;
  }

  IsValidDay(day: string) {
    const dayPattern = new RegExp(/^(0?[1-9]|[1-2][0-9]|3[0-1])$/);
    const status = { status: false, message: '' };
    if (dayPattern.test(day)) {
      status.status = true;
      status.message = '';
    } else {
      status.status = false;
      status.message = 'Please enter valid day';
    }
    return status;
  }

  IsValidMonth(month: string) {
    const monthPattern = new RegExp(/^(0?[1-9]|1[0-2])$/);
    const status = { status: false, message: '' };
    if (monthPattern.test(month)) {
      status.status = true;
      status.message = '';
    } else {
      status.status = false;
      status.message = 'Please enter valid month';
    }
    return status;
  }

  GetEmailControlIsValid(email: string): ErrorTypes {
    const pattern = new RegExp(
      // /[a-z0-9._%+!$&*=^|~#%'`?{}\/-]+@([a-z0-9-]+\.)+[a-z]{2,16}/
      /^[a-z0-9._%$&*=^|~#%'`?{}]+@[a-z0-9-]+\.[a-z]{2,16}$/i
    );
    if (email) {
      if (pattern.test(email)) {
        return { status: true, message: '' };
      } else {
        return { status: false, message: 'Please enter valid email.' };
      }
    } else {
      return { status: false, message: 'This field is required' };
    }
  }

  SecondaryEmailControlIsValid(email: string): ErrorTypes {
    const pattern = new RegExp(
      /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/
    );
    if (email) {
      if (pattern.test(email)) {
        return { status: true, message: '' };
      } else {
        return { status: false, message: 'Please enter valid email.' };
      }
    } else {
      return { status: true, message: '' };
    }
  }

  GetPinIsValid(pin: string): ErrorTypes {
    const pattern = /^\d{4}$/;
    if (pin.length > 0) {
      if (pattern.test(pin)) {
        return { status: true, message: '' };
      } else {
        return {
          status: false,
          message: 'Please enter valid 4 digit Numeric Pin.',
        };
      }
    } else {
      return { status: false, message: 'This field is required' };
    }
  }

  GetMobileControlIsValid(phone_number: string): ErrorTypes {
    const phone_pattern = new RegExp(/^[6-9]\d{9}$/gi);
    if (phone_number) {
      if (phone_pattern.test(phone_number)) {
        return { status: true, message: '' };
      } else if (phone_number.length != 10) {
        return { status: false, message: 'Please enter valid mobile no.' };
      } else {
        return { status: false, message: 'Please enter valid mobile no.' };
      }
    } else {
      return { status: false, message: 'Please enter mobile no.' };
    }
  }

  // To validate secondary number in My accounts section.
  SecondaryMobileControlIsValid(phone_number: string): ErrorTypes {
    const phone_pattern = new RegExp(
      /^(?:\+\d{1,3}\s?)?(?:\(\d{1,4}\)|\d{1,4})[-.\s]?\d{2,12}$/
    );
    if (phone_number) {
      if (phone_pattern.test(phone_number)) {
        return { status: true, message: '' };
      } else if (phone_number.length != 10) {
        return { status: false, message: 'Please enter valid mobile no.' };
      } else {
        return { status: false, message: 'Please enter valid mobile no.' };
      }
    } else {
      return { status: true, message: '' };
    }
  }

  // To validate genre in Settings edit
  GenreControlIsValid(category_ids: string[]): ErrorTypes {
    if (category_ids.length === 0) {
      return { status: false, message: 'Please select atleast 1 genre' };
    } else if (category_ids.length > 3) {
      return { status: false, message: 'Upto 3 genre are allowed.' };
    } else {
      return { status: true, message: '' };
    }
  }

  // To validate location in settins edit
  LocationControlIsValid(location_id: number): ErrorTypes {
    if (location_id > 0) {
      return { status: true, message: '' };
    } else {
      return { status: false, message: 'Please select atleast 1 Location' };
    }
  }

  //function validation is pending  Now (pather are pending now )
  // GetPasswordValidate(password: string): ErrorTypes {
  //   let response: ErrorTypes = {
  //     status: true,
  //     message: '',
  //   };
  //   try {
  //     if (password.length >= 8) {
  //       const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
  //       if (regex.test(password)) {
  //         response = {
  //           status: true,
  //           message: '',
  //         };
  //       } else {
  //         response = {
  //           status: false,
  //           message:
  //             'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
  //         };
  //       }
  //     } else if (password.length == 0) {
  //       response = {
  //         status: false,
  //         message: 'This field is required',
  //       };
  //     } else {
  //       response = {
  //         status: false,
  //         message: 'Minimum 8 char length',
  //       };
  //     }

  //     return response;
  //   } catch (error) {
  //     throw new Error('Get Password Validate Error in utlity :: ' + error);
  //   }
  // }
  
  GetPasswordValidate(password: string): ErrorTypes {
    let response: ErrorTypes = {
      status: true,
      message: '',
    };
  
    try {
      if (password.length === 0) {
        return {
          status: false,
          message: 'This field is required',
        };
      }
  
      const messages: string[] = [];
      
      if (password.length < 8) {
        messages.push('minimum 8 characters in length');
      }
      if (!/[A-Z]/.test(password)) {
        messages.push('1 uppercase letter');
      }
      if (!/[a-z]/.test(password)) {
        messages.push('1 lowercase letter');
      }
      if (!/\d/.test(password)) {
        messages.push('1 number');
      }
      if (!/[@#$%^&+=!]/.test(password)) {
        messages.push('1 special character');
      }
  
      if (messages.length > 0) {
        response = {
          status: false,
          message: 'Password must contain at least : ' + messages.join(', '),
        };
      } else {
        response = {
          status: true,
          message: '',
        };
      }
  
      return response;
    } catch (error) {
      throw new Error('Get Password Validate Error in utility :: ' + error);
    }
  }
  

  getSplitValidation(data: string) {
    try {
      let response = { status: false, message: 'This field is required' };
      const splitvalue = data.split(',');
      if (splitvalue.length >= 1 && splitvalue[0] !== '') {
        response = { ...response, status: true, message: '' };
      }

      return response;
    } catch (error) {
      throw new Error('getSplitformValidation error :: ' + error);
    }
  }

  getBudgetisValid(data: string) {
    let response = { status: false, message: 'This field is required.' };
    try {
      if (data.length > 0) {
        response.status = true;
        response.message = '';
      }

      return response;
    } catch (err) {
      throw new Error(`getBudgetIsValid Error :: ${err}`);
    }
  }

  getdescriptionIsValid(data: string) {
    try {
      let status = { status: false, message: 'This field is required.' };
      let validate = data.replace(/(<([^>]+)>)/gi, '').length;
      if (validate > 5) {
        status.status = true;
        status.message = '';
      }

      return status;
    } catch (error) {
      throw new Error(`get description Is Valid :: ${error}`);
    }
  }

  getgstIsValid(gst_no: string) {
    const gst_regex = new RegExp(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    );
    if (gst_no) {
      if (gst_regex.test(gst_no) === true) {
        return { status: true, message: '' };
      } else {
        return { status: false, message: 'Enter a valid gst number' };
      }
    } else {
      return { status: false, message: 'This field is required' };
    }
  }

  getPANisValid(pan_no: string): ErrorTypes {
    const pan_regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
    if (pan_no) {
      if (pan_regex.test(pan_no) === true) {
        return { status: true, message: '' };
      } else {
        return { status: false, message: 'Please enter valid PAN' };
      }
    } else {
      return { status: false, message: 'This field is required' };
    }
  }

  getAadhaarisValid(aadhaar_no: string): ErrorTypes {
    const aadhaar_regex = new RegExp(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/);
    if (aadhaar_no) {
      if (aadhaar_regex.test(aadhaar_no) === true) {
        return { status: true, message: '' };
      } else {
        return {
          status: false,
          message: 'Please enter valid Aadhaar no',
        };
      }
    } else {
      return { status: false, message: 'This field is required' };
    }
  }

  GetShopNameValidate(shopname: any): ErrorTypes {
    if (shopname) {
      if (shopname.length > 2) {
        return { status: true, message: '' };
      } else {
        return {
          status: false,
          message: 'Please enter valid shop name',
        };
      }
    } else {
      return { status: false, message: 'This field is required' };
    }
  }

  GetShopDescriptionValidate(shop_desc: any): ErrorTypes {
    if (shop_desc) {
      if (shop_desc.length > 2) {
        return { status: true, message: '' };
      } else {
        return {
          status: false,
          message: 'Please enter valid description name',
        };
      }
    } else {
      return { status: false, message: 'This field is required' };
    }
  }

  GetClanShopAddressValid(name: string, type: string): ErrorTypes {
    if (name) {
      if (name.length > 1) {
        return { status: true, message: '' };
      } else {
        return {
          status: false,
          message: `Please enter valid ${type}`,
        };
      }
    } else {
      return { status: false, message: 'This field is required' };
    }
  }

  GetPincodeValid(pincode: string): ErrorTypes {
    const pincode_regex = new RegExp(/^[1-9][0-9]{5}$/);

    if (pincode) {
      if (pincode_regex.test(pincode) === true) {
        return { status: true, message: '' };
      } else {
        return {
          status: false,
          message: `Please enter valid pincode`,
        };
      }
    } else {
      return { status: false, message: 'This field is required' };
    }
  }
  GetQuantity(quantity: number): ErrorTypes {
    if (quantity !== undefined && quantity !== null) {
      if (quantity >= 1) {
        return { status: true, message: '' };
      } else {
        return {
          status: false,
          message: 'Quantity must be greater than or equal to 1.',
        };
      }
    } else {
      return { status: false, message: 'This field is required' };
    }
  }
  GetDiscount(discount: number | string): ErrorTypes {
    // Convert the discount to a number if it's a string
    const discountValue =
      typeof discount === 'string' ? parseFloat(discount) : discount;
    if (isNaN(discountValue)) {
      return {
        status: true,
        message: `Percentage must be a valid number`,
      };
    }

    if (discountValue < 0 || discountValue >= 100) {
      return {
        status: true,
        message: `Percentage must be between 0 and 99.99`,
      };
    }

    // Check if there are more than two decimal places
    const decimalPlaces = (discountValue.toString().split('.')[1] || '').length;
    if (decimalPlaces > 2) {
      return {
        status: true,
        message: `Percentage can have up to two decimal places`,
      };
    }

    return { status: false, message: '' };
  }
  // For any Select Field Valdation (Required).................
  GetSelectFieldValidate(value: string): ErrorTypes {
    if (value.length == 0) {
      return { status: false, message: 'This field is required' };
    } else {
      return {
        status: true,
        message: '',
      };
    }
  }

  IsNumber(value: string | number): ErrorTypes {
    console.log(value);
    let status = { status: false, message: 'This field is required' };
    if (/^[0-9\b]+$/.test(value.toString()) || value.toString().length === 0) {
      // return value;
      status.status = true;
      status.message = '';
    } else if (value.toString()) {
      status.status = false;
      status.message = 'Invalid value provided';
    }

    console.log(status);

    return status;
  }
  GetLongTextValidate(name: string): ErrorTypes {
    if (name.trim()) {
      if (name.length > 5) {
        return { status: true, message: '' };
      } else {
        return {
          status: false,
          message: 'Please enter atleast 5 characters........',
        };
      }
    } else {
      return { status: false, message: 'This field is required' };
    }
  }

  GetRequiredEntry(value: string): ErrorTypes {
    if (value) {
      return { status: true, message: '' };
    } else {
      return {
        status: false,
        message: 'Please enter atleast 5 characters........',
      };
    }
  }

  isValidURL(url: string): boolean {
    // Regular expression to check URL syntax
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // Protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'); // Query string

    return urlPattern.test(url);
  }
  // FOR INSTAGRAM AND YOUTUBE VALIDATIONS--------------------------------


  CheckInstagramUrl(value: string): ErrorTypes {
    const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/(p\/[^/?#&]+\/?|reel\/[^/?#&]+\/?|p\/[^/?#&]+\/tv\/[^/?#&]+\/?|\w+\/?)([?#].*)?$/;
    if (value.trim().length == 0) {
      return { status: false, message: "Post link can't be blank!" };
    }
    else if (instagramRegex.test(value)) {
      return { status: true, message: '' };
    } else {
      return {
        status: false,
        message: 'Please enter valid instagram url',
      };
    }
  }

  CheckYouTubeUrl(value: string): ErrorTypes {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)\S+$/;
    if (value.trim().length == 0) {
      return { status: false, message: "Post link can't be blank!" };
    }
    else if (youtubeRegex.test(value)) {
      return { status: true, message: '' };
    } else {
      return {
        status: false,
        message: 'Please enter valid youtube url',
      };
    }
  }

  isValidIfsc(value: string): ErrorTypes {
    const IfscRegex = new RegExp(/^[A-Z]{4}0[A-Z0-9]{6}$/);
    if (value == null) {
      return { status: false, message: 'IFSC Code can not be blank' }
    }
    if (IfscRegex.test(value) == true) {
      return { status: true, message: '' }
    }
    else {
      return { status: false, message: 'IFSC Code is Invalid !' };
    }
  }


  GetWebsiteValidate(url: string): ErrorTypes {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3})|' + // OR IP (v4) address
      'localhost)' + // OR localhost
      '(\\:\\d+)?' + // port
      '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
      '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i' // fragment locator
    );
  
    if (url.trim()) {
      if (urlPattern.test(url)) {
        return { status: true, message: '' };
      } else {
        return {
          status: false,
          message: 'Please enter a valid URL',
        };
      }
    } else {
      return { status: false, message: 'This field is required' };
    }
  }

}
