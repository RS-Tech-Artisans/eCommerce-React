import { Customer } from '@commercetools/platform-sdk';

const UsersProfileAdresses = (
  userData: Customer | undefined,
  ind: number,
  flagEditData: boolean,
  id: string
) => {
  return (
    <>
      <div>
        <label htmlFor={id + "Street"}>Street: </label>
        <input
          id={id + "Street"}
          name="default-street"
          type="text"
          autoComplete="off"
          defaultValue={userData?.addresses[ind]?.streetName}
          disabled={!flagEditData && true}
        />
      </div>
      <div>
        <label htmlFor={id + "City"}>City: </label>
        <input
          id={id + "City"}
          name="default-city"
          type="text"
          autoComplete="off"
          defaultValue={userData?.addresses[ind]?.city}
          disabled={!flagEditData && true}
        />
      </div>
      <div>
        <label htmlFor={id + "postalCode"}>Postal code: </label>
        <input
          id={id + "postalCode"}
          name="default-postal-code"
          type="text"
          autoComplete="off"
          defaultValue={userData?.addresses[ind]?.postalCode}
          disabled={!flagEditData && true}
        />
      </div>
      <div>
        <label htmlFor={id + "Country"}>Country: </label>
        <input
          id={id + "Country"}
          name="default-country"
          type="text"
          autoComplete="off"
          value={userData?.addresses[ind]?.country + 'A'}
          disabled={!flagEditData && true}
        />
      </div>
    </>
  );
};

const EmptyUsersProfileAdresses = (id: string) => {
  return (
    <>
      <div>
        <label htmlFor={id + 'Street'}>Street: </label>
        <input
          id={id + 'Street'}
          name="default-street"
          type="text"
          autoComplete="off"
          required
        />
      </div>
      <div>
        <label htmlFor={id + 'City'}>City: </label>
        <input
          id={id + 'City'}
          name="default-city"
          type="text"
          autoComplete="off"
          required
        />
      </div>
      <div>
        <label htmlFor={id + 'Postal'}>Postal code: </label>
        <input
          id={id + 'Postal'}
          name="default-postal-code"
          type="text"
          autoComplete="off"
          required
        />
      </div>
      <div>
        <label htmlFor={id + 'Country'}>Country: </label>
        <input
          id={id + 'Country'}
          name="default-country"
          type="text"
          autoComplete="off"
          required
        />
      </div>
    </>
  );
};

export { UsersProfileAdresses, EmptyUsersProfileAdresses };
