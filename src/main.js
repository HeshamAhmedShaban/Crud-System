import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "normalize.css";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
