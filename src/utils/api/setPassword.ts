import { apiRoot } from './BuildClient';
import { Customer } from '@commercetools/platform-sdk';
import { ClientResponse } from '@commercetools/platform-sdk';
import { MyApiError } from '../Interfaces';
import { useState } from 'react';

export const useUpdateCurrentPassword = () => {
  const [enterPasswordResult, setEnterPasswordResult] =
    useState<ClientResponse<Customer> | null>(null);
  const [errorUpdatePassword, seterrorUpdatePassword] = useState<MyApiError | null>(null);

  const UpdatePassword = async (
    version: number,
    currentPassword: string,
    newPassword: string
  ) => {
    console.log('currentPassword', currentPassword)
    try {
      const response: ClientResponse<Customer> = await apiRoot
        .me()
        .password()
        .post({
          body: {
            version,
            currentPassword,
            newPassword,
          },
        })
        .execute();

      setEnterPasswordResult(response);
      seterrorUpdatePassword(null);
      console.log(enterPasswordResult);
    } catch (caughtError) {
      console.log(caughtError);
      seterrorUpdatePassword(caughtError as MyApiError);
      setEnterPasswordResult(null);
    }
  };

  return {
    errorUpdatePassword,
    UpdatePassword,
  };
};
