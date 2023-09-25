import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import { FastField, useFormikContext, FieldArray, ArrayHelpers } from 'formik';
import useConstants from 'hooks/useConstants';
import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import CommonIcons from 'components/CommonIcons';
import { FormValuesTour } from '../../../Content';
import { SetBooleanState, SetOptionsValue } from 'interfaces/common';

const General = () => {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const { values, handleSubmit } = useFormikContext<FormValuesTour>();
  const { optionsChangeLanguage } = useConstants();
  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        padding: '2rem 1rem',
        border: `0.0625rem solid ${theme.colors?.bgneutral200}`,
        borderRadius: '0.25rem',
        flex: 1,
      }}
    >
      <CommonStyles.Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <CommonStyles.Typography
          variant='h2'
          sx={{
            fontSize: '1.125rem',
            color: theme.colors?.custom?.textGrey,
            fontWeight: 500,
          }}
        >
          {t('Tour.generalInformation')}
        </CommonStyles.Typography>
        <CommonStyles.Box>
          <CommonIcons.ExpandMoreCustom expanded={expanded} handleExpandClick={handleExpandClick} />
        </CommonStyles.Box>
      </CommonStyles.Box>

      <CommonStyles.Collapse expanded={expanded}>
        <CommonStyles.Box sx={{ marginBottom: '1rem' }}>
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textBlack,
              marginBottom: '0.5rem',
              fontWeight: 500,
            }}
          >
            {t('Tour.tourName')}
          </CommonStyles.Typography>
          <FastField
            name='name'
            component={CustomFields.TextField}
            size='small'
            sx={{
              color: theme.colors?.custom?.textBlack,
            }}
            fullWidth
          />
        </CommonStyles.Box>

        <CommonStyles.Box
          sx={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '3rem' }}
        >
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textBlack,
              marginBottom: '0.5rem',
              fontWeight: 500,
            }}
          >
            {t('Tour.language')}
          </CommonStyles.Typography>
          {/* <FastField
            name='language'
            component={CustomFields.SelectField}
            options={optionsChangeLanguage}
            className='change-language'
            fullWidth
            size='small'
          /> */}

          <FastField
            name='language'
            component={CustomFields.AutoCompleteField}
            // options={optionsChangeLanguage}
            className='change-language'
            label={t('Tour.language')}
            loadOptions={(
              text: string,
              setOptions: SetOptionsValue,
              setLoading: SetBooleanState
            ) => {
              setOptions(optionsChangeLanguage);
            }}
            multiple
            disableCloseOnSelect
            sx={{
              width: '31.25rem',
            }}
          />
        </CommonStyles.Box>

        <CommonStyles.Box sx={{ marginBottom: '1rem' }}>
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textBlack,
              marginBottom: '0.5rem',
              fontWeight: 500,
            }}
          >
            {t('Tour.description')}
          </CommonStyles.Typography>
          <FastField
            name='description'
            component={CustomFields.Textarea}
            size='small'
            sx={{
              color: theme.colors?.custom?.textBlack,
              height: '5rem',
            }}
            fullWidth
          />
        </CommonStyles.Box>

        <CommonStyles.Box sx={{ marginBottom: '1rem' }}>
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textBlack,
              marginBottom: '0.5rem',
              fontWeight: 500,
            }}
          >
            {t('Tour.include')}
          </CommonStyles.Typography>
          <FieldArray
            name='include'
            render={(arrayHelpers: ArrayHelpers) => {
              return (
                <CommonStyles.Box>
                  {values.include && values.include.length > 1 ? (
                    values.include.map((elm: string, index: number) => {
                      return (
                        <CommonStyles.Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            marginBottom: '1rem',
                          }}
                        >
                          <CommonStyles.Box sx={{ flex: 1 }}>
                            <FastField
                              name={`include.${index}`}
                              component={CustomFields.Textarea}
                              size='small'
                              sx={{
                                color: theme.colors?.custom?.textBlack,
                                height: '4rem',
                              }}
                              fullWidth
                            />
                          </CommonStyles.Box>

                          <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                                arrayHelpers.push('');
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
                      );
                    })
                  ) : (
                    <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CommonStyles.Box sx={{ flex: 1 }}>
                        <FastField
                          name={`include.${0}`}
                          component={CustomFields.Textarea}
                          size='small'
                          sx={{
                            color: theme.colors?.custom?.textBlack,
                            height: '4rem',
                          }}
                          fullWidth
                        />
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
                          arrayHelpers.push('');
                        }}
                      >
                        <CommonIcons.AddIcon />
                      </CommonStyles.Box>
                    </CommonStyles.Box>
                  )}
                </CommonStyles.Box>
              );
            }}
          />
        </CommonStyles.Box>

        <CommonStyles.Box>
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textBlack,
              marginBottom: '0.5rem',
              fontWeight: 500,
            }}
          >
            {t('Tour.exclude')}
          </CommonStyles.Typography>
          <FieldArray
            name='exclude'
            render={(arrayHelpers: ArrayHelpers) => {
              return (
                <CommonStyles.Box>
                  {values.exclude && values.exclude.length > 1 ? (
                    values.exclude.map((elm: string, index: number) => {
                      return (
                        <CommonStyles.Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            marginBottom: '1rem',
                          }}
                        >
                          <CommonStyles.Box sx={{ flex: 1 }}>
                            <FastField
                              name={`exclude.${index}`}
                              component={CustomFields.Textarea}
                              size='small'
                              sx={{
                                color: theme.colors?.custom?.textBlack,
                                height: '4rem',
                              }}
                              fullWidth
                            />
                          </CommonStyles.Box>

                          <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                                arrayHelpers.push('');
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
                      );
                    })
                  ) : (
                    <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CommonStyles.Box sx={{ flex: 1 }}>
                        <FastField
                          name={`exclude.${0}`}
                          component={CustomFields.Textarea}
                          size='small'
                          sx={{
                            color: theme.colors?.custom?.textBlack,
                            height: '4rem',
                          }}
                          fullWidth
                        />
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
                          arrayHelpers.push('');
                        }}
                      >
                        <CommonIcons.AddIcon />
                      </CommonStyles.Box>
                    </CommonStyles.Box>
                  )}
                </CommonStyles.Box>
              );
            }}
          />
        </CommonStyles.Box>
      </CommonStyles.Collapse>
    </CommonStyles.Box>
  );
};

export default React.memo(General);
