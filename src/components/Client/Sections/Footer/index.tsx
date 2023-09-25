'use client';

import React from 'react';
import { useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { MAX_WIDTH_CONTAINER } from 'constants/common';
import { useLocale, useTranslations } from 'next-intl';
import { Lang } from 'i18nOptions';
import MobileFooter from './MobileScreen';
import useCheckResolution from 'hooks/useCheckResolution';
import cachedKeys from 'constants/cachedKeys';

const Footer = () => {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const locale = useLocale();
  const checkLangEnglish = locale === Lang.en;
  const { isMobile } = useCheckResolution();
  //! Function
  const renderInformationAndProduct = () => {
    const renderInformation = () => {
      return (
        <CommonStylesClient.Box
          sx={{ display: 'flex', maxWidth: '28.3125rem', width: '100%' }}
          className='column-1'
        >
          <CommonStylesClient.Box>
            <CommonStylesClient.Box sx={{ marginBottom: '3rem' }} className='column-1-row-1'>
              <CommonStylesClient.Typography
                type='large36'
                sx={{ color: theme?.colors?.client.white }}
              >
                GotU
              </CommonStylesClient.Typography>

              <CommonStylesClient.Typography
                type='text16'
                sx={{ color: theme?.colors?.client.white }}
              >
                Better Furniture, Better Living
              </CommonStylesClient.Typography>
            </CommonStylesClient.Box>

            <CommonStylesClient.Box
              className='column-1-row-2'
              sx={{ display: 'flex', flexDirection: 'column', rowGap: '1.5rem' }}
            >
              <CommonStylesClient.Box sx={{ display: 'flex' }}>
                <CommonIcons.MapPin />

                <CommonStylesClient.Typography
                  type='title14'
                  sx={{ color: theme?.colors?.client?.white, marginLeft: '1rem' }}
                >
                  {t('Footer.address')}
                </CommonStylesClient.Typography>

                <CommonStylesClient.Typography
                  type='text14'
                  sx={{ color: theme?.colors?.client?.white, marginLeft: '4rem' }}
                >
                  7319 Wagon Lane Bradenton, FL 34203
                </CommonStylesClient.Typography>
              </CommonStylesClient.Box>

              <CommonStylesClient.Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <CommonIcons.Envelop />

                <CommonStylesClient.Typography
                  type='title14'
                  sx={{ color: theme?.colors?.client?.white, marginLeft: '1rem' }}
                >
                  {t('Footer.contactUs')}
                </CommonStylesClient.Typography>

                <CommonStylesClient.Typography
                  type='text14'
                  sx={{ color: theme?.colors?.client?.white, marginLeft: '3.75rem' }}
                >
                  hellosansbrothers@gmail.com
                </CommonStylesClient.Typography>
              </CommonStylesClient.Box>
            </CommonStylesClient.Box>
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      );
    };

    const renderWebsite = () => {
      return (
        <CommonStylesClient.Box className='column-2' sx={{ marginLeft: '10rem' }}>
          <CommonStylesClient.Typography
            type='pcHeading5'
            sx={{ color: theme?.colors?.client?.white, mb: '1.5rem' }}
          >
            {t('Footer.website')}
          </CommonStylesClient.Typography>

          <CommonStylesClient.Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '1rem',
              justifyContent: 'flex-start',
            }}
          >
            <CommonStylesClient.Typography
              type='text14'
              sx={{ color: theme?.colors?.client?.white }}
            >
              {t('Footer.home')}
            </CommonStylesClient.Typography>

            <CommonStylesClient.Typography
              type='text14'
              sx={{ color: theme?.colors?.client?.white }}
            >
              {t('Footer.aboutUs')}
            </CommonStylesClient.Typography>

            <CommonStylesClient.Typography
              type='text14'
              sx={{ color: theme?.colors?.client?.white }}
            >
              {t('Footer.services')}
            </CommonStylesClient.Typography>

            <CommonStylesClient.Typography
              type='text14'
              sx={{ color: theme?.colors?.client?.white }}
            >
              {t('Footer.contactUs')}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      );
    };

    const renderProduct = () => {
      return (
        <CommonStylesClient.Box className='column-3' sx={{ marginLeft: '10.81rem' }}>
          <CommonStylesClient.Typography
            type='pcHeading5'
            sx={{ color: theme?.colors?.client?.white, mb: '1.5rem' }}
          >
            {t('Footer.product')}
          </CommonStylesClient.Typography>

          <CommonStylesClient.Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '1rem',
              justifyContent: 'flex-start',
            }}
          >
            <CommonStylesClient.Typography
              type='text14'
              sx={{ color: theme?.colors?.client?.white }}
            >
              {t('Footer.table')}
            </CommonStylesClient.Typography>

            <CommonStylesClient.Typography
              type='text14'
              sx={{ color: theme?.colors?.client?.white }}
            >
              {t('Footer.chairs')}
            </CommonStylesClient.Typography>

            <CommonStylesClient.Typography
              type='text14'
              sx={{ color: theme?.colors?.client?.white }}
            >
              {t('Footer.storages')}
            </CommonStylesClient.Typography>

            <CommonStylesClient.Typography
              type='text14'
              sx={{ color: theme?.colors?.client?.white }}
            >
              {t('Footer.decorations')}
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      );
    };
    return (
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          backgroundColor: theme.colors?.client.backgroundBlue,
        }}
        className='item-row-1'
      >
        {renderInformation()}
        {renderWebsite()}
        {renderProduct()}
      </CommonStylesClient.Box>
    );
  };

  const renderTermsAndSocial = () => {
    const renderTerms = () => {
      return (
        <CommonStylesClient.Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: checkLangEnglish ? '19.4375rem' : '25rem',
            width: '100%',
            flexWrap: 'nowrap',
          }}
        >
          <CommonStylesClient.Typography type='title12' sx={{ color: theme.colors?.client.white }}>
            {t('Footer.privacyAndTerms')}
          </CommonStylesClient.Typography>
          <CommonStylesClient.Typography type='title12' sx={{ color: theme.colors?.client.white }}>
            {t('Footer.legalNotice')}
          </CommonStylesClient.Typography>
          <CommonStylesClient.Typography type='title12' sx={{ color: theme.colors?.client.white }}>
            {t('Footer.languanges')}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Box>
      );
    };

    const renderSocial = () => {
      return (
        <CommonStylesClient.Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: '9rem',
            width: '100%',
          }}
          className='icon-social'
        >
          <CommonStylesClient.Button isIconButton>
            <CommonIcons.Instagram />
          </CommonStylesClient.Button>
          <CommonStylesClient.Button isIconButton>
            <CommonIcons.Facebook />
          </CommonStylesClient.Button>
          <CommonStylesClient.Button isIconButton>
            <CommonIcons.Linkedin />
          </CommonStylesClient.Button>
          <CommonStylesClient.Button isIconButton>
            <CommonIcons.Twitter />
          </CommonStylesClient.Button>
        </CommonStylesClient.Box>
      );
    };
    return (
      <CommonStylesClient.Box
        className='item-row-2'
        sx={{
          marginTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {renderTerms()}
        {renderSocial()}
      </CommonStylesClient.Box>
    );
  };

  //! Render
  if (isMobile) {
    return <MobileFooter />;
  }
  return (
    <CommonStylesClient.Box style={{ backgroundColor: theme.colors?.client.backgroundBlue }}>
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: MAX_WIDTH_CONTAINER,
          margin: 'auto',
          width: '100%',
          padding: '3.75rem 0 2.5rem ',
        }}
        className='container'
      >
        {renderInformationAndProduct()}
        <CommonStylesClient.Divider
          sx={{
            background: theme.colors?.client.darkGray,
            width: '100̀',
            maxWidth: '75rem',
            height: '0.0625rem',
            marginTop: '3.44rem',
          }}
        />
        {renderTermsAndSocial()}
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default Footer;
