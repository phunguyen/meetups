<template>
  <v-dialog v-model="dialog" persistent max-width="300">
    <v-btn slot="activator" color="orange" flat v-if="isRegisted">Unregister</v-btn>
    <v-btn slot="activator" color="primary" flat v-else>Register</v-btn>
    <v-card>
      <v-card-title class="headline">{{ isRegisted ? 'Unregister' : 'Register' }}</v-card-title>
      <v-card-text>
        Are you sure?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="dialog = false">Cancel</v-btn>
        <v-btn color="indigo darken-1" flat @click="onConfirm">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
	export default {
		props: ['meetup'],
		data () {
			return {
				dialog: false,
			}
		},
    computed: {
      isRegisted () {
        return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
          return meetupId == this.meetup.id
        }) >= 0
      }
    },
		methods: {
			onConfirm () {
				this.dialog = false
        if(this.isRegisted) {
          this.$store.dispatch('unregisterMeetup', this.meetup.id)
        } else {
          this.$store.dispatch('registerMeetup', this.meetup.id)
        }
			}
		}
	}
</script>