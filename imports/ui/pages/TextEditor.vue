<script setup>
import { ref, onMounted, onUpdated } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { Meteor } from "meteor/meteor";
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";
import { toNumber } from "lodash";
import FilesCollection from "../../../imports/api/files/collection";
const router = useRouter();
const route = useRoute();

const editmode = ref(false);

const form = ref({
  price: 0,
  data: "",
  photoId: "",
  categoryId: "",
  name: "",
});

const editor = useEditor({
  editorProps: {
    attributes: {
      class:
        "border border-gray-400 p-4 min-h-[12rem] max-h-[12rem] overflow-y-auto ",
    },
  },
  content: form.value.data,
  extensions: [StarterKit, Underline, Blockquote, TextStyle, Color],
  onUpdate: ({ editor }) => {
    form.value.data = editor.getHTML();
  },
});

watch(
  () => form.value.data,
  (newData) => {
    editor.value.commands.setContent(newData);
  }
);

function resetForm() {
  form.value = {
    price: 0,
    data: "",
    photoId: "",
    categoryId: "",
    name: "",
  };
}

//photo
const refInputEl = ref();

const filePhotos = ref("");
const getfilePhotos = ref([]);

const handleChange = ($event) => {
  const target = $event.target;
  if (target && target.files) {
    filePhotos.value = target.files[0];
    // uploadToServer(target.files[0])
  }
};

const onUploadToServer = () => {
  const uploadInstance = FilesCollection.insert({
    file: filePhotos.value,
    chunkSize: "dynamic",
    onError(err) {
      console.log("Error during upload:", err);
    },
  });
  uploadInstance.on("end", function (error, fileObj) {
    if (error) {
      console.log("Upload error:", error);
    } else {
      console.log("Uploaded fileObj:", fileObj);
      console.log("end this", this.config);
      form.value.photoId = this.config.fileId;
      createProduct();
    }
  });
};

const getFileUploads = () => {
  Meteor.call("findImageData", (err, res) => {
    if (res) {
      getfilePhotos.value = res;
      console.log("get", getfilePhotos.value);
    } else {
      console.log(err);
    }
  });
};

const category = ref([]);

function getCategory() {
  Meteor.call("category.find", (err, result) => {
    if (result) {
      category.value = result;
    } else {
      console.log(err);
    }
  });
}

function createProduct() {
  form.value.price = toNumber(form.value.price);
  Meteor.call("products.create", form.value, (err, result) => {
    if (result) {
      // router.push("/admin");
      console.log("create successfully");
      resetForm();
    } else {
      console.log(err);
    }
  });
}

function findProductById() {
  Meteor.call("product.findById", { id: route.params.id }, (err, result) => {
    if (result) {
      form.value = result;
      console.log(form.value);
    } else {
      console.log(err);
    }
  });
}

const submit = () => {
  if (filePhotos.value) {
    onUploadToServer();
  } else {
    createProduct();
  }
};

onMounted(() => {
  getCategory();
  if (route.params.id) {
    editmode.value = true;
  }
  console.log(editmode.value);

  getFileUploads();
});
console.log(form.value.photoId);

findProductById();
</script>

