import { request } from '@umijs/max';

/** 根据条件查找locust测试case /api/locust_test/get_locust_case POST */
export async function getLocustCaseUsingPOST(params: LocustCase.GetLocustCaseParams, options?: { [key: string]: any }) {
  return request<LocustCase.GetLocustCaseResponse>('/api/locust_test/get_locust_case', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });   
}

/** 同步locust测试case /api/locust_test/sync_locust_case POST */
export async function syncLocustCaseUsingPOST(options?: { [key: string]: any }) {
  return request<LocustCase.SyncLocustCaseResponse>('/api/locust_test/sync_locust_case', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除locust测试case /api/locust_test/delete_locust_case POST */
export async function deleteLocustCaseUsingPOST(params: LocustCase.DeleteLocustCaseParams, options?: { [key: string]: any }) {
  return request<LocustCase.DeleteLocustCaseResponse>('/api/locust_test/delete_locust_case', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });
}
