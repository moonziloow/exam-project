import { Card, Text, Button } from "rsuite";
import { useEffect, useState } from "react";
import useProduct from "../../store/store";

const Products = () => {
  const storeProducts = useProduct((state) => state.products);
  const removeProduct = useProduct((state) => state.removeProduct);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (storeProducts.length > 0) {
      setProducts(storeProducts);
    } else {
      const localProducts =
        JSON.parse(localStorage.getItem("products")) || [];
      setProducts(localProducts);
    }
  }, [storeProducts]);

  const handleDelete = (id) => {
    removeProduct(id);

    const localProducts =
      JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = localProducts.filter(p => p.id !== id);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  if (products.length === 0) {
    return <Text muted>Hozircha product yo‘q</Text>;
  }

  return (
    <div style={wrapperStyle}>
      {products.map((product) => (
        <Card key={product.id} width={320} shaded style={{ margin: 12 }}>
          <Card.Header>
            <Text size="lg" bold>
              {product.title}
            </Text>
          </Card.Header>

          <Card.Body>
            {product.description}
          </Card.Body>

          <Card.Footer style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Text muted>Price: {product.price} $</Text>
            <Button appearance="subtle" color="red" onClick={() => handleDelete(product.id)}>
              Delete
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
};

const wrapperStyle = {
  display: "flex",
  flexWrap: "wrap",
};

export default Products;