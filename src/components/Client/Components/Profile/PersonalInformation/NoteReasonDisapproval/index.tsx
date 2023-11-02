import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import FormikField from 'components/FormikField';
import { useTranslations } from 'next-intl';
import React from 'react';

const NoteReasonDisapproval = () => {
  const t = useTranslations();
  return (
    <CommonStyles.Box sx={{ mt: 2, width: '50rem' }}>
      <CommonStyles.Typography variant='h6'>
        {t('Articles.reasonDisapproval')}
      </CommonStyles.Typography>
      <CommonStyles.Box sx={{ my: 2, width: '100%' }}>
        <FormikField component={CustomFields.Textarea} name='note' disabled />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default NoteReasonDisapproval;
