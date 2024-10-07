import { request } from '@umijs/max';

/**  创建测试项目 POST /api/auto_pytest/create_project */
export async function createProject(body: ProjectApi.ProjectParams, options?: { [key: string]: any }) {
  return request<ProjectApi.ProjectList>('/api/auto_pytest/create_project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
      ...(options || {}),
  });
}

/** 修改测试项目 POST /api/auto_pytest/update_project */
export async function updateProject(body: ProjectApi.ProjectParams, options?: { [key: string]: any }) {
  return request<ProjectApi.ProjectList>('/api/auto_pytest/update_project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
      ...(options || {}),
  });
}

/**  删除测试项目 POST /api/auto_pytest/delete_project */
export async function deleteProject(body: ProjectApi.ProjectParams, options?: { [key: string]: any }) {
  return request<ProjectApi.ProjectList>('/api/auto_pytest/delete_project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
      ...(options || {}),
  });
}

/**  获取测试项目列表 GET /api/auto_pytest/get_project_list */
export async function getProjectList( params: ProjectApi.ProjectParams, options?: { [key: string]: any }) {
  return request<ProjectApi.ProjectLists>('/api/auto_pytest/get_project_list', {
    method: 'GET',
      headers: {
        'Content-Type': 'application/json',
    },
    params: { ...params },
  });
}
