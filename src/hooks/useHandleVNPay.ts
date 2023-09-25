import moment from 'moment';
import forge from 'node-forge';
import queryString from 'query-string';

function sortObject(obj: any) {
  var sorted = {} as any;
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
}

interface IBody {
  price: number;
  desciption: string;
  orderType?: string;
  language?: string;
  bankCode: string;
}

export const useHandleVNPay = (body: IBody, fallbackUrl: string) => {
  return new Promise((resolve, reject) => {
    var ipAddr = process.env.NEXT_PUBLIC_VNP_IP_ADDRESS;
    // req.headers["x-forwarded-for"] ||
    // req.connection.remoteAddress ||
    // req.socket.remoteAddress;

    var tmnCode = process.env.NEXT_PUBLIC_VNP_TMNCODE;
    var secretKey = process.env.NEXT_PUBLIC_VNP_SECRET_KEY || '';
    var vnpUrl = process.env.NEXT_PUBLIC_VNP_URL;
    var returnUrl = fallbackUrl ? fallbackUrl : process.env.NEXT_PUBLIC_VNP_RETURN_URL;

    var date = new Date();

    var createDate = moment(date).format('YYYYMMDDHHmmss');
    var orderId = moment(date).format('HHmmss');
    var amount = body.price || 0;
    var bankCode = body?.bankCode || '';

    var orderInfo = body?.desciption ?? 'THANH TOAN VNPAY';
    var orderType = body?.orderType ?? 'topup';
    var locale = body?.language ?? 'vn';

    var currCode = 'VND';
    var vnp_Params = {} as any;

    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;

    if (bankCode !== null) {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    const signData = queryString.stringify(vnp_Params, { encode: false });
    const hmac = forge.hmac.create();

    hmac.start('sha512', secretKey);
    hmac.update(signData);

    const signed = hmac.digest().toHex();

    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + queryString.stringify(vnp_Params, { encode: false });

    if (vnpUrl) {
      resolve(vnpUrl);
    } else {
      reject('error');
    }
  });
};
