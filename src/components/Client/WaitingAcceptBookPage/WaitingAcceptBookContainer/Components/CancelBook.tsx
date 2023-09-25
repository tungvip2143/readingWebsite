import React from 'react';
import { useTranslations } from 'next-intl';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';

interface CancelBookProps {
  isPayment?: boolean;
}

const CancelBook = (props: CancelBookProps) => {
  //! State
  const { isPayment = false } = props;
  const t = useTranslations('WaitingAcceptBookPage');

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        img: {
          width: 300,
          height: 'auto',
        },
        gap: '1rem',
        flexDirection: 'column',
      }}
    >
      <CommonStylesClient.Typography type='pcHeading4'>
        {isPayment ? t('cancel') : t('paymentSuccess')}
      </CommonStylesClient.Typography>
      <CommonIcons.NotFound />
    </CommonStylesClient.Box>
  );
};

export default React.memo(CancelBook);
