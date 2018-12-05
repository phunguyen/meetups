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
		        <v-form @submit.prevent="onSignup">
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
				          <v-text-field
				            name="confirmPassword"
				            label="Confirm Password"
				            id="confirmPassword"
				            type="password"
				            v-model="confirmPassword"
				            :rules="[comparePasswords]"
				          ></v-text-field>
				        </v-flex>
				      </v-layout>
				      <v-layout row wrap>
				        <v-flex xs12>
				          <v-btn color="indigo lighten-4" type="submit">Sign Up</v-btn>
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
				confirmPassword: '',
			}
		},
		computed: {
			comparePasswords () {
				return this.password !== this.confirmPassword ? 'Password do not match' : ''
			},
			user () {
				return this.$store.getters.user
			},
			error () {
				return this.$store.getters.error
			}
		},
		methods: {
			onSignup () {
				const newUser = {
					email: this.email,
					password: this.password
				}
				this.$store.dispatch('signUpUser', newUser)
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