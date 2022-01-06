<template>
  <div class="containor">
    <CheckOutInfo
      class="checkOut"
      v-if="isDetail"
      :initial-detail="detailData"
      @close-detail="closeDetail"
    />
    <div class="main">
      <Selector @after-selector-city="afterSelectorCity" />
      <div class="main_area1" v-if="restaurantData.length > 0">
        <div class="title">
          <div class="title_square"></div>
          <span class="title_text">熱門美食</span>
        </div>
        <div class="cards">
          <RestaurantCard
            v-for="restaurant in restaurantData"
            :key="restaurant.id"
            :initial-restaurant="restaurant"
            :initial-location="location"
            @restaurant-detail="getDetail"
            @add-restaurantLike="addRestaurantLike"
            @remove-restaurantLike="removeRestaurantLike"
          />
        </div>
      </div>
      <div class="pagination">
        <ResPagination
          :totalPage="restaurant.totalPage"
          :initialCurrentPage="restaurant.currentPage"
          @change-page="changePage"
          @pre-page="prePage"
          @next-page="nextPage"
        />
      </div>
      <div class="main_area2" v-if="hotelData.length > 0">
        <div class="title">
          <div class="title_square"></div>
          <span class="title_text">推薦住宿</span>
        </div>
        <div class="cards">
          <HotelCard
            v-for="hotel in hotelData"
            :key="hotel.id"
            :initial-hotel="hotel"
            :initial-location="location"
            @hotel-detail="getDetail"
            @add-hotelLike="addHotelLike"
            @remove-hotelLike="removeHotelLike"
          />
        </div>
      </div>
      <div class="pagination">
        <HotelPagination
          :totalPage="hotel.totalPage"
          :initialCurrentPage="hotel.currentPage"
          @HotelChange-page="HotelChangePage"
          @HotelPre-page="HotelPrePage"
          @HotelNext-page="HoteNextPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import getApi from "@/api/api";
import RestaurantCard from "../components/RestaurantCard.vue";
import HotelCard from "../components/HotelCard.vue";
import Selector from "../components/Selector.vue";
import ResPagination from "../components/R&Pagination.vue";
import HotelPagination from "../components/H&Pagination.vue";
import CheckOutInfo from "../components/CheckOutInfoP3.vue";

