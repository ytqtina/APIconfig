import React, { useState, useEffect } from 'react';
import ProCard from '@ant-design/pro-card';
import { Button, Tooltip } from 'antd';
import { StarFilled, StarTwoTone } from '@ant-design/icons';

export default (props: any) => {
  const { project, collect: setCollect, selected, onClick } = props;

  const [collected, setCollected] = useState<boolean>(
    JSON.parse(window.localStorage.getItem('starList') as string)?.includes(project.name),
  );
  useEffect(() => {
    setCollected(
      JSON.parse(window.localStorage.getItem('starList') as string)?.includes(project.name),
    );
  }, [window.localStorage.getItem('starList')]);
  const collect = () => {
    const starList: string[] = JSON.parse(window.localStorage.getItem('starList') as string);
    if (collected) {
      for (let i = 0; i < starList.length; i += 1) {
        if (starList[i] === project.name) {
          starList.splice(i, 1);
          break;
        }
      }
    } else {
      starList.push(project.name);
    }
    window.localStorage.setItem('starList', JSON.stringify([...starList]));
    setCollect();
  };

  return (
    <>
      <ProCard
        className="card"
        title={project.name}
        style={{
          width: 250,
          margin: 20,
          cursor: 'pointer',
          backgroundColor: selected && 'rgb(230, 247, 255)',
          borderLeft: selected && `3px solid #1890ff`,
          boxShadow: selected && '5px 5px 10px lightgray',
          color: selected && '#1890ff',
        }}
        extra={
          <Tooltip title={collected ? '取消收藏' : '收藏'}>
            <Button
              type="link"
              size="small"
              icon={collected ? <StarFilled /> : <StarTwoTone />}
              onClick={(event) => {
                event.stopPropagation();
                collect();
              }}
            ></Button>
          </Tooltip>
        }
        size="small"
        onClick={onClick}
        hoverable
      >
        <div>{project.id}</div>
      </ProCard>
    </>
  );
};
