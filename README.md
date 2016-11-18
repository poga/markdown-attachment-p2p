# markdown-attachment-p2p

Attach files to markdown file and sync them across the network with a p2p file-sharing protocol.

Attachments are live. You can update attached files, add new files... etc and it will automatically sync across peers.

## Usage

```js
const {attach, sync, close} = require('markdown-attachment-p2p')
const fs = require('fs')

var attachDir = './foo'

// attach all files in a directory to a markdown
attach(fs.readFileSync('test.md'), attachDir, (err, dat, md) => {
  console.log('your share key:', dat.key.toString('hex'))
  console.log('modified markdown:', md)

  // download attachments from markdown
  sync(md, './download', (err, dat2) => {
    // done, close connection
    close(dat, () => {
      close(dat2, () => {
        console.log('done')
      })
    })
  })
})
```

## License

The MIT License

