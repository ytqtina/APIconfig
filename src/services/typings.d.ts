declare namespace TableList {
  type list<T> = {
    pageName: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    data: T[];
  };

  type queryParams = {
    current?: number;
    pageSize?: number;
    orderCreatedAt?: 'ASC' | 'DESC';
    orderUpdatedAt?: 'ASC' | 'DESC';
    keyword?: string;
  };

  type createType<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
  type editType<T> = Partial<Omit<T, 'createdAt' | 'updatedAt'>>;

  type response<T> = {
    code: string;
    data: T;
    msg: string;
  };
}
