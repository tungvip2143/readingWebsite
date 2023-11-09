import { FormArticleValues } from 'app/[locale]/admin/articles/Dialog/AddForm';
import { IMG_URL } from 'constants/apiUrls';
import { Article } from 'modules/article/article.interface';

class ArticleModel {
  static parseInitialValues(item?: Article) {
    // const avatarImg = item?.articleBackground ? `${IMG_URL}/${item?.articleBackground}` : undefined;
    const avatarImg = item?.articleBackground ? item?.articleBackground : undefined;

    const result = {
      titleArticle: item?.titleArticle || '',
      subtitleArticle: item?.subtitleArticle || '',
      articleBackground: avatarImg,
      topicArticle: item?.topicArticle || undefined,
      contentArticle: item?.contentArticle || '',
    };

    return result as FormArticleValues;
  }

  static parseBodyToRequest(value: FormArticleValues, avatar?: string) {
    const result = {};

    return result;
  }
}

export default ArticleModel;
