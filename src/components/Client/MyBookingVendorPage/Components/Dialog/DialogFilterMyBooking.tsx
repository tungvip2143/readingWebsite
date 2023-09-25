import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { useTranslations } from 'next-intl';
import FiltersMyBooking from '../FiltersMyBooking';
import { FormFilterMyBooking } from '../../MyBookingContainer';

interface DialogFiltersMyBookingProps {
  open: boolean;
  toggle: () => void;
  initialFilters: FormFilterMyBooking;
}

const DialogFilterMyBooking = (props: DialogFiltersMyBookingProps) => {
  //! State
  const { open, toggle, initialFilters } = props;
  const t = useTranslations();

  //! Function

  //! Render
  return (
    <CommonStyles.Dialog
      title={t('Common.filters')}
      content={<FiltersMyBooking initialFilters={initialFilters} toggle={toggle} />}
      open={open}
      toggle={toggle}
      disableClickOutside={false}
      maxWidth={'sm'}
    />
  );
};

export default DialogFilterMyBooking;
