import {
  ProForm,
  ProFormSelect,
  ProCard,
  PageContainer,
  ProFormCheckbox,
} from '@ant-design/pro-components';
import { Switch } from 'antd';
import { useState } from 'react';
import { Button } from 'antd';

export default () => {
  const [readonly, setReadonly] = useState(false);
  const onFinish = (values) => {
    console.log('表单提交:', values);
  };
    return (
      <PageContainer>
        <ProCard>
          <ProForm
            // readonly={readonly}
            onClick={async (value) => {
              console.log(value);
            }}
            submitter={{
              searchConfig: {
                submitText: '查询1',
                resetText: '重置1',
              },
            }}
            // initialValues={{
            //   userQuery: [{ label: '全部', value: 'all' }],
            // }}
            // onFinish={async (value) => {
            //   console.log(value);
            // }}
          >
            <ProForm.Group>
              {/* <ProFormSelect.SearchSelect
            name="userQuery"
            label="查询选择器 - request"
            fieldProps={{
              labelInValue: true,
              style: {
                minWidth: 140,
              },
            }}
            debounceTime={300}
            request={async ({ keyWords = '' }) => {
              return [
                { label: '全部', value: 'all' },
                { label: '未解决', value: 'open' },
                { label: '未解决(已分配)', value: 'assignees' },
                { label: '已解决', value: 'closed' },
                { label: '解决中', value: 'processing' },
              ].filter(({ value, label }) => {
                return value.includes(keyWords) || label.includes(keyWords);
              });
            }}
          />
          <ProFormSelect.SearchSelect
            name="userQuery2"
            label="查询选择器 - valueEnum"
            fieldProps={{
              style: {
                minWidth: 140,
              },
            }}
            valueEnum={{
              all: { text: '全部', status: 'Default' },
              open: {
                text: '未解决',
                status: 'Error',
              },
              closed: {
                text: '已解决',
                status: 'Success',
              },
              processing: {
                text: '解决中',
                status: 'Processing',
              },
            }}
          /> */}
              <ProFormSelect.SearchSelect
                name="用户使用"
                label="查询选择器-多选 - options"
                fieldProps={{
                  labelInValue: false,
                  placeholder: '请输入用户名',
                  maxLength: 20,
                  style: {
                    minWidth: 140,
                  },
                }}
                options={[
                  { label: '全部', value: 'all' },
                  { label: '未解决', value: 'open' },
                  { label: '已解决', value: 'closed' },
                  { label: '解决中', value: 'processing' },
                ]}
              />
            </ProForm.Group>
          </ProForm>
        </ProCard>
        <ProCard title="查询选择器-多选 - request">
          <ProForm onFinish={onFinish}>
            <ProFormCheckbox.Group
              name="features"
              label="选择特性"
              options={[
                { label: '特性 A', value: 'featureA' },
                { label: '特性 B', value: 'featureB' },
                { label: '特性 C', value: 'featureC' },
              ]}
              fieldProps={{
                onChange: (checkedValues) => {
                  console.log('选中的特性:', checkedValues);
                },
              }}
            />
            {/* <Button type="primary" htmlType="submit">
              提交
            </Button> */}
          </ProForm>
        </ProCard>
      </PageContainer>

      // <div
      //   style={{
      //     padding: 24,
      //   }}
      // >
      //   <Switch
      //     style={{
      //       marginBlockEnd: 16,
      //     }}
      //     checked={readonly}
      //     checkedChildren="编辑"
      //     unCheckedChildren="只读"
      //     onChange={setReadonly}
      //   />

      // </div>
    );
};
