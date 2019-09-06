import React, {useState, useEffect} from 'react';
import {Light as SyntaxHighlighter} from 'react-syntax-highlighter';
// eslint-disable-next-line
import atomDark from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark';

import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import matlab from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
// eslint-disable-next-line
import dockerfile from 'react-syntax-highlighter/dist/esm/languages/hljs/dockerfile';
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('dockerfile', dockerfile);
SyntaxHighlighter.registerLanguage('matlab', matlab);
import {useDebounce} from '../../utils/hooks';

const unknownCode = 'Nothing to see here, move along!';

async function recomputeCode(generator, nodes, links) {
  if (generator) {
    let code;
    try {
      code = await generator(nodes, links);
    } catch (error) {
      console.error('There was an error in your code generator: ', error);
      return unknownCode;
    }
    if (typeof code !== 'string') {
      console.error('The created code is not a string');
      return unknownCode;
    }
    return code;
  }
  return unknownCode;
}

const DEBOUNCE_INTERVAL = 1000;
const Code = (props) => {
  // eslint-disable-next-line
  const [isComputing, setIsComputing] = useState(false);
  const [code, setCode] = useState('');


  const {grammar, nodes, links} = props;
  const generator = grammar && grammar.generator;
  const debouncedNodes = useDebounce(nodes, DEBOUNCE_INTERVAL);
  const debouncedLinks = useDebounce(links, DEBOUNCE_INTERVAL);

  useEffect(
      () => {
        async function debounce() {
          if (debouncedNodes && debouncedLinks) {
            setIsComputing(true);
            const code = await recomputeCode(generator, nodes, links);
            setIsComputing(false);
            setCode(code);
          } else {
            setCode('');
          }
        }
        debounce();
      },
      [debouncedNodes, debouncedLinks]
  );

  const format = grammar && grammar.format;
  return (
    <SyntaxHighlighter language={format} style={atomDark}>
      {code}
    </SyntaxHighlighter>
  );
};

export default Code;
