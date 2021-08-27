export const permissionMixin = {
	methods: {
		hasBtnPermission(val){
			let permissionList = sessionStorage.getItem('eshop-btnLimit');
			return permissionList.includes(val)
		},
	},
}
