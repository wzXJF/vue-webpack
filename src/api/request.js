import { Message } from "element-ui";
import axios from "axios";
import store from "../store";
import { getToken } from "@/utils/auth";

// 创建axios实例
const service = axios.create({
  timeout: 300000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["Authorization"] = "Bearer " + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    } else {
    }

    // if (config.headers["Content-Type"] != "multipart/form-data") {
    //   config.method === "post"
    //     ? (config.data = Qs.stringify({ ...config.data }))
    //     : (config.params = { ...config.params });
    // }
    config.headers["customer_id"] = "YIJIE_2017_FAKE";

    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    if (res.code === 20) {
      return response.data;
    } else {
      Message({
        message: res.message,
        type: "error",
        duration: 5 * 1000
      });

      // 此处可以做相关的内容token失效处理
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   MessageBox.confirm(
      //     "你已被登出，可以取消继续留在该页面，或者重新登录",
      //     "确定登出",
      //     {
      //       confirmButtonText: "重新登录",
      //       cancelButtonText: "取消",
      //       type: "warning"
      //     }
      //   )
      //     .then(() => {
      //       store.dispatch("FedLogOut").then(() => {
      //         location.reload(); // 为了重新实例化vue-router对象 避免bug
      //       });
      //     })
      //     .catch(() => {});
      // }
      return Promise.reject("error");
    }
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 10 * 1000
    });
    return Promise.reject(error);
  }
);

export default (type, url, parameData, callback) => {
  return new Promise((resolve, reject) => {
    service[type](url, parameData)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        console.log(err.toString());
        reject(err);
        if (callback) {
          callback(err.response);
        }
      });
  });
};
