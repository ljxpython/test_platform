import { getGoodsList } from '@/services/goods/good';
import {
  PageContainer,
  ProColumns,
  ProTable,
  TableDropdown,
  ProDescriptions,
} from '@ant-design/pro-components';
import { Button ,Drawer} from 'antd';
import { useState } from 'react';

const Protale = () => {
  const [params, setParams] = useState<GoodsAPI.GoodsParams>({});
  //   useEffect(() => {
  //     setParams({
  //       pageSize: 10,
  //       current: 1,
  //     });
  //   });
  const [isshowDtail, setIsShowDetail] = useState(false);
    const [detail, setDetail] = useState<GoodsAPI.GoodList>();
    const [gooddata, setGoodData] = useState<GoodsAPI.GoodList[]>([]);

  const columns: ProColumns[] = [
    {
      title: '商品名称',
      dataIndex: 'name',
      valueType: 'text',
      hideInSearch: true, //是否可搜索
    },
    {
      title: '商品价格',
      dataIndex: 'price',
      valueType: 'text',
      tooltip: '商品价格,可降价',
    },
    {
      title: '操作选项',
      valueType: 'option',
      // record 相当于每一项的数据
      render: (text, record, index, action) => [
        <Button
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </Button>,
        <Button
          key="detail"
          type="primary"
          onClick={() => {
            console.log('text', text);
              console.log('record', record);
              console.log('index', index);
            setIsShowDetail(true);
              setDetail(record);
              console.log('detail', detail);
          }}
        >
          详情
        </Button>,
        <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={() => action?.reload()}
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];
  return (
    <>
      <PageContainer>
        {/* // 使用泛型,定义接口列的数据和请求的参数 */}
        <ProTable<GoodsAPI.GoodList, GoodsAPI.GoodsParams>
          columns={columns}
          request={async (params, sorter, filter) => {
            const res = await getGoodsList(params);
            // 如果接口不符合规范,则需要如下处理
            // return {
            //     data: res.list,
            //     success: true,
            //     total: res.total
            // }
            return res;
          }}
          // 如果按照阿里的接口规范来,便不需要如此麻烦,直接传入request即可
          // params={params}
          // request={getGoodsList}
          pagination={{
            pageSize: 5,
            onChange: (page) => console.log(page),
          }}
          rowKey={(record) => record.id}
          // https://procomponents.ant.design/components/descriptions#editable-%E7%BC%96%E8%BE%91%E9%85%8D%E7%BD%AE
          editable={{
            // 下面这些对应一个实际测操作
            onDelete: (key, row) => {
              console.log(key, row);
              return Promise.reject();
            },
            onSave: async (key, row) => {
              console.log(key, row);
              return Promise.resolve();
            },
          }}
        />
        <Drawer visible={isshowDtail} onClose={() => setIsShowDetail(false)}>
          {/* // 如果isshowDtail为true,则显示详情 */}
          {isshowDtail && (
            <ProDescriptions<GoodsAPI.GoodList>
              // columns={columns.filter((item) => item.valueType !== 'option')}
              //   dataSource={detail}
                column={2}
              request={async () => {
                  const res = await getGoodsList({goodid: detail.id});
                  console.log(res);
                console.log(detail);
                return {
                  data: detail,
                  success: true,
                };
              }}
            >
              <ProDescriptions.Item dataIndex="id" label="id" />
              {/* <ProDescriptions.Item dataIndex="date" label="日期" valueType="date" /> */}
              <ProDescriptions.Item label="描述" dataIndex="description"  />
            </ProDescriptions>
          )}
        </Drawer>
      </PageContainer>
    </>
  );
};

export default Protale;
