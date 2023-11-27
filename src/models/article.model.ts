import { FormArticleValues } from 'app/[locale]/admin/articles/Dialog/AddForm';
import { IMG_URL } from 'constants/apiUrls';
import { Article, RequestCreateArticle } from 'modules/article/article.interface';

class ArticleModel {
  static parseInitialValues(item?: Article) {
    const avatarImg = item?.article_background
      ? `${IMG_URL}/${item?.article_background}`
      : undefined;
    // const avatarImg = item?.article_background ? item?.article_background : undefined;

    const result = {
      titleArticle: item?.title || '',
      subtitleArticle: item?.sub_title || '',
      articleBackground: avatarImg,
      topic: item?.topic || undefined,
      contentArticle: item?.content || '',
      isHaveSubtitle: !!item?.sub_title,
    };

    return result as FormArticleValues;
  }

  static parseBodyToRequest(value: FormArticleValues, avatar?: string) {
    const result = {
      title: value?.titleArticle,
      sub_title: value?.subtitleArticle,
      topic: value?.topic,
      article_background: avatar,
      content: value?.contentArticle,
    };

    return result as RequestCreateArticle;
  }
}

export default ArticleModel;
