import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const ConstRoutes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/TesTingN.vue'),
    meta:{
      title:"Dashboard",
    },
    icon: "mdi-view-dashboard",
    visible:true,
  },
  // {
  //   path: '/leave',
  //   name: 'leave',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/modules/Leave/LeaveApplications.vue'),
  //   meta:{
  //     title:"Leave Account",
  //   },
  //   icon: "mdi-account-box",
  //   visible:true,
  // },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */  '../views/TesTing.vue'),
    meta:{
      title:"Administration",
    },
    icon: "mdi-account-circle",
    visible:true,
    roles:['AdminUser'],
    children: [
      {
        path: "/leavetransaction",
        name: "leavetransaction",
        component: () => import(/* webpackChunkName: "about" */ '../views/TesTingN.vue'),
        visible:true,
        meta: {
          title: "Leave Transaction",
          isChild:true,
        },
        icon: "mdi-cog",
      },
      {
        path: "/leavetype",
        name: "leavetype",
        component: () => import(/* webpackChunkName: "about" */ '../views/modules/Admin/LeaveType.vue'),
        visible:true,
        meta: {
          title: "Leave Type",
          isChild:true,
        },
        icon: "mdi-cog",
      },
      {
        path: "/leavecredit",
        name: "leavecredit",
        component: () => import(/* webpackChunkName: "about" */ '../views/modules/Admin/LeaveCredit.vue'),
        visible:true,
        meta: {
          title: "Leave Credit",
          isChild:true,        
        },
        icon: "mdi-cog",
      },
      {
        path: "/user",
        name: "user",
        component: () => import(/* webpackChunkName: "about" */ '../views/modules/Admin/User.vue'),
        visible:true,
        // roles:['admin'],// just delete or comment this code if the route is accessable to all
        meta: {
          title: "User",
          isChild:true,        
        },
        icon: "mdi-cog",
      },
    ],
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:ConstRoutes,
})     
router.beforeEach((to, from, next) => {
  document.title = process.env.VUE_APP_NAME+'-'+to.meta.title;
  next();
})

export default router
