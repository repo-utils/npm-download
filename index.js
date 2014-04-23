
var exec = require('child_process').exec

module.exports = function (options) {
  options = options || {}
  var tmpdir = options.tmpdir
    || require('os').tmpdir()
  var execOptions = {
    cwd: tmpdir
  }

  return function* download(repo, version, folder) {
    var name = repo + '-' + version + '.tgz'
    var commands = [
      'rm -rf ' + folder,
      'mkdir -p ' + folder,
      'npm pack ' + repo + '@"' + version + '"',
      'tar -xvzf ' + name + ' --strip-components=1 -C ' + folder,
      'rm ' + name,
    ]

    try {
      yield exec.bind(null, commands.join('; '), execOptions)
    } catch (err) {
      yield exec.bind(null, 'rm -rf ' + folder)
      throw err
    }
    return folder
  }
}
