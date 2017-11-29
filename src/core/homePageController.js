import Scrollmap from "scrollmap";

const homePage = {
	init () {
		this.bindScrollListeners();
	},
	bindScrollListeners () {
		Scrollmap.trigger({
			target: ".sqs-col-4",
			surfaceVisible: 0.2
		})
		.trigger({
			target: ".sqs-col-8",
			surfaceVisible: 0.2
		});
	}
};

export default homePage;