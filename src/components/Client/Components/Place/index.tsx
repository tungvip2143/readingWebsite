import React from 'react';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';

import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { formatPrice } from 'helpers/common';

interface PlaceProps {
  name: string;
  image: string;
  price: string | number;
  rating: number;
  hashTag: string[];
  href: string;
}

const Place = (props: PlaceProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations('PlacesToGoSession');

  const { name, image, price, hashTag = [''], rating, href = '' } = props;
  //! Function

  const renderHashTag = hashTag?.map((string: string) => {
    return `#${string} `;
  });

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        ['a']: {
          textDecoration: 'none',
        },
      }}
    >
      <Link href={href}>
        <CommonStylesClient.Box
          sx={{
            display: 'flex',
            gap: '1.5rem',
            flexDirection: 'row',
          }}
        >
          <CommonStylesClient.Box>
            <img
              src={image}
              alt={`Place ${name}`}
              style={{
                width: '6.25rem',
                height: '6.25rem',
                objectFit: 'cover',
                borderRadius: '0.625rem',
              }}
            />
          </CommonStylesClient.Box>

          <CommonStylesClient.Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <CommonStylesClient.Box
              sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                flexShrink: 0,
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              {/* Name Tag */}
              <CommonStylesClient.Box>
                <CommonStylesClient.Typography type='pcHeading4'>
                  {name}
                </CommonStylesClient.Typography>
                <CommonStylesClient.Tooltip title={renderHashTag} followCursor placement='bottom'>
                  <div>
                    <CommonStylesClient.Typography
                      type='text16'
                      sx={{ color: theme.colors?.client.darkGray, marginTop: '0.25rem' }}
                    >
                      {renderHashTag?.length < 2
                        ? renderHashTag
                        : renderHashTag?.slice(0, 2).concat('...')}
                    </CommonStylesClient.Typography>
                  </div>
                </CommonStylesClient.Tooltip>
              </CommonStylesClient.Box>

              {/* Price */}
              <CommonStylesClient.Box
                sx={{ display: 'flex', gap: '0.2rem', alignItems: 'baseline' }}
              >
                <CommonStylesClient.Typography type='text10'>
                  {t('from')}
                </CommonStylesClient.Typography>
                <CommonStylesClient.Typography
                  type='mobiHeading2'
                  sx={{ color: theme.colors?.client.coBaltBlue }}
                >
                  {formatPrice(Number(price))}
                </CommonStylesClient.Typography>
              </CommonStylesClient.Box>
            </CommonStylesClient.Box>

            <CommonStylesClient.Box sx={{ display: 'flex', gap: '0.2rem', alignItems: 'baseline' }}>
              <CommonStylesClient.Box sx={{ position: 'relative', top: '2px' }}>
                <CommonIcons.IconStar />
              </CommonStylesClient.Box>

              <CommonStylesClient.Typography
                type='title14'
                sx={{ color: theme.colors?.client.darkGray }}
              >
                {rating}
              </CommonStylesClient.Typography>
            </CommonStylesClient.Box>
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      </Link>
    </CommonStylesClient.Box>
  );
};

export default React.memo(Place);
