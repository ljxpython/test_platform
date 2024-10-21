declare namespace LocustResult {
  // 查询测试结果 query_locust_result body
    interface QueryLocustResultBody {
      add_time: string;
      distributed: boolean;
      exclude_tags?: any;
      headless: boolean;
      id: number;
      last_report_id?: any;
      locustsuite: number;
      nodes?: any;
      port: number;
      report_download: string;
      report_link: string;
      result: string;
      run_time?: any;
      shape_name?: any;
      spawn_rate?: any;
      status: number;
      tags?: any;
      task_id: string;
      test_env: string;
      test_type?: any;
      test_user?: any;
      title: string;
      update_time: string;
      users?: any;
    }

  export interface LocustResultMsg {
    add_time: string;
    distributed: boolean;
    exclude_tags?: any;
    headless: boolean;
    id: number;
    last_report_id?: any;
    locustsuite: number;
    nodes?: any;
    port: number;
    report_download: string;
    report_link: string;
    result: string;
    run_time?: any;
    shape_name?: any;
    spawn_rate?: any;
    status: number;
    tags?: any;
    task_id: string;
    test_env: string;
    test_type?: any;
    test_user?: any;
    title: string;
    update_time: string;
    users?: any;
  }
  // 查询测试结果 list_locust_result Response
  export interface ListLocustResultResponse {
    current: number;
    data: LocustResultMsg[];
    pageSize: number;
    total: number;
  }
  // 删除测试结果 delete_locust_result body参数
  interface DeleteLocustResultBody {
    id: number;
  }
  // 删除测试结果 delete_locust_result Response
  interface DeleteLocustResultResponse {
    code: number;
    msg: string;
  }
}
