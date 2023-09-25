import React, { Fragment, useRef } from 'react';
import CommonStyles from '.';
import CommonIcons from 'components/CommonIcons';
import { useTheme } from '@mui/material';
import { SxProps } from '@mui/material';
import { FieldInputProps, FormikProps, getIn } from 'formik';
import { showError } from 'helpers/toast';
interface PlaceholderUploadImageProps {
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
  name?: string;
  onChangeFile?: (file: File) => void;
  onDeleteFile?: () => void;
  sx?: SxProps;
  renderChildren?: React.ReactNode;
  sxIcon?: SxProps;
  accept?: string;
  isHasDelete?: boolean;
  disabled?: boolean;
}

const PlaceholderUploadImage = ({
  onChangeFile,
  onDeleteFile,
  sx,
  renderChildren,
  field,
  form,
  sxIcon,
  accept,
  isHasDelete,
  disabled,
  ...restProps
}: PlaceholderUploadImageProps) => {
  const { errors, touched, setFieldValue } = form || {};
  const isTouched = getIn(touched, field?.name!);
  const errorMessage = getIn(errors, field?.name!);

  const name = restProps?.name || field?.name || '';
  const theme = useTheme();
  const fileRef = useRef<HTMLInputElement>(null);
  const hasChildren = !!renderChildren;

  const onSelectedFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;
      const file = target?.files?.[0];
      if (file) {
        onChangeFile && onChangeFile(file);
        setFieldValue && setFieldValue(name, file);
        e.currentTarget.value = '';
      }
    } catch (error) {
      showError(error);
    } finally {
    }
  };

  //! Render
  const renderContent = () => {
    return (
      <Fragment>
        {hasChildren && (
          <CommonStyles.Box sx={{ display: 'flex', gap: 2 }}>
            {renderChildren}

            {isHasDelete && !disabled && (
              <CommonStyles.Button
                sx={{ alignSelf: 'flex-start' }}
                isIconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteFile && onDeleteFile();
                  !!form?.setFieldValue && form?.setFieldValue(name, '');
                }}
              >
                <CommonIcons.DeleteIcon />
              </CommonStyles.Button>
            )}
          </CommonStyles.Box>
        )}

        <CommonStyles.Box
          sx={{
            width: '1.5rem',
            height: '1.5rem',
            display: hasChildren ? 'none' : undefined,
            ...sxIcon,
          }}
        >
          <CommonIcons.AddIcon />
          <input
            ref={fileRef}
            name={name}
            type='file'
            style={{ display: 'none' }}
            onChange={onSelectedFile}
            accept={accept || undefined}
            disabled={disabled}
            {...restProps}
          />
        </CommonStyles.Box>
      </Fragment>
    );
  };

  return (
    <CommonStyles.Box>
      <CommonStyles.Box
        onClick={() => {
          if (!!fileRef?.current) {
            fileRef.current.click();
          }
        }}
        sx={{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: hasChildren ? 0 : 4,
          borderRadius: 1,
          borderStyle: 'dashed',
          borderWidth: hasChildren ? 0 : 1,
          borderColor: theme.colors?.bggray300,
          cursor: 'pointer',
          ...sx,
        }}
      >
        {renderContent()}
      </CommonStyles.Box>
      {isTouched && errorMessage && (
        <CommonStyles.Box
          sx={{
            fontWeight: 400,
            fontSize: '0.75rem',
            lineHeight: 1.66,
            textAlign: 'left',
            margin: '0.25rem 0.875rem 0 0.875rem',
            color: theme.colors?.custom?.textRedErrors,
          }}
        >
          {errorMessage}
        </CommonStyles.Box>
      )}
    </CommonStyles.Box>
  );
};

export default PlaceholderUploadImage;
