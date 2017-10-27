import portfolioListController from "./core/portfolioListController";
import portfolioItemController from "./core/portfolioItemController";

const App = {
    init () {
        this.cacheDOM();

        if (this.list) {
            portfolioListController.init(this.list);
        }

        if (this.item) {
            portfolioItemController.init(this.item);
        }
    },
    cacheDOM () {
        const body = document.querySelector("body");

        this.list = body.querySelector(".Main.Main--property-list");
        this.item = body.querySelector(".Main.Main--property-item");
    }
};

window._CustomApp = App;

document.addEventListener("DOMContentLoaded", () => {
    App.init();
});

