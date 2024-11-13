<script setup>
import { onMounted, ref } from "vue";
import { Meteor } from "meteor/meteor";

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
onMounted(() => {
  getData();
});
</script>

<template>
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
            v-if="i.photoId || i.newPhotoId"
            :height="130"
            :width="180"
            :src="i.url"
          ></v-img>

          <v-img
            class="mx-auto"
            v-else
            :height="130"
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

          <div v-html="i.data" class="tiptap mt-3"></div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<!-- 
          <p class="font-weight-bold">- 13th Gen Intel Core i5-13420H 8C 12T</p>
          <p>
            - Ram : 8GB DDR5 |
            <span class="text-red font-weight-bold">256GB M.2 PCIe 4.0</span>
          </p>
          <p>
            - Display :
            <span class="text-blue font-weight-bold"
              >14" FHD IPS Acer ComfyView™</span
            >
          </p>
          <p>
            - VGA :
            <span class="text-red font-weight-bold"
              >Intel® UHD Graphics for 13th Gen</span
            >
          </p>
          <p>
            - Feature :
            <span class="text-blue font-weight-bold"
              >FingerPrint , Killer™ Wi-Fi 6E</span
            >
          </p>
          <p>- Thunderbolt™ 4 / Backlit key / HD camera</p>
          <p>
            -
            <span class="font-weight-bold">Windows 11 Pro Recommendation</span>
          </p>
          <p>
            -
            <span class="font-weight-bold text-red">50Wh Li-io battery</span>
            3-pin 65 W AC Adapter
          </p>
          <p>- 1.5 Kg | Color : Blue / Gray</p>
          <p>
            - <span class="font-weight-bold">Code: UNTCT004A1-D10P35D25</span>
          </p>
          <p>-----------------------</p>
          <p>
            - Free :
            <span class="font-weight-bold">Backpack, Wireless Mouse, Pad</span>
          </p>
          <p>
            - Free :
            <span class="font-weight-bold">Cleaning Kit Water</span>
          </p> -->
