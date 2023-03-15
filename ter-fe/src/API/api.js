import Vue from 'vue';
import {globalStore} from '@/main.js'

export default{

  async getAuthorization(){
    let now = new Date();
    if(now > globalStore.user.expiration){
      try {
          await this.$gAuth.signOut()
          this.$cookies.remove('session');
          this.globalStore.showErrorDialog('Authentication','Session Timed out')
      } catch (error) {
        // On fail do something
        this.globalStore.showErrorDialog('Error',error)
        console.error(error);
      }
      return null;
    }
    return {
      Authorization: globalStore.userEmail,
    }
  },

  ///// start leave type
  async checkAccount() {
    var url = `${process.env.VUE_APP_TER_API_URL}/checkAccount`
    const config = {
      headers: this.getAuthorization()
    }
    const body = {
      email: globalStore.userEmail,
    }
    try {
      const response = await Vue.axios.post(url, body, config);
      console.log(response);
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
  async createLeaveType(parameters) {
    var url = `${process.env.VUE_APP_TER_API_URL}/leaveType/create`
    const config = {
      headers: {
        Authorization: globalStore.userEmail,
      }
    }
    const body = {
      code: parameters.code,
      description: parameters.description,
      numberOfDays:parameters.numberOfDays??0
    }
    try {
      const response = await Vue.axios.post(url, body, config);
      console.log(response);
      if (response && response.data && response.status == 201) {
        return response.data;
      } else if (response && response.data && response.data.message) {
        return { error: response.data.message };
      } else {
        return { error: "Sorry. Error query leave type." };
      }
    } catch (error) {
      console.log(error.response);
      return { error: error.response.data.message }
    }
  },

  async updateLeaveType(parameters) {
    var url = `${process.env.VUE_APP_TER_API_URL}/leaveType/update`
    const config = {
      headers: {
        Authorization: globalStore.userEmail,
      }
    }
    const body = {
      id:parameters.id,
      code: parameters.code,
      description: parameters.description,
      numberOfDays:parameters.numberOfDays??0
    }
    try {
      const response = await Vue.axios.post(url, body, config);
      console.log(response);
      if (response && response.data && response.status == 200) {
        return response.data;
      } else if (response && response.data && response.data.message) {
        return { error: response.data.message };
      } else {
        return { error: "Sorry. Error query leave type." };
      }
    } catch (error) {
      console.log(error.response);
      return { error: error.response.data.message }
    }
  },
  async deleteLeaveType(parameters) {
    var url = `${process.env.VUE_APP_TER_API_URL}/leaveType/delete`
    const config = {
      headers: {
        Authorization: globalStore.userEmail,
      }
    }
    const body = {
      id:parameters.id,
    }
    try {
      const response = await Vue.axios.post(url, body, config);
      console.log(response);
      if (response && response.data && response.status == 200) {
        return response.data;
      } else if (response && response.data && response.data.message) {
        return { error: response.data.message };
      } else {
        return { error: "Sorry. Error query leave type." };
      }
    } catch (error) {
      console.log(error.response);
      return { error: error.response.data.message }
    }
  },
  ///// end LeaveType
}