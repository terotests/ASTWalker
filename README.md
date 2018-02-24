

```javascript

    var walker = ASTWalker();
    var rawAST = esprima.parse(codeStr, { loc : true, range : true, comment : true});
    walker.startWalk( rawAST, {} );
    var code = walker.getCode();

``` 

## Options

During initialization options can be given Namespace as option
```javascript
    var walker = ASTWalker({
        defaultNamespace: "DOM", // "react", "DOM", "SVG"
        toES5: true,
        noOutput:false
    });
```

Each node can belong to a namespace, for example DOM nodes are int DOM namespace, SVG nodes in SVG namespace and React nodes are in React -namespace. When DOM tree is walked and SVG node is encountered, the parser will push "SVG" into namespace stack.

https://github.com/terotests/ASTWalker/blob/master/release/ASTWalker-0.95.js#L2754

When "SVG" is the current namespace, the ASTWalker first looks for `SVGJSXElement` instead of `JSXElement` and calls it, if the function is found. If it is not found, then the function without prefix gets called.

`noOutput` will disable code generation (output string), it will just walk the AST tree and generate context variables. This is useful when evaluating some statistics of the code and not actually using the end result output.

`defaultNamespace` is the initial namespace, the default prefix for the function used to walk the AST nodes from the beginning. 

`forceNamespace` is the same as `defaultNamepace`, but it will not allow automatic SVG namespace detection to change the initial namespace to something else based on node type.

`toES5` (NOTE: current must be set to `true`, arrow functions have a bug) transpiles arrow functions to ES5, but does not try to do anything more at the moment.





### General information on the subject

* https://github.com/thejameskyle/babel-plugin-handbook


















   

 


   
#### Class ASTWalker


