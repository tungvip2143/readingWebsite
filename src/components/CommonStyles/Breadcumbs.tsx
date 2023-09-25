import React, { memo } from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { SxProps, Theme } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { isObject, isString, isUndefined } from 'lodash';

import { languages } from 'i18nOptions';
import { RouterBase } from 'interfaces/common';
import routerHeader from 'routes/router';
import pageUrls from 'constants/pageUrls';
import CommonStyles from '.';
import { removeLangFromPathname } from 'helpers/common';

interface Props {
  style?: SxProps<Theme>;
}
const BreadcrumbsMui = (props: Props) => {
  const pathName = usePathname();
  const theme = useTheme();
  const t = useTranslations('Routes');

  const renderLink = () => {
    const router = routerHeader().routerAdmin.find(
      (item: RouterBase) => item.path === removeLangFromPathname(pathName)
    );
    if (isObject(router)) {
      return (
        <Breadcrumbs
          aria-label='breadcrumb'
          sx={
            props?.style
              ? props?.style
              : { mb: 3, fontSize: '14px', lineHeight: '22px', color: theme.colors?.bgneutral500 }
          }
        >
          <Link underline='hover' color='inherit' href={pageUrls.Homepage}>
            {t('home')}
          </Link>
          <Link underline='hover' color='inherit' href={router?.path || '/'}>
            {router?.label || ''}
          </Link>
        </Breadcrumbs>
      );
    } else if (isUndefined(router)) {
      // Render Detail Router
      let routerSelected = removeLangFromPathname(pathName);
      routerSelected = routerSelected?.substring(0, routerSelected.lastIndexOf('/') + 1);

      const detailRouter = routerHeader().routerAdmin.find((route) => {
        return route.path === routerSelected;
      });

      const mainRouterSelected = detailRouter && detailRouter.path.replace(/\/$/, '');
      const mainRouter = routerHeader().routerAdmin.find((routeMain) => {
        return routeMain.path === mainRouterSelected;
      });
      return (
        <Breadcrumbs
          aria-label='breadcrumb'
          sx={
            props?.style
              ? props?.style
              : { mb: 3, fontSize: '14px', lineHeight: '22px', color: theme.colors?.bgneutral500 }
          }
        >
          <Link underline='hover' color='inherit' href={pageUrls.Homepage}>
            {t('home')}
          </Link>
          <Link underline='hover' color='inherit' href={mainRouter?.path || '/'}>
            {mainRouter?.label || ''}
          </Link>
          <Link underline='hover' color='inherit' href={detailRouter?.path || '/'}>
            {detailRouter?.label || ''}
          </Link>
        </Breadcrumbs>
      );
    } else {
      return <></>;
    }
  };
  return <CommonStyles.Box>{renderLink()}</CommonStyles.Box>;
};

export default memo(BreadcrumbsMui);
