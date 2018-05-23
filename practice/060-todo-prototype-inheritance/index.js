var taskUi = new TaskUi('#todo-form', '#todo-list', '#todo-input'),
  catUi = new CatUi();

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