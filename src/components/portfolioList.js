import html from "./portfolioList.html";

const portfolioList = (data, events) => {
    return {
        template: html,
        data () {
            return {
                search: {
                    isActive: false,
                    category: "",
                    location: ""
                },
                items: data.site.items,
                categories: this.filterToObject(data.site.collection.categories),
                scrollHeight: 0,
                currentItems: [],
                presentStates: [],
                pagination: {
                    scrollBottom: false,
                    pageLimit: 6,
                    currentIndex: 0
                },
                lifecycle: {
                    appLoaded: false
                }
            };
        },
        filters: {
            slugify (value) {
                return value.toLowerCase().replace(/ /g, "-").replace(/-&-/g, "-").replace(/[^\w-]+/g, "");
            }
        },
        computed: {
            moreThanOne () {
                let isMore = false;

                if (this.presentStates.length > 1) {
                    isMore = true;
                }

                return isMore;
            },
            isScrolling () {
                let scrolling = false;

                if (this.scrollHeight < this.listTop) {
                    scrolling = true;
                }

                return scrolling;
            },
            renderList () {
                let array = this.items.slice(0);

                this.presentStates = data.presentStates;

                if (this.search.category) {

                    array = array.slice(0).filter((item) => {
                        let result = true;

                        if ((this.search.category && this.search.category.length > 0)) {
                            result = (item.categories[ 0 ] === this.search.category);
                        }

                        return (result);
                    });

                    if (!this.search.location) {
                        this.presentStates = this.filterLocationTags(array);
                    }
                }

                if (this.search.location) {
                    array = array.slice(0).filter((item) => {
                        let result = false;

                        const address = item.location.addressLine2;

                        const index = address.indexOf(this.search.location);

                        if (index > -1) {
                            result = item;
                        }

                        return result;
                    });
                }

                array = this.paginate(array);

                return array;
            },
            appLoaded () {
                let className = "";

                if (this.lifecycle.appLoaded) {
                    className = "data-loaded";
                }

                return className;
            }
        },
        methods: {
            dup (array) {
                return array.filter((elem, index, self) => {
                    return index === self.indexOf(elem);
                });
            },
            filterLocationTags (currentItems) {
                let array = this.presentStates.slice(0);

                let parsedStates = [];

                currentItems.forEach((item) => {
                    const address = item.location.addressLine2;

                    for (const state in data.statesJSON) {
                        if (state) {
                            const index = address.indexOf(state);

                            if (index > -1) {
                                parsedStates.push(state);
                            }
                        }
                    }
                });

                parsedStates = this.dup(parsedStates);

                array = array.map((item) => {
                    const index = parsedStates.indexOf(item.abbrev);

                    if (index === -1) {
                        item.visible = false;
                    } else {
                        item.visible = true;
                    }

                    return item;
                });

                return array;
            },
            generateUID () {
                let firstPart = (Math.random() * 46656) | 0;
                let secondPart = (Math.random() * 46656) | 0;

                firstPart = (`000${ firstPart.toString(36)}`).slice(-3);
                secondPart = (`000${ secondPart.toString(36)}`).slice(-3);
                return firstPart + secondPart;
            },
            slugify (value) {
                return value.toLowerCase().replace(/ /g, "-").replace(/-&-/g, "-").replace(/[^\w-]+/g, "");
            },
            resetAll () {
                //reset search
                this.search.category = "";
                this.search.location = "";
                this.cleanupScrollEvents();

                //make all categories inactive to allow for toggle behaviour
                this.categories.forEach((item) => {
                    this.$set(item, "isActive", false);
                });

                this.bindScrollEvents();
            },
            resetLocations () {
                this.presentStates.forEach((item) => {
                    this.$set(item, "isActive", false);
                });

                this.presentStates = data.presentStates;
            },
            paginate (array) {
                //limit the active items list based on page index to allow for
                //infinite scroll and append
                array = array.splice(0, this.pagination.currentIndex + this.pagination.pageLimit);

                return array;
            },
            sortByTitle (array) {
                array.sort((first, next) => {
                    if (first.fullName < next.fullName) {
                        return -1;
                    }
                    if (first.fullName > next.fullName) {
                        return 1;
                    }
                    return 0;
                });

                return array;
            },
            bindScrollEvents () {
                window.addEventListener("load", this.executeScrollFunctions);
                window.addEventListener("scroll", this.executeScrollFunctions);
            },
            cleanupScrollEvents () {
                window.removeEventListener("load", this.executeScrollFunctions);
                window.removeEventListener("scroll", this.executeScrollFunctions);
            },
            executeScrollFunctions () {
                const grid = this.$el.querySelector("#portfolio-list .collection-list");
                const height = window.innerHeight;
                const domRect = grid.getBoundingClientRect();
                const triggerAmount = height - domRect.bottom;
                const body = document.body.getBoundingClientRect();

                this.scrollHeight = body.top;

                if (domRect.top < -250) {
                    events.emit("show-back-to-top-button", {
                        state: true,
                        distanceAway: domRect.top
                    });
                } else {
                    events.emit("show-back-to-top-button", { state: false });
                }

                //show next page of pagination list
                this.appendItems(triggerAmount);
            },
            appendItems (triggerAmount) {
                //when the page is scrolled to the bottom of the current items
                //the next set or page of items will be auto appened to the bottom
                if (triggerAmount > 0 && !this.pagination.scrollBottom) {
                    this.pagination.scrollBottom = true;
                    const current = this.pagination.currentIndex;

                    this.pagination.currentIndex = current + this.pagination.pageLimit + 1;
                    this.pagination.scrollBottom = false;
                }
            },
            filterToObject (array) {
                //convert filter to object with id and active props
                array = array.map((item) => {

                    const filter = {
                        id: this.generateUID(),
                        name: item,
                        slug: this.slugify(item),
                        isActive: false
                    };

                    return filter;
                });

                return array;
            },
            scrollTop (target) {
                let top = 0;

                if (window.innerWidth > 960) {
                    top = target;
                }

                const params = {
                    top,
                    left: 0
                };

                if (this.scrollHeight > -1500) {
                    params.behavior = "smooth";
                }

                window.scroll(params);
            },
            filterByLocation (location) {
                this.pagination.currentIndex = 0;
                let abbrev = "";

                if (location.fromMap) {
                    this.scrollTop(960);
                    abbrev = location.id;
                    this.resetLocations();
                    this.presentStates.map((item) => {
                        item.visible = true;
                        if (item.abbrev === abbrev) {
                            item.isActive = true;
                        }

                        return item;
                    });
                } else {
                    abbrev = location.abbrev;
                    if (!location.isActive) {
                        this.resetLocations();
                        location.isActive = true;
                    } else {
                        location.isActive = false;
                    }
                }

                const i = this.search.location.indexOf(abbrev);

                if (i === -1) {
                    //toggle between tags
                    this.search.location = "";
                    this.search.location = abbrev;
                } else {
                    //if item is active toggle off
                    this.search.location = "";
                }
            },
            filterByCategory (filter) {
                //category filters
                this.scrollTop(890);
                this.pagination.currentIndex = 0;
                this.resetLocations();

                if (!filter.isActive) {
                    this.resetAll();
                    filter.isActive = true;
                } else {
                    this.presentStates.map((item) => {
                        item.visible = true;
                    });
                    this.search.location = "";
                    filter.isActive = false;
                }

                if (this.search.category !== filter.name) {
                    //toggle between categories
                    this.search.category = filter.name;
                } else {
                    //toggle off if active
                    this.search.category = "";
                }
            }
        },
        mounted () {
            setTimeout(() => {
                this.lifecycle.appLoaded = true;
                this.bindScrollEvents();
            }, 600);

            events.on("map-click", (stateData) => {
                const item = stateData.data.currentTarget;

                this.resetAll();
                this.filterByLocation({ id: item.id, fromMap: true });
            });
        }
    };
};

export default portfolioList;