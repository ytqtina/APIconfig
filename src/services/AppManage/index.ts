import { request } from 'umi';

/** 获取应用列表 GET http://30.209.173.240:8000/api/app/list */
export async function getAPPList(params: TableList.queryParams) {
  const { current: pageNum, ...others } = params;
  return request<TableList.response<TableList.list<APPtypes.APPItem>>>(
    'http://30.209.173.240:8000/api/app/list',
    {
      method: 'GET',
      params: {
        pageNum,
        ...others,
      },
    },
  );
}

/** 查询应用详情 GET http://30.209.173.240:8000/api/app/detail/ */
export async function getAPPDetail(params: { id: number }) {
  return request<TableList.response<APPtypes.APPItem>>(
    `http://30.209.173.240:8000/api/app/detail/${params.id}`,
    {
      method: 'GET',
    },
  );
}

/** 增加应用 POST http://30.209.173.240:8000/api/app/create */
export async function createAPP(body: APPtypes.createAPP) {
  return request<TableList.response<APPtypes.APPItem>>(
    'http://30.209.173.240:8000/api/app/create',
    {
      method: 'POST',
      data: body,
    },
  );
}

/** 编辑应用 POST http://30.209.173.240:8000/api/app/edit */
export async function editAPP(body: APPtypes.editAPP) {
  return request<TableList.response<APPtypes.APPItem>>('http://30.209.173.240:8000/api/app/edit', {
    method: 'POST',
    data: body,
  });
}

/** 删除应用 POST http://30.209.173.240:8000/api/app/delete */
export async function deleteAPP(params: { id: number }) {
  return request<TableList.response<any>>(
    `http://30.209.173.240:8000/api/app/delete/${params.id}`,
    {
      method: 'POST',
    },
  );
}
