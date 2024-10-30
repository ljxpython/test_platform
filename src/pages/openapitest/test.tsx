import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useState } from 'react';
import { Alert, Button, } from 'antd'

const StaticPage = () => {
  const staticPageUrl = 'https://www.coder-ljx.cn:8091';
  const [urlAvailable, setUrlAvailable] = useState(null); // null, true, false
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const checkUrl = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch(staticPageUrl);
      if (response.ok) {
        setUrlAvailable(true);
      } else {
        setUrlAvailable(false);
      }
    } catch (error) {
      setUrlAvailable(false);
      setErrorMsg('无法访问 URL');
    } finally {
      setLoading(false);
    }
  };

  const stopTesting = async () => {
    // 这里替换为你停止压测的 API 调用
    try {
      // 示例 API 调用
      const response = await fetch('/api/stop-locust', { method: 'POST' });
      if (response.ok) {
        alert('压测已停止');
      } else {
        alert('停止压测失败');
      }
    } catch (error) {
      alert('停止压测请求失败');
    }
  };

  return (
    <PageContainer>
      <ProCard title="Locust 测试报告" style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={checkUrl} loading={loading}>
            检查 Locust 报告
          </Button>
          <Button type="danger" onClick={stopTesting} style={{ marginLeft: 8 }}>
            一键停止压测
          </Button>
        </div>
        {urlAvailable === true && (
          <div style={{ height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
            <iframe
              src={staticPageUrl}
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Locust Dashboard"
            />
          </div>
        )}
        {urlAvailable === false && (
          <Alert message="当前无 Locust 进程或无法访问报告。" type="error" showIcon />
        )}
        {errorMsg && <Alert message={errorMsg} type="error" showIcon />}
      </ProCard>
    </PageContainer>
  );
};

export default StaticPage;
