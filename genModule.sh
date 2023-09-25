#!/bin/bash

# Prompt for the name of the module
read -p "Enter the name of the module: " module_name

capitalized_modulename="$(echo "${module_name:0:1}" | tr '[:lower:]' '[:upper:]')${module_name:1}"


# Check if dir has already exists
SOURCEDIR="src/modules/$module_name"
if [ -d $SOURCEDIR ]
then
echo "Directory $SOURCEDIR already exists."
else
cd "src/modules"
mkdir $module_name

cd $module_name

# Create interface
touch "$module_name.interface.ts"
echo "import { AxiosResponse } from 'axios';
import { PaginationFilters, ResponseCommon, ResponseList } from 'interfaces/common';

export interface Product {
  id: string | number;
  title?: string;
  description?: string;
  price?: number;
  brand?: string;
  category?: string;
  rating?: number;
  stock?: number;
  discountPercentage?: number;
  images: string[];
}

export interface $capitalized_modulename {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
}

export type RequestGetList"$capitalized_modulename" = PaginationFilters;
export type ResponseGetList"$capitalized_modulename" = AxiosResponse<ResponseCommon<ResponseList<"$capitalized_modulename">>>;

export type RequestGetDetail"$capitalized_modulename" = string | number;
export type ResponseGetDetail"$capitalized_modulename" = AxiosResponse<ResponseCommon<Product>>;

export type RequestCreate"$capitalized_modulename" = { body: Omit<Product, 'id'> };
export type ResponseCreate"$capitalized_modulename" = AxiosResponse<Product>;

export type RequestUpdate"$capitalized_modulename" = { id: string | number; body: Omit<Product, 'id'> };
export type ResponseUpdate"$capitalized_modulename" = AxiosResponse<Product>;

export type RequestDelete"$capitalized_modulename" = { id: string | number };
export type ResponseDelete"$capitalized_modulename" = AxiosResponse<{}>;" > "$module_name.interface.ts"

# Create Services
touch "$module_name.services.ts"
echo "import httpService from 'services/httpService';
import {
  RequestGetDetail"$capitalized_modulename",
  ResponseGetDetail"$capitalized_modulename",
  RequestGetList"$capitalized_modulename",
  ResponseGetList"$capitalized_modulename",
  RequestDelete"$capitalized_modulename",
  ResponseDelete"$capitalized_modulename",
  RequestUpdate"$capitalized_modulename",
  ResponseUpdate"$capitalized_modulename",
  RequestCreate"$capitalized_modulename",
  ResponseCreate"$capitalized_modulename",
} from './$module_name.interface';

