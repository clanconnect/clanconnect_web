import { toast } from 'react-toastify';
import { CryptoJS } from '../utility/cryptojs';
import { BASE_URL } from '../../config/config';

export class LocalService {
    cryptoJS: CryptoJS;

    constructor() {
        this.cryptoJS = new CryptoJS();
    }

    //toaster
    public toastify(message: string, type?: string, timedurationMS?: number) {
        try {
            let toastOption: any = {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            };

            if (timedurationMS != null) {
                toastOption.autoClose = timedurationMS;
            }

            switch (type) {
                case 'success':
                    toast.success(message, toastOption);
                    break;
                case 'error':
                    toast.error(message, toastOption);
                    break;
                case 'info':
                    toast.info(message, toastOption);
                    break;
                default:
                    toast.info(message, toastOption);
            }

        } catch (error) {
            console.warn(`toast Service Error :: ${error}`)
        }
    }

    // JWT TOKEN SET GET REMOVE METHODS START...
    public setToken(token: string) {
        try {
            localStorage.setItem('token', token);
            return true;
        } catch (error) {
            throw new Error('getToken: ' + JSON.stringify(error));
        }
    }

    public getToken() {
        return localStorage.getItem('token');
    }

    public removeToken() {
        localStorage.removeItem('token');
        localStorage.clear();
    }

    // Setting username in session storage on click of remeber me checkbox
    public setUser(user: string) {
        try {
            localStorage.setItem('user', user);
            return true;
        } catch (error) {
            throw new Error('setUser: ' + JSON.stringify(error));
        }
    }

    // getting username in session storage on click of remeber me checkbox
    public getUser() {
        try {
            const user: any = localStorage.getItem('user');
            return user;
        } catch (error) {
            throw new Error('getUser: ' + JSON.stringify(error));
        }
    }

    setSessionItem(sessionItem: string, sessionValue: string) {
        try {
            sessionItem = (sessionItem + '').trim().toLowerCase();
            localStorage.setItem(sessionItem, sessionValue);
        } catch (error) {
            console.log('setSessionItem: ' + error);
        }
    }

    getSessionItem(sessionItem: string) {
        try {
            sessionItem = (sessionItem + '').trim().toLowerCase();
            return localStorage.getItem(sessionItem);
        } catch (error) {
            console.log('getSessionItem: ' + error);
            return '';
        }
    }

    setStorageItem(storageItem: string, storageValue: string) {
        try {
            storageItem = (storageItem + '').trim().toLowerCase();
            localStorage.setItem(storageItem, this.cryptoJS.encryptMessage(storageValue, BASE_URL));
        } catch (error) {
            console.log('setStorageItem: ' + error);
        }
    }

    getStorageItem(storageItem: string) {
        try {
            storageItem = (storageItem + '').trim().toLowerCase();
            let localStorageData = localStorage.getItem(storageItem);
            if (localStorageData) {
                localStorageData = this.cryptoJS.decryptMessage(localStorageData, BASE_URL)
            }
            return localStorageData;
        } catch (error) {
            console.log('getStorageItem: ' + error);
            return '';
        }
    }


    setRememberMeUser(loginID: string) {
        try {
            loginID = (loginID + '').toLowerCase();
            localStorage.setItem('remember_me_user_id', loginID);
        } catch (error) {
            console.log('Error in setRememberMeUser for loginID: ' + loginID + ': ' + error);
            alert('Error in setRememberMeUser for loginID: ' + loginID + ': ' + error);
        }
    }

    getRememberMeUser() {
        let value: any = '';
        try {
            value = localStorage.getItem('remember_me_user_id');
            if (value == null || value == 'undefined') {
                value = '';
            }
            value = value.toLowerCase();
        } catch (error) {
            value = '';
            console.log('Error in getRememberMeUser for loginID: ' + error);
            alert('Error in getRememberMeUser for loginID: ' + error);
        }
        return value;
    }

    setSavePassword(password: string) {
        try {
            localStorage.setItem('remember_me_password', password);
        } catch (error) {
            console.log('Error in setSavePassword for loginID: ' + error);
            alert('Error in setSavePassword for loginID: ' + error);
        }
    }

    getSavePassword() {
        let value: any = '';
        try {
            value = localStorage.getItem('remember_me_password');
            if (value == null || value == 'undefined') {
                value = '';
            }
        } catch (error) {
            value = '';
            console.log('Error in getSavePassword for loginID: ' + error);
            alert('Error in getSavePassword for loginID: ' + error);
        }
        return value;
    }

    clearSession() {
        try {
            localStorage.clear();
        } catch (error) { }
    }

    clearStorage() {
        try {
            localStorage.clear();
        } catch (error) { }
    }

    async refresh() {
        window.location.reload();
    }

    async logout() {
        try {
            this.setSavePassword('');
            this.clearSession();
            this.refresh();
        } catch (error) {
            alert('logout: Error in Logout, please try again');
        };
    }

    //set shop_id and shop_name
    public setShopId(token: string) {
        try {
            localStorage.setItem('shop_id', token);
            return true;
        } catch (error) {
            throw new Error('getToken: ' + JSON.stringify(error));
        }
    }

    public setShopName(token: string) {
        try {
            localStorage.setItem('shop_name', token);
            return true;
        } catch (error) {
            throw new Error('getToken: ' + JSON.stringify(error));
        }
    }

    //get shop_id and shop_name
    public getShopId() {
        return localStorage.getItem('shop_id');
    }
    public getShopName() {
        return localStorage.getItem('shop_name');
    }

    getFutureDateByDays(days: number) {
        try {
            let date = new Date();
            date.setDate(date.getDate() + days);

            const new_date = [
                date.getFullYear(),
                `${date.getMonth() + 1}`.padStart(2, "0"), // Use padStart to ensure two digits
                date.getDate().toString().padStart(2, "0"),
              ].join("-");
            
            return new_date;
        } catch (error) {
            console.log('getFutureDateByDays: ' + error);
            return '';
        }
    }
}
