

const writePreamble = ({nodes}) => {
  let code = `
#!/usr/bin/env python
import sys
import nipype
import nipype.pipeline as pe
`
  // #TODO based on nodes, import packages
  return code;
};

const writeNodes = nodes => {
  let code = '';
  nodes && nodes.forEach(node => {
    code += itemToCode(node);
  });
  return code;
};

const itemToCode = node => {
  let code = '';
  let nodeType = true ? 'Node' : 'MapNode'; // #TODO condition on baing iterable
  let givenName = `my_${node.name}`;
  code += `
${givenName} = ${nodeType}(interface = ${node.name})
`;
  node.ports && node.ports.filter(port => port.value !== '').forEach(port => {
    if(port.isInput){
      code += `${givenName}.inputs.${port.name} = ${port.value}
`;
    }
  });
  return code;
};

const writePostamble = () => {
  return `

#Run the workflow
plugin = 'MultiProc' #adjust your desired plugin here
plugin_args = {'n_procs': 1} #adjust to your number of cores
analysisflow.write_graph(graph2use='flat', format='png', simple_form=False)
analysisflow.run(plugin=plugin, plugin_args=plugin_args)
`;
}

const NipypeCode = ({nodes, links}) => {
  let code = `#This is a Nipype generator. Warning, here be dragons.
  `;

  code += (
    writePreamble(nodes) +
    // writeParameters() + // #TODO Make parameter editor and write out
    writeNodes(nodes) +
    // writeLinks(links) +
    writePostamble()
  );
  return code;
};


export default NipypeCode;
