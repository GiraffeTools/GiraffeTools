import {
  writeCode as nipypeCode,
  writeFiles as nipypeSave,
} from './CodeGenerators/generators/nipype/nipype';
import {
  writeCode as dockerCode,
  writeFiles as dockerSave,
} from './CodeGenerators/generators/docker/docker';
import {
  writeCode as kerasCode,
  writeFiles as kerasflowSave,
} from './CodeGenerators/generators/keras/keras';
import {
  writeCode as unknownCode,
  // writeFiles as unknownSave
} from './CodeGenerators/generators/unknown/unknown';

export default function defaultGenerators() {
  const generators = [];
  generators.push({
    language: 'Nipype',
    format: 'python',
    generator: nipypeCode,
    save: nipypeSave,
  });
  generators.push({
    language: 'Docker',
    format: 'dockerfile',
    generator: dockerCode,
    save: dockerSave,
  });
  generators.push({
    language: 'Keras',
    format: 'python',
    generator: kerasCode,
    save: kerasflowSave,
  });
  generators.push({
    language: 'Unknown',
    format: '',
    generator: unknownCode,
    // save: unknownSave
  });
  return generators;
}
