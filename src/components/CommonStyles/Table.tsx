import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { OrderType, TypeOfFilterHeader } from 'interfaces/common';
import CommonStyles from '.';
import CommonIcons from 'components/CommonIconsMui';
import { SxProps, IconButtonProps } from '@mui/material';
import { START_PAGE } from 'constants/common';
import { RenderComponentHeadFilter } from './HeadFilters';
import { useTranslations } from 'next-intl';
import { String } from 'lodash';

interface EnhancedTableProps<T> {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof any) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: OrderType;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell<T>[];
  showCheckBox?: boolean;
  sxTableHead?: SxProps;
  sortByIsActived?: string[];
}

function EnhancedTableHead<T>(props: EnhancedTableProps<T>) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    sxTableHead,
    sortByIsActived,
  } = props;
  const createSortHandler = (property: keyof any) => (event: React.MouseEvent<unknown>) => {
    const fieldCanSortBy = !sortByIsActived?.includes(property?.toString());
    if (fieldCanSortBy) {
      onRequestSort(event, property);
    }
    return;
  };
  const isNotActiveSortBy = (item: string) => {
    const value = sortByIsActived?.includes(item || '');
    return value;
  };

  return (
    <TableHead>
      <TableRow>
        {props?.showCheckBox && (
          <TableCell padding='checkbox'>
            <Checkbox
              color='primary'
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
        )}

        {props.headCells.map(
          (headCell: { [key: string]: any; renderFilters?: RenderComponentHeadFilter }) => {
            const hasFilters = !!headCell?.renderFilters;

            const Wrapper = hasFilters ? CommonStyles.Box : React.Fragment;
            const propsWrapper = hasFilters
              ? {
                  display: 'flex',
                  alignItems: 'center',
                }
              : undefined;

            if (headCell.isHided) {
              return null;
            }

            if (headCell?.disableSort) {
              return (
                <TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'}>
                  <Wrapper {...propsWrapper}>
                    {headCell.label}

                    {hasFilters && (
                      <CommonStyles.HeadFilters
                        type={TypeOfFilterHeader.dialog}
                        renderComponent={headCell.renderFilters}
                      />
                    )}
                  </Wrapper>
                </TableCell>
              );
            }

            return (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
                sx={sxTableHead}
              >
                <Wrapper {...propsWrapper}>
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                    hideSortIcon={isNotActiveSortBy(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component='span' sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>

                  {hasFilters && (
                    <CommonStyles.HeadFilters
                      type={TypeOfFilterHeader.dialog}
                      renderComponent={headCell.renderFilters}
                    />
                  )}
                </Wrapper>
              </TableCell>
            );
          }
        )}
      </TableRow>
    </TableHead>
  );
}

export interface HeadCell<T> {
  disablePadding?: boolean;
  id: keyof any;
  label?: string | React.ReactNode;
  numeric?: boolean;
  disableSort?: boolean;
  renderFilters?: RenderComponentHeadFilter;
  Cell?: (row: T) => React.ReactElement;
  isHided?: boolean;
}

interface TableCommonProps<T> {
  order: OrderType;
  orderBy: any;
  selected: readonly (string | number)[];
  page: number;
  rowsPerPage: number;
  rows: T[];
  headCells: HeadCell<T>[];
  totalCount: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleSelectAllClick?: (
    event: React.ChangeEvent<HTMLInputElement>,
    rows: T[],
    key?: string
  ) => void;
  handleCheckBox?: (value: T, key: string) => void;
  handleRequestSort: (event: React.MouseEvent<unknown>, property: keyof any) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showCheckBox?: boolean;
  keyPrimary?: string;
  isLoading?: boolean;
  sxTableHead?: SxProps;
  sortByIsActived?: string[];
}

function TableCommon<T>({
  order,
  orderBy,
  selected,
  page,
  rowsPerPage,
  rows,
  headCells,
  totalCount,
  showCheckBox,
  keyPrimary = 'id',
  isLoading,
  handleCheckBox,
  handleChangePage,
  handleSelectAllClick,
  handleRequestSort,
  handleChangeRowsPerPage,
  sxTableHead,
  sortByIsActived,
}: TableCommonProps<T>) {
  const theme = useTheme();
  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const t = useTranslations();
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > START_PAGE ? Math.max(0, (1 + page) * rowsPerPage - totalCount) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size='medium'>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={(e) => {
                handleSelectAllClick && handleSelectAllClick(e, rows, keyPrimary);
              }}
              onRequestSort={handleRequestSort}
              rowCount={totalCount}
              headCells={headCells}
              showCheckBox={showCheckBox}
              sxTableHead={sxTableHead}
              sortByIsActived={sortByIsActived}
            />
            <TableBody>
              {!isLoading &&
                rows.map((row, index) => {
                  const rowAny = row as any;
                  const isItemSelected = isSelected(rowAny?.[keyPrimary] || '');
                  const labelId = `enhanced-table-checkbox-${index}-${keyPrimary}` as any;

                  return (
                    <TableRow
                      hover
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={labelId}
                      selected={isItemSelected}
                    >
                      {showCheckBox && (
                        <TableCell padding='checkbox'>
                          <Checkbox
                            color='primary'
                            checked={isItemSelected}
                            onClick={() => {
                              handleCheckBox && handleCheckBox(row, keyPrimary);
                            }}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                      )}
                      {headCells.map((hc, idx) => {
                        if (hc.isHided) {
                          return null;
                        }

                        return (
                          <TableCell key={`cell-${index}-${idx}`}>
                            {hc?.Cell?.(rowAny) || rowAny?.[hc?.id]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              {!isLoading && totalCount === 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={headCells.length}>
                    <CommonStyles.Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: 1,
                      }}
                    >
                      <CommonIcons.InboxIcon
                        fontSize='large'
                        htmlColor={theme.colors?.bgneutral500}
                      />
                      <CommonStyles.Typography
                        variant='body1'
                        sx={{ color: theme.colors?.bgneutral500 }}
                      >
                        {t('Common.noData')}
                      </CommonStyles.Typography>
                    </CommonStyles.Box>
                  </TableCell>
                </TableRow>
              )}

              {isLoading && (
                <TableRow
                  style={{
                    height: 53,
                  }}
                >
                  <TableCell colSpan={headCells.length}>
                    <CommonStyles.Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: 1,
                      }}
                    >
                      <CommonStyles.Loading />
                    </CommonStyles.Box>
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default TableCommon;
