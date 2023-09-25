import React from 'react';
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
import Timer from 'helpers/timer';
import FormikField from 'components/FormikField';
import { formatPrice, localeNumber } from 'helpers/common';
import cachedKeys from 'constants/cachedKeys';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogFilterMyBooking from '../Components/Dialog/DialogFilterMyBooking';
import { useSave } from 'stores/useStore';
import { Order } from 'interfaces/common';
import useGetListMyTourBooking from 'modules/myTourBooking/hooks/useGetListMyTourBooking';
import CellActions from '../Components/CellActions/CellActions';
import { useRouter } from 'next/navigation';
import pageUrls from 'constants/pageUrls';

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

const MyBookingTourContainer = (props: MyBookingContainerProps) => {
  //! State
  const t = useTranslations();
  const save = useSave();
  const { filters, handleChangePage, handleSearch, setFilters } = useFiltersHandler({
    page: 1,
    perPage: 5,
    textSearch: '',
    // time: new Date(),
    from: undefined,
    to: undefined,
  });
  const { data, isLoading } = useGetListMyTourBooking(filters, {
    refetchKey: cachedKeys.refetchListMyBookingTour,
  });
  const theme = useTheme();
  const resReservationVendor = data?.data?.data;
  const router = useRouter();
  const {
    open: openFilters,
    toggle: toggleFilters,
    shouldRender: shouldRenderFilters,
  } = useToggleDialog();

  const totalPage = resReservationVendor?.totalPage || 0;
  //! Function
  React.useEffect(() => {
    save(cachedKeys.setFiltersMyBooking, setFilters);
  }, []);

  const handleNavigate = (id?: string | number) => {
    router.push(`${pageUrls.DetailTour}/${id}`);
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
            {t('MyBookingTour.BookingDate')}
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
                      formatCustom='ddd, MMM DD, YYYY'
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
                      placeholder={t('MyBookingTour.SearchOrder')}
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
                  {t('MyBookingTour.Tour')}
                </CommonStylesClient.Typography>
              ),
              gridCol: '3fr',
            },
            {
              id: 2,
              label: (
                <CommonStylesClient.Typography
                  type='text16'
                  sx={{ color: theme.colors?.client.darkGray }}
                >
                  {t('MyBookingTour.BookingDate')}
                </CommonStylesClient.Typography>
              ),
              gridCol: '1fr',
            },

            {
              id: 3,
              label: (
                <CommonStylesClient.Typography
                  type='text16'
                  sx={{ color: theme.colors?.client.darkGray }}
                >
                  {t('MyBookingTour.NumberOfGuests')}
                </CommonStylesClient.Typography>
              ),
              gridCol: '100px',
            },
            {
              id: 4,
              label: (
                <CommonStylesClient.Typography
                  type='text16'
                  sx={{ color: theme.colors?.client.darkGray }}
                >
                  {t('MyBookingTour.Price')}(VND)
                </CommonStylesClient.Typography>
              ),
              gridCol: '1fr',
            },
            {
              id: 5,
              label: (
                <CommonStylesClient.Typography
                  type='text16'
                  sx={{ color: theme.colors?.client.darkGray }}
                >
                  {t('MyBookingTour.status')}
                </CommonStylesClient.Typography>
              ),
              gridCol: '1fr',
            },
            {
              id: 6,
              label: (
                <CommonStylesClient.Typography
                  type='text16'
                  sx={{ color: theme.colors?.client.darkGray }}
                >
                  {t('MyBookingTour.rating')}
                </CommonStylesClient.Typography>
              ),
              gridCol: '1fr',
            },
            {
              id: 7,
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
          sxRowsItems={{ '& > div': { textAlign: 'center' } }}
          gapAllCell={1}
          onChangePage={handleChangePage}
          totalPage={totalPage}
          countDataInpage={resReservationVendor?.items?.length || 0}
          totalItems={resReservationVendor?.totalItems || 0}
          page={resReservationVendor?.currentPage || 0}
          perPage={resReservationVendor?.perPage || 0}
          renderRow={(items) => {
            const dateBooking = moment(items?.startTime).format('DD/MM/YYYY');
            const numberOfGuests = (items?.totalAdult || 0) + (items?.totalChildren || 0);

            const totalGuests = Number(items?.totalAdult + items?.totalChildren) || 1;
            const defaultPrice = items?.totalPrice / totalGuests;
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
                  sx={{
                    display: 'flex',
                    gap: '1rem',
                    cursor: 'pointer',
                    textAlign: 'start !important',
                  }}
                  onClick={() => handleNavigate(items?.Tours?.id)}
                >
                  <CommonStylesClient.Box>
                    <img
                      src={`${IMG_URL}/${items?.Tours?.thumbnail}`}
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
                      {items?.Tours?.name}
                    </CommonStylesClient.Typography>
                    <CommonStylesClient.Typography type='text12'>
                      {items?.Tours?.categories?.map(
                        (childItem) => `  #${childItem?.category?.name}`
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
                        {formatPrice(Number(defaultPrice ?? 0))}
                      </span>
                    </CommonStylesClient.Typography>
                  </CommonStylesClient.Box>
                </CommonStylesClient.Box>

                <CommonStylesClient.Box>{dateBooking}</CommonStylesClient.Box>
                <CommonStylesClient.Box>{numberOfGuests}</CommonStylesClient.Box>
                <CommonStylesClient.Box>{localeNumber(items?.totalPrice)}</CommonStylesClient.Box>
                <CommonStylesClient.Box>
                  <CommonStyles.Badge category='blue' label={items?.status.toLowerCase()} />
                </CommonStylesClient.Box>
                <CommonStylesClient.Box>
                  <CommonStyles.RatingMui valueTable={items?.Tours?.totalRate ?? 0} readOnly />
                </CommonStylesClient.Box>
                <CommonStylesClient.Box>
                  <CellActions myBookingTour={items} />
                </CommonStylesClient.Box>
              </CommonStylesClient.Box>
            );
          }}
        />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(MyBookingTourContainer);
