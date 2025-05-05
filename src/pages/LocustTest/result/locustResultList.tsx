import { queryLocustResult, deleteLocustResult } from '@/services/locust_result';
import { PlusOutlined } from '@ant-design/icons';
import { getLocustCase, syncLocustCase, deleteLocustCase } from '@/services/locust_case';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProTable, TableDropdown } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, message, Modal,Alert } from 'antd';
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
  const [altervisible, setAltervisible] = useState(true); // 状态来控制公告的显示与否

  const getcasesence = async () => {
    try {
      let response = await getLocustCase({});
      console.log(response);
      const caseScenes = response.data.map((item) => item.case_sence);

      setCasesence(caseScenes);
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

  const columns: ProColumns<LocustResult.LocustResultMsg>[] = [
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
      width: 2,
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
              history.push(`/locust/locustcasesuitedetaile/${record.locustsuite}`);
            }}
            target="_blank"
            rel="noopener noreferrer"
            key="view"
          >
            {record.locustsuite}
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
        Done: { text: '完成', status: 'Processing' },
        Running: { text: '运行中', status: 'Processing' },
      },
    },
    {
      title: '测试报告链接',
      dataIndex: 'report_link',
      copyable: true,
      ellipsis: true,
      valueType: 'text',
      render: (_, record) => {
        return record.report_link ? (
          <a href={record.report_link} target="_blank" rel="noopener noreferrer" key="view">
            测试报告
          </a>
        ) : (
          <span>暂无</span> // 当没有 report_link 时显示“无”
        );
      },
    },
    {
      title: '测试报告下载',
      dataIndex: 'report_download',
      copyable: true,
      ellipsis: true,
      valueType: 'text',
      render: (_, record) => {
        return record.report_download ? (
          <a href={record.report_download} target="_blank" rel="noopener noreferrer" key="view">
            下载报告
          </a>
        ) : (
          <span>暂无</span> // 当没有 report_download 时显示“无”
        );
      },
    },
    {
      title: '测试环境',
      dataIndex: 'test_env',
      valueType: 'select',
      valueEnum: {
        boe: { text: '测试环境', status: 'warning' },
        online: { text: '线上环境', status: 'success' },
      },
      fieldProps: {
        options: [
          { label: 'boe', value: '测试' },
          { label: 'online', value: '线上' },
        ],
      },
    },
    {
      title: '测试类型',
      dataIndex: 'test_type',
      valueType: 'select',
      fieldProps: {
        options: [
          { label: '手工测试', value: 'manual' },
          { label: '自动化触发', value: 'webhook' },
          { label: '定时任务', value: 'cron' },
        ],
      },
      render: (_, record) => {
        // 检查 test_type 是否存在，不存在则默认返回 '手工测试'
        const test_type = record.test_type || 'manual'; // 如果没有 test_type，默认值为 'manual'
        return test_type;
      },
    },
    {
      title: '测试任务id',
      dataIndex: 'task_id',
      valueType: 'text',
    },
    // {
    //   title: '测试计划id',
    //   dataIndex: 'plan_id',
    //   valueType: 'text',
    //   tooltip: '只有定时任务才会有值,其余类型为空',
    //   render: (_, record) => {
    //     return record.plan_id ? (
    //       <a
    //         href={`/openapitest/caseplandetaile/${record.plan_id}`}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         key="view"
    //       >
    //         {record.plan_id}
    //       </a>
    //     ) : (
    //       <span>无</span> // 当没有 plan_id 时显示“无”
    //     );

    //   }

    // },
    {
      title: '执行测试人员',
      dataIndex: 'test_user',
      valueType: 'text',
      render: (_, record) => {
        // 检查 test_type 是否存在，不存在则默认返回 '手工测试'
        const test_user = record.test_user || 'test'; // 如果没有 test_type，默认值为 'manual'
        return test_user;
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
            history.push(`/locust/resultdetaile/${record.id}`);
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
                const res = await deleteLocustResult({ ...record });
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
        {/* 仅在 visible 为 true 时显示公告 */}
        {altervisible && (
          <Alert
            message="使用建议"
            description={
              <>
                请不要随意删除测试数据,因为数据非mock,会直接删除相关数据
                <br />
                有些测试报告可能无法正常打开,因为服务器空间有限(存储将满),删除了服务器中的相关测试报告
                <br />
              </>
            }
            type="info"
            showIcon
            closable // 允许关闭
            onClose={() => setVisible(false)} // 关闭时设置状态为 false
            style={{ marginBottom: 16 }} // 添加底部间距
          />
        )}
        <ProCard>
          <ProTable<LocustResult.LocustResultMsg, LocustResult.ListLocustResultResponse>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            scroll={{ x: 'max-content' }} // 设置水平滚动
            request={async (params, sort, filter) => {
              console.log(sort, filter);
              // await waitTime(20);
              const res = await queryLocustResult(params);
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
              // <Button
              //   key="button"
              //   icon={<PlusOutlined />}
              //   onClick={() => {
              //     // actionRef.current?.reload();
              //     history.push('/openapitest/createcaseplan');
              //   }}
              //   type="primary"
              // >
              //   新建
              // </Button>,
            ]}
          />
        </ProCard>
      </PageContainer>
    </>
  );
};
