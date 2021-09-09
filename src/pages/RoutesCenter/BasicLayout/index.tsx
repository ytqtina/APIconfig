import React, { useState, useEffect, useRef } from 'react';
import { FormattedMessage } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { Space, Button, Input, Layout, PageHeader, message, Spin, Form } from 'antd';
import { ModalForm, ProFormText, ProFormTextArea, ProFormRadio } from '@ant-design/pro-form';
import { ProFormSelect, ProFormSlider } from '@ant-design/pro-form';
import type { FormInstance } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import {} from '@ant-design/icons';
import { createAPP, getAPPList } from '@/services/AppManage';
import ProjectCard from '../components/ProjectCard';
import APIList from '../components/APIList';

const { Search } = Input;
const { Content, Sider } = Layout;

interface CRef {
  addRoute: () => void;
}
export default () => {
  const [projectList, setProjectList] = useState<any>([]);
  const [selectedProject, setSelectedProject] = useState<any>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [allList, setAllList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageNum, setPageNum] = useState<number>(1);
  const [appKeyword, setAppKeyword] = useState<string>();
  const [routeKeyword, setRouteKeyword] = useState<string>();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const apiList = useRef<CRef>(null);
  // const [env, setEnv] = useState<string>();
  // const formRef = useRef<FormInstance>();
  const actionRef = useRef<ActionType>();

  useEffect(() => {
    shift();
  }, [allList]);

  useEffect(() => {
    fetchData();
    console.log(appKeyword);
  }, [appKeyword]);

  const shift = () => {
    const showList = [...allList];
    const starList: number[] = JSON.parse(window.localStorage.getItem('starList') as string);
    for (let i = starList.length - 1; i >= 0; i -= 1) {
      for (let j = 0; j < showList.length; j += 1) {
        if (showList[j].id === starList[i]) {
          showList.unshift(showList[j]);
          showList.splice(j + 1, 1);
          break;
        }
      }
    }
    setProjectList(showList);
  };

  const addRoute = () => {
    apiList?.current?.addRoute();
  };

  const handleAdd = async (fields: APPtypes.APPItem) => {
    const hide = message.loading('正在添加');
    try {
      const res = await createAPP({ ...fields });
      hide();
      if (res.code !== 'OK') {
        message.error(res.msg);
      } else {
        message.success('添加成功！');
        fetchData();
      }
      return true;
    } catch (error) {
      hide();
      message.error('添加失败，请重试！');
      return false;
    }
  };

  const searchKeyword = async (keyword: string) => {
    if (typeof keyword === 'string') {
      if (keyword.trim() !== '') {
        setPageNum(1);
        // setAllList([]);
        setAppKeyword(keyword);
      } else if (appKeyword !== '') {
        setPageNum(1);
        // setAllList([]);
        setAppKeyword(undefined);
      }
    }
  };

  const searchRoutes = async (keyword: string) => {
    if (typeof keyword === 'string') {
      if (keyword.trim() !== '') {
        console.log(keyword);
        setRouteKeyword(keyword);
      } else if (routeKeyword !== '') {
        setRouteKeyword(undefined);
      }
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const keyword = appKeyword;
    setPageNum(pageNum + 1);
    try {
      const res = await getAPPList({ current: pageNum, pageSize: 10, keyword });
      if (pageNum === 1) {
        setAllList([...res.data.data]);
      } else {
        setAllList([...allList, ...res.data.data]);
      }
      setTotalAmount(res.data.totalItems);
    } catch {
      message.error('出错啦，请重试！');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="components-grid-demo-sort">
      <Layout>
        <Sider
          width={300}
          style={{
            width: 300,
            position: 'fixed',
            background: 'transparent',
          }}
        >
          <PageHeader
            style={{ padding: 0 }}
            extra={[
              <Space
                style={{ padding: '4px 12px 16px', borderBottom: '1px solid lightgray' }}
                key="leftHeader"
              >
                <Search placeholder="搜索" onSearch={(value) => searchKeyword(value)} />
                <Button
                  key="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    handleModalVisible(true);
                  }}
                >
                  <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
                </Button>
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
              </Space>,
            ]}
          >
            <Spin spinning={loading} size="large">
              <Content
                style={{
                  height: 'calc(100vh - 112px)',
                  overflow: 'auto',
                  marginTop: -16,
                }}
              >
                {projectList.map((project: any) => {
                  return (
                    <ProjectCard
                      onClick={() => {
                        setSelectedProject({ ...project });
                        setRouteKeyword(undefined);
                      }}
                      key={Math.random()}
                      selected={project.id === selectedProject?.id}
                      collect={shift}
                      project={project}
                    />
                  );
                })}
                <div style={{ textAlign: 'center' }}>
                  {projectList.length < totalAmount && projectList.length > 0 && (
                    <Button
                      icon={<PlusOutlined />}
                      type="dashed"
                      style={{ background: 'transparent', marginBottom: '20px' }}
                      onClick={fetchData}
                    >
                      点击加载更多
                    </Button>
                  )}
                </div>
              </Content>{' '}
            </Spin>
          </PageHeader>
        </Sider>

        <Layout style={{ marginLeft: 300, borderLeft: '1px solid lightgray' }}>
          <PageHeader
            style={{ padding: 0 }}
            extra={[
              <Space style={{ padding: 12, paddingRight: 30 }} key="rightHeader">
                <Button onClick={addRoute}>添加路由</Button>
                <Search placeholder="搜索" onSearch={(value) => searchRoutes(value)} />
              </Space>,
            ]}
          >
            <Content
              style={{
                height: 'calc(100vh - 112px)',
                overflow: 'auto',
                marginTop: -12,
                borderTop: '1px solid lightgray',
              }}
            >
              <div style={{ padding: 24 }}>
                {selectedProject ? (
                  <div>
                    <APIList
                      ref={apiList}
                      addRoute={addRoute}
                      projectId={selectedProject.id}
                      projectCode={selectedProject.code}
                      keyword={routeKeyword}
                    />
                  </div>
                ) : (
                  <h2>请选择项目</h2>
                )}
              </div>
            </Content>
          </PageHeader>
        </Layout>
      </Layout>
    </div>
  );
};
