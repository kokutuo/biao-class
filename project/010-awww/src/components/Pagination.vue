<template>
    <div v-if="last_page" class="pagination">
        <span class="btn-group">
            <button :class="{disabled: is_first_page, btn: true}"
                    :disabled="is_first_page"
                    @click="change(1)">首页</button>
            <button :disabled="is_first_page"
                    :class="{disabled: is_first_page, btn: true}"
                    @click="prev">上一页</button>
        </span>
        &nbsp;
        <span class="btn-group">
            <button :class="{active: page == current_page}"
                    @click="change(page)"
                    v-for="page in last_page"
                    v-if="Math.abs(page - current_page) <= half_btn_limit"
                    :key="page"
                    class="btn">{{page}}
            </button>
        </span>
        &nbsp;
        <span class="btn-group">
            <button :class="{disabled: is_last_page, btn: true}"
                    :disabled="is_last_page"
                    @click="next">下一页
            </button>

            <button :class="{disabled: is_last_page, btn: true}"
                    :disabled="is_last_page"
                    @click="change(last_page)">尾页
            </button>
        </span>
    </div>
</template>

<script>
export default {
  props: {
    btnLimit: {
      default: 0
    },
    pageLimit: {
      default: 0
    },
    totalCount: {
      default: 0
    },
    currentPage: {
      default: 1
    },
    onPageChange: {}
  },

  data() {
    return {
      current_page: 1
    };
  },

  mounted() {
    this.current_page = this.currentPage;
  },

  methods: {
    change(page) {
      if (this.onPageChange) {
        this.onPageChange(page);
      }

      this.current_page = page;
    },

    prev() {
      if (this.is_first_page) {
        return;
      }

      this.change(--this.current_page);
    },

    next() {
      if (this.is_last_page) {
        return;
      }

      this.change(++this.current_page);
    }
  },

  computed: {
    last_page() {
      return Math.ceil(this.totalCount / this.pageLimit);
    },

    half_btn_limit() {
      return Math.floor(this.btnLimit / 2);
    },

    is_first_page() {
      return this.current_page == 1;
    },

    is_last_page() {
      return this.current_page == this.last_page;
    }
  },

  watch: {
    currentPage(n) {
      this.current_page = n;
    }
  }
};
</script>

<style>
.pagination {
  text-align: center;
  margin-top: 20px;
}

.disabled {
  background: rgba(0, 0, 0, 0.5);
  cursor: default;
}
</style>
