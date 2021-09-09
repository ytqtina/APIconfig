import { request } from 'umi';

/** 获取用户列表 GET http://30.209.173.240:8000/api/user/list */
export async function getUserList(params: TableList.queryParams) {
  const { current: pageNum, ...others } = params;
  return request<TableList.response<TableList.list<API.CurrentUser>>>(
    'http://30.209.173.240:8000/api/user/list',
    {
      method: 'GET',
      params: {
        pageNum,
        ...others,
      },
    },
  );
}

/** 查询用户详情 GET http://30.209.173.240:8000/api/user/detail/ */
export async function getUserDetail(params: { id: number }) {
  return request<TableList.response<API.CurrentUser>>(
    `http://30.209.173.240:8000/api/user/detail/${params.id}`,
    {
      method: 'GET',
    },
  );
}

/** 增加用户 POST http://30.209.173.240:8000/api/user/create */
export async function createUser(body: UserTypes.createUser) {
  return request<TableList.response<API.CurrentUser>>(
    'http://30.209.173.240:8000/api/user/create',
    {
      method: 'POST',
      data: body,
    },
  );
}

/** 编辑用户 POST http://30.209.173.240:8000/api/user/edit */
export async function editUser(body: UserTypes.editUser) {
  return request<TableList.response<API.CurrentUser>>('http://30.209.173.240:8000/api/user/edit', {
    method: 'POST',
    data: body,
  });
}

/** 删除用户 POST http://30.209.173.240:8000/api/user/delete */
export async function deleteUser(params: { id: number }) {
  return request<TableList.response<any>>(
    `http://30.209.173.240:8000/api/user/delete/${params.id}`,
    {
      method: 'POST',
    },
  );
}
