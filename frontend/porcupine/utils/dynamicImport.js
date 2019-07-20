import vm from 'vm';

const scripts = {};
// const modules = {}
// const linker = () => { throw new Error('dynamic-imports modules do not allow
// nested import statements') }

function dynamicProvide(name, code, {sandbox} = {}) {
  const script = new vm.Script(
      `(module => {${code};return module.exports})({exports:{}})`
  );
  scripts[name] = script.runInContext(vm.createContext(sandbox));
}

function dynamicRequire(name) {
  if (name in scripts) return scripts[name];
  else {
    throw new Error(
        `dynamic-imports unable to require(): "${name}" is not provided`
    );
  }
}

// function dynamicExport(name, code, { sandbox } = {}) {
// #TODO figure out:
// This feature is only available with the --experimental-vm-modules command
// flag enabled.
// let script = new vm.SourceTextModule(code)
// modules[name] = script.runInContext(vm.createContext(sandbox))

// Node 9 solution:
// modules[name] = new Promise(async resolve => {
//   debugger
//   let module = new vm.SourceTextModule(code, { context:
//   vm.createContext(sandbox) })
//   await module.link(linker)
//   module.instantiate()
//   debugger
//   await module.evaluate()
//   modules[name] = module.namespace
//   resolve()
// })
// }

// async function dynamicImport(name) {
//   if (name in modules) {
//     await modules[name]
//     return modules[name]
//   }
//   else {
//     throw new Error(`dynamic-imports unable to import(): "${name}" is not
//     exported`)
//   }
// }

export default async function scriptToGenerator(url, language) {
  const generatorCode = await (await fetch(url)).text();
  dynamicProvide(language, generatorCode);
  return await dynamicRequire(language);
}
