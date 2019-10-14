import util from "../util/util";

/**
 * All obects, components, event listeners localized to the portfolio item view
 * @type {Object}
 * @name portfolioItemController
 */
const portfolioItemController = {
    init (parent) {
        util.getData(location.pathname, (response) => {
            if (response.data.item.location) {
                this.methods.map(response.data.item.location);
            }
        });
        this.events.init(parent);
        this.methods.tentantRoster();
    },
    events: {
        init (parent) {
            this.cacheDOM(parent);
            this.tabClick();
        },
        cacheDOM (parent) {
            this.parent = parent;
            this.tabs = parent.querySelectorAll(".tabs .tab");
            this.content = parent.querySelectorAll(".page-content");
        },
        tabClick () {
            const activeStates = (target) => {
                this.tabs.forEach((item) => {
                    item.classList.remove("active");
                });

                this.content.forEach((item) => {
                    item.classList.remove("active");
                });

                target.classList.add("active");
            };

            const selectContent = (el) => {
                const id = el.dataset.target;

                const target = this.parent.querySelector(`.page-content[data-id='${id}']`);

                target.classList.add("active");
            };

            this.tabs.forEach((item) => {
                item.addEventListener("click", (e) => {
                    activeStates(e.currentTarget);
                    selectContent(e.currentTarget);
                });
            });
        }
    },
    methods: {
        tentantRoster () {
            /*
               Get data from google spreadsheet published webpage.
               Link is retrieved from a data attribute on the page
               stored in the CMS. If the page returns an error, then
               the link from the page will be displayed for the user until
               the error can be fixed.
            */

            const el = document.querySelector(".tenant-roster");

            const url = el.dataset.url;

            util.getData(url, (response) => {
                if (!response) {
                    document.querySelector(".tenant-roster-link").classList.remove("hidden");
                }

                const html = document.createElement(html);

                html.innerHTML = response.request.responseText;

                const table = html.querySelector("table");

                el.innerHTML = table.outerHTML;
            });
        },
        map (data) {
            const uluru = { lat: data.mapLat, lng: data.mapLng };
            const map = new window.google.maps.Map(document.getElementById("map"), {
                zoom: data.mapZoom,
                center: uluru,
                disableDefaultUI: false,
                styles: [
                    {
                        featureType: "administrative",
                        elementType: "all",
                        stylers: [
                            {
                                saturation: "-100"
                            }
                        ]
                    },
                    {
                        featureType: "administrative.province",
                        elementType: "all",
                        stylers: [
                            {
                                visibility: "off"
                            }
                        ]
                    },
                    {
                        featureType: "landscape",
                        elementType: "all",
                        stylers: [
                            {
                                saturation: -100
                            },
                            {
                                lightness: 65
                            },
                            {
                                visibility: "on"
                            }
                        ]
                    },
                    {
                        featureType: "poi",
                        elementType: "all",
                        stylers: [
                            {
                                saturation: -100
                            },
                            {
                                lightness: "50"
                            },
                            {
                                visibility: "simplified"
                            }
                        ]
                    },
                    {
                        featureType: "road",
                        elementType: "all",
                        stylers: [
                            {
                                saturation: "-100"
                            }
                        ]
                    },
                    {
                        featureType: "road.highway",
                        elementType: "all",
                        stylers: [
                            {
                                visibility: "simplified"
                            }
                        ]
                    },
                    {
                        featureType: "road.arterial",
                        elementType: "all",
                        stylers: [
                            {
                                lightness: "30"
                            }
                        ]
                    },
                    {
                        featureType: "road.local",
                        elementType: "all",
                        stylers: [
                            {
                                lightness: "40"
                            }
                        ]
                    },
                    {
                        featureType: "transit",
                        elementType: "all",
                        stylers: [
                            {
                                saturation: -100
                            },
                            {
                                visibility: "simplified"
                            }
                        ]
                    },
                    {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [
                            {
                                hue: "#ffff00"
                            },
                            {
                                lightness: -25
                            },
                            {
                                saturation: -97
                            }
                        ]
                    },
                    {
                        featureType: "water",
                        elementType: "labels",
                        stylers: [
                            {
                                lightness: -25
                            },
                            {
                                saturation: -100
                            }
                        ]
                    }
                ]
            });

            console.log(map);

            const marker = new google.maps.Marker({
                position: uluru,
                map
            });

            return marker;
        }
    }
};

export default portfolioItemController;
