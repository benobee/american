import portfolioListController from "./core/portfolioListController";
import portfolioItemController from "./core/portfolioItemController";
import homePageController from "./core/homePageController";
import footerController from "./core/footerController";

/**
 * Main app object. Controls the initialization for all 
 * controllers.
 * 
 * @type {Object}
 * @name App
 * 
 */
const App = {
    /**
     * Runs all methods
     * @returns {Object} returns the app object
     * @name App.init
     */
    init () {
        this.cacheDOM();
        if (this.list) {
            portfolioListController.init(this.list);
        }
        if (this.item) {
            portfolioItemController.init(this.item);
        }
        if (this.homePage) {
            homePageController.init();
        }
        if (this.footer) {
            footerController.init();
        }

        return this;
    },
    /**
     * Caches the DOM in memory for quicker DOM queries
     * @private
     */
    cacheDOM () {
        const body = document.querySelector("body");

        this.list = body.querySelector(".Main.Main--property-list");
        this.item = body.querySelector(".Main.Main--property-item");
        this.homePage = document.querySelector(".homepage");
        this.footer = body.querySelector(".Footer");
    }
};

window._CustomApp = App;

document.addEventListener("DOMContentLoaded", () => {
    App.init();
});

