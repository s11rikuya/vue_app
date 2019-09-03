import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_user: null,
    drawer: false,
    addresses: [],
    posts: []
  },
  mutations: {
    setLoginUser (state, user) {
      state.login_user = user
    },
    deleteLoginUser (state) {
      state.login_user = null
    },
    toggleSideMenu (state) {
      state.drawer = !state.drawer
    },
    addPost (state, { id, post }) {
      post.id = id
      state.posts.push(post)
    },
    updatePost (state, { id, post }) {
      const index = state.posts.findIndex(post => post.id === id)
      state.posts[index] = post
    },
    deletePost (state, { id }) {
      const index = state.posts.findIndex(post => post.id === id)
      state.posts.splice(index, 1)
    },
    addAddress (state, { id, address }) {
      address.id = id
      state.addresses.push(address)
    },
    updateAddress (state, { id, address }) {
      const index = state.addresses.findIndex(address => address.id === id)
      state.addresses[index] = address
    },
    deleteAddress (state, { id }) {
      const index = state.addresses.findIndex(address => address.id === id)
      state.addresses.splice(index, 1)
    }
  },
  actions: {
    setLoginUser ({ commit }, user) {
      commit('setLoginUser', user)
    },
    fetchAddresses ({ getters, commit }) {
      firebase.firestore().collection(`users/${getters.uid}/addresses`).get().then(snapshot => {
        snapshot.forEach(doc => commit('addAddress', { id: doc.id, address:  doc.data() }))
      })
    },
    fetchPosts ({ getters, commit }) {
      firebase.firestore().collection(`users/${getters.uid}/posts`).get().then(snapshot => {
        snapshot.forEach(doc => commit('addPost', { id: doc.id, post:  doc.data() }))
      })
    },
    login () {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    logout () {
      firebase.auth().signOut()
    },
    deleteLoginUser ({ commit }) {
      commit('deleteLoginUser')
    },
    toggleSideMenu ({ commit }) {
      commit('toggleSideMenu')
    },
    addPost ({ getters, commit }, post) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/posts`).add(post).then(doc => {
          commit('addPost', { id: doc.id, post })
        })
      }
    },
    updatePost ({ getters, commit }, {id, post}) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/posts`).doc(id).update(post).then(() => {
          commit('updatePost', { id, post })
        })
      }
    },
    deletePost ({ getters, commit }, { id }) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/posts`).doc(id).delete().then(() => {
          commit('deletePost', { id })
        })
      }
    },
    addAddress ({ getters, commit }, address) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/posts`).add(address).then(doc => {
          commit('addAddress', { id: doc.id, address })
        })
      }
    },
    updateAddress ({ getters, commit }, {id, address}) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/addresses`).doc(id).update(address).then(() => {
          commit('updateAddress', { id, address })
        })
      }
    },
    deleteAddress ({ getters, commit }, { id }) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/addresses`).doc(id).delete().then(() => {
          commit('deleteAddress', { id })
        })
      }
    }
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL : '',
    uid: state => state.login_user ? state.login_user.uid : null,
    getAddressById: state => id => state.addresses.find(address => address.id == id),
    getPostById: state => id => state.posts.find(post => post.id == id)
  }
})
