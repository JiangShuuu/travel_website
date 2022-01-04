<template>
  <div class="card">
    <div class="card_img">
      <img :src="restaurant.Picture.PictureUrl1 | emptyImage" alt="" />
    </div>
    <div class="card_title" @click.stop.prevent="getDetail(restaurant)">
      <span>{{ restaurant.RestaurantName }}</span>
    </div>
    <div class="card_location">
      <li class="location"><i class="fas fa-map-marker-alt"></i></li>
      <span>{{ location }}</span>
    </div>
    <div class="card_favorite">
      <div
        v-if="restaurant.isFavorite"
        @click.stop.prevent="removeFavorite(restaurant.RestaurantID)"
        class="remove"
      >
        ❤
      </div>
      <div
        v-else
        @click.stop.prevent="addFavorite(restaurant.RestaurantID)"
        class="add"
      >
        🤍
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";

export default {
  name: "restaurantCard",
  mixins: [emptyImageFilter],
  props: {
    initialRestaurant: {
      type: Object,
      required: true,
    },
    initialLocation: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
      location: this.initialLocation,
    };
  },
  watch: {
    initialRestaurant(newValue) {
      this.restaurant = newValue;
    },
    initialLocation(newValue) {
      this.location = newValue;
    },
  },
  methods: {
    getDetail(data) {
      this.$emit("restaurant-detail", {
        restaurantDetail: data,
      });
    },
    addFavorite(id) {
      this.$emit("add-restaurantLike", {
        restaurantId: id,
      });
    },
    removeFavorite(id) {
      this.$emit("remove-restaurantLike", {
        restaurantId: id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/All.scss";

.card {
  box-shadow: 4px 2px 4px rgba(13, 11, 12, 0.2);
  background-color: rgb(255, 255, 255);
  padding: 0.75rem;
  height: 15rem;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  &_favorite {
    .add {
      font-size: 0.85rem;
    }
    cursor: pointer;
    position: absolute;
    color: $pink;
    bottom: 1rem;
    right: 0.75rem;
  }
  &_img {
    text-align: center;
    padding-bottom: 10px;
    img {
      object-fit: cover;
      aspect-ratio: 1 / 0.75;
      width: 100%;
    }
  }
  &_title {
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      color: $pink;
    }
  }
  &_location {
    display: flex;
    align-items: flex-end;
    .location {
      color: $pink;
      margin-right: 0.5rem;
    }
    span {
      font-size: 12px;
      color: $green;
    }
  }
}
</style>
