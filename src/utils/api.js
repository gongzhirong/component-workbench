import {get,post} from './http.js'
export default {
  /* 
   * 规范保存接口地址：
   * xxxx: params => get/post('接口地址'，params), //这里请注释接口作用
   * 
   * 组件或页面调用时：
   * this.$api.xxxx(params).then().catch();
   */
  createPage: params => post('/ability-open/appPage/createPage', params), // 创建页面配置
  updatePage: params => post('/ability-open/appPage/updatePage', params), // 更新页面配置
  getPageDetailById:  params => get('/ability-open/appPage/getPageDetailById', params), // 获取页面配置详情
  getApiRelList:  params => get('/ability-open/api/getApiRelList', params), // 查找api关联类型列表
  getApiTypeList: params => get('/ability-open/api/getApiTypeList', params), // 查找api类别列表
  getApis: params => get('/ability-open/appPage/getApis', params), // 查找api类别列表
}