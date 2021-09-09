import { request } from 'umi';
import { Plugin } from './data.d';

/** 根据 路由Id 查找插件 GET http://30.209.173.240:8000/api/plugin/select */
export async function getPluginList(params: { routeId: number }) {
  return request<TableList.response<Plugin>>(
    `http://30.209.173.240:8000/api/plugin/select/${params.routeId}`,
    {
      method: 'GET',
    },
  );
}

/** 增加插件 POST http://30.209.173.240:8000/api/plugin/create */
export async function createPlugin(body: Omit<Plugin, 'id' | 'createdAt' | 'updatedAt'>) {
  return request<TableList.response<Plugin>>('http://30.209.173.240:8000/api/plugin/create', {
    method: 'POST',
    data: body,
  });
}

/** 编辑插件 POST http://30.209.173.240:8000/api/plugin/edit */
export async function editPlugin(body: Omit<Plugin, 'createdAt' | 'updatedAt'>) {
  return request<TableList.response<Plugin>>('http://30.209.173.240:8000/api/plugin/edit', {
    method: 'POST',
    data: body,
  });
}

/** 删除插件 POST http://30.209.173.240:8000/api/plugin/delete */
export async function deletePlugin(params: { id: number }) {
  return request<TableList.response<any>>(
    `http://30.209.173.240:8000/api/plugin/delete/${params.id}`,
    {
      method: 'POST',
    },
  );
}
