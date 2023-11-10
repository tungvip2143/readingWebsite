import React, { CSSProperties, useMemo } from 'react';
import CommonStyles from 'components/CommonStyles';
import { useTheme, SxProps } from '@mui/material';
import { Topic } from 'constants/common';

export type TagCategory = Topic;

interface Props {
  label: any;
  category: TagCategory;
  sx?: SxProps;
}
const Badge = (props: Props) => {
  //! State
  const { label, category, sx } = props;
  const theme = useTheme();

  const styleByCategory = useMemo(() => {
    const styles = new Map<TagCategory, CSSProperties>();

    styles.set(Topic.EVENTS, {
      color: theme?.colors?.primary500,
      backgroundColor: theme?.colors?.primary100,
      border: `1px solid ${theme?.colors?.primary500}`,
    });

    styles.set(Topic.THREE_F, {
      color: theme?.colors?.secondary500,
      backgroundColor: theme?.colors?.secondary100,
      border: `1px solid ${theme?.colors?.secondary500}`,
    });
    styles.set(Topic.TOP_PLUS, {
      color: theme?.colors?.success500,
      backgroundColor: theme?.colors?.success100,
      border: `1px solid ${theme?.colors?.success500}`,
    });

    styles.set(Topic.STUDY_CORNER, {
      color: theme?.colors?.info500,
      backgroundColor: theme?.colors?.info100,
      border: `1px solid ${theme?.colors?.info500}`,
    });

    styles.set(Topic.THE_FACE_DEWEY, {
      color: theme?.colors?.red500,
      backgroundColor: theme?.colors?.red100,
      border: `1px solid ${theme?.colors?.red500}`,
    });

    styles.set(Topic.SHOCK, {
      color: theme?.colors?.warning500,
      backgroundColor: theme?.colors?.warning100,
      border: `1px solid ${theme?.colors?.warning500}`,
    });

    styles.set(Topic.CHARITY, {
      color: theme?.colors?.bggray500,
      backgroundColor: theme?.colors?.bggray100,
      border: `1px solid ${theme?.colors?.bggray500}`,
    });

    return styles.get(category);
  }, [category]);

  //! Css
  const styleBadge = {
    borderRadius: '1rem',
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
