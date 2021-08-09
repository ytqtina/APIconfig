import React, { useState, useEffect } from 'react';
import { Space, Button, Input, Layout, PageHeader } from 'antd';
import ProjectCard from '../components/ProjectCard';

import {} from '@ant-design/icons';
import APIList from '../components/APIList';

const { Search } = Input;
const { Content, Sider } = Layout;
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
      // if (name) break;
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
                <Button>创建</Button>
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
                <Button>添加路由</Button>
                <Button type="primary" disabled>
                  发布
                </Button>
                <Search placeholder="搜索" onSearch={onSearch} enterButton />
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
