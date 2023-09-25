export default {
  toggleTheme: 'toggleTheme',
  session: 'session',
  languagesArr: 'languagesArr',
  refetchListTour: 'refetchListTour',
  refetchListTourGuide: 'refetchListTourGuide',
  refetchListVendor: 'refetchListVendor',
  status: 'status',
  infoStatus: 'infoStatus',
  //* path: /tour
  detailCategory: 'detailCategory',
  listOfCategory: 'listOfCategory',
  loadingListOfCategory: 'loadingListOfCategory',
  hasCategory: 'hasCategory',
  //* path: /tour/detail
  detailTour: 'detailTour',
  refetchDetailTour: 'refetchDetailTour',
  //* path: /places/detail
  detailPlaces: 'detailPlaces',
  refetchDetailPlaces: 'refetchDetailPlaces',
  setStatusCreateTour: 'setStatusCreateTour',
  refetchListVendorSubscribe: 'refetchListVendorSubscribe',
  refetchListTourGuideSubscribe: 'refetchListTourGuideSubscribe',
  refetchListTourGuideInAddTourSubscribe: 'refetchListTourGuideInAddTourSubscribe',
  setStatusCreateVendor: 'setStatusCreateVendor',
  refetchListVendorInAddVendorSubscribe: 'refetchListVendorInAddVendorSubscribe',
  //* path: /find-tour-guide
  listOfTourGuide: 'listOfTourGuide',
  loadingOfTourGuideList: 'loadingOfTourGuideList',
  tourBookingId: 'tourBookingId',
  refetchListTourBooking: 'refetchListTourBooking',
  //* path: /waiting-accept-book
  detailOfReservationVendor: 'detailOfReservationVendor',
  loadingOfReservationVendor: 'loadingOfReservationVendor',
  vendorBookingId: 'vendorBookingId',
  //* path: /payment
  detailOfTourBooking: 'detailOfTourBooking',
  loadingOfTourBookingDetail: 'loadingOfTourBookingDetail',
  paymentStatus: 'paymentStatus',

  setFiltersTourBooking: 'setFiltersTourBooking',
  setFiltersMyBooking: 'setFiltersTourBooking',
  refetchListReservationVendor: 'refetchListReservationVendor',
  refetchListMyBookingTour: 'refetchListReservationVendor',
  refetchGetProfile: 'refetchGetProfile',

  refetchListReservationVendorUIOrderList: 'refetchListReservationVendorUIOrderList',
  refetchProfileLocalFriend: 'refetchProfileLocalFriend',
  refetchListTourBookingUIAdmin: 'refetchListTourBookingUIAdmin',
  refetchListHotDeal: 'refetchListHotDeal',

  refetchDetailCustomer: 'refetchDetailCustomer',

  methodLoginSignup: 'methodLoginSignup'
} as const;
