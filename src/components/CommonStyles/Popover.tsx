import React, { CSSProperties } from 'react';
import { Popover } from '@mui/material';

type Props = {
  id?: string;
  children?: any;
  open?: boolean;
  anchorEl?: any;
  handleClose: () => void;
  width?: string;
  verticalTop?: any;
  style?: CSSProperties;
};

const PopoverMui = (props: Props) => {
  //! State
  const { id, children, open, anchorEl, handleClose, width, verticalTop, style } = props;

  //! Function

  //! Render
  return (
    <Popover
      id={id}
      open={open!}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: verticalTop ? 'top' : 'bottom',
        horizontal: 'center',
      }}
      sx={{
        '& .MuiPopover-paper': {
          borderRadius: '0.938rem',
          marginTop: '3rem',
          width: `${width}`,
          border: '1px solid #ECECEC',
        },
        ...style,
      }}
    >
      {children}
    </Popover>
  );
};

export default PopoverMui;