<template>
  <v-container>
    <v-card class="w-50 mx-auto">
      <!-- <v-card-text class="d-flex mt-3"> -->
      <!-- 👉 Avatar -->
      <!-- <V-avatar
          rounded="lg"
          size="120"
          class="me-6 rounded-lg border-sm"
          :image="getPhoto()"
        /> -->

      <!-- 👉 Upload Photo -->

      <!-- <form class="d-flex flex-column justify-center gap-5">
          <div class="d-flex flex-wrap gap-2">
            <VBtn color="primary" @click="refInputEl?.click()">
              <VIcon icon="mdi-upload" class="d-sm-none" />
              <span class="d-none d-sm-block">Upload Course photo</span>
            </VBtn> -->

      <!-- <input
              ref="refInputEl"
              type="file"
              name="file"
              accept=".jpeg,.png,.jpg,GIF"
              hidden
              @input="handleChange"
            /> -->

      <!-- <VBtn
              type="reset"
              color="error"
              variant="tonal"
              @click="resetAvatar"
            > -->
      <!-- <span class="d-none d-sm-block">Reset</span>
              <VIcon icon="mdi-delete-alert" class="d-sm-none" />
            </VBtn>
          </div> -->

      <!-- <p class="text-body-1 mb-0">
            Allowed JPG, GIF or PNG. Max size of 800K
          </p>
        </form>
      </v-card-text> -->

      <v-card-text>
        <v-row>
          <v-col cols="12" md="12">
            <section
              v-if="editor"
              class="buttons flex items-center flex-wrap gap-x-4 border border-t border-l border-r border-black p-4"
            >
              <button
                @click="editor.chain().focus().toggleBold().run()"
                :disabled="!editor.can().chain().focus().toggleBold().run()"
                :class="{ 'bg-gray-200': editor.isActive('bold') }"
                class="p-1"
              >
                <v-icon> mdi-format-bold </v-icon>
              </button>

              <button
                @click="editor.chain().focus().toggleItalic().run()"
                :disabled="!editor.can().chain().focus().toggleItalic().run()"
                :class="{ 'bg-gray-200': editor.isActive('italic') }"
                class="p-1 font-weight-bold rounded"
                style="font-style: italic"
              >
                <v-icon> mdi-format-italic </v-icon>
              </button>

              <button
                @click="editor.chain().focus().toggleUnderline().run()"
                :disabled="
                  !editor.can().chain().focus().toggleUnderline().run()
                "
                :class="{ 'bg-gray-200': editor.isActive('underline') }"
                class="p-1 font-weight-bold rounded"
                style="font-style: italic"
              >
                <v-icon> mdi-format-underline </v-icon>
              </button>

              <button
                type="button"
                @click="
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                "
                :class="{
                  'bg-gray-200 rounded': editor.isActive('heading', {
                    level: 1,
                  }),
                }"
                class="p-1"
              >
                H1
              </button>

              <button
                type="button"
                @click="
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                "
                :class="{
                  'bg-gray-200 rounded': editor.isActive('heading', {
                    level: 2,
                  }),
                }"
                class="p-1"
              >
                H2
              </button>

              <button
                type="button"
                @click="editor.chain().focus().toggleBulletList().run()"
                :class="{
                  'bg-gray-200 rounded': editor.isActive('bulletList'),
                }"
                class="p-1"
              >
                <v-icon> mdi-format-list-bulleted </v-icon>
              </button>

              <!-- List Enter

              <button
                @click="editor.chain().focus().sinkListItem('listItem').run()"
                :disabled="!editor.can().sinkListItem('listItem')"
              >
                Sink list item
              </button> -->

              <button
                type="button"
                @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{
                  'bg-gray-200 rounded': editor.isActive('orderedList'),
                }"
                class="p-1"
              >
                <v-icon>mdi-format-list-numbered</v-icon>
              </button>

              <button
                type="button"
                class="p-1 disabled:text-gray-400"
                @click="editor.chain().focus().undo().run()"
                :disabled="!editor.can().chain().focus().undo().run()"
              >
                <v-icon> mdi-undo </v-icon>
              </button>

              <button
                type="button"
                @click="editor.chain().focus().redo().run()"
                :disabled="!editor.can().chain().focus().redo().run()"
                class="p-1 disabled:text-gray-400"
              >
                <v-icon> mdi-redo </v-icon>
              </button>

              <input
                type="color"
                @input="
                  editor.chain().focus().setColor($event.target.value).run()
                "
                :value="editor.getAttributes('textStyle').color"
              />

              //color

              <!-- <button
                class="bg-red p-2"
                @click="editor.chain().focus().setColor('#f70909').run()"
                :class="{
                  'is-active': editor.isActive('textStyle', {
                    color: '#f70909',
                  }),
                }"
              ></button> -->

              <!-- <button
                class="bg-blue p-2"
                @click="editor.chain().focus().setColor('#0943f7').run()"
                :class="{
                  'is-active': editor.isActive('textStyle', {
                    color: '#0943f7',
                  }),
                }"
              ></button> -->
            </section>
            <EditorContent :editor="editor" />
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              placeholder="Select Category"
              label="Select Category"
              variant="outlined"
              :items="category"
              item-title="name"
              item-value="_id"
              v-model="form.categoryId"
            />
          </v-col>

          <!-- 👉 price -->
          <v-col md="6" cols="12">
            <VTextField
              placeholder="200"
              label="Price"
              variant="outlined"
              v-model.number="form.price"
              type="number"
              clearable
            />
          </v-col>

          <!-- 👉 Name -->
          <v-col md="6" cols="12">
            <VTextField
              placeholder="200"
              label="Name"
              variant="outlined"
              v-model="form.name"
              clearable
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              label="Avatar"
              placeholder="Pick an avatar"
              variant="outlined"
              prepend-icon="mdi-camera"
              @change="handleChange"
            ></v-file-input>
          </v-col>

          <v-col cols="12" md="6">
            <v-btn @click="submit">Submit</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <div v-for="file in getfilePhotos" :key="file._id">
      <img :src="file.pat" alt="" />
      {{ file.path }}
    </div>

    <!-- <div v-html="form.data" class="tiptap"></div> -->
  </v-container>
</template>
<style>
.tiptap h1 {
  font-size: 32px;
  font-weight: bold;
}

.tiptap h2 {
  font-size: 25px;
  font-weight: bold;
}

.tiptap ul li {
  list-style-type: disc;
  margin-left: 22px;
}
.tiptap ol li {
  list-style: decimal;
  margin-left: 22px;
}
</style>
