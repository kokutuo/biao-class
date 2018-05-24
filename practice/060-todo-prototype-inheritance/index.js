var taskUi = new TaskUi('#todo-form', '#todo-list', '#todo-input');
var catUi = new CatUi({
  onItemClick: function (id) {    
    taskUi.render(id);    
  }
});

taskUi.init();
catUi.init();

/*

{
  form: <form>,
  list: <div>,
  _api: {...},
  -----------------
  render: f() {}
  get_form_data: f() {}
  set_form_data: f() {}
}

*/