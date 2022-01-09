// ./src/components/Spinner.vue
<template>
  <div class="spinner">
    <div class="bouncing-loader">
      <div class="icon triangle" style="--i: 1"></div>
      <div class="icon square" style="--i: 2"></div>
      <div class="icon circle" style="--i: 3"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./../assets/scss/All.scss";
.spinner {
  padding-top: 5rem;
  .bouncing-loader {
    @include flexCenter;
    -webkit-box-reflect: below -0.15px linear-gradient(transparent, rgba(100, 20, 0, 0.2));
    .icon {
      display: inline-block;
      animation: animate 1s ease-in-out infinite;
      animation-delay: calc(0.1s * var(--i));
    }
    .triangle {
      width: 0px;
      height: 0px;
      border-style: solid;
      border-width: 0px 12px 20px 12px;
      border-color: #f6f7f8 #f6f7f8 $pink #f6f7f8;
    }
    .square {
      width: 20px;
      height: 20px;
      background-color: $yellow;
      margin: 0 1rem;
    }
    .circle {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: $green;
    }
  }
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
</style>
