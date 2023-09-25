import httpService from 'services/httpService';
import {
  ReponseUpdateProfileTourGuide,
  RequestUpdateProfileTourGuide,
  ResponseGetProfile,
} from './profileLocalFriend.interface';
import apiUrls from 'constants/apiUrls';

class ProfileServices {
  getProfile(): Promise<ResponseGetProfile> {
    return httpService.axios.get(`${apiUrls.PROFILE.GET_PROFILE}`);
  }
  updateProfileTourGuide({
    body,
  }: RequestUpdateProfileTourGuide): Promise<ReponseUpdateProfileTourGuide> {
    return httpService.axios.patch(`${apiUrls.PROFILE.UPDATE_TOUR_GUIDE_PROFILE}`, body);
  }
}

export default new ProfileServices();
