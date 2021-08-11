import { Request, Response } from 'express';
import moment from 'moment';
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const getAPPList = (req: Request, res: Response) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
      res.json({
        data: [
          {
            id: 1,
            name: '轩辕',
            code: 'xy',
            description: '轩辕应用',
            status: 'OK',
            ownerNickName: 'xxx',
            ownerNo: '123',
            updatedOwnerNickName: 'xxx',
            updatedOwnerNo: '123',
            createdAt: moment(),
            updatedAt: moment(),
          },
          {
            id: 2,
            name: '轩辕',
            code: 'xy',
            description: '轩辕应用',
            status: 'DISABLED',
            ownerNickName: 'xxx',
            ownerNo: '123',
            updatedOwnerNickName: 'xxx',
            updatedOwnerNo: '123',
            createdAt: moment(),
            updatedAt: moment().add(1, 'days'),
          },
          {
            id: 3,
            name: '轩辕',
            code: 'xy',
            description: '轩辕应用',
            status: 'OK',
            ownerNickName: 'xxx',
            ownerNo: '123',
            updatedOwnerNickName: 'xxx',
            updatedOwnerNo: '123',
            createdAt: moment(),
            updatedAt: moment().add(2, 'days'),
          },
          {
            id: 4,
            name: '轩辕',
            code: 'xy',
            description: '轩辕应用',
            status: 'OK',
            ownerNickName: 'xxx',
            ownerNo: '123',
            updatedOwnerNickName: 'xxx',
            updatedOwnerNo: '123',
            createdAt: moment(),
            updatedAt: moment().add(3, 'days'),
          },
          {
            id: 5,
            name: '轩辕',
            code: 'xy',
            description: '轩辕应用',
            status: 'OK',
            ownerNickName: 'xxx',
            ownerNo: '123',
            updatedOwnerNickName: 'xxx',
            updatedOwnerNo: '123',
            createdAt: moment(),
            updatedAt: moment().add(4, 'days'),
          },
          {
            id: 6,
            name: '轩辕',
            code: 'xy',
            description: '轩辕应用',
            status: 'OK',
            ownerNickName: 'xxx',
            ownerNo: '123',
            updatedOwnerNickName: 'xxx',
            updatedOwnerNo: '123',
            createdAt: moment(),
            updatedAt: moment().add(5, 'days'),
          },
          {
            id: 7,
            name: '轩辕',
            code: 'xy',
            description: '轩辕应用',
            status: 'OK',
            ownerNickName: 'xxx',
            ownerNo: '123',
            updatedOwnerNickName: 'xxx',
            updatedOwnerNo: '123',
            createdAt: moment(),
            updatedAt: moment().add(6, 'days'),
          },
          {
            id: 8,
            name: '轩辕',
            code: 'xy',
            description: '轩辕应用',
            status: 'OK',
            ownerNickName: 'xxx',
            ownerNo: '123',
            updatedOwnerNickName: 'xxx',
            updatedOwnerNo: '123',
            createdAt: moment(),
            updatedAt: moment().add(7, 'days'),
          },
          {
            id: 9,
            name: '轩辕',
            code: 'xy',
            description: '轩辕应用',
            status: 'OK',
            ownerNickName: 'xxx',
            ownerNo: '123',
            updatedOwnerNickName: 'xxx',
            updatedOwnerNo: '123',
            createdAt: moment(),
            updatedAt: moment().add(8, 'days'),
          },
          {
            id: 10,
            name: '轩辕',
            code: 'xy',
            description: '轩辕应用',
            status: 'OK',
            ownerNickName: 'xxx',
            ownerNo: '123',
            updatedOwnerNickName: 'xxx',
            updatedOwnerNo: '123',
            createdAt: moment(),
            updatedAt: moment().add(9, 'days'),
          },
          {
            id: 11,
            name: '轩辕',
            code: 'xy',
            description: '轩辕应用',
            status: 'OK',
            ownerNickName: 'xxx',
            ownerNo: '123',
            updatedOwnerNickName: 'xxx',
            updatedOwnerNo: '123',
            createdAt: moment(),
            updatedAt: moment().add(10, 'days'),
          },
        ],
      });
    }, 1000);
  });
};

export default {
  'GET /api/app/list': getAPPList,
};
