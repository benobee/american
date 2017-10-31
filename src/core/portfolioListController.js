import Vue from "vue";
import portfolioList from "../components/portfolioList";
import Events from "./events";
import util from "../util/util";

const ListEvents = new Events();

//PORTFOLIO LIST CONTROLLER
const portfolioListController = {
    init (parent) {
        this.data = this.data();
        this.cacheDOM(parent);
        util.getData("/portfolio-list-collection", (response) => {
            if (response) {
                Object.assign(this.data, { site: response.data });

                this.addActiveStates(this.data);
                this.render(this.data);
            }
        });
    },
    data () {
        return {
            statesJSON: {
                AL: "Alabama",
                AK: "Alaska",
                AS: "American Samoa",
                AZ: "Arizona",
                AR: "Arkansas",
                CA: "California",
                CO: "Colorado",
                CT: "Connecticut",
                DE: "Delaware",
                DC: "District Of Columbia",
                FM: "Federated States Of Micronesia",
                FL: "Florida",
                GA: "Georgia",
                GU: "Guam",
                HI: "Hawaii",
                ID: "Idaho",
                IL: "Illinois",
                IN: "Indiana",
                IA: "Iowa",
                KS: "Kansas",
                KY: "Kentucky",
                LA: "Louisiana",
                ME: "Maine",
                MH: "Marshall Islands",
                MD: "Maryland",
                MA: "Massachusetts",
                MI: "Michigan",
                MN: "Minnesota",
                MS: "Mississippi",
                MO: "Missouri",
                MT: "Montana",
                NE: "Nebraska",
                NV: "Nevada",
                NH: "New Hampshire",
                NJ: "New Jersey",
                NM: "New Mexico",
                NY: "New York",
                NC: "North Carolina",
                ND: "North Dakota",
                MP: "Northern Mariana Islands",
                OH: "Ohio",
                OK: "Oklahoma",
                OR: "Oregon",
                PW: "Palau",
                PA: "Pennsylvania",
                PR: "Puerto Rico",
                RI: "Rhode Island",
                SC: "South Carolina",
                SD: "South Dakota",
                TN: "Tennessee",
                TX: "Texas",
                UT: "Utah",
                VT: "Vermont",
                VI: "Virgin Islands",
                VA: "Virginia",
                WA: "Washington",
                WV: "West Virginia",
                WI: "Wisconsin",
                WY: "Wyoming"
            }
        };
    },
    cacheDOM (parent) {
        const body = parent;

        this.list = body.querySelector("#portfolio-list");
        this.map = body.querySelector("#svg-us-map");
        this.labels = util.toArray(body.querySelectorAll("text"));
        this.states = this.filterStates(util.toArray(body.querySelectorAll("path")));
    },
    filterStates (array) {
        return array.filter((item) => {
            let result = false;

            if (item.id.length < 3) {
                item.classList.add("state");
                item.addEventListener("click", (e) => {
                    ListEvents.emit("map-click", { data: e });
                });
                this.labels.forEach((filter) => {
                    const str = filter.textContent.replace(/\s/g, "");

                    if (str === item.id) {
                        item.setAttribute("data-label", filter.id);
                    }
                });

                result = item;
            }

            return result;
        });
    },
    addActiveStates (data) {
        let presentStates = [];

        data.site.items.forEach((item) => {
            const address = item.location.addressLine2;

            if (address && address.length > 0) {
                for (const state in this.data.statesJSON) {
                    if (state) {
                        const index = address.indexOf(state);

                        if (index > -1) {
                            presentStates.push(state);
                        }
                    }
                }
            }
        });

        presentStates = util.dup(presentStates);

        this.data.presentStates = presentStates.map((item, i) => {
            return {
                id: `id_${ i + 1}`,
                abbrev: item,
                fullName: this.data.statesJSON[ item ],
                isActive: false,
                visible: true
            };
        });

        presentStates.forEach((tagName) => {
            const activeState = document.getElementById(tagName);

            if (activeState) {
                activeState.classList.add("active");
            }

            const target = document.getElementById((document.getElementById(tagName).dataset.label));

            if (target) {
                target.classList.add("active");
            }
        });
    },
    render (data) {
        Vue.component("portfolio-list", portfolioList(data, ListEvents));

        const list = new Vue({
            el: "#portfolio-list"
        });

        return list;
    }
};

export default portfolioListController;