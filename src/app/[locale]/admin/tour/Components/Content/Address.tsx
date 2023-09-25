import CommonStyles from 'components/CommonStyles';
import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import { ArrayHelpers, FastField, FieldArray, useFormikContext } from 'formik';
import CustomFields from 'components/CustomFields';
import useConstants from 'hooks/useConstants';
import { useTranslations } from 'next-intl';
import useGetListAreas from 'modules/province/hooks/useGetListAreas';
import { Province } from 'modules/province/province.interface';
import CommonIcons from 'components/CommonIcons';
import SelectProvince from 'components/SelectProvince';
import { FormValuesTour } from '../Content';
import { Schedules } from 'modules/tour/tour.interface';

const Address = () => {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const [expanded, setExpanded] = useState(true);
  const { values } = useFormikContext<FormValuesTour>();
  // const { optionsCity } = useConstants();

  const { data: resProvince, isLoading: isLoadingOptionsCity } = useGetListAreas();
  const allProvinces = resProvince?.map((elm: Province) => {
    return {
      label: elm?.name,
      value: elm?.id,
    };
  });

  const optionsProvince = [
    {
      label: 'Chọn tỉnh thành',
      value: 'default',
    },
    ...allProvinces,
  ];

  //! Function
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (isLoadingOptionsCity) {
    return <CommonStyles.Loading />;
  }

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        padding: '2rem 1rem',
        border: `1px solid ${theme.colors?.bgneutral200}`,
        borderRadius: '0.25rem',
        width: 'calc(73% + 0.125rem)',
        marginBottom: '1rem',
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
          variant='h4'
          sx={{
            fontSize: '1.125rem',
            color: theme.colors?.custom?.textGrey,
            fontWeight: 500,
          }}
        >
          {t('Tour.schedule')}
        </CommonStyles.Typography>
        <CommonStyles.Box>
          <CommonIcons.ExpandMoreCustom expanded={expanded} handleExpandClick={handleExpandClick} />
        </CommonStyles.Box>
      </CommonStyles.Box>
      <CommonStyles.Collapse expanded={expanded}>
        <CommonStyles.Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textGrey,
              fontWeight: 500,
            }}
          >
            {t('Tour.address')}
          </CommonStyles.Typography>

          <CommonStyles.Box>
            <CommonStyles.Typography
              variant='h4'
              sx={{
                fontSize: '1.125rem',
                color: theme.colors?.custom?.textGrey,
                fontWeight: 500,
                marginBottom: '0.5rem',
              }}
            >
              {t('Tour.province')}
            </CommonStyles.Typography>

            <SelectProvince name='areaId' sxContainer={{ minWidth: '15.625rem' }} />
          </CommonStyles.Box>
        </CommonStyles.Box>

        <CommonStyles.Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textGrey,
              fontWeight: 500,
            }}
          >
            {t('Tour.duration')}
          </CommonStyles.Typography>
          <FastField
            name='numberOfDays'
            isFormatNumber
            component={CustomFields.TextField}
            size='small'
            sx={{
              color: theme.colors?.custom?.textBlack,
              width: '15.625rem',
            }}
          />
        </CommonStyles.Box>

        <CommonStyles.Box>
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textGrey,
              fontWeight: 500,
              marginBottom: '1rem',
            }}
          >
            {t('Tour.detailsOfServicesAndSchedules')}
          </CommonStyles.Typography>

          <FieldArray
            name='schedules'
            render={(arrayHelpers: ArrayHelpers) => {
              return (
                <CommonStyles.Box>
                  {(values?.schedules || []).map((elm: Schedules, index: number) => {
                    return (
                      <CommonStyles.Box
                        key={index}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                          marginBottom: '1rem',
                          p: 2,
                          border: `1px solid ${theme.colors?.bgneutral200}`,
                          borderRadius: '0.5rem',
                        }}
                      >
                        <CommonStyles.Box sx={{ marginBottom: '0.5rem' }}>
                          <CommonStyles.Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: '0.5rem',
                            }}
                          >
                            <CommonStyles.Box>
                              <CommonStyles.Typography
                                variant='h4'
                                sx={{
                                  fontSize: '1.125rem',
                                  color: theme.colors?.custom?.textGrey,
                                  fontWeight: 500,
                                }}
                              >
                                {t('Tour.titleSchedules')}
                              </CommonStyles.Typography>
                            </CommonStyles.Box>

                            <CommonStyles.Box
                              sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                            >
                              <CommonStyles.Typography>
                                <b>{index + 1}.</b>
                              </CommonStyles.Typography>

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

                          <CommonStyles.Box>
                            <FastField
                              name={`schedules.${index}.title`}
                              component={CustomFields.TextField}
                              size='small'
                              sx={{
                                color: theme.colors?.custom?.textBlack,
                              }}
                              fullWidth
                            />
                          </CommonStyles.Box>
                        </CommonStyles.Box>

                        <CommonStyles.Box>
                          <CommonStyles.Typography
                            variant='h4'
                            sx={{
                              fontSize: '1.125rem',
                              color: theme.colors?.custom?.textGrey,
                              fontWeight: 500,
                              marginBottom: '0.5rem',
                              minHeight: '2.5rem',
                              lineHeight: '2.5rem',
                            }}
                          >
                            {t('Tour.descriptionSchedules')}
                          </CommonStyles.Typography>

                          <FastField
                            name={`schedules.${index}.description`}
                            component={CustomFields.Textarea}
                            size='small'
                            sx={{
                              color: theme.colors?.custom?.textBlack,
                              height: '4rem',
                            }}
                            fullWidth
                          />
                        </CommonStyles.Box>
                      </CommonStyles.Box>
                    );
                  })}

                  <CommonStyles.Button
                    variant='outlined'
                    fullWidth
                    onClick={() => {
                      arrayHelpers.push({ title: '', description: '' });
                    }}
                  >
                    <CommonIcons.AddIcon />
                  </CommonStyles.Button>
                </CommonStyles.Box>
              );
            }}
          />
        </CommonStyles.Box>
      </CommonStyles.Collapse>
    </CommonStyles.Box>
  );
};

export default React.memo(Address);
