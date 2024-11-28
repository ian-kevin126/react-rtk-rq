import {
    useQuery,
    useMutation,
    useQueryClient,
    UseQueryResult,
    UseMutationResult,
  } from "@tanstack/react-query";
  import { useDispatch } from "react-redux";
  import {
    Item,
    addItem as addItemAction,
    updateItem as updateItemAction,
    deleteItem as deleteItemAction,
  } from "./itemsSlice";
import apiClient from "../../api/apiClient";
  
  export const useFetchItems = (): UseQueryResult<Item[], Error> =>
    useQuery({
      queryKey: ["items"],
      // 1. 初始加载：当使用 useQuery hook 的组件首次挂载时。
      // 2. 过时数据：当缓存中的数据被视为过时时。这由 staleTime 配置决定。
      // 3. 窗口焦点：当窗口重新获得焦点时，如果 refetchOnWindowFocus 设置为 true。
      // 4. 间隔重新获取：如果设置了 refetchInterval，则以固定的间隔重新获取。
      // 5. 手动重新获取：当您使用 queryClient.invalidateQueries 或 queryClient.refetchQueries 等方法手动重新获取查询时。
      // 6. 网络重新连接：当网络重新连接时，如果 refetchOnReconnect 设置为 true。
      queryFn: async (): Promise<Item[]> => {
        const response = await apiClient.get("/items");
        return response.data;
      },
      // 缓存保持有效的时间
      // 如果未达到 staleTime，则在再次调用 useFetchItems 时，React Query 将不会触发新请求。
      // 相反，它将从其缓存中提供数据，因为数据仍被视为“新鲜”。
      // 如果服务器数据在 staleTime 期间发生变化，React Query 不会自动知道这一点
      // 因为它不会检查服务器，直到缓存被标记为“过时”或触发手动刷新（例如，queryClient.invalidateQueries 或 refetch）。或使用 refetchInterval
      staleTime: 5 * 60 * 1000,
      // 触发 refetchOnWindowFocus 的场景
      // 1. 切换选项卡：当用户从另一个浏览器选项卡切换回您的应用程序正在运行的选项卡时。
      // 2. 切换窗口：当用户从另一个应用程序窗口（例如，不同的浏览器窗口或不同的应用程序）切换回您的应用程序正在运行的浏览器窗口时。
      // 3. 最小化/恢复：当用户最小化浏览器窗口然后恢复它时。
      // 4. 锁定/解锁屏幕：当用户锁定其计算机屏幕然后解锁时，使浏览器窗口重新获得焦点。
      refetchOnWindowFocus: true,
      // 使用 refetchInterval：定期自动轮询服务器。
      refetchInterval: 10000,
      // 如果缓存中的数据仍然有效（不是过时的），React Query 将直接返回它，而不会发出新的 API 请求。
      // 在这种情况下，由于未执行 queryFn，因此不会触发 onSuccess。
      // 如果 queryFn 返回的数据与现有缓存数据匹配，React Query 会通过不将查询标记为“已更新”来优化性能。由于没有感知到数据更改，因此不会调用 onSuccess 回调。
    });
  
  export const useAddItem = (): UseMutationResult<
    Item,
    Error,
    { title: string }
  > => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
      mutationFn: async (newItem: { title: string }): Promise<Item> => {
        const response = await apiClient.post("/items", newItem);
        return response.data;
      },
      // 仅当突变成功时才会调用此方法，
      // 与 onSettled 不同，无论突变是否成功，都会调用此方法
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["items"] });
        dispatch(addItemAction(data));
      },
    });
  };
  
  export const useUpdateItem = (): UseMutationResult<
    Item,
    Error,
    { id: number; title: string }
  > => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
      mutationFn: async (updatedItem: {
        id: number;
        title: string;
      }): Promise<Item> => {
        const response = await apiClient.put(
          `/items/${updatedItem.id}`,
          updatedItem
        );
        return response.data;
      },
      onSuccess: (data) => {
        console.log("🚀 ~ data:", data);
        queryClient.invalidateQueries({ queryKey: ["items"] });
        dispatch(updateItemAction(data));
      },
    });
  };
  
  export const useDeleteItem = (): UseMutationResult<void, Error, number> => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
      mutationFn: async (id: number): Promise<void> => {
        await apiClient.delete(`/items/${id}`);
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ["items"] });
        dispatch(deleteItemAction(id));
      },
    });
  };
  