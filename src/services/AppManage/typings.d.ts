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
    createdAt: string;
    updatedAt: string;
  };
  type createAPP = TableList.createType<APPItem>;
  type editAPP = TableList.editType<APPItem>;
}
