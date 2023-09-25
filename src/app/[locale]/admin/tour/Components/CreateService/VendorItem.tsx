import CommonStyles from 'components/CommonStyles';
import { IMG_URL } from 'constants/apiUrls';
import { Vendor, VendorTypeRelation } from 'modules/vendor/vendor.interface';
import React from 'react';
import { useTheme } from '@mui/material';
import Divider from 'components/CommonStyles/Divider';
import { useTranslations } from 'next-intl';
import CommonIcons from 'components/CommonIcons';
import { Tour } from 'modules/tour/tour.interface';
import vendorSubscribeServices from 'modules/vendorSubscribe/vendorSubscribe.services';
import cachedKeys from 'constants/cachedKeys';
import { AllQueryKeys, useGet } from 'stores/useStore';
import { showError, showSuccess } from 'helpers/toast';

interface VendorItem {
  vendor: Vendor;
  tour: Tour;
}

export default function VendorItem(props: VendorItem) {
  //! State
  const { vendor, tour } = props;
  const theme = useTheme();
  const t = useTranslations();
  const refetchListVendor = useGet(
    cachedKeys.refetchListVendorInAddVendorSubscribe as AllQueryKeys
  );
  const refetchListVendorSubscribe = useGet(cachedKeys.refetchListVendorSubscribe as AllQueryKeys);

  //! Function
  const handleAddService = async () => {
    try {
      const response = await vendorSubscribeServices.createVendorSubscribe(tour?.id, {
        vendorId: vendor?.id as number,
      });

      refetchListVendor && (await refetchListVendor());
      refetchListVendorSubscribe && (await refetchListVendorSubscribe());

      showSuccess(t('Tour.createVendorSubscribe'));
    } catch (error) {
      showError(error);
    }
  };

  //! Render
  return (
    <CommonStyles.Box>
      <CommonStyles.Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
          <CommonStyles.Box>
            <img
              src={`${IMG_URL}/${vendor.thumbnail}`}
              style={{ width: '2.25rem', height: '2.25rem', borderRadius: '1.125rem' }}
            />
          </CommonStyles.Box>

          <CommonStyles.Box>
            <CommonStyles.Typography
              variant='h3'
              sx={{
                fontSize: '0.875rem',
                color: theme.colors?.custom?.textBlack,
                fontWeight: 550,
                marginBottom: '0.5rem',
              }}
            >
              {vendor.name}
            </CommonStyles.Typography>
            <CommonStyles.Box sx={{ display: 'flex', gap: 2 }}>
              {(vendor?.VendorTypeRelation || [])?.map((el: VendorTypeRelation) => {
                return (
                  <CommonStyles.Typography
                    key={el.id}
                    variant='h4'
                    sx={{ fontSize: '0.75rem', color: theme.colors?.primary500 }}
                  >
                    {el?.type?.name}
                  </CommonStyles.Typography>
                );
              })}
            </CommonStyles.Box>
          </CommonStyles.Box>
        </CommonStyles.Box>

        <CommonStyles.Box>
          <CommonStyles.Button
            variant='contained'
            startIcon={<CommonIcons.AddIcon />}
            onClick={handleAddService}
            sx={{
              color: theme.colors?.custom?.textGreyLighter,
              backgroundColor: theme.colors?.custom?.greyBorder,
              borderRadius: '1.125rem',
              '&.MuiLoadingButton-root:hover': {
                backgroundColor: theme.colors?.custom?.greyBorder,
                opacity: '0.6',
              },
            }}
          >
            {t('Common.add')}
          </CommonStyles.Button>
        </CommonStyles.Box>
      </CommonStyles.Box>

      <Divider
        sx={{
          height: '0.0625rem',
          color: `${theme.colors?.custom?.greyBorder}`,
          margin: '0.625rem 0 1rem',
        }}
      />
    </CommonStyles.Box>
  );
}
