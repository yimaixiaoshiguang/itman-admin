<script>
	export default {
		name: 'MenuItem',
		functional: true,
		props: {
			icon: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			}
		},
		render(h, context) {
			const {
				icon,
				title
			} = context.props
			const vnodes = []

			if(icon) {
				vnodes.push(<icon-svg icon={icon} size="22" style="vertical-align: middle;"/>)
			}

			if(title) {
				vnodes.push(<span slot='title'>{(title)}</span>)
			}
			return vnodes
		}
	}
</script>