import React, { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import useFiltersHandler from 'hooks/useFiltersHandler';
import SearchAndFilters from 'components/SearchAndFilters';
import CustomFields from 'components/CustomFields';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import moment from 'moment';
import { IMG_URL } from 'constants/apiUrls';
import useGetListReservationVendor from 'modules/reservationVendor/hooks/useGetListReservationVendor';
import Timer from 'helpers/timer';
import FormikField from 'components/FormikField';
import { localeNumber, snakeCaseToWords } from 'helpers/common';
import cachedKeys from 'constants/cachedKeys';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogFilterMyBooking from '../Components/Dialog/DialogFilterMyBooking';
import { useSave } from 'stores/useStore';
import { Order } from 'interfaces/common';
import CellActions from '../Components/CellActions/CellActions';
import { StatusReservationVendor, StatusReservationVendorPayment } from 'constants/common';
import pageUrls from 'constants/pageUrls';
import { useRouter } from 'next/navigation';

interface MyBookingContainerProps {}

export interface FormFilterMyBooking {
  page: number;
  perPage: number;
  sortField?: string;
  sortOrder?: Order;
  textSearch?: string;
  type?: string[];
  provinceCode?: number;
  rating?: number;
  maxPrice?: number;
  minPrice?: number;
}
const initialFilters: FormFilterMyBooking = {
  page: 1,
  perPage: 5,
  textSearch: '',
  type: [],
  provinceCode: undefined,
  rating: undefined,
  maxPrice: undefined,
  minPrice: undefined,
};
const timer = new Timer();

const MyBookingVendorContainer = (props: MyBookingContainerProps) => {
  //! State
  const t = useTranslations();
  const save = useSave();
  const router = useRouter();
  const { filters, handleChangePage, handleSearch, setFilters } = useFiltersHandler({
    page: 1,
    perPage: 5,
    textSearch: '',
    // time: new Date(),
    from: undefined,
    to: undefined,
  });
  const { data, isLoading, isRefetching, isFetchingPage } = useGetListReservationVendor(filters, {
    refetchKey: cachedKeys.refetchListReservationVendor,
  });
  const theme = useTheme();
  const resReservationVendor = data?.data?.data;

  const {
    open: openFilters,
    toggle: toggleFilters,
    shouldRender: shouldRenderFilters,
  } = useToggleDialog();

  //! Function
  const totalPage = resReservationVendor?.totalPage || 0;
  React.useEffect(() => {
    save(cachedKeys.setFiltersMyBooking, setFilters);
  }, []);

  const handleNavigate = (id?: string | number) => {
    return router.push(`${pageUrls.DetailPlaces}/${id}`);
  };
  //! Render
  if (isLoading) {
    return <CommonStylesClient.Loading />;
  }
  return (
    <CommonStylesClient.Box>
      {shouldRenderFilters && (
        <DialogFilterMyBooking
          open={openFilters}
          initialFilters={initialFilters}
          toggle={toggleFilters}
        />
      )}
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
          <CommonStylesClient.Typography type='mobiHeading4' sx={{ textWrap: 'nowrap' }}>
            {t('MyBookingPlace.BookingDate')}
          </CommonStylesClient.Typography>

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
                  <CommonStylesClient.Box
                    sx={{ width: '100%', maxWidth: '20.438rem', height: 'inherit' }}
                  >
                    <FormikField
                      component={CustomFields.DatePickerField}
                      icon={CommonIcons.IconCalendarOutlined}
                      name='from'
                      isDayjs
                      formatCustom='DD/MM/YYYY'
                      sxContainer={{
                        width: '100%',
                        height: 'inherit',
                        border: `1.5px solid ${theme.colors?.client.midGray} `,
                        borderRadius: '1rem',
                        '& div': {
                          height: 'inherit',
                          borderRadius: '1rem',
                          '& input': { height: 'inherit' },
                        },
                      }}
                      afterOnChange={() => {
                        timer.debounce(() => {
                          propsFormik.handleSubmit();
                        }, 400);
                      }}
                    />
                  </CommonStylesClient.Box>
                  <CommonStylesClient.Box
                    sx={{ width: '100%', maxWidth: '20.438rem', height: 'inherit' }}
                  >
                    <FormikField
                      component={CustomFields.DatePickerField}
                      icon={CommonIcons.IconCalendarOutlined}
                      name='to'
                      isDayjs
                      formatCustom='DD/MM/YYYY'
                      sxContainer={{
                        width: '100%',
                        height: 'inherit',
                        border: `1.5px solid ${theme.colors?.client.midGray} `,
                        borderRadius: '1rem',
                        '& div': {
                          height: 'inherit',
                          borderRadius: '1rem',
                          '& input': { height: 'inherit' },
                        },
                      }}
                      afterOnChange={() => {
                        timer.debounce(() => {
                          propsFormik.handleSubmit();
                        }, 400);
                      }}
                    />
                  </CommonStylesClient.Box>
                  <CommonStylesClient.Box sx={{ width: '100%', height: 'inherit' }}>
                    <FormikField
                      component={CustomFields.TextField}
                      name='textSearch'
                      placeholder={t('MyBookingPlace.SearchOrder')}
                      iconStartInput={<CommonIcons.IconSearchMyBooking />}
                      onClickEndAdornment={toggleFilters}
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
          data={resReservationVendor?.items || []}
          header={[
            {
              id: 1,
              label: (
                <CommonStylesClient.Typography
                  type='text16'
                  sx={{ color: theme.colors?.client.darkGray }}
                >
                  {t('MyBookingPlace.Place')}
                </CommonStylesClient.Typography>
              ),
              gridCol: '180px',
            },
            {
              id: 2,
              label: (
                <CommonStylesClient.Typography
                  type='text16'
                  sx={{ color: theme.colors?.client.darkGray }}
                >
                  {t('MyBookingPlace.BookingDate')}
                </CommonStylesClient.Typography>
              ),
              gridCol: '80px',
            },
            {
              id: 3,
              label: (
                <CommonStylesClient.Typography
                  type='text16'
                  sx={{ color: theme.colors?.client.darkGray }}
                >
                  {t('MyBookingPlace.NumberOfGuests')}
                </CommonStylesClient.Typography>
              ),
              gridCol: '80px',
            },
            {
              id: 4,
              label: (
                <CommonStylesClient.Typography
                  type='text16'
                  sx={{ color: theme.colors?.client.darkGray }}
                >
                  {t('MyBookingPlace.Status')}
                </CommonStylesClient.Typography>
              ),
              gridCol: '100px',
            },
            {
              id: 5,
              label: (
                <CommonStylesClient.Typography
                  type='text16'
                  sx={{ color: theme.colors?.client.darkGray }}
                >
                  {t('MyBookingPlace.StatusPayment')}
                </CommonStylesClient.Typography>
              ),
              gridCol: '100px',
            },
            {
              id: 6,
              label: (
                <CommonStylesClient.Typography
                  type='text16'
                  sx={{ color: theme.colors?.client.darkGray }}
                >
                  {t('MyBookingPlace.Price')}(VND)
                </CommonStylesClient.Typography>
              ),
              gridCol: '80px',
            },
            {
              id: 7,
              label: (
                <CommonStylesClient.Typography
                  type='text16'
                  sx={{ color: theme.colors?.client.darkGray }}
                >
                  {t('MyBookingPlace.rating')}
                </CommonStylesClient.Typography>
              ),
              gridCol: '120px',
            },
            {
              id: 8,
              label: (
                <CommonStylesClient.Typography
                  type='text16'
                  sx={{ color: theme.colors?.client.darkGray }}
                >
                  {t('MyBookingTour.Action')}
                </CommonStylesClient.Typography>
              ),
              gridCol: '6rem',
            },
          ]}
          sxHeaderContainer={{ background: theme.colors?.client.lightGray, textAlign: 'center' }}
          paddingAllCell={'0.75rem 1.5rem 0.75rem 0.75rem'}
          sxTable={{ gap: '1.5rem' }}
          sxRowsItems={{ textAlign: 'center' }}
          gapAllCell={6}
          onChangePage={handleChangePage}
          totalPage={totalPage}
          countDataInpage={resReservationVendor?.items?.length || 0}
          totalItems={resReservationVendor?.totalItems || 0}
          page={resReservationVendor?.currentPage || 0}
          perPage={resReservationVendor?.perPage || 0}
          renderRow={(items) => {
            const dateBooking = moment(items?.time).format('DD/MM/YYYY HH:mm ');
            const convertStatus = (status: StatusReservationVendor) => {
              if (status === StatusReservationVendor.MATCHED) {
                // return t('Vendor.confirmed');
                return 'confirmed';
              }
              return snakeCaseToWords(status);
            };

            const convertStatusPayment = (status: StatusReservationVendorPayment) => {
              return snakeCaseToWords(status);
            };

            const convertCategoryStatus = (status: StatusReservationVendor) => {
              if (
                status === StatusReservationVendor.MATCHED ||
                status === StatusReservationVendor.CHECKED_IN ||
                status === StatusReservationVendor.SUCCESSFULLY
              ) {
                return 'green';
              }
              if (status === StatusReservationVendor.CANCELED) {
                return 'red';
              }
              return 'blue';
            };
            const convertCategoryStatusPayment = (status: StatusReservationVendorPayment) => {
              if (status === StatusReservationVendorPayment.SUCCESSFULLY) {
                return 'green';
              }
              if (
                status === StatusReservationVendorPayment.CANCELED ||
                status === StatusReservationVendorPayment.EXPIRED_PAYMENT
              ) {
                return 'red';
              }
              if (status === StatusReservationVendorPayment.REFUND) {
                return 'purple';
              }
              return 'blue';
            };

            //! Render Row
            return (
              <CommonStylesClient.Box
                sx={{
                  mb: 2,
                  backgroundColor: 'white',
                  height: 'fit-content',
                  borderRadius: '0.5rem',
                }}
              >
                {/* 1 - Places */}
                <CommonStylesClient.Box
                  sx={{
                    display: 'flex',
                    gap: '1rem',
                    cursor: 'pointer',
                    textAlign: 'start !important',
                  }}
                  onClick={() => handleNavigate(items?.Vendor?.id)}
                >
                  <CommonStylesClient.Box>
                    <img
                      src={`${IMG_URL}/${items.Vendor?.thumbnail}`}
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
                    <CommonStylesClient.Typography type='mobiHeading3'>
                      {items?.Vendor?.name}
                    </CommonStylesClient.Typography>
                    <CommonStylesClient.Typography type='text12'>
                      {items?.Vendor?.VendorTypeRelation?.map(
                        (childItem) => `  #${childItem?.type?.name}`
                      )}
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
                        {localeNumber(items?.Vendor?.minPrice)}
                      </span>
                      VND
                    </CommonStylesClient.Typography>
                  </CommonStylesClient.Box>
                </CommonStylesClient.Box>
                {/* 2- Booking Date */}
                <CommonStylesClient.Box>{dateBooking}</CommonStylesClient.Box>
                {/* 3 - Number OF Guest */}
                <CommonStylesClient.Box>{items?.totalCustomer}</CommonStylesClient.Box>
                {/* 4 - Status Booking */}
                <CommonStylesClient.Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <CommonStyles.Badge
                    category={convertCategoryStatus(items?.status)}
                    label={convertStatus(items?.status)}
                  />
                </CommonStylesClient.Box>
                {/* 5 - Status Payment */}
                <CommonStylesClient.Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <CommonStyles.Badge
                    category={convertCategoryStatusPayment(items?.ReservationTransaction?.status)}
                    label={convertStatusPayment(items?.ReservationTransaction?.status)}
                  />
                </CommonStylesClient.Box>
                {/* 6 - Price(VND) */}
                <CommonStylesClient.Box>{items?.totalPrice}</CommonStylesClient.Box>
                {/* 7 -Rating */}
                <CommonStylesClient.Box>
                  <CommonStyles.RatingMui valueTable={items?.Vendor?.totalRate ?? 0} readOnly />
                </CommonStylesClient.Box>
                {/* 8- Action */}
                <CommonStylesClient.Box>
                  <CellActions myBookingVendor={items} />
                </CommonStylesClient.Box>
              </CommonStylesClient.Box>
            );
          }}
        />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(MyBookingVendorContainer);
