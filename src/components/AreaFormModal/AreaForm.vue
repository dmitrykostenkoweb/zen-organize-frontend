<template>
  <div>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item v-if="area" label="Delete Area">
        <a-button
          danger
          size="small"
          type="default"
          :icon="h(DeleteOutlined)"
          @click="deleteAreaHandler"
        />
      </a-form-item>
      <a-form-item
        label="Area Name"
        name="name"
        :rules="[{ required: true, message: 'Please input your area name!' }]"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item label="Description" name="description">
        <a-textarea v-model:value="formState.description" />
      </a-form-item>

      <a-form-item label="Upload Cover" name="imageUrl">
        <a-upload
          action="paste image url save here"
          list-type="picture-card"
          :max-count="1"
          @preview="handlePreviewCover"
        >
          <div>
            <PlusOutlined />
            <div style="margin-top: 8px">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-flex align="center" justify="end">
        <a-form-item>
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-flex>
    </a-form>

    <a-modal
      @cancel="handleCancelUpload"
      :open="coverPreviewVisible"
      :title="coverPreviewTitle"
      :footer="null"
    >
      <img alt="example" style="width: 100%" :src="coverPreviewImage" />
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { h, reactive, ref } from "vue";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { message, type UploadProps } from "ant-design-vue";
import { useCreateArea, useDeleteArea } from "@/composables";
import type { Area } from "@/models";

interface Props {
  area?: Area;
}

type FormState = Omit<Area, "areaId">;

const props = defineProps<Props>();

const { create, error: createError } = useCreateArea();
const { deleteArea, error: deleteError } = useDeleteArea();

const formState = reactive<FormState>({
  name: props.area?.name || "",
  description: props.area?.description || "",
  imageUrl: props.area?.imageUrl || "",
});

const coverPreviewVisible = ref(false);
const coverPreviewImage = ref<string>("");
const coverPreviewTitle = ref<string>("");

const onFinish = async (values: FormState): Promise<void> => {
  await create(values.name, values.description, values.imageUrl);

  if (createError.value) message.error(createError.value as string);
  else message.success("AreaCard created successfully!");
};

const onFinishFailed = (errorInfo: any) => {
  message.error("Failed:", errorInfo);
};

const deleteAreaHandler = (): void => {
  if (props.area?.areaId) deleteArea(props.area?.areaId);

  if (deleteError.value) message.error(deleteError.value as string);
  else message.success("AreaCard deleted successfully!");
};

//Upload Cover
const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const handlePreviewCover = async (file: UploadProps["fileList"][number]) => {
  if (!file.url && !file.preview)
    file.preview = await getBase64(file.originFileObj);

  coverPreviewImage.value = file.url || file.preview;
  coverPreviewTitle.value =
    file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
  coverPreviewVisible.value = true;
};

const handleCancelUpload = () => {
  coverPreviewVisible.value = false;
  coverPreviewTitle.value = "";
};
</script>
