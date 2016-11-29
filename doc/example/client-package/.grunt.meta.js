/**
 * Define files to be included in build.
 * All paths are relative to node_modules folder.
 *
 * @type {{vendor: {js: string[], css: string[], fonts: string[]}}}
 */
module.exports = {
    vendor: {
        js: [
            // javascript and map files
            'path/to/node/module/script.js'
        ],
        css: [
            // css and map files
            'path/to/node/module/styles.css'
        ],
        fonts: [
            // fonts
            'path/to/node/module/fonts/*'
        ]
    }
};