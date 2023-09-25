import React from 'react';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTheme } from '@mui/material';
import FilterButton from './Components/FilterButton';
import SearchInput from './Components/SearchInput';
import SortSelect from './Components/SortSelect';

interface SearchProps {
  afterOnChangeInput?: (value: string) => void;
}

const Search = (props: SearchProps) => {
  //! State
  const theme = useTheme();
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box sx={{ display: 'flex', gap: '1.5rem', flexDirection: 'row' }}>
      <CommonStylesClient.Box sx={{ flexGrow: 1 }}>
        <SearchInput afterOnChange={props.afterOnChangeInput} />
      </CommonStylesClient.Box>

      <CommonStylesClient.Box sx={{ width: 240 }}>
        <SortSelect />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(Search);
