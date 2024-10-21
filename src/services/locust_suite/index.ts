import { request } from '@umijs/max';


/** 创建测试套件 /api/locust_test/create_locust_suite POST */
export async function createLocustSuite(body: LocustSuite.CreateLocustSuiteParams, options?: { [key: string]: any }) {
  return request<LocustSuite.CreateLocustSuiteResponse>('/api/locust_test/create_locust_suite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),

  });
}

/** 删除测试套件 /api/locust_test/delete_locust_suite POST */
export async function deleteLocustSuite(body: LocustSuite.DeleteLocustSuiteParams, options?: { [key: string]: any }) {
  return request<LocustSuite.DeleteLocustSuiteResponse>('/api/locust_test/delete_locust_suite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
      ...(options || {}), 
  });
}

/** 获取测试套件列表 /api/locust_test/query_locust_suite GET */
export async function queryLocustSuite(params:LocustSuite.QueryLocustSuiteParams ,options?: { [key: string]: any }) {
  return request<LocustSuite.QueryLocustSuiteResponse>('/api/locust_test/query_locust_suite', {
      method: 'GET',
      params: { ...params },
    ...(options || {}),

  });
}

/** 根据caseids更新测试套件 /api/locust_test/sync_locust_suite_by_case_ids POST */
export async function syncLocustSuiteByCaseIds(body: LocustSuite.SyncLocustSuiteByCaseIdsParams, options?: { [key: string]: any }) {
  return request<LocustSuite.SyncLocustSuiteByCaseIdsResponse>('/api/locust_test/sync_locust_suite_by_case_ids', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
      data: body,
      ...(options || {}),
  });
}
