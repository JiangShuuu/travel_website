<template>
  <div class="contain">
    <CheckOutInfo
      class="checkOut"
      v-if="isDetail"
      :initial-detail="detailData"
      @close-detail="closeDetail"
    />
    <div class="main">
      <Selector @after-selector-city="afterSelectorCity" />
      <HotCity />
      <HotActivity
        v-if="activityData.length > 0"
        :initial-activity="activityData"
        :initial-city="city"
        @activity-detail="getDetail"
      />
      <HotView
        v-if="viewData.length > 0"
        :initial-viewdata="viewData"
        :initial-location="location"
        @view-detail="getDetail"
      />
      <ViewPagination
        v-if="view.totalPage.length > 1"
        :totalPage="view.totalPage"
        :initialCurrentPage="view.currentPage"
        @change-page="changePage"
        @pre-page="prePage"
        @next-page="nextPage"
      />
    </div>
  </div>
</template>

<script>
import getApi from "@/api/api";
import Selector from "./../components/Selector.vue";
import HotCity from "../components/HotCity.vue";
import HotActivity from "../components/HotActivity.vue";
import HotView from "../components/HotView.vue";
import ViewPagination from "../components/ViewPagination.vue";
import CheckOutInfo from "../components/CheckOutInfoP3.vue";

export default {
  name: "Home",
  components: {
    Selector,
    HotCity,
    HotActivity,
    HotView,
    ViewPagination,
    CheckOutInfo,
  },
  data() {
    return {
      city: "NewTaipei",
      area: "三芝區",
      viewData: [],
      activityData: [],
      favoriteActivity:
        JSON.parse(localStorage.getItem("favoriteActivity")) || [],
      favoriteView: JSON.parse(localStorage.getItem("favoriteView")) || [],
      location: "NewTaipei三芝區",
      // 分頁Data
      RenderPage: 10,
      view: {
        currentPage: 1,
        totalPage: [],
      },
      isDetail: false,
      detailData: [],
    };
  },
  created() {
    this.getCityActivity(this.city, 12);
    this.getCityScenicSpot(this.city, this.area, this.view.currentPage);
  },
  watch: {
    city: function () {
      this.view.currentPage = 1;
      this.view.totalPage = [];
      this.getCityActivity(this.city, 12);
      this.getCityScenicSpot(this.city, this.area, this.view.currentPage);
    },
    area: function () {
      this.view.currentPage = 1;
      this.view.totalPage = [];
      this.getCityScenicSpot(this.city, this.area, this.view.currentPage);
    },
    "view.currentPage": function () {
      this.getCityScenicSpot(this.city, this.area, this.view.currentPage);
    },
  },

  methods: {
    getDetail(payload) {
      const { viewDetail, activityDetail } = payload;
      if (viewDetail) {
        this.detailData = viewDetail;
      }
      if (activityDetail) {
        this.detailData = activityDetail;
      }
      this.isDetail = true;
    },

    getCityActivity(city, month) {
      getApi.getCityActivity(city, month).then((res) => {
        let result = res.data;

        const startIndex = (1 - 1) * 4;
        let renderData = result.slice(startIndex, startIndex + 4);
        this.activityData = renderData.map((data) => ({
          ...data,
          isFavorite: false,
        }));
        // 過濾favorite重複清單

        this.activityData.map((item1) => {
          return Object.assign(
            item1,
            this.favoriteActivity.find((item2) => {
              return item2.ActivityID && item1.ActivityID === item2.ActivityID;
            })
          );
        });
      });
    },
    getCityScenicSpot(city, area, page) {
      getApi.getCityScenicSpot(city, area).then((res) => {
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
        // 按頁數篩選Data
        const startIndex = (page - 1) * this.RenderPage;
        let renderData = data.slice(startIndex, startIndex + this.RenderPage);
        this.viewData = renderData.map((data) => ({
          ...data,
          isFavorite: false,
        }));

        // 過濾favorite重複清單
        // const saveView = JSON.parse(localStorage.getItem("favoriteView"));

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

        // 總頁數
        const numberOfPage = Math.ceil(data.length / this.RenderPage);
        for (let i = 1; i <= numberOfPage; i++) {
          this.view.totalPage.push(i);
        }
        // 篩掉重複頁數
        this.view.totalPage = this.view.totalPage.filter(function (
          element,
          index,
          arr
        ) {
          return arr.indexOf(element) === index;
        });
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
      this.view.currentPage = currentPage;
    },

    prePage(payload) {
      const { currentPage } = payload;
      this.view.currentPage -= currentPage;
    },

    nextPage(payload) {
      const { currentPage } = payload;
      this.view.currentPage += currentPage;
    },
    closeDetail() {
      this.isDetail = false;
      this.detailData = [];
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
}
</style>
