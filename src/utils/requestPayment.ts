import { ConsultEngMappedKor, ConsultType } from './type';

// 결제 금액에 따라 Payapp Url 연결
export const requestPayment = (price: number, type: ConsultType) => {
  window.PayApp.setDefault('userid', 'sharemind');
  window.PayApp.setDefault('shopname', '셰어마인드');
  window.PayApp.setParam(
    'goodname',
    '셰어마인드 상담서비스 - ' + ConsultEngMappedKor[type],
  );
  window.PayApp.setParam('price', price.toString());
  window.PayApp.setParam('smsuse', 'y');
  window.PayApp.setParam('redirectpay', '1');
  window.PayApp.setParam('skip_cstpage', 'y');
  window.PayApp.payrequest();
};
