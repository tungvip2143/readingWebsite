import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useGet } from 'stores/useStore';
import { Tour } from 'modules/tour/tour.interface';
import cachedKeys from 'constants/cachedKeys';

interface LanguagesTourDetailContainerProps {}

interface ReadMoreI {
  text: string;
}

const LanguagesTourDetailContainer = (props: LanguagesTourDetailContainerProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations('TourDetailPage');
  const detailOfTourData: Tour = useGet(cachedKeys.detailTour);

  const text = detailOfTourData?.description || '';

  //! Function
  const ReadMore = (props: ReadMoreI) => {
    const { text = '' } = props;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };

    return (
      <CommonStylesClient.Typography type='text14' sx={{ color: theme.colors?.client?.darkGray }}>
        {isReadMore && text.length > 150 ? text.slice(0, 150).concat('...') : text}
        {text.length > 150 && (
          <span
            style={{
              color: theme.colors?.client?.primaryPurple,
              fontSize: '1rem',
              fontWeight: 700,
              lineHeight: '24px',
              cursor: 'pointer',
            }}
            onClick={toggleReadMore}
          >
            {isReadMore ? t('readMore') : t('showLess')}
          </span>
        )}
      </CommonStylesClient.Typography>
    );
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
        {t('description')}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Box>
        <ReadMore text={text} />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(LanguagesTourDetailContainer);
