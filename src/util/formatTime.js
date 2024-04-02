import moment from "moment"
moment.locale("zh-cn")
const formatTime = {
	getTime: (data) => {
		return moment(data).format('YYYY-MM-DD HH:mm')
		// .subtract(10, 'days').calendar()
	}
}

export default formatTime