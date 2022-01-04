import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../views/NotFound.vue";
import home from "../views/Home.vue";
import hotelFood from "../views/HotelFood.vue";
import favorite from "../views/Favorite.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "*",
    name: "not-found",
    component: NotFound,
  },
  {
    path: "/CityDetail/:city",
    name: "cityDetail",
    component: () => import("../views/cityDetail.vue"),
  },
  {
    path: "/hotelFood",
    name: "hotelFood",
    component: hotelFood,
  },
  {
    path: "/favorite",
    name: "favorite",
    component: favorite,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
