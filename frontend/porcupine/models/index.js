import {ORM} from 'redux-orm';

import Language from './language';
import Link from './link';
import Parameter from './parameter';
import Port from './port';
import Sticky from './sticky';
import Node from './node';

const orm = new ORM();
orm.register(Language, Link, Parameter, Port, Node, Sticky);

export default orm;
