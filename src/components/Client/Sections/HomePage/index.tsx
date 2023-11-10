import CommonStylesClient from 'components/Client/CommonStylesClient';
import React from 'react';
import CardHomePage from './components/CardHomePage';
import { Article } from 'modules/article/article.interface';
import { Topic } from 'constants/common';

const data: Article[] = [
  {
    id: 1,
    titleArticle:
      'A Legacy Of Innovation, Healthcare Transformation In Vietnam With Karine Labaky, Sanofi',
    articleBackground: {
      url: 'https://png.pngtree.com/thumb_back/fw800/background/20230519/pngtree-pictures-of-cats-wallpaper-hd-3d-image_2572751.jpg',
      content: '',
    },
    topicArticle: Topic.EVENTS,
    subtitleArticle: '',
    contentArticle: '',
    createdAt: '',
  },
  {
    id: 2,
    titleArticle:
      'A Legacy Of Innovation, Healthcare Transformation In Vietnam With Karine Labaky, Sanofi',
    articleBackground: {
      url: 'https://c.wallhere.com/photos/44/b9/2016x1172_px_babay_wallpapers_Batman_city_landscapes_cool_images_cute_babies_famous_people_hd_desktop_images-801527.jpg!d',
      content: '',
    },
    topicArticle: Topic.THREE_F,
    subtitleArticle: '',
    contentArticle: '',
    createdAt: '',
  },
  {
    id: 3,
    titleArticle:
      'A Legacy Of Innovation, Healthcare Transformation In Vietnam With Karine Labaky, Sanofi',
    articleBackground: {
      url: 'https://c.wallhere.com/photos/33/cd/1280x744_px_cat_images_cat_photos_cat_wallpapers_cats_cutties_feline_pictures_kittens-803046.jpg!d',
      content: '',
    },
    topicArticle: Topic.TOP_PLUS,
    subtitleArticle: '',
    contentArticle: '',
    createdAt: '',
  },
  {
    id: 4,
    titleArticle:
      'A Legacy Of Innovation, Healthcare Transformation In Vietnam With Karine Labaky, Sanofi',
    articleBackground: {
      url: 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/04/anh-meo-buon-1.jpg?resize=800%2C541&ssl=1',
      content: '',
    },
    topicArticle: Topic.STUDY_CORNER,
    subtitleArticle: '',
    contentArticle: '',
    createdAt: '',
  },
  {
    id: 5,
    titleArticle:
      'A Legacy Of Innovation, Healthcare Transformation In Vietnam With Karine Labaky, Sanofi',
    articleBackground: {
      url: 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/04/anh-meo-buon-1.jpg?resize=800%2C541&ssl=1',
      content: '',
    },
    topicArticle: Topic.THE_FACE_DEWEY,
    subtitleArticle: '',
    contentArticle: '',
    createdAt: '',
  },
  {
    id: 6,
    titleArticle:
      'A Legacy Of Innovation, Healthcare Transformation In Vietnam With Karine Labaky, Sanofi',
    articleBackground: {
      url: 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/04/anh-meo-buon-1.jpg?resize=800%2C541&ssl=1',
      content: '',
    },
    topicArticle: Topic.SHOCK,
    subtitleArticle: '',
    contentArticle: '',
    createdAt: '',
  },
  {
    id: 7,
    titleArticle:
      'A Legacy Of Innovation, Healthcare Transformation In Vietnam With Karine Labaky, Sanofi',
    articleBackground: {
      url: 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/04/anh-meo-buon-1.jpg?resize=800%2C541&ssl=1',
      content: '',
    },
    topicArticle: Topic.CHARITY,
    subtitleArticle: '',
    contentArticle: '',
    createdAt: '',
  },
];
const HomePage = () => {
  return (
    <CommonStylesClient.Box sx={{ margin: '1.5rem 0 1.5rem 1.5rem' }}>
      <CommonStylesClient.Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {data?.map((item) => {
          return <CardHomePage data={item} key={item?.id} />;
        })}
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default HomePage;
