import Vue from 'vue';
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
import VueCookies from 'vue-cookies-reactive'
Vue.use(VueCookies)
Vue.use(CryptoJS)

export default{
  async getAuthorization(_data){
    Vue.$cookies.refresh();
   if(!_data){
    if(!Vue.$cookies.get('_SID_')){
          Vue.$cookies.remove('_SID_');
          Swal.fire(
            'The Session Timed Out?',
            'Please log in again',
            'error'
          )
      return null;
    }
  }

     let key = (`${process.env.VUE_APP_TER_KEY}`);
    key = CryptoJS.enc.Utf8.parse(key); // replace with your own secret key
    let iv = CryptoJS.lib.WordArray.random(16); // generate a random 16-byte IV
    const jsonData = JSON.stringify( _data??(Vue.$cookies.get('_SID_')));
    const encryptedData = CryptoJS.AES.encrypt(jsonData, key,  {iv} ).toString();    
    return {
      headers:{
        'X-IV': iv.toString(CryptoJS.enc.Base64),
        Authorization:'Bearer '+ encryptedData
      } 
    }
  },


  ///// start leave type
  async checkAccount(userEmail) {
    var url = `${process.env.VUE_APP_TER_API_URL}/checkAccount`
    const config = await this.getAuthorization({userEmail});
    const body = { }
    try {
      const response = await Vue.axios.post(url, body, config);
      if (response && response.data && response.status == 200) {
        return response.data;
      } else if (response && response.data && response.data.message) {
        return { error: response.data.message };
      } else {
        return { error: "Sorry. Error on checking account." };
      }
    } catch (error) {
      console.log(error);
      return { error: error.response }
    }
  },

  async getUserAll() {
    var url = `${process.env.VUE_APP_TER_API_URL}/user/all`
    const config =await this.getAuthorization();
    const body = {
    }
    try {
      const response = await Vue.axios.post(url, body, config);
      if (response && response.data && response.status == 200) {
        return response.data;
      } else if (response && response.data && response.data.message) {
        return { error: response.data.message };
      } else {
        return { error: "Sorry. Error on checking account." };
      }
    } catch (error) {
      console.log(error);
      return { error: error.message }
    }
  },

  async setAsAdmin(userEmail) {
    var url = `${process.env.VUE_APP_TER_API_URL}/user/setAsAdmin`
    const config =await this.getAuthorization();
    const body = {
      email:userEmail
    }
    let response = null
    try {
       response = await Vue.axios.post(url, body, config);
      if (response && response.data && response.status == 200) {
        return response.data;
      } else if (response && response.data && response.data.message) {
        return { error: response.data.message };
      } else {
        return { error: "Sorry. Error on checking account." };
      }
    } catch (error) {
      console.log(error.response);
      return { error: error.response.data.message }
    }
  },

  async removeUser(userEmail) {
    var url = `${process.env.VUE_APP_TER_API_URL}/user/removeUser`
    const config =await this.getAuthorization();
    const body = {
      email:userEmail
    }
    let response = null
    try {
       response = await Vue.axios.post(url, body, config);
      if (response && response.data && response.status == 200) {
        return response.data;
      } else if (response && response.data && response.data.message) {
        return { error: response.data.message };
      } else {
        return { error: "Sorry. Error on checking account." };
      }
    } catch (error) {
      console.log(error.response);
      return { error: error.response }
    }
  },

  async setPolicyAgreed() {
    var url = `${process.env.VUE_APP_TER_API_URL}/PolicyAuth/setAuthorized`
    const config =await this.getAuthorization();
    const body = {   }
    let response = null
    try {
       response = await Vue.axios.post(url, body, config);
      if (response && response.data && response.status == 200) {
        return response.data;
      } else if (response && response.data && response.data.message) {
        return { error: response.data.message };
      } else {
        return { error: "Sorry. Error on checking account." };
      }
    } catch (error) {
      console.log(error.response);
      return { error: error.response.data.message }
    }
  },

  async getFacultyListByUser() {
    var url = `${process.env.VUE_APP_TER_API_URL}/getFacultyList/byUser`
    const config =await this.getAuthorization();
    const body = {   }
    let response = null
    try {
       response = await Vue.axios.post(url, body, config);
      if (response && response.data && response.status == 200) {
        return response.data;
      } else if (response && response.data && response.data.message) {
        return { error: response.data.message };
      } else {
        return { error: "Sorry. Error on checking account." };
      }
    } catch (error) {
      console.log(error.response);
      return { error: error.response }
    }
  },

  async getCORByUser() {
    var url = `${process.env.VUE_APP_TER_API_URL}/getCOR/byUser`
    const config =await this.getAuthorization();
    const body = {   }
    let response = null
    try {
       response = await Vue.axios.post(url, body, config);
      if (response && response.data && response.status == 200) {
        return response.data;
      } else if (response && response.data && response.data.message) {
        return { error: response.data.message };
      } else {
        return { error: "Sorry. Error on checking account." };
      }
    } catch (error) {
      console.log(error.response);
      return { error: error.response }
    }
  },

  async getQuationnaire() {
    var url = `${process.env.VUE_APP_TER_API_URL}/questionnaire/getItemsTypeAndSy`
    const config =await this.getAuthorization();
    const body = {
      "eval_type":"P"
      }
    let response = null
    try {
       response = await Vue.axios.post(url, body, config);
      if (response && response.data && response.status == 200) {
        return response.data;
      } else if (response && response.data && response.data.message) {
        return { error: response.data.message };
      } else {
        return { error: "Sorry. Error on checking account." };
      }
    } catch (error) {
      console.log(error.response);
      return { error: error.response }
    }
  },
}
