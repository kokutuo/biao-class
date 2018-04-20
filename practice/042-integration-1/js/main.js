var login = document.querySelector('.login'),
    mask = document.querySelector('.mask'),
    modalClose = mask.querySelector('.modal-close'),
    dropDown = document.querySelector('.drop-down'),
    sider = document.querySelector('.sider'),
    siderClose = document.querySelector('.sider-close'),
    liList = document.querySelectorAll('li'),
    quickLogin = document.querySelector('.quick-login'),
    menuContent = document.querySelector('.menu-content');

var mask_show = function () {
    mask.classList.add('show');
};

var mask_hide = function () {
    mask.classList.remove('show');
};

var sider_visible = function () {
    return sider.classList.contains('show');
};

var sider_show = function () {
    sider.classList.add('show');
};

var sider_hide = function () {
    sider.classList.remove('show');
};

/* 登录 */
login.addEventListener('click', function (e) {
    e.preventDefault();
    mask_show();
});

modalClose.addEventListener('click', function () {
    mask_hide();
});

document.addEventListener('click', function (e) {
    if (e.target === mask) {
        mask_hide();
    }
})

document.addEventListener('keyup', function (e) {
    if (e.code === 'Escape') {
        mask_hide();
    }
});

/* 下拉菜单 */
dropDown.addEventListener('click', function (e) {
    e.preventDefault();

    sider_visible() ? sider_hide() : sider_show();
});

siderClose.addEventListener('click', function () {
    sider_hide();
});

/* 列表 */
for (let i = 0; i < liList.length; i++) {
    const li = liList[i];

    li.addEventListener('click', function (e) {
        var list = li.querySelector('ul');

        if (!list || this != e.target) {
            return;
        } else {
            list.hidden = !list.hidden;
        }
    });
}

/* 快速登录 */
quickLogin.addEventListener('click', function (e) {
    e.preventDefault();

    menuContent.hidden = !menuContent.hidden;
});

document.addEventListener('click', function (e) {
    var el = e.target;

    var menu = el.closest('.menu-content');

    if (!menu && el != quickLogin) {
        menuContent.hidden = true;
    }
});