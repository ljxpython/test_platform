import { request } from '@umijs/max';

/** 指定时间执行测试 /api/auto_pytest/run_case_result_by_time */
export async function runCaseResultByTime(body: TestRun.RunCaseResultByTimeBody, options?: { [key: string]: any }) {
  return request<TestRun.RunCaseResultByTimeResponse>('/api/auto_pytest/run_case_result_by_time', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
    data: body,
    ...(options || {}),
  });
}

/** 指定时间执行测试 /api/auto_pytest/get_case_result */
export async function getCaseResult(params: TestRun.GetCaseResultParams, options?: { [key: string]: any }) {
  return request<TestRun.GetCaseResultResponse>('/api/auto_pytest/get_case_result', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}



