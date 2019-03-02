import Vue from 'vue'
import Router from 'vue-router'

import Homepage from '@/pages/Homepage.vue'

import SignIn from '@/pages/users/SignIn.vue'
import Register from '@/pages/users/Register.vue'

import RegisterOrganization from '@/pages/organizations/RegisterOrganization.vue'
import Organizations from '@/pages/organizations/Organizations.vue'
import OrganizationSingle from '@/pages/organizations/OrganizationSingle.vue'

import RegisterCase from '@/pages/cases/RegisterCase.vue'
import OpenedCases from '@/pages/cases/OpenedCases.vue'
import Case from '@/pages/cases/Case.vue'

import AdminDashboard from '@/pages/admin/Dashboard.vue'
import AdminSignIn from '@/pages/admin/SignIn.vue'
import AdminCases from '@/pages/admin/case/AllCases.vue'
import AdminCaseSingle from '@/pages/admin/case/CaseSingle.vue'
import AdminUsers from '@/pages/admin/Users.vue'
import AdminOrganizations from '@/pages/admin/Organizations.vue'
import AdminPageNotFound from '@/pages/admin/PageNotFound.vue'

import PageNotFound from '@/pages/404.vue'

import RouteGuard from './route-guard'
import RouteGuardSignedIn from './route-guard-signed-in'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage
    },
    {
      path: '/organizations',
      name: 'organizations',
      component: Organizations,
      beforeEnter: RouteGuard
    },
    {
      path: '/organization/:id',
      name: 'organization-single',
      component: OrganizationSingle,
      beforeEnter: RouteGuard
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
      beforeEnter:RouteGuardSignedIn
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter:RouteGuardSignedIn
    },
    {
      path: '/register-organization',
      name: 'register-organization',
      component: RegisterOrganization,
      beforeEnter: RouteGuardSignedIn
    },
    {
      path: '/register-case',
      name: 'register-case',
      component: RegisterCase,
      beforeEnter: RouteGuard
    },
    {
      path: '/opened-cases',
      name: 'opened-cases',
      component: OpenedCases,
      beforeEnter: RouteGuard
    },
    {
      path: '/case/:id',
      name: 'case-single',
      component: Case,
      beforeEnter: RouteGuard
    },
    {
      path: "/admin",
      name: 'admin',
      component: AdminDashboard
    },
    {
      path: "/admin/sign-in",
      name: 'admin-sign-in',
      component: AdminSignIn
    },
    {
      path: "/admin/cases",
      name: 'admin-cases',
      component: AdminCases
    },
    {
      path: "/admin/case/:id",
      name: 'admin-case-single',
      component: AdminCaseSingle
    },
    {
      path: "/admin/users",
      name: 'admin-users',
      component: AdminUsers
    },
    {
      path: "/admin/organizations",
      name: 'admin-organizations',
      component: AdminOrganizations
    },
    {
      path: "/admin/*",
      name: 'admin-404',
      component: AdminPageNotFound
    },
    {
      path: "*",
      name: '404',
      component: PageNotFound
    }
  ],
  linkExactActiveClass: "active"
})


