declare namespace LocustRun {
  // /api/locust_test/run_locust_test 运行测试case
  interface RunLocustTestRequest {
    title?: string;
    locustsuite?: string;
    force?: boolean;
    test_env?: string;
  }
  interface RunLocustTestResponse {
    data: LocustTaskId;
    msg: string;
    success: boolean;
  }
  export interface LocustTaskId {
    id: number;
  }

  // 停止压测任务
  interface StopLocustTaskRequest {
    any;
  }
  interface StopLocustTaskResponse {
    data: LocustTaskId;
    msg: string;
    success: boolean;
  }

  // /api/locust_test/get_locust_test_detail 获取当前压测详情
  interface GetLocustTestDetailRequest {
    any;
  }
  interface GetLocustTestDetailResponse {
    data: LocustTaskId;
    msg: string;
    success: boolean;
  }
  // /api/locust_test/check_locust_process 查看当前是否有正在运行的压测任务
  interface CheckLocustProcessRequest {
    any;
  }
  interface CheckLocustProcessResponse {
    data: string;
    success: boolean;
  }
    // /api/locust_test/force_stop_locust_test 强制停止压测任务
  interface ForceStopLocustTestRequest {
    any;
  }
  interface ForceStopLocustTestResponse {
    data: string;
    success: boolean;
  }
}
