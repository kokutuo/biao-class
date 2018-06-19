new Vue({
    el: '#root',
    data: {
        current: null,
        memoList: [],
    },
    methods: {
        // 添加项
        add() {
            // this.current = {};
            // this.memoList.push(this.current);
            let isUpdate = !!this.current.id;
            let api = isUpdate ? 'update' : 'create';
            http
                .post('memo/${api}', this.current)
                .then((res) => {
                    console.log(res.data);

                    let newRow = res.data.data;
                    this.current = newRow;

                    if (!isUpdate) {
                        this.memoList.push(newRow);
                    }
                })
        },

        // 删除项
        remove(id, e) {
            e.stopPropagation();
            http
                .post('memo/delete', {
                    id: id
                })
                .then(res => {
                    this.syncFrom();
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
            http
                .post('memo/read', {
                    limit: 5,
                    where: {
                        or: [
                            ['id', '>', 5],
                        ],
                    },
                })
                .then(res => {
                    this.memoList = res.data.data
                })

            // this.memoList = JSON.parse(localStorage.getItem('memoList')) || [{
            //         title: 'title A',
            //         content: 'aaaa',
            //     },
            //     {
            //         title: 'title B',
            //         content: 'bbbb',
            //     },
            //     {
            //         title: 'title C',
            //         content: 'cccc',
            //     },
            // ];
        },

        initCurrent() {
            this.current = {};
        },
              
    },
    // watch: {
    //     memoList: {
    //         deep: true,
    //         handler: function (n) {
    //             this.syncTo(n);
    //         }
    //     }
    // },
    created() {
        this.syncFrom();
    }
})