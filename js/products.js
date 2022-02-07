import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';


const site ='https://vue3-course-api.hexschool.io/v2' ;
const api_path = 'oflethe';

let productModal = {};


const app = createApp({


data(){
return{

   products : [],
   
   //點選查看細節時將產品暫存到此
   tempProducts : {
       imagesUrl:[],
   },

   isNew: false,
}

},

methods: {

//登入驗證
checkLogin() {
        //自定義Token取出來到token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        //每次發送請求都自動把token加到這裡面
        //defaults如果刪掉的話每次都需要重新帶，不會自動全部發送
        axios.defaults.headers.common['Authorization'] = token;
        console.log(token);
    
        const url =`${site}/api/user/check`;
        //發送api
        axios.post(url)
        //正確
        .then ( () => {
            this.getProducts();
        });
    

},

//左方列表取出
getProducts() {

const url = `${site}/api/${api_path}/admin/products/all`;
axios.get(url)
    .then( res=> {
        this.Products = res.data.product;
        
    });
   
},

openModal(status, product){
console.log(status, product );
if (status === 'isNew'){

this.tempProducts = {
    imagesUrl: [],
}
productModal.show();
this.isNew =true;
}else if (status === 'edit'){
    this.tempProducts = { ...product};
    productModal.show();
    this.isNew = false;

}else if (status === 'delete'){
    delProductModal.show();
    this.tempProducts = { ...product};

}



},

updateProduct(){
   
let url = `${site}/api/${api_path}/admin/product`;
let method = 'post';

if (!this.isNew){//這裡是false
    url = `${site}/api/${api_path}/admin/product/${this.tempProducts.id}`;
    method = 'put';

}

axios[method](url, { data: this.tempProducts})
    .then( res=> {
      
        console.log(res);

        this.getProducts();
        productModal.hide();
    });

},

delProduct (){
    let url = `${site}/api/${api_path}/admin/product/${this.tempProducts.id}`;
    
    axios.delete(url)
        .then( res=> {
          
            console.log(res);
            this.getProducts();
            delproductModal.hide();
        });
    


}

},

mounted() {
this.checkLogin();
  
productModal = new bootstrap.Modal(document.getElementById('productModal') );

delproductModal = new bootstrap.Modal(document.getElementById('delproductModal') );


}


});

app.mount('#app');