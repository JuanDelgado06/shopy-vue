import Vue from 'vue'

import './styles/quasar.styl'
import lang from 'quasar/lang/es.js'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import {
  Quasar, 
  QLayout,
  QHeader,
  QFooter,
  QBadge,
  QCard,
  QCardSection,
  QCardActions,
  QDrawer,
  QDialog,
  QPageContainer,
  QPage,
  QPageSticky,
  QToolbar,
  QToolbarTitle,
  QTable,
  QTh,
  QTr,
  QTd,
  QToggle,
  QTooltip,
  QBtn,
  QList,
  QIcon,
  QItem,
  QItemSection,
  QItemLabel,
  QInnerLoading,
  QSpinner,
  QSpinnerPuff,
  QSpinnerHourglass,
  QScrollArea,
  QSpace,
  QSelect,
  QUploader,
  QUploaderAddTrigger,
  QForm,
  QInput,
  AddressbarColor,
  ClosePopup,
  Notify
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QFooter,
    QBadge,
    QCard,
    QCardSection,
    QCardActions,
    QDrawer,
    QDialog,
    QPageContainer,
    QPage,
    QPageSticky,
    QToolbar,
    QToolbarTitle,
    QTable,
    QTh,
    QTr,
    QTd,
    QToggle,
    QTooltip,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QInnerLoading,
    QSpinner,
    QSpinnerPuff,
    QSpinnerHourglass,
    QScrollArea,
    QSpace,
    QSelect,
    QUploader,
    QUploaderAddTrigger,
    QForm,
    QInput,
  },
  directives: {
    ClosePopup
  },
  plugins: {
    AddressbarColor,
    Notify
  },
  boot: [
    'addressbar-color'
  ],
  lang: lang
 })