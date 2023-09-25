import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import Timer from './Timer';
import { DayOfWeekTabs } from 'constants/common';
import { useRouter } from 'next/navigation';
import { isEmpty } from 'lodash';

interface ServeTime {
  isEdit?: boolean;
}

export const dataOptionsServeDay = [
  { label: 'Vendor.monDay', value: DayOfWeekTabs.Monday },
  { label: 'Vendor.tuesDay', value: DayOfWeekTabs.Tuesday },
  { label: 'Vendor.wednesDay', value: DayOfWeekTabs.Wednesday },
  { label: 'Vendor.thursDay', value: DayOfWeekTabs.Thursday },
  { label: 'Vendor.friDay', value: DayOfWeekTabs.Friday },
  { label: 'Vendor.saturDay', value: DayOfWeekTabs.Saturday },
  { label: 'Vendor.sunDay', value: DayOfWeekTabs.Sunday },
];
const ServeTime = (props: ServeTime) => {
  //! State
  const { isEdit } = props;
  const theme = useTheme();
  const t = useTranslations();
  const router = useRouter();

  const [filters, setFilters] = useState({ status: Number(DayOfWeekTabs.Monday) });

  //! Function
  const onClickStatus = (name: string, value: number) => () => {
    setFilters((prev: any) => {
      router.push(`${window.location.pathname}?dayOfWeek=${value}`);
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const listItem = dataOptionsServeDay?.map((item) => {
    return {
      isActive: filters?.status === item?.value,
      label: t(`${item?.label}` as any),
      onClick: onClickStatus('status', item?.value),
    };
  });

  const renderTabContents = React.useCallback(() => {
    const selectedOption = dataOptionsServeDay.find((option) => option.value === filters.status);

    if (!isEmpty(selectedOption)) {
      return <Timer dayOfWeek={selectedOption.value} />;
    } else {
      return <>Coming Soon ...</>;
    }
  }, [filters, dataOptionsServeDay]);

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
      <CommonStyles.Typography
        variant='h4'
        sx={{
          fontSize: '1.125rem',
          color: theme.colors?.custom?.textBlack,
          marginBottom: '1rem',
          fontWeight: 500,
        }}
      >
        {t('Vendor.serveTime')}
      </CommonStyles.Typography>

      <CommonStyles.Box sx={{ marginTop: '2rem', marginBottom: '1rem' }}>
        <CommonStyles.Typography
          variant='h5'
          sx={{
            fontSize: '1.125rem',
            color: theme.colors?.custom?.textBlack,
            marginBottom: '1rem',
            fontWeight: 500,
          }}
        >
          {t('Vendor.serveDay')}
        </CommonStyles.Typography>
        <CommonStyles.Box>
          <CommonStyles.Box sx={{ marginTop: '2rem', display: 'flex', flexDirection: 'column' }}>
            <CommonStyles.Tabs listItem={listItem} />
            {renderTabContents()}
          </CommonStyles.Box>
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(ServeTime);
