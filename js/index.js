import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';


//
createApp({

    //登入資料
    data() {
     return {
      user: {
          username:'',
          password:'',
      },

     }

    },

    methods: {
        login() {
           
            const url = 'https://vue3-course-api.hexschool.io/v2/admin/signin'; 
            
            //發送api
            axios.post(api, this,user)
            
            //成功結果
            .then( (response) => {
                const {token, expired} = response.data;
                document.cookie = `hexToken= ${ token }; expires= ${ new Date(expired)}; path=/`;

                //跳到產品頁
                window.location = 'products.html';})
                
             //失敗結果
            .catch((error) => {
                    alert(error.data.message);
                });

                },
            },

}).monut('#app');


