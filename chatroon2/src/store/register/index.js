import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 const state={   //要设置的全局访问的state对象
     showFooter: true,
     changableNum:0
     //要设置的初始属性值
   };

const actions = {
  submitRegister:({ commit }, payload) => {
      const {name = '', tel = '', sex = 0} = payload;
      const requestBody = {
        name,
        tel,
        sex,
      }
     return fetch("http://192.168.199.239:3000/api/register", 
        {
              method: 'POST', // or 'PUT'
          
              body: `name=${name}&tel=${tel}&sex=${sex}`, //'{"name":"hehe","age":10}'
              headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
          })
        })
   },
}


const mutations = {
};

const register =  {
       state,
       mutations,
       actions,

};

export default register;
