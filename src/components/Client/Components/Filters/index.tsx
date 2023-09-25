import React from 'react';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import LocationSelect from './Components/LocationSelect';
import PopularFilter from './Components/PopularFilter';
import StarRating from './Components/StarRating';
import PriceRange from './Components/PriceRange';
import { SxProps } from '@mui/material';

interface FiltersProps {
  afterOnChange?: () => void;
  sxContainer?: SxProps;
}

const Filters = (props: FiltersProps) => {
  //! State
  const { afterOnChange, sxContainer } = props;

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{ display: 'flex', flexDirection: 'column', width: 250, ...sxContainer }}
    >
      <LocationSelect afterOnChangeSelect={props.afterOnChange} />

      <CommonStylesClient.Box
        sx={{ display: 'flex', gap: '2rem', flexDirection: 'column', marginTop: '2rem' }}
      >
        <PriceRange afterOnChangeRange={props.afterOnChange} />
        <PopularFilter afterOnChangeTag={props.afterOnChange} />
        <StarRating afterOnChangeRating={props.afterOnChange} />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(Filters);
