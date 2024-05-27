export default function UsersProfileAdresses() {
  return (
    <>
      <div>
        <label htmlFor="default-street">Street: </label>
        <input
          id="default-street"
          name="default-street"
          type="text"
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="default-city">City: </label>
        <input
          id="default-city"
          name="default-city"
          type="text"
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="default-postal-code">Postal code: </label>
        <input
          id="default-postal-code"
          name="default-postal-code"
          type="text"
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="default-country">Country: </label>
        <input
          id="default-country"
          name="default-country"
          type="text"
          autoComplete="off"
        />
      </div>
    </>
  );
}
