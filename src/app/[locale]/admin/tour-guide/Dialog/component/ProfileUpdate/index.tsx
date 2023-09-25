import { Grid, useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import { ArrayHelpers, FastField, Field, FieldArray, useFormikContext } from 'formik';
import { fileToString } from 'helpers/common';
import useConstants from 'hooks/useConstants';
import { useTranslations } from 'next-intl';
import React, { useCallback } from 'react';
import { FormTourGuideValues } from '../../AddForm';
import SelectProvince from 'components/SelectProvince';
import SelectPrefixPhone from 'components/SelectPrefixPhone';
import { isEmpty, isEqual, omit } from 'lodash';
import CommonIcons from 'components/CommonIcons';
import PaymentUpdate from '../PaymentUpdate';
import DialogPreviewPdf from '../DialogPreviewPdf';
import useToggleDialog from 'hooks/useToggleDialog';
import CommonIconsClient from 'components/Client/CommonIcons';
import FieldUploadArray from 'components/Client/Components/FieldUploadArray';
import { TypeFile } from 'constants/common';

interface Props {}

export const isCheckUpdate = (value: FormTourGuideValues, key: string) => {
  const valueBeforeUpdate = omit(value, 'draft');
  const valueAfterUpdate = value?.draft;

  if (
    valueBeforeUpdate[key] !== valueAfterUpdate[key as keyof Omit<FormTourGuideValues, 'draft'>] &&
    !isEqual(
      valueBeforeUpdate[key],
      valueAfterUpdate[key as keyof Omit<FormTourGuideValues, 'draft'>]
    )
  ) {
    return true;
  } else {
    return false;
  }
};

const ProfileUpdate = (props: Props) => {
  //! State
  const { optionsFemaleOrMale, optionsYesOrNo } = useConstants();
  const theme = useTheme();
  const t = useTranslations();
  const [isShown, setIsShown] = React.useState<boolean>(false);
  const refPdf = React.useRef<string | null>(null);
  const {
    shouldRender: shouldRenderPreview,
    open: openPreview,
    toggle: togglePreview,
  } = useToggleDialog();
  const { values, setFieldTouched, touched, errors } = useFormikContext<FormTourGuideValues>();

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
              <CommonStyles.Box
                sx={{
                  width: '30% ',
                  border: isCheckUpdate(values, 'firstName')
                    ? `0.125rem solid ${theme?.colors?.bgyellow600}`
                    : undefined,
                  padding: isCheckUpdate(values, 'firstName') ? '0.2rem' : undefined,
                }}
              >
                <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                  {t('LocalFriend.firstName')}
                </CommonStyles.Typography>
                <FastField
                  size='small'
                  component={CustomFields.TextField}
                  name='draft.firstName'
                  placeholder={t('LocalFriend.yourFirstName')}
                  fullWidth
                  disabled
                />
              </CommonStyles.Box>

              <CommonStyles.Box
                sx={{
                  width: '70%',
                  border: isCheckUpdate(values, 'lastName')
                    ? `0.125rem solid ${theme?.colors?.bgyellow600}`
                    : undefined,
                  padding: isCheckUpdate(values, 'lastName') ? '0.2rem' : undefined,
                }}
              >
                <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                  {t('LocalFriend.lastName')}
                </CommonStyles.Typography>
                <FastField
                  size='small'
                  component={CustomFields.TextField}
                  name='draft.lastName'
                  placeholder={t('LocalFriend.yourLastName')}
                  fullWidth
                  disabled
                />
              </CommonStyles.Box>
            </CommonStyles.Box>

            <CommonStyles.Box
              sx={{
                border: isCheckUpdate(values, 'cid')
                  ? `0.125rem solid ${theme?.colors?.bgyellow600}`
                  : undefined,
                padding: isCheckUpdate(values, 'cid') ? '0.2rem' : undefined,
              }}
            >
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.citizenIdCard')}
              </CommonStyles.Typography>
              <FastField
                size='small'
                component={CustomFields.TextField}
                name='draft.cid'
                placeholder={t('LocalFriend.idNumber')}
                fullWidth
                disabled
              />
            </CommonStyles.Box>

            <CommonStyles.Box
              sx={{
                border: isCheckUpdate(values, 'residenceAccordingToPermanentAddress')
                  ? `0.125rem solid ${theme?.colors?.bgyellow600}`
                  : undefined,
                padding: isCheckUpdate(values, 'residenceAccordingToPermanentAddress')
                  ? '0.2rem'
                  : undefined,
              }}
            >
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.residenceAccordingToPermanentAddress')}
              </CommonStyles.Typography>
              <FastField
                size='small'
                component={CustomFields.TextField}
                name='draft.residenceAccordingToPermanentAddress'
                placeholder={t('LocalFriend.address')}
                fullWidth
                disabled
              />
            </CommonStyles.Box>
          </CommonStyles.Box>
        </Grid>

        <Grid item xs={4} md={4}>
          <CommonStyles.Box sx={styles.contentItem}>
            <CommonStyles.Box
              sx={{
                border: isCheckUpdate(values, 'date_of_birth')
                  ? `0.125rem solid ${theme?.colors?.bgyellow600}`
                  : undefined,
                padding: isCheckUpdate(values, 'date_of_birth') ? '0.2rem' : undefined,
              }}
            >
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.dateOfBirthAccordingToIdCard')}
              </CommonStyles.Typography>
              <FastField
                size='small'
                type='date'
                component={CustomFields.TextField}
                initialValue={null}
                name='draft.date_of_birth'
                fullWidth
                disabled
              />
            </CommonStyles.Box>

            <CommonStyles.Box
              sx={{
                border: isCheckUpdate(values, 'phone')
                  ? `0.125rem solid ${theme?.colors?.bgyellow600}`
                  : undefined,
                padding: isCheckUpdate(values, 'phone') ? '0.2rem' : undefined,
              }}
            >
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.phone')}
              </CommonStyles.Typography>
              <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
                <CommonStyles.Box>
                  <SelectPrefixPhone name='phoneTourGuidePrefix' isDisabled={true} />
                </CommonStyles.Box>

                <FastField
                  size='small'
                  component={CustomFields.TextField}
                  name='draft.phone'
                  placeholder={t('LocalFriend.phone')}
                  fullWidth
                  disabled
                />
              </CommonStyles.Box>
            </CommonStyles.Box>

            <CommonStyles.Box
              sx={{
                border: isCheckUpdate(values, 'currentResidence')
                  ? `0.125rem solid ${theme?.colors?.bgyellow600}`
                  : undefined,
                padding: isCheckUpdate(values, 'currentResidence') ? '0.2rem' : undefined,
              }}
            >
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.currentResidence')}
              </CommonStyles.Typography>
              <FastField
                size='small'
                component={CustomFields.TextField}
                name='draft.currentResidence'
                placeholder={t('LocalFriend.address')}
                fullWidth
                disabled
              />
            </CommonStyles.Box>
          </CommonStyles.Box>
        </Grid>

        <Grid item xs={4} md={4}>
          <CommonStyles.Box sx={styles.contentItem}>
            <CommonStyles.Box
              sx={{
                border: isCheckUpdate(values, 'gender')
                  ? `0.125rem solid ${theme?.colors?.bgyellow600}`
                  : undefined,
                padding: isCheckUpdate(values, 'gender') ? '0.2rem' : undefined,
              }}
            >
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.gender')}
              </CommonStyles.Typography>
              <FastField
                sizeRadio='small'
                component={CustomFields.RadioField}
                name='draft.gender'
                fullWidth
                values={optionsFemaleOrMale}
                styleFormControl={{ height: '2.5rem' }}
                disabled
              />
            </CommonStyles.Box>

            <CommonStyles.Box
              sx={{
                border: isCheckUpdate(values, 'email')
                  ? `0.125rem solid ${theme?.colors?.bgyellow600}`
                  : undefined,
                padding: isCheckUpdate(values, 'email') ? '0.2rem' : undefined,
              }}
            >
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.email')}
              </CommonStyles.Typography>
              <FastField
                size='small'
                component={CustomFields.TextField}
                name='draft.email'
                placeholder={t('LocalFriend.email')}
                fullWidth
                disabled
              />
            </CommonStyles.Box>

            <CommonStyles.Box
              sx={{
                border: isCheckUpdate(values, 'provinceCity')
                  ? `0.125rem solid ${theme?.colors?.bgyellow600}`
                  : undefined,
                padding: isCheckUpdate(values, 'provinceCity') ? '0.2rem' : undefined,
              }}
            >
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.localFriendLocation')}
              </CommonStyles.Typography>
              <SelectProvince name='draft.provinceCity' isDisabled={true} isMultiple />
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
            <CommonStyles.Box
              sx={{
                border: isCheckUpdate(values, 'nameEmergency')
                  ? `0.125rem solid ${theme?.colors?.bgyellow600}`
                  : undefined,
                padding: isCheckUpdate(values, 'nameEmergency') ? '0.2rem' : undefined,
              }}
            >
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.name')}
              </CommonStyles.Typography>
              <FastField
                size='small'
                component={CustomFields.TextField}
                name='draft.nameEmergency'
                placeholder={t('LocalFriend.firstLastName')}
                fullWidth
                disabled
              />
            </CommonStyles.Box>
          </Grid>

          <Grid item xs={4} md={4}>
            <CommonStyles.Box
              sx={{
                border: isCheckUpdate(values, 'phoneEmergency')
                  ? `0.125rem solid ${theme?.colors?.bgyellow600}`
                  : undefined,
                padding: isCheckUpdate(values, 'phoneEmergency') ? '0.2rem' : undefined,
              }}
            >
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.phone')}
              </CommonStyles.Typography>
              <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
                <CommonStyles.Box>
                  <SelectPrefixPhone name='draft.phoneEmergencyPrefix' isDisabled={true} />
                </CommonStyles.Box>
                <FastField
                  size='small'
                  component={CustomFields.TextField}
                  name='draft.phoneEmergency'
                  placeholder={t('LocalFriend.phone')}
                  fullWidth
                  disabled
                />
              </CommonStyles.Box>
            </CommonStyles.Box>
          </Grid>

          <Grid item xs={4} md={4}>
            <CommonStyles.Box
              sx={{
                border: isCheckUpdate(values, 'relationship')
                  ? `0.125rem solid ${theme?.colors?.bgyellow600}`
                  : undefined,
                padding: isCheckUpdate(values, 'relationship') ? '0.2rem' : undefined,
              }}
            >
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.relationship')}
              </CommonStyles.Typography>
              <FastField
                size='small'
                component={CustomFields.TextField}
                name='draft.relationship'
                placeholder={t('LocalFriend.relationship')}
                fullWidth
                disabled
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
        <CommonStyles.Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            border: isCheckUpdate(values, 'checkLicense')
              ? `0.125rem solid ${theme?.colors?.bgyellow600}`
              : undefined,
            padding: isCheckUpdate(values, 'checkLicense') ? '0.2rem' : undefined,
          }}
        >
          <CommonStyles.Typography sx={styles.title}>
            {t('LocalFriend.localFriendLicense')}
          </CommonStyles.Typography>
          <FastField
            component={CustomFields.RadioField}
            name='draft.checkLicense'
            fullWidth
            values={optionsYesOrNo}
            disabled
          />
        </CommonStyles.Box>

        <Grid container rowSpacing={4} columnSpacing={{ xs: 2 }} sx={styles.gridContainer}>
          <Grid item xs={4} md={4}>
            <CommonStyles.Box
              sx={{
                border: isCheckUpdate(values, 'avatar')
                  ? `0.125rem solid ${theme?.colors?.bgyellow600}`
                  : undefined,
                padding: isCheckUpdate(values, 'avatar') ? '0.2rem' : undefined,
              }}
            >
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.avatar')}
              </CommonStyles.Typography>

              <FastField
                size='small'
                component={CommonStyles.PlaceholderUploadImage}
                name='draft.avatar'
                fullWidth
                isHasDelete
                disabled
                renderChildren={
                  !!values?.draft?.avatar && (
                    <CommonStyles.Box sx={{ width: '100%', maxWidth: '15rem' }}>
                      <img
                        style={{ width: '100%' }}
                        alt='avatar-placeholder'
                        src={fileToString(values?.draft?.avatar || '')}
                      />
                    </CommonStyles.Box>
                  )
                }
              />
            </CommonStyles.Box>
          </Grid>

          <Grid item xs={8} md={8}>
            <CommonStyles.Box
              sx={{
                border: isCheckUpdate(values, 'imgTourGuide')
                  ? `0.125rem solid ${theme?.colors?.bgyellow600}`
                  : undefined,
                padding: isCheckUpdate(values, 'imgTourGuide') ? '0.2rem' : undefined,
              }}
            >
              <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
                {t('LocalFriend.actualPortraitPhotoAtTheTimeOfRegistration')}
              </CommonStyles.Typography>

              <FieldUploadArray
                name='draft.imgTourGuide'
                setFieldTouched={setFieldTouched}
                renderContent={(arrayHelpers: ArrayHelpers) => {
                  return (
                    <CommonStyles.Box sx={{ mt: 3 }}>
                      {
                        !isEmpty(values?.draft?.imgTourGuide) && (
                          <CommonStyles.Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {values?.draft?.imgTourGuide?.map((item, index) => {
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

                                      {/* <CommonStyles.Box
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
                                    </CommonStyles.Box> */}
                                    </CommonStyles.Box>
                                  )}
                                </CommonStyles.Box>
                              );
                            })}

                            {/* <CommonStyles.Box>
                            <CommonStyles.PlaceholderUploadImage
                              disabled
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
                          </CommonStyles.Box> */}
                          </CommonStyles.Box>
                        )

                        // <CommonStyles.PlaceholderUploadImage
                        //   disabled
                        //   accept='image/jpeg,image/png,image/jpg,.doc, .docx,.pdf'
                        //   sx={{
                        //     color: theme.colors?.client.gray,
                        //     borderRadius: '0.5rem',
                        //     width: '10rem',
                        //     height: '10rem',
                        //   }}
                        //   sxIcon={{
                        //     width: '2rem',
                        //     height: '2rem',
                        //     '& svg': {
                        //       width: '2rem',
                        //       height: '2rem',
                        //       path: {
                        //         color: `${theme.colors?.client.textPaginationBlack} !important`,
                        //       },
                        //     },
                        //   }}
                        //   onChangeFile={(file) => {
                        //     setFieldTouched && setFieldTouched('imgTourGuide', true);
                        //     arrayHelpers.push({
                        //       url: file,
                        //     });
                        //   }}
                        // />
                      }
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
      <CommonStyles.Box
        sx={{
          mt: 2,
          border: isCheckUpdate(values, 'citizenIdCardImage')
            ? `0.125rem solid ${theme?.colors?.bgyellow600}`
            : undefined,
          padding: isCheckUpdate(values, 'citizenIdCardImage') ? '0.2rem' : undefined,
        }}
      >
        <CommonStyles.Typography sx={styles.title}>
          {t('LocalFriend.citizenIdCardImage')}
        </CommonStyles.Typography>

        <FieldUploadArray
          name='draft.citizenIdCardImage'
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
                {!isEmpty(values?.draft?.citizenIdCardImage) ? (
                  <CommonStyles.Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {values?.draft?.citizenIdCardImage?.map((item, index) => {
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

                              {/* <CommonStyles.Box
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
                              </CommonStyles.Box> */}
                            </CommonStyles.Box>
                          )}
                        </CommonStyles.Box>
                      );
                    })}

                    {/* <CommonStyles.Box>
                      <CommonStyles.PlaceholderUploadImage
                        disabled
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
                    </CommonStyles.Box> */}
                  </CommonStyles.Box>
                ) : (
                  <CommonStyles.PlaceholderUploadImage
                    disabled
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
    );
  };
  const renderBio = () => {
    return (
      <CommonStyles.Box
        sx={{
          width: '81%',
          border: isCheckUpdate(values, 'description')
            ? `0.125rem solid ${theme?.colors?.bgyellow600}`
            : undefined,
          padding: isCheckUpdate(values, 'description ') ? '0.2rem' : undefined,
        }}
      >
        <CommonStyles.Typography variant='subtitle2' sx={styles.labelInput}>
          {t('Profile.bio')}
        </CommonStyles.Typography>
        <FastField
          name='draft.description'
          component={CustomFields.Textarea}
          placeholder={t('Profile.enterYourBio')}
          size='small'
          sx={{
            height: '4rem',
          }}
          fullWidth
          disabled
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
      <PaymentUpdate />
      {renderCitizenIdCardImage()}
    </CommonStyles.Box>
  );
};

export default ProfileUpdate;
