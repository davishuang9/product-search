import { FormEvent } from "react";
import { RefreshType } from "@/src/components/withRefresh";
import { Button, TextField, Typography } from "@mui/material";

export default function AddProduct({ refreshData }: { refreshData: RefreshType; }) {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { sku, name, category } = event.target as typeof event.target & {
      sku: { value: string; };
      name: { value: string; };
      category: { value: string; };
    };

    if (!sku.value || !name.value || !category.value) return;
    const productData = { sku: sku.value, name: name.value, category: category.value };

    await fetch("/api/product", {
      method: "POST", headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify(productData)
    });
    refreshData();
  };

  // TODO: show error for blank fields in form -- will need to make the form controlled
  return (
    <div>
      <Typography variant="h5">Add a product</Typography><br />
      <form onSubmit={handleSubmit}>
        <TextField label="SKU" name="sku" /><br /><br />
        <TextField label="Name" name="name" /><br /><br />
        <TextField label="Category" name="category" /><br /><br />
        <Button type="submit" variant="outlined">Create</Button>
      </form>
    </div>
  );
}
