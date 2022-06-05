export default {
	error: {
        title: null,
        body: null,
        line: null,
        trace: [],
    },
	snack: {
		visible: false,
		icon: 'mdi-check',
		color: 'success',
		body: '',
	},
	modal: {
		visible: false,
		disabled: false,
		title: 'Undefined',
		body: '',
		buttons: [],
		attrs: {},
	},
    socialLinks: [
        { icon: 'mdi-facebook', tooltip: 'Facebook', href: process.env.VUE_APP_FACEBOOK_URL },
        { icon: 'mdi-twitter', tooltip: 'Twitter', href: process.env.VUE_APP_TWITTER_URL },
        { icon: 'mdi-youtube', tooltip: 'Youtube', href: process.env.VUE_APP_YOUTUBE_URL },
        { icon: 'mdi-github', tooltip: 'Github', href: process.env.VUE_APP_GITHUB_URL },
    ],
}
