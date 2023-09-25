import {
  Dialog as DialogMui,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  SxProps,
} from '@mui/material';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CommonIcons from 'components/Client/CommonIcons';

interface Props extends Omit<DialogProps, 'title' | 'content'> {
  toggle: () => void;
  title?: string | React.ReactNode;
  content: string | React.ReactNode;
  footer?: string | React.ReactNode;
  open: boolean;
  disableClickOutside: boolean;
  className?: string;
  isDetail?: boolean;
  style?: React.CSSProperties;
  styleContent?: React.CSSProperties;
  sx?: SxProps;
  sxContent?: SxProps;
  showCloseIcon?: boolean;
}

export default function Dialog(props: Props) {
  // !State
  const {
    open,
    toggle,
    title,
    content = <span />,
    footer,
    maxWidth,
    disableClickOutside,
    className,
    isDetail,
    style,
    styleContent,
    sx,
    sxContent,
    showCloseIcon = false,
  } = props;

  const handleClose = () => {
    !disableClickOutside && toggle();
  };
  return (
    <>
      <DialogMui
        open={open}
        onClose={() => handleClose()}
        fullWidth
        maxWidth={maxWidth}
        aria-labelledby='responsive-dialog-title'
        className={className}
        style={style}
        sx={sx}
      >
        {showCloseIcon && (
          <IconButton
            aria-label='close'
            onClick={() => handleClose()}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CommonIcons.IconCloseDialog />
          </IconButton>
        )}
        {title ? (
          <DialogTitle>
            {isDetail ? (
              <IconButton
                aria-label='close'
                onClick={() => handleClose()}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            ) : null}
            <div>{title}</div>
          </DialogTitle>
        ) : null}
        <DialogContent style={styleContent} sx={sxContent}>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        {footer ? <DialogActions>{footer}</DialogActions> : null}
      </DialogMui>
    </>
  );
}
