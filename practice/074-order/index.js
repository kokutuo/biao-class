const myMixin = {
    data: function () {
        return {
            error: [],
            current: {},
            list: [],
            showForm: false,
        };
    },
    methods: {
        create: function () {
            if (!this.validate()) {
                return;
            }

            let isUpdate = !!this.current.id;
            let action = isUpdate ? 'update' : 'create';
            console.log(this.current);

            http
                .post(`${this.model}/${action}`, this.current)
                .then(res => {
                    if (res.data.success) {
                        this.current = {};
                        if (!isUpdate) {
                            this.list.push(res.data.data);
                        }
                    }
                });
        },

        remove: function (id) {
            if (!confirm('确定要删除该项吗？')) {
                return;
            }
            http
                .post(`${this.model}/delete`, {
                    id
                })
                .then(res => {
                    if (res.data.success) {
                        util.removeElById(this.list, id);
                    }
                });
        },

        validate: function (row) {
            row = row || this.current;

            this.error = [];

            this.validateProps.forEach(prop => {
                let r = this['validate_' + prop]();

                if (r === true) {
                    return;
                }

                this.error.push(r);
            });

            return !this.error.length;
        },

        read: function () {
            http
                .post(`${this.model}/read?limit=5`)
                .then(res => {
                    if (res.data.success) {
                        this.list = res.data.data;
                    }
                });
        },
    },

    mounted: function () {
        this.read();
    }
};

const Home = Vue.component('home', {
    template: `
	<div>
        <h1>欢迎来到刘背背西点餐厅</h1>
        <div class='dish-list'>
            <div class='row dish' v-for='dish in dishList'>
                <div class='col-lg-4 thumbnail'>
                    <img :src="dish.cover_url || defaultCoverUrl" :alt="dish.name">
                </div>
                <div class='col-lg-5 detail'>
                    <div class="name">{{dish.name}}</div>
                    <div class='description'>{{dish.description}}</div>
                </div>
                <div class='col-lg-3 tool-set'>
                    <button>-</button>
                    <input type="number" v-model='dish.$count'>
                    <button>+</button>
                </div>
            </div>
        </div>
        <button @click='submitOrder'>提交订单</button>
	</div>
    `,
    data: function () {
        return {
            dishList: [],
            defaultCoverUrl: 'http://biaoyansu.com/img/biaoyansu_logo.svg',
            order: {},
            // order: {
            //     table_id: 'xxx',
            //     dish_info: [
            //         {dishId: 1, count: 2},
            //         {dishId: 2, count: 1},
            //     ],
            //     memo: '少放辣'
            // }
        };
    },
    methods: {
        readDish: function () {
            http
                .post('dish/read')
                .then(res => {
                    this.dishList = res.data.data;
                });
        },

        submitOrder: function () {
            this.prepareOrderInfo();

            this.order.status = 'created';
            console.log(this.order);
            
            this
                .mainOrderId()
                .then(id => {
                    console.log(id);

                    if (id) {
                        this.order.parent_id = id;
                    }

                    let param = Object.assign({}, this.order);
                    param.dish_info = JSON.stringify(param.dish_info);

                    http.post('order/create', param);
                });

            // http
            //     .post('order/first', {
            //         where: {
            //             and: {
            //                 table_id: this.order.table_id,
            //                 status: 'created'
            //             }
            //         }
            //     })
            //     .then(res => {
            //         if (res.data.data) {
            //             console.log(res);

            //             this.order.parentId = res.data.data.id;
            //         }
            //     });
            this.resetOrder();
        },

        mainOrderId: function () {
            return http.post('order/first', {
                where: {
                    and: {
                        table_id: this.order.table_id,
                        status: 'created',
                        parent_id: null
                    },
                },
            }).then(res => {
                if (!res.data.data) {
                    return false;
                }
                return res.data.data.id;
            });
        },

        resetOrder: function name() {
            this.order = {};
            this.dishList.forEach(dish => {
                dish.$count = 0;
            });
        },

        prepareOrderInfo: function () {
            let info = [];
            this.dishList.filter(dish => {
                let count = dish.$count
                if (!count) {
                    return;
                }

                info.push({
                    dishId: dish.id,
                    count: parseInt(count),
                });
            });

            this.order.dish_info = info;
        }
    },
    mounted() {
        this.readDish();
        this.order.table_id = this.$route.query.table_id;
    },
    // watch: {
    //     dishList: {
    //         deep: true,
    //         handler() {
    //             console.log(this.dishList);
    //         },
    //     },
    // }
});

