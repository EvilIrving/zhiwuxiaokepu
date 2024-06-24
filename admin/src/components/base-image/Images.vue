<script setup name="Images">

const { src, qrcode } = defineProps(['src', 'qrcode'])
const url = src || qrcode

// let options = { percentage: 25, width: 50, height: 50 }
// let urlThumbnail = ''

// urlThumbnail = await src ? imageThumbnail(qrcode, options) : imageThumbnail({ uri: src, options });
// console.log(urlThumbnail);


</script>
<template>
    <el-image style="width: 100px; height: 50px" :src="url" fit="contain" preview-teleported hide-on-click-modal
        :zoom-rate="1.2" :max-scale="4" :min-scale="0.6" :preview-src-list="[url]" :initial-index="4">
        <template #placeholder>
            <div class="image-slot">加载中<span class="dot">...</span></div>
        </template>
        <template #error>
            <div class="image-slot">-</div>
        </template>
        <!-- <template #viewer>
            <div class="image-slot">No Image<span class="dot">...</span></div>
        </template> -->
    </el-image>
</template>