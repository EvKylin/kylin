// 职责链模式

// // 500元订单
// const order500 = function(orderType, pay, stock){
//   if(orderType === 1 && pay === true){
//     console.log('500 元定金预购， 得到100 优惠券！');
//   }else{
//     order200(orderType, pay, stock); // 将请求传递给200元订单
//   }
// };

// // 200元订单
// const order200 = function(orderType, pay, stock){
//   if(orderType === 2 && pay === true){
//     console.log('200元定金预购， 得到50优惠券');
//   }else{
//     orderNormal(orderType, pay, stock);
//   }
// };

// const orderNormal = function(orderType, pay, stock){
//   if(stock > 0){
//     console.log('普通购买，无优惠券');
//   }else{
//     console.log('手机库存不足');
//   }
// };

// //  测试结果

// order500(1, true, 500);
// order500(1, false, 500);
// order500(2, true, 500);
// order500(3, false, 500);
// order500(3, false, 0);

// ================================================================================
// 500元订单
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

//
const Chain = function (fn) {
  this.fn = fn;
  this.successor = null;
};
// 指定在链中的下一个节点
Chain.prototype.setNextSuccessor = function (successor) {
  return this.successor = successor;
};
// 传递请求给某个节点
Chain.prototype.passRequest = function () {
  const ret = this.fn.apply(this, arguments);
  if (ret === 'nextSuccessor') {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments);
  }
  return ret;
};

const chainOrder500 = new Chain(order500);
const chainOrder200 = new Chain(order200);
const chainOrderNormal = new Chain(orderNormal);

// 指定职责链中的顺序
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

chainOrder500.passRequest(1, true, 500);
chainOrder500.passRequest(1, false, 500);
chainOrder500.passRequest(2, true, 500);
chainOrder500.passRequest(3, false, 500);
chainOrder500.passRequest(3, false, 0);


// ===================================================================
// 异步职责链
Chain.prototype.next = function () {
  return this.successor && this.successor.passRequest.apply(this.successor, arguments);
};

// 异步职责示例
const fn1 = new Chain(function () {
  console.log(1);
  return 'nextSuccessor';
});

const fn2 = new Chain(function () {
  console.log(2);
  const self = this;
  setTimeout(function () {
    self.next();
  }, 1000);
});

const fn3 = new Chain(function () {
  console.log(3);
});

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();
