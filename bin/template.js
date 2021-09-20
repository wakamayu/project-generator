const ejs = require('ejs');
const fs = require('fs');
const Path = require('path');

function getFileNames(path, extension) {
    return fs
        .readdirSync(path)
        .filter(
            item =>
                fs.statSync(Path.join(path, item)).isFile() &&
                (extension === undefined || Path.extname(item) === extension)
        )
        .sort();
}

function generate(options, data) {
    generate_file(options, data);
    generate_structure(options, data);
}

function generate_structure(options, data) {
    if (options.templateConfig != null) {
        var jsonRecipe = JSON.parse(fs.readFileSync(options.templateConfig), 'utf8');
        if (jsonRecipe.structureFolder && jsonRecipe.structureFolder.length > 0) {
            jsonRecipe.structureFolder.forEach(function (k) {
                var item = ejs.compile(k)(data)
                if (!fs.existsSync(Path.join(options.outputSource, item))) {
                    fs.mkdirSync(Path.join(options.outputSource, item), { recursive: true });
                }
            })
        }
        if (jsonRecipe.structureFile) {
            Object.keys(jsonRecipe.structureFile).forEach(function (k) {
                let key = Path.join(options.template, k);
                let path_file = ejs.compile(Path.join(options.outputSource, jsonRecipe.structureFile[k]))(data);
                fs.writeFileSync(path_file, options.compile[key], { encoding: "UTF-8" })
            })
        }
    }

}

function generate_file(options, data) {
    options.compile = [];
    getFileNames(options.template, '.ejs').forEach((file) => {
        console.log("Generate : " + Path.join(options.template, file))
        options.compile[Path.join(options.template, file)] = ejs.compile(fs.readFileSync(Path.join(options.template, file), 'utf8'))(data);
    })
}

module.exports = {
    generate
}