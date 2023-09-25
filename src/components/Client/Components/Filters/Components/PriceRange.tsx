import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import Slider from '@mui/material/Slider';
import OutlinedInput from '@mui/material/OutlinedInput';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useFormikContext } from 'formik';
import { FormPlaceFilterValues } from 'components/Client/PlacesPage/PlacesContainer';
interface PriceRangeProps {
  afterOnChangeRange?: () => void;
}
interface SlidePriceHandleProps {
  afterOnChangeRange?: () => void;
}

const SlidePriceRange = ({ afterOnChangeRange }: SlidePriceHandleProps) => {
  const { values, setFieldValue } = useFormikContext<FormPlaceFilterValues>();
  //! State
  const theme = useTheme();

  const valueSlider: number | number[] | undefined = [values?.minPrice || 0, values?.maxPrice || 1];

  const valuetext = (value: number) => {
    return `$${value}`;
  };

  const startAdornment = () => {
    return (
      <CommonStylesClient.Typography
        type='title16'
        sx={{ fontWeight: 700, color: theme.colors?.client?.coBaltBlue }}
      >
        $
      </CommonStylesClient.Typography>
    );
  };

  const renderStyleInput = () => {
    return {
      width: 100,
      fontSize: '1rem',
      fontWeight: 700,
      borderRadius: '1rem',
      border: `1px solid ${theme.colors?.client?.midGray}`,
      padding: 0,
      color: theme.colors?.client?.coBaltBlue,
    };
  };

  //! Function
  const handleChange = (event: Event, newValue: number | number[]) => {
    const [minPrice, maxPrice] = newValue as number[];
    setFieldValue('minPrice', minPrice);
    setFieldValue('maxPrice', maxPrice);
    afterOnChangeRange && afterOnChangeRange();
  };

  const handleChangeMinPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minPrice = Number(event.target?.value);
    setFieldValue('minPrice', minPrice);
    afterOnChangeRange && afterOnChangeRange();
  };

  const handleChangeMaxPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxPrice = Number(event.target?.value);
    setFieldValue('maxPrice', maxPrice);
    afterOnChangeRange && afterOnChangeRange();
  };

  return (
    <CommonStylesClient.Box>
      <Slider
        min={0}
        max={500}
        getAriaLabel={() => 'Price range'}
        value={valueSlider}
        onChange={handleChange}
        valueLabelDisplay='auto'
        getAriaValueText={valuetext}
        sx={{
          ['.MuiSlider-rail']: {
            color: theme.colors?.client?.gray,
          },
          ['.MuiSlider-thumb']: {
            color: theme.colors?.client?.coBaltBlue,
          },
          ['.MuiSlider-track']: {
            color: theme.colors?.client?.coBaltBlue,
          },
        }}
      />

      <CommonStylesClient.Box
        sx={{
          ['.MuiInputBase-root']: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0.5rem 22px',
          },
          input: {
            padding: 0,
          },
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <OutlinedInput
          sx={renderStyleInput()}
          type='number'
          id='min-price'
          value={values?.minPrice}
          onChange={handleChangeMinPrice}
          startAdornment={startAdornment()}
        />

        <OutlinedInput
          sx={renderStyleInput()}
          type='number'
          id='max-price'
          value={values?.maxPrice}
          onChange={handleChangeMaxPrice}
          startAdornment={startAdornment()}
        />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

const PriceRange = (props: PriceRangeProps) => {
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
        {t('priceRange')}
      </CommonStylesClient.Typography>

      <CommonStylesClient.Box>
        <SlidePriceRange afterOnChangeRange={props.afterOnChangeRange} />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(PriceRange);
