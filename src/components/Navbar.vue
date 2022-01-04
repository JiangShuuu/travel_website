<template>
  <div class="main">
    <div class="web">
      <div class="nav_icon">
        <label class="nav_toggle-label nav_icon" for="nav_toggle">
          <span class="hamburger"></span>
        </label>
        <input type="checkbox" class="nav_toggle" id="nav_toggle" />
        <router-link to="/">
          <img src="./../assets/icon/LOGO.png" alt="" />
        </router-link>
        <div class="icon">
          <li class="search"><i class="fas fa-search"></i></li>
          <li class="location"><i class="fas fa-map-marker-alt"></i></li>
        </div>
        <div class="nav_items">
          <div class="nav_items_item">
            <li class="trangle"><i class="fas fa-caret-up"></i></li>
            <router-link to="/" class="trangle_text">台灣景點</router-link>
          </div>
          <div class="nav_items_item">
            <li class="square"><i class="fas fa-square-full"></i></li>
            <router-link to="/hotelFood" class="square_text"
              >美食住宿</router-link
            >
          </div>
          <div class="nav_items_item circle">
            <li class="circle"><i class="fas fa-circle"></i></li>
            <router-link to="/favorite" class="circle_text"
              >最愛清單</router-link
            >
          </div>
        </div>
      </div>
      <!-- <template>
        <label class="nav_toggle-label nav_icon" for="nav_toggle">
          <span class="hamburger"></span>
        </label>
        <input type="checkbox" class="nav_toggle" id="nav_toggle" />
        <div class="mobile">
          <div class="nav_class">
            <ul class="nav_class_items">
              <li class="nav_class_item">景點活動</li>
              <li class="nav_class_item">美食住宿</li>
              <li class="nav_class_item">景點交通</li>
            </ul>
          </div>
        </div>
      </template> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./../assets/scss/All.scss";
.main {
  position: fixed;
  width: 100%;
  z-index: 9999;
}

.web {
  padding: 1.25rem;
  background-color: white;
  @include web {
    padding: 1rem 5rem;
  }
  .nav_icon {
    position: relative;
    @include flexCenter;
    @include pad {
      justify-content: space-between;
    }
    img {
      width: 90px;
      height: 52px;
      cursor: pointer;
    }
    .icon {
      @include flexCenter;
      @include pad {
        display: none;
      }
      position: absolute;
      right: 0.75rem;
      bottom: 0;
      .search {
        width: 30px;
        height: 30px;
        margin-right: 0.25rem;
        @include flexCenter;
        background: $pink;
        box-shadow: 0px 2px 4px rgba(13, 11, 12, 0.2);
        border-radius: 4px;
        cursor: pointer;
        .fa-search {
          color: white;
          font-size: 1.1rem;
        }
      }
      .location {
        width: 30px;
        height: 30px;
        @include flexCenter;
        background: $yellow;
        box-shadow: 0px 2px 4px rgba(13, 11, 12, 0.2);
        border-radius: 6px;
        cursor: pointer;
        .fa-map-marker-alt {
          color: white;
          font-size: 1.1rem;
        }
      }
    }
  }
  .nav_class {
    @include pad {
      display: none;
    }
    &_items {
      @include flexCenter;
      justify-content: space-around;
      margin: 0.75rem;
      padding: 0.75rem;
      box-shadow: 0px 2px 4px rgba(13, 11, 12, 0.2);
      border-radius: 6px;
      .nav_class_item {
        color: $mid-gray;
        font-weight: normal;
        cursor: pointer;
        &:hover {
          color: $pink;
        }
      }
    }
  }

  .nav_items {
    @include flexCenter;
    &_item {
      @include flexCenter;
      margin: 0 0.5rem;
      width: 7rem;
      align-items: end;
      justify-content: space-around;
      cursor: pointer;

      li {
        @include flexCenter;
        width: 34px;
        height: 34px;
        border-radius: 50px;
        color: white;
        padding-right: 0 1rem;
      }
      .square {
        background: $yellow;
        font-size: 10px;
        &_text {
          color: $yellow;
          @include mobile {
            font-size: 25px;
          }
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .circle {
        background: $green;
        font-size: 12px;
        &_text {
          color: $green;
          @include mobile {
            font-size: 25px;
          }
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .trangle {
        background: $pink;
        font-size: 25px;
        &_text {
          color: $pink;
          @include mobile {
            font-size: 25px;
          }
          &:hover {
            text-decoration: underline;
          }
        }
      }
      span {
        font-size: 16px;
      }
    }
  }
  .nav_toggle {
    visibility: hidden;
    display: none;
  }
  .nav_toggle-label {
    display: none;
  }
  @include mobile {
    .nav_icon {
      @include flexCenter;
      flex-direction: column;
      .icon {
        display: none;
      }
      .nav_items {
        all: unset;
        width: 100%;
        top: 5.5rem;
        z-index: 999;
        background: white;
        display: none;
        @include flexCenter;
        flex-direction: column;
        position: fixed;

        &_item {
          display: none;
          text-align: center;
          margin: 1rem;
          span {
            font-size: 1.5em;
          }
        }
        li {
          display: none;
        }
      }

      .nav_toggle-label {
        position: absolute;
        top: 45%;
        right: 5%;
        display: flex;
        align-items: center;
      }
      .nav_toggle:checked ~ .nav_items .nav_items_item {
        display: block;
      }
      .nav_toggle {
        visibility: hidden;
        display: none;
      }

      .hamburger {
        position: relative;
      }
      .hamburger,
      .hamburger::before,
      .hamburger::after {
        width: 40px;
        height: 4px;
        background: $pink;
      }
      .hamburger::before,
      .hamburger::after {
        content: "";
        position: absolute;
        left: 0;
      }
      .hamburger:before {
        top: 10px;
      }
      .hamburger:after {
        bottom: 10px;
      }
    }
  }
}
</style>
