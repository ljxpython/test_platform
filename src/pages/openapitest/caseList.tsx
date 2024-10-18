import { queryTestMoudle, syncTestMoudle, updateTestMoudle } from '@/services/test_moudle';
import { getCase, syncTestCase, getCaseSence } from '@/services/test_case';
import { deleteProject } from '@/services/test_project';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, message } from 'antd';
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
  const [casesence, setCasesence] = useState<string[]>([]); // 初始化为空数组
  const getcasesence = async () => {
    try {
      let data = await getCaseSence({});
      console.log(data);
      console.log('case_sence_list', data.data.case_sence_list);
      setCasesence(data.data.case_sence_list);
      // console.log('获取casesence的值', casesence);
    } catch (error) {
      console.error('获取选项失败:', error);
    }
  };

  // 下面两个useEffect是用于获取casesence的值,我到现在也不知道为什么要写两个
  // 使用 useEffect 监听 casesence 的变化
  useEffect(() => {
    console.log('获取casesence的值', casesence);
  }, [casesence]); // 依赖于 casesence，任何变化都会打印

  // 在组件加载时调用 getcasesence
  useEffect(() => {
    getcasesence();
  }, []);

  const columns: ProColumns<TestCase.GetCaseSingle>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '测试case id',
      dataIndex: 'id',
      hideInTable: true, // 这个相当于在列表中查找不到,但是可以搜索到这个项目
    },
    {
      title: '测试场景',
      dataIndex: 'case_sence',
      valueType: 'select',
      fieldProps: {
        options: casesence,
        mode: 'multiple',
      },
      // valueEnum: valueEnum,
      width: 100,
      // valueType: 'treeSelect',
      copyable: true,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      valueType: 'select',
      // 这里定义可选项
      valueEnum: {
        featureA: { text: '特性 A' },
        featureB: { text: '特性 B' },
        featureC: { text: '特性 C' },
      },
      // 使用 fieldProps 来实现多选
      fieldProps: {
        // mode: 'multiple', // 设置为多选模式,默认是单选
      },
    },
    {
      title: '模块名称',
      dataIndex: 'moudle',
      copyable: true,
      ellipsis: true,
      tooltip: '测试模块过长会自动收缩',
      editable: false,
      render: (text, record) => {
        // 返回 record.casemoudle.moudle 字段的值
        return record.casemoudle ? record.casemoudle.moudle : '无'; // 处理可能的 undefined
      },
    },
    {
      title: 'case函数名',
      dataIndex: 'case_func',
      editable: false,
    },

    {
      title: 'case描述',
      dataIndex: 'case_func_desc',
      ellipsis: true,
      tooltip: 'case描述过长会自动收缩',
    },
    {
      title: 'case标签',
      dataIndex: 'tags',
      ellipsis: true,
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
        //     console.log(record);
        //     console.log(action);
        //     action?.startEditable?.(record.id);
        //   }}
        // >
        //   编辑
        // </a>,
        <a
          onClick={() => {
            history.push(`/openapitest/casedetaile/${record.id}`);
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
                const res = await deleteProject({ ...record });
                message.success('删除成功');
                action?.reload();
                console.log(res);
              })();
              // () => action?.reload();
            }
          }}
          menus={[
            { key: 'copy', name: '复制' },
            //   { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];

  return (
    <ProTable<TestCase.GetCaseSingle, TestCase.GetCaseResponse>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        // await waitTime(20);
        const res = await getCase(params);
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
      headerTitle="测试模块"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={async () => {
            try {
              const res = await syncTestMoudle();
              console.log(res);
              message.success('同步测试模块成功');
              // message.info(`响应数据: ${JSON.stringify(res, null, 2)}`);
            } catch (error) {
              console.error('同步测试模块失败:', error);
            }
            actionRef.current?.reload();
          }}
          type="primary"
        >
          同步测试模块
        </Button>,
      ]}
    />
  );
};
