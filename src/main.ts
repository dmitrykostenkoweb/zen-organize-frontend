import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import "./assets/css/style.css";
import "ant-design-vue/dist/reset.css";

const app = createApp(App);

app.use(Antd).mount("#app");
