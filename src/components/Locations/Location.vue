<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Add New Restaurant
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Add New Restaurant
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @click.prevent>
              <div class="row g-3 align-items-center">
                <div class="col-auto d-block mx-auto">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Restaurant Name"
                    v-model="state.name"
                  /><span
                    class="error-feedback text-danger"
                    v-if="v$.name.$error"
                    >{{ v$.name.$errors[0].$message }}</span
                  >
                </div>
              </div>
              <br />
              <div class="row g-3 align-items-center">
                <div class="col-auto d-block mx-auto">
                  <input
                    type="tele"
                    class="form-control"
                    placeholder="Phone Number"
                    @input="state.phone = state.phone.trim()"
                    v-model="state.phone"
                  />
                  <span
                    class="error-feedback text-danger"
                    v-if="v$.phone.$error"
                    >{{ v$.phone.$errors[0].$message }}</span
                  >
                </div>
              </div>
              <br />
              <div class="row g-3 align-items-center">
                <div class="col-auto d-block mx-auto">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Address"
                    v-model="state.address"
                  /><span
                    class="error-feedback text-danger"
                    v-if="v$.address.$error"
                    >{{ v$.address.$errors[0].$message }}</span
                  >
                </div>
              </div>
              <br />
              <div class="row g-3 align-items-center">
                <div
                  class="col-auto d-block mx-auto alert alert-success"
                  v-if="successMessage"
                >
                  {{ successMessage }}
                </div>
              </div>
              <div class="row g-3 align-items-center">
                <div
                  class="col-auto d-block mx-auto alert alert-danger"
                  v-if="errorMessage"
                >
                  {{ errorMessage }}
                </div>
              </div>
              <br />
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              @click="addLocation()"
              class="btn btn-primary"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { mapActions } from "vuex";
export default {
  name: "AddLocation",
  setup() {
    const state = reactive({
      name: "",
      phone: "",
      address: "",
    });
    const rules = computed(() => {
      return {
        name: { required, minLength: minLength(5), maxLength: maxLength(20) },
        phone: {
          required,
          //   pattern: helpers.regex("phone", /^(01[0125])[0-9]{8}$/),
          maxLength: maxLength(11),
        },
        address: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(50),
        },
      };
    });
    const v$ = useValidate(rules, state);
    return { state, v$ };
  },
  data() {
    return {
      userId: "",
      successMessage: "",
      errorMessage: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("userData");
    if (!user) {
      this.redirectTo({ value: "SignUp" });
    } else {
      this.userId = JSON.parse(user).id;
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async addLocation() {
      this.v$.$validate();
      if (this.v$.$error) {
        console.log("Validation failed!");
        this.successMessage = "";
        this.errorMessage = "Please fill in all required fields.";
        return;
      } else {
        let result = await axios.post(`http://localhost:3000/locations`, {
          name: this.state.name,
          phone: this.state.phone,
          address: this.state.address,
          userId: this.userId,
        });
        console.log(result);
        if (result.status === 201) {
          alert("Location added successfully");
          this.successMessage = "Location added successfully!";
          this.errorMessage = "";
          this.clearAllInputs();
        } else {
          this.errorMessage = "Location not added Please try again !";
          this.successMessage = "";
          alert("Failed to add location");
        }
      }
    },
    clearAllInputs() {
      setTimeout(() => {
        this.state.name = "";
        this.state.phone = "";
        this.state.address = "";
        this.successMessage = "";
        this.errorMessage = "";
        this.v$.phone.$errors[0].$message = "";
        this.v$.address.$errors[0].$message = "";
        this.v$.name.$errors[0].$message = "";
      }, 1000);
    },
  },
};
</script>
<style></style>
