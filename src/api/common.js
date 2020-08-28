import server from "../utils/request";
//获取商品类型
export function getGoodsType(data) {
  return server({
    method: "GET",
    url: "/manage/category/list",
    params: data,
  });
}
//修改分类名
export function changeTypeName(data) {
  return server({
    method: "POST",
    url: "/manage/category/update",
    data,
  });
}
//添加分类
export function addType(data) {
  return server({
    method: "POST",
    url: "manage/category/add",
    data,
  });
}

//根据分类id获取分类
export function getTypeById(data) {
  return server({
    method: "GET",
    url: "/manage/category/info",
    params: data,
  });
}
//通过ID获取规格
export function getSpecificationById(data) {
  return server({
    method: "GET",
    url: "/manage/sysAttr/get",
    params: data,
  });
}
//获取规格列表
export function getSpecificationList(data) {
  return server({
    method: "GET",
    url: "/manage/sysAttr/list",
    params: data,
  });
}

//修改规格
export function changeSpecification(data) {
  return server({
    method: "POST",
    url: "/manage/sysAttr/update",
    data,
  });
}
//删除规格
export function deletSpecification(data) {
  return server({
    method: "POST",
    url: "/manage/sysAttr/delete",
    data,
  });
}
//搜索规格
export function searchSpecification(data) {
  return server({
    method: "GET",
    url: "/manage/sysAttr/search",
    params: data,
  });
}
//添加规格
export function addSpecification(data) {
  return server({
    method: "POST",
    url: "/manage/sysAttr/add",
    data,
  });
}
//获取用户列表
export function getUserList(data) {
  return server({
    method: "GET",
    url: "/manage/user/list",
    params: data,
  });
}
//创建用户
export function createUser(data) {
  return server({
    method: "POST",
    url: "/manage/user/add",
    data,
  });
}
//修改用户
export function changeUser(data) {
  return server({
    method: "POST",
    url: "/manage/user/update",
    data,
  });
}
//删除用户
export function deletUser(data){
  return server({
    method: "POST",
    url: "/manage/user/delete",
    data,
  });
}
//获取角色
export function getRoleList(data) {
  return server({
    method: "GET",
    url: "/manage/role/list",
    params: data,
  });
}
//添加角色
export function addRole(data) {
  return server({
    method: "POST",
    url: "/manage/role/add",
    data,
  });
}
//设置角色权限
export function setAuthority(data) {
  return server({
    method: "POST",
    url: "/manage/role/update",
    data,
  });
}
//获取订单
export function getOrderList(data) {
  return server({
    method: "GET",
    url: "/manage/order/list",
    params: data,
  });
}
//搜索订单
export function searchOrder(data) {
  return server({
    method:"GET",
    url:"/manage/order/search",
    params:data
  })
}
//获取商品列表
export function getGoodsList(data) {
  return server({
    method:"GET",
    url:"/manage/product/list",
    params:data
  })
}
//商品搜索
export function searchGood(data) {
  return server({
    method:"GET",
    url:data.url,
    params:data
  })
}
//改变商品上下架状态
export function ChangeStatus(data) {
  return server({
    method:"POST",
    url:"/manage/product/updateStatus",
    data
  })
}
export function AddGoods(data) {
  return server({
    method:"POST",
    url:"/manage/product/add",
    data
  })
}
