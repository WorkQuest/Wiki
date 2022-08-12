<template>
  <div
    v-click-outside="closeAll"
    class="header"
    data-selector="COMPONENT-HEADER"
  >
    <div class="header__body">
      <div class="header__left">
        <div
          class="header__logo"
          data-selector="ACTION-BTN-TO-MAIN-PAGE"
          @click="toMain()"
        >
          <img
            :src="$options.images.WQ_LOGO"
            alt="WorkQuest"
          >
          <span class="header__text">WorkQuest</span>
        </div>
      </div>
      <div class="header__right">
        <div
          class="header__button header__button_locale"
          data-selector="ACTION-BTN-SHOW-LOCALE"
          @click="showLocale()"
        >
          <span class="header__button_locale-name">
            {{ currentLocale !== 'zh_cn' ? currentLocale.toUpperCase() : 'ZH' }}
          </span>
          <span class="icon icon-caret_down" />
          <transition name="fade">
            <ul
              v-if="isShowLocale"
              class="locale"
            >
              <li
                v-for="(item, i) in locales"
                :key="item.localeCode"
                class="locale__item"
                :class="[{'locale__item_active' : currentLocale === item.localeCode}]"
                :data-selector="`ACTION-BTN-SET-LOCALE-${i}`"
                @click="setLocale(item)"
              >
                <img
                  :src="require(`assets/img/lang/${item.localeSrc}`)"
                  :alt="item.localeText"
                  class="locale__icon"
                >
                <span class="locale__text">
                  {{ item.localeText.toUpperCase() }}
                </span>
              </li>
            </ul>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import moment from 'moment';
