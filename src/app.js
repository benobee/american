import portfolioListController from "./core/portfolioListController";
import portfolioItemController from "./core/portfolioItemController";
import homePageController from "./core/homePageController";

const App = {
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
    },
    cacheDOM () {
        const body = document.querySelector("body");

        this.list = body.querySelector(".Main.Main--property-list");
        this.item = body.querySelector(".Main.Main--property-item");
        this.homePage = document.querySelector(".homepage");
    }
};

window._CustomApp = App;

document.addEventListener("DOMContentLoaded", () => {
    App.init();
});

