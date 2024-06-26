export const EmptyUsersProfileAdresses = (id: string) => {
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
