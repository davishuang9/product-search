import { FormEvent } from "react";

export default function AddProduct({ refreshData }: { refreshData: () => void; }) {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      sku: { value: string; };
      name: { value: string; };
      category: { value: string; };
    };

    const productData = {
      sku: target.sku.value,
      name: target.name.value,
      category: target.category.value,
    };

    await fetch("/api/product", {
      method: "POST", headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify(productData)
    });
    refreshData();
  };

  return (
    <div>
      <div>Add a product</div>
      <form onSubmit={handleSubmit}>
        <label>SKU: <input type="text" name="sku" /></label><br />
        <label>Name: <input type="text" name="name" /></label><br />
        <label>Category: <input type="text" name="category" /></label><br />
        <input type="submit" value="Create" />
      </form>
    </div>
  );
}
