import { useToast } from '@baldeweg/ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'

const dir = ref('./')
const elements = ref(null)

export function useDirectory(emit) {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const { t } = useI18n()

  const { add } = useToast()

  const dirname = ref('')
  const isLoading = ref(false)
  const isUploading = ref(false)
  const isDragging = ref(false)

  const listElements = () => {
    isLoading.value = true
    return request('get', '/api/directory/', null, { dir: dir.value }).then(
      (res) => {
        elements.value = res.data
        isLoading.value = false
      }
    )
  }

  const removeElement = (file) => {
    return request('delete', '/api/directory/', null, {
      name: file,
      path: dir.value,
    })
      .then(() => {
        listElements()
        add({
          type: 'success',
          body: t('success_removing'),
        })
      })
      .catch(() => {
        add({
          type: 'error',
          body: t('error_removing'),
        })
      })
  }

  const createDir = () => {
    return request('post', '/api/directory/new', null, {
      name: dirname.value,
      path: dir.value,
    })
      .then(() => {
        listElements()
        add({
          type: 'success',
          body: t('success_create_dir'),
        })

        dirname.value = ''
      })
      .catch(() => {
        add({
          type: 'error',
          body: t('error_create_dir'),
        })
      })
  }

  const editElement = (orig, target) => {
    return request('put', '/api/directory/edit', null, {
      orig,
      target,
      path: dir.value,
    })
      .then(() => {
        listElements()
        add({
          type: 'success',
          body: t('success_rename'),
        })
      })
      .catch(() => {
        add({
          type: 'error',
          body: t('error_rename'),
        })
      })
  }

  const uploadCover = (id, url) => {
    return request('post', '/api/directory/cover/' + id, { url }).then(() => {
      emit('update')
    })
  }

  const uploadImage = (event) => {
    isUploading.value = true

    const file = event.target.files[0]
    const form = new FormData()
    form.append('image', file)

    return request('post', '/api/directory/upload', form, { dir: dir.value })
      .then(() => {
        listElements()
        add({
          type: 'success',
          body: t('success_upload'),
        })

        isUploading.value = false
      })
      .catch(() => {
        add({
          type: 'error',
          body: t('error_upload'),
        })

        isUploading.value = false
      })
  }

  return {
    dir,
    elements,
    dirname,
    isLoading,
    isUploading,
    isDragging,
    listElements,
    removeElement,
    createDir,
    editElement,
    uploadCover,
    uploadImage,
  }
}
