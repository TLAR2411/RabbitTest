import { Meteor } from "meteor/meteor";
import { createApp } from "vue";
import { VueMeteor } from "vue-meteor-tracker";

import App from "./App.vue";
import { router } from "./router";

// Import Vuetify styles and components
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

Meteor.startup(() => {
  const app = createApp(App);
  app.use(vuetify);
  app.use(router);
  app.use(VueMeteor);
  app.mount("#app");
});
