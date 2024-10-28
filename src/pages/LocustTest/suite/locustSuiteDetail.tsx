import { getSuiteList } from '@/services/test_suite';
import { useParams } from '@umijs/max';
import { Card, Descriptions, Spin } from 'antd';
import { useEffect, useState } from 'react';

const InfoCard_ = () => {
  const [dataSource, setDataSource] = useState(null); // 使用 null 初始化
  const params = useParams();
  const id = params.id; // 获取具体的 ID

  useEffect(() => {
    const loadData = async () => {
      const data = await getSuiteList({ id: params.id });
      console.log(data);
      setDataSource(data.data ? data.data[0] : null); // 假设只需要第一个对象
    };
    loadData();
  }, [params.id]); // 依赖 params.id

  if (!dataSource) {
    return <Spin tip="加载中..." style={{ margin: '20px' }} />; // 使用 Spin 显示加载状态
  }

  return (
    <Card title={`套件 ${id} 详情`} style={{ margin: '20px' }}>
      <Descriptions bordered column={1}>
        {Object.keys(dataSource).map((key) => (
          <Descriptions.Item label={key.replace('_', ' ').toUpperCase()} key={key}>
            {typeof dataSource[key] === 'object' && dataSource[key] !== null ? (
              <pre>{JSON.stringify(dataSource[key], null, 2)}</pre>
            ) : dataSource[key] !== null && dataSource[key] !== undefined ? (
              dataSource[key]
            ) : (
              '无'
            )}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Card>
  );
};

export default InfoCard_;
