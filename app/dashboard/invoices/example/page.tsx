const Example = () => {
  const create = async (data: FormData) => {
    "use server";
    console.log("data :>> ", data);
  };

  return (
    <form action={create}>
      <input type="text" placeholder="Nombre" name="nombre" className="border border-red-300" />
      <input type="number" placeholder="Phone" name="phone" className="border border-red-300" />
      <button type="submit">Button</button>
    </form>
  );
};

export default Example;
