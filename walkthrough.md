npm init
npm install --save-dev react react-dom

Edit package.json; copy react and react-dom from "devDependencies" into "peerDependencies" as well.


We need some babel:
  * @babel/preset-env, for compiling modern Javascript down to ES5
  * @babel/preset-react, for compiling JSX and other stuff down to Javascript

npm install --save-dev @babel/core @babel/preset-env @babel/preset-react


We need some rollup:
  * @rollup/plugin-babel, for using babel transpilation
  * @rollup/plugin-commonjs, to convert CommonJS modules to ES6, to be included in a Rollup bundle
  * @rollup/plugin-multi-entry, for getting our component entries
  * @rollup/plugin-node-resolve, for using third party modules in node_modules

npm install --save-dev rollup @rollup/plugin-babel @rollup/plugin-commonjs @rollup/plugin-multi-entry @rollup/plugin-node-resolve


Because we're configuring for a library (not an app), we'll follow the advice to use `babelHelpers: 'runtime'`, which involves some additional dependencies:
https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers

npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime


We need some TypeScript:

npm install --save-dev typescript @types/react @types/react-dom @rollup/plugin-typescript
npm install --save tslib


We need some testing:

npm install --save-dev jest babel-jest ts-jest @types/jest @testing-library/jest-dom @testing-library/react


We need soem Storybook:

npx -p @storybook/cli sb init — type react
