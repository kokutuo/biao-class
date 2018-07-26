<script>
import api from "../lib/api";

import "../css/admin.css";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import AdminNav from "../components/AdminNav";
import Pagination from "../components/Pagination";
import Dropdown from "../components/Dropdown";

export default {
  components: {
    Nav,
    Footer,
    AdminNav,
    Pagination,
    Dropdown
  },

  data() {
    return {
      // 重要的模型状态和配置
      model: "", // 当前模型，不同管理页面对应着不同模型，如：'user', 'vehicle'

      // 搜索相关
      keyword: "", // 搜索关键词
      searchable: [], // 可搜索的所有属性

      // 界面相关
      edit_pattern: false, // 是否在编辑模式

      // 数据相关
      current: {}, // 正在编辑的数据
      list: [], // 表格中当前页的数据

      // 翻页相关
      total: 0, // 总共有多少条数据
      last_page: 0, // 最后一页，一开始不知道所以是零
      current_page: 1, // 当前页码
      page_limit: 15, // 每页显示几条
      btn_limit: 5 // 显示的按钮数
    };
  },

  methods: {
    /**
     * 翻页时做什么
     * @param {number} 页码
     */
    on_page_change(page) {
      this.read(page);
    },

    /**
     * 创建或更新数据
     * create or update
     *
     * 具体创建还是更新决定于是否有id
     */
    cou() {
      let action = this.current.id ? "update" : "create";
      api(`${this.model}/${action}`, this.current).then(r => {
        if (r.success) {
          this.read();
          this.current = {};
          // this.edit_pattern = false;
        }
      });
    },

    /**
     * 通过id删除一条
     * @param {number} id
     */
    remove(id) {
      if (!confirm("确认删除？")) {
        return;
      }
      api(`${this.model}/delete`, { id: id }).then(r => {
        this.read();
      });
    },

    /**
     * 获取某一页的数据并将其覆盖至this.list
     * @param {number} 页码
     */
    read(page = 1) {
      if (page == this.current_page && page != 1) {
        return;
      }

      api(`${this.model}/read`, {
        page: page,
        limit: this.page_limit,
        with: this.with
      }).then(r => {
        this.list = r.data;
        this.current_page = r.current_page;
        this.last_page = r.last_page;
        this.total = r.total;
      });
    },

    /**
     * 搜索
     */
    search() {
      let param = {
        or: {}
      };

      this.searchable.forEach(prop => {
        param.or[prop] = this.keyword;
      });

      api(`${this.model}/search`, param).then(r => {
        this.list = r.data;
        this.keyword = "";
        console.log("this.list", this.list);
      });
    },

    /**
     * 离开编辑模式并清空表单数据
     */
    cancle() {
      this.edit_pattern = false;
      this.current = {};
    },

    set_current(row) {
      this.current = row;
      this.edit_pattern = true;

      if (this.after_set_current) {
        this.after_set_current();
      }
    },

    is_update() {
      return !!this.current.id;
    }
  },

  mounted() {
    if (!this.model) {
      throw new Error("请在data中配置当前model");
    }

    // 拿到管理页列表初始数据, 相当于点击第一页
    this.read();
  }
};
</script>   