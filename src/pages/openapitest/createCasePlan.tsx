import { getCaseSence } from '@/services/test_case';
import { getProjectList } from '@/services/test_project';
import {
  createCasePlant,
  listCasePlant,
  delCasePlant,
  updateCasePlant,
  setCaseResultByCron,
} from '@/services/test_plan';
import { createSuite,updateSuite,syncSuiteByCaseIds ,deleteSuite,getSuiteList} from '@/services/test_suite';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  
} from '@ant-design/pro-components';
import { CopyOutlined } from '@ant-design/icons';

import { history } from '@umijs/max';
import { Col, Row, Space, message, Descriptions, Tooltip, Button,Alert } from 'antd';
import { useEffect, useRef, useState } from 'react';

type LayoutType = Parameters<typeof ProForm>[0]['layout'];
const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [formLayoutType, setFormLayoutType] = useState<LayoutType>(LAYOUT_TYPE_HORIZONTAL);
  const formRef = useRef<ProFormInstance>();
  const formItemLayout =
    formLayoutType === LAYOUT_TYPE_HORIZONTAL
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;

  const [suiteList, setSuiteList] = useState<string[]>([]); // 初始化为空数组

  const [casesence, setCasesence] = useState<string[]>([]); // 初始化为空数组
  const [projectList, setProjectList] = useState<string[]>([]); // 初始化为空数组

  //   const getcasesence = async () => {
  //     try {
  //       let data = await getCaseSence({});
  //       console.log(data);
  //       console.log('case_sence_list', data.data.case_sence_list);
  //       setCasesence(data.data.case_sence_list);
  //       // console.log('获取casesence的值', casesence);
  //     } catch (error) {
  //       console.error('获取选项失败:', error);
  //     }
  //   };

  const getSuite = async () => {
    try {
      let data = await getSuiteList({});
      console.log(data);
      console.log('suite_list', data.data);
      const transformedData = data.data.map((item) => ({
        value: item.id,
        label: item.suite_name,
      }));
      console.log('transformedData', transformedData);
      setSuiteList(transformedData);
      // console.log('获取suite的值', suiteList);
    } catch (error) {
      console.error('获取选项失败:', error);
    }
  };
  // 下面两个useEffect是用于获取suite的值,我到现在也不知道为什么要写两个
  // 使用 useEffect 监听 casesence 的变化
  useEffect(() => {
    console.log('获取suite的值', suiteList);
  }, [suiteList]); // 依赖于 casesence，任何变化都会打印

  // 在组件加载时调用 getcasesence
  useEffect(() => {
    getSuite();
  }, []);

  //   // 下面两个useEffect是用于获取casesence的值,我到现在也不知道为什么要写两个
  //   // 使用 useEffect 监听 casesence 的变化
  //   useEffect(() => {
  //     console.log('获取casesence的值', casesence);
  //   }, [casesence]); // 依赖于 casesence，任何变化都会打印

  //   // 在组件加载时调用 getcasesence
  //   useEffect(() => {
  //     getcasesence();
  //   }, []);

  //   const getProject = async () => {
  //     try {
  //       let data = await getProjectList({});
  //       console.log(data);
  //       console.log('project_list', data.data);
  //       const transformedData = data.data.map((item) => ({
  //         value: item.id,
  //         label: item.project_name,
  //       }));
  //       console.log('transformedData', transformedData);
  //       setProjectList(transformedData);
  //       // console.log('获取project的值', projectList);
  //     } catch (error) {
  //       console.error('获取选项失败:', error);
  //     }
  //   };
  //   // 下面两个useEffect是用于获取project的值,我到现在也不知道为什么要写两个
  //   // 使用 useEffect 监听 casesence 的变化
  //   useEffect(() => {
  //     console.log('获取projectlist的值', projectList);
  //   }, [projectList]); // 依赖于 casesence，任何变化都会打印

  //   // 在组件加载时调用 getcasesence
  //   useEffect(() => {
  //     getProject();
  //   }, []);
  const [altervisible, setAltervisible] = useState(true); // 状态来控制公告的显示与否

  return (
    <PageContainer header={{ title: false }}>
      <ProCard>
        {/* 仅在 visible 为 true 时显示公告 */}
        {altervisible && (
          <Alert
            message="使用建议"
            description="测试环境为本人调试脚本使用,请选择线上环境进行测试"
            type="info"
            showIcon
            closable // 允许关闭
            onClose={() => setVisible(false)} // 关闭时设置状态为 false
            style={{ marginBottom: 16 }} // 添加底部间距
          />
        )}
        <ProForm<TestPlan.CreateCasePlanBody>
          {...formItemLayout}
          layout={formLayoutType}
          submitter={{
            render: (props, doms) => {
              return formLayoutType === LAYOUT_TYPE_HORIZONTAL ? (
                <Row>
                  <Col span={14} offset={4}>
                    <Space>{doms}</Space>
                  </Col>
                </Row>
              ) : (
                doms
              );
            },
          }}
          onFinish={async (values) => {
            await waitTime(200);
            console.log(values);
            const val1 = await formRef.current?.validateFields();
            console.log('validateFields:', val1);
            const val2 = await formRef.current?.validateFieldsReturnFormatValue?.();
            console.log('validateFieldsReturnFormatValue:', val2);
            const res = await createCasePlant(values);
            console.log(res);
            message.success('提交成功:');
            // 跳转回项目列表页面
            history.push('/openapitest/caseplanlist');
          }}
          formRef={formRef}
          params={{}}
          //   request={async () => {
          //     await waitTime(100);
          //     return {
          //       project_name: '测试模块-线上线下-接口UI性能测试',
          //       // useMode: 'chapter',
          //     };
          //   }}
        >
          <ProFormText
            width="md"
            name="plan_name"
            label="测试计划名称"
            tooltip="最长为 24 个字符,且不能重复"
            placeholder="请输入名称"
            rules={[{ required: true, message: '请输入测试计划名称!' }]}
            formItemProps={{
              rules: [
                {
                  required: true,
                  message: '此项为必填项',
                },
              ],
            }}
          />
          <ProFormSelect
            key="suite"
            options={suiteList}
            width="md"
            name="suite"
            label="测试计划所属套件"
            // mode="multiple" // 是多个值还是单个值
          />
          <ProFormSelect
            width="md"
            name="test_env"
            label="测试环境"
            options={[
              {
                label: '线上',
                value: 'online',
              },
              {
                label: '线下',
                value: 'boe',
              },
            ]}
            rules={[{ required: true, message: '请选择测试环境!' }]}
          />

          <ProFormText
            width="md"
            name="is_open"
            label="是否开启"
            initialValue="off"
            disabled
            tooltip="默认关闭,如果想要开启，请在创建完测试计划后在测试计划详情页面中进行操作"
          ></ProFormText>
          <ProFormText
            width="md"
            name="cron"
            label="定时任务"
            addonAfter={
              <a
                href="https://en.wikipedia.org/wiki/Cron"
                target="_blank"
                rel="noopener noreferrer"
              >
                cron语法
              </a>
            }
            tooltip="相关语法请参考:https://en.wikipedia.org/wiki/Cron"
          ></ProFormText>
          <ProCard title="cron常见用法" style={{ margin: '20px' }}>
            <Descriptions bordered column={1}>
              {[
                { cron: '* * * * *', description: '每分钟执行一次' },
                { cron: '0 * * * *', description: '每小时执行一次' },
                { cron: '0 0 * * *', description: '每天午夜执行' },
                { cron: '0 0 * * 1', description: '每周一执行' },
                { cron: '0 0 1 * *', description: '每月的第一天执行' },
                { cron: '15 * * * *', description: '每小时的第15分钟执行' },
                { cron: '0 9-17 * * *', description: '每天上午 9 点到 5 点每小时执行一次' },
                { cron: '*/5 * * * *', description: '每 5 分钟执行一次' },
                { cron: '0 0 L * *', description: '每月的最后一天执行' },
                { cron: '0 0 * * 0', description: '每周的最后一天（星期天）执行' },
              ].map(({ cron, description }) => (
                <Descriptions.Item
                  label={
                    <span style={{ width: '100px', display: 'inline-block' }}>{description}</span>
                  }
                  key={cron}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>{cron}</span>
                    <Tooltip title="复制">
                      <Button
                        type="link"
                        icon={<CopyOutlined />}
                        onClick={() => {
                          navigator.clipboard
                            .writeText(cron)
                            .then(() => {
                              // 可选：在此处添加成功提示
                              console.log('复制成功:', cron);
                            })
                            .catch((err) => {
                              console.error('复制失败:', err);
                            });
                        }}
                        style={{ marginLeft: '10px' }}
                      />
                    </Tooltip>
                  </div>
                </Descriptions.Item>
              ))}
            </Descriptions>
          </ProCard>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};
