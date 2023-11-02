import { useTheme } from '@mui/material';
import { FormTourGuideValues } from 'app/[locale]/admin/articles/Dialog/AddForm';
import FieldUploadArray from 'components/Client/Components/FieldUploadArray';
import CommonStyles from 'components/CommonStyles';
import { TypeFile } from 'constants/common';
import { ArrayHelpers, useFormikContext } from 'formik';
import { fileToString } from 'helpers/common';
import useToggleDialog from 'hooks/useToggleDialog';
import { isEmpty } from 'lodash';
import { useTranslations } from 'next-intl';
import React from 'react';
import CommonIconsClient from 'components/Client/CommonIcons';
import DialogPreviewPdf from 'app/[locale]/admin/articles/Dialog/component/DialogPreviewPdf';

const UploadCID = () => {
  //!State
  const t = useTranslations();
  const theme = useTheme();
  const { values, setFieldTouched, touched, errors } = useFormikContext<FormTourGuideValues>();
  //! Css
  const styles = {
    title: {
      color: theme?.colors?.bgneutral900,
      fontSize: '1.25rem',
      lineHeight: '1.875rem',
      fontWeight: 'bold',
    },
  };
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
    <CommonStyles.Box>
      {shouldRenderPreview && (
        <DialogPreviewPdf isOpen={openPreview} toggle={togglePreview} filePdf={refPdf.current} />
      )}
      <CommonStyles.Box sx={{ mt: 2 }}>
        <CommonStyles.Typography
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
          {t('Articles.citizenIdCardImage')}
        </CommonStyles.Typography>
        <CommonStyles.Typography
          variant='h4'
          sx={{
            color: theme.colors?.client.textPaginationBlack,
            fontSize: '0.75rem',
            fontWeight: 400,
            lineHeight: '1.2rem',
            letterSpacing: '0.03rem',
            marginBottom: '0.25rem',
            mt: 2,
          }}
        >
          {t('Profile.validateUploadCID')}
        </CommonStyles.Typography>
        <FieldUploadArray
          name='citizenIdCardImage'
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
              <CommonStyles.Box sx={{ mt: 3 }}>
                {!isEmpty(values?.citizenIdCardImage) ? (
                  <CommonStyles.Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {values?.citizenIdCardImage?.map((item, index) => {
                      return (
                        <CommonStyles.Box key={index} sx={{ margin: '0 1.5rem 1rem 0' }}>
                          {item?.url && (
                            <CommonStyles.Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                              }}
                            >
                              {item?.fileType === TypeFile.IMAGE && (
                                <img
                                  style={{
                                    objectFit: 'cover',
                                    width: '10rem',
                                    height: '10rem',
                                    borderRadius: '0.5rem',
                                  }}
                                  alt='avatar-placeholder'
                                  src={fileToString(item?.url || '')}
                                />
                              )}

                              {item?.fileType === TypeFile.PDF && (
                                <CommonStyles.Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '10rem',
                                    height: '10rem',
                                    borderRadius: '0.5rem',
                                    backgroundColor: theme.colors?.client.grayBackgroundPreview,
                                    position: 'relative',
                                    cursor: 'pointer',
                                  }}
                                  onMouseEnter={handleHoverPdf}
                                  onMouseLeave={handleHoverPdf}
                                  onClick={() => handlePreviewPdf(item?.url || '')}
                                >
                                  <CommonStyles.Box
                                    sx={{
                                      position: 'relative',
                                      opacity: isShown ? 0.3 : 1,
                                      transition: 'background-color 0.3s',
                                    }}
                                  >
                                    <CommonIconsClient.IconPdfPreview />
                                  </CommonStyles.Box>
                                  {isShown && (
                                    <span
                                      style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        transition: 'opacity 0.3s',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                      }}
                                    >
                                      {t('Tour.preview')}
                                    </span>
                                  )}
                                </CommonStyles.Box>
                              )}
                              {/* {typeFile() === FormatFiles.DOC && (
                              <CommonStylesClient.Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  width: '10rem',
                                  height: '10rem',
                                  borderRadius: '0.5rem',
                                  backgroundColor: theme.colors?.client.grayBackgroundPreview,
                                }}
                              >
                                <CommonIconsClient.IconWordPreview />
                              </CommonStylesClient.Box>
                            )} */}

                              <CommonStyles.Box
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
                              </CommonStyles.Box>
                            </CommonStyles.Box>
                          )}
                        </CommonStyles.Box>
                      );
                    })}

                    <CommonStyles.Box>
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
                    </CommonStyles.Box>
                  </CommonStyles.Box>
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
              </CommonStyles.Box>
            );
          }}
        />
        {touched.citizenIdCardImage && errors && errors.citizenIdCardImage && (
          <CommonStyles.HelperText>{errors.citizenIdCardImage}</CommonStyles.HelperText>
        )}
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default UploadCID;
