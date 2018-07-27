- v-for: 循环迭代数组中的每一项，index 为可选项
    `<div v-for='(item, [index]) in list'>{{item.title}}</div>`
- v-on: 用于绑定事件，可以简写为@
    `<button @click='onClick'></button>`
- v-model: 用于数据的双向绑定
    `<div v-model='data'></div>`
- v-if: 用于控制当前标签的显示与隐藏
    `<button v-if="current">关闭</button>`
- props中的变量必须使用驼峰命名