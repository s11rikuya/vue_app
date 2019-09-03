import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Addresses from './views/Addresses.vue'
import Address from './views/Address.vue'
import AddressForm from './views/AddressForm.vue'
import Posts from './views/Posts.vue'
import Post from './views/Post.vue'
import PostForm from './views/PostForm.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/addresses',
      name: 'addresses',
      component: Addresses
    },
    {
      path: '/addresses/:address_id?',
      name: 'address',
      component: Address
    },
    {
      path: '/addresses/:address_id?/edit',
      name: 'address_edit',
      component: AddressForm
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/posts/:post_id?',
      name: 'post',
      component: Post
    },
    {
      path: '/posts/:post_id?/edit',
      name: 'post_edit',
      component: PostForm
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
