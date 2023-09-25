import React, { CSSProperties, useMemo } from 'react';
import CommonStyles from 'components/CommonStyles';
import { useTheme, SxProps } from '@mui/material';

export type TagCategory = 'purple' | 'purpleRoundOff' | 'blue' | 'blueNoBg' | 'green' | 'red';

interface Props {
  label: any;
  category: TagCategory;
  sx?: SxProps;
}
const Badge = (props: Props) => {
  //! State
  const { label, category = 'purple', sx } = props;
  const theme = useTheme();

  const styleByCategory = useMemo(() => {
    const styles = new Map<TagCategory, CSSProperties>();

    styles.set('blueNoBg', {
      color: theme?.colors?.primary500,
    });
    styles.set('purple', {
      color: theme?.colors?.secondary500,
      backgroundColor: theme?.colors?.secondary100,
    });
    styles.set('purpleRoundOff', {
      color: theme?.colors?.secondary500,
      backgroundColor: theme?.colors?.secondary100,
    });

    styles.set('blue', {
      color: theme?.colors?.primary500,
      backgroundColor: theme?.colors?.primary100,
    });

    styles.set('green', {
      color: theme?.colors?.client?.white,
      backgroundColor: theme?.colors?.client?.green,
    });

    styles.set('red', {
      color: theme?.colors?.client?.white,
      backgroundColor: theme?.colors?.client?.red,
    });

    return styles.get(category);
  }, [category]);

  //! Css
  const styleBadge = {
    borderRadius: '0.5rem',
    width: 'fit-content',
    fontSize: '1rem',
    padding: '0 0.5rem',
    fontFamily: 'Inter',
    ...styleByCategory,
    ...sx,
  };
  //! Function

  //! Render
  if (!label) {
    return <CommonStyles.Typography>-</CommonStyles.Typography>;
  }

  return <CommonStyles.Typography sx={styleBadge}>{label}</CommonStyles.Typography>;
};

export default Badge;
