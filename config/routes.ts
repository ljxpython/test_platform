import route from "mock/route";

/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/goods',
    name: 'goods',
    icon: 'smile',
    hideInMenu: true, // 隐藏菜单
    // component: "./Goods",
    routes: [
      {
        path: '/goods',
        redirect: '/goods/list',
      },
      {
        path: '/goods/category',
        name: 'category',
        component: './Goods/Category',
      },
      {
        path: '/goods/list',
        name: 'list',
        component: './Goods/List',
      },
      {
        path: '/goods/addgood',
        name: 'addgood',
        hideInMenu: true, // 隐藏菜单
        component: './Goods/AddGood',
      },
      {
        path: '/goods/spec',
        name: 'spec',
        component: './Goods/Spec',
      },
      {
        path: '/goods/test',
        name: 'test',
        component: './Goods/test',
      },
      {
        path: '/goods/proform',
        name: 'proform',
        component: './Goods/proform',
        access: 'canTest',
      },
      {
        path: '/goods/proform2',
        name: 'proform2',
        component: './Goods/proform2',
      },
      {
        path: '/goods/proform3',
        name: 'proform3',
        component: './Goods/proform3',
      },
      {
        path: '/goods/table',
        name: 'table',
        component: './Goods/table',
      },
      {
        path: '/goods/protale',
        name: 'protable',
        component: './Goods/protale',
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './Admin',
      },
    ],
  },
  {
    name: 'project',
    icon: 'SolutionOutlined',
    path: '/project',
    routes: [
      {
        path: '/project',
        redirect: '/project/list',
      },
      {
        path: '/project/list',
        name: 'list',
        component: './Project/List',
      },
      {
        path: '/project/create',
        name: 'create',
        hideInMenu: true,
        component: './Project/CreateProcject',
      },
      {
        path: '/project/detail/:id',
        name: 'detail',
        hideInMenu: true, // 隐藏菜单
        component: './Project/Detail',
      },
    ],
  },
  {
    name: 'openapitest',
    icon: 'smile',
    path: '/openapitest',
    routes: [
      {
        path: '/openapitest',
        redirect: '/openapitest/list',
      },
      {
        path: '/openapitest/casemoudel',
        name: 'casemoudel',
        component: './openapitest/caseMoudleList',
      },
      {
        path: '/openapitest/casemoudledetaile/:id',
        name: 'casemoudledtaile',
        hideInMenu: true, // 隐藏菜单
        component: './openapitest/caseMoudleDetail',
      },
      {
        path: '/openapitest/caselist',
        name: 'caselist',
        component: './openapitest/caseList',
      },
      {
        path: '/openapitest/casedetaile/:id',
        name: 'casemoudledtaile',
        hideInMenu: true, // 隐藏菜单
        component: './openapitest/caseDetail',
      },
      {
        path: '/openapitest/casesuitelist',
        name: 'casesuitelist',
        component: './openapitest/caseSuiteList',
      },
      {
        path: '/openapitest/createcasesuite',
        name: 'createcasesuite',
        hideInMenu: true, // 隐藏菜单
        component: './openapitest/createCaseSuite',
      },
      {
        path: '/openapitest/casesuitedetaile/:id',
        name: 'casesuitedtaile',
        hideInMenu: true, // 隐藏菜单
        component: './openapitest/caseSuiteDetail',
      },
      {
        path: '/openapitest/syncsuite/:id',
        name: 'synccasesuite',
        hideInMenu: true, // 隐藏菜单
        component: './openapitest/syncCaseSuite',
      },
      {
        path: '/openapitest/runcasesuite/:id',
        name: 'runcasesuite',
        hideInMenu: true, // 隐藏菜单
        component: './openapitest/runCaseSuite',
      },

      {
        path: '/openapitest/caseplanlist',
        name: 'caseplanlist',
        // hideInMenu: true, // 隐藏菜单
        component: './openapitest/casePlanList',
      },
      {
        path: '/openapitest/createcaseplan',
        name: 'createcaseplan',
        hideInMenu: true, // 隐藏菜单
        component: './openapitest/createCasePlan',
      },
      {
        path: '/openapitest/caseplandetaile/:id',
        name: 'caseplandetaile',
        hideInMenu: true, // 隐藏菜单
        component: './openapitest/casePlanDetail',
      },
      {
        path: '/openapitest/synccaseplan/:id',
        name: 'synccaseplan',
        hideInMenu: true, // 隐藏菜单
        component: './openapitest/syncCasePlan',
      },
      {
        path: '/openapitest/resultlist',
        name: 'resultlist',
        component: './openapitest/caseResultList',
      },
      {
        path: '/openapitest/test',
        name: 'test',
        hideInMenu: true, // 隐藏菜单
        component: './openapitest/test',
      },
    ],
  },
  {
    name: 'locust',
    icon: 'smile',
    path: '/locust',
    routes: [
      {
        path: '/locust',
        redirect: '/locust/list',
      },
      {
        path: '/locust/locustcaselist',
        name: 'locustcaselist',
        component: './LocustTest/case/caseList',
      },
      {
        path: '/locust/locustcasedetaile/:id',
        name: 'locustcasedetaile',
        hideInMenu: true, // 隐藏菜单
        component: './LocustTest/case/caseDetail',
      },
      {
        path: '/locust/list',
        name: 'list',
        component: './LocustTest/List',
      },
      {
        path: '/locust/add',
        name: 'add',
        component: './LocustTest/locustweb',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
