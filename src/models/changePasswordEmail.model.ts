import { RequestChangePasswordEmail } from 'modules/forgotPassword/forgotPassword.interface';

class ChangePasswordEmailModel {
  static parseBodyToRequest(value: RequestChangePasswordEmail) {
    const email = value?.email;
    const password = value?.password;
    const confirmPassword = value?.confirmPassword;
    const role = value?.role;

    const result = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      role: role,
    };

    return result;
  }
}

export default ChangePasswordEmailModel;
