import { useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import FormikField from 'components/FormikField';
import { ArrayHelpers, FastField, FieldArray, useFormikContext } from 'formik';
import { VendorServing } from 'modules/vendor/vendor.interface';
import { useTranslations } from 'next-intl';
import React from 'react';
import { FormValuesVendor } from '../Content';
import { isEmpty } from 'lodash';
interface Props {
  dayOfWeek: number;
}
const Timer = ({ dayOfWeek }: Props) => {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const { values } = useFormikContext<FormValuesVendor>();

  //! Function

  //! Render
  return (
    <CommonStyles.Box sx={{ marginTop: '2rem' }}>
      <CommonStyles.Typography
        variant='h4'
        sx={{
          fontSize: '1.125rem',
          color: theme.colors?.custom?.textBlack,
          marginBottom: '1rem',
          fontWeight: 500,
        }}
      >
        {t('Vendor.timer')}
      </CommonStyles.Typography>

      <CommonStyles.Box>
        <FieldArray
          name={`servings.${dayOfWeek}`}
          render={(arrayHelpers: ArrayHelpers) => {
            return (
              <CommonStyles.Box>
                {!isEmpty(values.servings?.[dayOfWeek]) ? (
                  <CommonStyles.Box>
                    {values?.servings?.[dayOfWeek]?.map((serving, index) => {
                      return (
                        <CommonStyles.Box
                          key={index}
                          sx={{
                            marginTop: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <CommonStyles.Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                              }}
                            >
                              <CommonStyles.Typography
                                variant='h4'
                                sx={{
                                  fontSize: '1rem',
                                  color: theme.colors?.custom?.textBlack,
                                  marginBottom: '0.5rem',
                                  fontWeight: 500,
                                }}
                              >
                                {t('Vendor.from')}
                              </CommonStyles.Typography>

                              <CommonStyles.Box
                                sx={{
                                  padding: '0.75rem 0.875rem',
                                  background: theme.colors?.client.lightGray,
                                  borderRadius: '1rem',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: '0.5rem',
                                  postion: 'relative',
                                  svg: {
                                    marginTop: '4px',
                                  },
                                }}
                              >
                                <FormikField
                                  name={`servings.${dayOfWeek}.${index}.start`}
                                  component={CustomFields.TimePickerField}
                                  sxContainer={{
                                    input: {
                                      padding: '0 !important',
                                      fontSize: '0.875rem',
                                      fontWeight: 500,
                                      lineHeight: '1.4rem',
                                      letterSpacing: '0.56px',
                                      color: theme.colors?.client?.midBlack,
                                      [':hover']: {
                                        cursor: 'pointer',
                                      },
                                      marginTop: '5px',
                                    },
                                    fieldset: {
                                      border: '0',
                                    },
                                    ['.MuiFormHelperText-root']: {
                                      position: 'absolute',
                                      width: 300,
                                      top: 37,
                                      left: '-13px',
                                      margin: 0,
                                    },
                                  }}
                                />
                              </CommonStyles.Box>
                            </CommonStyles.Box>

                            <CommonStyles.Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                              }}
                            >
                              <CommonStyles.Typography
                                variant='h4'
                                sx={{
                                  fontSize: '1rem',
                                  color: theme.colors?.custom?.textBlack,
                                  marginBottom: '0.5rem',
                                  fontWeight: 500,
                                }}
                              >
                                {t('Vendor.to')}
                              </CommonStyles.Typography>

                              <CommonStyles.Box
                                sx={{
                                  padding: '0.75rem 0.875rem',
                                  background: theme.colors?.client.lightGray,
                                  borderRadius: '1rem',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: '0.5rem',
                                  postion: 'relative',
                                  svg: {
                                    marginTop: '4px',
                                  },
                                }}
                              >
                                <FormikField
                                  name={`servings.${dayOfWeek}.${index}.end`}
                                  component={CustomFields.TimePickerField}
                                  sxContainer={{
                                    input: {
                                      padding: '0 !important',
                                      fontSize: '0.875rem',
                                      fontWeight: 500,
                                      lineHeight: '1.4rem',
                                      letterSpacing: '0.56px',
                                      color: theme.colors?.client?.midBlack,
                                      [':hover']: {
                                        cursor: 'pointer',
                                      },
                                      marginTop: '5px',
                                    },
                                    fieldset: {
                                      border: '0',
                                    },
                                    ['.MuiFormHelperText-root']: {
                                      position: 'absolute',
                                      width: 300,
                                      top: 37,
                                      left: '-13px',
                                      margin: 0,
                                    },
                                  }}
                                />
                              </CommonStyles.Box>
                            </CommonStyles.Box>

                            <CommonStyles.Box
                              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                            >
                              <CommonStyles.Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '0.5rem 0.75rem',
                                  cursor: 'pointer',
                                  '&:hover': {
                                    backgroundColor: theme.colors?.custom?.greyBackground,
                                    borderRadius: '0.625rem',
                                  },
                                }}
                                onClick={() => {
                                  arrayHelpers.push({ start: '', end: '' });
                                }}
                              >
                                <CommonIcons.AddIcon />
                              </CommonStyles.Box>

                              <CommonStyles.Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '0.5rem 0.75rem',
                                  cursor: 'pointer',
                                  '&:hover': {
                                    backgroundColor: theme.colors?.custom?.greyBackground,
                                    borderRadius: '0.625rem',
                                  },
                                }}
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                }}
                              >
                                <CommonIcons.DeleteIcon sx={{ color: theme.colors?.red500 }} />
                              </CommonStyles.Box>
                            </CommonStyles.Box>
                          </CommonStyles.Box>
                        </CommonStyles.Box>
                      );
                    })}
                  </CommonStyles.Box>
                ) : (
                  <CommonStyles.Box
                    sx={{
                      width: 'fit-content',
                      padding: '0.5rem 0.75rem',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: theme.colors?.custom?.greyBackground,
                        borderRadius: '0.625rem',
                      },
                    }}
                    onClick={() => {
                      arrayHelpers.push({ start: '', end: '' });
                    }}
                  >
                    <CommonIcons.AddIcon />
                  </CommonStyles.Box>
                )}
              </CommonStyles.Box>
            );
          }}
        />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(Timer);
