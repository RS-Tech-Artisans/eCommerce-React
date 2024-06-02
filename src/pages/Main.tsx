import { Link } from 'react-router-dom';

export const Main = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        height: '100vh',
        color: 'rgb(111 231 255)',
      }}
    >
      <h1>Main page</h1>
      <h2>Oops !!!</h2>
      <h3>Content is not ready at this moment...</h3>
      <p>
        follow to<Link to="/catalog"> Catalog</Link>
      </p>
    </div>
  );
};