- [ArrayExpression](README.md#ASTWalker_ArrayExpression)
- [ArrayPattern](README.md#ASTWalker_ArrayPattern)
- [ArrowExpression](README.md#ASTWalker_ArrowExpression)
- [ArrowFunctionExpression](README.md#ASTWalker_ArrowFunctionExpression)
- [AssignmentExpression](README.md#ASTWalker_AssignmentExpression)
- [BinaryExpression](README.md#ASTWalker_BinaryExpression)
- [BlockStatement](README.md#ASTWalker_BlockStatement)
- [BreakStatement](README.md#ASTWalker_BreakStatement)
- [breakWalk](README.md#ASTWalker_breakWalk)
- [CallExpression](README.md#ASTWalker_CallExpression)
- [CatchClause](README.md#ASTWalker_CatchClause)
- [ClassBody](README.md#ASTWalker_ClassBody)
- [ClassDeclaration](README.md#ASTWalker_ClassDeclaration)
- [ConditionalExpression](README.md#ASTWalker_ConditionalExpression)
- [ContinueStatement](README.md#ASTWalker_ContinueStatement)
- [createContext](README.md#ASTWalker_createContext)
- [createId](README.md#ASTWalker_createId)
- [createObject](README.md#ASTWalker_createObject)
- [DebuggerStatement](README.md#ASTWalker_DebuggerStatement)
- [DoWhileStatement](README.md#ASTWalker_DoWhileStatement)
- [EmptyStatement](README.md#ASTWalker_EmptyStatement)
- [endBlock](README.md#ASTWalker_endBlock)
- [endCollecting](README.md#ASTWalker_endCollecting)
- [ExpressionStatement](README.md#ASTWalker_ExpressionStatement)
- [find](README.md#ASTWalker_find)
- [ForInStatement](README.md#ASTWalker_ForInStatement)
- [ForOfStatement](README.md#ASTWalker_ForOfStatement)
- [ForStatement](README.md#ASTWalker_ForStatement)
- [FunctionDeclaration](README.md#ASTWalker_FunctionDeclaration)
- [FunctionExpression](README.md#ASTWalker_FunctionExpression)
- [getCode](README.md#ASTWalker_getCode)
- [getLineNumber](README.md#ASTWalker_getLineNumber)
- [getParent](README.md#ASTWalker_getParent)
- [getStructures](README.md#ASTWalker_getStructures)
- [Identifier](README.md#ASTWalker_Identifier)
- [IfStatement](README.md#ASTWalker_IfStatement)
- [indent](README.md#ASTWalker_indent)
- [initDOMC](README.md#ASTWalker_initDOMC)
- [initDOMCNamespace](README.md#ASTWalker_initDOMCNamespace)
- [initDOMNamespace](README.md#ASTWalker_initDOMNamespace)
- [initFRZRNamespace](README.md#ASTWalker_initFRZRNamespace)
- [initReactNamespace](README.md#ASTWalker_initReactNamespace)
- [initSVGNamespace](README.md#ASTWalker_initSVGNamespace)
- [JSXAttribute](README.md#ASTWalker_JSXAttribute)
- [JSXClosingElement](README.md#ASTWalker_JSXClosingElement)
- [JSXElement](README.md#ASTWalker_JSXElement)
- [JSXEmptyExpression](README.md#ASTWalker_JSXEmptyExpression)
- [JSXExpressionContainer](README.md#ASTWalker_JSXExpressionContainer)
- [JSXIdentifier](README.md#ASTWalker_JSXIdentifier)
- [JSXMemberExpression](README.md#ASTWalker_JSXMemberExpression)
- [JSXNamespacedName](README.md#ASTWalker_JSXNamespacedName)
- [JSXOpeningElement](README.md#ASTWalker_JSXOpeningElement)
- [JSXSpreadAttribute](README.md#ASTWalker_JSXSpreadAttribute)
- [LabeledStatement](README.md#ASTWalker_LabeledStatement)
- [Literal](README.md#ASTWalker_Literal)
- [LogicalExpression](README.md#ASTWalker_LogicalExpression)
- [MemberExpression](README.md#ASTWalker_MemberExpression)
- [MethodDefinition](README.md#ASTWalker_MethodDefinition)
- [NewExpression](README.md#ASTWalker_NewExpression)
- [nlIfNot](README.md#ASTWalker_nlIfNot)
- [ObjectExpression](README.md#ASTWalker_ObjectExpression)
- [ObjectPattern](README.md#ASTWalker_ObjectPattern)
- [out](README.md#ASTWalker_out)
- [prevChar](README.md#ASTWalker_prevChar)
- [Program](README.md#ASTWalker_Program)
- [Property](README.md#ASTWalker_Property)
- [pushStructure](README.md#ASTWalker_pushStructure)
- [RestElement](README.md#ASTWalker_RestElement)
- [ReturnStatement](README.md#ASTWalker_ReturnStatement)
- [saveNode](README.md#ASTWalker_saveNode)
- [SequenceExpression](README.md#ASTWalker_SequenceExpression)
- [skip](README.md#ASTWalker_skip)
- [startBlock](README.md#ASTWalker_startBlock)
- [startCollecting](README.md#ASTWalker_startCollecting)
- [startWalk](README.md#ASTWalker_startWalk)
- [Super](README.md#ASTWalker_Super)
- [SwitchCase](README.md#ASTWalker_SwitchCase)
- [SwitchStatement](README.md#ASTWalker_SwitchStatement)
- [TemplateElement](README.md#ASTWalker_TemplateElement)
- [TemplateLiteral](README.md#ASTWalker_TemplateLiteral)
- [ThisExpression](README.md#ASTWalker_ThisExpression)
- [ThrowStatement](README.md#ASTWalker_ThrowStatement)
- [TryStatement](README.md#ASTWalker_TryStatement)
- [UnaryExpression](README.md#ASTWalker_UnaryExpression)
- [UpdateExpression](README.md#ASTWalker_UpdateExpression)
- [VariableDeclaration](README.md#ASTWalker_VariableDeclaration)
- [VariableDeclarator](README.md#ASTWalker_VariableDeclarator)
- [walk](README.md#ASTWalker_walk)
- [walkAsString](README.md#ASTWalker_walkAsString)
- [WhileStatement](README.md#ASTWalker_WhileStatement)
- [WithStatement](README.md#ASTWalker_WithStatement)
- [YieldExpression](README.md#ASTWalker_YieldExpression)



   
    
##### trait events

- [on](README.md#_on)
- [removeListener](README.md#_removeListener)
- [trigger](README.md#_trigger)


    
    


   
      
    





   
# Class ASTWalker


The class has following internal singleton variables:
        
* _cnt
        
        
### <a name="ASTWalker_ArrayExpression"></a>ASTWalker::ArrayExpression(node, ctx)


```javascript

var me = this;

// Check values...
if( node.elements && node.elements.length>=0) {
    // Walk the array elements
    this.out("[");
    var cnt=0;
    node.elements.forEach( function(e) {
        if(cnt++>0) me.out(",");
        me.trigger("ArrayElement", e);
        me.walk(e, ctx);
    })
    this.out("]");
}


```

### <a name="ASTWalker_ArrayPattern"></a>ASTWalker::ArrayPattern(node, ctx)


```javascript
var me = this;

// Check values...
if( node.elements && node.elements.length>0) {
    // Walk the array elements
    this.out("[");
    var cnt=0;
    node.elements.forEach( function(e) {
        if(cnt++>0) me.out(",");
        me.trigger("ArrayElement", e);
        me.walk(e, ctx);
    })
    this.out("]");
}

```

### <a name="ASTWalker_ArrowExpression"></a>ASTWalker::ArrowExpression(node, ctx)


```javascript

```

### <a name="ASTWalker_ArrowFunctionExpression"></a>ASTWalker::ArrowFunctionExpression(node, ctx)


```javascript

if(this._options.toES5) {
    this.out("function");
    if(node.generator) {
        this.out("* ");
    }
    var me = this;
    this.out("(");
    var cnt=0;
    node.params.forEach(function(p) {
        if(cnt++>0) me.out(",");
        me.walk(p,ctx);   
        if(node.defaults && node.defaults[cnt-1]) {
            var defP = node.defaults[cnt-1];
            me.out("=");
            me.walk( defP, ctx);
        }
    })   
    this.out(")");
    me.trigger("FunctionBody", node.body);
    if(node.body.type!="BlockStatement") this.out("{ return ");
    this.walk(node.body, ctx);     
    if(node.body.type!="BlockStatement") this.out("}");
    this.out(".bind(this)");
    return;
}
this.out("function");
if(node.generator) {
    this.trigger("FunctionGenerator", node);
    this.out("* ");
}

if(node.id && node.id.name) {
    this.trigger("FunctionName", node);
    this.out(" "+node.id.name+" "); 
} else {
    this.trigger("FunctionAnonymous", node);
}

var me = this;
this.out("(");
var cnt=0;

node.params.forEach(function(p) {
    if(cnt++>0) me.out(",");
    me.trigger("FunctionParam", p);
    me.walk(p,ctx);   
    if(node.defaults && node.defaults[cnt-1]) {
        var defP = node.defaults[cnt-1];
        me.out("=");
        me.trigger("FunctionDefaultParam", defP);
        me.walk( defP, ctx);
    }
})   

this.out(")");
me.trigger("FunctionBody", node.body);
this.walk(node.body, ctx);    

```

### <a name="ASTWalker_AssignmentExpression"></a>ASTWalker::AssignmentExpression(node, ctx)


```javascript

this.trigger("AssigmentLeft", node.left);
this.walk(node.left, ctx);
this.out(" "+node.operator+" ");
this.trigger("AssigmentRight", node.right);
this.walk(node.right, ctx);


```

### <a name="ASTWalker_BinaryExpression"></a>ASTWalker::BinaryExpression(node, ctx)


```javascript

// var logicals = ["==", "<=", ">=", "==", "===", "!=", ]

var bLeftNeedsPar = true, bRightNeedsPar=true;
if(node.left.type == "Identifier" || node.left.type == "Literal") {
    bLeftNeedsPar = false;
}
if(node.right.type == "Identifier" || node.right.type == "Literal") {
    bRightNeedsPar = false;
}

if(bLeftNeedsPar) this.out("(");
this.walk(node.left, ctx);
if(bLeftNeedsPar) this.out(")");

this.out(" "+node.operator+" ");

if(bRightNeedsPar) this.out("(");
this.walk(node.right, ctx);
if(bRightNeedsPar) this.out(")");
```

### <a name="ASTWalker_BlockStatement"></a>ASTWalker::BlockStatement(node, ctx)


```javascript

// keeps at the same context right now I guess....
this.out(" {",true);
this.indent(1);
this.walk(node.body,ctx, true);
this.indent(-1);
this.out("}");
```

### <a name="ASTWalker_BreakStatement"></a>ASTWalker::BreakStatement(node, ctx)


```javascript
this.nlIfNot();
this.out("break ");
if(node.label) this.walk(node.label, ctx);
this.out("", true);
```

### <a name="ASTWalker_breakWalk"></a>ASTWalker::breakWalk(t)


```javascript

this._breakWalk = true;
```

### <a name="ASTWalker_CallExpression"></a>ASTWalker::CallExpression(node, ctx)


```javascript
if(node.callee) {
    if(node.callee.type=="FunctionExpression") this.out("(");
    this.walk(node.callee, ctx);
    if(node.callee.type=="FunctionExpression") this.out(")");
    this.out("(");
    if(node.arguments) {
        var me = this,
            cnt=0;
        node.arguments.forEach(function(n) {
            if(cnt++>0) me.out(", ");
            me.walk(n,ctx); 
        });
    }
    this.out(")");
}
```

### <a name="ASTWalker_CatchClause"></a>ASTWalker::CatchClause(node, ctx)


```javascript
this.out(" catch ");

if(node.param) {
    this.out("(");
    this.walk(node.param, ctx);
    this.out(")");
}
if(node.body) {
    this.walk(node.body, ctx);
}
```

### <a name="ASTWalker_ClassBody"></a>ASTWalker::ClassBody(node, ctx)


```javascript
this.out("{", true);

// walk the class body
this.indent(1);
this.walk(node.body, ctx);
this.indent(-1);

this.out("}", true);

```

### <a name="ASTWalker_ClassDeclaration"></a>ASTWalker::ClassDeclaration(node, ctx)


```javascript

this.out("class ");

if(node.id) {
    this.walk( node.id, ctx );
    this.out(" ");
}

if(node.superClass) {
    this.trigger("Extends", node.superClass);
    this.out(" extends ");
    this.walk( node.superClass, ctx);
}

if(node.body) {
    this.walk( node.body,ctx);
}


```

### <a name="ASTWalker_ConditionalExpression"></a>ASTWalker::ConditionalExpression(node, ctx)


```javascript

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
```

### <a name="ASTWalker_ContinueStatement"></a>ASTWalker::ContinueStatement(node, ctx)


```javascript
this.nlIfNot();
this.out("continue ");
if(node.label) this.walk(node.label, ctx);
this.out("", true);
```

### <a name="ASTWalker_createContext"></a>ASTWalker::createContext(parent)
`parent` Parent context
 


```javascript

if(!this._objects) {
    this._objects = {};
}
var id = this.createId();

var ctx = {
    id : id,
    vars : {},
    functions : {},
    parentCtx : parent
};
this._objects[id] = ctx;

return ctx;
```

### <a name="ASTWalker_createId"></a>ASTWalker::createId(prefix)
`prefix` Opitional prefix
 


```javascript
if(!this._localId) {
    this._localId = 0;
}
this._localId++;
return (prefix ? prefix : "") + this._localId;

```

### <a name="ASTWalker_createObject"></a>ASTWalker::createObject(id, objData)


```javascript

if(!this._objects) this._objects = {};

this._objects[id] = objData;
```

### <a name="ASTWalker_DebuggerStatement"></a>ASTWalker::DebuggerStatement(node, ctx)


```javascript
this.nlIfNot();
this.out("debugger;");
```

### <a name="ASTWalker_DoWhileStatement"></a>ASTWalker::DoWhileStatement(node, ctx)


```javascript
this.nlIfNot();
this.out("do ",true);

if(node.body) {
    var bNeedsPar = false;
    if(node.body.type != "BlockStatement" && ( node.body.type.indexOf("Statement")>=0) ) {
        bNeedsPar = true;
    }
    if(bNeedsPar) {
        this.out("{");
        this.indent(1);
    }
    this.walk(node.body,ctx);
    if(bNeedsPar) {
        this.indent(-1);
        this.out("}");
    }
}

this.out(" ");
if(node.test) {
    this.out("while(");
    this.trigger("DoWhileTest", node.test);
    this.walk(node.test,ctx);
    this.out(")");
}

this.out("", true);
```

### <a name="ASTWalker_EmptyStatement"></a>ASTWalker::EmptyStatement(t)


```javascript

```

### <a name="ASTWalker_endBlock"></a>ASTWalker::endBlock(t)


```javascript
this.out("}", true);
this.indent(-1);
```

### <a name="ASTWalker_endCollecting"></a>ASTWalker::endCollecting(t)


```javascript
this._collecting = false;
```

### <a name="ASTWalker_ExpressionStatement"></a>ASTWalker::ExpressionStatement(node, ctx)


```javascript
this.nlIfNot();
this.walk(node.expression, ctx);
this.out(";", true);
```

### <a name="ASTWalker_find"></a>ASTWalker::find(id)
`id` Object to look for
 


```javascript

```

### <a name="ASTWalker_ForInStatement"></a>ASTWalker::ForInStatement(node, ctx)


```javascript
this.nlIfNot();
this.out("for");
this.out("(");

var oldf = ctx._forVar;
ctx._forVar = 1;
if(node.left) {
    this.trigger("ForInLeft", node.left);
    this.walk(node.left,ctx);
}
ctx._forVar = oldf;

this.out(" in ");
if(node.right) {
    this.trigger("ForInRight", node.right);
    this.walk(node.right,ctx);
}
this.out(")");

if(node.body) {
    this.trigger("ForInBody", node.body);
    var bNeedsPar = false;
    if(node.body.type != "BlockStatement" && ( node.body.type.indexOf("Statement")>=0) ) {
        bNeedsPar = true;
    }
    if(bNeedsPar) {
        this.out("{");
        this.indent(1);
    }
    this.walk(node.body,ctx);
    if(bNeedsPar) {
        this.indent(-1);
        this.out("}");
    }
}

this.out("", true);
```

### <a name="ASTWalker_ForOfStatement"></a>ASTWalker::ForOfStatement(node, ctx)


```javascript
this.nlIfNot();
this.out("for");
this.out("(");

var oldf = ctx._forVar;
ctx._forVar = 1;
if(node.left) {
    this.trigger("ForOfLeft", node.left);
    this.walk(node.left,ctx);
}
ctx._forVar = oldf;
this.out(" of ");
if(node.right) {
    this.trigger("ForOfRight", node.right);
    this.walk(node.right,ctx);
}
this.out(")");

if(node.body) {
    this.trigger("ForOfBody", node.body);
    var bNeedsPar = false;
    if(node.body.type != "BlockStatement" && ( node.body.type.indexOf("Statement")>=0) ) {
        bNeedsPar = true;
    }
    if(bNeedsPar) {
        this.out("{");
        this.indent(1);
    }
    this.walk(node.body,ctx);
    if(bNeedsPar) {
        this.indent(-1);
        this.out("}");
    }
}

this.out("", true);
```

### <a name="ASTWalker_ForStatement"></a>ASTWalker::ForStatement(node, ctx)


```javascript
this.out("for");
this.out("(");
var oldf = ctx._forVar;
ctx._forVar = 1;
if(node.init) {
    this.walk(node.init,ctx);
}
ctx._forVar = oldf;
this.out("; ");
if(node.test) {
    this.walk(node.test,ctx);
}
this.out("; ");
if(node.update) {
    this.walk(node.update,ctx);
}
this.out(")");

if(node.body) {
    var bNeedsPar = false;
    if(node.body.type != "BlockStatement" && ( node.body.type.indexOf("Statement")>=0) ) {
        bNeedsPar = true;
    }
    if(bNeedsPar) {
        this.out("{");
        this.indent(1);
    }
    this.walk(node.body,ctx);
    if(bNeedsPar) {
        this.indent(-1);
        this.out("}");
    }
}

this.out("", true);
```

### <a name="ASTWalker_FunctionDeclaration"></a>ASTWalker::FunctionDeclaration(node, ctx)


```javascript

var subCtx = this.createContext( ctx ); 

node.contextId = subCtx.id;

this.out("function");

if(node.generator) this.out("*");

if(node.id && node.id.name) {
    this.trigger("FunctionName", node);
    this.out(" "+node.id.name+" "); 
    if(node.id.name) {
        ctx.functions[node.id.name] = node;
    }    
} else {
    this.trigger("FunctionAnonymous", node);
}

var me = this;
this.out("(");
var cnt=0;

node.params.forEach(function(p) {
    if(cnt++>0) me.out(",");
    me.trigger("FunctionParam", p);
    me.walk(p,subCtx);   
    if(node.defaults && node.defaults[cnt-1]) {
        var defP = node.defaults[cnt-1];
        me.out("=");
        me.trigger("FunctionDefaultParam", defP);
        me.walk( defP, subCtx);
    }
})   

this.out(")");
me.trigger("FunctionBody", node.body);
this.walk(node.body, subCtx);    

```

### <a name="ASTWalker_FunctionExpression"></a>ASTWalker::FunctionExpression(node, ctx)


```javascript

var subCtx = this.createContext( ctx );  // { parentCtx : ctx };

node.contextId = subCtx.id;

if(!this.__insideMethod) this.out("function");

if(node.generator) {
    this.trigger("FunctionGenerator", node);
    this.out("* ");
}

if(node.id && node.id.name) {
    this.trigger("FunctionName", node);
    this.out(" "+node.id.name+" "); 
    if(node.id.name) {
        ctx.functions[node.id.name] == node;
    }     
} else {
    this.trigger("FunctionAnonymous", node);
}

var me = this;
this.out("(");
var cnt=0;

node.params.forEach(function(p) {
    if(cnt++>0) me.out(",");
    me.trigger("FunctionParam", p);
    me.walk(p,subCtx);   
    if(node.defaults && node.defaults[cnt-1]) {
        var defP = node.defaults[cnt-1];
        me.out("=");
        me.trigger("FunctionDefaultParam", defP);
        me.walk( defP, subCtx);
    }
})   

this.out(")");

me.trigger("FunctionBody", node.body);
this.walk(node.body, subCtx);    

```

### <a name="ASTWalker_getCode"></a>ASTWalker::getCode(t)


```javascript
return this._codeStr;
```

### <a name="ASTWalker_getLineNumber"></a>ASTWalker::getLineNumber(t)


```javascript
return this._lineNumber;
```

### <a name="ASTWalker_getParent"></a>ASTWalker::getParent(node)


```javascript

if(node) {
    if(node.nodeid) {
        var p = this._nodeParents[node.nodeid];
        return p;
    }
    return;
}

if(this._path) {
    var len = this._path.length;
    return this._path[len-1];
}
```

### <a name="ASTWalker_getStructures"></a>ASTWalker::getStructures(t)


```javascript
return this._structures;
```

### <a name="ASTWalker_Identifier"></a>ASTWalker::Identifier(node, ctx)
`node` Node to walk
 
`ctx` Context to use
 


```javascript
// just output the identifier name...
this.out(node.name);
```

### <a name="ASTWalker_IfStatement"></a>ASTWalker::IfStatement(node, ctx)


```javascript

this.nlIfNot();
this.out("if(");
this.trigger("IfTest", node.test);
this.walk(node.test, ctx);
this.out(")");
if(node.consequent) {
    var bNeedsPar = false;
    if(node.consequent.type != "BlockStatement" ) bNeedsPar=true;
    this.trigger("IfConsequent", node.consequent);

    if(bNeedsPar) {
        this.out("{");
        this.indent(1);
    }
    this.walk(node.consequent,ctx);
    if(bNeedsPar) {
        this.indent(-1);
        this.out("}");
    }    
}
if(node.alternate) {
    this.out(" else ");
    var bNeedsPar = false;
    if(node.alternate.type != "BlockStatement" ) bNeedsPar=true; 

    this.trigger("IfAlternate", node.alternate);

    if(bNeedsPar) {
        this.out("{");
        this.indent(1);
    }
    this.walk(node.alternate,ctx);
    if(bNeedsPar) {
        this.indent(-1);
        if(this.prevChar() != "{") this.out("",true);
        this.out("}");
    }     
}

this.out("", true);
```

### <a name="ASTWalker_indent"></a>ASTWalker::indent(change)
`change` Delta to modify the indent
 


```javascript

this._indent += change;
if(this._indent<0) this._indent = 0;
```

### ASTWalker::constructor( options )
Walks the AST tree, creates events on walk steps. Options : defaultNamespace, forceNamespace.
```javascript

this._structures = [];
this._path = [];

this._tabChar = "  ";
this._codeStr = "";
this._currentLine = "";
this._indent = 0;

this._options = options || {};

if(options && !options.toES5) {
    this._options.toES5 = false;
} else {
    this._options.toES5 = true;
}

this._nsList = ["react", "DOM", "SVG", "FRZR"];

this.initReactNamespace();
this.initDOMNamespace();
this.initDOMCNamespace();
this.initSVGNamespace();
this.initFRZRNamespace();
```
        
### <a name="ASTWalker_initDOMC"></a>ASTWalker::initDOMC(t)


```javascript
if(this._options.defaultNamespace == "DOMC") {
    
    // this.out("$$x(e,expr)",true);
    
    this.out("function $$x(e,expr){",true);
          
      this.out("if(typeof(expr)=='string' || typeof(expr)=='number') {",true);
          this.indent(1);
          this.out("e.appendChild(document.createTextNode(expr));",true);
          this.indent(-1);
      this.out("} else {");
      this.indent(1);
        this.out("if(expr instanceof Array) {",true);
        this.indent(1);
        this.out('expr.forEach(function(ee){e.appendChild(ee)});',true)
        this.indent(-1);
        this.out("} else { ",true);              
        this.out("if(typeof(expr)=='object')",true);
          this.indent(1);
          this.out("e.appendChild(expr);",true);
          this.indent(-1);
        this.out("}",true);                               

          
      this.indent(-1);
      this.out("}");        

    this.out("}",true);
    
    // this.out("$et(e,\""+str+"\")",true);
    // this.out("e.appendChild(document.createTextNode(\""+str+"\"));",true);    
    this.out("function $$t(e,s){",true);
     this.out("e.appendChild(document.createTextNode(s));",true); 
    this.out("}",true);
    
    //       this.out("e=$$e('"+elemName+"');",true);
    // this.out("e=document.createElement('"+elemName+"');",true);
    this.out("function $$e(e){",true);
     this.out("return document.createElement(e);",true); 
    this.out("}",true);    
    
    // this.out("var el=$$o(this)");
    this.out("function $$o(me){",true);
        this.out("var fn = function(){this.parent=me;};");
        this.out("fn.prototype = me;",true);
        this.out("return fn;",true);
    this.out("}",true);
}
```

### <a name="ASTWalker_initDOMCNamespace"></a>ASTWalker::initDOMCNamespace(t)

Compressed namespace for DOM elements
```javascript

// tags that will be converted to DOM element access
var _elemNamesList = ["a", "abbr", "acronym","address","applet","area","article","aside","audio",
"b","base","basefont","bdi","bdo","big","blockquote","body","br","button","canvas",
"caption","center","cite","code","col","colgroup","datalist","dd","del","details",
"dfn","dialog","dir","div","dl","dt","em","embed","fieldset","figcaption","figure","font",
"footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup",
"hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link",
"main","map","mark","menu","menuitem","meta","meter","nav","noframes","noscript","object",
"ol","optgroup","option","output","p","param","pre","progress","q","rp","rt","ruby",
"s","sampe","script","section","select","small","source","span","strike","strong","style",
"sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title",
"tr","track","tt","u","ul","var","video","wbr"];

 // _fnCall indicates the result is a key-value of an object expression
_myTrait_.DOMCJSXAttribute = function(node, ctx) {
      this.out("\"");
      if(node.name.type=="JSXNamespacedName") {
        this.out(node.name.namespace.name);   
        this.out(":");
        this.out(node.name.name.name);  
      } else {
        this.out(node.name.name);
      }
      this.out("\"");
      if(ctx._fnCall) {
        this.out(":");
      } else {
        this.out(",");
      }
      this.walk(node.value,ctx);
 }

 _myTrait_.DOMCJSXOpeningElement = function(node,ctx) {
    
    this.out("(function() { ",true);
    this.indent(1);
    this.out("var e,me=this;",true);
    
    var elemName, objName;
    if(node.name.type=="JSXMemberExpression") {
        var obj = node.name;
        if(obj.object.name == ctx.ns) {
            elemName = obj.property.name;
        } else {
            elemName = obj.property.name;
            objName = obj.object.name;
            // console.error("JSXMemberExpression not currently supported at react Namepace");
        }
    } else {                        
        elemName = node.name.name;
    }


    // Allowed elem names etc...
    if(!objName && _elemNamesList.indexOf(elemName)>=0) {
      this.out("e=$$e('"+elemName+"');",true);
      // this.out("e=document.createElement('"+elemName+"');",true);

      if(node.attributes && node.attributes.length) {
          for(var i=0; i<node.attributes.length;i++) {
            var attrName = node.attributes[i].name.name;
            if(attrName && attrName.substring(0,2)=="on") {
                var eventName = attrName.slice(2).toLowerCase();
                this.out("e.addEventListener('"+eventName+"', function(){me['"+attrName+"'](");
                this.walk(node.attributes[i].value,ctx);
                this.out(")}.bind(this));",true); 
                continue;
            }
            this.out("e.setAttribute(");
            this.walk(node.attributes[i],ctx);
            this.out(");",true);
          }
      } else {
        // this.out("null");
      }                       
    } else {
        this.out("var el=$$o(this);",true);
        //this.out("var self = function(){this.parent=me;};");
        //this.out("self.prototype = this;",true);
        if(objName) {
            this.out("e = " + objName+"."+elemName + ".apply(new el(),[");
        } else {
            this.out("e = " + elemName + ".apply(new el(),[");
        }
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
        }
        ctx._fnCall = prevFnState;
        this.out("]);", true);          
    }

    if(node.selfClosing) {
        this.out("return e;");
        this.indent(-1);
        this.out("}).apply(this,[])",true);

    } else {

    }
 }        
 _myTrait_.DOMCLiteral = function(node,ctx) {
    if(typeof(node.value)=="string") {
      this.out("\"");
      this.out(node.value.split("\n").join("\\n"));
      // this.out(node.value);
      this.out("\"");
    } else {
      this.out(node.value);
    }
 }
 _myTrait_.DOMCJSXExpressionContainer = function(node,ctx) {
    this.walk(node.expression, ctx);
 }
 _myTrait_.DOMCJSXElement = function(node,ctx) {
    var inJsx = ctx._inJSX;
    ctx._inJSX = true;
    var bExpr = false;
    this.walk(node.openingElement, ctx);
    var cnt=0;
    if(node.children) {

        for(var i=0; i<node.children.length;i++) {
          var child = node.children[i];
          if(child.type=="JSXElement") {
              this.out("e.appendChild(");
              this.indent(1);
              this.walk(child,ctx);
              this.indent(-1);
              this.out(")",true);
          }    
          if(child.type=="Literal") {
              var value = child.value;
              if(typeof(value)=="string") {
                  var lines = value.split("\n");
                  var str = lines.join("\\n");
                  this.out("$$t(e,\""+str+"\")",true);
                  // this.out("e.appendChild(document.createTextNode(\""+str+"\"));",true);
              } else {
                  this.out("e.appendChild(document.createTextNode(");
                  this.walk(child,ctx);
                  this.out("))",true);
              }
          }
          if(child.type=="JSXExpressionContainer") {
              if(!bExpr) {
                this.out("var expr=")
                this.walk(child, ctx);
                this.out(";",true);
              }
              this.out("$$x(e,expr)",true);
              /*
              this.out("if(typeof(expr)=='string' || typeof(expr)=='number') {",true);
                  this.indent(1);
                  this.out("e.appendChild(document.createTextNode(expr));",true);
                  this.indent(-1);
              this.out("} else {");
              this.indent(1);
                this.out("if(expr instanceof Array) {",true);
                this.indent(1);
                this.out('expr.forEach(function(ee){e.appendChild(ee)});',true)
                this.indent(-1);
                this.out("} else { ",true);              
                this.out("if(typeof(expr)=='object')",true);
                  this.indent(1);
                  this.out("e.appendChild(expr);",true);
                  this.indent(-1);
                this.out("}",true);                               

                  
              this.indent(-1);
              this.out("}");        
              */
                            
          }
        }
    }
    this.walk(node.closingElement, ctx);
    // if(!inJsx) this.out(";", true);
    ctx._inJSX = inJsx;
 }                          
 _myTrait_.DOMCJSXClosingElement = function(node,ctx) {
    this.out("return e;",true);
    this.indent(-1);
    this.out("}).apply(this,[])",true);
 }
```

### <a name="ASTWalker_initDOMNamespace"></a>ASTWalker::initDOMNamespace(t)


```javascript

// tags that will be converted to DOM element access
var _elemNamesList = ["a", "abbr", "acronym","address","applet","area","article","aside","audio",
"b","base","basefont","bdi","bdo","big","blockquote","body","br","button","canvas",
"caption","center","cite","code","col","colgroup","datalist","dd","del","details",
"dfn","dialog","dir","div","dl","dt","em","embed","fieldset","figcaption","figure","font",
"footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup",
"hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link",
"main","map","mark","menu","menuitem","meta","meter","nav","noframes","noscript","object",
"ol","optgroup","option","output","p","param","pre","progress","q","rp","rt","ruby",
"s","sampe","script","section","select","small","source","span","strike","strong","style",
"sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title",
"tr","track","tt","u","ul","var","video","wbr"];

 // _fnCall indicates the result is a key-value of an object expression
_myTrait_.DOMJSXAttribute = function(node, ctx) {
      this.out("\"");
      if(node.name.type=="JSXNamespacedName") {
        this.out(node.name.namespace.name);   
        this.out(":");
        this.out(node.name.name.name);  
      } else {
        this.out(node.name.name);
      }
      this.out("\"");
      if(ctx._fnCall) {
        this.out(":");
      } else {
        this.out(",");
      }
      if(node.value===null) {
        this.out("null");  
      } else {
        this.walk(node.value,ctx);
      }
 }

 _myTrait_.DOMJSXOpeningElement = function(node,ctx) {
    
    this.out("(function() { ",true);
    this.indent(1);
    this.out("var e,me=this;",true);
    
    var elemName, objName;
    if(node.name.type=="JSXMemberExpression") {
        var obj = node.name;
        if(obj.object.name == ctx.ns) {
            elemName = obj.property.name;
        } else {
            elemName = obj.property.name;
            objName = obj.object.name;
            // console.error("JSXMemberExpression not currently supported at react Namepace");
        }
    } else {                        
        elemName = node.name.name;
    }


    // Allowed elem names etc...
    if(!objName && _elemNamesList.indexOf(elemName)>=0) {
      this.out("e=document.createElement('"+elemName+"');",true);

      if(node.attributes && node.attributes.length) {
          for(var i=0; i<node.attributes.length;i++) {
            var attrName = node.attributes[i].name.name;
            if(attrName && attrName.substring(0,2)=="on") {
                var eventName = attrName.slice(2).toLowerCase();
                // e.addEventListener('click', function(){me['click']("ok")});return e;}).apply(this,[])
                
                var valueNode = node.attributes[i].value;
                
                // && valueNode.expression.type=="CallExpression"
                if(valueNode.type=="JSXExpressionContainer" ) {
                    this.trigger("JSXEventListener", { event : eventName, fn : attrName, elemNode : node, node: node.attributes[i], ctx : ctx });
                    this.out("e.addEventListener('"+eventName+"', function(event){");
                    this.walk(valueNode.expression,ctx);
                    this.out("}.bind(this));",true);                     
                } else {
                    this.trigger("JSXEventListener", { event : eventName, fn : attrName, elemNode : node, node: node.attributes[i], ctx : ctx });
                    this.out("e.addEventListener('"+eventName+"', function(event){me['"+attrName+"'](");
                    this.walk(node.attributes[i].value,ctx);
                    this.out(")});",true); 
                }
                continue;
            }
            this.out("e.setAttribute(");
            this.walk(node.attributes[i],ctx);
            this.out(");",true);
          }
      } else {
        // this.out("null");
      }                       
    } else {
        // remove the "parent"
        this.out("var self = function(){ this._parent = me;};");
        this.out("self.prototype = this;",true);
        if(objName) {
            this.out("e = " + objName+"."+elemName + ".apply(new self(),[");
        } else {
            this.out("e = " + elemName + ".apply(new self(),[");
        }
        this.trigger("JSXCustomElement", { obj : objName, elem : elemName, node: node, ctx : ctx });
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
        }
        ctx._fnCall = prevFnState;
        this.out("]);", true);          
    }

    if(node.selfClosing) {
        this.out("return e;");
        this.indent(-1);
        this.out("}).apply(this,[])",true);

    } else {

    }
 }        
 _myTrait_.DOMLiteral = function(node,ctx) {
    if(typeof(node.value)=="string") {
      this.out("\"");
      this.out(node.value.split("\n").join("\\n"));
      // this.out(node.value);
      this.out("\"");
    } else {
      if(typeof(node.raw)!="undefined") {
          this.out(node.raw);
      } else {
          this.out(node.value);
      }
    }
 }
 _myTrait_.DOMJSXExpressionContainer = function(node,ctx) {
    this.walk(node.expression, ctx);
 }
 _myTrait_.DOMJSXElement = function(node,ctx) {
    var inJsx = ctx._inJSX;
    ctx._inJSX = true;
    var bExpr = false;
    this.walk(node.openingElement, ctx);
    var cnt=0;
    if(node.children) {

        for(var i=0; i<node.children.length;i++) {
          var child = node.children[i];
          if(child.type=="JSXElement") {
              this.out("e.appendChild(");
              this.indent(1);
              this.walk(child,ctx);
              this.indent(-1);
              this.out(")",true);
          }    
          if(child.type=="Literal") {
              var value = child.value;
              if(typeof(value)=="string") {
                  var lines = value.split("\n");
                  var str = lines.join("\\n");
                  this.out("e.appendChild(document.createTextNode(\""+str+"\"));",true);
              } else {
                  this.out("e.appendChild(document.createTextNode(");
                  this.walk(child,ctx);
                  this.out("))",true);
              }
          }
          if(child.type=="JSXExpressionContainer") {
              if(!bExpr) {
                this.out("var expr=")
                this.walk(child, ctx);
                this.out(";",true);
              }
              this.out("if(typeof(expr)=='string' || typeof(expr)=='number') {",true);
                  this.indent(1);
                  this.out("e.appendChild(document.createTextNode(expr));",true);
                  this.indent(-1);
              this.out("} else {");
              this.indent(1);
                this.out("if(expr instanceof Array) {",true);
                this.indent(1);
                this.out('expr.forEach(function(ee){e.appendChild(ee)});',true)
                this.indent(-1);
                this.out("} else { ",true);              
                this.out("if(typeof(expr)=='object')",true);
                  this.indent(1);
                  this.out("e.appendChild(expr);",true);
                  this.indent(-1);
                this.out("}",true);                               

                  
              this.indent(-1);
              this.out("}");                              
                            
          }
        }
    }
    this.walk(node.closingElement, ctx);
    // if(!inJsx) this.out(";", true);
    ctx._inJSX = inJsx;
 }                          
 _myTrait_.DOMJSXClosingElement = function(node,ctx) {
    this.out("return e;",true);
    this.indent(-1);
    this.out("}).apply(this,[])",true);
 }
```

### <a name="ASTWalker_initFRZRNamespace"></a>ASTWalker::initFRZRNamespace(t)


```javascript

// tags that will be converted to DOM element access
var _elemNamesList = ["a", "abbr", "acronym","address","applet","area","article","aside","audio",
"b","base","basefont","bdi","bdo","big","blockquote","body","br","button","canvas",
"caption","center","cite","code","col","colgroup","datalist","dd","del","details",
"dfn","dialog","dir","div","dl","dt","em","embed","fieldset","figcaption","figure","font",
"footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup",
"hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link",
"main","map","mark","menu","menuitem","meta","meter","nav","noframes","noscript","object",
"ol","optgroup","option","output","p","param","pre","progress","q","rp","rt","ruby",
"s","sampe","script","section","select","small","source","span","strike","strong","style",
"sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title",
"tr","track","tt","u","ul","var","video","wbr"];

 // _fnCall indicates the result is a key-value of an object expression
_myTrait_.FRZRJSXAttribute = function(node, ctx) {
      this.out("\"");
      if(node.name.type=="JSXNamespacedName") {
        this.out(node.name.namespace.name);   
        this.out(":");
        this.out(node.name.name.name);  
      } else {
        this.out(node.name.name);
      }
      this.out("\"");
      if(ctx._fnCall) {
        this.out(":");
      } else {
        this.out(",");
      }
      if(node.value===null) {
        this.out("null");  
      } else {
        this.walk(node.value,ctx);
      }
 }

 _myTrait_.FRZRJSXOpeningElement = function(node,ctx) {
    
    this.out("(function() { ",true);
    this.indent(1);
    this.out("var e,me=this;",true);
    
    var elemName, objName;
    if(node.name.type=="JSXMemberExpression") {
        var obj = node.name;
        if(obj.object.name == ctx.ns) {
            elemName = obj.property.name;
        } else {
            elemName = obj.property.name;
            objName = obj.object.name;
            // console.error("JSXMemberExpression not currently supported at react Namepace");
        }
    } else {                        
        elemName = node.name.name;
    }


    // Allowed elem names etc...
    if(!objName && _elemNamesList.indexOf(elemName)>=0) {
      this.out("e = new frzr.View({el:'"+elemName+"'",false);
      
      // -- set attributes
      // if (i > 0) this.out(",", true);

      // -- update
      ctx._fnCall = true;
      var bHasAttrs = false;
      if(node.attributes && node.attributes.length) {
          bHasAttrs = true;
          this.indent(2);
          var _updFn;
          for(var i=0; i<node.attributes.length;i++) {
            var attrName = node.attributes[i].name.name;
            if(attrName && attrName.substring(0,2)=="on") {
                continue;
            }
            if(attrName =="update") {
                _updFn = node.attributes[i];
                continue;
            }            
            this.out(",", true);
            this.walk(node.attributes[i],ctx);
          }          
          if(_updFn) {
            this.out(",", true);
            this.walk(_updFn,ctx);              
          }
          this.indent(-2);
      } else {
        // this.out("null");
      }            
      ctx._fnCall = false;
      this.out("});",true);
      
      if(bHasAttrs) {
          for(var i=0; i<node.attributes.length;i++) {
            var attrName = node.attributes[i].name.name;
            if(attrName && attrName.substring(0,2)=="on") {
                var eventName = attrName.slice(2).toLowerCase();
    
                var valueNode = node.attributes[i].value;
                
                // && valueNode.expression.type=="CallExpression"
                if(valueNode.type=="JSXExpressionContainer" ) {
                    this.out("e.addListener('"+eventName+"', function(event){");
                    this.walk(valueNode.expression,ctx);
                    this.out("}.bind(this));",true);                     
                } else {
                    this.out("e.addListener('"+eventName+"', function(event){me['"+attrName+"'](");
                    this.walk(node.attributes[i].value,ctx);
                    this.out(")});",true); 
                }
                continue;
            }
          }      
      }
    } else {
        // remove the "parent"
        this.out("var self = function(){ this._parent = me;};");
        this.out("self.prototype = this;",true);
        if(objName) {
            this.out("e = " + objName+"."+elemName + ".apply(new self(),[");
        } else {
            this.out("e = " + elemName + ".apply(new self(),[");
        }
        this.trigger("JSXCustomElement", { obj : objName, elem : elemName, node: node, ctx : ctx });
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
        }
        ctx._fnCall = prevFnState;
        this.out("]);", true);          
    }

    if(node.selfClosing) {
        this.out("return e;");
        this.indent(-1);
        this.out("}).apply(this,[])",true);

    } else {

    }
 }        
 _myTrait_.FRZRLiteral = function(node,ctx) {
    if(typeof(node.value)=="string") {
      this.out("\"");
      this.out(node.value.split("\n").join("\\n"));
      this.out("\"");
    } else {
      if(typeof(node.raw)!="undefined") {
          this.out(node.raw);
      } else {
          this.out(node.value);
      }
    }
 }
 _myTrait_.FRZRJSXExpressionContainer = function(node,ctx) {
    this.walk(node.expression, ctx);
 }
 _myTrait_.FRZRJSXElement = function(node,ctx) {
    var inJsx = ctx._inJSX;
    ctx._inJSX = true;
    var bExpr = false;
    this.walk(node.openingElement, ctx);
    var cnt=0;
    if(node.children) {

        for(var i=0; i<node.children.length;i++) {
          var child = node.children[i];
          if(child.type=="JSXElement") {
              this.out("e.addChild(");
              this.indent(1);
              this.walk(child,ctx);
              this.indent(-1);
              this.out(")",true);
          }
/*
                  this.out("e.appendChild(document.createTextNode(\""+str+"\"));",true);
              } else {
                  this.out("e.appendChild(document.createTextNode(");
                  this.walk(child,ctx);
                  this.out("))",true);
              }
          }
          if(child.type=="JSXExpressionContainer") {
              if(!bExpr) {
                this.out("var expr=")
                this.walk(child, ctx);
                this.out(";",true);
              }
              this.out("if(typeof(expr)=='string' || typeof(expr)=='number') {",true);
                  this.indent(1);
                  this.out("e.appendChild(document.createTextNode(expr));",true);
*/
          if(child.type=="Literal") {
              var value = child.value;
              if(typeof(value)=="string") {
                  var lines = value.split("\n");
                  var str = lines.join("\\n");
                  this.out("e.addChild( new frzr.View({el:document.createTextNode(\""+str+"\")}))",true);
              } else {
                  this.out("e.addChild( new frzr.View({el:document.createTextNode(");
                  this.walk(child,ctx);
                  this.out(")}))",true);
              }
          }
          if(child.type=="JSXExpressionContainer") {
              if(!bExpr) {
                this.out("var expr=")
                this.walk(child, ctx);
                this.out(";",true);
              }
              this.out("if(typeof(expr)=='string' || typeof(expr)=='number') {",true);
                  this.indent(1);
                  this.out("e.addChild( new frzr.View({el:document.createTextNode(expr)}))",true);
                  this.indent(-1);
              this.out("} else {");
              this.indent(1);
                this.out("if(expr instanceof Array) {",true);
                this.indent(1);
                this.out('expr.forEach(function(ee){e.addChild(ee)});',true)
                this.indent(-1);
                this.out("} else { ",true);              
                this.out("if(typeof(expr)=='object')",true);
                  this.indent(1);
                  this.out("e.addChild(expr);",true);
                  this.indent(-1);
                this.out("}",true);                               

                  
              this.indent(-1);
              this.out("}");                              
                            
          }
        }
    }
    this.walk(node.closingElement, ctx);
    // if(!inJsx) this.out(";", true);
    ctx._inJSX = inJsx;
 }                          
 _myTrait_.FRZRJSXClosingElement = function(node,ctx) {
    this.out("return e;",true);
    this.indent(-1);
    this.out("}).apply(this,[])",true);
 }
```

### <a name="ASTWalker_initReactNamespace"></a>ASTWalker::initReactNamespace(t)


```javascript
 _myTrait_.reactJSXAttribute = function(node,ctx) {
    this.walk(node.name, ctx);
    this.out(":");
    this.walk(node.value, ctx);
 }
 _myTrait_.reactJSXOpeningElement = function(node,ctx) {
    console.log("reactJSXOpeningElement at namepace "+ctx.ns);
    this.out("React.createElement(", true);
    this.indent(1);
    
    if(node.name.type=="JSXMemberExpression") {
        var obj = node.name;
        if(obj.object.name == "react") {
            this.out("\""+obj.property.name+"\",",true);
        } else {
            // console.error("JSXMemberExpression not currently supported at react Namepace");
        }
    } else {
        if(node.name) {
            if(/[A-Z]/.test(node.name.name)) {
                this.out(node.name.name + ",", true);
            }else {
                this.out("\"" + node.name.name + "\",", true);
            }
        }
    }
    if(node.attributes && node.attributes.length) {
        this.out("{",true);
        this.indent(1);
        for(var i=0; i<node.attributes.length;i++) {
          if(i>0) this.out(",",true);
          this.walk(node.attributes[i],ctx);
        }
        this.indent(-1);
        this.out("}");
    } else {
      this.out("null");
    }                  
    if(node.selfClosing) {
        this.indent(-1);
        this.out("");
        this.out(")",true);                  
    }
 }        
 _myTrait_.reactLiteral = function(node,ctx) {
    if(ctx._inJSX) {
      var v = node.value.trim();
      if(v.length==0) return;

      this.out("\"");
      this.out(node.value.trim());
      this.out("\"");
    } else {
      this.out(node.raw);
    }
    
 }
 _myTrait_.reactJSXExpressionContainer = function(node,ctx) {
    this.walk(node.expression, ctx);
 }
 _myTrait_.reactJSXElement = function(node,ctx) {
    var inJsx = ctx._inJSX;
    ctx._inJSX = true;
    this.walk(node.openingElement, ctx);
    var cnt=0;
    if(node.children) {
        for(var i=0; i<node.children.length;i++) {
          var child = node.children[i];
          if(child.type=="Literal" && typeof(child.value)=="string" && child.value.trim().length==0) continue;
          this.out(",",true);
          this.walk(node.children[i],ctx);
        }
    }
    this.walk(node.closingElement, ctx);
    ctx._inJSX = inJsx;
 }                          
 _myTrait_.reactJSXClosingElement = function(node,ctx) {
    this.indent(-1);
    this.out("");
    this.out(")",true);

 }
```

### <a name="ASTWalker_initSVGNamespace"></a>ASTWalker::initSVGNamespace(t)


```javascript

// tags that will be converted to DOM element access
var _elemNamesList = [ "circle",
        "rect",
        "path",
        "svg",
        "image",
        "line",
        "text",
        "tspan",
        "g",
        "pattern",
        "polygon",
        "polyline",
        "clippath",
        "defs",
        "feoffset",
        "femerge",
        "femergenode",
        "linearGradient",
        "mask",
        "polyline",
        "feColorMatrix",
        "radialGradient",
        "stop",
        "feGaussianBlur",
        "filter"];

if(!this._autoNs) this._autoNs = {};

var me = this;
_elemNamesList.forEach(function(n) {
    me._autoNs[n] = "SVG";
})

/*
circle clipPath defs ellipse g line linearGradient mask path pattern polygon polyline
radialGradient rect stop svg text tspan
*/
var svgNS = "http://www.w3.org/2000/svg";  

 // _fnCall indicates the result is a key-value of an object expression
_myTrait_.SVGJSXAttribute = function(node, ctx) {
      this.out("\"");
      this.out(node.name.name);
      this.out("\"");
      if(ctx._fnCall) {
        this.out(":");
      } else {
        this.out(",");
      }
      this.walk(node.value,ctx);
 }
 
 _myTrait_.SVGJSXOpeningElement = function(node,ctx) {
    
    this.out("(function() { ",true);
    this.indent(1);
    this.out("var e,me=this;",true);
    
    var elemName, objName, bRootSvg=false;
    if(node.name.type=="JSXMemberExpression") {
        var obj = node.name;
        if(obj.object.name == ctx.ns) {
            elemName = obj.property.name;
        } else {
            elemName = obj.property.name;
            objName = obj.object.name;
        }
    } else {                        
        elemName = node.name.name;
    }

    // Allowed elem names etc...
    if(!objName && _elemNamesList.indexOf(elemName)>=0) {
      if(elemName=="svg") {
          this.out("e=document.createElementNS('http://www.w3.org/2000/svg', 'svg');",true);
          this.out('e.setAttribute("xmlns", "http://www.w3.org/2000/svg");',true);
          this.out('e.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");',true);
          bRootSvg=true;
      } else {
          this.out("e=document.createElementNS('http://www.w3.org/2000/svg', '"+elemName+"');",true);
      }

      if(node.attributes && node.attributes.length) {
          for(var i=0; i<node.attributes.length;i++) {
            var attr = node.attributes[i].name;
            if(attr.type=="JSXIdentifier") {
                var attrName = attr.name;
                if(attrName && attrName.substring(0,2)=="on") {
                    var eventName = attrName.slice(2).toLowerCase();
                    // e.addEventListener('click', function(){me['click']("ok")});return e;}).apply(this,[])
                    this.out("e.addEventListener('"+eventName+"', function(){me['"+attrName+"'](");
                    this.walk(node.attributes[i].value,ctx);
                    this.out(")});",true); 
                    continue;
                }
            }
            /*
    e.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    e.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    e.setAttributeNS(null,"xmlns","http://www.w3.org/2000/svg");
    e.setAttributeNS('http://www.w3.org/1999/xmlns',"xlink","            
            */
            if(attr.type=="JSXIdentifier") {
                if(bRootSvg && attr.name == "xmlns") continue;
                this.out("e.setAttributeNS(null,");
                this.walk(node.attributes[i],ctx);
                this.out(");",true);                
            } else {
                if(attr.type=="JSXNamespacedName") {
                    /*
      this.out("\"");
      this.out(node.name.name);
      this.out("\"");
      if(ctx._fnCall) {
        this.out(":");
      } else {
        this.out(",");
      }
      this.walk(node.value,ctx);                    
                    */
                    if(bRootSvg && attr.name.name == "xlink") continue;
                    if(bRootSvg) {
                        
                        this.out('e.setAttribute("'+attr.namespace.name+':'+attr.name.name+'",');
                        // "http://www.w3.org/1999/xlink");',true);
                        this.walk(node.attributes[i].value,ctx);
                        this.out(");",true);                        
                    } else {
                        this.out("e.setAttributeNS('http://www.w3.org/1999/"+attr.namespace.name+"',");
                        this.out("\"");
                        this.out(attr.name.name);
                        this.out("\"");
                        this.out(",");
                        this.walk(node.attributes[i].value,ctx);
                        this.out(");",true);
                    }
                }
            }
            /*
                if(n=="xlink:href") {
                    me._dom.setAttributeNS('http://www.w3.org/1999/xlink', 'href', val);      
                 } else {
                    host._attributes[n] = val;
                    me._dom.setAttributeNS(null, n,val);
                 }            
            */
          }
      } else {
        // this.out("null");
      }                       
    } else {
        this.out("var self = function(){this.parent=me;};");
        this.out("self.prototype = this;",true);
        if(objName) {
            this.out("e = " + objName+"."+elemName + ".apply(new self(),[");
        } else {
            this.out("e = " + elemName + ".apply(new self(),[");
        }        
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
        }
        ctx._fnCall = prevFnState;
        this.out("]);", true);          
    }

    if(node.selfClosing) {
        this.out("return e;");
        this.indent(-1);
        this.out("}).apply(this,[])",true);

    } else {

    }
 }        
 _myTrait_.SVGLiteral = function(node,ctx) {
    if(typeof(node.value)=="string") {
      this.out("\"");
      this.out(node.value.split("\n").join("\\n"));
      // this.out(node.value);
      this.out("\"");
    } else {
      this.out(node.value);
    }
 }
 _myTrait_.SVGJSXExpressionContainer = function(node,ctx) {
    this.walk(node.expression, ctx);
 }
 _myTrait_.SVGJSXElement = function(node,ctx) {
    var inJsx = ctx._inJSX;
    ctx._inJSX = true;
    var bExpr = false;
    this.walk(node.openingElement, ctx);
    var cnt=0;
    if(node.children) {

        for(var i=0; i<node.children.length;i++) {
          var child = node.children[i];
          if(child.type=="JSXElement") {
              this.out("e.appendChild(");
              this.indent(1);
              this.walk(child,ctx);
              this.indent(-1);
              this.out(")",true);
          }    
          if(child.type=="Literal") {
              var value = child.value;
              if(typeof(value)=="string") {
                  var lines = value.split("\n");
                  var str = lines.join("\\n");
                  this.out("e.appendChild(document.createTextNode(\""+str+"\"));",true);
              } else {
                  this.out("e.appendChild(document.createTextNode(");
                  this.walk(child,ctx);
                  this.out("))",true);
              }
          }
          if(child.type=="JSXExpressionContainer") {
              if(!bExpr) {
                this.out("var expr=")
                this.walk(child, ctx);
                this.out(";",true);
              }
              this.out("if(typeof(expr)=='string' || typeof(expr)=='number') {",true);
                  this.indent(1);
                  this.out("e.appendChild(document.createTextNode(expr));",true);
                  this.indent(-1);
              this.out("} else {");
              this.indent(1);
                this.out("if(expr instanceof Array) {",true);
                this.indent(1);
                this.out('expr.forEach(function(ee){e.appendChild(ee)});',true)
                this.indent(-1);
                this.out("} else { ",true);              
                this.out("if(typeof(expr)=='object')",true);
                  this.indent(1);
                  this.out("e.appendChild(expr);",true);
                  this.indent(-1);
                this.out("}",true);                               

                  
              this.indent(-1);
              this.out("}");                              
                            
          }
        }
    }
    this.walk(node.closingElement, ctx);
    // if(!inJsx) this.out(";", true);
    ctx._inJSX = inJsx;
 }                          
 _myTrait_.SVGJSXClosingElement = function(node,ctx) {
    this.out("return e;",true);
    this.indent(-1);
    this.out("}).apply(this,[])",true);
 }
```

### <a name="ASTWalker_JSXAttribute"></a>ASTWalker::JSXAttribute(node, ctx)


```javascript

this.walk(node.name, ctx);
this.out("=");
this.walk(node.value, ctx);
```

### <a name="ASTWalker_JSXClosingElement"></a>ASTWalker::JSXClosingElement(node, ctx)


```javascript

this.out("</");
this.walk(node.name, ctx);
// this.out(node.name.name);
this.out(">");
```

### <a name="ASTWalker_JSXElement"></a>ASTWalker::JSXElement(node, ctx)


```javascript


// openingElement
// closingElement
// selfClosing
this.walk(node.openingElement, ctx);
// --> children
this.out("", true);
this.indent(1);
this.walk(node.children, ctx);
this.indent(-1);
if(node.selfClosing) {
    this.out("/>", true);
} else {
    if(node.closingElement) this.walk(node.closingElement, ctx);
}
```

### <a name="ASTWalker_JSXEmptyExpression"></a>ASTWalker::JSXEmptyExpression(t)


```javascript

```

### <a name="ASTWalker_JSXExpressionContainer"></a>ASTWalker::JSXExpressionContainer(node, ctx)


```javascript


this.out("{");
this.walk(node.expression, ctx);
this.out("}");
```

### <a name="ASTWalker_JSXIdentifier"></a>ASTWalker::JSXIdentifier(node, ctx)


```javascript

this.out(node.name);
```

### <a name="ASTWalker_JSXMemberExpression"></a>ASTWalker::JSXMemberExpression(node, ctx)


```javascript

this.walk(node.object,ctx);

if(node.computed) {
    this.out("[");
    this.walk(node.property, ctx);    
    this.out("]");
} else {
    this.out(".");
    this.walk(node.property, ctx);    
}

```

### <a name="ASTWalker_JSXNamespacedName"></a>ASTWalker::JSXNamespacedName(node, ctx)


```javascript

this.out(node.namespace);
this.out(":");
this.out(node.name);
```

### <a name="ASTWalker_JSXOpeningElement"></a>ASTWalker::JSXOpeningElement(node, ctx)


```javascript

// -> would create a component, JSXIdentifier

this.out("<");

this.walk(node.name, ctx);
this.out(" ");
this.walk(node.attributes, ctx);

if(node.selfClosing) {
    this.out("/>");
} else {
    this.out(">");    
}
```

### <a name="ASTWalker_JSXSpreadAttribute"></a>ASTWalker::JSXSpreadAttribute(node, ctx)


```javascript

console.error("JSXSpreadAttribute is not implemented");
/*
this.out("{...");
// argument
this.walk(node.argument, ctx);
this.out("}");
*/
```

### <a name="ASTWalker_LabeledStatement"></a>ASTWalker::LabeledStatement(node, ctx)


```javascript
this.nlIfNot();
this.walk(node.label, ctx);
this.out(":", true);
this.indent(1);
if(node.body) this.walk(node.body, ctx);
this.indent(-1);
```

### <a name="ASTWalker_Literal"></a>ASTWalker::Literal(node, ctx)


```javascript
this.out(node.raw);
```

### <a name="ASTWalker_LogicalExpression"></a>ASTWalker::LogicalExpression(node, ctx)


```javascript
var bLeftNeedsPar = true, bRightNeedsPar=true;
if(node.left.type == "Identifier" || node.left.type == "Literal") {
    bLeftNeedsPar = false;
}
if(node.right.type == "Identifier" || node.right.type == "Literal") {
    bRightNeedsPar = false;
}

if(bLeftNeedsPar) this.out("(");
this.walk(node.left, ctx);
if(bLeftNeedsPar) this.out(")");

if(node.operator) {
    this.out(" "+node.operator+" ");
}
if(bRightNeedsPar) this.out("(");
this.walk(node.right, ctx);
if(bRightNeedsPar) this.out(")");


/*
interface LogicalExpression <: Expression {
    type: "LogicalExpression";
    operator: LogicalOperator;
    left: Expression;
    right: Expression;
}
*/
```

### <a name="ASTWalker_MemberExpression"></a>ASTWalker::MemberExpression(node, ctx)


```javascript
this.trigger("MemberExpressionObject", node.object);
// MemberExpression
var bNeedPar = true;
if(node.object.type == "Identifier" || node.object.type == "Literal" || node.object.type == "ThisExpression") {
    bNeedPar = false;
    if(typeof node.object.value === "number") {
        bNeedPar = true;
    }     
}
if(bNeedPar) this.out("(");
this.walk(node.object,ctx);
if(bNeedPar) this.out(")");

if(node.computed) {
    this.out("[");
    this.trigger("MemberExpressionProperty", node.property);
    this.walk(node.property, ctx);    
    this.out("]");
} else {
    this.out(".");
    this.trigger("MemberExpressionProperty", node.property);
    this.walk(node.property, ctx);    
}


```

### <a name="ASTWalker_MethodDefinition"></a>ASTWalker::MethodDefinition(node, ctx)


```javascript

if(node.key) {
    this.__insideMethod = true;
    
    if(node.kind=="constructor") {
        this.trigger("ClassConstructor", node);
    }
    
    if(node.static) this.out("static ");
    
    this.walk(node.key,ctx);
    this.walk(node.value, ctx);
    this.out("", true);
    this.__insideMethod = false;
}
```

### <a name="ASTWalker_NewExpression"></a>ASTWalker::NewExpression(node, ctx)


```javascript

if(node.callee) {
    this.out(" new ");
    this.trigger("NewExpressionClass", node.callee);
    this.walk(node.callee, ctx);
    this.out("(");
    if(node.arguments) {
        var me = this,
            cnt=0;
        node.arguments.forEach(function(n) {
            me.trigger("NewExpressionArgument", n);
            if(cnt++>0) me.out(", ");
            me.walk(n,ctx); 
        });
    }
    this.out(")");
}
```

### <a name="ASTWalker_nlIfNot"></a>ASTWalker::nlIfNot(t)


```javascript
var len = this._currentLine.length; 
if(len > 0) {
    // {
    if((this._currentLine[len-1] =="{") || (this._currentLine[len-1] ==";")) {
        this.out("", true);
    } else {
        this.out(";", true);
    }
}
```

### <a name="ASTWalker_ObjectExpression"></a>ASTWalker::ObjectExpression(node, ctx)


```javascript

var me = this;
try {
    me.out("{");
    var cnt=0;
    if(node && node.properties) {
        if(node.properties.length>1) me.out("", true);
        me.indent(1);
        node.properties.forEach( function(p) {
            if(cnt++>0) me.out(",", true);
            me.trigger("ObjectExpressionProperty", p);
            me.walk(p, ctx);
        });
        me.indent(-1);
    } 
    me.out("}");
} catch(e) {
    console.error(e.message);
}


```

### <a name="ASTWalker_ObjectPattern"></a>ASTWalker::ObjectPattern(node, ctx)


```javascript
var me = this;
try {
    me.out("{");
    var cnt=0;
    if(node && node.properties) {
        //if(node.properties.length>1) me.out("", true);
        node.properties.forEach( function(p) {
            if(cnt++>0) me.out(",");
            me.trigger("ObjectExpressionProperty", p);
            me.walk(p, ctx);
        });
    } 
    me.out("}");
} catch(e) {
    console.error(e.message);
}

```

### <a name="ASTWalker_out"></a>ASTWalker::out(str, newline)
`str` Code to output
 
`newline` if ends with newline 
 


```javascript

if(this._options.noOutput) return;

if(this._collecting) {
    if(str) {
        if(this._collectLine.length==0) {
            for(var i=0; i<this._indent; i++) {
                this._collectLine+= this._tabChar;
            }
        }
        this._collectLine += str;
    }
    
    if(newline) {
        this._collectStr+=this._collectLine+"\n";
        this._collectLine = "";
        this._collectStr+="\n";
    }    
    return;
}
if(str) {
    if(this._currentLine.length==0) {
        this.trigger("startline");
        this.trigger("tabs", this._indent);
        for(var i=0; i<this._indent; i++) {
            this._currentLine+= this._tabChar;
        }
    }
    this.trigger("out", str);
    this._currentLine += str;
}

if(newline) {
    this.trigger("newline");
    this._codeStr+=this._currentLine+"\n";
    this._currentLine = "";
    this._lineNumber++;
}
```

### <a name="ASTWalker_prevChar"></a>ASTWalker::prevChar(t)


```javascript
var len = this._currentLine.length; 
if(len > 0) {
    return this._currentLine[len-1];
} else {
    return "\n";
}
```

### <a name="ASTWalker_Program"></a>ASTWalker::Program(node, ctx)


```javascript

this.walk(node.body,ctx, true);
```

### <a name="ASTWalker_Property"></a>ASTWalker::Property(node, ctx)


```javascript

// kind: "init" | "get" | "set";

this.trigger("ObjectPropertyKey", node.key);

this.walk(node.key, ctx);

if(!node.shorthand) {
    this.out(":");
    this.trigger("ObjectPropertyValue", node.value);
    this.walk(node.value, ctx);
}
```

### <a name="ASTWalker_pushStructure"></a>ASTWalker::pushStructure(def)
`def` Structure definition
 


```javascript

if(!this._structures) this._structures = [];
this._structures.push( def );
```

### <a name="ASTWalker_RestElement"></a>ASTWalker::RestElement(node, ctx)


```javascript
if(node.argument) this.trigger("RestArgument", node.argument);

this.out(" ...");
this.walk(node.argument, ctx);

```

### <a name="ASTWalker_ReturnStatement"></a>ASTWalker::ReturnStatement(node, ctx)


```javascript
this.nlIfNot();
this.out("return ");
this.trigger("ReturnValue", node.argument);
this.walk(node.argument, ctx);
this.out(";");
```

### <a name="ASTWalker_saveNode"></a>ASTWalker::saveNode(node)


```javascript

if(!node.nodeid) node.nodeid = this.createId();

this.createObject( node.nodeid, node );
```

### <a name="ASTWalker_SequenceExpression"></a>ASTWalker::SequenceExpression(node, ctx)


```javascript
if(node.expressions) {
    var me = this;
    var cnt = 0;
    this.out("(");
    node.expressions.forEach( function(n) {
        if(cnt++>0) me.out(",");
        me.walk( n, ctx );
    })
    this.out(")");
}
```

### <a name="ASTWalker_skip"></a>ASTWalker::skip(t)


```javascript
this._skipWalk = true;
```

### <a name="ASTWalker_startBlock"></a>ASTWalker::startBlock(t)


```javascript

this.out("{", true);
this.indent(1);
```

### <a name="ASTWalker_startCollecting"></a>ASTWalker::startCollecting(t)


```javascript
this._collecting = true;

```

### <a name="ASTWalker_startWalk"></a>ASTWalker::startWalk(node, ctx)
`node` AST Node 
 

Starts the walking of AST tree
```javascript

this._breakWalk = false;
this._path = [];

this._codeStr = "";
this._currentLine = "";
this._lineNumber = 0;

this.initDOMC();

this.walk(node, ctx);
this.out("",true);
```

### <a name="ASTWalker_Super"></a>ASTWalker::Super(node, ctx)


```javascript
this.out("super");
```

### <a name="ASTWalker_SwitchCase"></a>ASTWalker::SwitchCase(node, ctx)


```javascript
this.nlIfNot();
if(node.test) {
    this.out("case ");
    this.walk(node.test, ctx);
    this.out(" : ", true);
} else {
    this.out("default: ", true);
}

if(node.consequent) {
    var me = this;
    node.consequent.forEach( function(c) {
        me.walk(c, ctx);
    })
}
```

### <a name="ASTWalker_SwitchStatement"></a>ASTWalker::SwitchStatement(node, ctx)


```javascript
this.nlIfNot();
this.out("switch");
this.out("(");

this.walk( node.discriminant, ctx );
this.out(")");
this.out("{",true);

this.indent(1);
var me = this;
node.cases.forEach(function(c) {
    me.walk(c,ctx);
})
this.indent(-1);
this.out("}",true);
/*
interface SwitchStatement <: Statement {
    type: "SwitchStatement";
    discriminant: Expression;
    cases: [ SwitchCase ];
    lexical: boolean;
}
*/
```

### <a name="ASTWalker_TemplateElement"></a>ASTWalker::TemplateElement(node, ctx, notUsed)


```javascript
this.out(node.value.raw);
```

### <a name="ASTWalker_TemplateLiteral"></a>ASTWalker::TemplateLiteral(node, ctx)


```javascript
this.out("`");
for(var i=0; i<node.quasis.length;i++) {
    if(i>0) {
        this.out("${");
        if(node.expressions[i-1]) this.walk(node.expressions[i-1],ctx);
        this.out("}");
    }
    var q = node.quasis[i];
    this.walk(q, ctx);
}
this.out("`");
```

### <a name="ASTWalker_ThisExpression"></a>ASTWalker::ThisExpression(node)


```javascript
this.out("this");
```

### <a name="ASTWalker_ThrowStatement"></a>ASTWalker::ThrowStatement(node, ctx)


```javascript
this.nlIfNot();
this.out("throw ");
this.trigger("ThrowArgument", node.argument);
this.walk( node.argument, ctx );
```

### <a name="ASTWalker_TryStatement"></a>ASTWalker::TryStatement(node, ctx)


```javascript

this.out("try ");
this.walk(node.block, ctx);

if(node.handler) {
    this.walk(node.handler, ctx);
}
if(node.finalizer) {
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
```

### <a name="ASTWalker_UnaryExpression"></a>ASTWalker::UnaryExpression(node, ctx)


```javascript
var bNeedsPar = true;
if(node.argument.type == "Identifier" || node.argument.type == "Literal") {
    bNeedsPar = false;
}
this.out(node.operator);
if(node.operator!="!") this.out(" ");

if(bNeedsPar) this.out("(");
this.trigger("UnaryExpressionArgument", node.argument);
this.walk(node.argument,ctx);
if(bNeedsPar) this.out(")");

```

### <a name="ASTWalker_UpdateExpression"></a>ASTWalker::UpdateExpression(node, ctx)


```javascript

this.trigger("UpdateExpressionArgument", node.argument);

if(node.prefix) {
    this.out(node.operator);  
    this.walk(node.argument, ctx);
} else {
    this.walk(node.argument, ctx);
    this.out(node.operator);
}
```

### <a name="ASTWalker_VariableDeclaration"></a>ASTWalker::VariableDeclaration(node, ctx)
`node` Object to use to create a variable declaration
 
`ctx` Context of the node
 


```javascript

var me = this;
var cnt=0;
if(node.kind=="var")  me.out("var ");
if(node.kind=="let") me.out("let ");   
if(node.kind=="const") me.out("const ");   
var indent=0;
node.declarations.forEach( function(vd) {
    if(vd.deleted) return;
    if(cnt++>0) {
        if(cnt==2) {
            indent+=2;
            me.indent(indent);
        }
        me.out(",", true); // always a new declaration
    }
    me.walk(vd,ctx);
});
this.indent(-1*indent);

if(cnt==0) this._undoOutput=true;

if(!ctx._forVar) this.out(";",true);


```

### <a name="ASTWalker_VariableDeclarator"></a>ASTWalker::VariableDeclarator(node, ctx)


```javascript
var me = this;

if(node.id) {
    me.walk(node.id, ctx);
    if(node.id.name) {
        ctx.vars[node.id.name] = node;
    }
}

if(node.init) {
    this.out(" = ");
    me.walk( node.init, ctx );
}

```

### <a name="ASTWalker_walk"></a>ASTWalker::walk(node, ctx, newLine)
`node` The object to walk the AST with
 
`ctx` The current context
 


```javascript

if(!node) return;

if(!ctx) {
    console.log("ERROR: no context defined for ", node);
    console.trace();
    return;
}

// What is going on here then...
if(node instanceof Array) {
    var me = this;
    this.trigger("nodeArray", {
            node : node,
            ctx : ctx
        });
    node.forEach( function(n) {
        me.walk( n, ctx );
        if(newLine) me.nlIfNot(); // insert newline just in case to the end...
    })
    
} else {
    
    if(node.deleted) return;
    
    if(node.type) {
        
        this.saveNode(node);
        node.contextId = ctx.id;
        
        var parentNode = this.getParent();
        if(!this._nodeParents) this._nodeParents = {};
        if(parentNode) {
            this._nodeParents[node.nodeid] = parentNode;
        }
        var runTime = {
            node : node,
            ctx : ctx
        };
        this.trigger("node", runTime);
        this.trigger(node.type, runTime);
        
        if(this._skipWalk) {
            this._skipWalk = false;
            return;
        }
        
        if(this._wCb) this._wCb(node);
        
        if(this[node.type]) {
            this._path.push(node);
            
            var oldLine = this._currentLine;
            var oldPos  = this._codeStr.length;
            var bDidEnterNs = false, old_ns;
            if(node.type=="JSXElement" && node.openingElement && node.openingElement.name) {
                if(node.openingElement.name.type=="JSXMemberExpression") {
                    // could be entering a namespace
                    var member = node.openingElement.name;
                    var nameSpace = member.object.name;
                    if(this._nsList.indexOf(nameSpace)>=0) {
                        if(!ctx.nsStack) ctx.nsStack = [];
                        ctx.nsStack.push(nameSpace);
                        old_ns = ctx.ns;
                        ctx.ns = nameSpace;
                        bDidEnterNs = true;
                    } else {
                        if(!ctx.ns) {
                            nameSpace = this._options.defaultNamespace || "DOM"; 
                            if(this._options.forceNamespace) nameSpace = this._options.forceNamespace;
                            if(!ctx.nsStack) ctx.nsStack = [];
                            ctx.nsStack.push(nameSpace);
                            old_ns = ctx.ns;
                            ctx.ns = nameSpace;
                            bDidEnterNs = true; 
                        }
                    }
                } else {
                    if(!ctx.ns) {
                        
                        var nameSpace = this._options.defaultNamespace || "DOM"; // <- default namespace, could be a setting though
                        var nName = node.openingElement.name.name;
                        if(nName == "svg") nameSpace = "SVG";
                        
                        if(this._autoNs && this._autoNs[nName]) nameSpace = this._autoNs[nName];
                        
                        if(this._options.forceNamespace) nameSpace = this._options.forceNamespace;
                        if(!ctx.nsStack) ctx.nsStack = [];
                        ctx.nsStack.push(nameSpace);
                        old_ns = ctx.ns;
                        ctx.ns = nameSpace;
                        bDidEnterNs = true;  
                    } else {
                        if(ctx.ns=="DOM") {
                            if(node.openingElement.name.name == "svg") {
                                // 
                                var nameSpace = "SVG";
                                if(!ctx.nsStack) ctx.nsStack = [];
                                ctx.nsStack.push(nameSpace);
                                old_ns = ctx.ns;
                                ctx.ns = nameSpace;
                                bDidEnterNs = true;                                 
                            }
                        }
                    }
                }
            }
            if(ctx.ns) {
                var tryThis = ctx.ns+node.type;
                if(typeof(this[tryThis]) != "undefined") {
                    this[tryThis](node, ctx);
                } else {
                    this[node.type](node, ctx);
                }
            } else {
                this[node.type](node, ctx);
            }
            if(bDidEnterNs) {
                ctx.nsStack.pop();
                ctx.ns = old_ns;
            }
            if(this._undoOutput) {
                this._codeStr = this._codeStr.substring(0, oldPos);
                this._currentLine = oldLine;
                this._undoOutput = false;
            }
            this._path.pop();
        } else {
            console.log("Did not find "+node.type);
            console.log(node);
        }
        this.trigger("nodeWalked", runTime);
        this.trigger("After"+node.type, runTime);
    }
}
```

### <a name="ASTWalker_walkAsString"></a>ASTWalker::walkAsString(node, ctx)


```javascript

var str="";
try {
    this.startCollecting();
    this._collectStr = "";
    this._collectLine = "";
    
    this.walk(node, ctx);
    
    str = this._collectStr;
    
    this.endCollecting();
} catch(e) {
    
}
return str;
```

### <a name="ASTWalker_WhileStatement"></a>ASTWalker::WhileStatement(node, ctx)


```javascript
this.nlIfNot();
this.out("while ");

if(node.test) {
    this.trigger("WhileTest", node.test);
    this.out("(");
    this.walk(node.test,ctx);
    this.out(")");
}
if(node.body) {
    var bNeedsPar = false;
    if(node.body.type != "BlockStatement" && ( node.body.type.indexOf("Statement")>=0) ) {
        bNeedsPar = true;
    }
    if(bNeedsPar) {
        this.out("{");
        this.indent(1);
    }
    this.walk(node.body,ctx);
    if(bNeedsPar) {
        this.indent(-1);
        this.out("}");
    }
}

this.out("", true);
```

### <a name="ASTWalker_WithStatement"></a>ASTWalker::WithStatement(node, ctx)


```javascript
console.error("With statement is not supported");
```

### <a name="ASTWalker_YieldExpression"></a>ASTWalker::YieldExpression(node, ctx)


```javascript

this.out("yield ");
this.walk(node.argument, ctx);

/*
interface YieldExpression <: Expression {
    type: "YieldExpression";
    argument: Expression | null;
}
*/
```



   
    
## trait events

The class has following internal singleton variables:
        
        
### <a name="_on"></a>::on(en, ef)
`en` Event name
 

Binds event name to event function
```javascript
if(!this._ev) this._ev = {};
if(!this._ev[en]) this._ev[en] = [];

this._ev[en].push(ef);
return this;
```

### <a name="_removeListener"></a>::removeListener(name, fn)


```javascript
if(!this._ev) return;
if(!this._ev[name]) return;

var list = this._ev[name];

for(var i=0; i<list.length; i++) {
    if(list[i]==fn) {
        list.splice(i,1);
        return;
    }
}

```

### <a name="_trigger"></a>::trigger(en, data, fn)

triggers event with data and optional function
```javascript

if(!this._ev) return;
if(!this._ev[en]) return;
var me = this;
this._ev[en].forEach( function(cb) { cb( data, fn) } );    
return this;
```


    
    


   
      
    




