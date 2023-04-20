import { Product } from "@prisma/client";

import Fuse from "fuse.js";
import { ChangeEvent, useEffect, useState } from "react";

const SEARCH_MIN_NUM_CHAR = 3;
const fuse_options = {
  minMatchCharLength: SEARCH_MIN_NUM_CHAR,
  threshold: 0.1,
  keys: ["sku", "name", "category"]
};
const fuse = new Fuse([] as Product[], fuse_options);

export default function Table({ products }: { products: Product[]; }) {
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    fuse.setCollection(products);
  }, []);

  useEffect(() => {
    if (searchText.length < 3) {
      setFilteredProducts(products);
    } else {
      const results = fuse.search(searchText).map(result => result.item);
      setFilteredProducts(results);
    }
  }, [searchText]);

  const handleSearch = (event: ChangeEvent) => {
    const target = event.target as typeof event.target & { value: string; };
    setSearchText(target.value);
  };

  return (
    <div>
      <div>
        <label>Search (minimum {SEARCH_MIN_NUM_CHAR} characters): <input type="text" name="search" value={searchText} onChange={handleSearch} /></label>
      </div>
      Products:
      {filteredProducts.map(product =>
        <div key={product.id}>
          <div>SKU: {product.sku}</div>
          <div>Name: {product.name}</div>
          <div>Category: {product.category}</div>
          <br />
        </div>
      )}
    </div>
  );
}