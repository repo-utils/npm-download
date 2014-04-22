var exec = require('child_process').exec

module.exports = function* download(repo, version, folder) {
  var commands = [
    'rm -rf ' + folder,
    'mkdir -p ' + folder,
    'curl https://registry.npmjs.org/'
      + repo + '/-/' + repo + '-' + version + '.tgz'
      + ' | tar -xvz --strip-components=1 -C ' + folder
  ]
  try {
    yield exec.bind(null, commands.join('; '))
  } catch (err) {
    yield exec.bind(null, 'rm -rf ' + folder)
    throw err
  }
  return folder
}
