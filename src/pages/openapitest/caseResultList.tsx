import { getCaseSence } from '@/services/test_case';
import { updateTestMoudle } from '@/services/test_moudle';
import { listCasePlant, setCaseResultByCron } from '@/services/test_plan';
import { runCaseResultByTime,getCaseResult } from '@/services/test_run';
import { deleteProject } from '@/services/test_project';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProTable, TableDropdown } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, message, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [visible, setVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const handleOpenModal = (record) => {
    setCurrentRecord(record);
    setVisible(true);
  };

  const handleOk = async () => {
    if (currentRecord) {
      // 调用更新状态的接口
      const newState = currentRecord.is_open === 'on' ? 'off' : 'on';
      const res = await setCaseResultByCron({
        id: currentRecord.id,
        is_open: newState,
      });
      // 这里替换为你的更新状态接口调用
      try {
        message.success(`状态已更新为: ${newState}`);
        // 刷新
        actionRef.current?.reload();
      } catch (error) {
        message.error('更新状态失败');
      }
      setVisible(false);
    }
  };

  const columns: ProColumns<TestRun.CreateCaseResultBody>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '测试结果id',
      dataIndex: 'id',
      hideInTable: true, // 这个相当于在列表中查找不到,但是可以搜索到这个项目
    },
    {
      title: '测试标题', // 这个是列表中显示的标题
      dataIndex: 'title',
      copyable: true,
      ellipsis: true,
      width: 100,
      //   tooltip: '测试计划名称过长会自动收缩',
      valueType: 'text',
    },
    {
      title: '所属测试套件',
      dataIndex: 'suite',
      render: (_, record) => {
        console.log('record', record);
        return (
          <a
            onClick={() => {
              history.push(`/openapitest/casesuitedetaile/${record.suite}`);
            }}
            target="_blank"
            rel="noopener noreferrer"
            key="view"
          >
            {record.suite}
          </a>
        );
      },
      },
      {
          title: '测试结果',
          dataIndex: 'result',
          valueType: 'text',
          width: 100,
          valueEnum: {
            success: { text: '成功', status: 'Success' },
            FAIL: { text: '失败', status: 'Error' },
          },
        
      },
      {
          title: '测试报告链接',
          dataIndex: 'report_link',
          copyable: true,
          ellipsis: true,
          valueType: 'text',    
          
      },
    {
      title: '测试环境',
      dataIndex: 'test_env',
      valueType: 'select',
      fieldProps: {
        options: [
          { label: 'boe', value: '测试' },
          { label: 'online', value: '线上' },
        ],
      },
    },
    {
      title: '开启状态',
      dataIndex: 'is_open',
      valueType: 'select',
      fieldProps: {
        options: [
          { label: '开启', value: 'off' },
          { label: '关闭', value: 'on' },
        ],
      },
      render: (_, record) => {
        console.log('record', record);
        return (
          <Button
            //   type="primary"
            onClick={() => {
              //   console.log('record', record);
              handleOpenModal(record);
            }}
          >
            {record.is_open}
          </Button>
        );
      },
    },
    {
      title: '测试cron',
      dataIndex: 'cron',
      copyable: true,
      valueType: 'text',
    },
    {
      title: '测试计划id',
      width: 100,
      dataIndex: 'plan_id',
      copyable: true,
      ellipsis: true,
      valueType: 'text',
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
            history.push(`/openapitest/caseplandetaile/${record.id}`);
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
    <>
      <PageContainer header={{ title: false }}>
        <ProCard>
          <ProTable<TestRun.GetCaseResultParams, TestRun.GetCaseResultResponse>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            scroll={{ x: 'max-content' }} // 设置水平滚动
            request={async (params, sort, filter) => {
              console.log(sort, filter);
              // await waitTime(20);
              const res = await listCasePlant(params);
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
                onClick={() => {
                  // actionRef.current?.reload();
                  history.push('/openapitest/createcaseplan');
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
        title="确认状态变更"
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        {currentRecord && (
          <p>
            当前状态为: <strong>{currentRecord.is_open}</strong>。您希望将其更改为:
            <strong>{currentRecord.is_open === 'on' ? 'off' : 'on'}</strong> 吗？
          </p>
        )}
      </Modal>
    </>
  );
};
