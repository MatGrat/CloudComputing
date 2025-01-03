import GetProducts from '../../hooks/produkt-hook';

function Home() {
  const {data: products, loading, error } = GetProducts();

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
          {products.map(product => (
            <li key={product.ProductID}>{product.ProductName}</li>
          ))}
      </ul>
    </div>
  );
}

export default Home;