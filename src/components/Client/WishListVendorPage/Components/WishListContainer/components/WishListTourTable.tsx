import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import useFiltersHandler from 'hooks/useFiltersHandler';
import SearchAndFilters from 'components/SearchAndFilters';
import CustomFields from 'components/CustomFields';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';
import CommonIconsGlobal from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { IMG_URL } from 'constants/apiUrls';
import Timer from 'helpers/timer';
import FormikField from 'components/FormikField';
import useGetListWishListTour from 'modules/wishListTour/hooks/useGetListWishListTour';
import pageUrls from 'constants/pageUrls';
import { useRouter } from 'next/navigation';
import { formatPrice } from 'helpers/common';

interface WishListVendorContainerProps {}

const timer = new Timer();
const WishListVendorTable = (props: WishListVendorContainerProps) => {
  //! State
  const t = useTranslations();
  const router = useRouter();
  const { filters, handleChangePage, handleSearch } = useFiltersHandler({
    page: 1,
    perPage: 5,
    textSearch: '',
  });

  const { data, isLoading, isRefetching, isFetchingPage } = useGetListWishListTour(filters);

  const theme = useTheme();
  const resWishListTour = data?.data?.data;
  const totalPage = resWishListTour?.totalPage || 0;
  //! Function
  const handleNavigate = (id?: string | number) => {
    router.push(`${pageUrls.DetailTour}/${id}`);
  };
  //! Render
  if (isLoading) {
    return <CommonStylesClient.Loading />;
  }
  return (
    <CommonStylesClient.Box sx={{ flexGrow: '1', flexBasis: 0 }}>
      <CommonStylesClient.Box>
        <CommonStylesClient.Box
          sx={{
            display: 'flex',
            margin: '2rem 0',
            gap: '1rem',
            alignItems: 'center',
            height: '3.25rem',
          }}
        >
          <SearchAndFilters
            initialValues={filters}
            onSubmit={(values) => {
              handleSearch(values);
            }}
            hideResetButton
            hideDefaultSubmit
            styleWrapperForm={{ width: '100%', height: '100%' }}
            sxContainer={{ display: 'flex', justifyContent: 'space-between', height: 'inherit' }}
            renderFilterFields={(propsFormik) => {
              return (
                <CommonStylesClient.Box
                  sx={{ gap: '2rem', display: 'flex', flex: 1, height: 'inherit' }}
                >
                  <CommonStylesClient.Box sx={{ width: '100%', height: 'inherit' }}>
                    <FormikField
                      component={CustomFields.TextField}
                      name='textSearch'
                      placeholder={t('MyBookingPlace.SearchOrder')}
                      iconStartInput={<CommonIcons.IconSearchMyBooking />}
                      iconEndInput={
                        <CommonStylesClient.Box
                          sx={{
                            display: 'flex',
                            gap: '0.5rem',
                            alignItems: 'center',
                            height: '100%',
                            maxHeight: '1.125rem',
                          }}
                        >
                          <CommonStylesClient.Divider orientation='vertical' variant='middle' />
                          <CommonIcons.IconFilterMyBooking />
                        </CommonStylesClient.Box>
                      }
                      sx={{
                        width: '100%',
                        height: 'inherit',
                        border: `1.5px solid ${theme.colors?.client.midGray} `,
                        borderRadius: '1rem',
                        '& div': {
                          borderRadius: '1rem',
                          height: 'inherit',
                          '& input': {
                            height: 'inherit',
                            fontFamily: 'Plus Jakarta Sans',
                            fontSize: '0.875rem',
                            fontWeight: 400,
                            lineHeight: '1.4rem',
                            color: theme.colors?.client?.midBlack,
                            letterSpacing: '0.0175rem',
                            opacity: '0.800000011920929',
                          },
                        },
                      }}
                      size='small'
                      afterOnChange={() => {
                        timer.debounce(() => {
                          propsFormik.handleSubmit();
                        }, 400);
                      }}
                    />
                  </CommonStylesClient.Box>
                </CommonStylesClient.Box>
              );
            }}
          />
        </CommonStylesClient.Box>

        <CommonStyles.TableV2
          data={resWishListTour?.items || []}
          header={[
            {
              id: 1,
              label: (
                <CommonStylesClient.Typography
                  type='text16'
                  sx={{ color: theme.colors?.client.darkGray }}
                >
                  {t('WishListVendor.Tour')}
                </CommonStylesClient.Typography>
              ),
              gridCol: '1fr',
            },
          ]}
          sxHeaderContainer={{ background: theme.colors?.client.lightGray }}
          sxRowsContainer={{}}
          sxTable={{ gap: '1.5rem' }}
          gapAllCell={5}
          onChangePage={handleChangePage}
          totalPage={totalPage}
          countDataInpage={resWishListTour?.items?.length || 0}
          totalItems={resWishListTour?.totalItems || 0}
          page={resWishListTour?.currentPage || 0}
          perPage={resWishListTour?.perPage || 0}
          renderRow={(items) => {
            return (
              <CommonStylesClient.Box
                sx={{
                  mb: 2,
                  backgroundColor: 'white',
                  height: 'fit-content',
                  borderRadius: '0.5rem',
                }}
              >
                <CommonStylesClient.Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <CommonStylesClient.Box
                    sx={{ display: 'flex', gap: '1rem', cursor: 'pointer' }}
                    onClick={() => handleNavigate(items?.Tour?.id)}
                  >
                    <CommonStylesClient.Box>
                      <img
                        src={`${IMG_URL}/${items.Tour?.thumbnail}`}
                        alt='Tour image'
                        style={{
                          width: '5rem',
                          height: '5rem',
                          objectFit: 'cover',
                          borderRadius: '0.75rem',
                        }}
                      />
                    </CommonStylesClient.Box>
                    <CommonStylesClient.Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                      }}
                    >
                      <CommonStylesClient.Typography
                        type='mobiHeading3'
                        sx={{
                          maxHeight: '3rem', // Chỉnh kích thước cao tối đa cho 2 dòng và nửa dòng
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2, // Số dòng tối đa
                          whiteSpace: 'normal', // Cho phép xuống dòng
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {items?.Tour?.name}
                      </CommonStylesClient.Typography>
                      <CommonStylesClient.Typography type='text12'>
                        {`${items?.Tour?.categories?.map(
                          (childItem) => `#${childItem?.category?.name}`
                        )}`}
                      </CommonStylesClient.Typography>
                      <CommonStylesClient.Typography type='text12'>
                        {t('MyBookingPlace.from')}
                        <span
                          style={{
                            marginLeft: ' 0.5rem',
                            marginRight: '0.1rem',
                            color: theme.colors?.client.coBaltBlue,
                          }}
                        >
                          {formatPrice(Number(items?.defaultPrice ?? 0))}
                        </span>
                      </CommonStylesClient.Typography>
                    </CommonStylesClient.Box>
                  </CommonStylesClient.Box>
                  <CommonStylesClient.Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                    <CommonIconsGlobal.Rating sx={{ color: theme?.colors?.client?.yellow }} />
                    <CommonStylesClient.Typography>
                      {items?.Tour?.totalRate ?? 0}
                    </CommonStylesClient.Typography>
                  </CommonStylesClient.Box>
                </CommonStylesClient.Box>
              </CommonStylesClient.Box>
            );
          }}
        />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(WishListVendorTable);
