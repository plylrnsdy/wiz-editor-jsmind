define(function (require, exports, module) {
	'use strict';

	var $ = require('jquery');

	var jm = require('jsmind/jsmind');
			 require('jsmind/jsmind.draggable_nodes');
			 require('jsmind/jsmind.css');

	var _jm;

    var wrapper = function(options){
    	_jm = this.jm = new jm(options);
    };

    wrapper.prototype = {
    	constructor: wrapper,
    	handle_addchild: function(e){
            var selected_node = _jm.get_selected_node();
            if(!!selected_node){
                var nodeid = jm.util.uuid.newid();
                var node = _jm.add_node(selected_node, nodeid, 'New Node');
                if(!!node){
                    _jm.select_node(nodeid);
                    _jm.begin_edit(nodeid);
                }
            }
        },
        handle_addbrother:function(e){
            var selected_node = _jm.get_selected_node();
            if(!!selected_node && !selected_node.isroot){
                var nodeid = jm.util.uuid.newid();
                var node = _jm.insert_node_after(selected_node, nodeid, 'New Node');
                if(!!node){
                    _jm.select_node(nodeid);
                    _jm.begin_edit(nodeid);
                }
            }
        },
        handle_editnode:function(e){
            var selected_node = _jm.get_selected_node();
            if(!!selected_node){
                _jm.begin_edit(selected_node);
            }
        },
        handle_delnode:function(e){
            var selected_node = _jm.get_selected_node();
            if(!!selected_node && !selected_node.isroot){
                _jm.select_node(selected_node.parent);
                _jm.remove_node(selected_node);
            }
        },
        handle_toggle:function(e){
            var evt = e || event;
            var selected_node = _jm.get_selected_node();
            if(!!selected_node){
                _jm.toggle_node(selected_node.id);
                evt.stopPropagation();
                evt.preventDefault();
            }
        },
        handle_up:function(e){
            var evt = e || event;
            var selected_node = _jm.get_selected_node();
            if(!!selected_node){
                var up_node = _jm.find_node_before(selected_node);
                if(!up_node){
                    var np = _jm.find_node_before(selected_node.parent);
                    if(!!np && np.children.length > 0){
                        up_node = np.children[np.children.length-1];
                    }
                }
                if(!!up_node){
                    _jm.select_node(up_node);
                }
                evt.stopPropagation();
                evt.preventDefault();
            }
        },

        handle_down:function(e){
            var evt = e || event;
            var selected_node = _jm.get_selected_node();
            if(!!selected_node){
                var down_node = _jm.find_node_after(selected_node);
                if(!down_node){
                    var np = _jm.find_node_after(selected_node.parent);
                    if(!!np && np.children.length > 0){
                        down_node = np.children[0];
                    }
                }
                if(!!down_node){
                    _jm.select_node(down_node);
                }
                evt.stopPropagation();
                evt.preventDefault();
            }
        },

        handle_left:function(e){
            _._handle_direction(e,jm.direction.left);
        },
        handle_right:function(e){
            _._handle_direction(e,jm.direction.right);
        },
		handle_settheme : function(record){
			_jm.set_theme(record.id);
		}
    }

    var _ = {
        _handle_direction:function(e,d){
            var evt = e || event;
            var selected_node = _jm.get_selected_node();
            var node = null;
            if(!!selected_node){
                if(selected_node.isroot){
                    var c = selected_node.children;
                    var children = [];
                    for(var i=0;i<c.length;i++){
                        if(c[i].direction === d){
                            children.push(i)
                        }
                    }
                    node = c[children[Math.floor((children.length-1)/2)]];
                }
                else if(selected_node.direction === d){
                    var children = selected_node.children;
                    var childrencount = children.length;
                    if(childrencount > 0){
                        node = children[Math.floor((childrencount-1)/2)]
                    }
                }else{
                    node = selected_node.parent;
                }
                if(!!node){
                    _jm.select_node(node);
                }
                evt.stopPropagation();
                evt.preventDefault();
            }
        }
    }

    module.exports = wrapper;
});