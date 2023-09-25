import { useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import { ArrayHelpers, FastField, FieldArray, useFormikContext } from 'formik';
import React, { useState } from 'react';
import { FormValuesVendor } from '../Content';
import { fileToString } from 'helpers/common';
import { useTranslations } from 'next-intl';
import { IMG_URL } from 'constants/apiUrls';
import { cloneDeep, isString } from 'lodash';
import { Media } from 'interfaces/common';

interface MediaProps {
  isEdit?: boolean;
}
const Media = (props: MediaProps) => {
  //! State
  const { isEdit } = props;
  const theme = useTheme();
  const t = useTranslations();
  const { values, errors, touched, setFieldTouched, setFieldValue } =
    useFormikContext<FormValuesVendor>();
  const [expanded, setExpanded] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        padding: '2rem 1rem',
        border: `0.0625rem solid ${theme.colors?.bgneutral200}`,
        borderRadius: '0.25rem',
        width: 'calc(73% + 0.125rem)',
        marginBottom: '1rem',
      }}
    >
      <CommonStyles.Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <CommonStyles.Typography
          variant='h2'
          sx={{
            fontSize: '1.125rem',
            color: theme.colors?.custom?.textGrey,
            fontWeight: 500,
          }}
        >
          {t('Vendor.imageVideo')}
        </CommonStyles.Typography>

        <CommonStyles.Box>
          <CommonIcons.ExpandMoreCustom expanded={expanded} handleExpandClick={handleExpandClick} />
        </CommonStyles.Box>
      </CommonStyles.Box>
      <CommonStyles.Collapse expanded={expanded}>
        <FieldArray
          name='media'
          render={(arrayHelpers: ArrayHelpers) => {
            return (
              <CommonStyles.Box>
                {values.media && values.media.length > 0
                  ? values.media.map((el: Media, index: number) => {
                      const getNameFile = () => {
                        if (isString(el.url)) {
                          return '';
                        }

                        return el?.url?.name;
                      };

                      return (
                        <CommonStyles.Box
                          key={index}
                          sx={{ display: 'flex', gap: 7, marginBottom: '1rem' }}
                        >
                          {!!fileToString(el.url) ? (
                            <CommonStyles.Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                              }}
                            >
                              <img
                                style={{
                                  objectFit: 'cover',
                                  width: '6.25rem',
                                  height: '6.25rem',
                                  borderRadius: '0.25rem',
                                }}
                                alt='image-media'
                                src={
                                  isEdit
                                    ? isString(el.url)
                                      ? `${IMG_URL}/${fileToString(el.url)}`
                                      : fileToString(el.url)
                                    : fileToString(el.url)
                                }
                              />
                              <span
                                style={{
                                  fontSize: '0.75rem',
                                  color: theme.colors?.custom?.textBlack,
                                  marginTop: '0.5rem',
                                  textAlign: 'center',
                                  width: '6.25rem',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {getNameFile()}
                              </span>

                              <CommonStyles.Box
                                sx={{
                                  position: 'absolute',
                                  top: 0,
                                  right: '-3rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '0.5rem 0.75rem',
                                  cursor: 'pointer',
                                  '&:hover': {
                                    backgroundColor: theme.colors?.custom?.greyBackground,
                                    borderRadius: '0.625rem',
                                  },
                                }}
                                onClick={() => {
                                  const nextMedia = cloneDeep(values.media);
                                  if (!!nextMedia) {
                                    nextMedia[index].url = '';
                                  }
                                  setFieldValue('media', nextMedia);
                                }}
                              >
                                <CommonIcons.CloseIcon />
                              </CommonStyles.Box>
                            </CommonStyles.Box>
                          ) : (
                            <CommonStyles.PlaceholderUploadImage
                              sx={{
                                margin: '1rem 0.625rem 0 0',
                              }}
                              onChangeFile={(file) => {
                                setFieldTouched('media', true);
                                const nextMedia = cloneDeep(values.media);
                                if (!!nextMedia) {
                                  nextMedia[index].url = file;
                                }
                                setFieldValue('media', nextMedia);
                              }}
                            />
                          )}

                          <CommonStyles.Box
                            sx={{ display: 'flex', flex: '1', gap: 2 }}
                            className='box'
                          >
                            <CommonStyles.Box sx={{ flex: '1' }}>
                              <CommonStyles.Typography
                                variant='h4'
                                sx={{
                                  fontSize: '0.875rem',
                                  color: theme.colors?.custom?.textBlack,
                                  marginBottom: '0.5rem',
                                  fontWeight: 500,
                                }}
                              >
                                {t('Tour.imageDescription')}
                              </CommonStyles.Typography>

                              <CommonStyles.Box>
                                <FastField
                                  name={`media[${index}].content`}
                                  component={CustomFields.Textarea}
                                  size='small'
                                  sx={{
                                    color: theme.colors?.custom?.textBlack,
                                    height: '4.75rem',
                                  }}
                                  fullWidth
                                />
                              </CommonStyles.Box>
                            </CommonStyles.Box>

                            <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CommonIcons.DeleteIcon
                                sx={{ cursor: 'pointer', color: theme.colors?.orange500 }}
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                }}
                              />
                            </CommonStyles.Box>
                          </CommonStyles.Box>
                        </CommonStyles.Box>
                      );
                    })
                  : null}

                <CommonStyles.PlaceholderUploadImage
                  sx={{
                    mt: 2,
                  }}
                  onChangeFile={(file) => {
                    setFieldTouched('media', true);

                    const nextIndex = !!values?.media ? values.media.length : 0;
                    arrayHelpers.push({
                      url: file,
                      content: '',
                      order: nextIndex,
                    });
                  }}
                />
              </CommonStyles.Box>
            );
          }}
        />

        {touched.media && errors && errors.media && (
          <CommonStyles.HelperText>{errors.media}</CommonStyles.HelperText>
        )}
      </CommonStyles.Collapse>
    </CommonStyles.Box>
  );
};

export default React.memo(Media);
