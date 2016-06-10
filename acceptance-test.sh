# Simple test
npm run example-simple

cmp examples/simple/annotated-reference.js examples/simple/dist/build.js && echo 'Simple test passed' || exit 123
