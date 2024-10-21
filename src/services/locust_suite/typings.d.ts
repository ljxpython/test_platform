declare namespace LocustSuite {
  // create_locust_suite 创建测试套件
  interface CreateLocustSuiteParams {
    suite_name: string;
    describe: string;
    case_ids: string;
  }

  export interface Suite {
    add_time: string;
    case_ids?: any;
    case_sences?: any;
    describe: string;
    id: number;
    suite_name: string;
    update_time: string;
  }

  export interface SuiteMsg {
    suite: Suite;
  }

  export interface CreateLocustSuiteResponse {
    data: SuiteMsg;
    msg: string;
    success: boolean;
  }
  // delete_locust_suite 删除测试套件接口 body参数
  interface DeleteLocustSuiteParams {
    id: number;
  }
  export interface DeleteLocustSuiteResponse {
    msg: string;
    success: boolean;
  }
  // sync_locust_suite_by_case_ids 根据caseids更新测试套件接口 body参数
  interface SyncLocustSuiteByCaseIdsParams {
    id: number;
    case_sences: string[];
    suite_name: string;
    describe: string;
  }
  export interface SyncLocustSuiteByCaseIdsResponse {
    data: SuiteMsg;
    msg: string;
    success: boolean;
  }
    // query_locust_suite 查询测试套件接口params
    interface QueryLocustSuiteParams {
      id?: number;
    suite_name?: string;
    describe?: string;
      case_ids?: string;
      current?: number;
      pageSize?: number;
    }
    export interface LocustSuiteMsg {
      add_time: string;
      case_sences: string;
      describe: string;
      id: number;
      suite_name: string;
      update_time: string;
    }

    export interface QueryLocustSuiteResponse {
      current: number;
      data: LocustSuiteMsg[];
      pageSize: number;
      total: number;
    }
    
}
