import { QuestionCircleOutlined,UserOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang } from '@umijs/max';
import { Select, SelectProps,Tooltip ,Card } from 'antd'; // 导入 Select 组件
import React, { useState } from 'react';

export type SiderTheme = 'light' | 'dark';

export const SelectLang = () => {
  return (
    <UmiSelectLang
      style={{
        padding: 4,
      }}
    />
  );
};

const personalInfo = (
  <Card>
    <div style={{ width: 200 }}>
      <h4>个人简介</h4>
      <p>擅长: 服务端测试,前端开发, 接口自动化测试,性能测试</p>
      <p>状态: 在职状态，寻求能够提供更大成长空间和发展机遇的职位</p>
      <p>base地: 北京</p>
      <div>
        <img src="vx.png" alt="微信二维码" style={{ width: 100 }} />
        <p>欢迎联系我!</p>
      </div>
    </div>
  </Card>
);

const handleIconClick = () => {
  window.open('http://www.coder-ljx.cn:8825');
}

// 添加个人简介
export const PersonalInfo = () => {
  return (
    <Tooltip title={personalInfo} placement="right" color="#fff">
      {/* <span>个人信息</span> */}
      <UserOutlined style={{ fontSize: 18, cursor: 'pointer' }} onClick={handleIconClick} // 添加点击事件处理 
      />
    </Tooltip>
  );
};

// 添加选择环境的功能
export const EnvironmentSelector = () => {
  const [environment, setEnvironment] = useState<'test' | 'production'>('test');

  const handleChange: SelectProps['onChange'] = (value) => {
    setEnvironment(value);
    console.log('当前选择的环境:', value);
    // 这里可以添加切换环境的逻辑
  };

  return (
    <Tooltip title="请使用线上环境,测试环境为本人调试使用">

    <Select
      value={environment}
      onChange={handleChange}
      style={{ width: 110, height: 46, marginRight: 8}} // 设置下拉框的宽度和右边距
    >
      <Select.Option value="test">测试环境</Select.Option>
      <Select.Option value="production">线上环境</Select.Option>
      </Select>
    </Tooltip>
  );
};

export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
        width: 40,
      }}
      onClick={() => {
        // window.open('https://pro.ant.design/docs/getting-started');
        window.open('http://www.coder-ljx.cn:8825');
      }}
    >
      <QuestionCircleOutlined />
    </div>
  );
};
