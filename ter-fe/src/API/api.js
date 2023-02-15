import Vue from 'vue';
import {globalStore} from '@/main.js'

export default{

  ///// start leave type
  async getLeaveTypes(parameters) {
    var url = `${process.env.VUE_APP_LCM_API_URL}/leaveType/search`
    const config = {
      headers: {
        Authorization: globalStore.userEmail,
      }
    }
    const body = {
      code: parameters.code,
      description: parameters.description,
      pageNo:parameters.pageNo??0,
      pageSize:parameters.pageSize??0
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
      console.log(error);
      return { error: error.message }
    }
  },
  async createLeaveType(parameters) {
    var url = `${process.env.VUE_APP_LCM_API_URL}/leaveType/create`
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
    var url = `${process.env.VUE_APP_LCM_API_URL}/leaveType/update`
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
    var url = `${process.env.VUE_APP_LCM_API_URL}/leaveType/delete`
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

  ////  start Leave application
  async getLeaveApplication(parameters) {
    var url = `${process.env.VUE_APP_LCM_API_URL}/leaveApplication/search`
    const config = {
      headers: {
        Authorization: globalStore.userEmail,
      }
    }
    const body = {
      empId:parameters.empId,
      dateFrom:parameters.dateFrom,
      dateTo:parameters.dateTo,
      transactionReferrenceId:parameters.transactionReferrenceId,
      department:parameters.department,
      position:parameters.position,
      employeeName:parameters.employeeName,
      leaveTypeId:parameters.leaveTypeId,
      leaveDetails:parameters.leaveDetails,
      leaveDate:parameters.leaveDate,
      commutation:parameters.commutation,
      status:parameters.status,
      pageNo:parameters.pageNo??0,
      pageSize:parameters.pageSize??0
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
      console.log(error);
      return { error: error.message }
    }
  },

  //// end leave application

  //// start leave credit
  async getLeaveCredit(parameters) {
    var url = `${process.env.VUE_APP_LCM_API_URL}/leaveCredit/search`
    const config = {
      headers: {
        Authorization: globalStore.userEmail,
      }
    }
    const body = {
      name: parameters.name,
      position: parameters.position,
      department:parameters.department,
      empId:parameters.empId,
      searchValue:parameters.searchValue,
      pageNo:parameters.pageNo??0,
      pageSize:parameters.pageSize??0
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
      console.log(error);
      return { error: error.message }
    }
  },

  async getDepartments() {
    var url = `${process.env.VUE_APP_LCM_API_URL}/leaveCredit/getDepartments`
    const config = {
      headers: {
        Authorization: globalStore.userEmail,
      }
    }
    const body = {}
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
      console.log(error);
      return { error: error.message }
    }
  },

  async createLeaveCredit(parameters) {
    var url = `${process.env.VUE_APP_LCM_API_URL}/leaveCredit/create`
    const config = {
      headers: {
        Authorization: globalStore.userEmail,
      }
    }
    const body = {
      empID: parameters.empId,
      firstname: parameters.firstname,
      middlename: parameters.middlename,
      lastname: parameters.lastname,
      position: parameters.position,
      department: parameters.department,
      salary: parameters.salary,
      VlAmount: parameters.totalVlEarned,
      SlAmount: parameters.totalSlEarned,
      transactionReferrenceId: parameters.trnId,
      remarks:parameters.remarks,
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

  async updateLeaveCredit(parameters) {
    var url = `${process.env.VUE_APP_LCM_API_URL}/leaveCredit/update`
    const config = {
      headers: {
        Authorization: globalStore.userEmail,
      }
    }
    const body = {
      id:parameters.id,
      empID: parameters.empId,
      firstname: parameters.firstname,
      middlename: parameters.middlename,
      lastname: parameters.lastname,
      position: parameters.position,
      department: parameters.department,
      salary: parameters.salary,
      VlAmount: parameters.totalVlEarned,
      SlAmount: parameters.totalSlEarned,
      transactionReferrenceId: parameters.trnId,
      remarks:parameters.remarks??'',
      update_credits_remarks:parameters.update_credits_remarks,
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
  //// end leave credit
}