import { apiRoot } from './getProjectInfo';

const findUser = async (email: string): Promise<string> => {
  try {
    const { body } = await apiRoot
      .customers()
      .get({
        queryArgs: {
          where: `email="${email}"`,
        },
      })
      .execute();

    if (body.results.length === 0) {
      console.log('This email address has not been registered.');
      return 'This email address has not been registered.';
    } else {
      return '';
    }
  } catch (error) {
    console.error(error);
    return 'Error occurred while searching for the email.';
  }
};

const findRegisteredUser = async (email: string): Promise<string> => {
  try {
    const { body } = await apiRoot
      .customers()
      .get({
        queryArgs: {
          where: `email="${email}"`,
        },
      })
      .execute();

    if (body.results.length === 0) {
      return '';
    } else {
      console.log('This email address already registered.');
      return 'This email address already registered.';
    }
  } catch (error) {
    console.error(error);
    return 'Error occurred while searching for the email.';
  }
};

export { findUser, findRegisteredUser };
