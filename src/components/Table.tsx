import { Product } from "@prisma/client";

import Fuse from "fuse.js";
import { ChangeEvent, useEffect, useState } from "react";

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import AddProduct from "@/src/components/AddProduct";
import { RefreshType } from "@/src/components/withRefresh";

// TODO: create Table module (folder Table with index.tsx)

// TODO: move Fuse configurations to helper file in Table module
const SEARCH_MIN_NUM_CHAR = 3;
const fuse_options = {
  minMatchCharLength: SEARCH_MIN_NUM_CHAR,
  threshold: 0.1,
  keys: ["sku", "name", "category"]
};
const fuse = new Fuse([] as Product[], fuse_options);

const columns: GridColDef[] = [
  { field: "sku", headerName: "SKU", width: 200 },
  { field: "name", headerName: "Name", width: 300 },
  { field: "category", headerName: "Category", width: 300 },
  // { field: "id", headerName: "ID", width: 500, hideable: true },
];

// TODO: move helper component to Table module
function DataGridTitle() {
  return (
    <Box style={{ marginTop: 10, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Typography variant="h5">Products</Typography>
    </Box>
  );
}

function Table({ products, refreshData, isRefreshing }: { products: Product[]; refreshData: RefreshType; isRefreshing: boolean; }) {
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  // TODO: can probably move Fuse related calls to custom Fuse hooks
  useEffect(() => {
    fuse.setCollection(products);
  }, [products]);

  useEffect(() => {
    if (searchText.length < 3) {
      setFilteredProducts(products);
    } else {
      const results = fuse.search(searchText).map(result => result.item);
      setFilteredProducts(results);
    }
  }, [products, searchText, setFilteredProducts]);

  const handleSearch = (event: ChangeEvent) => {
    const target = event.target as typeof event.target & { value: string; };
    setSearchText(target.value);
  };

  // TODO: rethink AddProduct component -- probably give it a renderAsModal option so it can be used as a modal or not
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const addProduct = () => { setIsAddingProduct(true); };
  const closeAddProduct = () => { setIsAddingProduct(false); };
  const refreshDataAndClose = () => { refreshData(); closeAddProduct(); };
  const minCharError = 0 < searchText.length && searchText.length < 3;
  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        <TextField label="Search for a product" variant="outlined" value={searchText} onChange={handleSearch} error={minCharError} helperText="Minimum 3 characters" />
        <Box height={"80%"}><Button variant="contained" onClick={addProduct}>Add product</Button></Box>
      </Stack>
      <DataGrid
        components={{ Toolbar: DataGridTitle }}
        rows={filteredProducts}
        columns={columns}
        autoHeight
        loading={isRefreshing}
      />
      <Modal
        open={isAddingProduct}
        onClose={closeAddProduct}
      >
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <AddProduct refreshData={refreshDataAndClose} />
        </Box>
      </Modal>
    </div>
  );
}

export default Table;
