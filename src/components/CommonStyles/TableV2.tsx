import { SxProps, Theme, useTheme } from '@mui/material';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import React, { CSSProperties } from 'react';
import Pagination from 'components/Client/Components/Pagination';

interface TableV2Props<T> {
  data: (T & { id?: string | number })[];
  header: { id: number; label: string | React.ReactNode; sx?: SxProps; gridCol: string }[];
  renderRow: (row: T & { id?: string | number }) => React.ReactNode;
  paddingAllCell?: string;
  gapAllCell?: string | number;
  sxHeaderContainer?: SxProps;
  sxRowsContainer?: SxProps;
  sxTable?: SxProps;
  sxRowsItems?: SxProps<Theme>;
  onChangePage: (event: unknown, newPage: number) => void;
  countDataInpage: number;
  totalItems: number;
  page: number;
  perPage: number;
  totalPage: number;
}

const TableV2 = <T,>({
  header,
  data,
  renderRow,
  paddingAllCell = '12px 48px 12px 24px',
  gapAllCell = 2,
  sxHeaderContainer,
  sxRowsContainer,
  sxRowsItems,
  sxTable,
  onChangePage,
  countDataInpage,
  totalItems,
  page,
  perPage,
  totalPage,
}: TableV2Props<T>) => {
  const theme = useTheme();

  const gridTemplateColumnsTable = header.map((el) => el.gridCol).join(' ');

  //! Render
  return (
    <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column', ...sxTable }}>
      {/* Header */}
      <CommonStylesClient.Box
        sx={{
          padding: paddingAllCell,
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: gridTemplateColumnsTable,
          borderRadius: '0.5rem',
          gap: gapAllCell,

          ...sxHeaderContainer,
        }}
      >
        {header?.map((h) => {
          return (
            <CommonStylesClient.Box key={h.id} sx={h.sx}>
              {h.label}
            </CommonStylesClient.Box>
          );
        })}
      </CommonStylesClient.Box>

      {/* Content */}
      <CommonStylesClient.Box sx={sxRowsContainer}>
        {data?.map((row) => {
          return (
            <CommonStylesClient.Box
              key={row.id}
              sx={{
                '& > div': {
                  display: 'grid',
                  gridTemplateColumns: gridTemplateColumnsTable,
                  alignItems: 'center',
                  padding: paddingAllCell,
                  gap: gapAllCell,
                  ...(sxRowsItems as Record<string, unknown>),
                  // textAlign: 'center',
                },
              }}
            >
              {renderRow(row)}
            </CommonStylesClient.Box>
          );
        })}
      </CommonStylesClient.Box>

      <Pagination
        count={totalPage}
        page={page}
        countDataInpage={countDataInpage}
        perPage={perPage}
        onChange={onChangePage}
        totalItems={totalItems}
      />
    </CommonStylesClient.Box>
  );
};

export default TableV2;
