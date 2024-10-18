declare namespace TestSuite {
    // 创建测试套件body
    export interface CreateSuiteBody {
	project: number;
	suite_name: string;
	describe: string;
	case_ids: string;
	test_type: string;
	test_env: string;
    }
    

    export interface Project {
      add_time: string;
      id: number;
      is_deleted: boolean;
      project_desc: string;
      project_name: string;
      project_owners: string;
      update_time: string;
    }

    // 更新Suite,单个Suite的结构都可以用这个 
    export interface Suite {
      add_time?: string;
      case_sences?: any;
      describe?: string;
      id: number;
      project?: Project;
      suite_name?: string;
      update_time?: string;
    }

    export interface CreateSuiteData {
      suite: Suite;
    }
    // 创建测试套件响应
    export interface CreateSuiteResponse {
      data: CreateSuiteData;
      msg: string;
      success: boolean;
    }
    // 更新测试套件列表响应
    export interface UpdateSuiteResponse {
      data?: any;
      msg: string;
      success: boolean;
    }
    // 根据case_sences同步测试套件body
    export interface SyncSuiteByCaseSenceBody {
      id: number;
      case_sences: string[];
    }

    export interface SynceSuiteByCaseSenceData {
      suite: Suite;
    }
    // 根据case_sences同步测试套件响应
    export interface SyncSuiteByCaseSenceResponse {
      data: SynceSuiteByCaseSenceData;
      msg: string;
      success: boolean;
    }

    // 删除测试套件body
    export interface DeleteSuiteBody {
      id: number;
    }

    // 删除测试套件响应
    export interface DeleteSuiteResponse {
      data?: any;
      msg: string;
      success: boolean;
    }
    // 查询测试套件params
    export interface GetSuitesParams {
      id?: number;
      project?: number;
      suite_name?: string;
      describe?: string;
      case_ids?: string;
      test_type?: string;
      test_env?: string;
      pageSize?: number;
      current?: number;
    }
    // 查询测试套件响应
    export interface GetSuitesResponse {
      data: Suite[];
      msg: string;
      success: boolean;
    }

    
}
