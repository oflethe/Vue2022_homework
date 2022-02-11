import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';


const site ='https://vue3-course-api.hexschool.io/v2' ;
const api_path = 'oflethe';

let productModal = {};
let delproductModal={};


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
        this.products = res.data.products;
        
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
    this.tempProducts = { ...product };

     //問題點：有點不太確定是否是因為在html那邊撰寫的區塊因為js報錯，在物件屬性後方加上了?讓物件轉為undefined的狀況導致的 ，目前還不太了解為什麼沒有定義到該屬性，導致一開始跳出編輯視窗會有空白報錯，接著是沒有定義讓物件變成undefined狀態導致沒有辦法在編輯狀態新增圖片
     
    /*有跳出UNDEFINEDE錯誤，原因是因為沒有定義imagesUrl的屬性，導致系統讀取的時候發現沒有該屬性，因此跳出undefined錯誤，並且導致modal編輯產品視窗內的品項無法新增圖片，助教建議加上此行。
    此行為三元運算子，是［條件?(判斷) 值1:值2，若判斷為ture則傳回值1，否則回傳值2］
    理解的意思為 edit區域內的暫存區圖片如果確定為有值(ture)，則會回傳該屬性的原本值，否則會回傳定義他為一個陣列*/
   
    this.tempProducts.imagesUrl = this.tempProducts.imagesUrl ? this.tempProducts.imagesUrl : []
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

//修改編輯
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