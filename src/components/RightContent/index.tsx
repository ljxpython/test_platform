import { QuestionCircleOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang } from '@umijs/max';
import { Select, SelectProps } from 'antd'; // 导入 Select 组件
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

// 添加选择环境的功能
export const EnvironmentSelector = () => {
  const [environment, setEnvironment] = useState<'test' | 'production'>('test');

  const handleChange: SelectProps['onChange'] = (value) => {
    setEnvironment(value);
    console.log('当前选择的环境:', value);
    // 这里可以添加切换环境的逻辑
  };

  return (
    <Select
      value={environment}
      onChange={handleChange}
      // style={{ width: 120, marginRight: 10 }} // 设置下拉框的宽度和右边距
    >
      <Select.Option value="test">测试环境</Select.Option>
      <Select.Option value="production">线上环境</Select.Option>
    </Select>
  );
};

export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
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
