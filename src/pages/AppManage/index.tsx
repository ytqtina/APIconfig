import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea, ProFormRadio } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { createAPP, deleteAPP, editAPP, getAPPList } from '@/services/AppManage';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: APPtypes.APPItem) => {
  const hide = message.loading('正在添加');
  try {
    await createAPP({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: APPtypes.APPItem) => {
  const hide = message.loading('Configuring');
  try {
    await editAPP({
      ...fields,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (id: number) => {
  confirm({
    title: '确定删除该应用吗？',
    icon: <ExclamationCircleOutlined />,
    content: '请确认。',
    okText: '删除',
    okType: 'danger',
    cancelText: '取消',
    onOk: async () => {
      const hide = message.loading('正在删除');
      try {
        await deleteAPP({
          id,
        });
        hide();
        message.success('Deleted successfully and will refresh soon');
        return true;
      } catch (error) {
        hide();
        message.error('Delete failed, please try again');
        return false;
      }
    },
    onCancel() {},
  });
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<APPtypes.APPItem>();
  // const [selectedRowsState, setSelectedRows] = useState<APPtypes.APPItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  // const intl = useIntl();

  const columns: ProColumns<APPtypes.APPItem>[] = [
    {
      title: '关键词',
      dataIndex: 'keyword',
      hideInTable: true,
    },
    {
      title: 'id',
      dataIndex: 'id',
      search: false,
    },
    {
      title: '应用名称',
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '代码',
      dataIndex: 'code',
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      search: false,
      hideInForm: true,
      valueEnum: {
        OK: {
          text: '启用',
          status: 'success',
        },
        DISABLED: {
          text: '禁用',
          status: 'Error',
        },
      },
    },
    { title: '创建人', dataIndex: 'ownerNickName', search: false },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '最后修改',
      sorter: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      search: false,
      // renderFormItem: (item, { defaultRender, ...rest }, form) => {
      //   const status = form.getF                        ieldValue('status');
      //   if (`${status}` === '0') {
      //     return false;
      //   }
      //   if (`${status}` === '3') {
      //     return (
      //       <Input
      //         {...rest}
      //         placeholder={intl.formatMessage({
      //           id: 'pages.searchTable.exception',
      //           defaultMessage: 'Please enter the reason for the exception!',
      //         })}
      //       />
      //     );
      //   }
      //   return defaultRender(item);
      // },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        <a
          key="delete"
          onClick={() => {
            handleRemove(record.id);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<APPtypes.APPItem, APPtypes.queryParams>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={getAPPList}
        columns={columns}
      />

      <ModalForm
        width={500}
        title="新建应用"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as APPtypes.APPItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          name="name"
          label="名称"
          placeholder="请填写应用名称"
          rules={[
            {
              required: true,
              message: '请填写应用名称',
            },
          ]}
        />
        <ProFormText
          name="code"
          label="代码"
          placeholder="请填写应用代码"
          rules={[
            {
              required: true,
              message: '请填写应用代码',
            },
          ]}
        />
        <ProFormTextArea
          name="description"
          label="描述"
          placeholder="请填写应用描述"
          rules={[
            {
              required: true,
              message: '请填写应用描述',
            },
          ]}
        />
        <ProFormRadio.Group
          name="status"
          label="状态"
          initialValue="OK"
          options={[
            {
              label: '启用',
              value: 'OK',
            },
            {
              label: '禁用',
              value: 'DISABLED',
            },
          ]}
        />
      </ModalForm>
      <ModalForm
        width={500}
        title="编辑"
        modalProps={{ destroyOnClose: true }}
        onVisibleChange={
          handleUpdateModalVisible
          // if (!showDetail) {
          //   setCurrentRow(undefined);
          // }
        }
        visible={updateModalVisible}
        onFinish={async (value) => {
          const success = await handleUpdate(value as APPtypes.APPItem);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          name="name"
          label="名称"
          initialValue={currentRow?.name}
          placeholder="请填写应用名称"
          rules={[
            {
              required: true,
              message: '请填写应用名称',
            },
          ]}
        />
        <ProFormText
          name="code"
          label="代码"
          initialValue={currentRow?.code}
          placeholder="请填写应用代码"
          rules={[
            {
              required: true,
              message: '请填写应用代码',
            },
          ]}
        />
        <ProFormTextArea
          name="description"
          label="描述"
          initialValue={currentRow?.description}
          placeholder="请填写应用描述"
          rules={[
            {
              required: true,
              message: '请填写应用描述',
            },
          ]}
        />
        <ProFormRadio.Group
          name="status"
          initialValue={currentRow?.status}
          label="状态"
          options={[
            {
              label: '启用',
              value: 'OK',
            },
            {
              label: '禁用',
              value: 'DISABLED',
            },
          ]}
        />
      </ModalForm>

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<APPtypes.APPItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<APPtypes.APPItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
