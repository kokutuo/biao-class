;
(function () {
    'use strict';

    var el_search_form = document.getElementById('search-form'),
        el_search_input = document.getElementById('search-input');

    var keyword;
    
    init();

    function init() {
        el_search_form.addEventListener('submit', function (e) {
            e.preventDefault();

            keyword = el_search_input.value;
            search.search_user(keyword);
        });
    }


})();