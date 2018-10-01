const Base = ({ delay = 1000, success = true, data }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(data);
      } else {
        reject({ err: "失败" });
      }
    }, delay);
  });

export default {
  login: () =>
    Base({ data: { name: "tim", id: 1, isLogin: true }, success: true }),
  getChoiceData: () => Base({ data: { data: [] } }),
  getDayCommission: () => Base({ data: { data: [{}, {}] } })
};
