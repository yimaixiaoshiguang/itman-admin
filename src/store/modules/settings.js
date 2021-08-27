import defaultSettings from '@/settings'

// const {
// 	siderTheme,
// 	fixedSider,
// 	headerTheme,
// 	showSettings,
// 	fixedHeader,
// 	sidebarLogo,
// 	tagsView,
// 	title,
// 	logo,
// 	hamburgerPosition
// } = defaultSettings

const state = {...defaultSettings}

const mutations = {
	CHANGE_SETTING: (state, {
		key,
		value
	}) => {
		if (state.hasOwnProperty(key)) {
			
			state[key] = value
		}
	}
}

const actions = {
	changeSetting({
		commit
	}, data) {
		commit('CHANGE_SETTING', data)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}