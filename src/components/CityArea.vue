<template>
  <div class="table_first">
    <div class="area">
      <div class="area_title">
        <span>區域清單</span>
      </div>
      <div class="area_wrapper">
        <div class="area_btns">
          <div class="area_btn" v-for="area in areas" :key="area.id">
            <button
              @click.stop.prevent="getAreaDetail(area)"
              :class="['area_button', { active: area === areaName }]"
            >
              {{ area }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";
export default {
  name: "CityAreaList",
  props: {
    initialCityarea: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      areas: this.initialCityarea,
      areaName: "",
    };
  },
  updated() {
    new BetterScroll(".area_wrapper", {
      mouseWheel: true, //开启鼠标滚轮
      disableMouse: false, //启用鼠标拖动
      disableTouch: true, //启用手指触摸
      scrollX: true, //X轴滚动启用
    });
  },
  watch: {
    initialCityarea: function () {
      this.areas = this.initialCityarea;
    },
  },
  methods: {
    getAreaDetail(area) {
      this.$emit("get-area", {
        areaName: area,
      });
      this.areaName = area;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/All.scss";

.table_first {
  padding-top: 6rem;
}

.area {
  text-align: center;
  &_title {
    font-size: 2.5rem;
    padding-bottom: 1rem;
    font-weight: 600;
    text-shadow: 0.1em 0.1em rgb(255, 252, 252);
  }
  &_wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: inline-flex;
    @include flexCenter;
  }
  &_btns {
    display: flex;
  }
  &_btn {
    cursor: pointer;

    button {
      all: unset;
      border: 1px solid green;
      border-radius: 10px;
      padding: 0.55rem 1rem;
      margin: 0.5rem 0.5rem;
      width: 20px;
      &:hover {
        background: $pink;
        color: white;
      }
    }
    .active {
      background: $pink;
      color: white;
    }
  }
}
</style>
