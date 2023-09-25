import { SxProps, Theme } from '@mui/material';
import TypographyMui, { TypographyProps } from '@mui/material/Typography';
import { useMemo } from 'react';
import { useTheme } from '@mui/material';

export type TypeTypographyClient =
  | 'normal'
  | 'text10'
  | 'text10Regular'
  | 'text12'
  | 'text12Regular'
  | 'text14'
  | 'text14Regular'
  | 'text16'
  | 'text16Regular'
  | 'text20'
  | 'text20Regular'
  | 'title10'
  | 'title10Medium'
  | 'title12'
  | 'title12Medium'
  | 'title14'
  | 'title14Medium'
  | 'title16'
  | 'title16Medium'
  | 'title20'
  | 'title20Medium'
  | 'large28'
  | 'large36'
  | 'mobiHeading1'
  | 'mobiHeading2'
  | 'mobiHeading3'
  | 'mobiHeading4'
  | 'mobiHeading5'
  | 'pcHeading1'
  | 'pcHeading2'
  | 'pcHeading3'
  | 'pcHeading4'
  | 'pcHeading5';

interface Props extends TypographyProps {
  type?: TypeTypographyClient;
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
}

const Typography = (props: Props) => {
  //! State
  const theme = useTheme();
  const { type = 'normal', sx, ...restProps } = props;

  const sxCustomize: SxProps<Theme> | undefined = useMemo(() => {
    const styles = new Map<TypeTypographyClient, SxProps>();

    styles.set('normal', {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '24px',
      color: theme.colors?.client?.darkGray,
    });

    styles.set('text10', {
      fontSize: '0.625rem',
      fontWeight: 400,
      lineHeight: '16px',
      color: theme.colors?.client?.midBlack,
    });

    styles.set('text10Regular', {
      fontSize: '0.625rem',
      fontWeight: 300,
      lineHeight: '16px',
      color: theme.colors?.client?.darkGray,
    });

    styles.set('text12', {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: '19.2px',
      color: theme.colors?.client?.midBlack,
    });

    styles.set('text12Regular', {
      fontSize: '0.75rem',
      fontWeight: 300,
      lineHeight: '16px',
      color: theme.colors?.client?.darkGray,
    });

    styles.set('text14', {
      fontFamily: 'Plus Jakarta Sans',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.4rem',
      color: theme.colors?.client?.midBlack,
      letterSpacing: '0.0175rem',
      opacity: '0.800000011920929',
    });

    styles.set('text14Regular', {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '22.4px',
      color: theme.colors?.client?.darkGray,
    });

    styles.set('text16', {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '150%',
      color: theme.colors?.client?.midBlack,
      letterSpacing: '0.04rem',
    });

    styles.set('text16Regular', {
      fontSize: '1rem',
      fontWeight: 300,
      lineHeight: '24px',
      color: theme.colors?.client?.darkGray,
    });

    styles.set('text20', {
      fontSize: '1.25rem',
      fontWeight: 400,
      lineHeight: '30px',
      color: theme.colors?.client?.midBlack,
    });

    styles.set('text20Regular', {
      fontSize: '1.25rem',
      fontWeight: 300,
      lineHeight: '16px',
      color: theme.colors?.client?.darkGray,
    });

    styles.set('title10', {
      fontSize: '0.625rem',
      fontWeight: 600,
      lineHeight: '16px',
      color: theme.colors?.client?.midBlack,
    });

    styles.set('title10Medium', {
      fontSize: '0.625rem',
      fontWeight: 300,
      lineHeight: '16px',
      color: theme.colors?.client?.darkGray,
    });

    styles.set('title12', {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: '160%',
      color: theme.colors?.client?.midBlack,
      letterSpacing: '0.03rem',
    });

    styles.set('title12Medium', {
      fontSize: '0.75rem',
      fontWeight: 300,
      lineHeight: '19.2px',
      color: theme.colors?.client?.darkGray,
    });

    styles.set('title14', {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: '22.4px',
      color: theme.colors?.client?.midBlack,
    });

    styles.set('title14Medium', {
      fontSize: '0.875rem',
      fontWeight: 300,
      lineHeight: '22.4px',
      color: theme.colors?.client?.darkGray,
    });

    styles.set('title16', {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: '24px',
      color: theme.colors?.client?.midBlack,
    });

    styles.set('title16Medium', {
      fontSize: '1rem',
      fontWeight: 300,
      lineHeight: '24px',
      color: theme.colors?.client?.darkGray,
    });

    styles.set('title20', {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: '30px',
      color: theme.colors?.client?.midBlack,
    });

    styles.set('title20Medium', {
      fontSize: '1.25rem',
      fontWeight: 300,
      lineHeight: '30px',
      color: theme.colors?.client?.darkGray,
    });

    styles.set('large28', {
      fontSize: '1.75rem',
      fontWeight: 400,
      lineHeight: '33.6px',
      color: theme.colors?.client?.midBlack,
    });

    styles.set('large36', {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: '50.4px',
      color: theme.colors?.client?.midBlack,
    });

    styles.set('mobiHeading1', {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: '33.6px',
      color: theme.colors?.client?.midBlack,
    });

    styles.set('mobiHeading2', {
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: '28px',
      color: theme.colors?.client?.midBlack,
    });

    styles.set('mobiHeading3', {
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: '24px',
      color: theme.colors?.client?.midBlack,
    });

    styles.set('mobiHeading4', {
      fontSize: '0.875rem',
      fontWeight: 700,
      lineHeight: '21px',
      color: theme.colors?.client?.midBlack,
    });

    styles.set('mobiHeading5', {
      fontSize: '0.75rem',
      fontWeight: 700,
      lineHeight: '19.2px',
      color: theme.colors?.client?.midBlack,
    });

    styles.set('pcHeading1', {
      fontSize: '4rem',
      fontWeight: 800,
      lineHeight: '89.6px',
      color: theme.colors?.client?.black,
    });

    styles.set('pcHeading2', {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: '67.2px',
      color: theme.colors?.client?.grayScale,
    });

    styles.set('pcHeading3', {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: '33.6px',
      color: theme.colors?.client?.midBlack,
    });

    styles.set('pcHeading4', {
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: '28px',
      color: theme.colors?.client?.midBlack,
    });

    styles.set('pcHeading5', {
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: '24px',
      color: theme.colors?.client?.midBlack,
    });

    return styles.get(type);
  }, [type]);

  //! Render
  return (
    <TypographyMui
      sx={
        {
          ...sxCustomize,
          ...sx,
        } as SxProps<Theme>
      }
      {...restProps}
    >
      {props.children}
    </TypographyMui>
  );
};

export default Typography;
