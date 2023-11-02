import CommonStyles from 'components/CommonStyles';
import { FastField, useFormikContext } from 'formik';
import { useTranslations } from 'next-intl';
import React from 'react';
import { FormTourGuideValues } from '../../../AddForm';
import { TourGuideInfoStatus } from 'constants/common';

interface Props {
  toggle?: () => void;
}

const SubmitForm = ({ toggle }: Props) => {
  //! State
  const t = useTranslations();
  const {
    values: { status },
    isSubmitting,
  } = useFormikContext<FormTourGuideValues>();

  //! Funtion
  const renderLabelStatus = () => {
    if (status === TourGuideInfoStatus.PENDING_APPROVAL) {
      return t('Common.pendingApprove');
    }

    if (status === TourGuideInfoStatus.DISAPPROVAL) {
      return t('Common.disapprove');
    }

    return t('Common.verified');
  };

  //! Render
  return (
    <CommonStyles.Box>
      <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
        <CommonStyles.Typography variant='h6'>{t('Articles.status')}</CommonStyles.Typography>
        <CommonStyles.Badge category='purpleRoundOff' label={renderLabelStatus()} />
      </CommonStyles.Box>

      <CommonStyles.Divider />

      <CommonStyles.Box
        sx={{ my: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <CommonStyles.Typography variant='h6'>Active</CommonStyles.Typography>
        <FastField component={CommonStyles.SwitchMui} name='isActive' color='secondary' />
      </CommonStyles.Box>

      <CommonStyles.Divider />

      <CommonStyles.Box sx={{ mt: 2 }}>
        <CommonStyles.Typography variant='h6'>{t('Articles.confirm')}</CommonStyles.Typography>
        <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'space-evenly', my: 2 }}>
          <CommonStyles.Button size='small' color='secondary' type='submit' loading={isSubmitting}>
            {t('Articles.confirm')}
          </CommonStyles.Button>

          <CommonStyles.Button
            size='small'
            color='secondary'
            variant='outlined'
            onClick={() => {
              toggle && toggle();
            }}
          >
            {t('Common.cancel')}
          </CommonStyles.Button>
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default SubmitForm;
