import React, { useMemo, useState } from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import useGetListTourCategory from 'modules/tour-category/hooks/useGetListTourCategory';
import CommonIcons from 'components/Client/CommonIcons';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { TourCategory } from 'modules/tour-category/tour-category.interface';

interface NavbarWithFilters {
  onChange?: (value: number) => void;
}

export default function NavbarWithFilters(props: NavbarWithFilters) {
  //! State
  const { onChange = () => {} } = props;
  const theme = useTheme();
  const t = useTranslations();

  const { data: resTourCategory } = useGetListTourCategory();

  const [tabActive, setTabActive] = useState<number>(0);

  const listItem = resTourCategory.map((el: TourCategory) => {
    return {
      isActive: tabActive === el.id,
      label: el.name,
      onClick: () => {
        if (el.id === tabActive) {
          return;
        }
        onChange(el.id);
        setTabActive(el.id);
      },
    };
  });

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
      }}
    >
      <CommonStylesClient.Box>
        <CommonStylesClient.Tabs listItem={listItem} />
      </CommonStylesClient.Box>

      {/* <CommonStylesClient.Box>
        <CommonStylesClient.Button
          variant='outlined'
          endIcon={<CommonIcons.IconFilter />}
          sx={{
            color: theme.colors?.client.white,
            border: `1px solid ${theme.colors?.client.white}`,
            borderRadius: '6.25rem',
            textTransform: 'capitalize',
            [':hover']: {
              border: `1px solid ${theme.colors?.client.white}`,
            },
          }}
        >
          {t('ExploreOurTours.filters')}
        </CommonStylesClient.Button>
      </CommonStylesClient.Box> */}
    </CommonStylesClient.Box>
  );
}