const Admin = Vue.component('admin', {
    template: `
	<div>
		<div class="admin row">
			<div class="col-lg-3 nav">
				<router-link to="/admin/table">桌号管理</router-link>
				<router-link to="/admin/dish">菜品管理</router-link>
				<router-link to="/admin/order">订单管理</router-link>
			</div>
			<div class="col-lg-9 main">
				<router-view></router-view>
			</div>
		</div>
	</div>
	`,
});

const AdminDish = Vue.component('admin-dish', {
    template: `
	<div>
		<h2>菜品管理</h2>

		<div class='tool-set'>
			<button @click='showForm = !showForm'>
				<span v-if='showForm'>取消</span>创建菜品
			</button>
		</div>

		<form @submit.prevent='create' v-if='showForm'>
			<div v-if='error.length' class='error'>
				<div v-for='e in error'>{{e}}</div>
			</div>
			{{current.id}}
			<div class='input-wrap'>
				<label>菜名</label>
				<input type="text" v-model='current.name' autofocus>
			</div>
			<div class='input-wrap'>
				<label>价格（元）</label>
				<input type="text" v-model='current.price'>
			</div>
			<div class='input-wrap'>
				<label>简介</label>
				<textarea v-model='current.description'></textarea>
			</div>
			<div class='input-wrap'>
				<label>封面</label>
				<input type='url' v-model='current.cover_url'>
			</div>
			<button type='submit'>提交</button>
		</form>

		<table class="list" v-if='list.length'>
			<thead>
				<tr>
					<th>菜名</th>
					<th>价格（元）</th>
					<th>简介</th>
					<th>封面</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row) in list">
					<td>{{row.name}}</td>
					<td>{{row.price}}</td>
					<td>{{row.description || '-'}}</td>
					<td>
						<img v-if='row.cover_url' :src="row.cover_url" :alt="row.name">
						<span v-else class='empty-holder'>暂无封面</span>
					</td>
					<td>
						<button @click='current = row; showForm = true'>更新</button>
						<button @click='remove(row.id)'>删除</button>
					</td>
				</tr>
			</tbody>
    	</table>

	</div>
	`,
    data: function () {
        return {
            model: 'dish',
            validateProps: ['cover_url', 'description', 'name', 'price'],
        };
    },
    methods: {
        validate_name: function (val) {
            val = val || this.current.name;

            const MAX_LENGTH = 255;

            if (!val) {
                return '菜名为必填项';
            }

            if (val.length > MAX_LENGTH) {
                return `此项最大长度为${MAX_LENGTH}`;
            }

            return true;
        },

        validate_price: function (val) {
            val = val || this.current.price;

            if (val === '' || val < 0 || val > 1000000) {
                return '不合法的价格';
            }

            return true;
        },

        validate_description: function (val) {
            val = val || this.current.description;

            if (!val) {
                return true;
            }

            const MAX_LENGTH = 10000;
            if (val.length > MAX_LENGTH) {
                return `此项最大长度为${MAX_LENGTH}`;
            }

            return true;
        },

        validate_cover_url: function (val) {
            val = val || this.current.cover_url;

            let re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

            if (!val) {
                return true;
            }

            if (!re.test(val)) {
                return '不合法的地址';
            }

            return true;
        }
    },
    mixins: [myMixin]
});

