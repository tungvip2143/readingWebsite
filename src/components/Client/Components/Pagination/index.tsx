import React, { useMemo } from 'react';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { Pagination, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

interface PaginationProps {
  count: number;
  page: number;
  perPage: number;
  countDataInpage: number;
  totalItems: number;
  onChange: (event: unknown, newPage: number) => void;
}

const PaginationCustom = (props: PaginationProps) => {
  //! State
  const { count, page, onChange, perPage, countDataInpage, totalItems } = props;
  const theme = useTheme();
  const t = useTranslations();

  //! Function
  const offset = (page - 1) * perPage;
  const start = offset + 1;
  const end = useMemo(() => {
    if (countDataInpage < perPage) {
      return start + countDataInpage - 1;
    }
    return page * perPage;
  }, [page, countDataInpage, start, perPage]);

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <CommonStylesClient.Box>
        <CommonStylesClient.Typography
          variant='h4'
          sx={{
            color: theme.colors?.client.darkGray,
            fontSize: '0.875rem',
            fontWeight: 500,
            letterSpacing: '0.035rem',
          }}
        >
          {t('Common.showingResultPagination', { start: start, end: end, total: totalItems })}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>
      <CommonStylesClient.Box>
        <Pagination
          sx={{
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: theme.colors?.client.blue,
              borderRadius: '0.5rem',
              color: theme.colors?.white,
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: '0.035rem',
            },
            '& .MuiPaginationItem-root': {
              color: theme.colors?.client.textPaginationBlack,
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: '0.035rem',
            },
          }}
          count={count}
          page={page}
          onChange={(e, page) => onChange(e, page - 1)}
          shape='rounded'
        />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(PaginationCustom);
