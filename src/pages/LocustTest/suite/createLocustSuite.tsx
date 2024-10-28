import { getLocustCase } from '@/services/locust_case';
import { createLocustSuite } from '@/services/locust_suite';
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

  const [casesence, setCasesence] = useState<string[]>([]); // 初始化为空数组
  // const [projectList, setProjectList] = useState<string[]>([]); // 初始化为空数组
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

  return (
    <PageContainer header={{ title: false }}>
      <ProCard>
        <ProForm<LocustSuite.CreateLocustSuiteParams>
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
            const res = await createLocustSuite(values);
            console.log(res);
            message.success('提交成功:');
            // 跳转回项目列表页面
            history.push('/locust/locustcasesuitelist');
          }}
          formRef={formRef}
          params={{}}
          request={async () => {
            await waitTime(100);
            return {
              project_name: '测试模块-线上线下-接口UI性能测试',
              // useMode: 'chapter',
            };
          }}
        >
          <ProFormText
            width="md"
            name="suite_name"
            label="测试套件名称"
            tooltip="最长为 24 个字符,且不能重复"
            placeholder="请输入名称"
            rules={[{ required: true, message: '请输入套件名称!' }]}
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
          />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};
