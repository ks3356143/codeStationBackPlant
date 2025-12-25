import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright="Powered by Microsate"
      links={[
        {
          key: 'Microsate',
          title: 'Microsate',
          href: 'https://www.microsate.com/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: '/',
          blankTarget: true,
        },
        {
          key: '后台管理',
          title: 'CS后台管理',
          href: '/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
