//import globals from "globals";
//import pluginJs from "@eslint/js";


//export default [
//  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
//  {languageOptions: { globals: globals.browser }},
//  pluginJs.configs.recommended,
//];

import globals from "globals";
import js from "@eslint/js";
import jest from "eslint-plugin-jest";
import standard from 'eslint-config-standard';

delete standard.rules["import/export"];
delete standard.rules["import/first"];
delete standard.rules["import/no-absolute-path"];
delete standard.rules["import/no-duplicates"];
delete standard.rules["import/no-named-default"];
// delete standard.rules[];
delete standard.rules["import/no-webpack-loader-syntax"];


delete standard.rules["n/handle-callback-err"];
delete standard.rules["n/no-deprecated-api"];
delete standard.rules["n/no-callback-literal"];
delete standard.rules["n/no-exports-assign"];
delete standard.rules["n/no-new-require"];
delete standard.rules["n/no-path-concat"];
delete standard.rules["n/process-exit-as-throw"];
delete standard.rules["promise/param-names"];
delete standard.rules["n/no-deprecated-api"];

//standard.rules;
export default [
  js.configs.recommended,
  {
    "env": {
      "node": true
    },
    files: ["./**.js"],
    ignores:[ 'node_modules/'],
    languageOptions: {
      sourceType: "commonjs"
    },
    ...jest.configs['flat/style'],
    plugins: {
      jest
    },
    "rules": {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
      ...standard.rules,
      "semi": ["error", "always"]
    }
  },
  {
    languageOptions: {
      globals: globals.node
    },
  }
];

