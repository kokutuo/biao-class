const Home = Vue.component('home', {
	template: `
	<div>
		<h1>欢迎来到刘背背饭馆</h1>
		<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi quaerat quas numquam? Consequatur, error reiciendis vitae sed quasi porro officia, omnis velit facere dignissimos facilis similique tenetur? Voluptatibus, pariatur iusto.</p>
	</div>
	`,
});

const Admin = Vue.component('admin', {
	template: `
	<div>
		<div class="admin row">
			<div class="col-lg-3 nav">
				<router-link to="/admin/table">桌号管理</router-link>
				<router-link to="/admin/dish">菜品管理</router-link>
			</div>
			<div class="col-lg-9 main">
				<router-view></router-view>
			</div>
		</div>
	</div>
	`,
});

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

const AdminDish = Vue.component('admin-dish', {
	template: `
	<div>
		<h2>菜品管理</h2>
		<form @submit.prevent='create'>
			<div class='input-wrap'>
				<label>菜名</label>
				<input type="text" v-model='current.name' autofocus>
			</div>
			<div class='input-wrap'>
				<label>价格</label>
				<input type="text" v-model='current.price'>
			</div>
			<div class='input-wrap'>
				<label>简介</label>
				<textarea v-model='current.description'></textarea>
			</div>
			<button type='submit'>提交</button>
		</form>

		<table class="list">
			<thead>
				<tr>
					<th>菜名</th>
					<th>价格（元）</th>
					<th>简介</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row) in list">
					<td>{{row.name}}</td>
					<td>{{row.price}}</td>
					<td>{{row.description}}</td>
					<td>
						<button @click='current = row'>更新</button>
						<button @click='remove(row.id)'>删除</button>
					</td>
				</tr>
			</tbody>
    	</table>

	</div>
	`,
	data: function () {
		return {
			current: {},
			list: []
		};
	},
	methods: {
		create: function () {
			let isUpdate = !!this.current.id;
			let action = isUpdate ? 'update' : 'create';
			http
				.post(`dish/${action}`, this.current)
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
				.post('dish/delete', {
					id
				})
				.then(res => {
					if (res.data.success) {
						util.removeElById(this.list, id);
					}
				});
		},
	},

	mounted: function () {
		http
			.post('dish/read')
			.then(res => {
				if (res.data.success) {
					this.list = res.data.data;
				}
			})
	}
});

const AdminTable = Vue.component('admin-table', {
	template: `
	<div>
		<h2>桌号管理</h2>
		<form @submit.prevent='create'>
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

		<table class="list">
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
						<button @click='current = row'>更新</button>
						<button @click='remove(row.id)'>删除</button>
					</td>
				</tr>
			</tbody>
    	</table>
	</div>
	`,
	data: function () {
		return {
			current: {},
			list: []
		}
	},
	methods: {
		create: function () {
			let isUpdate = !!this.current.id;
			let action = isUpdate ? 'update' : 'create';
			http
				.post(`table/${action}`, this.current)
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
				.post('table/delete', {
					id
				})
				.then(res => {
					if (res.data.success) {
						util.removeElById(this.list, id);
					}
				});
		},
	},
	mounted: function () {
		http
			.post('table/read')
			.then(res => {
				if (res.data.success) {
					this.list = res.data.data;
				}
			})
	}
});

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
})


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