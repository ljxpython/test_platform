import { PageContainer } from '@ant-design/pro-components';
import type { TableProps } from 'antd';
import { Button, Card, Col, Form, Input, Row, Select, Space, Table, Tag, theme } from 'antd';
import { useState } from 'react';

const { Option } = Select;
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '商品描述',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '商品价格',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '商品状态',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '操作选项',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

function List() {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);

  return (
    <PageContainer title="商品列表">
      <Card>
        <Form form={form} name="advanced_search" size="large">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="productType" hasFeedback>
                <Select placeholder="请选择搜索分类">
                  <Option value="goodid">id</Option>
                  <Option value="name">goodname</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
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
                }}
              >
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card style={{ marginTop: 16 }}>
        <Table columns={columns} dataSource={data} />
      </Card>
    </PageContainer>
  );
}

export default List;
