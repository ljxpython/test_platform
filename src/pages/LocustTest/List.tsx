import { ProLayout, PageContainer,ProCard } from '@ant-design/pro-components';
// import { PageHeader } from 'antd'; // Ant Design 的页面头部

const StaticPage = () => {
  const staticPageUrl = 'https://www.coder-ljx.cn:8080/locust_reports/test5/test5.html'; // 替换为您的静态网页 URL

    return (
      <PageContainer>
        <ProCard title="Locust 测试报告" style={{ marginBottom: 16 }}>
          {/* <p>请查看右侧的 Locust 测试报告。</p> */}
          <div style={{ height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
            <iframe
              src={staticPageUrl}
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="静态网页"
            />
          </div>
        </ProCard>
      </PageContainer>
    );
};

export default StaticPage;
