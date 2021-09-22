/* meta : {
	roles: ['admin','editor']    control the page roles (you can set multiple roles)
	title: 'title'               the name show in sidebar and breadcrumb (recommend set)
	icon: 'svg-name'             the icon show in the sidebar
	noCache: true                if set true, the page will no be cached(default is false)
	affix: true                  if set true, the tag will affix in the tags-view
	breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
	activeMenu: '/userManager/list'  if set path, the sidebar will highlight the path you set
	head:true    //表示不作为第一层菜单，而是作为整个系统的第一层
  }
 */

import Layout from '@/views/layout/index'
const sysBaseRouter = {
    path: '/sysManager',
    name: 'sysManager',
    component: Layout,
    //	redirect:'/control/sysUserManager/userInfo',
    meta: { title: '系统管理', icon: 'sys' },
    children: [
        {
            path: '/sysManager/userInfo',
            name: 'userInfo',
            meta: {
                title: '平台用户'
                // icon:'yonghu',
            },
            component: () => import('@/views/basePage/user/userInfo')
        },
        {
            path: '/sysManager/roleInfo',
            name: 'rolesManager',
            meta: {
                title: '角色管理'
                // icon:'role',
            },
            component: () => import('@/views/basePage/role/roleInfo')
        },
        {
            path: '/sysManager/menuInfo',
            name: 'menuManager',
            meta: {
                title: '菜单管理'
                // icon:'caidan',
            },
            component: () => import('@/views/basePage/menu/index')
        }

    ]
}

export default sysBaseRouter
