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
import { history } from '@umijs/max';
import { Col, Row, Space, message } from 'antd';
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

  return (
    <PageContainer header={{ title: false }}>
      <ProCard>
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

          {/* <ProFormSelect
            key="case_sences"
            options={casesence}
            width="md"
            name="case_sences"
            label="测试场景"
            mode="multiple" // 是多个值还是单个值
          />

          <ProFormText
            width="md"
            name="describe"
            label="套件描述"
            // placeholder="格式:成员1 成员2 ..."
            // rules={[{ required: true, message: '请描述清该套件的用途!' }]}
          /> */}
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};
