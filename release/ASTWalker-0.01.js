// The code template begins here
"use strict";

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  // let the private classes out

  var ASTWalker_prototype = function ASTWalker_prototype() {
    // Then create the traits and subclasses for this class here...

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
        if (node.elements && node.elements.length > 0) {

          // determine array element types, if possible..
          var elem_types = {},
              pseudoArray = [];
          node.elements.forEach(function (e) {
            if (!elem_types[e.type]) elem_types[e.type] = [];
            elem_types[e.type].push(e);

            if (typeof e.value == "number") pseudoArray.push(e.value);
          });

          var cnt = 0,
              first;
          for (var n in elem_types) {
            if (!first) first = elem_types[n];
            cnt++;
          }
          if (cnt == 1) {
            var type_hash = {};
            first.forEach(function (item) {
              type_hash[typeof item.value] = item;
            });
            var keys = Object.keys(type_hash);
            if (keys.length == 1) {
              var only_type = keys[0];
              if (only_type == "number") {
                // can do array of number
                me.out("[");
                pseudoArray.forEach(function (v, i) {
                  if (i > 0) me.out(",");
                  if (parseInt(v) == v) {
                    me.out(v + ".0");
                    return;
                  } else {
                    me.out(v);
                  }
                });
                me.out("]");
                return;
              }
              if (only_type == "string") {
                me.out(JSON.stringify(pseudoArray));
                return;
              }
            }
          }
        }

        console.error("So far object expressions are not allowed, - TODO: create hidden class for them");
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.AssignmentExpression = function (node, ctx) {

        if (node.operator == "=") {
          this.walk(node.left, ctx);
          this.out(" " + node.operator + " ");
          this.walk(node.right, ctx);
        }
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.BinaryExpression = function (node, ctx) {

        var basicOperators = ["+", "-", "*", "/", "%", "==", "<", ">", ">=", "<=", "!="];

        if (basicOperators.indexOf(node.operator) >= 0) {
          this.walk(node.left, ctx);
          this.out(" " + node.operator + " ");
          this.walk(node.right, ctx);
          return;
        }
        if (node.operator == "==") {
          // ...
          this.walk(node.left, ctx);
          this.out(" == ");
          this.walk(node.right, ctx);
        }

        if (node.operator == "instanceof") {
          // ...
          this.walk(node.left, ctx);
          this.out(" is ");
          this.walk(node.right, ctx);
        }
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
       * @param float node
       * @param float ctx
       */
      _myTrait_.CallExpression = function (node, ctx) {
        if (node.callee) {
          this.walk(node.callee, ctx);
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
       * Basic semantics for hidden class object
       * @param String objName  - Variable to transfer to hidden class object
       */
      _myTrait_.createHiddenClass = function (objName) {
        // this._walkInfo

        var baseCtx = this._walkInfo.subCtxList[0];
        var hiddenClassDef = this._analyzer.collectObjectStructure(baseCtx, objName);

        console.log("Tried to collect hidden class for " + objName);
        console.log(hiddenClassDef);
      };

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
      _myTrait_.ForStatement = function (node, ctx) {
        this.out("for ");

        if (node.init) {
          this.walk(node.init, ctx);
          this.out("; ");
        }
        if (node.test) {
          this.walk(node.test, ctx);
          this.out("; ");
        }
        if (node.update) {
          this.walk(node.update, ctx);
          this.out("; ");
        }

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
        /*
        func sayHello(personName: String) -> String {
        let greeting = "Hello, " + personName + "!"
        return greeting
        }
        */

        // contextObj
        // contextObj.fnDecs

        if (!ctx) {
          console.error("Context not defined!");
          return;
        }

        if (!ctx.fnDecs || !ctx.fnDecs[node.id.name]) {
          /*
          console.error("Function declarations for "+node.id.name+" not found");
          */
          // Then declaration should have the appropriate data types...
          this.out("// TODO: Unknown function, define metadata somewhere...", true);
          this.out("func ");

          if (node.id && node.id.name) {
            this.out(" " + node.id.name + " ");
          } else {
            this.out(" UnknownFunction ");
          }

          // TODO: return value
          this.out(" -> "); // NOT correct right now...
          this.out(" UnknownValue ");

          var me = this;
          this.out("(");
          var cnt = 0;
          node.params.forEach(function (p) {
            if (cnt++ > 0) me.out(",");
            me.walk(p, ctx);
          });
          //???
          // params.
          /*
          var cnt=0;
          def.params.forEach( function(p,i) {
          if(cnt++>0) me.out(", ");
          me.out(p.get("n")+":"+p.get("t"))
          });
          */
          this.out(")");
          this.walk(node.body, ctx);
          return;
        }

        var def = ctx.fnDecs[node.id.name];

        // Then declaration should have the appropriate data types...
        this.out("func ");
        this.out(def.get("name"));

        // TODO: return value
        this.out(" -> "); // NOT correct right now...
        this.out(def.returns.get("t") + " ");

        var me = this;
        this.out("(");
        var cnt = 0;
        def.params.forEach(function (p, i) {
          if (cnt++ > 0) me.out(", ");
          me.out(p.get("n") + ":" + p.get("t"));
        });
        this.out(")");
        this.walk(node.body, ctx);
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.FunctionExpression = function (node, ctx) {
        /*
        { (parameters) -> return type in
        statements
        }
        */

        var cnt = 0;
        node.params.forEach(function (p) {
          if (cnt++ > 0) me.out(",");
          me.walk(p, ctx);
        });

        // TODO: return value
        this.out(" -> "); // NOT correct right now...
        this.out(" UnknownValue ");

        var me = this;
        this.out("(");

        //???
        // params.
        /*
        var cnt=0;
        def.params.forEach( function(p,i) {
        if(cnt++>0) me.out(", ");
        me.out(p.get("n")+":"+p.get("t"))
        });
        */
        this.out(")");
        this.walk(node.body, ctx);
        return;
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
        this.walk(node.test, ctx);
        this.out(")");
        if (node.consequent) {
          this.walk(node.consequent, ctx);
        }
        if (node.alternate) {
          this.out(" else ");
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
      _myTrait_.__traitInit.push(function (codeStr, fnObj, structDefs, walkCallback) {

        var pw = AnalyzeFunc();
        var baseAST = esprima.parse(codeStr, {
          loc: true,
          range: true,
          comment: true
        });

        // walk the AST tree to create some meta-information out of it...
        var ctx = pw.primaWalk(baseAST, function () {
          return true;
        }, function () {}, {});

        this._analyzer = pw;
        this._walkInfo = ctx;
        this._fnObj = fnObj;
        this._structDefs = structDefs;
        this._wCb = walkCallback;

        // currently evaluated function
        if (fnObj) ctx.currentFn = fnObj.get("name");

        this._structures = [];

        // baseAST has now the important content information for the function

        var contextObj = {};

        if (!contextObj.fnDecs) contextObj.fnDecs = {};
        if (fnObj) contextObj.fnDecs[fnObj.get("name")] = fnObj;

        this._tabChar = "  ";
        this._codeStr = "";
        this._currentLine = "";
        this._indent = 0;

        this.walk(baseAST, contextObj, true);
        this.out("", true);
      });

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.Literal = function (node, ctx) {
        this.out(node.raw);
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.MemberExpression = function (node, ctx) {
        this.walk(node.object);
        this.out(".");
        this.walk(node.property);
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.NewExpression = function (node, ctx) {

        if (node.callee) {

          this.walk(node.callee);
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

        // Object must have a hidden class to be created...
        console.log("So far object expressions are not allowed, - TODO: create hidden class for them");

        // this.createHiddenClass();
        /*
        struct Resolution {
        var width = 0
        var height = 0
        }
        */
        // collect hidden class definition;
        if (!_cnt) _cnt = 1;
        var ok = true;
        var me = this;
        try {
          var structDef = {
            name: "TmpStructure" + _cnt++,
            rawStr: "",
            varDefs: []
          };
          console.log(node);
          var _resStr = "struct " + structDef.name + " { ";
          if (node && node.properties) {
            console.log("-> trying to create " + structDef.name);
            node.properties.forEach(function (p) {
              if (p.type == "Property" && p.key && p.value && p.value.raw) {
                structDef.varDefs.push({
                  name: p.key.name,
                  value: p.value.value,
                  raw: p.value.raw
                });
                _resStr += "var " + p.key.name + " = " + p.value.raw + "\n";
                return;
              } else {}
              ok = false;
              console.error("Object property not declared:", p);
            });
          } else {
            console.log("Invalid properties node");
            ok = false;
          }
          _resStr += "} \n";
          if (ok) {
            structDef.rawStr = _resStr;
          }
          if (ok) {
            this.pushStructure(structDef);
          }
          if (ok) {
            // Resolution(width: 1920, height: 1080)
            var me = this;
            me.out(structDef.name + "(");
            var cnt = 0;
            structDef.varDefs.forEach(function (v) {
              if (cnt++ > 0) me.out(",");
              me.out(v.name + ":" + v.raw);
            });
            me.out(")");
          }
        } catch (e) {
          console.error(e.message);
        }

        // this.out("",)
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
       * @param Object def  - Structure definition
       */
      _myTrait_.pushStructure = function (def) {

        if (!this._structures) this._structures = [];
        this._structures.push(def);
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.ReturnStatement = function (node, ctx) {

        this.out("return ");
        this.walk(node.argument, ctx);
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
       * @param float node
       */
      _myTrait_.ThisExpression = function (node) {
        this.out("self");
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.UnaryExpression = function (node, ctx) {
        this.out(node.operator);
        this.walk(node.argument, ctx);
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.UpdateExpression = function (node, ctx) {

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
        node.declarations.forEach(function (vd) {
          if (cnt++ > 0) {
            me.out("", true); // always a new declaration
          }
          if (node.kind == "var") me.out("var ");
          if (node.kind == "let") me.out("let ");
          me.walk(vd, ctx);
          //me.out("=");
          //me.walk(vd.init,ctx);
          cnt++;
        });
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.VariableDeclarator = function (node, ctx) {
        var me = this;

        // let greeting = "Hello, " + personName + "!"

        me.out(node.id.name + " = ");
        me.walk(node.init, ctx);
        // me.out("", true);
      };

      /**
       * @param Object node  - The object to walk the AST with
       * @param Object ctx  - The current context
       * @param float newLine
       */
      _myTrait_.walk = function (node, ctx, newLine) {

        // What is going on here then...
        if (node instanceof Array) {
          var me = this;
          node.forEach(function (n) {
            me.walk(n, ctx);
            if (newLine) me.nlIfNot(); // insert newline just in case to the end...
          });
        } else {
          if (node.type) {
            if (this._wCb) this._wCb(node);

            if (this[node.type]) {
              this[node.type](node, ctx);
            } else {
              console.log("Did not find " + node.type);
              console.log(node);
            }
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
          this.walk(node.test, ctx);
        }
        if (node.body) {
          this.walk(node.body, ctx);
        }

        this.out("", true);
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

// Object definitions will be left as excercie yet....