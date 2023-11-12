import { Card, CardMedia, CardContent } from '@mui/material';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonStyles from 'components/CommonStyles';
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

  //! Function
  const handleNavigate = (id?: number) => () => {
    router.push(`/article/${id}`);
  };

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
      onClick={handleNavigate(data?.id)}
    >
      <CardMedia sx={{ height: 140 }} image={data?.articleBackground?.url} title='green iguana' />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <CommonStyles.Badge
          label={data?.topicArticle}
          category={data?.topicArticle || Topic.EVENTS}
        />
        <CommonStylesClient.Typography type='title20'>
          {data?.titleArticle}
        </CommonStylesClient.Typography>
      </CardContent>
    </Card>
  );
};

export default CardHomePage;
