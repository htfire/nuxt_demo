/*
*
* 根数据状态 存放全局数据和异步方法
*
*/

import service from '~/plugins/axios'

export const state = () => {
    return {
        common: {
            downloadApp: '/download?wzChanel=wechatH5estimate&marker=m_new'
        }
    }
}

export const actions = {

    nuxtServerInit ({ commit }, { req }) {
        // if (req.session.user) {
        //     commit('user', req.session.user)
        // }
    },
    loadSecondList({ commit }, params = { page: 1 }) {
        service({
            url: '/estimate/customer/mobileSite/salesRank',
            method: 'get',
            params: {
                type: 2,
                cityId: 605,
                page: 1,
                pageSize: 5
            }
        })
        .then(res => {
            // console.log(res)
            //   const success = !!response.status && response.data && Object.is(response.data.code, 1)
              const isFirstPage = params.page && params.page > 1
              const commitName =  `mIndex/${isFirstPage ? 'ADD' : 'GET'}_LIST_SUCCESS`
            //   console.log(commitName)
              commit(commitName, res.data.body.datas)
            //   if(!success) commit('article/GET_LIST_FAILURE')
        })
        .catch(err => {
            //   commit('article/GET_LIST_FAILURE', err)
            console.log(err)
        })
    }

}
