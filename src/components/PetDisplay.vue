<template>
  <div>
    <div class="pet" v-for="pet in pets" v-bind:key="pet._id">
      <router-link :to="{ name: 'pet', params: { id: pet._id }}"><img :src="pet.path" /></router-link>
      <p class="petName">Name: {{pet.name}}</p>
      <p>Species: {{pet.species}}</p>
      <p>{{pet.description}}</p>
      <p>{{pet.description}}</p>
      <div v-if="pet.user">
         <p> {{pet.user.name}}'s Pet </p>
     </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "PetDisplay",
  props: {
    pets: Array
  },

  methods: {
  }
};
</script>

<style scoped>
.petName {
  margin: 0px;
  font-size: 1.2em;
}

p {
  margin: 0px;
}

.pet {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.pet img {
  max-width: 600px;
  max-height: 600px;
  image-orientation: from-image;
}
</style>