import { images } from '@/utils/images';
import {
  UserRole, Path,
} from '@/utils/enums';
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  middleware: 'auth',
  UserRole,
  images,
  directives: {
    ClickOutside,
  },
  data() {
    return {
      isInstrumentDropdownOpened: false,
      isUserDDOpened: false,
      isShowProfile: false,
      isShowAdditionalMenu: false,
      isShowLocale: false,
      isMobileMenu: false,
      isNotFlexContainer: false,
    };
  },
  computed: {
    ...mapGetters({
      currentLocale: 'user/getCurrentLang',
    }),
    locales() {
      return this.$i18n.locales.map((item) => ({
        localeSrc: `${item}.svg`,
        localeText: this.$t(`ui.locals.${item}`),
        localeCode: item,
      }));
    },
    profileLinks() {
      return [
        {
          title: this.$t('ui.profile.myProfile'),
          path: `${Path.PROFILE}/${this.userData.id}`,
        },
        {
          title: this.$t('meta.settings'),
          path: Path.SETTINGS,
        },
        {
          title: this.$t('meta.disputes'),
          path: Path.DISPUTES,
        },
      ];
    },
    additionalMenuLinks() {
      return [
        {
          title: this.$t('ui.menu.pension.title'),
          desc: this.$t('ui.menu.pension.desc'),
          path: Path.RETIREMENT,
        },
        {
          title: this.$t('ui.menu.referral.title'),
          desc: this.$t('ui.menu.referral.desc'),
          path: Path.REFERRAL,
        },
        {
          title: this.$t('ui.menu.p2p.title'),
          desc: this.$t('ui.menu.p2p.desc'),
          path: Path.INSURING,
        },
        {
          title: this.$t('ui.menu.savings.title'),
          desc: this.$t('ui.menu.savings.desc'),
          path: Path.SAVINGS,
        },
        {
          title: this.$t('ui.menu.crediting.title'),
          desc: this.$t('ui.menu.crediting.desc'),
          path: Path.LENDING,
        },
        {
          title: this.$t('ui.menu.mining.title'),
          desc: this.$t('ui.menu.mining.desc'),
          path: Path.MINING,
        },
        {
          title: this.$t('ui.menu.bridge.title'),
          desc: this.$t('ui.menu.bridge.desc'),
          path: Path.BRIDGE,
        },
        {
          title: this.$t('ui.menu.staking.title'),
          desc: this.$t('ui.menu.staking.desc'),
          path: Path.STAKING,
        },
        {
          title: this.$t('ui.menu.collateral.title'),
          desc: this.$t('ui.menu.collateral.desc'),
          path: Path.COLLATERAL,
        },
      ];
    },
    headerLinks() {
      const links = [
        { path: Path.MY_QUESTS, title: this.$t('meta.myQuests') },
        { path: Path.WALLET, title: this.$t('meta.wallet') },
      ];
      if (this.userData.role === UserRole.EMPLOYER) {
        links.unshift({
          path: Path.WORKERS,
          title: this.$t('ui.jobQuestors'),
        });
      } else links.unshift({ path: Path.QUESTS, title: this.$t('meta.questsBig') });
      return links;
    },
  },
  watch: {
    $route() {
      this.closeAll();
    },
  },
  created() {
    window.addEventListener('resize', this.userWindowChange);
  },
  async mounted() {
    this.$store.commit('user/setLang', this.$i18n.localeProperties.code);
  },
  beforeDestroy() {
    this.$store.dispatch('wallet/unsubscribeWS');
  },
  destroyed() {
    window.removeEventListener('resize', this.userWindowChange);
  },
  methods: {
    /**
     * @property $wsNotifs
     * @property $wsChatActions
     * @return {Promise<void>}
     */
    setLocale(item) {
      this.$store.commit('user/setLang', item.localeCode);
      this.$i18n.setLocale(item.localeCode);
      moment.locale(item.localeCode);
    },
    userWindowChange() {
      this.isMobileMenu = false;
      this.isNotFlexContainer = false;
      this.closeAnother('mobile');
    },
    toRoute(path) {
      this.$router.push(path);
      // TODO plug for release
      this.isMobileMenu = false;
      this.isNotFlexContainer = false;
    },
    closeMenu() {
      this.isMobileMenu = false;
      this.closeAnother('mobile');
    },
    toMain() {
      window.location.href = 'https://app.workquest.co';
    },
    showLocale() {
      this.closeAnother('locale');
      this.isShowLocale = !this.isShowLocale;
    },
    closeAnother(value) {
      switch (value) {
        case 'mobile':
          this.isShowProfile = false;
          this.isShowLocale = false;
          this.isShowAdditionalMenu = false;
          break;
        case 'instruments':
          this.isShowProfile = false;
          this.isShowLocale = false;
          break;
        case 'profile':
          this.isShowAdditionalMenu = false;
          this.isShowLocale = false;
          break;
        case 'locale':
          this.isShowAdditionalMenu = false;
          this.isShowProfile = false;
          break;
        default:
          break;
      }
    },
    // async logout() {
    //   const preventRedirect = PreventLogoutPathNames.includes(this.$route.name);
    //   await this.$store.dispatch('user/logout');
    //   if (preventRedirect) {
    //     this.$nuxt.setLayout(Layout.GUEST);
    //     sessionStorage.setItem('preventDisconnectWeb3', 'yep');
    //     sessionStorage.setItem('redirectTo', this.$route.path);
    //   } else await this.$router.push(Path.ROOT);
    // },
    closeAll() {
      this.isShowProfile = false;
      this.isShowAdditionalMenu = false;
      this.isShowLocale = false;
    },
  },
};
</script>
<style lang="scss" scoped>

.user {
  &__data {
    padding: 15px 0 0 0;
    display: grid;
  }

  &__dropdown-icon {
    align-self: center;
  }

  &__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: $black0;
    max-height: 70px;
    height: 100%;
    max-width: 100%;
    width: 100%;
    padding: 0 20px 0 0;
  }

  &__avatar {
    max-height: 40px;
    max-width: 40px;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    margin-left: 20px;
    margin-right: 10px;
  }

  &__name {
    font-weight: 500;
    font-size: 16px;
    color: $black800;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__role {
    font-weight: 400;
    font-size: 12px;
    color: $blue;
    padding: 0 0 11px 0;
  }
}

.icon {
  font-size: 20px;
  color: $shade700;

  &-chevron_right {
    transition: .1s;
    visibility: hidden;
  }

  &-message, &-hamburger {
    font-size: 24px;
    color: $black400;
  }
}

