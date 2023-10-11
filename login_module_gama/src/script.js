let isInitialized = false;
let userCallbacks = {
    onLoginSuccess: null,
    onLoginFailure: null
};

let loginTemplate = `
<div class="login-container">
  <input type="text" id="username" placeholder="Username" />
  <input type="password" id="password" placeholder="Password" />
  <button id="login-btn">Login</button>
  <button id="google-login-btn">GoogleLogin</button>
</div>
`;

function renderLogin(containerId, callbacks) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = loginTemplate;
    }

    if (callbacks) {
        if (callbacks.onLoginSuccess) {
            userCallbacks.onLoginSuccess = callbacks.onLoginSuccess;
        }

        if (callbacks.onLoginFailure) {
            userCallbacks.onLoginFailure = callbacks.onLoginFailure;
        }
    }
}

function init(params) {
    if (!params) {
        console.error('Initialization parameters are required.');
        return;
    }
// 如果params中有useGoogleLogin且其值為true，則顯示按鈕，否則隱藏按鈕
    if (params.useGoogleLogin) {
        showGoogleLoginBtn();
    } else {
        hideGoogleLoginBtn();
    }
    // 初始化參數設定
    // 先判斷所需的參數
    // params:{ } 待討論
    isInitialized = true;
}
function showGoogleLoginBtn() {
    document.getElementById('google-login-btn').style.display = 'block';
}

function hideGoogleLoginBtn() {
    document.getElementById('google-login-btn').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            if (!isInitialized) {
                console.error('The login module has not been initialized.');
                return;
            }
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
                }
            }
        });
    }
});

