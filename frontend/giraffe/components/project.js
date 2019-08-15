import React from 'react';
import Radium from 'radium';
import {v4} from 'uuid';

import SeparatorWithOpenCircle from './separatorWithOpenCircle';
import {savePorkFile} from '../../porcupine/utils/savePorkFile';
import styles from '../styles/project.js';

const Project = ({repository, openModal}) => (
  <div
    className="d-flex"
    style={[
      styles.project,
      !repository.isGiraffeProject && styles.project.noGiraffe,
    ]}
  >
    <div className="col-6 text-left">
      <div className="d-flex align-items-center">
        <h5 className="float-left" style={[styles.projectTitle]}>
          {repository.name}
        </h5>
        <div style={[styles.publicPrivate]}>
          {repository.private ? 'Private' : 'Public'}
        </div>
      </div>
      <SeparatorWithOpenCircle
        color="secondary"
        thickness={'1px'}
        styleOverwrite={styles.componentStyles}
      />
      <div>
        added{' '}
        {new Intl.DateTimeFormat('en-GB', {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
        }).format(new Date(repository.created_at))}
      </div>
    </div>
    <div className="col-6 text-right">
      {repository.isGiraffeProject ? (
        <a
          type="button btn-primary"
          className="btn"
          href={`/github/${repository.full_name}`}
          style={[styles.open]}
        >
          open
        </a>
      ) : (
        <a
          type="button btn-primary"
          className="btn"
          id="no-giraffe-project"
          data-toggle="tooltip"
          data-placement="top"
          onClick={() =>
            openModal({
              id: v4(),
              title:
                'Do you want to initialise this' +
                'repository as a GiraffeTools project?',
              type: 'push_to_github',
              project: {
                user: repository.owner.login,
                repository: repository.name,
              },
              onClose: () => {},
              onConfirm: () => savePorkFile(),
            })
          }
          style={[styles.add]}
        >
          add
        </a>
      )}
    </div>
  </div>
);

export default Radium(Project);
