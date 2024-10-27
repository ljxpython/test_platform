import { listCasePlant, setCaseResultByCron } from '@/services/test_plan';
import { getSuiteList, syncSuiteByCaseIds } from '@/services/test_suite';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { history, useParams } from '@umijs/max';
import { CopyOutlined } from '@ant-design/icons';
import { Col, Row, Space, message, Descriptions, Tooltip, Button } from 'antd';

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

  const [casesence, setCasesence] = useState<string[]>([]); // 初始化为空数组
  const [projectList, setProjectList] = useState<string[]>([]); // 初始化为空数组

  const [suiteList, setSuiteList] = useState<string[]>([]); // 初始化为空数组
  const getsuite = async () => {
    try {
      const response = await getSuiteList();
      console.log('suiterespnse', response);
      const suiteList = response.data.map((item: any) => ({
        label: item.suite_name,
        value: item.id,
      }));
      setSuiteList(suiteList);
    } catch (error) {
      console.error('Error fetching suite list:', error);
    }
  };
  // 下面两个useEffect是用于获取project的值,我到现在也不知道为什么要写两个
  // 使用 useEffect 监听 casesence 的变化
  useEffect(() => {
    console.log('获取suiteList的值', suiteList);
  }, [suiteList]); // 依赖于 casesence，任何变化都会打印

  // 在组件加载时调用 getcasesence
  useEffect(() => {
    getsuite();
  }, []);

  const params = useParams();
  const id = params.id; // 获取具体的 ID

  return (
    <PageContainer header={{ title: false }}>
      <ProCard>
        <ProForm<TestPlan.SetCaseResultByCronBody>
          {...formItemLayout}
          layout={formLayoutType}
          submitter={{
            // 配置按钮文本
            searchConfig: {
              resetText: '重置',
              submitText: '更新',
            },
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
            const res = await setCaseResultByCron(values);
            console.log(res);
            message.success('提交成功:');
            // 跳转回项目列表页面
            history.push('/openapitest/caseplanlist');
          }}
          formRef={formRef}
          params={{}}
          request={async () => {
            // await waitTime(100);
            const res = await listCasePlant({ id: id });
            console.log('res1', res);
            console.log('res.data[0]', res.data[0]);

            let plan_id = ''; // 初始化 plan_id

            // 确保 res.data 存在且数组长度大于 0，并且 plan_id 存在
            if (res.data && res.data.length > 0 && res.data[0].plan_id) {
              plan_id = res.data[0].plan_id;
            } else {
              plan_id = '';
            }

            console.log('plan_id', plan_id);

            return {
              id: res.data[0].id,
              cron: res.data[0].cron,
              is_open: res.data[0].is_open,
              plan_name: res.data[0].plan_name,
              plan_id: plan_id,
              suite: res.data[0].suite,
              test_env: res.data[0].test_env,
              run_once: null,
            };
          }}
        >
          <ProFormDigit name="id" label="测试计划ID" width="lg" disabled />
          <ProFormSelect key="suite" options={suiteList} name="suite" label="测试套件" />

          <ProFormText
            width="md"
            name="plan_name"
            label="测试计划名称"
            tooltip="最长为 24 个字符,且不能重复"
            placeholder="请输入名称"
          />
          <ProFormSelect
            key="test_env"
            options={[
              { label: '测试环境', value: 'boe' },
              { label: '线上环境', value: 'online' },
            ]}
            name="test_env"
            label="测试环境"
          />
          <ProFormText
            width="md"
            name="is_open"
            label="是否启用"
            tooltip="该功能请到测试计划详情页面点击开启或者关闭"
            disabled
          />
          <ProFormText width="md" name="plan_id" label="后端计划ID" disabled />
          <ProFormText
            width="md"
            name="cron"
            label="定时任务"
            tooltip="可以参考下方输入框中的cron表达式"
            addonAfter={
              <a
                href="https://en.wikipedia.org/wiki/Cron"
                target="_blank"
                rel="noopener noreferrer"
              >
                cron语法
              </a>
            }
          />
          <ProFormSelect
            name="run_once"
            label="是否立即执行"
            options={[
              { label: '是', value: '1' },
              { label: '否', value: null },
            ]}
          />
        </ProForm>
      </ProCard>
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
              label={<span style={{ width: '100px', display: 'inline-block' }}>{description}</span>}
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
    </PageContainer>
  );
};