.header {
  position: sticky;
  top: 0;
  z-index: 99999;
  min-height: 72px;
  background: $white;
  box-shadow: 0 1px 0 #E6E9EC;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__body {
    max-width: 1180px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__left {
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr;
    grid-gap: 35px;
  }

  &__link {
    @include text-simple;
    font-size: 16px;
    line-height: 130%;
    color: $black400;
    text-decoration: none;

    &_active {
      color: $black800;
    }

    &_menu {
      display: flex;
      align-items: center;
      position: relative;
      cursor: pointer;

      span {
        color: $black400;
        font-size: 24px;
        padding-left: 5px;
      }
    }
  }

  &__button {
    @include text-simple;
    font-size: 16px;
    line-height: 130%;
    color: $black600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    width: 43px;
    height: 43px;
    border: 1px solid transparent;

    &:hover {
      border: 1px solid $black100;
    }

    .icon-caret_down {
      color: $black400;
      font-size: 24px;
    }

    &_profile {
      position: relative;
    }

    &_menu {
      position: relative;
      display: none;
    }

    &_locale {
      width: 86px;
      height: 46px;
    }

    &_locale-name {
      padding-left: 10px;
    }
  }

  &__links {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(4, auto);
    grid-gap: 25px;
  }

  &__btn {
    min-width: 163px;
  }

  &__logo {
    display: grid;
    align-items: center;
    grid-template-columns: 40px 1fr;
    grid-gap: 5px;
    cursor: pointer;

    span {
      @include text-simple;
      font-weight: bold;
      font-size: 23px;
      line-height: 130%;
      color: $black700;
    }
  }

  &__ctm-menu {
    transition: .2s;
  }
}

.ctm-menu {
  &_opened {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
    overflow-y: auto;
    background: $white;
    display: flex;
    width: 100%;
    position: fixed;
    top: 73px;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 9999;
  }

  &__content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: $white;
    border-radius: 0 0 5px 5px;

    &_hide {
      width: 0;
    }
  }

  &__user {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__links {
    display: flex;
    flex-direction: column;
  }

  &__link {
    padding: 16px 20px 16px 20px;
    font-weight: 400;
    font-size: 16px;
    color: $black800;
    border-bottom: 1px solid $black0;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      background: $blue;
      color: $white;
      font-weight: 600;
    }
  }

  &__actions {
    padding: 20px;
  }

  &__toggle {
    display: none;
  }
}

.dropdown {
  &__link {
    @extend .ctm-menu__link;
    display: flex;
    flex-direction: column;
    background: $black0;
    padding: 16px 0 20px 30px;
    align-items: flex-start;
    width: 100%;

    &_logout {
      color: $red;
    }
  }

  &__btn {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    &:hover {
      background: $blue;
      color: $white;
      font-weight: 600;
    }
  }

  &__title {
    padding: 16px 0 20px 20px;
  }

  &__arrow {
    justify-self: flex-end;
    padding: 16px 20px 0 0;
  }
}

.dropdown-data {
  &__link {
    @extend .ctm-menu__link;
    display: flex;
    flex-direction: column;
    background: $white;
    padding: 16px 0 20px 30px
  }
}

.profile {
  position: absolute;
  top: 57px;
  right: calc(100% - 43px);
  background: $white;
  box-shadow: 0 17px 17px rgba(0, 0, 0, 0.05), 0 5.125px 5.125px rgba(0, 0, 0, 0.03), 0 2.12866px 2.12866px rgba(0, 0, 0, 0.025), 0 0.769896px 0.769896px rgba(0, 0, 0, 0.0174206);
  border-radius: 6px;
  min-width: 223px;
  width: 100%;
  min-height: 235px;
  z-index: 10000000;

  &__img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }

  &__header {
    border-bottom: 1px solid $black0;
    display: grid;
    grid-template-columns: 40px 1fr;
    padding: 15px;
    grid-gap: 10px;
  }

  &__avatar {
    max-width: 40px;
    max-height: 40px;
    border-radius: 100%;
  }

  &__items {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: flex-start;
  }

  &__item {
    @include text-simple;
    height: 41px;
    background: $white;
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-size: 16px;
    line-height: 130%;
    width: 100%;
    transition: .3s;
    border-radius: 6px;
    text-decoration: none;

    &_red {
      color: $red;
    }

    &:hover {
      background: $black0;
    }
  }

  &__text {
    @include text-simple;
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    white-space: nowrap;

    &_blue {
      font-weight: normal;
      font-size: 12px;
      color: $blue;
    }

    &_green {
      font-weight: normal;
      font-size: 12px;
      color: $green;
    }
  }

  &__info {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 5px;
    text-align: left;
  }
}

