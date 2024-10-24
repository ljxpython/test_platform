import { getProjectList } from '@/services/test_project';
import { getSuiteList } from '@/services/test_suite';

import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormText,
  ProFormInstance,
  ProFormSelect,} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Col, Row, Space, message } from 'antd';
import { useState } from 'react';
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

  return (
    <PageContainer header={{ title: false }}>
      <ProCard>
        <ProForm<ProjectApi.ProjectParams>
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
            // const res = await createProject(values);
            // console.log(res);
            message.success('提交成功:');
            // 跳转回项目列表页面
            // history.push('/project/list');
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
            name="project_name"
            label="测试项目名称"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
            rules={[{ required: true, message: '请输入项目名称!' }]}
            formItemProps={{
              rules: [
                {
                  required: true,
                  message: '此项为必填项',
                },
              ],
            }}
          />
          <ProFormText
            width="md"
            name="project_owners"
            label="项目成员"
            placeholder="格式:成员1 成员2 ..."
            rules={[{ required: true, message: '请输入测试成员的名称!' }]}
          />
          <ProFormText name="project_desc" width="md" label="项目描述" placeholder="项目描述" />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};
