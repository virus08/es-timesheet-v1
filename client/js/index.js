//Define user parametor
const UID =1 



//Define Route 

const home = { template: '<index></index>' }
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<test></test>' }
const routes = [
	{ path: '/', component: home },
	  { path: '/foo', component: Foo },
	  { path: '/bar', component: Bar }
	]


//Define API  
const API = "http://localhost:8080/api/";
//const ApiKey = "0ac4f03448354172bb7d1df6214068e9";

function API_Timesheets_Bv_UID (UID) {
  return API +'timesheets?filter[where][UID]=' + UID +'&filter[order]=Job_date%20DESC&filter[limit]=200'
}

//?filter[where][GroupName]=Documentation
function API_SOW(GroupName){
	return API +'SOWS?filter[where][GroupName]='+GroupName;
}

function API_Active_Project_By_UID(UID){
	return API +'projects?filter[where][UID]='+UID+'&filter[where][or][0][Status]=Progress&filter[where][or][1][Status]=Open';
}




const router = new VueRouter({
	  routes
	})

Vue.use(VueTables.ClientTable); 
Vue.use(VueResource)

Vue.http.headers.common['Content-Type'] = 'application/json'
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.http.headers.common['Accept'] = 'application/json, text/plain, */*'
Vue.http.headers.common['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin'

	const app = new Vue({
	  router
	}).$mount('#app')