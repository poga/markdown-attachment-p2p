const Dat = require('dat-js')
const fm = require('front-matter')
const yaml = require('js-yaml')

function attach (markdown, dir, cb) {
  var dat = Dat({dir: dir})
  dat.share(err => {
    if (err) return cb(err)

    // update front matter
    var parsed
    var meta
    var body
    if (fm.test(markdown)) {
      parsed = fm(markdown)
      meta = parsed.attributes
      body = parsed.body
    } else {
      meta = {}
      body = markdown
    }
    meta.attachment = dat.key.toString('hex')
    cb(null, dat, `---\n${yaml.safeDump(meta)}\n---\n${body}`)
  })
}

function sync (markdown, dir, cb) {
  var parsed = fm(markdown)
  var dat = Dat({dir: dir, key: parsed.attributes.attachment})
  dat.download()
  dat.on('download-finished', err => {
    if (err) return cb(err)

    cb(null, dat)
  })
}

function close (dat, cb) {
  dat.close(() => { dat.db.close(cb) })
}

module.exports = {attach, sync, close}
