// require.context(directory, useSubdirectories = false, regExp = /^\.\//)
const context = require.context('../src', true, /-test\.js$/)

//Iterate and run all the found files
context.keys().forEach(context)

module.exports = context
