// // eslint-disable-next-line import/no-extraneous-dependencies
// import type { Request, Response } from 'express';
// import moment from 'moment';
// // const city = require('./geographic/city.json');
// // const province = require('./geographic/province.json');

// // function getProvince(_: Request, res: Response) {
// //   return res.json({
// //     data: province,
// //   });
// // }

// // function getCity(req: Request, res: Response) {
// //   return res.json({
// //     data: city[req.params.province],
// //   });
// // }

// function getCurrentUser(req: Request, res: Response) {
//   return res.json({
//     data: {
//       id: 1,
//       username: 'xx',
//       no: '123',
//       password: '123',
//       department: '物流研发部',
//       description: '这里是描述',
//       nickname: 'xx',
//       avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
//       lastTime: '2021-08-10 10:00:00',
//       status: 'OK',
//       createdAt: '2021-08-10 10:00:00',
//       updatedAt: '2021-08-10 10:00:00',
//       access: 'admin'
//     }
//   });
// }

// const getUserList = (req: Request, res: Response) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//       res.json({
//         pageNum: 1,
//         pageSize: 10,
//         totalItems: 20,
//         totalPages: 2,
//         data: [
//           {
//             id: 1,
//             no: '123',
//             username: 'xx',
//             password: '123',
//             department: '物流研发部',
//             description: '这里是描述',
//             nickname: 'xx',
//             avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
//             lastTime: moment(),
//             status: 'OK',
//             createdAt: moment(),
//             updatedAt: moment(),
//             access: 'user'
//           },
//           {
//             id: 2,
//             username: 'xx',
//             no: '123',
//             password: '123',
//             department: '物流研发部',
//             description: '这里是描述',
//             nickname: 'xx',
//             avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
//             lastTime: moment(),
//             status: 'OK',
//             createdAt: moment(),
//             updatedAt: moment(),
//             access: 'user'
//           },
//           {
//             id: 3,
//             username: 'xx',
//             no: '123',
//             password: '123',
//             department: '物流研发部',
//             description: '这里是描述',

//             nickname: 'xx',
//             avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
//             lastTime: moment(),
//             status: 'OK',
//             createdAt: moment(),
//             updatedAt: moment(),
//             access: 'user'
//           },
//           {
//             id: 4,
//             username: 'xx',
//             no: '123',
//             password: '123',
//             department: '物流研发部',
//             description: '这里是描述',
//             nickname: 'xx',
//             avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
//             lastTime: moment(),
//             status: 'OK',
//             createdAt: moment(),
//             updatedAt: moment(),
//             access: 'user'
//           },
//           {
//             id: 5,
//             username: 'xx',
//             no: '123',
//             password: '123',
//             department: '物流研发部',
//             description: '这里是描述',
//             nickname: 'xx',
//             avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
//             lastTime: moment(),
//             status: 'OK',
//             createdAt: moment(),
//             updatedAt: moment(),
//             access: 'admin'
//           },
//           {
//             id: 6,
//             username: 'xx',
//             no: '123',
//             password: '123',
//             department: '物流研发部',
//             description: '这里是描述',
//             nickname: 'xx',
//             avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
//             lastTime: moment(),
//             status: 'OK',
//             createdAt: moment(),
//             updatedAt: moment(),
//             access: 'user'
//           },
//           {
//             id: 7,
//             username: 'xx',
//             no: '123',
//             password: '123',
//             department: '物流研发部',
//             description: '这里是描述',
//             nickname: 'xx',
//             avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
//             lastTime: moment(),
//             status: 'FORBIDDEN',
//             createdAt: moment(),
//             updatedAt: moment(),
//             access: 'admin'
//           },
//           {
//             id: 8,
//             username: 'xx',
//             no: '123',
//             password: '123',
//             department: '物流研发部',
//             description: '这里是描述',
//             nickname: 'xx',
//             avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
//             lastTime: moment(),
//             status: 'OK',
//             createdAt: moment(),
//             updatedAt: moment(),
//             access: 'user'
//           },
//           {
//             id: 9,
//             username: 'xx',
//             no: '123',
//             password: '123',
//             department: '物流研发部',
//             description: '这里是描述',
//             nickname: 'xx',
//             avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
//             lastTime: moment(),
//             status: 'OK',
//             createdAt: moment(),
//             updatedAt: moment(),
//             access: 'user'
//           },
//           {
//             id: 10,
//             username: 'xx',
//             no: '123',
//             password: '123',
//             department: '物流研发部',
//             description: '这里是描述',
//             nickname: 'xx',
//             avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
//             lastTime: moment(),
//             status: 'FORBIDDEN',
//             createdAt: moment(),
//             updatedAt: moment(),
//             access: 'user'
//           },
//         ],
//       });
//     }, 500);
//   });
// };
// // 代码中会兼容本地 service mock 以及部署站点的静态数据
// export default {
//   // 支持值为 Object 和 Array
//   'GET  /api/accountSettingCurrentUser': getCurrentUser,
//   'GET  /api/user/list': getUserList
//   // 'GET  /api/geographic/province': getProvince,
//   // 'GET  /api/geographic/city/:province': getCity,
// };
