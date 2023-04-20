import { PrismaClient, Product } from "@prisma/client";
import withRefresh, { RefreshableType } from "@/src/components/withRefresh";
import Table from "@/src/components/Table";

// NOTE: can only be used by server side, so OK in top level nextjs page components but not
// FE components in the /components folder -- using here to leverage SSR
// TODO: also add read db action to /api/product so don't need to call at top level of app (i.e. <Home />)
const prisma = new PrismaClient();

export async function getServerSideProps() {
  const products = await prisma.product.findMany();
  // console.log("getting products", products.length);

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
      <Table products={products} refreshData={refreshData} isRefreshing={isRefreshing} />
    </div>
  );
}

export default withRefresh(Home);
