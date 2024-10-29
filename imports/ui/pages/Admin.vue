<script setup>
import { onMounted, ref } from "vue";
import { Meteor } from "meteor/meteor";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const dataGet = ref([]);

function getData() {
  Meteor.call("productJoinCategory", (err, result) => {
    if (result) {
      dataGet.value = result;
      console.log("data", dataGet.value);
    } else {
      console.log(err);
    }
  });
}

function deleteProduct(id) {
  Meteor.call("product.remove", { id: id }, (err, result) => {
    if (result) {
      console.log("delete success");
      getData();
    } else {
      console.log(err);
    }
  });
}

function editProduct(id) {
  router.push(`/form/${id}`);
}

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="w-75 mx-auto mt-6" align="end">
    <v-btn flat class="bg-green" to="/form">
      <v-icon>mdi-plus</v-icon>
      ADD
    </v-btn>
  </div>
  <v-card
    class="w-75 mx-auto mt-5 pa-4"
    v-for="(cat, catidx) in dataGet"
    :key="catidx"
    elevation="3"
  >
    <v-card-title class="text-red text-h5 font-weight-bold">
      {{ cat._id }}
    </v-card-title>
    <v-card-text class="mt-5">
      <v-row>
        <v-col
          cols="12"
          md="3"
          class="border border-secondary"
          v-for="(i, idx) in cat.products"
          :key="idx"
        >
          <v-img
            class="mx-auto"
            v-if="i.photo_path"
            :width="180"
            :src="i.photo_path"
          ></v-img>

          <v-img
            class="mx-auto"
            v-else
            :width="180"
            src="https://media.istockphoto.com/id/1055079680/id/vektor/kamera-foto-linear-hitam-tidak-seperti-gambar-yang-tersedia.jpg?s=612x612&w=0&k=20&c=JwsOavJ9ghdrwbjvJTUsAUEODcVv5-SXQdxhjEsJ_V4="
          ></v-img>
          <v-img
            class="mx-auto"
            :width="180"
            src="https://cccomputerkh.com/ori.gif"
          ></v-img>
          <p class="text-red text-h4 text-center my-2 font-weight-bold">
            {{ i.price }}$
          </p>
          <p class="text-blue text-h6 text-center my-2 font-weight-bold">
            {{ i.name }}
          </p>

          <div v-html="i.data" class="tiptap mt-3"></div>

          <v-btn
            flat
            class="mt-3 bg-yellow-lighten-4"
            @click="editProduct(i._id)"
          >
            <v-icon> mdi-pen </v-icon>
          </v-btn>
          <v-btn
            flat
            class="mt-3 bg-red-lighten-4 ml-2"
            @click="deleteProduct(i._id)"
          >
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
