import { useRouter } from "next/router";
import { ComponentType, useEffect, useState } from "react";

export type RefreshType = () => void;
export type RefreshableType = { apiData: any; refreshData: RefreshType; isRefreshing: boolean; };

// TODO: probably only useful for nextjs page components at the moment.. possible to create a page related
// refresh to leverage server side props and non-page refresh as well
export default function withRefresh(Component: ComponentType<RefreshableType>) {
  function RefreshableComponent(props: { apiData: any; }) {
    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(true);

    const refreshData = () => {
      // console.log("refreshing");
      router.replace(router.asPath);
      setIsRefreshing(true);
    };

    useEffect(() => {
      if (props.apiData) setIsRefreshing(false);
    }, [props.apiData, setIsRefreshing]);

    return <Component {...props} refreshData={refreshData} isRefreshing={isRefreshing} />;
  }

  return RefreshableComponent;
};
