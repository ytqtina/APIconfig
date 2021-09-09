// import { editRoute } from '@/services/RoutesCenter';
// import { Request, Response } from 'express';
// import moment from 'moment';

// const getRouteList = (req: Request, res: Response) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//       res.json({
//         data: [
//           {
//             id: 1,
//             appId: 1,
//             protocol: 'DUBBO',
//             method: 'GET',
//             uri: '/xy/indicator/query',
//             path: '/indicator/query',
//             version: '1.0.0',
//             application: 'xy',
//             interfaceClass: 'me.ele.silkworm.api.ArsenalNodeFacade',
//             methodName: 'queryIndicator',
//             parameter: [{ parameterName: 'student', parameterType: 'com.xxx.entity.Student', args: 'id,name,age' }, { parameterName: 'id', parameterType: 'java.lang.Long', args: '' }],
//             timeout: 6000,
//             status: 'OK',
//             env: 'DEV',
//             description: '这里是路由描述',
//             tags: '指标,test',
//             createdAt: moment(),
//             updatedAt: moment(),
//           },
//           {
//             id: 2,
//             appId: 1,
//             protocol: 'HTTP',
//             method: 'GET',
//             uri: '/xy/ping',
//             path: '/ping',
//             version: '1.0.0',
//             source: 'http://127.0.0.1:8001',
//             timeout: 6000,
//             status: 'OK',
//             env: 'DEV',
//             description: '这里是路由描述',
//             tags: '指标',
//             createdAt: moment(),
//             updatedAt: moment(),
//           },
//         ],
//       });
//     }, 500);
//   });
// };

// const getRouteDetail = (req: Request, res: Response) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//       res.json({
//         route: [
//           {
//             id: 1,
//             appId: 1,
//             protocol: 'DUBBO',
//             method: 'GET',
//             uri: '/xy/indicator/query',
//             path: '/indicator/query',
//             version: '1.0.0',
//             application: 'xy',
//             interfaceClass: 'me.ele.silkworm.api.ArsenalNodeFacade',
//             methodName: 'queryIndicator',
//             parameterTypes: 'java.lang.Long',
//             args: 'indicatorId',
//             timeout: 6000,
//             status: 'OK',
//             env: 'DEV',
//             description: '这里是路由描述',
//             tags: '指标',
//             createdAt: moment(),
//             updatedAt: moment(),
//           },
//         ],
//       });
//     }, 500);
//   });
// };

// const queryRoute = (req: Request, res: Response) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//       res.json({
//         statusCode: 200,
//         reasonPhrase: 'OK',
//         headers: {
//           'content-length': "169",
//         },
//         data: "{\"code\":\"10004\",\"data\":null,\"message\":\"最多只能输入500个骑士ID！\"}"
//       });
//     }, 500);
//   });
// };

// export default {
//   'GET /api/route/list': getRouteList,
//   'GET /api/route/detail': getRouteDetail,
//   'POST /api/route/query': queryRoute,
//   'POST /api/route/edit': {
//     route: {
//       id: 3,
//       appId: 1,
//       protocol: 'DUBBO',
//       method: 'GET',
//       uri: '/xy/indicator/q1',
//       path: '/indicator/q1',
//       version: '1.0.0',
//       application: 'xy',
//       interfaceClass: 'me.ele.silkworm.api.ArsenalNodeFacade',
//       methodName: 'queryIndicator',
//       parameter: [{ parameterName: 'student', parameterType: 'com.xxx.entity.Student', args: 'id,name,age' }],
//       args: 'indicatorId',
//       timeout: 6000,
//       status: 'OK',
//       env: 'DEV',
//       description: '这里是路由描述',
//       tags: '指标',
//       createdAt: moment(),
//       updatedAt: moment(),
//     }
//   },
//   'POST /api/route/delete/': {},
//   'POST /api/route/create': {}
// };
