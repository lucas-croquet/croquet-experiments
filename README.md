# croquet-experiments
This is a set of experiments written in Croquet and Three.



# How this was made

1. Initialize a package
```npm init -y```

2. Install Webpack
```npm install webpack webpack-cli --save-dev```
using save-dev because this is for dev purposes

3. Install Croquet
```npm install @croquet/croquet --save```
using --save because this is going to be bundled into my production bundle.

4. Install Three
```npm install three --save```
using --save because this is going to be bundled into my production bundle.

5. Run Webpack
```npx webpack```
this generates `dist/main.js` from `src/index.js` 

6. Created a webpack.config.js file
Now I can run
```npx webpack --config webpack.config.js```
or ```npx webpack``` as webpack.config.js is the default.

7. Add webpack as a build npm script
Add ```"build":"webpack"``` to package.json
Now I can run 
```npm run build``` as a shortcut for ```npx webpack``` 

## How to handle other files
1. Install a css loader
```npm install --save-dev style-loader css-loader```

https://webpack.js.org/guides/asset-management/#setup


## How to run live development server
1. Grab `webpack-dev-server` as a development bundle
```npm install --save-dev webpack-dev-server```



# Notes
npm start could run:
```webpack serve --no-hot --mode development --devtool source-map```