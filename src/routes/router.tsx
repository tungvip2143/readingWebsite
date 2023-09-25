import CommonIcons from 'components/CommonIcons';
import pageUrls from 'constants/pageUrls';
import { useTranslations } from 'next-intl';
import CommonIconsClient from 'components/Client/CommonIcons';

const router = () => {
  const t = useTranslations();

  const routerAdmin = [
    {
      label: t('Routes.home'),
      path: pageUrls.Admin,
      icon: <CommonIcons.BookIcon />,
      showTab: true,
    },
    {
      label: t('Routes.tourManager'),
      path: pageUrls.TourManager,
      icon: <CommonIcons.BookIcon />,
      showTab: true,
    },
    {
      label: t('Routes.localFriendManager'),
      path: pageUrls.TourGuideManager,
      icon: <CommonIcons.BookIcon />,
      showTab: true,
    },
    {
      label: t('Routes.customerManager'),
      path: pageUrls.CustomerManager,
      icon: <CommonIcons.Users />,
      showTab: true,
    },
    {
      label: t('Routes.detailCustomer'),
      path: pageUrls.DetailCustomer,
      icon: <CommonIcons.Users />,
      showTab: false,
    },
    {
      label: t('Routes.campaignManager'),
      path: pageUrls.CampaignManager,
      icon: <CommonIcons.BookIcon />,
      showTab: true,
    },
    {
      label: t('Routes.vendorManager'),
      path: pageUrls.VendorManager,
      icon: <CommonIcons.BookIcon />,
      showTab: true,
    },
    {
      label: t('Routes.bookingManager'),
      path: pageUrls.BookingManager,
      icon: <CommonIcons.BookIcon />,
      showTab: true,
    },
  ];

  const routerUser = [
    {
      label: t('TourUser.tour'),
      path: pageUrls.Tour,
      icon: <CommonIcons.BookIcon />,
      showTab: true,
    },
    {
      label: t('TourUser.places'),
      path: pageUrls.Places,
      icon: <CommonIcons.BookIcon />,
      showTab: true,
    },
    {
      label: t('TourUser.contact'),
      path: pageUrls.Contact,
      icon: <CommonIcons.BookIcon />,
      showTab: true,
    },
    {
      label: t('TourUser.faq'),
      path: pageUrls.FAQ,
      icon: <CommonIcons.Users />,
      showTab: true,
    },
  ];

  const routerTourGuide = [
    {
      label: t('Routes.home'),
      path: pageUrls.LocalFriend.Home,
      icon: <CommonIconsClient.IconHome />,
      showTab: true,
    },
    {
      label: t('Routes.registerTour'),
      path: pageUrls.LocalFriend.BookingTour,
      icon: <CommonIconsClient.IconUser />,
      showTab: true,
    },
  ];

  const routerMerchant = [
    {
      label: t('Routes.home'),
      path: pageUrls.Vendor.Home,
      icon: <CommonIconsClient.IconHome />,
      showTab: true,
    },
    {
      label: t('Routes.listOrderMerchant'),
      path: pageUrls.Vendor.OrderList,
      icon: <CommonIconsClient.IconUser />,
      showTab: true,
    },
  ];

  return { routerAdmin: routerAdmin, routerUser: routerUser, routerTourGuide, routerMerchant };
};

export default router;
