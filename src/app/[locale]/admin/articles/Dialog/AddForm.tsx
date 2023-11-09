import React from 'react';
import { Form, Formik } from 'formik';
import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import FormAddArticle from './component/FormAddArticle';
import { useTranslations } from 'next-intl';
import { modalAction } from 'constants/common';
import useGetDetailArticle from 'modules/article/hooks/useGetDetailArticle';
import { showError } from 'helpers/toast';
import ArticleModel from 'models/article.model';
import { useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';

interface Props {
  idArticle?: number;
  actionStatus?: string;
  toggleAddform?: () => void;
}

export interface FormArticleValues {
  titleAritcle?: string;
  subTitleArticle?: string;
  topic?: number;
  articleBackground?: string;
  contentArticle?: string;
  isHaveSubtitle?: boolean;
}

const AddForm = (props: Props) => {
  //! State
  const { idArticle, actionStatus, toggleAddform } = props;
  const { data, isLoading } = useGetDetailArticle(idArticle || 0, !!idArticle);

  const theme = useTheme();
  const t = useTranslations();
  const router = useRouter();
  const refetchListArticle = useGet(cachedKeys.refetchListArticle);

  const isCreate = actionStatus === modalAction.CREATE;
  const isDetail = actionStatus === modalAction.DETAIL;

  const initialValues = ArticleModel.parseInitialValues(data);

  //! Validate
  const validationAddFormSchema = Yup.object().shape({});

  //! Function

  //! Render
  if (isLoading) {
    return <CommonStyles.Loading />;
  }
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationAddFormSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          if (isCreate) {
            // const response = await tourGuideServices.createArticle(requestPayload);
            // refetchListArticle && refetchListArticle();

            // if (response?.status === 200 || response?.status === 201) {
            //   showSuccess(t('Common.success'));
            //   toggleAddform && toggleAddform();
            // }
            return;
          }
          if (isDetail && !!idArticle) {
            // const response = await tourGuideServices.updateArticle({
            //   id: idArticle,
            //   body: requestPayloadUpdate,
            // });
            // refetchListArticle && refetchListArticle();
            // if (response?.status === 200 || response?.status === 201) {
            //   showSuccess(t('Common.success'));
            //   toggleAddform && toggleAddform();
            // }
            return;
          }
        } catch (error) {
          showError(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {(propsFormik) => {
        return (
          <CommonStyles.Box id='parent_form'>
            <Form>
              <CommonStyles.Box>
                <FormAddArticle
                  actionStatus={actionStatus}
                  valueFormik={propsFormik?.values}
                  toggle={toggleAddform}
                />
              </CommonStyles.Box>
              <CommonStyles.FormikDebug />
            </Form>
          </CommonStyles.Box>
        );
      }}
    </Formik>
  );
};
export default React.memo(AddForm);
