import { PageContainer } from '@ant-design/pro-components';
import type { TableProps } from 'antd';
import { Button, Card, Col, Form, Input, Row, Select, Space, Table, Tag, theme } from 'antd';
import { useState, useEffect } from 'react';
import { getGoodsList } from '@/services/goods/good';
import { history } from '@umijs/max';

const { Option } = Select;
interface DataType {
  id?: number;
  key?: string;
  name?: string;
  description?: string;
  price?: number;
  status?: number;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '商品ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '商品描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '商品价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '商品状态',
    key: 'status',
    dataIndex: 'status',
    render: (_, record ) => (  // 自定义列表的数据,可以传节点
      <>
        { record.status === 1 ? <>
            <Button>上架</Button>
            <Button type='link'>下架</Button>
          </> :
            <>
              <Button>下架</Button>
              <Button type='link'>销售中</Button>
            </>


        }

        {
          record.status === 1 ? <Tag color="green">上架</Tag> : <Tag color="red">下架</Tag>
        }
      </>
    ),
  },
  {
    title: '操作选项',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        {/* <a>Invite {record.name}</a> */}
        {/* <a>Delete</a> */}
        <Button type="primary">详情</Button>
        <Button type="primary">修改</Button>
      </Space>
    ),
  },
];

// const data: DataType[] = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];


function List() {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);
  const [params, setParams] = useState<GoodsAPI.GoodsParams>({
    pageSize: 10,
    current: 1,
  });
  const [data, setData] = useState<GoodsAPI.GoodList[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // 获取商品列表数据
    ;( async () => {
      const data  = await getGoodsList(params);
      console.log('data', data);
      setData(data.data);
      setTotal(data.total);
    })();
    
  }, [params]);

  // 搜索
  const onSearch = async (values: any) => {
    // console.log('Received values of form: ', values);
    // console.log(values.productType, values.context);
    const vals = Object.values(values);
    console.log('vals', vals);
    const data = await  getGoodsList({
      // ...params,
      // [vals[0]]: vals[1],
      [values.productType]: values.context
    });
    setData(data.data);
    setTotal(data.total);
    console.log('data', data);
    }

  

  return (
    <PageContainer title="商品列表">
      <Card>
        <Form form={form} name="advanced_search" size="large" onFinish={onSearch}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="productType" hasFeedback>
                <Select placeholder="请选择搜索分类">
                  <Select.Option value="goodid">id</Select.Option>
                  <Select.Option value="name">goodname</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="context">
                <Input placeholder="请输入搜索的内容" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                onClick={() => {
                  form.resetFields();
                  onSearch({});
                }}
              >
                重置
              </Button>
              <Button type="primary" onClick={() => history.push('/goods/addgood')}>
                添加商品
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card style={{ marginTop: 16 }}>
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={data}
          pagination={{
            total: total,
            pageSize: 10,
            onChange: (page, pageSize) => {
              setParams({
                ...params,
                current: page,
                pageSize,
              });
            },
            showTotal: (total) => `共 ${total} 条`, // 嵌入 showTotal
          }}
        />
      </Card>
    </PageContainer>
  );
}

export default List;
