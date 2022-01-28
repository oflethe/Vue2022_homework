import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';




createApp({
    data() {
      return {
        apiUrl: "https://vue3-course-api.hexschool.io/v2",// 加入api站點
        apiPath: "oflethe",// 加入個人 API Path
        temp: {},
        products: [],
      };
    },


    methods: {
      //登入驗證區塊
      logInCheck() {
        const url = `${this.apiUrl}/api/user/check`; //指向api站點進行user確認是否登入

        //確認登入成功
        axios.post(url)
          .then((response) => {
            //若驗證登入成功有確定使用者登入，接著執行getData()，讓產品列表出現
            this.getData();
          })

          //登入錯誤結果

          .catch((error) => {
            // console.dir(error);//若有錯誤，可以查看錯誤資訊
  
            alert(error.data.message);
            //如果使用者登入失敗，就跳回login.html登入頁
            window.location = "login.html";
            // 一個大跳躍回到登入頁面
          })
          .then(() => {
            // 為什麼這邊需要多一個.then呀QQ?內容沒有寫的話應該是可以不用留著直接刪除?
          });
      },
  
      //抓產品列表
      getData() {
          //先定義產品站點連結取得產品列表
        const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;

//成功抓到產品後臺列表
        axios.get(url)

//接著得到回應之後就可以讓產品的資料被抓到products裡面
          .then((response) => {
           
            this.products = response.data.products;
            // console.log(response);//輸出結果看有沒有成功
          })

          //產品列表抓取失敗，會把失敗結果用訊息反饋?
          //可以加一行console.dir(error);確認
          .catch((error) => {
            alert(error.data.message);
           
          })
          .then(() => {
           // 為什麼這邊需要多一個.then呀QQ?沒有寫的話應該是可以不用?
          });
      },
  //是否啟用這個產品
      openProduct(item) {
        this.temp = item;//加入的item先存放到temp資料夾?
      },
    },
    mounted() {

//抓取登入驗證的cookie資訊
        //取得 Token的登入驗證資訊（只需要設定一次）
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,"$1"
      );
      //token會從headers裡面抓取，並且只要一個區塊加一次就足夠
      axios.defaults.headers.common["Authorization"] = token;
  
      this.logInCheck();
    },
  }).mount("#app");
  
