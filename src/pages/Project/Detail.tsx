import { ProTable } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import { useParams } from '@umijs/max';
import { getProjectList, deleteProject, updateProject } from '@/services/project';

// 模拟获取数据的函数
// const fetchData = async () => {
//   // let params = useParams();
//   // console.log(params.id); // 打印出路由参数中的id
//   return [
//     {
//       id: 1,
//       project_name: '项目A',
//       project_owners: '用户1',
//       project_desc: '这是项目A的描述',
//       add_time: '2023-01-01',
//       update_time: '2023-01-02',
//     },
//     {
//       id: 2,
//       project_name: '项目B',
//       project_owners: '用户2',
//       project_desc: '这是项目B的描述',
//       add_time: '2023-01-03',
//       update_time: '2023-01-04',
//     },
//   ];
// };

const DynamicTable = () => {
  const [dataSource, setDataSource] = useState([]);
  let params = useParams();
  console.log(params.id); // 打印出路由参数中的id
  const id = params.id; // 获取具体的 ID

  useEffect(() => {
    const loadData = async () => {
      const data = await getProjectList({ id: params.id });

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
      headerTitle={`项目 ${id} 详情`} // 动态设置标题
    />
  );
};

export default DynamicTable;
