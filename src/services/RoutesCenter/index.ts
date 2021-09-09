import { request } from 'umi';

/** 获取路由列表 GET http://30.209.173.240:8000/api/route/list */
export async function getRouteList(params: { keyword?: string; appId: number }) {
  const res = await request('http://30.209.173.240:8000/api/route/list', {
    method: 'GET',
    params,
  });
  res.data.data.map((route: any) => {
    if (route.parameters) route.parameters = JSON.parse(route.parameters);
  });
  return res as TableList.response<{ data: Routetypes.RouteItem[] }>;
}

/** 查询路由详情 GET http://30.209.173.240:8000/api/route/detail/ */
export async function getRouteDetail(params: { id: number }) {
  return request<TableList.response<{ route: Routetypes.RouteItem }>>(
    `http://30.209.173.240:8000/api/route/detail/${params.id}`,
    {
      method: 'GET',
    },
  );
}

/** 增加路由 POST http://30.209.173.240:8000/api/route/create */
export async function createRoute(body: Routetypes.createRoute) {
  if (body.parameters) body.parameters = JSON.stringify(body.parameters);
  return request<TableList.response<{ route: Routetypes.RouteItem }>>(
    'http://30.209.173.240:8000/api/route/create',
    {
      method: 'POST',
      data: body,
    },
  );
}

/** 编辑路由 POST http://30.209.173.240:8000/api/route/edit */
export async function editRoute(body: Routetypes.editRoute) {
  if (body.parameters) body.parameters = JSON.stringify(body.parameters);
  return request<TableList.response<{ route: Routetypes.RouteItem }>>(
    'http://30.209.173.240:8000/api/route/edit',
    {
      method: 'POST',
      data: body,
    },
  );
}

/** 删除路由 POST http://30.209.173.240:8000/api/route/delete */
export async function deleteRoute(params: { id: number }) {
  return request<TableList.response<any>>(
    `http://30.209.173.240:8000/api/route/delete/${params.id}`,
    {
      method: 'POST',
    },
  );
}

/** 路由查询 POST http://30.209.173.240:8000/api/route/query */
export async function queryRoute(params: Routetypes.routeRequest) {
  return request<TableList.response<Routetypes.routeResponse>>(
    'http://30.209.173.240:8000/api/route/query',
    {
      method: 'POST',
      data: { ...params },
    },
  );
}
