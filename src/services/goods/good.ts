import { request } from '@umijs/max';

// 获取商品数据列表
export async function getGoodsList(params: GoodsAPI.GoodsParams, options?: { [key: string]: any }) {
    return request<GoodsAPI.GoodsResult>('/api/goods/get/by', {
        method: 'GET',
        params: {
            ...params,
        },
    });
}
