import { ORM } from "redux-orm";

import Link from "./link";
import Parameter from "./parameter";
import Port from "./port";
import Node from "./node";

const orm = new ORM();
orm.register(Link, Parameter, Port, Node);

export default orm;
