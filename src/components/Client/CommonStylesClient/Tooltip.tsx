import React from 'react';
import TooltipMui, { TooltipProps } from '@mui/material/Tooltip';

interface TooltipI extends TooltipProps {
  title: string | React.ReactNode;
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  followCursor?: boolean;
  children: React.ReactElement<any, any>;
}

function Tooltip({ children, title, placement = 'top', followCursor = false, ...props }: TooltipI) {
  return (
    <TooltipMui
      enterDelay={50}
      title={title}
      placement={placement}
      followCursor={followCursor}
      {...props}
    >
      {children}
    </TooltipMui>
  );
}

export default React.memo(Tooltip);
