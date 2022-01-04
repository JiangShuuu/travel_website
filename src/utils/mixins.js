import img from "./../assets/noImage1.jpg";

export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || img;
    },
  },
};
