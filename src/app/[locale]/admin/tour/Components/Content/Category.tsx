import CommonStyles from 'components/CommonStyles';
import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import useGetListTourCategory from 'modules/tour-category/hooks/useGetListTourCategory';
import { TourCategory } from 'modules/tour-category/tour-category.interface';
import { FastField } from 'formik';
import CustomFields from 'components/CustomFields';
import CommonIcons from 'components/CommonIcons';

const Category = () => {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const [expanded, setExpanded] = useState(true);
  const { data: resTourCategory, isLoading: isLoadingTourCategory } = useGetListTourCategory();

  //! Function
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
          {t('Tour.tourCategory')}
        </CommonStyles.Typography>
        <CommonStyles.Box>
          <CommonIcons.ExpandMoreCustom expanded={expanded} handleExpandClick={handleExpandClick} />
        </CommonStyles.Box>
      </CommonStyles.Box>

      <CommonStyles.Collapse expanded={expanded}>
        <CommonStyles.Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            height: '12.625rem',
          }}
        >
          {resTourCategory.map((elm: TourCategory) => {
            return (
              <FastField
                component={CustomFields.CheckBoxField}
                name={`category_${elm.id}`}
                key={elm.id}
                label={elm.name}
                sxContainer={{
                  marginBottom: '1rem',
                }}
                sxLabel={{
                  fontSize: '0.875rem',
                  color: theme.colors?.custom?.textBlack,
                  lineHeight: 'normal',
                }}
                sxWrapper={{
                  flexDirection: 'flex-start',
                }}
              />
            );
          })}
        </CommonStyles.Box>
      </CommonStyles.Collapse>
    </CommonStyles.Box>
  );
};

export default React.memo(Category);
