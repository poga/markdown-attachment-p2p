const attachment = require('..')
const fs = require('fs')
const tape = require('tape')
const fm = require('front-matter')
const rimraf = require('rimraf')

rimraf.sync('./test/.dat')
rimraf.sync('./test-out/')
fs.mkdirSync('./test-out')

tape('test', function (t) {
  attachment.attach(fs.readFileSync('test/test.md'), './test/', (err, dat, md) => {
    t.error(err)
    t.ok(dat.key)
    t.ok(fm(md).attributes.attachment)

    attachment.sync(md, './test-out/', (err, dat2) => {
      t.error(err)
      t.ok(fs.statSync('./test-out/test.js'))
      t.ok(fs.statSync('./test-out/test.md'))
      t.ok(fs.statSync('./test-out/data'))
      attachment.close(dat, () => {
        attachment.close(dat2, () => {
          t.end()
        })
      })
    })
  })
})
