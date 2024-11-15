<template>
  <form @click.prevent>
    <div class="row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <h1>Sign Up</h1>
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
        <button type="submit" class="btn btn-primary" @click="signUp()">
          Sign Up
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          class="btn btn-link"
          type="button"
          @click="redirectTo({ value: 'LoginPage' })"
        >
          Login
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import { mapActions } from "vuex";
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
export default {
  name: "SignUpForm",
  data() {
    return {
      v$: useValidate(),
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
    let email = localStorage.getItem("user Email");
    if (email) {
      this.redirectTo({ value: "home" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    // goToSignUpPage() {
    //   this.$router.push("/login");
    // },
    async signUp() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("form validation successful");
        let userData = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
        let result = await axios.post(`http://localhost:3000/users`, userData);
        console.log(result);
        if (result.status == 201) {
          alert("SignUp successful");
          localStorage.setItem("user info", JSON.stringify(userData));
          this.redirectTo({ value: "LoginPage" });
        } else {
          alert("SignUp failed");
        }
      } else {
        console.log("form validation failed");
      }
    },
  },
};
</script>
