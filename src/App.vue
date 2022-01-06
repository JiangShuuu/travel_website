<template>
  <div id="travel_website">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style lang="scss">
@import "./assets/scss/All.scss";
#travel_website {
  background-color: $light-gray;
}
</style>
