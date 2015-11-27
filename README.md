
Still undocumented

```javascript

 // Sorry.
 
``` 
















   

 


   
#### Class ASTWalker


- [ArrayExpression](README.md#ASTWalker_ArrayExpression)
- [AssignmentExpression](README.md#ASTWalker_AssignmentExpression)
- [BinaryExpression](README.md#ASTWalker_BinaryExpression)
- [BlockStatement](README.md#ASTWalker_BlockStatement)
- [CallExpression](README.md#ASTWalker_CallExpression)
- [createHiddenClass](README.md#ASTWalker_createHiddenClass)
- [endBlock](README.md#ASTWalker_endBlock)
- [endCollecting](README.md#ASTWalker_endCollecting)
- [ExpressionStatement](README.md#ASTWalker_ExpressionStatement)
- [ForStatement](README.md#ASTWalker_ForStatement)
- [FunctionDeclaration](README.md#ASTWalker_FunctionDeclaration)
- [FunctionExpression](README.md#ASTWalker_FunctionExpression)
- [getStructures](README.md#ASTWalker_getStructures)
- [Identifier](README.md#ASTWalker_Identifier)
- [IfStatement](README.md#ASTWalker_IfStatement)
- [indent](README.md#ASTWalker_indent)
- [Literal](README.md#ASTWalker_Literal)
- [MemberExpression](README.md#ASTWalker_MemberExpression)
- [NewExpression](README.md#ASTWalker_NewExpression)
- [nlIfNot](README.md#ASTWalker_nlIfNot)
- [ObjectExpression](README.md#ASTWalker_ObjectExpression)
- [out](README.md#ASTWalker_out)
- [Program](README.md#ASTWalker_Program)
- [pushStructure](README.md#ASTWalker_pushStructure)
- [ReturnStatement](README.md#ASTWalker_ReturnStatement)
- [startBlock](README.md#ASTWalker_startBlock)
- [startCollecting](README.md#ASTWalker_startCollecting)
- [ThisExpression](README.md#ASTWalker_ThisExpression)
- [UnaryExpression](README.md#ASTWalker_UnaryExpression)
- [UpdateExpression](README.md#ASTWalker_UpdateExpression)
- [VariableDeclaration](README.md#ASTWalker_VariableDeclaration)
- [VariableDeclarator](README.md#ASTWalker_VariableDeclarator)
- [walk](README.md#ASTWalker_walk)
- [walkAsString](README.md#ASTWalker_walkAsString)
- [WhileStatement](README.md#ASTWalker_WhileStatement)



   


   





   
# Class ASTWalker


The class has following internal singleton variables:
        
* _cnt
        
        
### <a name="ASTWalker_ArrayExpression"></a>ASTWalker::ArrayExpression(node, ctx)


```javascript

var me = this;
// Check values...
if( node.elements && node.elements.length>0) {

    // determine array element types, if possible..
    var elem_types = {}, pseudoArray = [];
    node.elements.forEach( function(e) {
        if(!elem_types[e.type]) elem_types[e.type] = [];
        elem_types[e.type].push(e);
        
        if(typeof(e.value) == "number") 
        
        pseudoArray.push(e.value);
    })
    
    var cnt=0, first;
    for(var n in elem_types) {
        if(!first) first = elem_types[n];
        cnt++;
    }
    if(cnt==1) {
        var type_hash = {};
        first.forEach( function(item) {
            type_hash[typeof item.value] = item;
        })
        var keys = Object.keys(type_hash);
        if(keys.length==1) {
            var only_type = keys[0];
            if(only_type=="number") {
                // can do array of number
                me.out("[");
                pseudoArray.forEach( function(v,i) {
                    if(i>0) me.out(",");
                    if(parseInt(v)==v) {
                        me.out(v+".0");
                        return;
                    } else {
                        me.out(v);
                    }
                })
                me.out("]");
                return;
            }
            if(only_type=="string") {
                me.out(JSON.stringify(pseudoArray));
                return;                
            }            
        }
    }
    
}

console.error("So far object expressions are not allowed, - TODO: create hidden class for them");


```

### <a name="ASTWalker_AssignmentExpression"></a>ASTWalker::AssignmentExpression(node, ctx)


```javascript

if(node.operator == "=") {
    this.walk(node.left, ctx);
    this.out(" "+node.operator+" ");
    this.walk(node.right, ctx);
}

```

### <a name="ASTWalker_BinaryExpression"></a>ASTWalker::BinaryExpression(node, ctx)


```javascript

var basicOperators = ["+","-","*","/","%","==","<",">",">=","<=", "!="];

if(basicOperators.indexOf(node.operator)>=0) {
    this.walk(node.left, ctx);
    this.out(" "+node.operator+" ");
    this.walk(node.right, ctx);   
    return;
}
if(node.operator == "==") {
    // ...
    this.walk(node.left, ctx);
    this.out(" == ");
    this.walk(node.right, ctx);
}

if(node.operator == "instanceof") {
    // ...
    this.walk(node.left, ctx);
    this.out(" is ");
    this.walk(node.right, ctx);
}
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

### <a name="ASTWalker_createHiddenClass"></a>ASTWalker::createHiddenClass(objName)
`objName` Variable to transfer to hidden class object
 

Basic semantics for hidden class object
```javascript
// this._walkInfo

var baseCtx = this._walkInfo.subCtxList[0];
var hiddenClassDef = this._analyzer.collectObjectStructure( baseCtx, objName );

console.log("Tried to collect hidden class for "+objName);
console.log(hiddenClassDef);
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

### <a name="ASTWalker_ForStatement"></a>ASTWalker::ForStatement(node, ctx)


```javascript
this.out("for ");

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
    this.out("; ");
}

if(node.body) {
    this.walk(node.body,ctx);
}

this.out("", true);
```

### <a name="ASTWalker_FunctionDeclaration"></a>ASTWalker::FunctionDeclaration(node, ctx)


```javascript
/*
func sayHello(personName: String) -> String {
    let greeting = "Hello, " + personName + "!"
    return greeting
}
*/

// contextObj
// contextObj.fnDecs

if(!ctx) {
    console.error("Context not defined!");
    return;    
}

if(!ctx.fnDecs || (!ctx.fnDecs[node.id.name])) {
    /*
    console.error("Function declarations for "+node.id.name+" not found");
    */
    // Then declaration should have the appropriate data types...
    this.out("// TODO: Unknown function, define metadata somewhere...", true);
    this.out("func ");
    
    if(node.id && node.id.name) {
        this.out(" "+node.id.name+" "); 
    } else {
        this.out(" UnknownFunction ");
    }
    
    // TODO: return value
    this.out(" -> "); // NOT correct right now...
    this.out(" UnknownValue ");
    
    var me = this;
    this.out("(");
    var cnt=0;
    node.params.forEach(function(p) {
        if(cnt++>0) me.out(",");
        me.walk(p,ctx);   
    })    
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
this.out(def.returns.get("t")+" ");

var me = this;
this.out("(");
var cnt=0;
def.params.forEach( function(p,i) {
    if(cnt++>0) me.out(", ");
    me.out(p.get("n")+":"+p.get("t"))
});
this.out(")");
this.walk(node.body, ctx);


```

### <a name="ASTWalker_FunctionExpression"></a>ASTWalker::FunctionExpression(node, ctx)


```javascript
/*
{ (parameters) -> return type in
    statements
}
*/

var cnt=0;
node.params.forEach(function(p) {
    if(cnt++>0) me.out(",");
    me.walk(p,ctx);   
})

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
this.walk(node.test, ctx);
this.out(")");
if(node.consequent) {
    this.walk(node.consequent,ctx);
}
if(node.alternate) {
    this.out(" else ");
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

### ASTWalker::constructor( codeStr, fnObj, structDefs, walkCallback )
Function to walk AST tree of a function contents and create corresponding Swift code out of it
```javascript

var pw = AnalyzeFunc();
var baseAST = esprima.parse(codeStr, { loc : true, range : true, comment : true});

// walk the AST tree to create some meta-information out of it...
var ctx = pw.primaWalk( baseAST, function() {
    return true
}, function() {
       
}, {});

this._analyzer = pw;
this._walkInfo = ctx;
this._fnObj = fnObj;
this._structDefs = structDefs;
this._wCb = walkCallback;

// currently evaluated function
if(fnObj) ctx.currentFn = fnObj.get("name");

this._structures = [];

// baseAST has now the important content information for the function

var contextObj = {}

if(!contextObj.fnDecs) contextObj.fnDecs = {};
if(fnObj) contextObj.fnDecs[fnObj.get("name")] = fnObj;

this._tabChar = "  ";
this._codeStr = "";
this._currentLine = "";
this._indent = 0;

this.walk( baseAST, contextObj, true );
this.out("",true);

```
        
### <a name="ASTWalker_Literal"></a>ASTWalker::Literal(node, ctx)


```javascript
this.out(node.raw);
```

### <a name="ASTWalker_MemberExpression"></a>ASTWalker::MemberExpression(node, ctx)


```javascript
this.walk(node.object);
this.out(".");
this.walk(node.property);

```

### <a name="ASTWalker_NewExpression"></a>ASTWalker::NewExpression(node, ctx)


```javascript

if(node.callee) {
    
    this.walk(node.callee);
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

### <a name="ASTWalker_nlIfNot"></a>ASTWalker::nlIfNot(t)


```javascript
if(this._currentLine.length > 0) this.out("", true);
```

### <a name="ASTWalker_ObjectExpression"></a>ASTWalker::ObjectExpression(node, ctx)


```javascript

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
if(!_cnt) _cnt=1;
var ok = true;
var me = this;
try {
    var structDef = {
        name : "TmpStructure"+(_cnt++),
        rawStr : "",
        varDefs : []
    };
    console.log(node);
    var _resStr = "struct "+structDef.name+" { ";
    if(node && node.properties) {
        console.log("-> trying to create "+structDef.name);  
        node.properties.forEach( function(p) {
            if(p.type=="Property" && p.key && p.value && p.value.raw) {
                structDef.varDefs.push({
                    name : p.key.name,
                    value : p.value.value,
                    raw : p.value.raw
                });
                _resStr+="var "+p.key.name+" = "+p.value.raw+"\n";
                return;
            } else {
                // Object definitions will be left as excercie yet....
            }
            ok = false;
            console.error("Object property not declared:", p);
        });

    } else {
        console.log("Invalid properties node");
        ok = false;
    }
    _resStr+="} \n";
    if(ok) {
        structDef.rawStr = _resStr;
    }    
    if(ok) {
        this.pushStructure( structDef );
    }
    if(ok) {
        // Resolution(width: 1920, height: 1080)
        var me = this;
        me.out(structDef.name+"(");
        var cnt=0;
        structDef.varDefs.forEach( function(v) {
            if(cnt++>0) me.out(",");
            me.out(v.name+":"+v.raw);
        })
        me.out(")");
    }
} catch(e) {
    console.error(e.message);
}

// this.out("",)

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
    this._codeStr+=this._currentLine+"\n";
    this._currentLine = "";
}
```

### <a name="ASTWalker_Program"></a>ASTWalker::Program(node, ctx)


```javascript

this.walk(node.body,ctx, true);
```

### <a name="ASTWalker_pushStructure"></a>ASTWalker::pushStructure(def)
`def` Structure definition
 


```javascript

if(!this._structures) this._structures = [];
this._structures.push( def );
```

### <a name="ASTWalker_ReturnStatement"></a>ASTWalker::ReturnStatement(node, ctx)


```javascript

this.out("return ");
this.walk(node.argument, ctx);

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

### <a name="ASTWalker_ThisExpression"></a>ASTWalker::ThisExpression(node)


```javascript
this.out("self");
```

### <a name="ASTWalker_UnaryExpression"></a>ASTWalker::UnaryExpression(node, ctx)


```javascript
this.out(node.operator);
this.walk(node.argument,ctx);

```

### <a name="ASTWalker_UpdateExpression"></a>ASTWalker::UpdateExpression(node, ctx)


```javascript

this.walk(node.argument, ctx)
this.out(node.operator);
```

### <a name="ASTWalker_VariableDeclaration"></a>ASTWalker::VariableDeclaration(node, ctx)
`node` Object to use to create a variable declaration
 
`ctx` Context of the node
 


```javascript

var me = this;
var cnt=0;
node.declarations.forEach( function(vd) {
    if(cnt++>0) {
        me.out("", true); // always a new declaration
    }
    if(node.kind=="var")  me.out("var ");
    if(node.kind=="let") me.out("let ");             
    me.walk(vd,ctx);
    //me.out("=");
    //me.walk(vd.init,ctx);
    cnt++;
})

```

### <a name="ASTWalker_VariableDeclarator"></a>ASTWalker::VariableDeclarator(node, ctx)


```javascript
var me = this;

// let greeting = "Hello, " + personName + "!"

me.out(node.id.name+" = ");
me.walk( node.init, ctx );
// me.out("", true);

```

### <a name="ASTWalker_walk"></a>ASTWalker::walk(node, ctx, newLine)
`node` The object to walk the AST with
 
`ctx` The current context
 


```javascript

// What is going on here then...
if(node instanceof Array) {
    var me = this;
    node.forEach( function(n) {
        me.walk( n, ctx );
        if(newLine) me.nlIfNot(); // insert newline just in case to the end...
    })
    
} else {
    if(node.type) {
        if(this._wCb) this._wCb(node);
        
        if(this[node.type]) {
            this[node.type](node, ctx);
        } else {
            console.log("Did not find "+node.type);
            console.log(node);
        }
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
    this.walk(node.test,ctx);
}
if(node.body) {
    this.walk(node.body,ctx);
}

this.out("", true);
```



   


   




