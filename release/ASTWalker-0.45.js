// The code template begins here
"use strict";

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  // let the private classes out

  var ASTWalker_prototype = function ASTWalker_prototype() {
    // Then create the traits and subclasses for this class here...

    // trait comes here...

    (function (_myTrait_) {

      // Initialize static variables here...

      /**
       * Binds event name to event function
       * @param string en  - Event name
       * @param float ef
       */
      _myTrait_.on = function (en, ef) {
        if (!this._ev) this._ev = {};
        if (!this._ev[en]) this._ev[en] = [];

        this._ev[en].push(ef);
        return this;
      };

      /**
       * @param float name
       * @param float fn
       */
      _myTrait_.removeListener = function (name, fn) {
        if (!this._ev) return;
        if (!this._ev[name]) return;

        var list = this._ev[name];

        for (var i = 0; i < list.length; i++) {
          if (list[i] == fn) {
            list.splice(i, 1);
            return;
          }
        }
      };

      /**
       * triggers event with data and optional function
       * @param string en
       * @param float data
       * @param float fn
       */
      _myTrait_.trigger = function (en, data, fn) {

        if (!this._ev) return;
        if (!this._ev[en]) return;
        var me = this;
        this._ev[en].forEach(function (cb) {
          cb(data, fn);
        });
        return this;
      };
    })(this);

    (function (_myTrait_) {
      var _cnt;

      // Initialize static variables here...

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ArrayExpression = function (node, ctx) {

        var me = this;

        // Check values...
        if (node.elements && node.elements.length >= 0) {
          // Walk the array elements
          this.out("[");
          var cnt = 0;
          node.elements.forEach(function (e) {
            if (cnt++ > 0) me.out(",");
            me.trigger("ArrayElement", e);
            me.walk(e, ctx);
          });
          this.out("]");
        }
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ArrayPattern = function (node, ctx) {
        var me = this;

        // Check values...
        if (node.elements && node.elements.length > 0) {
          // Walk the array elements
          this.out("[");
          var cnt = 0;
          node.elements.forEach(function (e) {
            if (cnt++ > 0) me.out(",");
            me.trigger("ArrayElement", e);
            me.walk(e, ctx);
          });
          this.out("]");
        }
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ArrowExpression = function (node, ctx) {};

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.ArrowFunctionExpression = function (node, ctx) {

        this.out("function");

        if (node.generator) {
          this.trigger("FunctionGenerator", node);
          this.out("* ");
        }

        if (node.id && node.id.name) {
          console.log("ERROR: ArrowFunctionExpression should not have name");
          this.trigger("FunctionName", node);
          this.out(" " + node.id.name + " ");
        } else {
          this.trigger("FunctionAnonymous", node);
        }

        var me = this;
        this.out("(");
        var cnt = 0;

        node.params.forEach(function (p) {
          if (cnt++ > 0) me.out(",");
          me.trigger("FunctionParam", p);
          me.walk(p, ctx);
          if (node.defaults && node.defaults[cnt - 1]) {
            var defP = node.defaults[cnt - 1];
            me.out("=");
            me.trigger("FunctionDefaultParam", defP);
            me.walk(defP, ctx);
          }
        });

        this.out(")");
        me.trigger("FunctionBody", node.body);
        this.walk(node.body, ctx);
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.AssignmentExpression = function (node, ctx) {

        this.trigger("AssigmentLeft", node.left);
        this.walk(node.left, ctx);
        this.out(" " + node.operator + " ");
        this.trigger("AssigmentRight", node.right);
        this.walk(node.right, ctx);
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.BinaryExpression = function (node, ctx) {

        // var logicals = ["==", "<=", ">=", "==", "===", "!=", ]

        var bLeftNeedsPar = true,
            bRightNeedsPar = true;
        if (node.left.type == "Identifier" || node.left.type == "Literal") {
          bLeftNeedsPar = false;
        }
        if (node.right.type == "Identifier" || node.right.type == "Literal") {
          bRightNeedsPar = false;
        }

        if (bLeftNeedsPar) this.out("(");
        this.walk(node.left, ctx);
        if (bLeftNeedsPar) this.out(")");

        this.out(" " + node.operator + " ");

        if (bRightNeedsPar) this.out("(");
        this.walk(node.right, ctx);
        if (bRightNeedsPar) this.out(")");
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.BlockStatement = function (node, ctx) {

        // keeps at the same context right now I guess....
        this.out(" {", true);
        this.indent(1);
        this.walk(node.body, ctx, true);
        this.indent(-1);
        this.out("}");
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.BreakStatement = function (node, ctx) {
        this.nlIfNot();
        this.out("break ");
        if (node.label) this.walk(node.label, ctx);
        this.out("", true);
      };

      /**
       * @param float t
       */
      _myTrait_.breakWalk = function (t) {

        this._breakWalk = true;
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.CallExpression = function (node, ctx) {
        if (node.callee) {
          if (node.callee.type == "FunctionExpression") this.out("(");
          this.walk(node.callee, ctx);
          if (node.callee.type == "FunctionExpression") this.out(")");
          this.out("(");
          if (node.arguments) {
            var me = this,
                cnt = 0;
            node.arguments.forEach(function (n) {
              if (cnt++ > 0) me.out(", ");
              me.walk(n, ctx);
            });
          }
          this.out(")");
        }
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.CatchClause = function (node, ctx) {
        this.out(" catch ");

        if (node.param) {
          this.out("(");
          this.walk(node.param, ctx);
          this.out(")");
        }
        if (node.body) {
          this.walk(node.body, ctx);
        }
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ClassBody = function (node, ctx) {
        this.out("{", true);

        // walk the class body
        this.indent(1);
        this.walk(node.body, ctx);
        this.indent(-1);

        this.out("}", true);
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.ClassDeclaration = function (node, ctx) {

        this.out("class ");

        if (node.id) {
          this.walk(node.id, ctx);
          this.out(" ");
        }

        if (node.superClass) {
          this.trigger("Extends", node.superClass);
          this.out(" extends ");
          this.walk(node.superClass, ctx);
        }

        if (node.body) {
          this.walk(node.body, ctx);
        }
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ConditionalExpression = function (node, ctx) {

        this.walk(node.test, ctx);
        this.out(" ? ");
        this.walk(node.consequent, ctx);
        this.out(" : ");
        this.walk(node.alternate, ctx);

        /*
        interface ConditionalExpression <: Expression {
        type: "ConditionalExpression";
        test: Expression;
        alternate: Expression;
        consequent: Expression;
        }
        */
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ContinueStatement = function (node, ctx) {
        this.nlIfNot();
        this.out("continue ");
        if (node.label) this.walk(node.label, ctx);
        this.out("", true);
      };

      /**
       * @param Object parent  - Parent context
       */
      _myTrait_.createContext = function (parent) {

        if (!this._objects) {
          this._objects = {};
        }
        var id = this.createId();

        var ctx = {
          id: id,
          vars: {},
          functions: {},
          parentCtx: parent
        };
        this._objects[id] = ctx;

        return ctx;
      };

      /**
       * @param String prefix  - Opitional prefix
       */
      _myTrait_.createId = function (prefix) {
        if (!this._localId) {
          this._localId = 0;
        }
        this._localId++;
        return (prefix ? prefix : "") + this._localId;
      };

      /**
       * @param String id
       * @param float objData
       */
      _myTrait_.createObject = function (id, objData) {

        if (!this._objects) this._objects = {};

        this._objects[id] = objData;
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.DebuggerStatement = function (node, ctx) {
        this.nlIfNot();
        this.out("debugger;");
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.DoWhileStatement = function (node, ctx) {
        this.nlIfNot();
        this.out("do ", true);

        if (node.body) {
          var bNeedsPar = false;
          if (node.body.type != "BlockStatement" && node.body.type.indexOf("Statement") >= 0) {
            bNeedsPar = true;
          }
          if (bNeedsPar) {
            this.out("{");
            this.indent(1);
          }
          this.walk(node.body, ctx);
          if (bNeedsPar) {
            this.indent(-1);
            this.out("}");
          }
        }

        this.out(" ");
        if (node.test) {
          this.out("while(");
          this.trigger("DoWhileTest", node.test);
          this.walk(node.test, ctx);
          this.out(")");
        }

        this.out("", true);
      };

      /**
       * @param float t
       */
      _myTrait_.EmptyStatement = function (t) {};

      /**
       * @param float t
       */
      _myTrait_.endBlock = function (t) {
        this.out("}", true);
        this.indent(-1);
      };

      /**
       * @param float t
       */
      _myTrait_.endCollecting = function (t) {
        this._collecting = false;
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.ExpressionStatement = function (node, ctx) {
        this.nlIfNot();
        this.walk(node.expression, ctx);
        this.out(";", true);
      };

      /**
       * @param String id  - Object to look for
       */
      _myTrait_.find = function (id) {};

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ForInStatement = function (node, ctx) {
        this.nlIfNot();
        this.out("for");
        this.out("(");

        if (node.left) {
          this.trigger("ForInLeft", node.left);
          this.walk(node.left, ctx);
        }
        this.out(" in ");
        if (node.right) {
          this.trigger("ForInRight", node.right);
          this.walk(node.right, ctx);
        }
        this.out(")");

        if (node.body) {
          this.trigger("ForInBody", node.body);
          var bNeedsPar = false;
          if (node.body.type != "BlockStatement" && node.body.type.indexOf("Statement") >= 0) {
            bNeedsPar = true;
          }
          if (bNeedsPar) {
            this.out("{");
            this.indent(1);
          }
          this.walk(node.body, ctx);
          if (bNeedsPar) {
            this.indent(-1);
            this.out("}");
          }
        }

        this.out("", true);
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ForOfStatement = function (node, ctx) {
        this.nlIfNot();
        this.out("for");
        this.out("(");

        if (node.left) {
          this.trigger("ForOfLeft", node.left);
          this.walk(node.left, ctx);
        }
        this.out(" of ");
        if (node.right) {
          this.trigger("ForOfRight", node.right);
          this.walk(node.right, ctx);
        }
        this.out(")");

        if (node.body) {
          this.trigger("ForOfBody", node.body);
          var bNeedsPar = false;
          if (node.body.type != "BlockStatement" && node.body.type.indexOf("Statement") >= 0) {
            bNeedsPar = true;
          }
          if (bNeedsPar) {
            this.out("{");
            this.indent(1);
          }
          this.walk(node.body, ctx);
          if (bNeedsPar) {
            this.indent(-1);
            this.out("}");
          }
        }

        this.out("", true);
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ForStatement = function (node, ctx) {
        this.out("for");
        this.out("(");

        if (node.init) {
          this.walk(node.init, ctx);
        }
        this.out("; ");
        if (node.test) {
          this.walk(node.test, ctx);
        }
        this.out("; ");
        if (node.update) {
          this.walk(node.update, ctx);
        }
        this.out(")");

        if (node.body) {
          var bNeedsPar = false;
          if (node.body.type != "BlockStatement" && node.body.type.indexOf("Statement") >= 0) {
            bNeedsPar = true;
          }
          if (bNeedsPar) {
            this.out("{");
            this.indent(1);
          }
          this.walk(node.body, ctx);
          if (bNeedsPar) {
            this.indent(-1);
            this.out("}");
          }
        }

        this.out("", true);
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.FunctionDeclaration = function (node, ctx) {

        var subCtx = this.createContext(ctx);

        node.contextId = subCtx.id;

        this.out("function");

        if (node.generator) this.out("*");

        if (node.id && node.id.name) {
          this.trigger("FunctionName", node);
          this.out(" " + node.id.name + " ");
          if (node.id.name) {
            ctx.functions[node.id.name] = node;
          }
        } else {
          this.trigger("FunctionAnonymous", node);
        }

        var me = this;
        this.out("(");
        var cnt = 0;

        node.params.forEach(function (p) {
          if (cnt++ > 0) me.out(",");
          me.trigger("FunctionParam", p);
          me.walk(p, subCtx);
          if (node.defaults && node.defaults[cnt - 1]) {
            var defP = node.defaults[cnt - 1];
            me.out("=");
            me.trigger("FunctionDefaultParam", defP);
            me.walk(defP, subCtx);
          }
        });

        this.out(")");
        me.trigger("FunctionBody", node.body);
        this.walk(node.body, subCtx);
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.FunctionExpression = function (node, ctx) {

        var subCtx = this.createContext(ctx); // { parentCtx : ctx };

        node.contextId = subCtx.id;

        if (!this.__insideMethod) this.out("function");

        if (node.generator) {
          this.trigger("FunctionGenerator", node);
          this.out("* ");
        }

        if (node.id && node.id.name) {
          this.trigger("FunctionName", node);
          this.out(" " + node.id.name + " ");
          if (node.id.name) {
            ctx.functions[node.id.name] == node;
          }
        } else {
          this.trigger("FunctionAnonymous", node);
        }

        var me = this;
        this.out("(");
        var cnt = 0;

        node.params.forEach(function (p) {
          if (cnt++ > 0) me.out(",");
          me.trigger("FunctionParam", p);
          me.walk(p, subCtx);
          if (node.defaults && node.defaults[cnt - 1]) {
            var defP = node.defaults[cnt - 1];
            me.out("=");
            me.trigger("FunctionDefaultParam", defP);
            me.walk(defP, subCtx);
          }
        });

        this.out(")");

        me.trigger("FunctionBody", node.body);
        this.walk(node.body, subCtx);
      };

      /**
       * @param float t
       */
      _myTrait_.getCode = function (t) {
        return this._codeStr;
      };

      /**
       * @param float t
       */
      _myTrait_.getLineNumber = function (t) {
        return this._lineNumber;
      };

      /**
       * @param Object node
       */
      _myTrait_.getParent = function (node) {

        if (node) {
          if (node.nodeid) {
            var p = this._nodeParents[node.nodeid];
            return p;
          }
          return;
        }

        if (this._path) {
          var len = this._path.length;
          return this._path[len - 1];
        }
      };

      /**
       * @param float t
       */
      _myTrait_.getStructures = function (t) {
        return this._structures;
      };

      /**
       * @param Object node  - Node to walk
       * @param Object ctx  - Context to use
       */
      _myTrait_.Identifier = function (node, ctx) {
        // just output the identifier name...
        this.out(node.name);
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.IfStatement = function (node, ctx) {

        this.nlIfNot();
        this.out("if(");
        this.trigger("IfTest", node.test);
        this.walk(node.test, ctx);
        this.out(")");
        if (node.consequent) {
          var bNeedsPar = false;
          if (node.consequent.type != "BlockStatement") bNeedsPar = true;
          this.trigger("IfConsequent", node.consequent);

          if (bNeedsPar) {
            this.out("{");
            this.indent(1);
          }
          this.walk(node.consequent, ctx);
          if (bNeedsPar) {
            this.indent(-1);
            this.out("}");
          }
        }
        if (node.alternate) {
          this.out(" else ");
          var bNeedsPar = false;
          if (node.alternate.type != "BlockStatement") bNeedsPar = true;

          this.trigger("IfAlternate", node.alternate);

          if (bNeedsPar) {
            this.out("{");
            this.indent(1);
          }
          this.walk(node.alternate, ctx);
          if (bNeedsPar) {
            this.indent(-1);
            if (this.prevChar() != "{") this.out("", true);
            this.out("}");
          }
        }

        this.out("", true);
      };

      /**
       * @param int change  - Delta to modify the indent
       */
      _myTrait_.indent = function (change) {

        this._indent += change;
        if (this._indent < 0) this._indent = 0;
      };

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (options) {

        this._structures = [];
        this._path = [];

        this._tabChar = "  ";
        this._codeStr = "";
        this._currentLine = "";
        this._indent = 0;

        this._options = options || {};

        this.initReactNamespace();
        this.initDOMNamespace();
      });

      /**
       * @param float t
       */
      _myTrait_.initDOMNamespace = function (t) {
        // simply set the dom attribute to correct value...
        _myTrait_.DOMJSXAttribute = function (node, ctx) {
          this.out("\"");
          this.out(node.name.name);
          this.out("\"");
          if (ctx._fnCall) {
            this.out(":");
          } else {
            this.out(",");
          }
          this.walk(node.value, ctx);
        };

        // ---> using function or similar...
        var _elemNamesList = ["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "q", "rp", "rt", "ruby", "s", "sampe", "script", "section", "select", "small", "source", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"];
        _myTrait_.DOMJSXOpeningElement = function (node, ctx) {

          if (!ctx._inJSX) {
            ctx._inJSX = 1;
            this.out("(function() { ", true);
          } else {
            this.out("(function() { ", true);
          }
          this.indent(1);
          this.out("var e;");

          var elemName;
          if (node.name.type == "JSXMemberExpression") {
            var obj = node.name;
            if (obj.object.name == ctx.ns) {
              elemName = obj.property.name;
            } else {}
          } else {
            elemName = node.name.name;
          }
          // Here, either function or element....
          // --->

          // Allowed eleme names etc...
          if (_elemNamesList.indexOf(elemName) >= 0) {
            this.out("e=document.createElement('" + elemName + "');", true);
            // this.out("if(parent) parent.appendChild(e);")

            if (node.attributes && node.attributes.length) {
              for (var i = 0; i < node.attributes.length; i++) {
                this.out("e.setAttribute(");
                this.walk(node.attributes[i], ctx);
                this.out(");", true);
              }
            } else {}
          } else {
            this.out("var update;", true);
            this.out("update = function(first) { ", true);
            this.indent(1);
            this.out("var ne = " + elemName + "(");
            var prevFnState = ctx._fnCall;
            ctx._fnCall = true;
            if (node.attributes && node.attributes.length) {
              this.out("{", true);
              this.indent(1);
              for (var i = 0; i < node.attributes.length; i++) {
                if (i > 0) this.out(",", true);
                this.walk(node.attributes[i], ctx);
              }
              this.indent(-1);
              this.out("}");
            } else {
              this.out("{}");
            }
            this.out(",first ? update : function() {} );", true);
            // parentNode.replaceChild(newChild, oldChild);
            this.out("if(e && e.parentNode) { ", true);
            this.indent(1);
            this.out("e.parentNode.replaceChild(ne,e); ", true);
            this.indent(-1);
            this.out("} else {", true);
            this.indent(1);
            this.out("e = ne; ", true);
            this.indent(-1);
            this.out("}", true);
            this.indent(-1);
            this.out("}", true);
            this.out("update(true);");

            ctx._fnCall = prevFnState;
            // this.out(");",true);            
          }

          if (node.selfClosing) {
            ctx._inJSX--;
            this.out("return e;");
            this.indent(-1);
            this.out("})()", true);
          } else {}
        };
        _myTrait_.DOMLiteral = function (node, ctx) {
          if (typeof node.value == "string") {
            this.out("\"");
            this.out(node.value);
            this.out("\"");
          } else {
            this.out(node.value);
          }
        };
        _myTrait_.DOMJSXExpressionContainer = function (node, ctx) {
          this.walk(node.expression, ctx);
        };
        _myTrait_.DOMJSXElement = function (node, ctx) {
          var inJsx = ctx._inDOM;
          ctx._inJSX = true;
          var bExpr = false;
          this.walk(node.openingElement, ctx);
          var cnt = 0;
          if (node.children) {

            for (var i = 0; i < node.children.length; i++) {
              var child = node.children[i];
              if (child.type == "JSXElement") {
                this.out("e.appendChild(");
                this.indent(1);
                this.walk(child, ctx);
                this.indent(-1);
                this.out(")", true);
              }
              if (child.type == "Literal") {
                this.out("e.appendChild(document.createTextNode(");
                this.walk(child, ctx);
                this.out("))", true);
              }
              if (child.type == "JSXExpressionContainer") {
                if (!bExpr) {
                  this.out("var expr=");
                  this.walk(child, ctx);
                  this.out(";", true);
                }
                this.out("if(expr instanceof Array) {", true);
                this.indent(1);
                this.out("expr.forEach(function(ee){e.appendChild(ee)});", true);
                this.indent(-1);
                this.out("} else {");
                this.indent(1);
                this.out("if(typeof(expr)=='object') {", true);
                this.indent(1);
                this.out("e.appendChild(expr);", true);
                this.indent(-1);
                this.out("}", true);
                this.out("if(typeof(expr)=='string' || typeof(expr)=='number') {", true);
                this.indent(1);
                this.out("e.appendChild(document.createTextNode(expr));", true);
                this.indent(-1);
                this.out("}", true);

                this.indent(-1);
                this.out("}");
                //this.out("e.appendChild(document.createTextNode(");
                //this.walk(child, ctx);
                //this.out("))",true);                           
              }
            }
          }
          this.walk(node.closingElement, ctx);
          ctx._inJSX = inJsx;
        };
        _myTrait_.DOMJSXClosingElement = function (node, ctx) {
          this.out("return e;", true);
          this.indent(-1);
          this.out("})()", true);
        };
      };

      /**
       * @param float t
       */
      _myTrait_.initReactNamespace = function (t) {
        _myTrait_.reactJSXAttribute = function (node, ctx) {
          this.walk(node.name, ctx);
          this.out(":");
          this.walk(node.value, ctx);
        };
        _myTrait_.reactJSXOpeningElement = function (node, ctx) {
          console.log("reactJSXOpeningElement at namepace " + ctx.ns);
          this.out("React.createElement(", true);
          this.indent(1);

          if (node.name.type == "JSXMemberExpression") {
            var obj = node.name;
            if (obj.object.name == "react") {
              this.out("\"" + obj.property.name + "\",", true);
            } else {}
          } else {
            if (node.name) {
              this.out("\"" + node.name.name + "\",", true);
            }
          }
          if (node.attributes && node.attributes.length) {
            this.out("{", true);
            this.indent(1);
            for (var i = 0; i < node.attributes.length; i++) {
              if (i > 0) this.out(",", true);
              this.walk(node.attributes[i], ctx);
            }
            this.indent(-1);
            this.out("}");
          } else {
            this.out("null");
          }
          if (node.selfClosing) {
            this.indent(-1);
            this.out("");
            this.out(")", true);
          }
        };
        _myTrait_.reactLiteral = function (node, ctx) {
          if (ctx._inJSX) {
            var v = node.value.trim();
            if (v.length == 0) return;

            this.out("\"");
            this.out(node.value.trim());
            this.out("\"");
          } else {
            this.out(node.raw);
          }
        };
        _myTrait_.reactJSXExpressionContainer = function (node, ctx) {
          this.walk(node.expression, ctx);
        };
        _myTrait_.reactJSXElement = function (node, ctx) {
          var inJsx = ctx._inJSX;
          ctx._inJSX = true;
          this.walk(node.openingElement, ctx);
          var cnt = 0;
          if (node.children) {
            for (var i = 0; i < node.children.length; i++) {
              var child = node.children[i];
              if (child.type == "Literal" && typeof child.value == "string" && child.value.trim().length == 0) continue;
              this.out(",", true);
              this.walk(node.children[i], ctx);
            }
          }
          this.walk(node.closingElement, ctx);
          ctx._inJSX = inJsx;
        };
        _myTrait_.reactJSXClosingElement = function (node, ctx) {
          this.indent(-1);
          this.out("");
          this.out(")", true);
        };
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.JSXAttribute = function (node, ctx) {

        this.walk(node.name, ctx);
        this.out("=");
        this.walk(node.value, ctx);
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.JSXClosingElement = function (node, ctx) {

        this.out("</");
        this.walk(node.name, ctx);
        // this.out(node.name.name);
        this.out(">");
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.JSXElement = function (node, ctx) {

        // openingElement
        // closingElement
        // selfClosing
        this.walk(node.openingElement, ctx);
        // --> children
        this.out("", true);
        this.indent(1);
        this.walk(node.children, ctx);
        this.indent(-1);
        if (node.selfClosing) {
          this.out("/>", true);
        } else {
          if (node.closingElement) this.walk(node.closingElement, ctx);
        }
      };

      /**
       * @param float t
       */
      _myTrait_.JSXEmptyExpression = function (t) {};

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.JSXExpressionContainer = function (node, ctx) {

        this.out("{");
        this.walk(node.expression, ctx);
        this.out("}");
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.JSXIdentifier = function (node, ctx) {

        this.out(node.name);
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.JSXMemberExpression = function (node, ctx) {

        this.walk(node.object, ctx);

        if (node.computed) {
          this.out("[");
          this.walk(node.property, ctx);
          this.out("]");
        } else {
          this.out(".");
          this.walk(node.property, ctx);
        }
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.JSXNamespacedName = function (node, ctx) {

        this.out(node.namespace);
        this.out(":");
        this.out(node.name);
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.JSXOpeningElement = function (node, ctx) {

        // -> would create a component, JSXIdentifier

        this.out("<");

        this.walk(node.name, ctx);
        this.out(" ");
        this.walk(node.attributes, ctx);

        if (node.selfClosing) {
          this.out("/>");
        } else {
          this.out(">");
        }
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.JSXSpreadAttribute = function (node, ctx) {

        console.error("JSXSpreadAttribute is not implemented");
        /*
        this.out("{...");
        // argument
        this.walk(node.argument, ctx);
        this.out("}");
        */
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.LabeledStatement = function (node, ctx) {
        this.nlIfNot();
        this.walk(node.label, ctx);
        this.out(":", true);
        this.indent(1);
        if (node.body) this.walk(node.body, ctx);
        this.indent(-1);
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.Literal = function (node, ctx) {
        this.out(node.raw);
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.LogicalExpression = function (node, ctx) {
        var bLeftNeedsPar = true,
            bRightNeedsPar = true;
        if (node.left.type == "Identifier" || node.left.type == "Literal") {
          bLeftNeedsPar = false;
        }
        if (node.right.type == "Identifier" || node.right.type == "Literal") {
          bRightNeedsPar = false;
        }

        if (bLeftNeedsPar) this.out("(");
        this.walk(node.left, ctx);
        if (bLeftNeedsPar) this.out(")");

        if (node.operator) {
          this.out(" " + node.operator + " ");
        }
        if (bRightNeedsPar) this.out("(");
        this.walk(node.right, ctx);
        if (bRightNeedsPar) this.out(")");

        /*
        interface LogicalExpression <: Expression {
        type: "LogicalExpression";
        operator: LogicalOperator;
        left: Expression;
        right: Expression;
        }
        */
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.MemberExpression = function (node, ctx) {
        this.trigger("MemberExpressionObject", node.object);
        // MemberExpression
        var bNeedPar = true;
        if (node.object.type == "Identifier" || node.object.type == "Literal" || node.object.type == "ThisExpression") {
          bNeedPar = false;
          if (typeof node.object.value === "number") {
            bNeedPar = true;
          }
        }
        if (bNeedPar) this.out("(");
        this.walk(node.object, ctx);
        if (bNeedPar) this.out(")");

        if (node.computed) {
          this.out("[");
          this.trigger("MemberExpressionProperty", node.property);
          this.walk(node.property, ctx);
          this.out("]");
        } else {
          this.out(".");
          this.trigger("MemberExpressionProperty", node.property);
          this.walk(node.property, ctx);
        }
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.MethodDefinition = function (node, ctx) {

        if (node.key) {
          this.__insideMethod = true;

          if (node.kind == "constructor") {
            this.trigger("ClassConstructor", node);
          }

          if (node["static"]) this.out("static ");

          this.walk(node.key, ctx);
          this.walk(node.value, ctx);
          this.out("", true);
          this.__insideMethod = false;
        }
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.NewExpression = function (node, ctx) {

        if (node.callee) {
          this.out(" new ");
          this.trigger("NewExpressionClass", node.callee);
          this.walk(node.callee, ctx);
          this.out("(");
          if (node.arguments) {
            var me = this,
                cnt = 0;
            node.arguments.forEach(function (n) {
              me.trigger("NewExpressionArgument", n);
              if (cnt++ > 0) me.out(", ");
              me.walk(n, ctx);
            });
          }
          this.out(")");
        }
      };

      /**
       * @param float t
       */
      _myTrait_.nlIfNot = function (t) {
        var len = this._currentLine.length;
        if (len > 0) {
          // {
          if (this._currentLine[len - 1] == "{" || this._currentLine[len - 1] == ";") {
            this.out("", true);
          } else {
            this.out(";", true);
          }
        }
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.ObjectExpression = function (node, ctx) {

        var me = this;
        try {
          me.out("{");
          var cnt = 0;
          if (node && node.properties) {
            if (node.properties.length > 1) me.out("", true);
            me.indent(1);
            node.properties.forEach(function (p) {
              if (cnt++ > 0) me.out(",", true);
              me.trigger("ObjectExpressionProperty", p);
              me.walk(p, ctx);
            });
            me.indent(-1);
          }
          me.out("}");
        } catch (e) {
          console.error(e.message);
        }
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.ObjectPattern = function (node, ctx) {
        var me = this;
        try {
          me.out("{");
          var cnt = 0;
          if (node && node.properties) {
            //if(node.properties.length>1) me.out("", true);
            node.properties.forEach(function (p) {
              if (cnt++ > 0) me.out(",");
              me.trigger("ObjectExpressionProperty", p);
              me.walk(p, ctx);
            });
          }
          me.out("}");
        } catch (e) {
          console.error(e.message);
        }
      };

      /**
       * @param String str  - Code to output
       * @param Boolean newline  - if ends with newline
       */
      _myTrait_.out = function (str, newline) {

        if (this._options.noOutput) return;

        if (this._collecting) {
          if (str) {
            if (this._collectLine.length == 0) {
              for (var i = 0; i < this._indent; i++) {
                this._collectLine += this._tabChar;
              }
            }
            this._collectLine += str;
          }

          if (newline) {
            this._collectStr += this._collectLine + "\n";
            this._collectLine = "";
            this._collectStr += "\n";
          }
          return;
        }
        if (str) {
          if (this._currentLine.length == 0) {
            this.trigger("startline");
            this.trigger("tabs", this._indent);
            for (var i = 0; i < this._indent; i++) {
              this._currentLine += this._tabChar;
            }
          }
          this.trigger("out", str);
          this._currentLine += str;
        }

        if (newline) {
          this.trigger("newline");
          this._codeStr += this._currentLine + "\n";
          this._currentLine = "";
          this._lineNumber++;
        }
      };

      /**
       * @param float t
       */
      _myTrait_.prevChar = function (t) {
        var len = this._currentLine.length;
        if (len > 0) {
          return this._currentLine[len - 1];
        } else {
          return "\n";
        }
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.Program = function (node, ctx) {

        this.walk(node.body, ctx, true);
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.Property = function (node, ctx) {

        // kind: "init" | "get" | "set";

        this.trigger("ObjectPropertyKey", node.key);

        this.walk(node.key, ctx);

        if (!node.shorthand) {
          this.out(":");
          this.trigger("ObjectPropertyValue", node.value);
          this.walk(node.value, ctx);
        }
      };

      /**
       * @param Object def  - Structure definition
       */
      _myTrait_.pushStructure = function (def) {

        if (!this._structures) this._structures = [];
        this._structures.push(def);
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.RestElement = function (node, ctx) {
        if (node.argument) this.trigger("RestArgument", node.argument);

        this.out(" ...");
        this.walk(node.argument, ctx);
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.ReturnStatement = function (node, ctx) {
        this.nlIfNot();
        this.out("return ");
        this.trigger("ReturnValue", node.argument);
        this.walk(node.argument, ctx);
        this.out(";");
      };

      /**
       * @param Object node
       */
      _myTrait_.saveNode = function (node) {

        if (!node.nodeid) node.nodeid = this.createId();

        this.createObject(node.nodeid, node);
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.SequenceExpression = function (node, ctx) {
        if (node.expressions) {
          var me = this;
          var cnt = 0;
          this.out("(");
          node.expressions.forEach(function (n) {
            if (cnt++ > 0) me.out(",");
            me.walk(n, ctx);
          });
          this.out(")");
        }
      };

      /**
       * @param float t
       */
      _myTrait_.skip = function (t) {
        this._skipWalk = true;
      };

      /**
       * @param float t
       */
      _myTrait_.startBlock = function (t) {

        this.out("{", true);
        this.indent(1);
      };

      /**
       * @param float t
       */
      _myTrait_.startCollecting = function (t) {
        this._collecting = true;
      };

      /**
       * Starts the walking of AST tree
       * @param Node node  - AST Node
       * @param Object ctx
       */
      _myTrait_.startWalk = function (node, ctx) {

        this._breakWalk = false;
        this._path = [];

        this._codeStr = "";
        this._currentLine = "";
        this._lineNumber = 0;

        this.walk(node, ctx);
        this.out("", true);
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.Super = function (node, ctx) {
        this.out("super");
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.SwitchCase = function (node, ctx) {
        this.nlIfNot();
        if (node.test) {
          this.out("case ");
          this.walk(node.test, ctx);
          this.out(" : ", true);
        } else {
          this.out("default: ", true);
        }

        if (node.consequent) {
          var me = this;
          node.consequent.forEach(function (c) {
            me.walk(c, ctx);
          });
        }
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.SwitchStatement = function (node, ctx) {
        this.nlIfNot();
        this.out("switch");
        this.out("(");

        this.walk(node.discriminant, ctx);
        this.out(")");
        this.out("{", true);

        this.indent(1);
        var me = this;
        node.cases.forEach(function (c) {
          me.walk(c, ctx);
        });
        this.indent(-1);
        this.out("}", true);
        /*
        interface SwitchStatement <: Statement {
        type: "SwitchStatement";
        discriminant: Expression;
        cases: [ SwitchCase ];
        lexical: boolean;
        }
        */
      };

      /**
       * @param Object node
       * @param Object ctx
       * @param float notUsed
       */
      _myTrait_.TemplateElement = function (node, ctx, notUsed) {
        this.out(node.value.raw);
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.TemplateLiteral = function (node, ctx) {
        this.out("`");
        for (var i = 0; i < node.quasis.length; i++) {
          if (i > 0) {
            this.out("${");
            if (node.expressions[i - 1]) this.walk(node.expressions[i - 1], ctx);
            this.out("}");
          }
          var q = node.quasis[i];
          this.walk(q, ctx);
        }
        this.out("`");
      };

      /**
       * @param float node
       */
      _myTrait_.ThisExpression = function (node) {
        this.out("this");
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ThrowStatement = function (node, ctx) {
        this.nlIfNot();
        this.out("throw ");
        this.trigger("ThrowArgument", node.argument);
        this.walk(node.argument, ctx);
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.TryStatement = function (node, ctx) {

        this.out("try ");
        this.walk(node.block, ctx);

        if (node.handler) {
          this.walk(node.handler, ctx);
        }
        if (node.finalizer) {
          this.out(" finally ");
          this.walk(node.finalizer, ctx);
        }
        /*
        interface TryStatement <: Statement {
        type: "TryStatement";
        block: BlockStatement;
        handler: CatchClause | null;
        guardedHandlers: [ CatchClause ];
        finalizer: BlockStatement | null;
        }
        */
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.UnaryExpression = function (node, ctx) {
        var bNeedsPar = true;
        if (node.argument.type == "Identifier" || node.argument.type == "Literal") {
          bNeedsPar = false;
        }
        this.out(node.operator);
        if (node.operator != "!") this.out(" ");

        if (bNeedsPar) this.out("(");
        this.trigger("UnaryExpressionArgument", node.argument);
        this.walk(node.argument, ctx);
        if (bNeedsPar) this.out(")");
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.UpdateExpression = function (node, ctx) {

        this.trigger("UpdateExpressionArgument", node.argument);

        if (node.prefix) {
          this.out(node.operator);
          this.walk(node.argument, ctx);
        } else {
          this.walk(node.argument, ctx);
          this.out(node.operator);
        }
      };

      /**
       * @param Object node  - Object to use to create a variable declaration
       * @param Object ctx  - Context of the node
       */
      _myTrait_.VariableDeclaration = function (node, ctx) {

        var me = this;
        var cnt = 0;
        if (node.kind == "var") me.out("var ");
        if (node.kind == "let") me.out("let ");
        if (node.kind == "const") me.out("const ");
        var indent = 0;
        node.declarations.forEach(function (vd) {
          if (vd.deleted) return;
          if (cnt++ > 0) {
            if (cnt == 2) {
              indent += 2;
              me.indent(indent);
            }
            me.out(",", true); // always a new declaration
          }
          me.walk(vd, ctx);
        });
        this.indent(-1 * indent);

        if (cnt == 0) this._undoOutput = true;
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.VariableDeclarator = function (node, ctx) {
        var me = this;

        if (node.id) {
          me.walk(node.id, ctx);
          if (node.id.name) {
            ctx.vars[node.id.name] = node;
          }
        }

        if (node.init) {
          this.out(" = ");
          me.walk(node.init, ctx);
        }
      };

      /**
       * @param Object node  - The object to walk the AST with
       * @param Object ctx  - The current context
       * @param float newLine
       */
      _myTrait_.walk = function (node, ctx, newLine) {

        if (!node) return;

        if (!ctx) {
          console.log("ERROR: no context defined for ", node);
          console.trace();
          return;
        }

        // What is going on here then...
        if (node instanceof Array) {
          var me = this;
          this.trigger("nodeArray", {
            node: node,
            ctx: ctx
          });
          node.forEach(function (n) {
            me.walk(n, ctx);
            if (newLine) me.nlIfNot(); // insert newline just in case to the end...
          });
        } else {

          if (node.deleted) return;

          if (node.type) {

            this.saveNode(node);
            node.contextId = ctx.id;

            var parentNode = this.getParent();
            if (!this._nodeParents) this._nodeParents = {};
            if (parentNode) {
              this._nodeParents[node.nodeid] = parentNode;
            }
            var runTime = {
              node: node,
              ctx: ctx
            };
            this.trigger("node", runTime);
            this.trigger(node.type, runTime);

            if (this._skipWalk) {
              this._skipWalk = false;
              return;
            }

            if (this._wCb) this._wCb(node);

            if (this[node.type]) {
              this._path.push(node);

              var oldLine = this._currentLine;
              var oldPos = this._codeStr.length;
              var bDidEnterNs = false,
                  old_ns;
              if (node.type == "JSXElement" && node.openingElement && node.openingElement.name) {
                if (node.openingElement.name.type == "JSXMemberExpression") {
                  // could be entering a namespace
                  var member = node.openingElement.name;
                  var nameSpace = member.object.name;
                  if (!ctx.nsStack) ctx.nsStack = [];
                  ctx.nsStack.push(nameSpace);
                  old_ns = ctx.ns;
                  ctx.ns = nameSpace;
                  bDidEnterNs = true;
                } else {
                  if (!ctx.ns) {
                    var nameSpace = "DOM"; // <- default namespace, could be a setting though
                    if (!ctx.nsStack) ctx.nsStack = [];
                    ctx.nsStack.push(nameSpace);
                    old_ns = ctx.ns;
                    ctx.ns = nameSpace;
                    bDidEnterNs = true;
                  }
                }
              }
              if (ctx.ns) {
                var tryThis = ctx.ns + node.type;
                if (typeof this[tryThis] != "undefined") {
                  this[tryThis](node, ctx);
                } else {
                  this[node.type](node, ctx);
                }
              } else {
                this[node.type](node, ctx);
              }
              if (bDidEnterNs) {
                ctx.nsStack.pop();
                ctx.ns = old_ns;
              }
              if (this._undoOutput) {
                this._codeStr = this._codeStr.substring(0, oldPos);
                this._currentLine = oldLine;
                this._undoOutput = false;
              }
              this._path.pop();
            } else {
              console.log("Did not find " + node.type);
              console.log(node);
            }
            this.trigger("nodeWalked", runTime);
            this.trigger("After" + node.type, runTime);
          }
        }
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.walkAsString = function (node, ctx) {

        var str = "";
        try {
          this.startCollecting();
          this._collectStr = "";
          this._collectLine = "";

          this.walk(node, ctx);

          str = this._collectStr;

          this.endCollecting();
        } catch (e) {}
        return str;
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.WhileStatement = function (node, ctx) {
        this.nlIfNot();
        this.out("while ");

        if (node.test) {
          this.trigger("WhileTest", node.test);
          this.out("(");
          this.walk(node.test, ctx);
          this.out(")");
        }
        if (node.body) {
          var bNeedsPar = false;
          if (node.body.type != "BlockStatement" && node.body.type.indexOf("Statement") >= 0) {
            bNeedsPar = true;
          }
          if (bNeedsPar) {
            this.out("{");
            this.indent(1);
          }
          this.walk(node.body, ctx);
          if (bNeedsPar) {
            this.indent(-1);
            this.out("}");
          }
        }

        this.out("", true);
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.WithStatement = function (node, ctx) {
        console.error("With statement is not supported");
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.YieldExpression = function (node, ctx) {

        this.out("yield ");
        this.walk(node.argument, ctx);

        /*
        interface YieldExpression <: Expression {
        type: "YieldExpression";
        argument: Expression | null;
        }
        */
      };
    })(this);
  };

  var ASTWalker = function ASTWalker(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof ASTWalker) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == "function") {
          if (res._classInfo.name != ASTWalker._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == "function") m.init.apply(m, args);
      }
    } else return new ASTWalker(a, b, c, d, e, f, g, h);
  };
  // inheritance is here

  ASTWalker._classInfo = {
    name: "ASTWalker"
  };
  ASTWalker.prototype = new ASTWalker_prototype();

  (function () {
    if (typeof define !== "undefined" && define !== null && define.amd != null) {
      __amdDefs__["ASTWalker"] = ASTWalker;
      this.ASTWalker = ASTWalker;
    } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
      module.exports["ASTWalker"] = ASTWalker;
    } else {
      this.ASTWalker = ASTWalker;
    }
  }).call(new Function("return this")());

  if (typeof define !== "undefined" && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function("return this")());

// console.error("JSXMemberExpression not currently supported at react Namepace");

// this.out("null");

// console.error("JSXMemberExpression not currently supported at react Namepace");