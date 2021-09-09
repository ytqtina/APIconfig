export type TagType = {
  key: string;
  label: string;
};

export type GeographicItemType = {
  name: string;
  id: string;
};

export type GeographicType = {
  province: GeographicItemType;
  city: GeographicItemType;
};

export type NoticeType = {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
};

export type CurrentUser = {
  id: number;
  username: string;
  nickname: string;
  password: string;
  no: string;
  department: string;
  description: string;
  avatar: string;
  lastTime: string;
  status: 'OK' | 'FORBIDDEN';
  createdAt: string;
  updatedAt: string;
  // notice: NoticeType[];
  // email: string;
  // signature: string;
  // title: string;
  // group: string;
  // tags: TagType[];
  // notifyCount: number;
  // unreadCount: number;
  // country: string;
  // geographic: GeographicType;
  // address: string;
  // phone: string;
};
