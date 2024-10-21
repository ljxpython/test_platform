import { request } from '@umijs/max';

/** 创建测试计划 /api/auto_pytest/create_case_plant POST */
export async function createCasePlant(body: TestPlan.CreateCasePlanBody, options?: { [key: string]: any }) {
  return request<TestPlan.CreateCasePlanResponse>('/api/auto_pytest/create_case_plant', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
    
}

/** 获取测试计划列表 /api/auto_pytest/list_case_plant GET */
export async function listCasePlant(params: TestPlan.ListCasePlanParams,options?: { [key: string]: any }) {
  return request<TestPlan.ListCasePlanResponse>('/api/auto_pytest/list_case_plant', {
      method: 'GET',
      params: { ...params },
    ...(options || {}),
  });
}

/** 删除测试计划 /api/auto_pytest/del_case_plant POST */
export async function delCasePlant(body: TestPlan.DelCasePlanBody, options?: { [key: string]: any }) {
  return request<TestPlan.DelCasePlanResponse>('/api/auto_pytest/del_case_plant', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新测试计划 /api/auto_pytest/update_case_plant POST */
export async function updateCasePlant(body: TestPlan.UpdateCasePlanBody, options?: { [key: string]: any }) {
  return request<TestPlan.UpdateCasePlanResponse>('/api/auto_pytest/update_case_plant', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
  });
}

/** 定时执行测试计划 /api/auto_pytest/set_case_result_by_cron POST */
export async function setCaseResultByCron(body: TestPlan.SetCaseResultByCronBody, options?: { [key: string]: any }) {
  return request<TestPlan.SetCaseResultByCronResponse>('/api/auto_pytest/set_case_result_by_cron', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
      data: body,
      ...(options || {}),
  });
}
