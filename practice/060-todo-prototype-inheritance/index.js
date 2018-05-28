var taskUi = new TaskUi();
var catUi = new CatUi({
  onItemClick: function (id) {
    taskUi.render(id);
  },
  onDeleteClick: function (id) {
    taskUi._api.catDelete(id);
    
    taskUi.render();
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