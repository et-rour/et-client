<template>
  <div class="my-container mb-40 md:mb-0">
    <h2 class="my-title-2 text-center md:text-left mb-8">
      {{ $t("cookies.title") }}
    </h2>
    <p class="my-3">https://www.espaciotemporal.org/</p>
    
    <p class="my-3">{{ $t("cookies.parragraph_1") }}</p>
    <p class="my-3">{{ $t("cookies.parragraph_2") }}</p>
    <p class="my-3">{{ $t("cookies.parragraph_3") }}</p>
    <p class="my-3">{{ $t("cookies.parragraph_4") }}</p>
    <h3 class="my-3 font-semibold">{{ $t("cookies.parragraph_5") }}</h3>
    <p class="my-3">{{ $t("cookies.parragraph_6") }}</p>
    <h3 class="my-3 font-semibold">{{ $t("cookies.parragraph_7") }}</h3>
    <p class="my-3">{{ $t("cookies.parragraph_8") }}</p>
    <p class="my-3">{{ $t("cookies.parragraph_9") }}</p>
    <p class="my-3">{{ $t("cookies.parragraph_10") }}</p>

    <p>Google Analytics: http://analytics.google.com/</p>
    <p class="my-3"> {{ $t("cookies.parragraph_11") }} </p>
    <p class="my-3"> {{ $t("cookies.parragraph_12") }} </p>
    <p class="my-3"> {{ $t("cookies.parragraph_13") }} </p>
    <p class="my-3"> {{ $t("cookies.parragraph_14") }} </p>
    
    <p>version: {{ appVersion }}</p>
  </div>
  
</template>

<script>
import { version } from "../../../package.json";
export default {
  metaInfo: {title: "Política de cookies"},
  data(){
    return{
      appVersion: version,
    }
  }
};

</script>

<style></style>
