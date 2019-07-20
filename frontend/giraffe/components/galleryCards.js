import React from 'react';
import Async from 'react-async';
import CardDeck from 'react-bootstrap/CardDeck';

import GalleryElement from '../components/galleryElement';

async function loadExamples() {
  return await (await fetch('/static/misc/examples.json')).json();
}

const GalleryCards = () => (
  <Async promiseFn={loadExamples}>
    <Async.Loading>Loading...</Async.Loading>
    <Async.Fulfilled>
      {(examples) => (
        <CardDeck>
          {examples &&
            examples.map((example) => (
              <GalleryElement key={example.id} example={example} />
            ))}
        </CardDeck>
      )}
    </Async.Fulfilled>
    <Async.Rejected>
      {(error) => `Something went wrong: ${error.message}`}
    </Async.Rejected>
  </Async>
);

export default GalleryCards;
