import React from 'react';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTheme } from '@mui/material';
import VNPayLogo from '../../../../../../../public/images/Client/vnpay.png';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useHandleVNPay } from 'hooks/useHandleVNPay';
import useAuth from 'hooks/useAuth';
import { useRouter } from 'next/navigation';
import { showError } from 'helpers/toast';
import transactionBookServices from 'modules/transactionBook/transactionBook.services';
import { formatPrice } from 'helpers/common';

interface PaymentProps {
  id: string | number;
  priceProvisional?: number;
  priceService?: number;
  priceFixedService?: number;
  vatPercent?: number;
  priceOther?: number;
  priceVoucher?: number;
  priceTotal?: number;
  isPaymentVendor?: boolean;
}

interface TextWithPrice {
  label: string;
  price?: number;
  vat?: number;
}

const Divider = () => {
  const theme = useTheme();
  return (
    <CommonStylesClient.Box
      sx={{
        width: '100%',
        height: '1px',
        marginTop: '0.5rem',
        marginBottom: '1.5rem',
        background: theme.colors?.client?.midGray,
      }}
    />
  );
};

const TextWithPrice = (props: TextWithPrice) => {
  const { label = '', price = 0, vat = 0 } = props;
  const theme = useTheme();
  return (
    <CommonStylesClient.Box
      sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}
    >
      <CommonStylesClient.Typography type='text16' sx={{ color: theme.colors?.client?.darkGray }}>
        {label}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Typography type='title16' sx={{ color: theme.colors?.client?.black }}>
        {vat ? `${vat}%` : formatPrice(Number(price))}
      </CommonStylesClient.Typography>
    </CommonStylesClient.Box>
  );
};

const TextWithPriceTotal = (props: TextWithPrice) => {
  const { label = '', price = 0 } = props;
  const theme = useTheme();
  return (
    <CommonStylesClient.Box
      sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}
    >
      <CommonStylesClient.Typography
        type='pcHeading4'
        sx={{ color: theme.colors?.client?.coBaltBlue }}
      >
        {label}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Typography
        type='pcHeading4'
        sx={{ color: theme.colors?.client?.coBaltBlue }}
      >
        {formatPrice(Number(price))}
      </CommonStylesClient.Typography>
    </CommonStylesClient.Box>
  );
};

const Payment = (props: PaymentProps) => {
  //! State
  const {
    priceProvisional = 0,
    priceService = 0,
    priceFixedService = 0,
    priceOther = 0,
    priceVoucher = 0,
    priceTotal = 0,
    id,
    vatPercent = 5,
    isPaymentVendor = false,
  } = props;
  const theme = useTheme();
  const auth = useAuth();
  const phoneNumber = auth?.user?.phone;
  const router = useRouter();
  const currentURL = window.location.href;

  const t = useTranslations('PaymentPage');
  //! Function

  const handlePayment = async () => {
    try {
      if (isPaymentVendor) {
        const response = await transactionBookServices.createUrlPaymentVendor({
          vendorBookingId: id,
          returnUrl: currentURL,
        });
        if (response) {
          const urlPayment = response?.data?.data;
          router.push(urlPayment.toString());
          //! API CHƯA HOÀN CHỈNH NÊN GỌI TẠM ROUTER NÀY
          // router.push(response.toString())
        }
        return;
      }
      const response = await transactionBookServices.createUrlPaymentTour({
        tourBookingId: id,
        returnUrl: currentURL,
      });
      //! API CHƯA HOÀN CHỈNH NÊN GỌI TẠM API NÀY
      // const body = {
      //   price: Number(priceTotal),
      //   desciption: `Thanh toán Tour cho thue bao ${phoneNumber}. So tien ${Number(
      //     priceTotal
      //   ).toLocaleString('vi')} VND`,
      //   orderType: 'topup',
      //   language: 'vn',
      //   bankCode: 'NCB',
      // };
      // const response = await useHandleVNPay(body, currentURL);

      if (response) {
        const urlPayment = response?.data?.data;
        router.push(urlPayment.toString());
        //! API CHƯA HOÀN CHỈNH NÊN GỌI TẠM ROUTER NÀY
        // router.push(response.toString())
      }
      return;
    } catch (error) {
      showError(error);
    }
  };
  //! Render
  return (
    <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <CommonStylesClient.Typography type='pcHeading4' sx={{ color: theme.colors?.client?.black }}>
        {t('priceDetails')}
      </CommonStylesClient.Typography>

      <TextWithPrice label={t('priceProvisional')} price={priceProvisional} />
      <TextWithPrice label={t('priceService')} price={priceService} />
      <TextWithPrice label={t('fixedServicePrice')} price={priceFixedService} />
      <TextWithPrice label={t('vat')} vat={vatPercent} />
      <TextWithPrice label={t('priceOther')} price={priceOther} />
      <TextWithPrice label={t('priceVoucher')} price={priceVoucher} />
      <TextWithPriceTotal label={t('total')} price={priceTotal} />

      <Divider />

      <CommonStylesClient.Typography type='pcHeading4' sx={{ color: theme.colors?.client?.black }}>
        {t('SelectPaymentMethod')}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Box
        sx={{
          borderRadius: '1rem',
          padding: '1rem',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #DAE4FC',
          [':hover']: {
            border: '1px solid #DAE4FC',
            background: theme.colors?.client?.coBaltBlueLighter,
          },
        }}
      >
        <Image alt='vnpay' style={{ width: '120px', height: 'auto' }} src={VNPayLogo} />
      </CommonStylesClient.Box>

      <CommonStylesClient.Button
        sx={{
          background: theme.colors?.client?.coBaltBlue,
          border: 'none',
          boxShadow: 'none',
          borderRadius: '1rem',
          [':hover']: { background: theme.colors?.client?.coBaltBlue },
        }}
        onClick={handlePayment}
      >
        <CommonStylesClient.Typography
          type='mobiHeading4'
          sx={{ color: theme.colors?.client?.white, padding: '0.5rem 1rem' }}
        >
          {t('title')}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Button>
    </CommonStylesClient.Box>
  );
};

export default React.memo(Payment);
