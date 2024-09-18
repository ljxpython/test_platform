declare namespace GoodsAPI { 
    type GoodsType = 'normal' | 'virtual' | 'booking'; // 商品类型
    type GoodsStatus = 'online' | 'offline' | 'deleted'; // 商品状态
    type GoodsSubType = 'normal' | 'virtual' | 'booking_normal' | 'booking_presale' | 'booking_group'; // 商品子类型
    // 查询商品
    type GoodsParams = {
        id?: number;
        name?: string;
        type?: GoodsType;
        subType?: GoodsSubType;
        status?: GoodsStatus;
        page?: number;
        pageSize?: number;
        current?: number;
    };
    // 商品查询结果
    // type GoodsResult = {
    //     id?: number;
    //     name?: string;
    //     type?: GoodsType;
    //     subType?: GoodsSubType;
    //     status?: GoodsStatus;
    //     createdAt?: string;
    //     updatedAt?: string;
    //     list;
    //     current?: number,
    //     pageSize?: number,
    //     total?: number,
    // };

    type GoodList = {
	description: string;
	id: number;
	image?: any;
	name: string;
	price: number;
	status: string;
	subtype: string;
	type: string;
}

    type GoodsResult = {
	current: number;
	list: GoodList[];
	pageSize: number;
	total: number;
}

    type SearchParams = {
        productType?: string | undefined;
        search?:string | undefined;
    }
}
