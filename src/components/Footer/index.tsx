import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'Ant Design Pro',
          title: 'Ant Design Pro',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: '冀ICP备2024082146号',
          title: '冀ICP备2024082146号',
          href: 'https://beian.miit.gov.cn',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ljxpython?tab=repositories',
          blankTarget: true,
        },
        {
          key: 'git仓库',
          title: 'git仓库',
          href: 'https://github.com/ljxpython/test_palnt',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
