import { getProjectList } from '@/services/test_project';
import { syncTestMoudle, updateTestMoudle, queryTestMoudle } from '@/services/test_moudle';
import { ProTable } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { useEffect, useState } from 'react';


const DynamicTable = () => {
  const [dataSource, setDataSource] = useState([]);
  let params = useParams();
  console.log(params.id); // 打印出路由参数中的id
  const id = params.id; // 获取具体的 ID

  useEffect(() => {
    const loadData = async () => {
        const data = await queryTestMoudle({ id: params.id });
        console.log(data);

      // const data = await fetchData();
      setDataSource(data.data);
      console.log(data.data);
    };
    loadData();
  }, []);

  return (
    <ProTable
      columns={Object.keys(dataSource[0] || {}).map((key) => ({
        title: key.replace('_', ' ').toUpperCase(), // 将下划线替换为空格并转换为大写
        dataIndex: key,
        ellipsis: true,
      }))}
      dataSource={dataSource}
      rowKey="id"
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
      }}
      search={false} // 如果不需要搜索功能
      headerTitle={`测试模块 ${id} 详情`} // 动态设置标题
    />
  );
};

export default DynamicTable;
