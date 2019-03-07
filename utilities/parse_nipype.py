import json
from nipype2json import node2json
import os.path as op
from importlib import import_module
from math import sin, cos, pi, floor
from copy import deepcopy


def filter_nodes(node_list):
    excluded_nodes = ['BaseInterface', 'IOBase']
    node_list = [n for n in node_list if hasattr(n, '__name__')
                 and not n.__name__.endswith('Command')
                 and n.__name__ not in excluded_nodes
                 and hasattr(n, 'input_spec')]
    return node_list


def get_rainbow_color(index):
    r = floor(sin(pi * index + 0 * pi / 3) * 127) + 128;
    g = floor(sin(pi * index + 2 * pi / 3) * 127) + 128;
    b = floor(sin(pi * index + 4 * pi / 3) * 127) + 128;
    return '#%02x%02x%02x' % (r, g, b)


def add_to_dictionary(node, dictionary, category_list):
    if len(category_list) is 0:
        if not 'nodes' in dictionary.keys():
            dictionary['nodes'] = []
        dictionary['nodes'].append(node)
        return
    if not 'categories' in dictionary.keys():
        dictionary['categories'] = []
    category_name = category_list.pop(0)
    existing_category = [category for category in dictionary['categories'] if category['name'] == category_name]
    if len(existing_category) is 0:
        new_category = { 'name': category_name }
        add_to_dictionary(node, new_category, category_list)
        dictionary['categories'].append(new_category)
    else:
        add_to_dictionary(node, existing_category[0], category_list)
    dictionary['categories'] = sorted(dictionary['categories'], reverse=False, key=lambda p: p['name'])


def insert_colours(sorted_nodes, colour_index, colour_spacing):
    sorted_nodes['colour'] = get_rainbow_color(colour_index)
    if 'categories' in sorted_nodes.keys() and sorted_nodes['categories']:
        colour_spacing /= len(sorted_nodes['categories'])
        for index, category in enumerate(sorted_nodes['categories']):
            insert_colours(category, colour_index + index * colour_spacing, colour_spacing)


interface_modules = ['utility', 'io', 'ants', 'fsl', 'afni', 'spm',
                    'freesurfer', 'camino', 'mrtrix', 'mne', 'slicer']
interface_modules = ['interfaces.' + m for m in interface_modules]

algorithm_modules = ['confounds', 'icc', 'mesh', 'metrics', 'misc', 'modelgen',
                    'rapidart']
algorithm_modules = ['algorithms.' + m for m in algorithm_modules]
all_modules = [interface_modules, algorithm_modules]
all_modules = [item for sublist in all_modules for item in sublist]


dictionary = {}
for index, class_name in enumerate(all_modules):
    module = import_module("nipype.%s" % class_name)
    module_name = module.__name__

    node_list = [getattr(module, n) for n in dir(module) if n[0].isupper() or n[0].isdigit()]
    node_list = filter_nodes(node_list)
    nodes = [node2json(node, module=class_name) for node in node_list]
    [add_to_dictionary(node, dictionary, deepcopy(node['category'])) for node in nodes]


insert_colours(dictionary, 0.0, 1.0)
toolboxes = [{
    'name': "Nipype",
    'categories': dictionary['categories'],
}]

with open('toolboxes.json', 'w') as outfile:
    # json.dump({'toolboxes': toolboxes}, outfile, sort_keys=False, indent=2)
    json.dump({'toolboxes': toolboxes}, outfile, separators=(',', ':'))
