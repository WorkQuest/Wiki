import Vue from 'vue';

import Header from '~/components/app/Header';
import Footer from '~/components/app/Footer';
import BaseInput from '~/components/ui/BaseInput';
import BaseButton from '~/components/ui/BaseButton';
import CtmModal from '~/components/CtmModal';
import CtmModalBox from '~/components/CtmModal/CtmModalBox';
import BaseTextarea from '~/components/ui/BaseTextarea';

Vue.component('base-input', BaseInput);
Vue.component('base-btn', BaseButton);
Vue.component('ctm-modal', CtmModal);
Vue.component('ctm-modal-box', CtmModalBox);
Vue.component('base-textarea', BaseTextarea);
Vue.component('Header', Header);
Vue.component('Footer', Footer);
