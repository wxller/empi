import VueRouter from 'vue-router'
import Interaction from '../components/Interaction.vue'
import EMPI from '../components/EMPI.vue'
import ShareDoc from '../components/ShareDoc.vue'
export const router = new VueRouter({
  // mode: '§'',
  routes: [
    {
      path: '/',
      redirect: '/interaction'
    },
    {
      path: '/interaction',
      component: Interaction,
    },
    {
      path: '/share',
      component: ShareDoc,
    },
    {
      path: '/empi',
      component: EMPI,
    },
  ],
})
