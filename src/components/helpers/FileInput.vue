<template>
    <div>
        <q-uploader
        url="http://localhost:4444/upload"
        label="Custom header" 
        multiple
        accept=".jpg, .png, image/*"
        dark text-color="black" color="accent"
      >
        <template v-slot:header="scope">
          <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
            <q-btn v-if="scope.queuedFiles.length > 0" icon="clear_all" @click="scope.removeQueuedFiles" round dense flat >
              <q-tooltip>Elimina todo</q-tooltip>
            </q-btn>
            <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat >
              <q-tooltip>Remove Uploaded Files</q-tooltip>
            </q-btn>
            <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" ></q-spinner>
            <div class="col">
              <div class="q-uploader__title">Sube tus imagenes</div>
              <div class="q-uploader__subtitle">{{ scope.uploadSizeLabel }} / {{ scope.uploadProgressLabel }}</div>
            </div>
            <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>
              <q-uploader-add-trigger ></q-uploader-add-trigger>
              <q-tooltip>Añade tus imagenes</q-tooltip>
            </q-btn>
            <q-btn v-if="scope.canUpload" icon="cloud_upload" @click="scope.upload" round dense flat >
              <q-tooltip>Sube tus imagenes</q-tooltip>
            </q-btn>
  
            <q-btn v-if="scope.isUploading" icon="clear" @click="scope.abort" round dense flat >
              <q-tooltip>Cancelar</q-tooltip>
            </q-btn>
          </div>
        </template>
      </q-uploader>
    </div>
</template>