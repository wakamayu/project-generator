var Docker = require('dockerode');
var Template = require('./template');

function init(options) {
    if (Object.keys(options.docker).length > -1) {
        var docker = new Docker(options.docker.config);
        var container = docker.getContainer(options.docker.name);
        container.inspect(function (err, data) {
            if (data != null) {
                Template.generate(options, Object.assign({}, data, options.docker.AdditionalOptions))
            }
        })
    }
}
module.exports = { init }
