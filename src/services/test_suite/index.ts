import { request } from 'umi';"@umijs/max";

/** 创建测试套件 POST /api/auto_pytest/create_suite */
export async function createSuite(body: TestSuite.CreateSuiteBody, options?: { [key: string]: any }) {
  return request<TestSuite.CreateSuiteResponse>('/api/auto_pytest/create_suite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 更新测试套件 POST /api/auto_pytest/update_suite */
export async function updateSuite(body: any, options?: { [key: string]: any }) {
  return request<TestSuite.UpdateSuiteResponse>('/api/auto_pytest/update_suite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 根据casesence更新测试套件 POST /api/auto_pytest/sync_suite_by_case_ids */
export async function syncSuiteByCaseIds(body: TestSuite.SyncSuiteByCaseSenceBody, options?: { [key: string]: any }) {
    return request<TestSuite.SyncSuiteByCaseSenceResponse>('/api/auto_pytest/sync_suite_by_case_ids', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}


/** 删除测试套件 POST /api/auto_pytest/delete_suite */
export async function deleteSuite(body: TestSuite.DeleteSuiteBody, options?: { [key: string]: any }) {
  return request<TestSuite.DeleteSuiteResponse>('/api/auto_pytest/delete_suite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...
    (options || {}),
  });
}

/** 查询测试套件 POST /api/auto_pytest/get_suite_list */
export async function getSuiteList(body: TestSuite.GetSuitesParams, options?: { [key: string]: any }) {
  return request<TestSuite.GetSuitesResponse>('/api/auto_pytest/get_suite_list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

