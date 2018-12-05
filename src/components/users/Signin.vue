<template>
	<v-container>
	  <v-layout row wrap v-if="error">
	    <v-flex xs12 sm6 offset-sm3>
	    	<app-alert @dismissed="onDismissed" :message="error.message"></app-alert>
	    </v-flex>
	  </v-layout>
  	<v-layout row wrap>
	    <v-flex xs12 sm6 offset-sm3>
	      <v-card>
	      	<v-card-text>
		        <v-form @submit.prevent="onSignin">
						  <v-layout row wrap>
						    <v-flex xs12>
				          <v-text-field
				            name="email"
				            label="Email"
				            id="email"
				            type="email"
				            v-model="email"
				            required
				          ></v-text-field>
				        </v-flex>
				      </v-layout>
						  <v-layout row wrap>
						    <v-flex xs12>
				          <v-text-field
				            name="password"
				            label="Password"
				            id="password"
				            type="password"
				            v-model="password"
				            required
				          ></v-text-field>
				        </v-flex>
				      </v-layout>						  
				      <v-layout row wrap>
				        <v-flex xs12>
				          <v-btn color="indigo lighten-4" type="submit">Sign In</v-btn>
				        </v-flex>
				      </v-layout>
		        </v-form>	      	  
	      	</v-card-text>
	      </v-card>
	    </v-flex>
	  </v-layout>
	</v-container>
</template>

<script>
	export default {
		data () {
			return {
				email: '',
				password: '',
			}
		},
		computed: {
			user () {
				return this.$store.getters.user
			},
			loading () {
				return this.$store.getters.loading
			},
			error () {
				return this.$store.getters.error
			}
		},
		methods: {
			onSignin () {
				const userInfo = {
					email: this.email,
					password: this.password
				}
				this.$store.dispatch('signInUser', userInfo)
			},
			onDismissed () {
				this.$store.dispatch('clearError')
			}
		},
		watch: {
			user (value) {
				if(value !== null && value !== undefined) {
					this.$router.push('/')
				}
			}
		}
	}
</script>