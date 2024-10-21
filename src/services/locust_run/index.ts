import { request } from '@umijs/max';

/** 运行locust测试 /api/locust_test/run_locust_test POST */
export async function runLocustTest(body?: LocustRun.RunLocustTestRequest, options?: { [key: string]: any }) {
  return request<LocustRun.RunLocustTestResponse>('/api/locust_test/run_locust_test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 停止locust测试 /api/locust_test/stop_locust_test POST */
export async function stopLocustTest(options?: { [key: string]: any }) {
  return request<LocustRun.StopLocustTaskResponse>('/api/locust_test/stop_locust_test', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取当前locust测试状态 /api/locust_test/get_locust_test_detail GET */
export async function getLocustTestDetail(options?: { [key: string]: any }) {
  return request<LocustRun.GetLocustTestDetailResponse>('/api/locust_test/get_locust_test_detail', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取当前是否有locust进程 /api/locust_test/check_locust_process GET */
export async function checkLocustProcess(options?: { [key: string]: any }) {
  return request<LocustRun.CheckLocustProcessResponse>('/api/locust_test/check_locust_process', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 强制停止locust测试 /api/locust_test/force_stop_locust_test POST */
export async function forceStopLocustTest(options?: { [key: string]: any }) {
  return request<LocustRun.StopLocustTaskResponse>('/api/locust_test/force_stop_locust_test', {
    method: 'POST',
    ...(options || {}),
  });
}
