<template>
	<v-container>
	  <v-layout row wrap class="mb-2" v-for="meetup in meetups" :key="meetup.title" v-if="!loading">
	  	<v-flex xs12 sm10 md8 offset-sm1 offset-md2>
	  	  <v-card>
		    	<v-container>
		    	  <v-layout row wrap>
		    	    <v-flex xs5>
		    	      <v-img
	          			height="130px"
	          			:src="meetup.imageUrl"
	        			>
	        			</v-img>
		    	    </v-flex>
		    	    <v-flex xs7>
		    	      <v-card-title>
				          <div>
				            <span class="grey--text">{{ meetup.title }} at {{ meetup.date | date }}</span><br>
				            <span>{{ meetup.location }}</span><br>
				            <span>{{ meetup.description.substring(0, 100) }}</span>
				          </div>
				        </v-card-title>
				        <v-card-actions>
				          <v-btn flat color="orange" :to="'/meetups/' + meetup.id">
                    View Meetup
                  </v-btn>
				        </v-card-actions>
		    	    </v-flex>
		    	  </v-layout>
		    	</v-container>
				</v-card>
	  	</v-flex>
	  </v-layout>
	</v-container>
</template>

<script>
	export default {		
		computed: {
			meetups () {
				return this.$store.getters.loadedMeetups
			},
			loading () {
				return this.$store.getters.loading
			}
		}
	}
</script>