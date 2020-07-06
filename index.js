(function () {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: 'AIzaSyAncpQXcc6UAlllACYvqDzrpQnemgsDKbk',
        authDomain: 'member-database-fdf1e.firebaseapp.com',
        databaseURL: 'https://member-database-fdf1e.firebaseio.com',
        projectId: 'member-database-fdf1e',
        storageBucket: 'member-database-fdf1e.appspot.com',
        messagingSenderId: '398211092204',
        appId: '1:398211092204:web:e56a27f2a566c36e69dfc9',
        measurementId: 'G-19CNHH96GK'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    const db = firebase.firestore();

    const handleUserRegister = function () {
        const registerSubmit = document.getElementById('register-submit');
        const registerEmail = document.getElementById('register-email');
        const registerPassword = document.getElementById('register-password');

        const userRegisterObject = {
            execute: function () {
                this.handleSubmit();
            },
            handleSubmit: function () {
                // 註冊按鈕事件
                registerSubmit.addEventListener('click', (e) => {
                    e.preventDefault();

                    firebase.auth().createUserWithEmailAndPassword(registerEmail.value, registerPassword.value)
                        .then(() => {
                            console.log('成功');
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                });
            }
        }
        return userRegisterObject;
    }

    const handleUserLogin = function () {
        const loginSubmit = document.getElementById('login-submit');
        const loginEmail = document.getElementById('login-email');
        const loginPassword = document.getElementById('login-password');

        const userLoginObject = {
            execute: function () {
                this.handleSubmit();
            },
            handleSubmit: function () {
                // 登入按鈕事件
                loginSubmit.addEventListener('click', (e) => {
                    e.preventDefault();

                    firebase.auth().signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
                        .then(() => {
                            const user = firebase.auth().currentUser;

                            if (user) {
                                // User is signed in.
                                console.log('login 成功', user);
                            }
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                });
            }
        }
        return userLoginObject;
    }

    const handleOnload = function (assembleObj) {
        const { handleUserRegister, handleUserLogin } = assembleObj;
        const loginWrap = document.getElementsByClassName('login-wrap');
        const registerWrap = document.getElementsByClassName('register-wrap');
        const categoryButton = document.getElementsByClassName('category-button');

        const apiObject = {
            handleCategorySwitch: function () {
                Array.prototype.forEach.call(categoryButton, function (element) {
                    element.addEventListener('click', function () {
                        Array.prototype.filter.call(element.parentNode.children, function (child) {
                            child.classList.remove('active');
                        });
                        element.classList.add('active');

                        if (this.getAttribute('id') === 'category-login') {
                            registerWrap[0].classList.add('float');
                            loginWrap[0].classList.remove('float');
                        } else {
                            loginWrap[0].classList.add('float');
                            registerWrap[0].classList.remove('float');
                        }
                    });
                });
            },
            execute: function () {
                handleUserRegister().execute();
                handleUserLogin().execute();

                //
                this.handleCategorySwitch();
            }
        }

        return apiObject;
    }

    const assembleObj = {
        handleUserRegister: handleUserRegister,
        handleUserLogin: handleUserLogin,
    }

    const executeOnload = handleOnload(assembleObj);

    executeOnload.execute();
})()


//新增會員資料
// db.collection('users').add({
//     userAccount: memeberAccount.value,
//     userPassword: memeberPassword.value,
// })
//     .then(function (docRef) {
//         console.log('Document written with ID: ', docRef.id);
//     })
//     .catch(function (error) {
//         console.error('Error adding document: ', error);
//     });