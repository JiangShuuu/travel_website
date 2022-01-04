<template>
  <div class="container">
    <div class="table">
      <div class="triangle"></div>
      <span>熱門城市</span>
    </div>

    <div class="cards_wrapper">
      <div class="cards">
        <div class="card_area">
          <router-link :to="{ name: 'cityDetail', params: { city: 'Taipei' } }">
            <div class="card">
              <img
                class="card_img"
                src="./../../public/cityImage/台北市.png"
                alt=""
              />
              <div class="card_text">
                <li class="card_icon"><i class="fas fa-map-marker-alt"></i></li>
                <span class="card_description">台北市</span>
              </div>
            </div>
          </router-link>
        </div>

        <div class="card_wrapper">
          <div class="card_area">
            <router-link
              :to="{ name: 'cityDetail', params: { city: 'NewTaipei' } }"
            >
              <div class="cardsm">
                <img
                  class="cardsm_img"
                  src="./../../public/cityImage/新北市.png"
                  alt=""
                />
                <div class="cardsm_text">
                  <li class="cardsm_icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </li>
                  <span class="cardsm_description">新北市</span>
                </div>
              </div>
            </router-link>
          </div>
          <router-link
            :to="{ name: 'cityDetail', params: { city: 'Taoyuan' } }"
          >
            <div class="card_area">
              <div class="cardsm">
                <img
                  class="cardsm_img"
                  src="./../../public/cityImage/桃園市.png"
                  alt=""
                />
                <div class="cardsm_text">
                  <li class="cardsm_icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </li>
                  <span class="cardsm_description">桃園市</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <div class="card_area">
          <router-link
            :to="{ name: 'cityDetail', params: { city: 'Hsinchu' } }"
          >
            <div class="card">
              <img
                class="card_img"
                src="./../../public/cityImage/新竹市.png"
                alt=""
              />
              <div class="card_text">
                <li class="card_icon"><i class="fas fa-map-marker-alt"></i></li>
                <span class="card_description">新竹市</span>
              </div>
            </div>
          </router-link>
        </div>

        <div class="card_wrapper">
          <div class="card_area">
            <router-link
              :to="{ name: 'cityDetail', params: { city: 'Taichung' } }"
            >
              <div class="cardsm">
                <img
                  class="cardsm_img"
                  src="./../../public/cityImage/台中市.png"
                  alt=""
                />
                <div class="cardsm_text">
                  <li class="cardsm_icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </li>
                  <span class="cardsm_description">台中</span>
                </div>
              </div>
            </router-link>
          </div>
          <div class="card_area">
            <router-link
              :to="{ name: 'cityDetail', params: { city: 'NantouCounty' } }"
            >
              <div class="cardsm">
                <img
                  class="cardsm_img"
                  src="./../../public/cityImage/南投縣.png"
                  alt=""
                />
                <div class="cardsm_text">
                  <li class="cardsm_icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </li>
                  <span class="cardsm_description">南投</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <div class="card_area">
          <router-link :to="{ name: 'cityDetail', params: { city: 'Chiayi' } }">
            <div class="card">
              <img
                class="card_img"
                src="./../../public/cityImage/嘉義市.png"
                alt=""
              />
              <div class="card_text">
                <li class="card_icon"><i class="fas fa-map-marker-alt"></i></li>
                <span class="card_description">嘉義</span>
              </div>
            </div>
          </router-link>
        </div>

        <div class="card_area">
          <router-link :to="{ name: 'cityDetail', params: { city: 'Tainan' } }">
            <div class="card">
              <img
                class="card_img"
                src="./../../public/cityImage/台南市.png"
                alt=""
              />
              <div class="card_text">
                <li class="card_icon"><i class="fas fa-map-marker-alt"></i></li>
                <span class="card_description">台南</span>
              </div>
            </div>
          </router-link>
        </div>

        <div class="card_wrapper">
          <div class="card_area">
            <router-link
              :to="{ name: 'cityDetail', params: { city: 'Kaohsiung' } }"
            >
              <div class="cardsm">
                <img
                  class="cardsm_img"
                  src="./../../public/cityImage/高雄市.png"
                  alt=""
                />
                <div class="cardsm_text">
                  <li class="cardsm_icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </li>
                  <span class="cardsm_description">高雄</span>
                </div>
              </div>
            </router-link>
          </div>
          <div class="card_area">
            <router-link
              :to="{ name: 'cityDetail', params: { city: 'PingtungCounty' } }"
            >
              <div class="cardsm">
                <img
                  class="cardsm_img"
                  src="./../../public/cityImage/屏東縣.png"
                  alt=""
                />
                <div class="cardsm_text">
                  <li class="cardsm_icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </li>
                  <span class="cardsm_description">屏東</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <div class="card_area">
          <router-link
            :to="{ name: 'cityDetail', params: { city: 'YilanCounty' } }"
          >
            <div class="card">
              <img
                class="card_img"
                src="./../../public/cityImage/宜蘭縣.png"
                alt=""
              />
              <div class="card_text">
                <li class="card_icon"><i class="fas fa-map-marker-alt"></i></li>
                <span class="card_description">宜蘭</span>
              </div>
            </div>
          </router-link>
        </div>

        <div class="card_wrapper">
          <div class="card_area">
            <router-link
              :to="{ name: 'cityDetail', params: { city: 'HualienCounty' } }"
            >
              <div class="cardsm">
                <img
                  class="cardsm_img"
                  src="./../../public/cityImage/花蓮縣.png"
                  alt=""
                />
                <div class="cardsm_text">
                  <li class="cardsm_icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </li>
                  <span class="cardsm_description">花蓮</span>
                </div>
              </div>
            </router-link>
          </div>
          <div class="card_area">
            <router-link
              :to="{ name: 'cityDetail', params: { city: 'TaitungCounty' } }"
            >
              <div class="cardsm">
                <img
                  class="cardsm_img"
                  src="./../../public/cityImage/台東縣.png"
                  alt=""
                />
                <div class="cardsm_text">
                  <li class="cardsm_icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </li>
                  <span class="cardsm_description">台東</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <div class="card_area">
          <router-link
            :to="{ name: 'cityDetail', params: { city: 'KinmenCounty' } }"
          >
            <div class="card">
              <img
                class="card_img"
                src="./../../public/cityImage/金門縣.png"
                alt=""
              />
              <div class="card_text">
                <li class="card_icon"><i class="fas fa-map-marker-alt"></i></li>
                <span class="card_description">金門馬祖.澎湖</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";
