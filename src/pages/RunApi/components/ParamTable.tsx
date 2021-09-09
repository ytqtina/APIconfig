import React, { useState, useEffect } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';

type DataSourceType = {
  id: React.Key;
  key?: string;
  value?: string;
};

const defaultData: DataSourceType[] = new Array(1).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    key: '',
    value: '',
  };
});

export default (props: any) => {
  const { getData } = props;
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const [dataSource, setDataSource] = useState<DataSourceType[]>(() => defaultData);
  useEffect(() => {
    getData(dataSource);
  }, [dataSource]);
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'key',
      dataIndex: 'key',
      width: '50%',
    },
    {
      title: 'value',
      dataIndex: 'value',
      width: '50%',
    },
    {
      // title: '操作',
      valueType: 'option',
      width: 50,
      render: () => {
        return null;
      },
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        bordered
        columns={columns}
        rowKey="id"
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now(),
          }),
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList);
          },
          onChange: setEditableRowKeys,
          // onDelete: (key, row) => {

          // }
        }}
      />
    </>
  );
};
