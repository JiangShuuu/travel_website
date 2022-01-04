<template>
  <div class="container">
    <div class="table">
      <div class="triangle"></div>
      <span>熱門活動</span>
    </div>
    <div class="cards">
      <div
        class="card"
        v-for="activity in activityData"
        :key="activity.ActivityID"
      >
        <div class="card_img">
          <img :src="activity.Picture.PictureUrl1 | emptyImage" alt="" />
        </div>
        <div class="info">
          <div
            class="card_title"
            @click.stop.prevent="getDetail(activity.ActivityID)"
          >
            <span>{{ activity.ActivityName }}</span>
          </div>
          <div class="card_detail">
            <p class="card_detail_text">
              {{ activity.Description }}
            </p>
          </div>
          <div class="card_location">
            <div class="card_location_info">
              <li class="location"><i class="fas fa-map-marker-alt"></i></li>
              <span>{{ city }}</span>
            </div>
            <div
              class="card_btn"
              @click.stop.prevent="getDetail(activity.ActivityID)"
            >
              <button>活動詳情</button>
            </div>
          </div>
        </div>
        <div class="card_favorite">
          <div
            @click.stop.prevent="removeFavorite(activity.ActivityID)"
            v-if="activity.isFavorite"
            class="remove"
          >
            ❤
          </div>
          <div
            v-else
            @click.stop.prevent="addFavorite(activity.ActivityID)"
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
  name: "Activity",
  mixins: [emptyImageFilter],
  props: {
    initialActivity: {
      type: Array,
      required: true,
    },
    initialCity: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      activityData: this.initialActivity,
      city: this.initialCity,
      favoriteActivity:
        JSON.parse(localStorage.getItem("favoriteActivity")) || [],
    };
  },
  watch: {
    initialActivity: function () {
      this.activityData = this.initialActivity;
    },
    initialCity: function () {
      this.city = this.initialCity;
    },
  },
  methods: {
    getDetail(id) {
      this.activityData.map((item) => {
        if (item.ActivityID === id) {
          let [data] = this.activityData.filter((item) => {
            return item.ActivityID === id;
          });
          this.$emit("activity-detail", {
            activityDetail: data,
          });
        }
      });
    },
    addFavorite(id) {
      this.activityData.forEach((item) => {
        if (item.ActivityID === id) {
          item.isFavorite = true;

          this.favoriteActivity.push(item);
          localStorage.setItem(
            "favoriteActivity",
            JSON.stringify(this.favoriteActivity)
          );
        }
      });
    },
    removeFavorite(id) {
      const activityIndex = this.favoriteActivity.findIndex(
        (item) => item.ActivityID === id
      );

      if (this.favoriteActivity.some((item) => item.ActivityID === id)) {
        this.favoriteActivity.splice(activityIndex, 1);
        localStorage.setItem(
          "favoriteActivity",
          JSON.stringify(this.favoriteActivity)
        );
      }

      this.activityData.forEach((item) => {
        if (item.ActivityID === id) {
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
  width: 100%;
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
    @include flexCenter;
    flex-direction: column;
    @include pad {
      all: unset;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
    .card {
      all: unset;
      display: flex;
      background-color: white;
      box-shadow: 4px 2px 4px rgba(13, 11, 12, 0.2);
      width: 95%;
      margin: 0.75rem;
      position: relative;
      &_favorite {
        position: absolute;
        color: $pink;
        top: 0.25rem;
        right: 0.75rem;
        cursor: pointer;
        .remove {
          font-size: 1.25rem;
        }
      }
      &_title {
        cursor: pointer;
        &:hover {
          color: $pink;
        }
      }
      .info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        margin: 0.5rem 0.5rem;
        width: 80%;
        .card_detail {
          padding: 5px;
          display: none;
          @include web {
            padding: 0px;
            display: block;
          }
          &_text {
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
          }
        }
      }
      &_img {
        width: 45%;
        img {
          margin: 0.75rem;
          object-fit: cover;
          aspect-ratio: 1 /1;
          width: 80%;
        }
      }
      &_location {
        display: flex;
        @include web {
          width: 100%;
          @include flexCenter;
          justify-content: space-around;
        }
        &_info {
          display: flex;
          align-items: flex-end;
        }
        .location {
          color: $pink;
          display: flex;
          font-size: 1.25rem;
          margin-right: 0.5rem;
        }
        span {
          font-size: 14px;
        }
      }
      &_btn {
        display: none;
        @include web {
          display: block;
        }
        button {
          all: unset;
          border: 1px solid $pink;
          border-radius: 10px;
          padding: 0.5rem 1.5rem;
          margin: 0.25rem;
          font-size: 14px;
          cursor: pointer;
          &:hover {
            background: $pink;
            color: white;
          }
        }
      }
    }
  }
}
</style>
