import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/auth/Login.vue')
  },
  {
    name: 'home',
    path: '/',
    component: () => import('../views/project/Index.vue'),
  },
  {
    name: 'project_index',
    path: '/project',
    component: () => import('../views/project/Index.vue'),
  },
  {
    name: 'project_create',
    path: '/project/create',
    component: () => import('../views/project/Create.vue'),
    props: true,
  },
  {
    name: 'project_edit',
    path: '/project/:id/edit',
    component: () => import('../views/project/Edit.vue'),
    props: true,
  },
  {
    name: 'project_show',
    path: '/project/:id',
    component: () => import('../views/project/Show.vue'),
    props: true,
  },
  {
    name: 'project_detail_index',
    path: '/project/:project_id/project_detail',
    component: () => import('../views/project_detail/Index.vue'),
    props: true,
  },
  {
    name: 'project_detail_create',
    path: '/project/:project_id/project_detail/create',
    component: () => import('../views/project_detail/Create.vue'),
    props: true,
  },
  {
    name: 'project_detail_edit',
    path: '/project/:project_id/project_detail/:id/edit',
    component: () => import('../views/project_detail/Edit.vue'),
    props: true,
  },
  {
    name: 'crowd_sourcing_index',
    path: '/crowd_sourcing',
    component: () => import('../views/crowd_sourcing/Index.vue'),
  },
  {
    name: 'crowd_sourcing_create',
    path: '/crowd_sourcing/create',
    component: () => import('../views/crowd_sourcing/Create.vue'),
  },
  {
    name: 'crowd_sourcing_edit',
    path: '/crowd_sourcing/:id/edit',
    component: () => import('../views/crowd_sourcing/Edit.vue'),
    props: true,
  },
  {
    name: 'orderer_index',
    path: '/orderer',
    component: () => import('../views/orderer/Index.vue'),
  },
  {
    name: 'orderer_create',
    path: '/orderer/create',
    component: () => import('../views/orderer/Create.vue'),
  },
  {
    name: 'orderer_edit',
    path: '/orderer/:id/edit',
    component: () => import('../views/orderer/Edit.vue'),
    props: true,
  },
  {
    name: 'progress_index',
    path: '/progress',
    component: () => import('../views/progress/Index.vue'),
  },
  {
    name: 'progress_create',
    path: '/progress/create',
    component: () => import('../views/progress/Create.vue'),
  },
  {
    name: 'progress_edit',
    path: '/progress/:id/edit',
    component: () => import('../views/progress/Edit.vue'),
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
