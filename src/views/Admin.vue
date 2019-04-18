<template>
  <div id="admin" class="content">
    <div v-if="user">
      <h1>Mythical Pet Adoption: Admin</h1>
       <div class="logout">
        <a href="#" @click="logout">
              Logout
        </a>
      </div>
      <div class="heading">
        <h2>New Pet Profile</h2>
      </div>
      <div class="add">
        <div class="form">
          <input v-model="name" placeholder="Name">
          <input v-model="species" placeholder="Species">
          <input v-model="att" placeholder="Attribute">
          <button @click="addAtt">Add Attribute</button>
          <div class="attr">
            <div v-for="att in attributes" v-bind:key="att">{{att}}</div>
          </div>
          <p></p>
          <h3>Description:</h3>
          <p>
            <textarea v-model="description"></textarea>
          </p>
          <input type="file" name="photo" @change="fileChanged">
          <button @click="create">Create</button>
          <button @click="clear">Clear All</button>
        </div>
      </div>
      <div class="create" v-if="pet">
        <h2>{{pet.name}}</h2>
        <img :src="pet.path">
      </div>
      <p></p>
      <p></p>
      <h2>Edit/Delete a Profile</h2>
      <div class="edit">
        <div class="form">
          <input v-model="editName" placeholder="Search">
          <div
            class="suggestions"
            v-for="s in suggestions"
            @click="selectPet(s)"
            v-bind:key="s.name"
          >
            <div class="suggestion">{{s.name}}</div>
          </div>
        </div>
      </div>
      <div class="change" v-if="editPet">
        <input v-model="editName" placeholder="edit Name">
        <input v-model="editSpecies" placeholder="Edit Species">
        <input v-model="eAtt" placeholder="Add Attribute">
        <button @click="addEAtt()">Add Attribute</button>
        <div class="attr">
          <div v-for="att in eAttributes" v-bind:key="att">{{att}}</div>
        </div>
        <h3>Change Description:</h3>
        <p>
          <textarea v-model="editDescription"></textarea>
        </p>
        <img :src="editPet.path">
      </div>
      <div class="actions" v-if="editPet">
        <button @click="deletePet(editPet)">Delete</button>
        <button @click="uploadPet(editPet)">Edit</button>
      </div>
    </div>
    <div v-else>
      <p>If you would like to upload new pets, please register for an account or login.</p>
      <router-link to="/register" class="pure-button">Register</router-link>or
      <router-link to="/login" class="pure-button">Login</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Admin",

  data() {
    return {
      name: "",
      species: "",
      file: null,
      description: "",
      att: null,
      attributes: [],
      pet: null,

      //for editing:
      editName: "",
      editSpecies: "",
      eAtt: "",
      eAttributes: [],
      editDescription: "",

      allPets: [],
      editPet: null
    };
  },

  async created() {
    this.getPets();
    //this.user = this.$store.state.user;
    await this.$store.dispatch("getUser");
  },

  computed: {
    suggestions() {
      return this.allPets.filter(pet =>
        pet.name.toLowerCase().startsWith(this.editName.toLowerCase())
      );
    },
    user() {
      let user = this.$store.state.user;
      return this.$store.state.user;
    }
  },

  methods: {
    selectPet(pet) {
      this.editName = "";
      this.editPet = pet;
    },

    addAtt() {
      if (this.att === null) {
        return;
      }
      this.attributes.push(this.att);
      this.att = null;
    },

    addEAtt() {
      if (this.eAtt === null) {
        return;
      }
      this.eAttributes.push(this.eAtt);
      this.eAtt = null;
    },

    fileChanged(event) {
      this.file = event.target.files[0];
    },

    async create() {
      try {
        const formData = new FormData();
        formData.append("photo", this.file, this.file.name);
        formData.append("name", this.name);
        formData.append("species", this.species);
        formData.append("attributes", this.attributes);
        formData.append("adopted",false);
        formData.append("description", this.description);
        this.error = await this.$store.dispatch("upload", formData);
        if (!this.error) {
          this.title = "";
          this.description = "";
          this.file = null;
          this.$emit("uploadFinished");
          this.clear();
          this.getPets();
        }
      } catch (error) {
        console.log(error);
      }
    },

    clear() {
      this.name = "";
      this.species = "";
      this.file = null;
      this.description = "";
      this.att = null;
      this.attributes = [];
      this.editName = "";
      this.editPet = null;
      this.editSpecies = "";
      this.eAtt = "";
      this.editDescription = "";
      this.eAttributes = [];
    },

    async getPets() {
      //await this.$store.dispatch("getAllPets");
      this.allPets = this.$store.state.pets;
    },

    async deletePet(pet) {
      try {
        let response = axios.delete("/api/pets/" + pet._id);
        this.clear();
        this.getPets();
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async uploadPet(pet) {
      try {
        
        let name = this.editName;
        let description = this.editDescription;
        let species = this.editSpecies;

        if (name === "") {
          name = pet.name;
        }
        if (description === "") {
          description = pet.description;
        }
        if (species === "") {
          species = pet.species;
        }
        let attr = pet.attributes.concat(this.eAttributes);
        let response = await axios.put("/api/pets/" + pet._id, {
          name: name,
          species: species,
          description: description,
          attributes: attr,
          adopted: false
        });
        this.clear();
        this.getPets();
        return true;
      } catch (error) {
        console.log(error);
      }
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

.add,
.edit {
  display: flex;
  margin-bottom: 3em;
  padding: 1em;
  border-bottom: 1px;
  border-color: black;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

/* Form */
input,
textarea,
select,
button {
  font-family: "Montserrat", sans-serif;
  font-size: 1em;
}

.suggestion {
  min-height: 20px;
}

.change h2 {
  margin: 0px;
}

.change img {
  max-width: 300px;
}
.form {
  margin-right: 50px;
}
.attr {
  padding-left: 27em;
}

.actions {
  margin: 1em;
}
</style>

