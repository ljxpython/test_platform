import { queryTestMoudle, syncTestMoudle, updateTestMoudle } from '@/services/test_moudle';
import { getLocustCase, syncLocustCase, deleteLocustCase } from '@/services/locust_case';
import { deleteProject } from '@/services/test_project';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown, PageContainer,ProCard } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, message,Alert } from 'antd';
import { useRef } from 'react';
import { useState, useEffect } from 'react';



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
  const [visible, setVisible] = useState(true); // 状态来控制公告的显示与否

  const columns: ProColumns<TestCase.GetCaseSingle>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '压测caseid',
      dataIndex: 'id',
      hideInTable: true, // 这个相当于在列表中查找不到,但是可以搜索到这个项目
    },
    {
      title: '测试场景',
      dataIndex: 'case_sence',
      valueType: 'text',
      // width: 100,
      copyable: true,
    },
    {
      title: '压测模块名称',
      dataIndex: 'moudle',
      copyable: true,
      ellipsis: true,
      tooltip: '测试模块过长会自动收缩',
      editable: false,
    },
    // {
    //   title: 'case函数名',
    //   dataIndex: 'case_func',
    //   editable: false,
    // },

    {
      title: 'case描述',
      dataIndex: 'path_desc',
      ellipsis: true,
      tooltip: 'case描述过长会自动收缩',
    },
    {
      title: 'case标签',
      dataIndex: 'tags',
      ellipsis: true,
      hideInTable: true,
      render: (text, record) => {
        // 检查 tags 是否存在，如果不存在则返回 '无'
        return record.tags && record.tags.length > 0 ? record.tags.join(', ') : '无';
      },
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
        // <a
        //   key="editable"
        //   onClick={() => {

        //   }}
        // >
        //   更新
        // </a>,
        <a
          onClick={() => {
            history.push(`/locust/locustcasedetaile/${record.id}`);
            console.log('record', record);
            console.log('text', text);
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
                const res = await deleteLocustCase({ ...record });
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
    <PageContainer header={{ title: false }}>
      <ProCard>
        {/* 仅在 visible 为 true 时显示公告 */}
        {visible && (
          <Alert
            message="公告"
            description="这是一个重要的公告，请注意查看相关信息！"
            type="info"
            showIcon
            closable // 允许关闭
            onClose={() => setVisible(false)} // 关闭时设置状态为 false
            style={{ marginBottom: 16 }} // 添加底部间距
          />
        )}
        <ProTable<LocustCase.LocustCaseMsg, LocustCase.GetLocustCaseResponse>
          columns={columns}
          actionRef={actionRef}
          cardBordered
          request={async (params, sort, filter) => {
            console.log(sort, filter);
            // await waitTime(20);
            const res = await getLocustCase(params);
            console.log(res);
            return res;
          }}
          editable={{
            type: 'multiple', //这个是允许多行编辑的意思
            onSave: async (key, row) => {
              console.log('key:', key);
              console.log('row:', row);
              //   console.log(key, row);
              await updateTestMoudle(row);
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
              // console.log('value: ', value);
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
              // console.log(current, pageSize);
            },
            showQuickJumper: true,
            // pageSize: 5,
            // onChange: (page) => console.log(page),
          }}
          dateFormatter="string"
          headerTitle="测试case"
          toolBarRender={() => [
            <Button
              key="button"
              icon={<PlusOutlined />}
              onClick={async () => {
                try {
                  const res = await syncLocustCase();
                  console.log(res);
                  message.success('同步压测case成功');
                  // message.info(`响应数据: ${JSON.stringify(res, null, 2)}`);
                } catch (error) {
                  console.error('同步测试case失败:', error);
                }
                actionRef.current?.reload();
              }}
              type="primary"
            >
              同步压测case
            </Button>,
          ]}
        />
      </ProCard>
    </PageContainer>
  );
};
