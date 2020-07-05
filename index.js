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

    const handleUserLogin = function () {
        const submitButton = document.getElementById('login-submit');
        const memeberAccount = document.getElementById('memeber-account');
        const memeberPassword = document.getElementById('memeber-password');

        const userLoginObject = {
            excute: function () {
                this.handleSubmit();
            },
            handleSubmit: function () {
                // 登入按鈕事件
                submitButton.addEventListener('click', (e) => {
                    e.preventDefault();

                    //新增會員資料
                    db.collection('users').add({
                        userAccount: memeberAccount.value,
                        userPassword: memeberPassword.value,
                    })
                        .then(function (docRef) {
                            console.log('Document written with ID: ', docRef.id);
                        })
                        .catch(function (error) {
                            console.error('Error adding document: ', error);
                        });
                });
            }
        }

        return userLoginObject;
    }

    const executeOnload = handleUserLogin();

    executeOnload.excute();
})()