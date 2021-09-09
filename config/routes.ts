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
          {
            name: '注册页',
            path: '/user/register',
            component: './user/Register',
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
    path: '/account/settings',
    component: './AccountSettings',
  },
  {
    name: '路由管理',
    icon: 'ApiOutlined',
    path: '/route',
    component: './RoutesCenter',
  },
  {
    path: '/run',
    component: './RunApi',
  },
  {
    path: '/plugin',
    component: './PluginManage',
  },
  {
    name: '应用管理',
    icon: 'AppstoreAddOutlined',
    path: '/appManage',
    component: './AppManage',
  },
  {
    path: '/userManage',
    name: '用户管理',
    icon: 'crown',
    access: 'canAdmin',
    component: './UserManage',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
