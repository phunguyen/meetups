import * as firebase from 'firebase/app'

export default {
	state: {
		loadedMeetups: [
			{
				id: 'fsf3342sgdrtkjke3', 
				title: 'In Hanoi', 
				location: 'Hoan Kiem - Hanoi',
				date: '2018-11-28 09:00',
				imageUrl: 'http://static.asiawebdirect.com/m/bangkok/portals/vietnam/homepage/hanoi/first-time/pagePropertiesImage/hanoi.jpg.jpg',
				description: 'Javascript Meetup',
			},
			{
				id: 'jfjskfjsfji3i34343', 
				title: 'In Saigon', 
				location: 'Quan 1 - Saigon',
				date: '2018-11-30 14:00',
				imageUrl: 'http://static.asiawebdirect.com/m/bangkok/portals/vietnam/homepage/hanoi/pagePropertiesOgImage/teaser_006.jpg.jpg',
				description: 'NodeJS Meetup'
			},
		]
	},
	mutations: {
		setLoadedMeetups (state, payload) {
			state.loadedMeetups = payload
		},
		createMeetup (state, payload) {
			state.loadedMeetups.push(payload)
		},
		updateMeetup (state, payload) {
			const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
		}
	},
	actions: {
		loadedMeetups ({ commit }) {
			commit('setLoading', true)
			firebase.database().ref('meetups').once('value')
				.then(data => {
					let meetups = []
					let list = data.val()
					for(let key in list) {
						meetups.push({
							id: key,
							...list[key]
						})
					}
					commit('setLoadedMeetups', meetups)
					commit('setLoading', false)
				})
				.catch(error => {
        	commit('setLoading', false)
        	commit('setError', error)
					console.error(error)
				})
		},
		createMeetup ({ commit, getters }, payload) {
			commit('setLoading', true)
			const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date,
        creatorId: getters.user.id
      }
      let meetupId
      let imageUrl
      firebase.database().ref('meetups').push(meetup)
      	.then(data => {
      		meetupId = data.key
      	})
      	.then(() => {
      		const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + meetupId + '.' + ext).put(payload.image)
      	})
      	.then(fileData => {
      		return fileData.ref.getDownloadURL()
      	})
      	.then(downloadURL => {
      		imageUrl = downloadURL
          return firebase.database().ref('meetups').child(meetupId).update({imageUrl: imageUrl})
      	})
      	.then(() => {
      		commit('setLoading', false)
					commit('createMeetup', {
						...meetup,
						id: meetupId,
						imageUrl
					})
      	})
      	.catch(error => {
        	commit('setLoading', false)
        	commit('setError', error)
      		console.error(error)
      	})
		},
		updateMeetup ({ commit }, payload) {
			commit('setLoading', true)
			const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
      }
			firebase.database().ref('meetups').child(payload.id).update(meetup)
				.then(() => {
        	commit('setLoading', false)
					commit('updateMeetup', payload)
				})
      	.catch(error => {
        	commit('setLoading', false)
        	commit('setError', error)
      		console.error(error)
      	})
		}
	},
	getters: {
		loadedMeetups (state) {
			return state.loadedMeetups.sort((meetupA, meetupB) => {
				return meetupA.date < meetupB.date
			})
		},
		featuredLoadedMeetups (state, getters) {
			return getters.loadedMeetups.slice(0, 5)
		},
		loadedMeetup (state) {
			return (meetupId) => {
				return state.loadedMeetups.find(item => {
					return item.id == meetupId
				});
			}
		}
	}
}