export default {
  name: "Hotel",
  components: {
    RestaurantCard,
    HotelCard,
    Selector,
    ResPagination,
    HotelPagination,
    CheckOutInfo,
  },
  data() {
    return {
      city: "NewTaipei",
      area: "淡水區",
      location: "新北市淡水區",
      restaurantData: [],
      hotelData: [],
      // localStorage Favorite
      favoriteRestaurant:
        JSON.parse(localStorage.getItem("favoriteRestaurant")) || [],
      favoriteHotel: JSON.parse(localStorage.getItem("favoriteHotel")) || [],
      // 分頁data
      RenderPage: 10,
      restaurant: {
        currentPage: 1,
        totalPage: [],
      },
      hotel: {
        currentPage: 1,
        totalPage: [],
      },
      detailData: [],
      isDetail: false,
    };
  },
  created() {
    this.getCityHotel(this.city, this.area, this.hotel.currentPage);
    this.getCityRestaurant(this.city, this.area, this.restaurant.currentPage);
  },
  watch: {
    city: function () {
      console.log("city觸發");
      this.restaurant.currentPage = 1;
      this.restaurant.totalPage = [];
      this.hotel.currentPage = 1;
      this.hotel.totalPage = [];
      this.getCityHotel(this.city, this.area, this.hotel.currentPage);
      this.getCityRestaurant(this.city, this.area, this.restaurant.currentPage);
    },
    area: function () {
      console.log("area觸發");
      this.restaurant.currentPage = 1;
      this.restaurant.totalPage = [];
      this.hotel.currentPage = 1;
      this.hotel.totalPage = [];
      this.getCityHotel(this.city, this.area, this.hotel.currentPage);
      this.getCityRestaurant(this.city, this.area, this.restaurant.currentPage);
    },
    "restaurant.currentPage": function () {
      this.getCityRestaurant(this.city, this.area, this.restaurant.currentPage);
    },
    "hotel.currentPage": function () {
      this.getCityHotel(this.city, this.area, this.hotel.currentPage);
    },
  },

  methods: {
    getDetail(payload) {
      const { restaurantDetail, hotelDetail } = payload;
      if (restaurantDetail) {
        this.detailData = restaurantDetail;
      }
      if (hotelDetail) {
        this.detailData = hotelDetail;
      }
      this.isDetail = true;
    },
    closeDetail() {
      this.isDetail = false;
      this.detailData = [];
    },
    getCityHotel(city, area, page) {
      getApi.getCityHotel(city, area).then((res) => {
        // 總Data
        let result = res.data;

        // 按區域篩選Data
        let data = result.filter((item) => item.Address.includes(area));
        // 按頁數篩選renderData
        const startIndex = (page - 1) * this.RenderPage;
        let renderData = data.slice(startIndex, startIndex + this.RenderPage);
        this.hotelData = renderData.map((data) => ({
          ...data,
          isFavorite: false,
        }));

        // 篩選喜歡清單
        // const saveHotel = JSON.parse(localStorage.getItem("favoriteHotel"));
        this.hotelData.map((item1) => {
          return Object.assign(
            item1,
            this.favoriteHotel.find((item2) => {
              return item2.HotelID && item1.HotelID === item2.HotelID;
            })
          );
        });

        // 總頁數
        const numberOfPage = Math.ceil(data.length / this.RenderPage);
        for (let i = 1; i <= numberOfPage; i++) {
          this.hotel.totalPage.push(i);
        }
        // 篩掉重複頁數
        this.hotel.totalPage = this.hotel.totalPage.filter(function (
          element,
          index,
          arr
        ) {
          return arr.indexOf(element) === index;
        });
      });
    },
    getCityRestaurant(city, area, page) {
      getApi.getCityRestaurant(city, area).then((res) => {
        // 總Data
        let result = res.data;

        // 按區域篩選Data
        let data = result.filter((item) => item.Address.includes(area));

        // 按頁數篩選renderData
        const startIndex = (page - 1) * this.RenderPage;
        let renderData = data.slice(startIndex, startIndex + this.RenderPage);
        this.restaurantData = renderData.map((data) => ({
          ...data,
          isFavorite: false,
        }));

        // 篩選喜歡清單
        // const saveRestaurant = JSON.parse(
        //   localStorage.getItem("favoriteRestaurant")
        // );
        // console.log(saveRestaurant.length);
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

        // 總頁數
        const numberOfPage = Math.ceil(data.length / this.RenderPage);
        for (let i = 1; i <= numberOfPage; i++) {
          this.restaurant.totalPage.push(i);
        }
        // 篩掉重複頁數
        this.restaurant.totalPage = this.restaurant.totalPage.filter(function (
          element,
          index,
          arr
        ) {
          return arr.indexOf(element) === index;
        });
        console.log(this.restaurant.totalPage);
      });
    },

    afterSelectorCity(payload) {
      const { city, area } = payload;
      this.city = city;
      this.area = area;
      this.location = city + area;
    },

    changePage(payload) {
      const { currentPage } = payload;
      this.restaurant.currentPage = currentPage;
    },

    prePage(payload) {
      const { currentPage } = payload;
      this.restaurant.currentPage -= currentPage;
    },

    nextPage(payload) {
      const { currentPage } = payload;
      this.restaurant.currentPage += currentPage;
    },

    HotelChangePage(payload) {
      const { currentPage } = payload;
      this.hotel.currentPage = currentPage;
    },

    HotelPrePage(payload) {
      const { currentPage } = payload;
      this.hotel.currentPage -= currentPage;
    },

    HoteNextPage(payload) {
      const { currentPage } = payload;
      this.hotel.currentPage += currentPage;
    },

    addRestaurantLike(payload) {
      const { restaurantId } = payload;
      this.restaurantData.forEach((item) => {
        if (item.RestaurantID === restaurantId) {
          item.isFavorite = true;

          this.favoriteRestaurant.push(item);
          localStorage.setItem(
            "favoriteRestaurant",
            JSON.stringify(this.favoriteRestaurant)
          );
        }
      });
    },
    removeRestaurantLike(payload) {
      const { restaurantId } = payload;

      let restaurantIndex = this.favoriteRestaurant.findIndex((element) => {
        return element.RestaurantID === restaurantId;
      });

      if (
        this.favoriteRestaurant.some(
          (item) => item.RestaurantID === restaurantId
        )
      ) {
        this.favoriteRestaurant.splice(restaurantIndex, 1);
        localStorage.setItem(
          "favoriteRestaurant",
          JSON.stringify(this.favoriteRestaurant)
        );
      }
      this.restaurantData.forEach((item) => {
        if (item.RestaurantID === restaurantId) {
          item.isFavorite = false;
        }
      });
    },
    addHotelLike(payload) {
      const { hotelId } = payload;
      this.hotelData.forEach((item) => {
        if (item.HotelID === hotelId) {
          item.isFavorite = true;

          this.favoriteHotel.push(item);
          localStorage.setItem(
            "favoriteHotel",
            JSON.stringify(this.favoriteHotel)
          );
        }
      });
    },
    removeHotelLike(payload) {
      const { hotelId } = payload;

      let hotelIndex = this.favoriteHotel.findIndex((item) => {
        return item.HotelID === hotelId;
      });

      if (this.favoriteHotel.some((item) => item.HotelID === hotelId)) {
        this.favoriteHotel.splice(hotelIndex, 1);
        localStorage.setItem(
          "favoriteHotel",
          JSON.stringify(this.favoriteHotel)
        );
      }

      this.hotelData.forEach((item) => {
        if (item.HotelID === hotelId) {
          item.isFavorite = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/All.scss";
.checkOut {
  z-index: 999;
}
.main {
  @include flexCenter;
  flex-direction: column;
  &_area1 {
    width: 90%;
    .title {
      @include flexCenter;
      justify-content: flex-start;
      padding-top: 1rem;
      &_square {
        background: $yellow;
        width: 20px;
        height: 20px;
        margin-right: 0.5rem;
      }
      &_text {
        font-size: 20px;
        font-weight: 600;
      }
    }
    .cards {
      margin-top: 1rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 1rem;
      @include pad {
        grid-template-columns: repeat(4, 1fr);
      }
      @include web {
        grid-template-columns: repeat(5, 1fr);
      }
    }
  }
  &_area2 {
    width: 90%;
    margin-top: 3rem;
    .title {
      @include flexCenter;
      justify-content: flex-start;
      &_square {
        background: $yellow;
        width: 20px;
        height: 20px;
        margin-right: 0.5rem;
      }
      &_text {
        font-size: 20px;
        font-weight: 600;
      }
    }
    .cards {
      margin-top: 1rem;

      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 1rem;
      @include pad {
        grid-template-columns: repeat(4, 1fr);
      }
      @include web {
        grid-template-columns: repeat(5, 1fr);
      }
    }
  }
  .pagination {
    padding-top: 0.75rem;
  }
}
</style>
