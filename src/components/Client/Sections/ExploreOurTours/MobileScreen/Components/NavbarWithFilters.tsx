import { useTheme } from '@mui/material';
import CommonIcons from 'components/Client/CommonIcons';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTranslations } from 'next-intl';
import React, { useMemo, useState } from 'react';

export default function NavbarWithFilters() {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const navbarData = useMemo(() => {
    return [
      {
        label: t('ExploreOurTours.islands'),
        value: 0,
      },
      {
        label: t('ExploreOurTours.surfing'),
        value: 1,
      },
      {
        label: t('ExploreOurTours.nationParks'),
        value: 2,
      },
      {
        label: t('ExploreOurTours.lake'),
        value: 3,
      },
      {
        label: t('ExploreOurTours.beach'),
        value: 4,
      },
      {
        label: t('ExploreOurTours.camp'),
        value: 5,
      },
    ];
  }, [t]);

  const [tabActive, setTabActive] = useState<number>(0);

  const listItem = navbarData.map((el) => {
    return {
      isActive: tabActive === el.value,
      label: el.label,
      onClick: () => {
        setTabActive(el.value);
      },
    };
  });

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '3rem',
      }}
    >
      <CommonStylesClient.Box>
        <CommonStylesClient.Tabs
          listItem={listItem}
          sxContainer={{ display: 'flex', flexDirection: 'column' }}
        />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box sx={{ textAlign: 'center' }}>
        <CommonStylesClient.Button
          variant='outlined'
          endIcon={<CommonIcons.IconFilter />}
          sx={{
            color: theme.colors?.client.white,
            border: `1px solid ${theme.colors?.client.white}`,
            borderRadius: '6.25rem',
            textTransform: 'capitalize',
          }}
        >
          {t('ExploreOurTours.filters')}
        </CommonStylesClient.Button>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
}
