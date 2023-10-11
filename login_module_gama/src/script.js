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

    // 初始化參數設定

    isInitialized = true;
}

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            if (!isInitialized) {
                console.error('The login module has not been initialized.');
                return;
            }
            console.log("new version")
            // 登入功能
            let loginSuccessful = true;  // 假定為登入成功

            if (loginSuccessful) {
                if (userCallbacks.onLoginSuccess) {
                    userCallbacks.onLoginSuccess();
                }
            } else {
                if (userCallbacks.onLoginFailure) {
                    userCallbacks.onLoginFailure();
                }
            }
        });
    }
});

