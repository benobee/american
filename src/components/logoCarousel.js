import html from "./logoCarousel.html";

/**
 * Logo carousel component
 * @param  {Object} data for the component
 * @return {Object} Vue component config
 * @private
 */

const logoCarousel = (data) => {
    return {
        template: html,
        el: "#carousel-logos",
        data () {
            return {
                items: data.items,
                counter: 0,
                dataSlideIndex: 0,
                slideStyle: 0,
                carouselPageSize: 1,
                interval: 6000,
                hasPrev: false,
                hasNext: true
            };
        },
        computed: {
            slideIndex () {
                return this.dataSlideIndex;
            }
        },
        methods: {
            /**
             * Initialize the carousel, run and set the configuration options.
             * This method will translate the config options and set the the
             * interval accordingingly. Using config for readability. It also
             * sets the style to be injected and rotate the carousel with CSS
             * transforms.
             *
             * @param  {Object} config sets the carousel options
             * @private
             */

            initCarousel (config) {
                this.itemsPerPage = config.itemsPerPage;
                this.carouselPageSize = Math.ceil(this.items.length / config.itemsPerPage);
                this.interval = config.interval;
                this.startTimer();
            },
            stopTimer () {
                clearInterval(this.timer);
            },
            startTimer () {
                this.timer = setInterval(() => {
                    this.counter += 1;
                    this.changePage(this.counter); // setting a negative value for CSS transforms.
                }, this.interval);
            },

            /**
             * Sets the style from the given page index
             * @param  {Number} index the slide rotation page index based on
             * config options.
             * @private
             */

            changePage (index) {
                if (index === this.itemsPerPage - 1) {
                    this.hasNext = false;
                } else {
                    this.hasNext = true;
                }
                if (index > 0) {
                    this.hasPrev = true;
                } else {
                    this.hasPrev = false;
                }
                // reset the carousel if it's reached the page index limit
                if (index === this.carouselPageSize || index < 0) {
                    this.hasNext = true;
                    this.hasPrev = false;
                    this.counter = 0;
                }
                this.dataSlideIndex = this.counter;
                this.slideStyle = `transform: translateX(${-Math.abs(this.counter)}00%)`;
            },
            next () {
                const index = (this.counter += 1);

                this.stopTimer();
                this.changePage(index);
                this.startTimer();
            },
            prev () {
                const index = (this.counter -= 1);

                this.stopTimer();
                this.changePage(index);
                this.startTimer();
            }
        },
        mounted () {
            this.initCarousel({
                interval: 6000,
                itemsPerPage: 7,
                ui: true
            });
        }
    };
};

export default logoCarousel;
