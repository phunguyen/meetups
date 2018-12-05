<template>
	<v-container>
	  <v-layout row wrap>
	  	<v-flex xs12 sm6 class="text-xs-center text-sm-right"> 	  
	  	  <v-btn color="indigo lighten-4" to="/meetups">View Meetups</v-btn>
	  	</v-flex>
	  	<v-flex xs12 sm6 class="text-xs-center text-sm-left">	 
    		<v-btn color="indigo lighten-4" to="/meetup/new">Organize Meetup</v-btn>
	  	</v-flex>
  	</v-layout>
  	<v-layout row wrap class="mt-2" v-if="!loading">
	  	<v-carousel height="300">
		    <v-carousel-item
		      v-for="(item,i) in meetups"
		      :key="i"
		      :src="item.imageUrl"
		      @click="openMeetup(item.id)"
		      style="cursor: pointer;"
		    >
		    	<div class="title">{{ item.title }}</div>
		    </v-carousel-item>
		  </v-carousel>
	  </v-layout>
	  <v-layout row wrap class="mt-2">
	    <v-flex xs12 class="text-xs-center">
	      Join our awesome meetups!
	    </v-flex>
	  </v-layout>
	</v-container>
</template>

<script>
	export default {
		computed: {
			meetups () {
				return this.$store.getters.featuredLoadedMeetups
			},
      loading () {
      	return this.$store.getters.loading
      }
		},
		methods: {
			openMeetup (id) {
				this.$router.push('/meetups/' + id);
			}
		}
	}	
</script>

<style scoped>
.title {
	position: absolute;
  bottom: 50px;
  background-color: rgba(0,0,0,0.5);
  color: white;
  font-size: 2em;
  padding: 20px;
}
</style>