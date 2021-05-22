/*
 * Copyright 2020 Arkadip Bhattacharya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



import license from 'rollup-plugin-license';
import {terser} from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { visualizer } from 'rollup-plugin-visualizer';

import pkg from './package.json';

const licenseBanner = license({
  banner: {
    content: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> */',
    commentStyle: 'none',
  },
});

export default [
  {
    input: {
      index: 'src/index.tsx',
      hooks: 'src/hooks/index.ts',
      hoc: 'src/higherOrderComponents/index.ts'
    },
    output: [
      {
        dir: "dist",
        format: 'cjs',
        sourcemap: false
      },
      {
        dir: "dist",
        format: 'esm',
        sourcemap: false
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      typescript(),
      //terser(),
      filesize(),
      visualizer()
    ],
  },
  {
    input: 'src/index.tsx',
    output: [
      {
        file: pkg.main.replace('.js', '.umd.js'),
        format: 'umd',
        name: 'ReactAuthKit',
        globals: {
          "react": "React",
          "js-cookie": "Cookies",
          "react-router-dom":"ReactRouterDOM"
        },
        sourcemap: false
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      typescript(),
      //terser(),
      licenseBanner,
      filesize(),
    ],
  },
];
