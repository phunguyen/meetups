import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/meetups/Meetups'
import NewMeetup from '@/components/meetups/NewMeetup'
import Meetup from '@/components/meetups/Meetup'
import Profile from '@/components/users/Profile'
import Signup from '@/components/users/Signup'
import Signin from '@/components/users/Signin'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
    	path: '/meetups',
    	name: 'Meetups',
    	component: Meetups
    },
    {
    	path: '/meetup/new',
    	name: 'NewMeetup',
    	component: NewMeetup,
        beforeEnter: AuthGuard
    },
    {
    	path: '/meetups/:id',
    	name: 'Meetup',
    	props: true,
    	component: Meetup
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        beforeEnter: AuthGuard
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
    	path: '/signin',
    	name: 'Signin',
    	component: Signin
    }
  ]
})
