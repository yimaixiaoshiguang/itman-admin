import Mock from 'mockjs'

import { loginInfo } from './modules/login.js'
import { userInfo } from './modules/user.js'
import { roleInfo } from './modules/role.js'
import { menuInfo } from './modules/menu.js'
import { btnPermission } from './modules/permission.js'

Mock.mock(RegExp('/login' + '.*'), 'post', loginInfo)
Mock.mock(RegExp('/user' + '.*'), 'get', userInfo)
Mock.mock(RegExp('/role' + '.*'), 'get', roleInfo)
Mock.mock(RegExp('/entry/tree' + '.*'), 'get', menuInfo)
Mock.mock(RegExp('/entry/permissions' + '.*'), 'get', btnPermission)
