<template>
  <div class="container">
    <div class="table">
      <div class="triangle"></div>
      <span>熱門景點</span>
    </div>
    <div class="cards">
      <div class="card" v-for="view in viewData" :key="view.ScenicSpotID">
        <div class="card_img">
          <img :src="view.Picture.PictureUrl1 | emptyImage" alt="" />
        </div>
        <div
          class="card_title"
          @click.stop.prevent="getDetail(view.ScenicSpotID)"
        >
          <span>{{ view.ScenicSpotName }}</span>
        </div>
        <div class="card_location">
          <li class="location"><i class="fas fa-map-marker-alt"></i></li>
          <span>{{ location }}</span>
        </div>
        <div class="card_favorite">
          <div
            @click.stop.prevent="removeFavorite(view.ScenicSpotID)"
            v-if="view.isFavorite"
            class="remove"
          >
            ❤
          </div>

          <div
            @click.stop.prevent="addFavorite(view.ScenicSpotID)"
            v-else
            class="add"
          >
            🤍
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";

export default {
  name: "views",
  mixins: [emptyImageFilter],
  props: {
    initialViewdata: {
      type: Array,
      required: true,
    },
    initialLocation: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      viewData: this.initialViewdata,
      location: this.initialLocation,
      favoriteView: JSON.parse(localStorage.getItem("favoriteView")) || [],
    };
  },
  watch: {
    initialViewdata(newValue) {
      this.viewData = newValue;
    },
    initialLocation(newValue) {
      this.location = newValue;
    },
  },
  methods: {
    getDetail(id) {
      this.viewData.map((item) => {
        if (item.ScenicSpotID === id) {
          let [data] = this.viewData.filter((item) => {
            return item.ScenicSpotID === id;
          });
          this.$emit("view-detail", {
            viewDetail: data,
          });
        }
      });
    },
    addFavorite(id) {
      this.viewData.forEach((item) => {
        if (item.ScenicSpotID === id) {
          item.isFavorite = true;

          this.favoriteView.push(item);
          localStorage.setItem(
            "favoriteView",
            JSON.stringify(this.favoriteView)
          );
        }
      });
    },
    removeFavorite(id) {
      const viewIndex = this.favoriteView.findIndex(
        (item) => item.ScenicSpotID === id
      );

      if (this.favoriteView.some((item) => item.ScenicSpotID === id)) {
        this.favoriteView.splice(viewIndex, 1);
        localStorage.setItem("favoriteView", JSON.stringify(this.favoriteView));
      }

      this.viewData.forEach((item) => {
        if (item.ScenicSpotID === id) {
          item.isFavorite = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/All.scss";

.container {
  .table {
    .triangle {
      &::after {
        content: "";
        border-style: solid;
        border-width: 0 10px 20px 10px;
        border-color: #f6f7f8 #f6f7f8 $pink #f6f7f8;
      }
    }
    span {
      margin: 1.75rem;
      font-weight: 600;
    }
  }
  .cards {
    margin-top: 1rem;
    padding-bottom: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    @include pad {
      grid-template-columns: repeat(4, 1fr);
    }
    @include web {
      grid-template-columns: repeat(5, 1fr);
    }
    .card {
      background-color: rgb(255, 255, 255);
      box-shadow: 4px 2px 4px rgba(13, 11, 12, 0.2);
      padding: 0.75rem;
      height: 15rem;
      justify-content: space-around;
      position: relative;

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
  }
}
</style>
