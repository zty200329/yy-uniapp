import store from '../store';
import helper from "../common/helper"

const BASE_URL = helper.websiteUrl;
// const BASE_URL = 'http://zyyzty.mynatapp.cc/api';
// const BASE_URL = 'http://192.168.1.110:8083/api';
function request({ url, method,data}) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      data,
      method,
      header: {
        Authorization: store.state.user.token
      },
      success: ({data}) => {
        if (data.code === 0) {
          resolve(data.data);
        } else {
          uni.showToast({
            title: data.msg,
            icon: 'none',
            mask: true,
            duration: 5000
          });
          reject(data.msg);
        }
      },
      fail: (error) => {
        reject(error);

      },
      complete: () => {
        // 关闭加载
        uni.hideLoading();
      }
    });
  });
}

export default request;
