import { reactive, toRefs } from "vue";
import axiosInstance from "@/services/axiosInstance";
import type { Area } from "@/models/area.model";

interface State {
  data: Area | null;
  isLoading: boolean;
  error: unknown;
}

function useGetAreaById() {
  const state = reactive<State>({
    data: null,
    isLoading: false,
    error: null,
  });

  const get = async (id: number): Promise<void> => {
    try {
      const response = await axiosInstance.get<Area>(`/areas/${id}`);
      state.data = response.data;
    } catch (error) {
      state.error = error;
    } finally {
      state.isLoading = false;
    }
  };

  return {
    ...toRefs(state),
    get,
  };
}

export default useGetAreaById;
