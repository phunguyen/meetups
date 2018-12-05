<template>
	<v-container>
	  <v-layout row wrap v-if="!loading">
	    <v-flex xs12>
	      <v-card>
    			<v-img
	          :src="meetup.imageUrl	"
	          aspect-ratio="2.75"
	        ></v-img>
	        <v-card-title primary-title>
	          <div>
	            <h3 class="headline mb-0">{{ meetup.title }} at {{ meetup.date }}</h3>
	            <div><i>{{ meetup.location }}</i></div>
	            <nl2br tag="p" :text="meetup.description" />
	          </div>
	        </v-card-title>

	        <v-card-actions>
	        	<v-spacer></v-spacer>
	        	<edit-meetup-dialog :meetup="meetup" v-if="userIsLogged && meetup.creatorId === user.id"></edit-meetup-dialog>
	        	<register-dialog :meetup="meetup" v-if="userIsLogged && meetup.creatorId !== user.id"></register-dialog>
	        </v-card-actions>
	      </v-card>
	    </v-flex>
	  </v-layout>
	</v-container>
</template>

<script>
	import EditMeetupDialog from './EditMeetupDialog.vue'
	import RegisterDialog from './RegisterDialog.vue'
	export default {
		components: {
			EditMeetupDialog,
			RegisterDialog
		},
		props: ['id'],
		computed: {
			meetup () {
				return this.$store.getters.loadedMeetup(this.id)
			},
			loading () {
				return this.$store.getters.loading
			},
			user () {
				return this.$store.getters.user
			},
			userIsLogged () {
				return this.$store.getters.user != null && this.$store.getters.user != undefined
			}
		}
	}
</script>