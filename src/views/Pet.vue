<template>
  <div id="pet">
    <div v-if="pet">
      <img :src="pet.path">
      <p>Species: {{pet.species}}</p>
      <div v-for="att in pet.attributes" v-bind:key="att">{{att}}</div>
      <p>{{pet.description}}</p>
      <p>{{pet.description}}</p>
      <div v-if="pet.user">
        <p>{{pet.user.name}}'s Pet</p>
      </div>
      <div v-if="user">
        <div v-if="owner != null">
          <div v-if="user.name === pet.user.name">
            <p>Congratulations! You adopted {{pet.name}}</p>
          </div>
          <div v-else-if="pet.user">
            <p>{{pet.user.name}} adopted {{pet.name}}</p>
          </div>
        </div>
        <div v-else>
          <button type="adopt" @click="adopt" class="pure-button pure-button-secondary">Adopt!</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>sorry, pet not found</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "pet",
  data() {
    return {
      enabled: true,
      pet: null,
      user: null,
      owner: null
    };
  },

  created() {
    if (this.$store.state.user == null) {
      this.$store.dispatch("getUser");
    }
    this.user = this.$store.state.user;
    this.getPet();
  },

  methods: {
    async adopt() {
      try {
        this.enabled = false;
        let response = await axios.put("/api/pets/adopt/" + this.pet._id, {
          user: this.user
        });
        console.log(response);
        this.getPet();
        
      } catch (error) {
        console.log(error);
      }
    },

    getPet() {
     
      this.$store.dispatch("getAllPets");
  
      let id = this.$route.params.id;
      let allPets = this.$store.state.allPets;
      for (let i = 0; i < allPets.length; i++) {
        if (allPets[i]._id === id) {
          this.pet = allPets[i];
          this.owner = this.pet.user;
        }
      }
    },
  }
};
</script>

<style>
#pet img {
  width: 500px;
  margin: 2em;
}

#pet {
  text-align: center;
  background: rgb(82, 83, 40);
  color: #ff9;
  margin-bottom: 4em;
  padding-bottom: 3em;
}
</style>