import Scrollmap from "scrollmap";

/**
 * All obects, components, event listeners localized to the homepage
 * @type {Object}
 * @name homePageController
 */

const homePageController = {

    init () {
        this.bindScrollListeners();

        return this;
    },


    /**
     * Using Scrollmap to bind certain DOM elements. This provides
     * hooks for CSS classes.
     *
     * @private
     */

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

export default homePageController;