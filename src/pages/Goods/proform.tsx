import { ProForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { Col, Row, Space, message } from 'antd';
import { useState } from 'react';
import { useAccess, Access } from 'umi';
import PageA from './access_demo';
import { useModel } from '@umijs/max';
import { flushSync } from 'react-dom';



type LayoutType = Parameters<typeof ProForm>[0]['layout'];
const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [formLayoutType, setFormLayoutType] = useState<LayoutType>(LAYOUT_TYPE_HORIZONTAL);

  const formItemLayout =
    formLayoutType === LAYOUT_TYPE_HORIZONTAL
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;
  const fooData = { 
    ownerId: '1'
  };
  const { counter, increment, decrement,setCounter,incrementAsync}  = useModel('countMoudel')
  console.log(counter, increment, decrement);

  return (
    <>
      <div>
        <PageA foo={fooData} />
        <h1>{counter}</h1>
        <button onClick={increment}>增加</button>
        <button onClick={decrement}>减少</button>
        <button onClick={() => { setCounter(counter + 100) }}>增加100</button>
        <button onClick={incrementAsync}>异步增加100</button>
        // 使用flushSync 同步代码
        <button onClick={() => { flushSync(() => { setCounter(counter + 100) }) }}>增加100</button>
        
      </div>
    <ProForm<{
      name: string;
      company?: string;
      useMode?: string;
    }>
      {...formItemLayout}
      layout={formLayoutType}
    //   submitter={{
    //     render: (props, doms) => {
    //       return formLayoutType === LAYOUT_TYPE_HORIZONTAL ? (
    //         <Row>
    //           <Col span={14} offset={4}>
    //             <Space>{doms}</Space>
    //           </Col>
    //         </Row>
    //       ) : (
    //         doms
    //       );
    //     },
    //   }}
      onFinish={async (values) => {
        
        await waitTime(2000);
        console.log(values);
        message.success('提交成功');
      }}
      params={{}}
      request={async () => {
        await waitTime(100);
        return {
          name: '蚂蚁设计有限公司',
          useMode: 'chapter',
        };
      }}
    >
      <ProFormRadio.Group
        style={{
          margin: 16,
        }}
        label="标签布局"
        radioType="button"
        fieldProps={{
          value: formLayoutType,
            onChange: (e) => { console.log(e); return setFormLayoutType(e.target.value) },
        }}
        options={['horizontal', 'vertical', 'inline']}
      />
      <ProFormText
        width="md"
        name="name"
        label="签约客户名称"
        tooltip="最长为 24 位"
        placeholder="请输入名称"
      />
      <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" />
      <ProFormText
        name={['contract', 'name']}
        width="md"
        label="合同名称"
        placeholder="请输入名称"
      />
      </ProForm>
      </>
  );
};
