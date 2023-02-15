// 职责链模式 500元订单
const order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500 元定金预购， 得到100 优惠券！');
  } else {
    //order200(orderType, pay, stock); // 将请求传递给200元订单
    return 'nextSuccessor';
  }
};

// 200元订单
const order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200元定金预购， 得到50优惠券');
  } else {
    //orderNormal(orderType, pay, stock);
    return 'nextSuccessor';
  }
};

const orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log('普通购买，无优惠券');
  } else {
    console.log('手机库存不足');
  }
};

Function.prototype.after = function (fn) {
  const self = this;
  return function () {
    const ret = self.apply(this, arguments);
    if (ret === 'nextSuccessor') {
      return fn.apply(this, arguments);
    }
    return ret;
  }
};

const order = order500.after(order200).after(orderNormal);

order(1, true, 500);
order(1, false, 500);
order(2, true, 500);
order(3, false, 500);
order(3, false, 0);
