<template>
  <div class="card">
    <div class="card_img">
      <img :src="hotel.Picture.PictureUrl1 | emptyImage" alt="" />
    </div>
    <div class="card_title" @click.stop.prevent="getDetail(hotel)">
      <span>{{ hotel.HotelName }}</span>
    </div>
    <div class="card_location">
      <li class="location"><i class="fas fa-map-marker-alt"></i></li>
      <span>{{ location }}</span>
    </div>
    <div class="card_favorite">
      <div
        @click.stop.prevent="removeFavorite(hotel.HotelID)"
        v-if="hotel.isFavorite"
        class="remove"
      >
        ❤
      </div>
      <div @click.stop.prevent="addFavorite(hotel.HotelID)" v-else class="add">
        🤍
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";
export default {
  name: "HotelCard",
  mixins: [emptyImageFilter],
  props: {
    initialHotel: {
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
      hotel: this.initialHotel,
      location: this.initialLocation,
    };
  },
  watch: {
    initialHotel(newValue) {
      this.hotel = newValue;
    },
    initialLocation(newValue) {
      this.location = newValue;
    },
  },
  methods: {
    getDetail(data) {
      this.$emit("hotel-detail", {
        hotelDetail: data,
      });
    },
    getHotelId(resId) {
      this.$emit("hotel-detail", {
        hotelId: resId,
      });
    },
    addFavorite(id) {
      this.$emit("add-hotelLike", {
        hotelId: id,
      });
    },
    removeFavorite(id) {
      this.$emit("remove-hotelLike", {
        hotelId: id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/All.scss";

.card {
  background-color: white;
  box-shadow: 4px 2px 4px rgba(13, 11, 12, 0.2);
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
      width: 100%;
      object-fit: cover;
      aspect-ratio: 1 / 0.75;
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
