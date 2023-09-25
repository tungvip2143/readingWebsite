import React from 'react';
import { Collapse as CollapseMui, SxProps, CollapseProps } from '@mui/material';

interface Props extends CollapseProps {
  expanded: boolean;
  children: React.ReactNode;
  timeout?:
    | 'auto'
    | number
    | { appear?: number | undefined; enter?: number | undefined; exit?: number | undefined };
  sx?: SxProps;
}

const Collapse = (props: Props) => {
  //! State
  const { expanded, children, timeout = 'auto', sx } = props;

  //! Function

  //! Render
  return (
    <CollapseMui in={expanded} timeout={timeout} unmountOnExit sx={sx}>
      {children}
    </CollapseMui>
  );
};

export default React.memo(Collapse);
