import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies-reactive'
Vue.use(VueCookies)

Vue.use(Router)

export const ConstRoutes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta:{
      title:"Dashboard",
    },
    icon: "mdi-view-dashboard",
    visible:true,
  },
  {
    path: '/evaluation',
    name: 'terForm',
    component: () => import('../views/TerForm.vue'),
    meta:{
      title:"Evaluation Form",
    },
    icon: "mdi-account-box",
    visible:false,
  },
  {
    path: '/terFormMgt',
    name: 'terFormMgt',
    component: () => import('../views/modules/Admin/TerFormMgt.vue'),
    meta:{
      title:"Evaluation Form",
    },
    icon: "mdi-account-box",
    visible:false,
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/modules/Admin/Admin.vue'),
    meta:{
      title:"Administration",
      roles:['AdminUser'],
    },
    icon: "mdi-account-circle",
    visible:true,
    // children: [      
    //   // {
    //   //   path: "/leavetype",
    //   //   name: "leavetype",
    //   //   component: () => import(/* webpackChunkName: "about" */ '../views/modules/Admin/LeaveType.vue'),
    //   //   visible:true,
    //   //   meta: {
    //   //     title: "Leave Type",
    //   //     isChild:true,
    //   //   },
    //   //   icon: "mdi-cog",
    //   // },
    //   // {
    //   //   path: "/leavecredit",
    //   //   name: "leavecredit",
    //   //   component: () => import(/* webpackChunkName: "about" */ '../views/modules/Admin/LeaveCredit.vue'),
    //   //   visible:true,
    //   //   meta: {
    //   //     title: "Leave Credit",
    //   //     isChild:true,        
    //   //   },
    //   //   icon: "mdi-cog",
    //   // },
    //   {
    //     path: "/user",
    //     name: "user",
    //     component: () => import(/* webpackChunkName: "about" */ '../views/modules/Admin/User.vue'),
    //     visible:true,        
    //     meta: {
    //       title: "User",
    //       isChild:true, 
    //       // roles:['AdminUser'],// just delete or comment this code if the route is accessable to all       
    //     },
    //     icon: "mdi-cog",
    //   },
    // ],
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:ConstRoutes,
})     
router.beforeEach((to, from, next) => {
  document.title = process.env.VUE_APP_NAME+'-'+to.meta.title;
    
    let _userType = Vue.$cookies.get('_SID_').position;
    let _adminUser = Vue.$cookies.get('_SID_').AdminUser??false;

    if (to.meta.isChild){
      const parentRoute = to.matched[to.matched.length - 2];
      console.log('p',parentRoute)
      if((!parentRoute.meta.roles.includes(_userType))&&(!(_adminUser && parentRoute.meta.roles.includes("AdminUser")))){
        // If the user is a staff member and they are trying to access the Administration route, redirect them to the Dashboard route
        next({ name: 'Dashboard' })
      }
    }
    if (!to.meta.roles){
      next();
    }else{
      if((!to.meta.roles.includes(_userType))&&(!(_adminUser && to.meta.roles.includes("AdminUser")))){
          // If the user is a staff member and they are trying to access the Administration route, redirect them to the Dashboard route
          next({ name: 'Dashboard' })
        } else {
          // Allow access to the route
          next()
        }
    }
})

export default router
