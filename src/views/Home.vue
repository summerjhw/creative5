<template>
  <div class="home">
    <pet-display :pets="pets"/>
  </div>
  
</template>

<script>
import PetDisplay from "@/components/PetDisplay.vue";
export default {
  name: "app",
  components: {
    PetDisplay
  },

  data() {
    return {
      user: null
    };
  },

  async created() {
    await this.$store.dispatch("getAllPets");
  },

  computed: {
    pets() {
      return this.$store.state.allPets;
    }
  },
  methods: {
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