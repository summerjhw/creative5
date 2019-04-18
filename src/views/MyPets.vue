<template>
  <div id="MyPets">
    <div v-if="user">
      <div class="logout">
        <a href="#" @click="logout">
              Logout
        </a>
      </div>
        
      <h1>{{user.name}}'s Pets</h1>
      <pet-display :pets="pets"/>
    </div>
    <div v-else>
      <p>If you would like to view your pets, please register for an account or login.</p>
      <router-link to="/register" class="pure-button">Register</router-link>or
      <router-link to="/login" class="pure-button">Login</router-link>
    </div>
  </div>
</template>
    
<script>
import PetDisplay from "@/components/PetDisplay.vue";
import axios from "axios";
export default {
  name: "MyPets",
  components: {
    PetDisplay
  },

  data() {
    return {
      pets: []
    };
  },

  async created() {
    if(this.$store.state.user === null){
    await this.$store.dispatch("getUser");
    }
    // await this.$store.dispatch("getMyPets");
    this.getPets();
  },

  computed: {
    /* pets() {
        return this.$store.state.pets;
    },*/
    user() {
      let user = this.$store.state.user;
      console.log("user: ", user);
      return this.$store.state.user;
    }
  },
  methods: {
    async getPets() {
      // await this.$store.dispatch("getAllPets");
      // this.allPets = this.$store.state.pets;
    try {
      await this.$store.dispatch("getAllPets");
      let allPets = this.$store.state.allPets;


      for (let i = 0; i < allPets.length; i++) {
        let pet = allPets[i];
         console.log("pet: ",pet);
        if((pet.user != null) && (pet.user.name === this.user.name)) {
          this.pets.push(pet);
        }
      }
    }
    catch(error){
      console.log(error);
    }
      // this.pets = allPets.filter(pet => (pet.user != null) && (pet.user.name === this.user.name));
    },

      async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error); 
      }
    },
  }
};
</script>

<style>

.logout {
  text-align:right;
  margin:1em;
}
</style>
