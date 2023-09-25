import React from 'react';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

interface HeadingProps {
  headingLabel: string;
  tourBookingNumber: number;
  backgroundImage?: string;
}

const Divider = () => {
  const theme = useTheme();
  return (
    <CommonStylesClient.Box
      sx={{
        width: '100%',
        height: '1px',
        marginBottom: '2.5rem',
        background: theme.colors?.client?.midGray,
      }}
    />
  );
};
const Heading = (props: HeadingProps) => {
  //! State
  const { headingLabel = '', tourBookingNumber = 0, backgroundImage } = props;
  const theme = useTheme();
  const t = useTranslations('TourPage');
  const hasBackground = !!backgroundImage;

  //! Function
  const renderSubHeading = () => {
    return (
      <CommonStylesClient.Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <CommonStylesClient.Typography
          type='title14'
          sx={{
            letterSpacing: '0.96px',
            padding: '0.25rem 0.75rem',
            border: `1px solid ${theme.colors?.client?.greenLighter}`,
            borderRadius: '1rem',
            fontWeight: 600,
            color: hasBackground ? theme.colors?.client?.white : theme.colors?.client?.greenLighter,
          }}
        >
          {`${Number(tourBookingNumber).toLocaleString('vi')} ${Number(tourBookingNumber) === 0 ? '' : '+'}`}
        </CommonStylesClient.Typography>

        <CommonStylesClient.Typography
          type='title14'
          sx={{
            letterSpacing: '0.96px',
            color: hasBackground ? theme.colors?.client?.white : theme.colors?.client?.grayScale300,
            lineHeight: '1.25rem',
          }}
        >
          {t('subHeading')}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>
    );
  };

  //! Render
  return (
    <CommonStylesClient.Box>
      <CommonStylesClient.Breadcumbs
        style={{
          color: hasBackground ? theme.colors?.client?.white : undefined,
          '& .icon-arrow-right path': {
            fill: hasBackground ? theme.colors?.client?.white : undefined,
          },
          '& li > a > p': {
            color: hasBackground ? theme.colors?.client?.white : undefined,
          },
        }}
      />

      <CommonStylesClient.Box
        sx={{ padding: '2.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <CommonStylesClient.Typography
          type='pcHeading2'
          sx={{
            letterSpacing: '0.96px',
            color: hasBackground ? theme.colors?.client?.white : undefined,
          }}
        >
          {headingLabel}
        </CommonStylesClient.Typography>

        {renderSubHeading()}
      </CommonStylesClient.Box>
      {!hasBackground ? <Divider /> : <CommonStylesClient.Box  sx={{marginBottom: '2.5rem'}}/>}
    </CommonStylesClient.Box>
  );
};

export default React.memo(Heading);
