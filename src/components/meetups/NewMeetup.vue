<template>
	<v-container>
	  <v-layout row wrap>
	    <v-flex xs12 sm6 offset-sm3>
	      <h1>Create new Meetup</h1>
	    </v-flex>
	  </v-layout>
	  <v-form @submit.prevent="onCreateMeetup">
		  <v-layout row wrap>
		    <v-flex xs12 sm6 offset-sm3>
		      <v-text-field
		        name="title"
		        label="Title"
		        id="title"
		        required
		        v-model='title'
		      ></v-text-field>
		    </v-flex>
		  </v-layout>
		  <v-layout row wrap>
		    <v-flex xs12 sm6 offset-sm3>
		      <v-text-field
		        name="location"
		        label="Location"
		        id="location"
		        required
		        v-model='location'
		      ></v-text-field>
		    </v-flex>
		  </v-layout>
		  <v-layout row wrap>
		    <v-flex xs12 sm6 offset-sm3>
		      <v-btn color="indigo lighten-1" @click="onPickFile">Upload Image</v-btn>
		      <input type="file" name="" ref="imageFile" style="display: none;" @change="onFilePicked">
		    </v-flex>
		  </v-layout>
		  <v-layout row wrap>
		    <v-flex xs12 sm6 offset-sm3>
		      <img :src='imageUrl' width="300px">
		    </v-flex>
		  </v-layout>
		  <v-layout row wrap>
		    <v-flex xs12 sm6 offset-sm3>
		      <v-textarea
	          name="description"
		        label="Description"
		        id="description"
		        required
		        v-model='description'
	        ></v-textarea>
		    </v-flex>
		  </v-layout>
		  <v-layout row wrap>
		    <v-flex xs12 sm6 offset-sm3>
		      <v-date-picker v-model="date" color="indigo"></v-date-picker>
		    </v-flex>
		  </v-layout>
		  <v-layout row wrap>
		    <v-flex xs12 sm6 offset-sm3>
		      <v-time-picker v-model="time" format="24hr"></v-time-picker>
		    </v-flex>
		  </v-layout>
		  <v-layout row wrap class="mt-2">
		    <v-flex xs12 sm6 offset-sm3>
		      <v-btn 
		      	color="indigo lighten-4" 
		      	:disabled="!isValidForm"
		      	type="submit"
	      	>Create Meetup</v-btn>
		    </v-flex>
		  </v-layout>
		</v-form>
	</v-container>
</template>

<script>
	export default {
		data () {
			return {
				title: '',
				location: '',
				date: new Date().toISOString().slice(0,10),
				time: new Date().toISOString().slice(11, 16),
				image: null,
				imageUrl: '',
				description: '',
			}
		},
		computed: {
			isValidForm () {
				return this.title !== '' 
					&& this.location !== '' 
					&& this.date != ''
					&& this.description != ''
			}
		},
		methods: {
			onPickFile () {
				this.$refs.imageFile.click()
			},
			onFilePicked (event) {
				const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
			},
			onCreateMeetup () {
				const meetup = {
					title: this.title,
					location: this.location,
					date: this.date + ' ' + this.time,
					description: this.description,
					image: this.image
				}
				this.$store.dispatch('createMeetup', meetup)
				this.$router.push('/meetups')
			}
		}
	}
</script>