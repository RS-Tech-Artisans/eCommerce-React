export const Main = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        height: '100vh',
        color: 'rgb(111 231 255)',
      }}
    >
      <h2 style={{ marginTop: '20px' }}>
        Use this PromoCode: <span style={{ color: 'red' }}>RSS-2024</span>, for
        getting -20% discount on all cart price
      </h2>
      <h2>
        Use promoCode: <span style={{ color: 'red' }}>QLED</span> for getting
        -5% to all cart if total amount cart greating than 5000 USD
      </h2>
    </div>
  );
};
