import React from 'react';
import { useTheme } from '@mui/material';
import moment from 'moment';
import { useTranslations } from 'next-intl';

import { useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import useAuth from 'hooks/useAuth';
import { ReservationVendor } from 'modules/reservationVendor/reservationVendor.interface';
import CommonStylesClient from 'components/Client/CommonStylesClient';

interface BookInformationProps {
  onClickButton: () => void;
  labelButton: string;
  isShowButton: boolean;
}

interface FieldLabelWithValues {
  label: string;
  value: string | React.ReactNode;
}

const FieldLabelWithValues = (props: FieldLabelWithValues) => {
  const { label = '', value } = props;
  const theme = useTheme();
  return (
    <CommonStylesClient.Box
      sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}
    >
      <CommonStylesClient.Typography type='text16' sx={{ color: theme.colors?.client?.darkGray }}>
        {label}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Typography type='title16' sx={{ color: theme.colors?.client?.black }}>
        {value}
      </CommonStylesClient.Typography>
    </CommonStylesClient.Box>
  );
};

const Divider = () => {
  const theme = useTheme();
  return (
    <CommonStylesClient.Box
      sx={{
        width: '100%',
        height: '1px',
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        background: theme.colors?.client?.midGray,
      }}
    />
  );
};

const BookInformation = (props: BookInformationProps) => {
  //! State
  const { onClickButton, labelButton,isShowButton = false } = props;
  const theme = useTheme();
  const auth = useAuth();
  const t = useTranslations('WaitingAcceptBookPage');

  const detailOfReservationVendor = useGet(
    cachedKeys.detailOfReservationVendor
  ) as ReservationVendor;

  const name = `${auth?.user?.firstName} ${auth?.user?.lastName}`;
  const phone = `0${auth?.user?.phone}`;
  const orderId = detailOfReservationVendor?.reservationUniqueId;
  const bookedDate = moment(detailOfReservationVendor?.time).format('DD/MM/YYYY - HH:mm');
  const numberPeople = detailOfReservationVendor?.totalCustomer;
  const status = detailOfReservationVendor?.status;

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '1rem',
        border: `1px solid ${theme.colors?.client?.midGray}`,
        padding: '1rem',
        alignItems: 'center',
        margin: '1rem 0',
        width: '100%',
      }}
    >
      <CommonStylesClient.Typography
        type='pcHeading3'
        sx={{ color: theme.colors?.client?.black, width: '100%' }}
      >
        {t('bookingInformation')}
      </CommonStylesClient.Typography>
      <Divider />
      <CommonStylesClient.Box
        sx={{ width: '100%', display: 'flex', gap: '1rem', flexDirection: 'column' }}
      >
        <FieldLabelWithValues label={t('orderId')} value={orderId} />
        <FieldLabelWithValues label={t('name')} value={name} />
        <FieldLabelWithValues label={t('phone')} value={phone} />
        <FieldLabelWithValues label={t('bookedDate')} value={bookedDate} />
        <FieldLabelWithValues label={t('numberPeople')} value={numberPeople} />
        <FieldLabelWithValues label={t('status')} value={status} />
      </CommonStylesClient.Box>

      {isShowButton && (
        <CommonStylesClient.Button
          sx={{
            background: theme.colors?.client?.coBaltBlue,
            border: 'none',
            boxShadow: 'none',
            borderRadius: '1rem',
            [':hover']: {
              background: theme.colors?.client?.coBaltBlue,
            },
          }}
          onClick={onClickButton}
        >
          <CommonStylesClient.Typography
            type='mobiHeading4'
            sx={{
              color: theme.colors?.client?.white,
              padding: '0.5rem 1rem',
            }}
          >
            {labelButton}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Button>
      )}
    </CommonStylesClient.Box>
  );
};

export default React.memo(BookInformation);
