import { ORM } from 'redux-orm';
import Link from './models/link';
import Node from './models/node';
import Port from './models/port';


const orm = new ORM();
orm.register(Link, Node, Port);

export default orm;
