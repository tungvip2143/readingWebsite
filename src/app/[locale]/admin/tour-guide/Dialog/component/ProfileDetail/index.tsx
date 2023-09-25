import { Grid, useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import { TypeFile, modalAction } from 'constants/common';
import { ArrayHelpers, FastField, Field, FieldArray, useFormikContext } from 'formik';
import { fileToString } from 'helpers/common';
import useConstants from 'hooks/useConstants';
import { useTranslations } from 'next-intl';
import React, { useRef } from 'react';
import { FormTourGuideValues } from '../../AddForm';
import SelectProvince from 'components/SelectProvince';
import SelectPrefixPhone from 'components/SelectPrefixPhone';
import { isEmpty } from 'lodash';
import CommonIconsClient from 'components/Client/CommonIcons';
import FieldUploadArray from 'components/Client/Components/FieldUploadArray';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogPreviewPdf from '../DialogPreviewPdf';
interface Props {
  actionStatus?: string;
}
export const listStatusDefault = [
  {
    label: 'LocalFriend.profileDetail',
    value: 0,
  },
  {
    label: 'LocalFriend.payment',
    value: 1,
  },
  {
    label: 'LocalFriend.orders',
    value: 2,
  },
];

const ProfileDetail = ({ actionStatus }: Props) => {
  //! State
  const { optionsFemaleOrMale, optionsYesOrNo } = useConstants();
  const theme = useTheme();
  const t = useTranslations();
  const isDisabled = actionStatus === modalAction.DETAILS;
  const { values, setFieldTouched, touched, errors } = useFormikContext<FormTourGuideValues>();
  const [isShown, setIsShown] = React.useState<boolean>(false);
  const refPdf = React.useRef<string | null>(null);
  const {
    shouldRender: shouldRenderPreview,
    open: openPreview,
    toggle: togglePreview,
  } = useToggleDialog();

  //! Css
  const styles = {
    title: {
      color: theme?.colors?.bgneutral900,
      fontSize: '1.25rem',
      lineHeight: '1.875rem',
      fontWeight: 'bold',
    },
    labelInput: {
      mb: 1,
    },
    contentItem: { display: 'flex', flexDirection: 'column', rowGap: 2 },
    gridContainer: {
      py: 2,
      '& .MuiGrid-item': { paddingTop: '1.25rem' },
    },
  };

  //! Function
  const handleHoverPdf = () => {
    setIsShown((prev: boolean) => !prev);
  };
  const handlePreviewPdf = (urlPdf: string) => {
    refPdf.current = urlPdf;
    togglePreview();
  };

  const handleHoverDoc = () => {
    setIsShown((prev: boolean) => !prev);
  };
  const handlePreviewDoc = (urlPdf: string) => {
    refPdf.current = urlPdf;
    togglePreview();
  };
  const renderInformationTourGuide = () => {
    return (
      <Grid container rowSpacing={4} columnSpacing={{ xs: 2 }} sx={{ py: 2 }}>
        <Grid item xs={4} md={4}>
          <CommonStyles.Box sx={styles.contentItem}>
            <CommonStyles.Box sx={{ display: 'flex', gap: '10px' }}>
              <CommonStyles.Box sx={{ width: '30% ' }}>
                <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                  {t('LocalFriend.firstName')}
                </CommonStyles.Typography>
                <FastField
                  size='small'
                  component={CustomFields.TextField}
                  name='firstName'
                  placeholder={t('LocalFriend.yourFirstName')}
                  fullWidth
                  disabled={isDisabled}
                />
              </CommonStyles.Box>

              <CommonStyles.Box sx={{ width: '70%' }}>
                <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                  {t('LocalFriend.lastName')}
                </CommonStyles.Typography>
                <FastField
                  size='small'
                  component={CustomFields.TextField}
                  name='lastName'
                  placeholder={t('LocalFriend.yourLastName')}
                  fullWidth
                  disabled={isDisabled}
                />
              </CommonStyles.Box>
            </CommonStyles.Box>

            <CommonStyles.Box>
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.citizenIdCard')}
              </CommonStyles.Typography>
              <FastField
                size='small'
                component={CustomFields.TextField}
                name='cid'
                placeholder={t('LocalFriend.idNumber')}
                fullWidth
                disabled={isDisabled}
              />
            </CommonStyles.Box>

            <CommonStyles.Box>
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.residenceAccordingToPermanentAddress')}
              </CommonStyles.Typography>
              <FastField
                size='small'
                component={CustomFields.TextField}
                name='residenceAccordingToPermanentAddress'
                placeholder={t('LocalFriend.address')}
                fullWidth
                disabled={isDisabled}
              />
            </CommonStyles.Box>
          </CommonStyles.Box>
        </Grid>

        <Grid item xs={4} md={4}>
          <CommonStyles.Box sx={styles.contentItem}>
            <CommonStyles.Box>
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.dateOfBirthAccordingToIdCard')}
              </CommonStyles.Typography>
              <FastField
                size='small'
                type='date'
                component={CustomFields.TextField}
                initialValue={null}
                name='date_of_birth'
                fullWidth
                disabled={isDisabled}
              />
            </CommonStyles.Box>

            <CommonStyles.Box>
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.phone')}
              </CommonStyles.Typography>
              <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
                <CommonStyles.Box>
                  <SelectPrefixPhone name='phoneTourGuidePrefix' isDisabled={isDisabled} />
                </CommonStyles.Box>

                <FastField
                  size='small'
                  component={CustomFields.TextField}
                  name='phone'
                  placeholder={t('LocalFriend.phone')}
                  fullWidth
                  disabled={isDisabled}
                />
              </CommonStyles.Box>
            </CommonStyles.Box>

            <CommonStyles.Box>
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.currentResidence')}
              </CommonStyles.Typography>
              <FastField
                size='small'
                component={CustomFields.TextField}
                name='currentResidence'
                placeholder={t('LocalFriend.address')}
                fullWidth
                disabled={isDisabled}
              />
            </CommonStyles.Box>
          </CommonStyles.Box>
        </Grid>

        <Grid item xs={4} md={4}>
          <CommonStyles.Box sx={styles.contentItem}>
            <CommonStyles.Box>
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.gender')}
              </CommonStyles.Typography>
              <FastField
                sizeRadio='small'
                component={CustomFields.RadioField}
                name='gender'
                fullWidth
                values={optionsFemaleOrMale}
                styleFormControl={{ height: '2.5rem' }}
                disabled={isDisabled}
              />
            </CommonStyles.Box>

            <CommonStyles.Box>
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.email')}
              </CommonStyles.Typography>
              <FastField
                size='small'
                component={CustomFields.TextField}
                name='email'
                placeholder={t('LocalFriend.email')}
                fullWidth
                disabled={isDisabled}
              />
            </CommonStyles.Box>

            <CommonStyles.Box>
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.localFriendLocation')}
              </CommonStyles.Typography>
              <SelectProvince name='provinceCity' isDisabled={isDisabled} isMultiple />
            </CommonStyles.Box>
          </CommonStyles.Box>
        </Grid>
      </Grid>
    );
  };

  const renderEmergencyContactInformation = () => {
    return (
      <CommonStyles.Box sx={{ mt: 2 }}>
        <CommonStyles.Typography sx={styles.title}>
          {t('LocalFriend.emergencyContactInformation')}
        </CommonStyles.Typography>
        <Grid container rowSpacing={4} columnSpacing={{ xs: 2 }} sx={styles.gridContainer}>
          <Grid item xs={4} md={4}>
            <CommonStyles.Box>
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.name')}
              </CommonStyles.Typography>
              <FastField
                size='small'
                component={CustomFields.TextField}
                name='nameEmergency'
                placeholder={t('LocalFriend.firstLastName')}
                fullWidth
                disabled={isDisabled}
              />
            </CommonStyles.Box>
          </Grid>

          <Grid item xs={4} md={4}>
            <CommonStyles.Box>
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.phone')}
              </CommonStyles.Typography>
              <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
                <CommonStyles.Box>
                  <SelectPrefixPhone name='phoneEmergencyPrefix' isDisabled={isDisabled} />
                </CommonStyles.Box>
                <FastField
                  size='small'
                  component={CustomFields.TextField}
                  name='phoneEmergency'
                  placeholder={t('LocalFriend.phone')}
                  fullWidth
                  disabled={isDisabled}
                />
              </CommonStyles.Box>
            </CommonStyles.Box>
          </Grid>

          <Grid item xs={4} md={4}>
            <CommonStyles.Box>
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.relationship')}
              </CommonStyles.Typography>
              <FastField
                size='small'
                component={CustomFields.TextField}
                name='relationship'
                placeholder={t('LocalFriend.relationship')}
                fullWidth
                disabled={isDisabled}
              />
            </CommonStyles.Box>
          </Grid>
        </Grid>
      </CommonStyles.Box>
    );
  };
  const renderTourGuideLicense = () => {
    return (
      <CommonStyles.Box sx={{ mt: 2 }}>
        <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <CommonStyles.Typography sx={styles.title}>
            {t('LocalFriend.localFriendLicense')}
          </CommonStyles.Typography>
          <FastField
            component={CustomFields.RadioField}
            name='checkLicense'
            fullWidth
            values={optionsYesOrNo}
            disabled={isDisabled}
          />
        </CommonStyles.Box>

        <Grid container rowSpacing={4} columnSpacing={{ xs: 2 }} sx={styles.gridContainer}>
          <Grid item xs={4} md={4}>
            <CommonStyles.Box>
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.avatar')}
              </CommonStyles.Typography>

              <FastField
                size='small'
                component={CommonStyles.PlaceholderUploadImage}
                name='avatar'
                fullWidth
                isHasDelete
                disabled={isDisabled}
                renderChildren={
                  !!values?.avatar && (
                    <CommonStyles.Box sx={{ width: '100%', maxWidth: '15rem' }}>
                      <img
                        style={{ width: '100%' }}
                        alt='avatar-placeholder'
                        src={fileToString(values?.avatar || '')}
                      />
                    </CommonStyles.Box>
                  )
                }
              />
            </CommonStyles.Box>
          </Grid>

          <Grid item xs={8} md={8}>
            <CommonStyles.Box>
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.actualPortraitPhotoAtTheTimeOfRegistration')}
              </CommonStyles.Typography>

              <FieldUploadArray
                name='imgTourGuide'
                setFieldTouched={setFieldTouched}
                renderContent={(arrayHelpers: ArrayHelpers) => {
                  return (
                    <CommonStyles.Box sx={{ mt: 3 }}>
                      {!isEmpty(values?.imgTourGuide) ? (
                        <CommonStyles.Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                          {values?.imgTourGuide?.map((item, index) => {
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
                                    {!isDisabled && (
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
                                    )}
                                  </CommonStyles.Box>
                                )}
                              </CommonStyles.Box>
                            );
                          })}
                          {!isDisabled && (
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
                                  setFieldTouched && setFieldTouched('imgTourGuide', true);
                                  arrayHelpers.push({
                                    url: file,
                                  });
                                }}
                              />
                            </CommonStyles.Box>
                          )}
                        </CommonStyles.Box>
                      ) : (
                        !isDisabled && (
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
                              setFieldTouched && setFieldTouched('imgTourGuide', true);
                              arrayHelpers.push({
                                url: file,
                              });
                            }}
                          />
                        )
                      )}
                    </CommonStyles.Box>
                  );
                }}
              />
            </CommonStyles.Box>
          </Grid>
        </Grid>
      </CommonStyles.Box>
    );
  };

  const renderCitizenIdCardImage = () => {
    return (
      <CommonStyles.Box sx={{ mt: 2 }}>
        <CommonStyles.Typography sx={styles.title}>
          {t('LocalFriend.citizenIdCardImage')}
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
              if (
                file?.type ===
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
              ) {
                return TypeFile.DOC;
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
                              {item.fileType === TypeFile.DOC && (
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
                                  onMouseEnter={handleHoverDoc}
                                  onMouseLeave={handleHoverDoc}
                                  onClick={() => handlePreviewDoc(item?.url || '')}
                                >
                                  <CommonStyles.Box
                                    sx={{
                                      position: 'relative',
                                      opacity: isShown ? 0.3 : 1,
                                      transition: 'background-color 0.3s',
                                    }}
                                  >
                                    <CommonIconsClient.IconWordPreview />
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
                              {!isDisabled && (
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
                              )}
                            </CommonStyles.Box>
                          )}
                        </CommonStyles.Box>
                      );
                    })}
                    {!isDisabled && (
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
                    )}
                  </CommonStyles.Box>
                ) : (
                  !isDisabled && (
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
                  )
                )}
              </CommonStyles.Box>
            );
          }}
        />
        {touched.citizenIdCardImage && errors && errors.citizenIdCardImage && (
          <CommonStyles.HelperText>{errors.citizenIdCardImage}</CommonStyles.HelperText>
        )}
      </CommonStyles.Box>
    );
  };

  const renderBio = () => {
    return (
      <CommonStyles.Box sx={{ width: '81%' }}>
        <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
          {t('Profile.bio')}
        </CommonStyles.Typography>
        <FastField
          name='description'
          component={CustomFields.Textarea}
          placeholder={t('Profile.enterYourBio')}
          size='small'
          sx={{
            height: '4rem',
          }}
          fullWidth
          disabled={isDisabled}
        />
      </CommonStyles.Box>
    );
  };
  //! Render
  return (
    <CommonStyles.Box>
      {shouldRenderPreview && (
        <DialogPreviewPdf isOpen={openPreview} toggle={togglePreview} filePdf={refPdf.current} />
      )}
      {renderInformationTourGuide()}
      {renderBio()}
      {renderEmergencyContactInformation()}
      {renderTourGuideLicense()}
      {renderCitizenIdCardImage()}
    </CommonStyles.Box>
  );
};

export default ProfileDetail;
