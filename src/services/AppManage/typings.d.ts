declare namespace APPtypes {
  type APPItem = {
    id: number;
    name: string;
    code: string;
    description: string;
    status: 'OK' | 'DISABLED';
    ownerNickName: string;
    ownerNo: string;
    updatedOwnerNickName: string;
    updatedOwnerNo: string;
    created: string;
    updatedAt: string;
  };
  type APPList = {
    pageName: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    data: APPItem[];
  };
  type queryParams = {
    current: number;
    pageSize: number;
    orderCreatedAt?: 'ASC' | 'DESC';
    orderUpdatedAt?: 'ASC' | 'DESC';
  };
}
