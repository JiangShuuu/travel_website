<template>
  <div class="checkout">
    <div class="container">
      <div class="cards">
        <div class="cancel" @click.stop.prevent="closeModal()">
          <div class="cancel_btn">
            <i class="fas fa-times"></i>
          </div>
        </div>
        <div class="card">
          <div class="card_img">
            <img :src="detail.Picture.PictureUrl1 | emptyImage" alt="" />
          </div>
          <div class="card_btn">
            <div class="prev">
              <i class="fas fa-caret-left"></i>
            </div>
            <div class="next active">
              <i class="fas fa-caret-right"></i>
            </div>
          </div>
          <div class="card_name">
            <span>{{
              detail.ScenicSpotName
                ? detail.ScenicSpotName
                : detail.ActivityName
            }}</span>
          </div>
          <div class="card_info">
            <span>{{
              detail.DescriptionDetail
                ? detail.DescriptionDetail
                : detail.Description
            }}</span>
          </div>
          <div class="card_icons">
            <div class="card_icon">
              <li><i class="fas fa-ticket-alt"></i></li>
              <span>免費</span>
            </div>
            <div class="card_icon">
              <li>
                <i class="far fa-clock"></i>
              </li>
              <span>{{ detail.OpenTime ? detail.OpenTime : "詳見官網" }}</span>
            </div>
            <div class="card_icon">
              <li>
                <i class="fas fa-phone-alt"></i>
              </li>
              <span>{{ detail.Phone ? detail.Phone : "無" }}</span>
              <!-- <a :href="detail.WebsiteUrl">{{ detail.WebsiteUrl }}</a> -->
            </div>
            <div class="card_icon">
              <li>
                <i class="fas fa-map-marker-alt"></i>
              </li>
              <span>{{ detail.Address }}</span>
            </div>
            <div class="card_icon">
              <li>
                <i class="fab fa-chrome"></i>
              </li>
              <a class="iconWeb" :href="detail.WebsiteUrl">{{
                detail.WebsiteUrl ? detail.WebsiteUrl : "無"
              }}</a>
            </div>
            <div class="card_icon">
              <li>
                <i class="fas fa-parking"></i>
              </li>
              <span>{{ detail.ParkingInfo ? detail.ParkingInfo : "無" }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";
export default {
  name: "checkOut",
  mixins: [emptyImageFilter],
  props: {
    initialDetail: {
      type: [Array, Object],
      required: true,
    },
  },
  data() {
    return {
      detail: this.initialDetail,
    };
  },

  methods: {
    closeModal() {
      this.$emit("close-detail");
      this.detail = [];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/All.scss";

.checkout {
  width: 100%;
  @include flexCenter;
  position: sticky;
  background-color: rgba(0, 0, 0, 0.5);
  top: 5rem;
  z-index: 9999;
  .container {
    @include flexCenter;
    width: 80%;
    flex-direction: column;
    @include pad {
      width: 40%;
    }
    @include web {
      width: 40%;
    }
    .cancel {
      position: absolute;
      top: 0;
      right: -2.5rem;
      // @include flexCenter;
      // justify-content: flex-end;
      // margin-top: 1rem;
      &_btn {
        width: 32px;
        height: 32px;
        @include flexCenter;
        border-radius: 7px;
        background: $pink;
        color: white;
        font-size: 24px;
      }
      cursor: pointer;
    }
    .cards {
      box-shadow: 4px 4px 10px 4px rgba(13, 11, 12, 0.2);
      background: white;
      @include flexCenter;
      margin: 0.5rem;
      position: relative;
      .card {
        border: 1px solid;
        width: 90%;
        margin: 0.75rem;
        &_img {
          text-align: center;
          margin-top: 1rem;
          img {
            width: 80%;
            height: 80%;
            object-fit: cover;
            // aspect-ratio: 1 / 0.7;
          }
        }
        &_btn {
          @include flexCenter;
          justify-content: flex-end;
          margin: 0.75rem 0;
          .next {
            width: 30px;
            height: 30px;
            border-radius: 5px;
            box-shadow: 0px 2px 4px rgba(13, 11, 12, 0.2);
            @include flexCenter;
            margin-left: 0.75rem;
            &:active {
              background: black;
              color: white;
            }
            cursor: pointer;
          }
          .prev {
            width: 30px;
            height: 30px;
            border-radius: 5px;
            box-shadow: 0px 2px 4px rgba(13, 11, 12, 0.2);
            @include flexCenter;
            &:active {
              background: black;
              color: white;
            }
            cursor: pointer;
          }
        }
        &_name {
          font-size: 18px;
          font-weight: 600;
          padding: 0.75rem 0;
        }
        &_info {
          font-size: 14px;
          padding-bottom: 0.75rem;
        }
        &_icons {
          @include pad {
            display: grid;
            grid-template-columns: repeat(2, minmax(50%, 1fr));
          }
        }
        &_icon {
          @include flexCenter;
          justify-content: flex-start;

          padding-bottom: 0.5rem;
          li {
            color: $pink;
            @include flexCenter;
          }
          span {
            margin-left: 0.5rem;
            font-size: 14px;
            color: black;
          }
          .iconWeb {
            width: 80%;

            margin-left: 0.5rem;
            font-size: 14px;
          }
        }
      }
    }
  }
  // .modal {
  //   z-index: 999;
  //   border: white solid 3px;
  //   width: 30%;
  //   background-color: #2a2a2a;
  //   margin: auto;
  //   color: white;
  //   border-radius: 20px;
  //   padding: 10px;
  //   .cancel {
  //     cursor: pointer;
  //   }
  //   .checkOutInfo {
  //     margin: 10px 0;
  //   }
  // }
}
</style>
