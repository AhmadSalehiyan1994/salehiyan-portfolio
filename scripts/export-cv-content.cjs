// Export only public content for scripts/pdf/build_cv.py; no environment secrets.
const fs = require('node:fs');
const ts = require('typescript');
const output = {};
for (const name of ['content', 'research']) {
  const code = ts.transpileModule(fs.readFileSync(`lib/${name}.ts`, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const module = { exports: {} };
  new Function('exports', 'require', 'module', code)(module.exports, require, module);
  output[name] = module.exports;
}
process.stdout.write(JSON.stringify(output, null, 2));
