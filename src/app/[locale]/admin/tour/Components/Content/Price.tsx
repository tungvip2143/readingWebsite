import { useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import FormikField from 'components/FormikField';
import { FastField } from 'formik';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

const Price = () => {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const [expanded, setExpanded] = useState(true);

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
          {t('Tour.price')}
        </CommonStyles.Typography>

        <CommonStyles.Box>
          <CommonIcons.ExpandMoreCustom expanded={expanded} handleExpandClick={handleExpandClick} />
        </CommonStyles.Box>
      </CommonStyles.Box>

      <CommonStyles.Collapse expanded={expanded}>
        <CommonStyles.Box
          sx={{
            marginBottom: '2rem',
            display: 'flex',
            gap: 8,
            // justifyContent: 'space-between',
          }}
        >
          <CommonStyles.Box sx={{ width: '50%' }}>
            <CommonStyles.Typography
              variant='h4'
              sx={{
                fontSize: '1.125rem',
                color: theme.colors?.custom?.textGrey,
                fontWeight: 500,
                marginBottom: '0.5rem',
              }}
            >
              {t('Tour.priceForAdults')}
            </CommonStyles.Typography>

            <FormikField
              isFastField
              name='priceForAdult'
              component={CustomFields.TextField}
              isFormatNumber
              size='small'
              sx={{
                color: theme.colors?.custom?.textBlack,
              }}
              fullWidth
            />
          </CommonStyles.Box>

          <CommonStyles.Box sx={{ width: '50%' }}>
            <CommonStyles.Typography
              variant='h4'
              sx={{
                fontSize: '1.125rem',
                color: theme.colors?.custom?.textGrey,
                fontWeight: 500,
                marginBottom: '0.5rem',
              }}
            >
              {t('Tour.priceForChildren')}
            </CommonStyles.Typography>

            <FormikField
              isFastField
              name='priceForChildren'
              component={CustomFields.TextField}
              isFormatNumber
              size='small'
              sx={{
                color: theme.colors?.custom?.textBlack,
              }}
              fullWidth
            />
          </CommonStyles.Box>
        </CommonStyles.Box>

        <CommonStyles.Box sx={{ marginBottom: '1rem' }}>
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textGrey,
              fontWeight: 500,
              marginBottom: '0.5rem',
            }}
          >
            {t('Tour.systemPrice')}
          </CommonStyles.Typography>
          <FormikField
            name='fixCost'
            component={CustomFields.TextField}
            fullWidth
            size='small'
            isFormatNumber
          />
        </CommonStyles.Box>

        <CommonStyles.Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <CommonStyles.Box>
            <CommonStyles.Box sx={{ marginBottom: '1rem' }}>
              <FastField
                name='allowApplyCoupon'
                component={CustomFields.CheckBoxField}
                label={t('Tour.allowApplyCoupon')}
                sxLabel={{
                  fontSize: '0.875rem',
                  color: theme.colors?.custom?.textBlack,
                  lineHeight: 'normal',
                }}
                sxWrapper={{
                  flexDirection: 'flex-start',
                }}
              />
            </CommonStyles.Box>

            <CommonStyles.Box>
              <FastField
                name='allowCancel'
                component={CustomFields.CheckBoxField}
                label={t('Tour.allowRefund')}
                sxLabel={{
                  fontSize: '0.875rem',
                  color: theme.colors?.custom?.textBlack,
                  lineHeight: 'normal',
                }}
                sxWrapper={{
                  flexDirection: 'flex-start',
                }}
              />
            </CommonStyles.Box>
          </CommonStyles.Box>

          <CommonStyles.Box>
            <CommonStyles.Typography
              variant='h4'
              sx={{
                fontSize: '0.875rem',
                color: theme.colors?.custom?.textBlack,
                lineHeight: 'normal',
                margin: '0.375rem 0 1rem 0',
              }}
            >
              {t('Tour.timeAllowToCancel')}
            </CommonStyles.Typography>
            <FormikField
              isFastField
              isFormatNumber
              name='allowCancelTime'
              component={CustomFields.TextField}
              fullWidth
              size='small'
              sx={{
                color: theme.colors?.custom?.textBlack,
              }}
            />
          </CommonStyles.Box>
        </CommonStyles.Box>
      </CommonStyles.Collapse>
    </CommonStyles.Box>
  );
};

export default React.memo(Price);
