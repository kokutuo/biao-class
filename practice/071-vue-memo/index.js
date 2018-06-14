new Vue({
    el: '#root',
    data: {
        current: null,
        memoList: [],
    },
    methods: {
        // 添加项
        add() {
            this.current = {};
            this.memoList.push(this.current);
        },
        // 删除项
        remove() {
            let row = this.current;
            let index = this.find(this.memoList, row);            
            this.memoList.splice(index, 1);
        },
        /**
         * 找到数组中某一项的索引
         * @param {Array} arr 目标数组
         * @param {object} el 目标元素
         * @return {number} 目标元素的索引
         */
        find(arr, el) {
            return arr.findIndex(function (item) {
                return el == item;
            })
        },
        /**
         * 存储数据
         * @param {Array} memoList 需要存储的数据
         */
        syncTo(memoList) {
            localStorage.setItem('memoList', JSON.stringify(memoList));
        },
        // 获取数据
        syncFrom() {
            this.memoList = JSON.parse(localStorage.getItem('memoList')) || [{
                    title: 'title A',
                    content: 'aaaa',
                },
                {
                    title: 'title B',
                    content: 'bbbb',
                },
                {
                    title: 'title C',
                    content: 'cccc',
                },
            ];
        }
    },
    watch: {
        memoList: {
            deep: true,
            handler: function (n) {
                this.syncTo(n);
            }
        }
    },
    created() {
        this.syncFrom();
    }
})