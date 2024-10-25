import { deleteProject, getProjectList, updateProject } from '@/services/test_project';
import { createSuite,updateSuite,syncSuiteByCaseIds ,deleteSuite,getSuiteList} from '@/services/test_suite';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, message, Tooltip } from 'antd';
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

// 也可以看看这个例子,这个是当时学习这部分的时候,第一次敲的代码,包含着ProComponents使用的基础功能
// src / pages / Goods / protale.tsx
const columns: ProColumns<ProjectApi.ProjectDesc>[] = [
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
    title: '套件名称',
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
    title: '所属项目',
    dataIndex: 'project',
    ellipsis: true,
    copyable: true,
    render: (text, record) => {
      return record.project ? record.project.project_name : '无'; // 处理可能的 undefined
    },
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
          // action?.startEditable?.(record.id);
          history.push(`/openapitest/syncsuite/${record.id}`);
        }}
      >
        编辑
      </a>,
      <a
        onClick={() => {
          history.push(`/openapitest/runcasesuite/${record.id}`);
        }}
        target="_blank"
        rel="noopener noreferrer"
        key="view"
      >
        运行
      </a>,
      <a
        onClick={() => {
          history.push(`/openapitest/casesuitedetaile/${record.id}`);
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
              const res = await deleteSuite({ ...record });
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

export default () => {
  const actionRef = useRef<ActionType>();
  useEffect(() => {
    message.info('请不要随意调用删除按钮,因为真的会把我的测试数据删除掉');
  })
  
  return (
    <ProTable<ProjectApi.ProjectDesc, ProjectApi.ProjectParams>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        // await waitTime(20);
        const res = await getSuiteList(params);
        console.log(res);
        return res;
      }}
      editable={{
        type: 'multiple', //这个是允许多行编辑的意思
        onSave: async (key, row) => {
          console.log(key, row);
          await updateProject(row);
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
            history.push('/openapitest/createcasesuite');
          }}
          type="primary"
        >
          新建
        </Button>,
        // <Tooltip title="根据测试场景,同步case到测试套件">
        //   <Button
        //     key="button"
        //     icon={<PlusOutlined />}
        //     onClick={() => {
        //       // actionRef.current?.reload();
        //       history.push('/project/create');
        //     }}
        //     type="primary"
        //   >
        //     同步
        //   </Button>
        // </Tooltip>,
      ]}
    />
  );
};
