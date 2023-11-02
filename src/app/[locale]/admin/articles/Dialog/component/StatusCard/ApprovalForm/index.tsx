import { Divider } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import DialogConfirm from 'components/DialogConfirm';
import cachedKeys from 'constants/cachedKeys';
import { TourGuideInfoStatus } from 'constants/common';
import { FastField, useFormikContext } from 'formik';
import useToggleDialog from 'hooks/useToggleDialog';
import { Lang } from 'i18nOptions';
import { TourGuide } from 'modules/tourGuide/tourGuide.interface';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useSave } from 'stores/useStore';
import { FormTourGuideValues } from '../../../AddForm';

interface Props {
  data?: TourGuide;
  isUpdate?: boolean;
}
const StatusCard = ({ data, isUpdate }: Props) => {
  //! State
  const t = useTranslations();
  const { values, setFieldValue } = useFormikContext<FormTourGuideValues>();
  const { status } = values;

  const isVerified = status === TourGuideInfoStatus.VERIFIED;
  const isDisapproval = status === TourGuideInfoStatus.DISAPPROVAL;
  //! Funtion

  const handleApproval = () => {
    setFieldValue('status', TourGuideInfoStatus.VERIFIED);
  };

  const handleDisapproval = () => {
    setFieldValue('status', TourGuideInfoStatus.DISAPPROVAL);
  };

  const renderLabelStatus = () => {
    if (status === TourGuideInfoStatus.PENDING_APPROVAL) {
      return t('Common.pendingApprove');
    }

    if (status === TourGuideInfoStatus.DISAPPROVAL) {
      return t('Common.disapprove');
    }
    if (status === TourGuideInfoStatus.NEW) {
      return t('Common.new');
    }

    return t('Common.verified');
  };

  //! Render
  return (
    <CommonStyles.Box sx={{ width: 'inherit' }}>
      <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
        <CommonStyles.Typography variant='h6'>{t('Articles.status')}</CommonStyles.Typography>
        <CommonStyles.Badge category='purpleRoundOff' label={renderLabelStatus()} />
      </CommonStyles.Box>

      {!isUpdate && <CommonStyles.Divider />}

      {!isUpdate && (
        <CommonStyles.Box
          sx={{ my: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <CommonStyles.Typography variant='h6'>Active</CommonStyles.Typography>
          <FastField component={CommonStyles.SwitchMui} name='isActive' color='secondary' />
        </CommonStyles.Box>
      )}
      {!isUpdate && <CommonStyles.Divider />}

      <CommonStyles.Box sx={{ mt: 2 }}>
        <CommonStyles.Typography variant='h6'>{t('Articles.confirm')}</CommonStyles.Typography>
        <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'center', my: 2, gap: 2 }}>
          <CommonStyles.Button
            size='small'
            color='secondary'
            onClick={handleApproval}
            disabled={isVerified}
          >
            {t('Common.approve')}
          </CommonStyles.Button>

          <CommonStyles.Button
            size='small'
            variant='outlined'
            color='secondary'
            onClick={handleDisapproval}
            disabled={isDisapproval}
          >
            {t('Common.disapprove')}
          </CommonStyles.Button>
        </CommonStyles.Box>
      </CommonStyles.Box>

      {isUpdate && <CommonStyles.Divider />}

      {isUpdate && (
        <CommonStyles.Box sx={{ mt: 2, width: 'inherit' }}>
          <CommonStyles.Typography variant='h6'>{t('Articles.Review')}</CommonStyles.Typography>
          <CommonStyles.Box sx={{ my: 2, width: 'inherit' }}>
            <FastField component={CustomFields.Textarea} name='draft.note' />
          </CommonStyles.Box>
        </CommonStyles.Box>
      )}
      <CommonStyles.Divider />

      <CommonStyles.Box
        sx={{
          my: 2,
          width: 'inherit',
          display: 'flex',
          marginLeft: 'auto',
          justifyContent: 'flex-end',
        }}
      >
        <CommonStyles.Button size='small' color='secondary' type='submit'>
          {t('Common.save')}
        </CommonStyles.Button>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default StatusCard;
