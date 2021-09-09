import React, { useEffect, useState, useRef } from 'react';
import ProForm, {
  // ProFormDependency,
  // ProFormFieldSet,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import {
  Popconfirm,
  message,
  Avatar,
  Card,
  Col,
  Button,
  Dropdown,
  Form,
  List,
  Menu,
  Row,
  Select,
  Tooltip,
  Switch,
  PageHeader,
  Space,
  Descriptions,
} from 'antd';
import ProCard from '@ant-design/pro-card';
import {
  PluginConfig,
  PluginName,
  WhiteListConfig,
  Plugin,
  RateLimitConfig,
} from '../../services/PluginManage/data.d';
import { createPlugin, deletePlugin, editPlugin, getPluginList } from '@/services/PluginManage';
import { plugin } from '@/.umi/core/plugin';
import { formatMessage } from '@/.umi/plugin-locale/localeExports';
const { Option } = Select;

const PluginManage = () => {
  const [plugin, setPlugin] = useState<Plugin>();
  const [loading, setLoading] = useState<boolean>(false);
  const [whiteListForm] = Form.useForm();
  const [blackListForm] = Form.useForm();
  const [rateLimitForm] = Form.useForm();
  const [sentinelForm] = Form.useForm();
  const [cacheForm] = Form.useForm();
  const routeId = parseInt(
    unescape(window.location.search.substring(1).split('&')[1].split('=')[1]),
  );
  const path = unescape(window.location.search.substring(1).split('&')[0].split('=')[1]);
  // const timeWindow = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log(plugin);
  // }, [plugin])

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getPluginList({
        routeId,
      });
      if (res.code !== 'OK') {
        message.error(res.msg);
      } else {
        const plugin = res.data || undefined;
        setPlugin(plugin);
      }
    } catch {
      message.error('出错啦，请重试！');
    } finally {
      setLoading(false);
    }
  };

  const create = async () => {
    whiteListForm.setFieldsValue({ whiteList: undefined });
    blackListForm.setFieldsValue({ blackList: undefined });
    rateLimitForm.setFieldsValue({ strategy: 'STANDALONE', qpsValue: 0, scope: 'URI' });
    sentinelForm.setFieldsValue({
      rule: 'EXCEPTION_COUNT',
      rtValue: 0,
      exceptionRatioValue: 0,
      exceptionCountValue: 0,
      timeWindow: 60,
      message: '',
    });
    cacheForm.setFieldsValue({ time: 0 });
    setPlugin({
      routeId: routeId,
      allowLoadBalance: false,
      loadBalanceConfig: '{...}',
      allowAuthToken: false,
      authTokenConfig: '{...}',
      allowWhiteList: false,
      whiteListConfig: '{"whiteList":""}',
      allowBlackList: false,
      blackListConfig: '{"blackList":""}',
      allowRateLimit: false,
      rateLimitConfig: '{"strategy":"STANDALONE","qpsValue":0,"scope":"URI"}',
      allowCache: false,
      cacheConfig: '{"time":0}',
      allowSentinel: false,
      sentinelConfig:
        '{"rule":"EXCEPTION_COUNT","rtValue":0,"exceptionRatioValue":0,"exceptionCountValue":0,"timeWindow":60,"message":""}',
    });
  };

  const save = async () => {
    const newWhiteListConfig = JSON.stringify({
      whiteList: whiteListForm.getFieldValue('whiteList')?.toString() || '',
    });
    const newBlackListConfig = JSON.stringify({
      blackList: blackListForm.getFieldValue('blackList')?.toString() || '',
    });
    const newRateLimitConfig = JSON.stringify(rateLimitForm.getFieldsValue());
    const newSentinelConfig = JSON.stringify(sentinelForm.getFieldsValue());
    const newCacheConfig = JSON.stringify(cacheForm.getFieldsValue());
    const newPlugin = {
      ...plugin,
      whiteListConfig: newWhiteListConfig,
      blackListConfig: newBlackListConfig,
      rateLimitConfig: newRateLimitConfig,
      sentinelConfig: newSentinelConfig,
      cacheConfig: newCacheConfig,
    };
    delete newPlugin.createdAt;
    delete newPlugin.updatedAt;
    const hide = message.loading('正在配置');
    try {
      let res;
      if (newPlugin.id) {
        res = await editPlugin({ ...newPlugin } as Plugin);
      } else {
        res = await createPlugin({ ...newPlugin } as Plugin);
      }
      hide();
      if (res.code !== 'OK') {
        message.error(res.msg);
      } else {
        message.success('配置成功！');
        setPlugin(res.data || undefined);
        fetchData();
      }
      return true;
    } catch (error) {
      hide();
      message.error('配置失败，请重试！');
      return false;
    }
  };

  const removePlugin = async () => {
    const hide = message.loading('正在删除');
    try {
      const res = await deletePlugin({ id: plugin?.id as number });
      hide();
      if (res.code !== 'OK') {
        message.error(res.msg);
      } else {
        message.success('删除成功！');
        setPlugin(undefined);
        fetchData();
      }
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试！');
      return false;
    }
  };

  const WhiteListConfig = () => {
    const config = JSON.parse(plugin?.whiteListConfig as string);
    const list = config.whiteList === '' ? [] : config.whiteList.split(',');
    const children = [];
    for (let i = 0; i < list.length; i++) {
      children.push(
        <Option key={i} value={list[i]}>
          {list[i]}
        </Option>,
      );
    }

    return (
      <ProForm
        form={whiteListForm}
        initialValues={{ whiteList: list }}
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
          submitButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
      >
        <ProFormSelect
          name="whiteList"
          fieldProps={{
            mode: 'tags',
            tokenSeparators: [','],
            allowClear: false,
          }}
          placeholder="无"
          disabled={!plugin?.allowWhiteList}
        >
          {children}
        </ProFormSelect>
      </ProForm>
    );
  };

  const BlackListConfig = () => {
    const config = JSON.parse(plugin?.blackListConfig as string);
    const list = config.blackList === '' ? [] : config.blackList.split(',');
    const children = [];
    for (let i = 0; i < list.length; i++) {
      children.push(
        <Option key={i} value={list[i]}>
          {list[i]}
        </Option>,
      );
    }
    return (
      <ProForm
        form={blackListForm}
        initialValues={{ blackList: list }}
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
          submitButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
      >
        <ProFormSelect
          name="blackList"
          fieldProps={{
            mode: 'tags',
            tokenSeparators: [','],
          }}
          placeholder="无"
          disabled={!plugin?.allowBlackList}
        >
          {children}
        </ProFormSelect>
      </ProForm>
    );
  };

  const RateLimitConfig = () => {
    const config = JSON.parse(plugin?.rateLimitConfig as string);

    return (
      <ProForm
        form={rateLimitForm}
        initialValues={config}
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
          submitButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
      >
        <ProFormSelect
          name="strategy"
          label="限流策略"
          valueEnum={{
            STANDALONE: '单机限流',
            CLUSTER: '集群限流',
          }}
          width="md"
          fieldProps={{ allowClear: false }}
          disabled={!plugin?.allowRateLimit}
        />
        <ProFormDigit
          label="限流阈值"
          name="qpsValue"
          width="sm"
          disabled={!plugin?.allowRateLimit}
        />
        <ProFormSelect
          name="scope"
          label="限流策略"
          valueEnum={{
            URI: 'URI限流',
            IP: 'IP限流',
            URI_IP: 'URI和IP限流',
          }}
          width="md"
          fieldProps={{ allowClear: false }}
          disabled={!plugin?.allowRateLimit}
        />
      </ProForm>
    );
  };

  const SentinelConfig = () => {
    const config = JSON.parse(plugin?.sentinelConfig as string);
    const [ruleType, setRuleType] = useState<'RT' | 'EXCEPTION_RATIO' | 'EXCEPTION_COUNT'>(
      config.rule || 'RT',
    );
    return (
      <ProForm
        form={sentinelForm}
        initialValues={config}
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
          submitButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
      >
        <ProFormSelect
          name="rule"
          label="熔断降级规则"
          valueEnum={{
            RT: '平均响应时间',
            EXCEPTION_RATIO: '异常比例',
            EXCEPTION_COUNT: '异常数量',
          }}
          width="md"
          disabled={!plugin?.allowSentinel}
          fieldProps={{
            allowClear: false,
            onChange: (v) => {
              setRuleType(v);
              if (v === 'EXCEPTION_COUNT' && sentinelForm.getFieldValue('timeWindow') < 60) {
                sentinelForm.setFieldsValue({ timeWindow: 60 });
                message.info('EXCEPTION_COUNT规则的时间窗口可以设置的最小值是1分钟');
              }
            },
          }}
        />
        {(() => {
          switch (ruleType) {
            case 'RT':
              return (
                <ProFormDigit
                  label="平均响应时间阈值(ms)"
                  name="rtValue"
                  width="sm"
                  disabled={!plugin?.allowSentinel}
                />
              );
            case 'EXCEPTION_RATIO':
              return (
                <ProFormDigit
                  label="异常比例阈值"
                  name="exceptionRatioValue"
                  width="sm"
                  disabled={!plugin?.allowSentinel}
                  min={0.0}
                  max={1.0}
                  fieldProps={{ step: 0.1 }}
                />
              );
            case 'EXCEPTION_COUNT':
              return (
                <ProFormDigit
                  label="异常数阈值"
                  name="exceptionCountValue"
                  width="sm"
                  disabled={!plugin?.allowSentinel}
                />
              );
            default:
              return <></>;
          }
        })()}

        <ProFormDigit
          label="时间窗口(s)"
          name="timeWindow"
          width="sm"
          disabled={!plugin?.allowSentinel}
          fieldProps={{
            onChange: (v) => {
              if (sentinelForm.getFieldValue('rule') === 'EXCEPTION_COUNT' && v < 60) {
                sentinelForm.setFieldsValue({ timeWindow: 60 });
                message.info('EXCEPTION_COUNT规则的时间窗口可以设置的最小值是1分钟');
              }
            },
          }}
        />
        <ProFormText name="message" label="提示内容" disabled={!plugin?.allowSentinel} />
      </ProForm>
    );
  };

  const CacheConfig = () => {
    const config = JSON.parse(plugin?.cacheConfig as string);

    return (
      <ProForm
        form={cacheForm}
        initialValues={config || { time: 0 }}
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
          submitButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
      >
        <ProFormDigit label="缓存时间(s)" name="time" width="sm" disabled={!plugin?.allowCache} />
      </ProForm>
    );
  };

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => {
          history.back();
        }}
        title="插件"
        subTitle={path}
        style={{ marginBottom: 24 }}
        extra={[
          <div key="extra">
            {plugin ? (
              <Space>
                {plugin?.id ? (
                  <Popconfirm
                    title="确定要删除该插件吗？"
                    onConfirm={removePlugin}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button key="delete">删除</Button>{' '}
                  </Popconfirm>
                ) : (
                  <Button key="cancel" onClick={() => setPlugin(undefined)}>
                    取消
                  </Button>
                )}
                <Button key="save" type="primary" onClick={save}>
                  保存
                </Button>
              </Space>
            ) : (
              <Button key="create" onClick={create}>
                创建
              </Button>
            )}
          </div>,
        ]}
      >
        {plugin?.id && (
          <Space size={20}>
            <div>更新时间：{plugin?.updatedAt}</div>
            <div>创建时间：{plugin?.createdAt}</div>
          </Space>
        )}
      </PageHeader>
      <List loading={loading}>
        {plugin && (
          <>
            {/* <List.Item key='loadBalance'>
            <ProCard
              colSpan={24}
              hoverable
              extra={<Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={plugin?.allowLoadBalance} onChange={(v) => { setPlugin({ ...plugin, allowLoadBalance: v }) }} />}
              title="负载均衡">
              <div>
                {plugin?.loadBalanceConfig}
              </div>
            </ProCard>
          </List.Item> */}
            {/* <List.Item key='authToken'>
            <ProCard
              colSpan={24}
              hoverable
              extra={<Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={plugin?.allowAuthToken} onChange={(v) => { setPlugin({ ...plugin, allowAuthToken: v }) }} />}
              title="鉴权">
              <div>
                {plugin?.authTokenConfig}
              </div>
            </ProCard>
          </List.Item> */}
            <List.Item key="whiteList">
              <ProCard
                colSpan={24}
                hoverable
                extra={
                  <Switch
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                    defaultChecked={plugin?.allowWhiteList}
                    onChange={(v) => {
                      setPlugin({ ...plugin, allowWhiteList: v });
                    }}
                  />
                }
                title="白名单"
              >
                <WhiteListConfig />
              </ProCard>
            </List.Item>
            <List.Item key="blackList">
              <ProCard
                colSpan={24}
                hoverable
                extra={
                  <Switch
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                    defaultChecked={plugin?.allowBlackList}
                    onChange={(v) => {
                      setPlugin({ ...plugin, allowBlackList: v });
                    }}
                  />
                }
                title="黑名单"
              >
                <BlackListConfig />
              </ProCard>
            </List.Item>
            <List.Item key="rateLimit">
              <ProCard
                colSpan={24}
                hoverable
                extra={
                  <Switch
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                    defaultChecked={plugin?.allowRateLimit}
                    onChange={(v) => {
                      setPlugin({ ...plugin, allowRateLimit: v });
                    }}
                  />
                }
                title="限流"
              >
                <RateLimitConfig />
              </ProCard>
            </List.Item>
            <List.Item key="cache">
              <ProCard
                colSpan={24}
                hoverable
                extra={
                  <Switch
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                    defaultChecked={plugin?.allowCache}
                    onChange={(v) => {
                      setPlugin({ ...plugin, allowCache: v });
                    }}
                  />
                }
                title="缓存"
              >
                <CacheConfig />
              </ProCard>
            </List.Item>
            <List.Item key="sentinel">
              <ProCard
                colSpan={24}
                hoverable
                extra={
                  <Switch
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                    defaultChecked={plugin?.allowSentinel}
                    onChange={(v) => {
                      setPlugin({ ...plugin, allowSentinel: v });
                    }}
                  />
                }
                title="熔断器"
              >
                <SentinelConfig />
              </ProCard>
            </List.Item>
          </>
        )}
      </List>
    </div>
  );
};

export default PluginManage;
