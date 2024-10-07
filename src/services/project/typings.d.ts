declare namespace ProjectApi {
  type ProjectParams = {
    project_name?: string;
    project_desc?: string;
    project_owners?: string;
    page?: number;
    pageSize?: number;
    current?: number;
  };

  interface ProjectDesc {
    add_time: string;
    project_desc: string;
    project_name: string;
    project_owners: string;
    update_time: string;
  }

  interface ProjectList {
    project: ProjectDesc;
  }

  interface CreateProjectResponse {
    data: ProjectList;
    msg: string;
    success: boolean;
  }

  interface ProjectLists {
    current: number;
    data: ProjectList[];
    pageSize: number;
    total: number;
  }
}
