import httpService from 'services/httpService';
import {
  RequestGetDetailArticle,
  ResponseGetDetailArticle,
  RequestGetListArticle,
  ResponseGetListArticle,
  RequestDeleteArticle,
  ResponseDeleteArticle,
  RequestUpdateArticle,
  ResponseUpdateArticle,
  RequestCreateArticle,
  ResponseCreateArticle,
} from './article.interface';
import apiUrls from 'constants/apiUrls';
import queryString from 'query-string';

class ArticleServices {
  getListArticle(param: RequestGetListArticle): Promise<ResponseGetListArticle> {
    return httpService.axios.get(
      `${apiUrls.ARTICLE}?${queryString.stringify(param, {
        skipEmptyString: true,
      })}`
    );
  }

  getDetailArticle(id: RequestGetDetailArticle): Promise<ResponseGetDetailArticle> {
    return httpService.axios.get(`${apiUrls.ARTICLE}/${id}`);
  }

  createArticle(body: RequestCreateArticle): Promise<ResponseCreateArticle> {
    return httpService.axios.post(`${apiUrls.ARTICLE}`, body);
  }

  updateArticle({ id, body }: RequestUpdateArticle): Promise<ResponseUpdateArticle> {
    return httpService.axios.patch(`${apiUrls.ARTICLE}/${id}/update-tour-guide`, body);
  }

  deleteArticle({ id }: RequestDeleteArticle): Promise<ResponseDeleteArticle> {
    return httpService.axios.delete(`${apiUrls.ARTICLE}/${id}`);
  }
  uploadFile(body: FormData) {
    return httpService.axios.post(`${apiUrls.UPLOAD_FILE_SINGLE}`, body, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  }
}

export default new ArticleServices();
