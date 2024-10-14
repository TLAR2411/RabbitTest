<script setup>
import { ref } from "vue";

// const data = ref([
//     {
//         img:"https://cccomputerkh.com/C-ASUS/X1400.jpg",
//         price:800,
//         version:"13th Gen Intel i7-13700HX 16C/24T",
//         ram:"DDR5 8GB UP TO 16GB FREE",
//         storage:"512GB PCIe Gen 4",

//     }
// ]),
</script>

<template>
  <v-card class="w-75 mx-auto mt-5 pa-4">
    <v-card-title class="text-red text-h5 font-weight-bold"
      >Computer Model</v-card-title
    >
    <v-card-text class="mt-5">
      <v-divider :thickness="2" color="black"></v-divider>
      <v-row>
        <v-col
          cols="12"
          md="3"
          v-for="i in 8"
          :key="i"
          class="border border-secondary"
        >
          <v-img
            class="mx-auto"
            :width="180"
            src="https://cccomputerkh.com/C-ASUS/X1400.jpg"
          ></v-img>
          <v-img
            class="mx-auto"
            :width="180"
            src="https://cccomputerkh.com/ori.gif"
          ></v-img>
          <p class="text-red text-h4 text-center my-2 font-weight-bold">800$</p>
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
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
