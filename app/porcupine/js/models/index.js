import { ORM } from "redux-orm";

import Link from "../models/link";
import Parameter from "../models/parameter";
import Port from "../models/port";
import Node from "../models/node";

const orm = new ORM();
orm.register(Link, Parameter, Port, Node);

export default orm;
