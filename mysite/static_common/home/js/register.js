function validateEmail(email) {
    var re = /^[a-z0-9\.\-\_]+\@[a-z0-9\-\_]+(\.[a-z0-9\-\_]+){1,4}$/;
    return re.test(email.toLowerCase());
}

$(function () {
 
    var vm = new Vue({
        el: '#form-register',
        data: {
            name: '',
            email: '',
            password1: '',
            password2: '',
            checkcode: ''
        },
        methods: {
            submit: function (event) {
                event.preventDefault();
                if (! this.name.trim()) {
                    return showError('请输入名字');
                }
                if (! validateEmail(this.email.trim().toLowerCase())) {
                    return showError('请输入正确的Email地址');
                }
                if (this.password1.length < 6) {
                    return showError('口令长度至少为6个字符');
                }
                if (this.password1 !== this.password2) {
                    return showError('两次输入的口令不一致');
                }
                if (! this.checkcode.trim()) {
                    return showError('请输入验证码');
                }
                startLoading();
                postApi('/api/users', {
                    name: this.name,
                    email: this.email.trim().toLowerCase(),
                    password: CryptoJS.MD5(this.password1).toString(),
                    checkcode: this.checkcode,
                }, function (err, r) {
                    if (err) {
                        showError(err);
                    }
                    else {
                        //return location.assign('/');
                        return location.assign('/'); //重新定位到后台
                    }
                    stopLoading();
                });
            }
        }
    });
});

