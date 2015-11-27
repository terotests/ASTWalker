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

        this.walk(node.left, ctx);
        this.out(" " + node.operator + " ");
        this.walk(node.right, ctx);
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.BlockStatement = function (node, ctx) {

        // keeps at the same context right now I guess....
        this.out("{", true);
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
        this.out("break", true);
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
        this.out("continue", true);
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.DebuggerStatement = function (node, ctx) {
        this.out("debugger;");
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.DoWhileStatement = function (node, ctx) {
        this.out("do {", true);

        if (node.body) {
          this.walk(node.body, ctx);
        }

        this.out(" } ");
        if (node.test) {
          this.out("while(");
          this.trigger("DoWhileTest", node.test);
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
        this.walk(node.expression, ctx);
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ForInStatement = function (node, ctx) {
        this.out("for(");

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
          this.walk(node.body, ctx);
        }

        this.out("", true);
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ForOfStatement = function (node, ctx) {
        this.out("for(");

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
          this.walk(node.body, ctx);
        }

        this.out("", true);
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ForStatement = function (node, ctx) {
        this.out("for(");

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
          this.walk(node.body, ctx);
        }

        this.out("", true);
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.FunctionDeclaration = function (node, ctx) {

        this.out("function");

        if (node.id && node.id.name) {
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
        var subCtx = {
          parentCtx: ctx
        };
        this.walk(node.body, subCtx);
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.FunctionExpression = function (node, ctx) {

        if (!this.__insideMethod) this.out("function");

        if (node.generator) {
          this.trigger("FunctionGenerator", node);
          this.out("* ");
        }

        if (node.id && node.id.name) {
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
        var subCtx = {
          parentCtx: ctx
        };
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

        this.out("if(");
        this.trigger("IfTest", node.test);
        this.walk(node.test, ctx);
        this.out(")");
        if (node.consequent) {
          this.trigger("IfConsequent", node.consequent);
          this.walk(node.consequent, ctx);
        }
        if (node.alternate) {
          this.out(" else ");
          this.trigger("IfAlternate", node.alternate);
          this.walk(node.alternate, ctx);
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

        this._tabChar = "  ";
        this._codeStr = "";
        this._currentLine = "";
        this._indent = 0;

        this._options = options || {};
      });

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.LabeledStatement = function (node, ctx) {

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

        if (node.left) this.walk(node.left, ctx);
        if (node.operator) {
          this.out(" " + node.operator + " ");
        }
        if (node.right) this.walk(node.right, ctx);

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
        if (node.object.type == "FunctionExpression") this.out("(");
        this.walk(node.object, ctx);
        if (node.object.type == "FunctionExpression") this.out(")");

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
        if (this._currentLine.length > 0) this.out("", true);
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
            if (node.properties.length > 1) me.out("", true);
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
            for (var i = 0; i < this._indent; i++) {
              this._currentLine += this._tabChar;
            }
          }
          this._currentLine += str;
        }

        if (newline) {
          this._codeStr += this._currentLine + "\n";
          this._currentLine = "";
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
        this.out(":");
        this.trigger("ObjectPropertyValue", node.value);
        this.walk(node.value, ctx);
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

        this.out("return ");
        this.trigger("ReturnValue", node.argument);
        this.walk(node.argument, ctx);
        this.out(";");
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

        this.out("switch(");

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
        this.out(node.operator);
        this.trigger("UnaryExpressionArgument", node.argument);
        this.walk(node.argument, ctx);
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.UpdateExpression = function (node, ctx) {

        this.trigger("UpdateExpressionArgument", node.argument);
        this.walk(node.argument, ctx);
        this.out(node.operator);
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
        var indent = 0;
        node.declarations.forEach(function (vd) {
          if (cnt++ > 0) {
            if (cnt == 1) {
              indent++;
              me.indent(1);
            }
            me.out(",", true); // always a new declaration
          }
          me.walk(vd, ctx);
          cnt++;
        });

        this.indent(-1 * indent);
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.VariableDeclarator = function (node, ctx) {
        var me = this;

        me.out(node.id.name + " = ");
        me.walk(node.init, ctx);
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
          node.forEach(function (n) {
            me.walk(n, ctx);
            if (newLine) me.nlIfNot(); // insert newline just in case to the end...
          });
        } else {
          if (node.type) {
            this.trigger(node.type, node);

            if (this._skipWalk) {
              this._skipWalk = false;
              return;
            }

            if (this._wCb) this._wCb(node);

            if (this[node.type]) {
              this._path.push(node);
              this[node.type](node, ctx);
              this._path.pop();
            } else {
              console.log("Did not find " + node.type);
              console.log(node);
            }
            this.trigger("After" + node.type, node);
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
        this.out("while ");

        if (node.test) {
          this.trigger("WhileTest", node.test);
          this.walk(node.test, ctx);
        }
        if (node.body) {
          this.walk(node.body, ctx);
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