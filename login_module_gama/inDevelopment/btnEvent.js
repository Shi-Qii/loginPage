const showLoginBtnType = (showLoginType) => {
    let bfId = 'login-btn-beanfun';
    let googleId = 'login-btn-google';
    let lineId = 'login-btn-line';
    let appleId = 'login-btn-apple';
    let discordId = 'login-btn-discord';
    if (showLoginType.BF) {
        document.getElementById(bfId).style.display = 'block';
        const bfLoginBtn = document.getElementById(bfId);
        if (bfLoginBtn) {
            bfLoginBtn.addEventListener('click', async function () {
                alert('我是bf登入')
            })
        }
    } else {
        document.getElementById(bfId).style.display = 'none';
    }
    if (showLoginType.google) {
        document.getElementById(googleId).style.display = 'block';
        const gLoginBtn = document.getElementById(googleId);
        if (gLoginBtn) {
            gLoginBtn.addEventListener('click', async function () {
                alert('我是google登入')
            })
        }

    } else {
        document.getElementById(googleId).style.display = 'none';
    }
    if (showLoginType.Line) {
        document.getElementById(lineId).style.display = 'block';
        const lineLoginBtn = document.getElementById(lineId);
        if (lineLoginBtn) {
            lineLoginBtn.addEventListener('click', async function () {
                alert('我是line登入')
            })
        }
    } else {
        document.getElementById(lineId).style.display = 'none';

    }
    if (showLoginType.Apple) {
        document.getElementById(appleId).style.display = 'block';
        const appleLoginBtn = document.getElementById(appleId);
        if (appleLoginBtn) {
            appleLoginBtn.addEventListener('click', async function () {
                alert('我是Apple登入')
            })
        }
    } else {
        document.getElementById(appleId).style.display = 'none';
    }
    if (showLoginType.DC) {
        document.getElementById(discordId).style.display = 'block';
        const dcLoginBtn = document.getElementById(discordId);
        if (dcLoginBtn) {
            dcLoginBtn.addEventListener('click', async function () {
                alert('我是dc登入')
            })
        }
    } else {
        // document.getElementById(discordId).style.display = 'none';
    }
}

const userInfo = () => {
    alert('我是userInfo')
}
const logout = () => {
    alert('我是logout')
}
const loginSubmit = async () => {
    alert('我是email登入')
    let obj;
    //oauth2/thirdParty/getLoginModuleInfo
    await axios.get('https://dev-api.gashpoint.io/consumer/api/oauth/Eamil')
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
const togglePasswordVisibility = () => {

    let passwordInput = document.getElementById('password');
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}
