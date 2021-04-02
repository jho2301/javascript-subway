import { AUTH } from '../../../constants/alertMessage';
import { requestSignup } from '../../../api/auth';
import { $, showElement } from '../../../utils/dom';
import { routeTo } from '../../../utils/history';
import { login } from '../../../services/auth';

const handleSignup = async event => {
  event.preventDefault();

  const { email, password, name } = event.target.elements;

  const user = {
    email: email.value,
    password: password.value,
    name: name.value,
  };

  const response = await requestSignup(user);

  if (!response.success) {
    alert(response.message);
    return;
  }

  alert(AUTH.SIGNUP_SUCCESS);

  const isSuccess = await login(email.value, password.value, { keepLogin: false });

  if (!isSuccess) {
    routeTo('/login');
    return;
  }

  showElement($('#nav'));
  routeTo('/');
};

export default handleSignup;
