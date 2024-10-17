namespace TestCase {
    export interface SyncTestCaseList {
	moudle_list: string[];
}

// 同步testcase接口返回值
export interface SyncTestCaseResponse  {
	data: SyncTestCaseList;
	msg: string;
	success: boolean;
}

    // 查询接口参数
    export interface GetCaseParams  {
	id?: number;
	moudle?: string[];
	case_func?: string;
	case_sence?: string;
    tags?: string;
    pageSize?: number;
    current?: number;
    }
    
    export interface Casemoudle {
	add_time: string;
	desc: string;
	id: number;
	is_deleted: boolean;
	moudle: string;
	update_time: string;
}

export interface GetCaseSingle {
	case_func: string;
	case_func_desc: string;
	case_sence: string;
	casemoudle: Casemoudle;
	id: number;
	path_desc: string;
	tags?: any;
	update_time: string;
}

// 查询接口返回值
export interface GetCaseResponse {
	current: number;
	data: GetCaseSingle[];
	pageSize: number;
	total: number;
}
    
}
