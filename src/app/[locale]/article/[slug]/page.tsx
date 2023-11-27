'use client';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { MAX_WIDTH_CONTAINER, Topic } from 'constants/common';
import React from 'react';
import BreadcrumbArticle from '../components/BreadcrumbArticle';
import useGetDetailArticle from 'modules/article/hooks/useGetDetailArticle';
import { useParams } from 'next/navigation';
import { IMG_URL } from 'constants/apiUrls';

const ArticleDetail = () => {
  const params = useParams();
  const idArticle = params?.slug;

  //! State
  const { data, isLoading } = useGetDetailArticle(idArticle || 0, !!idArticle);
  const createMarkup = () => ({ __html: data?.content || '' });
  const article_background = `${IMG_URL}/${data?.article_background}`;
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        maxWidth: MAX_WIDTH_CONTAINER,
      }}
    >
      <BreadcrumbArticle topic={data?.topic} />
      <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <CommonStylesClient.Typography type='pcHeading3'>
          {data?.title}
        </CommonStylesClient.Typography>
        <CommonStylesClient.Typography type='title16Medium'>
          {data?.sub_title}
        </CommonStylesClient.Typography>
        <CommonStylesClient.Box>
          <img
            src={article_background}
            alt={data?.title}
            style={{ width: '100%', height: 'auto' }}
          />
          {/* <CommonStylesClient.Typography type='normal'>
            {data?.article_background}
          </CommonStylesClient.Typography> */}
        </CommonStylesClient.Box>
        <CommonStylesClient.Box>
          <CommonStylesClient.Box dangerouslySetInnerHTML={createMarkup()} />
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default ArticleDetail;
