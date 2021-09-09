import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormRadio,
  ProFormSelect,
} from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { createUser, editUser, getUserList, deleteUser } from '@/services/UserManage';

const { confirm } = Modal;
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: UserTypes.createUser) => {
  const hide = message.loading('正在添加');
  try {
    const res = await createUser({ ...fields });
    hide();
    if (res.code === 'OK') {
      message.success('添加成功！');
    } else {
      message.error(res.msg);
    }
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
const handleUpdate = async (fields: UserTypes.createUser) => {
  const hide = message.loading('正在配置');
  try {
    const res = await editUser({
      ...fields,
    });
    hide();
    if (res.code === 'OK') {
      message.success('配置成功');
    } else {
      message.error(res.msg);
    }
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
    title: '确定删除该用户吗？',
    icon: <ExclamationCircleOutlined />,
    content: '请确认。',
    okText: '删除',
    okType: 'danger',
    cancelText: '取消',
    onOk: async () => {
      const hide = message.loading('正在删除');
      try {
        const res = await deleteUser({
          id,
        });
        if (res.code === 'OK') {
          if (res.code === 'OK') {
          } else {
          }
        } else {
          message.error(res.msg);
        }
        hide();
        message.success('删除成功');
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

const UserManage: React.FC = () => {
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
  const [currentRow, setCurrentRow] = useState<API.CurrentUser>();
  // const [selectedRowsState, setSelectedRows] = useState<APPtypes.APPItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  // const intl = useIntl();

  const columns: ProColumns<API.CurrentUser>[] = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
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
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '工号',
      dataIndex: 'no',
    },
    {
      title: '部门',
      dataIndex: 'department',
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
          text: '正常',
          status: 'success',
        },
        FORBIDDEN: {
          text: '禁用',
          status: 'Error',
        },
      },
    },
    {
      title: '权限',
      dataIndex: 'access',
      valueEnum: {
        admin: '管理员',
        user: '用户',
      },
    },
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
    <PageContainer header={{ breadcrumb: {} }}>
      <ProTable<API.CurrentUser, TableList.queryParams>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        pagination={{
          pageSize: 10,
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
          const res = await getUserList(params);
          return {
            data: res.data.data,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: res.data.totalItems,
          };
        }}
        columns={columns}
      />

      <ModalForm
        width={500}
        title="创建用户"
        modalProps={{ destroyOnClose: true }}
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.CurrentUser);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          name="username"
          label="用户名"
          placeholder="请填写用户名"
          rules={[
            {
              required: true,
              message: '请填写用户名',
            },
          ]}
        />
        <ProFormText
          name="nickname"
          label="昵称"
          placeholder="请填写昵称"
          rules={[
            {
              required: true,
              message: '请填写昵称',
            },
          ]}
        />
        <ProFormText
          name="no"
          label="工号"
          placeholder="请填写工号"
          rules={[
            {
              required: true,
              message: '请填写工号',
            },
          ]}
        />
        <ProFormText
          name="department"
          label="部门"
          placeholder="请填写部门"
          rules={[
            {
              required: true,
              message: '请填写部门',
            },
          ]}
        />
        <ProFormTextArea name="description" label="描述" placeholder="请填写应用描述" />
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
          const success = await handleUpdate(value as UserTypes.createUser);
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
          name="username"
          label="用户名"
          initialValue={currentRow?.username}
          placeholder="请填写用户名"
          rules={[
            {
              required: true,
              message: '请填写用户名',
            },
          ]}
        />
        <ProFormText
          name="nickname"
          label="昵称"
          placeholder="请填写昵称"
          initialValue={currentRow?.nickname}
          rules={[
            {
              required: true,
              message: '请填写昵称',
            },
          ]}
        />
        <ProFormText
          name="no"
          label="工号"
          placeholder="请填写工号"
          initialValue={currentRow?.no}
          rules={[
            {
              required: true,
              message: '请填写工号',
            },
          ]}
        />
        <ProFormSelect
          options={[
            {
              value: 'admin',
              label: '管理员',
            },
            {
              value: 'user',
              label: '用户',
            },
          ]}
          width="md"
          initialValue={currentRow?.access}
          name="access"
          placeholder="请选择身份权限"
          label="权限"
        />
        <ProFormText
          name="department"
          label="部门"
          placeholder="请填写部门"
          initialValue={currentRow?.department}
          rules={[
            {
              required: true,
              message: '请填写部门',
            },
          ]}
        />
        <ProFormTextArea
          name="description"
          label="描述"
          placeholder="请填写应用描述"
          initialValue={currentRow?.description}
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
              value: 'FORBIDDEN',
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
        {currentRow?.username && (
          <ProDescriptions<API.CurrentUser>
            column={2}
            title={currentRow?.username}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.username,
            }}
            columns={columns as ProDescriptionsItemProps<API.CurrentUser>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default UserManage;
