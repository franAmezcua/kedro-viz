!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="./",r(r.s=0)}([function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){n(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function s(t,e){if(t){if("string"===typeof t)return a(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?a(t,e):void 0}}function u(t,e){var r;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(r=s(t))||e&&t&&"number"===typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,u=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return a=t.done,t},e:function(t){u=!0,i=t},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw i}}}}r.r(e),r.d(e,"graphNew",(function(){return ut}));var c=.5*Math.PI,f=function(t,e){return Math.round(t/e)*e},p=function(t,e){return Math.atan2(t.y-e.y,t.x-e.x)},l=function(t){return t.x-.5*t.width},h=function(t){return t.x+.5*t.width},d=function(t){return t.y-.5*t.height},y=function(t){return t.y+.5*t.height},v=function(t){var e,r={},n=u(t);try{for(n.s();!(e=n.n()).done;){var o=e.value;r[o.y]=r[o.y]||[],r[o.y].push(o)}}catch(p){n.e(p)}finally{n.f()}var i=Object.keys(r).map((function(t){return parseFloat(t)}));i.sort((function(t,e){return t-e}));for(var a=i.map((function(t){return r[t]})),s=0;s<a.length;s+=1){a[s].sort((function(t,e){return m(t.x,e.x,t.id,e.id)}));var c,f=u(a[s]);try{for(f.s();!(c=f.n()).done;){c.value.row=s}}catch(p){f.e(p)}finally{f.f()}}return a},m=function t(e,r){for(var n="string"===typeof e?e.localeCompare(r):e-r,o=arguments.length,i=new Array(o>2?o-2:0),a=2;a<o;a++)i[a-2]=arguments[a];return 0!==n||0===i.length?n:t.apply(void 0,i)},g=function(t,e){return t.x=t.x-e.x,t.y=t.y-e.y,t.order=t.x+9999*t.y,t},_=function(t,e){return t.points.forEach((function(t){t.x=t.x-e.x,t.y=t.y-e.y})),t},b=function(t,e,r,n,o,i){var a,s,u,c=o-r,f=i-n,p=(u=1,(a=((t-r)*c+(e-n)*f)/(c*c+f*f||1))<(s=0)?s:a>u?u:a);return{x:r+c*p,y:n+f*p,ax:r,ay:n,bx:o,by:i}};function x(t){return function(t){if(Array.isArray(t))return a(t)}(t)||function(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||s(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function w(){return new M}var M=function(){function t(){this.index={},this.array=[]}return t.prototype.size=function(){return this.array.length},t.prototype.empty=function(){return 0===this.array.length},t.prototype.itemAt=function(t){return this.array[t]},t.prototype.contains=function(t){return void 0!==this.index[t.id()]},t.prototype.find=function(t){var e=this.index[t.id()];return void 0===e?void 0:this.array[e]},t.prototype.setDefault=function(t,e){var r=this.index[t.id()];if(void 0===r){var n=new S(t,e());return this.index[t.id()]=this.array.length,this.array.push(n),n}return this.array[r]},t.prototype.insert=function(t,e){var r=new S(t,e),n=this.index[t.id()];return void 0===n?(this.index[t.id()]=this.array.length,this.array.push(r)):this.array[n]=r,r},t.prototype.erase=function(t){var e=this.index[t.id()];if(void 0!==e){this.index[t.id()]=void 0;var r=this.array[e],n=this.array.pop();return r!==n&&(this.array[e]=n,this.index[n.first.id()]=e),r}},t.prototype.copy=function(){for(var e=new t,r=0;r<this.array.length;r++){var n=this.array[r].copy();e.array[r]=n,e.index[n.first.id()]=r}return e},t}(),S=function(){function t(t,e){this.first=t,this.second=e}return t.prototype.copy=function(){return new t(this.first,this.second)},t}(),E=function(){function t(t){void 0===t&&(t=""),this._value=0,this._context=null,this._id=N++,this._name=t}return t.prototype.id=function(){return this._id},t.prototype.name=function(){return this._name},t.prototype.setName=function(t){this._name=t},t.prototype.context=function(){return this._context},t.prototype.setContext=function(t){this._context=t},t.prototype.value=function(){return this._value},t.prototype.setValue=function(t){this._value=t},t.prototype.plus=function(t){return new k(this,t)},t.prototype.minus=function(t){return new k(this,"number"===typeof t?-t:[-1,t])},t.prototype.multiply=function(t){return new k([t,this])},t.prototype.divide=function(t){return new k([1/t,this])},t.prototype.toJSON=function(){return{name:this._name,value:this._value}},t.prototype.toString=function(){return this._context+"["+this._name+":"+this._value+"]"},t}(),N=0,k=function(){function t(){var t=A(arguments);this._terms=t.terms,this._constant=t.constant}return t.prototype.terms=function(){return this._terms},t.prototype.constant=function(){return this._constant},t.prototype.value=function(){for(var t=this._constant,e=0,r=this._terms.size();e<r;e++){var n=this._terms.itemAt(e);t+=n.first.value()*n.second}return t},t.prototype.plus=function(e){return new t(this,e)},t.prototype.minus=function(e){return new t(this,"number"===typeof e?-e:[-1,e])},t.prototype.multiply=function(e){return new t([e,this])},t.prototype.divide=function(e){return new t([1/e,this])},t.prototype.isConstant=function(){return 0==this._terms.size()},t.prototype.toString=function(){var t=this._terms.array.map((function(t){return t.second+"*"+t.first.toString()})).join(" + ");return this.isConstant()||0===this._constant||(t+=" + "),t+=this._constant},t}();function A(t){for(var e=0,r=function(){return 0},n=w(),o=0,i=t.length;o<i;++o){var a=t[o];if("number"===typeof a)e+=a;else if(a instanceof E)n.setDefault(a,r).second+=1;else if(a instanceof k){e+=a.constant();for(var s=0,u=(l=a.terms()).size();s<u;s++){var c=l.itemAt(s);n.setDefault(c.first,r).second+=c.second}}else{if(!(a instanceof Array))throw new Error("invalid Expression argument: "+a);if(2!==a.length)throw new Error("array must have length 2");var f=a[0],p=a[1];if("number"!==typeof f)throw new Error("array item 0 must be a number");if(p instanceof E)n.setDefault(p,r).second+=f;else{if(!(p instanceof k))throw new Error("array item 1 must be a variable or expression");e+=p.constant()*f;var l;for(s=0,u=(l=p.terms()).size();s<u;s++){c=l.itemAt(s);n.setDefault(c.first,r).second+=c.second*f}}}}return{terms:n,constant:e}}var j,O=function(){function t(){}return t.create=function(t,e,r,n){void 0===n&&(n=1);var o=0;return o+=1e6*Math.max(0,Math.min(1e3,t*n)),o+=1e3*Math.max(0,Math.min(1e3,e*n)),o+=Math.max(0,Math.min(1e3,r*n))},t.clip=function(e){return Math.max(0,Math.min(t.required,e))},t.required=t.create(1e3,1e3,1e3),t.strong=t.create(1,0,0),t.medium=t.create(0,1,0),t.weak=t.create(0,0,1),t}();!function(t){t[t.Le=0]="Le",t[t.Ge=1]="Ge",t[t.Eq=2]="Eq"}(j||(j={}));var z,P=function(){function t(t,e,r,n){void 0===n&&(n=O.required),this._id=C++,this._operator=e,this._strength=O.clip(n),this._expression=void 0===r&&t instanceof k?t:t.minus(r)}return t.prototype.id=function(){return this._id},t.prototype.expression=function(){return this._expression},t.prototype.op=function(){return this._operator},t.prototype.strength=function(){return this._strength},t.prototype.toString=function(){return this._expression.toString()+" "+["<=",">=","="][this._operator]+" 0 ("+this._strength.toString()+")"},t}(),C=0,D=function(){function t(){this._cnMap=w(),this._rowMap=w(),this._varMap=w(),this._editMap=w(),this._infeasibleRows=[],this._objective=new q,this._artificial=null,this._idTick=0}return t.prototype.createConstraint=function(t,e,r,n){void 0===n&&(n=O.required);var o=new P(t,e,r,n);return this.addConstraint(o),o},t.prototype.addConstraint=function(t){if(void 0!==this._cnMap.find(t))throw new Error("duplicate constraint");var e=this._createRow(t),r=e.row,n=e.tag,o=this._chooseSubject(r,n);if(o.type()===z.Invalid&&r.allDummies()){if(!I(r.constant()))throw new Error("unsatisfiable constraint");o=n.marker}if(o.type()===z.Invalid){if(!this._addWithArtificialVariable(r))throw new Error("unsatisfiable constraint")}else r.solveFor(o),this._substitute(o,r),this._rowMap.insert(o,r);this._cnMap.insert(t,n),this._optimize(this._objective)},t.prototype.removeConstraint=function(t){var e=this._cnMap.erase(t);if(void 0===e)throw new Error("unknown constraint");this._removeConstraintEffects(t,e.second);var r=e.second.marker,n=this._rowMap.erase(r);if(void 0===n){var o=this._getMarkerLeavingSymbol(r);if(o.type()===z.Invalid)throw new Error("failed to find leaving row");(n=this._rowMap.erase(o)).second.solveForEx(o,r),this._substitute(r,n.second)}this._optimize(this._objective)},t.prototype.hasConstraint=function(t){return this._cnMap.contains(t)},t.prototype.addEditVariable=function(t,e){if(void 0!==this._editMap.find(t))throw new Error("duplicate edit variable");if((e=O.clip(e))===O.required)throw new Error("bad required strength");var r=new k(t),n=new P(r,j.Eq,void 0,e);this.addConstraint(n);var o={tag:this._cnMap.find(n).second,constraint:n,constant:0};this._editMap.insert(t,o)},t.prototype.removeEditVariable=function(t){var e=this._editMap.erase(t);if(void 0===e)throw new Error("unknown edit variable");this.removeConstraint(e.second.constraint)},t.prototype.hasEditVariable=function(t){return this._editMap.contains(t)},t.prototype.suggestValue=function(t,e){var r=this._editMap.find(t);if(void 0===r)throw new Error("unknown edit variable");var n=this._rowMap,o=r.second,i=e-o.constant;o.constant=e;var a=o.tag.marker,s=n.find(a);if(void 0!==s)return s.second.add(-i)<0&&this._infeasibleRows.push(a),void this._dualOptimize();var u=o.tag.other;if(void 0!==(s=n.find(u)))return s.second.add(i)<0&&this._infeasibleRows.push(u),void this._dualOptimize();for(var c=0,f=n.size();c<f;++c){var p=n.itemAt(c),l=p.second,h=l.coefficientFor(a);0!==h&&l.add(i*h)<0&&p.first.type()!==z.External&&this._infeasibleRows.push(p.first)}this._dualOptimize()},t.prototype.updateVariables=function(){for(var t=this._varMap,e=this._rowMap,r=0,n=t.size();r<n;++r){var o=t.itemAt(r),i=e.find(o.second);void 0!==i?o.first.setValue(i.second.constant()):o.first.setValue(0)}},t.prototype._getVarSymbol=function(t){var e=this;return this._varMap.setDefault(t,(function(){return e._makeSymbol(z.External)})).second},t.prototype._createRow=function(t){for(var e=t.expression(),r=new q(e.constant()),n=e.terms(),o=0,i=n.size();o<i;++o){var a=n.itemAt(o);if(!I(a.second)){var s=this._getVarSymbol(a.first),u=this._rowMap.find(s);void 0!==u?r.insertRow(u.second,a.second):r.insertSymbol(s,a.second)}}var c=this._objective,f=t.strength(),p={marker:R,other:R};switch(t.op()){case j.Le:case j.Ge:var l=t.op()===j.Le?1:-1,h=this._makeSymbol(z.Slack);if(p.marker=h,r.insertSymbol(h,l),f<O.required){var d=this._makeSymbol(z.Error);p.other=d,r.insertSymbol(d,-l),c.insertSymbol(d,f)}break;case j.Eq:if(f<O.required){var y=this._makeSymbol(z.Error),v=this._makeSymbol(z.Error);p.marker=y,p.other=v,r.insertSymbol(y,-1),r.insertSymbol(v,1),c.insertSymbol(y,f),c.insertSymbol(v,f)}else{var m=this._makeSymbol(z.Dummy);p.marker=m,r.insertSymbol(m)}}return r.constant()<0&&r.reverseSign(),{row:r,tag:p}},t.prototype._chooseSubject=function(t,e){for(var r=t.cells(),n=0,o=r.size();n<o;++n){var i=r.itemAt(n);if(i.first.type()===z.External)return i.first}var a=e.marker.type();return(a===z.Slack||a===z.Error)&&t.coefficientFor(e.marker)<0?e.marker:((a=e.other.type())===z.Slack||a===z.Error)&&t.coefficientFor(e.other)<0?e.other:R},t.prototype._addWithArtificialVariable=function(t){var e=this._makeSymbol(z.Slack);this._rowMap.insert(e,t.copy()),this._artificial=t.copy(),this._optimize(this._artificial);var r=I(this._artificial.constant());this._artificial=null;var n=this._rowMap.erase(e);if(void 0!==n){var o=n.second;if(o.isConstant())return r;var i=this._anyPivotableSymbol(o);if(i.type()===z.Invalid)return!1;o.solveForEx(e,i),this._substitute(i,o),this._rowMap.insert(i,o)}for(var a=this._rowMap,s=0,u=a.size();s<u;++s)a.itemAt(s).second.removeSymbol(e);return this._objective.removeSymbol(e),r},t.prototype._substitute=function(t,e){for(var r=this._rowMap,n=0,o=r.size();n<o;++n){var i=r.itemAt(n);i.second.substitute(t,e),i.second.constant()<0&&i.first.type()!==z.External&&this._infeasibleRows.push(i.first)}this._objective.substitute(t,e),this._artificial&&this._artificial.substitute(t,e)},t.prototype._optimize=function(t){for(;;){var e=this._getEnteringSymbol(t);if(e.type()===z.Invalid)return;var r=this._getLeavingSymbol(e);if(r.type()===z.Invalid)throw new Error("the objective is unbounded");var n=this._rowMap.erase(r).second;n.solveForEx(r,e),this._substitute(e,n),this._rowMap.insert(e,n)}},t.prototype._dualOptimize=function(){for(var t=this._rowMap,e=this._infeasibleRows;0!==e.length;){var r=e.pop(),n=t.find(r);if(void 0!==n&&n.second.constant()<0){var o=this._getDualEnteringSymbol(n.second);if(o.type()===z.Invalid)throw new Error("dual optimize failed");var i=n.second;t.erase(r),i.solveForEx(r,o),this._substitute(o,i),t.insert(o,i)}}},t.prototype._getEnteringSymbol=function(t){for(var e=t.cells(),r=0,n=e.size();r<n;++r){var o=e.itemAt(r),i=o.first;if(o.second<0&&i.type()!==z.Dummy)return i}return R},t.prototype._getDualEnteringSymbol=function(t){for(var e=Number.MAX_VALUE,r=R,n=t.cells(),o=0,i=n.size();o<i;++o){var a=n.itemAt(o),s=a.first,u=a.second;if(u>0&&s.type()!==z.Dummy){var c=this._objective.coefficientFor(s)/u;c<e&&(e=c,r=s)}}return r},t.prototype._getLeavingSymbol=function(t){for(var e=Number.MAX_VALUE,r=R,n=this._rowMap,o=0,i=n.size();o<i;++o){var a=n.itemAt(o),s=a.first;if(s.type()!==z.External){var u=a.second,c=u.coefficientFor(t);if(c<0){var f=-u.constant()/c;f<e&&(e=f,r=s)}}}return r},t.prototype._getMarkerLeavingSymbol=function(t){for(var e=Number.MAX_VALUE,r=e,n=e,o=R,i=o,a=o,s=o,u=this._rowMap,c=0,f=u.size();c<f;++c){var p=u.itemAt(c),l=p.second,h=l.coefficientFor(t);if(0!==h){var d=p.first;if(d.type()===z.External)s=d;else if(h<0){(y=-l.constant()/h)<r&&(r=y,i=d)}else{var y;(y=l.constant()/h)<n&&(n=y,a=d)}}}return i!==o?i:a!==o?a:s},t.prototype._removeConstraintEffects=function(t,e){e.marker.type()===z.Error&&this._removeMarkerEffects(e.marker,t.strength()),e.other.type()===z.Error&&this._removeMarkerEffects(e.other,t.strength())},t.prototype._removeMarkerEffects=function(t,e){var r=this._rowMap.find(t);void 0!==r?this._objective.insertRow(r.second,-e):this._objective.insertSymbol(t,-e)},t.prototype._anyPivotableSymbol=function(t){for(var e=t.cells(),r=0,n=e.size();r<n;++r){var o=e.itemAt(r),i=o.first.type();if(i===z.Slack||i===z.Error)return o.first}return R},t.prototype._makeSymbol=function(t){return new F(t,this._idTick++)},t}();function I(t){return t<0?-t<1e-8:t<1e-8}!function(t){t[t.Invalid=0]="Invalid",t[t.External=1]="External",t[t.Slack=2]="Slack",t[t.Error=3]="Error",t[t.Dummy=4]="Dummy"}(z||(z={}));var F=function(){function t(t,e){this._id=e,this._type=t}return t.prototype.id=function(){return this._id},t.prototype.type=function(){return this._type},t}(),R=new F(z.Invalid,-1),q=function(){function t(t){void 0===t&&(t=0),this._cellMap=w(),this._constant=t}return t.prototype.cells=function(){return this._cellMap},t.prototype.constant=function(){return this._constant},t.prototype.isConstant=function(){return this._cellMap.empty()},t.prototype.allDummies=function(){for(var t=this._cellMap,e=0,r=t.size();e<r;++e){if(t.itemAt(e).first.type()!==z.Dummy)return!1}return!0},t.prototype.copy=function(){var e=new t(this._constant);return e._cellMap=this._cellMap.copy(),e},t.prototype.add=function(t){return this._constant+=t},t.prototype.insertSymbol=function(t,e){void 0===e&&(e=1),I(this._cellMap.setDefault(t,(function(){return 0})).second+=e)&&this._cellMap.erase(t)},t.prototype.insertRow=function(t,e){void 0===e&&(e=1),this._constant+=t._constant*e;for(var r=t._cellMap,n=0,o=r.size();n<o;++n){var i=r.itemAt(n);this.insertSymbol(i.first,i.second*e)}},t.prototype.removeSymbol=function(t){this._cellMap.erase(t)},t.prototype.reverseSign=function(){this._constant=-this._constant;for(var t=this._cellMap,e=0,r=t.size();e<r;++e){var n=t.itemAt(e);n.second=-n.second}},t.prototype.solveFor=function(t){var e=this._cellMap,r=-1/e.erase(t).second;this._constant*=r;for(var n=0,o=e.size();n<o;++n)e.itemAt(n).second*=r},t.prototype.solveForEx=function(t,e){this.insertSymbol(t,-1),this.solveFor(e)},t.prototype.coefficientFor=function(t){var e=this._cellMap.find(t);return void 0!==e?e.second:0},t.prototype.substitute=function(t,e){var r=this._cellMap.erase(t);void 0!==r&&this.insertRow(e,r.second)},t}(),V=function(t,e,r){for(var n=0;n<e;n+=1){var o,i=u(t);try{for(i.s();!(o=i.n()).done;){var a=o.value;a.base.solve(a,r)}}catch(s){i.e(s)}finally{i.f()}}},X=function(t,e){var r,n=new D,o={},i=function(t,e){return"".concat(t.id,"_").concat(e)},a=function(t,e){var r=i(t,e);if(!o[r]){var n=o[r]=new E;n.property=e,n.obj=t}},s=u(t);try{for(s.s();!(r=s.n()).done;){var c=r.value;a(c.a,c.base.property),a(c.b,c.base.property)}}catch(m){s.e(m)}finally{s.f()}var f,p=0,l=u(t);try{for(l.s();!(f=l.n()).done;){var h=f.value;try{n.addConstraint(h.base.strict(h,e,o[i(h.a,h.base.property)],o[i(h.b,h.base.property)]))}catch(m){p+=1}}}catch(m){l.e(m)}finally{l.f()}p>0&&console.warn("Skipped ".concat(p," unsolvable constraints")),n.updateVariables();for(var d=0,y=Object.values(o);d<y.length;d++){var v=y[d];v.obj[v.property]=v.value()}},L={property:"y",strict:function(t,e,r,n){return new P(r.minus(n),j.Ge,e.spaceY,O.required)}},T={property:"y",strict:function(t,e,r,n){return new P(r.minus(n),j.Ge,e.layerSpace,O.required)}},G={property:"x",solve:function(t){var e=t.a,r=t.b,n=t.strength*(e.x-r.x);e.x-=n,r.x+=n},strict:function(t,e,r,n){return new P(r.minus(n),j.Eq,0,O.create(1,0,0,t.strength))}},Y={property:"x",solve:function(t){var e=t.edgeA,r=t.edgeB,n=t.separationA,o=t.separationB,i=t.strength,a=i*((e.sourceNode.x-r.sourceNode.x-n)/n),s=i*((e.targetNode.x-r.targetNode.x-o)/o);e.sourceNode.x-=a,r.sourceNode.x+=a,e.targetNode.x-=s,r.targetNode.x+=s}},U={property:"x",strict:function(t,e,r,n){return new P(n.minus(r),j.Ge,t.separation,O.required)}},B=function(t){var e,r=t.nodes,n=t.edges,o=t.layers,i=t.spaceX,a=t.spaceY,s=t.spreadX,c=t.layerSpaceY,f=t.iterations,p=u(r);try{for(p.s();!(e=p.n()).done;){var l=e.value;l.x=0,l.y=0}}catch(M){p.e(M)}finally{p.f()}var h={spaceX:i,spaceY:a,spreadX:s,layerSpace:.5*(a+c)},d=W(n),y=J(r,o);X([].concat(x(d),x(y)),h);for(var m=v(r),g=$(n,h),_=H(n,h),b=0;b<f;b+=1)V(g,1,h),V(_,50,h);var w=K(m,h);X([].concat(x(w),x(_)),h),Q(n,m,a)},W=function(t){return t.map((function(t){return{base:L,a:t.targetNode,b:t.sourceNode}}))},J=function(t,e){var r=[];if(!e)return r;for(var n=e.map((function(e){return t.filter((function(t){return t.nearestLayer===e}))})),o=0;o<n.length-1;o+=1){var i,a=n[o],s=n[o+1],c={id:"layer-".concat(o),x:0,y:0},f=u(a);try{for(f.s();!(i=f.n()).done;){var p=i.value;r.push({base:T,a:c,b:p})}}catch(y){f.e(y)}finally{f.f()}var l,h=u(s);try{for(h.s();!(l=h.n()).done;){var d=l.value;r.push({base:T,a:d,b:c})}}catch(y){h.e(y)}finally{h.f()}}return r},$=function(t,e){for(var r=e.spaceX,n=[],o=0;o<t.length;o+=1)for(var i=t[o],a=i.sourceNode,s=i.targetNode,u=a.sources.length+a.targets.length+s.sources.length+s.targets.length,c=o+1;c<t.length;c+=1){var f=t[c],p=f.sourceNode,l=f.targetNode;if(!(a.row>=l.row||s.row<=p.row)){var h=p.sources.length+p.targets.length+l.sources.length+l.targets.length;n.push({base:Y,edgeA:i,edgeB:f,separationA:.5*a.width+r+.5*p.width,separationB:.5*s.width+r+.5*l.width,strength:1/Math.max(1,(u+h)/4)})}}return n},H=function(t){return t.map((function(t){var e=t.sourceNode,r=t.targetNode;return{base:G,a:e,b:r,strength:.6/Math.max(1,e.targets.length+r.sources.length-2)}}))},K=function(t,e){for(var r=e.spaceX,n=[],o=0;o<t.length;o+=1){var i=t[o];i.sort((function(t,e){return m(t.x,e.x,t.id,e.id)}));for(var a=0;a<i.length-1;a+=1){var s=i[a],u=i[a+1],c=Math.max(1,s.targets.length+s.sources.length-2),p=Math.max(1,u.targets.length+u.sources.length-2),l=Math.min(10,c*p*e.spreadX),h=f(l*r,r);n.push({base:U,a:s,b:u,separation:.5*s.width+h+.5*u.width})}}return n},Q=function(t,e,r){for(var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1.25,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:.25,i=Z(t),a=Math.round(r*o),s=0,c=0;c<e.length-1;c+=1){var p=i[c]||0,l=f(p*n*r,a);s+=l;var h,d=u(e[c+1]);try{for(d.s();!(h=d.n()).done;){var y=h.value;y.y+=s}}catch(v){d.e(v)}finally{d.f()}}},Z=function(t){var e,r={},n=u(t);try{for(n.s();!(e=n.n()).done;){var o=e.value,i=Math.abs(p(o.targetNode,o.sourceNode)-c)/c,a=o.sourceNode.row,s=o.targetNode.row-1;r[a]=r[a]||[0,0],r[a][0]+=i,r[a][1]+=1,s!==a&&(r[s]=r[s]||[0,0],r[s][0]+=i,r[s][1]+=1)}}catch(l){n.e(l)}finally{n.f()}for(var f in r)r[f]=r[f][0]/(r[f][1]||1);return Object.values(r)},tt=function(t){var e,r=t.nodes,n=t.edges,o=t.spaceX,a=t.spaceY,s=t.minPassageGap,c=t.stemUnit,f=t.stemMinSource,g=t.stemMinTarget,_=t.stemMax,w=t.stemSpaceSource,M=t.stemSpaceTarget,S=v(r),E=u(r);try{for(E.s();!(e=E.n()).done;){e.value.targets.sort((function(t,e){return m(p(e.sourceNode,e.targetNode),p(t.sourceNode,t.targetNode))}))}}catch(mt){E.e(mt)}finally{E.f()}var N,k,A,j=u(n);try{for(j.s();!(N=j.n()).done;){var O=N.value,z=O.sourceNode,P=O.targetNode;O.points=[];for(var C=Math.min((z.width-w)/z.targets.length,w)*(z.targets.indexOf(O)-.5*(z.targets.length-1)),D={x:z.x+C,y:z.y},I=z.row+1;I<P.row;I+=1){for(var F=S[I][0],R={x:l(F)-o,y:F.y},q=1/0,V=[i(i({},F),{},{x:Number.MIN_SAFE_INTEGER})].concat(x(S[I]),[i(i({},F),{},{x:Number.MAX_SAFE_INTEGER})]),X=0;X<V.length-1;X+=1){var L=V[X],T=V[X+1],G=l(T)-h(L);if(!(G<s)){var Y=Math.min(o,.5*G),U=b(D.x,D.y,h(L)+Y,d(L)-a,l(T)-Y,d(T)-a),B=(k=D.x,A=U.x,Math.abs(k-A));if(B>q)break;B<q&&(q=B,R=U)}}var W=F.height+a;O.points.push({x:R.x+C,y:R.y}),O.points.push({x:R.x+C,y:R.y+W}),D={x:R.x,y:R.y+W}}}}catch(mt){j.e(mt)}finally{j.f()}var J,$=u(r);try{for($.s();!(J=$.n()).done;){var H=J.value;H.targets.sort((function(t,e){return m(p(e.sourceNode,e.points[0]||e.targetNode),p(t.sourceNode,t.points[0]||t.targetNode))})),H.sources.sort((function(t,e){return m(p(t.points[t.points.length-1]||t.sourceNode,t.targetNode),p(e.points[e.points.length-1]||e.sourceNode,e.targetNode))}))}}catch(mt){$.e(mt)}finally{$.f()}var K,Q=u(n);try{for(Q.s();!(K=Q.n()).done;){var Z,tt=K.value,et=tt.sourceNode,rt=tt.targetNode,nt=Math.min((et.width-w)/et.targets.length,w),ot=Math.min((rt.width-M)/rt.sources.length,M),it=et.targets.indexOf(tt)-.5*(et.targets.length-1),at=rt.sources.indexOf(tt)-.5*(rt.sources.length-1),st=nt*it,ut=ot*at,ct=c*et.targets.length*(1-Math.abs(it)/et.targets.length),ft=c*rt.sources.length*(1-Math.abs(at)/rt.sources.length),pt=[{x:et.x+st,y:y(et)},{x:et.x+st,y:y(et)+f},{x:et.x+st,y:y(et)+f+Math.min(ct,_)}],lt=[{x:rt.x+ut,y:d(rt)-g-Math.min(ft,_)},{x:rt.x+ut,y:d(rt)-g},{x:rt.x+ut,y:d(rt)}],ht=[].concat(pt,x(tt.points),lt),dt=ht[0].y,yt=u(ht);try{for(yt.s();!(Z=yt.n()).done;){var vt=Z.value;vt.y<dt?vt.y=dt:dt=vt.y}}catch(mt){yt.e(mt)}finally{yt.f()}tt.points=ht}}catch(mt){Q.e(mt)}finally{Q.f()}},et={layout:{spaceX:14,spaceY:110,layerSpaceY:55,spreadX:2.2,padding:100,iterations:25},routing:{spaceX:26,spaceY:28,minPassageGap:40,stemUnit:8,stemMinSource:5,stemMinTarget:5,stemMax:20,stemSpaceSource:6,stemSpaceTarget:10}},rt=function(t,e){var r,n={},o=u(t);try{for(o.s();!(r=o.n()).done;){var i=r.value;n[i.id]=i,i.targets=[],i.sources=[]}}catch(f){o.e(f)}finally{o.f()}var a,s=u(e);try{for(s.s();!(a=s.n()).done;){var c=a.value;c.sourceNode=n[c.source],c.targetNode=n[c.target],c.sourceNode.targets.push(c),c.targetNode.sources.push(c)}}catch(f){s.e(f)}finally{s.f()}},nt=function(t,e){if(e&&e.length>0){var r,n={},o=u(e);try{for(o.s();!(r=o.n()).done;){var i=r.value;n[i]=!0}}catch(h){o.e(h)}finally{o.f()}var a,s=function(t){return Boolean(t&&t.layer in n)},c=e[e.length-1],f=u(t);try{for(f.s();!(a=f.n()).done;){var p=a.value,l=at(p,ot,it,s);p.nearestLayer=l?l.layer:c}}catch(h){f.e(h)}finally{f.f()}}},ot=function(t){return t.targets.map((function(t){return t.targetNode}))},it=function(t,e){return t.rank-e.rank},at=function t(e,r,n,o,i){return o(e)?e:((i=i||{})[e.id]=!0,r(e).filter((function(t){return!i[t.id]})).sort(n).map((function(e){return t(e,r,n,o,i)})).filter(o).sort(n)[0])},st=function(t,e){var r,n={min:{x:1/0,y:1/0},max:{x:-1/0,y:-1/0}},o=u(t);try{for(o.s();!(r=o.n()).done;){var i=r.value,a=i.x,s=i.y;a<n.min.x&&(n.min.x=a),a>n.max.x&&(n.max.x=a),s<n.min.y&&(n.min.y=s),s>n.max.y&&(n.max.y=s)}}catch(c){o.e(c)}finally{o.f()}return n.width=n.max.x-n.min.x+2*e,n.height=n.max.y-n.min.y+2*e,n.min.x-=e,n.min.y-=e,n},ut=function(t){var e=function(t,e,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:et;rt(t,e),nt(t,r),B(i({nodes:t,edges:e,layers:r},n.layout)),tt(i({nodes:t,edges:e,layers:r},n.routing));var o=st(t,n.layout.padding);return t.forEach((function(t){return g(t,o.min)})),e.forEach((function(t){return _(t,o.min)})),{nodes:t,edges:e,layers:r,size:o}}(t.nodes,t.edges,t.layers);return i(i({},e),{},{size:i(i({},e.size),{},{marginx:100,marginy:100})})};addEventListener("message",(function(t){var r,n=t.data,o=n.type,i=n.method,a=n.id,s=n.params;"RPC"===o&&i&&((r=e[i])?Promise.resolve().then((function(){return r.apply(e,s)})):Promise.reject("No such method")).then((function(t){postMessage({type:"RPC",id:a,result:t})})).catch((function(t){var e={message:t};t.stack&&(e.message=t.message,e.stack=t.stack,e.name=t.name),postMessage({type:"RPC",id:a,error:e})}))})),postMessage({type:"RPC",method:"ready"})}]);
//# sourceMappingURL=2f1baf0dc7e9501ac0ca.worker.js.map