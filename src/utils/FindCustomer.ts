import { apiRoot } from './getProjectInfo';

const findCustomer = async (email: string): Promise<string> => {
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

export default findCustomer;