const AdminTable = Vue.component('admin-table', {
    template: `
	<div>
		<h2>桌号管理</h2>

		<div class='tool-set'>
			<button @click='showForm = !showForm'>
				<span v-if='showForm'>取消</span>创建桌号
			</button>
		</div>

		<form @submit.prevent='create' v-if='showForm'>
		
			<div v-if='error.length' class='error'>
				<div v-for='e in error'>{{e}}</div>
			</div>

			<div class='input-wrap'>
				<label>桌号</label>
				<input type="text" v-model='current.name' autofocus>
			</div>
			<div class='input-wrap'>
				<label>座位数</label>
				<input type="number" v-model='current.capacity'>
			</div>
			<div class='input-wrap'>
				<button>提交</button>
			</div>
		</form>

		<table class="list" v-if='list.length'>
			<thead>
				<tr>
					<th>桌号</th>
					<th>座位号</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row) in list">
					<td>{{row.name}}</td>
					<td>{{row.capacity}}</td>
					<td>
						<button @click='current = row; showForm = true'>更新</button>
						<button @click='remove(row.id)'>删除</button>
					</td>
				</tr>
			</tbody>
    	</table>
	</div>
	`,
    data: function () {
        return {
            model: 'table',
            validateProps: ['name', 'capacity'],
        }
    },
    methods: {
        validate_name: function (val) {
            val = val || this.current.name;
            const MAX_LENGTH = 255;

            if (!val) {
                return '桌号为必填项';
            }

            if (val.length > MAX_LENGTH) {
                return `此项最大长度为${MAX_LENGTH}`
            }

            return true;
        },

        validate_capacity: function (val) {
            val = val || this.current.capacity;

            if (!val) {
                return '座位数为必填项';
            }

            if (val < 1 || val > 1000000) {
                return '不合法的座位数';
            }

            return true;
        }
    },
    mixins: [myMixin],
});

const pagination = Vue.component('pagination', {
    data: function () {
        return {
            currentPage: '',
            limit: 10,
            range: 5,
        }
    },

    methods: {
        changePage: function () {
            http
                .post(`model/read?page=${this.currentPage}`)
        }
    }
})

new Vue({
    el: '#root',
    router: new VueRouter({
        routes: [{
                path: '/',
                component: Home
            },
            {
                path: '/admin/',
                component: Admin,
                children: [{
                        path: 'dish',
                        component: AdminDish
                    },
                    {
                        path: 'table',
                        component: AdminTable
                    }
                ]
            },

        ]
    }),
});


// http
//     .post('MODEL/CREATE', {
//         name: 'order',
//         structure: [
//             {
//                 name: 'table_id',
//                 type: 'integer',
//                 nullable: false
//             },
//             {
//                 name: 'dish',
//                 type: 'text',
//                 nullable: false
//             }
//         ]
//     });

// http
// 	.post('MODEL/CREATE', {
// 		name: 'table',
// 		structure: [
// 			{
// 				name: 'name',
// 				type: 'string',
// 				nullable: false
// 			},
// 			{
// 				name: 'capacity',
// 				type: 'integer',
// 				nullable: false
// 			}
// 		]
// 	});

// http
// 	.post('MODEL/CREATE', {
// 		name: 'dish',
// 		structure: [
// 			{
// 				name: 'name',
// 				type: 'string',
// 				nullable: false
// 			},
// 			{
// 				name: 'price',
// 				type: 'float',
// 				nullable: false
// 			},
// 			{
// 				name: 'description',
// 				type: 'text',
// 				nullable: true
// 			},
// 			{
// 				name: 'cover_url',
// 				type: 'string',
// 				nullable: true
// 			}
// 		]
// 	});

// http.post('MODEL/CREATE_PROPERTY', {
//   model     : 'order',
//   property  : 'status',
//   structure : {
//     type     : 'string',
//     nullable : true,
//   },
// });

// http.post('MODEL/READ');