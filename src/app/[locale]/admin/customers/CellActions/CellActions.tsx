import CommonStyles from 'components/CommonStyles';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Customer } from 'modules/customers/customer.interface';
import pageUrls from 'constants/pageUrls';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material';
interface ICellActions {
  customer: Customer;
}

const CellActions = (props: ICellActions) => {
  //! State
  const theme = useTheme();
  const router = useRouter();
  const { customer } = props;

  const t = useTranslations('Customer');

  //! Function
  const handlPageDetailCustomer = () => {
    router.push(`${pageUrls.DetailCustomer}/${customer.id}`);
  };

  //! Render
  return (
    <>
      <CommonStyles.Button
        variant='text'
        onClick={handlPageDetailCustomer}
        style={{ textTransform: 'none', color: theme.colors?.primary500 }}
      >
        {t('detailCustomer')}
      </CommonStyles.Button>
    </>
  );
};

export default CellActions;
