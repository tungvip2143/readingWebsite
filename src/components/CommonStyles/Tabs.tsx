import React, { memo } from 'react';

import { useTranslations } from 'next-intl';
import CommonStyles from 'components/CommonStyles';
import { useTheme } from '@mui/material';
import { Tablist } from 'interfaces/common';
interface ITabs {
  listItem?: Tablist[];
}

const Tabs = ({ listItem, ...props }: ITabs) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();

  //! Css
  const styleButton = (status: boolean) => ({
    mx: 2,
    color: theme.colors?.primary500 || '',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '0.125rem',
      backgroundColor: status ? theme?.colors?.primary500 || '' : 'transparent',
    },
  });
  //! Function

  //! Render

  return (
    <CommonStyles.Box>
      {listItem?.map((el, index: number) => (
        <CommonStyles.Button
          key={el.label + index}
          onClick={el.onClick}
          sx={styleButton(el.isActive)}
          variant='text'
          {...props}
        >
          {el.label}
        </CommonStyles.Button>
      ))}
    </CommonStyles.Box>
  );
};

export default memo(Tabs);
