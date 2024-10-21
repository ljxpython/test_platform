declare namespace TestPlan {
  // 这块只需要create_case_plant\update_case_plant\set_case_result_by_cron
  // del_case_plant\list_case_plant
    // 创建测试计划 create_case_plant 接口body
    interface CreateCasePlanBody {
      suite: number;
      plan_name: string;
      cron?: string;
      test_env?: string;
      is_open?: string;
      plan_id?: string;
    }
    // create_case_plant 接口返回值
    interface CreateCasePlanResponse {
      data: CreateCasePlanMsg;
      msg: string;
      success: boolean;
    }

    export interface CreateCasePlanMsg {
      add_time: string;
      cron: string;
      id: number;
      is_open: string;
      plan_id?: any;
      plan_name: string;
      suite: number;
      test_env: string;
      update_time: string;
    }
    // update_case_plant 接口body
    interface UpdateCasePlanBody {
      suite: number;
      plan_name?: string;
      cron?: string;
      test_env?: string;
      is_open?: string;
      plan_id?: string;
    }
    // update_case_plant 接口返回值
    interface UpdateCasePlanResponse {
      data?: any;
      msg: string;
      success: boolean;
    }

    // set_case_result_by_cron 接口body
    interface SetCaseResultByCronBody {
      id: number;
      plan_name: string;
      is_open: string;
      cron?: string;
      minute?: string;
      hour?: string;
      day?: string;
      month?: string;
      day_of_week?: string;
      run_once?: string;
      update_corn?: string;
      test_user?: string;
    }
    // set_case_result_by_cron 接口返回值
    interface SetCaseResultByCronResponse {
      data?: any;
      msg: string;
      success: boolean;
    }
    // del_case_plant 接口body
    interface DelCasePlanBody {
        id: number;
    }
    // del_case_plant 接口返回值
    interface DelCasePlanResponse {
      data?: any;
      msg: string;
      success: boolean;
    }
    // list_case_plant 接口params
    interface ListCasePlanParams {
      suite?: number;
      plan_name?: string;
      cron?: string;
      test_env?: string;
      is_open?: string;
      plan_id?: string;
      pageSize?: number;
      current?: number;
    }

    interface ListCasePlanMsg {
      add_time: string;
      cron: string;
      id: number;
      is_open: string;
      plan_id: string;
      plan_name: string;
      suite: number;
      test_env: string;
      update_time: string;
    }
    // list_case_plant 接口返回值
    interface ListCasePlanResponse {
      current: number;
      data: ListCasePlanMsg[];
      pageSize: number;
      total: number;
    }

}

