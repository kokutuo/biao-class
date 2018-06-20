let vm = new Vue({
    el: '#app',
    data: {
        msg: 'Hello',
        firstName: 'li',
        lastName: 'shuandan',
    },
    methods: {
        reverseMessage: function () {
            // this指向 'vm' 实例
            return this.msg.split('').reverse().join('');
        },
    },
    computed: {
        // 计算属性的 getter
        reverseMessage: function () {
            // this指向 'vm' 实例
            return this.msg.split('').reverse().join('');
        },
        now: function () {
            return Date.now();
        },
        fullName: function () {
            return this.firstName + ' ' + this.lastName;
        }
    },
    // watch: {
    //     firstName: function (val) {
    //         this.fullName = val + ' ' + this.lastName;
    //     },
    //     lastName: function (val) {
    //         this.fullName = this.firstName + ' ' + val;
    //     }
    // }
})