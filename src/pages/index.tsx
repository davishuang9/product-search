import { PrismaClient, Product } from "@prisma/client";
import withRefresh, { RefreshableType } from "@/src/components/withRefresh";
import Table from "../components/Table";
import AddProduct from "../components/AddProduct";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const products = await prisma.product.findMany();

  return {
    props: {
      apiData: {
        products
      }
    }
  };
}

function Home({ apiData: { products }, refreshData, isRefreshing }: { apiData: { products: Product[]; }; } & RefreshableType) {
  return (
    <div>
      <AddProduct refreshData={refreshData} />
      <br />
      <div>
        {isRefreshing ? "Loading..." : <Table products={products} />}
      </div>
    </div>
  );
}

export default withRefresh(Home);
