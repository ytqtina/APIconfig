import React, { useState, useEffect } from 'react';
import { Space, Button, Input, Layout, PageHeader, message } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { ProFormSelect, ProFormSlider } from '@ant-design/pro-form';
import {} from '@ant-design/icons';

import ProjectCard from '../components/ProjectCard';

import {} from '@ant-design/icons';
import APIList from '../components/APIList';

const { Search } = Input;
const { Content, Sider } = Layout;
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export default () => {
  const [projectList, setProjectList] = useState<any>([]);
  const [selectedProject, setSelectedProject] = useState<any>();
  const list = [
    { name: 'test1', id: '#12345', updatedAt: '2021-02-02' },
    { name: 'test2', id: '#12346', updatedAt: '2021-02-02' },
    { name: 'test3', id: '#12347', updatedAt: '2021-02-02' },
    { name: 'test4', id: '#43217', updatedAt: '2021-02-02' },
    { name: 'test5', id: '#12375', updatedAt: '2021-02-02' },
    { name: 'test6', id: '#43295', updatedAt: '2021-02-02' },
    { name: 'test7', id: '#18845', updatedAt: '2021-02-02' },
    { name: 'test8', id: '#43285', updatedAt: '2021-02-02' },
    { name: 'test9', id: '#17345', updatedAt: '2021-02-02' },
    { name: 'test10', id: '#43255', updatedAt: '2021-02-02' },
    { name: 'test11', id: '#12645', updatedAt: '2021-02-02' },
    { name: 'test12', id: '#43245', updatedAt: '2021-02-02' },
  ];
  const shift = () => {
    const showList = [...list];
    const starList: string[] = JSON.parse(window.localStorage.getItem('starList') as string);
    for (let i = starList.length - 1; i >= 0; i -= 1) {
      for (let j = 0; j < showList.length; j += 1) {
        if (showList[j].name === starList[i]) {
          showList.unshift(showList[j]);
          showList.splice(j + 1, 1);
          break;
        }
      }
    }
    setProjectList(showList);
  };

  useEffect(() => {
    setProjectList(list);
    shift();
  }, []);

  const onSearch = () => {};

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
              <Space style={{ padding: 12 }} key="leftHeader">
                <Search placeholder="搜索" onSearch={onSearch} />
                <ModalForm<{
                  name: string;
                }>
                  width={500}
                  title="创建项目"
                  trigger={<Button>创建</Button>}
                  modalProps={{
                    onCancel: () => console.log('run'),
                  }}
                  onFinish={async (values) => {
                    await waitTime(2000);
                    console.log(values.name);
                    message.success('提交成功');
                    return true;
                  }}
                >
                  <ProFormText name="name" label="项目名称" placeholder="请输入项目名称" />
                </ModalForm>
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
              <div>
                {projectList.map((project) => {
                  return (
                    <ProjectCard
                      onClick={() => {
                        setSelectedProject({ ...project });
                      }}
                      key={project.name}
                      selected={project.id === selectedProject?.id}
                      collect={shift}
                      project={project}
                    />
                  );
                })}
              </div>
            </Content>
          </PageHeader>
        </Sider>

        <Layout style={{ marginLeft: 300, borderLeft: '1px solid lightgray' }}>
          <PageHeader
            style={{ padding: 0 }}
            extra={[
              <Space style={{ padding: 12, paddingRight: 30 }} key="rightHeader">
                <ModalForm<{
                  name: string;
                }>
                  width={500}
                  title="添加路由"
                  trigger={<Button>添加路由</Button>}
                  modalProps={{
                    onCancel: () => console.log('run'),
                  }}
                  onFinish={async (values) => {
                    await waitTime(2000);
                    console.log(values.name);
                    message.success('提交成功');
                    return true;
                  }}
                ></ModalForm>
                <ModalForm
                  width={500}
                  title="发布"
                  trigger={<Button>批量发布</Button>}
                  modalProps={{
                    onCancel: () => console.log('run'),
                  }}
                  onFinish={async (values) => {
                    await waitTime(2000);
                    console.log(values.name);
                    message.success('提交成功');
                    return true;
                  }}
                >
                  <ProFormSelect
                    name="select"
                    label="发布环境"
                    valueEnum={{
                      prod: 'prod',
                      ppe: 'ppe',
                    }}
                    placeholder="选择环境"
                    rules={[{ required: true, message: '请选择发布环境' }]}
                  />

                  <ProFormSlider
                    name="slider"
                    label="灰度"
                    width="lg"
                    marks={{
                      0: '0%',
                      10: '10%',
                      50: '50%',
                      100: '100%',
                    }}
                  />
                </ModalForm>
                <Search placeholder="搜索" onSearch={onSearch} />
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
                    <APIList projectId={selectedProject.id} />
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
