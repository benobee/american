import Vue from "vue";
import util from "../util/util";
import logoCarousel from "../components/logoCarousel";

/**
 * All obects, components, event listeners localized to the footer
 * @type {Object}
 * @name footerController
 */

const footerController = {
    init () {
        this.carousel();
    },
    carousel () {
        util.getData("/clients", (response) => {
            if (!response.error) {
                Vue.component("carousel", logoCarousel(response.data));

                this.vueCarousel = new Vue({
                    el: "#carousel-logos"
                });
            }
        });
    }
};

export default footerController;