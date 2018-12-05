<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-btn slot="activator" color="primary" flat>Edit</v-btn>
    <v-card>
      <v-card-title class="headline">Edit Meetup</v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                required
                v-model="title"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                required
                v-model="location"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
              	name="description"
              	label="Description"
              	id="description"
              	v-model="description"
            	></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="dialog = false">Cancel</v-btn>
        <v-btn color="indigo darken-1" flat @click="onSave">Save</v-btn>
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
				title: this.meetup.title,
				location: this.meetup.location,
				description: this.meetup.description
			}
		},
		methods: {
			onSave () {
				this.dialog = false
				const updateData = {
					id: this.meetup.id,
					title: this.title,
					location: this.location,
					description: this.description
				}
				this.$store.dispatch('updateMeetup', updateData)
			}
		}
	}
</script>