import { getCase } from '@/services/test_case';
import { ProTable } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { useEffect, useState } from 'react';

const DynamicTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const params = useParams();
  const id = params.id; // 获取具体的 ID

  useEffect(() => {
    const loadData = async () => {
      const data = await getCase({ id: params.id });
      console.log(data);
      setDataSource(data.data || []); // 确保 dataSource 为数组
      console.log(data.data);
    };
    loadData();
  }, [params.id]); // 依赖 params.id

  // 动态生成列
  const generateColumns = (data) => {
    if (data.length === 0) return [];

    return Object.keys(data[0]).map((key) => ({
      title: key.replace('_', ' ').toUpperCase(), // 将下划线替换为空格并转换为大写
      dataIndex: key,
      ellipsis: true,
      render: (text, record) => {
        // 处理嵌套对象和 null 值
        if (typeof record[key] === 'object' && record[key] !== null) {
          return record[key].moudle || JSON.stringify(record[key]);
        }
        return text !== null && text !== undefined ? text : '无';
      },
    }));
  };

  return (
    <ProTable
      columns={generateColumns(dataSource)} // 使用动态生成的列
      dataSource={dataSource}
      rowKey="id"
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
      }}
      search={false} // 如果不需要搜索功能
      headerTitle={`case ${id} 详情`} // 动态设置标题
    />
  );
};

export default DynamicTable;
