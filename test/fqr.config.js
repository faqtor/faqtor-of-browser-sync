const { create } = require("../dist/index");
const { watch } = require("faqtor-of-watch");
const { all } = require("faqtor-of-promise-all");

const index = "./index.html";

const
    bc = create("Browser"),
    reload = bc.reload(index)
        .factor(index),
    serve = bc.init({
        server: {
            injectChanges: true,
            files: ["./*.html"]
        }
    });

module.exports = {
    all: all(
        serve,
        watch(reload),
    ),
}