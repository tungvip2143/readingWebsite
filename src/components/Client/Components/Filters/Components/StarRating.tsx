import React, { ReactNode, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';
import { ratingData } from 'constants/common';
import { RatingData } from 'interfaces/common';
import { useFormikContext } from 'formik';
import { FormPlaceFilterValues } from 'components/Client/PlacesPage/PlacesContainer';

interface StarRatingProps {
  afterOnChangeRating?: () => void;
}

interface ChipProps {
  label: ReactNode;
  ratingStar: number;
  afterOnChangeRating?: () => void;
}

const Chip = (props: ChipProps) => {
  const { label, ratingStar, afterOnChangeRating } = props;
  const { values, setFieldValue } = useFormikContext<FormPlaceFilterValues>();
  const selected = values?.rating === ratingStar;
  // const [selected, setSelected] = useState(false);
  const theme = useTheme();

  const toggleSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const ratingValue = Number(event?.currentTarget?.id);
    if (values?.rating === ratingValue) {
      setFieldValue('rating', null);
    } else {
      setFieldValue('rating', ratingValue);
    }
    afterOnChangeRating && afterOnChangeRating();
  };

  return (
    <CommonStylesClient.Box
      sx={{
        padding: '0.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: '1.5rem',
        width: 'fit-content',
        border: `1px solid ${
          selected ? theme.colors?.client?.yellow : theme.colors?.client?.lightGray
        }`,
        cursor: 'pointer',
      }}
      id={ratingStar?.toString()}
      onClick={toggleSelect}
    >
      <CommonStylesClient.Typography
        type='title12'
        sx={{
          color: selected ? theme.colors?.client?.coBaltBlue : theme.colors?.client?.darkGray,
          fontWeight: 600,
        }}
      >
        {label}
      </CommonStylesClient.Typography>
    </CommonStylesClient.Box>
  );
};

const StarRating = (props: StarRatingProps) => {
  //! State
  const t = useTranslations('TourPage');
  const theme = useTheme();
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box>
      <CommonStylesClient.Typography
        type='mobiHeading3'
        sx={{ marginBottom: '1rem', color: theme.colors?.client?.black }}
      >
        {t('starRating')}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {ratingData.map((items: RatingData) => {
          const value = items.value;

          const renderLabel = () => {
            return [...Array(value)].map((_, index: number) => (
              <CommonIcons.IconStar key={index} />
            ));
          };
          return (
            <Chip
              key={items.value}
              ratingStar={items?.value}
              label={renderLabel()}
              afterOnChangeRating={props.afterOnChangeRating}
            />
          );
        })}
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(StarRating);
