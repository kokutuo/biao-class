- v-for: 循环迭代数组中的每一项，index 为可选项
    `<div v-for='(item, [index]) in list'>{{item.title}}</div>`
- v-on: 用于绑定事件，可以简写为@
    `<button @click='onClick'></button>`
- v-model: 用于数据的双向绑定
    `<div v-model='data'></div>`
- v-if: 用于控制当前标签的显示与隐藏
    `<button v-if="current">关闭</button>`
- props中的变量大小写: 当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名
- vue-awesome-swiper loop bug修复 父级上添加v-if
  ```vue
    <swiper v-if="hot.length>0" :options="swiperOption">
    <swiper-slide  v-for="it in hot" :key="it.id">
      <router-link :to="`/detail/${it.id}`" class="slider">
        <img class="round" :src="it.cover_url" :alt="it.title">
      </router-link>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
  ```
  管理
  职业
  做的事，你的想法要让领导知道