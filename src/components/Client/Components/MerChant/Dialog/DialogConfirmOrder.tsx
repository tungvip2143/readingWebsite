import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import ContentConfirmOrder from '../ContentConfirmOrder';
import { useTranslations } from 'next-intl';
import { ReservationVendor } from 'modules/reservationVendor/reservationVendor.interface';
import useGetDetailReservationVendor from 'modules/reservationVendor/hooks/useGetDetailReservationVendor';

interface DialogConfirmOrderProps {
  isOpen: boolean;
  toggle: () => void;
  itemOrder: ReservationVendor;
}

const DialogConfirmOrder = (props: DialogConfirmOrderProps) => {
  //! State
  const { isOpen, toggle, itemOrder } = props;
  const t = useTranslations();

  //! Function

  //! Render
  return (
    <CommonStyles.Dialog
      className='dialog-confirm-order'
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '1rem',
        },
      }}
      open={isOpen}
      toggle={toggle}
      title={t('Vendor.confirmOrder')}
      content={<ContentConfirmOrder itemOrder={itemOrder} toggle={toggle} />}
      disableClickOutside={false}
      maxWidth='sm'
    />
  );
};

export default React.memo(DialogConfirmOrder);
