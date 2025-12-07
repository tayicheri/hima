import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createHead } from "@vueuse/head";
import "./assets/fontawesome/css/all.min.css";

const app = createApp(App);

const head = createHead();
app.use(head);

app.use(router);

app.mount("#app");
