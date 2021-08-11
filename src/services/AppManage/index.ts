import { request } from 'umi';

/** 获取应用列表 GET /api/app/list */
export async function getAPPList(params: APPtypes.queryParams) {
  return request<APPtypes.APPList>('/api/app/list', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/** 查询应用详情 GET /api/app/detail/ */
export async function getAPPDetail(params: { id: number }) {
  return request<APPtypes.APPItem>('/api/app/detail', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/** 增加应用 POST /api/app/create */
export async function createAPP(body: APPtypes.APPItem) {
  return request<APPtypes.APPItem>('/api/app/create', {
    method: 'POST',
    data: body,
  });
}

/** 编辑应用 POST /api/app/edit */
export async function editAPP(body: APPtypes.APPItem) {
  return request<APPtypes.APPItem>('/api/app/edit', {
    method: 'POST',
    data: body,
  });
}

/** 删除应用 POST /api/app/delete */
export async function deleteAPP(params: { id: number }) {
  return request<any>('/api/app/delete', {
    method: 'POST',
    params: { ...params },
  });
}
