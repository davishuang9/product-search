import { useRouter } from "next/router";
import { ComponentType, useEffect, useState } from "react";

export type RefreshableType = { apiData: any; refreshData: () => void; isRefreshing: boolean; };

export default function withRefresh(Component: ComponentType<RefreshableType>) {
  function RefreshableComponent(props: { apiData: {}; }) {
    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const refreshData = () => {
      router.replace(router.asPath);
      setIsRefreshing(true);
    };

    useEffect(() => {
      setIsRefreshing(false);
    }, [props.apiData]);

    return <Component {...props} refreshData={refreshData} isRefreshing={isRefreshing} />;
  }

  return RefreshableComponent;
};
