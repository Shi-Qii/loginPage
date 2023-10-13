let isInitialized = false;
//共用參數
let userCallbacks = {
    onLoginSuccess: null,
    onLoginFailure: null,
    onGoogleLogin: null,
    onFBLogin: null
};

//初始化按鈕
let openModalBtnTemplate = `
<button  id="open-modal-btn">Open Login</button>

<div id="dropdown" class="dropdown login ">
    <button id="login-after">這邊會是email帳號</button>
    <div class="dropdown-padding">
        <div class="dropdown-content">
            <ul>
                <li onclick="userInfo()">個人資訊</li>
                <li onclick="logout()">登出</li>
            </ul>
        </div>
    </div>
</div>

<div id="login-modal" class="modal">

  <div class="modal-content">
    <span class="close"><i class="icon-close"></i></span>

    <div class="login-container">
    <form id="login-form">
        <span id="inputErr" class="warning">帳號或密碼錯誤</span>
        <input type="text" id="username" value="aaa@gmail.com" placeholder="Username"   />
        <div>
            <input type="password" id="password" value="fdaslkfjl3r4jlkjdfsl$@%435f" placeholder="Password"   />
            <i onclick="togglePasswordVisibility()" class="icon-eye-slash"></i>
        </div><!--        <div>-->
<!--            <input type="text" placeholder="CAPTCHA"   />-->
<!--            <div id="captcha">-->
<!--                <img src="img/captcha.png">-->
<!--                <i class="icon-refresh"></i>-->
<!--                <i class="icon-volume"></i>-->
<!--            </div>-->
<!--        </div>-->
        <div>
            <button id="login-btn">Login</button>
            <span><a href="javascript:void(0)">忘記密碼</a></span>
        </div>
    </form>
    <div class="method">
        <button id="login-btn-beanfun"><i class="icon-beanfun"></i></button>
        <button id="login-btn-google"><i class="icon-google"></i></button>
        <button id="login-btn-line"><i class="icon-line"></i></button>
        <button id="login-btn-apple"><i class="icon-apple"></i></button>
        <button id="login-btn-discord"><i class="icon-discord"></i></button>
 
    </div>
    </div>
  </div>
</div>
`

//對應tag 創建顯示按鈕
class LoginModule extends HTMLElement {
    connectedCallback() {
        this.innerHTML = openModalBtnTemplate;
    }
}
customElements.define('login-module', LoginModule);

const init = (params) => {
    if (!params) {
        console.error('Initialization parameters are required.');
        return;
    }
// 如果params中有useGoogleLogin且其值為true，則顯示按鈕，否則隱藏按鈕
    if (params.useLogin) {
        // let obj;
        // <!--  1.GET: oauth2/thirdParty/getLoginModuleInfo-->
        // axios.post('https://dev-api.gashpoint.io/consumer/api/oauth//sdk/loginSupport'
        //     , {
        //         "clientID": "admin001",
        //         "clientSecret": "fdaslkfjl3r4jlkjdfsl$@%435f",
        //     }
        // ).then(res => {
        //         // 通常 res 會是多項資料，取出需要的部份
        //         obj = res.data
        //     })
        //     // err.response 是固定用法
        //     .catch(err => {
        //         console.log(err.response);
        //     })
        // console.log('obj:', obj)

        //顯示彈窗
        useLoginModalTemplate()


        showLoginBtnType({
            'google': params.useGoogleLogin,
            'BF': params.useBFunLogin,
            'Line': params.useLineLogin,
            'Apple': params.useAppleLogin,
            'DC': params.useDCLogin,
            'FB': params.useFBLogin,
        })
    }
    // 初始化參數設定
    // 先判斷所需的參數
    // params:{ } 待討論
    isInitialized = true;
    if (isInitialized) {

    }
    closeElement('login-after');
    closeElement('inputErr');
}

const useLoginModalTemplate = () => {
    // 獲取模態框元素
    const modal = document.getElementById('login-modal');
    // 獲取打開模態框的按鈕元素
    const btn = document.getElementById("open-modal-btn");
    // 獲取模態框的關閉按鈕元素
    const span = document.getElementsByClassName("close")[0];

    // 當用戶點擊按鈕時，打開模態框
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // 當用戶點擊 x (span) 時，關閉模態框
    span.onclick = function () {
        modal.style.display = "none";
    }

    // 當用戶點擊任何地方以外的模態框時，也關閉它
    // window.onclick = function(event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //     }
    // }

}
const closeLoginModal = () => {
    closeElement('login-modal');
}
document.addEventListener('DOMContentLoaded',
    function () {
        document.getElementById('login-form').addEventListener
        ('submit', async function (e) {
            //取消表單預設事件
            e.preventDefault();
            //如果套件沒初始化其他方法不能使用
            if (!isInitialized) {
                console.error('The login module has not been initialized.');
                return;
            }
            let res = await loginSubmit();
            // 登入功能
            // 透過email登入
            let loginSuccessful = true;  // 假定為登入成功

            if (loginSuccessful) {
                closeLoginModal();
                openElement('login-after')
                closeElement('open-modal-btn')
                if (userCallbacks.onLoginSuccess) {
                    //登入成功透過設定是否跳轉到個人頁
                    //if(goToPersonalPage)
                    userCallbacks.onLoginSuccess();
                    //透過傳入跳轉個人頁url
                }
            } else {
                if (userCallbacks.onLoginFailure) {
                    userCallbacks.onLoginFailure();
                    //跳出登入失敗畫面或提示之類

                }
            }
        });
    });


const openElement = () => {
    document.getElementById('login-after').style.display = 'block';
}
const closeElement = (id) => {
    document.getElementById(id).style.display = 'none';
}