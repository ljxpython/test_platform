import { checkLocustProcess, stopLocustTest } from '@/services/locust_run';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Alert, Button, message } from 'antd';
import { useEffect, useState } from 'react';

export const waitTimePromise = async (time: number = 10) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 10) => {
  await waitTimePromise(time);
};


const StaticPage = () => {
  const staticPageUrl = 'http://127.0.0.1:8090/';
  const [title, setTitle] = useState('');
  const [resultid, setResultid] = useState('');
  const [url, setUrl] = useState('');
  const [urlAvailable, setUrlAvailable] = useState(null); // null, true, false
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const reloadIframe = () => {
    // 通过更新状态来重新加载 iframe
    setUrl((prevUrl) => `${prevUrl}?t=${new Date().getTime()}`); // 添加时间戳以强制更新
  };

  const checkUrl = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await checkLocustProcess();
      console.log(response);
      console.log(response.data.url);
      console.log(staticPageUrl);
      if (response.data.url) {
        setUrlAvailable(true);
        setUrl(response.data.url);
        setTitle(response.data.title);
        setResultid(response.data.id);
        // 等待1秒
        await waitTime(1000);
      } else {
        message.error('当前无 Locust 进程');
        setUrlAvailable(false);
      }
    } catch (error) {
      setUrlAvailable(false);
      setErrorMsg('当前无 Locust 进程');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    waitTime(1000); // 等待1秒
    // 组件挂载时立即检查 URL
    checkUrl();
    // reloadIframe();
  }, []); // 空依赖数组表示只在组件挂载时运行一次

  const stopTesting = async () => {
    // 这里替换为你停止压测的 API 调用
    try {
      // 示例 API 调用
      const response = await stopLocustTest();
      console.log(response);
      if (response.data.id) {
        message.success('压测已停止 套件id为' + response.data.id);
      } else {
        message.error(response.data.msg);
      }
    } catch (error) {
      message.error('停止压测请求失败');
    }
  };

  return (
    <PageContainer title={false}>
      <ProCard
        title={title ? ` 套件ID: ${resultid} 压测场景：${title}` : 'Locust 压测报告'}
        style={{ marginBottom: 16 }}
      >
        <div style={{ marginBottom: 16 }}>
          <Button onClick={checkUrl} loading={loading}>
            检查 Locust 压测状态
          </Button>
          <Button onClick={stopTesting} style={{ marginLeft: 8 }}>
            一键停止压测
          </Button>
          <Button onClick={reloadIframe} style={{ marginLeft: 8 }}>
            重新加载压测
          </Button>
        </div>
        {urlAvailable === true && (
          <div style={{ height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
            <iframe
              src={url}
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Locust Dashboard"
            />
          </div>
        )}
        {urlAvailable === false && (
          <Alert message="当前无 Locust 进程或无法访问压测的url。" type="error" showIcon />
        )}
        {errorMsg && <Alert message={errorMsg} type="error" showIcon />}
      </ProCard>
    </PageContainer>
  );
};

export default StaticPage;
