import { useState, useEffect } from 'react';
import { message, Tabs, Form, Select, Input, PageHeader, Divider } from 'antd';
import ProCard from '@ant-design/pro-card';
import ParamTable from './components/ParamTable';
import { QuestionOutlined } from '@ant-design/icons';
import { queryRoute } from '@/services/RoutesCenter';
const { TabPane } = Tabs;
const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

export default () => {
  enum method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
  }
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<string>('Response');
  const [form] = Form.useForm();
  const [prefix, setPrefix] = useState<method>(method.GET);
  const [queryParams, setQueryParams] = useState<{ key: string; value: string }[]>([]);
  const [request, setRequest] = useState<Routetypes.routeRequest>();
  const [response, setResponse] = useState<Routetypes.routeResponse>();
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([]);
  const path = unescape(window.location.search.substring(1).split('=')[1]);

  useEffect(() => {
    let str = '';
    for (let i = 0; i < queryParams.length; i++) {
      if (i > 0) str = str.concat('&');
      str = str.concat(`${queryParams[i].key}=${queryParams[i].value}`);
    }
    form.setFieldsValue({ queryString: str });
  }, [queryParams]);

  const changePrefix = (value: method) => {
    setPrefix(value);
  };

  const getQueryParams = (value: any) => {
    const result = value.filter((param: { id: number; key?: string; value?: string }) => {
      return param.key && param.value;
    });
    if (result.length > 0) setQueryParams(result);
  };

  const getHeaders = (value: any) => {
    const result = value.filter((param: { id: number; key?: string; value?: string }) => {
      return param.key || param.value;
    });
    if (result.length > 0) setHeaders(result);
  };

  const send = async () => {
    setLoading(true);
    let headersObj = {};
    let queryObj = {};
    headers.forEach((param) => {
      headersObj[param.key] = param.value;
    });
    queryParams.forEach((param) => {
      queryObj[param.key] = param.value;
    });
    const params = {
      method: prefix,
      uri: `http://127.0.0.1:9000${path}`,
      params: queryObj,
      headers: headersObj,
      body: prefix === 'GET' ? undefined : form.getFieldValue('body'),
    };
    try {
      const res = await queryRoute({ ...params });
      if (res.code === 'OK') {
        try {
          console.log(JSON.stringify(JSON.parse(res.data.data), null, '\t'));
        } catch {
          console.log(res.data.data);
        }
        setResponse(res.data);
        setRequest(params);
      } else {
        message.error(res.msg);
      }
    } catch (e) {
      message.error('出错啦，请重试！' + e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ProCard
        title={
          <PageHeader
            className="site-page-header"
            onBack={() => {
              history.back();
            }}
            title="运行"
            subTitle={path}
            style={{ padding: 0 }}
          />
        }
        headerBordered
        split="vertical"
      >
        <ProCard
          colSpan="50%"
          split="horizontal"
          style={{ height: 'calc(100vh - 172px)', overflow: 'auto' }}
        >
          <Form form={form} name="queryForm">
            <ProCard>
              <div>
                <InputGroup compact style={{ marginBottom: -24 }}>
                  <Select value={prefix} onChange={changePrefix} style={{ width: '20%' }}>
                    <Option value="GET">GET</Option>
                    <Option value="POST">POST</Option>
                    <Option value="PUT">PUT</Option>
                    <Option value="DELETE">DELETE</Option>
                  </Select>
                  <FormItem style={{ width: '80%' }} name="queryString">
                    <Input.Search
                      placeholder="query string"
                      onSearch={send}
                      prefix={<QuestionOutlined />}
                      enterButton="Send"
                    />
                  </FormItem>
                </InputGroup>
              </div>
            </ProCard>
            <Divider type="horizontal" style={{ margin: 0 }} />
            <ProCard title="Query Parameters">
              <div style={{ margin: '-12px -24px 0' }}>
                <ParamTable getData={getQueryParams} />
              </div>
            </ProCard>

            {prefix !== 'GET' && (
              <>
                {' '}
                <Divider type="horizontal" style={{ margin: 0 }} />
                <ProCard title="Body">
                  <div style={{ marginTop: '-12px' }}>
                    <FormItem name="body">
                      <Input.TextArea autoSize={{ minRows: 5, maxRows: 7 }} />
                    </FormItem>
                  </div>
                </ProCard>
              </>
            )}
            <Divider type="horizontal" style={{ margin: 0 }} />
            <ProCard title="Headers">
              <div style={{ margin: '-12px -24px 0' }}>
                <ParamTable getData={getHeaders} />
              </div>
            </ProCard>
          </Form>
        </ProCard>
        <ProCard loading={loading} colSpan="50%">
          <div style={{ height: 'calc(100vh - 172px)', overflow: 'auto', margin: '-24px' }}>
            <Tabs activeKey={type} onChange={setType}>
              <TabPane
                key="Response"
                tab="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Response&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                style={{ padding: '0 24px', wordWrap: 'break-word' }}
              >
                <p>
                  <span style={{ color: '#880000' }}>{response?.statusCode}&nbsp;&nbsp;</span>
                  {response?.reasonPhrase}
                </p>

                <div>
                  {(() => {
                    const arr = [];
                    for (let key in response?.headers) {
                      arr.push(
                        <p key={key}>
                          <span style={{ fontWeight: 'bolder' }}>{key}:&nbsp;&nbsp;</span>
                          <span>{response?.headers[key]}</span>
                        </p>,
                      );
                    }
                    return arr;
                  })()}
                </div>
                <br />
                <div style={{ whiteSpace: 'pre-wrap' }}>
                  {(() => {
                    if (response) {
                      let res = response?.data;
                      try {
                        res = JSON.stringify(JSON.parse(res), null, '\t');
                      } catch {
                      } finally {
                        return res;
                      }
                    }
                  })()}
                </div>
              </TabPane>
              <TabPane
                key="Request"
                tab="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Request&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                style={{ padding: '0 24px', wordWrap: 'break-word' }}
              >
                <p>
                  <span style={{ fontWeight: 'bolder' }}>{request?.method}</span>&nbsp;&nbsp;
                  <span style={{ color: '#880000' }}>{request?.uri}</span>
                </p>
                <div>
                  {(() => {
                    const arr = [];
                    for (let key in request?.headers) {
                      arr.push(
                        <p key={key}>
                          <span style={{ fontWeight: 'bolder' }}>{key}:&nbsp;&nbsp;</span>
                          <span>{request?.headers[key]}</span>
                        </p>,
                      );
                    }
                    return arr;
                  })()}
                </div>
                <div>
                  {(() => {
                    const arr = [];
                    for (let key in request?.params) {
                      arr.push(
                        <p key={key}>
                          <span style={{ fontWeight: 'bolder' }}>{key}:&nbsp;&nbsp;</span>
                          <span>{request?.params[key]}</span>
                        </p>,
                      );
                    }
                    return arr;
                  })()}
                </div>
                <br />
                <div>{request?.body}</div>
              </TabPane>
            </Tabs>
          </div>
        </ProCard>
      </ProCard>
    </>
  );
};
