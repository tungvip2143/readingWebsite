import React from 'react';
import { Form, Formik } from 'formik';
import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import FormAddArticle from './component/FormAddArticle';
import { useTranslations } from 'next-intl';
import { Topic, modalAction } from 'constants/common';
import useGetDetailArticle from 'modules/article/hooks/useGetDetailArticle';
import { showError, showSuccess } from 'helpers/toast';
import ArticleModel from 'models/article.model';
import { useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import { ArticleBackground } from 'modules/article/article.interface';
import articleServices from 'modules/article/article.services';
import { isString } from 'lodash';

interface Props {
  idArticle?: number;
  actionStatus?: string;
  toggleAddform?: () => void;
}

export interface FormArticleValues {
  titleArticle?: string;
  subtitleArticle?: string;
  topic?: Topic;
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
        const fileAvatar = values?.articleBackground;
        try {
          if (isCreate) {
            let avatar = '';
            if (!!fileAvatar) {
              const body = new FormData();
              body.append('file', fileAvatar!);
              const response = await articleServices.uploadFile({
                file: body,
                folderStorage: 'article',
              });
              avatar = response?.data;
            }
            const requestPayload = ArticleModel.parseBodyToRequest(values, avatar);

            const response = await articleServices.createArticle(requestPayload);
            refetchListArticle && refetchListArticle();

            if (response?.status === 200 || response?.status === 201) {
              showSuccess(t('Common.success'));
              toggleAddform && toggleAddform();
            }
            return;
          }
          if (isDetail && !!idArticle) {
            let avatar = '';
            if (!!fileAvatar && !isString(fileAvatar)) {
              const body = new FormData();
              body.append('file', fileAvatar!);
              const response = await articleServices.uploadFile({
                file: body,
                folderStorage: 'article',
              });
              avatar = response?.data;
            } else {
              avatar = fileAvatar?.split('8000/')[1] || '';
            }
            const requestPayload = ArticleModel.parseBodyToRequest(values, avatar);
            const response = await articleServices.updateArticle({
              id: idArticle,
              body: requestPayload,
            });
            refetchListArticle && refetchListArticle();

            if (response?.status === 200 || response?.status === 201) {
              showSuccess(t('Common.success'));
              toggleAddform && toggleAddform();
            }
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
