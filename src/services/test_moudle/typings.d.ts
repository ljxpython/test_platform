declare namespace TestMoudle {
    // 查询接口参数
    interface QueryMoudleListParams {
      id?: number;
      moudle_name?: string;
      moudle_desc?: string;
      pageSize?: number;
      current?: number;
    };

    interface QueryMoudle {
      desc?: any;
      id: number;
      moudle: string;
      update_time: string;
    }

    // 查询接口返回值
    interface QueryMoudleListResponse {
      current: number;
      data: QueryMoudle[];
      pageSize: number;
      total: number;
    }

    interface SyncTestMoudleList {
          moudle_list: string[];
        }
        // 同步moudle接口返回值
    export interface SyncTestMoudleResponse {
          data: SyncTestMoudleList;
          msg: string;
          success: boolean;
        }

    
    
    // UpdateTestMoudleParams
    export interface UpdateTestMoudleParams {
      id?: number;
      moudle_name?: string;
      moudle_desc?: string;
    }
    export interface UpdateTestMoudleData {
      moudle_desc: string;
      moudle_name: string;
    }
    // SyncTestMoudleResponse
    export interface UpdateTestMoudleResponse {
      data: SyncTestMoudleData;
      msg: string;
      success: boolean;
    }
    
}
