import React, { useCallback } from 'react';
import { cloneDeep, isArray, uniq } from 'lodash';
import { PaginationFilters, OrderType, Order } from 'interfaces/common';
import { RowCommon, START_PAGE } from 'constants/common';

export type InitialFiltersSearch<T> = T & PaginationFilters;

function useFiltersHandler<T>(initialFilters: InitialFiltersSearch<T>) {
  const [filters, setFilters] = React.useState(initialFilters);
  const [rowsSelected, setRowsSelected] = React.useState<(string | number)[]>([]);

  const increasePage = useCallback(() => {
    setFilters((prev) => {
      const nextFilters = cloneDeep(prev);
      if (nextFilters) {
        nextFilters['page'] = (nextFilters?.['page'] || START_PAGE) + 1;
      }
      return nextFilters;
    });
  }, []);

  const goToPage = useCallback((page: number) => {
    setFilters((prev) => {
      const nextFilters = cloneDeep(prev);
      if (nextFilters) {
        nextFilters['page'] = page;
      }

      return nextFilters;
    });
  }, []);

  const handleChangePage = useCallback((_: unknown, nextPage: number) => {
    setFilters((prev) => {
      const nextFilters = cloneDeep(prev);
      if (nextFilters) {
        nextFilters['page'] = nextPage + 1;
      }

      return nextFilters;
    });
  }, []);

  const changeRowPerPage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => {
      const nextValue = Number(e.target.value);
      const nextFilters = cloneDeep(prev);
      if (nextFilters) {
        nextFilters['perPage'] = nextValue;
        nextFilters['page'] = START_PAGE;
      }

      return nextFilters;
    });
  }, []);

  const resetToInitialFilters = useCallback(() => {
    setFilters(cloneDeep(initialFilters));
  }, [initialFilters]);

  const handleSelectAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, rows: RowCommon[]) => {
      setRowsSelected((prev) => {
        if (isArray(prev) && prev.length === rows.length) {
          return [];
        }

        const nextRows = rows.map((el) => el.id);
        return nextRows;
      });
    },
    []
  );

  const handleCheckBox = useCallback((row: RowCommon) => {
    setRowsSelected((selected) => {
      if (selected.includes(row.id)) {
        return cloneDeep(selected).filter((el) => el !== row.id);
      }

      return uniq([...selected, row.id]);
    });
  }, []);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    sortField: string | number | symbol
  ) => {
    setFilters((prev) => {
      const nextFilters = cloneDeep(prev);
      if (nextFilters) {
        if ('sortOrder' in nextFilters) {
          const isAsc = nextFilters.sortOrder === Order.asc;
          nextFilters['sortOrder'] = isAsc ? Order.desc : Order.asc;
        }

        if ('sortField' in nextFilters) {
          nextFilters['sortField'] = sortField;
        }
      }
      return nextFilters;
    });
  };

  const handleSearch = useCallback((nextFilters: InitialFiltersSearch<T>) => {
    const nextFiltersTemp = cloneDeep(nextFilters);
    if ('page' in nextFiltersTemp) {
      nextFiltersTemp['page'] = START_PAGE;
    }

    setFilters(nextFiltersTemp);
  }, []);

  return {
    filters,
    rowsSelected,
    setRowsSelected,
    setFilters,
    increasePage,
    goToPage,
    changeRowPerPage,
    resetToInitialFilters,
    handleSelectAll,
    handleCheckBox,
    handleChangePage,
    handleRequestSort,
    handleSearch,
  };
}

export default useFiltersHandler;
