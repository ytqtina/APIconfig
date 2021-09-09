// eslint-disable-next-line import/no-extraneous-dependencies
import type { Request, Response } from 'express';

// const city = require('./geographic/city.json');
// const province = require('./geographic/province.json');

// function getProvince(_: Request, res: Response) {
//   return res.json({
//     data: province,
//   });
// }

// function getCity(req: Request, res: Response) {
//   return res.json({
//     data: city[req.params.province],
//   });
// }

function getCurrentUser(req: Request, res: Response) {
  return res.json({
    data: {
      id: 1,
      no: '123',
      department: '物流研发部',
      username: 'tianqingyin.ytq',
      description: '这里是描述',
      password: '123',
      nickname: '珂伊',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      lastTime: '2021-08-10 10:00:00',
      status: 'OK',
      createdAt: '2021-08-10 10:00:00',
      updatedAt: '2021-08-10 10:00:00',
      access: 'admin',
    },
  });
}
// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET  /api/accountSettingCurrentUser': getCurrentUser,
  // 'GET  /api/geographic/province': getProvince,
  // 'GET  /api/geographic/city/:province': getCity,
};
