import base from "./base";

/**
 * 登录
 * @param macAddress  客户端MAC地址 00-01-6C-06-A6-29
 * @param password  登录密码
 * @param resource  登录来源,0==pc交易端，2==mc管理端，3==app
 * @param userName  登录名
 * @returns {Promise}
 */
const login = ({ userName, password, resource = 3 }) => {
  return wsBase(1000, {
    userName,
    password,
    resource,
    macAddress: "00-01-6C-06-A6-29"
  });
};
/**
 * 登出
 */
const loginOut = () => {
  return wsBase(1003, {});
};

/**
 * 修改登录密码
 * @param newPassword
 * @param oldPassword
 */
const changePassword = ({ newPassword, oldPassword }) => {
  return wsBase(1007, {
    newPassword,
    oldPassword
  });
};

export { login, loginOut, changePassword };
