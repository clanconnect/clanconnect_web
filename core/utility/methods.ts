// import { Logger } from "./Logger";
import { CryptoJS } from '../utility/cryptojs';

export class Methods {
  // logger = new Logger();
  crypto = new CryptoJS();

  formatDatetime(date: Date, format: string) {
    const _padStart = (value: number): string =>
      value.toString().padStart(2, '0');
    try {
      if (isNaN(date.getTime())) {
        throw new Error('Invalid Date provided');
      }

      return format
        .replace(/yyyy/g, _padStart(date.getFullYear()))
        .replace(/dd/g, _padStart(date.getDate()))
        .replace(/mm/g, _padStart(date.getMonth() + 1))
        .replace(/hh/g, _padStart(date.getHours()))
        .replace(/mi/g, _padStart(date.getMinutes()))
        .replace(/ss/g, _padStart(date.getSeconds()))
        .replace(/ms/g, _padStart(date.getMilliseconds()));
    } catch (error) {
      throw new Error('formatDatetime : ' + JSON.stringify(error));
    }
  }

  formatUTCDatetime(date: Date, format: string) {
    const _padStart = (value: number): string =>
      value.toString().padStart(2, '0');
    try {
      if (isNaN(date.getTime())) {
        throw new Error('Invalid Date provided');
      }

      return format
        .replace(/yyyy/g, _padStart(date.getUTCFullYear()))
        .replace(/dd/g, _padStart(date.getUTCDate()))
        .replace(/mm/g, _padStart(date.getUTCMonth() + 1))
        .replace(/hh/g, _padStart(date.getUTCHours()))
        .replace(/mi/g, _padStart(date.getUTCMinutes()))
        .replace(/ss/g, _padStart(date.getUTCSeconds()))
        .replace(/ms/g, _padStart(date.getUTCMilliseconds()));
    } catch (error) {
      throw new Error('formatUTCDatetime : ' + JSON.stringify(error));
    }
  }

  getDateTimeStamp_JS() {
    // 2020-05-12T16:23:16Z

    try {
      // today = yyyy + '' + mm + '' + dd + '' + hh + '' + min + '' + ss;
      return this.formatDatetime(new Date(), 'yyyy-mm-ddThh:mi:ssZ');
    } catch (error) {
      throw error;
    }
  }

  getDateTimeStamp() {
    try {
      // today = yyyy + '' + mm + '' + dd + '' + hh + '' + min + '' + ss;
      return this.formatDatetime(new Date(), 'yyyymmddhhmiss');
    } catch (error) {
      throw error;
    }
  }

  getDateMySQL(date: Date) {
    try {
      // Get year, month, and day components from the date
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it's zero-based
      const day = String(date.getDate()).padStart(2, '0');

      // Create the 'YYYY-MM-DD' formatted string
      const formattedDate = `${year}-${month}-${day}`;
      // today = yyyy + '-' + mm + '-' + dd;
      // return this.formatDatetime(new Date(), "yyyy-mm-dd");
      return formattedDate;
    } catch (error) {
      throw error;
    }
  }

  getDate() {
    try {
      //today = yyyy + '' + mm + '' + dd
      return this.formatDatetime(new Date(), 'yyyymmdd');
    } catch (error) {
      throw error;
    }
  }

  getDTS() {
    try {
      //today = (yyyy + '' + mm + '' + dd + '' + hh + '' + min + '' + ss + '.' + ms);
      return this.formatDatetime(new Date(), 'yyyymmddhhmiss.ms');
    } catch (error) {
      throw error;
    }
  }

  getUTCDateTimeStamp() {
    try {
      // today = yyyy + '' + mm + '' + dd + '' + hh + '' + min + '' + ss;
      return this.formatUTCDatetime(new Date(), 'yyyymmddhhmiss');
    } catch (error) {
      throw error;
    }
  }

  getUTCDateMySQL() {
    try {
      // today = yyyy + '-' + mm + '-' + dd;
      return this.formatUTCDatetime(new Date(), 'yyyy-mm-dd');
    } catch (error) {
      throw error;
    }
  }

  getUTCDate() {
    try {
      //today = yyyy + '' + mm + '' + dd
      return this.formatUTCDatetime(new Date(), 'yyyymmdd');
    } catch (error) {
      throw error;
    }
  }

  getUTCDTS() {
    try {
      //today = (yyyy + '' + mm + '' + dd + '' + hh + '' + min + '' + ss + '.' + ms);
      return this.formatUTCDatetime(new Date(), 'yyyymmddhhmiss.ms');
    } catch (error) {
      throw error;
    }
  }

  getAuthKey() {
    let utcDate;
    let authKey = '';
    try {
      // today = yyyy + '-' + mm + '-' + dd;
      utcDate = this.formatUTCDatetime(new Date(), 'yyyy-mm-dd');
      authKey = this.crypto.MD5(utcDate);
      return authKey;
    } catch (error) {
      throw error;
    }
  }