class "$capitalized_modulename"Services {
  getList"$capitalized_modulename"(body: RequestGetList"$capitalized_modulename"): Promise<ResponseGetList"$capitalized_modulename"> {
    return httpService.axios.get(
      \`https://dummyjson.com/products?skip=\${body.page}&limit=\${body.perPage}\`
    );
  }

  getDetail"$capitalized_modulename"(id: RequestGetDetail"$capitalized_modulename"): Promise<ResponseGetDetail"$capitalized_modulename"> {
    return httpService.axios.get(\`https://dummyjson.com/products/\${id}\`);
  }

  create"$capitalized_modulename"({ body }: RequestCreate"$capitalized_modulename"): Promise<ResponseCreate"$capitalized_modulename"> {
    return httpService.axios.post(\`https://dummyjson.com/products\`, body);
  }

  update"$capitalized_modulename"({ id, body }: RequestUpdate"$capitalized_modulename"): Promise<ResponseUpdate"$capitalized_modulename"> {
    return httpService.axios.patch(\`https://dummyjson.com/products/\${id}\`, body);
  }

  delete"$capitalized_modulename"({ id }: RequestDelete"$capitalized_modulename"): Promise<ResponseDelete"$capitalized_modulename"> {
    return httpService.axios.delete(\`https://dummyjson.com/products/\${id}\`);
  }
}

export default new "$capitalized_modulename"Services();" > "$module_name.services.ts"


mkdir hooks
cd "hooks"
touch "useGetDetail$capitalized_modulename.ts"
echo "import { useCallback, useEffect, useState } from 'react';
import { ResponseGetDetail"$capitalized_modulename" } from '../"$module_name".interface';
import "$capitalized_modulename"Services from '../"$module_name".services';

const useGetDetail$capitalized_modulename = (id: number | string, isTrigger: boolean = false) => {
  const [data, setData] = useState<ResponseGetDetail"$capitalized_modulename">();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const callApi = useCallback(() => {
    return "$capitalized_modulename"Services.getDetail"$capitalized_modulename"(id);
  }, []);

  const transformResponse = useCallback((response: ResponseGetDetail"$capitalized_modulename") => {
    if (response) {
      setData(response);
    }
  }, []);

  const refetch = useCallback(async () => {
    try {
      const response = await callApi();
      transformResponse(response);
    } catch (error) {
      setError(error);
    }
  }, [id]);

  useEffect(() => {
    let shouldSetData = true;

    if (isTrigger) {
      (async () => {
        try {
          setLoading(true);
          const response = await callApi();
          if (shouldSetData) {
            transformResponse(response);
          }
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      })();

      return () => {
        shouldSetData = false;
      };
    }
  }, [isTrigger]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export default useGetDetail$capitalized_modulename;" > "useGetDetail$capitalized_modulename.ts"

# Create hook list
touch "useGetList$capitalized_modulename.ts"
echo "import { useEffect, useState, useCallback } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { useSave } from 'stores/useStore';
import { showError } from 'helpers/toast';

import { RequestGetList"$capitalized_modulename", ResponseGetList"$capitalized_modulename" } from '../"$module_name".interface';
import "$capitalized_modulename"Services from '../"$module_name".services';

/**
 * SNIPPET GENERATED
 * GUIDE
 * Snippet for infinite scroll with page + rowsPerPage
 * Maybe you should check function:
 * - interface Request / Response
 * - parseRequest
 * - checkConditionPass
 * - fetch
 * - refetch
 */

//* Check parse body request
const parseRequest = (filters: RequestGetList"$capitalized_modulename") => {
  return cloneDeep({
    page: filters.page,
    perPage: filters.perPage,
  });
};

const useGetList"$capitalized_modulename" = (
  filters: RequestGetList"$capitalized_modulename",
  options: { isTrigger?: boolean; refetchKey?: string } = { isTrigger: true, refetchKey: '' }
) => {
  //! State
  const { isTrigger = true, refetchKey = '' } = options;

  const save = useSave();
  const [data, setData] = useState<ResponseGetList"$capitalized_modulename">();
  const [isLoading, setLoading] = useState(false);
  const [isRefetching, setRefetching] = useState(false);
  const [isFetchingPage, setFetchingPage] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [hasMore, setHasMore] = useState(false);

  //! Function
  const fetch: () => Promise<ResponseGetList"$capitalized_modulename"> | undefined = useCallback(() => {
    if (!isTrigger) {
      return;
    }

    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const nextFilters = parseRequest(filters);
          const response = await "$capitalized_modulename"Services.getList"$capitalized_modulename"(nextFilters);
          resolve(response);
        } catch (error) {
          setError(error);
          reject(error);
        }
      })();
    });
  }, [filters, isTrigger]);

  const checkConditionPass = useCallback(
    (response: ResponseGetList"$capitalized_modulename") => {
      //* Check condition of response here to set data
      setData(response);
      setHasMore((filters.page || 1) < response?.data?.data?.totalPage);
    },
    [filters.page]
  );

  const fetchChangePage = useCallback(
    async (shouldSetData: boolean) => {
      setFetchingPage(true);
      const response = await fetch();
      if (shouldSetData && response) {
        checkConditionPass(response);
      }

      setFetchingPage(false);
    },
    [fetch, checkConditionPass]
  );

  //* Refetch implicity (without changing loading state)
  const refetch = useCallback(async () => {
    try {
      setRefetching(true);
      const nextFilters = parseRequest(filters);
      const response = await "$capitalized_modulename"Services.getList"$capitalized_modulename"(nextFilters);
      checkConditionPass(response);
      setRefetching(false);
    } catch (error: any) {
      if (!error.isCanceled) {
        showError(error);
      }
    }
  }, [filters]);

  useEffect(() => {
    if (refetchKey) {
      save(refetchKey, refetch);
    }
  }, [save, refetchKey, refetch]);

  //* Refetch with changing loading state
  const refetchWithLoading = useCallback(
    async (shouldSetData: boolean) => {
      try {
        setLoading(true);
        const response = await fetch();
        if (shouldSetData && response) {
          checkConditionPass(response);
        }
        setLoading(false);
      } catch (error) {
        showError(error);
        setLoading(false);
      }
    },
    [fetch, checkConditionPass]
  );

  useEffect(() => {
    let shouldSetData = true;
    if (filters.page !== undefined && filters.page <= 0) {
      refetchWithLoading(shouldSetData);
      return;
    }

    //* If offset > 0 -> fetch more
    fetchChangePage(shouldSetData);

    return () => {
      shouldSetData = false;
    };
  }, [filters.page, fetchChangePage, refetchWithLoading]);

  return {
    data,
    isLoading,
    error,
    refetch,
    refetchWithLoading,
    isRefetching,
    isFetchingPage,
    hasMore,
    setData,
  };
};

export default useGetList"$capitalized_modulename";" > "useGetList"$capitalized_modulename".ts"

fi