.menu {
  position: absolute;
  top: 49px;
  background: $white;
  box-shadow: 0 17px 17px rgba(0, 0, 0, 0.05), 0 5.125px 5.125px rgba(0, 0, 0, 0.03), 0 2.12866px 2.12866px rgba(0, 0, 0, 0.025), 0 0.769896px 0.769896px rgba(0, 0, 0, 0.0174206);
  border-radius: 6px;
  min-width: 790px;
  width: 100%;
  left: -100%;
  min-height: 230px;
  z-index: 10000000;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__text {
    @include text-simple;

    &_header {
      font-size: 16px;
      line-height: 130%;
      color: $black800;
    }

    &_grey {
      font-size: 14px;
      line-height: 130%;
      color: $black500;
    }
  }

  &__items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 20px;
    grid-gap: 10px;
  }

  &__item {
    transition: .3s;
    background: $white;
    border-radius: 6px;
    border: 1px solid transparent;
    min-height: 90px;
    display: flex;
    align-items: flex-start;
    text-align: left;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px;

    &:hover {
      border: 1px solid $black100;
      text-decoration: none;

      span {
        visibility: visible;
      }
    }
  }
}

.locale {
  position: absolute;
  top: 73px;
  background: $white;
  box-shadow: 0 17px 17px rgba(0, 0, 0, 0.05), 0 5.125px 5.125px rgba(0, 0, 0, 0.03), 0 2.12866px 2.12866px rgba(0, 0, 0, 0.025), 0 0.769896px 0.769896px rgba(0, 0, 0, 0.0174206);
  border-radius: 6px;
  z-index: 10000000;
  padding: 15px 20px;

  &__item {
    width: 46px;
    display: flex;
    align-items: center;
    opacity: 0.7;

    &_active {
      opacity: 1;
    }

    &:hover {
      opacity: 1;
    }
  }

  &__item:not(:last-child) {
    margin-bottom: 15px;
  }

  &__icon {
    display: block;
    margin-right: 10px;
    border-radius: 50%;
    width: 15px;
    height: 15px;
  }

  &__text {
    @include text-simple;
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    color: $black500;
  }
}

@include _1199 {
  .header {
    &__body {
      margin: 0 20px;
    }
  }
}

@include _1099 {
  .header {
    &__links {
      grid-gap: 15px;
    }

    &__left {
      grid-gap: 15px;
    }

    &__btn {
      margin-left: 5px;
      min-width: 135px;
    }
  }
}

@include _991 {
  .ctm-menu {
    &__user {
      cursor: pointer;
    }
    &__dropdown {
      cursor: pointer;
    }
    &__toggle {
      display: flex;
    }
  }
  .header {
    &__button_menu {
      display: flex;
    }

    &__body {
      margin: 0 20px 0 20px;
    }

    &__links {
      display: none;
    }

    &__button {
      &_profile {
        display: none;
      }
    }

    &__btn {
      display: none !important;
    }
  }
  .template {
    &__content {
      grid-template-rows: 72px 1fr auto;
    }
  }
}

@include _575 {
  .header {
    &__logo {
      span {
        display: none;
      }
    }

    &__btn {
      display: none !important;
    }

    &__left {
      grid-gap: 15px;
    }

    &__right {
      grid-gap: 2px;
    }
  }
}
</style>
