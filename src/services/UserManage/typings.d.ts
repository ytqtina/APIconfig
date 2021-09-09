declare namespace UserTypes {
  type editUser = Omit<TableList.editType<API.CurrentUser>, 'lastTime'>;
  type createUser = Omit<TableList.createType<API.CurrentUser>, 'lastTime'>;
}
