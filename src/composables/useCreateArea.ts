import { reactive, toRefs } from "vue";
import axiosInstance from "@/services/axiosInstance";
import type { Area } from "@/models/area.model";

interface State {
  data: Area | null;
  isLoading: boolean;
  error: unknown;
}

function useCreateArea() {
  const state = reactive<State>({
    data: null,
    isLoading: false,
    error: null,
  });

  const create = async (
    name: string,
    description?: string,
    imageUrl?: string,
  ): Promise<void> => {
    try {
      state.isLoading = true;
      const response = await axiosInstance.post<Area>("/areas", {
        name,
        description,
        imageUrl,
      });
      state.data = response.data;
    } catch (error) {
      state.error = error;
    } finally {
      state.isLoading = false;
    }
  };

  return {
    ...toRefs(state),
    create,
  };
}

export default useCreateArea;
