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
      <a-form-item
        label="Area Name"
        name="areaName"
        :rules="[{ required: true, message: 'Please input your area name!' }]"
      >
        <a-input v-model:value="formState.areaName" />
      </a-form-item>

      <a-form-item label="Description" name="desc">
        <a-textarea v-model:value="formState.desc" />
      </a-form-item>

      <a-form-item label="Upload Cover" name="cover">
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

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
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
import { reactive, ref } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { message, type UploadProps } from "ant-design-vue";
import type { FormState } from "./new-area-from.types.ts";

interface Emits {
  (event: "submit", values: FormState): void;
}

const emit = defineEmits<Emits>();

const formState = reactive<FormState>({
  areaName: "",
  desc: "",
  cover: "",
});

const coverPreviewVisible = ref(false);
const coverPreviewImage = ref<string>("");
const coverPreviewTitle = ref<string>("");

const onFinish = (values: FormState): void => {
  message.success("Area created successfully!");
  emit("submit", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
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
