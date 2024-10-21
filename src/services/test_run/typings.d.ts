declare namespace TestRun {
    // 创建测试结果body
    export interface CreateCaseResultBody { 
        title?: string;
        suite?: number;
        status?: number;
        result?: string;
        report_link?: string;
        report_download?: string;
        last_report_id?: number;
        test_type?: string;
        test_env?: string;
        task_id?: number;
        plan_id?: number;
        test_user?: string;

    }

    export interface  CreateCaseResultId{
	id: number;
}

export interface CreateCaseResultResponse {
	data: CreateCaseResultId;
	msg: string;
	success: boolean;
}

    // 执行测试run_case_result body
    export interface RunCaseResultBody {
        id: number;
        test_user: string;
    }

    // 查询测试结果
    export interface GetCaseResultParams {
        id?: number;
        suite?: number;
        status?: number;
        result?: string;
        report_link?: string;
        report_download?: string;
        last_report_id?: number;
        test_type?: string;
        test_env?: string;
        task_id?: number;
        plan_id?: number;
        test_user?: string;
        pageSize?: number;
        current?: number;
    }
    export interface CaseResult {
        id: number;
        title: string;
        suite: number;
        status: number;
        result: string;
        report_link: string;
        report_download: string;
        last_report_id: number;
        test_type: string;
        test_env: string;
        task_id: number;
        plan_id: number;
        test_user: string;
        add_time: string;
        update_time: string;
    }
    export interface GetCaseResultResponse {
        current: number;
        data: CaseResult[];
        pageSize: number;
        total: number;
    }

    // 根据时间执行测试run_case_result_by_time body
    export interface RunCaseResultByTimeBody {
        suite: number;
        test_user: string;
        run_time: string;
        test_env: string;
    }
    // 根据时间执行测试run_case_result_by_time_response
    export interface RunCaseResultByTimeResponse {
        data: RunCaseResultID;
        msg: string;
        success: boolean;
    }
    
    export interface RunCaseResultID {
	task_id: string;
}
    

        



}