  getFormattedUCString(name: string) {
    let result = '';
    try {
      if (name == '' || name == null) {
        return '';
      }

      name = name.toLowerCase().trim();
      const nameParts = name.split(' ');

      for (let i = 0; i < nameParts.length; i++) {
        result =
          result +
          ' ' +
          nameParts[i].charAt(0).toUpperCase() +
          nameParts[i].slice(1);
      }

      result = result.trim();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async timeDelay(sec: number) {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000));
  }

  decimalFormat(value: number | string) {
    try {
      //check number is Integer?
      if (typeof value === 'string') {
        value = +value;
      }

      let _isInteger = Number.isInteger(value);
      if (!_isInteger) {
        return value.toFixed(0);
      } else {
        return value;
      }
    } catch (err) {
      throw new Error(`decimalFormat Error :: ${err}`);
    }
  }

  convertTimeToHHMMSS(timeStr: string) {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':');

    let hh = parseInt(hours, 10);
    const mm = parseInt(minutes, 10);

    if (period === 'PM' && hh !== 12) {
      hh += 12;
    } else if (period === 'AM' && hh === 12) {
      hh = 0;
    }

    // Convert to HH:MM:SS format
    return `${hh.toString().padStart(2, '0')}:${mm
      .toString()
      .padStart(2, '0')}:00`;
  }

  calculateAge(birthDate: Date) {
    const birthDateObject = new Date(birthDate);
    const currentDate = new Date();

    const yearsDiff = currentDate.getFullYear() - birthDateObject.getFullYear();

    // Check if the birthday for this year has occurred
    if (
      currentDate.getMonth() < birthDateObject.getMonth() ||
      (currentDate.getMonth() === birthDateObject.getMonth() &&
        currentDate.getDate() < birthDateObject.getDate())
    ) {
      return yearsDiff - 1;
    } else {
      return yearsDiff;
    }
  }

  //Get all query Params
  _GetQueryParams(locations: any): Object {
    let queryParams: { [key: string]: any } = {};
    try {
      let getQuerys = new URLSearchParams(locations);
      getQuerys.forEach((v, k) => (queryParams[k] = v));

      return queryParams;
    } catch (error) {
      throw new Error(`_GetQueryParams method error : ${error}`);
    }
  }

  /**
   * Filters an array based on the provided selectedIds, dataSource, filterObjectKey, and optional stats parameter.
   * @param selectedIds - An array of selected IDs.
   * @param dataSource - The data source array to filter.
   * @param filterObjectKey - The key to use for filtering the data source array.
   * @param stats - An optional parameter to specify the type of filtering. If set to 'not_exist', it will filter for values that do not exist in selectedIds.
   * @returns The filtered array.
   * Its working only 2D array
   */
  filterArray(selectedIds: any[], dataSource: any[], filterObjectKey: string, stats?: 'not_exist') {
    try {
      return dataSource.filter((data: any) => eval(`${selectedIds.indexOf(data[filterObjectKey])} ${stats ? '=' : '!'}== -1`))
    } catch (err) {
      console.log('filterArray ==> ' + err);
    }
  };



  /**
   * Removes duplicate objects from an array based on a specified object key.
   * @param dataSource - The array of objects to remove duplicates from.
   * @param objKey - The key of the object to use for comparison.
   * @returns An array of unique objects based on the specified object key.
   * @throws If an error occurs during the process.
   */
  uniqueObjectArray(dataSource: any[], objKey: string) {

    try {
      return [...new Map(dataSource.map(item => [item[objKey], item])).values()];
    } catch (error) {
      throw new Error(`uniqueObjectArray method error : ${error}`);
    }
  };

  /**
   * Generates a random number between 100000 and 999999.
   * 
   * @returns The generated random number.
   */
  getRandNumber() {
    return Math.floor(100000 + Math.random() * 900000)
  }

  formatNumber(value: number) {
    if (value >= 5000001) {
      return '5M+';
    } else if (value >= 5000000) {
      return '5M';
    } else if (value >= 1000000) {
      return '1M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(0) + 'K';
    }
    return value.toString();
  }

  convertExactNumber(value: number) {
    const format = (num: number, suffix: string) => {
      const floored = Math.floor(num);
      const decimal = num - floored;

      if (decimal > 0.5) return `${floored + 1}${suffix}`;
      else return `${floored}${suffix}`;
    };

    if (value >= 1_000_000_000_000) {
      return format(value / 1_000_000_000_000, 'T');
    } else if (value >= 1_000_000_000) {
      return format(value / 1_000_000_000, 'B');
    } else if (value >= 1_000_000) {
      return format(value / 1_000_000, 'M');
    } else if (value >= 1_000) {
      return format(value / 1_000, 'K');
    } else {
      return `${Math.floor(value)}`;
    }
  }

  convertNumber(value: number) {
    if (value >= 1000000000000) {
      return (value / 1000000000000).toFixed(1) + 'T';
    } else if (value >= 1000000000) {
      return (value / 1000000000).toFixed(1) + 'B';
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    } else {
      return value.toFixed(0);
    }
  }

  formatInfluencerProfileNumber(number: any) {
    try {
      if (number >= 1e12) {
        return (number / 1e12).toFixed(1) + ' T';
      } else if (number >= 1e9) {
        return (number / 1e9).toFixed(1) + ' B';
      } else if (number >= 1e6) {
        return (number / 1e6).toFixed(1) + ' M';
      } else if (number >= 1e3) {
        return (number / 1e3).toFixed(1) + ' K';
      } else {
        return number.toString();
      }
    } catch (error) {
      console.error('formatInfluencerProfileNumber function error :', error);
    }
  }

  // formatNumber(number: number) {
  //   if (number >= 1000000) {
  //     return (number / 1000000).toFixed(1) + 'M';
  //   } else if (number >= 1000) {
  //     return (number / 1000).toFixed(1) + 'K';
  //   } else {
  //     return number.toString();
  //   }
  // }

  formatNumberINR(number: number) {
    if (number >= 10000000) {
      const formatted = (number / 10000000).toFixed(2);
      return formatted.endsWith('.00') ? formatted.slice(0, -3) + 'Cr' : formatted + 'Cr';
    } else if (number >= 100000) {
      const formatted = (number / 100000).toFixed(2);
      return formatted.endsWith('.00') ? formatted.slice(0, -3) + 'L' : formatted + 'L';
    } else if (number >= 1000) {
      const formatted = (number / 1000).toFixed(2);
      return formatted.endsWith('.00') ? formatted.slice(0, -3) + 'K' : formatted + 'K';
    } else {
      return number % 1 !== 0 ? number.toFixed(2) : number.toString();
    }
  }
  calculateDaysDifference(
    startDate: Date | string,
    endDate: Date | string
  ): number {
    const startDateObj =
      typeof startDate === 'string' ? new Date(startDate) : startDate;
    const endDateObj =
      typeof endDate === 'string' ? new Date(endDate) : endDate;

    return Math.floor(
      (endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  formatNumberSocial(value: number) {
    if (value >= 5000001) {
      return '5M+';
    } else if (value >= 5000000) {
      return '5M';
    } else if (value >= 1000000) {
      return '1M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(0) + 'K';
    }
    return value.toString();
  }

  //Format number upto two decimal places
  roundToTwoDecimalPlaces(value: number) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  };


  /**
   * Function Convert Object into Params 
   * @param Get Object Param For Example {age: 40, name: 'test'}
   * @return age=40&name=test
   */


  objConvertIntoParam(obj: Object) {
    let array: string[] = new Array();
    Object.entries(obj).forEach(([x, y]) => array.push(`${x}=${y}`));
    return (array.join('&'));
  };


  /**
   * Aligns chat data from the given data source based on the 'created_at' timestamp.
   * 
   * @param dataSource An array of objects containing chat data with specific properties:
   *                   - comment_id: number
   *                   - proposal_id: number
   *                   - influencer_id: number
   *                   - sm_id: number
   *                   - creative_id: number
   *                   - user_id: number
   *                   - comments: string
   *                   - from: string
   *                   - status: string
   *                   - created_at: string
   *                   - updated_at: string
   * 
   * @returns An object where keys are unique 'created_at' timestamps and values are arrays of chat data objects
   */

  alignChat(dataSource: {
    comment_id: number,
    proposal_id: number,
    influencer_id: number,
    sm_id: number,
    creative_id: number,
    user_id: number,
    comments: string,
    from: string,
    status: string,
    created_at: string,
    updated_at: string
  }[]) {
    let chatDateWise: { [key: string]: any } = {};
    try {
      for (let data of dataSource) {
        if (chatDateWise.hasOwnProperty(data.created_at)) {
          chatDateWise[data.created_at] = [...chatDateWise[data.created_at], data];
        } else {
          chatDateWise[data.created_at] = [data];
        }
      };
    } catch (err) {
      console.log(err)
    };

    return chatDateWise;
  };


  // Format seconds to minutes and hours
  formatDuration(seconds: number) {
    try {
      if (typeof seconds !== 'number' || seconds < 0) {
        throw new Error("Input must be a non-negative number");
      }
      seconds = Math.round(seconds);
      if (seconds <= 59) {
        return `${seconds} sec`;
      } else if (seconds <= 3599) {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        return `${minutes} min ${remainingSeconds} sec`;
      } else {
        let hours = Math.floor(seconds / 3600);
        let remainingSeconds = seconds % 3600;
        let minutes = Math.floor(remainingSeconds / 60);
        remainingSeconds = remainingSeconds % 60;
        return `${hours} hr ${minutes} min ${remainingSeconds} sec`;
      }
    } catch (error) {
      console.error('formatDuration function error :', error);
    }
  }
}





