import { Card, CardMedia, CardContent } from '@mui/material';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonStyles from 'components/CommonStyles';
import { IMG_URL } from 'constants/apiUrls';
import { Topic } from 'constants/common';
import { Article } from 'modules/article/article.interface';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  data?: Article;
}
const CardHomePage = ({ data }: Props) => {
  //! State
  const router = useRouter();

  const handleNavigate = (id?: number) => () => {
    router.push(`/article/${id}`);
  };
  const article_background = `${IMG_URL}/${data?.article_background}`;
  //! Render
  return (
    <Card
      sx={{
        maxWidth: '22rem',
        borderRadius: '0.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        cursor: 'pointer',
      }}
      onClick={handleNavigate(data?._id)}
    >
      <img
        style={{ maxWidth: '20rem', width: '100%', height: '100%', maxHeight: '20rem' }}
        src={article_background}
        alt='background'
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <CommonStyles.Badge label={data?.topic} category={data?.topic || Topic.EVENTS} />
        <CommonStylesClient.Typography type='title20'>{data?.title}</CommonStylesClient.Typography>
      </CardContent>
    </Card>
  );
};

export default CardHomePage;
