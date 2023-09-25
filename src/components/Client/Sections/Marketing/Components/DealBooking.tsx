import React from 'react';
import CommonIcons from 'components/Client/CommonIcons';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTheme } from '@mui/material';
import { MAX_WIDTH_CONTAINER } from 'constants/common';
import { FastField, Formik } from 'formik';
import CustomFields from 'components/CustomFields';
import { useTranslations } from 'next-intl';
import marketing2 from '../../../../../../public/images/Client/marketing2.jpeg';
import { IMG_URL } from 'constants/apiUrls';

interface DealBookingProps {}
const initialValue = { email: '' };
const DealBooking = (props: DealBookingProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  //! Function

  const renderImageMarketing = () => {
    return (
      <CommonStylesClient.Box>
        <CommonStylesClient.Box sx={{ position: 'relative' }}>
          <CommonStylesClient.Box
            sx={{
              width: '25.75rem',
              height: '29.563rem',
              borderRadius: '1.5rem',
              // backgroundImage: `url(${IMG_URL}/uploads/2023/8/3/image-53-16202609082023746545.jpeg)`,
              backgroundImage: 'url(https://i.upanh.org/2023/08/10/image-53af8e5372839f239e.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'right bottom',
            }}
          />
          <CommonStylesClient.Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              transform: 'translate(7.313rem, 7.563rem)',
            }}
          >
            <CommonStylesClient.Box
              sx={{
                width: '19.5rem',
                height: '22.313rem',
                borderRadius: '1.5rem',
                outline: `0.875rem solid ${theme.colors?.client.white}`,
                backgroundSize: 'cover',
                backgroundPosition: 'right bottom',
                // backgroundImage: `url(${IMG_URL}/uploads/2023/8/3/image-52-16181409082023430603.jpeg)`,
                backgroundImage:
                  'url(https://i.upanh.org/2023/08/10/image-52a1ba005265b004a9.jpeg)',
              }}
            />
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    );
  };

  const renderContentMarketing = () => {
    return (
      <CommonStylesClient.Box>
        <CommonStylesClient.Box
          sx={{ display: 'flex', alignItems: 'center', columnGap: '0.75rem' }}
        >
          <CommonStylesClient.Box
            sx={{ width: '32px', height: '2px', background: theme.colors?.client.coBaltBlue }}
          />
          <CommonStylesClient.Typography
            type='title16'
            sx={{ color: theme.colors?.client.coBaltBlue }}
          >
            {t('Marketing.newslatter')}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Box>
        <CommonStylesClient.Typography type='pcHeading2'>
          {t('Marketing.weSendYou')}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>
    );
  };

  const renderInputEmail = () => {
    return (
      <CommonStylesClient.Box
        sx={{ width: '100%', maxWidth: '26.625rem', height: '100%', maxHeight: '3.5rem' }}
      >
        <Formik initialValues={initialValue} onSubmit={() => console.log('aaa')}>
          {() => {
            return (
              <CommonStylesClient.Box sx={{ display: 'flex', columnGap: '0.75rem' }}>
                <FastField
                  component={CustomFields.TextField}
                  name='email'
                  placeholder={t('Marketing.inputEmailAddress')}
                  iconStartInput={<CommonIcons.IconEnvelopeSimple />}
                  sx={{
                    '& div': {
                      borderRadius: '1rem',
                    },
                  }}
                />
                <CommonStylesClient.Button
                  type='submit'
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: '16px',
                    maxWidth: '10.5rem',
                    width: '100%',
                    background: theme.colors?.client.coBaltBlue,
                    textTransform: 'unset',
                    fontWeight: 600,
                  }}
                >
                  {t('Marketing.getInTouch')}
                </CommonStylesClient.Button>
              </CommonStylesClient.Box>
            );
          }}
        </Formik>
      </CommonStylesClient.Box>
    );
  };
  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '13.313rem',
        maxWidth: MAX_WIDTH_CONTAINER,
        marginBottom: '13.5rem',
        marginTop: '10rem',
      }}
    >
      {renderImageMarketing()}
      <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '2.5rem' }}>
        {renderContentMarketing()}
        {renderInputEmail()}
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(DealBooking);
