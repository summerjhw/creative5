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
      <div v-if="user != null">
        <div v-if="user.name === pet.user.name">
          <p>Congratulations! You adopted {{pet.name}}</p>
        </div>
        <div v-else-if="pet.user">
          <p>{{pet.user.name}} adopted {{pet.name}}</p>
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
      enabled: true
    };
  },

  created() {
    this.$store.dispatch("getAllPets");
    this.$store.dispatch("getUser");
  },

  computed: {
    pet() {
      let id = this.$route.params.id;
      let allPets = this.$store.state.allPets;
      for (let i = 0; i < allPets.length; i++) {
        if (allPets[i]._id === id) {
          return allPets[i];
        }
      }
      return null;
    },

    user() {
      return this.$store.state.user;
    }
  },

  methods: {
    async adopt() {
      try {
        this.enabled = false;
        let response = await axios.put("/api/pets/adopt/" + this.pet._id, {
          user: this.user,
        });
        console.log(response);
        this.getPets();
        this.$store.dispatch("getAllPets");
      } catch (error) {
        console.log(error);
      }
    }
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