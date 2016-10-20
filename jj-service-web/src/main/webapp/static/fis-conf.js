fis.hook('amd', {
  baseUrl: "./js",
  paths: {
    'Handlebars': 'lib/handlebars.runtime-v3.0.3'
  }
});
fis.match('*.{js,css}', {
  useHash: true
});

fis.match('*', {
  release: '/static/$0'
});

fis.match('*.html', {
  release: '/$0'
});

//npm install -g fis-parser-handlebars-3.x
fis.match('*.handlebars', {
  rExt: '.js', // from .handlebars to .js 虽然源文件不需要编译，但是还是要转换为 .js 后缀
  parser: fis.plugin('handlebars-3.x', {
    //fis-parser-handlebars-3.x option
  }),
  release: false // handlebars 源文件不需要编译
});

fis.match('::package', {
  postpackager: fis.plugin('loader', {
    allInOne: true,
    sourceMap: true,
    useInlineMap: true
  })
});

fis.media("prod").match("**.js",{
  optimizer: fis.plugin('uglify-js')
});

fis.media("prod").match("**.css",{
  optimizer: fis.plugin('clean-css')
});

fis.media('prod').match('*.png', {
      optimizer: fis.plugin('png-compressor')
    });
