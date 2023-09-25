import React from 'react';
import { useTranslations } from 'next-intl';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import Image from 'next/image';
import WaitingAcceptBookGif from '../../../../../../public/images/Client/waitingAcceptBook.gif';

interface CheckingBookProps {
  isPayment?: boolean;
}

const CheckingBook = (props: CheckingBookProps) => {
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
        {isPayment ? t('payment') : t('checking')}
      </CommonStylesClient.Typography>
      <Image src={WaitingAcceptBookGif} alt='waiting' />
    </CommonStylesClient.Box>
  );
};

export default React.memo(CheckingBook);
