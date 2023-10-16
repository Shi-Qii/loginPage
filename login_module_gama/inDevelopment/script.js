let isInitialized = false;
let userCallbacks = {
    onLoginSuccess: null,
    onLoginFailure: null,
    onGoogleLogin: null,
    onFBLogin: null
};

//初始化按鈕
let openModalBtnTemplate = `
<div class="dropdown login">
    <button id="openModalBtn">Open Login</button>
    <div class="dropdown-padding">
        <div class="dropdown-content">
            <ul>
                <li>個人資訊</li>
                <li>登出</li>
            </ul>
        </div>
    </div>
</div>

<div id="loginModal" class="modal">

  <div class="modal-content">
    <span class="close"><i class="icon-close"></i></span>

    <div class="login-container">
    <form>
        <span class="warning">帳號或密碼錯誤</span>
        <div>
            <input type="text" id="username" placeholder="Username" required />
        </div>
        <div>
            <input type="password" id="password" placeholder="Password" required />
            <i class="icon-eye-slash"></i>
        </div>
        <div>
            <input type="text" placeholder="CAPTCHA" required />
            <div id="captcha">
                <img src="img/captcha.png">
                <i class="icon-refresh"></i>
                <i class="icon-volume"></i>
            </div>
        </div>
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

        <!-- <button id="fb-login-btn"><img src="img/beanfun.jpg"></button>
        <button id="google-login-btn"><img src="img/google.jpg"></button>
        <button id="fb-login-btn"><img src="img/line.jpg"></button>
        <button id="fb-login-btn"><img src="img/apple.jpg"></button>
        <button id="fb-login-btn"><img src="img/discord.jpg"></button> -->
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

const useLoginModalTemplate = () => {
    // 獲取模態框元素
    const modal = document.getElementById('loginModal');
    // 獲取打開模態框的按鈕元素
    const open = document.getElementById("openModalBtn");
    // 獲取模態框的關閉按鈕元素
    const close = document.getElementsByClassName("close")[0];

    // 當用戶點擊按鈕時，打開模態框
    open.onclick = function () {
        modal.style.display = "block";
    }

    // 當用戶點擊 x (close) 時，關閉模態框
    close.onclick = function () {
        modal.style.display = "none";
    }

    // 當用戶點擊任何地方以外的模態框時，也關閉它
    // window.onclick = function(event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //     }
    // }

}

const init = (params) => {
    if (!params) {
        console.error('Initialization parameters are required.');
        return;
    }
    // 如果params中有useGoogleLogin且其值為true，則顯示按鈕，否則隱藏按鈕
    if (params.useLogin) {
        //顯示彈窗
        useLoginModalTemplate()


        showLoginBtnType({
            'google': params.useGoogleLogin,
            'FB': params.useFBLogin,
        })
    }
    // 初始化參數設定
    // 先判斷所需的參數
    // params:{ } 待討論
    isInitialized = true;
    if (isInitialized) {


    }
}

const loginSubmit = async () => {
    let obj;
    await axios.get('https://dev-api.gashpoint.io/consumer/api/oauth/oauth2/thirdParty/domainInfo')
        .then(res => {
            // 通常 res 會是多項資料，取出需要的部份
            obj = res.data
        })
        // err.response 是固定用法
        .catch(err => {
            console.log(err.response);
        })

    return obj;
}
const showLoginBtnType = (showLoginType) => {
    if (showLoginType.google) {
        document.getElementById('google-login-btn').style.display = 'block';
        const gLoginBtn = document.getElementById('google-login-btn');
        if (gLoginBtn) {
            gLoginBtn.addEventListener('click', async function () {
                alert('我是google登入')
            })
        }

    } else {
        document.getElementById('google-login-btn').style.display = 'none';

    }


    if (showLoginType.FB) {
        document.getElementById('fb-login-btn').style.display = 'block';
        const fbLoginBtn = document.getElementById('fb-login-btn');
        if (fbLoginBtn) {
            fbLoginBtn.addEventListener('click', async function () {
                alert('我是FB登入')

            })
        }
    } else {
        document.getElementById('fb-login-btn').style.display = 'none';

    }


}


document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        // open.innerHTML('userID');
        loginBtn.addEventListener('click', async function () {
            if (!isInitialized) {
                console.error('The login module has not been initialized.');
                return;
            }
            alert('我是email登入')

            let res = await loginSubmit();
            console.log('res:', res)
            // 登入功能
            // 透過email登入
            let loginSuccessful = true;  // 假定為登入成功

            if (loginSuccessful) {
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
    }
});
