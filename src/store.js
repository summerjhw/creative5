import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    pets: [],
    allPets: [],
    currentPet: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setPets(state, pets) {
      state.pets = pets;
    },
    setAllPets(state,pets) {
      state.allPets = pets;
    },
  },
  actions: {

    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },

    async upload(context, data) {
      try {
        await axios.post('/api/pets/', data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },

    async getMyPets(context) {
      try {
        let response = await axios.get("/api/pet/" + this.user._id);
        context.commit('setPets', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },

    async getAllPets(context) {
      try {
        let response = await axios.get("/api/pets/all");
        context.commit('setAllPets', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },

  }
})
