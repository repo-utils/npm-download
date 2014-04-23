
var fs = require('fs')
var co = require('co')
var assert = require('assert')

var download = require('.')()

it('should download domify@1.2.2', co(function* () {
  var folder = process.cwd() + '/components'
  yield* download('domify', '1.2.2', folder)
  var json = fs.readFileSync(process.cwd() + '/components/package.json')
  assert.equal(JSON.parse(json).version, '1.2.2')
}))
