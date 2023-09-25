import React, { memo, useEffect } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { SxProps, Theme } from '@mui/material';
import {
  useParams,
  usePathname,
  useSearchParams,
  useSelectedLayoutSegments,
} from 'next/navigation';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { isObject, isUndefined } from 'lodash';
import Link from 'next/link';

import { BreadcrumbsDetail, RouterBase } from 'interfaces/common';
import routerHeader from 'routes/router';
import pageUrls from 'constants/pageUrls';
import CommonStyles from '.';
import { removeLangFromPathname } from 'helpers/common';
import CommonStylesClient from '.';
import CommonIcons from '../CommonIcons';

interface Props {
  style?: SxProps<Theme>;
  details?: BreadcrumbsDetail[];
}
const BreadcrumbsMui = (props: Props) => {
  const { details } = props;
  const pathName = usePathname();
  const theme = useTheme();
  const t = useTranslations('Routes');
  const searchParams = useSearchParams();
  useEffect(() => {
    const url = `${pathName}?${searchParams}`;
  }, [searchParams, pathName]);

  const renderLink = () => {
    const router = routerHeader().routerUser.find(
      (item: RouterBase) => item.path === removeLangFromPathname(pathName)
    );

    if (isObject(router)) {
      return (
        <Breadcrumbs
          aria-label='breadcrumb'
          sx={{
            fontSize: '14px',
            lineHeight: '22px',
            color: theme.colors?.bgneutral500,
            textDecoration: 'none',
            ['a']: {
              textDecoration: 'none',
              [':hover']: {
                textDecoration: 'underline',
              },
            },
            ...props?.style,
          }}
          separator={<CommonIcons.IconArrowRight className='icon-arrow-right' />}
        >
          <Link href={pageUrls.Homepage}>
            <CommonStylesClient.Typography
              type='title14'
              sx={{ color: theme.colors?.client?.black }}
            >
              {t('home')}
            </CommonStylesClient.Typography>
          </Link>
          <Link href={router?.path || '/'}>
            <CommonStylesClient.Typography
              type='title14'
              sx={{ color: theme.colors?.client?.darkGray }}
            >
              {router?.label || ''}
            </CommonStylesClient.Typography>
          </Link>
        </Breadcrumbs>
      );
    } else if (isUndefined(router)) {
      // Render Detail Router
      let routerSelected = removeLangFromPathname(pathName);
      const parsedRouterSelected = routerSelected?.substring(0, routerSelected.lastIndexOf('/'));

      const mainRouter = routerHeader().routerUser.find((routeMain) => {
        return routeMain.path === parsedRouterSelected;
      });

      return (
        <Breadcrumbs
          aria-label='breadcrumb'
          sx={{
            fontSize: '14px',
            lineHeight: '22px',
            color: theme.colors?.bgneutral500,
            textDecoration: 'none',
            ['a']: {
              textDecoration: 'none',
              [':hover']: {
                textDecoration: 'underline',
              },
            },
            ...props?.style,
          }}
          separator={<CommonIcons.IconArrowRight className='icon-arrow-right' />}
        >
          <Link href={pageUrls.Homepage}>
            <CommonStylesClient.Typography
              type='title14'
              sx={{ color: theme.colors?.client?.black }}
            >
              {t('home')}
            </CommonStylesClient.Typography>
          </Link>
          {/* Main Router */}
          <Link href={mainRouter?.path || '/'}>
            <CommonStylesClient.Typography
              type='title14'
              sx={{ color: theme.colors?.client?.darkGray }}
            >
              {mainRouter?.label || ''}
            </CommonStylesClient.Typography>
          </Link>
          {/* Detail Router */}
          {details?.map((item: BreadcrumbsDetail) => {
            return (
              <Link href={item?.href} key={item?.href}>
                <CommonStylesClient.Typography
                  type='title14'
                  sx={{ color: theme.colors?.client?.darkGray }}
                >
                  {item?.label || ''}
                </CommonStylesClient.Typography>
              </Link>
            );
          })}
        </Breadcrumbs>
      );
    } else {
      return <></>;
    }
  };
  return <CommonStyles.Box>{renderLink()}</CommonStyles.Box>;
};

export default memo(BreadcrumbsMui);
