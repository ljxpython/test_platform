import { request } from '@umijs/max';

/**  查询测试结果 /api/locust_test/query_locust_result GET */
export async function queryLocustResult(params: LocustResult.QueryLocustResultBody, options?: { [key: string]: any }) {
  return request<LocustResult.ListLocustResultResponse>('/api/locust_test/query_locust_result', {
    method: 'GET',
    params: {
      ...params,
      },
    ...(options || {})
  });
}

/**  删除测试结果 /api/locust_test/delete_locust_result POST */
export async function deleteLocustResult(body: LocustResult.DeleteLocustResultBody, options?: { [key: string]: any }) {
  return request<LocustResult.DeleteLocustResultResponse>('/api/locust_test/delete_locust_result', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {})
  }
  );
}
