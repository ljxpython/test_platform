import {
  createLocustSuite,
  deleteLocustSuite,
  queryLocustSuite,
  syncLocustSuiteByCaseIds,
} from '@/services/locust_suite';
import { runLocustTest } from '@/services/locust_run';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown ,PageContainer,ProCard} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, message, Tooltip, Modal, Form, Input, Select } from 'antd';
import { useRef } from 'react';
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



export default () => {
  const actionRef = useRef<ActionType>();
  useEffect(() => {
    // message.info('请不要随意调用删除按钮,因为真的会把我的测试数据删除掉');
  });

  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  const showModal = (record: any) => {
    console.log('showModal');
    setCurrentRecord(record);
    setVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // 处理接口调用
      const { title, test_env, runType } = values;
      console.log('values:', values);
      const force = runType === 'force';
      if (currentRecord) {
        const { id } = currentRecord;
        // 这里进行接口调用
        console.log('调用接口:', { title, test_env, force, id });
        // 把id的key修改为locustsuite
        await runLocustTest({ title, test_env, force, locustsuite: id });
        // 假设接口调用成功
        message.success('压测场景运行成功');
        setVisible(false); // 关闭模态框
        // 设置延迟跳转
        setTimeout(() => {
          history.push(`/locust/locustrun`);
        }, 3000); // 3000毫秒（3秒）后跳转
      } else {
        // 这里进行接口调用
      }
    } catch (error) {
      console.error('表单验证失败:', error);
    };

    
  };

  // 也可以看看这个例子,这个是当时学习这部分的时候,第一次敲的代码,包含着ProComponents使用的基础功能
  // src / pages / Goods / protale.tsx
  const columns: ProColumns<LocustSuite.LocustSuiteMsg>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '套件ID',
      dataIndex: 'id',
      hideInTable: true, // 这个相当于在列表中查找不到,但是可以搜索到这个项目
    },
    {
      title: '压测套件名称',
      dataIndex: 'suite_name',
      copyable: true,
      ellipsis: true,
      tooltip: '名称过长会自动收缩',
      editable: false,
    },

    {
      title: '套件描述',
      dataIndex: 'describe',
      ellipsis: true,
    },
    {
      title: 'case场景',
      dataIndex: 'case_sences',
      copyable: true,
      ellipsis: true,
      tooltip: '场景过长会自动收缩',
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'add_time',
      valueType: 'date',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '更新时间',
      key: 'updateTime',
      dataIndex: 'update_time',
      valueType: 'date',
      sorter: true,
      hideInSearch: true,
    },

    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            console.log(record);
            console.log(action);
            history.push(`/locust/synclocustsuite/${record.id}`);
          }}
        >
          更新
        </a>,
        <a
          onClick={() => {
            showModal(record);
          }
          }
          target="_blank"
          rel="noopener noreferrer"
          key="runlocust">
          运行
        </a>,
        <a
          onClick={() => {
            history.push(`/locust/locustcasesuitedetaile/${record.id}`);
          }}
          target="_blank"
          rel="noopener noreferrer"
          key="view"
        >
          查看
        </a>,
        <TableDropdown
          key="actionGroup"
          //   onSelect={() => action?.reload()} // 这个是重置的实现
          onSelect={(key) => {
            if (key === 'copy') {
              // 将整个 record 对象转为 JSON 字符串
              const textToCopy = JSON.stringify(record, null, 2); // 以格式化的方式字符串化
              navigator.clipboard
                .writeText(textToCopy)
                .then(() => {
                  console.log('复制成功:', textToCopy);
                  message.success('记录已复制到剪贴板');
                })
                .catch((err) => {
                  console.error('复制失败:', err);
                  message.error('复制失败');
                });
            }
            if (key === 'delete') {
              console.log('delete');
              console.log(record);
              (async () => {
                const res = await deleteLocustSuite({ ...record });
                message.success('删除成功');
                action?.reload();
                console.log(res);
              })();
              // () => action?.reload();
            }
          }}
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
      <PageContainer header={{ title: false }}>
        <ProCard>
          <ProTable<LocustSuite.LocustSuiteMsg, LocustSuite.QueryLocustSuiteResponse>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={async (params, sort, filter) => {
              console.log(sort, filter);
              // await waitTime(20);
              const res = await queryLocustSuite(params);
              console.log(res);
              return res;
            }}
            editable={{
              type: 'multiple', //这个是允许多行编辑的意思
              onSave: async (key, row) => {
                console.log(key, row);
                await row;
                message.success('更新成功');
              },
            }}
            columnsState={{
              persistenceKey: 'pro-table-singe-demos',
              persistenceType: 'localStorage',
              defaultValue: {
                option: { fixed: 'right', disable: true },
              },
              onChange(value) {
                console.log('value: ', value);
              },
            }}
            rowKey="id"
            search={{
              labelWidth: 'auto',
            }}
            options={{
              setting: {
                listsHeight: 400,
              },
            }}
            pagination={{
              defaultCurrent: 1,
              showSizeChanger: true,
              onShowSizeChange: (current, pageSize) => {
                console.log(current, pageSize);
              },
              showQuickJumper: true,
              // pageSize: 5,
              // onChange: (page) => console.log(page),
            }}
            dateFormatter="string"
            headerTitle="测试套件"
            toolBarRender={() => [
              <Button
                key="button"
                icon={<PlusOutlined />}
                onClick={() => {
                  // actionRef.current?.reload();
                  history.push('/locust/createlocustsuite');
                }}
                type="primary"
              >
                新建
              </Button>,
            ]}
          />
        </ProCard>
      </PageContainer>
      <Modal
        title="运行压测场景"
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        // footer={null} // 自定义底部按钮
        footer={[
          <Button key="run" type="primary" onClick={handleOk}>
            运行 {/* 确认按钮 */}
          </Button>,
          <Button key="cancel" onClick={() => setVisible(false)}>
            取消 {/* 取消按钮 */}
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            name="test_env"
            label="测试环境"
            rules={[{ required: true, message: '请选择测试环境' }]}
          >
            <Select placeholder="选择测试环境">
              {/* <Option value="dev">开发环境</Option> */}
              <Option value="boe">测试环境</Option>
              <Option value="online">线上环境</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="title"
            label="测试标题"
            // rules={[{ required: true, message: '请输入测试标题' }]}
          >
            <Input placeholder="输入测试标题,可以为空" />
          </Form.Item>

          <Form.Item
            name="runType"
            label="运行类型"
            rules={[{ required: true, message: '请选择运行类型' }]}
          >
            <Select placeholder="选择运行类型">
              <Option value="force">强制运行</Option>
              <Option value="normal">非强制运行</Option>
            </Select>
          </Form.Item>

          {/* <Form.Item>
            <Button type="primary" onClick={handleOk}>
              提交
            </Button>
            <Button onClick={() => setVisible(false)} style={{ marginLeft: 8 }}>
              取消
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};
