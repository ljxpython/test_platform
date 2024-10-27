declare namespace LocustCase {
  // get_locust_case 获取测试caseparams
  interface GetLocustCaseParams {
    moudle?: string;
    case_path?: string;
    case_sence?: string;
    path_desc?: string;
    tags?: string;
  }
  // get_locust_case 获取测试case Response
  interface GetLocustCaseResponse {
    current: number;
    data: LocustCaseMsg[];
    pageSize: number;
    total: number;
  }
  export interface LocustCaseMsg {
    case_sence: string;
    id: number;
    is_deleted: boolean;
    moudle: string;
    path_desc: string;
    tags?: any;
    update_time: string;
  }
  // 同步测试case params
  interface SyncLocustCaseParams {
    any;
  }
  // 同步测试case Response
  interface SyncLocustCaseResponse {
    data: SyncLocustCaseList;
    msg: string;
    success: boolean;
  }
  export interface SyncLocustCaseList {
    moudle_list: string[];
  }
    // delete_locust_case 删除测试case params
  interface DeleteLocustCaseBody {
    id: number;
  }
    // delete_locust_case 删除测试case Response
  interface DeleteLocustCaseResponse {
    data: boolean;
    msg: string;
    success: boolean;
  }
}
