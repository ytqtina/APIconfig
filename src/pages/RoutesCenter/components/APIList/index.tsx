import React, { useState, useEffect } from 'react';
import { Typography, Collapse, Tag, Space, message, Tooltip, Modal } from 'antd';
import {
  ExclamationCircleOutlined,
  CloseOutlined,
  EditOutlined,
  PlayCircleOutlined,
  CopyOutlined,
} from '@ant-design/icons';

const { Panel } = Collapse;
const { Text } = Typography;
const { confirm } = Modal;
export default (props: any) => {
  const { projectId } = props;
  const [apiList, setApiList] = useState<any[]>();
  useEffect(() => {
    setApiList([
      { method: 'get', url: '/iii/iii', comment: '接口描述' },
      { method: 'post', url: '/ooo', comment: '接口描述' },
      { method: 'delete', url: '/jjjj/ll', comment: '接口描述' },
      { method: 'put', url: '/jl/jkjkkk', comment: '接口描述' },
    ]);
  }, []);
  const color = new Map();
  color.set('get', 'blue');
  color.set('post', 'green');
  color.set('delete', 'magenta');
  color.set('put', 'purple');

  const deleteRoute = (api: any) => {
    confirm({
      title: '确定删除该路由吗？',
      icon: <ExclamationCircleOutlined />,
      content: '请确认。',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        message.info(`删除成功${api.url}`);
      },
      onCancel() {},
    });
  };
  const toolsKit = (iconColor: string) => (
    <Space>
      <Tooltip title="复制">
        <CopyOutlined
          style={{ color: iconColor }}
          onClick={(event) => {
            event.stopPropagation();
            message.info('复制成功');
          }}
        />
      </Tooltip>
      <Tooltip title="运行">
        <PlayCircleOutlined
          style={{ color: iconColor }}
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      </Tooltip>

      <Tooltip title="编辑">
        <EditOutlined
          style={{ color: iconColor }}
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      </Tooltip>
    </Space>
  );
  return (
    <Collapse accordion>
      {apiList?.map((api) => {
        return (
          <Panel
            showArrow={false}
            header={
              <Space>
                <Tag color={color.get(api.method)}>{api.method}</Tag>
                {api.url}
                {toolsKit(color.get(api.method))}
              </Space>
            }
            key={api.url}
            extra={
              <Space>
                <Text type="secondary">{api.comment}</Text>
                <Tooltip title="删除">
                  <CloseOutlined
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteRoute(api);
                    }}
                  />
                </Tooltip>
              </Space>
            }
          >
            <p>{projectId}</p>
          </Panel>
        );
      })}
    </Collapse>
  );
};
