const Customers = async () => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return <h1>El contenido del Customers</h1>;
};

export default Customers;
