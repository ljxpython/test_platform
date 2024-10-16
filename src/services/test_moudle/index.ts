import { request } from '@umijs/max';

/**  同步测试模块 POST /api/auto_pytest/sync_test_moudle */
export async function syncTestMoudle(body: any, options?: { [key: string]: any }) {
  return request<TestMoudle.SyncTestMoudleResponse>('/api/auto_pytest/sync_test_moudle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**  更新测试模块 /api/auto_pytest/update_test_moudle */
export async function updateTestMoudle(body: TestMoudle.UpdateTestMoudleParams, options?: { [key: string]: any }) {
  return request<TestMoudle.UpdateTestMoudleResponse>('/api/auto_pytest/update_test_moudle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
    
}

/** 查询测试模块 /api/auto_pytest/query_test_moudle */
export async function queryTestMoudle(params: TestMoudle.QueryMoudleListParams,options?: { [key: string]: any }) {
  return request<TestMoudle.QueryMoudleListResponse>('/api/auto_pytest/query_test_moudle', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

