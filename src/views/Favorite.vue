<template>
  <div class="container">
    <CheckOutInfo
      class="checkOut"
      v-if="isDetail"
      :initial-detail="detailData"
      @close-detail="closeDetail"
    />
    <div
      class="choose_page"
      v-if="
        activityData.length < 1 &&
        viewData.length < 1 &&
        restaurantData.length < 1 &&
        hotelData.length < 1
      "
    >
      <div class="return">
        <router-link to="/">
          <p>點我收藏去</p>
        </router-link>
      </div>
      <div class="span_area">
        <span style="--i: 1">目</span>
        <span style="--i: 2">前</span>
        <span style="--i: 3">無</span>
        <span style="--i: 4">收</span>
        <span style="--i: 5">藏</span>
        <span style="--i: 6">清</span>
        <span style="--i: 7">單</span>
        <span style="--i: 8">.</span>
        <span style="--i: 9">.</span>
        <span style="--i: 10">.</span>
      </div>
    </div>
    <div class="mainContain" v-else>
      <div class="titleImage">
        <img src="./../assets/icon/最愛.png" alt="" />
        <span>最愛清單列表</span>
      </div>
      <div class="main">
        <div class="activity" v-if="activityData.length > 0">
          <div class="table">
            <div class="circle"></div>
            <span>最愛活動清單</span>
          </div>
          <div class="cards">
            <div
              class="card"
              v-for="activity in activityData"
              :key="activity.ActivityID"
              @click.stop.prevent="getDetail(activity.ActivityID)"
            >
              <div class="card_img">
                <img :src="activity.Picture.PictureUrl1" alt="" />
              </div>
              <div class="card_title">
                <span>{{ activity.ActivityName }}</span>
              </div>
              <div
                class="card_detail"
                @click.stop.prevent="getDetail(activity.ActivityID)"
              >
                <button>查看詳情</button>
              </div>
              <div class="card_favorite">
                <div
                  @click.stop.prevent="removeActivity(activity.ActivityID)"
                  class="remove"
                >
                  ❤
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="view" v-if="viewData.length > 0">
          <div class="table">
            <div class="circle"></div>
            <span>最愛景點清單</span>
          </div>
          <div class="cards">
            <div class="card" v-for="view in viewData" :key="view.ScenicSpotID">
              <div class="card_img">
                <img :src="view.Picture.PictureUrl1" alt="" />
              </div>
              <div
                class="card_title"
                @click.stop.prevent="getDetail(view.ScenicSpotID)"
              >
                <span>{{ view.ScenicSpotName }}</span>
              </div>
              <div
                class="card_detail"
                @click.stop.prevent="getDetail(view.ScenicSpotID)"
              >
                <button>查看詳情</button>
              </div>
              <div class="card_favorite">
                <div
                  class="remove"
                  @click.stop.prevent="removeView(view.ScenicSpotID)"
                >
                  ❤
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="restaurant" v-if="restaurantData.length > 0">
          <div class="table">
            <div class="circle"></div>
            <span>最愛餐廳清單</span>
          </div>
          <div class="cards">
            <div
              class="card"
              v-for="restaurant in restaurantData"
              :key="restaurant.RestaurantID"
            >
              <div class="card_img">
                <img :src="restaurant.Picture.PictureUrl1" alt="" />
              </div>
              <div
                class="card_title"
                @click.stop.prevent="getDetail(restaurant.RestaurantID)"
              >
                <span>{{ restaurant.RestaurantName }}</span>
              </div>
              <div
                class="card_detail"
                @click.stop.prevent="getDetail(restaurant.RestaurantID)"
              >
                <button>查看詳情</button>
              </div>
              <div class="card_favorite">
                <div
                  class="remove"
                  @click.stop.prevent="
                    removeRestaurant(restaurant.RestaurantID)
                  "
                >
                  ❤
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hotel" v-if="hotelData.length > 0">
          <div class="table">
            <div class="circle"></div>
            <span>最愛住宿清單</span>
          </div>
          <div class="cards">
            <div class="card" v-for="hotel in hotelData" :key="hotel.HotelID">
              <div class="card_img">
                <img :src="hotel.Picture.PictureUrl1" alt="" />
              </div>
              <div
                class="card_title"
                @click.stop.prevent="getDetail(hotel.HotelID)"
              >
                <span>{{ hotel.HotelName }}</span>
              </div>
              <div
                class="card_detail"
                @click.stop.prevent="getDetail(hotel.HotelID)"
              >
                <button>查看詳情</button>
              </div>
              <div class="card_favorite">
                <div
                  class="remove"
                  @click.stop.prevent="removeHotel(hotel.HotelID)"
                >
                  ❤
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckOutInfo from "./../components/CheckOutInfoP3.vue";
export default {
  name: "FavoriteList",
  data() {
    return {
      activityData: JSON.parse(localStorage.getItem("favoriteActivity")) || [],
      viewData: JSON.parse(localStorage.getItem("favoriteView")) || [],
      restaurantData:
        JSON.parse(localStorage.getItem("favoriteRestaurant")) || [],
      hotelData: JSON.parse(localStorage.getItem("favoriteHotel")) || [],
      isDetail: false,
      detailData: [],
    };
  },
  components: {
    CheckOutInfo,
  },
  methods: {
    getDetail(id) {
      this.hotelData.map((item) => {
        if (item.HotelID === id) {
          let [data] = this.hotelData.filter((item) => {
            return item.HotelID === id;
          });
          this.detailData = data;
        }
      });
      this.restaurantData.map((item) => {
        if (item.RestaurantID === id) {
          let [data] = this.restaurantData.filter((item) => {
            return item.RestaurantID === id;
          });
          this.detailData = data;
        }
      });
      this.viewData.map((item) => {
        if (item.ScenicSpotID === id) {
          let [data] = this.viewData.filter((item) => {
            return item.ScenicSpotID === id;
          });
          this.detailData = data;
        }
      });
      this.activityData.map((item) => {
        if (item.ActivityID === id) {
          let [data] = this.activityData.filter((item) => {
            return item.ActivityID === id;
          });
          this.detailData = data;
        }
      });
      this.isDetail = true;
    },
    closeDetail() {
      this.isDetail = false;
      this.detail = [];
    },
    removeActivity(id) {
      const activityIndex = this.activityData.findIndex(
        (item) => item.ActivityID === id
      );

      if (this.activityData.some((item) => item.ActivityID === id)) {
        this.activityData.splice(activityIndex, 1);
        localStorage.setItem(
          "favoriteActivity",
          JSON.stringify(this.activityData)
        );
      }

      this.activityData.forEach((item) => {
        if (item.ActivityID === id) {
          item.isFavorite = false;
        }
      });
    },
    removeView(id) {
      const viewIndex = this.viewData.findIndex(
        (item) => item.ScenicSpotID === id
      );

      if (this.viewData.some((item) => item.ScenicSpotID === id)) {
        this.viewData.splice(viewIndex, 1);
        localStorage.setItem("favoriteView", JSON.stringify(this.viewData));
      }

      this.viewData.forEach((item) => {
        if (item.ScenicSpotID === id) {
          item.isFavorite = false;
        }
      });
    },
    removeRestaurant(id) {
      const restaurantIndex = this.restaurantData.findIndex(
        (item) => item.RestaurantID === id
      );
      if (this.restaurantData.some((item) => item.RestaurantID === id)) {
        this.restaurantData.splice(restaurantIndex, 1);
        localStorage.setItem(
          "favoriteRestaurant",
          JSON.stringify(this.restaurantData)
        );
      }
      this.restaurantData.forEach((item) => {
        if (item.RestaurantID === id) {
          item.isFavorite = false;
        }
      });
    },
    removeHotel(id) {
      const hotelIndex = this.hotelData.findIndex(
        (item) => item.HotelID === id
      );
      if (this.hotelData.some((item) => item.HotelID === id)) {
        this.hotelData.splice(hotelIndex, 1);
        localStorage.setItem("favoriteHotel", JSON.stringify(this.hotelData));
      }
      this.hotelData.forEach((item) => {
        if (item.HotelID === id) {
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
  all: unset;
  .checkOut {
    z-index: 2;
  }
  .choose_page {
    padding-top: 5rem;
    width: 100%;
    height: 375px;
    @include flexCenter;
    flex-direction: column;
    .span_area {
      -webkit-box-reflect: below -12px linear-gradient(transparent, rgba(0, 0, 0, 0.2));
      span {
        font-size: 3rem;
        font-weight: 700;
        display: inline-block;
        text-transform: uppercase;
        animation: animate 1s ease-in-out infinite;
        animation-delay: calc(0.1s * var(--i));
      }
      @keyframes animate {
        0% {
          transform: translateY(0px);
        }
        20% {
          transform: translateY(-20px);
        }
        40%,
        100% {
          transform: translateY(0px);
        }
      }
    }
    .return {
      @include flexCenter;
      margin-bottom: 3rem;
      padding: 0.75rem;
      font-size: 2rem;
      border: 1px solid $green;
      border-radius: 10px;
      a {
        all: unset;
      }
      color: blue;
      cursor: pointer;
      &:hover {
        background-color: $pink;
        border: none;
        a {
          color: white;
        }
      }
    }
  }
  .mainContain {
    @include flexCenter;
    flex-direction: column;
    padding-top: 4rem;
    .titleImage {
      width: 100%;
      position: relative;
      img {
        width: 100%;
        height: 65vh;
        object-fit: cover;
      }
      span {
        position: absolute;
        top: 35%;
        left: 50%;
        color: white;
        font-size: 3rem;
        font-weight: 600;
        transform: translate(-50%, 50%);
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8);
      }
    }
    .main {
      width: 80%;
      padding-top: 2rem;
      .table {
        display: flex;
        align-items: center;
        .circle {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: $green;
        }
        span {
          margin-left: 0.5rem;
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
          &_detail {
            color: black;
            border: 1px solid $pink;
            border-radius: 10px;
            width: 6em;
            text-align: center;
            margin-top: 0.25rem;
            padding: 0.15rem;
            cursor: pointer;
            &:hover {
              background: $pink;
              color: white;
            }
            button {
              all: unset;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
