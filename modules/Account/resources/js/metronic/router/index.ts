import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { Mutations, Actions } from "@/store/enums/StoreEnums";

const routes: Array<RouteRecordRaw> = [
  /*
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/metronic/layout/Layout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/metronic/views/Dashboard.vue")
      },
      {
        path: "/builder",
        name: "builder",
        component: () => import("@/metronic/views/Builder.vue")
      },
      {
        path: "/crafted/pages/profile",
        name: "profile",
        component: () => import("@/metronic/views/pages/Profile.vue"),
        children: [
          {
            path: "overview",
            name: "profile-overview",
            component: () => import("@/metronic/views/pages/profile/Overview.vue")
          },
          {
            path: "projects",
            name: "profile-projects",
            component: () => import("@/metronic/views/pages/profile/Projects.vue")
          },
          {
            path: "campaigns",
            name: "profile-campaigns",
            component: () => import("@/metronic/views/pages/profile/Campaigns.vue")
          },
          {
            path: "documents",
            name: "profile-documents",
            component: () => import("@/metronic/views/pages/profile/Documents.vue")
          },
          {
            path: "connections",
            name: "profile-connections",
            component: () => import("@/metronic/views/pages/profile/Connections.vue")
          },
          {
            path: "activity",
            name: "profile-activity",
            component: () => import("@/metronic/views/pages/profile/Activity.vue")
          }
        ]
      },
      {
        path: "/crafted/pages/wizards/horizontal",
        name: "horizontal-wizard",
        component: () => import("@/metronic/views/pages/wizards/Horizontal.vue")
      },
      {
        path: "/crafted/pages/wizards/vertical",
        name: "vertical-wizard",
        component: () => import("@/metronic/views/pages/wizards/Vertical.vue")
      },
      {
        path: "/crafted/account",
        name: "account",
        component: () => import("@/metronic/views/account/Account.vue"),
        children: [
          {
            path: "overview",
            name: "account-overview",
            component: () => import("@/metronic/views/account/Overview.vue")
          },
          {
            path: "settings",
            name: "account-settings",
            component: () => import("@/metronic/views/account/Settings.vue")
          }
        ]
      },
      {
        path: "/apps/chat/private-chat",
        name: "apps-private-chat",
        component: () => import("@/metronic/views/chat/Chat.vue")
      },
      {
        path: "/apps/chat/group-chat",
        name: "apps-group-chat",
        component: () => import("@/metronic/views/chat/Chat.vue")
      },
      {
        path: "/apps/chat/drawer-chat",
        name: "apps-drawer-chat",
        component: () => import("@/metronic/views/chat/DrawerChat.vue")
      },
      {
        path: "/crafted/modals/general/invite-friends",
        name: "modals-general-invite-friends",
        component: () => import("@/metronic/views/modals/general/InviteFriends.vue")
      },
      {
        path: "/crafted/modals/general/view-user",
        name: "modals-general-view-user",
        component: () => import("@/metronic/views/modals/general/ViewUsers.vue")
      },
      {
        path: "/crafted/modals/general/upgrade-plan",
        name: "modals-general-upgrade-plan",
        component: () => import("@/metronic/views/modals/general/UpgradePlan.vue")
      },
      {
        path: "/crafted/modals/general/share-and-earn",
        name: "modals-general-share-and-earn",
        component: () => import("@/metronic/views/modals/general/ShareAndEarn.vue")
      },
      {
        path: "/crafted/modals/forms/new-target",
        name: "modals-forms-new-target",
        component: () => import("@/metronic/views/modals/forms/NewTarget.vue")
      },
      {
        path: "/crafted/modals/forms/new-card",
        name: "modals-forms-new-card",
        component: () => import("@/metronic/views/modals/forms/NewCard.vue")
      },
      {
        path: "/crafted/modals/forms/new-address",
        name: "modals-forms-new-address",
        component: () => import("@/metronic/views/modals/forms/NewAddress.vue")
      },
      {
        path: "/crafted/modals/forms/create-api-key",
        name: "modals-forms-create-api-key",
        component: () => import("@/metronic/views/modals/forms/CreateApiKey.vue")
      },
      {
        path: "/crafted/modals/wizards/two-factor-auth",
        name: "modals-wizards-two-factor-auth",
        component: () => import("@/metronic/views/modals/wizards/TwoFactorAuth.vue")
      },
      {
        path: "/crafted/modals/wizards/create-app",
        name: "modals-wizards-create-app",
        component: () => import("@/metronic/views/modals/wizards/CreateApp.vue")
      },
      {
        path: "/crafted/modals/wizards/create-account",
        name: "modals-wizards-create-account",
        component: () => import("@/metronic/views/modals/wizards/CreateAccount.vue")
      },
      {
        path: "/crafted/widgets/lists",
        name: "widgets-list",
        component: () => import("@/metronic/views/widgets/Lists.vue")
      },
      {
        path: "/crafted/widgets/statistics",
        name: "widgets-statistics",
        component: () => import("@/metronic/views/widgets/Statistics.vue")
      },
      {
        path: "/crafted/widgets/charts",
        name: "widgets-charts",
        component: () => import("@/metronic/views/widgets/Charts.vue")
      },
      {
        path: "/crafted/widgets/mixed",
        name: "widgets-mixed",
        component: () => import("@/metronic/views/widgets/Mixed.vue")
      },
      {
        path: "/crafted/widgets/tables",
        name: "widgets-tables",
        component: () => import("@/metronic/views/widgets/Tables.vue")
      },
      {
        path: "/crafted/widgets/feeds",
        name: "widgets-feeds",
        component: () => import("@/metronic/views/widgets/Feeds.vue")
      },
      {
        path: "/documentation",
        name: "documentation",
        component: () => import("@/metronic/views/resources/Documentation.vue"),
        children: [
          {
            path: "build",
            name: "build",
            component: () =>
              import("@/metronic/views/resources/documentation/get-started/Build.vue")
          },
          {
            path: "setup-theme-skeleton",
            name: "setup-theme-skeleton",
            component: () =>
              import(
                "@/metronic/views/resources/documentation/get-started/SetupThemeSkeleton.vue"
              )
          },
          {
            path: "doc-overview",
            name: "doc-overview",
            component: () =>
              import("@/metronic/views/resources/documentation/get-started/Overview.vue")
          },
          {
            path: "updates",
            name: "updates",
            component: () =>
              import("@/metronic/views/resources/documentation/get-started/Updates.vue")
          },
          {
            path: "changelog",
            name: "changelog",
            component: () => import("@/metronic/views/resources/Changelog.vue")
          },
          {
            path: "utilities",
            name: "utilities",
            meta: {
              desc: "extended utility classes"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/Utilities.vue")
          },
          {
            path: "helpers/flex-layouts",
            name: "flex-layouts",
            meta: {
              desc: "extended flex layout classes"
            },
            component: () =>
              import(
                "@/metronic/views/resources/documentation/base/helpers/FlexLayouts.vue"
              )
          },
          {
            path: "helpers/text",
            name: "text",
            meta: {
              desc: "extended text classes"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/helpers/Text.vue")
          },
          {
            path: "helpers/background",
            name: "backkground",
            meta: {
              desc: "extended background classes"
            },
            component: () =>
              import(
                "@/metronic/views/resources/documentation/base/helpers/Background.vue"
              )
          },
          {
            path: "helpers/borders",
            name: "borders",
            meta: {
              desc: "extended borders classes"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/helpers/Borders.vue")
          },
          {
            path: "forms",
            name: "forms",
            meta: {
              desc: "forms elements"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/Forms.vue")
          },
          {
            path: "buttons",
            name: "buttons",
            meta: {
              desc: "buttons elements"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/Buttons.vue")
          },
          {
            path: "indicator",
            name: "indicator",
            meta: {
              desc: "indicator element"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/Indicator.vue")
          },
          {
            path: "rotate",
            name: "rotate",
            meta: {
              desc: "Rotate element"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/Rotate.vue")
          },
          {
            path: "tables",
            name: "tables",
            meta: {
              desc: "extended bootstrap tables"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/Tables.vue")
          },
          {
            path: "cards",
            name: "cards",
            meta: {
              desc: "card elements"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/Cards.vue")
          },
          {
            path: "symbol",
            name: "symbol",
            meta: {
              desc: "symbol elements"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/Symbol.vue")
          },
          {
            path: "badges",
            name: "badges",
            meta: {
              desc: "badge elements"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/Badges.vue")
          },
          {
            path: "pulse",
            name: "pulse",
            meta: {
              desc: "pulse elements"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/Pulse.vue")
          },
          {
            path: "bullets",
            name: "bullets",
            meta: {
              desc: "bullets elements"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/Bullets.vue")
          },
          {
            path: "accordion",
            name: "accordion",
            meta: {
              desc: "accordion elements"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/Accordion.vue")
          },
          {
            path: "carousel",
            name: "carousel",
            meta: {
              desc: "carousel elements"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/Carousel.vue")
          },
          {
            path: "overlay",
            name: "overlay",
            meta: {
              desc: "overlay elements"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/Overlay.vue")
          },
          {
            path: "separator",
            name: "separator",
            meta: {
              desc: "separator elements"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/Separator.vue")
          },
          {
            path: "tabs",
            name: "tabs",
            meta: {
              desc: "tabs elements"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/Tabs.vue")
          },
          {
            path: "breadcrumb",
            name: "breadcrumb",
            meta: {
              desc: "breadcrumb elements"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/Breadcrumb.vue")
          },
          {
            path: "modal",
            name: "modal",
            meta: {
              desc: "modal elements"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/Modal.vue")
          },
          {
            path: "pagination",
            name: "pagination",
            meta: {
              desc: "pagination elements"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/base/Pagination.vue")
          },
          {
            path: "vue-select",
            name: "vue-select",
            meta: {
              desc: "Vue multiselect"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/forms/VueSelect.vue")
          },
          {
            path: "vee-validate",
            name: "vee-validate",
            meta: {
              desc: "Vee validate"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/forms/VeeValidate.vue")
          },
          {
            path: "element-ui",
            name: "element-ui",
            component: () =>
              import(
                "@/metronic/views/resources/documentation/element-ui/ElementUI.vue"
              ),
            children: [
              {
                path: "basic/layout",
                name: "layout",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/basic/Layout.vue"
                  )
              },
              {
                path: "basic/layout-container",
                name: "layout-container",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/basic/LayoutContainer.vue"
                  )
              },
              {
                path: "basic/icon",
                name: "icon",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/basic/Icon.vue"
                  )
              },
              {
                path: "basic/button",
                name: "button",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/basic/Button.vue"
                  )
              },
              {
                path: "basic/link",
                name: "link",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/basic/Link.vue"
                  )
              },
              {
                path: "basic/space",
                name: "space",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/basic/Space.vue"
                  )
              },
              {
                path: "form/radio",
                name: "radio",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/form/Radio.vue"
                  )
              },
              {
                path: "form/checkbox",
                name: "checkbox",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/form/Checkbox.vue"
                  )
              },
              {
                path: "form/input",
                name: "input",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/form/Input.vue"
                  )
              },
              {
                path: "form/input-number",
                name: "input-number",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/form/InputNumber.vue"
                  )
              },
              {
                path: "form/select",
                name: "select",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/form/Select.vue"
                  )
              },
              {
                path: "form/cascader",
                name: "cascader",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/form/Cascader.vue"
                  )
              },
              {
                path: "form/switch",
                name: "switch",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/form/Switch.vue"
                  )
              },
              {
                path: "form/slider",
                name: "slider",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/form/Slider.vue"
                  )
              },
              {
                path: "form/time-picker",
                name: "time-picker",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/form/TimePicker.vue"
                  )
              },
              {
                path: "form/time-select",
                name: "time-select",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/form/TimeSelect.vue"
                  )
              },
              {
                path: "form/date-picker",
                name: "date-picker",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/form/DatePicker.vue"
                  )
              },
              {
                path: "form/date-time-picker",
                name: "date-time-picker",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/form/DateTimePicker.vue"
                  )
              },
              {
                path: "form/upload",
                name: "upload",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/form/Upload.vue"
                  )
              },
              {
                path: "form/rate",
                name: "rate",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/form/Rate.vue"
                  )
              },
              {
                path: "form/color-picker",
                name: "color-picker",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/form/ColorPicker.vue"
                  )
              },
              {
                path: "form/transfer",
                name: "transfer",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/form/Transfer.vue"
                  )
              },
              {
                path: "form/form",
                name: "form",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/form/Form.vue"
                  )
              },
              {
                path: "data/table",
                name: "table",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/data/Table.vue"
                  )
              },
              {
                path: "data/tag",
                name: "tag",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/data/Tag.vue"
                  )
              },
              {
                path: "data/progress",
                name: "progress",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/data/Progress.vue"
                  )
              },
              {
                path: "data/tree",
                name: "tree",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/data/Tree.vue"
                  )
              },
              {
                path: "data/pagination",
                name: "data-pagination",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/data/Pagination.vue"
                  )
              },
              {
                path: "data/badge",
                name: "badge",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/data/Badge.vue"
                  )
              },
              {
                path: "data/skeleton",
                name: "skeleton",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/data/Skeleton.vue"
                  )
              },
              {
                path: "data/empty",
                name: "empty",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/data/Empty.vue"
                  )
              },
              {
                path: "notice/alert",
                name: "alert",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/notice/Alert.vue"
                  )
              },
              {
                path: "notice/loading",
                name: "loading",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/notice/Loading.vue"
                  )
              },
              {
                path: "notice/message",
                name: "message",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/notice/Message.vue"
                  )
              },
              {
                path: "notice/message-box",
                name: "message-box",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/notice/MessageBox.vue"
                  )
              },
              {
                path: "notice/notification",
                name: "notification",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/notice/Notification.vue"
                  )
              },
              {
                path: "navigation/affix",
                name: "affix",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/navigation/Affix.vue"
                  )
              },
              {
                path: "navigation/nav-menu",
                name: "nav-menu",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/navigation/NavMenu.vue"
                  )
              },
              {
                path: "navigation/tabs",
                name: "navigation-tabs",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/navigation/Tabs.vue"
                  )
              },
              {
                path: "navigation/breadcrumb",
                name: "navigation-breadcrumb",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/navigation/Breadcrumb.vue"
                  )
              },
              {
                path: "navigation/page-header",
                name: "page-header",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/navigation/PageHeader.vue"
                  )
              },
              {
                path: "navigation/dropdown",
                name: "dropdown",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/navigation/Dropdown.vue"
                  )
              },
              {
                path: "navigation/steps",
                name: "steps",
                component: () =>
                  import(
                    "@/metronic/views/resources/documentation/element-ui/navigation/Steps.vue"
                  )
              }
            ]
          },
          {
            path: "icons/duotone",
            name: "duotone",
            meta: {
              desc: "duotone svg icons"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/general/Duotone.vue")
          },
          {
            path: "icons/bootstrap-icons",
            name: "bootstrap-icons",
            meta: {
              desc: "free, high quality, open source icon library"
            },
            component: () =>
              import(
                "@/metronic/views/resources/documentation/general/BootstrapIcons.vue"
              )
          },
          {
            path: "icons/font-awesome",
            name: "font-awesome",
            meta: {
              desc: "awesome font icons"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/general/FontAwesome.vue")
          },
          {
            path: "icons/line-awesome",
            name: "line-awesome",
            meta: {
              desc: "line font icons"
            },
            component: () =>
              import("@/metronic/views/resources/documentation/general/LineAwesome.vue")
          }
        ]
      }
    ]
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: () => import("@/metronic/views/auth/SignIn.vue")
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: () => import("@/metronic/views/auth/SignUp.vue")
  },
  {
    path: "/password-reset",
    name: "password-reset",
    component: () => import("@/metronic/views/auth/PasswordReset.vue")
  },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () => import("@/metronic/views/error/Error404.vue")
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/metronic/views/error/Error500.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404"
  }
   */
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(() => {
  // reset config to initial state
  store.commit(Mutations.RESET_LAYOUT_CONFIG);

  store.dispatch(Actions.VERIFY_AUTH);

  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

export default router;
