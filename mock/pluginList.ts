// // eslint-disable-next-line import/no-extraneous-dependencies
// import type { Request, Response } from 'express';
// import moment from '_moment@2.29.1@moment';

// const getPluginList = (req: Request, res: Response) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//       res.json({
//         plugin:
//         {
//           id: 1,
//           routeId: 1,
//           allowLoadBalance: true,
//           loadBalanceConfig: '{...}',
//           allowAuthToken: false,
//           authTokenConfig: '{...}',
//           allowWhiteList: true,
//           whiteListConfig: '{\"whiteList\":\"127.0.0.1,192.168.0.1\"}',
//           allowBlackList: false,
//           blackListConfig: "{\"blackList\":\"127.0.0.1,192.168.0.1\"}",
//           allowRateLimit: false,
//           rateLimitConfig: "{\"strategy\":\"CLUSTER\",\"qpsValue\":10,\"scope\":\"URI\"}",
//           allowCache: true,
//           allowSentinel: true,
//           sentinelConfig: "{\"rule\":\"EXCEPTION_COUNT\",\"rtValue\":1000,\"exceptionRatioValue\":0.3,\"exceptionCountValue\":3,\"timeWindow\":60,\"message\":\"service degrade\"}",
//           createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
//           updatedAt: moment().format('YYYY-MM-DD hh:mm:ss'),

//         }
//       });
//     }, 500);
//   });
// };
// export default {
//   'GET  /api/plugin/select': getPluginList,
//   'POST /api/plugin/edit': getPluginList,
//   'POST /api/plugin/delete/': {},

// };
