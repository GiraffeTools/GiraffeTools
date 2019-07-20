import {DragDropContext} from 'react-dnd';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch';
import MultiBackend from 'react-dnd-multi-backend';

export default DragDropContext(MultiBackend(HTML5toTouch));
