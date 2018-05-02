const API = 'http://localhost:8080/api/timesheets';

let catApp = new Vue({
	el:'#catApp',
	data:{
		cats:[],
		cat:{
			id:'',
			Name_Surname:'',
			Job_Type:'',
			Job_SOW:'',
			Job_status:''
		}
	},
	created:function() {
		this.getCats();
	},
	methods:{
		getCats:function() {
			fetch(API)
			.then(res => res.json())
			.then(res => this.cats = res);	
		},
		storeCat:function() {
			let method;
			console.log('storeCat', this.cat);
			// Handle new vs old
			if(this.cat.id === '') {
				delete this.cat.id;
				method = 'POST';
			} else {
				method = 'PUT';
			}
			fetch(API, {
				headers:{
					'Content-Type':'application/json'
				},
				method:method,
				body:JSON.stringify(this.cat)
			})
			.then(res => res.json())
			.then(res => {
				this.getCats();
				this.reset();
			});
		},
		deleteCat:function(c) {
			fetch(API + c.id, {
				headers:{
					'Content-Type':'application/json'
				},
				method:'DELETE'
			})
			.then(res => res.json())
			.then(res => {
				this.getCats();
			});

			// call reset cuz the cat could be 'active'
			this.reset();
		},
		editCat:function(c) {
			/*
			This line was bad as it made a reference, and as you typed, it updated
			the list. A user may think they don't need to click save.
			this.cat = c;
			*/
			this.cat.id = c.id;
			this.cat.Name_Surname = c.Name_Surname;
			this.cat.Job_Type = c.Job_Type;
			this.cat.Job_SOW = c.Job_SOW;
			this.cat.Job_status = c.Job_status;
		},
		reset:function() {
			this.cat.id = '';
			this.cat.Name_Surname = '';
			this.cat.Job_Type = '';
			this.cat.Job_SOW = '';
			this.cat.Job_status = '';
		}
	}
});