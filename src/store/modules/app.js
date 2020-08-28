import {
    UPDATE_INFO,
    DROP_INFO,
    GETGOODSTYPE,
    CHANGETYPENAME,
    ADDTYPE,
    GETSPECIFICATIONLIST,
    CHANGESPECIFICATION,
    DELETSPECIFICATION,
    SEARCHSPECIFICATION,
    ADDSPECIFICATION,
    GETUSERLIST,
    CREATEUSER,
    DELETUSER,
    GETROLELIST,
    ADDROLE,
    SETAUTHORITY,
    GETORDERLIST,
    UPDATDETAIL,
    GETGOODSLIST,
    CHANGESTATUS,
    CHANGEPRODUCEDETAILS,
    CHANGEUSER,
} from "../mutations-type";
import {
    getGoodsType,
    changeTypeName,
    addType,
    getTypeById,
    getSpecificationList,
    changeSpecification,
    deletSpecification,
    searchSpecification,
    addSpecification,
    getUserList,
    createUser,
    deletUser,
    getRoleList,
    addRole,
    setAuthority,
    getOrderList,
    searchOrder,
    getGoodsList,
    searchGood,
    ChangeStatus,
    getSpecificationById,
    changeUser,
} from "../../api/common";

const app = {
    state: {
        userInfo: {},
        token: "",
        goodsType: [],
        typetotal: null,
        canadd: true,
        SpecificationList: [],
        Specificationtotal: 7,
        userlist: [],
        roles: [],
        usertotal: 7,
        //  角色数据
        roleList: [],
        roletotle: 10,
        //订单
        orderList:[],
        orderTotal:1,
        //详情信息
        orderDetails:{},
        //商品
        produceList:[],
        producTotal:1,
        produceDetails:{},
    },

    mutations: {
        //登陆更新仓库
        [UPDATE_INFO](state, obj) {
            state.userInfo = obj.data;
            localStorage["token"] = obj.token;
        },
        //将获取的商品列表修改到仓库中
        [GETGOODSTYPE](state, obj) {
            state.canadd = true;
            state.goodsType = obj.list;
            state.typetotal = obj.total;
        },
        //退出登陆删除登陆信息
        [DROP_INFO](state) {
            state.userInfo = "";
            state.token = "";
        },

        //修改类名
        [CHANGETYPENAME](state, obj) {
            let goods = state.goodsType.filter((item) => {
                return item._id == obj.id;
            })[0];
            goods.name = obj.name;
        },

        //添加分类
        [ADDTYPE](state, obj) {
            if ((state.typetotal - 0) % 7 == 0) {
                state.canadd = false;
            }
            if (state.canadd) {
                state.goodsType.push(obj);
            }
            state.typetotal = state.typetotal - 0 + 1;
        },

        //获取规格列表
        [GETSPECIFICATIONLIST](state, obj) {
            state.canadd = true;
            state.SpecificationList = obj.list;
            state.Specificationtotal = obj.total;
        },

        //修改规格
        [CHANGESPECIFICATION](state, obj) {
            let Specification = state.SpecificationList.filter((item) => {
                return obj._id == item._id;
            });
            // let goodsType = state.goodsType.filter((item) => {
            //   return (obj.category_id = item.category_id);
            // });
            Specification[0].name = obj.name;
            Specification[0].option = obj.option;
        },
        //删除规格
        [DELETSPECIFICATION](state, obj) {
            state.SpecificationList = state.SpecificationList.filter((item) => {
                return obj._id != item._id;
            });
        },
        //搜索规格
        [SEARCHSPECIFICATION](state, obj) {
            state.SpecificationList = obj.list;
            state.Specificationtotal = obj.total;
        },
        //添加规格
        [ADDSPECIFICATION](state, obj) {
            state.SpecificationList.push(obj);
        },
        //获取用户列表
        [GETUSERLIST](state, obj) {
            state.canadd = true;
            state.userlist = obj.list;
            state.roles = obj.roles;
            let date = new Date()
            for (let i = 0; i < state.userlist.length; i++) {
                let role = obj.roles.filter((_role) => {
                    return _role._id == state.userlist[i].role_id;
                });
                state.userlist[i].create_time = date.myfunction(state.userlist[i].create_time)
                state.userlist[i].name = role[0]?.name;
            }
            state.usertotal = obj.total;
        },
        //创建用户
        [CREATEUSER](state, obj) {
            if ((state.usertotal - 0) % 7 == 0) {
                state.canadd = false;
            }
            if (state.canadd) {
                obj.craate_time = new Date().myfunction(obj.craate_time)
                state.userlist.push(obj);
            }
            state.usertotal = state.usertotal - 0 + 1;
        },
        //修改用户
        [CHANGEUSER](state,obj){
            // eslint-disable-next-line no-unused-vars
          let user = state.userlist.filter((item) =>{
              return item.id = obj.id
          })
          user = obj;
        },
        //删除用户
        [DELETUSER](state, obj) {
            state.userlist = state.userlist.filter((item) => {
                return item._id != obj.userId
            })
        },
        //获取角色
        [GETROLELIST](state, obj) {
            state.canadd = true;
            let date = new Date()
            obj.list.forEach((item) => {
                item.create_time = date.myfunction(item.create_time)
                item.auth_time = date.myfunction( item.auth_time)
            })
            state.roleList = obj.list;
            state.roletotle = obj.total
        },
        //添加角色
        [ADDROLE](state, obj) {
            if ((state.roletotle - 0) % 7 == 0) {
                state.canadd = false;
            }
            if (state.canadd) {
                state.roleList.push(obj);
            }
            state.roletotle = state.roletotle - 0 + 1;
        },
        //设置角色权限
        [SETAUTHORITY](state, obj) {
            let role = state.roleList.filter((item) => {
                return obj._id == item._id
            })[0]
            role.menus = obj.menus;
            role.auth_name = obj.auth_name;
            role.auth_time = new Date().myfunction(obj.auth_time)
        },
        //获取订单列表
        [GETORDERLIST](state,obj){
            obj.list.forEach((item) => {
                item.create_time = new Date().myfunction(item.create_time)
                item.status = item.status == 0 ? "已支付" : "未支付";
                item.paymentMethod = item.paymentMethod == 1 ? "支付宝" : "微信";
            })
            state.orderList = obj.list;
            state.orderTotal = obj.total;
        },
        //更新详细信息
        [UPDATDETAIL](state,obj){
            state.orderDetails = obj;
        },
        //获取商品列表
        [GETGOODSLIST](state,obj){
            obj.list.forEach((item) => {
                item.statusName = item.status == 1 ? "销售中" : "已下架";
                item.statusbutton = item.status == 1 ? "下架" : "上架";
            })
            state.produceList = obj.list;
            state.producTotal = obj.total;
        },
        //改变商品上下架状态
        [CHANGESTATUS](state,obj){
            let goods=state.produceList[obj.idx];
            goods.statusName = goods.statusName == "销售中" ? "已下架" : "销售中";
            goods.statusbutton = goods.statusbutton == "下架" ? "上架" : "下架";
        },
        //商品详情
        [CHANGEPRODUCEDETAILS](state,obj){
            state.produceDetails = obj.row;
            state.produceDetails.attrName = obj.attrName;
            state.produceDetails.specificationName = obj.specificationName;
        }

    },

    actions: {
        async getGoodsType({commit}, obj) {
            let goodstype = await getGoodsType(obj);
            commit("GETGOODSTYPE", goodstype.data.data);
        },
        //修改商品类型名
        async changeTypeName({commit}, obj) {
            await changeTypeName(obj);
            commit("CHANGETYPENAME", {
                id: obj.categoryId,
                name: obj.categoryName,
            });
        },

        //添加商品类
        async addType({commit}, obj) {
            let type = await addType(obj);
            commit("ADDTYPE", type.data.data);
        },
        //获取规格列表
        async getSpecificationList({commit}, obj) {
            let SpecificationList = await getSpecificationList(obj);
            for (const item of SpecificationList.data.data.list) {
                let typeName = await getTypeById({categoryId: item.category_id});
                item.typeName = typeName.data?.data?.name || "undefind";
            }
            commit("GETSPECIFICATIONLIST", {
                list: SpecificationList.data.data.list,
                total: SpecificationList.data.data.total,
            });
        },
        //修改规格
        async changeSpecification({commit}, obj) {
            await changeSpecification(obj);
            commit("CHANGESPECIFICATION", obj);
        },
        //删除规格
        async deletSpecification({commit}, obj) {
            await deletSpecification(obj);
            commit("DELETSPECIFICATION", obj);
        },
        //搜索规格
        async searchSpecification({commit}, obj) {
            let SpecificationList = await searchSpecification(obj);
            for (const item of SpecificationList.data.data.list) {
                let typeName = await getTypeById({categoryId: item.category_id});
                item.typeName = typeName.data?.data?.name || "undefind";
            }
            commit("GETSPECIFICATIONLIST", {
                list: SpecificationList.data.data.list,
                total: SpecificationList.data.data.total,
            });
        },
        //添加规格
        async addSpecification({commit}, obj) {
            let Specification = await addSpecification(obj);
            let typeName = await getTypeById({categoryId: obj.c_id});
            Specification.data.data.typeName =
                typeName.data?.data?.name || "undefind";
            commit("ADDSPECIFICATION", Specification.data.data);
        },
        //获取用户列表
        async getUserList({commit}, obj) {
            let res = await getUserList(obj);
            commit("GETUSERLIST", res.data.data);
        },
        //创建用户
        async createUser({commit}, obj) {
            let res = await createUser(obj);
            if (!res.data.status) {
                res.data.data.name = obj.role_name
                commit("CREATEUSER", res.data.data);
            }

            return res.data
        },
        //修改用户
        async changeUser({ commit },obj){
            commit("CHANGEUSER",obj)
            return await changeUser(obj)

        },
        //删除用户
        async deletUser({commit}, obj) {
            commit("DELETUSER", obj)
            await deletUser(obj)
        },
        //获取角色列表
        async getRoleList({commit}, obj) {
            let res = await getRoleList(obj);
            commit("GETROLELIST", res.data.data)
        },
        //添加管理
        async addRole({commit}, obj) {
            let res = await addRole(obj)
            commit("ADDROLE", res.data.data)
        },
        //设置用户权限
        async setAuthority_store({commit}, obj) {
            commit("SETAUTHORITY", obj)
            return await setAuthority(obj)
        },
        //获取订单列表
        async getOrderList({ commit }, obj){
            let res = await getOrderList(obj)
            commit("GETORDERLIST",res.data.data)
        },
        //搜索订单
        async searchOrder({ commit }, obj){
            let res = await searchOrder(obj);
            commit("GETORDERLIST",res.data.data)
        },
        //获取商品列表
        async getGoodsList({ commit },obj){
            let res = await getGoodsList(obj);
            commit("GETGOODSLIST",res.data.data)
        },

        async searchGood({ commit },obj){
            let res = await searchGood(obj);
            commit("GETGOODSLIST",res.data.data)
        },
        //改变商品上下架状态
        async ChangeStatus({ commit }, obj){
            await ChangeStatus(obj);
            commit("CHANGESTATUS",obj)
        },
        //设置商品详情数据
        async setProduceDetails({ commit }, obj){
            let type = await getTypeById(obj);
            let sp = await getSpecificationById(obj);
            commit("CHANGEPRODUCEDETAILS",{
                row:obj.row,
                attrName:type.data.data.name,
                specificationName:sp.data.data.name
            })
        }
    },
};

export default app;
