import { ORM } from 'redux-orm';

import Link from '../models/link';
import Port from '../models/port';
import Node from '../models/node';


const orm = new ORM();
orm.register(Link, Port, Node);

export default orm;
