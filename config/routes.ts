export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: '欢迎',
    icon: 'smile',
    component: './Welcome',
  },
  {
    name: '配置中心',
    icon: 'ApartmentOutlined',
    path: '/route',
    component: './RoutesCenter',
  },
  {
    name: '应用管理',
    icon: 'AppstoreAddOutlined',
    path: '/appManage',
    component: './AppManage',
  },
  {
    name: '服务管理',
    icon: 'ApiOutlined',
    path: '/servicemanage',
    component: './ServiceManage',
  },
  {
    name: '插件管理',
    icon: 'BuildOutlined',
    path: '/plugins',
    component: './PluginManage',
  }, // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
