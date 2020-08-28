import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Main_window from "../views/Main_window";
import Home from "../views/Home";
import Goods from "../views/Goods";
import Goodsspecification from "../views/Goodsspecification";
import Goodstype from "../views/Goodstype";
import UserManagement from "../views/UserManagement";
import Authority from "../views/Authority";
import Order from "../views/Order";
import OrderDetails from "../views/OrderDetails";
import GoodsDetails from "../views/GoodsDetails";
import ProductContent from "../views/ProductContent";
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/index",
    component: Main_window,
    children: [
      {
        path: "home",
        component: Home,
        children: [],
      },
      {
        path: "Goods",
        component: Goods,
      },
      {
        path: "Goodsspecification",
        component: Goodsspecification,
      },
      {
        path: "Goodstype",
        component: Goodstype,
      },
      {
        path: "Authority",
        component: Authority,
      },
      {
        path: "UserManagement",
        component: UserManagement,
      },
      {
        path: "Order",
        component: Order,
      },
      {
        path: "OrderDetails",
        component: OrderDetails,
      },
      {
        path:"GoodsDetails",
        component: GoodsDetails,
      },
      {
        path:"ProductContent",
        component: ProductContent,
      }
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
