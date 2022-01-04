<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" v-if="currentPage > 1">
        <a
          @click.stop.prevent="prePage(1)"
          class="page-link"
          href="#"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        :class="['page-item', { active: currentPage === page }]"
        v-for="page in totalPage"
        :key="page"
      >
        <a @click.stop.prevent="changePage(page)" class="page-link" href="#">{{
          page
        }}</a>
      </li>
      <li
        class="page-item"
        v-if="currentPage >= 1 && currentPage < totalPage.length"
      >
        <a
          @click.stop.prevent="nextPage(1)"
          class="page-link"
          href="#"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "ResPagination",
  props: {
    totalPage: {
      type: Array,
      required: true,
    },
    initialCurrentPage: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentPage: this.initialCurrentPage,
    };
  },
  watch: {
    initialCurrentPage: function () {
      this.currentPage = this.initialCurrentPage;
    },
  },

  methods: {
    changePage(page) {
      this.currentPage = page;
      this.$emit("HotelChange-page", {
        currentPage: page,
      });
    },
    prePage(reducePage) {
      this.currentPage -= reducePage;
      this.$emit("HotelPre-page", {
        currentPage: reducePage,
      });
    },
    nextPage(addPage) {
      console.log("add");
      this.currentPage += addPage;
      this.$emit("HotelNext-page", {
        currentPage: addPage,
      });
    },
  },
};
</script>