export default {
  data() {
    return {
      city: "taipei",
    };
  },
  mounted() {
    new BetterScroll(".cards_wrapper", {
      mouseWheel: true, //开启鼠标滚轮
      disableMouse: false, //启用鼠标拖动
      disableTouch: true, //启用手指触摸
      scrollX: true, //X轴滚动启用
    });
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/All.scss";

.container {
  width: 100%;
}
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

.cards_wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: inline-flex;
}

.cards {
  display: flex;
}

.card_area {
  padding: 0.55rem;
  margin-right: 0.75rem;
  margin-top: 0.25rem;
  background-color: white;
  box-shadow: 4px 2px 4px rgba(13, 11, 12, 0.2);
}
.card {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  width: 140px;
  height: 170px;
  &_img {
    width: 100%;
    height: 100%;
  }
  &_text {
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    // 線與邊框
    top: 0.5rem;
    bottom: 0.5rem;
    left: 0.5rem;
    right: 0.5rem;
    transition: transform 0.4s ease-out;
  }
  &::before {
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    transform: scale(0, 1);
  }
  &::after {
    border-right: 1px solid white;
    border-left: 1px solid white;
    transform: scale(1, 0);
  }
  &:hover::before {
    transform: scale(1.05, 1);
  }
  &:hover::after {
    transform: scale(1, 1.05);
  }
}
.cardsm {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  width: 140px;
  height: 74px;
  &_img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &_text {
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    // 線與邊框
    top: 0.5rem;
    bottom: 0.5rem;
    left: 0.5rem;
    right: 0.5rem;
    transition: transform 0.4s ease-out;
  }
  &::before {
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    transform: scale(0, 1);
  }
  &::after {
    border-right: 1px solid white;
    border-left: 1px solid white;
    transform: scale(1, 0);
  }
  &:hover::before {
    transform: scale(1.05, 1);
  }
  &:hover::after {
    transform: scale(1, 1.05);
  }
}
</style>
