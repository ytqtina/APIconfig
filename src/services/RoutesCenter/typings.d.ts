declare namespace Routetypes {
  type RouteItem = {
    id?: number;
    appId: number;
    protocol: 'DUBBO' | 'HTTP';
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    uri: string;
    path: string;
    version: string;
    source?: string;
    application?: string;
    interfaceClass?: string;
    methodName?: string;
    parameters?:
      | {
          parameterName: string;
          parameterType: string;
          parameterField: string;
        }[]
      | string;
    timeout?: number;
    status: 'OK' | 'DISABLED';
    env: 'DEV' | 'PRE' | 'GRAY' | 'PROD';
    tags?: string | string[];
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  type createRoute = TableList.createType<RouteItem>;
  type editRoute = TableList.editType<RouteItem>;
  type routeRequest = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    uri: string;
    headers: { [key: string]: string };
    params: { [key: string]: string };
    body?: string;
  };
  type routeResponse = {
    statusCode: number;
    reasonPhrase: string;
    headers: { [key: string]: string };
    data: string;
  };
}
