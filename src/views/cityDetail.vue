<template>
  <div class="containrr">
    <CheckOutInfo
      class="checkOut"
      v-if="isDetail"
      :initial-detail="detailData"
      @close-detail="closeDetail"
    />
    <div class="city_area">
      <CityArea :initial-cityarea="cityArea" @get-area="getArea" />
    </div>
    <div class="choose_page" v-if="hotelData.length < 1">
      <div class="span_area">
        <span style="--i: 1">請</span>
        <span style="--i: 2">選</span>
        <span style="--i: 3">擇</span>
        <span style="--i: 4">區</span>
        <span style="--i: 5">域</span>
        <span style="--i: 6">.</span>
        <span style="--i: 7">.</span>
        <span style="--i: 8">.</span>
      </div>
    </div>
    <div class="main">
      <div class="activity" v-show="activityData.length > 0">
        <div class="table">
          <div class="triangle"></div>
          <span class="triangle_text">活動清單</span>
        </div>
        <div class="activity_wrapper">
          <div class="cards_activity">
            <div
              class="cardAc"
              v-for="activity in activityData"
              :key="activity.ActivityID"
            >
              <div class="cardAc_img">
                <img :src="activity.Picture.PictureUrl1 | emptyImage" alt="" />
              </div>
              <div class="info">
                <div
                  class="cardAc_title"
                  @click.stop.prevent="getDetail(activity.ActivityID)"
                >
                  <span>{{ activity.ActivityName }}</span>
                </div>
                <div class="cardAc_detail">
                  <p class="cardAc_detail_text">
                    {{ activity.Description }}
                  </p>
                </div>
                <div class="cardAc_location">
                  <div class="cardAc_location_info">
                    <li class="location">
                      <i class="fas fa-map-marker-alt"></i>
                    </li>
                    <span>{{ cityName }}</span>
                  </div>
                  <div
                    class="cardAc_btn"
                    @click.stop.prevent="getDetail(activity.ActivityID)"
                  >
                    <button>活動詳情</button>
                  </div>
                </div>
              </div>
              <div class="cardAc_favorite">
                <div
                  @click.stop.prevent="
                    removeActivityFavorite(activity.ActivityID)
                  "
                  v-if="activity.isFavorite"
                  class="remove"
                >
                  ❤
                </div>
                <div
                  v-else
                  @click.stop.prevent="addActivityFavorite(activity.ActivityID)"
                  class="add"
                >
                  🤍
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="view" v-show="viewData.length > 0">
        <div class="table">
          <div class="square"></div>
          <span>景點清單</span>
        </div>
        <div class="card_wrapper">
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
              <div
                class="card_detail"
                @click.stop.prevent="getDetail(view.ScenicSpotID)"
              >
                <button>查看詳情</button>
              </div>
              <div class="card_favorite">
                <div
                  v-if="view.isFavorite"
                  @click.stop.prevent="removeViewFavorite(view.ScenicSpotID)"
                  class="remove"
                >
                  ❤
                </div>
                <div
                  v-else
                  @click.stop.prevent="addViewFavorite(view.ScenicSpotID)"
                  class="add"
                >
                  🤍
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="restaurant" v-show="restaurantData.length > 0">
        <div class="table">
          <div class="circle"></div>
          <span>餐廳清單</span>
        </div>
        <div class="res_wrapper">
          <div class="cards">
            <div
              class="card"
              v-for="restaurant in restaurantData"
              :key="restaurant.RestaurantID"
            >
              <div class="card_img">
                <img
                  :src="restaurant.Picture.PictureUrl1 | emptyImage"
                  alt=""
                />
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
                  v-if="restaurant.isFavorite"
                  @click.stop.prevent="
                    removeResFavorite(restaurant.RestaurantID)
                  "
                  class="remove"
                >
                  ❤
                </div>
                <div
                  v-else
                  @click.stop.prevent="addResFavorite(restaurant.RestaurantID)"
                  class="add"
                >
                  🤍
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hotel" v-show="hotelData.length > 0">
        <div class="table">
          <div class="umbrella"><i class="fas fa-umbrella"></i></div>
          <span class="umbrella_text">住宿清單</span>
        </div>
        <div class="hotel_wrapper">
          <div class="cards">
            <div class="card" v-for="hotel in hotelData" :key="hotel.HotelID">
              <div class="card_img">
                <img :src="hotel.Picture.PictureUrl1 | emptyImage" alt="" />
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
                  v-if="hotel.isFavorite"
                  @click.stop.prevent="removeHotelFavorite(hotel.HotelID)"
                  class="remove"
                >
                  ❤
                </div>
                <div
                  v-else
                  @click.stop.prevent="addHotelFavorite(hotel.HotelID)"
                  class="add"
                >
                  🤍
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
import CityArea from "./../components/CityArea.vue";
import getApi from "@/api/api";
import { emptyImageFilter } from "./../utils/mixins";
import BetterScroll from "better-scroll";

