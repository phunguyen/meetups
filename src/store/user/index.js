import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default {
	state: {
		user: null
	},
	mutations: {
		setUser (state, payload) {
			state.user = payload
		},
		registerMeetup (state, payload) {
			state.user.registeredMeetups.push(payload.meetupId)
			state.user.fbKeys[payload.meetupId] = payload.fbKey
		},
		unregisterMeetup (state, payload) {
			const idx = state.user.registeredMeetups.findIndex(meetupId => {
				return meetupId === payload
			})
			state.user.registeredMeetups.splice(idx, 1)
			Reflect.deleteProperty(state.user.fbKeys, payload)
		},
		loadRegisteredMeetups (state, payload) {
			state.user = {...state.user, ...payload}
		}
	},
	actions: {		
		signUpUser ({ commit }, payload) {
			commit('setLoading', true)
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          data => {
						commit('setLoading', false)
            const newUser = {
              id: data.user.uid,
              registeredMeetups: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
          	commit('setLoading', false)
          	commit('setError', error)
            console.error(error)
          }
        )
		},
		signInUser ({ commit }, payload) {
			commit('setLoading', true)
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          data => {
						commit('setLoading', false)
            const userInfo = {
              id: data.user.uid,
              registeredMeetups: [],
              fbKeys: {}
            }
            commit('setUser', userInfo)
          }
        )
        .catch(
          error => {
          	commit('setLoading', false)
          	commit('setError', error)
            console.error(error)
          }
        )
		},
		autoSignIn ({ commit }, payload) {
			commit('setUser', {
				id: payload.uid, 
				registeredMeetups: [],
        fbKeys: {}
			})
		},
		logout ({ commit }) {
			firebase.auth().signOut()
			commit('setUser', null)
		},
		registerMeetup ({ commit, getters }, payload) {
			commit('setLoading', true)
			firebase.database().ref('users/' + getters.user.id + '/registrations').push(payload)
				.then(data => {
					commit('setLoading', false)
					commit('registerMeetup', {
						meetupId: payload,
						fbKey: data.key
					})
				})
				.catch(error => {
					console.error(error)
					commit('setLoading', false)
				})
		},
		unregisterMeetup ({ commit, getters }, payload) {
			commit('setLoading', true)
			firebase.database().ref('users/' + getters.user.id + '/registrations').child(getters.user.fbKeys[payload]).remove()
				.then(data => {
					commit('setLoading', false)
					commit('unregisterMeetup', payload)
				})
				.catch(error => {
					console.error(error)
					commit('setLoading', false)
				})
		},
		loadRegisteredMeetups ({ commit, getters }) {
			commit('setLoading', true)
			firebase.database().ref('users/' + getters.user.id + '/registrations').once('value')
				.then(data => {
					const list = data.val()
					let registeredMeetups = []
					let fbKeys = {}
					for(let key in list) {
						registeredMeetups.push(list[key])
						fbKeys[list[key]] = key
					}
					commit('setLoading', false)
					commit('loadRegisteredMeetups', {
						registeredMeetups,
						fbKeys
					})
				})
				.catch(error => {
					console.error(error)
					commit('setLoading', false)
				})
		}
	},
	getters: {
		user (state) {
			return state.user
		}
	}
}