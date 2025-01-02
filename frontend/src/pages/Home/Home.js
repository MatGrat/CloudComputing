import GetProducts from '../../service/GetProducts';

function Home() {
  const {data: products, loading, error } = GetProducts();

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
          {products.map(product => (
            <li key={product.id}>{product.name}</li>
          ))}
      </ul>
    </div>
  );
}

export default Home;