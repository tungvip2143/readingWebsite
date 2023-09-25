import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import moment from 'moment';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import { DetailOfPlaces } from 'interfaces/common';
import { useGet } from 'stores/useStore';
import CommonIcons from 'components/Client/CommonIcons';
import { RequestServing, Vendor } from 'modules/vendor/vendor.interface';
import cachedKeys from 'constants/cachedKeys';
import { dataOptionsServeDay } from 'app/[locale]/admin/vendor/Components/Content/ServeTime';

interface OpenTimePlacesDetailContainerProps {}

const OpenTimePlacesDetailContainer = (props: OpenTimePlacesDetailContainerProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const detailOfPlaces: Vendor = useGet(cachedKeys.detailPlaces);
  let servings: RequestServing = {};
  detailOfPlaces?.VendorServing?.forEach((item) => {
    const { dayOfWeek, start, end } = item;
    if (!servings[dayOfWeek]) {
      servings[dayOfWeek] = [];
    }
    servings[dayOfWeek].push({ start, end });
  });

  // const timeOpen = `${detailOfPlaces?.startServeTime} - ${detailOfPlaces?.endServeTime}`;
  // const dayOpen = `${detailOfPlaces?.startServeDay} - ${detailOfPlaces?.endServeDay}`;
  //! Function

  const renderDayOfWeek = (dayOfWeek: number) => {
    const days = dataOptionsServeDay.find((item) => item?.value === dayOfWeek);
    return t(`${days?.label}` as any);
  };
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
        {t('PlacesDetail.timeOpen')}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {/* Day */}
        {Object.keys(servings)?.map((dayOfWeek) => (
          <CommonStylesClient.Box key={dayOfWeek}>
            <CommonStylesClient.Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '0.5rem',
                alignItems: 'center',
                svg: { width: 20, height: 20 },
              }}
            >
              <CommonIcons.IconCalendarYellow />
              <CommonStylesClient.Typography
                type='text16'
                sx={{ color: theme.colors?.client?.darkGray }}
              >
                {renderDayOfWeek(Number(dayOfWeek))}
              </CommonStylesClient.Typography>
            </CommonStylesClient.Box>

            {servings[dayOfWeek].map((serving, index) => {
              const startTime =
                serving?.start &&
                moment(serving?.start)
                  // .add(moment('2023-01-01').utcOffset(), 'minutes')
                  .format('HH:mm');
              const endTime =
                serving?.end &&
                moment(serving?.end)
                  // .add(moment('2023-01-01').utcOffset(), 'minutes')
                  .format('HH:mm');
              return (
                <CommonStylesClient.Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '0.5rem',
                    alignItems: 'center',
                    svg: { width: 20, height: 20 },
                  }}
                  key={index}
                >
                  <CommonIcons.IconClockGreen />
                  <CommonStylesClient.Typography
                    type='text16'
                    sx={{ color: theme.colors?.client?.darkGray }}
                  >
                    {`${startTime} - ${endTime}`}
                  </CommonStylesClient.Typography>
                </CommonStylesClient.Box>
              );
            })}
          </CommonStylesClient.Box>
        ))}
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(OpenTimePlacesDetailContainer);
