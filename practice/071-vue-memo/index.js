new Vue({
    el: '#root',
    data: {
        current: null,
        memoList: [{
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
        ],
    },
    methods: {
        add() {
            this.current = {};
            this.memoList.push(this.current);
        },
        syncTo(memoList) {
            localStorage.setItem('memoList', JSON.stringify(memoList));
        },
        syncFrom() {
            this.memoList = JSON.parse(localStorage.getItem('memoList'));
        },
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
});