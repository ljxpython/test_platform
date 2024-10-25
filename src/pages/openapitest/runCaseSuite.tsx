import { getProjectList } from '@/services/test_project';
import { getSuiteList,createSuite,syncSuiteByCaseIds } from '@/services/test_suite';
import { getCase, syncTestCase, getCaseSence } from '@/services/test_case';
import { runCaseResultByTime } from '@/services/test_run';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormText,
  ProFormDigit,
  ProFormInstance,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormSelect,} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Col, Row, Space, message } from 'antd';
import { useParams } from '@umijs/max';

import { useState, useEffect } from 'react';
import { useRef } from 'react';

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
  

  const getProject = async () => {
    try {
      let data = await getProjectList({});
      console.log(data);
      console.log('project_list', data.data);
      const transformedData = data.data.map((item) => ({
        value: item.id,
        label: item.project_name,
      }));
      console.log('transformedData', transformedData);
      setProjectList(transformedData);
      // console.log('获取project的值', projectList);
    } catch (error) {
      console.error('获取选项失败:', error);
    }
  };
  // 下面两个useEffect是用于获取project的值,我到现在也不知道为什么要写两个
  // 使用 useEffect 监听 casesence 的变化
  useEffect(() => {
    console.log('获取projectlist的值', projectList);
  }, [projectList]); // 依赖于 casesence，任何变化都会打印

  // 在组件加载时调用 getcasesence
  useEffect(() => {
    getProject();
  }, []);

  const params = useParams();
  const id = params.id; // 获取具体的 ID

  return (
    <PageContainer header={{ title: false }}>
      <ProCard>
        <ProForm<TestRun.RunCaseResultByTimeBody>
          {...formItemLayout}
          layout={formLayoutType}
          submitter={{
            searchConfig: {
              submitText: '执行',
              resetText: '重置',
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
            const res = await runCaseResultByTime(values);
            console.log(res);
            // if (res.code === 200) {
              // message.success(res.data.msg);
            // }
            message.success(res.msg);
            message.success('提交成功:');
            // 跳转回项目列表页面
            history.push('/openapitest/casesuitelist');
          }}
          formRef={formRef}
          params={{}}
          request={async () => {
            // await waitTime(100);
            const res = await getSuiteList({ id: id });
            console.log('res1', res);
            let casesen: string[] = [];

            // 确保 res.data[0].case_sences 存在，并尝试解析
            if (res.data[0].case_sences) {
              try {
                casesen = JSON.parse(res.data[0].case_sences);
              } catch (error) {
                console.error('解析失败:', error);
                casesen = []; // 解析失败则赋值为空数组
              }
            }

            return {
              id: res.data[0].id,
              suite_name: res.data[0].suite_name,
              projectid: res.data[0].project?.id,
              projectname: res.data[0].project?.project_name,
              case_sences: casesen,
              describe: res.data[0].describe,
              // useMode: 'chapter',
            };
          }}
        >
          <ProFormDigit name="id" label="套件ID" width="lg" disabled />
          <ProFormText
            width="md"
            name="suite_name"
            label="测试套件名称"
            placeholder="请输入名称"
            disabled
          />
          <ProFormDigit key="projectid" width="md" name="projectid" label="所属项目id" disabled />
          <ProFormText
            key="projectname"
            width="md"
            name="projectname"
            label="所属项目名称"
            disabled
          />
          <ProFormSelect
            key="test_env"
            options={[
              {
                label: '线上',
                value: 'online',
              },
              {
                label: '测试',
                value: 'boe',
              },
            ]}
            width="md"
            name="test_env"
            label="运行环境"
            tooltip="选择线上即可，测试环境为作者的调试使用"
          />
          <ProFormDateTimePicker
            key="run_time"
            width="md"
            name="run_time"
            label="运行时间"
            tooltip="选择时间即可，不选择则立即执行"
          />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};
