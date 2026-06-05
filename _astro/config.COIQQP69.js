/*! js-yaml 4.1.1 https://github.com/nodeca/js-yaml @license MIT */function Sn(n){return typeof n>"u"||n===null}function de(n){return typeof n=="object"&&n!==null}function me(n){return Array.isArray(n)?n:Sn(n)?[]:[n]}function ge(n,e){var i,l,r,u;if(e)for(u=Object.keys(e),i=0,l=u.length;i<l;i+=1)r=u[i],n[r]=e[r];return n}function xe(n,e){var i="",l;for(l=0;l<e;l+=1)i+=n;return i}function ve(n){return n===0&&Number.NEGATIVE_INFINITY===1/n}var Ae=Sn,ye=de,be=me,we=xe,_e=ve,Ce=ge,b={isNothing:Ae,isObject:ye,toArray:be,repeat:we,isNegativeZero:_e,extend:Ce};function En(n,e){var i="",l=n.reason||"(unknown reason)";return n.mark?(n.mark.name&&(i+='in "'+n.mark.name+'" '),i+="("+(n.mark.line+1)+":"+(n.mark.column+1)+")",!e&&n.mark.snippet&&(i+=`

`+n.mark.snippet),l+" "+i):l}function B(n,e){Error.call(this),this.name="YAMLException",this.reason=n,this.mark=e,this.message=En(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}B.prototype=Object.create(Error.prototype);B.prototype.constructor=B;B.prototype.toString=function(e){return this.name+": "+En(this,e)};var C=B;function z(n,e,i,l,r){var u="",o="",a=Math.floor(r/2)-1;return l-e>a&&(u=" ... ",e=l-a+u.length),i-l>a&&(o=" ...",i=l+a-o.length),{str:u+n.slice(e,i).replace(/\t/g,"→")+o,pos:l-e+u.length}}function Z(n,e){return b.repeat(" ",e-n.length)+n}function Se(n,e){if(e=Object.create(e||null),!n.buffer)return null;e.maxLength||(e.maxLength=79),typeof e.indent!="number"&&(e.indent=1),typeof e.linesBefore!="number"&&(e.linesBefore=3),typeof e.linesAfter!="number"&&(e.linesAfter=2);for(var i=/\r?\n|\r|\0/g,l=[0],r=[],u,o=-1;u=i.exec(n.buffer);)r.push(u.index),l.push(u.index+u[0].length),n.position<=u.index&&o<0&&(o=l.length-2);o<0&&(o=l.length-1);var a="",c,f,p=Math.min(n.line+e.linesAfter,r.length).toString().length,t=e.maxLength-(e.indent+p+3);for(c=1;c<=e.linesBefore&&!(o-c<0);c++)f=z(n.buffer,l[o-c],r[o-c],n.position-(l[o]-l[o-c]),t),a=b.repeat(" ",e.indent)+Z((n.line-c+1).toString(),p)+" | "+f.str+`
`+a;for(f=z(n.buffer,l[o],r[o],n.position,t),a+=b.repeat(" ",e.indent)+Z((n.line+1).toString(),p)+" | "+f.str+`
`,a+=b.repeat("-",e.indent+p+3+f.pos)+`^
`,c=1;c<=e.linesAfter&&!(o+c>=r.length);c++)f=z(n.buffer,l[o+c],r[o+c],n.position-(l[o]-l[o+c]),t),a+=b.repeat(" ",e.indent)+Z((n.line+c+1).toString(),p)+" | "+f.str+`
`;return a.replace(/\n$/,"")}var Ee=Se,Fe=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],Te=["scalar","sequence","mapping"];function Ie(n){var e={};return n!==null&&Object.keys(n).forEach(function(i){n[i].forEach(function(l){e[String(l)]=i})}),e}function ke(n,e){if(e=e||{},Object.keys(e).forEach(function(i){if(Fe.indexOf(i)===-1)throw new C('Unknown option "'+i+'" is met in definition of "'+n+'" YAML type.')}),this.options=e,this.tag=n,this.kind=e.kind||null,this.resolve=e.resolve||function(){return!0},this.construct=e.construct||function(i){return i},this.instanceOf=e.instanceOf||null,this.predicate=e.predicate||null,this.represent=e.represent||null,this.representName=e.representName||null,this.defaultStyle=e.defaultStyle||null,this.multi=e.multi||!1,this.styleAliases=Ie(e.styleAliases||null),Te.indexOf(this.kind)===-1)throw new C('Unknown kind "'+this.kind+'" is specified for "'+n+'" YAML type.')}var w=ke;function tn(n,e){var i=[];return n[e].forEach(function(l){var r=i.length;i.forEach(function(u,o){u.tag===l.tag&&u.kind===l.kind&&u.multi===l.multi&&(r=o)}),i[r]=l}),i}function Oe(){var n={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}},e,i;function l(r){r.multi?(n.multi[r.kind].push(r),n.multi.fallback.push(r)):n[r.kind][r.tag]=n.fallback[r.tag]=r}for(e=0,i=arguments.length;e<i;e+=1)arguments[e].forEach(l);return n}function X(n){return this.extend(n)}X.prototype.extend=function(e){var i=[],l=[];if(e instanceof w)l.push(e);else if(Array.isArray(e))l=l.concat(e);else if(e&&(Array.isArray(e.implicit)||Array.isArray(e.explicit)))e.implicit&&(i=i.concat(e.implicit)),e.explicit&&(l=l.concat(e.explicit));else throw new C("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");i.forEach(function(u){if(!(u instanceof w))throw new C("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(u.loadKind&&u.loadKind!=="scalar")throw new C("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(u.multi)throw new C("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),l.forEach(function(u){if(!(u instanceof w))throw new C("Specified list of YAML types (or a single Type object) contains a non-Type object.")});var r=Object.create(X.prototype);return r.implicit=(this.implicit||[]).concat(i),r.explicit=(this.explicit||[]).concat(l),r.compiledImplicit=tn(r,"implicit"),r.compiledExplicit=tn(r,"explicit"),r.compiledTypeMap=Oe(r.compiledImplicit,r.compiledExplicit),r};var Fn=X,Tn=new w("tag:yaml.org,2002:str",{kind:"scalar",construct:function(n){return n!==null?n:""}}),In=new w("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(n){return n!==null?n:[]}}),kn=new w("tag:yaml.org,2002:map",{kind:"mapping",construct:function(n){return n!==null?n:{}}}),On=new Fn({explicit:[Tn,In,kn]});function Le(n){if(n===null)return!0;var e=n.length;return e===1&&n==="~"||e===4&&(n==="null"||n==="Null"||n==="NULL")}function Ne(){return null}function Me(n){return n===null}var Ln=new w("tag:yaml.org,2002:null",{kind:"scalar",resolve:Le,construct:Ne,predicate:Me,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"});function De(n){if(n===null)return!1;var e=n.length;return e===4&&(n==="true"||n==="True"||n==="TRUE")||e===5&&(n==="false"||n==="False"||n==="FALSE")}function Re(n){return n==="true"||n==="True"||n==="TRUE"}function He(n){return Object.prototype.toString.call(n)==="[object Boolean]"}var Nn=new w("tag:yaml.org,2002:bool",{kind:"scalar",resolve:De,construct:Re,predicate:He,represent:{lowercase:function(n){return n?"true":"false"},uppercase:function(n){return n?"TRUE":"FALSE"},camelcase:function(n){return n?"True":"False"}},defaultStyle:"lowercase"});function Ye(n){return 48<=n&&n<=57||65<=n&&n<=70||97<=n&&n<=102}function Be(n){return 48<=n&&n<=55}function je(n){return 48<=n&&n<=57}function Pe(n){if(n===null)return!1;var e=n.length,i=0,l=!1,r;if(!e)return!1;if(r=n[i],(r==="-"||r==="+")&&(r=n[++i]),r==="0"){if(i+1===e)return!0;if(r=n[++i],r==="b"){for(i++;i<e;i++)if(r=n[i],r!=="_"){if(r!=="0"&&r!=="1")return!1;l=!0}return l&&r!=="_"}if(r==="x"){for(i++;i<e;i++)if(r=n[i],r!=="_"){if(!Ye(n.charCodeAt(i)))return!1;l=!0}return l&&r!=="_"}if(r==="o"){for(i++;i<e;i++)if(r=n[i],r!=="_"){if(!Be(n.charCodeAt(i)))return!1;l=!0}return l&&r!=="_"}}if(r==="_")return!1;for(;i<e;i++)if(r=n[i],r!=="_"){if(!je(n.charCodeAt(i)))return!1;l=!0}return!(!l||r==="_")}function Ue(n){var e=n,i=1,l;if(e.indexOf("_")!==-1&&(e=e.replace(/_/g,"")),l=e[0],(l==="-"||l==="+")&&(l==="-"&&(i=-1),e=e.slice(1),l=e[0]),e==="0")return 0;if(l==="0"){if(e[1]==="b")return i*parseInt(e.slice(2),2);if(e[1]==="x")return i*parseInt(e.slice(2),16);if(e[1]==="o")return i*parseInt(e.slice(2),8)}return i*parseInt(e,10)}function Ke(n){return Object.prototype.toString.call(n)==="[object Number]"&&n%1===0&&!b.isNegativeZero(n)}var Mn=new w("tag:yaml.org,2002:int",{kind:"scalar",resolve:Pe,construct:Ue,predicate:Ke,represent:{binary:function(n){return n>=0?"0b"+n.toString(2):"-0b"+n.toString(2).slice(1)},octal:function(n){return n>=0?"0o"+n.toString(8):"-0o"+n.toString(8).slice(1)},decimal:function(n){return n.toString(10)},hexadecimal:function(n){return n>=0?"0x"+n.toString(16).toUpperCase():"-0x"+n.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),Ge=new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function qe(n){return!(n===null||!Ge.test(n)||n[n.length-1]==="_")}function We(n){var e,i;return e=n.replace(/_/g,"").toLowerCase(),i=e[0]==="-"?-1:1,"+-".indexOf(e[0])>=0&&(e=e.slice(1)),e===".inf"?i===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:e===".nan"?NaN:i*parseFloat(e,10)}var $e=/^[-+]?[0-9]+e/;function Qe(n,e){var i;if(isNaN(n))switch(e){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===n)switch(e){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===n)switch(e){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(b.isNegativeZero(n))return"-0.0";return i=n.toString(10),$e.test(i)?i.replace("e",".e"):i}function ze(n){return Object.prototype.toString.call(n)==="[object Number]"&&(n%1!==0||b.isNegativeZero(n))}var Dn=new w("tag:yaml.org,2002:float",{kind:"scalar",resolve:qe,construct:We,predicate:ze,represent:Qe,defaultStyle:"lowercase"}),Rn=On.extend({implicit:[Ln,Nn,Mn,Dn]}),Hn=Rn,Yn=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),Bn=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function Ze(n){return n===null?!1:Yn.exec(n)!==null||Bn.exec(n)!==null}function Ve(n){var e,i,l,r,u,o,a,c=0,f=null,p,t,h;if(e=Yn.exec(n),e===null&&(e=Bn.exec(n)),e===null)throw new Error("Date resolve error");if(i=+e[1],l=+e[2]-1,r=+e[3],!e[4])return new Date(Date.UTC(i,l,r));if(u=+e[4],o=+e[5],a=+e[6],e[7]){for(c=e[7].slice(0,3);c.length<3;)c+="0";c=+c}return e[9]&&(p=+e[10],t=+(e[11]||0),f=(p*60+t)*6e4,e[9]==="-"&&(f=-f)),h=new Date(Date.UTC(i,l,r,u,o,a,c)),f&&h.setTime(h.getTime()-f),h}function Xe(n){return n.toISOString()}var jn=new w("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:Ze,construct:Ve,instanceOf:Date,represent:Xe});function Je(n){return n==="<<"||n===null}var Pn=new w("tag:yaml.org,2002:merge",{kind:"scalar",resolve:Je}),ln=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function ni(n){if(n===null)return!1;var e,i,l=0,r=n.length,u=ln;for(i=0;i<r;i++)if(e=u.indexOf(n.charAt(i)),!(e>64)){if(e<0)return!1;l+=6}return l%8===0}function ei(n){var e,i,l=n.replace(/[\r\n=]/g,""),r=l.length,u=ln,o=0,a=[];for(e=0;e<r;e++)e%4===0&&e&&(a.push(o>>16&255),a.push(o>>8&255),a.push(o&255)),o=o<<6|u.indexOf(l.charAt(e));return i=r%4*6,i===0?(a.push(o>>16&255),a.push(o>>8&255),a.push(o&255)):i===18?(a.push(o>>10&255),a.push(o>>2&255)):i===12&&a.push(o>>4&255),new Uint8Array(a)}function ii(n){var e="",i=0,l,r,u=n.length,o=ln;for(l=0;l<u;l++)l%3===0&&l&&(e+=o[i>>18&63],e+=o[i>>12&63],e+=o[i>>6&63],e+=o[i&63]),i=(i<<8)+n[l];return r=u%3,r===0?(e+=o[i>>18&63],e+=o[i>>12&63],e+=o[i>>6&63],e+=o[i&63]):r===2?(e+=o[i>>10&63],e+=o[i>>4&63],e+=o[i<<2&63],e+=o[64]):r===1&&(e+=o[i>>2&63],e+=o[i<<4&63],e+=o[64],e+=o[64]),e}function ri(n){return Object.prototype.toString.call(n)==="[object Uint8Array]"}var Un=new w("tag:yaml.org,2002:binary",{kind:"scalar",resolve:ni,construct:ei,predicate:ri,represent:ii}),li=Object.prototype.hasOwnProperty,oi=Object.prototype.toString;function ui(n){if(n===null)return!0;var e=[],i,l,r,u,o,a=n;for(i=0,l=a.length;i<l;i+=1){if(r=a[i],o=!1,oi.call(r)!=="[object Object]")return!1;for(u in r)if(li.call(r,u))if(!o)o=!0;else return!1;if(!o)return!1;if(e.indexOf(u)===-1)e.push(u);else return!1}return!0}function ai(n){return n!==null?n:[]}var Kn=new w("tag:yaml.org,2002:omap",{kind:"sequence",resolve:ui,construct:ai}),ci=Object.prototype.toString;function fi(n){if(n===null)return!0;var e,i,l,r,u,o=n;for(u=new Array(o.length),e=0,i=o.length;e<i;e+=1){if(l=o[e],ci.call(l)!=="[object Object]"||(r=Object.keys(l),r.length!==1))return!1;u[e]=[r[0],l[r[0]]]}return!0}function ti(n){if(n===null)return[];var e,i,l,r,u,o=n;for(u=new Array(o.length),e=0,i=o.length;e<i;e+=1)l=o[e],r=Object.keys(l),u[e]=[r[0],l[r[0]]];return u}var Gn=new w("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:fi,construct:ti}),pi=Object.prototype.hasOwnProperty;function si(n){if(n===null)return!0;var e,i=n;for(e in i)if(pi.call(i,e)&&i[e]!==null)return!1;return!0}function hi(n){return n!==null?n:{}}var qn=new w("tag:yaml.org,2002:set",{kind:"mapping",resolve:si,construct:hi}),on=Hn.extend({implicit:[jn,Pn],explicit:[Un,Kn,Gn,qn]}),O=Object.prototype.hasOwnProperty,K=1,Wn=2,$n=3,G=4,V=1,di=2,pn=3,mi=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,gi=/[\x85\u2028\u2029]/,xi=/[,\[\]\{\}]/,Qn=/^(?:!|!!|![a-z\-]+!)$/i,zn=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function sn(n){return Object.prototype.toString.call(n)}function T(n){return n===10||n===13}function L(n){return n===9||n===32}function S(n){return n===9||n===32||n===10||n===13}function D(n){return n===44||n===91||n===93||n===123||n===125}function vi(n){var e;return 48<=n&&n<=57?n-48:(e=n|32,97<=e&&e<=102?e-97+10:-1)}function Ai(n){return n===120?2:n===117?4:n===85?8:0}function yi(n){return 48<=n&&n<=57?n-48:-1}function hn(n){return n===48?"\0":n===97?"\x07":n===98?"\b":n===116||n===9?"	":n===110?`
`:n===118?"\v":n===102?"\f":n===114?"\r":n===101?"\x1B":n===32?" ":n===34?'"':n===47?"/":n===92?"\\":n===78?"":n===95?" ":n===76?"\u2028":n===80?"\u2029":""}function bi(n){return n<=65535?String.fromCharCode(n):String.fromCharCode((n-65536>>10)+55296,(n-65536&1023)+56320)}function Zn(n,e,i){e==="__proto__"?Object.defineProperty(n,e,{configurable:!0,enumerable:!0,writable:!0,value:i}):n[e]=i}var Vn=new Array(256),Xn=new Array(256);for(var N=0;N<256;N++)Vn[N]=hn(N)?1:0,Xn[N]=hn(N);function wi(n,e){this.input=n,this.filename=e.filename||null,this.schema=e.schema||on,this.onWarning=e.onWarning||null,this.legacy=e.legacy||!1,this.json=e.json||!1,this.listener=e.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=n.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.firstTabInLine=-1,this.documents=[]}function Jn(n,e){var i={name:n.filename,buffer:n.input.slice(0,-1),position:n.position,line:n.line,column:n.position-n.lineStart};return i.snippet=Ee(i),new C(e,i)}function s(n,e){throw Jn(n,e)}function q(n,e){n.onWarning&&n.onWarning.call(null,Jn(n,e))}var dn={YAML:function(e,i,l){var r,u,o;e.version!==null&&s(e,"duplication of %YAML directive"),l.length!==1&&s(e,"YAML directive accepts exactly one argument"),r=/^([0-9]+)\.([0-9]+)$/.exec(l[0]),r===null&&s(e,"ill-formed argument of the YAML directive"),u=parseInt(r[1],10),o=parseInt(r[2],10),u!==1&&s(e,"unacceptable YAML version of the document"),e.version=l[0],e.checkLineBreaks=o<2,o!==1&&o!==2&&q(e,"unsupported YAML version of the document")},TAG:function(e,i,l){var r,u;l.length!==2&&s(e,"TAG directive accepts exactly two arguments"),r=l[0],u=l[1],Qn.test(r)||s(e,"ill-formed tag handle (first argument) of the TAG directive"),O.call(e.tagMap,r)&&s(e,'there is a previously declared suffix for "'+r+'" tag handle'),zn.test(u)||s(e,"ill-formed tag prefix (second argument) of the TAG directive");try{u=decodeURIComponent(u)}catch{s(e,"tag prefix is malformed: "+u)}e.tagMap[r]=u}};function k(n,e,i,l){var r,u,o,a;if(e<i){if(a=n.input.slice(e,i),l)for(r=0,u=a.length;r<u;r+=1)o=a.charCodeAt(r),o===9||32<=o&&o<=1114111||s(n,"expected valid JSON character");else mi.test(a)&&s(n,"the stream contains non-printable characters");n.result+=a}}function mn(n,e,i,l){var r,u,o,a;for(b.isObject(i)||s(n,"cannot merge mappings; the provided source object is unacceptable"),r=Object.keys(i),o=0,a=r.length;o<a;o+=1)u=r[o],O.call(e,u)||(Zn(e,u,i[u]),l[u]=!0)}function R(n,e,i,l,r,u,o,a,c){var f,p;if(Array.isArray(r))for(r=Array.prototype.slice.call(r),f=0,p=r.length;f<p;f+=1)Array.isArray(r[f])&&s(n,"nested arrays are not supported inside keys"),typeof r=="object"&&sn(r[f])==="[object Object]"&&(r[f]="[object Object]");if(typeof r=="object"&&sn(r)==="[object Object]"&&(r="[object Object]"),r=String(r),e===null&&(e={}),l==="tag:yaml.org,2002:merge")if(Array.isArray(u))for(f=0,p=u.length;f<p;f+=1)mn(n,e,u[f],i);else mn(n,e,u,i);else!n.json&&!O.call(i,r)&&O.call(e,r)&&(n.line=o||n.line,n.lineStart=a||n.lineStart,n.position=c||n.position,s(n,"duplicated mapping key")),Zn(e,r,u),delete i[r];return e}function un(n){var e;e=n.input.charCodeAt(n.position),e===10?n.position++:e===13?(n.position++,n.input.charCodeAt(n.position)===10&&n.position++):s(n,"a line break is expected"),n.line+=1,n.lineStart=n.position,n.firstTabInLine=-1}function y(n,e,i){for(var l=0,r=n.input.charCodeAt(n.position);r!==0;){for(;L(r);)r===9&&n.firstTabInLine===-1&&(n.firstTabInLine=n.position),r=n.input.charCodeAt(++n.position);if(e&&r===35)do r=n.input.charCodeAt(++n.position);while(r!==10&&r!==13&&r!==0);if(T(r))for(un(n),r=n.input.charCodeAt(n.position),l++,n.lineIndent=0;r===32;)n.lineIndent++,r=n.input.charCodeAt(++n.position);else break}return i!==-1&&l!==0&&n.lineIndent<i&&q(n,"deficient indentation"),l}function Q(n){var e=n.position,i;return i=n.input.charCodeAt(e),!!((i===45||i===46)&&i===n.input.charCodeAt(e+1)&&i===n.input.charCodeAt(e+2)&&(e+=3,i=n.input.charCodeAt(e),i===0||S(i)))}function an(n,e){e===1?n.result+=" ":e>1&&(n.result+=b.repeat(`
`,e-1))}function _i(n,e,i){var l,r,u,o,a,c,f,p,t=n.kind,h=n.result,d;if(d=n.input.charCodeAt(n.position),S(d)||D(d)||d===35||d===38||d===42||d===33||d===124||d===62||d===39||d===34||d===37||d===64||d===96||(d===63||d===45)&&(r=n.input.charCodeAt(n.position+1),S(r)||i&&D(r)))return!1;for(n.kind="scalar",n.result="",u=o=n.position,a=!1;d!==0;){if(d===58){if(r=n.input.charCodeAt(n.position+1),S(r)||i&&D(r))break}else if(d===35){if(l=n.input.charCodeAt(n.position-1),S(l))break}else{if(n.position===n.lineStart&&Q(n)||i&&D(d))break;if(T(d))if(c=n.line,f=n.lineStart,p=n.lineIndent,y(n,!1,-1),n.lineIndent>=e){a=!0,d=n.input.charCodeAt(n.position);continue}else{n.position=o,n.line=c,n.lineStart=f,n.lineIndent=p;break}}a&&(k(n,u,o,!1),an(n,n.line-c),u=o=n.position,a=!1),L(d)||(o=n.position+1),d=n.input.charCodeAt(++n.position)}return k(n,u,o,!1),n.result?!0:(n.kind=t,n.result=h,!1)}function Ci(n,e){var i,l,r;if(i=n.input.charCodeAt(n.position),i!==39)return!1;for(n.kind="scalar",n.result="",n.position++,l=r=n.position;(i=n.input.charCodeAt(n.position))!==0;)if(i===39)if(k(n,l,n.position,!0),i=n.input.charCodeAt(++n.position),i===39)l=n.position,n.position++,r=n.position;else return!0;else T(i)?(k(n,l,r,!0),an(n,y(n,!1,e)),l=r=n.position):n.position===n.lineStart&&Q(n)?s(n,"unexpected end of the document within a single quoted scalar"):(n.position++,r=n.position);s(n,"unexpected end of the stream within a single quoted scalar")}function Si(n,e){var i,l,r,u,o,a;if(a=n.input.charCodeAt(n.position),a!==34)return!1;for(n.kind="scalar",n.result="",n.position++,i=l=n.position;(a=n.input.charCodeAt(n.position))!==0;){if(a===34)return k(n,i,n.position,!0),n.position++,!0;if(a===92){if(k(n,i,n.position,!0),a=n.input.charCodeAt(++n.position),T(a))y(n,!1,e);else if(a<256&&Vn[a])n.result+=Xn[a],n.position++;else if((o=Ai(a))>0){for(r=o,u=0;r>0;r--)a=n.input.charCodeAt(++n.position),(o=vi(a))>=0?u=(u<<4)+o:s(n,"expected hexadecimal character");n.result+=bi(u),n.position++}else s(n,"unknown escape sequence");i=l=n.position}else T(a)?(k(n,i,l,!0),an(n,y(n,!1,e)),i=l=n.position):n.position===n.lineStart&&Q(n)?s(n,"unexpected end of the document within a double quoted scalar"):(n.position++,l=n.position)}s(n,"unexpected end of the stream within a double quoted scalar")}function Ei(n,e){var i=!0,l,r,u,o=n.tag,a,c=n.anchor,f,p,t,h,d,m=Object.create(null),x,v,E,g;if(g=n.input.charCodeAt(n.position),g===91)p=93,d=!1,a=[];else if(g===123)p=125,d=!0,a={};else return!1;for(n.anchor!==null&&(n.anchorMap[n.anchor]=a),g=n.input.charCodeAt(++n.position);g!==0;){if(y(n,!0,e),g=n.input.charCodeAt(n.position),g===p)return n.position++,n.tag=o,n.anchor=c,n.kind=d?"mapping":"sequence",n.result=a,!0;i?g===44&&s(n,"expected the node content, but found ','"):s(n,"missed comma between flow collection entries"),v=x=E=null,t=h=!1,g===63&&(f=n.input.charCodeAt(n.position+1),S(f)&&(t=h=!0,n.position++,y(n,!0,e))),l=n.line,r=n.lineStart,u=n.position,H(n,e,K,!1,!0),v=n.tag,x=n.result,y(n,!0,e),g=n.input.charCodeAt(n.position),(h||n.line===l)&&g===58&&(t=!0,g=n.input.charCodeAt(++n.position),y(n,!0,e),H(n,e,K,!1,!0),E=n.result),d?R(n,a,m,v,x,E,l,r,u):t?a.push(R(n,null,m,v,x,E,l,r,u)):a.push(x),y(n,!0,e),g=n.input.charCodeAt(n.position),g===44?(i=!0,g=n.input.charCodeAt(++n.position)):i=!1}s(n,"unexpected end of the stream within a flow collection")}function Fi(n,e){var i,l,r=V,u=!1,o=!1,a=e,c=0,f=!1,p,t;if(t=n.input.charCodeAt(n.position),t===124)l=!1;else if(t===62)l=!0;else return!1;for(n.kind="scalar",n.result="";t!==0;)if(t=n.input.charCodeAt(++n.position),t===43||t===45)V===r?r=t===43?pn:di:s(n,"repeat of a chomping mode identifier");else if((p=yi(t))>=0)p===0?s(n,"bad explicit indentation width of a block scalar; it cannot be less than one"):o?s(n,"repeat of an indentation width identifier"):(a=e+p-1,o=!0);else break;if(L(t)){do t=n.input.charCodeAt(++n.position);while(L(t));if(t===35)do t=n.input.charCodeAt(++n.position);while(!T(t)&&t!==0)}for(;t!==0;){for(un(n),n.lineIndent=0,t=n.input.charCodeAt(n.position);(!o||n.lineIndent<a)&&t===32;)n.lineIndent++,t=n.input.charCodeAt(++n.position);if(!o&&n.lineIndent>a&&(a=n.lineIndent),T(t)){c++;continue}if(n.lineIndent<a){r===pn?n.result+=b.repeat(`
`,u?1+c:c):r===V&&u&&(n.result+=`
`);break}for(l?L(t)?(f=!0,n.result+=b.repeat(`
`,u?1+c:c)):f?(f=!1,n.result+=b.repeat(`
`,c+1)):c===0?u&&(n.result+=" "):n.result+=b.repeat(`
`,c):n.result+=b.repeat(`
`,u?1+c:c),u=!0,o=!0,c=0,i=n.position;!T(t)&&t!==0;)t=n.input.charCodeAt(++n.position);k(n,i,n.position,!1)}return!0}function gn(n,e){var i,l=n.tag,r=n.anchor,u=[],o,a=!1,c;if(n.firstTabInLine!==-1)return!1;for(n.anchor!==null&&(n.anchorMap[n.anchor]=u),c=n.input.charCodeAt(n.position);c!==0&&(n.firstTabInLine!==-1&&(n.position=n.firstTabInLine,s(n,"tab characters must not be used in indentation")),!(c!==45||(o=n.input.charCodeAt(n.position+1),!S(o))));){if(a=!0,n.position++,y(n,!0,-1)&&n.lineIndent<=e){u.push(null),c=n.input.charCodeAt(n.position);continue}if(i=n.line,H(n,e,$n,!1,!0),u.push(n.result),y(n,!0,-1),c=n.input.charCodeAt(n.position),(n.line===i||n.lineIndent>e)&&c!==0)s(n,"bad indentation of a sequence entry");else if(n.lineIndent<e)break}return a?(n.tag=l,n.anchor=r,n.kind="sequence",n.result=u,!0):!1}function Ti(n,e,i){var l,r,u,o,a,c,f=n.tag,p=n.anchor,t={},h=Object.create(null),d=null,m=null,x=null,v=!1,E=!1,g;if(n.firstTabInLine!==-1)return!1;for(n.anchor!==null&&(n.anchorMap[n.anchor]=t),g=n.input.charCodeAt(n.position);g!==0;){if(!v&&n.firstTabInLine!==-1&&(n.position=n.firstTabInLine,s(n,"tab characters must not be used in indentation")),l=n.input.charCodeAt(n.position+1),u=n.line,(g===63||g===58)&&S(l))g===63?(v&&(R(n,t,h,d,m,null,o,a,c),d=m=x=null),E=!0,v=!0,r=!0):v?(v=!1,r=!0):s(n,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),n.position+=1,g=l;else{if(o=n.line,a=n.lineStart,c=n.position,!H(n,i,Wn,!1,!0))break;if(n.line===u){for(g=n.input.charCodeAt(n.position);L(g);)g=n.input.charCodeAt(++n.position);if(g===58)g=n.input.charCodeAt(++n.position),S(g)||s(n,"a whitespace character is expected after the key-value separator within a block mapping"),v&&(R(n,t,h,d,m,null,o,a,c),d=m=x=null),E=!0,v=!1,r=!1,d=n.tag,m=n.result;else if(E)s(n,"can not read an implicit mapping pair; a colon is missed");else return n.tag=f,n.anchor=p,!0}else if(E)s(n,"can not read a block mapping entry; a multiline key may not be an implicit key");else return n.tag=f,n.anchor=p,!0}if((n.line===u||n.lineIndent>e)&&(v&&(o=n.line,a=n.lineStart,c=n.position),H(n,e,G,!0,r)&&(v?m=n.result:x=n.result),v||(R(n,t,h,d,m,x,o,a,c),d=m=x=null),y(n,!0,-1),g=n.input.charCodeAt(n.position)),(n.line===u||n.lineIndent>e)&&g!==0)s(n,"bad indentation of a mapping entry");else if(n.lineIndent<e)break}return v&&R(n,t,h,d,m,null,o,a,c),E&&(n.tag=f,n.anchor=p,n.kind="mapping",n.result=t),E}function Ii(n){var e,i=!1,l=!1,r,u,o;if(o=n.input.charCodeAt(n.position),o!==33)return!1;if(n.tag!==null&&s(n,"duplication of a tag property"),o=n.input.charCodeAt(++n.position),o===60?(i=!0,o=n.input.charCodeAt(++n.position)):o===33?(l=!0,r="!!",o=n.input.charCodeAt(++n.position)):r="!",e=n.position,i){do o=n.input.charCodeAt(++n.position);while(o!==0&&o!==62);n.position<n.length?(u=n.input.slice(e,n.position),o=n.input.charCodeAt(++n.position)):s(n,"unexpected end of the stream within a verbatim tag")}else{for(;o!==0&&!S(o);)o===33&&(l?s(n,"tag suffix cannot contain exclamation marks"):(r=n.input.slice(e-1,n.position+1),Qn.test(r)||s(n,"named tag handle cannot contain such characters"),l=!0,e=n.position+1)),o=n.input.charCodeAt(++n.position);u=n.input.slice(e,n.position),xi.test(u)&&s(n,"tag suffix cannot contain flow indicator characters")}u&&!zn.test(u)&&s(n,"tag name cannot contain such characters: "+u);try{u=decodeURIComponent(u)}catch{s(n,"tag name is malformed: "+u)}return i?n.tag=u:O.call(n.tagMap,r)?n.tag=n.tagMap[r]+u:r==="!"?n.tag="!"+u:r==="!!"?n.tag="tag:yaml.org,2002:"+u:s(n,'undeclared tag handle "'+r+'"'),!0}function ki(n){var e,i;if(i=n.input.charCodeAt(n.position),i!==38)return!1;for(n.anchor!==null&&s(n,"duplication of an anchor property"),i=n.input.charCodeAt(++n.position),e=n.position;i!==0&&!S(i)&&!D(i);)i=n.input.charCodeAt(++n.position);return n.position===e&&s(n,"name of an anchor node must contain at least one character"),n.anchor=n.input.slice(e,n.position),!0}function Oi(n){var e,i,l;if(l=n.input.charCodeAt(n.position),l!==42)return!1;for(l=n.input.charCodeAt(++n.position),e=n.position;l!==0&&!S(l)&&!D(l);)l=n.input.charCodeAt(++n.position);return n.position===e&&s(n,"name of an alias node must contain at least one character"),i=n.input.slice(e,n.position),O.call(n.anchorMap,i)||s(n,'unidentified alias "'+i+'"'),n.result=n.anchorMap[i],y(n,!0,-1),!0}function H(n,e,i,l,r){var u,o,a,c=1,f=!1,p=!1,t,h,d,m,x,v;if(n.listener!==null&&n.listener("open",n),n.tag=null,n.anchor=null,n.kind=null,n.result=null,u=o=a=G===i||$n===i,l&&y(n,!0,-1)&&(f=!0,n.lineIndent>e?c=1:n.lineIndent===e?c=0:n.lineIndent<e&&(c=-1)),c===1)for(;Ii(n)||ki(n);)y(n,!0,-1)?(f=!0,a=u,n.lineIndent>e?c=1:n.lineIndent===e?c=0:n.lineIndent<e&&(c=-1)):a=!1;if(a&&(a=f||r),(c===1||G===i)&&(K===i||Wn===i?x=e:x=e+1,v=n.position-n.lineStart,c===1?a&&(gn(n,v)||Ti(n,v,x))||Ei(n,x)?p=!0:(o&&Fi(n,x)||Ci(n,x)||Si(n,x)?p=!0:Oi(n)?(p=!0,(n.tag!==null||n.anchor!==null)&&s(n,"alias node should not have any properties")):_i(n,x,K===i)&&(p=!0,n.tag===null&&(n.tag="?")),n.anchor!==null&&(n.anchorMap[n.anchor]=n.result)):c===0&&(p=a&&gn(n,v))),n.tag===null)n.anchor!==null&&(n.anchorMap[n.anchor]=n.result);else if(n.tag==="?"){for(n.result!==null&&n.kind!=="scalar"&&s(n,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+n.kind+'"'),t=0,h=n.implicitTypes.length;t<h;t+=1)if(m=n.implicitTypes[t],m.resolve(n.result)){n.result=m.construct(n.result),n.tag=m.tag,n.anchor!==null&&(n.anchorMap[n.anchor]=n.result);break}}else if(n.tag!=="!"){if(O.call(n.typeMap[n.kind||"fallback"],n.tag))m=n.typeMap[n.kind||"fallback"][n.tag];else for(m=null,d=n.typeMap.multi[n.kind||"fallback"],t=0,h=d.length;t<h;t+=1)if(n.tag.slice(0,d[t].tag.length)===d[t].tag){m=d[t];break}m||s(n,"unknown tag !<"+n.tag+">"),n.result!==null&&m.kind!==n.kind&&s(n,"unacceptable node kind for !<"+n.tag+'> tag; it should be "'+m.kind+'", not "'+n.kind+'"'),m.resolve(n.result,n.tag)?(n.result=m.construct(n.result,n.tag),n.anchor!==null&&(n.anchorMap[n.anchor]=n.result)):s(n,"cannot resolve a node with !<"+n.tag+"> explicit tag")}return n.listener!==null&&n.listener("close",n),n.tag!==null||n.anchor!==null||p}function Li(n){var e=n.position,i,l,r,u=!1,o;for(n.version=null,n.checkLineBreaks=n.legacy,n.tagMap=Object.create(null),n.anchorMap=Object.create(null);(o=n.input.charCodeAt(n.position))!==0&&(y(n,!0,-1),o=n.input.charCodeAt(n.position),!(n.lineIndent>0||o!==37));){for(u=!0,o=n.input.charCodeAt(++n.position),i=n.position;o!==0&&!S(o);)o=n.input.charCodeAt(++n.position);for(l=n.input.slice(i,n.position),r=[],l.length<1&&s(n,"directive name must not be less than one character in length");o!==0;){for(;L(o);)o=n.input.charCodeAt(++n.position);if(o===35){do o=n.input.charCodeAt(++n.position);while(o!==0&&!T(o));break}if(T(o))break;for(i=n.position;o!==0&&!S(o);)o=n.input.charCodeAt(++n.position);r.push(n.input.slice(i,n.position))}o!==0&&un(n),O.call(dn,l)?dn[l](n,l,r):q(n,'unknown document directive "'+l+'"')}if(y(n,!0,-1),n.lineIndent===0&&n.input.charCodeAt(n.position)===45&&n.input.charCodeAt(n.position+1)===45&&n.input.charCodeAt(n.position+2)===45?(n.position+=3,y(n,!0,-1)):u&&s(n,"directives end mark is expected"),H(n,n.lineIndent-1,G,!1,!0),y(n,!0,-1),n.checkLineBreaks&&gi.test(n.input.slice(e,n.position))&&q(n,"non-ASCII line breaks are interpreted as content"),n.documents.push(n.result),n.position===n.lineStart&&Q(n)){n.input.charCodeAt(n.position)===46&&(n.position+=3,y(n,!0,-1));return}if(n.position<n.length-1)s(n,"end of the stream or a document separator is expected");else return}function ne(n,e){n=String(n),e=e||{},n.length!==0&&(n.charCodeAt(n.length-1)!==10&&n.charCodeAt(n.length-1)!==13&&(n+=`
`),n.charCodeAt(0)===65279&&(n=n.slice(1)));var i=new wi(n,e),l=n.indexOf("\0");for(l!==-1&&(i.position=l,s(i,"null byte is not allowed in input")),i.input+="\0";i.input.charCodeAt(i.position)===32;)i.lineIndent+=1,i.position+=1;for(;i.position<i.length-1;)Li(i);return i.documents}function Ni(n,e,i){e!==null&&typeof e=="object"&&typeof i>"u"&&(i=e,e=null);var l=ne(n,i);if(typeof e!="function")return l;for(var r=0,u=l.length;r<u;r+=1)e(l[r])}function Mi(n,e){var i=ne(n,e);if(i.length!==0){if(i.length===1)return i[0];throw new C("expected a single document in the stream, but found more")}}var Di=Ni,Ri=Mi,ee={loadAll:Di,load:Ri},ie=Object.prototype.toString,re=Object.prototype.hasOwnProperty,cn=65279,Hi=9,j=10,Yi=13,Bi=32,ji=33,Pi=34,J=35,Ui=37,Ki=38,Gi=39,qi=42,le=44,Wi=45,W=58,$i=61,Qi=62,zi=63,Zi=64,oe=91,ue=93,Vi=96,ae=123,Xi=124,ce=125,_={};_[0]="\\0";_[7]="\\a";_[8]="\\b";_[9]="\\t";_[10]="\\n";_[11]="\\v";_[12]="\\f";_[13]="\\r";_[27]="\\e";_[34]='\\"';_[92]="\\\\";_[133]="\\N";_[160]="\\_";_[8232]="\\L";_[8233]="\\P";var Ji=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],nr=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function er(n,e){var i,l,r,u,o,a,c;if(e===null)return{};for(i={},l=Object.keys(e),r=0,u=l.length;r<u;r+=1)o=l[r],a=String(e[o]),o.slice(0,2)==="!!"&&(o="tag:yaml.org,2002:"+o.slice(2)),c=n.compiledTypeMap.fallback[o],c&&re.call(c.styleAliases,a)&&(a=c.styleAliases[a]),i[o]=a;return i}function ir(n){var e,i,l;if(e=n.toString(16).toUpperCase(),n<=255)i="x",l=2;else if(n<=65535)i="u",l=4;else if(n<=4294967295)i="U",l=8;else throw new C("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+i+b.repeat("0",l-e.length)+e}var rr=1,P=2;function lr(n){this.schema=n.schema||on,this.indent=Math.max(1,n.indent||2),this.noArrayIndent=n.noArrayIndent||!1,this.skipInvalid=n.skipInvalid||!1,this.flowLevel=b.isNothing(n.flowLevel)?-1:n.flowLevel,this.styleMap=er(this.schema,n.styles||null),this.sortKeys=n.sortKeys||!1,this.lineWidth=n.lineWidth||80,this.noRefs=n.noRefs||!1,this.noCompatMode=n.noCompatMode||!1,this.condenseFlow=n.condenseFlow||!1,this.quotingType=n.quotingType==='"'?P:rr,this.forceQuotes=n.forceQuotes||!1,this.replacer=typeof n.replacer=="function"?n.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function xn(n,e){for(var i=b.repeat(" ",e),l=0,r=-1,u="",o,a=n.length;l<a;)r=n.indexOf(`
`,l),r===-1?(o=n.slice(l),l=a):(o=n.slice(l,r+1),l=r+1),o.length&&o!==`
`&&(u+=i),u+=o;return u}function nn(n,e){return`
`+b.repeat(" ",n.indent*e)}function or(n,e){var i,l,r;for(i=0,l=n.implicitTypes.length;i<l;i+=1)if(r=n.implicitTypes[i],r.resolve(e))return!0;return!1}function $(n){return n===Bi||n===Hi}function U(n){return 32<=n&&n<=126||161<=n&&n<=55295&&n!==8232&&n!==8233||57344<=n&&n<=65533&&n!==cn||65536<=n&&n<=1114111}function vn(n){return U(n)&&n!==cn&&n!==Yi&&n!==j}function An(n,e,i){var l=vn(n),r=l&&!$(n);return(i?l:l&&n!==le&&n!==oe&&n!==ue&&n!==ae&&n!==ce)&&n!==J&&!(e===W&&!r)||vn(e)&&!$(e)&&n===J||e===W&&r}function ur(n){return U(n)&&n!==cn&&!$(n)&&n!==Wi&&n!==zi&&n!==W&&n!==le&&n!==oe&&n!==ue&&n!==ae&&n!==ce&&n!==J&&n!==Ki&&n!==qi&&n!==ji&&n!==Xi&&n!==$i&&n!==Qi&&n!==Gi&&n!==Pi&&n!==Ui&&n!==Zi&&n!==Vi}function ar(n){return!$(n)&&n!==W}function Y(n,e){var i=n.charCodeAt(e),l;return i>=55296&&i<=56319&&e+1<n.length&&(l=n.charCodeAt(e+1),l>=56320&&l<=57343)?(i-55296)*1024+l-56320+65536:i}function fe(n){var e=/^\n* /;return e.test(n)}var te=1,en=2,pe=3,se=4,M=5;function cr(n,e,i,l,r,u,o,a){var c,f=0,p=null,t=!1,h=!1,d=l!==-1,m=-1,x=ur(Y(n,0))&&ar(Y(n,n.length-1));if(e||o)for(c=0;c<n.length;f>=65536?c+=2:c++){if(f=Y(n,c),!U(f))return M;x=x&&An(f,p,a),p=f}else{for(c=0;c<n.length;f>=65536?c+=2:c++){if(f=Y(n,c),f===j)t=!0,d&&(h=h||c-m-1>l&&n[m+1]!==" ",m=c);else if(!U(f))return M;x=x&&An(f,p,a),p=f}h=h||d&&c-m-1>l&&n[m+1]!==" "}return!t&&!h?x&&!o&&!r(n)?te:u===P?M:en:i>9&&fe(n)?M:o?u===P?M:en:h?se:pe}function fr(n,e,i,l,r){n.dump=(function(){if(e.length===0)return n.quotingType===P?'""':"''";if(!n.noCompatMode&&(Ji.indexOf(e)!==-1||nr.test(e)))return n.quotingType===P?'"'+e+'"':"'"+e+"'";var u=n.indent*Math.max(1,i),o=n.lineWidth===-1?-1:Math.max(Math.min(n.lineWidth,40),n.lineWidth-u),a=l||n.flowLevel>-1&&i>=n.flowLevel;function c(f){return or(n,f)}switch(cr(e,a,n.indent,o,c,n.quotingType,n.forceQuotes&&!l,r)){case te:return e;case en:return"'"+e.replace(/'/g,"''")+"'";case pe:return"|"+yn(e,n.indent)+bn(xn(e,u));case se:return">"+yn(e,n.indent)+bn(xn(tr(e,o),u));case M:return'"'+pr(e)+'"';default:throw new C("impossible error: invalid scalar style")}})()}function yn(n,e){var i=fe(n)?String(e):"",l=n[n.length-1]===`
`,r=l&&(n[n.length-2]===`
`||n===`
`),u=r?"+":l?"":"-";return i+u+`
`}function bn(n){return n[n.length-1]===`
`?n.slice(0,-1):n}function tr(n,e){for(var i=/(\n+)([^\n]*)/g,l=(function(){var f=n.indexOf(`
`);return f=f!==-1?f:n.length,i.lastIndex=f,wn(n.slice(0,f),e)})(),r=n[0]===`
`||n[0]===" ",u,o;o=i.exec(n);){var a=o[1],c=o[2];u=c[0]===" ",l+=a+(!r&&!u&&c!==""?`
`:"")+wn(c,e),r=u}return l}function wn(n,e){if(n===""||n[0]===" ")return n;for(var i=/ [^ ]/g,l,r=0,u,o=0,a=0,c="";l=i.exec(n);)a=l.index,a-r>e&&(u=o>r?o:a,c+=`
`+n.slice(r,u),r=u+1),o=a;return c+=`
`,n.length-r>e&&o>r?c+=n.slice(r,o)+`
`+n.slice(o+1):c+=n.slice(r),c.slice(1)}function pr(n){for(var e="",i=0,l,r=0;r<n.length;i>=65536?r+=2:r++)i=Y(n,r),l=_[i],!l&&U(i)?(e+=n[r],i>=65536&&(e+=n[r+1])):e+=l||ir(i);return e}function sr(n,e,i){var l="",r=n.tag,u,o,a;for(u=0,o=i.length;u<o;u+=1)a=i[u],n.replacer&&(a=n.replacer.call(i,String(u),a)),(I(n,e,a,!1,!1)||typeof a>"u"&&I(n,e,null,!1,!1))&&(l!==""&&(l+=","+(n.condenseFlow?"":" ")),l+=n.dump);n.tag=r,n.dump="["+l+"]"}function _n(n,e,i,l){var r="",u=n.tag,o,a,c;for(o=0,a=i.length;o<a;o+=1)c=i[o],n.replacer&&(c=n.replacer.call(i,String(o),c)),(I(n,e+1,c,!0,!0,!1,!0)||typeof c>"u"&&I(n,e+1,null,!0,!0,!1,!0))&&((!l||r!=="")&&(r+=nn(n,e)),n.dump&&j===n.dump.charCodeAt(0)?r+="-":r+="- ",r+=n.dump);n.tag=u,n.dump=r||"[]"}function hr(n,e,i){var l="",r=n.tag,u=Object.keys(i),o,a,c,f,p;for(o=0,a=u.length;o<a;o+=1)p="",l!==""&&(p+=", "),n.condenseFlow&&(p+='"'),c=u[o],f=i[c],n.replacer&&(f=n.replacer.call(i,c,f)),I(n,e,c,!1,!1)&&(n.dump.length>1024&&(p+="? "),p+=n.dump+(n.condenseFlow?'"':"")+":"+(n.condenseFlow?"":" "),I(n,e,f,!1,!1)&&(p+=n.dump,l+=p));n.tag=r,n.dump="{"+l+"}"}function dr(n,e,i,l){var r="",u=n.tag,o=Object.keys(i),a,c,f,p,t,h;if(n.sortKeys===!0)o.sort();else if(typeof n.sortKeys=="function")o.sort(n.sortKeys);else if(n.sortKeys)throw new C("sortKeys must be a boolean or a function");for(a=0,c=o.length;a<c;a+=1)h="",(!l||r!=="")&&(h+=nn(n,e)),f=o[a],p=i[f],n.replacer&&(p=n.replacer.call(i,f,p)),I(n,e+1,f,!0,!0,!0)&&(t=n.tag!==null&&n.tag!=="?"||n.dump&&n.dump.length>1024,t&&(n.dump&&j===n.dump.charCodeAt(0)?h+="?":h+="? "),h+=n.dump,t&&(h+=nn(n,e)),I(n,e+1,p,!0,t)&&(n.dump&&j===n.dump.charCodeAt(0)?h+=":":h+=": ",h+=n.dump,r+=h));n.tag=u,n.dump=r||"{}"}function Cn(n,e,i){var l,r,u,o,a,c;for(r=i?n.explicitTypes:n.implicitTypes,u=0,o=r.length;u<o;u+=1)if(a=r[u],(a.instanceOf||a.predicate)&&(!a.instanceOf||typeof e=="object"&&e instanceof a.instanceOf)&&(!a.predicate||a.predicate(e))){if(i?a.multi&&a.representName?n.tag=a.representName(e):n.tag=a.tag:n.tag="?",a.represent){if(c=n.styleMap[a.tag]||a.defaultStyle,ie.call(a.represent)==="[object Function]")l=a.represent(e,c);else if(re.call(a.represent,c))l=a.represent[c](e,c);else throw new C("!<"+a.tag+'> tag resolver accepts not "'+c+'" style');n.dump=l}return!0}return!1}function I(n,e,i,l,r,u,o){n.tag=null,n.dump=i,Cn(n,i,!1)||Cn(n,i,!0);var a=ie.call(n.dump),c=l,f;l&&(l=n.flowLevel<0||n.flowLevel>e);var p=a==="[object Object]"||a==="[object Array]",t,h;if(p&&(t=n.duplicates.indexOf(i),h=t!==-1),(n.tag!==null&&n.tag!=="?"||h||n.indent!==2&&e>0)&&(r=!1),h&&n.usedDuplicates[t])n.dump="*ref_"+t;else{if(p&&h&&!n.usedDuplicates[t]&&(n.usedDuplicates[t]=!0),a==="[object Object]")l&&Object.keys(n.dump).length!==0?(dr(n,e,n.dump,r),h&&(n.dump="&ref_"+t+n.dump)):(hr(n,e,n.dump),h&&(n.dump="&ref_"+t+" "+n.dump));else if(a==="[object Array]")l&&n.dump.length!==0?(n.noArrayIndent&&!o&&e>0?_n(n,e-1,n.dump,r):_n(n,e,n.dump,r),h&&(n.dump="&ref_"+t+n.dump)):(sr(n,e,n.dump),h&&(n.dump="&ref_"+t+" "+n.dump));else if(a==="[object String]")n.tag!=="?"&&fr(n,n.dump,e,u,c);else{if(a==="[object Undefined]")return!1;if(n.skipInvalid)return!1;throw new C("unacceptable kind of an object to dump "+a)}n.tag!==null&&n.tag!=="?"&&(f=encodeURI(n.tag[0]==="!"?n.tag.slice(1):n.tag).replace(/!/g,"%21"),n.tag[0]==="!"?f="!"+f:f.slice(0,18)==="tag:yaml.org,2002:"?f="!!"+f.slice(18):f="!<"+f+">",n.dump=f+" "+n.dump)}return!0}function mr(n,e){var i=[],l=[],r,u;for(rn(n,i,l),r=0,u=l.length;r<u;r+=1)e.duplicates.push(i[l[r]]);e.usedDuplicates=new Array(u)}function rn(n,e,i){var l,r,u;if(n!==null&&typeof n=="object")if(r=e.indexOf(n),r!==-1)i.indexOf(r)===-1&&i.push(r);else if(e.push(n),Array.isArray(n))for(r=0,u=n.length;r<u;r+=1)rn(n[r],e,i);else for(l=Object.keys(n),r=0,u=l.length;r<u;r+=1)rn(n[l[r]],e,i)}function gr(n,e){e=e||{};var i=new lr(e);i.noRefs||mr(n,i);var l=n;return i.replacer&&(l=i.replacer.call({"":l},"",l)),I(i,0,l,!0,!0)?i.dump+`
`:""}var xr=gr,vr={dump:xr};function fn(n,e){return function(){throw new Error("Function yaml."+n+" is removed in js-yaml 4. Use yaml."+e+" instead, which is now safe by default.")}}var Ar=w,yr=Fn,br=On,wr=Rn,_r=Hn,Cr=on,Sr=ee.load,Er=ee.loadAll,Fr=vr.dump,Tr=C,Ir={binary:Un,float:Dn,map:kn,null:Ln,pairs:Gn,set:qn,timestamp:jn,bool:Nn,int:Mn,merge:Pn,omap:Kn,seq:In,str:Tn},kr=fn("safeLoad","load"),Or=fn("safeLoadAll","loadAll"),Lr=fn("safeDump","dump"),Nr={Type:Ar,Schema:yr,FAILSAFE_SCHEMA:br,JSON_SCHEMA:wr,CORE_SCHEMA:_r,DEFAULT_SCHEMA:Cr,load:Sr,loadAll:Er,dump:Fr,YAMLException:Tr,types:Ir,safeLoad:kr,safeLoadAll:Or,safeDump:Lr},F=(n=>(n[n.Home=0]="Home",n[n.Archive=1]="Archive",n[n.Projects=2]="Projects",n[n.Skills=3]="Skills",n[n.Timeline=4]="Timeline",n[n.Diary=5]="Diary",n[n.Albums=6]="Albums",n[n.Anime=7]="Anime",n[n.About=8]="About",n[n.Friends=9]="Friends",n))(F||{});const Mr=`# 站点配置
site:
    # 站点 URL（以斜杠结尾）
    siteURL: "https://swrited.github.io/"
    # 站点标题
    title: "swrited"
    # 站点副标题
    subtitle: "Inni，亦是「因你」"
    # 语言配置
    lang: "zh-Hans"
    # 翻译配置
    translate:
        # 启用翻译功能
        enable: false
        # 翻译服务
        service: "client.edge"
        # 显示语言选择下拉框
        showSelectTag: false
        # 自动检测用户语言
        autoDiscriminate: true
        # 翻译时忽略的 CSS 类名
        ignoreClasses:
            - "ignore"
            - "banner-title"
            - "banner-subtitle"
        # 翻译时忽略的 HTML 标签
        ignoreTags:
            - "script"
            - "style"
            - "code"
            - "pre"
    # 时区配置
    timeZone: 8
    # 字体配置
    font:
        # 示例字体配置 - Zen Maru Gothic
        "Example - ZenMaruGothic":
            # 字体源 (字体 CSS 链接 | 字体文件路径)
            src: "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic&display=swap"
            # 字体名 (font-family)
            family: "Zen Maru Gothic"
    # 主题色配置
    themeColor:
        # 主题色的默认色相 (范围从 0 到 360。例如：红色：0，青色：200，蓝绿色：250，粉色：345)
        hue: 255
    # 默认主题 ("system" 跟随系统 | "light" 浅色 | "dark" 深色)
    defaultTheme: "dark"
    # 壁纸配置
    wallpaper:
        # 模式 ("banner" 横幅 | "fullscreen" 全屏 | "none" 纯色)
        mode: "banner"
        # 图片源配置 (fullscreen 和 banner 模式共享)
        src:
            # 桌面壁纸图片 (相对于 /public 目录; 支持单张图片或图片数组，当数组长度 > 1 时自动启用轮播)
            desktop:
                - "/images/wallpapers/微信图片_20260513211826_111_47.webp"
                - "/images/wallpapers/微信图片_20260513211828_112_47.webp"
                - "/images/wallpapers/微信图片_20260513211829_113_47.webp"
                - "/images/wallpapers/微信图片_20260513211831_114_47.webp"
                - "/images/wallpapers/微信图片_20260513211834_115_47.webp"
                - "/images/wallpapers/微信图片_20260513211837_116_47.webp"
            # 移动壁纸图片 (相对于 /public 目录; 支持单张图片或图片数组，当数组长度 > 1 时自动启用轮播)
            mobile:
                - "/images/wallpapers/微信图片_20260513211826_111_47.webp"
                - "/images/wallpapers/微信图片_20260513211828_112_47.webp"
                - "/images/wallpapers/微信图片_20260513211829_113_47.webp"
                - "/images/wallpapers/微信图片_20260513211831_114_47.webp"
                - "/images/wallpapers/微信图片_20260513211834_115_47.webp"
                - "/images/wallpapers/微信图片_20260513211837_116_47.webp"
        # 壁纸位置 ('top' | 'center' | 'bottom')
        position: "center"
        # 轮播配置 (fullscreen 和 banner 模式共享)
        carousel:
            # 为多张图片启用轮播，否则随机显示一张图片
            enable: false
            # 轮播间隔时间 (秒)
            interval: 6.0
            # 启用 Ken Burns 效果
            kenBurns: false
        # Banner 模式专属配置
        banner:
            # 横幅文本配置
            homeText:
                # 在主页显示文本
                enable: true
                # 主标题
                title: "swrited"
                # 副标题，支持单个字符串或字符串数组
                subtitle:
                    - "Inni，亦是「因你」"
                # 副标题打字机效果
                typewriter:
                    # 启用副标题打字机效果
                    enable: true
                    # 打字速度 (毫秒)
                    speed: 111
                    # 删除速度 (毫秒)
                    deleteSpeed: 51
                    # 完全显示后的暂停时间 (毫秒)
                    pauseTime: 3000
            # 横幅图片来源文本
            credit:
                # 显示横幅图片来源文本
                enable: false
                # 要显示的来源文本
                text: "Describe"
                # (可选) 原始艺术品或艺术家页面的 URL 链接
                url: ""
            # 导航栏配置
            navbar:
                # 导航栏透明模式 ("semi" 半透明加圆角 | "full" 完全透明 | "semifull" 动态透明)
                transparentMode: "semifull"
            # 水波纹效果配置
            waves:
                # 启用水波纹效果
                enable: true
                # 启用性能模式 (简化波浪效果以提升性能)
                performanceMode: false
        # Fullscreen 模式专属配置
        fullscreen:
            # 层级
            zIndex: -1
            # 壁纸透明度，0-1之间
            opacity: 0.9
            # 背景模糊程度 (像素值)
            blur: 1
            # 导航栏透明模式
            navbar:
                transparentMode: "semi"
    # 加载页配置
    loadingOverlay:
        # 是否启用加载页
        enable: true
        # 是否等待所有资源 (如图片、样式表) 加载完成
        waitForAllResources: true
        # 加载标题配置
        title:
            # 是否启用加载标题
            enable: true
            # 加载标题文本
            content: "LOADING"
            # 动画周期 (s)
            interval: 1.5
        # 加载动画配置
        spinner:
            # 是否启用加载动画
            enable: true
            # 动画周期 (s)
            interval: 1.5
    # favicon 配置
    favicon: []
    # bangumi 配置
    bangumi:
        # 用户 ID
        userId: "your-bangumi-id"
    # OpenGraph 配置
    generateOgImages: false

# 统计配置
analytics:
    # 是否启用统计
    enabled: false
    # 统计平台
    platform: "umami"
    # Umami 统计配置
    umami:
        # Umami API 地址
        baseUrl: "https://api.umami.is"
        # API 密钥
        apiKey: ''
        # Tracking code
        code: ''

# 导航栏配置
navbar:
    # 链接配置 (链接预设位于 src/constants/link-presets.ts 的 LinkPresets)
    links:
        - # 一级导航链接 - 主页 (预设)
            "Home"
        - # 一级导航链接 - 归档 (预设)
            "Archive"
        - # 一级导航链接 - 友链 (预设)
            "Friends"
        - # 一级导航链接 - Showcase
            name: "Showcase"
            url: "/showcase/"
            icon: "material-symbols:collections-bookmark"
            description: "A collection of my works and experiments."
            children:
                - # 子项 - Live2D 模型
                    name: "Live2D"
                    url: "/showcase/live2d/"
                    icon: "material-symbols:face-6"
                    image: "/images/inni/showcase-cover.png"
                    description: "Interactive Live2D Cubism models I have created."

# 侧边栏配置
sidebar:
    # 侧边栏组件配置列表 (侧栏组件预设位于 src/types/config.ts 的 WidgetComponentType)
    components:
        # 左侧侧边栏
        left:
            - # 组件 - 资料 (预设)
                # 类型
                type: "profile"
                # 位置策略 ("top" 顶部固定 | "sticky" 粘性)
                position: "top"
                # 页面可见性配置
                visibility:
                    # 匹配模式：'include' (包含), 'exclude' (排除)
                    mode: "exclude"
                    # 页面路径匹配规则列表 (支持正则字符串)
                    paths: ["^/posts/", "^/archive"]
            - # 组件 - 目录 (预设)
                # 类型
                type: "directory"
                # 位置策略 ("top" 顶部固定 | "sticky" 粘性)
                position: "sticky"
            - # 组件 - 文章类别 (预设)
                # 类型
                type: "categories"
                # 位置策略 ("top" 顶部固定 | "sticky" 粘性)
                position: "sticky"
                # 响应式配置
                responsive:
                    # 折叠阈值
                    collapseThreshold: 5
                # 目录深度
                depth: 3
            - # 组件 - 文章标签 (预设)
                # 类型
                type: "tags"
                # 位置策略 ("top" 顶部固定 | "sticky" 粘性)
                position: "sticky"
                # 响应式配置
                responsive:
                    # 折叠阈值
                    collapseThreshold: 20
        # 右侧侧边栏
        right:
            - # 组件 - 公告 (预设)
                # 类型
                type: "announcement"
                # 位置策略 ("top" 顶部固定 | "sticky" 粘性)
                position: "top"
                # 页面可见性配置
                visibility:
                    # 匹配模式：'include' (包含), 'exclude' (排除)
                    mode: "include"
                    # 页面路径匹配规则列表 (支持正则字符串)
                    paths: ["^/$"]
            - # 组件 - 文章目录 (预设)
                # 类型
                type: "toc"
                # 位置策略 ("top" 顶部固定 | "sticky" 粘性)
                position: "sticky"
                # 目录深度 (1-6，1 表示只显示 h1 标题，2 表示显示 h1 和 h2 标题，依此类推)
                depth: 3
            - # 组件 - 文章统计 (预设)
                # 类型
                type: "statistics"
                # 位置策略 ("top" 顶部固定 | "sticky" 粘性)
                position: "sticky"
                # 页面可见性配置
                visibility:
                    # 匹配模式：'include' (包含), 'exclude' (排除)
                    mode: "include"
                    # 页面路径匹配规则列表 (支持正则字符串)
                    paths: ["^/$", "^/archive$"]

# 资料配置
profile:
    # 头像配置 (相对于 /public 目录)
    avatar: "/images/inni/swrited-avatar.webp"
    # 信息配置
    name: "swrited"
    # 简介配置
    bio: "路还长，慢慢走"
    # 链接配置
    links:
        - # 链接示例
            # 名字
            name: "GitHub"
            # 图标
            icon: "fa6-brands:github"
            # 链接
            url: "https://github.com/swrited"

# 公告配置
announcement:
    # 公告标题
    title: "公告"
    # 公告内容（支持 HTML，使用 set:html 渲染）
    content: |
        <p>你好呀，欢迎来到这里。</p>
        <p>这里记录着代码、想法、研究，还有一只名叫 Inni 的小狐狸。</p>
        <p>希望你能找到属于自己的故事。</p>
    # 允许用户关闭公告
    closable: true
    # 链接配置
    link:
        # 启用链接
        enable: false
        # 链接文本
        text: "Learn More"
        # 链接 URL
        url: "/about/"
        # 是否外部链接
        external: false

# 文章配置
post:
    # 显示“上次编辑”卡片
    showLastModified: true
    # 代码高亮配置
    expressiveCode:
        # 主题
        theme: "github-dark"
    # 许可证配置
    license:
        # 启用许可证
        enable: true
        # 许可证名称
        name: "CC BY-NC-SA 4.0"
        # 许可证链接
        url: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
    # 评论配置
    comment:
        # 启用评论功能
        enable: false
        # Twikoo 评论系统配置
        twikoo:
            # 环境 ID
            envId: "https://twikoo.vercel.app"
            # 语言
            lang: "en"

# 页脚配置
footer:
    # 启用 Footer HTML 注入功能
    enable: false
    # 自定义 HTML 内容，用于添加备案号等信息
    customHtml: ""

# 粒子特效配置
particle:
    # 启用粒子特效
    enable: true
    # 粒子数量
    particleNum: 12
    # 粒子越界限制次数，-1为无限循环
    limitTimes: -1
    # 粒子尺寸配置
    size:
        # 粒子最小尺寸倍数
        min: 0.3
        # 粒子最大尺寸倍数
        max: 0.9
    # 粒子透明度配置
    opacity:
        # 粒子最小不透明度
        min: 0.3
        # 粒子最大不透明度
        max: 0.9
    # 粒子移动速度配置
    speed:
        # 水平移动速度
        horizontal:
            # 最小值
            min: -0.9
            # 最大值
            max: 0.9
        # 垂直移动速度
        vertical:
            # 最小值
            min: 0.15
            # 最大值
            max: 0.3
        # 旋转速度
        rotation: 0.12
        # 消失速度
        fadeSpeed: 0.12
    # 粒子层级
    zIndex: 100

# 音乐播放器配置
musicPlayer:
    # 启用音乐播放器功能
    enable: false
    # 默认模式 ("meting" API | "local" 本地)
    mode: "meting"
    # meting 模式专属配置
    meting:
        # Meting API 地址
        meting_api: "https://meting.spr-aachen.com/api"
        # 音乐平台
        server: "netease"
        # 类型 ("playlist" 歌单 | "song" 单曲)
        type: "playlist"
        # 资源 ID
        id: "2161912966"
    # local 模式专属配置
    local:
        # 播放列表
        playlist:
            - # 列表示例
                # 序号
                id: 1
                # 标题
                title: "深海之息"
                # 作者
                artist: "Youzee Music"
                # 封面
                cover: "https://p1.music.126.net/PhKOqFtljgHDDpKYM2ADUA==/109951169858309716.jpg"
                # 音乐路径
                url: "assets/music/深海之息.m4a"
                # 歌词路径
                lrc: "assets/music/深海之息.lrc"
                # 时长
                duration: 146
    # 是否自动播放
    autoplay: true

# 看板娘配置
pio:
    # 启用看板娘
    enable: false
    # 模型文件路径
    models:
        - "/pio/models/pio/model.json"
    # 看板娘位置
    position: "left"
    # 看板娘宽度
    width: 280
    # 看板娘高度
    height: 250
    # 展现模式
    mode: "draggable"
    # 是否在移动设备上隐藏
    hiddenOnMobile: true
    # 对话框配置
    dialog:
        # 欢迎词
        welcome: "Welcome!"
        # 触摸提示
        touch:
            - "What are you doing?"
            - "Stop touching me!"
            - "Don't bully me like that!"
            - "(｡í _ ì｡)"
        # 首页提示
        home: "Click here to go back to homepage!"
        # 换装提示
        skin:
            - "Want to see my new outfit?"
            - "The new outfit looks great~"
        # 关闭提示
        close: "See you next time~"
        # 关于链接
        link: "https://nav.kungal.org"`,A=Nr.load(Mr),Dr={Home:F.Home,Archive:F.Archive,Projects:F.Projects,Skills:F.Skills,Timeline:F.Timeline,Diary:F.Diary,Albums:F.Albums,Anime:F.Anime,About:F.About,Friends:F.Friends},he=n=>{if(typeof n=="string"){const i=Dr[n];if(i===void 0)throw new Error(`Unknown LinkPreset: ${n}`);return i}if(typeof n=="number")return n;const e=n.children?.map(he);return e?{...n,children:e}:n},Rr=n=>n.map(he);({...A.post,comment:A.post.comment.twikoo?{...A.post.comment,twikoo:{...A.post.comment.twikoo,lang:A.post.comment.twikoo.lang??A.site.lang}}:A.post.comment});const Hr=A.site;A.analytics.enabled,A.analytics.platform,A.analytics.umami.apiKey,A.analytics.umami.baseUrl,A.analytics.umami.code;Rr(A.navbar.links);const Yr=A.sidebar;A.profile;A.announcement;A.footer;const Br=A.particle,jr=A.musicPlayer,Pr=A.pio;export{F as L,Yr as a,Br as b,jr as m,Pr as p,Hr as s};
