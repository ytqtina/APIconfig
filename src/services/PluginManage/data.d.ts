// export type Member = {
//   avatar: string;
//   name: string;
//   id: string;
// };

// export interface Params {
//   count: number;
// }

interface Plugin {
  id?: number;
  routeId: number;
  allowLoadBalance: boolean;
  loadBalanceConfig: string;
  allowAuthToken: boolean;
  authTokenConfig: string;
  allowWhiteList: boolean;
  whiteListConfig: string;
  allowBlackList: boolean;
  blackListConfig: string;
  allowRateLimit: boolean;
  rateLimitConfig: string;
  allowCache: boolean;
  cacheConfig: string;
  allowSentinel: boolean;
  sentinelConfig: string;
  createdAt?: string;
  updatedAt?: string;
}

enum PluginName {
  allowLoadBalance = '负载均衡',
  allowAuthToken = '鉴权',
  allowWhiteList = '白名单',
  allowBlackList = '黑名单',
  allowRateLimit = '限流',
  allowCache = '缓存',
  allowSentinel = '熔断器',
}

const PluginConfig = new Map<string, string>([
  ['allowLoadBalance', 'loadBalanceConfig'],
  ['allowAuthToken', 'authTokenConfig'],
  ['allowWhiteList', 'whiteListConfig'],
  ['allowBlackList', 'blackListConfig'],
  ['allowRateLimit', 'rateLimitConfig'],
  ['allowSentinel', 'sentinelConfig'],
]);

type SinglePlugin<T> = {
  inUse: boolean;
  title: PluginName;
  config: T | undefined;
};

type WhiteListConfig = {
  whiteList: string;
};
type BlackListConfig = {
  blackList: string;
};
type RateLimitConfig = {
  strategy: 'STANDALONE' | 'CLUSTER';
  qpsValue: number;
  scope: 'URI' | 'IP' | 'URI_IP';
};
type SentinelConfig = {
  rule: 'RT' | 'EXCEPTION_RATIO' | 'EXCEPTION_COUNT';
  rtValue: number;
  exceptionRatioValue: number;
  exceptionCountValue: number;
  timeWindow: number;
  message: string;
};
type CacheConfig = {
  time: number;
};
export {
  Plugin,
  PluginName,
  SinglePlugin,
  WhiteListConfig,
  BlackListConfig,
  RateLimitConfig,
  SentinelConfig,
  PluginConfig,
};
// export interface ListItemDataType {
//   id: string;
//   owner: string;
//   title: string;
//   avatar: string;
//   cover: string;
//   status: 'normal' | 'exception' | 'active' | 'success';
//   percent: number;
//   logo: string;
//   href: string;
//   body?: any;
//   updatedAt: number;
//   createdAt: number;
//   subDescription: string;
//   description: string;
//   activeUser: number;
//   newUser: number;
//   star: number;
//   like: number;
//   message: number;
//   content: string;
//   members: Member[];
// }
