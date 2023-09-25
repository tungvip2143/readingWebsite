import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import { useGet } from 'stores/useStore';
import { DetailOfPlaces } from 'interfaces/common';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';
import { Vendor } from 'modules/vendor/vendor.interface';
import cachedKeys from 'constants/cachedKeys';

interface AddressPlacesDetailContainerProps {}

const AddressPlacesDetailContainer = (props: AddressPlacesDetailContainerProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations('PlacesDetail');
  const detailOfPlaces: Vendor = useGet(cachedKeys.detailPlaces);
  const wardName = detailOfPlaces?.destination?.wardName || '';
  const districtName = detailOfPlaces?.destination?.districtName || '';
  const provinceName = detailOfPlaces?.destination?.provinceName || '';
  const fullAddress = detailOfPlaces?.destination?.fullAddress || '';
  const addressTitle = `${fullAddress}${wardName && `, ${wardName}`}${
    districtName && `, ${districtName}`
  }${provinceName && `, ${provinceName}`}`;
  const addressMapIframe =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0168670351313!2d105.7830304!3d21.0320111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4b44cbe6f3%3A0xff6ab98eef804866!2zVMOyYSBuaMOgIEFDLCAxIE5nw7UgNzggRHV5IFTDom4sIEThu4tjaCBW4buNbmcgSOG6rXUsIEPhuqd1IEdp4bqleSwgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1691120218866!5m2!1svi!2s';
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        marginBottom: '3rem',
        gap: '1rem',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
      }}
    >
      <CommonStylesClient.Typography type='pcHeading4' sx={{ color: theme.colors?.client?.black }}>
        {t('address')}
      </CommonStylesClient.Typography>
      <CommonStylesClient.Box
        sx={{ display: 'flex', gap: '0.5rem', flexDirection: 'row', alignItems: 'center' }}
      >
        <CommonIcons.IconLocationBlue />
        <CommonStylesClient.Typography type='text14' sx={{ color: theme.colors?.client.darkGray }}>
          {addressTitle}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box sx={{ width: '100%' }}>
        {/* Gallery */}
        <iframe
          src={addressMapIframe}
          key='address-map'
          width={'100%'}
          height='330'
          style={{ borderRadius: '1rem', border: 0 }}
          loading='lazy'
        ></iframe>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(AddressPlacesDetailContainer);