export default {
  name: "FavoriteList",
  mixins: [emptyImageFilter],
  data() {
    return {
      cityArea: [],
      areaName: "",
      cityNmae: "",
      RenderPage: 10,
      // Activity
      activityData: [],
      favoriteActivity:
        JSON.parse(localStorage.getItem("favoriteActivity")) || [],
      // hotel
      hotelData: [],
      favoriteHotel: JSON.parse(localStorage.getItem("favoriteHotel")) || [],
      // restaurant
      restaurantData: [],
      favoriteRestaurant:
        JSON.parse(localStorage.getItem("favoriteRestaurant")) || [],
      // view
      viewData: [],
      favoriteView: JSON.parse(localStorage.getItem("favoriteView")) || [],

      // Detail
      isDetail: false,
      detailData: [],
    };
  },
  components: {
    CheckOutInfo,
    CityArea,
  },
  created() {
    const { city } = this.$route.params;
    this.cityName = city;
    this.getCityList(city);
  },
  watch: {
    areaName: function () {
      this.getCityRestaurant(this.cityName, this.areaName, 1);
      this.getCityScenicSpot(this.cityNmae, this.areaName, 1);
      this.getCityHotel(this.cityName, this.areaName, 1);
      this.getCityActivity(this.cityName, 12);
    },
    hotelData: function () {
      setTimeout(() => {
        this.moviefunction();
      }, 500);
    },
  },

  methods: {
    moviefunction() {
      new BetterScroll(".hotel_wrapper", {
        mouseWheel: true, //開啟滑鼠滾動
        disableMouse: false, //關閉滑鼠拖動
        disableTouch: false, //關閉手指觸摸
        scrollX: true, //X軸滾動開啟
        click: true,
      });
      new BetterScroll(".card_wrapper", {
        mouseWheel: true, //開啟滑鼠滾動
        disableMouse: false, //關閉滑鼠拖動
        disableTouch: false, //關閉手指觸摸
        scrollX: true, //X軸滾動開啟
        click: true,
      });
      new BetterScroll(".res_wrapper", {
        mouseWheel: true, //開啟滑鼠滾動
        disableMouse: false, //關閉滑鼠拖動
        disableTouch: false, //關閉手指觸摸
        scrollX: true, //X軸滾動開啟
        click: true,
      });
      new BetterScroll(".activity_wrapper", {
        mouseWheel: true, //開啟滑鼠滾動
        disableMouse: false, //關閉滑鼠拖動
        disableTouch: false, //關閉手指觸摸
        scrollX: true, //X軸滾動開啟
        click: true,
      });
    },
    // Get city&area
    async getCityList(city) {
      try {
        const res = await getApi.getCityHotel(city);
        let result = res.data;
        // console.log(result[83]);
        let cityAreas = [];
        result.forEach((item) => {
          let location = item.Address;
          if (
            location.match("東區") ||
            location.match("南區") ||
            location.match("北區") ||
            location.match("西區") ||
            location.match("中區")
          ) {
            let areaIndex = location.indexOf("區");
            let areaName = location.slice(areaIndex - 1, areaIndex + 1);
            cityAreas.push(areaName);
          } else {
            let arrStr = location.split(""); //將字串轉換為陣列
            for (let i = 0; i < arrStr.length; i++) {
              if (arrStr[i] >= "0" && arrStr[i] <= "9") {
                arrStr[i] = "";
              }
            }
            arrStr = arrStr.join("");
            let area = arrStr.slice(3, 6);
            cityAreas.push(area);
          }
        });

        // 篩掉重複的
        this.cityArea = cityAreas.filter(function (element, index, arr) {
          return arr.indexOf(element) === index;
        });
      } catch (error) {
        console.log("無法取得縣市資料，請稍後再試!");
      }
    },
    getArea(payload) {
      const { areaName } = payload;
      this.areaName = areaName;
    },

    // About Activity
    async getCityActivity(city, month) {
      try {
        const res = await getApi.getCityActivity(city, month);
        let result = res.data;

        this.activityData = result.map((data) => ({
          ...data,
          isFavorite: false,
        }));

        // 篩選喜歡清單
        this.activityData.map((item1) => {
          return Object.assign(
            item1,
            this.favoriteActivity.find((item2) => {
              return item2.ActivityID && item1.ActivityID === item2.ActivityID;
            })
          );
        });
      } catch (error) {
        console.log("無法取得活動資料，請稍後再試!");
      }
    },
    addActivityFavorite(id) {
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
    removeActivityFavorite(id) {
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
    // About Hotel
    async getCityHotel(city, area) {
      try {
        const res = await getApi.getCityHotel(city, area);
        // 總Data
        let result = res.data;
        // 按區域篩選Data
        let data = result.filter((item) => item.Address.includes(area));
        this.hotelData = data.map((data) => ({
          ...data,
          isFavorite: false,
        }));

        // 篩選喜歡清單
        this.hotelData.map((item1) => {
          return Object.assign(
            item1,
            this.favoriteHotel.find((item2) => {
              return item2.HotelID && item1.HotelID === item2.HotelID;
            })
          );
        });
      } catch (error) {
        console.log("無法取得飯店資料，請稍後再試!");
      }
    },
    addHotelFavorite(id) {
      this.hotelData.forEach((item) => {
        if (item.HotelID === id) {
          item.isFavorite = true;

          this.favoriteHotel.push(item);
          localStorage.setItem(
            "favoriteHotel",
            JSON.stringify(this.favoriteHotel)
          );
        }
      });
    },
    removeHotelFavorite(id) {
      const hotelIndex = this.favoriteHotel.findIndex(
        (item) => item.HotelID === id
      );

      if (this.favoriteHotel.some((item) => item.HotelID === id)) {
        this.favoriteHotel.splice(hotelIndex, 1);
        localStorage.setItem(
          "favoriteHotel",
          JSON.stringify(this.favoriteHotel)
        );
      }

      this.hotelData.forEach((item) => {
        if (item.HotelID === id) {
          item.isFavorite = false;
        }
      });
    },
    // About View
    async getCityScenicSpot(city, area) {
      try {
        const res = await getApi.getCityScenicSpot(city, area);
        // 總Data
        let result = res.data;

        // 按區域篩選Data
        let data = [];
        result.forEach((item) => {
          if (item.Address === undefined) {
            return;
          } else if (item.Address.includes(area)) {
            data.push(item);
          }
        });
        this.viewData = data.map((data) => ({
          ...data,
          isFavorite: false,
        }));

        // 篩選喜歡清單
        this.viewData.map((item1) => {
          return Object.assign(
            item1,
            this.favoriteView.find((item2) => {
              return (
                item2.ScenicSpotID && item1.ScenicSpotID === item2.ScenicSpotID
              );
            })
          );
        });
      } catch (error) {
        console.log("無法取得景點資料，請稍後再試!");
      }
    },
    addViewFavorite(id) {
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
    removeViewFavorite(id) {
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
    // About Restaurant
    async getCityRestaurant(city, area) {
      try {
        const res = await getApi.getCityRestaurant(city, area);
        // 總Data
        let result = res.data;
        // 按區域篩選Data
        let data = result.filter((item) => item.Address.includes(area));

        // 按頁數篩選renderData
        // const startIndex = (page - 1) * this.RenderPage;
        // let renderData = data.slice(startIndex, startIndex + this.RenderPage);
        this.restaurantData = data.map((data) => ({
          ...data,
          isFavorite: false,
        }));

        // 篩選喜歡清單
        this.restaurantData.map((item1) => {
          return Object.assign(
            item1,
            this.favoriteRestaurant.find((item2) => {
              return (
                item2.RestaurantID && item1.RestaurantID === item2.RestaurantID
              );
            })
          );
        });
      } catch (error) {
        console.log("無法取得餐廳資料，請稍後再試!");
      }
    },
    addResFavorite(id) {
      this.restaurantData.forEach((item) => {
        if (item.RestaurantID === id) {
          item.isFavorite = true;

          this.favoriteRestaurant.push(item);
          localStorage.setItem(
            "favoriteRestaurant",
            JSON.stringify(this.favoriteRestaurant)
          );
        }
      });
    },
    removeResFavorite(id) {
      const restaurantIndex = this.favoriteRestaurant.findIndex(
        (item) => item.RestaurantID === id
      );

      if (this.favoriteRestaurant.some((item) => item.RestaurantID === id)) {
        this.favoriteRestaurant.splice(restaurantIndex, 1);
        localStorage.setItem(
          "favoriteRestaurant",
          JSON.stringify(this.favoriteRestaurant)
        );
      }

      this.restaurantData.forEach((item) => {
        if (item.RestaurantID === id) {
          item.isFavorite = false;
        }
      });
    },
    // AboutDetail
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
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/All.scss";
.containrr {
  width: 100%;
  @include flexCenter;
  flex-direction: column;
  .checkOut {
    z-index: 999;
  }
  .city_area {
    width: 80%;
  }
  .choose_page {
    background-image: url("./../assets/選擇區域1.jpg");
    width: 100%;
    height: 375px;
    @include flexCenter;
    align-items: flex-start;
    -webkit-box-reflect: below -12px linear-gradient(transparent, rgba(0, 0, 0, 0.2));
    .span_area {
      -webkit-box-reflect: below -12px linear-gradient(transparent, rgba(0, 0, 0, 0.2));
      span {
        padding-top: 3rem;
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
  }
  .main {
    width: 95%;
    @include web {
      width: 80%;
    }
    .table {
      display: flex;
      padding-top: 2rem;
      .triangle {
        &::after {
          content: "";
          border-style: solid;
          border-width: 0 16px 30px 16px;
          border-color: #f6f7f8 #f6f7f8 $pink #f6f7f8;
        }
        &_text {
          padding-top: 1.25rem;
        }
      }
      .square {
        width: 30px;
        height: 30px;
        background-color: $yellow;
      }
      .circle {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: $green;
      }
      .umbrella {
        font-size: 2rem;
        color: $pink;
        &_text {
          padding-top: 0.75rem;
        }
      }
      span {
        margin-left: 1rem;
        font-weight: 600;
        font-size: 1.5rem;
      }
    }
    .cards_activity {
      @include flexCenter;
      flex-direction: column;
      @include pad {
        all: unset;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }
      .cardAc {
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
          .cardAc_detail {
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
    .cards {
      padding-bottom: 1rem;
      border: 1px red;
      display: inline-flex;
    }
    .card {
      background-color: rgb(255, 255, 255);
      box-shadow: 4px 2px 4px rgba(13, 11, 12, 0.2);
      padding: 0.75rem;
      margin-right: 0.75rem;
      height: 15rem;
      justify-content: space-around;
      position: relative;
      width: 200px;
      height: 250px;
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
        width: 45%;
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
    // 拖拉區域
    .card_wrapper {
      width: 100%;
      height: 260px;
      overflow: hidden;
      display: inline-flex;
    }
    .hotel_wrapper {
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: inline-flex;
    }
    .res_wrapper {
      width: 100%;
      height: 250px;
      overflow: hidden;
      display: inline-flex;
    }
    .activity_wrapper {
      width: 100%;
      height: 200px;
      overflow: hidden;
    }
  }
}
</style>
