;
(function () {
  'use strict';

  var el_form = document.getElementById('search-form'),
    el_input = document.getElementById('search-input'),
    el_user_list = document.getElementById('user-list'),
    el_amount = document.getElementById('amount'),
    el_pagination_container = document.getElementById('pagination-container'),
    el_pagination_start = el_pagination_container.querySelector('#pagination-start'),
    el_pagination_end = el_pagination_container.querySelector('#pagination-end'),
    el_pagination = el_pagination_container.querySelector('#pagination'),
    el_placeholder = document.getElementById('placeholder'),
    el_top = document.getElementById('top');
  var page_amount, // 总页数
    amount, // 数据总数
    user_name, //搜索关键词
    no_more,
    max_page_btn = 7, // 可视按钮数
    current_page = 1, // 当前页
    limit = 15; // 每页显示数据条数
  var res; // 返回数据

  init();

  function init() {
    detect_submit();
    detect_click_top();
  }

  function search(keyword) {
    var http = new XMLHttpRequest();
    http.open('get', 'https://api.github.com/search/users?q=' + keyword + '&page=' + current_page + '&per_page=' + limit);
    http.send();

    http.addEventListener('load', function () {
      res = JSON.parse(this.responseText);
      amount = res.total_count;
      render();
      render_pagination();
    });
  }

  function render() {
    var html = '';

    res.items.forEach(function (item) {
      html = html + `
                <div class="user">
                    <a class="avatar" target="_blank" href="${item.html_url}">
                        <img src="${item.avatar_url}">
                    </a>
                    <div class="info">
                        <div class="username">${item.login}</div>
                        <div><a target="_blank" href="${item.html_url}">${item.html_url}</a></div>
                    </div>
                </div>
            `;
    });

    el_user_list.innerHTML = html;
    el_amount.innerHTML = `共有${amount}条搜索结果`;

    no_more = current_page * limit >= amount;

    if (no_more) {
      el_placeholder.hidden = false;
    } else {
      el_placeholder.hidden = true;
    }
  }

  function detect_submit() {
    el_form.addEventListener('submit', function (e) {
      e.preventDefault();

      user_name = el_input.value;

      if (!user_name) {
        alert('药~药~切克闹~');
        return;
      }

      reset_page();
      search(user_name);
    });
  }

  function detect_click_top() {
    el_top.addEventListener('click', function () {
      window.scrollTo(0, 0);
    });
  }

  function render_pagination() {
    show_pagination();
    clear_pagination();
    get_page_amount();

    var start,
      middle = Math.ceil(max_page_btn / 2),
      end;

    if (current_page <= middle) {
      start = 1;
      end = max_page_btn;
    } else if (current_page > page_amount - middle) {
      start = page_amount - max_page_btn + 1;
      end = page_amount;
    } else {
      start = current_page - middle + 1;
      end = current_page + middle - 1;
    }

    if (start < 1) {
      start = 1;
    }

    if (end > page_amount) {
      end = page_amount;
    }

    for (var i = start; i <= end; i++) {
      var num = i;
      var btn = document.createElement('button');
      btn.classList.add('page');
      btn.innerText = num;

      if (current_page == num) {
        btn.classList.add('active');
      }

      el_pagination.appendChild(btn);

      btn.addEventListener('click', click_btn_page(num));
    }
  }

  function click_btn_page(x) {
    return function () {
      current_page = x;
      search(user_name);
    };
  }

  function reset_page() {
    current_page = 1;
  }

  function clear_pagination() {
    el_pagination.innerHTML = '';
  }

  function show_pagination() {
    el_pagination_container.hidden = false;
  }

  function hide_pagination() {
    el_pagination_container = true;
  }

  function get_page_amount() {
    page_amount = Math.ceil(amount / limit);
  }

})();