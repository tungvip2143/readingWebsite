import React, { memo } from 'react';
import { useTranslations } from 'next-intl';
import { SxProps, Theme, useTheme } from '@mui/material';
import { Tablist } from 'interfaces/common';
import CommonStylesClient from '.';

interface ITabs {
  listItem: Tablist[];
  sxContainer?: SxProps;
  sxActive?: SxProps;
  sx?: SxProps;
}

const Tabs = ({ listItem, sxContainer, sxActive, sx, ...props }: ITabs) => {
  //! State
  const t = useTranslations();
  const theme = useTheme();

  //! Css
  const styleButton = {
    padding: '0.75rem 1.5rem',
    color: theme.colors?.client.white,
    fontSize: '0.875rem',
    fontWeight: 'normal',
    letterSpacing: '0.035rem',
    textTransform: 'capitalize',
  } as SxProps;
  //! Function

  //! Render

  return (
    <CommonStylesClient.Box sx={{ display: 'flex', gap: 1, ...sxContainer }}>
      {listItem.map((el, index: number) => (
        <CommonStylesClient.Button
          key={el.label + index}
          onClick={el.onClick}
          sx={
            el.isActive
              ? ({
                  ...styleButton,
                  backgroundColor: theme.colors?.client.coBaltBlue,
                  borderRadius: '6.25rem',
                  ...sxActive,
                } as SxProps<Theme>)
              : ({ ...styleButton, ...sx } as SxProps<Theme>)
          }
          variant='text'
          {...props}
        >
          {el.label}
        </CommonStylesClient.Button>
      ))}
    </CommonStylesClient.Box>
  );
};

export default memo(Tabs);
