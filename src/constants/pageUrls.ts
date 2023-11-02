import { WishListVendor } from './../modules/wishListVendor/wishListVendor.interface';
const pageUrls = {
  //admin
  Homepage: '/',
  Login: '/login',
  Admin: '/admin',
  TourManager: '/admin/tour',
  TourGuideManager: '/admin/tour-guide',
  CustomerManager: '/admin/customers',
  DetailCustomer: '/admin/customers/',
  BookingManager: '/admin/booking',
  CampaignManager: '/admin/hot-deal',
  OverView: '/admin/book',
  VendorManager: '/admin/vendor',

  //user
  Tour: '/tour',
  DetailTour: 'tour/',
  Places: '/places',
  DetailPlaces: 'places/',
  Contact: '/contact',
  FAQ: '/faq',
  FindTourGuide: '/find-local-friend',
  WaitingAcceptBook: '/waiting-accept-book',
  // Tour guide
  Articles: {
    Home: '/local-friend',
    BookingTour: '/local-friend/booking-tour',
    Profile: '/local-friend/profile',
  },

  //Merchant
  Vendor: {
    Home: '/vendor',
    OrderList: '/vendor/order-list',
  },

  //My Booking
  MyBookingVendor: '/my-booking-vendor',
  MyBookingTour: '/my-booking-tour',

  //Payment
  Payment: '/payment',
  WishListVendor: '/wish-list-vendor',

  Customer: {
    Profile: 'customer/profile',
  },
};

export default pageUrls;
