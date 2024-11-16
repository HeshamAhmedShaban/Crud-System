<template>
  <div class="container">
    <NavBar />
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <h1>Update Your Profile</h1>
        </div>
        <div class="row g-3 align-items-center">
          <div class="col-auto d-block mx-auto">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Your Name"
              v-model="name"
            />
            <span class="error-feedback text-danger" v-if="v$.name.$error">{{
              v$.name.$errors[0].$message
            }}</span>
          </div>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <input
            type="email"
            class="form-control"
            placeholder="Enter Your Email"
            v-model="email"
          />
          <span class="error-feedback text-danger" v-if="v$.email.$error">{{
            v$.email.$errors[0].$message
          }}</span>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <input
            type="password"
            class="form-control"
            placeholder="Enter Your password"
            v-model="password"
          />
          <span class="error-feedback text-danger" v-if="v$.password.$error">{{
            v$.password.$errors[0].$message
          }}</span>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <button
            type="submit"
            class="btn btn-primary"
            @click="updateUserData()"
          >
            Update Your Profile
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import NavBar from "../Header/Navbar.vue";
import useValidate from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import axios from "axios";
export default {
  name: "UpdateProfile",
  components: { NavBar },
  data() {
    return {
      v$: useValidate(),
      userData: {},
      name: "",
      email: "",
      password: "",
    };
  },
  validations() {
    return {
      name: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(50),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
    };
  },
  mounted() {
    this.patchDataToTheForm();
  },
  methods: {
    patchDataToTheForm() {
      let user = localStorage.getItem("userData");
      this.userData = JSON.parse(user);
      if (user) {
        this.name = JSON.parse(user).name;
        this.email = JSON.parse(user).email;
        this.password = JSON.parse(user).password;
      } else {
        this.$router.push("/");
      }
    },
    async updateUserData() {
      this.v$.$validate();
      //   console.log(this.userData, "this.userData");
      if (!this.v$.$error) {
        let newUSerData = {
          id: this.userData.id,
          name: this.name,
          email: this.email,
          password: this.password,
        };

        let updateProfile = await axios.put(
          `http://localhost:3000/users/${this.userData.id}`,
          newUSerData
        );
        // console.log(updateProfile, "updateProfile");
        if (updateProfile.data) {
          alert("Profile updated successfully!");
          localStorage.setItem("userData", JSON.stringify(newUSerData));
          this.$router.push("/profile");
        } else {
          alert("Failed to update profile!");
        }
      } else {
        return;
      }
    },
  },
};
</script>
