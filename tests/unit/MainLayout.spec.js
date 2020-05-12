import { shallowMount } from "@vue/test-utils"
import MainLayout from "@/layouts/MainLayout.vue"
import Navbar from "@/components/Navbar.vue"
import Sidebar from "@/components/Sidebar.vue"
import NavigationLink from "@/components/links/NavigationLink.vue"

describe('MainLayout.vue', () => {
  it("renders a user using a Vuex store", () => {
    const wrapper = shallowMount(MainLayout, {
      mocks: {
        $store: {
          state: {
            activeUserInfo: {
              name: 'Test',
              account: 1000,
              locale: 'en-US'
            },
            error: null
          },
          getters: {
            getActiveUserInfo: state => state.activeUserInfo,
            getAuthError: state => state.error
          }
        }
      }
    })

    expect(wrapper.exists()).toBe(true)
  })
})

describe('Sidebar.vue', () => {
  const wrapper = shallowMount(Sidebar, {
    propsData: {
      isOpen: true
    }
  })

  it("renders", () => {
    expect(wrapper.exists()).toBe(true)
  })
})
