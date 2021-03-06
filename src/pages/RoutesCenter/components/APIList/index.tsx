import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import {
  Typography,
  Collapse,
  Tag,
  Space,
  message,
  Tooltip,
  Modal,
  Spin,
  Form,
  Drawer,
  Button,
  Input,
  Popconfirm,
} from 'antd';
import { history } from 'umi';
import { ModalForm, ProFormText, ProFormTextArea, ProFormRadio } from '@ant-design/pro-form';
import { BetaSchemaForm, ProFormSelect, ProFormSlider } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { ProFormColumnsType, ProFormLayoutType } from '@ant-design/pro-form';
import type { FormInstance } from '@ant-design/pro-form';
import {
  ExclamationCircleOutlined,
  CloseOutlined,
  EditOutlined,
  PlayCircleOutlined,
  CopyOutlined,
  ApartmentOutlined,
  SendOutlined,
  StopOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import {
  createRoute,
  deleteRoute,
  editRoute,
  getRouteDetail,
  getRouteList,
} from '@/services/RoutesCenter';
import copy from 'copy-to-clipboard';

const { Panel } = Collapse;
const { Text, Title } = Typography;
const { confirm } = Modal;

interface CRef {
  addRoute: () => void;
}
interface Props extends CRef {
  projectId: number;
  projectCode: string;
  keyword?: string;
}

export default forwardRef<CRef, Props>(({ projectId, projectCode, keyword }, ref) => {
  useImperativeHandle(ref, () => ({ addRoute }));
  // const { projectId, projectCode, keyword } = props;
  const [apiList, setApiList] = useState<Routetypes.RouteItem[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [env, setEnv] = useState<string>();
  const [publishModalVisible, setPublishModalVisible] = useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(false);
  const [currentPanel, setCurrentPanel] = useState<number>();
  const [protocol, setProtocol] = useState<'HTTP' | 'DUBBO'>();
  const [visible, setVisible] = useState(false);
  const [apiForm] = Form.useForm();
  const [formData, setFormData] = useState<any>();

  const formRef = useRef<FormInstance>();
  // const actionRef = useRef();

  useEffect(() => {
    fetchData();
  }, [projectId, keyword]);

  useEffect(() => {
    setEditProtocol();
  }, [currentPanel]);

  const setEditProtocol = () => {
    const current = apiList?.[(currentPanel as number) - 1];
    apiForm.setFieldsValue(current);
    setProtocol(current?.protocol);
  };

  const fetchData = async () => {
    setLoading(true);
    setCurrentPanel(undefined);
    try {
      let res = await getRouteList({ appId: projectId, keyword });
      if (res.code !== 'OK') {
        message.error(res.msg);
      } else {
        res.data.data.forEach((api) => {
          api.tags = (api?.tags as string)?.split(',');
        });
        setApiList([...res.data.data]);
      }
    } catch {
      message.error('??????????????????');
    } finally {
      setLoading(false);
    }
  };

  const color = new Map();
  color.set('GET', 'blue');
  color.set('POST', 'green');
  color.set('DELETE', 'magenta');
  color.set('PUT', 'purple');

  // useEffect(()=>{

  // },[visible])
  const addRoute = () => {
    setTimeout(() => {
      setCurrentPanel(undefined);
      setProtocol('DUBBO');
    }, 0);
    setVisible(true);
    setEditable(true);
    // apiForm.setFieldsValue({
    //   appId: projectId,
    //   protocol: 'DUBBO',
    //   method: 'GET',
    //   uri: `/${projectCode}`,
    //   path: '',
    //   version: '1.0.0',
    //   application: projectCode,
    //   interfaceClass: '',
    //   methodName: '',
    //   parameterTypes: '',
    //   args: '',
    //   status: 'OK',
    //   env: 'DEV',
    // });
    // });
  };

  const removeRoute = (api: any) => {
    confirm({
      title: '???????????????????????????',
      icon: <ExclamationCircleOutlined />,
      content: '????????????',
      okText: '??????',
      okType: 'danger',
      cancelText: '??????',
      onOk: async () => {
        try {
          await deleteRoute({ id: api.id });
          message.success('???????????????');
          fetchData();
        } catch (error) {
          message.error('???????????????????????????');
        }
      },
      onCancel() {},
    });
  };

  const cancelPublish = () => {
    formRef?.current?.resetFields();
    setEnv(undefined);
    setEditProtocol();
    setEditable(false);
    setPublishModalVisible(false);
  };

  const columns: ProFormColumnsType<Routetypes.RouteItem>[] = [
    {
      dataIndex: 'id',
      formItemProps: { style: { display: 'none' } },
      hideInForm: visible,
    },
    {
      dataIndex: 'createdAt',
      hideInForm: visible,
      formItemProps: { style: { display: 'none' } },
    },
    {
      title: '??????',
      key: 'version',
      dataIndex: 'version',
      readonly: !visible,
      width: 'sm',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '??????',
      key: 'env',
      dataIndex: 'env',
      valueType: 'select',
      readonly: true,
      valueEnum: {
        DEV: 'DEV',
        PRE: 'PRE',
        GRAY: 'GRAY',
        PROD: 'PROD',
      },
    },
    {
      title: 'uri',
      dataIndex: 'path',
      render: (path) => `/${projectCode}${path}`,
      width: 'md',
      readonly: true,
    },
    {
      title: '??????',
      key: 'path',
      dataIndex: 'path',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
      width: 'md',
      readonly: !editable,
    },
    {
      title: '??????',
      key: 'method',
      dataIndex: 'method',
      valueType: 'select',
      valueEnum: {
        GET: 'GET',
        POST: 'POST',
        DELETE: 'DELETE',
        PUT: 'PUT',
      },
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
      width: 'sm',
      readonly: !editable,
    },
    {
      title: '??????',
      key: 'protocol',
      dataIndex: 'protocol',
      valueType: 'select',
      valueEnum: {
        DUBBO: 'DUBBO',
        HTTP: 'HTTP',
      },
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
      fieldProps: {
        onChange: (protocol: 'HTTP' | 'DUBBO') => setProtocol(protocol),
      },
      width: 'sm',
      readonly: !editable,
    },

    {
      title: '????????????',
      key: 'timeout',
      dataIndex: 'timeout',
      valueType: 'digit',
      readonly: !editable,
    },
    {
      title: '??????',
      key: 'status',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        DISABLED: {
          text: '??????',
          status: 'Error',
        },
        OK: {
          text: '??????',
          status: 'Success',
        },
      },
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
      width: 'sm',
      readonly: !editable,
    },
    {
      title: 'Http??????',
      key: 'source',
      dataIndex: 'source',
      readonly: !editable,
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
      width: 'md',
      hideInForm: protocol !== 'HTTP',
    },
    {
      title: 'RPC??????',
      key: 'application',
      dataIndex: 'application',
      readonly: true,
      // formItemProps: {
      //   rules: [
      //     {
      //       required: true,
      //     },
      //   ],
      // },
      fieldProps: {
        value: `${projectCode}`,
      },
      width: 'md',
      hideInForm: protocol !== 'DUBBO',
    },
    {
      title: 'RPC??????',
      key: 'interfaceClass',
      dataIndex: 'interfaceClass',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
      width: 'md',
      readonly: !editable,
      hideInForm: protocol !== 'DUBBO',
    },
    {
      title: 'RPC?????????',
      key: 'methodName',
      dataIndex: 'methodName',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
      width: 'md',
      readonly: !editable,
      hideInForm: protocol !== 'DUBBO',
    },
    {
      title: 'RPC??????',
      valueType: 'formList',
      dataIndex: 'parameters',
      hideInForm: protocol !== 'DUBBO',
      columns: [
        {
          valueType: 'group',
          columns: [
            {
              title: '?????????',
              key: 'parameterName',
              formItemProps: {
                rules: [
                  {
                    required: true,
                  },
                ],
              },

              readonly: !editable,
            },
            {
              title: '????????????',
              key: 'parameterType',
              formItemProps: {
                rules: [
                  {
                    required: true,
                  },
                ],
              },
              readonly: !editable,
            },
            {
              title: '??????',
              key: 'parameterField',
              initialValue: '',
              readonly: !editable,
            },
          ],
        },
      ],
    },
    {
      title: '??????',
      key: 'tags',
      dataIndex: 'tags',
      readonly: !editable,
      valueType: 'select',
      // renderText: (text) => text.split(','),
      // render: (text, record) => record?.tags?.split(','),
      fieldProps: {
        mode: 'tags',
        tokenSeparators: [','],
      },
    },
    {
      title: '??????',
      key: 'description',
      dataIndex: 'description',
      readonly: !editable,
    },
  ];
  const toolsKit = (iconColor: string, url: string) => (
    <Space>
      <Popconfirm
        title={<Text code>http://http://localhost:9000{url}</Text>}
        okText="????????????"
        icon={
          <Title level={5}>
            <SmileOutlined /> ??????
          </Title>
        }
        onConfirm={(event) => {
          event?.stopPropagation();
          if (copy(`http://http://localhost:9000${url}`)) {
            message.info('????????????,???????????????');
          } else {
            message.error('????????????');
          }
        }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Tooltip title="??????">
          <CopyOutlined
            style={{ color: iconColor }}
            onClick={(event) => {
              event.stopPropagation();
            }}
          />
        </Tooltip>
      </Popconfirm>
      <Tooltip title="??????">
        <PlayCircleOutlined
          style={{ color: iconColor }}
          onClick={(event) => {
            event.stopPropagation();
            window.open(`/run?route=/${projectCode}${url}&routeId=${projectId}`);
            // history.push(`/run?route=/${projectCode}${url}`);
          }}
        />
      </Tooltip>

      <Tooltip title="????????????">
        <ApartmentOutlined
          style={{ color: iconColor }}
          onClick={(event) => {
            event.stopPropagation();
            window.open(`/plugin?route=/${projectCode}${url}&routeId=${projectId}`);
            // history.push(`/plugin?route=/${projectCode}${url}&routeId=${projectId}`);
          }}
        />
      </Tooltip>
    </Space>
  );
  const apiDetailForm = (api: any) => (
    <>
      {!visible && (
        <div style={{ textAlign: 'right' }}>
          {editable ? (
            <Button
              icon={<StopOutlined />}
              style={{}}
              onClick={() => {
                apiForm.resetFields();
                setEditable(false);
                setProtocol(api.protocol);
              }}
            >
              ??????
            </Button>
          ) : (
            <Button icon={<EditOutlined />} onClick={() => setEditable(true)}>
              ??????
            </Button>
          )}
        </div>
      )}

      <BetaSchemaForm
        // preserve={false}
        submitter={{
          render: () => {
            return [
              <div style={{ textAlign: 'right' }}>
                {editable ? (
                  <Space>
                    <Button
                      key="reset"
                      onClick={() => {
                        apiForm.resetFields();
                        setProtocol(api.protocol);
                      }}
                    >
                      ??????
                    </Button>
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      onClick={() => {
                        apiForm.validateFields().then((value) => {
                          setPublishModalVisible(true);
                          setVisible(false);
                          setFormData(value);
                        });
                      }}
                    >
                      ??????
                    </Button>
                  </Space>
                ) : (
                  <></>
                )}
              </div>,
            ];
          },
        }}
        layout={editable ? 'vertical' : 'horizontal'}
        labelCol={{ span: 5 }}
        style={editable && !visible ? { padding: '0 100px' } : {}}
        onFinish={async (values) => {
          console.log(values);
        }}
        form={apiForm}
        initialValues={api}
        columns={columns}
      />
    </>
  );
  return (
    <>
      {loading ? (
        <div style={{ textAlign: 'center', paddingTop: 150 }}>
          <Spin spinning={loading} size="large"></Spin>
        </div>
      ) : (
        <Collapse
          accordion
          destroyInactivePanel
          activeKey={currentPanel}
          onChange={(i) => {
            console.log(i);
            // console.log(apiList?.[parseInt[i?.[0]]]);
            // setCurrentApi(apiList?.[parseInt(i?.[0])]);
            setCurrentPanel(parseInt(i?.[0]));
            setEditable(false);
          }}
        >
          {apiList?.map((api, index) => {
            return (
              <Panel
                showArrow={false}
                header={
                  <Space>
                    <Tag color={color.get(api.method)}>{api.method}</Tag>
                    {api.path}
                    {toolsKit(color.get(api.method), api.path)}
                  </Space>
                }
                key={index + 1}
                extra={
                  <Space>
                    <Text type="secondary">{api.description}</Text>
                    <Tooltip title="??????">
                      <CloseOutlined
                        onClick={(event) => {
                          event.stopPropagation();
                          removeRoute(api);
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
              >
                {apiDetailForm(api)}
              </Panel>
            );
          })}
        </Collapse>
      )}
      <ModalForm
        width={500}
        formRef={formRef}
        title="??????"
        visible={publishModalVisible}
        style={{ zIndex: 5 }}
        modalProps={{
          onCancel: cancelPublish,
        }}
        onFinish={async (values) => {
          const params = {
            ...formData,
            env: values.env,
            tags: formData.tags?.toString(),
            uri: `/${projectCode}${formData.path}`,
            application: formData.protocol === 'DUBBO' && projectCode,
            appId: projectId,
          };

          try {
            if (formData.createdAt) {
              delete params.createdAt;
              delete params.updatedAt;
              console.log(params);
              await editRoute(params);
            } else {
              console.log(params);
              await createRoute(params);
            }
            message.success('????????????');
            cancelPublish();
            fetchData();
            return true;
          } catch {
            message.error('????????????????????????');
            return false;
          }
          return true;
        }}
        onValuesChange={(changeValues) => {
          if (changeValues.env) {
            setEnv(changeValues.env);
          }
        }}
      >
        <Form.Item>
          <ProFormSelect
            name="env"
            label="????????????"
            valueEnum={{
              DEV: 'DEV',
              PRE: 'PRE',
              GRAY: 'GRAY',
              PROD: 'PROD',
            }}
            placeholder="????????????"
            rules={[{ required: true, message: '?????????????????????' }]}
          />
        </Form.Item>
        {env === 'GRAY' && (
          <Form.Item>
            <ProFormSlider
              name="gray"
              label="??????"
              width="lg"
              marks={{
                0: '0%',
                10: '10%',
                50: '50%',
                100: '100%',
              }}
            />
          </Form.Item>
        )}
      </ModalForm>

      <Drawer
        title="????????????"
        placement="right"
        width={800}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        {apiDetailForm({
          appId: projectId,
          protocol: 'DUBBO',
          method: 'GET',
          uri: `/${projectCode}`,
          path: '',
          version: '1.0.0',
          application: projectCode,
          interfaceClass: '',
          methodName: '',
          parameter: [],
          status: 'OK',
          env: 'DEV',
        })}
      </Drawer>
    </>
  );
});
