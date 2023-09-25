import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';
import { useGet } from 'stores/useStore';
import { Schedules, Tour } from 'modules/tour/tour.interface';
import cachedKeys from 'constants/cachedKeys';

interface ScheduleTourDetailContainerProps {}

interface ScheduleListI {
  data: Schedules[];
}

interface ScheduleI {
  title: string;
  subTitle: string;
  hiddenLineDashed?: boolean;
}

const Schedule = (props: ScheduleI) => {
  const { title, subTitle, hiddenLineDashed = false } = props;
  const theme = useTheme();

  return (
    <CommonStylesClient.Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'row' }}>
      <CommonStylesClient.Box
        sx={{
          width: 18,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginTop: '5px',
        }}
      >
        <CommonIcons.IconDotYellow />
        {!hiddenLineDashed && (
          <CommonStylesClient.Box
            sx={{
              backgroundImage: `repeating-linear-gradient(-5deg, ${theme.colors?.client.yellow}, ${theme.colors?.client.yellow} 9px, transparent 9px, transparent 14px, ${theme.colors?.client.yellow} 14px), repeating-linear-gradient(85deg, ${theme.colors?.client.yellow}, ${theme.colors?.client.yellow} 9px, transparent 9px, transparent 14px, ${theme.colors?.client.yellow} 14px), repeating-linear-gradient(175deg, ${theme.colors?.client.yellow}, ${theme.colors?.client.yellow} 9px, transparent 9px, transparent 14px, ${theme.colors?.client.yellow} 14px), repeating-linear-gradient(265deg, ${theme.colors?.client.yellow}, ${theme.colors?.client.yellow} 9px, transparent 9px, transparent 14px, ${theme.colors?.client.yellow} 14px)`,
              backgroundSize: `1px 100%, 100% 0, 0 100% , 100% 0`,
              backgroundPosition: `0 0, 0 0, 100% 0, 0 100%`,
              backgroundRepeat: `no-repeat`,
              width: '1px',
              height: '100%',
            }}
          />
        )}
      </CommonStylesClient.Box>

      <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <CommonStylesClient.Typography type='title16' sx={{ color: theme.colors?.client.midBlack }}>
          {title}
        </CommonStylesClient.Typography>

        <CommonStylesClient.Typography
          type='text14'
          sx={{
            color: theme.colors?.client.darkGray,
            paddingBottom: hiddenLineDashed ? 0 : '1.75rem',
          }}
        >
          {subTitle}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

const ScheduleList = (props: ScheduleListI) => {
  const { data = [] } = props;

  return (
    <CommonStylesClient.Box>
      {data.map((item: Schedules, index: number, arr) => {
        const isLastObj = index === arr.length - 1;
        return (
          <Schedule
            key={`${item.title}-${index}`}
            title={item?.title || ''}
            subTitle={item?.description || ''}
            hiddenLineDashed={isLastObj}
          />
        );
      })}{' '}
    </CommonStylesClient.Box>
  );
};

const ScheduleTourDetailContainer = (props: ScheduleTourDetailContainerProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations('TourDetailPage');

  const detailOfTourData: Tour = useGet(cachedKeys.detailTour);

  //! Function
  const scheduleData = detailOfTourData?.schedules as Schedules[];

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        marginBottom: '3rem',
        gap: '1rem',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
      }}
    >
      <CommonStylesClient.Typography type='pcHeading4' sx={{ color: theme.colors?.client?.black }}>
        {t('schedule')}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'row', gap: '3rem' }}>
        <ScheduleList data={scheduleData?.slice(0, 3)} />
        <ScheduleList data={scheduleData?.slice(3, 6)} />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(ScheduleTourDetailContainer);
