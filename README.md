
Still undocumented

```javascript

 // Sorry.
 
``` 
















   

 


   
#### Class ASTWalker


- [ArrayExpression](README.md#ASTWalker_ArrayExpression)
- [ArrowExpression](README.md#ASTWalker_ArrowExpression)
- [ArrowFunctionExpression](README.md#ASTWalker_ArrowFunctionExpression)
- [AssignmentExpression](README.md#ASTWalker_AssignmentExpression)
- [BinaryExpression](README.md#ASTWalker_BinaryExpression)
- [BlockStatement](README.md#ASTWalker_BlockStatement)
- [BreakStatement](README.md#ASTWalker_BreakStatement)
- [breakWalk](README.md#ASTWalker_breakWalk)
- [CallExpression](README.md#ASTWalker_CallExpression)
- [CatchClause](README.md#ASTWalker_CatchClause)
- [ConditionalExpression](README.md#ASTWalker_ConditionalExpression)
- [ContinueStatement](README.md#ASTWalker_ContinueStatement)
- [DebuggerStatement](README.md#ASTWalker_DebuggerStatement)
- [DoWhileStatement](README.md#ASTWalker_DoWhileStatement)
- [EmptyStatement](README.md#ASTWalker_EmptyStatement)
- [endBlock](README.md#ASTWalker_endBlock)
- [endCollecting](README.md#ASTWalker_endCollecting)
- [ExpressionStatement](README.md#ASTWalker_ExpressionStatement)
- [ForInStatement](README.md#ASTWalker_ForInStatement)
- [ForStatement](README.md#ASTWalker_ForStatement)
- [FunctionDeclaration](README.md#ASTWalker_FunctionDeclaration)
- [FunctionExpression](README.md#ASTWalker_FunctionExpression)
- [getStructures](README.md#ASTWalker_getStructures)
- [Identifier](README.md#ASTWalker_Identifier)
- [IfStatement](README.md#ASTWalker_IfStatement)
- [indent](README.md#ASTWalker_indent)
- [LabeledStatement](README.md#ASTWalker_LabeledStatement)
- [Literal](README.md#ASTWalker_Literal)
- [LogicalExpression](README.md#ASTWalker_LogicalExpression)
- [MemberExpression](README.md#ASTWalker_MemberExpression)
- [NewExpression](README.md#ASTWalker_NewExpression)
- [nlIfNot](README.md#ASTWalker_nlIfNot)
- [ObjectExpression](README.md#ASTWalker_ObjectExpression)
- [out](README.md#ASTWalker_out)
- [Program](README.md#ASTWalker_Program)
- [Property](README.md#ASTWalker_Property)
- [pushStructure](README.md#ASTWalker_pushStructure)
- [RestElement](README.md#ASTWalker_RestElement)
- [ReturnStatement](README.md#ASTWalker_ReturnStatement)
- [SequenceExpression](README.md#ASTWalker_SequenceExpression)
- [skip](README.md#ASTWalker_skip)
- [startBlock](README.md#ASTWalker_startBlock)
- [startCollecting](README.md#ASTWalker_startCollecting)
- [startWalk](README.md#ASTWalker_startWalk)
- [SwitchCase](README.md#ASTWalker_SwitchCase)
- [SwitchStatement](README.md#ASTWalker_SwitchStatement)
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

this.out("function");

if(node.generator) {
    this.trigger("FunctionGenerator", node);
    this.out("* ");
}

if(node.id && node.id.name) {
    console.log("ERROR: ArrowFunctionExpression should not have name");
    me.trigger("FunctionName", node);
    this.out(" "+node.id.name+" "); 
} else {
    me.trigger("FunctionAnonymous", node);
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

this.walk(node.left, ctx);
this.out(" "+node.operator+" ");
this.walk(node.right, ctx);
```

### <a name="ASTWalker_BlockStatement"></a>ASTWalker::BlockStatement(node, ctx)


```javascript

// keeps at the same context right now I guess....
this.out("{",true);
this.indent(1);
this.walk(node.body,ctx, true);
this.indent(-1);
this.out("}");
```

### <a name="ASTWalker_BreakStatement"></a>ASTWalker::BreakStatement(node, ctx)


```javascript
this.out("break", true);
```

### <a name="ASTWalker_breakWalk"></a>ASTWalker::breakWalk(t)


```javascript

this._breakWalk = true;
```

### <a name="ASTWalker_CallExpression"></a>ASTWalker::CallExpression(node, ctx)


```javascript
if(node.callee) {
    this.walk(node.callee, ctx);
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
this.out("continue", true);
```

### <a name="ASTWalker_DebuggerStatement"></a>ASTWalker::DebuggerStatement(node, ctx)


```javascript
this.out("debugger;");
```

### <a name="ASTWalker_DoWhileStatement"></a>ASTWalker::DoWhileStatement(node, ctx)


```javascript
this.out("do {",true);

if(node.body) {
    this.walk(node.body,ctx);
}

this.out(" } ");
if(node.test) {
    this.out("while(");
    this.trigger("DoWhileTest", node.test);
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
this.walk(node.expression, ctx);
```

### <a name="ASTWalker_ForInStatement"></a>ASTWalker::ForInStatement(node, ctx)


```javascript
this.out("for(");

if(node.left) {
    this.trigger("ForInLeft", node.left);
    this.walk(node.left,ctx);
}
this.out(" in ");
if(node.right) {
    this.trigger("ForInRight", node.right);
    this.walk(node.right,ctx);
}
this.out(")");

if(node.body) {
    this.trigger("ForInBody", node.body);
    this.walk(node.body,ctx);
}

this.out("", true);
```

### <a name="ASTWalker_ForStatement"></a>ASTWalker::ForStatement(node, ctx)


```javascript
this.out("for(");

if(node.init) {
    this.walk(node.init,ctx);
    this.out("; ");
}
if(node.test) {
    this.walk(node.test,ctx);
    this.out("; ");
}
if(node.update) {
    this.walk(node.update,ctx);
}
this.out(")");

if(node.body) {
    this.walk(node.body,ctx);
}

this.out("", true);
```

### <a name="ASTWalker_FunctionDeclaration"></a>ASTWalker::FunctionDeclaration(node, ctx)


```javascript

this.out("function");

if(node.id && node.id.name) {
    me.trigger("FunctionName", node);
    this.out(" "+node.id.name+" "); 
} else {
    me.trigger("FunctionAnonymous", node);
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
var subCtx = { parentCtx : ctx };
this.walk(node.body, subCtx);    

```

### <a name="ASTWalker_FunctionExpression"></a>ASTWalker::FunctionExpression(node, ctx)


```javascript

this.out("function");

if(node.generator) {
    this.trigger("FunctionGenerator", node);
    this.out("* ");
}

if(node.id && node.id.name) {
    me.trigger("FunctionName", node);
    this.out(" "+node.id.name+" "); 
} else {
    me.trigger("FunctionAnonymous", node);
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
var subCtx = { parentCtx : ctx };
me.trigger("FunctionBody", node.body);
this.walk(node.body, subCtx);    

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

this.out("if(");
this.trigger("IfTest", node.test);
this.walk(node.test, ctx);
this.out(")");
if(node.consequent) {
    this.trigger("IfConsequent", node.consequent);
    this.walk(node.consequent,ctx);
}
if(node.alternate) {
    this.out(" else ");
    this.trigger("IfAlternate", node.alternate);
    this.walk(node.alternate,ctx);
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
Walks the AST tree, creates events on walk steps
```javascript
this._wCb = walkCallback;
this._structures = [];

// baseAST has now the important content information for the function
if(!contextObj) contextObj = {}

this._tabChar = "  ";
this._codeStr = "";
this._currentLine = "";
this._indent = 0;

this.walk( baseAST, contextObj, true );
this.out("",true);
```
        
### <a name="ASTWalker_LabeledStatement"></a>ASTWalker::LabeledStatement(node, ctx)


```javascript

this.walk(node.label);
this.out(":", true);
this.indent(1);
if(node.body) this.walk(node.body);
this.indent(-1);
```

### <a name="ASTWalker_Literal"></a>ASTWalker::Literal(node, ctx)


```javascript
this.out(node.raw);
```

### <a name="ASTWalker_LogicalExpression"></a>ASTWalker::LogicalExpression(node, ctx)


```javascript

if(node.left) this.walk(node.left,ctx);
if(node.operator) {
    this.out(" "+node.operator+" ");
}
if(node.right) this.walk(node.right,ctx);

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
this.walk(node.object);
this.out(".");
this.trigger("MemberExpressionProperty", node.property);
this.walk(node.property);

```

### <a name="ASTWalker_NewExpression"></a>ASTWalker::NewExpression(node, ctx)


```javascript

if(node.callee) {
    this.trigger("NewExpressionClass", node.callee);
    this.walk(node.callee);
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
if(this._currentLine.length > 0) this.out("", true);
```

### <a name="ASTWalker_ObjectExpression"></a>ASTWalker::ObjectExpression(node, ctx)


```javascript

var me = this;
try {
    me.out("{");
    if(node && node.properties) {
        node.properties.forEach( function(p) {
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
        for(var i=0; i<this._indent; i++) {
            this._currentLine+= this._tabChar;
        }
    }
    this._currentLine += str;
}

if(newline) {
    this._codeStr+=this._currentLine+";\n";
    this._currentLine = "";
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
this.walk(node.key);
this.out(":");
this.trigger("ObjectPropertyValue", node.value);
this.walk(node.value);
```

### <a name="ASTWalker_pushStructure"></a>ASTWalker::pushStructure(def)
`def` Structure definition
 


```javascript

if(!this._structures) this._structures = [];
this._structures.push( def );
```

### <a name="ASTWalker_RestElement"></a>ASTWalker::RestElement(node, ctx)


```javascript
if(node.argument) me.trigger("RestArgument", node.argument);

this.out(" ...");
this.walk(node.argument, ctx);

```

### <a name="ASTWalker_ReturnStatement"></a>ASTWalker::ReturnStatement(node, ctx)


```javascript

this.out("return ");
this.trigger("ReturnValue", node.argument);
this.walk(node.argument, ctx);
this.out(";");
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
this.walk(node,ctx);
```

### <a name="ASTWalker_SwitchCase"></a>ASTWalker::SwitchCase(node, ctx)


```javascript

this.out("case ");
this.walk(node.test);
this.out(" : ", true);

if(node.consequent) {
    var me = this;
    node.consequent.forEach( function(c) {
        me.walk(c, ctx);
    })
}
```

### <a name="ASTWalker_SwitchStatement"></a>ASTWalker::SwitchStatement(node, ctx)


```javascript

this.out("switch(");

this.walk( node.discriminant );
this.out(")");
this.out("{",true);

var me = this;
node.cases.forEach(function(c) {
    me.walk(c,ctx);
})

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

### <a name="ASTWalker_ThisExpression"></a>ASTWalker::ThisExpression(node)


```javascript
this.out("this");
```

### <a name="ASTWalker_ThrowStatement"></a>ASTWalker::ThrowStatement(node, ctx)


```javascript
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
this.out(node.operator);
this.trigger("UnaryExpressionArgument", node.argument);
this.walk(node.argument,ctx);

```

### <a name="ASTWalker_UpdateExpression"></a>ASTWalker::UpdateExpression(node, ctx)


```javascript

this.trigger("UpdateExpressionArgument", node.argument);
this.walk(node.argument, ctx);
this.out(node.operator);
```

### <a name="ASTWalker_VariableDeclaration"></a>ASTWalker::VariableDeclaration(node, ctx)
`node` Object to use to create a variable declaration
 
`ctx` Context of the node
 


```javascript

var me = this;
var cnt=0;
if(node.kind=="var")  me.out("var ");
if(node.kind=="let") me.out("let ");   
var indent=0;
node.declarations.forEach( function(vd) {
    if(cnt++>0) {
        if(cnt==1) {
            indent++;
            me.indent(1);
        }
        me.out(",", true); // always a new declaration
    }
    me.walk(vd,ctx);
    cnt++;
});

this.indent(-1*indent);

```

### <a name="ASTWalker_VariableDeclarator"></a>ASTWalker::VariableDeclarator(node, ctx)


```javascript
var me = this;

me.out(node.id.name+" = ");
me.walk( node.init, ctx );

```

### <a name="ASTWalker_walk"></a>ASTWalker::walk(node, ctx, newLine)
`node` The object to walk the AST with
 
`ctx` The current context
 


```javascript

if(!ctx) {
    console.log("ERROR: no context defined for ", node);
    console.trace();
    return;
}

// What is going on here then...
if(node instanceof Array) {
    var me = this;
    node.forEach( function(n) {
        me.walk( n, ctx );
        if(newLine) me.nlIfNot(); // insert newline just in case to the end...
    })
    
} else {
    if(node.type) {
        this.trigger(node.type, node);
        
        if(this._skipWalk) {
            this._skipWalk = false;
            return;
        }
        
        if(this._wCb) this._wCb(node);
        
        if(this[node.type]) {
            this._path.push(node);
            this[node.type](node, ctx);
            this._path.pop();
        } else {
            console.log("Did not find "+node.type);
            console.log(node);
        }
        this.trigger("After"+node.type, node);
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
this.out("while ");

if(node.test) {
    this.trigger("WhileTest", node.test);
    this.walk(node.test,ctx);
}
if(node.body) {
    this.walk(node.body,ctx);
}

this.out("", true);
```

### <a name="ASTWalker_WithStatement"></a>ASTWalker::WithStatement(node, ctx)


```javascript
console.error("With statement is not supported");
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


    
    


   
      
    




