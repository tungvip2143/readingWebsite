import { useTheme } from '@mui/material';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import FormikField from 'components/FormikField';
import { Topic, modalAction } from 'constants/common';
import { useTranslations } from 'next-intl';
import React, { useRef } from 'react';
import { FormArticleValues } from '../../AddForm';
import { fileToString } from 'helpers/common';
import { Field } from 'formik';

interface Props {
  actionStatus?: string;
  valueFormik?: FormArticleValues;
  toggle?: () => void;
}

const optionsTopic = [
  {
    label: Topic.EVENTS,
    value: 1,
  },
  {
    label: Topic.THREE_F,
    value: 2,
  },
  {
    label: Topic.TOP_PLUS,
    value: 3,
  },
  {
    label: Topic.THE_FACE_DEWEY,
    value: 4,
  },
  {
    label: Topic.SHOCK,
    value: 5,
  },
  {
    label: Topic.STUDY_CORNER,
    value: 6,
  },
  {
    label: Topic.CHARITY,
    value: 7,
  },
];
const FormAddArticle = ({ actionStatus, valueFormik, toggle }: Props) => {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const isDisabled = actionStatus === modalAction.DETAIL;

  const ref = useRef(null);
  //! Css

  //! Function
  const handleCancel = () => {
    toggle && toggle();
  };
  //! Render
  return (
    <CommonStyles.Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, ml: 2 }}>
      <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <CommonStyles.Box sx={{ flex: 1 }}>
          <CommonStylesClient.Typography
            type='text16'
            children={`${t('Articles.titleArticle')}*`}
          />
          <FormikField
            component={CustomFields.TextField}
            name='titleArticle'
            size='small'
            sx={{ mt: 2 }}
            placeholder={t('Common.writeHere', { name: t('Articles.titleArticle').toLowerCase() })}
            fullWidth
          />
        </CommonStyles.Box>
        <CommonStyles.Box sx={{ flex: 1 }}>
          <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CommonStylesClient.Typography type='text16' children={`${t('Articles.subTitle')}`} />
            <FormikField
              component={CustomFields.CheckBoxField}
              name='isHaveSubtitle'
              color='secondary'
            />
          </CommonStyles.Box>
          <FormikField
            component={CustomFields.TextField}
            name='subTitleArticle'
            size='small'
            sx={{ mt: 2 }}
            placeholder={t('Common.writeHere', { name: t('Articles.subTitle').toLowerCase() })}
            fullWidth
            disabled={!valueFormik?.isHaveSubtitle}
          />
        </CommonStyles.Box>
      </CommonStyles.Box>
      <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <CommonStyles.Box sx={{ flex: 1 }}>
          <CommonStylesClient.Typography type='text16' children={`${t('Articles.topic')}*`} />
          <FormikField
            component={CustomFields.SelectField}
            name='topic'
            options={optionsTopic}
            size='small'
            sx={{ mt: 2 }}
            placeholder={t('Common.writeHere', { name: t('Articles.topic').toLowerCase() })}
            fullWidth
          />
        </CommonStyles.Box>
        <CommonStyles.Box sx={{ flex: 1 }}>
          <CommonStylesClient.Typography
            type='text16'
            children={`${t('Articles.articleBackground')}*`}
          />
          <FormikField
            component={CommonStyles.PlaceholderUploadImage}
            name='articleBackground'
            sx={{ mt: 2 }}
            isHasDelete
            renderChildren={
              !!valueFormik?.articleBackground?.url && (
                <CommonStyles.Box sx={{ width: '100%', maxWidth: '15rem' }}>
                  <img
                    style={{ width: '100%' }}
                    alt='avatar-placeholder'
                    src={fileToString(valueFormik?.articleBackground?.url || '')}
                  />
                </CommonStyles.Box>
              )
            }
          />
        </CommonStyles.Box>
      </CommonStyles.Box>
      <CommonStyles.Box>
        <CommonStylesClient.Typography
          type='text16'
          children={`${t('Articles.contentArticle')}*`}
          sx={{ mb: 2 }}
        />
        <CustomFields.TinyMceCommon
          ref={ref}
          name={'contentArticle'}
          placeholder={t('Common.writeHere', { name: t('Articles.contentArticle').toLowerCase() })}
          height={400}
          value={valueFormik?.contentArticle}
        />
      </CommonStyles.Box>
      <CommonStyles.Box sx={{ display: 'flex', gap: 2, marginLeft: 'auto' }}>
        <CommonStyles.Button color='secondary' type='submit'>
          {t('Common.save')}
        </CommonStyles.Button>
        <CommonStyles.Button color='secondary' variant='outlined' onClick={handleCancel}>
          {t('Common.cancel')}
        </CommonStyles.Button>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default FormAddArticle;
