import { useTheme } from '@mui/material';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { ArrayHelpers, Field, FieldArray, useFormikContext } from 'formik';
import { useTranslations } from 'next-intl';
import React from 'react';
import { FormVerifyProfile } from '..';
import CommonIconsClient from 'components/Client/CommonIcons';
import { fileToString } from 'helpers/common';
import CommonStyles from 'components/CommonStyles';
import FieldUploadArray from 'components/Client/Components/FieldUploadArray';
import { TypeFile } from 'constants/common';
import useToggleDialog from 'hooks/useToggleDialog';
import { isEmpty } from 'lodash';

interface UploadFilesProps {}

const UploadFiles = (props: UploadFilesProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const { values, setFieldTouched, touched, errors } = useFormikContext<FormVerifyProfile>();
  const [isShown, setIsShown] = React.useState<boolean>(false);
  const refPdf = React.useRef<string | null>(null);
  const {
    shouldRender: shouldRenderPreview,
    open: openPreview,
    toggle: togglePreview,
  } = useToggleDialog();
  //! Function
  const handleHoverPdf = () => {
    setIsShown((prev: boolean) => !prev);
  };
  const handlePreviewPdf = (urlPdf: string) => {
    refPdf.current = urlPdf;
    togglePreview();
  };
  //! Render
  return (
    <CommonStylesClient.Box sx={{ marginBottom: '2rem' }}>
      <CommonStylesClient.Typography
        variant='h4'
        sx={{
          color: theme.colors?.client.textPaginationBlack,
          fontSize: '0.875rem',
          fontWeight: 700,
          lineHeight: '1.313rem',
          letterSpacing: '0.035rem',
          marginBottom: '0.5rem',
        }}
      >
        {t('Profile.uploadFiles')}
      </CommonStylesClient.Typography>
      <CommonStylesClient.Typography
        variant='h4'
        sx={{
          color: theme.colors?.client.textPaginationBlack,
          fontSize: '0.75rem',
          fontWeight: 400,
          lineHeight: '1.2rem',
          letterSpacing: '0.03rem',
          marginBottom: '1rem',
        }}
      >
        {t('Profile.validateFilesUpload')}
      </CommonStylesClient.Typography>

      <FieldUploadArray
        name='filesUpload'
        setFieldTouched={setFieldTouched}
        renderContent={(arrayHelpers: ArrayHelpers) => {
          const typeFile = (file: File) => {
            if (file?.type === 'image/jpeg') {
              return TypeFile.IMAGE;
            }
            if (file?.type === 'application/pdf') {
              return TypeFile.PDF;
            }
          };
          return (
            <CommonStylesClient.Box>
              {!isEmpty(values.filesUpload) ? (
                <CommonStylesClient.Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {values?.filesUpload?.map((el, index) => {
                    return (
                      <CommonStylesClient.Box key={index} sx={{ margin: '0 1.5rem 1rem 0' }}>
                        {!!el.url && (
                          <CommonStylesClient.Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              position: 'relative',
                            }}
                          >
                            <img
                              style={{
                                objectFit: 'cover',
                                width: '10rem',
                                height: '10rem',
                                borderRadius: '0.5rem',
                              }}
                              alt='avatar-placeholder'
                              src={fileToString(el?.url || '')}
                            />

                            <CommonStylesClient.Box
                              sx={{
                                position: 'absolute',
                                top: '-1.125rem',
                                right: '-1.25rem',
                                '& svg': {
                                  backgroundColor: `${theme.colors?.white} !important`,
                                  borderRadius: '1.25rem',
                                },
                              }}
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <CommonIconsClient.IconCloseRed />
                            </CommonStylesClient.Box>
                          </CommonStylesClient.Box>
                        )}
                      </CommonStylesClient.Box>
                    );
                  })}

                  <CommonStylesClient.Box>
                    <CommonStyles.PlaceholderUploadImage
                      sx={{
                        color: theme.colors?.client.gray,
                        borderRadius: '0.5rem',
                        width: '10rem',
                        height: '10rem',
                      }}
                      sxIcon={{
                        width: '2rem',
                        height: '2rem',
                        '& svg': {
                          width: '2rem',
                          height: '2rem',
                          path: {
                            color: `${theme.colors?.client.textPaginationBlack} !important`,
                          },
                        },
                      }}
                      onChangeFile={(file) => {
                        setFieldTouched && setFieldTouched('citizenIdCardImage', true);
                        arrayHelpers.push({
                          url: file,
                          fileType: typeFile(file),
                        });
                      }}
                    />
                  </CommonStylesClient.Box>
                </CommonStylesClient.Box>
              ) : (
                <CommonStyles.PlaceholderUploadImage
                  accept='image/jpeg,image/png,image/jpg,.doc, .docx,.pdf'
                  sx={{
                    color: theme.colors?.client.gray,
                    borderRadius: '0.5rem',
                    width: '10rem',
                    height: '10rem',
                  }}
                  sxIcon={{
                    width: '2rem',
                    height: '2rem',
                    '& svg': {
                      width: '2rem',
                      height: '2rem',
                      path: {
                        color: `${theme.colors?.client.textPaginationBlack} !important`,
                      },
                    },
                  }}
                  onChangeFile={(file) => {
                    setFieldTouched && setFieldTouched('citizenIdCardImage', true);
                    arrayHelpers.push({
                      url: file,
                      fileType: typeFile(file),
                    });
                  }}
                />
              )}
            </CommonStylesClient.Box>
          );
        }}
      />

      {touched.filesUpload && errors && errors.filesUpload && (
        <CommonStyles.HelperText>{errors.filesUpload}</CommonStyles.HelperText>
      )}
    </CommonStylesClient.Box>
  );
};

export default React.memo(UploadFiles);
