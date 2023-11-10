import React from 'react';
import { styled } from '@mui/material/styles';
import CommonIcons from 'components/CommonIconsMui';
import { IconButton, IconButtonProps } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface ExpandMoreCustomProps {
  expanded: boolean;
  handleExpandClick: () => void;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ExpandMoreCustom = (props: ExpandMoreCustomProps) => {
  //! State
  const { expanded, handleExpandClick } = props;

  //! Function

  //! Render
  return (
    <ExpandMore
      expand={expanded}
      onClick={handleExpandClick}
      aria-expanded={expanded}
      aria-label='show more'
    >
      <CommonIcons.ExpandMore />
    </ExpandMore>
  );
};

export default React.memo(ExpandMoreCustom);
