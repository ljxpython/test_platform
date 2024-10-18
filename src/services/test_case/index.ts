import { request } from '@umijs/max';

/** 同步测试case POST /api/auto_pytest/sync_test_case */
export async function syncTestCase(data: any,options?: { [key: string]: any },) {
  return request<TestCase.SyncTestCaseResponse>('/api/auto_pytest/sync_test_case', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}

/** 查询测试case POST /api/auto_pytest/get_case */
export async function getCase(data: TestCase.GetCaseParams,options?: { [key: string]: any },) {
  return request<TestCase.GetCaseResponse>('/api/auto_pytest/get_case', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}

/** 查询测试case场景 POST /api/auto_pytest/get_case_sence */
export async function getCaseSence(data: any,options?: { [key: string]: any },) {
  return request<TestCase.GetCaseSenceResponse>('/api/auto_pytest/get_case_sence', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}


