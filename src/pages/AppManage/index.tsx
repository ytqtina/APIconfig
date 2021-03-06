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
    message.success('添加成功！');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败，请重试！');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: APPtypes.APPItem, id: number) => {
  const hide = message.loading('正在配置');
  try {
    const res = await editAPP({
      ...fields,
      id,
    });
    if (res.code === 'OK') {
      message.success('配置成功');
    } else {
      message.error(res.msg);
    }
    hide();
    return true;
  } catch (error) {
    hide();
    message.error('配置失败，请重试！');
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
        const res = await deleteAPP({
          id,
        });
        if (res.code === 'OK') {
          message.success('删除成功，请刷新');
        } else {
          message.error(res.msg);
        }
        hide();
        return true;
      } catch (error) {
        hide();
        message.error('删除失败！请重试');
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
      hideInDescriptions: true,
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
      title: 'code',
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
      <ProTable<APPtypes.APPItem, TableList.queryParams>
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
        pagination={{
          pageSize: 10,
        }}
        request={async (params, sort) => {
          console.log(sort);
          if (sort) {
            if (sort.createdAt) {
              if (sort.createdAt === 'ascend') {
                params = { ...params, orderCreatedAt: 'ASC' };
              } else {
                params = { ...params, orderCreatedAt: 'DESC' };
              }
            } else if (sort.updatedAt) {
              if (sort.updatedAt === 'ascend') {
                params = { ...params, orderUpdatedAt: 'ASC' };
              } else {
                params = { ...params, orderUpdatedAt: 'DESC' };
              }
            }
          }

          const { data } = await getAPPList(params);
          return {
            data: data.data,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: data.totalItems,
          };
        }}
        columns={columns}
      />

      <ModalForm
        width={500}
        title="新建应用"
        modalProps={{ destroyOnClose: true }}
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
          label="code"
          placeholder="请填写应用code"
          rules={[
            {
              required: true,
              message: '请填写应用code',
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
        onVisibleChange={handleUpdateModalVisible}
        visible={updateModalVisible}
        onFinish={async (value) => {
          const success = await handleUpdate(value as APPtypes.APPItem, currentRow?.id as number);
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
          label="code"
          initialValue={currentRow?.code}
          placeholder="请填写应用code"
          rules={[
            {
              required: true,
              message: '请填写应用code',
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
