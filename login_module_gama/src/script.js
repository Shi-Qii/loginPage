let isInitialized = false;
let userCallbacks = {
    onLoginSuccess: null,
    onLoginFailure: null,
    onGoogleLogin: null,
    onFBLogin: null
};

//初始化按鈕
let openModalBtnTemplate = `
<button id="openModalBtn">Open Login</button>

<div id="loginModal" class="modal">

  <div class="modal-content">
      <span class="close">&times;</span>

    <div class="login-container">
      <input type="text" id="username" placeholder="Username" />
      <input type="password" id="password" placeholder="Password" />
      <button id="login-btn">Login</button>
      <br>
      <br>
      <button id="google-login-btn">GoogleLogin</button>
      <button id="fb-login-btn">FBLogin</button>
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
    const btn = document.getElementById("openModalBtn");
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

