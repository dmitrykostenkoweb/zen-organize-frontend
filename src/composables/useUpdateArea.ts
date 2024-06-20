import { reactive, toRefs } from "vue";
import type { AxiosError } from "axios";
import axiosInstance from "@/services/axiosInstance";
import type { Area } from "@/models/area.model";

interface State {
  data: Area | null;
  isLoading: boolean;
  error: null | AxiosError;
}

function useUpdateArea() {
  const state = reactive<State>({
    data: null,
    isLoading: false,
    error: null,
  });

  const update = async (
    id: number,
    name: string,
    description?: string,
    imageUrl?: string,
  ): Promise<void> => {
    try {
      const response = await axiosInstance.put<Area>(`/areas/${id}`, {
        name,
        description,
        imageUrl,
      });
      state.data = response.data;
    } catch (error) {
      state.error = error as AxiosError;
      console.error(error);
    } finally {
      state.isLoading = false;
    }
  };

  return {
    ...toRefs(state),
    update,
  };
}

export default useUpdateArea;
