(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const h of l.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();function cy(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var zh={exports:{}},ga={},Bh={exports:{}},ke={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xm;function F0(){if(xm)return ke;xm=1;var r=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),h=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),_=Symbol.for("react.memo"),E=Symbol.for("react.lazy"),R=Symbol.iterator;function O(V){return V===null||typeof V!="object"?null:(V=R&&V[R]||V["@@iterator"],typeof V=="function"?V:null)}var j={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},q=Object.assign,Q={};function B(V,$,he){this.props=V,this.context=$,this.refs=Q,this.updater=he||j}B.prototype.isReactComponent={},B.prototype.setState=function(V,$){if(typeof V!="object"&&typeof V!="function"&&V!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,V,$,"setState")},B.prototype.forceUpdate=function(V){this.updater.enqueueForceUpdate(this,V,"forceUpdate")};function ce(){}ce.prototype=B.prototype;function _e(V,$,he){this.props=V,this.context=$,this.refs=Q,this.updater=he||j}var de=_e.prototype=new ce;de.constructor=_e,q(de,B.prototype),de.isPureReactComponent=!0;var fe=Array.isArray,Re=Object.prototype.hasOwnProperty,X={current:null},C={key:!0,ref:!0,__self:!0,__source:!0};function T(V,$,he){var Se,Ae={},Pe=null,Le=null;if($!=null)for(Se in $.ref!==void 0&&(Le=$.ref),$.key!==void 0&&(Pe=""+$.key),$)Re.call($,Se)&&!C.hasOwnProperty(Se)&&(Ae[Se]=$[Se]);var Me=arguments.length-2;if(Me===1)Ae.children=he;else if(1<Me){for(var $e=Array(Me),Ze=0;Ze<Me;Ze++)$e[Ze]=arguments[Ze+2];Ae.children=$e}if(V&&V.defaultProps)for(Se in Me=V.defaultProps,Me)Ae[Se]===void 0&&(Ae[Se]=Me[Se]);return{$$typeof:r,type:V,key:Pe,ref:Le,props:Ae,_owner:X.current}}function k(V,$){return{$$typeof:r,type:V.type,key:$,ref:V.ref,props:V.props,_owner:V._owner}}function A(V){return typeof V=="object"&&V!==null&&V.$$typeof===r}function D(V){var $={"=":"=0",":":"=2"};return"$"+V.replace(/[=:]/g,function(he){return $[he]})}var b=/\/+/g;function S(V,$){return typeof V=="object"&&V!==null&&V.key!=null?D(""+V.key):$.toString(36)}function Ke(V,$,he,Se,Ae){var Pe=typeof V;(Pe==="undefined"||Pe==="boolean")&&(V=null);var Le=!1;if(V===null)Le=!0;else switch(Pe){case"string":case"number":Le=!0;break;case"object":switch(V.$$typeof){case r:case e:Le=!0}}if(Le)return Le=V,Ae=Ae(Le),V=Se===""?"."+S(Le,0):Se,fe(Ae)?(he="",V!=null&&(he=V.replace(b,"$&/")+"/"),Ke(Ae,$,he,"",function(Ze){return Ze})):Ae!=null&&(A(Ae)&&(Ae=k(Ae,he+(!Ae.key||Le&&Le.key===Ae.key?"":(""+Ae.key).replace(b,"$&/")+"/")+V)),$.push(Ae)),1;if(Le=0,Se=Se===""?".":Se+":",fe(V))for(var Me=0;Me<V.length;Me++){Pe=V[Me];var $e=Se+S(Pe,Me);Le+=Ke(Pe,$,he,$e,Ae)}else if($e=O(V),typeof $e=="function")for(V=$e.call(V),Me=0;!(Pe=V.next()).done;)Pe=Pe.value,$e=Se+S(Pe,Me++),Le+=Ke(Pe,$,he,$e,Ae);else if(Pe==="object")throw $=String(V),Error("Objects are not valid as a React child (found: "+($==="[object Object]"?"object with keys {"+Object.keys(V).join(", ")+"}":$)+"). If you meant to render a collection of children, use an array instead.");return Le}function _t(V,$,he){if(V==null)return V;var Se=[],Ae=0;return Ke(V,Se,"","",function(Pe){return $.call(he,Pe,Ae++)}),Se}function At(V){if(V._status===-1){var $=V._result;$=$(),$.then(function(he){(V._status===0||V._status===-1)&&(V._status=1,V._result=he)},function(he){(V._status===0||V._status===-1)&&(V._status=2,V._result=he)}),V._status===-1&&(V._status=0,V._result=$)}if(V._status===1)return V._result.default;throw V._result}var je={current:null},ee={transition:null},pe={ReactCurrentDispatcher:je,ReactCurrentBatchConfig:ee,ReactCurrentOwner:X};function ne(){throw Error("act(...) is not supported in production builds of React.")}return ke.Children={map:_t,forEach:function(V,$,he){_t(V,function(){$.apply(this,arguments)},he)},count:function(V){var $=0;return _t(V,function(){$++}),$},toArray:function(V){return _t(V,function($){return $})||[]},only:function(V){if(!A(V))throw Error("React.Children.only expected to receive a single React element child.");return V}},ke.Component=B,ke.Fragment=t,ke.Profiler=o,ke.PureComponent=_e,ke.StrictMode=s,ke.Suspense=g,ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=pe,ke.act=ne,ke.cloneElement=function(V,$,he){if(V==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+V+".");var Se=q({},V.props),Ae=V.key,Pe=V.ref,Le=V._owner;if($!=null){if($.ref!==void 0&&(Pe=$.ref,Le=X.current),$.key!==void 0&&(Ae=""+$.key),V.type&&V.type.defaultProps)var Me=V.type.defaultProps;for($e in $)Re.call($,$e)&&!C.hasOwnProperty($e)&&(Se[$e]=$[$e]===void 0&&Me!==void 0?Me[$e]:$[$e])}var $e=arguments.length-2;if($e===1)Se.children=he;else if(1<$e){Me=Array($e);for(var Ze=0;Ze<$e;Ze++)Me[Ze]=arguments[Ze+2];Se.children=Me}return{$$typeof:r,type:V.type,key:Ae,ref:Pe,props:Se,_owner:Le}},ke.createContext=function(V){return V={$$typeof:h,_currentValue:V,_currentValue2:V,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},V.Provider={$$typeof:l,_context:V},V.Consumer=V},ke.createElement=T,ke.createFactory=function(V){var $=T.bind(null,V);return $.type=V,$},ke.createRef=function(){return{current:null}},ke.forwardRef=function(V){return{$$typeof:p,render:V}},ke.isValidElement=A,ke.lazy=function(V){return{$$typeof:E,_payload:{_status:-1,_result:V},_init:At}},ke.memo=function(V,$){return{$$typeof:_,type:V,compare:$===void 0?null:$}},ke.startTransition=function(V){var $=ee.transition;ee.transition={};try{V()}finally{ee.transition=$}},ke.unstable_act=ne,ke.useCallback=function(V,$){return je.current.useCallback(V,$)},ke.useContext=function(V){return je.current.useContext(V)},ke.useDebugValue=function(){},ke.useDeferredValue=function(V){return je.current.useDeferredValue(V)},ke.useEffect=function(V,$){return je.current.useEffect(V,$)},ke.useId=function(){return je.current.useId()},ke.useImperativeHandle=function(V,$,he){return je.current.useImperativeHandle(V,$,he)},ke.useInsertionEffect=function(V,$){return je.current.useInsertionEffect(V,$)},ke.useLayoutEffect=function(V,$){return je.current.useLayoutEffect(V,$)},ke.useMemo=function(V,$){return je.current.useMemo(V,$)},ke.useReducer=function(V,$,he){return je.current.useReducer(V,$,he)},ke.useRef=function(V){return je.current.useRef(V)},ke.useState=function(V){return je.current.useState(V)},ke.useSyncExternalStore=function(V,$,he){return je.current.useSyncExternalStore(V,$,he)},ke.useTransition=function(){return je.current.useTransition()},ke.version="18.3.1",ke}var Nm;function Pd(){return Nm||(Nm=1,Bh.exports=F0()),Bh.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dm;function U0(){if(Dm)return ga;Dm=1;var r=Pd(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,o=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function h(p,g,_){var E,R={},O=null,j=null;_!==void 0&&(O=""+_),g.key!==void 0&&(O=""+g.key),g.ref!==void 0&&(j=g.ref);for(E in g)s.call(g,E)&&!l.hasOwnProperty(E)&&(R[E]=g[E]);if(p&&p.defaultProps)for(E in g=p.defaultProps,g)R[E]===void 0&&(R[E]=g[E]);return{$$typeof:e,type:p,key:O,ref:j,props:R,_owner:o.current}}return ga.Fragment=t,ga.jsx=h,ga.jsxs=h,ga}var Om;function j0(){return Om||(Om=1,zh.exports=U0()),zh.exports}var x=j0(),te=Pd();const hy=cy(te);var mu={},$h={exports:{}},rn={},Wh={exports:{}},qh={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Vm;function z0(){return Vm||(Vm=1,function(r){function e(ee,pe){var ne=ee.length;ee.push(pe);e:for(;0<ne;){var V=ne-1>>>1,$=ee[V];if(0<o($,pe))ee[V]=pe,ee[ne]=$,ne=V;else break e}}function t(ee){return ee.length===0?null:ee[0]}function s(ee){if(ee.length===0)return null;var pe=ee[0],ne=ee.pop();if(ne!==pe){ee[0]=ne;e:for(var V=0,$=ee.length,he=$>>>1;V<he;){var Se=2*(V+1)-1,Ae=ee[Se],Pe=Se+1,Le=ee[Pe];if(0>o(Ae,ne))Pe<$&&0>o(Le,Ae)?(ee[V]=Le,ee[Pe]=ne,V=Pe):(ee[V]=Ae,ee[Se]=ne,V=Se);else if(Pe<$&&0>o(Le,ne))ee[V]=Le,ee[Pe]=ne,V=Pe;else break e}}return pe}function o(ee,pe){var ne=ee.sortIndex-pe.sortIndex;return ne!==0?ne:ee.id-pe.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;r.unstable_now=function(){return l.now()}}else{var h=Date,p=h.now();r.unstable_now=function(){return h.now()-p}}var g=[],_=[],E=1,R=null,O=3,j=!1,q=!1,Q=!1,B=typeof setTimeout=="function"?setTimeout:null,ce=typeof clearTimeout=="function"?clearTimeout:null,_e=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function de(ee){for(var pe=t(_);pe!==null;){if(pe.callback===null)s(_);else if(pe.startTime<=ee)s(_),pe.sortIndex=pe.expirationTime,e(g,pe);else break;pe=t(_)}}function fe(ee){if(Q=!1,de(ee),!q)if(t(g)!==null)q=!0,At(Re);else{var pe=t(_);pe!==null&&je(fe,pe.startTime-ee)}}function Re(ee,pe){q=!1,Q&&(Q=!1,ce(T),T=-1),j=!0;var ne=O;try{for(de(pe),R=t(g);R!==null&&(!(R.expirationTime>pe)||ee&&!D());){var V=R.callback;if(typeof V=="function"){R.callback=null,O=R.priorityLevel;var $=V(R.expirationTime<=pe);pe=r.unstable_now(),typeof $=="function"?R.callback=$:R===t(g)&&s(g),de(pe)}else s(g);R=t(g)}if(R!==null)var he=!0;else{var Se=t(_);Se!==null&&je(fe,Se.startTime-pe),he=!1}return he}finally{R=null,O=ne,j=!1}}var X=!1,C=null,T=-1,k=5,A=-1;function D(){return!(r.unstable_now()-A<k)}function b(){if(C!==null){var ee=r.unstable_now();A=ee;var pe=!0;try{pe=C(!0,ee)}finally{pe?S():(X=!1,C=null)}}else X=!1}var S;if(typeof _e=="function")S=function(){_e(b)};else if(typeof MessageChannel<"u"){var Ke=new MessageChannel,_t=Ke.port2;Ke.port1.onmessage=b,S=function(){_t.postMessage(null)}}else S=function(){B(b,0)};function At(ee){C=ee,X||(X=!0,S())}function je(ee,pe){T=B(function(){ee(r.unstable_now())},pe)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(ee){ee.callback=null},r.unstable_continueExecution=function(){q||j||(q=!0,At(Re))},r.unstable_forceFrameRate=function(ee){0>ee||125<ee?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):k=0<ee?Math.floor(1e3/ee):5},r.unstable_getCurrentPriorityLevel=function(){return O},r.unstable_getFirstCallbackNode=function(){return t(g)},r.unstable_next=function(ee){switch(O){case 1:case 2:case 3:var pe=3;break;default:pe=O}var ne=O;O=pe;try{return ee()}finally{O=ne}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(ee,pe){switch(ee){case 1:case 2:case 3:case 4:case 5:break;default:ee=3}var ne=O;O=ee;try{return pe()}finally{O=ne}},r.unstable_scheduleCallback=function(ee,pe,ne){var V=r.unstable_now();switch(typeof ne=="object"&&ne!==null?(ne=ne.delay,ne=typeof ne=="number"&&0<ne?V+ne:V):ne=V,ee){case 1:var $=-1;break;case 2:$=250;break;case 5:$=1073741823;break;case 4:$=1e4;break;default:$=5e3}return $=ne+$,ee={id:E++,callback:pe,priorityLevel:ee,startTime:ne,expirationTime:$,sortIndex:-1},ne>V?(ee.sortIndex=ne,e(_,ee),t(g)===null&&ee===t(_)&&(Q?(ce(T),T=-1):Q=!0,je(fe,ne-V))):(ee.sortIndex=$,e(g,ee),q||j||(q=!0,At(Re))),ee},r.unstable_shouldYield=D,r.unstable_wrapCallback=function(ee){var pe=O;return function(){var ne=O;O=pe;try{return ee.apply(this,arguments)}finally{O=ne}}}}(qh)),qh}var bm;function B0(){return bm||(bm=1,Wh.exports=z0()),Wh.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Lm;function $0(){if(Lm)return rn;Lm=1;var r=Pd(),e=B0();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,a=1;a<arguments.length;a++)i+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s=new Set,o={};function l(n,i){h(n,i),h(n+"Capture",i)}function h(n,i){for(o[n]=i,n=0;n<i.length;n++)s.add(i[n])}var p=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),g=Object.prototype.hasOwnProperty,_=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,E={},R={};function O(n){return g.call(R,n)?!0:g.call(E,n)?!1:_.test(n)?R[n]=!0:(E[n]=!0,!1)}function j(n,i,a,c){if(a!==null&&a.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return c?!1:a!==null?!a.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function q(n,i,a,c){if(i===null||typeof i>"u"||j(n,i,a,c))return!0;if(c)return!1;if(a!==null)switch(a.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function Q(n,i,a,c,d,m,v){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=c,this.attributeNamespace=d,this.mustUseProperty=a,this.propertyName=n,this.type=i,this.sanitizeURL=m,this.removeEmptyString=v}var B={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){B[n]=new Q(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];B[i]=new Q(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){B[n]=new Q(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){B[n]=new Q(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){B[n]=new Q(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){B[n]=new Q(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){B[n]=new Q(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){B[n]=new Q(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){B[n]=new Q(n,5,!1,n.toLowerCase(),null,!1,!1)});var ce=/[\-:]([a-z])/g;function _e(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(ce,_e);B[i]=new Q(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(ce,_e);B[i]=new Q(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(ce,_e);B[i]=new Q(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){B[n]=new Q(n,1,!1,n.toLowerCase(),null,!1,!1)}),B.xlinkHref=new Q("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){B[n]=new Q(n,1,!1,n.toLowerCase(),null,!0,!0)});function de(n,i,a,c){var d=B.hasOwnProperty(i)?B[i]:null;(d!==null?d.type!==0:c||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(q(i,a,d,c)&&(a=null),c||d===null?O(i)&&(a===null?n.removeAttribute(i):n.setAttribute(i,""+a)):d.mustUseProperty?n[d.propertyName]=a===null?d.type===3?!1:"":a:(i=d.attributeName,c=d.attributeNamespace,a===null?n.removeAttribute(i):(d=d.type,a=d===3||d===4&&a===!0?"":""+a,c?n.setAttributeNS(c,i,a):n.setAttribute(i,a))))}var fe=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Re=Symbol.for("react.element"),X=Symbol.for("react.portal"),C=Symbol.for("react.fragment"),T=Symbol.for("react.strict_mode"),k=Symbol.for("react.profiler"),A=Symbol.for("react.provider"),D=Symbol.for("react.context"),b=Symbol.for("react.forward_ref"),S=Symbol.for("react.suspense"),Ke=Symbol.for("react.suspense_list"),_t=Symbol.for("react.memo"),At=Symbol.for("react.lazy"),je=Symbol.for("react.offscreen"),ee=Symbol.iterator;function pe(n){return n===null||typeof n!="object"?null:(n=ee&&n[ee]||n["@@iterator"],typeof n=="function"?n:null)}var ne=Object.assign,V;function $(n){if(V===void 0)try{throw Error()}catch(a){var i=a.stack.trim().match(/\n( *(at )?)/);V=i&&i[1]||""}return`
`+V+n}var he=!1;function Se(n,i){if(!n||he)return"";he=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(U){var c=U}Reflect.construct(n,[],i)}else{try{i.call()}catch(U){c=U}n.call(i.prototype)}else{try{throw Error()}catch(U){c=U}n()}}catch(U){if(U&&c&&typeof U.stack=="string"){for(var d=U.stack.split(`
`),m=c.stack.split(`
`),v=d.length-1,I=m.length-1;1<=v&&0<=I&&d[v]!==m[I];)I--;for(;1<=v&&0<=I;v--,I--)if(d[v]!==m[I]){if(v!==1||I!==1)do if(v--,I--,0>I||d[v]!==m[I]){var P=`
`+d[v].replace(" at new "," at ");return n.displayName&&P.includes("<anonymous>")&&(P=P.replace("<anonymous>",n.displayName)),P}while(1<=v&&0<=I);break}}}finally{he=!1,Error.prepareStackTrace=a}return(n=n?n.displayName||n.name:"")?$(n):""}function Ae(n){switch(n.tag){case 5:return $(n.type);case 16:return $("Lazy");case 13:return $("Suspense");case 19:return $("SuspenseList");case 0:case 2:case 15:return n=Se(n.type,!1),n;case 11:return n=Se(n.type.render,!1),n;case 1:return n=Se(n.type,!0),n;default:return""}}function Pe(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case C:return"Fragment";case X:return"Portal";case k:return"Profiler";case T:return"StrictMode";case S:return"Suspense";case Ke:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case D:return(n.displayName||"Context")+".Consumer";case A:return(n._context.displayName||"Context")+".Provider";case b:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case _t:return i=n.displayName||null,i!==null?i:Pe(n.type)||"Memo";case At:i=n._payload,n=n._init;try{return Pe(n(i))}catch{}}return null}function Le(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Pe(i);case 8:return i===T?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function Me(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function $e(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ze(n){var i=$e(n)?"checked":"value",a=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),c=""+n[i];if(!n.hasOwnProperty(i)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var d=a.get,m=a.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return d.call(this)},set:function(v){c=""+v,m.call(this,v)}}),Object.defineProperty(n,i,{enumerable:a.enumerable}),{getValue:function(){return c},setValue:function(v){c=""+v},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function gn(n){n._valueTracker||(n._valueTracker=Ze(n))}function qr(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var a=i.getValue(),c="";return n&&(c=$e(n)?n.checked?"true":"false":n.value),n=c,n!==a?(i.setValue(n),!0):!1}function yn(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function Gt(n,i){var a=i.checked;return ne({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??n._wrapperState.initialChecked})}function _n(n,i){var a=i.defaultValue==null?"":i.defaultValue,c=i.checked!=null?i.checked:i.defaultChecked;a=Me(i.value!=null?i.value:a),n._wrapperState={initialChecked:c,initialValue:a,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function Es(n,i){i=i.checked,i!=null&&de(n,"checked",i,!1)}function Ts(n,i){Es(n,i);var a=Me(i.value),c=i.type;if(a!=null)c==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+a):n.value!==""+a&&(n.value=""+a);else if(c==="submit"||c==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?Li(n,i.type,a):i.hasOwnProperty("defaultValue")&&Li(n,i.type,Me(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function Vo(n,i,a){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var c=i.type;if(!(c!=="submit"&&c!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,a||i===n.value||(n.value=i),n.defaultValue=i}a=n.name,a!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,a!==""&&(n.name=a)}function Li(n,i,a){(i!=="number"||yn(n.ownerDocument)!==n)&&(a==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+a&&(n.defaultValue=""+a))}var Qn=Array.isArray;function Yn(n,i,a,c){if(n=n.options,i){i={};for(var d=0;d<a.length;d++)i["$"+a[d]]=!0;for(a=0;a<n.length;a++)d=i.hasOwnProperty("$"+n[a].value),n[a].selected!==d&&(n[a].selected=d),d&&c&&(n[a].defaultSelected=!0)}else{for(a=""+Me(a),i=null,d=0;d<n.length;d++){if(n[d].value===a){n[d].selected=!0,c&&(n[d].defaultSelected=!0);return}i!==null||n[d].disabled||(i=n[d])}i!==null&&(i.selected=!0)}}function vr(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return ne({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function Hr(n,i){var a=i.value;if(a==null){if(a=i.children,i=i.defaultValue,a!=null){if(i!=null)throw Error(t(92));if(Qn(a)){if(1<a.length)throw Error(t(93));a=a[0]}i=a}i==null&&(i=""),a=i}n._wrapperState={initialValue:Me(a)}}function Mi(n,i){var a=Me(i.value),c=Me(i.defaultValue);a!=null&&(a=""+a,a!==n.value&&(n.value=a),i.defaultValue==null&&n.defaultValue!==a&&(n.defaultValue=a)),c!=null&&(n.defaultValue=""+c)}function Is(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function at(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function lt(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?at(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Xn,Ss=function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,a,c,d){MSApp.execUnsafeLocalFunction(function(){return n(i,a,c,d)})}:n}(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(Xn=Xn||document.createElement("div"),Xn.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=Xn.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function wr(n,i){if(i){var a=n.firstChild;if(a&&a===n.lastChild&&a.nodeType===3){a.nodeValue=i;return}}n.textContent=i}var Kr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Nn=["Webkit","ms","Moz","O"];Object.keys(Kr).forEach(function(n){Nn.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),Kr[i]=Kr[n]})});function As(n,i,a){return i==null||typeof i=="boolean"||i===""?"":a||typeof i!="number"||i===0||Kr.hasOwnProperty(n)&&Kr[n]?(""+i).trim():i+"px"}function ks(n,i){n=n.style;for(var a in i)if(i.hasOwnProperty(a)){var c=a.indexOf("--")===0,d=As(a,i[a],c);a==="float"&&(a="cssFloat"),c?n.setProperty(a,d):n[a]=d}}var Rs=ne({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Cs(n,i){if(i){if(Rs[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function Ps(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Gr=null;function Qr(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var Er=null,Qt=null,vn=null;function Yr(n){if(n=ta(n)){if(typeof Er!="function")throw Error(t(280));var i=n.stateNode;i&&(i=xl(i),Er(n.stateNode,n.type,i))}}function wn(n){Qt?vn?vn.push(n):vn=[n]:Qt=n}function Fi(){if(Qt){var n=Qt,i=vn;if(vn=Qt=null,Yr(n),i)for(n=0;n<i.length;n++)Yr(i[n])}}function Tr(n,i){return n(i)}function kt(){}var et=!1;function an(n,i,a){if(et)return n(i,a);et=!0;try{return Tr(n,i,a)}finally{et=!1,(Qt!==null||vn!==null)&&(kt(),Fi())}}function xe(n,i){var a=n.stateNode;if(a===null)return null;var c=xl(a);if(c===null)return null;a=c[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(n=n.type,c=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!c;break e;default:n=!1}if(n)return null;if(a&&typeof a!="function")throw Error(t(231,i,typeof a));return a}var Jn=!1;if(p)try{var bt={};Object.defineProperty(bt,"passive",{get:function(){Jn=!0}}),window.addEventListener("test",bt,bt),window.removeEventListener("test",bt,bt)}catch{Jn=!1}function En(n,i,a,c,d,m,v,I,P){var U=Array.prototype.slice.call(arguments,3);try{i.apply(a,U)}catch(K){this.onError(K)}}var Ir=!1,xs=null,Dn=!1,bo=null,mc={onError:function(n){Ir=!0,xs=n}};function Ns(n,i,a,c,d,m,v,I,P){Ir=!1,xs=null,En.apply(mc,arguments)}function tl(n,i,a,c,d,m,v,I,P){if(Ns.apply(this,arguments),Ir){if(Ir){var U=xs;Ir=!1,xs=null}else throw Error(t(198));Dn||(Dn=!0,bo=U)}}function On(n){var i=n,a=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,(i.flags&4098)!==0&&(a=i.return),n=i.return;while(n)}return i.tag===3?a:null}function Ui(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function Vn(n){if(On(n)!==n)throw Error(t(188))}function nl(n){var i=n.alternate;if(!i){if(i=On(n),i===null)throw Error(t(188));return i!==n?null:n}for(var a=n,c=i;;){var d=a.return;if(d===null)break;var m=d.alternate;if(m===null){if(c=d.return,c!==null){a=c;continue}break}if(d.child===m.child){for(m=d.child;m;){if(m===a)return Vn(d),n;if(m===c)return Vn(d),i;m=m.sibling}throw Error(t(188))}if(a.return!==c.return)a=d,c=m;else{for(var v=!1,I=d.child;I;){if(I===a){v=!0,a=d,c=m;break}if(I===c){v=!0,c=d,a=m;break}I=I.sibling}if(!v){for(I=m.child;I;){if(I===a){v=!0,a=m,c=d;break}if(I===c){v=!0,c=m,a=d;break}I=I.sibling}if(!v)throw Error(t(189))}}if(a.alternate!==c)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?n:i}function Lo(n){return n=nl(n),n!==null?Ds(n):null}function Ds(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=Ds(n);if(i!==null)return i;n=n.sibling}return null}var Os=e.unstable_scheduleCallback,Mo=e.unstable_cancelCallback,rl=e.unstable_shouldYield,gc=e.unstable_requestPaint,qe=e.unstable_now,il=e.unstable_getCurrentPriorityLevel,ji=e.unstable_ImmediatePriority,Xr=e.unstable_UserBlockingPriority,Tn=e.unstable_NormalPriority,Fo=e.unstable_LowPriority,sl=e.unstable_IdlePriority,zi=null,ln=null;function ol(n){if(ln&&typeof ln.onCommitFiberRoot=="function")try{ln.onCommitFiberRoot(zi,n,void 0,(n.current.flags&128)===128)}catch{}}var Wt=Math.clz32?Math.clz32:ll,Uo=Math.log,al=Math.LN2;function ll(n){return n>>>=0,n===0?32:31-(Uo(n)/al|0)|0}var Vs=64,bs=4194304;function Jr(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function Bi(n,i){var a=n.pendingLanes;if(a===0)return 0;var c=0,d=n.suspendedLanes,m=n.pingedLanes,v=a&268435455;if(v!==0){var I=v&~d;I!==0?c=Jr(I):(m&=v,m!==0&&(c=Jr(m)))}else v=a&~d,v!==0?c=Jr(v):m!==0&&(c=Jr(m));if(c===0)return 0;if(i!==0&&i!==c&&(i&d)===0&&(d=c&-c,m=i&-i,d>=m||d===16&&(m&4194240)!==0))return i;if((c&4)!==0&&(c|=a&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=c;0<i;)a=31-Wt(i),d=1<<a,c|=n[a],i&=~d;return c}function yc(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Sr(n,i){for(var a=n.suspendedLanes,c=n.pingedLanes,d=n.expirationTimes,m=n.pendingLanes;0<m;){var v=31-Wt(m),I=1<<v,P=d[v];P===-1?((I&a)===0||(I&c)!==0)&&(d[v]=yc(I,i)):P<=i&&(n.expiredLanes|=I),m&=~I}}function un(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function $i(){var n=Vs;return Vs<<=1,(Vs&4194240)===0&&(Vs=64),n}function Zr(n){for(var i=[],a=0;31>a;a++)i.push(n);return i}function ei(n,i,a){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-Wt(i),n[i]=a}function We(n,i){var a=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var c=n.eventTimes;for(n=n.expirationTimes;0<a;){var d=31-Wt(a),m=1<<d;i[d]=0,c[d]=-1,n[d]=-1,a&=~m}}function ti(n,i){var a=n.entangledLanes|=i;for(n=n.entanglements;a;){var c=31-Wt(a),d=1<<c;d&i|n[c]&i&&(n[c]|=i),a&=~d}}var Ne=0;function ni(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var ul,Ls,cl,hl,dl,jo=!1,Zn=[],Rt=null,bn=null,Ln=null,ri=new Map,In=new Map,er=[],_c="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function fl(n,i){switch(n){case"focusin":case"focusout":Rt=null;break;case"dragenter":case"dragleave":bn=null;break;case"mouseover":case"mouseout":Ln=null;break;case"pointerover":case"pointerout":ri.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":In.delete(i.pointerId)}}function Yt(n,i,a,c,d,m){return n===null||n.nativeEvent!==m?(n={blockedOn:i,domEventName:a,eventSystemFlags:c,nativeEvent:m,targetContainers:[d]},i!==null&&(i=ta(i),i!==null&&Ls(i)),n):(n.eventSystemFlags|=c,i=n.targetContainers,d!==null&&i.indexOf(d)===-1&&i.push(d),n)}function vc(n,i,a,c,d){switch(i){case"focusin":return Rt=Yt(Rt,n,i,a,c,d),!0;case"dragenter":return bn=Yt(bn,n,i,a,c,d),!0;case"mouseover":return Ln=Yt(Ln,n,i,a,c,d),!0;case"pointerover":var m=d.pointerId;return ri.set(m,Yt(ri.get(m)||null,n,i,a,c,d)),!0;case"gotpointercapture":return m=d.pointerId,In.set(m,Yt(In.get(m)||null,n,i,a,c,d)),!0}return!1}function pl(n){var i=Gi(n.target);if(i!==null){var a=On(i);if(a!==null){if(i=a.tag,i===13){if(i=Ui(a),i!==null){n.blockedOn=i,dl(n.priority,function(){cl(a)});return}}else if(i===3&&a.stateNode.current.memoizedState.isDehydrated){n.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Ar(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var a=Ms(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(a===null){a=n.nativeEvent;var c=new a.constructor(a.type,a);Gr=c,a.target.dispatchEvent(c),Gr=null}else return i=ta(a),i!==null&&Ls(i),n.blockedOn=a,!1;i.shift()}return!0}function Wi(n,i,a){Ar(n)&&a.delete(i)}function ml(){jo=!1,Rt!==null&&Ar(Rt)&&(Rt=null),bn!==null&&Ar(bn)&&(bn=null),Ln!==null&&Ar(Ln)&&(Ln=null),ri.forEach(Wi),In.forEach(Wi)}function Mn(n,i){n.blockedOn===i&&(n.blockedOn=null,jo||(jo=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,ml)))}function Fn(n){function i(d){return Mn(d,n)}if(0<Zn.length){Mn(Zn[0],n);for(var a=1;a<Zn.length;a++){var c=Zn[a];c.blockedOn===n&&(c.blockedOn=null)}}for(Rt!==null&&Mn(Rt,n),bn!==null&&Mn(bn,n),Ln!==null&&Mn(Ln,n),ri.forEach(i),In.forEach(i),a=0;a<er.length;a++)c=er[a],c.blockedOn===n&&(c.blockedOn=null);for(;0<er.length&&(a=er[0],a.blockedOn===null);)pl(a),a.blockedOn===null&&er.shift()}var kr=fe.ReactCurrentBatchConfig,ii=!0;function Xe(n,i,a,c){var d=Ne,m=kr.transition;kr.transition=null;try{Ne=1,zo(n,i,a,c)}finally{Ne=d,kr.transition=m}}function wc(n,i,a,c){var d=Ne,m=kr.transition;kr.transition=null;try{Ne=4,zo(n,i,a,c)}finally{Ne=d,kr.transition=m}}function zo(n,i,a,c){if(ii){var d=Ms(n,i,a,c);if(d===null)Nc(n,i,c,qi,a),fl(n,c);else if(vc(d,n,i,a,c))c.stopPropagation();else if(fl(n,c),i&4&&-1<_c.indexOf(n)){for(;d!==null;){var m=ta(d);if(m!==null&&ul(m),m=Ms(n,i,a,c),m===null&&Nc(n,i,c,qi,a),m===d)break;d=m}d!==null&&c.stopPropagation()}else Nc(n,i,c,null,a)}}var qi=null;function Ms(n,i,a,c){if(qi=null,n=Qr(c),n=Gi(n),n!==null)if(i=On(n),i===null)n=null;else if(a=i.tag,a===13){if(n=Ui(i),n!==null)return n;n=null}else if(a===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return qi=n,null}function Bo(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(il()){case ji:return 1;case Xr:return 4;case Tn:case Fo:return 16;case sl:return 536870912;default:return 16}default:return 16}}var cn=null,Fs=null,Xt=null;function $o(){if(Xt)return Xt;var n,i=Fs,a=i.length,c,d="value"in cn?cn.value:cn.textContent,m=d.length;for(n=0;n<a&&i[n]===d[n];n++);var v=a-n;for(c=1;c<=v&&i[a-c]===d[m-c];c++);return Xt=d.slice(n,1<c?1-c:void 0)}function Us(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function tr(){return!0}function Wo(){return!1}function Ct(n){function i(a,c,d,m,v){this._reactName=a,this._targetInst=d,this.type=c,this.nativeEvent=m,this.target=v,this.currentTarget=null;for(var I in n)n.hasOwnProperty(I)&&(a=n[I],this[I]=a?a(m):m[I]);return this.isDefaultPrevented=(m.defaultPrevented!=null?m.defaultPrevented:m.returnValue===!1)?tr:Wo,this.isPropagationStopped=Wo,this}return ne(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=tr)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=tr)},persist:function(){},isPersistent:tr}),i}var Un={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},js=Ct(Un),nr=ne({},Un,{view:0,detail:0}),Ec=Ct(nr),zs,Rr,si,Hi=ne({},nr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:rr,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==si&&(si&&n.type==="mousemove"?(zs=n.screenX-si.screenX,Rr=n.screenY-si.screenY):Rr=zs=0,si=n),zs)},movementY:function(n){return"movementY"in n?n.movementY:Rr}}),Bs=Ct(Hi),qo=ne({},Hi,{dataTransfer:0}),gl=Ct(qo),$s=ne({},nr,{relatedTarget:0}),Ws=Ct($s),yl=ne({},Un,{animationName:0,elapsedTime:0,pseudoElement:0}),Cr=Ct(yl),_l=ne({},Un,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),vl=Ct(_l),wl=ne({},Un,{data:0}),Ho=Ct(wl),qs={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},qt={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},El={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Tl(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=El[n])?!!i[n]:!1}function rr(){return Tl}var u=ne({},nr,{key:function(n){if(n.key){var i=qs[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=Us(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?qt[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:rr,charCode:function(n){return n.type==="keypress"?Us(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Us(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),f=Ct(u),y=ne({},Hi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),w=Ct(y),L=ne({},nr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:rr}),z=Ct(L),Z=ne({},Un,{propertyName:0,elapsedTime:0,pseudoElement:0}),ze=Ct(Z),ft=ne({},Hi,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),Oe=Ct(ft),vt=[9,13,27,32],ut=p&&"CompositionEvent"in window,Sn=null;p&&"documentMode"in document&&(Sn=document.documentMode);var hn=p&&"TextEvent"in window&&!Sn,Ki=p&&(!ut||Sn&&8<Sn&&11>=Sn),Hs=" ",Sf=!1;function Af(n,i){switch(n){case"keyup":return vt.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function kf(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var Ks=!1;function bv(n,i){switch(n){case"compositionend":return kf(i);case"keypress":return i.which!==32?null:(Sf=!0,Hs);case"textInput":return n=i.data,n===Hs&&Sf?null:n;default:return null}}function Lv(n,i){if(Ks)return n==="compositionend"||!ut&&Af(n,i)?(n=$o(),Xt=Fs=cn=null,Ks=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Ki&&i.locale!=="ko"?null:i.data;default:return null}}var Mv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Rf(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!Mv[n.type]:i==="textarea"}function Cf(n,i,a,c){wn(c),i=Rl(i,"onChange"),0<i.length&&(a=new js("onChange","change",null,a,c),n.push({event:a,listeners:i}))}var Ko=null,Go=null;function Fv(n){Hf(n,0)}function Il(n){var i=Js(n);if(qr(i))return n}function Uv(n,i){if(n==="change")return i}var Pf=!1;if(p){var Tc;if(p){var Ic="oninput"in document;if(!Ic){var xf=document.createElement("div");xf.setAttribute("oninput","return;"),Ic=typeof xf.oninput=="function"}Tc=Ic}else Tc=!1;Pf=Tc&&(!document.documentMode||9<document.documentMode)}function Nf(){Ko&&(Ko.detachEvent("onpropertychange",Df),Go=Ko=null)}function Df(n){if(n.propertyName==="value"&&Il(Go)){var i=[];Cf(i,Go,n,Qr(n)),an(Fv,i)}}function jv(n,i,a){n==="focusin"?(Nf(),Ko=i,Go=a,Ko.attachEvent("onpropertychange",Df)):n==="focusout"&&Nf()}function zv(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Il(Go)}function Bv(n,i){if(n==="click")return Il(i)}function $v(n,i){if(n==="input"||n==="change")return Il(i)}function Wv(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var jn=typeof Object.is=="function"?Object.is:Wv;function Qo(n,i){if(jn(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var a=Object.keys(n),c=Object.keys(i);if(a.length!==c.length)return!1;for(c=0;c<a.length;c++){var d=a[c];if(!g.call(i,d)||!jn(n[d],i[d]))return!1}return!0}function Of(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Vf(n,i){var a=Of(n);n=0;for(var c;a;){if(a.nodeType===3){if(c=n+a.textContent.length,n<=i&&c>=i)return{node:a,offset:i-n};n=c}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Of(a)}}function bf(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?bf(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function Lf(){for(var n=window,i=yn();i instanceof n.HTMLIFrameElement;){try{var a=typeof i.contentWindow.location.href=="string"}catch{a=!1}if(a)n=i.contentWindow;else break;i=yn(n.document)}return i}function Sc(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function qv(n){var i=Lf(),a=n.focusedElem,c=n.selectionRange;if(i!==a&&a&&a.ownerDocument&&bf(a.ownerDocument.documentElement,a)){if(c!==null&&Sc(a)){if(i=c.start,n=c.end,n===void 0&&(n=i),"selectionStart"in a)a.selectionStart=i,a.selectionEnd=Math.min(n,a.value.length);else if(n=(i=a.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var d=a.textContent.length,m=Math.min(c.start,d);c=c.end===void 0?m:Math.min(c.end,d),!n.extend&&m>c&&(d=c,c=m,m=d),d=Vf(a,m);var v=Vf(a,c);d&&v&&(n.rangeCount!==1||n.anchorNode!==d.node||n.anchorOffset!==d.offset||n.focusNode!==v.node||n.focusOffset!==v.offset)&&(i=i.createRange(),i.setStart(d.node,d.offset),n.removeAllRanges(),m>c?(n.addRange(i),n.extend(v.node,v.offset)):(i.setEnd(v.node,v.offset),n.addRange(i)))}}for(i=[],n=a;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<i.length;a++)n=i[a],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Hv=p&&"documentMode"in document&&11>=document.documentMode,Gs=null,Ac=null,Yo=null,kc=!1;function Mf(n,i,a){var c=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;kc||Gs==null||Gs!==yn(c)||(c=Gs,"selectionStart"in c&&Sc(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),Yo&&Qo(Yo,c)||(Yo=c,c=Rl(Ac,"onSelect"),0<c.length&&(i=new js("onSelect","select",null,i,a),n.push({event:i,listeners:c}),i.target=Gs)))}function Sl(n,i){var a={};return a[n.toLowerCase()]=i.toLowerCase(),a["Webkit"+n]="webkit"+i,a["Moz"+n]="moz"+i,a}var Qs={animationend:Sl("Animation","AnimationEnd"),animationiteration:Sl("Animation","AnimationIteration"),animationstart:Sl("Animation","AnimationStart"),transitionend:Sl("Transition","TransitionEnd")},Rc={},Ff={};p&&(Ff=document.createElement("div").style,"AnimationEvent"in window||(delete Qs.animationend.animation,delete Qs.animationiteration.animation,delete Qs.animationstart.animation),"TransitionEvent"in window||delete Qs.transitionend.transition);function Al(n){if(Rc[n])return Rc[n];if(!Qs[n])return n;var i=Qs[n],a;for(a in i)if(i.hasOwnProperty(a)&&a in Ff)return Rc[n]=i[a];return n}var Uf=Al("animationend"),jf=Al("animationiteration"),zf=Al("animationstart"),Bf=Al("transitionend"),$f=new Map,Wf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function oi(n,i){$f.set(n,i),l(i,[n])}for(var Cc=0;Cc<Wf.length;Cc++){var Pc=Wf[Cc],Kv=Pc.toLowerCase(),Gv=Pc[0].toUpperCase()+Pc.slice(1);oi(Kv,"on"+Gv)}oi(Uf,"onAnimationEnd"),oi(jf,"onAnimationIteration"),oi(zf,"onAnimationStart"),oi("dblclick","onDoubleClick"),oi("focusin","onFocus"),oi("focusout","onBlur"),oi(Bf,"onTransitionEnd"),h("onMouseEnter",["mouseout","mouseover"]),h("onMouseLeave",["mouseout","mouseover"]),h("onPointerEnter",["pointerout","pointerover"]),h("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Xo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Qv=new Set("cancel close invalid load scroll toggle".split(" ").concat(Xo));function qf(n,i,a){var c=n.type||"unknown-event";n.currentTarget=a,tl(c,i,void 0,n),n.currentTarget=null}function Hf(n,i){i=(i&4)!==0;for(var a=0;a<n.length;a++){var c=n[a],d=c.event;c=c.listeners;e:{var m=void 0;if(i)for(var v=c.length-1;0<=v;v--){var I=c[v],P=I.instance,U=I.currentTarget;if(I=I.listener,P!==m&&d.isPropagationStopped())break e;qf(d,I,U),m=P}else for(v=0;v<c.length;v++){if(I=c[v],P=I.instance,U=I.currentTarget,I=I.listener,P!==m&&d.isPropagationStopped())break e;qf(d,I,U),m=P}}}if(Dn)throw n=bo,Dn=!1,bo=null,n}function Ge(n,i){var a=i[Mc];a===void 0&&(a=i[Mc]=new Set);var c=n+"__bubble";a.has(c)||(Kf(i,n,2,!1),a.add(c))}function xc(n,i,a){var c=0;i&&(c|=4),Kf(a,n,c,i)}var kl="_reactListening"+Math.random().toString(36).slice(2);function Jo(n){if(!n[kl]){n[kl]=!0,s.forEach(function(a){a!=="selectionchange"&&(Qv.has(a)||xc(a,!1,n),xc(a,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[kl]||(i[kl]=!0,xc("selectionchange",!1,i))}}function Kf(n,i,a,c){switch(Bo(i)){case 1:var d=Xe;break;case 4:d=wc;break;default:d=zo}a=d.bind(null,i,a,n),d=void 0,!Jn||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(d=!0),c?d!==void 0?n.addEventListener(i,a,{capture:!0,passive:d}):n.addEventListener(i,a,!0):d!==void 0?n.addEventListener(i,a,{passive:d}):n.addEventListener(i,a,!1)}function Nc(n,i,a,c,d){var m=c;if((i&1)===0&&(i&2)===0&&c!==null)e:for(;;){if(c===null)return;var v=c.tag;if(v===3||v===4){var I=c.stateNode.containerInfo;if(I===d||I.nodeType===8&&I.parentNode===d)break;if(v===4)for(v=c.return;v!==null;){var P=v.tag;if((P===3||P===4)&&(P=v.stateNode.containerInfo,P===d||P.nodeType===8&&P.parentNode===d))return;v=v.return}for(;I!==null;){if(v=Gi(I),v===null)return;if(P=v.tag,P===5||P===6){c=m=v;continue e}I=I.parentNode}}c=c.return}an(function(){var U=m,K=Qr(a),Y=[];e:{var H=$f.get(n);if(H!==void 0){var re=js,se=n;switch(n){case"keypress":if(Us(a)===0)break e;case"keydown":case"keyup":re=f;break;case"focusin":se="focus",re=Ws;break;case"focusout":se="blur",re=Ws;break;case"beforeblur":case"afterblur":re=Ws;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":re=Bs;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":re=gl;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":re=z;break;case Uf:case jf:case zf:re=Cr;break;case Bf:re=ze;break;case"scroll":re=Ec;break;case"wheel":re=Oe;break;case"copy":case"cut":case"paste":re=vl;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":re=w}var ae=(i&4)!==0,st=!ae&&n==="scroll",M=ae?H!==null?H+"Capture":null:H;ae=[];for(var N=U,F;N!==null;){F=N;var J=F.stateNode;if(F.tag===5&&J!==null&&(F=J,M!==null&&(J=xe(N,M),J!=null&&ae.push(Zo(N,J,F)))),st)break;N=N.return}0<ae.length&&(H=new re(H,se,null,a,K),Y.push({event:H,listeners:ae}))}}if((i&7)===0){e:{if(H=n==="mouseover"||n==="pointerover",re=n==="mouseout"||n==="pointerout",H&&a!==Gr&&(se=a.relatedTarget||a.fromElement)&&(Gi(se)||se[Pr]))break e;if((re||H)&&(H=K.window===K?K:(H=K.ownerDocument)?H.defaultView||H.parentWindow:window,re?(se=a.relatedTarget||a.toElement,re=U,se=se?Gi(se):null,se!==null&&(st=On(se),se!==st||se.tag!==5&&se.tag!==6)&&(se=null)):(re=null,se=U),re!==se)){if(ae=Bs,J="onMouseLeave",M="onMouseEnter",N="mouse",(n==="pointerout"||n==="pointerover")&&(ae=w,J="onPointerLeave",M="onPointerEnter",N="pointer"),st=re==null?H:Js(re),F=se==null?H:Js(se),H=new ae(J,N+"leave",re,a,K),H.target=st,H.relatedTarget=F,J=null,Gi(K)===U&&(ae=new ae(M,N+"enter",se,a,K),ae.target=F,ae.relatedTarget=st,J=ae),st=J,re&&se)t:{for(ae=re,M=se,N=0,F=ae;F;F=Ys(F))N++;for(F=0,J=M;J;J=Ys(J))F++;for(;0<N-F;)ae=Ys(ae),N--;for(;0<F-N;)M=Ys(M),F--;for(;N--;){if(ae===M||M!==null&&ae===M.alternate)break t;ae=Ys(ae),M=Ys(M)}ae=null}else ae=null;re!==null&&Gf(Y,H,re,ae,!1),se!==null&&st!==null&&Gf(Y,st,se,ae,!0)}}e:{if(H=U?Js(U):window,re=H.nodeName&&H.nodeName.toLowerCase(),re==="select"||re==="input"&&H.type==="file")var ue=Uv;else if(Rf(H))if(Pf)ue=$v;else{ue=zv;var ge=jv}else(re=H.nodeName)&&re.toLowerCase()==="input"&&(H.type==="checkbox"||H.type==="radio")&&(ue=Bv);if(ue&&(ue=ue(n,U))){Cf(Y,ue,a,K);break e}ge&&ge(n,H,U),n==="focusout"&&(ge=H._wrapperState)&&ge.controlled&&H.type==="number"&&Li(H,"number",H.value)}switch(ge=U?Js(U):window,n){case"focusin":(Rf(ge)||ge.contentEditable==="true")&&(Gs=ge,Ac=U,Yo=null);break;case"focusout":Yo=Ac=Gs=null;break;case"mousedown":kc=!0;break;case"contextmenu":case"mouseup":case"dragend":kc=!1,Mf(Y,a,K);break;case"selectionchange":if(Hv)break;case"keydown":case"keyup":Mf(Y,a,K)}var ye;if(ut)e:{switch(n){case"compositionstart":var we="onCompositionStart";break e;case"compositionend":we="onCompositionEnd";break e;case"compositionupdate":we="onCompositionUpdate";break e}we=void 0}else Ks?Af(n,a)&&(we="onCompositionEnd"):n==="keydown"&&a.keyCode===229&&(we="onCompositionStart");we&&(Ki&&a.locale!=="ko"&&(Ks||we!=="onCompositionStart"?we==="onCompositionEnd"&&Ks&&(ye=$o()):(cn=K,Fs="value"in cn?cn.value:cn.textContent,Ks=!0)),ge=Rl(U,we),0<ge.length&&(we=new Ho(we,n,null,a,K),Y.push({event:we,listeners:ge}),ye?we.data=ye:(ye=kf(a),ye!==null&&(we.data=ye)))),(ye=hn?bv(n,a):Lv(n,a))&&(U=Rl(U,"onBeforeInput"),0<U.length&&(K=new Ho("onBeforeInput","beforeinput",null,a,K),Y.push({event:K,listeners:U}),K.data=ye))}Hf(Y,i)})}function Zo(n,i,a){return{instance:n,listener:i,currentTarget:a}}function Rl(n,i){for(var a=i+"Capture",c=[];n!==null;){var d=n,m=d.stateNode;d.tag===5&&m!==null&&(d=m,m=xe(n,a),m!=null&&c.unshift(Zo(n,m,d)),m=xe(n,i),m!=null&&c.push(Zo(n,m,d))),n=n.return}return c}function Ys(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function Gf(n,i,a,c,d){for(var m=i._reactName,v=[];a!==null&&a!==c;){var I=a,P=I.alternate,U=I.stateNode;if(P!==null&&P===c)break;I.tag===5&&U!==null&&(I=U,d?(P=xe(a,m),P!=null&&v.unshift(Zo(a,P,I))):d||(P=xe(a,m),P!=null&&v.push(Zo(a,P,I)))),a=a.return}v.length!==0&&n.push({event:i,listeners:v})}var Yv=/\r\n?/g,Xv=/\u0000|\uFFFD/g;function Qf(n){return(typeof n=="string"?n:""+n).replace(Yv,`
`).replace(Xv,"")}function Cl(n,i,a){if(i=Qf(i),Qf(n)!==i&&a)throw Error(t(425))}function Pl(){}var Dc=null,Oc=null;function Vc(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var bc=typeof setTimeout=="function"?setTimeout:void 0,Jv=typeof clearTimeout=="function"?clearTimeout:void 0,Yf=typeof Promise=="function"?Promise:void 0,Zv=typeof queueMicrotask=="function"?queueMicrotask:typeof Yf<"u"?function(n){return Yf.resolve(null).then(n).catch(e0)}:bc;function e0(n){setTimeout(function(){throw n})}function Lc(n,i){var a=i,c=0;do{var d=a.nextSibling;if(n.removeChild(a),d&&d.nodeType===8)if(a=d.data,a==="/$"){if(c===0){n.removeChild(d),Fn(i);return}c--}else a!=="$"&&a!=="$?"&&a!=="$!"||c++;a=d}while(a);Fn(i)}function ai(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function Xf(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="$"||a==="$!"||a==="$?"){if(i===0)return n;i--}else a==="/$"&&i++}n=n.previousSibling}return null}var Xs=Math.random().toString(36).slice(2),ir="__reactFiber$"+Xs,ea="__reactProps$"+Xs,Pr="__reactContainer$"+Xs,Mc="__reactEvents$"+Xs,t0="__reactListeners$"+Xs,n0="__reactHandles$"+Xs;function Gi(n){var i=n[ir];if(i)return i;for(var a=n.parentNode;a;){if(i=a[Pr]||a[ir]){if(a=i.alternate,i.child!==null||a!==null&&a.child!==null)for(n=Xf(n);n!==null;){if(a=n[ir])return a;n=Xf(n)}return i}n=a,a=n.parentNode}return null}function ta(n){return n=n[ir]||n[Pr],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function Js(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function xl(n){return n[ea]||null}var Fc=[],Zs=-1;function li(n){return{current:n}}function Qe(n){0>Zs||(n.current=Fc[Zs],Fc[Zs]=null,Zs--)}function He(n,i){Zs++,Fc[Zs]=n.current,n.current=i}var ui={},Lt=li(ui),Jt=li(!1),Qi=ui;function eo(n,i){var a=n.type.contextTypes;if(!a)return ui;var c=n.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===i)return c.__reactInternalMemoizedMaskedChildContext;var d={},m;for(m in a)d[m]=i[m];return c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=d),d}function Zt(n){return n=n.childContextTypes,n!=null}function Nl(){Qe(Jt),Qe(Lt)}function Jf(n,i,a){if(Lt.current!==ui)throw Error(t(168));He(Lt,i),He(Jt,a)}function Zf(n,i,a){var c=n.stateNode;if(i=i.childContextTypes,typeof c.getChildContext!="function")return a;c=c.getChildContext();for(var d in c)if(!(d in i))throw Error(t(108,Le(n)||"Unknown",d));return ne({},a,c)}function Dl(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||ui,Qi=Lt.current,He(Lt,n),He(Jt,Jt.current),!0}function ep(n,i,a){var c=n.stateNode;if(!c)throw Error(t(169));a?(n=Zf(n,i,Qi),c.__reactInternalMemoizedMergedChildContext=n,Qe(Jt),Qe(Lt),He(Lt,n)):Qe(Jt),He(Jt,a)}var xr=null,Ol=!1,Uc=!1;function tp(n){xr===null?xr=[n]:xr.push(n)}function r0(n){Ol=!0,tp(n)}function ci(){if(!Uc&&xr!==null){Uc=!0;var n=0,i=Ne;try{var a=xr;for(Ne=1;n<a.length;n++){var c=a[n];do c=c(!0);while(c!==null)}xr=null,Ol=!1}catch(d){throw xr!==null&&(xr=xr.slice(n+1)),Os(ji,ci),d}finally{Ne=i,Uc=!1}}return null}var to=[],no=0,Vl=null,bl=0,An=[],kn=0,Yi=null,Nr=1,Dr="";function Xi(n,i){to[no++]=bl,to[no++]=Vl,Vl=n,bl=i}function np(n,i,a){An[kn++]=Nr,An[kn++]=Dr,An[kn++]=Yi,Yi=n;var c=Nr;n=Dr;var d=32-Wt(c)-1;c&=~(1<<d),a+=1;var m=32-Wt(i)+d;if(30<m){var v=d-d%5;m=(c&(1<<v)-1).toString(32),c>>=v,d-=v,Nr=1<<32-Wt(i)+d|a<<d|c,Dr=m+n}else Nr=1<<m|a<<d|c,Dr=n}function jc(n){n.return!==null&&(Xi(n,1),np(n,1,0))}function zc(n){for(;n===Vl;)Vl=to[--no],to[no]=null,bl=to[--no],to[no]=null;for(;n===Yi;)Yi=An[--kn],An[kn]=null,Dr=An[--kn],An[kn]=null,Nr=An[--kn],An[kn]=null}var dn=null,fn=null,Je=!1,zn=null;function rp(n,i){var a=xn(5,null,null,0);a.elementType="DELETED",a.stateNode=i,a.return=n,i=n.deletions,i===null?(n.deletions=[a],n.flags|=16):i.push(a)}function ip(n,i){switch(n.tag){case 5:var a=n.type;return i=i.nodeType!==1||a.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,dn=n,fn=ai(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,dn=n,fn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(a=Yi!==null?{id:Nr,overflow:Dr}:null,n.memoizedState={dehydrated:i,treeContext:a,retryLane:1073741824},a=xn(18,null,null,0),a.stateNode=i,a.return=n,n.child=a,dn=n,fn=null,!0):!1;default:return!1}}function Bc(n){return(n.mode&1)!==0&&(n.flags&128)===0}function $c(n){if(Je){var i=fn;if(i){var a=i;if(!ip(n,i)){if(Bc(n))throw Error(t(418));i=ai(a.nextSibling);var c=dn;i&&ip(n,i)?rp(c,a):(n.flags=n.flags&-4097|2,Je=!1,dn=n)}}else{if(Bc(n))throw Error(t(418));n.flags=n.flags&-4097|2,Je=!1,dn=n}}}function sp(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;dn=n}function Ll(n){if(n!==dn)return!1;if(!Je)return sp(n),Je=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!Vc(n.type,n.memoizedProps)),i&&(i=fn)){if(Bc(n))throw op(),Error(t(418));for(;i;)rp(n,i),i=ai(i.nextSibling)}if(sp(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="/$"){if(i===0){fn=ai(n.nextSibling);break e}i--}else a!=="$"&&a!=="$!"&&a!=="$?"||i++}n=n.nextSibling}fn=null}}else fn=dn?ai(n.stateNode.nextSibling):null;return!0}function op(){for(var n=fn;n;)n=ai(n.nextSibling)}function ro(){fn=dn=null,Je=!1}function Wc(n){zn===null?zn=[n]:zn.push(n)}var i0=fe.ReactCurrentBatchConfig;function na(n,i,a){if(n=a.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var c=a.stateNode}if(!c)throw Error(t(147,n));var d=c,m=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===m?i.ref:(i=function(v){var I=d.refs;v===null?delete I[m]:I[m]=v},i._stringRef=m,i)}if(typeof n!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,n))}return n}function Ml(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function ap(n){var i=n._init;return i(n._payload)}function lp(n){function i(M,N){if(n){var F=M.deletions;F===null?(M.deletions=[N],M.flags|=16):F.push(N)}}function a(M,N){if(!n)return null;for(;N!==null;)i(M,N),N=N.sibling;return null}function c(M,N){for(M=new Map;N!==null;)N.key!==null?M.set(N.key,N):M.set(N.index,N),N=N.sibling;return M}function d(M,N){return M=_i(M,N),M.index=0,M.sibling=null,M}function m(M,N,F){return M.index=F,n?(F=M.alternate,F!==null?(F=F.index,F<N?(M.flags|=2,N):F):(M.flags|=2,N)):(M.flags|=1048576,N)}function v(M){return n&&M.alternate===null&&(M.flags|=2),M}function I(M,N,F,J){return N===null||N.tag!==6?(N=bh(F,M.mode,J),N.return=M,N):(N=d(N,F),N.return=M,N)}function P(M,N,F,J){var ue=F.type;return ue===C?K(M,N,F.props.children,J,F.key):N!==null&&(N.elementType===ue||typeof ue=="object"&&ue!==null&&ue.$$typeof===At&&ap(ue)===N.type)?(J=d(N,F.props),J.ref=na(M,N,F),J.return=M,J):(J=au(F.type,F.key,F.props,null,M.mode,J),J.ref=na(M,N,F),J.return=M,J)}function U(M,N,F,J){return N===null||N.tag!==4||N.stateNode.containerInfo!==F.containerInfo||N.stateNode.implementation!==F.implementation?(N=Lh(F,M.mode,J),N.return=M,N):(N=d(N,F.children||[]),N.return=M,N)}function K(M,N,F,J,ue){return N===null||N.tag!==7?(N=ss(F,M.mode,J,ue),N.return=M,N):(N=d(N,F),N.return=M,N)}function Y(M,N,F){if(typeof N=="string"&&N!==""||typeof N=="number")return N=bh(""+N,M.mode,F),N.return=M,N;if(typeof N=="object"&&N!==null){switch(N.$$typeof){case Re:return F=au(N.type,N.key,N.props,null,M.mode,F),F.ref=na(M,null,N),F.return=M,F;case X:return N=Lh(N,M.mode,F),N.return=M,N;case At:var J=N._init;return Y(M,J(N._payload),F)}if(Qn(N)||pe(N))return N=ss(N,M.mode,F,null),N.return=M,N;Ml(M,N)}return null}function H(M,N,F,J){var ue=N!==null?N.key:null;if(typeof F=="string"&&F!==""||typeof F=="number")return ue!==null?null:I(M,N,""+F,J);if(typeof F=="object"&&F!==null){switch(F.$$typeof){case Re:return F.key===ue?P(M,N,F,J):null;case X:return F.key===ue?U(M,N,F,J):null;case At:return ue=F._init,H(M,N,ue(F._payload),J)}if(Qn(F)||pe(F))return ue!==null?null:K(M,N,F,J,null);Ml(M,F)}return null}function re(M,N,F,J,ue){if(typeof J=="string"&&J!==""||typeof J=="number")return M=M.get(F)||null,I(N,M,""+J,ue);if(typeof J=="object"&&J!==null){switch(J.$$typeof){case Re:return M=M.get(J.key===null?F:J.key)||null,P(N,M,J,ue);case X:return M=M.get(J.key===null?F:J.key)||null,U(N,M,J,ue);case At:var ge=J._init;return re(M,N,F,ge(J._payload),ue)}if(Qn(J)||pe(J))return M=M.get(F)||null,K(N,M,J,ue,null);Ml(N,J)}return null}function se(M,N,F,J){for(var ue=null,ge=null,ye=N,we=N=0,Tt=null;ye!==null&&we<F.length;we++){ye.index>we?(Tt=ye,ye=null):Tt=ye.sibling;var Fe=H(M,ye,F[we],J);if(Fe===null){ye===null&&(ye=Tt);break}n&&ye&&Fe.alternate===null&&i(M,ye),N=m(Fe,N,we),ge===null?ue=Fe:ge.sibling=Fe,ge=Fe,ye=Tt}if(we===F.length)return a(M,ye),Je&&Xi(M,we),ue;if(ye===null){for(;we<F.length;we++)ye=Y(M,F[we],J),ye!==null&&(N=m(ye,N,we),ge===null?ue=ye:ge.sibling=ye,ge=ye);return Je&&Xi(M,we),ue}for(ye=c(M,ye);we<F.length;we++)Tt=re(ye,M,we,F[we],J),Tt!==null&&(n&&Tt.alternate!==null&&ye.delete(Tt.key===null?we:Tt.key),N=m(Tt,N,we),ge===null?ue=Tt:ge.sibling=Tt,ge=Tt);return n&&ye.forEach(function(vi){return i(M,vi)}),Je&&Xi(M,we),ue}function ae(M,N,F,J){var ue=pe(F);if(typeof ue!="function")throw Error(t(150));if(F=ue.call(F),F==null)throw Error(t(151));for(var ge=ue=null,ye=N,we=N=0,Tt=null,Fe=F.next();ye!==null&&!Fe.done;we++,Fe=F.next()){ye.index>we?(Tt=ye,ye=null):Tt=ye.sibling;var vi=H(M,ye,Fe.value,J);if(vi===null){ye===null&&(ye=Tt);break}n&&ye&&vi.alternate===null&&i(M,ye),N=m(vi,N,we),ge===null?ue=vi:ge.sibling=vi,ge=vi,ye=Tt}if(Fe.done)return a(M,ye),Je&&Xi(M,we),ue;if(ye===null){for(;!Fe.done;we++,Fe=F.next())Fe=Y(M,Fe.value,J),Fe!==null&&(N=m(Fe,N,we),ge===null?ue=Fe:ge.sibling=Fe,ge=Fe);return Je&&Xi(M,we),ue}for(ye=c(M,ye);!Fe.done;we++,Fe=F.next())Fe=re(ye,M,we,Fe.value,J),Fe!==null&&(n&&Fe.alternate!==null&&ye.delete(Fe.key===null?we:Fe.key),N=m(Fe,N,we),ge===null?ue=Fe:ge.sibling=Fe,ge=Fe);return n&&ye.forEach(function(M0){return i(M,M0)}),Je&&Xi(M,we),ue}function st(M,N,F,J){if(typeof F=="object"&&F!==null&&F.type===C&&F.key===null&&(F=F.props.children),typeof F=="object"&&F!==null){switch(F.$$typeof){case Re:e:{for(var ue=F.key,ge=N;ge!==null;){if(ge.key===ue){if(ue=F.type,ue===C){if(ge.tag===7){a(M,ge.sibling),N=d(ge,F.props.children),N.return=M,M=N;break e}}else if(ge.elementType===ue||typeof ue=="object"&&ue!==null&&ue.$$typeof===At&&ap(ue)===ge.type){a(M,ge.sibling),N=d(ge,F.props),N.ref=na(M,ge,F),N.return=M,M=N;break e}a(M,ge);break}else i(M,ge);ge=ge.sibling}F.type===C?(N=ss(F.props.children,M.mode,J,F.key),N.return=M,M=N):(J=au(F.type,F.key,F.props,null,M.mode,J),J.ref=na(M,N,F),J.return=M,M=J)}return v(M);case X:e:{for(ge=F.key;N!==null;){if(N.key===ge)if(N.tag===4&&N.stateNode.containerInfo===F.containerInfo&&N.stateNode.implementation===F.implementation){a(M,N.sibling),N=d(N,F.children||[]),N.return=M,M=N;break e}else{a(M,N);break}else i(M,N);N=N.sibling}N=Lh(F,M.mode,J),N.return=M,M=N}return v(M);case At:return ge=F._init,st(M,N,ge(F._payload),J)}if(Qn(F))return se(M,N,F,J);if(pe(F))return ae(M,N,F,J);Ml(M,F)}return typeof F=="string"&&F!==""||typeof F=="number"?(F=""+F,N!==null&&N.tag===6?(a(M,N.sibling),N=d(N,F),N.return=M,M=N):(a(M,N),N=bh(F,M.mode,J),N.return=M,M=N),v(M)):a(M,N)}return st}var io=lp(!0),up=lp(!1),Fl=li(null),Ul=null,so=null,qc=null;function Hc(){qc=so=Ul=null}function Kc(n){var i=Fl.current;Qe(Fl),n._currentValue=i}function Gc(n,i,a){for(;n!==null;){var c=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,c!==null&&(c.childLanes|=i)):c!==null&&(c.childLanes&i)!==i&&(c.childLanes|=i),n===a)break;n=n.return}}function oo(n,i){Ul=n,qc=so=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&i)!==0&&(en=!0),n.firstContext=null)}function Rn(n){var i=n._currentValue;if(qc!==n)if(n={context:n,memoizedValue:i,next:null},so===null){if(Ul===null)throw Error(t(308));so=n,Ul.dependencies={lanes:0,firstContext:n}}else so=so.next=n;return i}var Ji=null;function Qc(n){Ji===null?Ji=[n]:Ji.push(n)}function cp(n,i,a,c){var d=i.interleaved;return d===null?(a.next=a,Qc(i)):(a.next=d.next,d.next=a),i.interleaved=a,Or(n,c)}function Or(n,i){n.lanes|=i;var a=n.alternate;for(a!==null&&(a.lanes|=i),a=n,n=n.return;n!==null;)n.childLanes|=i,a=n.alternate,a!==null&&(a.childLanes|=i),a=n,n=n.return;return a.tag===3?a.stateNode:null}var hi=!1;function Yc(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function hp(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Vr(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function di(n,i,a){var c=n.updateQueue;if(c===null)return null;if(c=c.shared,(be&2)!==0){var d=c.pending;return d===null?i.next=i:(i.next=d.next,d.next=i),c.pending=i,Or(n,a)}return d=c.interleaved,d===null?(i.next=i,Qc(c)):(i.next=d.next,d.next=i),c.interleaved=i,Or(n,a)}function jl(n,i,a){if(i=i.updateQueue,i!==null&&(i=i.shared,(a&4194240)!==0)){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,ti(n,a)}}function dp(n,i){var a=n.updateQueue,c=n.alternate;if(c!==null&&(c=c.updateQueue,a===c)){var d=null,m=null;if(a=a.firstBaseUpdate,a!==null){do{var v={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};m===null?d=m=v:m=m.next=v,a=a.next}while(a!==null);m===null?d=m=i:m=m.next=i}else d=m=i;a={baseState:c.baseState,firstBaseUpdate:d,lastBaseUpdate:m,shared:c.shared,effects:c.effects},n.updateQueue=a;return}n=a.lastBaseUpdate,n===null?a.firstBaseUpdate=i:n.next=i,a.lastBaseUpdate=i}function zl(n,i,a,c){var d=n.updateQueue;hi=!1;var m=d.firstBaseUpdate,v=d.lastBaseUpdate,I=d.shared.pending;if(I!==null){d.shared.pending=null;var P=I,U=P.next;P.next=null,v===null?m=U:v.next=U,v=P;var K=n.alternate;K!==null&&(K=K.updateQueue,I=K.lastBaseUpdate,I!==v&&(I===null?K.firstBaseUpdate=U:I.next=U,K.lastBaseUpdate=P))}if(m!==null){var Y=d.baseState;v=0,K=U=P=null,I=m;do{var H=I.lane,re=I.eventTime;if((c&H)===H){K!==null&&(K=K.next={eventTime:re,lane:0,tag:I.tag,payload:I.payload,callback:I.callback,next:null});e:{var se=n,ae=I;switch(H=i,re=a,ae.tag){case 1:if(se=ae.payload,typeof se=="function"){Y=se.call(re,Y,H);break e}Y=se;break e;case 3:se.flags=se.flags&-65537|128;case 0:if(se=ae.payload,H=typeof se=="function"?se.call(re,Y,H):se,H==null)break e;Y=ne({},Y,H);break e;case 2:hi=!0}}I.callback!==null&&I.lane!==0&&(n.flags|=64,H=d.effects,H===null?d.effects=[I]:H.push(I))}else re={eventTime:re,lane:H,tag:I.tag,payload:I.payload,callback:I.callback,next:null},K===null?(U=K=re,P=Y):K=K.next=re,v|=H;if(I=I.next,I===null){if(I=d.shared.pending,I===null)break;H=I,I=H.next,H.next=null,d.lastBaseUpdate=H,d.shared.pending=null}}while(!0);if(K===null&&(P=Y),d.baseState=P,d.firstBaseUpdate=U,d.lastBaseUpdate=K,i=d.shared.interleaved,i!==null){d=i;do v|=d.lane,d=d.next;while(d!==i)}else m===null&&(d.shared.lanes=0);ts|=v,n.lanes=v,n.memoizedState=Y}}function fp(n,i,a){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var c=n[i],d=c.callback;if(d!==null){if(c.callback=null,c=a,typeof d!="function")throw Error(t(191,d));d.call(c)}}}var ra={},sr=li(ra),ia=li(ra),sa=li(ra);function Zi(n){if(n===ra)throw Error(t(174));return n}function Xc(n,i){switch(He(sa,i),He(ia,n),He(sr,ra),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:lt(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=lt(i,n)}Qe(sr),He(sr,i)}function ao(){Qe(sr),Qe(ia),Qe(sa)}function pp(n){Zi(sa.current);var i=Zi(sr.current),a=lt(i,n.type);i!==a&&(He(ia,n),He(sr,a))}function Jc(n){ia.current===n&&(Qe(sr),Qe(ia))}var tt=li(0);function Bl(n){for(var i=n;i!==null;){if(i.tag===13){var a=i.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var Zc=[];function eh(){for(var n=0;n<Zc.length;n++)Zc[n]._workInProgressVersionPrimary=null;Zc.length=0}var $l=fe.ReactCurrentDispatcher,th=fe.ReactCurrentBatchConfig,es=0,nt=null,pt=null,wt=null,Wl=!1,oa=!1,aa=0,s0=0;function Mt(){throw Error(t(321))}function nh(n,i){if(i===null)return!1;for(var a=0;a<i.length&&a<n.length;a++)if(!jn(n[a],i[a]))return!1;return!0}function rh(n,i,a,c,d,m){if(es=m,nt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,$l.current=n===null||n.memoizedState===null?u0:c0,n=a(c,d),oa){m=0;do{if(oa=!1,aa=0,25<=m)throw Error(t(301));m+=1,wt=pt=null,i.updateQueue=null,$l.current=h0,n=a(c,d)}while(oa)}if($l.current=Kl,i=pt!==null&&pt.next!==null,es=0,wt=pt=nt=null,Wl=!1,i)throw Error(t(300));return n}function ih(){var n=aa!==0;return aa=0,n}function or(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return wt===null?nt.memoizedState=wt=n:wt=wt.next=n,wt}function Cn(){if(pt===null){var n=nt.alternate;n=n!==null?n.memoizedState:null}else n=pt.next;var i=wt===null?nt.memoizedState:wt.next;if(i!==null)wt=i,pt=n;else{if(n===null)throw Error(t(310));pt=n,n={memoizedState:pt.memoizedState,baseState:pt.baseState,baseQueue:pt.baseQueue,queue:pt.queue,next:null},wt===null?nt.memoizedState=wt=n:wt=wt.next=n}return wt}function la(n,i){return typeof i=="function"?i(n):i}function sh(n){var i=Cn(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=pt,d=c.baseQueue,m=a.pending;if(m!==null){if(d!==null){var v=d.next;d.next=m.next,m.next=v}c.baseQueue=d=m,a.pending=null}if(d!==null){m=d.next,c=c.baseState;var I=v=null,P=null,U=m;do{var K=U.lane;if((es&K)===K)P!==null&&(P=P.next={lane:0,action:U.action,hasEagerState:U.hasEagerState,eagerState:U.eagerState,next:null}),c=U.hasEagerState?U.eagerState:n(c,U.action);else{var Y={lane:K,action:U.action,hasEagerState:U.hasEagerState,eagerState:U.eagerState,next:null};P===null?(I=P=Y,v=c):P=P.next=Y,nt.lanes|=K,ts|=K}U=U.next}while(U!==null&&U!==m);P===null?v=c:P.next=I,jn(c,i.memoizedState)||(en=!0),i.memoizedState=c,i.baseState=v,i.baseQueue=P,a.lastRenderedState=c}if(n=a.interleaved,n!==null){d=n;do m=d.lane,nt.lanes|=m,ts|=m,d=d.next;while(d!==n)}else d===null&&(a.lanes=0);return[i.memoizedState,a.dispatch]}function oh(n){var i=Cn(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=a.dispatch,d=a.pending,m=i.memoizedState;if(d!==null){a.pending=null;var v=d=d.next;do m=n(m,v.action),v=v.next;while(v!==d);jn(m,i.memoizedState)||(en=!0),i.memoizedState=m,i.baseQueue===null&&(i.baseState=m),a.lastRenderedState=m}return[m,c]}function mp(){}function gp(n,i){var a=nt,c=Cn(),d=i(),m=!jn(c.memoizedState,d);if(m&&(c.memoizedState=d,en=!0),c=c.queue,ah(vp.bind(null,a,c,n),[n]),c.getSnapshot!==i||m||wt!==null&&wt.memoizedState.tag&1){if(a.flags|=2048,ua(9,_p.bind(null,a,c,d,i),void 0,null),Et===null)throw Error(t(349));(es&30)!==0||yp(a,i,d)}return d}function yp(n,i,a){n.flags|=16384,n={getSnapshot:i,value:a},i=nt.updateQueue,i===null?(i={lastEffect:null,stores:null},nt.updateQueue=i,i.stores=[n]):(a=i.stores,a===null?i.stores=[n]:a.push(n))}function _p(n,i,a,c){i.value=a,i.getSnapshot=c,wp(i)&&Ep(n)}function vp(n,i,a){return a(function(){wp(i)&&Ep(n)})}function wp(n){var i=n.getSnapshot;n=n.value;try{var a=i();return!jn(n,a)}catch{return!0}}function Ep(n){var i=Or(n,1);i!==null&&qn(i,n,1,-1)}function Tp(n){var i=or();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:n},i.queue=n,n=n.dispatch=l0.bind(null,nt,n),[i.memoizedState,n]}function ua(n,i,a,c){return n={tag:n,create:i,destroy:a,deps:c,next:null},i=nt.updateQueue,i===null?(i={lastEffect:null,stores:null},nt.updateQueue=i,i.lastEffect=n.next=n):(a=i.lastEffect,a===null?i.lastEffect=n.next=n:(c=a.next,a.next=n,n.next=c,i.lastEffect=n)),n}function Ip(){return Cn().memoizedState}function ql(n,i,a,c){var d=or();nt.flags|=n,d.memoizedState=ua(1|i,a,void 0,c===void 0?null:c)}function Hl(n,i,a,c){var d=Cn();c=c===void 0?null:c;var m=void 0;if(pt!==null){var v=pt.memoizedState;if(m=v.destroy,c!==null&&nh(c,v.deps)){d.memoizedState=ua(i,a,m,c);return}}nt.flags|=n,d.memoizedState=ua(1|i,a,m,c)}function Sp(n,i){return ql(8390656,8,n,i)}function ah(n,i){return Hl(2048,8,n,i)}function Ap(n,i){return Hl(4,2,n,i)}function kp(n,i){return Hl(4,4,n,i)}function Rp(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function Cp(n,i,a){return a=a!=null?a.concat([n]):null,Hl(4,4,Rp.bind(null,i,n),a)}function lh(){}function Pp(n,i){var a=Cn();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&nh(i,c[1])?c[0]:(a.memoizedState=[n,i],n)}function xp(n,i){var a=Cn();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&nh(i,c[1])?c[0]:(n=n(),a.memoizedState=[n,i],n)}function Np(n,i,a){return(es&21)===0?(n.baseState&&(n.baseState=!1,en=!0),n.memoizedState=a):(jn(a,i)||(a=$i(),nt.lanes|=a,ts|=a,n.baseState=!0),i)}function o0(n,i){var a=Ne;Ne=a!==0&&4>a?a:4,n(!0);var c=th.transition;th.transition={};try{n(!1),i()}finally{Ne=a,th.transition=c}}function Dp(){return Cn().memoizedState}function a0(n,i,a){var c=gi(n);if(a={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null},Op(n))Vp(i,a);else if(a=cp(n,i,a,c),a!==null){var d=Kt();qn(a,n,c,d),bp(a,i,c)}}function l0(n,i,a){var c=gi(n),d={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null};if(Op(n))Vp(i,d);else{var m=n.alternate;if(n.lanes===0&&(m===null||m.lanes===0)&&(m=i.lastRenderedReducer,m!==null))try{var v=i.lastRenderedState,I=m(v,a);if(d.hasEagerState=!0,d.eagerState=I,jn(I,v)){var P=i.interleaved;P===null?(d.next=d,Qc(i)):(d.next=P.next,P.next=d),i.interleaved=d;return}}catch{}finally{}a=cp(n,i,d,c),a!==null&&(d=Kt(),qn(a,n,c,d),bp(a,i,c))}}function Op(n){var i=n.alternate;return n===nt||i!==null&&i===nt}function Vp(n,i){oa=Wl=!0;var a=n.pending;a===null?i.next=i:(i.next=a.next,a.next=i),n.pending=i}function bp(n,i,a){if((a&4194240)!==0){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,ti(n,a)}}var Kl={readContext:Rn,useCallback:Mt,useContext:Mt,useEffect:Mt,useImperativeHandle:Mt,useInsertionEffect:Mt,useLayoutEffect:Mt,useMemo:Mt,useReducer:Mt,useRef:Mt,useState:Mt,useDebugValue:Mt,useDeferredValue:Mt,useTransition:Mt,useMutableSource:Mt,useSyncExternalStore:Mt,useId:Mt,unstable_isNewReconciler:!1},u0={readContext:Rn,useCallback:function(n,i){return or().memoizedState=[n,i===void 0?null:i],n},useContext:Rn,useEffect:Sp,useImperativeHandle:function(n,i,a){return a=a!=null?a.concat([n]):null,ql(4194308,4,Rp.bind(null,i,n),a)},useLayoutEffect:function(n,i){return ql(4194308,4,n,i)},useInsertionEffect:function(n,i){return ql(4,2,n,i)},useMemo:function(n,i){var a=or();return i=i===void 0?null:i,n=n(),a.memoizedState=[n,i],n},useReducer:function(n,i,a){var c=or();return i=a!==void 0?a(i):i,c.memoizedState=c.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},c.queue=n,n=n.dispatch=a0.bind(null,nt,n),[c.memoizedState,n]},useRef:function(n){var i=or();return n={current:n},i.memoizedState=n},useState:Tp,useDebugValue:lh,useDeferredValue:function(n){return or().memoizedState=n},useTransition:function(){var n=Tp(!1),i=n[0];return n=o0.bind(null,n[1]),or().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,a){var c=nt,d=or();if(Je){if(a===void 0)throw Error(t(407));a=a()}else{if(a=i(),Et===null)throw Error(t(349));(es&30)!==0||yp(c,i,a)}d.memoizedState=a;var m={value:a,getSnapshot:i};return d.queue=m,Sp(vp.bind(null,c,m,n),[n]),c.flags|=2048,ua(9,_p.bind(null,c,m,a,i),void 0,null),a},useId:function(){var n=or(),i=Et.identifierPrefix;if(Je){var a=Dr,c=Nr;a=(c&~(1<<32-Wt(c)-1)).toString(32)+a,i=":"+i+"R"+a,a=aa++,0<a&&(i+="H"+a.toString(32)),i+=":"}else a=s0++,i=":"+i+"r"+a.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},c0={readContext:Rn,useCallback:Pp,useContext:Rn,useEffect:ah,useImperativeHandle:Cp,useInsertionEffect:Ap,useLayoutEffect:kp,useMemo:xp,useReducer:sh,useRef:Ip,useState:function(){return sh(la)},useDebugValue:lh,useDeferredValue:function(n){var i=Cn();return Np(i,pt.memoizedState,n)},useTransition:function(){var n=sh(la)[0],i=Cn().memoizedState;return[n,i]},useMutableSource:mp,useSyncExternalStore:gp,useId:Dp,unstable_isNewReconciler:!1},h0={readContext:Rn,useCallback:Pp,useContext:Rn,useEffect:ah,useImperativeHandle:Cp,useInsertionEffect:Ap,useLayoutEffect:kp,useMemo:xp,useReducer:oh,useRef:Ip,useState:function(){return oh(la)},useDebugValue:lh,useDeferredValue:function(n){var i=Cn();return pt===null?i.memoizedState=n:Np(i,pt.memoizedState,n)},useTransition:function(){var n=oh(la)[0],i=Cn().memoizedState;return[n,i]},useMutableSource:mp,useSyncExternalStore:gp,useId:Dp,unstable_isNewReconciler:!1};function Bn(n,i){if(n&&n.defaultProps){i=ne({},i),n=n.defaultProps;for(var a in n)i[a]===void 0&&(i[a]=n[a]);return i}return i}function uh(n,i,a,c){i=n.memoizedState,a=a(c,i),a=a==null?i:ne({},i,a),n.memoizedState=a,n.lanes===0&&(n.updateQueue.baseState=a)}var Gl={isMounted:function(n){return(n=n._reactInternals)?On(n)===n:!1},enqueueSetState:function(n,i,a){n=n._reactInternals;var c=Kt(),d=gi(n),m=Vr(c,d);m.payload=i,a!=null&&(m.callback=a),i=di(n,m,d),i!==null&&(qn(i,n,d,c),jl(i,n,d))},enqueueReplaceState:function(n,i,a){n=n._reactInternals;var c=Kt(),d=gi(n),m=Vr(c,d);m.tag=1,m.payload=i,a!=null&&(m.callback=a),i=di(n,m,d),i!==null&&(qn(i,n,d,c),jl(i,n,d))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var a=Kt(),c=gi(n),d=Vr(a,c);d.tag=2,i!=null&&(d.callback=i),i=di(n,d,c),i!==null&&(qn(i,n,c,a),jl(i,n,c))}};function Lp(n,i,a,c,d,m,v){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(c,m,v):i.prototype&&i.prototype.isPureReactComponent?!Qo(a,c)||!Qo(d,m):!0}function Mp(n,i,a){var c=!1,d=ui,m=i.contextType;return typeof m=="object"&&m!==null?m=Rn(m):(d=Zt(i)?Qi:Lt.current,c=i.contextTypes,m=(c=c!=null)?eo(n,d):ui),i=new i(a,m),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Gl,n.stateNode=i,i._reactInternals=n,c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=d,n.__reactInternalMemoizedMaskedChildContext=m),i}function Fp(n,i,a,c){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(a,c),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(a,c),i.state!==n&&Gl.enqueueReplaceState(i,i.state,null)}function ch(n,i,a,c){var d=n.stateNode;d.props=a,d.state=n.memoizedState,d.refs={},Yc(n);var m=i.contextType;typeof m=="object"&&m!==null?d.context=Rn(m):(m=Zt(i)?Qi:Lt.current,d.context=eo(n,m)),d.state=n.memoizedState,m=i.getDerivedStateFromProps,typeof m=="function"&&(uh(n,i,m,a),d.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(i=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),i!==d.state&&Gl.enqueueReplaceState(d,d.state,null),zl(n,a,d,c),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308)}function lo(n,i){try{var a="",c=i;do a+=Ae(c),c=c.return;while(c);var d=a}catch(m){d=`
Error generating stack: `+m.message+`
`+m.stack}return{value:n,source:i,stack:d,digest:null}}function hh(n,i,a){return{value:n,source:null,stack:a??null,digest:i??null}}function dh(n,i){try{console.error(i.value)}catch(a){setTimeout(function(){throw a})}}var d0=typeof WeakMap=="function"?WeakMap:Map;function Up(n,i,a){a=Vr(-1,a),a.tag=3,a.payload={element:null};var c=i.value;return a.callback=function(){tu||(tu=!0,Rh=c),dh(n,i)},a}function jp(n,i,a){a=Vr(-1,a),a.tag=3;var c=n.type.getDerivedStateFromError;if(typeof c=="function"){var d=i.value;a.payload=function(){return c(d)},a.callback=function(){dh(n,i)}}var m=n.stateNode;return m!==null&&typeof m.componentDidCatch=="function"&&(a.callback=function(){dh(n,i),typeof c!="function"&&(pi===null?pi=new Set([this]):pi.add(this));var v=i.stack;this.componentDidCatch(i.value,{componentStack:v!==null?v:""})}),a}function zp(n,i,a){var c=n.pingCache;if(c===null){c=n.pingCache=new d0;var d=new Set;c.set(i,d)}else d=c.get(i),d===void 0&&(d=new Set,c.set(i,d));d.has(a)||(d.add(a),n=k0.bind(null,n,i,a),i.then(n,n))}function Bp(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function $p(n,i,a,c,d){return(n.mode&1)===0?(n===i?n.flags|=65536:(n.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(i=Vr(-1,1),i.tag=2,di(a,i,1))),a.lanes|=1),n):(n.flags|=65536,n.lanes=d,n)}var f0=fe.ReactCurrentOwner,en=!1;function Ht(n,i,a,c){i.child=n===null?up(i,null,a,c):io(i,n.child,a,c)}function Wp(n,i,a,c,d){a=a.render;var m=i.ref;return oo(i,d),c=rh(n,i,a,c,m,d),a=ih(),n!==null&&!en?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~d,br(n,i,d)):(Je&&a&&jc(i),i.flags|=1,Ht(n,i,c,d),i.child)}function qp(n,i,a,c,d){if(n===null){var m=a.type;return typeof m=="function"&&!Vh(m)&&m.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(i.tag=15,i.type=m,Hp(n,i,m,c,d)):(n=au(a.type,null,c,i,i.mode,d),n.ref=i.ref,n.return=i,i.child=n)}if(m=n.child,(n.lanes&d)===0){var v=m.memoizedProps;if(a=a.compare,a=a!==null?a:Qo,a(v,c)&&n.ref===i.ref)return br(n,i,d)}return i.flags|=1,n=_i(m,c),n.ref=i.ref,n.return=i,i.child=n}function Hp(n,i,a,c,d){if(n!==null){var m=n.memoizedProps;if(Qo(m,c)&&n.ref===i.ref)if(en=!1,i.pendingProps=c=m,(n.lanes&d)!==0)(n.flags&131072)!==0&&(en=!0);else return i.lanes=n.lanes,br(n,i,d)}return fh(n,i,a,c,d)}function Kp(n,i,a){var c=i.pendingProps,d=c.children,m=n!==null?n.memoizedState:null;if(c.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},He(co,pn),pn|=a;else{if((a&1073741824)===0)return n=m!==null?m.baseLanes|a:a,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,He(co,pn),pn|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=m!==null?m.baseLanes:a,He(co,pn),pn|=c}else m!==null?(c=m.baseLanes|a,i.memoizedState=null):c=a,He(co,pn),pn|=c;return Ht(n,i,d,a),i.child}function Gp(n,i){var a=i.ref;(n===null&&a!==null||n!==null&&n.ref!==a)&&(i.flags|=512,i.flags|=2097152)}function fh(n,i,a,c,d){var m=Zt(a)?Qi:Lt.current;return m=eo(i,m),oo(i,d),a=rh(n,i,a,c,m,d),c=ih(),n!==null&&!en?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~d,br(n,i,d)):(Je&&c&&jc(i),i.flags|=1,Ht(n,i,a,d),i.child)}function Qp(n,i,a,c,d){if(Zt(a)){var m=!0;Dl(i)}else m=!1;if(oo(i,d),i.stateNode===null)Yl(n,i),Mp(i,a,c),ch(i,a,c,d),c=!0;else if(n===null){var v=i.stateNode,I=i.memoizedProps;v.props=I;var P=v.context,U=a.contextType;typeof U=="object"&&U!==null?U=Rn(U):(U=Zt(a)?Qi:Lt.current,U=eo(i,U));var K=a.getDerivedStateFromProps,Y=typeof K=="function"||typeof v.getSnapshotBeforeUpdate=="function";Y||typeof v.UNSAFE_componentWillReceiveProps!="function"&&typeof v.componentWillReceiveProps!="function"||(I!==c||P!==U)&&Fp(i,v,c,U),hi=!1;var H=i.memoizedState;v.state=H,zl(i,c,v,d),P=i.memoizedState,I!==c||H!==P||Jt.current||hi?(typeof K=="function"&&(uh(i,a,K,c),P=i.memoizedState),(I=hi||Lp(i,a,I,c,H,P,U))?(Y||typeof v.UNSAFE_componentWillMount!="function"&&typeof v.componentWillMount!="function"||(typeof v.componentWillMount=="function"&&v.componentWillMount(),typeof v.UNSAFE_componentWillMount=="function"&&v.UNSAFE_componentWillMount()),typeof v.componentDidMount=="function"&&(i.flags|=4194308)):(typeof v.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=c,i.memoizedState=P),v.props=c,v.state=P,v.context=U,c=I):(typeof v.componentDidMount=="function"&&(i.flags|=4194308),c=!1)}else{v=i.stateNode,hp(n,i),I=i.memoizedProps,U=i.type===i.elementType?I:Bn(i.type,I),v.props=U,Y=i.pendingProps,H=v.context,P=a.contextType,typeof P=="object"&&P!==null?P=Rn(P):(P=Zt(a)?Qi:Lt.current,P=eo(i,P));var re=a.getDerivedStateFromProps;(K=typeof re=="function"||typeof v.getSnapshotBeforeUpdate=="function")||typeof v.UNSAFE_componentWillReceiveProps!="function"&&typeof v.componentWillReceiveProps!="function"||(I!==Y||H!==P)&&Fp(i,v,c,P),hi=!1,H=i.memoizedState,v.state=H,zl(i,c,v,d);var se=i.memoizedState;I!==Y||H!==se||Jt.current||hi?(typeof re=="function"&&(uh(i,a,re,c),se=i.memoizedState),(U=hi||Lp(i,a,U,c,H,se,P)||!1)?(K||typeof v.UNSAFE_componentWillUpdate!="function"&&typeof v.componentWillUpdate!="function"||(typeof v.componentWillUpdate=="function"&&v.componentWillUpdate(c,se,P),typeof v.UNSAFE_componentWillUpdate=="function"&&v.UNSAFE_componentWillUpdate(c,se,P)),typeof v.componentDidUpdate=="function"&&(i.flags|=4),typeof v.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof v.componentDidUpdate!="function"||I===n.memoizedProps&&H===n.memoizedState||(i.flags|=4),typeof v.getSnapshotBeforeUpdate!="function"||I===n.memoizedProps&&H===n.memoizedState||(i.flags|=1024),i.memoizedProps=c,i.memoizedState=se),v.props=c,v.state=se,v.context=P,c=U):(typeof v.componentDidUpdate!="function"||I===n.memoizedProps&&H===n.memoizedState||(i.flags|=4),typeof v.getSnapshotBeforeUpdate!="function"||I===n.memoizedProps&&H===n.memoizedState||(i.flags|=1024),c=!1)}return ph(n,i,a,c,m,d)}function ph(n,i,a,c,d,m){Gp(n,i);var v=(i.flags&128)!==0;if(!c&&!v)return d&&ep(i,a,!1),br(n,i,m);c=i.stateNode,f0.current=i;var I=v&&typeof a.getDerivedStateFromError!="function"?null:c.render();return i.flags|=1,n!==null&&v?(i.child=io(i,n.child,null,m),i.child=io(i,null,I,m)):Ht(n,i,I,m),i.memoizedState=c.state,d&&ep(i,a,!0),i.child}function Yp(n){var i=n.stateNode;i.pendingContext?Jf(n,i.pendingContext,i.pendingContext!==i.context):i.context&&Jf(n,i.context,!1),Xc(n,i.containerInfo)}function Xp(n,i,a,c,d){return ro(),Wc(d),i.flags|=256,Ht(n,i,a,c),i.child}var mh={dehydrated:null,treeContext:null,retryLane:0};function gh(n){return{baseLanes:n,cachePool:null,transitions:null}}function Jp(n,i,a){var c=i.pendingProps,d=tt.current,m=!1,v=(i.flags&128)!==0,I;if((I=v)||(I=n!==null&&n.memoizedState===null?!1:(d&2)!==0),I?(m=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(d|=1),He(tt,d&1),n===null)return $c(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((i.mode&1)===0?i.lanes=1:n.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(v=c.children,n=c.fallback,m?(c=i.mode,m=i.child,v={mode:"hidden",children:v},(c&1)===0&&m!==null?(m.childLanes=0,m.pendingProps=v):m=lu(v,c,0,null),n=ss(n,c,a,null),m.return=i,n.return=i,m.sibling=n,i.child=m,i.child.memoizedState=gh(a),i.memoizedState=mh,n):yh(i,v));if(d=n.memoizedState,d!==null&&(I=d.dehydrated,I!==null))return p0(n,i,v,c,I,d,a);if(m){m=c.fallback,v=i.mode,d=n.child,I=d.sibling;var P={mode:"hidden",children:c.children};return(v&1)===0&&i.child!==d?(c=i.child,c.childLanes=0,c.pendingProps=P,i.deletions=null):(c=_i(d,P),c.subtreeFlags=d.subtreeFlags&14680064),I!==null?m=_i(I,m):(m=ss(m,v,a,null),m.flags|=2),m.return=i,c.return=i,c.sibling=m,i.child=c,c=m,m=i.child,v=n.child.memoizedState,v=v===null?gh(a):{baseLanes:v.baseLanes|a,cachePool:null,transitions:v.transitions},m.memoizedState=v,m.childLanes=n.childLanes&~a,i.memoizedState=mh,c}return m=n.child,n=m.sibling,c=_i(m,{mode:"visible",children:c.children}),(i.mode&1)===0&&(c.lanes=a),c.return=i,c.sibling=null,n!==null&&(a=i.deletions,a===null?(i.deletions=[n],i.flags|=16):a.push(n)),i.child=c,i.memoizedState=null,c}function yh(n,i){return i=lu({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function Ql(n,i,a,c){return c!==null&&Wc(c),io(i,n.child,null,a),n=yh(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function p0(n,i,a,c,d,m,v){if(a)return i.flags&256?(i.flags&=-257,c=hh(Error(t(422))),Ql(n,i,v,c)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(m=c.fallback,d=i.mode,c=lu({mode:"visible",children:c.children},d,0,null),m=ss(m,d,v,null),m.flags|=2,c.return=i,m.return=i,c.sibling=m,i.child=c,(i.mode&1)!==0&&io(i,n.child,null,v),i.child.memoizedState=gh(v),i.memoizedState=mh,m);if((i.mode&1)===0)return Ql(n,i,v,null);if(d.data==="$!"){if(c=d.nextSibling&&d.nextSibling.dataset,c)var I=c.dgst;return c=I,m=Error(t(419)),c=hh(m,c,void 0),Ql(n,i,v,c)}if(I=(v&n.childLanes)!==0,en||I){if(c=Et,c!==null){switch(v&-v){case 4:d=2;break;case 16:d=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:d=32;break;case 536870912:d=268435456;break;default:d=0}d=(d&(c.suspendedLanes|v))!==0?0:d,d!==0&&d!==m.retryLane&&(m.retryLane=d,Or(n,d),qn(c,n,d,-1))}return Oh(),c=hh(Error(t(421))),Ql(n,i,v,c)}return d.data==="$?"?(i.flags|=128,i.child=n.child,i=R0.bind(null,n),d._reactRetry=i,null):(n=m.treeContext,fn=ai(d.nextSibling),dn=i,Je=!0,zn=null,n!==null&&(An[kn++]=Nr,An[kn++]=Dr,An[kn++]=Yi,Nr=n.id,Dr=n.overflow,Yi=i),i=yh(i,c.children),i.flags|=4096,i)}function Zp(n,i,a){n.lanes|=i;var c=n.alternate;c!==null&&(c.lanes|=i),Gc(n.return,i,a)}function _h(n,i,a,c,d){var m=n.memoizedState;m===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:c,tail:a,tailMode:d}:(m.isBackwards=i,m.rendering=null,m.renderingStartTime=0,m.last=c,m.tail=a,m.tailMode=d)}function em(n,i,a){var c=i.pendingProps,d=c.revealOrder,m=c.tail;if(Ht(n,i,c.children,a),c=tt.current,(c&2)!==0)c=c&1|2,i.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Zp(n,a,i);else if(n.tag===19)Zp(n,a,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}c&=1}if(He(tt,c),(i.mode&1)===0)i.memoizedState=null;else switch(d){case"forwards":for(a=i.child,d=null;a!==null;)n=a.alternate,n!==null&&Bl(n)===null&&(d=a),a=a.sibling;a=d,a===null?(d=i.child,i.child=null):(d=a.sibling,a.sibling=null),_h(i,!1,d,a,m);break;case"backwards":for(a=null,d=i.child,i.child=null;d!==null;){if(n=d.alternate,n!==null&&Bl(n)===null){i.child=d;break}n=d.sibling,d.sibling=a,a=d,d=n}_h(i,!0,a,null,m);break;case"together":_h(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function Yl(n,i){(i.mode&1)===0&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function br(n,i,a){if(n!==null&&(i.dependencies=n.dependencies),ts|=i.lanes,(a&i.childLanes)===0)return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,a=_i(n,n.pendingProps),i.child=a,a.return=i;n.sibling!==null;)n=n.sibling,a=a.sibling=_i(n,n.pendingProps),a.return=i;a.sibling=null}return i.child}function m0(n,i,a){switch(i.tag){case 3:Yp(i),ro();break;case 5:pp(i);break;case 1:Zt(i.type)&&Dl(i);break;case 4:Xc(i,i.stateNode.containerInfo);break;case 10:var c=i.type._context,d=i.memoizedProps.value;He(Fl,c._currentValue),c._currentValue=d;break;case 13:if(c=i.memoizedState,c!==null)return c.dehydrated!==null?(He(tt,tt.current&1),i.flags|=128,null):(a&i.child.childLanes)!==0?Jp(n,i,a):(He(tt,tt.current&1),n=br(n,i,a),n!==null?n.sibling:null);He(tt,tt.current&1);break;case 19:if(c=(a&i.childLanes)!==0,(n.flags&128)!==0){if(c)return em(n,i,a);i.flags|=128}if(d=i.memoizedState,d!==null&&(d.rendering=null,d.tail=null,d.lastEffect=null),He(tt,tt.current),c)break;return null;case 22:case 23:return i.lanes=0,Kp(n,i,a)}return br(n,i,a)}var tm,vh,nm,rm;tm=function(n,i){for(var a=i.child;a!==null;){if(a.tag===5||a.tag===6)n.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===i)break;for(;a.sibling===null;){if(a.return===null||a.return===i)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},vh=function(){},nm=function(n,i,a,c){var d=n.memoizedProps;if(d!==c){n=i.stateNode,Zi(sr.current);var m=null;switch(a){case"input":d=Gt(n,d),c=Gt(n,c),m=[];break;case"select":d=ne({},d,{value:void 0}),c=ne({},c,{value:void 0}),m=[];break;case"textarea":d=vr(n,d),c=vr(n,c),m=[];break;default:typeof d.onClick!="function"&&typeof c.onClick=="function"&&(n.onclick=Pl)}Cs(a,c);var v;a=null;for(U in d)if(!c.hasOwnProperty(U)&&d.hasOwnProperty(U)&&d[U]!=null)if(U==="style"){var I=d[U];for(v in I)I.hasOwnProperty(v)&&(a||(a={}),a[v]="")}else U!=="dangerouslySetInnerHTML"&&U!=="children"&&U!=="suppressContentEditableWarning"&&U!=="suppressHydrationWarning"&&U!=="autoFocus"&&(o.hasOwnProperty(U)?m||(m=[]):(m=m||[]).push(U,null));for(U in c){var P=c[U];if(I=d?.[U],c.hasOwnProperty(U)&&P!==I&&(P!=null||I!=null))if(U==="style")if(I){for(v in I)!I.hasOwnProperty(v)||P&&P.hasOwnProperty(v)||(a||(a={}),a[v]="");for(v in P)P.hasOwnProperty(v)&&I[v]!==P[v]&&(a||(a={}),a[v]=P[v])}else a||(m||(m=[]),m.push(U,a)),a=P;else U==="dangerouslySetInnerHTML"?(P=P?P.__html:void 0,I=I?I.__html:void 0,P!=null&&I!==P&&(m=m||[]).push(U,P)):U==="children"?typeof P!="string"&&typeof P!="number"||(m=m||[]).push(U,""+P):U!=="suppressContentEditableWarning"&&U!=="suppressHydrationWarning"&&(o.hasOwnProperty(U)?(P!=null&&U==="onScroll"&&Ge("scroll",n),m||I===P||(m=[])):(m=m||[]).push(U,P))}a&&(m=m||[]).push("style",a);var U=m;(i.updateQueue=U)&&(i.flags|=4)}},rm=function(n,i,a,c){a!==c&&(i.flags|=4)};function ca(n,i){if(!Je)switch(n.tailMode){case"hidden":i=n.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?n.tail=null:a.sibling=null;break;case"collapsed":a=n.tail;for(var c=null;a!==null;)a.alternate!==null&&(c=a),a=a.sibling;c===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:c.sibling=null}}function Ft(n){var i=n.alternate!==null&&n.alternate.child===n.child,a=0,c=0;if(i)for(var d=n.child;d!==null;)a|=d.lanes|d.childLanes,c|=d.subtreeFlags&14680064,c|=d.flags&14680064,d.return=n,d=d.sibling;else for(d=n.child;d!==null;)a|=d.lanes|d.childLanes,c|=d.subtreeFlags,c|=d.flags,d.return=n,d=d.sibling;return n.subtreeFlags|=c,n.childLanes=a,i}function g0(n,i,a){var c=i.pendingProps;switch(zc(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ft(i),null;case 1:return Zt(i.type)&&Nl(),Ft(i),null;case 3:return c=i.stateNode,ao(),Qe(Jt),Qe(Lt),eh(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(n===null||n.child===null)&&(Ll(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,zn!==null&&(xh(zn),zn=null))),vh(n,i),Ft(i),null;case 5:Jc(i);var d=Zi(sa.current);if(a=i.type,n!==null&&i.stateNode!=null)nm(n,i,a,c,d),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!c){if(i.stateNode===null)throw Error(t(166));return Ft(i),null}if(n=Zi(sr.current),Ll(i)){c=i.stateNode,a=i.type;var m=i.memoizedProps;switch(c[ir]=i,c[ea]=m,n=(i.mode&1)!==0,a){case"dialog":Ge("cancel",c),Ge("close",c);break;case"iframe":case"object":case"embed":Ge("load",c);break;case"video":case"audio":for(d=0;d<Xo.length;d++)Ge(Xo[d],c);break;case"source":Ge("error",c);break;case"img":case"image":case"link":Ge("error",c),Ge("load",c);break;case"details":Ge("toggle",c);break;case"input":_n(c,m),Ge("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!m.multiple},Ge("invalid",c);break;case"textarea":Hr(c,m),Ge("invalid",c)}Cs(a,m),d=null;for(var v in m)if(m.hasOwnProperty(v)){var I=m[v];v==="children"?typeof I=="string"?c.textContent!==I&&(m.suppressHydrationWarning!==!0&&Cl(c.textContent,I,n),d=["children",I]):typeof I=="number"&&c.textContent!==""+I&&(m.suppressHydrationWarning!==!0&&Cl(c.textContent,I,n),d=["children",""+I]):o.hasOwnProperty(v)&&I!=null&&v==="onScroll"&&Ge("scroll",c)}switch(a){case"input":gn(c),Vo(c,m,!0);break;case"textarea":gn(c),Is(c);break;case"select":case"option":break;default:typeof m.onClick=="function"&&(c.onclick=Pl)}c=d,i.updateQueue=c,c!==null&&(i.flags|=4)}else{v=d.nodeType===9?d:d.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=at(a)),n==="http://www.w3.org/1999/xhtml"?a==="script"?(n=v.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof c.is=="string"?n=v.createElement(a,{is:c.is}):(n=v.createElement(a),a==="select"&&(v=n,c.multiple?v.multiple=!0:c.size&&(v.size=c.size))):n=v.createElementNS(n,a),n[ir]=i,n[ea]=c,tm(n,i,!1,!1),i.stateNode=n;e:{switch(v=Ps(a,c),a){case"dialog":Ge("cancel",n),Ge("close",n),d=c;break;case"iframe":case"object":case"embed":Ge("load",n),d=c;break;case"video":case"audio":for(d=0;d<Xo.length;d++)Ge(Xo[d],n);d=c;break;case"source":Ge("error",n),d=c;break;case"img":case"image":case"link":Ge("error",n),Ge("load",n),d=c;break;case"details":Ge("toggle",n),d=c;break;case"input":_n(n,c),d=Gt(n,c),Ge("invalid",n);break;case"option":d=c;break;case"select":n._wrapperState={wasMultiple:!!c.multiple},d=ne({},c,{value:void 0}),Ge("invalid",n);break;case"textarea":Hr(n,c),d=vr(n,c),Ge("invalid",n);break;default:d=c}Cs(a,d),I=d;for(m in I)if(I.hasOwnProperty(m)){var P=I[m];m==="style"?ks(n,P):m==="dangerouslySetInnerHTML"?(P=P?P.__html:void 0,P!=null&&Ss(n,P)):m==="children"?typeof P=="string"?(a!=="textarea"||P!=="")&&wr(n,P):typeof P=="number"&&wr(n,""+P):m!=="suppressContentEditableWarning"&&m!=="suppressHydrationWarning"&&m!=="autoFocus"&&(o.hasOwnProperty(m)?P!=null&&m==="onScroll"&&Ge("scroll",n):P!=null&&de(n,m,P,v))}switch(a){case"input":gn(n),Vo(n,c,!1);break;case"textarea":gn(n),Is(n);break;case"option":c.value!=null&&n.setAttribute("value",""+Me(c.value));break;case"select":n.multiple=!!c.multiple,m=c.value,m!=null?Yn(n,!!c.multiple,m,!1):c.defaultValue!=null&&Yn(n,!!c.multiple,c.defaultValue,!0);break;default:typeof d.onClick=="function"&&(n.onclick=Pl)}switch(a){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return Ft(i),null;case 6:if(n&&i.stateNode!=null)rm(n,i,n.memoizedProps,c);else{if(typeof c!="string"&&i.stateNode===null)throw Error(t(166));if(a=Zi(sa.current),Zi(sr.current),Ll(i)){if(c=i.stateNode,a=i.memoizedProps,c[ir]=i,(m=c.nodeValue!==a)&&(n=dn,n!==null))switch(n.tag){case 3:Cl(c.nodeValue,a,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Cl(c.nodeValue,a,(n.mode&1)!==0)}m&&(i.flags|=4)}else c=(a.nodeType===9?a:a.ownerDocument).createTextNode(c),c[ir]=i,i.stateNode=c}return Ft(i),null;case 13:if(Qe(tt),c=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(Je&&fn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)op(),ro(),i.flags|=98560,m=!1;else if(m=Ll(i),c!==null&&c.dehydrated!==null){if(n===null){if(!m)throw Error(t(318));if(m=i.memoizedState,m=m!==null?m.dehydrated:null,!m)throw Error(t(317));m[ir]=i}else ro(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Ft(i),m=!1}else zn!==null&&(xh(zn),zn=null),m=!0;if(!m)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=a,i):(c=c!==null,c!==(n!==null&&n.memoizedState!==null)&&c&&(i.child.flags|=8192,(i.mode&1)!==0&&(n===null||(tt.current&1)!==0?mt===0&&(mt=3):Oh())),i.updateQueue!==null&&(i.flags|=4),Ft(i),null);case 4:return ao(),vh(n,i),n===null&&Jo(i.stateNode.containerInfo),Ft(i),null;case 10:return Kc(i.type._context),Ft(i),null;case 17:return Zt(i.type)&&Nl(),Ft(i),null;case 19:if(Qe(tt),m=i.memoizedState,m===null)return Ft(i),null;if(c=(i.flags&128)!==0,v=m.rendering,v===null)if(c)ca(m,!1);else{if(mt!==0||n!==null&&(n.flags&128)!==0)for(n=i.child;n!==null;){if(v=Bl(n),v!==null){for(i.flags|=128,ca(m,!1),c=v.updateQueue,c!==null&&(i.updateQueue=c,i.flags|=4),i.subtreeFlags=0,c=a,a=i.child;a!==null;)m=a,n=c,m.flags&=14680066,v=m.alternate,v===null?(m.childLanes=0,m.lanes=n,m.child=null,m.subtreeFlags=0,m.memoizedProps=null,m.memoizedState=null,m.updateQueue=null,m.dependencies=null,m.stateNode=null):(m.childLanes=v.childLanes,m.lanes=v.lanes,m.child=v.child,m.subtreeFlags=0,m.deletions=null,m.memoizedProps=v.memoizedProps,m.memoizedState=v.memoizedState,m.updateQueue=v.updateQueue,m.type=v.type,n=v.dependencies,m.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),a=a.sibling;return He(tt,tt.current&1|2),i.child}n=n.sibling}m.tail!==null&&qe()>ho&&(i.flags|=128,c=!0,ca(m,!1),i.lanes=4194304)}else{if(!c)if(n=Bl(v),n!==null){if(i.flags|=128,c=!0,a=n.updateQueue,a!==null&&(i.updateQueue=a,i.flags|=4),ca(m,!0),m.tail===null&&m.tailMode==="hidden"&&!v.alternate&&!Je)return Ft(i),null}else 2*qe()-m.renderingStartTime>ho&&a!==1073741824&&(i.flags|=128,c=!0,ca(m,!1),i.lanes=4194304);m.isBackwards?(v.sibling=i.child,i.child=v):(a=m.last,a!==null?a.sibling=v:i.child=v,m.last=v)}return m.tail!==null?(i=m.tail,m.rendering=i,m.tail=i.sibling,m.renderingStartTime=qe(),i.sibling=null,a=tt.current,He(tt,c?a&1|2:a&1),i):(Ft(i),null);case 22:case 23:return Dh(),c=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==c&&(i.flags|=8192),c&&(i.mode&1)!==0?(pn&1073741824)!==0&&(Ft(i),i.subtreeFlags&6&&(i.flags|=8192)):Ft(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function y0(n,i){switch(zc(i),i.tag){case 1:return Zt(i.type)&&Nl(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return ao(),Qe(Jt),Qe(Lt),eh(),n=i.flags,(n&65536)!==0&&(n&128)===0?(i.flags=n&-65537|128,i):null;case 5:return Jc(i),null;case 13:if(Qe(tt),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));ro()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return Qe(tt),null;case 4:return ao(),null;case 10:return Kc(i.type._context),null;case 22:case 23:return Dh(),null;case 24:return null;default:return null}}var Xl=!1,Ut=!1,_0=typeof WeakSet=="function"?WeakSet:Set,ie=null;function uo(n,i){var a=n.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(c){it(n,i,c)}else a.current=null}function wh(n,i,a){try{a()}catch(c){it(n,i,c)}}var im=!1;function v0(n,i){if(Dc=ii,n=Lf(),Sc(n)){if("selectionStart"in n)var a={start:n.selectionStart,end:n.selectionEnd};else e:{a=(a=n.ownerDocument)&&a.defaultView||window;var c=a.getSelection&&a.getSelection();if(c&&c.rangeCount!==0){a=c.anchorNode;var d=c.anchorOffset,m=c.focusNode;c=c.focusOffset;try{a.nodeType,m.nodeType}catch{a=null;break e}var v=0,I=-1,P=-1,U=0,K=0,Y=n,H=null;t:for(;;){for(var re;Y!==a||d!==0&&Y.nodeType!==3||(I=v+d),Y!==m||c!==0&&Y.nodeType!==3||(P=v+c),Y.nodeType===3&&(v+=Y.nodeValue.length),(re=Y.firstChild)!==null;)H=Y,Y=re;for(;;){if(Y===n)break t;if(H===a&&++U===d&&(I=v),H===m&&++K===c&&(P=v),(re=Y.nextSibling)!==null)break;Y=H,H=Y.parentNode}Y=re}a=I===-1||P===-1?null:{start:I,end:P}}else a=null}a=a||{start:0,end:0}}else a=null;for(Oc={focusedElem:n,selectionRange:a},ii=!1,ie=i;ie!==null;)if(i=ie,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,ie=n;else for(;ie!==null;){i=ie;try{var se=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(se!==null){var ae=se.memoizedProps,st=se.memoizedState,M=i.stateNode,N=M.getSnapshotBeforeUpdate(i.elementType===i.type?ae:Bn(i.type,ae),st);M.__reactInternalSnapshotBeforeUpdate=N}break;case 3:var F=i.stateNode.containerInfo;F.nodeType===1?F.textContent="":F.nodeType===9&&F.documentElement&&F.removeChild(F.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(J){it(i,i.return,J)}if(n=i.sibling,n!==null){n.return=i.return,ie=n;break}ie=i.return}return se=im,im=!1,se}function ha(n,i,a){var c=i.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var d=c=c.next;do{if((d.tag&n)===n){var m=d.destroy;d.destroy=void 0,m!==void 0&&wh(i,a,m)}d=d.next}while(d!==c)}}function Jl(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var a=i=i.next;do{if((a.tag&n)===n){var c=a.create;a.destroy=c()}a=a.next}while(a!==i)}}function Eh(n){var i=n.ref;if(i!==null){var a=n.stateNode;switch(n.tag){case 5:n=a;break;default:n=a}typeof i=="function"?i(n):i.current=n}}function sm(n){var i=n.alternate;i!==null&&(n.alternate=null,sm(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[ir],delete i[ea],delete i[Mc],delete i[t0],delete i[n0])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function om(n){return n.tag===5||n.tag===3||n.tag===4}function am(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||om(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Th(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.nodeType===8?a.parentNode.insertBefore(n,i):a.insertBefore(n,i):(a.nodeType===8?(i=a.parentNode,i.insertBefore(n,a)):(i=a,i.appendChild(n)),a=a._reactRootContainer,a!=null||i.onclick!==null||(i.onclick=Pl));else if(c!==4&&(n=n.child,n!==null))for(Th(n,i,a),n=n.sibling;n!==null;)Th(n,i,a),n=n.sibling}function Ih(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.insertBefore(n,i):a.appendChild(n);else if(c!==4&&(n=n.child,n!==null))for(Ih(n,i,a),n=n.sibling;n!==null;)Ih(n,i,a),n=n.sibling}var Pt=null,$n=!1;function fi(n,i,a){for(a=a.child;a!==null;)lm(n,i,a),a=a.sibling}function lm(n,i,a){if(ln&&typeof ln.onCommitFiberUnmount=="function")try{ln.onCommitFiberUnmount(zi,a)}catch{}switch(a.tag){case 5:Ut||uo(a,i);case 6:var c=Pt,d=$n;Pt=null,fi(n,i,a),Pt=c,$n=d,Pt!==null&&($n?(n=Pt,a=a.stateNode,n.nodeType===8?n.parentNode.removeChild(a):n.removeChild(a)):Pt.removeChild(a.stateNode));break;case 18:Pt!==null&&($n?(n=Pt,a=a.stateNode,n.nodeType===8?Lc(n.parentNode,a):n.nodeType===1&&Lc(n,a),Fn(n)):Lc(Pt,a.stateNode));break;case 4:c=Pt,d=$n,Pt=a.stateNode.containerInfo,$n=!0,fi(n,i,a),Pt=c,$n=d;break;case 0:case 11:case 14:case 15:if(!Ut&&(c=a.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){d=c=c.next;do{var m=d,v=m.destroy;m=m.tag,v!==void 0&&((m&2)!==0||(m&4)!==0)&&wh(a,i,v),d=d.next}while(d!==c)}fi(n,i,a);break;case 1:if(!Ut&&(uo(a,i),c=a.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=a.memoizedProps,c.state=a.memoizedState,c.componentWillUnmount()}catch(I){it(a,i,I)}fi(n,i,a);break;case 21:fi(n,i,a);break;case 22:a.mode&1?(Ut=(c=Ut)||a.memoizedState!==null,fi(n,i,a),Ut=c):fi(n,i,a);break;default:fi(n,i,a)}}function um(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var a=n.stateNode;a===null&&(a=n.stateNode=new _0),i.forEach(function(c){var d=C0.bind(null,n,c);a.has(c)||(a.add(c),c.then(d,d))})}}function Wn(n,i){var a=i.deletions;if(a!==null)for(var c=0;c<a.length;c++){var d=a[c];try{var m=n,v=i,I=v;e:for(;I!==null;){switch(I.tag){case 5:Pt=I.stateNode,$n=!1;break e;case 3:Pt=I.stateNode.containerInfo,$n=!0;break e;case 4:Pt=I.stateNode.containerInfo,$n=!0;break e}I=I.return}if(Pt===null)throw Error(t(160));lm(m,v,d),Pt=null,$n=!1;var P=d.alternate;P!==null&&(P.return=null),d.return=null}catch(U){it(d,i,U)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)cm(i,n),i=i.sibling}function cm(n,i){var a=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(Wn(i,n),ar(n),c&4){try{ha(3,n,n.return),Jl(3,n)}catch(ae){it(n,n.return,ae)}try{ha(5,n,n.return)}catch(ae){it(n,n.return,ae)}}break;case 1:Wn(i,n),ar(n),c&512&&a!==null&&uo(a,a.return);break;case 5:if(Wn(i,n),ar(n),c&512&&a!==null&&uo(a,a.return),n.flags&32){var d=n.stateNode;try{wr(d,"")}catch(ae){it(n,n.return,ae)}}if(c&4&&(d=n.stateNode,d!=null)){var m=n.memoizedProps,v=a!==null?a.memoizedProps:m,I=n.type,P=n.updateQueue;if(n.updateQueue=null,P!==null)try{I==="input"&&m.type==="radio"&&m.name!=null&&Es(d,m),Ps(I,v);var U=Ps(I,m);for(v=0;v<P.length;v+=2){var K=P[v],Y=P[v+1];K==="style"?ks(d,Y):K==="dangerouslySetInnerHTML"?Ss(d,Y):K==="children"?wr(d,Y):de(d,K,Y,U)}switch(I){case"input":Ts(d,m);break;case"textarea":Mi(d,m);break;case"select":var H=d._wrapperState.wasMultiple;d._wrapperState.wasMultiple=!!m.multiple;var re=m.value;re!=null?Yn(d,!!m.multiple,re,!1):H!==!!m.multiple&&(m.defaultValue!=null?Yn(d,!!m.multiple,m.defaultValue,!0):Yn(d,!!m.multiple,m.multiple?[]:"",!1))}d[ea]=m}catch(ae){it(n,n.return,ae)}}break;case 6:if(Wn(i,n),ar(n),c&4){if(n.stateNode===null)throw Error(t(162));d=n.stateNode,m=n.memoizedProps;try{d.nodeValue=m}catch(ae){it(n,n.return,ae)}}break;case 3:if(Wn(i,n),ar(n),c&4&&a!==null&&a.memoizedState.isDehydrated)try{Fn(i.containerInfo)}catch(ae){it(n,n.return,ae)}break;case 4:Wn(i,n),ar(n);break;case 13:Wn(i,n),ar(n),d=n.child,d.flags&8192&&(m=d.memoizedState!==null,d.stateNode.isHidden=m,!m||d.alternate!==null&&d.alternate.memoizedState!==null||(kh=qe())),c&4&&um(n);break;case 22:if(K=a!==null&&a.memoizedState!==null,n.mode&1?(Ut=(U=Ut)||K,Wn(i,n),Ut=U):Wn(i,n),ar(n),c&8192){if(U=n.memoizedState!==null,(n.stateNode.isHidden=U)&&!K&&(n.mode&1)!==0)for(ie=n,K=n.child;K!==null;){for(Y=ie=K;ie!==null;){switch(H=ie,re=H.child,H.tag){case 0:case 11:case 14:case 15:ha(4,H,H.return);break;case 1:uo(H,H.return);var se=H.stateNode;if(typeof se.componentWillUnmount=="function"){c=H,a=H.return;try{i=c,se.props=i.memoizedProps,se.state=i.memoizedState,se.componentWillUnmount()}catch(ae){it(c,a,ae)}}break;case 5:uo(H,H.return);break;case 22:if(H.memoizedState!==null){fm(Y);continue}}re!==null?(re.return=H,ie=re):fm(Y)}K=K.sibling}e:for(K=null,Y=n;;){if(Y.tag===5){if(K===null){K=Y;try{d=Y.stateNode,U?(m=d.style,typeof m.setProperty=="function"?m.setProperty("display","none","important"):m.display="none"):(I=Y.stateNode,P=Y.memoizedProps.style,v=P!=null&&P.hasOwnProperty("display")?P.display:null,I.style.display=As("display",v))}catch(ae){it(n,n.return,ae)}}}else if(Y.tag===6){if(K===null)try{Y.stateNode.nodeValue=U?"":Y.memoizedProps}catch(ae){it(n,n.return,ae)}}else if((Y.tag!==22&&Y.tag!==23||Y.memoizedState===null||Y===n)&&Y.child!==null){Y.child.return=Y,Y=Y.child;continue}if(Y===n)break e;for(;Y.sibling===null;){if(Y.return===null||Y.return===n)break e;K===Y&&(K=null),Y=Y.return}K===Y&&(K=null),Y.sibling.return=Y.return,Y=Y.sibling}}break;case 19:Wn(i,n),ar(n),c&4&&um(n);break;case 21:break;default:Wn(i,n),ar(n)}}function ar(n){var i=n.flags;if(i&2){try{e:{for(var a=n.return;a!==null;){if(om(a)){var c=a;break e}a=a.return}throw Error(t(160))}switch(c.tag){case 5:var d=c.stateNode;c.flags&32&&(wr(d,""),c.flags&=-33);var m=am(n);Ih(n,m,d);break;case 3:case 4:var v=c.stateNode.containerInfo,I=am(n);Th(n,I,v);break;default:throw Error(t(161))}}catch(P){it(n,n.return,P)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function w0(n,i,a){ie=n,hm(n)}function hm(n,i,a){for(var c=(n.mode&1)!==0;ie!==null;){var d=ie,m=d.child;if(d.tag===22&&c){var v=d.memoizedState!==null||Xl;if(!v){var I=d.alternate,P=I!==null&&I.memoizedState!==null||Ut;I=Xl;var U=Ut;if(Xl=v,(Ut=P)&&!U)for(ie=d;ie!==null;)v=ie,P=v.child,v.tag===22&&v.memoizedState!==null?pm(d):P!==null?(P.return=v,ie=P):pm(d);for(;m!==null;)ie=m,hm(m),m=m.sibling;ie=d,Xl=I,Ut=U}dm(n)}else(d.subtreeFlags&8772)!==0&&m!==null?(m.return=d,ie=m):dm(n)}}function dm(n){for(;ie!==null;){var i=ie;if((i.flags&8772)!==0){var a=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:Ut||Jl(5,i);break;case 1:var c=i.stateNode;if(i.flags&4&&!Ut)if(a===null)c.componentDidMount();else{var d=i.elementType===i.type?a.memoizedProps:Bn(i.type,a.memoizedProps);c.componentDidUpdate(d,a.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var m=i.updateQueue;m!==null&&fp(i,m,c);break;case 3:var v=i.updateQueue;if(v!==null){if(a=null,i.child!==null)switch(i.child.tag){case 5:a=i.child.stateNode;break;case 1:a=i.child.stateNode}fp(i,v,a)}break;case 5:var I=i.stateNode;if(a===null&&i.flags&4){a=I;var P=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":P.autoFocus&&a.focus();break;case"img":P.src&&(a.src=P.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var U=i.alternate;if(U!==null){var K=U.memoizedState;if(K!==null){var Y=K.dehydrated;Y!==null&&Fn(Y)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}Ut||i.flags&512&&Eh(i)}catch(H){it(i,i.return,H)}}if(i===n){ie=null;break}if(a=i.sibling,a!==null){a.return=i.return,ie=a;break}ie=i.return}}function fm(n){for(;ie!==null;){var i=ie;if(i===n){ie=null;break}var a=i.sibling;if(a!==null){a.return=i.return,ie=a;break}ie=i.return}}function pm(n){for(;ie!==null;){var i=ie;try{switch(i.tag){case 0:case 11:case 15:var a=i.return;try{Jl(4,i)}catch(P){it(i,a,P)}break;case 1:var c=i.stateNode;if(typeof c.componentDidMount=="function"){var d=i.return;try{c.componentDidMount()}catch(P){it(i,d,P)}}var m=i.return;try{Eh(i)}catch(P){it(i,m,P)}break;case 5:var v=i.return;try{Eh(i)}catch(P){it(i,v,P)}}}catch(P){it(i,i.return,P)}if(i===n){ie=null;break}var I=i.sibling;if(I!==null){I.return=i.return,ie=I;break}ie=i.return}}var E0=Math.ceil,Zl=fe.ReactCurrentDispatcher,Sh=fe.ReactCurrentOwner,Pn=fe.ReactCurrentBatchConfig,be=0,Et=null,ct=null,xt=0,pn=0,co=li(0),mt=0,da=null,ts=0,eu=0,Ah=0,fa=null,tn=null,kh=0,ho=1/0,Lr=null,tu=!1,Rh=null,pi=null,nu=!1,mi=null,ru=0,pa=0,Ch=null,iu=-1,su=0;function Kt(){return(be&6)!==0?qe():iu!==-1?iu:iu=qe()}function gi(n){return(n.mode&1)===0?1:(be&2)!==0&&xt!==0?xt&-xt:i0.transition!==null?(su===0&&(su=$i()),su):(n=Ne,n!==0||(n=window.event,n=n===void 0?16:Bo(n.type)),n)}function qn(n,i,a,c){if(50<pa)throw pa=0,Ch=null,Error(t(185));ei(n,a,c),((be&2)===0||n!==Et)&&(n===Et&&((be&2)===0&&(eu|=a),mt===4&&yi(n,xt)),nn(n,c),a===1&&be===0&&(i.mode&1)===0&&(ho=qe()+500,Ol&&ci()))}function nn(n,i){var a=n.callbackNode;Sr(n,i);var c=Bi(n,n===Et?xt:0);if(c===0)a!==null&&Mo(a),n.callbackNode=null,n.callbackPriority=0;else if(i=c&-c,n.callbackPriority!==i){if(a!=null&&Mo(a),i===1)n.tag===0?r0(gm.bind(null,n)):tp(gm.bind(null,n)),Zv(function(){(be&6)===0&&ci()}),a=null;else{switch(ni(c)){case 1:a=ji;break;case 4:a=Xr;break;case 16:a=Tn;break;case 536870912:a=sl;break;default:a=Tn}a=Sm(a,mm.bind(null,n))}n.callbackPriority=i,n.callbackNode=a}}function mm(n,i){if(iu=-1,su=0,(be&6)!==0)throw Error(t(327));var a=n.callbackNode;if(fo()&&n.callbackNode!==a)return null;var c=Bi(n,n===Et?xt:0);if(c===0)return null;if((c&30)!==0||(c&n.expiredLanes)!==0||i)i=ou(n,c);else{i=c;var d=be;be|=2;var m=_m();(Et!==n||xt!==i)&&(Lr=null,ho=qe()+500,rs(n,i));do try{S0();break}catch(I){ym(n,I)}while(!0);Hc(),Zl.current=m,be=d,ct!==null?i=0:(Et=null,xt=0,i=mt)}if(i!==0){if(i===2&&(d=un(n),d!==0&&(c=d,i=Ph(n,d))),i===1)throw a=da,rs(n,0),yi(n,c),nn(n,qe()),a;if(i===6)yi(n,c);else{if(d=n.current.alternate,(c&30)===0&&!T0(d)&&(i=ou(n,c),i===2&&(m=un(n),m!==0&&(c=m,i=Ph(n,m))),i===1))throw a=da,rs(n,0),yi(n,c),nn(n,qe()),a;switch(n.finishedWork=d,n.finishedLanes=c,i){case 0:case 1:throw Error(t(345));case 2:is(n,tn,Lr);break;case 3:if(yi(n,c),(c&130023424)===c&&(i=kh+500-qe(),10<i)){if(Bi(n,0)!==0)break;if(d=n.suspendedLanes,(d&c)!==c){Kt(),n.pingedLanes|=n.suspendedLanes&d;break}n.timeoutHandle=bc(is.bind(null,n,tn,Lr),i);break}is(n,tn,Lr);break;case 4:if(yi(n,c),(c&4194240)===c)break;for(i=n.eventTimes,d=-1;0<c;){var v=31-Wt(c);m=1<<v,v=i[v],v>d&&(d=v),c&=~m}if(c=d,c=qe()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*E0(c/1960))-c,10<c){n.timeoutHandle=bc(is.bind(null,n,tn,Lr),c);break}is(n,tn,Lr);break;case 5:is(n,tn,Lr);break;default:throw Error(t(329))}}}return nn(n,qe()),n.callbackNode===a?mm.bind(null,n):null}function Ph(n,i){var a=fa;return n.current.memoizedState.isDehydrated&&(rs(n,i).flags|=256),n=ou(n,i),n!==2&&(i=tn,tn=a,i!==null&&xh(i)),n}function xh(n){tn===null?tn=n:tn.push.apply(tn,n)}function T0(n){for(var i=n;;){if(i.flags&16384){var a=i.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var c=0;c<a.length;c++){var d=a[c],m=d.getSnapshot;d=d.value;try{if(!jn(m(),d))return!1}catch{return!1}}}if(a=i.child,i.subtreeFlags&16384&&a!==null)a.return=i,i=a;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function yi(n,i){for(i&=~Ah,i&=~eu,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var a=31-Wt(i),c=1<<a;n[a]=-1,i&=~c}}function gm(n){if((be&6)!==0)throw Error(t(327));fo();var i=Bi(n,0);if((i&1)===0)return nn(n,qe()),null;var a=ou(n,i);if(n.tag!==0&&a===2){var c=un(n);c!==0&&(i=c,a=Ph(n,c))}if(a===1)throw a=da,rs(n,0),yi(n,i),nn(n,qe()),a;if(a===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,is(n,tn,Lr),nn(n,qe()),null}function Nh(n,i){var a=be;be|=1;try{return n(i)}finally{be=a,be===0&&(ho=qe()+500,Ol&&ci())}}function ns(n){mi!==null&&mi.tag===0&&(be&6)===0&&fo();var i=be;be|=1;var a=Pn.transition,c=Ne;try{if(Pn.transition=null,Ne=1,n)return n()}finally{Ne=c,Pn.transition=a,be=i,(be&6)===0&&ci()}}function Dh(){pn=co.current,Qe(co)}function rs(n,i){n.finishedWork=null,n.finishedLanes=0;var a=n.timeoutHandle;if(a!==-1&&(n.timeoutHandle=-1,Jv(a)),ct!==null)for(a=ct.return;a!==null;){var c=a;switch(zc(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&Nl();break;case 3:ao(),Qe(Jt),Qe(Lt),eh();break;case 5:Jc(c);break;case 4:ao();break;case 13:Qe(tt);break;case 19:Qe(tt);break;case 10:Kc(c.type._context);break;case 22:case 23:Dh()}a=a.return}if(Et=n,ct=n=_i(n.current,null),xt=pn=i,mt=0,da=null,Ah=eu=ts=0,tn=fa=null,Ji!==null){for(i=0;i<Ji.length;i++)if(a=Ji[i],c=a.interleaved,c!==null){a.interleaved=null;var d=c.next,m=a.pending;if(m!==null){var v=m.next;m.next=d,c.next=v}a.pending=c}Ji=null}return n}function ym(n,i){do{var a=ct;try{if(Hc(),$l.current=Kl,Wl){for(var c=nt.memoizedState;c!==null;){var d=c.queue;d!==null&&(d.pending=null),c=c.next}Wl=!1}if(es=0,wt=pt=nt=null,oa=!1,aa=0,Sh.current=null,a===null||a.return===null){mt=1,da=i,ct=null;break}e:{var m=n,v=a.return,I=a,P=i;if(i=xt,I.flags|=32768,P!==null&&typeof P=="object"&&typeof P.then=="function"){var U=P,K=I,Y=K.tag;if((K.mode&1)===0&&(Y===0||Y===11||Y===15)){var H=K.alternate;H?(K.updateQueue=H.updateQueue,K.memoizedState=H.memoizedState,K.lanes=H.lanes):(K.updateQueue=null,K.memoizedState=null)}var re=Bp(v);if(re!==null){re.flags&=-257,$p(re,v,I,m,i),re.mode&1&&zp(m,U,i),i=re,P=U;var se=i.updateQueue;if(se===null){var ae=new Set;ae.add(P),i.updateQueue=ae}else se.add(P);break e}else{if((i&1)===0){zp(m,U,i),Oh();break e}P=Error(t(426))}}else if(Je&&I.mode&1){var st=Bp(v);if(st!==null){(st.flags&65536)===0&&(st.flags|=256),$p(st,v,I,m,i),Wc(lo(P,I));break e}}m=P=lo(P,I),mt!==4&&(mt=2),fa===null?fa=[m]:fa.push(m),m=v;do{switch(m.tag){case 3:m.flags|=65536,i&=-i,m.lanes|=i;var M=Up(m,P,i);dp(m,M);break e;case 1:I=P;var N=m.type,F=m.stateNode;if((m.flags&128)===0&&(typeof N.getDerivedStateFromError=="function"||F!==null&&typeof F.componentDidCatch=="function"&&(pi===null||!pi.has(F)))){m.flags|=65536,i&=-i,m.lanes|=i;var J=jp(m,I,i);dp(m,J);break e}}m=m.return}while(m!==null)}wm(a)}catch(ue){i=ue,ct===a&&a!==null&&(ct=a=a.return);continue}break}while(!0)}function _m(){var n=Zl.current;return Zl.current=Kl,n===null?Kl:n}function Oh(){(mt===0||mt===3||mt===2)&&(mt=4),Et===null||(ts&268435455)===0&&(eu&268435455)===0||yi(Et,xt)}function ou(n,i){var a=be;be|=2;var c=_m();(Et!==n||xt!==i)&&(Lr=null,rs(n,i));do try{I0();break}catch(d){ym(n,d)}while(!0);if(Hc(),be=a,Zl.current=c,ct!==null)throw Error(t(261));return Et=null,xt=0,mt}function I0(){for(;ct!==null;)vm(ct)}function S0(){for(;ct!==null&&!rl();)vm(ct)}function vm(n){var i=Im(n.alternate,n,pn);n.memoizedProps=n.pendingProps,i===null?wm(n):ct=i,Sh.current=null}function wm(n){var i=n;do{var a=i.alternate;if(n=i.return,(i.flags&32768)===0){if(a=g0(a,i,pn),a!==null){ct=a;return}}else{if(a=y0(a,i),a!==null){a.flags&=32767,ct=a;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{mt=6,ct=null;return}}if(i=i.sibling,i!==null){ct=i;return}ct=i=n}while(i!==null);mt===0&&(mt=5)}function is(n,i,a){var c=Ne,d=Pn.transition;try{Pn.transition=null,Ne=1,A0(n,i,a,c)}finally{Pn.transition=d,Ne=c}return null}function A0(n,i,a,c){do fo();while(mi!==null);if((be&6)!==0)throw Error(t(327));a=n.finishedWork;var d=n.finishedLanes;if(a===null)return null;if(n.finishedWork=null,n.finishedLanes=0,a===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var m=a.lanes|a.childLanes;if(We(n,m),n===Et&&(ct=Et=null,xt=0),(a.subtreeFlags&2064)===0&&(a.flags&2064)===0||nu||(nu=!0,Sm(Tn,function(){return fo(),null})),m=(a.flags&15990)!==0,(a.subtreeFlags&15990)!==0||m){m=Pn.transition,Pn.transition=null;var v=Ne;Ne=1;var I=be;be|=4,Sh.current=null,v0(n,a),cm(a,n),qv(Oc),ii=!!Dc,Oc=Dc=null,n.current=a,w0(a),gc(),be=I,Ne=v,Pn.transition=m}else n.current=a;if(nu&&(nu=!1,mi=n,ru=d),m=n.pendingLanes,m===0&&(pi=null),ol(a.stateNode),nn(n,qe()),i!==null)for(c=n.onRecoverableError,a=0;a<i.length;a++)d=i[a],c(d.value,{componentStack:d.stack,digest:d.digest});if(tu)throw tu=!1,n=Rh,Rh=null,n;return(ru&1)!==0&&n.tag!==0&&fo(),m=n.pendingLanes,(m&1)!==0?n===Ch?pa++:(pa=0,Ch=n):pa=0,ci(),null}function fo(){if(mi!==null){var n=ni(ru),i=Pn.transition,a=Ne;try{if(Pn.transition=null,Ne=16>n?16:n,mi===null)var c=!1;else{if(n=mi,mi=null,ru=0,(be&6)!==0)throw Error(t(331));var d=be;for(be|=4,ie=n.current;ie!==null;){var m=ie,v=m.child;if((ie.flags&16)!==0){var I=m.deletions;if(I!==null){for(var P=0;P<I.length;P++){var U=I[P];for(ie=U;ie!==null;){var K=ie;switch(K.tag){case 0:case 11:case 15:ha(8,K,m)}var Y=K.child;if(Y!==null)Y.return=K,ie=Y;else for(;ie!==null;){K=ie;var H=K.sibling,re=K.return;if(sm(K),K===U){ie=null;break}if(H!==null){H.return=re,ie=H;break}ie=re}}}var se=m.alternate;if(se!==null){var ae=se.child;if(ae!==null){se.child=null;do{var st=ae.sibling;ae.sibling=null,ae=st}while(ae!==null)}}ie=m}}if((m.subtreeFlags&2064)!==0&&v!==null)v.return=m,ie=v;else e:for(;ie!==null;){if(m=ie,(m.flags&2048)!==0)switch(m.tag){case 0:case 11:case 15:ha(9,m,m.return)}var M=m.sibling;if(M!==null){M.return=m.return,ie=M;break e}ie=m.return}}var N=n.current;for(ie=N;ie!==null;){v=ie;var F=v.child;if((v.subtreeFlags&2064)!==0&&F!==null)F.return=v,ie=F;else e:for(v=N;ie!==null;){if(I=ie,(I.flags&2048)!==0)try{switch(I.tag){case 0:case 11:case 15:Jl(9,I)}}catch(ue){it(I,I.return,ue)}if(I===v){ie=null;break e}var J=I.sibling;if(J!==null){J.return=I.return,ie=J;break e}ie=I.return}}if(be=d,ci(),ln&&typeof ln.onPostCommitFiberRoot=="function")try{ln.onPostCommitFiberRoot(zi,n)}catch{}c=!0}return c}finally{Ne=a,Pn.transition=i}}return!1}function Em(n,i,a){i=lo(a,i),i=Up(n,i,1),n=di(n,i,1),i=Kt(),n!==null&&(ei(n,1,i),nn(n,i))}function it(n,i,a){if(n.tag===3)Em(n,n,a);else for(;i!==null;){if(i.tag===3){Em(i,n,a);break}else if(i.tag===1){var c=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(pi===null||!pi.has(c))){n=lo(a,n),n=jp(i,n,1),i=di(i,n,1),n=Kt(),i!==null&&(ei(i,1,n),nn(i,n));break}}i=i.return}}function k0(n,i,a){var c=n.pingCache;c!==null&&c.delete(i),i=Kt(),n.pingedLanes|=n.suspendedLanes&a,Et===n&&(xt&a)===a&&(mt===4||mt===3&&(xt&130023424)===xt&&500>qe()-kh?rs(n,0):Ah|=a),nn(n,i)}function Tm(n,i){i===0&&((n.mode&1)===0?i=1:(i=bs,bs<<=1,(bs&130023424)===0&&(bs=4194304)));var a=Kt();n=Or(n,i),n!==null&&(ei(n,i,a),nn(n,a))}function R0(n){var i=n.memoizedState,a=0;i!==null&&(a=i.retryLane),Tm(n,a)}function C0(n,i){var a=0;switch(n.tag){case 13:var c=n.stateNode,d=n.memoizedState;d!==null&&(a=d.retryLane);break;case 19:c=n.stateNode;break;default:throw Error(t(314))}c!==null&&c.delete(i),Tm(n,a)}var Im;Im=function(n,i,a){if(n!==null)if(n.memoizedProps!==i.pendingProps||Jt.current)en=!0;else{if((n.lanes&a)===0&&(i.flags&128)===0)return en=!1,m0(n,i,a);en=(n.flags&131072)!==0}else en=!1,Je&&(i.flags&1048576)!==0&&np(i,bl,i.index);switch(i.lanes=0,i.tag){case 2:var c=i.type;Yl(n,i),n=i.pendingProps;var d=eo(i,Lt.current);oo(i,a),d=rh(null,i,c,n,d,a);var m=ih();return i.flags|=1,typeof d=="object"&&d!==null&&typeof d.render=="function"&&d.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,Zt(c)?(m=!0,Dl(i)):m=!1,i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,Yc(i),d.updater=Gl,i.stateNode=d,d._reactInternals=i,ch(i,c,n,a),i=ph(null,i,c,!0,m,a)):(i.tag=0,Je&&m&&jc(i),Ht(null,i,d,a),i=i.child),i;case 16:c=i.elementType;e:{switch(Yl(n,i),n=i.pendingProps,d=c._init,c=d(c._payload),i.type=c,d=i.tag=x0(c),n=Bn(c,n),d){case 0:i=fh(null,i,c,n,a);break e;case 1:i=Qp(null,i,c,n,a);break e;case 11:i=Wp(null,i,c,n,a);break e;case 14:i=qp(null,i,c,Bn(c.type,n),a);break e}throw Error(t(306,c,""))}return i;case 0:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:Bn(c,d),fh(n,i,c,d,a);case 1:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:Bn(c,d),Qp(n,i,c,d,a);case 3:e:{if(Yp(i),n===null)throw Error(t(387));c=i.pendingProps,m=i.memoizedState,d=m.element,hp(n,i),zl(i,c,null,a);var v=i.memoizedState;if(c=v.element,m.isDehydrated)if(m={element:c,isDehydrated:!1,cache:v.cache,pendingSuspenseBoundaries:v.pendingSuspenseBoundaries,transitions:v.transitions},i.updateQueue.baseState=m,i.memoizedState=m,i.flags&256){d=lo(Error(t(423)),i),i=Xp(n,i,c,a,d);break e}else if(c!==d){d=lo(Error(t(424)),i),i=Xp(n,i,c,a,d);break e}else for(fn=ai(i.stateNode.containerInfo.firstChild),dn=i,Je=!0,zn=null,a=up(i,null,c,a),i.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(ro(),c===d){i=br(n,i,a);break e}Ht(n,i,c,a)}i=i.child}return i;case 5:return pp(i),n===null&&$c(i),c=i.type,d=i.pendingProps,m=n!==null?n.memoizedProps:null,v=d.children,Vc(c,d)?v=null:m!==null&&Vc(c,m)&&(i.flags|=32),Gp(n,i),Ht(n,i,v,a),i.child;case 6:return n===null&&$c(i),null;case 13:return Jp(n,i,a);case 4:return Xc(i,i.stateNode.containerInfo),c=i.pendingProps,n===null?i.child=io(i,null,c,a):Ht(n,i,c,a),i.child;case 11:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:Bn(c,d),Wp(n,i,c,d,a);case 7:return Ht(n,i,i.pendingProps,a),i.child;case 8:return Ht(n,i,i.pendingProps.children,a),i.child;case 12:return Ht(n,i,i.pendingProps.children,a),i.child;case 10:e:{if(c=i.type._context,d=i.pendingProps,m=i.memoizedProps,v=d.value,He(Fl,c._currentValue),c._currentValue=v,m!==null)if(jn(m.value,v)){if(m.children===d.children&&!Jt.current){i=br(n,i,a);break e}}else for(m=i.child,m!==null&&(m.return=i);m!==null;){var I=m.dependencies;if(I!==null){v=m.child;for(var P=I.firstContext;P!==null;){if(P.context===c){if(m.tag===1){P=Vr(-1,a&-a),P.tag=2;var U=m.updateQueue;if(U!==null){U=U.shared;var K=U.pending;K===null?P.next=P:(P.next=K.next,K.next=P),U.pending=P}}m.lanes|=a,P=m.alternate,P!==null&&(P.lanes|=a),Gc(m.return,a,i),I.lanes|=a;break}P=P.next}}else if(m.tag===10)v=m.type===i.type?null:m.child;else if(m.tag===18){if(v=m.return,v===null)throw Error(t(341));v.lanes|=a,I=v.alternate,I!==null&&(I.lanes|=a),Gc(v,a,i),v=m.sibling}else v=m.child;if(v!==null)v.return=m;else for(v=m;v!==null;){if(v===i){v=null;break}if(m=v.sibling,m!==null){m.return=v.return,v=m;break}v=v.return}m=v}Ht(n,i,d.children,a),i=i.child}return i;case 9:return d=i.type,c=i.pendingProps.children,oo(i,a),d=Rn(d),c=c(d),i.flags|=1,Ht(n,i,c,a),i.child;case 14:return c=i.type,d=Bn(c,i.pendingProps),d=Bn(c.type,d),qp(n,i,c,d,a);case 15:return Hp(n,i,i.type,i.pendingProps,a);case 17:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:Bn(c,d),Yl(n,i),i.tag=1,Zt(c)?(n=!0,Dl(i)):n=!1,oo(i,a),Mp(i,c,d),ch(i,c,d,a),ph(null,i,c,!0,n,a);case 19:return em(n,i,a);case 22:return Kp(n,i,a)}throw Error(t(156,i.tag))};function Sm(n,i){return Os(n,i)}function P0(n,i,a,c){this.tag=n,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function xn(n,i,a,c){return new P0(n,i,a,c)}function Vh(n){return n=n.prototype,!(!n||!n.isReactComponent)}function x0(n){if(typeof n=="function")return Vh(n)?1:0;if(n!=null){if(n=n.$$typeof,n===b)return 11;if(n===_t)return 14}return 2}function _i(n,i){var a=n.alternate;return a===null?(a=xn(n.tag,i,n.key,n.mode),a.elementType=n.elementType,a.type=n.type,a.stateNode=n.stateNode,a.alternate=n,n.alternate=a):(a.pendingProps=i,a.type=n.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=n.flags&14680064,a.childLanes=n.childLanes,a.lanes=n.lanes,a.child=n.child,a.memoizedProps=n.memoizedProps,a.memoizedState=n.memoizedState,a.updateQueue=n.updateQueue,i=n.dependencies,a.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},a.sibling=n.sibling,a.index=n.index,a.ref=n.ref,a}function au(n,i,a,c,d,m){var v=2;if(c=n,typeof n=="function")Vh(n)&&(v=1);else if(typeof n=="string")v=5;else e:switch(n){case C:return ss(a.children,d,m,i);case T:v=8,d|=8;break;case k:return n=xn(12,a,i,d|2),n.elementType=k,n.lanes=m,n;case S:return n=xn(13,a,i,d),n.elementType=S,n.lanes=m,n;case Ke:return n=xn(19,a,i,d),n.elementType=Ke,n.lanes=m,n;case je:return lu(a,d,m,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case A:v=10;break e;case D:v=9;break e;case b:v=11;break e;case _t:v=14;break e;case At:v=16,c=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=xn(v,a,i,d),i.elementType=n,i.type=c,i.lanes=m,i}function ss(n,i,a,c){return n=xn(7,n,c,i),n.lanes=a,n}function lu(n,i,a,c){return n=xn(22,n,c,i),n.elementType=je,n.lanes=a,n.stateNode={isHidden:!1},n}function bh(n,i,a){return n=xn(6,n,null,i),n.lanes=a,n}function Lh(n,i,a){return i=xn(4,n.children!==null?n.children:[],n.key,i),i.lanes=a,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function N0(n,i,a,c,d){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Zr(0),this.expirationTimes=Zr(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Zr(0),this.identifierPrefix=c,this.onRecoverableError=d,this.mutableSourceEagerHydrationData=null}function Mh(n,i,a,c,d,m,v,I,P){return n=new N0(n,i,a,I,P),i===1?(i=1,m===!0&&(i|=8)):i=0,m=xn(3,null,null,i),n.current=m,m.stateNode=n,m.memoizedState={element:c,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},Yc(m),n}function D0(n,i,a){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:X,key:c==null?null:""+c,children:n,containerInfo:i,implementation:a}}function Am(n){if(!n)return ui;n=n._reactInternals;e:{if(On(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(Zt(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var a=n.type;if(Zt(a))return Zf(n,a,i)}return i}function km(n,i,a,c,d,m,v,I,P){return n=Mh(a,c,!0,n,d,m,v,I,P),n.context=Am(null),a=n.current,c=Kt(),d=gi(a),m=Vr(c,d),m.callback=i??null,di(a,m,d),n.current.lanes=d,ei(n,d,c),nn(n,c),n}function uu(n,i,a,c){var d=i.current,m=Kt(),v=gi(d);return a=Am(a),i.context===null?i.context=a:i.pendingContext=a,i=Vr(m,v),i.payload={element:n},c=c===void 0?null:c,c!==null&&(i.callback=c),n=di(d,i,v),n!==null&&(qn(n,d,v,m),jl(n,d,v)),v}function cu(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function Rm(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var a=n.retryLane;n.retryLane=a!==0&&a<i?a:i}}function Fh(n,i){Rm(n,i),(n=n.alternate)&&Rm(n,i)}function O0(){return null}var Cm=typeof reportError=="function"?reportError:function(n){console.error(n)};function Uh(n){this._internalRoot=n}hu.prototype.render=Uh.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));uu(n,i,null,null)},hu.prototype.unmount=Uh.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;ns(function(){uu(null,n,null,null)}),i[Pr]=null}};function hu(n){this._internalRoot=n}hu.prototype.unstable_scheduleHydration=function(n){if(n){var i=hl();n={blockedOn:null,target:n,priority:i};for(var a=0;a<er.length&&i!==0&&i<er[a].priority;a++);er.splice(a,0,n),a===0&&pl(n)}};function jh(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function du(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function Pm(){}function V0(n,i,a,c,d){if(d){if(typeof c=="function"){var m=c;c=function(){var U=cu(v);m.call(U)}}var v=km(i,c,n,0,null,!1,!1,"",Pm);return n._reactRootContainer=v,n[Pr]=v.current,Jo(n.nodeType===8?n.parentNode:n),ns(),v}for(;d=n.lastChild;)n.removeChild(d);if(typeof c=="function"){var I=c;c=function(){var U=cu(P);I.call(U)}}var P=Mh(n,0,!1,null,null,!1,!1,"",Pm);return n._reactRootContainer=P,n[Pr]=P.current,Jo(n.nodeType===8?n.parentNode:n),ns(function(){uu(i,P,a,c)}),P}function fu(n,i,a,c,d){var m=a._reactRootContainer;if(m){var v=m;if(typeof d=="function"){var I=d;d=function(){var P=cu(v);I.call(P)}}uu(i,v,n,d)}else v=V0(a,i,n,d,c);return cu(v)}ul=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var a=Jr(i.pendingLanes);a!==0&&(ti(i,a|1),nn(i,qe()),(be&6)===0&&(ho=qe()+500,ci()))}break;case 13:ns(function(){var c=Or(n,1);if(c!==null){var d=Kt();qn(c,n,1,d)}}),Fh(n,1)}},Ls=function(n){if(n.tag===13){var i=Or(n,134217728);if(i!==null){var a=Kt();qn(i,n,134217728,a)}Fh(n,134217728)}},cl=function(n){if(n.tag===13){var i=gi(n),a=Or(n,i);if(a!==null){var c=Kt();qn(a,n,i,c)}Fh(n,i)}},hl=function(){return Ne},dl=function(n,i){var a=Ne;try{return Ne=n,i()}finally{Ne=a}},Er=function(n,i,a){switch(i){case"input":if(Ts(n,a),i=a.name,a.type==="radio"&&i!=null){for(a=n;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<a.length;i++){var c=a[i];if(c!==n&&c.form===n.form){var d=xl(c);if(!d)throw Error(t(90));qr(c),Ts(c,d)}}}break;case"textarea":Mi(n,a);break;case"select":i=a.value,i!=null&&Yn(n,!!a.multiple,i,!1)}},Tr=Nh,kt=ns;var b0={usingClientEntryPoint:!1,Events:[ta,Js,xl,wn,Fi,Nh]},ma={findFiberByHostInstance:Gi,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},L0={bundleType:ma.bundleType,version:ma.version,rendererPackageName:ma.rendererPackageName,rendererConfig:ma.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:fe.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=Lo(n),n===null?null:n.stateNode},findFiberByHostInstance:ma.findFiberByHostInstance||O0,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var pu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!pu.isDisabled&&pu.supportsFiber)try{zi=pu.inject(L0),ln=pu}catch{}}return rn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=b0,rn.createPortal=function(n,i){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!jh(i))throw Error(t(200));return D0(n,i,null,a)},rn.createRoot=function(n,i){if(!jh(n))throw Error(t(299));var a=!1,c="",d=Cm;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(c=i.identifierPrefix),i.onRecoverableError!==void 0&&(d=i.onRecoverableError)),i=Mh(n,1,!1,null,null,a,!1,c,d),n[Pr]=i.current,Jo(n.nodeType===8?n.parentNode:n),new Uh(i)},rn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=Lo(i),n=n===null?null:n.stateNode,n},rn.flushSync=function(n){return ns(n)},rn.hydrate=function(n,i,a){if(!du(i))throw Error(t(200));return fu(null,n,i,!0,a)},rn.hydrateRoot=function(n,i,a){if(!jh(n))throw Error(t(405));var c=a!=null&&a.hydratedSources||null,d=!1,m="",v=Cm;if(a!=null&&(a.unstable_strictMode===!0&&(d=!0),a.identifierPrefix!==void 0&&(m=a.identifierPrefix),a.onRecoverableError!==void 0&&(v=a.onRecoverableError)),i=km(i,null,n,1,a??null,d,!1,m,v),n[Pr]=i.current,Jo(n),c)for(n=0;n<c.length;n++)a=c[n],d=a._getVersion,d=d(a._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[a,d]:i.mutableSourceEagerHydrationData.push(a,d);return new hu(i)},rn.render=function(n,i,a){if(!du(i))throw Error(t(200));return fu(null,n,i,!1,a)},rn.unmountComponentAtNode=function(n){if(!du(n))throw Error(t(40));return n._reactRootContainer?(ns(function(){fu(null,null,n,!1,function(){n._reactRootContainer=null,n[Pr]=null})}),!0):!1},rn.unstable_batchedUpdates=Nh,rn.unstable_renderSubtreeIntoContainer=function(n,i,a,c){if(!du(a))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return fu(n,i,a,!1,c)},rn.version="18.3.1-next-f1338f8080-20240426",rn}var Mm;function W0(){if(Mm)return $h.exports;Mm=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),$h.exports=$0(),$h.exports}var Fm;function q0(){if(Fm)return mu;Fm=1;var r=W0();return mu.createRoot=r.createRoot,mu.hydrateRoot=r.hydrateRoot,mu}var H0=q0();const K0=cy(H0);var Um={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dy=function(r){const e=[];let t=0;for(let s=0;s<r.length;s++){let o=r.charCodeAt(s);o<128?e[t++]=o:o<2048?(e[t++]=o>>6|192,e[t++]=o&63|128):(o&64512)===55296&&s+1<r.length&&(r.charCodeAt(s+1)&64512)===56320?(o=65536+((o&1023)<<10)+(r.charCodeAt(++s)&1023),e[t++]=o>>18|240,e[t++]=o>>12&63|128,e[t++]=o>>6&63|128,e[t++]=o&63|128):(e[t++]=o>>12|224,e[t++]=o>>6&63|128,e[t++]=o&63|128)}return e},G0=function(r){const e=[];let t=0,s=0;for(;t<r.length;){const o=r[t++];if(o<128)e[s++]=String.fromCharCode(o);else if(o>191&&o<224){const l=r[t++];e[s++]=String.fromCharCode((o&31)<<6|l&63)}else if(o>239&&o<365){const l=r[t++],h=r[t++],p=r[t++],g=((o&7)<<18|(l&63)<<12|(h&63)<<6|p&63)-65536;e[s++]=String.fromCharCode(55296+(g>>10)),e[s++]=String.fromCharCode(56320+(g&1023))}else{const l=r[t++],h=r[t++];e[s++]=String.fromCharCode((o&15)<<12|(l&63)<<6|h&63)}}return e.join("")},fy={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let o=0;o<r.length;o+=3){const l=r[o],h=o+1<r.length,p=h?r[o+1]:0,g=o+2<r.length,_=g?r[o+2]:0,E=l>>2,R=(l&3)<<4|p>>4;let O=(p&15)<<2|_>>6,j=_&63;g||(j=64,h||(O=64)),s.push(t[E],t[R],t[O],t[j])}return s.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(dy(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):G0(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let o=0;o<r.length;){const l=t[r.charAt(o++)],p=o<r.length?t[r.charAt(o)]:0;++o;const _=o<r.length?t[r.charAt(o)]:64;++o;const R=o<r.length?t[r.charAt(o)]:64;if(++o,l==null||p==null||_==null||R==null)throw new Q0;const O=l<<2|p>>4;if(s.push(O),_!==64){const j=p<<4&240|_>>2;if(s.push(j),R!==64){const q=_<<6&192|R;s.push(q)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class Q0 extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Y0=function(r){const e=dy(r);return fy.encodeByteArray(e,!0)},Du=function(r){return Y0(r).replace(/\./g,"")},py=function(r){try{return fy.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X0(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J0=()=>X0().__FIREBASE_DEFAULTS__,Z0=()=>{if(typeof process>"u"||typeof Um>"u")return;const r=Um.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},ew=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&py(r[1]);return e&&JSON.parse(e)},Xu=()=>{try{return J0()||Z0()||ew()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},my=r=>{var e,t;return(t=(e=Xu())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[r]},gy=r=>{const e=my(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},yy=()=>{var r;return(r=Xu())===null||r===void 0?void 0:r.config},_y=r=>{var e;return(e=Xu())===null||e===void 0?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tw{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vy(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",o=r.iat||0,l=r.sub||r.user_id;if(!l)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const h=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:o,exp:o+3600,auth_time:o,sub:l,user_id:l,firebase:{sign_in_provider:"custom",identities:{}}},r);return[Du(JSON.stringify(t)),Du(JSON.stringify(h)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $t(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function nw(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test($t())}function rw(){var r;const e=(r=Xu())===null||r===void 0?void 0:r.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function iw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function sw(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function ow(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function aw(){const r=$t();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function lw(){return!rw()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function uw(){try{return typeof indexedDB=="object"}catch{return!1}}function cw(){return new Promise((r,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(s);o.onsuccess=()=>{o.result.close(),t||self.indexedDB.deleteDatabase(s),r(!0)},o.onupgradeneeded=()=>{t=!1},o.onerror=()=>{var l;e(((l=o.error)===null||l===void 0?void 0:l.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hw="FirebaseError";class yr extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=hw,Object.setPrototypeOf(this,yr.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,za.prototype.create)}}class za{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},o=`${this.service}/${e}`,l=this.errors[e],h=l?dw(l,s):"Error",p=`${this.serviceName}: ${h} (${o}).`;return new yr(o,p,s)}}function dw(r,e){return r.replace(fw,(t,s)=>{const o=e[s];return o!=null?String(o):`<${s}?>`})}const fw=/\{\$([^}]+)}/g;function pw(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function Ou(r,e){if(r===e)return!0;const t=Object.keys(r),s=Object.keys(e);for(const o of t){if(!s.includes(o))return!1;const l=r[o],h=e[o];if(jm(l)&&jm(h)){if(!Ou(l,h))return!1}else if(l!==h)return!1}for(const o of s)if(!t.includes(o))return!1;return!0}function jm(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ba(r){const e=[];for(const[t,s]of Object.entries(r))Array.isArray(s)?s.forEach(o=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(o))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function wa(r){const e={};return r.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[o,l]=s.split("=");e[decodeURIComponent(o)]=decodeURIComponent(l)}}),e}function Ea(r){const e=r.indexOf("?");if(!e)return"";const t=r.indexOf("#",e);return r.substring(e,t>0?t:void 0)}function mw(r,e){const t=new gw(r,e);return t.subscribe.bind(t)}class gw{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,s){let o;if(e===void 0&&t===void 0&&s===void 0)throw new Error("Missing Observer.");yw(e,["next","error","complete"])?o=e:o={next:e,error:t,complete:s},o.next===void 0&&(o.next=Hh),o.error===void 0&&(o.error=Hh),o.complete===void 0&&(o.complete=Hh);const l=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?o.error(this.finalError):o.complete()}catch{}}),this.observers.push(o),l}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function yw(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function Hh(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(r){return r&&r._delegate?r._delegate:r}class Pi{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const os="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _w{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new tw;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const o=this.getOrInitializeService({instanceIdentifier:t});o&&s.resolve(o)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const s=this.normalizeInstanceIdentifier(e?.identifier),o=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(l){if(o)return null;throw l}else{if(o)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ww(e))try{this.getOrInitializeService({instanceIdentifier:os})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(t);try{const l=this.getOrInitializeService({instanceIdentifier:o});s.resolve(l)}catch{}}}}clearInstance(e=os){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=os){return this.instances.has(e)}getOptions(e=os){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const o=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[l,h]of this.instancesDeferred.entries()){const p=this.normalizeInstanceIdentifier(l);s===p&&h.resolve(o)}return o}onInit(e,t){var s;const o=this.normalizeInstanceIdentifier(t),l=(s=this.onInitCallbacks.get(o))!==null&&s!==void 0?s:new Set;l.add(e),this.onInitCallbacks.set(o,l);const h=this.instances.get(o);return h&&e(h,o),()=>{l.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const o of s)try{o(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:vw(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=os){return this.component?this.component.multipleInstances?e:os:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function vw(r){return r===os?void 0:r}function ww(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ew{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new _w(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var De;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(De||(De={}));const Tw={debug:De.DEBUG,verbose:De.VERBOSE,info:De.INFO,warn:De.WARN,error:De.ERROR,silent:De.SILENT},Iw=De.INFO,Sw={[De.DEBUG]:"log",[De.VERBOSE]:"log",[De.INFO]:"info",[De.WARN]:"warn",[De.ERROR]:"error"},Aw=(r,e,...t)=>{if(e<r.logLevel)return;const s=new Date().toISOString(),o=Sw[e];if(o)console[o](`[${s}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class xd{constructor(e){this.name=e,this._logLevel=Iw,this._logHandler=Aw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in De))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Tw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,De.DEBUG,...e),this._logHandler(this,De.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,De.VERBOSE,...e),this._logHandler(this,De.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,De.INFO,...e),this._logHandler(this,De.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,De.WARN,...e),this._logHandler(this,De.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,De.ERROR,...e),this._logHandler(this,De.ERROR,...e)}}const kw=(r,e)=>e.some(t=>r instanceof t);let zm,Bm;function Rw(){return zm||(zm=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Cw(){return Bm||(Bm=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const wy=new WeakMap,id=new WeakMap,Ey=new WeakMap,Kh=new WeakMap,Nd=new WeakMap;function Pw(r){const e=new Promise((t,s)=>{const o=()=>{r.removeEventListener("success",l),r.removeEventListener("error",h)},l=()=>{t(ki(r.result)),o()},h=()=>{s(r.error),o()};r.addEventListener("success",l),r.addEventListener("error",h)});return e.then(t=>{t instanceof IDBCursor&&wy.set(t,r)}).catch(()=>{}),Nd.set(e,r),e}function xw(r){if(id.has(r))return;const e=new Promise((t,s)=>{const o=()=>{r.removeEventListener("complete",l),r.removeEventListener("error",h),r.removeEventListener("abort",h)},l=()=>{t(),o()},h=()=>{s(r.error||new DOMException("AbortError","AbortError")),o()};r.addEventListener("complete",l),r.addEventListener("error",h),r.addEventListener("abort",h)});id.set(r,e)}let sd={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return id.get(r);if(e==="objectStoreNames")return r.objectStoreNames||Ey.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ki(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function Nw(r){sd=r(sd)}function Dw(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=r.call(Gh(this),e,...t);return Ey.set(s,e.sort?e.sort():[e]),ki(s)}:Cw().includes(r)?function(...e){return r.apply(Gh(this),e),ki(wy.get(this))}:function(...e){return ki(r.apply(Gh(this),e))}}function Ow(r){return typeof r=="function"?Dw(r):(r instanceof IDBTransaction&&xw(r),kw(r,Rw())?new Proxy(r,sd):r)}function ki(r){if(r instanceof IDBRequest)return Pw(r);if(Kh.has(r))return Kh.get(r);const e=Ow(r);return e!==r&&(Kh.set(r,e),Nd.set(e,r)),e}const Gh=r=>Nd.get(r);function Vw(r,e,{blocked:t,upgrade:s,blocking:o,terminated:l}={}){const h=indexedDB.open(r,e),p=ki(h);return s&&h.addEventListener("upgradeneeded",g=>{s(ki(h.result),g.oldVersion,g.newVersion,ki(h.transaction),g)}),t&&h.addEventListener("blocked",g=>t(g.oldVersion,g.newVersion,g)),p.then(g=>{l&&g.addEventListener("close",()=>l()),o&&g.addEventListener("versionchange",_=>o(_.oldVersion,_.newVersion,_))}).catch(()=>{}),p}const bw=["get","getKey","getAll","getAllKeys","count"],Lw=["put","add","delete","clear"],Qh=new Map;function $m(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(Qh.get(e))return Qh.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,o=Lw.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(o||bw.includes(t)))return;const l=async function(h,...p){const g=this.transaction(h,o?"readwrite":"readonly");let _=g.store;return s&&(_=_.index(p.shift())),(await Promise.all([_[t](...p),o&&g.done]))[0]};return Qh.set(e,l),l}Nw(r=>({...r,get:(e,t,s)=>$m(e,t)||r.get(e,t,s),has:(e,t)=>!!$m(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mw{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Fw(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function Fw(r){const e=r.getComponent();return e?.type==="VERSION"}const od="@firebase/app",Wm="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zr=new xd("@firebase/app"),Uw="@firebase/app-compat",jw="@firebase/analytics-compat",zw="@firebase/analytics",Bw="@firebase/app-check-compat",$w="@firebase/app-check",Ww="@firebase/auth",qw="@firebase/auth-compat",Hw="@firebase/database",Kw="@firebase/data-connect",Gw="@firebase/database-compat",Qw="@firebase/functions",Yw="@firebase/functions-compat",Xw="@firebase/installations",Jw="@firebase/installations-compat",Zw="@firebase/messaging",eE="@firebase/messaging-compat",tE="@firebase/performance",nE="@firebase/performance-compat",rE="@firebase/remote-config",iE="@firebase/remote-config-compat",sE="@firebase/storage",oE="@firebase/storage-compat",aE="@firebase/firestore",lE="@firebase/vertexai-preview",uE="@firebase/firestore-compat",cE="firebase",hE="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ad="[DEFAULT]",dE={[od]:"fire-core",[Uw]:"fire-core-compat",[zw]:"fire-analytics",[jw]:"fire-analytics-compat",[$w]:"fire-app-check",[Bw]:"fire-app-check-compat",[Ww]:"fire-auth",[qw]:"fire-auth-compat",[Hw]:"fire-rtdb",[Kw]:"fire-data-connect",[Gw]:"fire-rtdb-compat",[Qw]:"fire-fn",[Yw]:"fire-fn-compat",[Xw]:"fire-iid",[Jw]:"fire-iid-compat",[Zw]:"fire-fcm",[eE]:"fire-fcm-compat",[tE]:"fire-perf",[nE]:"fire-perf-compat",[rE]:"fire-rc",[iE]:"fire-rc-compat",[sE]:"fire-gcs",[oE]:"fire-gcs-compat",[aE]:"fire-fst",[uE]:"fire-fst-compat",[lE]:"fire-vertex","fire-js":"fire-js",[cE]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vu=new Map,fE=new Map,ld=new Map;function qm(r,e){try{r.container.addComponent(e)}catch(t){zr.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function hs(r){const e=r.name;if(ld.has(e))return zr.debug(`There were multiple attempts to register component ${e}.`),!1;ld.set(e,r);for(const t of Vu.values())qm(t,r);for(const t of fE.values())qm(t,r);return!0}function Ju(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function lr(r){return r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pE={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ri=new za("app","Firebase",pE);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mE{constructor(e,t,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Pi("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ri.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ys=hE;function Ty(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const s=Object.assign({name:ad,automaticDataCollectionEnabled:!1},e),o=s.name;if(typeof o!="string"||!o)throw Ri.create("bad-app-name",{appName:String(o)});if(t||(t=yy()),!t)throw Ri.create("no-options");const l=Vu.get(o);if(l){if(Ou(t,l.options)&&Ou(s,l.config))return l;throw Ri.create("duplicate-app",{appName:o})}const h=new Ew(o);for(const g of ld.values())h.addComponent(g);const p=new mE(t,s,h);return Vu.set(o,p),p}function Dd(r=ad){const e=Vu.get(r);if(!e&&r===ad&&yy())return Ty();if(!e)throw Ri.create("no-app",{appName:r});return e}function ur(r,e,t){var s;let o=(s=dE[r])!==null&&s!==void 0?s:r;t&&(o+=`-${t}`);const l=o.match(/\s|\//),h=e.match(/\s|\//);if(l||h){const p=[`Unable to register library "${o}" with version "${e}":`];l&&p.push(`library name "${o}" contains illegal characters (whitespace or "/")`),l&&h&&p.push("and"),h&&p.push(`version name "${e}" contains illegal characters (whitespace or "/")`),zr.warn(p.join(" "));return}hs(new Pi(`${o}-version`,()=>({library:o,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gE="firebase-heartbeat-database",yE=1,Na="firebase-heartbeat-store";let Yh=null;function Iy(){return Yh||(Yh=Vw(gE,yE,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(Na)}catch(t){console.warn(t)}}}}).catch(r=>{throw Ri.create("idb-open",{originalErrorMessage:r.message})})),Yh}async function _E(r){try{const t=(await Iy()).transaction(Na),s=await t.objectStore(Na).get(Sy(r));return await t.done,s}catch(e){if(e instanceof yr)zr.warn(e.message);else{const t=Ri.create("idb-get",{originalErrorMessage:e?.message});zr.warn(t.message)}}}async function Hm(r,e){try{const s=(await Iy()).transaction(Na,"readwrite");await s.objectStore(Na).put(e,Sy(r)),await s.done}catch(t){if(t instanceof yr)zr.warn(t.message);else{const s=Ri.create("idb-set",{originalErrorMessage:t?.message});zr.warn(s.message)}}}function Sy(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vE=1024,wE=30*24*60*60*1e3;class EE{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new IE(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const o=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),l=Km();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===l||this._heartbeatsCache.heartbeats.some(h=>h.date===l)?void 0:(this._heartbeatsCache.heartbeats.push({date:l,agent:o}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(h=>{const p=new Date(h.date).valueOf();return Date.now()-p<=wE}),this._storage.overwrite(this._heartbeatsCache))}catch(s){zr.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Km(),{heartbeatsToSend:s,unsentEntries:o}=TE(this._heartbeatsCache.heartbeats),l=Du(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,o.length>0?(this._heartbeatsCache.heartbeats=o,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),l}catch(t){return zr.warn(t),""}}}function Km(){return new Date().toISOString().substring(0,10)}function TE(r,e=vE){const t=[];let s=r.slice();for(const o of r){const l=t.find(h=>h.agent===o.agent);if(l){if(l.dates.push(o.date),Gm(t)>e){l.dates.pop();break}}else if(t.push({agent:o.agent,dates:[o.date]}),Gm(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class IE{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return uw()?cw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await _E(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const o=await this.read();return Hm(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:o.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const o=await this.read();return Hm(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:o.lastSentHeartbeatDate,heartbeats:[...o.heartbeats,...e.heartbeats]})}else return}}function Gm(r){return Du(JSON.stringify({version:2,heartbeats:r})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function SE(r){hs(new Pi("platform-logger",e=>new Mw(e),"PRIVATE")),hs(new Pi("heartbeat",e=>new EE(e),"PRIVATE")),ur(od,Wm,r),ur(od,Wm,"esm2017"),ur("fire-js","")}SE("");var AE="firebase",kE="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ur(AE,kE,"app");function Od(r,e){var t={};for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&e.indexOf(s)<0&&(t[s]=r[s]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,s=Object.getOwnPropertySymbols(r);o<s.length;o++)e.indexOf(s[o])<0&&Object.prototype.propertyIsEnumerable.call(r,s[o])&&(t[s[o]]=r[s[o]]);return t}function Ay(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const RE=Ay,ky=new za("auth","Firebase",Ay());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bu=new xd("@firebase/auth");function CE(r,...e){bu.logLevel<=De.WARN&&bu.warn(`Auth (${ys}): ${r}`,...e)}function Tu(r,...e){bu.logLevel<=De.ERROR&&bu.error(`Auth (${ys}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kn(r,...e){throw Vd(r,...e)}function cr(r,...e){return Vd(r,...e)}function Ry(r,e,t){const s=Object.assign(Object.assign({},RE()),{[e]:t});return new za("auth","Firebase",s).create(e,{appName:r.name})}function jr(r){return Ry(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Vd(r,...e){if(typeof r!="string"){const t=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=r.name),r._errorFactory.create(t,...s)}return ky.create(r,...e)}function ve(r,e,...t){if(!r)throw Vd(e,...t)}function Mr(r){const e="INTERNAL ASSERTION FAILED: "+r;throw Tu(e),new Error(e)}function Br(r,e){r||Mr(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ud(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.href)||""}function PE(){return Qm()==="http:"||Qm()==="https:"}function Qm(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xE(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(PE()||sw()||"connection"in navigator)?navigator.onLine:!0}function NE(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $a{constructor(e,t){this.shortDelay=e,this.longDelay=t,Br(t>e,"Short delay should be less than long delay!"),this.isMobile=nw()||ow()}get(){return xE()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bd(r,e){Br(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cy{static initialize(e,t,s){this.fetchImpl=e,t&&(this.headersImpl=t),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Mr("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Mr("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Mr("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DE={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OE=new $a(3e4,6e4);function Oi(r,e){return r.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:r.tenantId}):e}async function Vi(r,e,t,s,o={}){return Py(r,o,async()=>{let l={},h={};s&&(e==="GET"?h=s:l={body:JSON.stringify(s)});const p=Ba(Object.assign({key:r.config.apiKey},h)).slice(1),g=await r._getAdditionalHeaders();g["Content-Type"]="application/json",r.languageCode&&(g["X-Firebase-Locale"]=r.languageCode);const _=Object.assign({method:e,headers:g},l);return iw()||(_.referrerPolicy="no-referrer"),Cy.fetch()(xy(r,r.config.apiHost,t,p),_)})}async function Py(r,e,t){r._canInitEmulator=!1;const s=Object.assign(Object.assign({},DE),e);try{const o=new bE(r),l=await Promise.race([t(),o.promise]);o.clearNetworkTimeout();const h=await l.json();if("needConfirmation"in h)throw gu(r,"account-exists-with-different-credential",h);if(l.ok&&!("errorMessage"in h))return h;{const p=l.ok?h.errorMessage:h.error.message,[g,_]=p.split(" : ");if(g==="FEDERATED_USER_ID_ALREADY_LINKED")throw gu(r,"credential-already-in-use",h);if(g==="EMAIL_EXISTS")throw gu(r,"email-already-in-use",h);if(g==="USER_DISABLED")throw gu(r,"user-disabled",h);const E=s[g]||g.toLowerCase().replace(/[_\s]+/g,"-");if(_)throw Ry(r,E,_);Kn(r,E)}}catch(o){if(o instanceof yr)throw o;Kn(r,"network-request-failed",{message:String(o)})}}async function Wa(r,e,t,s,o={}){const l=await Vi(r,e,t,s,o);return"mfaPendingCredential"in l&&Kn(r,"multi-factor-auth-required",{_serverResponse:l}),l}function xy(r,e,t,s){const o=`${e}${t}?${s}`;return r.config.emulator?bd(r.config,o):`${r.config.apiScheme}://${o}`}function VE(r){switch(r){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class bE{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,s)=>{this.timer=setTimeout(()=>s(cr(this.auth,"network-request-failed")),OE.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function gu(r,e,t){const s={appName:r.name};t.email&&(s.email=t.email),t.phoneNumber&&(s.phoneNumber=t.phoneNumber);const o=cr(r,e,s);return o.customData._tokenResponse=t,o}function Ym(r){return r!==void 0&&r.enterprise!==void 0}class LE{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return VE(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function ME(r,e){return Vi(r,"GET","/v2/recaptchaConfig",Oi(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FE(r,e){return Vi(r,"POST","/v1/accounts:delete",e)}async function Ny(r,e){return Vi(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ka(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function UE(r,e=!1){const t=yt(r),s=await t.getIdToken(e),o=Ld(s);ve(o&&o.exp&&o.auth_time&&o.iat,t.auth,"internal-error");const l=typeof o.firebase=="object"?o.firebase:void 0,h=l?.sign_in_provider;return{claims:o,token:s,authTime:ka(Xh(o.auth_time)),issuedAtTime:ka(Xh(o.iat)),expirationTime:ka(Xh(o.exp)),signInProvider:h||null,signInSecondFactor:l?.sign_in_second_factor||null}}function Xh(r){return Number(r)*1e3}function Ld(r){const[e,t,s]=r.split(".");if(e===void 0||t===void 0||s===void 0)return Tu("JWT malformed, contained fewer than 3 sections"),null;try{const o=py(t);return o?JSON.parse(o):(Tu("Failed to decode base64 JWT payload"),null)}catch(o){return Tu("Caught error parsing JWT payload as JSON",o?.toString()),null}}function Xm(r){const e=Ld(r);return ve(e,"internal-error"),ve(typeof e.exp<"u","internal-error"),ve(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Da(r,e,t=!1){if(t)return e;try{return await e}catch(s){throw s instanceof yr&&jE(s)&&r.auth.currentUser===r&&await r.auth.signOut(),s}}function jE({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zE{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const o=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,o)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cd{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ka(this.lastLoginAt),this.creationTime=ka(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lu(r){var e;const t=r.auth,s=await r.getIdToken(),o=await Da(r,Ny(t,{idToken:s}));ve(o?.users.length,t,"internal-error");const l=o.users[0];r._notifyReloadListener(l);const h=!((e=l.providerUserInfo)===null||e===void 0)&&e.length?Dy(l.providerUserInfo):[],p=$E(r.providerData,h),g=r.isAnonymous,_=!(r.email&&l.passwordHash)&&!p?.length,E=g?_:!1,R={uid:l.localId,displayName:l.displayName||null,photoURL:l.photoUrl||null,email:l.email||null,emailVerified:l.emailVerified||!1,phoneNumber:l.phoneNumber||null,tenantId:l.tenantId||null,providerData:p,metadata:new cd(l.createdAt,l.lastLoginAt),isAnonymous:E};Object.assign(r,R)}async function BE(r){const e=yt(r);await Lu(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function $E(r,e){return[...r.filter(s=>!e.some(o=>o.providerId===s.providerId)),...e]}function Dy(r){return r.map(e=>{var{providerId:t}=e,s=Od(e,["providerId"]);return{providerId:t,uid:s.rawId||"",displayName:s.displayName||null,email:s.email||null,phoneNumber:s.phoneNumber||null,photoURL:s.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function WE(r,e){const t=await Py(r,{},async()=>{const s=Ba({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:o,apiKey:l}=r.config,h=xy(r,o,"/v1/token",`key=${l}`),p=await r._getAdditionalHeaders();return p["Content-Type"]="application/x-www-form-urlencoded",Cy.fetch()(h,{method:"POST",headers:p,body:s})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function qE(r,e){return Vi(r,"POST","/v2/accounts:revokeToken",Oi(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _o{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ve(e.idToken,"internal-error"),ve(typeof e.idToken<"u","internal-error"),ve(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Xm(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){ve(e.length!==0,"internal-error");const t=Xm(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(ve(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:s,refreshToken:o,expiresIn:l}=await WE(e,t);this.updateTokensAndExpiration(s,o,Number(l))}updateTokensAndExpiration(e,t,s){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,t){const{refreshToken:s,accessToken:o,expirationTime:l}=t,h=new _o;return s&&(ve(typeof s=="string","internal-error",{appName:e}),h.refreshToken=s),o&&(ve(typeof o=="string","internal-error",{appName:e}),h.accessToken=o),l&&(ve(typeof l=="number","internal-error",{appName:e}),h.expirationTime=l),h}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new _o,this.toJSON())}_performRefresh(){return Mr("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wi(r,e){ve(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class Fr{constructor(e){var{uid:t,auth:s,stsTokenManager:o}=e,l=Od(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new zE(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=s,this.stsTokenManager=o,this.accessToken=o.accessToken,this.displayName=l.displayName||null,this.email=l.email||null,this.emailVerified=l.emailVerified||!1,this.phoneNumber=l.phoneNumber||null,this.photoURL=l.photoURL||null,this.isAnonymous=l.isAnonymous||!1,this.tenantId=l.tenantId||null,this.providerData=l.providerData?[...l.providerData]:[],this.metadata=new cd(l.createdAt||void 0,l.lastLoginAt||void 0)}async getIdToken(e){const t=await Da(this,this.stsTokenManager.getToken(this.auth,e));return ve(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return UE(this,e)}reload(){return BE(this)}_assign(e){this!==e&&(ve(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Fr(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){ve(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),t&&await Lu(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(lr(this.auth.app))return Promise.reject(jr(this.auth));const e=await this.getIdToken();return await Da(this,FE(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var s,o,l,h,p,g,_,E;const R=(s=t.displayName)!==null&&s!==void 0?s:void 0,O=(o=t.email)!==null&&o!==void 0?o:void 0,j=(l=t.phoneNumber)!==null&&l!==void 0?l:void 0,q=(h=t.photoURL)!==null&&h!==void 0?h:void 0,Q=(p=t.tenantId)!==null&&p!==void 0?p:void 0,B=(g=t._redirectEventId)!==null&&g!==void 0?g:void 0,ce=(_=t.createdAt)!==null&&_!==void 0?_:void 0,_e=(E=t.lastLoginAt)!==null&&E!==void 0?E:void 0,{uid:de,emailVerified:fe,isAnonymous:Re,providerData:X,stsTokenManager:C}=t;ve(de&&C,e,"internal-error");const T=_o.fromJSON(this.name,C);ve(typeof de=="string",e,"internal-error"),wi(R,e.name),wi(O,e.name),ve(typeof fe=="boolean",e,"internal-error"),ve(typeof Re=="boolean",e,"internal-error"),wi(j,e.name),wi(q,e.name),wi(Q,e.name),wi(B,e.name),wi(ce,e.name),wi(_e,e.name);const k=new Fr({uid:de,auth:e,email:O,emailVerified:fe,displayName:R,isAnonymous:Re,photoURL:q,phoneNumber:j,tenantId:Q,stsTokenManager:T,createdAt:ce,lastLoginAt:_e});return X&&Array.isArray(X)&&(k.providerData=X.map(A=>Object.assign({},A))),B&&(k._redirectEventId=B),k}static async _fromIdTokenResponse(e,t,s=!1){const o=new _o;o.updateFromServerResponse(t);const l=new Fr({uid:t.localId,auth:e,stsTokenManager:o,isAnonymous:s});return await Lu(l),l}static async _fromGetAccountInfoResponse(e,t,s){const o=t.users[0];ve(o.localId!==void 0,"internal-error");const l=o.providerUserInfo!==void 0?Dy(o.providerUserInfo):[],h=!(o.email&&o.passwordHash)&&!l?.length,p=new _o;p.updateFromIdToken(s);const g=new Fr({uid:o.localId,auth:e,stsTokenManager:p,isAnonymous:h}),_={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:l,metadata:new cd(o.createdAt,o.lastLoginAt),isAnonymous:!(o.email&&o.passwordHash)&&!l?.length};return Object.assign(g,_),g}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jm=new Map;function Ur(r){Br(r instanceof Function,"Expected a class definition");let e=Jm.get(r);return e?(Br(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,Jm.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oy{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Oy.type="NONE";const Zm=Oy;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iu(r,e,t){return`firebase:${r}:${e}:${t}`}class vo{constructor(e,t,s){this.persistence=e,this.auth=t,this.userKey=s;const{config:o,name:l}=this.auth;this.fullUserKey=Iu(this.userKey,o.apiKey,l),this.fullPersistenceKey=Iu("persistence",o.apiKey,l),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Fr._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,s="authUser"){if(!t.length)return new vo(Ur(Zm),e,s);const o=(await Promise.all(t.map(async _=>{if(await _._isAvailable())return _}))).filter(_=>_);let l=o[0]||Ur(Zm);const h=Iu(s,e.config.apiKey,e.name);let p=null;for(const _ of t)try{const E=await _._get(h);if(E){const R=Fr._fromJSON(e,E);_!==l&&(p=R),l=_;break}}catch{}const g=o.filter(_=>_._shouldAllowMigration);return!l._shouldAllowMigration||!g.length?new vo(l,e,s):(l=g[0],p&&await l._set(h,p.toJSON()),await Promise.all(t.map(async _=>{if(_!==l)try{await _._remove(h)}catch{}})),new vo(l,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eg(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(My(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Vy(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Uy(e))return"Blackberry";if(jy(e))return"Webos";if(by(e))return"Safari";if((e.includes("chrome/")||Ly(e))&&!e.includes("edge/"))return"Chrome";if(Fy(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=r.match(t);if(s?.length===2)return s[1]}return"Other"}function Vy(r=$t()){return/firefox\//i.test(r)}function by(r=$t()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ly(r=$t()){return/crios\//i.test(r)}function My(r=$t()){return/iemobile/i.test(r)}function Fy(r=$t()){return/android/i.test(r)}function Uy(r=$t()){return/blackberry/i.test(r)}function jy(r=$t()){return/webos/i.test(r)}function Md(r=$t()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function HE(r=$t()){var e;return Md(r)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function KE(){return aw()&&document.documentMode===10}function zy(r=$t()){return Md(r)||Fy(r)||jy(r)||Uy(r)||/windows phone/i.test(r)||My(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function By(r,e=[]){let t;switch(r){case"Browser":t=eg($t());break;case"Worker":t=`${eg($t())}-${r}`;break;default:t=r}const s=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ys}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GE{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const s=l=>new Promise((h,p)=>{try{const g=e(l);h(g)}catch(g){p(g)}});s.onAbort=t,this.queue.push(s);const o=this.queue.length-1;return()=>{this.queue[o]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const s of this.queue)await s(e),s.onAbort&&t.push(s.onAbort)}catch(s){t.reverse();for(const o of t)try{o()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function QE(r,e={}){return Vi(r,"GET","/v2/passwordPolicy",Oi(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YE=6;class XE{constructor(e){var t,s,o,l;const h=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=h.minPasswordLength)!==null&&t!==void 0?t:YE,h.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=h.maxPasswordLength),h.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=h.containsLowercaseCharacter),h.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=h.containsUppercaseCharacter),h.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=h.containsNumericCharacter),h.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=h.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(o=(s=e.allowedNonAlphanumericCharacters)===null||s===void 0?void 0:s.join(""))!==null&&o!==void 0?o:"",this.forceUpgradeOnSignin=(l=e.forceUpgradeOnSignin)!==null&&l!==void 0?l:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,s,o,l,h,p;const g={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,g),this.validatePasswordCharacterOptions(e,g),g.isValid&&(g.isValid=(t=g.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),g.isValid&&(g.isValid=(s=g.meetsMaxPasswordLength)!==null&&s!==void 0?s:!0),g.isValid&&(g.isValid=(o=g.containsLowercaseLetter)!==null&&o!==void 0?o:!0),g.isValid&&(g.isValid=(l=g.containsUppercaseLetter)!==null&&l!==void 0?l:!0),g.isValid&&(g.isValid=(h=g.containsNumericCharacter)!==null&&h!==void 0?h:!0),g.isValid&&(g.isValid=(p=g.containsNonAlphanumericCharacter)!==null&&p!==void 0?p:!0),g}validatePasswordLengthOptions(e,t){const s=this.customStrengthOptions.minPasswordLength,o=this.customStrengthOptions.maxPasswordLength;s&&(t.meetsMinPasswordLength=e.length>=s),o&&(t.meetsMaxPasswordLength=e.length<=o)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let s;for(let o=0;o<e.length;o++)s=e.charAt(o),this.updatePasswordCharacterOptionsStatuses(t,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,t,s,o,l){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=o)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=l))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JE{constructor(e,t,s,o){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=s,this.config=o,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new tg(this),this.idTokenSubscription=new tg(this),this.beforeStateQueue=new GE(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ky,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=o.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ur(t)),this._initializationPromise=this.queue(async()=>{var s,o;if(!this._deleted&&(this.persistenceManager=await vo.create(this,e),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((o=this.currentUser)===null||o===void 0?void 0:o.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ny(this,{idToken:e}),s=await Fr._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(s)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(lr(this.app)){const h=this.app.settings.authIdToken;return h?new Promise(p=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(h).then(p,p))}):this.directlySetCurrentUser(null)}const s=await this.assertedPersistence.getCurrentUser();let o=s,l=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const h=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,p=o?._redirectEventId,g=await this.tryRedirectSignIn(e);(!h||h===p)&&g?.user&&(o=g.user,l=!0)}if(!o)return this.directlySetCurrentUser(null);if(!o._redirectEventId){if(l)try{await this.beforeStateQueue.runMiddleware(o)}catch(h){o=s,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(h))}return o?this.reloadAndSetCurrentUserOrClear(o):this.directlySetCurrentUser(null)}return ve(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===o._redirectEventId?this.directlySetCurrentUser(o):this.reloadAndSetCurrentUserOrClear(o)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Lu(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=NE()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(lr(this.app))return Promise.reject(jr(this));const t=e?yt(e):null;return t&&ve(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&ve(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return lr(this.app)?Promise.reject(jr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return lr(this.app)?Promise.reject(jr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ur(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await QE(this),t=new XE(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new za("auth","Firebase",e())}onAuthStateChanged(e,t,s){return this.registerStateListener(this.authStateSubscription,e,t,s)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,s){return this.registerStateListener(this.idTokenSubscription,e,t,s)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(s.tenantId=this.tenantId),await qE(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const s=await this.getOrInitRedirectPersistenceManager(t);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ur(e)||this._popupRedirectResolver;ve(t,this,"argument-error"),this.redirectPersistenceManager=await vo.create(this,[Ur(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,s;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((s=this.redirectUser)===null||s===void 0?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const s=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==s&&(this.lastNotifiedUid=s,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,s,o){if(this._deleted)return()=>{};const l=typeof t=="function"?t:t.next.bind(t);let h=!1;const p=this._isInitialized?Promise.resolve():this._initializationPromise;if(ve(p,this,"internal-error"),p.then(()=>{h||l(this.currentUser)}),typeof t=="function"){const g=e.addObserver(t,s,o);return()=>{h=!0,g()}}else{const g=e.addObserver(t);return()=>{h=!0,g()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ve(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=By(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const s=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());s&&(t["X-Firebase-Client"]=s);const o=await this._getAppCheckToken();return o&&(t["X-Firebase-AppCheck"]=o),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&CE(`Error while retrieving App Check token: ${t.error}`),t?.token}}function _s(r){return yt(r)}class tg{constructor(e){this.auth=e,this.observer=null,this.addObserver=mw(t=>this.observer=t)}get next(){return ve(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zu={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ZE(r){Zu=r}function $y(r){return Zu.loadJS(r)}function eT(){return Zu.recaptchaEnterpriseScript}function tT(){return Zu.gapiScript}function nT(r){return`__${r}${Math.floor(Math.random()*1e6)}`}const rT="recaptcha-enterprise",iT="NO_RECAPTCHA";class sT{constructor(e){this.type=rT,this.auth=_s(e)}async verify(e="verify",t=!1){async function s(l){if(!t){if(l.tenantId==null&&l._agentRecaptchaConfig!=null)return l._agentRecaptchaConfig.siteKey;if(l.tenantId!=null&&l._tenantRecaptchaConfigs[l.tenantId]!==void 0)return l._tenantRecaptchaConfigs[l.tenantId].siteKey}return new Promise(async(h,p)=>{ME(l,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(g=>{if(g.recaptchaKey===void 0)p(new Error("recaptcha Enterprise site key undefined"));else{const _=new LE(g);return l.tenantId==null?l._agentRecaptchaConfig=_:l._tenantRecaptchaConfigs[l.tenantId]=_,h(_.siteKey)}}).catch(g=>{p(g)})})}function o(l,h,p){const g=window.grecaptcha;Ym(g)?g.enterprise.ready(()=>{g.enterprise.execute(l,{action:e}).then(_=>{h(_)}).catch(()=>{h(iT)})}):p(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((l,h)=>{s(this.auth).then(p=>{if(!t&&Ym(window.grecaptcha))o(p,l,h);else{if(typeof window>"u"){h(new Error("RecaptchaVerifier is only supported in browser"));return}let g=eT();g.length!==0&&(g+=p),$y(g).then(()=>{o(p,l,h)}).catch(_=>{h(_)})}}).catch(p=>{h(p)})})}}async function ng(r,e,t,s=!1){const o=new sT(r);let l;try{l=await o.verify(t)}catch{l=await o.verify(t,!0)}const h=Object.assign({},e);return s?Object.assign(h,{captchaResp:l}):Object.assign(h,{captchaResponse:l}),Object.assign(h,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(h,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),h}async function hd(r,e,t,s){var o;if(!((o=r._getRecaptchaConfig())===null||o===void 0)&&o.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const l=await ng(r,e,t,t==="getOobCode");return s(r,l)}else return s(r,e).catch(async l=>{if(l.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const h=await ng(r,e,t,t==="getOobCode");return s(r,h)}else return Promise.reject(l)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oT(r,e){const t=Ju(r,"auth");if(t.isInitialized()){const o=t.getImmediate(),l=t.getOptions();if(Ou(l,e??{}))return o;Kn(o,"already-initialized")}return t.initialize({options:e})}function aT(r,e){const t=e?.persistence||[],s=(Array.isArray(t)?t:[t]).map(Ur);e?.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(s,e?.popupRedirectResolver)}function lT(r,e,t){const s=_s(r);ve(s._canInitEmulator,s,"emulator-config-failed"),ve(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const o=!1,l=Wy(e),{host:h,port:p}=uT(e),g=p===null?"":`:${p}`;s.config.emulator={url:`${l}//${h}${g}/`},s.settings.appVerificationDisabledForTesting=!0,s.emulatorConfig=Object.freeze({host:h,port:p,protocol:l.replace(":",""),options:Object.freeze({disableWarnings:o})}),cT()}function Wy(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function uT(r){const e=Wy(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const s=t[2].split("@").pop()||"",o=/^(\[[^\]]+\])(:|$)/.exec(s);if(o){const l=o[1];return{host:l,port:rg(s.substr(l.length+1))}}else{const[l,h]=s.split(":");return{host:l,port:rg(h)}}}function rg(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function cT(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fd{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Mr("not implemented")}_getIdTokenResponse(e){return Mr("not implemented")}_linkToIdToken(e,t){return Mr("not implemented")}_getReauthenticationResolver(e){return Mr("not implemented")}}async function hT(r,e){return Vi(r,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dT(r,e){return Wa(r,"POST","/v1/accounts:signInWithPassword",Oi(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fT(r,e){return Wa(r,"POST","/v1/accounts:signInWithEmailLink",Oi(r,e))}async function pT(r,e){return Wa(r,"POST","/v1/accounts:signInWithEmailLink",Oi(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa extends Fd{constructor(e,t,s,o=null){super("password",s),this._email=e,this._password=t,this._tenantId=o}static _fromEmailAndPassword(e,t){return new Oa(e,t,"password")}static _fromEmailAndCode(e,t,s=null){return new Oa(e,t,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return hd(e,t,"signInWithPassword",dT);case"emailLink":return fT(e,{email:this._email,oobCode:this._password});default:Kn(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const s={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return hd(e,s,"signUpPassword",hT);case"emailLink":return pT(e,{idToken:t,email:this._email,oobCode:this._password});default:Kn(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wo(r,e){return Wa(r,"POST","/v1/accounts:signInWithIdp",Oi(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mT="http://localhost";class ds extends Fd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ds(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Kn("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:o}=t,l=Od(t,["providerId","signInMethod"]);if(!s||!o)return null;const h=new ds(s,o);return h.idToken=l.idToken||void 0,h.accessToken=l.accessToken||void 0,h.secret=l.secret,h.nonce=l.nonce,h.pendingToken=l.pendingToken||null,h}_getIdTokenResponse(e){const t=this.buildRequest();return wo(e,t)}_linkToIdToken(e,t){const s=this.buildRequest();return s.idToken=t,wo(e,s)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,wo(e,t)}buildRequest(){const e={requestUri:mT,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ba(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gT(r){switch(r){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function yT(r){const e=wa(Ea(r)).link,t=e?wa(Ea(e)).deep_link_id:null,s=wa(Ea(r)).deep_link_id;return(s?wa(Ea(s)).link:null)||s||t||e||r}class Ud{constructor(e){var t,s,o,l,h,p;const g=wa(Ea(e)),_=(t=g.apiKey)!==null&&t!==void 0?t:null,E=(s=g.oobCode)!==null&&s!==void 0?s:null,R=gT((o=g.mode)!==null&&o!==void 0?o:null);ve(_&&E&&R,"argument-error"),this.apiKey=_,this.operation=R,this.code=E,this.continueUrl=(l=g.continueUrl)!==null&&l!==void 0?l:null,this.languageCode=(h=g.languageCode)!==null&&h!==void 0?h:null,this.tenantId=(p=g.tenantId)!==null&&p!==void 0?p:null}static parseLink(e){const t=yT(e);try{return new Ud(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(){this.providerId=Po.PROVIDER_ID}static credential(e,t){return Oa._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const s=Ud.parseLink(t);return ve(s,"argument-error"),Oa._fromEmailAndCode(e,s.code,s.tenantId)}}Po.PROVIDER_ID="password";Po.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Po.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qy{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qa extends qy{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei extends qa{constructor(){super("facebook.com")}static credential(e){return ds._fromParams({providerId:Ei.PROVIDER_ID,signInMethod:Ei.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ei.credentialFromTaggedObject(e)}static credentialFromError(e){return Ei.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ei.credential(e.oauthAccessToken)}catch{return null}}}Ei.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ei.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti extends qa{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ds._fromParams({providerId:Ti.PROVIDER_ID,signInMethod:Ti.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ti.credentialFromTaggedObject(e)}static credentialFromError(e){return Ti.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:s}=e;if(!t&&!s)return null;try{return Ti.credential(t,s)}catch{return null}}}Ti.GOOGLE_SIGN_IN_METHOD="google.com";Ti.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii extends qa{constructor(){super("github.com")}static credential(e){return ds._fromParams({providerId:Ii.PROVIDER_ID,signInMethod:Ii.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ii.credentialFromTaggedObject(e)}static credentialFromError(e){return Ii.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ii.credential(e.oauthAccessToken)}catch{return null}}}Ii.GITHUB_SIGN_IN_METHOD="github.com";Ii.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si extends qa{constructor(){super("twitter.com")}static credential(e,t){return ds._fromParams({providerId:Si.PROVIDER_ID,signInMethod:Si.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Si.credentialFromTaggedObject(e)}static credentialFromError(e){return Si.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:s}=e;if(!t||!s)return null;try{return Si.credential(t,s)}catch{return null}}}Si.TWITTER_SIGN_IN_METHOD="twitter.com";Si.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _T(r,e){return Wa(r,"POST","/v1/accounts:signUp",Oi(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fs{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,s,o=!1){const l=await Fr._fromIdTokenResponse(e,s,o),h=ig(s);return new fs({user:l,providerId:h,_tokenResponse:s,operationType:t})}static async _forOperation(e,t,s){await e._updateTokensIfNecessary(s,!0);const o=ig(s);return new fs({user:e,providerId:o,_tokenResponse:s,operationType:t})}}function ig(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mu extends yr{constructor(e,t,s,o){var l;super(t.code,t.message),this.operationType=s,this.user=o,Object.setPrototypeOf(this,Mu.prototype),this.customData={appName:e.name,tenantId:(l=e.tenantId)!==null&&l!==void 0?l:void 0,_serverResponse:t.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,t,s,o){return new Mu(e,t,s,o)}}function Hy(r,e,t,s){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(l=>{throw l.code==="auth/multi-factor-auth-required"?Mu._fromErrorAndOperation(r,l,e,s):l})}async function vT(r,e,t=!1){const s=await Da(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return fs._forOperation(r,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wT(r,e,t=!1){const{auth:s}=r;if(lr(s.app))return Promise.reject(jr(s));const o="reauthenticate";try{const l=await Da(r,Hy(s,o,e,r),t);ve(l.idToken,s,"internal-error");const h=Ld(l.idToken);ve(h,s,"internal-error");const{sub:p}=h;return ve(r.uid===p,s,"user-mismatch"),fs._forOperation(r,o,l)}catch(l){throw l?.code==="auth/user-not-found"&&Kn(s,"user-mismatch"),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ky(r,e,t=!1){if(lr(r.app))return Promise.reject(jr(r));const s="signIn",o=await Hy(r,s,e),l=await fs._fromIdTokenResponse(r,s,o);return t||await r._updateCurrentUser(l.user),l}async function ET(r,e){return Ky(_s(r),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gy(r){const e=_s(r);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function TT(r,e,t){if(lr(r.app))return Promise.reject(jr(r));const s=_s(r),h=await hd(s,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",_T).catch(g=>{throw g.code==="auth/password-does-not-meet-requirements"&&Gy(r),g}),p=await fs._fromIdTokenResponse(s,"signIn",h);return await s._updateCurrentUser(p.user),p}function IT(r,e,t){return lr(r.app)?Promise.reject(jr(r)):ET(yt(r),Po.credential(e,t)).catch(async s=>{throw s.code==="auth/password-does-not-meet-requirements"&&Gy(r),s})}function ST(r,e,t,s){return yt(r).onIdTokenChanged(e,t,s)}function AT(r,e,t){return yt(r).beforeAuthStateChanged(e,t)}function kT(r,e,t,s){return yt(r).onAuthStateChanged(e,t,s)}const Fu="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qy{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Fu,"1"),this.storage.removeItem(Fu),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RT=1e3,CT=10;class Yy extends Qy{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=zy(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const s=this.storage.getItem(t),o=this.localCache[t];s!==o&&e(t,o,s)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((h,p,g)=>{this.notifyListeners(h,g)});return}const s=e.key;t?this.detachListener():this.stopPolling();const o=()=>{const h=this.storage.getItem(s);!t&&this.localCache[s]===h||this.notifyListeners(s,h)},l=this.storage.getItem(s);KE()&&l!==e.newValue&&e.newValue!==e.oldValue?setTimeout(o,CT):o()}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const o of Array.from(s))o(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:s}),!0)})},RT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Yy.type="LOCAL";const PT=Yy;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xy extends Qy{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Xy.type="SESSION";const Jy=Xy;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xT(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ec{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(o=>o.isListeningto(e));if(t)return t;const s=new ec(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:s,eventType:o,data:l}=t.data,h=this.handlersMap[o];if(!h?.size)return;t.ports[0].postMessage({status:"ack",eventId:s,eventType:o});const p=Array.from(h).map(async _=>_(t.origin,l)),g=await xT(p);t.ports[0].postMessage({status:"done",eventId:s,eventType:o,response:g})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ec.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jd(r="",e=10){let t="";for(let s=0;s<e;s++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NT{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,s=50){const o=typeof MessageChannel<"u"?new MessageChannel:null;if(!o)throw new Error("connection_unavailable");let l,h;return new Promise((p,g)=>{const _=jd("",20);o.port1.start();const E=setTimeout(()=>{g(new Error("unsupported_event"))},s);h={messageChannel:o,onMessage(R){const O=R;if(O.data.eventId===_)switch(O.data.status){case"ack":clearTimeout(E),l=setTimeout(()=>{g(new Error("timeout"))},3e3);break;case"done":clearTimeout(l),p(O.data.response);break;default:clearTimeout(E),clearTimeout(l),g(new Error("invalid_response"));break}}},this.handlers.add(h),o.port1.addEventListener("message",h.onMessage),this.target.postMessage({eventType:e,eventId:_,data:t},[o.port2])}).finally(()=>{h&&this.removeMessageHandler(h)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hr(){return window}function DT(r){hr().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zy(){return typeof hr().WorkerGlobalScope<"u"&&typeof hr().importScripts=="function"}async function OT(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function VT(){var r;return((r=navigator?.serviceWorker)===null||r===void 0?void 0:r.controller)||null}function bT(){return Zy()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const e_="firebaseLocalStorageDb",LT=1,Uu="firebaseLocalStorage",t_="fbase_key";class Ha{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function tc(r,e){return r.transaction([Uu],e?"readwrite":"readonly").objectStore(Uu)}function MT(){const r=indexedDB.deleteDatabase(e_);return new Ha(r).toPromise()}function dd(){const r=indexedDB.open(e_,LT);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const s=r.result;try{s.createObjectStore(Uu,{keyPath:t_})}catch(o){t(o)}}),r.addEventListener("success",async()=>{const s=r.result;s.objectStoreNames.contains(Uu)?e(s):(s.close(),await MT(),e(await dd()))})})}async function sg(r,e,t){const s=tc(r,!0).put({[t_]:e,value:t});return new Ha(s).toPromise()}async function FT(r,e){const t=tc(r,!1).get(e),s=await new Ha(t).toPromise();return s===void 0?null:s.value}function og(r,e){const t=tc(r,!0).delete(e);return new Ha(t).toPromise()}const UT=800,jT=3;class n_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await dd(),this.db)}async _withRetries(e){let t=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(t++>jT)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Zy()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ec._getInstance(bT()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await OT(),!this.activeServiceWorker)return;this.sender=new NT(this.activeServiceWorker);const s=await this.sender._send("ping",{},800);s&&!((e=s[0])===null||e===void 0)&&e.fulfilled&&!((t=s[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||VT()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await dd();return await sg(e,Fu,"1"),await og(e,Fu),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(s=>sg(s,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(s=>FT(s,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>og(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(o=>{const l=tc(o,!1).getAll();return new Ha(l).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],s=new Set;if(e.length!==0)for(const{fbase_key:o,value:l}of e)s.add(o),JSON.stringify(this.localCache[o])!==JSON.stringify(l)&&(this.notifyListeners(o,l),t.push(o));for(const o of Object.keys(this.localCache))this.localCache[o]&&!s.has(o)&&(this.notifyListeners(o,null),t.push(o));return t}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const o of Array.from(s))o(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),UT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}n_.type="LOCAL";const zT=n_;new $a(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BT(r,e){return e?Ur(e):(ve(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd extends Fd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return wo(e,this._buildIdpRequest())}_linkToIdToken(e,t){return wo(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return wo(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function $T(r){return Ky(r.auth,new zd(r),r.bypassAuthState)}function WT(r){const{auth:e,user:t}=r;return ve(t,e,"internal-error"),wT(t,new zd(r),r.bypassAuthState)}async function qT(r){const{auth:e,user:t}=r;return ve(t,e,"internal-error"),vT(t,new zd(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r_{constructor(e,t,s,o,l=!1){this.auth=e,this.resolver=s,this.user=o,this.bypassAuthState=l,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:s,postBody:o,tenantId:l,error:h,type:p}=e;if(h){this.reject(h);return}const g={auth:this.auth,requestUri:t,sessionId:s,tenantId:l||void 0,postBody:o||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(p)(g))}catch(_){this.reject(_)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return $T;case"linkViaPopup":case"linkViaRedirect":return qT;case"reauthViaPopup":case"reauthViaRedirect":return WT;default:Kn(this.auth,"internal-error")}}resolve(e){Br(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Br(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HT=new $a(2e3,1e4);class yo extends r_{constructor(e,t,s,o,l){super(e,t,o,l),this.provider=s,this.authWindow=null,this.pollId=null,yo.currentPopupAction&&yo.currentPopupAction.cancel(),yo.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ve(e,this.auth,"internal-error"),e}async onExecution(){Br(this.filter.length===1,"Popup operations only handle one event");const e=jd();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(cr(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(cr(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,yo.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,s;if(!((s=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||s===void 0)&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(cr(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,HT.get())};e()}}yo.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KT="pendingRedirect",Su=new Map;class GT extends r_{constructor(e,t,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,s),this.eventId=null}async execute(){let e=Su.get(this.auth._key());if(!e){try{const s=await QT(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(t){e=()=>Promise.reject(t)}Su.set(this.auth._key(),e)}return this.bypassAuthState||Su.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function QT(r,e){const t=JT(e),s=XT(r);if(!await s._isAvailable())return!1;const o=await s._get(t)==="true";return await s._remove(t),o}function YT(r,e){Su.set(r._key(),e)}function XT(r){return Ur(r._redirectPersistence)}function JT(r){return Iu(KT,r.config.apiKey,r.name)}async function ZT(r,e,t=!1){if(lr(r.app))return Promise.reject(jr(r));const s=_s(r),o=BT(s,e),h=await new GT(s,o,t).execute();return h&&!t&&(delete h.user._redirectEventId,await s._persistUserIfCurrent(h.user),await s._setRedirectUser(null,e)),h}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eI=10*60*1e3;class tI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(t=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!nI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var s;if(e.error&&!i_(e)){const o=((s=e.error.code)===null||s===void 0?void 0:s.split("auth/")[1])||"internal-error";t.onError(cr(this.auth,o))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const s=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=eI&&this.cachedEventUids.clear(),this.cachedEventUids.has(ag(e))}saveEventToCache(e){this.cachedEventUids.add(ag(e)),this.lastProcessedEventTime=Date.now()}}function ag(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function i_({type:r,error:e}){return r==="unknown"&&e?.code==="auth/no-auth-event"}function nI(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return i_(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rI(r,e={}){return Vi(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,sI=/^https?/;async function oI(r){if(r.config.emulator)return;const{authorizedDomains:e}=await rI(r);for(const t of e)try{if(aI(t))return}catch{}Kn(r,"unauthorized-domain")}function aI(r){const e=ud(),{protocol:t,hostname:s}=new URL(e);if(r.startsWith("chrome-extension://")){const h=new URL(r);return h.hostname===""&&s===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&h.hostname===s}if(!sI.test(t))return!1;if(iI.test(r))return s===r;const o=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+o+"|"+o+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lI=new $a(3e4,6e4);function lg(){const r=hr().___jsl;if(r?.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function uI(r){return new Promise((e,t)=>{var s,o,l;function h(){lg(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{lg(),t(cr(r,"network-request-failed"))},timeout:lI.get()})}if(!((o=(s=hr().gapi)===null||s===void 0?void 0:s.iframes)===null||o===void 0)&&o.Iframe)e(gapi.iframes.getContext());else if(!((l=hr().gapi)===null||l===void 0)&&l.load)h();else{const p=nT("iframefcb");return hr()[p]=()=>{gapi.load?h():t(cr(r,"network-request-failed"))},$y(`${tT()}?onload=${p}`).catch(g=>t(g))}}).catch(e=>{throw Au=null,e})}let Au=null;function cI(r){return Au=Au||uI(r),Au}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hI=new $a(5e3,15e3),dI="__/auth/iframe",fI="emulator/auth/iframe",pI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},mI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function gI(r){const e=r.config;ve(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?bd(e,fI):`https://${r.config.authDomain}/${dI}`,s={apiKey:e.apiKey,appName:r.name,v:ys},o=mI.get(r.config.apiHost);o&&(s.eid=o);const l=r._getFrameworks();return l.length&&(s.fw=l.join(",")),`${t}?${Ba(s).slice(1)}`}async function yI(r){const e=await cI(r),t=hr().gapi;return ve(t,r,"internal-error"),e.open({where:document.body,url:gI(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:pI,dontclear:!0},s=>new Promise(async(o,l)=>{await s.restyle({setHideOnLeave:!1});const h=cr(r,"network-request-failed"),p=hr().setTimeout(()=>{l(h)},hI.get());function g(){hr().clearTimeout(p),o(s)}s.ping(g).then(g,()=>{l(h)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _I={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},vI=500,wI=600,EI="_blank",TI="http://localhost";class ug{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function II(r,e,t,s=vI,o=wI){const l=Math.max((window.screen.availHeight-o)/2,0).toString(),h=Math.max((window.screen.availWidth-s)/2,0).toString();let p="";const g=Object.assign(Object.assign({},_I),{width:s.toString(),height:o.toString(),top:l,left:h}),_=$t().toLowerCase();t&&(p=Ly(_)?EI:t),Vy(_)&&(e=e||TI,g.scrollbars="yes");const E=Object.entries(g).reduce((O,[j,q])=>`${O}${j}=${q},`,"");if(HE(_)&&p!=="_self")return SI(e||"",p),new ug(null);const R=window.open(e||"",p,E);ve(R,r,"popup-blocked");try{R.focus()}catch{}return new ug(R)}function SI(r,e){const t=document.createElement("a");t.href=r,t.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AI="__/auth/handler",kI="emulator/auth/handler",RI=encodeURIComponent("fac");async function cg(r,e,t,s,o,l){ve(r.config.authDomain,r,"auth-domain-config-required"),ve(r.config.apiKey,r,"invalid-api-key");const h={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:s,v:ys,eventId:o};if(e instanceof qy){e.setDefaultLanguage(r.languageCode),h.providerId=e.providerId||"",pw(e.getCustomParameters())||(h.customParameters=JSON.stringify(e.getCustomParameters()));for(const[E,R]of Object.entries({}))h[E]=R}if(e instanceof qa){const E=e.getScopes().filter(R=>R!=="");E.length>0&&(h.scopes=E.join(","))}r.tenantId&&(h.tid=r.tenantId);const p=h;for(const E of Object.keys(p))p[E]===void 0&&delete p[E];const g=await r._getAppCheckToken(),_=g?`#${RI}=${encodeURIComponent(g)}`:"";return`${CI(r)}?${Ba(p).slice(1)}${_}`}function CI({config:r}){return r.emulator?bd(r,kI):`https://${r.authDomain}/${AI}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jh="webStorageSupport";class PI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Jy,this._completeRedirectFn=ZT,this._overrideRedirectResult=YT}async _openPopup(e,t,s,o){var l;Br((l=this.eventManagers[e._key()])===null||l===void 0?void 0:l.manager,"_initialize() not called before _openPopup()");const h=await cg(e,t,s,ud(),o);return II(e,h,jd())}async _openRedirect(e,t,s,o){await this._originValidation(e);const l=await cg(e,t,s,ud(),o);return DT(l),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:o,promise:l}=this.eventManagers[t];return o?Promise.resolve(o):(Br(l,"If manager is not set, promise should be"),l)}const s=this.initAndGetManager(e);return this.eventManagers[t]={promise:s},s.catch(()=>{delete this.eventManagers[t]}),s}async initAndGetManager(e){const t=await yI(e),s=new tI(e);return t.register("authEvent",o=>(ve(o?.authEvent,e,"invalid-auth-event"),{status:s.onEvent(o.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=t,s}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Jh,{type:Jh},o=>{var l;const h=(l=o?.[0])===null||l===void 0?void 0:l[Jh];h!==void 0&&t(!!h),Kn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=oI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return zy()||by()||Md()}}const xI=PI;var hg="@firebase/auth",dg="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NI{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(s=>{e(s?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){ve(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DI(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function OI(r){hs(new Pi("auth",(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),o=e.getProvider("heartbeat"),l=e.getProvider("app-check-internal"),{apiKey:h,authDomain:p}=s.options;ve(h&&!h.includes(":"),"invalid-api-key",{appName:s.name});const g={apiKey:h,authDomain:p,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:By(r)},_=new JE(s,o,l,g);return aT(_,t),_},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,s)=>{e.getProvider("auth-internal").initialize()})),hs(new Pi("auth-internal",e=>{const t=_s(e.getProvider("auth").getImmediate());return(s=>new NI(s))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ur(hg,dg,DI(r)),ur(hg,dg,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VI=5*60,bI=_y("authIdTokenMaxAge")||VI;let fg=null;const LI=r=>async e=>{const t=e&&await e.getIdTokenResult(),s=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(s&&s>bI)return;const o=t?.token;fg!==o&&(fg=o,await fetch(r,{method:o?"POST":"DELETE",headers:o?{Authorization:`Bearer ${o}`}:{}}))};function s_(r=Dd()){const e=Ju(r,"auth");if(e.isInitialized())return e.getImmediate();const t=oT(r,{popupRedirectResolver:xI,persistence:[zT,PT,Jy]}),s=_y("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const l=new URL(s,location.origin);if(location.origin===l.origin){const h=LI(l.toString());AT(t,h,()=>h(t.currentUser)),ST(t,p=>h(p))}}const o=my("auth");return o&&lT(t,`http://${o}`),t}function MI(){var r,e;return(e=(r=document.getElementsByTagName("head"))===null||r===void 0?void 0:r[0])!==null&&e!==void 0?e:document}ZE({loadJS(r){return new Promise((e,t)=>{const s=document.createElement("script");s.setAttribute("src",r),s.onload=e,s.onerror=o=>{const l=cr("internal-error");l.customData=o,t(l)},s.type="text/javascript",s.charset="UTF-8",MI().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});OI("Browser");var pg=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ls,o_;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(C,T){function k(){}k.prototype=T.prototype,C.D=T.prototype,C.prototype=new k,C.prototype.constructor=C,C.C=function(A,D,b){for(var S=Array(arguments.length-2),Ke=2;Ke<arguments.length;Ke++)S[Ke-2]=arguments[Ke];return T.prototype[D].apply(A,S)}}function t(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(s,t),s.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function o(C,T,k){k||(k=0);var A=Array(16);if(typeof T=="string")for(var D=0;16>D;++D)A[D]=T.charCodeAt(k++)|T.charCodeAt(k++)<<8|T.charCodeAt(k++)<<16|T.charCodeAt(k++)<<24;else for(D=0;16>D;++D)A[D]=T[k++]|T[k++]<<8|T[k++]<<16|T[k++]<<24;T=C.g[0],k=C.g[1],D=C.g[2];var b=C.g[3],S=T+(b^k&(D^b))+A[0]+3614090360&4294967295;T=k+(S<<7&4294967295|S>>>25),S=b+(D^T&(k^D))+A[1]+3905402710&4294967295,b=T+(S<<12&4294967295|S>>>20),S=D+(k^b&(T^k))+A[2]+606105819&4294967295,D=b+(S<<17&4294967295|S>>>15),S=k+(T^D&(b^T))+A[3]+3250441966&4294967295,k=D+(S<<22&4294967295|S>>>10),S=T+(b^k&(D^b))+A[4]+4118548399&4294967295,T=k+(S<<7&4294967295|S>>>25),S=b+(D^T&(k^D))+A[5]+1200080426&4294967295,b=T+(S<<12&4294967295|S>>>20),S=D+(k^b&(T^k))+A[6]+2821735955&4294967295,D=b+(S<<17&4294967295|S>>>15),S=k+(T^D&(b^T))+A[7]+4249261313&4294967295,k=D+(S<<22&4294967295|S>>>10),S=T+(b^k&(D^b))+A[8]+1770035416&4294967295,T=k+(S<<7&4294967295|S>>>25),S=b+(D^T&(k^D))+A[9]+2336552879&4294967295,b=T+(S<<12&4294967295|S>>>20),S=D+(k^b&(T^k))+A[10]+4294925233&4294967295,D=b+(S<<17&4294967295|S>>>15),S=k+(T^D&(b^T))+A[11]+2304563134&4294967295,k=D+(S<<22&4294967295|S>>>10),S=T+(b^k&(D^b))+A[12]+1804603682&4294967295,T=k+(S<<7&4294967295|S>>>25),S=b+(D^T&(k^D))+A[13]+4254626195&4294967295,b=T+(S<<12&4294967295|S>>>20),S=D+(k^b&(T^k))+A[14]+2792965006&4294967295,D=b+(S<<17&4294967295|S>>>15),S=k+(T^D&(b^T))+A[15]+1236535329&4294967295,k=D+(S<<22&4294967295|S>>>10),S=T+(D^b&(k^D))+A[1]+4129170786&4294967295,T=k+(S<<5&4294967295|S>>>27),S=b+(k^D&(T^k))+A[6]+3225465664&4294967295,b=T+(S<<9&4294967295|S>>>23),S=D+(T^k&(b^T))+A[11]+643717713&4294967295,D=b+(S<<14&4294967295|S>>>18),S=k+(b^T&(D^b))+A[0]+3921069994&4294967295,k=D+(S<<20&4294967295|S>>>12),S=T+(D^b&(k^D))+A[5]+3593408605&4294967295,T=k+(S<<5&4294967295|S>>>27),S=b+(k^D&(T^k))+A[10]+38016083&4294967295,b=T+(S<<9&4294967295|S>>>23),S=D+(T^k&(b^T))+A[15]+3634488961&4294967295,D=b+(S<<14&4294967295|S>>>18),S=k+(b^T&(D^b))+A[4]+3889429448&4294967295,k=D+(S<<20&4294967295|S>>>12),S=T+(D^b&(k^D))+A[9]+568446438&4294967295,T=k+(S<<5&4294967295|S>>>27),S=b+(k^D&(T^k))+A[14]+3275163606&4294967295,b=T+(S<<9&4294967295|S>>>23),S=D+(T^k&(b^T))+A[3]+4107603335&4294967295,D=b+(S<<14&4294967295|S>>>18),S=k+(b^T&(D^b))+A[8]+1163531501&4294967295,k=D+(S<<20&4294967295|S>>>12),S=T+(D^b&(k^D))+A[13]+2850285829&4294967295,T=k+(S<<5&4294967295|S>>>27),S=b+(k^D&(T^k))+A[2]+4243563512&4294967295,b=T+(S<<9&4294967295|S>>>23),S=D+(T^k&(b^T))+A[7]+1735328473&4294967295,D=b+(S<<14&4294967295|S>>>18),S=k+(b^T&(D^b))+A[12]+2368359562&4294967295,k=D+(S<<20&4294967295|S>>>12),S=T+(k^D^b)+A[5]+4294588738&4294967295,T=k+(S<<4&4294967295|S>>>28),S=b+(T^k^D)+A[8]+2272392833&4294967295,b=T+(S<<11&4294967295|S>>>21),S=D+(b^T^k)+A[11]+1839030562&4294967295,D=b+(S<<16&4294967295|S>>>16),S=k+(D^b^T)+A[14]+4259657740&4294967295,k=D+(S<<23&4294967295|S>>>9),S=T+(k^D^b)+A[1]+2763975236&4294967295,T=k+(S<<4&4294967295|S>>>28),S=b+(T^k^D)+A[4]+1272893353&4294967295,b=T+(S<<11&4294967295|S>>>21),S=D+(b^T^k)+A[7]+4139469664&4294967295,D=b+(S<<16&4294967295|S>>>16),S=k+(D^b^T)+A[10]+3200236656&4294967295,k=D+(S<<23&4294967295|S>>>9),S=T+(k^D^b)+A[13]+681279174&4294967295,T=k+(S<<4&4294967295|S>>>28),S=b+(T^k^D)+A[0]+3936430074&4294967295,b=T+(S<<11&4294967295|S>>>21),S=D+(b^T^k)+A[3]+3572445317&4294967295,D=b+(S<<16&4294967295|S>>>16),S=k+(D^b^T)+A[6]+76029189&4294967295,k=D+(S<<23&4294967295|S>>>9),S=T+(k^D^b)+A[9]+3654602809&4294967295,T=k+(S<<4&4294967295|S>>>28),S=b+(T^k^D)+A[12]+3873151461&4294967295,b=T+(S<<11&4294967295|S>>>21),S=D+(b^T^k)+A[15]+530742520&4294967295,D=b+(S<<16&4294967295|S>>>16),S=k+(D^b^T)+A[2]+3299628645&4294967295,k=D+(S<<23&4294967295|S>>>9),S=T+(D^(k|~b))+A[0]+4096336452&4294967295,T=k+(S<<6&4294967295|S>>>26),S=b+(k^(T|~D))+A[7]+1126891415&4294967295,b=T+(S<<10&4294967295|S>>>22),S=D+(T^(b|~k))+A[14]+2878612391&4294967295,D=b+(S<<15&4294967295|S>>>17),S=k+(b^(D|~T))+A[5]+4237533241&4294967295,k=D+(S<<21&4294967295|S>>>11),S=T+(D^(k|~b))+A[12]+1700485571&4294967295,T=k+(S<<6&4294967295|S>>>26),S=b+(k^(T|~D))+A[3]+2399980690&4294967295,b=T+(S<<10&4294967295|S>>>22),S=D+(T^(b|~k))+A[10]+4293915773&4294967295,D=b+(S<<15&4294967295|S>>>17),S=k+(b^(D|~T))+A[1]+2240044497&4294967295,k=D+(S<<21&4294967295|S>>>11),S=T+(D^(k|~b))+A[8]+1873313359&4294967295,T=k+(S<<6&4294967295|S>>>26),S=b+(k^(T|~D))+A[15]+4264355552&4294967295,b=T+(S<<10&4294967295|S>>>22),S=D+(T^(b|~k))+A[6]+2734768916&4294967295,D=b+(S<<15&4294967295|S>>>17),S=k+(b^(D|~T))+A[13]+1309151649&4294967295,k=D+(S<<21&4294967295|S>>>11),S=T+(D^(k|~b))+A[4]+4149444226&4294967295,T=k+(S<<6&4294967295|S>>>26),S=b+(k^(T|~D))+A[11]+3174756917&4294967295,b=T+(S<<10&4294967295|S>>>22),S=D+(T^(b|~k))+A[2]+718787259&4294967295,D=b+(S<<15&4294967295|S>>>17),S=k+(b^(D|~T))+A[9]+3951481745&4294967295,C.g[0]=C.g[0]+T&4294967295,C.g[1]=C.g[1]+(D+(S<<21&4294967295|S>>>11))&4294967295,C.g[2]=C.g[2]+D&4294967295,C.g[3]=C.g[3]+b&4294967295}s.prototype.u=function(C,T){T===void 0&&(T=C.length);for(var k=T-this.blockSize,A=this.B,D=this.h,b=0;b<T;){if(D==0)for(;b<=k;)o(this,C,b),b+=this.blockSize;if(typeof C=="string"){for(;b<T;)if(A[D++]=C.charCodeAt(b++),D==this.blockSize){o(this,A),D=0;break}}else for(;b<T;)if(A[D++]=C[b++],D==this.blockSize){o(this,A),D=0;break}}this.h=D,this.o+=T},s.prototype.v=function(){var C=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);C[0]=128;for(var T=1;T<C.length-8;++T)C[T]=0;var k=8*this.o;for(T=C.length-8;T<C.length;++T)C[T]=k&255,k/=256;for(this.u(C),C=Array(16),T=k=0;4>T;++T)for(var A=0;32>A;A+=8)C[k++]=this.g[T]>>>A&255;return C};function l(C,T){var k=p;return Object.prototype.hasOwnProperty.call(k,C)?k[C]:k[C]=T(C)}function h(C,T){this.h=T;for(var k=[],A=!0,D=C.length-1;0<=D;D--){var b=C[D]|0;A&&b==T||(k[D]=b,A=!1)}this.g=k}var p={};function g(C){return-128<=C&&128>C?l(C,function(T){return new h([T|0],0>T?-1:0)}):new h([C|0],0>C?-1:0)}function _(C){if(isNaN(C)||!isFinite(C))return R;if(0>C)return B(_(-C));for(var T=[],k=1,A=0;C>=k;A++)T[A]=C/k|0,k*=4294967296;return new h(T,0)}function E(C,T){if(C.length==0)throw Error("number format error: empty string");if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(C.charAt(0)=="-")return B(E(C.substring(1),T));if(0<=C.indexOf("-"))throw Error('number format error: interior "-" character');for(var k=_(Math.pow(T,8)),A=R,D=0;D<C.length;D+=8){var b=Math.min(8,C.length-D),S=parseInt(C.substring(D,D+b),T);8>b?(b=_(Math.pow(T,b)),A=A.j(b).add(_(S))):(A=A.j(k),A=A.add(_(S)))}return A}var R=g(0),O=g(1),j=g(16777216);r=h.prototype,r.m=function(){if(Q(this))return-B(this).m();for(var C=0,T=1,k=0;k<this.g.length;k++){var A=this.i(k);C+=(0<=A?A:4294967296+A)*T,T*=4294967296}return C},r.toString=function(C){if(C=C||10,2>C||36<C)throw Error("radix out of range: "+C);if(q(this))return"0";if(Q(this))return"-"+B(this).toString(C);for(var T=_(Math.pow(C,6)),k=this,A="";;){var D=fe(k,T).g;k=ce(k,D.j(T));var b=((0<k.g.length?k.g[0]:k.h)>>>0).toString(C);if(k=D,q(k))return b+A;for(;6>b.length;)b="0"+b;A=b+A}},r.i=function(C){return 0>C?0:C<this.g.length?this.g[C]:this.h};function q(C){if(C.h!=0)return!1;for(var T=0;T<C.g.length;T++)if(C.g[T]!=0)return!1;return!0}function Q(C){return C.h==-1}r.l=function(C){return C=ce(this,C),Q(C)?-1:q(C)?0:1};function B(C){for(var T=C.g.length,k=[],A=0;A<T;A++)k[A]=~C.g[A];return new h(k,~C.h).add(O)}r.abs=function(){return Q(this)?B(this):this},r.add=function(C){for(var T=Math.max(this.g.length,C.g.length),k=[],A=0,D=0;D<=T;D++){var b=A+(this.i(D)&65535)+(C.i(D)&65535),S=(b>>>16)+(this.i(D)>>>16)+(C.i(D)>>>16);A=S>>>16,b&=65535,S&=65535,k[D]=S<<16|b}return new h(k,k[k.length-1]&-2147483648?-1:0)};function ce(C,T){return C.add(B(T))}r.j=function(C){if(q(this)||q(C))return R;if(Q(this))return Q(C)?B(this).j(B(C)):B(B(this).j(C));if(Q(C))return B(this.j(B(C)));if(0>this.l(j)&&0>C.l(j))return _(this.m()*C.m());for(var T=this.g.length+C.g.length,k=[],A=0;A<2*T;A++)k[A]=0;for(A=0;A<this.g.length;A++)for(var D=0;D<C.g.length;D++){var b=this.i(A)>>>16,S=this.i(A)&65535,Ke=C.i(D)>>>16,_t=C.i(D)&65535;k[2*A+2*D]+=S*_t,_e(k,2*A+2*D),k[2*A+2*D+1]+=b*_t,_e(k,2*A+2*D+1),k[2*A+2*D+1]+=S*Ke,_e(k,2*A+2*D+1),k[2*A+2*D+2]+=b*Ke,_e(k,2*A+2*D+2)}for(A=0;A<T;A++)k[A]=k[2*A+1]<<16|k[2*A];for(A=T;A<2*T;A++)k[A]=0;return new h(k,0)};function _e(C,T){for(;(C[T]&65535)!=C[T];)C[T+1]+=C[T]>>>16,C[T]&=65535,T++}function de(C,T){this.g=C,this.h=T}function fe(C,T){if(q(T))throw Error("division by zero");if(q(C))return new de(R,R);if(Q(C))return T=fe(B(C),T),new de(B(T.g),B(T.h));if(Q(T))return T=fe(C,B(T)),new de(B(T.g),T.h);if(30<C.g.length){if(Q(C)||Q(T))throw Error("slowDivide_ only works with positive integers.");for(var k=O,A=T;0>=A.l(C);)k=Re(k),A=Re(A);var D=X(k,1),b=X(A,1);for(A=X(A,2),k=X(k,2);!q(A);){var S=b.add(A);0>=S.l(C)&&(D=D.add(k),b=S),A=X(A,1),k=X(k,1)}return T=ce(C,D.j(T)),new de(D,T)}for(D=R;0<=C.l(T);){for(k=Math.max(1,Math.floor(C.m()/T.m())),A=Math.ceil(Math.log(k)/Math.LN2),A=48>=A?1:Math.pow(2,A-48),b=_(k),S=b.j(T);Q(S)||0<S.l(C);)k-=A,b=_(k),S=b.j(T);q(b)&&(b=O),D=D.add(b),C=ce(C,S)}return new de(D,C)}r.A=function(C){return fe(this,C).h},r.and=function(C){for(var T=Math.max(this.g.length,C.g.length),k=[],A=0;A<T;A++)k[A]=this.i(A)&C.i(A);return new h(k,this.h&C.h)},r.or=function(C){for(var T=Math.max(this.g.length,C.g.length),k=[],A=0;A<T;A++)k[A]=this.i(A)|C.i(A);return new h(k,this.h|C.h)},r.xor=function(C){for(var T=Math.max(this.g.length,C.g.length),k=[],A=0;A<T;A++)k[A]=this.i(A)^C.i(A);return new h(k,this.h^C.h)};function Re(C){for(var T=C.g.length+1,k=[],A=0;A<T;A++)k[A]=C.i(A)<<1|C.i(A-1)>>>31;return new h(k,C.h)}function X(C,T){var k=T>>5;T%=32;for(var A=C.g.length-k,D=[],b=0;b<A;b++)D[b]=0<T?C.i(b+k)>>>T|C.i(b+k+1)<<32-T:C.i(b+k);return new h(D,C.h)}s.prototype.digest=s.prototype.v,s.prototype.reset=s.prototype.s,s.prototype.update=s.prototype.u,o_=s,h.prototype.add=h.prototype.add,h.prototype.multiply=h.prototype.j,h.prototype.modulo=h.prototype.A,h.prototype.compare=h.prototype.l,h.prototype.toNumber=h.prototype.m,h.prototype.toString=h.prototype.toString,h.prototype.getBits=h.prototype.i,h.fromNumber=_,h.fromString=E,ls=h}).apply(typeof pg<"u"?pg:typeof self<"u"?self:typeof window<"u"?window:{});var yu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var a_,Ta,l_,ku,fd,u_,c_,h_;(function(){var r,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(u,f,y){return u==Array.prototype||u==Object.prototype||(u[f]=y.value),u};function t(u){u=[typeof globalThis=="object"&&globalThis,u,typeof window=="object"&&window,typeof self=="object"&&self,typeof yu=="object"&&yu];for(var f=0;f<u.length;++f){var y=u[f];if(y&&y.Math==Math)return y}throw Error("Cannot find global object")}var s=t(this);function o(u,f){if(f)e:{var y=s;u=u.split(".");for(var w=0;w<u.length-1;w++){var L=u[w];if(!(L in y))break e;y=y[L]}u=u[u.length-1],w=y[u],f=f(w),f!=w&&f!=null&&e(y,u,{configurable:!0,writable:!0,value:f})}}function l(u,f){u instanceof String&&(u+="");var y=0,w=!1,L={next:function(){if(!w&&y<u.length){var z=y++;return{value:f(z,u[z]),done:!1}}return w=!0,{done:!0,value:void 0}}};return L[Symbol.iterator]=function(){return L},L}o("Array.prototype.values",function(u){return u||function(){return l(this,function(f,y){return y})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var h=h||{},p=this||self;function g(u){var f=typeof u;return f=f!="object"?f:u?Array.isArray(u)?"array":f:"null",f=="array"||f=="object"&&typeof u.length=="number"}function _(u){var f=typeof u;return f=="object"&&u!=null||f=="function"}function E(u,f,y){return u.call.apply(u.bind,arguments)}function R(u,f,y){if(!u)throw Error();if(2<arguments.length){var w=Array.prototype.slice.call(arguments,2);return function(){var L=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(L,w),u.apply(f,L)}}return function(){return u.apply(f,arguments)}}function O(u,f,y){return O=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?E:R,O.apply(null,arguments)}function j(u,f){var y=Array.prototype.slice.call(arguments,1);return function(){var w=y.slice();return w.push.apply(w,arguments),u.apply(this,w)}}function q(u,f){function y(){}y.prototype=f.prototype,u.aa=f.prototype,u.prototype=new y,u.prototype.constructor=u,u.Qb=function(w,L,z){for(var Z=Array(arguments.length-2),ze=2;ze<arguments.length;ze++)Z[ze-2]=arguments[ze];return f.prototype[L].apply(w,Z)}}function Q(u){const f=u.length;if(0<f){const y=Array(f);for(let w=0;w<f;w++)y[w]=u[w];return y}return[]}function B(u,f){for(let y=1;y<arguments.length;y++){const w=arguments[y];if(g(w)){const L=u.length||0,z=w.length||0;u.length=L+z;for(let Z=0;Z<z;Z++)u[L+Z]=w[Z]}else u.push(w)}}class ce{constructor(f,y){this.i=f,this.j=y,this.h=0,this.g=null}get(){let f;return 0<this.h?(this.h--,f=this.g,this.g=f.next,f.next=null):f=this.i(),f}}function _e(u){return/^[\s\xa0]*$/.test(u)}function de(){var u=p.navigator;return u&&(u=u.userAgent)?u:""}function fe(u){return fe[" "](u),u}fe[" "]=function(){};var Re=de().indexOf("Gecko")!=-1&&!(de().toLowerCase().indexOf("webkit")!=-1&&de().indexOf("Edge")==-1)&&!(de().indexOf("Trident")!=-1||de().indexOf("MSIE")!=-1)&&de().indexOf("Edge")==-1;function X(u,f,y){for(const w in u)f.call(y,u[w],w,u)}function C(u,f){for(const y in u)f.call(void 0,u[y],y,u)}function T(u){const f={};for(const y in u)f[y]=u[y];return f}const k="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function A(u,f){let y,w;for(let L=1;L<arguments.length;L++){w=arguments[L];for(y in w)u[y]=w[y];for(let z=0;z<k.length;z++)y=k[z],Object.prototype.hasOwnProperty.call(w,y)&&(u[y]=w[y])}}function D(u){var f=1;u=u.split(":");const y=[];for(;0<f&&u.length;)y.push(u.shift()),f--;return u.length&&y.push(u.join(":")),y}function b(u){p.setTimeout(()=>{throw u},0)}function S(){var u=pe;let f=null;return u.g&&(f=u.g,u.g=u.g.next,u.g||(u.h=null),f.next=null),f}class Ke{constructor(){this.h=this.g=null}add(f,y){const w=_t.get();w.set(f,y),this.h?this.h.next=w:this.g=w,this.h=w}}var _t=new ce(()=>new At,u=>u.reset());class At{constructor(){this.next=this.g=this.h=null}set(f,y){this.h=f,this.g=y,this.next=null}reset(){this.next=this.g=this.h=null}}let je,ee=!1,pe=new Ke,ne=()=>{const u=p.Promise.resolve(void 0);je=()=>{u.then(V)}};var V=()=>{for(var u;u=S();){try{u.h.call(u.g)}catch(y){b(y)}var f=_t;f.j(u),100>f.h&&(f.h++,u.next=f.g,f.g=u)}ee=!1};function $(){this.s=this.s,this.C=this.C}$.prototype.s=!1,$.prototype.ma=function(){this.s||(this.s=!0,this.N())},$.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function he(u,f){this.type=u,this.g=this.target=f,this.defaultPrevented=!1}he.prototype.h=function(){this.defaultPrevented=!0};var Se=function(){if(!p.addEventListener||!Object.defineProperty)return!1;var u=!1,f=Object.defineProperty({},"passive",{get:function(){u=!0}});try{const y=()=>{};p.addEventListener("test",y,f),p.removeEventListener("test",y,f)}catch{}return u}();function Ae(u,f){if(he.call(this,u?u.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,u){var y=this.type=u.type,w=u.changedTouches&&u.changedTouches.length?u.changedTouches[0]:null;if(this.target=u.target||u.srcElement,this.g=f,f=u.relatedTarget){if(Re){e:{try{fe(f.nodeName);var L=!0;break e}catch{}L=!1}L||(f=null)}}else y=="mouseover"?f=u.fromElement:y=="mouseout"&&(f=u.toElement);this.relatedTarget=f,w?(this.clientX=w.clientX!==void 0?w.clientX:w.pageX,this.clientY=w.clientY!==void 0?w.clientY:w.pageY,this.screenX=w.screenX||0,this.screenY=w.screenY||0):(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0),this.button=u.button,this.key=u.key||"",this.ctrlKey=u.ctrlKey,this.altKey=u.altKey,this.shiftKey=u.shiftKey,this.metaKey=u.metaKey,this.pointerId=u.pointerId||0,this.pointerType=typeof u.pointerType=="string"?u.pointerType:Pe[u.pointerType]||"",this.state=u.state,this.i=u,u.defaultPrevented&&Ae.aa.h.call(this)}}q(Ae,he);var Pe={2:"touch",3:"pen",4:"mouse"};Ae.prototype.h=function(){Ae.aa.h.call(this);var u=this.i;u.preventDefault?u.preventDefault():u.returnValue=!1};var Le="closure_listenable_"+(1e6*Math.random()|0),Me=0;function $e(u,f,y,w,L){this.listener=u,this.proxy=null,this.src=f,this.type=y,this.capture=!!w,this.ha=L,this.key=++Me,this.da=this.fa=!1}function Ze(u){u.da=!0,u.listener=null,u.proxy=null,u.src=null,u.ha=null}function gn(u){this.src=u,this.g={},this.h=0}gn.prototype.add=function(u,f,y,w,L){var z=u.toString();u=this.g[z],u||(u=this.g[z]=[],this.h++);var Z=yn(u,f,w,L);return-1<Z?(f=u[Z],y||(f.fa=!1)):(f=new $e(f,this.src,z,!!w,L),f.fa=y,u.push(f)),f};function qr(u,f){var y=f.type;if(y in u.g){var w=u.g[y],L=Array.prototype.indexOf.call(w,f,void 0),z;(z=0<=L)&&Array.prototype.splice.call(w,L,1),z&&(Ze(f),u.g[y].length==0&&(delete u.g[y],u.h--))}}function yn(u,f,y,w){for(var L=0;L<u.length;++L){var z=u[L];if(!z.da&&z.listener==f&&z.capture==!!y&&z.ha==w)return L}return-1}var Gt="closure_lm_"+(1e6*Math.random()|0),_n={};function Es(u,f,y,w,L){if(Array.isArray(f)){for(var z=0;z<f.length;z++)Es(u,f[z],y,w,L);return null}return y=Is(y),u&&u[Le]?u.K(f,y,_(w)?!!w.capture:!1,L):Ts(u,f,y,!1,w,L)}function Ts(u,f,y,w,L,z){if(!f)throw Error("Invalid event type");var Z=_(L)?!!L.capture:!!L,ze=Hr(u);if(ze||(u[Gt]=ze=new gn(u)),y=ze.add(f,y,w,Z,z),y.proxy)return y;if(w=Vo(),y.proxy=w,w.src=u,w.listener=y,u.addEventListener)Se||(L=Z),L===void 0&&(L=!1),u.addEventListener(f.toString(),w,L);else if(u.attachEvent)u.attachEvent(Yn(f.toString()),w);else if(u.addListener&&u.removeListener)u.addListener(w);else throw Error("addEventListener and attachEvent are unavailable.");return y}function Vo(){function u(y){return f.call(u.src,u.listener,y)}const f=vr;return u}function Li(u,f,y,w,L){if(Array.isArray(f))for(var z=0;z<f.length;z++)Li(u,f[z],y,w,L);else w=_(w)?!!w.capture:!!w,y=Is(y),u&&u[Le]?(u=u.i,f=String(f).toString(),f in u.g&&(z=u.g[f],y=yn(z,y,w,L),-1<y&&(Ze(z[y]),Array.prototype.splice.call(z,y,1),z.length==0&&(delete u.g[f],u.h--)))):u&&(u=Hr(u))&&(f=u.g[f.toString()],u=-1,f&&(u=yn(f,y,w,L)),(y=-1<u?f[u]:null)&&Qn(y))}function Qn(u){if(typeof u!="number"&&u&&!u.da){var f=u.src;if(f&&f[Le])qr(f.i,u);else{var y=u.type,w=u.proxy;f.removeEventListener?f.removeEventListener(y,w,u.capture):f.detachEvent?f.detachEvent(Yn(y),w):f.addListener&&f.removeListener&&f.removeListener(w),(y=Hr(f))?(qr(y,u),y.h==0&&(y.src=null,f[Gt]=null)):Ze(u)}}}function Yn(u){return u in _n?_n[u]:_n[u]="on"+u}function vr(u,f){if(u.da)u=!0;else{f=new Ae(f,this);var y=u.listener,w=u.ha||u.src;u.fa&&Qn(u),u=y.call(w,f)}return u}function Hr(u){return u=u[Gt],u instanceof gn?u:null}var Mi="__closure_events_fn_"+(1e9*Math.random()>>>0);function Is(u){return typeof u=="function"?u:(u[Mi]||(u[Mi]=function(f){return u.handleEvent(f)}),u[Mi])}function at(){$.call(this),this.i=new gn(this),this.M=this,this.F=null}q(at,$),at.prototype[Le]=!0,at.prototype.removeEventListener=function(u,f,y,w){Li(this,u,f,y,w)};function lt(u,f){var y,w=u.F;if(w)for(y=[];w;w=w.F)y.push(w);if(u=u.M,w=f.type||f,typeof f=="string")f=new he(f,u);else if(f instanceof he)f.target=f.target||u;else{var L=f;f=new he(w,u),A(f,L)}if(L=!0,y)for(var z=y.length-1;0<=z;z--){var Z=f.g=y[z];L=Xn(Z,w,!0,f)&&L}if(Z=f.g=u,L=Xn(Z,w,!0,f)&&L,L=Xn(Z,w,!1,f)&&L,y)for(z=0;z<y.length;z++)Z=f.g=y[z],L=Xn(Z,w,!1,f)&&L}at.prototype.N=function(){if(at.aa.N.call(this),this.i){var u=this.i,f;for(f in u.g){for(var y=u.g[f],w=0;w<y.length;w++)Ze(y[w]);delete u.g[f],u.h--}}this.F=null},at.prototype.K=function(u,f,y,w){return this.i.add(String(u),f,!1,y,w)},at.prototype.L=function(u,f,y,w){return this.i.add(String(u),f,!0,y,w)};function Xn(u,f,y,w){if(f=u.i.g[String(f)],!f)return!0;f=f.concat();for(var L=!0,z=0;z<f.length;++z){var Z=f[z];if(Z&&!Z.da&&Z.capture==y){var ze=Z.listener,ft=Z.ha||Z.src;Z.fa&&qr(u.i,Z),L=ze.call(ft,w)!==!1&&L}}return L&&!w.defaultPrevented}function Ss(u,f,y){if(typeof u=="function")y&&(u=O(u,y));else if(u&&typeof u.handleEvent=="function")u=O(u.handleEvent,u);else throw Error("Invalid listener argument");return 2147483647<Number(f)?-1:p.setTimeout(u,f||0)}function wr(u){u.g=Ss(()=>{u.g=null,u.i&&(u.i=!1,wr(u))},u.l);const f=u.h;u.h=null,u.m.apply(null,f)}class Kr extends ${constructor(f,y){super(),this.m=f,this.l=y,this.h=null,this.i=!1,this.g=null}j(f){this.h=arguments,this.g?this.i=!0:wr(this)}N(){super.N(),this.g&&(p.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Nn(u){$.call(this),this.h=u,this.g={}}q(Nn,$);var As=[];function ks(u){X(u.g,function(f,y){this.g.hasOwnProperty(y)&&Qn(f)},u),u.g={}}Nn.prototype.N=function(){Nn.aa.N.call(this),ks(this)},Nn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Rs=p.JSON.stringify,Cs=p.JSON.parse,Ps=class{stringify(u){return p.JSON.stringify(u,void 0)}parse(u){return p.JSON.parse(u,void 0)}};function Gr(){}Gr.prototype.h=null;function Qr(u){return u.h||(u.h=u.i())}function Er(){}var Qt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function vn(){he.call(this,"d")}q(vn,he);function Yr(){he.call(this,"c")}q(Yr,he);var wn={},Fi=null;function Tr(){return Fi=Fi||new at}wn.La="serverreachability";function kt(u){he.call(this,wn.La,u)}q(kt,he);function et(u){const f=Tr();lt(f,new kt(f))}wn.STAT_EVENT="statevent";function an(u,f){he.call(this,wn.STAT_EVENT,u),this.stat=f}q(an,he);function xe(u){const f=Tr();lt(f,new an(f,u))}wn.Ma="timingevent";function Jn(u,f){he.call(this,wn.Ma,u),this.size=f}q(Jn,he);function bt(u,f){if(typeof u!="function")throw Error("Fn must not be null and must be a function");return p.setTimeout(function(){u()},f)}function En(){this.g=!0}En.prototype.xa=function(){this.g=!1};function Ir(u,f,y,w,L,z){u.info(function(){if(u.g)if(z)for(var Z="",ze=z.split("&"),ft=0;ft<ze.length;ft++){var Oe=ze[ft].split("=");if(1<Oe.length){var vt=Oe[0];Oe=Oe[1];var ut=vt.split("_");Z=2<=ut.length&&ut[1]=="type"?Z+(vt+"="+Oe+"&"):Z+(vt+"=redacted&")}}else Z=null;else Z=z;return"XMLHTTP REQ ("+w+") [attempt "+L+"]: "+f+`
`+y+`
`+Z})}function xs(u,f,y,w,L,z,Z){u.info(function(){return"XMLHTTP RESP ("+w+") [ attempt "+L+"]: "+f+`
`+y+`
`+z+" "+Z})}function Dn(u,f,y,w){u.info(function(){return"XMLHTTP TEXT ("+f+"): "+mc(u,y)+(w?" "+w:"")})}function bo(u,f){u.info(function(){return"TIMEOUT: "+f})}En.prototype.info=function(){};function mc(u,f){if(!u.g)return f;if(!f)return null;try{var y=JSON.parse(f);if(y){for(u=0;u<y.length;u++)if(Array.isArray(y[u])){var w=y[u];if(!(2>w.length)){var L=w[1];if(Array.isArray(L)&&!(1>L.length)){var z=L[0];if(z!="noop"&&z!="stop"&&z!="close")for(var Z=1;Z<L.length;Z++)L[Z]=""}}}}return Rs(y)}catch{return f}}var Ns={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},tl={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},On;function Ui(){}q(Ui,Gr),Ui.prototype.g=function(){return new XMLHttpRequest},Ui.prototype.i=function(){return{}},On=new Ui;function Vn(u,f,y,w){this.j=u,this.i=f,this.l=y,this.R=w||1,this.U=new Nn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new nl}function nl(){this.i=null,this.g="",this.h=!1}var Lo={},Ds={};function Os(u,f,y){u.L=1,u.v=ti(un(f)),u.m=y,u.P=!0,Mo(u,null)}function Mo(u,f){u.F=Date.now(),qe(u),u.A=un(u.v);var y=u.A,w=u.R;Array.isArray(w)||(w=[String(w)]),ri(y.i,"t",w),u.C=0,y=u.j.J,u.h=new nl,u.g=wl(u.j,y?f:null,!u.m),0<u.O&&(u.M=new Kr(O(u.Y,u,u.g),u.O)),f=u.U,y=u.g,w=u.ca;var L="readystatechange";Array.isArray(L)||(L&&(As[0]=L.toString()),L=As);for(var z=0;z<L.length;z++){var Z=Es(y,L[z],w||f.handleEvent,!1,f.h||f);if(!Z)break;f.g[Z.key]=Z}f=u.H?T(u.H):{},u.m?(u.u||(u.u="POST"),f["Content-Type"]="application/x-www-form-urlencoded",u.g.ea(u.A,u.u,u.m,f)):(u.u="GET",u.g.ea(u.A,u.u,null,f)),et(),Ir(u.i,u.u,u.A,u.l,u.R,u.m)}Vn.prototype.ca=function(u){u=u.target;const f=this.M;f&&Xt(u)==3?f.j():this.Y(u)},Vn.prototype.Y=function(u){try{if(u==this.g)e:{const ut=Xt(this.g);var f=this.g.Ba();const Sn=this.g.Z();if(!(3>ut)&&(ut!=3||this.g&&(this.h.h||this.g.oa()||$o(this.g)))){this.J||ut!=4||f==7||(f==8||0>=Sn?et(3):et(2)),ji(this);var y=this.g.Z();this.X=y;t:if(rl(this)){var w=$o(this.g);u="";var L=w.length,z=Xt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Tn(this),Xr(this);var Z="";break t}this.h.i=new p.TextDecoder}for(f=0;f<L;f++)this.h.h=!0,u+=this.h.i.decode(w[f],{stream:!(z&&f==L-1)});w.length=0,this.h.g+=u,this.C=0,Z=this.h.g}else Z=this.g.oa();if(this.o=y==200,xs(this.i,this.u,this.A,this.l,this.R,ut,y),this.o){if(this.T&&!this.K){t:{if(this.g){var ze,ft=this.g;if((ze=ft.g?ft.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_e(ze)){var Oe=ze;break t}}Oe=null}if(y=Oe)Dn(this.i,this.l,y,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Fo(this,y);else{this.o=!1,this.s=3,xe(12),Tn(this),Xr(this);break e}}if(this.P){y=!0;let hn;for(;!this.J&&this.C<Z.length;)if(hn=gc(this,Z),hn==Ds){ut==4&&(this.s=4,xe(14),y=!1),Dn(this.i,this.l,null,"[Incomplete Response]");break}else if(hn==Lo){this.s=4,xe(15),Dn(this.i,this.l,Z,"[Invalid Chunk]"),y=!1;break}else Dn(this.i,this.l,hn,null),Fo(this,hn);if(rl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ut!=4||Z.length!=0||this.h.h||(this.s=1,xe(16),y=!1),this.o=this.o&&y,!y)Dn(this.i,this.l,Z,"[Invalid Chunked Response]"),Tn(this),Xr(this);else if(0<Z.length&&!this.W){this.W=!0;var vt=this.j;vt.g==this&&vt.ba&&!vt.M&&(vt.j.info("Great, no buffering proxy detected. Bytes received: "+Z.length),qo(vt),vt.M=!0,xe(11))}}else Dn(this.i,this.l,Z,null),Fo(this,Z);ut==4&&Tn(this),this.o&&!this.J&&(ut==4?Ws(this.j,this):(this.o=!1,qe(this)))}else Us(this.g),y==400&&0<Z.indexOf("Unknown SID")?(this.s=3,xe(12)):(this.s=0,xe(13)),Tn(this),Xr(this)}}}catch{}finally{}};function rl(u){return u.g?u.u=="GET"&&u.L!=2&&u.j.Ca:!1}function gc(u,f){var y=u.C,w=f.indexOf(`
`,y);return w==-1?Ds:(y=Number(f.substring(y,w)),isNaN(y)?Lo:(w+=1,w+y>f.length?Ds:(f=f.slice(w,w+y),u.C=w+y,f)))}Vn.prototype.cancel=function(){this.J=!0,Tn(this)};function qe(u){u.S=Date.now()+u.I,il(u,u.I)}function il(u,f){if(u.B!=null)throw Error("WatchDog timer not null");u.B=bt(O(u.ba,u),f)}function ji(u){u.B&&(p.clearTimeout(u.B),u.B=null)}Vn.prototype.ba=function(){this.B=null;const u=Date.now();0<=u-this.S?(bo(this.i,this.A),this.L!=2&&(et(),xe(17)),Tn(this),this.s=2,Xr(this)):il(this,this.S-u)};function Xr(u){u.j.G==0||u.J||Ws(u.j,u)}function Tn(u){ji(u);var f=u.M;f&&typeof f.ma=="function"&&f.ma(),u.M=null,ks(u.U),u.g&&(f=u.g,u.g=null,f.abort(),f.ma())}function Fo(u,f){try{var y=u.j;if(y.G!=0&&(y.g==u||Wt(y.h,u))){if(!u.K&&Wt(y.h,u)&&y.G==3){try{var w=y.Da.g.parse(f)}catch{w=null}if(Array.isArray(w)&&w.length==3){var L=w;if(L[0]==0){e:if(!y.u){if(y.g)if(y.g.F+3e3<u.F)$s(y),Un(y);else break e;Bs(y),xe(18)}}else y.za=L[1],0<y.za-y.T&&37500>L[2]&&y.F&&y.v==0&&!y.C&&(y.C=bt(O(y.Za,y),6e3));if(1>=ol(y.h)&&y.ca){try{y.ca()}catch{}y.ca=void 0}}else Cr(y,11)}else if((u.K||y.g==u)&&$s(y),!_e(f))for(L=y.Da.g.parse(f),f=0;f<L.length;f++){let Oe=L[f];if(y.T=Oe[0],Oe=Oe[1],y.G==2)if(Oe[0]=="c"){y.K=Oe[1],y.ia=Oe[2];const vt=Oe[3];vt!=null&&(y.la=vt,y.j.info("VER="+y.la));const ut=Oe[4];ut!=null&&(y.Aa=ut,y.j.info("SVER="+y.Aa));const Sn=Oe[5];Sn!=null&&typeof Sn=="number"&&0<Sn&&(w=1.5*Sn,y.L=w,y.j.info("backChannelRequestTimeoutMs_="+w)),w=y;const hn=u.g;if(hn){const Ki=hn.g?hn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ki){var z=w.h;z.g||Ki.indexOf("spdy")==-1&&Ki.indexOf("quic")==-1&&Ki.indexOf("h2")==-1||(z.j=z.l,z.g=new Set,z.h&&(Uo(z,z.h),z.h=null))}if(w.D){const Hs=hn.g?hn.g.getResponseHeader("X-HTTP-Session-Id"):null;Hs&&(w.ya=Hs,We(w.I,w.D,Hs))}}y.G=3,y.l&&y.l.ua(),y.ba&&(y.R=Date.now()-u.F,y.j.info("Handshake RTT: "+y.R+"ms")),w=y;var Z=u;if(w.qa=vl(w,w.J?w.ia:null,w.W),Z.K){al(w.h,Z);var ze=Z,ft=w.L;ft&&(ze.I=ft),ze.B&&(ji(ze),qe(ze)),w.g=Z}else Hi(w);0<y.i.length&&nr(y)}else Oe[0]!="stop"&&Oe[0]!="close"||Cr(y,7);else y.G==3&&(Oe[0]=="stop"||Oe[0]=="close"?Oe[0]=="stop"?Cr(y,7):Ct(y):Oe[0]!="noop"&&y.l&&y.l.ta(Oe),y.v=0)}}et(4)}catch{}}var sl=class{constructor(u,f){this.g=u,this.map=f}};function zi(u){this.l=u||10,p.PerformanceNavigationTiming?(u=p.performance.getEntriesByType("navigation"),u=0<u.length&&(u[0].nextHopProtocol=="hq"||u[0].nextHopProtocol=="h2")):u=!!(p.chrome&&p.chrome.loadTimes&&p.chrome.loadTimes()&&p.chrome.loadTimes().wasFetchedViaSpdy),this.j=u?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ln(u){return u.h?!0:u.g?u.g.size>=u.j:!1}function ol(u){return u.h?1:u.g?u.g.size:0}function Wt(u,f){return u.h?u.h==f:u.g?u.g.has(f):!1}function Uo(u,f){u.g?u.g.add(f):u.h=f}function al(u,f){u.h&&u.h==f?u.h=null:u.g&&u.g.has(f)&&u.g.delete(f)}zi.prototype.cancel=function(){if(this.i=ll(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const u of this.g.values())u.cancel();this.g.clear()}};function ll(u){if(u.h!=null)return u.i.concat(u.h.D);if(u.g!=null&&u.g.size!==0){let f=u.i;for(const y of u.g.values())f=f.concat(y.D);return f}return Q(u.i)}function Vs(u){if(u.V&&typeof u.V=="function")return u.V();if(typeof Map<"u"&&u instanceof Map||typeof Set<"u"&&u instanceof Set)return Array.from(u.values());if(typeof u=="string")return u.split("");if(g(u)){for(var f=[],y=u.length,w=0;w<y;w++)f.push(u[w]);return f}f=[],y=0;for(w in u)f[y++]=u[w];return f}function bs(u){if(u.na&&typeof u.na=="function")return u.na();if(!u.V||typeof u.V!="function"){if(typeof Map<"u"&&u instanceof Map)return Array.from(u.keys());if(!(typeof Set<"u"&&u instanceof Set)){if(g(u)||typeof u=="string"){var f=[];u=u.length;for(var y=0;y<u;y++)f.push(y);return f}f=[],y=0;for(const w in u)f[y++]=w;return f}}}function Jr(u,f){if(u.forEach&&typeof u.forEach=="function")u.forEach(f,void 0);else if(g(u)||typeof u=="string")Array.prototype.forEach.call(u,f,void 0);else for(var y=bs(u),w=Vs(u),L=w.length,z=0;z<L;z++)f.call(void 0,w[z],y&&y[z],u)}var Bi=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function yc(u,f){if(u){u=u.split("&");for(var y=0;y<u.length;y++){var w=u[y].indexOf("="),L=null;if(0<=w){var z=u[y].substring(0,w);L=u[y].substring(w+1)}else z=u[y];f(z,L?decodeURIComponent(L.replace(/\+/g," ")):"")}}}function Sr(u){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,u instanceof Sr){this.h=u.h,$i(this,u.j),this.o=u.o,this.g=u.g,Zr(this,u.s),this.l=u.l;var f=u.i,y=new Zn;y.i=f.i,f.g&&(y.g=new Map(f.g),y.h=f.h),ei(this,y),this.m=u.m}else u&&(f=String(u).match(Bi))?(this.h=!1,$i(this,f[1]||"",!0),this.o=Ne(f[2]||""),this.g=Ne(f[3]||"",!0),Zr(this,f[4]),this.l=Ne(f[5]||"",!0),ei(this,f[6]||"",!0),this.m=Ne(f[7]||"")):(this.h=!1,this.i=new Zn(null,this.h))}Sr.prototype.toString=function(){var u=[],f=this.j;f&&u.push(ni(f,Ls,!0),":");var y=this.g;return(y||f=="file")&&(u.push("//"),(f=this.o)&&u.push(ni(f,Ls,!0),"@"),u.push(encodeURIComponent(String(y)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),y=this.s,y!=null&&u.push(":",String(y))),(y=this.l)&&(this.g&&y.charAt(0)!="/"&&u.push("/"),u.push(ni(y,y.charAt(0)=="/"?hl:cl,!0))),(y=this.i.toString())&&u.push("?",y),(y=this.m)&&u.push("#",ni(y,jo)),u.join("")};function un(u){return new Sr(u)}function $i(u,f,y){u.j=y?Ne(f,!0):f,u.j&&(u.j=u.j.replace(/:$/,""))}function Zr(u,f){if(f){if(f=Number(f),isNaN(f)||0>f)throw Error("Bad port number "+f);u.s=f}else u.s=null}function ei(u,f,y){f instanceof Zn?(u.i=f,er(u.i,u.h)):(y||(f=ni(f,dl)),u.i=new Zn(f,u.h))}function We(u,f,y){u.i.set(f,y)}function ti(u){return We(u,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),u}function Ne(u,f){return u?f?decodeURI(u.replace(/%25/g,"%2525")):decodeURIComponent(u):""}function ni(u,f,y){return typeof u=="string"?(u=encodeURI(u).replace(f,ul),y&&(u=u.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u):null}function ul(u){return u=u.charCodeAt(0),"%"+(u>>4&15).toString(16)+(u&15).toString(16)}var Ls=/[#\/\?@]/g,cl=/[#\?:]/g,hl=/[#\?]/g,dl=/[#\?@]/g,jo=/#/g;function Zn(u,f){this.h=this.g=null,this.i=u||null,this.j=!!f}function Rt(u){u.g||(u.g=new Map,u.h=0,u.i&&yc(u.i,function(f,y){u.add(decodeURIComponent(f.replace(/\+/g," ")),y)}))}r=Zn.prototype,r.add=function(u,f){Rt(this),this.i=null,u=In(this,u);var y=this.g.get(u);return y||this.g.set(u,y=[]),y.push(f),this.h+=1,this};function bn(u,f){Rt(u),f=In(u,f),u.g.has(f)&&(u.i=null,u.h-=u.g.get(f).length,u.g.delete(f))}function Ln(u,f){return Rt(u),f=In(u,f),u.g.has(f)}r.forEach=function(u,f){Rt(this),this.g.forEach(function(y,w){y.forEach(function(L){u.call(f,L,w,this)},this)},this)},r.na=function(){Rt(this);const u=Array.from(this.g.values()),f=Array.from(this.g.keys()),y=[];for(let w=0;w<f.length;w++){const L=u[w];for(let z=0;z<L.length;z++)y.push(f[w])}return y},r.V=function(u){Rt(this);let f=[];if(typeof u=="string")Ln(this,u)&&(f=f.concat(this.g.get(In(this,u))));else{u=Array.from(this.g.values());for(let y=0;y<u.length;y++)f=f.concat(u[y])}return f},r.set=function(u,f){return Rt(this),this.i=null,u=In(this,u),Ln(this,u)&&(this.h-=this.g.get(u).length),this.g.set(u,[f]),this.h+=1,this},r.get=function(u,f){return u?(u=this.V(u),0<u.length?String(u[0]):f):f};function ri(u,f,y){bn(u,f),0<y.length&&(u.i=null,u.g.set(In(u,f),Q(y)),u.h+=y.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const u=[],f=Array.from(this.g.keys());for(var y=0;y<f.length;y++){var w=f[y];const z=encodeURIComponent(String(w)),Z=this.V(w);for(w=0;w<Z.length;w++){var L=z;Z[w]!==""&&(L+="="+encodeURIComponent(String(Z[w]))),u.push(L)}}return this.i=u.join("&")};function In(u,f){return f=String(f),u.j&&(f=f.toLowerCase()),f}function er(u,f){f&&!u.j&&(Rt(u),u.i=null,u.g.forEach(function(y,w){var L=w.toLowerCase();w!=L&&(bn(this,w),ri(this,L,y))},u)),u.j=f}function _c(u,f){const y=new En;if(p.Image){const w=new Image;w.onload=j(Yt,y,"TestLoadImage: loaded",!0,f,w),w.onerror=j(Yt,y,"TestLoadImage: error",!1,f,w),w.onabort=j(Yt,y,"TestLoadImage: abort",!1,f,w),w.ontimeout=j(Yt,y,"TestLoadImage: timeout",!1,f,w),p.setTimeout(function(){w.ontimeout&&w.ontimeout()},1e4),w.src=u}else f(!1)}function fl(u,f){const y=new En,w=new AbortController,L=setTimeout(()=>{w.abort(),Yt(y,"TestPingServer: timeout",!1,f)},1e4);fetch(u,{signal:w.signal}).then(z=>{clearTimeout(L),z.ok?Yt(y,"TestPingServer: ok",!0,f):Yt(y,"TestPingServer: server error",!1,f)}).catch(()=>{clearTimeout(L),Yt(y,"TestPingServer: error",!1,f)})}function Yt(u,f,y,w,L){try{L&&(L.onload=null,L.onerror=null,L.onabort=null,L.ontimeout=null),w(y)}catch{}}function vc(){this.g=new Ps}function pl(u,f,y){const w=y||"";try{Jr(u,function(L,z){let Z=L;_(L)&&(Z=Rs(L)),f.push(w+z+"="+encodeURIComponent(Z))})}catch(L){throw f.push(w+"type="+encodeURIComponent("_badmap")),L}}function Ar(u){this.l=u.Ub||null,this.j=u.eb||!1}q(Ar,Gr),Ar.prototype.g=function(){return new Wi(this.l,this.j)},Ar.prototype.i=function(u){return function(){return u}}({});function Wi(u,f){at.call(this),this.D=u,this.o=f,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}q(Wi,at),r=Wi.prototype,r.open=function(u,f){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=u,this.A=f,this.readyState=1,Fn(this)},r.send=function(u){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const f={headers:this.u,method:this.B,credentials:this.m,cache:void 0};u&&(f.body=u),(this.D||p).fetch(new Request(this.A,f)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Mn(this)),this.readyState=0},r.Sa=function(u){if(this.g&&(this.l=u,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=u.headers,this.readyState=2,Fn(this)),this.g&&(this.readyState=3,Fn(this),this.g)))if(this.responseType==="arraybuffer")u.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof p.ReadableStream<"u"&&"body"in u){if(this.j=u.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;ml(this)}else u.text().then(this.Ra.bind(this),this.ga.bind(this))};function ml(u){u.j.read().then(u.Pa.bind(u)).catch(u.ga.bind(u))}r.Pa=function(u){if(this.g){if(this.o&&u.value)this.response.push(u.value);else if(!this.o){var f=u.value?u.value:new Uint8Array(0);(f=this.v.decode(f,{stream:!u.done}))&&(this.response=this.responseText+=f)}u.done?Mn(this):Fn(this),this.readyState==3&&ml(this)}},r.Ra=function(u){this.g&&(this.response=this.responseText=u,Mn(this))},r.Qa=function(u){this.g&&(this.response=u,Mn(this))},r.ga=function(){this.g&&Mn(this)};function Mn(u){u.readyState=4,u.l=null,u.j=null,u.v=null,Fn(u)}r.setRequestHeader=function(u,f){this.u.append(u,f)},r.getResponseHeader=function(u){return this.h&&this.h.get(u.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const u=[],f=this.h.entries();for(var y=f.next();!y.done;)y=y.value,u.push(y[0]+": "+y[1]),y=f.next();return u.join(`\r
`)};function Fn(u){u.onreadystatechange&&u.onreadystatechange.call(u)}Object.defineProperty(Wi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(u){this.m=u?"include":"same-origin"}});function kr(u){let f="";return X(u,function(y,w){f+=w,f+=":",f+=y,f+=`\r
`}),f}function ii(u,f,y){e:{for(w in y){var w=!1;break e}w=!0}w||(y=kr(y),typeof u=="string"?y!=null&&encodeURIComponent(String(y)):We(u,f,y))}function Xe(u){at.call(this),this.headers=new Map,this.o=u||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}q(Xe,at);var wc=/^https?$/i,zo=["POST","PUT"];r=Xe.prototype,r.Ha=function(u){this.J=u},r.ea=function(u,f,y,w){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+u);f=f?f.toUpperCase():"GET",this.D=u,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():On.g(),this.v=this.o?Qr(this.o):Qr(On),this.g.onreadystatechange=O(this.Ea,this);try{this.B=!0,this.g.open(f,String(u),!0),this.B=!1}catch(z){qi(this,z);return}if(u=y||"",y=new Map(this.headers),w)if(Object.getPrototypeOf(w)===Object.prototype)for(var L in w)y.set(L,w[L]);else if(typeof w.keys=="function"&&typeof w.get=="function")for(const z of w.keys())y.set(z,w.get(z));else throw Error("Unknown input type for opt_headers: "+String(w));w=Array.from(y.keys()).find(z=>z.toLowerCase()=="content-type"),L=p.FormData&&u instanceof p.FormData,!(0<=Array.prototype.indexOf.call(zo,f,void 0))||w||L||y.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[z,Z]of y)this.g.setRequestHeader(z,Z);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Fs(this),this.u=!0,this.g.send(u),this.u=!1}catch(z){qi(this,z)}};function qi(u,f){u.h=!1,u.g&&(u.j=!0,u.g.abort(),u.j=!1),u.l=f,u.m=5,Ms(u),cn(u)}function Ms(u){u.A||(u.A=!0,lt(u,"complete"),lt(u,"error"))}r.abort=function(u){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=u||7,lt(this,"complete"),lt(this,"abort"),cn(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),cn(this,!0)),Xe.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?Bo(this):this.bb())},r.bb=function(){Bo(this)};function Bo(u){if(u.h&&typeof h<"u"&&(!u.v[1]||Xt(u)!=4||u.Z()!=2)){if(u.u&&Xt(u)==4)Ss(u.Ea,0,u);else if(lt(u,"readystatechange"),Xt(u)==4){u.h=!1;try{const Z=u.Z();e:switch(Z){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var f=!0;break e;default:f=!1}var y;if(!(y=f)){var w;if(w=Z===0){var L=String(u.D).match(Bi)[1]||null;!L&&p.self&&p.self.location&&(L=p.self.location.protocol.slice(0,-1)),w=!wc.test(L?L.toLowerCase():"")}y=w}if(y)lt(u,"complete"),lt(u,"success");else{u.m=6;try{var z=2<Xt(u)?u.g.statusText:""}catch{z=""}u.l=z+" ["+u.Z()+"]",Ms(u)}}finally{cn(u)}}}}function cn(u,f){if(u.g){Fs(u);const y=u.g,w=u.v[0]?()=>{}:null;u.g=null,u.v=null,f||lt(u,"ready");try{y.onreadystatechange=w}catch{}}}function Fs(u){u.I&&(p.clearTimeout(u.I),u.I=null)}r.isActive=function(){return!!this.g};function Xt(u){return u.g?u.g.readyState:0}r.Z=function(){try{return 2<Xt(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(u){if(this.g){var f=this.g.responseText;return u&&f.indexOf(u)==0&&(f=f.substring(u.length)),Cs(f)}};function $o(u){try{if(!u.g)return null;if("response"in u.g)return u.g.response;switch(u.H){case"":case"text":return u.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in u.g)return u.g.mozResponseArrayBuffer}return null}catch{return null}}function Us(u){const f={};u=(u.g&&2<=Xt(u)&&u.g.getAllResponseHeaders()||"").split(`\r
`);for(let w=0;w<u.length;w++){if(_e(u[w]))continue;var y=D(u[w]);const L=y[0];if(y=y[1],typeof y!="string")continue;y=y.trim();const z=f[L]||[];f[L]=z,z.push(y)}C(f,function(w){return w.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function tr(u,f,y){return y&&y.internalChannelParams&&y.internalChannelParams[u]||f}function Wo(u){this.Aa=0,this.i=[],this.j=new En,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=tr("failFast",!1,u),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=tr("baseRetryDelayMs",5e3,u),this.cb=tr("retryDelaySeedMs",1e4,u),this.Wa=tr("forwardChannelMaxRetries",2,u),this.wa=tr("forwardChannelRequestTimeoutMs",2e4,u),this.pa=u&&u.xmlHttpFactory||void 0,this.Xa=u&&u.Tb||void 0,this.Ca=u&&u.useFetchStreams||!1,this.L=void 0,this.J=u&&u.supportsCrossDomainXhr||!1,this.K="",this.h=new zi(u&&u.concurrentRequestLimit),this.Da=new vc,this.P=u&&u.fastHandshake||!1,this.O=u&&u.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=u&&u.Rb||!1,u&&u.xa&&this.j.xa(),u&&u.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&u&&u.detectBufferingProxy||!1,this.ja=void 0,u&&u.longPollingTimeout&&0<u.longPollingTimeout&&(this.ja=u.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=Wo.prototype,r.la=8,r.G=1,r.connect=function(u,f,y,w){xe(0),this.W=u,this.H=f||{},y&&w!==void 0&&(this.H.OSID=y,this.H.OAID=w),this.F=this.X,this.I=vl(this,null,this.W),nr(this)};function Ct(u){if(js(u),u.G==3){var f=u.U++,y=un(u.I);if(We(y,"SID",u.K),We(y,"RID",f),We(y,"TYPE","terminate"),Rr(u,y),f=new Vn(u,u.j,f),f.L=2,f.v=ti(un(y)),y=!1,p.navigator&&p.navigator.sendBeacon)try{y=p.navigator.sendBeacon(f.v.toString(),"")}catch{}!y&&p.Image&&(new Image().src=f.v,y=!0),y||(f.g=wl(f.j,null),f.g.ea(f.v)),f.F=Date.now(),qe(f)}_l(u)}function Un(u){u.g&&(qo(u),u.g.cancel(),u.g=null)}function js(u){Un(u),u.u&&(p.clearTimeout(u.u),u.u=null),$s(u),u.h.cancel(),u.s&&(typeof u.s=="number"&&p.clearTimeout(u.s),u.s=null)}function nr(u){if(!ln(u.h)&&!u.s){u.s=!0;var f=u.Ga;je||ne(),ee||(je(),ee=!0),pe.add(f,u),u.B=0}}function Ec(u,f){return ol(u.h)>=u.h.j-(u.s?1:0)?!1:u.s?(u.i=f.D.concat(u.i),!0):u.G==1||u.G==2||u.B>=(u.Va?0:u.Wa)?!1:(u.s=bt(O(u.Ga,u,f),yl(u,u.B)),u.B++,!0)}r.Ga=function(u){if(this.s)if(this.s=null,this.G==1){if(!u){this.U=Math.floor(1e5*Math.random()),u=this.U++;const L=new Vn(this,this.j,u);let z=this.o;if(this.S&&(z?(z=T(z),A(z,this.S)):z=this.S),this.m!==null||this.O||(L.H=z,z=null),this.P)e:{for(var f=0,y=0;y<this.i.length;y++){t:{var w=this.i[y];if("__data__"in w.map&&(w=w.map.__data__,typeof w=="string")){w=w.length;break t}w=void 0}if(w===void 0)break;if(f+=w,4096<f){f=y;break e}if(f===4096||y===this.i.length-1){f=y+1;break e}}f=1e3}else f=1e3;f=si(this,L,f),y=un(this.I),We(y,"RID",u),We(y,"CVER",22),this.D&&We(y,"X-HTTP-Session-Id",this.D),Rr(this,y),z&&(this.O?f="headers="+encodeURIComponent(String(kr(z)))+"&"+f:this.m&&ii(y,this.m,z)),Uo(this.h,L),this.Ua&&We(y,"TYPE","init"),this.P?(We(y,"$req",f),We(y,"SID","null"),L.T=!0,Os(L,y,null)):Os(L,y,f),this.G=2}}else this.G==3&&(u?zs(this,u):this.i.length==0||ln(this.h)||zs(this))};function zs(u,f){var y;f?y=f.l:y=u.U++;const w=un(u.I);We(w,"SID",u.K),We(w,"RID",y),We(w,"AID",u.T),Rr(u,w),u.m&&u.o&&ii(w,u.m,u.o),y=new Vn(u,u.j,y,u.B+1),u.m===null&&(y.H=u.o),f&&(u.i=f.D.concat(u.i)),f=si(u,y,1e3),y.I=Math.round(.5*u.wa)+Math.round(.5*u.wa*Math.random()),Uo(u.h,y),Os(y,w,f)}function Rr(u,f){u.H&&X(u.H,function(y,w){We(f,w,y)}),u.l&&Jr({},function(y,w){We(f,w,y)})}function si(u,f,y){y=Math.min(u.i.length,y);var w=u.l?O(u.l.Na,u.l,u):null;e:{var L=u.i;let z=-1;for(;;){const Z=["count="+y];z==-1?0<y?(z=L[0].g,Z.push("ofs="+z)):z=0:Z.push("ofs="+z);let ze=!0;for(let ft=0;ft<y;ft++){let Oe=L[ft].g;const vt=L[ft].map;if(Oe-=z,0>Oe)z=Math.max(0,L[ft].g-100),ze=!1;else try{pl(vt,Z,"req"+Oe+"_")}catch{w&&w(vt)}}if(ze){w=Z.join("&");break e}}}return u=u.i.splice(0,y),f.D=u,w}function Hi(u){if(!u.g&&!u.u){u.Y=1;var f=u.Fa;je||ne(),ee||(je(),ee=!0),pe.add(f,u),u.v=0}}function Bs(u){return u.g||u.u||3<=u.v?!1:(u.Y++,u.u=bt(O(u.Fa,u),yl(u,u.v)),u.v++,!0)}r.Fa=function(){if(this.u=null,gl(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var u=2*this.R;this.j.info("BP detection timer enabled: "+u),this.A=bt(O(this.ab,this),u)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,xe(10),Un(this),gl(this))};function qo(u){u.A!=null&&(p.clearTimeout(u.A),u.A=null)}function gl(u){u.g=new Vn(u,u.j,"rpc",u.Y),u.m===null&&(u.g.H=u.o),u.g.O=0;var f=un(u.qa);We(f,"RID","rpc"),We(f,"SID",u.K),We(f,"AID",u.T),We(f,"CI",u.F?"0":"1"),!u.F&&u.ja&&We(f,"TO",u.ja),We(f,"TYPE","xmlhttp"),Rr(u,f),u.m&&u.o&&ii(f,u.m,u.o),u.L&&(u.g.I=u.L);var y=u.g;u=u.ia,y.L=1,y.v=ti(un(f)),y.m=null,y.P=!0,Mo(y,u)}r.Za=function(){this.C!=null&&(this.C=null,Un(this),Bs(this),xe(19))};function $s(u){u.C!=null&&(p.clearTimeout(u.C),u.C=null)}function Ws(u,f){var y=null;if(u.g==f){$s(u),qo(u),u.g=null;var w=2}else if(Wt(u.h,f))y=f.D,al(u.h,f),w=1;else return;if(u.G!=0){if(f.o)if(w==1){y=f.m?f.m.length:0,f=Date.now()-f.F;var L=u.B;w=Tr(),lt(w,new Jn(w,y)),nr(u)}else Hi(u);else if(L=f.s,L==3||L==0&&0<f.X||!(w==1&&Ec(u,f)||w==2&&Bs(u)))switch(y&&0<y.length&&(f=u.h,f.i=f.i.concat(y)),L){case 1:Cr(u,5);break;case 4:Cr(u,10);break;case 3:Cr(u,6);break;default:Cr(u,2)}}}function yl(u,f){let y=u.Ta+Math.floor(Math.random()*u.cb);return u.isActive()||(y*=2),y*f}function Cr(u,f){if(u.j.info("Error code "+f),f==2){var y=O(u.fb,u),w=u.Xa;const L=!w;w=new Sr(w||"//www.google.com/images/cleardot.gif"),p.location&&p.location.protocol=="http"||$i(w,"https"),ti(w),L?_c(w.toString(),y):fl(w.toString(),y)}else xe(2);u.G=0,u.l&&u.l.sa(f),_l(u),js(u)}r.fb=function(u){u?(this.j.info("Successfully pinged google.com"),xe(2)):(this.j.info("Failed to ping google.com"),xe(1))};function _l(u){if(u.G=0,u.ka=[],u.l){const f=ll(u.h);(f.length!=0||u.i.length!=0)&&(B(u.ka,f),B(u.ka,u.i),u.h.i.length=0,Q(u.i),u.i.length=0),u.l.ra()}}function vl(u,f,y){var w=y instanceof Sr?un(y):new Sr(y);if(w.g!="")f&&(w.g=f+"."+w.g),Zr(w,w.s);else{var L=p.location;w=L.protocol,f=f?f+"."+L.hostname:L.hostname,L=+L.port;var z=new Sr(null);w&&$i(z,w),f&&(z.g=f),L&&Zr(z,L),y&&(z.l=y),w=z}return y=u.D,f=u.ya,y&&f&&We(w,y,f),We(w,"VER",u.la),Rr(u,w),w}function wl(u,f,y){if(f&&!u.J)throw Error("Can't create secondary domain capable XhrIo object.");return f=u.Ca&&!u.pa?new Xe(new Ar({eb:y})):new Xe(u.pa),f.Ha(u.J),f}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ho(){}r=Ho.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function qs(){}qs.prototype.g=function(u,f){return new qt(u,f)};function qt(u,f){at.call(this),this.g=new Wo(f),this.l=u,this.h=f&&f.messageUrlParams||null,u=f&&f.messageHeaders||null,f&&f.clientProtocolHeaderRequired&&(u?u["X-Client-Protocol"]="webchannel":u={"X-Client-Protocol":"webchannel"}),this.g.o=u,u=f&&f.initMessageHeaders||null,f&&f.messageContentType&&(u?u["X-WebChannel-Content-Type"]=f.messageContentType:u={"X-WebChannel-Content-Type":f.messageContentType}),f&&f.va&&(u?u["X-WebChannel-Client-Profile"]=f.va:u={"X-WebChannel-Client-Profile":f.va}),this.g.S=u,(u=f&&f.Sb)&&!_e(u)&&(this.g.m=u),this.v=f&&f.supportsCrossDomainXhr||!1,this.u=f&&f.sendRawJson||!1,(f=f&&f.httpSessionIdParam)&&!_e(f)&&(this.g.D=f,u=this.h,u!==null&&f in u&&(u=this.h,f in u&&delete u[f])),this.j=new rr(this)}q(qt,at),qt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},qt.prototype.close=function(){Ct(this.g)},qt.prototype.o=function(u){var f=this.g;if(typeof u=="string"){var y={};y.__data__=u,u=y}else this.u&&(y={},y.__data__=Rs(u),u=y);f.i.push(new sl(f.Ya++,u)),f.G==3&&nr(f)},qt.prototype.N=function(){this.g.l=null,delete this.j,Ct(this.g),delete this.g,qt.aa.N.call(this)};function El(u){vn.call(this),u.__headers__&&(this.headers=u.__headers__,this.statusCode=u.__status__,delete u.__headers__,delete u.__status__);var f=u.__sm__;if(f){e:{for(const y in f){u=y;break e}u=void 0}(this.i=u)&&(u=this.i,f=f!==null&&u in f?f[u]:void 0),this.data=f}else this.data=u}q(El,vn);function Tl(){Yr.call(this),this.status=1}q(Tl,Yr);function rr(u){this.g=u}q(rr,Ho),rr.prototype.ua=function(){lt(this.g,"a")},rr.prototype.ta=function(u){lt(this.g,new El(u))},rr.prototype.sa=function(u){lt(this.g,new Tl)},rr.prototype.ra=function(){lt(this.g,"b")},qs.prototype.createWebChannel=qs.prototype.g,qt.prototype.send=qt.prototype.o,qt.prototype.open=qt.prototype.m,qt.prototype.close=qt.prototype.close,h_=function(){return new qs},c_=function(){return Tr()},u_=wn,fd={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ns.NO_ERROR=0,Ns.TIMEOUT=8,Ns.HTTP_ERROR=6,ku=Ns,tl.COMPLETE="complete",l_=tl,Er.EventType=Qt,Qt.OPEN="a",Qt.CLOSE="b",Qt.ERROR="c",Qt.MESSAGE="d",at.prototype.listen=at.prototype.K,Ta=Er,Xe.prototype.listenOnce=Xe.prototype.L,Xe.prototype.getLastError=Xe.prototype.Ka,Xe.prototype.getLastErrorCode=Xe.prototype.Ba,Xe.prototype.getStatus=Xe.prototype.Z,Xe.prototype.getResponseJson=Xe.prototype.Oa,Xe.prototype.getResponseText=Xe.prototype.oa,Xe.prototype.send=Xe.prototype.ea,Xe.prototype.setWithCredentials=Xe.prototype.Ha,a_=Xe}).apply(typeof yu<"u"?yu:typeof self<"u"?self:typeof window<"u"?window:{});const mg="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zt=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};zt.UNAUTHENTICATED=new zt(null),zt.GOOGLE_CREDENTIALS=new zt("google-credentials-uid"),zt.FIRST_PARTY=new zt("first-party-uid"),zt.MOCK_USER=new zt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xo="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ps=new xd("@firebase/firestore");function ya(){return ps.logLevel}function le(r,...e){if(ps.logLevel<=De.DEBUG){const t=e.map(Bd);ps.debug(`Firestore (${xo}): ${r}`,...t)}}function $r(r,...e){if(ps.logLevel<=De.ERROR){const t=e.map(Bd);ps.error(`Firestore (${xo}): ${r}`,...t)}}function To(r,...e){if(ps.logLevel<=De.WARN){const t=e.map(Bd);ps.warn(`Firestore (${xo}): ${r}`,...t)}}function Bd(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ee(r="Unexpected state"){const e=`FIRESTORE (${xo}) INTERNAL ASSERTION FAILED: `+r;throw $r(e),new Error(e)}function Be(r,e){r||Ee()}function Ie(r,e){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class oe extends yr{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d_{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class FI{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(zt.UNAUTHENTICATED))}shutdown(){}}class UI{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class jI{constructor(e){this.t=e,this.currentUser=zt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Be(this.o===void 0);let s=this.i;const o=g=>this.i!==s?(s=this.i,t(g)):Promise.resolve();let l=new us;this.o=()=>{this.i++,this.currentUser=this.u(),l.resolve(),l=new us,e.enqueueRetryable(()=>o(this.currentUser))};const h=()=>{const g=l;e.enqueueRetryable(async()=>{await g.promise,await o(this.currentUser)})},p=g=>{le("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=g,this.o&&(this.auth.addAuthTokenListener(this.o),h())};this.t.onInit(g=>p(g)),setTimeout(()=>{if(!this.auth){const g=this.t.getImmediate({optional:!0});g?p(g):(le("FirebaseAuthCredentialsProvider","Auth not yet detected"),l.resolve(),l=new us)}},0),h()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(s=>this.i!==e?(le("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(Be(typeof s.accessToken=="string"),new d_(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Be(e===null||typeof e=="string"),new zt(e)}}class zI{constructor(e,t,s){this.l=e,this.h=t,this.P=s,this.type="FirstParty",this.user=zt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class BI{constructor(e,t,s){this.l=e,this.h=t,this.P=s}getToken(){return Promise.resolve(new zI(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(zt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class $I{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class WI{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){Be(this.o===void 0);const s=l=>{l.error!=null&&le("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${l.error.message}`);const h=l.token!==this.R;return this.R=l.token,le("FirebaseAppCheckTokenProvider",`Received ${h?"new":"existing"} token.`),h?t(l.token):Promise.resolve()};this.o=l=>{e.enqueueRetryable(()=>s(l))};const o=l=>{le("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=l,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(l=>o(l)),setTimeout(()=>{if(!this.appCheck){const l=this.A.getImmediate({optional:!0});l?o(l):le("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Be(typeof t.token=="string"),this.R=t.token,new $I(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qI(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let s=0;s<r;s++)t[s]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f_{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let s="";for(;s.length<20;){const o=qI(40);for(let l=0;l<o.length;++l)s.length<20&&o[l]<t&&(s+=e.charAt(o[l]%e.length))}return s}}function Ue(r,e){return r<e?-1:r>e?1:0}function Io(r,e,t){return r.length===e.length&&r.every((s,o)=>t(s,e[o]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new oe(W.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new oe(W.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new oe(W.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new oe(W.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return gt.fromMillis(Date.now())}static fromDate(e){return gt.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),s=Math.floor(1e6*(e-1e3*t));return new gt(t,s)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Ue(this.nanoseconds,e.nanoseconds):Ue(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e){this.timestamp=e}static fromTimestamp(e){return new Te(e)}static min(){return new Te(new gt(0,0))}static max(){return new Te(new gt(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Va{constructor(e,t,s){t===void 0?t=0:t>e.length&&Ee(),s===void 0?s=e.length-t:s>e.length-t&&Ee(),this.segments=e,this.offset=t,this.len=s}get length(){return this.len}isEqual(e){return Va.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Va?e.forEach(s=>{t.push(s)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,s=this.limit();t<s;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const s=Math.min(e.length,t.length);for(let o=0;o<s;o++){const l=e.get(o),h=t.get(o);if(l<h)return-1;if(l>h)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class Ye extends Va{construct(e,t,s){return new Ye(e,t,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const s of e){if(s.indexOf("//")>=0)throw new oe(W.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);t.push(...s.split("/").filter(o=>o.length>0))}return new Ye(t)}static emptyPath(){return new Ye([])}}const HI=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Dt extends Va{construct(e,t,s){return new Dt(e,t,s)}static isValidIdentifier(e){return HI.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Dt.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Dt(["__name__"])}static fromServerFormat(e){const t=[];let s="",o=0;const l=()=>{if(s.length===0)throw new oe(W.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(s),s=""};let h=!1;for(;o<e.length;){const p=e[o];if(p==="\\"){if(o+1===e.length)throw new oe(W.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const g=e[o+1];if(g!=="\\"&&g!=="."&&g!=="`")throw new oe(W.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=g,o+=2}else p==="`"?(h=!h,o++):p!=="."||h?(s+=p,o++):(l(),o++)}if(l(),h)throw new oe(W.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Dt(t)}static emptyPath(){return new Dt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e){this.path=e}static fromPath(e){return new me(Ye.fromString(e))}static fromName(e){return new me(Ye.fromString(e).popFirst(5))}static empty(){return new me(Ye.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ye.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Ye.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new me(new Ye(e.slice()))}}function KI(r,e){const t=r.toTimestamp().seconds,s=r.toTimestamp().nanoseconds+1,o=Te.fromTimestamp(s===1e9?new gt(t+1,0):new gt(t,s));return new xi(o,me.empty(),e)}function GI(r){return new xi(r.readTime,r.key,-1)}class xi{constructor(e,t,s){this.readTime=e,this.documentKey=t,this.largestBatchId=s}static min(){return new xi(Te.min(),me.empty(),-1)}static max(){return new xi(Te.max(),me.empty(),-1)}}function QI(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=me.comparator(r.documentKey,e.documentKey),t!==0?t:Ue(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YI="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class XI{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ka(r){if(r.code!==W.FAILED_PRECONDITION||r.message!==YI)throw r;le("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&Ee(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new G((s,o)=>{this.nextCallback=l=>{this.wrapSuccess(e,l).next(s,o)},this.catchCallback=l=>{this.wrapFailure(t,l).next(s,o)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof G?t:G.resolve(t)}catch(t){return G.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):G.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):G.reject(t)}static resolve(e){return new G((t,s)=>{t(e)})}static reject(e){return new G((t,s)=>{s(e)})}static waitFor(e){return new G((t,s)=>{let o=0,l=0,h=!1;e.forEach(p=>{++o,p.next(()=>{++l,h&&l===o&&t()},g=>s(g))}),h=!0,l===o&&t()})}static or(e){let t=G.resolve(!1);for(const s of e)t=t.next(o=>o?G.resolve(o):s());return t}static forEach(e,t){const s=[];return e.forEach((o,l)=>{s.push(t.call(this,o,l))}),this.waitFor(s)}static mapArray(e,t){return new G((s,o)=>{const l=e.length,h=new Array(l);let p=0;for(let g=0;g<l;g++){const _=g;t(e[_]).next(E=>{h[_]=E,++p,p===l&&s(h)},E=>o(E))}})}static doWhile(e,t){return new G((s,o)=>{const l=()=>{e()===!0?t().next(()=>{l()},o):s()};l()})}}function JI(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Ga(r){return r.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $d{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=s=>this.ie(s),this.se=s=>t.writeSequenceNumber(s))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}$d.oe=-1;function nc(r){return r==null}function ju(r){return r===0&&1/r==-1/0}function ZI(r){return typeof r=="number"&&Number.isInteger(r)&&!ju(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gg(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function vs(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function p_(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e,t){this.comparator=e,this.root=t||Nt.EMPTY}insert(e,t){return new rt(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Nt.BLACK,null,null))}remove(e){return new rt(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Nt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const s=this.comparator(e,t.key);if(s===0)return t.value;s<0?t=t.left:s>0&&(t=t.right)}return null}indexOf(e){let t=0,s=this.root;for(;!s.isEmpty();){const o=this.comparator(e,s.key);if(o===0)return t+s.left.size;o<0?s=s.left:(t+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,s)=>(e(t,s),!1))}toString(){const e=[];return this.inorderTraversal((t,s)=>(e.push(`${t}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new _u(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new _u(this.root,e,this.comparator,!1)}getReverseIterator(){return new _u(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new _u(this.root,e,this.comparator,!0)}}class _u{constructor(e,t,s,o){this.isReverse=o,this.nodeStack=[];let l=1;for(;!e.isEmpty();)if(l=t?s(e.key,t):1,t&&o&&(l*=-1),l<0)e=this.isReverse?e.left:e.right;else{if(l===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Nt{constructor(e,t,s,o,l){this.key=e,this.value=t,this.color=s??Nt.RED,this.left=o??Nt.EMPTY,this.right=l??Nt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,s,o,l){return new Nt(e??this.key,t??this.value,s??this.color,o??this.left,l??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let o=this;const l=s(e,o.key);return o=l<0?o.copy(null,null,null,o.left.insert(e,t,s),null):l===0?o.copy(null,t,null,null,null):o.copy(null,null,null,null,o.right.insert(e,t,s)),o.fixUp()}removeMin(){if(this.left.isEmpty())return Nt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let s,o=this;if(t(e,o.key)<0)o.left.isEmpty()||o.left.isRed()||o.left.left.isRed()||(o=o.moveRedLeft()),o=o.copy(null,null,null,o.left.remove(e,t),null);else{if(o.left.isRed()&&(o=o.rotateRight()),o.right.isEmpty()||o.right.isRed()||o.right.left.isRed()||(o=o.moveRedRight()),t(e,o.key)===0){if(o.right.isEmpty())return Nt.EMPTY;s=o.right.min(),o=o.copy(s.key,s.value,null,null,o.right.removeMin())}o=o.copy(null,null,null,null,o.right.remove(e,t))}return o.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Nt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Nt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw Ee();const e=this.left.check();if(e!==this.right.check())throw Ee();return e+(this.isRed()?0:1)}}Nt.EMPTY=null,Nt.RED=!0,Nt.BLACK=!1;Nt.EMPTY=new class{constructor(){this.size=0}get key(){throw Ee()}get value(){throw Ee()}get color(){throw Ee()}get left(){throw Ee()}get right(){throw Ee()}copy(e,t,s,o,l){return this}insert(e,t,s){return new Nt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot{constructor(e){this.comparator=e,this.data=new rt(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,s)=>(e(t),!1))}forEachInRange(e,t){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const o=s.getNext();if(this.comparator(o.key,e[1])>=0)return;t(o.key)}}forEachWhile(e,t){let s;for(s=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new yg(this.data.getIterator())}getIteratorFrom(e){return new yg(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(s=>{t=t.add(s)}),t}isEqual(e){if(!(e instanceof Ot)||this.size!==e.size)return!1;const t=this.data.getIterator(),s=e.data.getIterator();for(;t.hasNext();){const o=t.getNext().key,l=s.getNext().key;if(this.comparator(o,l)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ot(this.comparator);return t.data=e,t}}class yg{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e){this.fields=e,e.sort(Dt.comparator)}static empty(){return new mn([])}unionWith(e){let t=new Ot(Dt.comparator);for(const s of this.fields)t=t.add(s);for(const s of e)t=t.add(s);return new mn(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Io(this.fields,e.fields,(t,s)=>t.isEqual(s))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m_ extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(o){try{return atob(o)}catch(l){throw typeof DOMException<"u"&&l instanceof DOMException?new m_("Invalid base64 string: "+l):l}}(e);return new Vt(t)}static fromUint8Array(e){const t=function(o){let l="";for(let h=0;h<o.length;++h)l+=String.fromCharCode(o[h]);return l}(e);return new Vt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const s=new Uint8Array(t.length);for(let o=0;o<t.length;o++)s[o]=t.charCodeAt(o);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Ue(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Vt.EMPTY_BYTE_STRING=new Vt("");const eS=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ni(r){if(Be(!!r),typeof r=="string"){let e=0;const t=eS.exec(r);if(Be(!!t),t[1]){let o=t[1];o=(o+"000000000").substr(0,9),e=Number(o)}const s=new Date(r);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:ot(r.seconds),nanos:ot(r.nanos)}}function ot(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function ms(r){return typeof r=="string"?Vt.fromBase64String(r):Vt.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wd(r){var e,t;return((t=(((e=r?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function qd(r){const e=r.mapValue.fields.__previous_value__;return Wd(e)?qd(e):e}function ba(r){const e=Ni(r.mapValue.fields.__local_write_time__.timestampValue);return new gt(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tS{constructor(e,t,s,o,l,h,p,g,_){this.databaseId=e,this.appId=t,this.persistenceKey=s,this.host=o,this.ssl=l,this.forceLongPolling=h,this.autoDetectLongPolling=p,this.longPollingOptions=g,this.useFetchStreams=_}}class La{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new La("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof La&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vu={mapValue:{}};function gs(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Wd(r)?4:rS(r)?9007199254740991:nS(r)?10:11:Ee()}function mr(r,e){if(r===e)return!0;const t=gs(r);if(t!==gs(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return ba(r).isEqual(ba(e));case 3:return function(o,l){if(typeof o.timestampValue=="string"&&typeof l.timestampValue=="string"&&o.timestampValue.length===l.timestampValue.length)return o.timestampValue===l.timestampValue;const h=Ni(o.timestampValue),p=Ni(l.timestampValue);return h.seconds===p.seconds&&h.nanos===p.nanos}(r,e);case 5:return r.stringValue===e.stringValue;case 6:return function(o,l){return ms(o.bytesValue).isEqual(ms(l.bytesValue))}(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return function(o,l){return ot(o.geoPointValue.latitude)===ot(l.geoPointValue.latitude)&&ot(o.geoPointValue.longitude)===ot(l.geoPointValue.longitude)}(r,e);case 2:return function(o,l){if("integerValue"in o&&"integerValue"in l)return ot(o.integerValue)===ot(l.integerValue);if("doubleValue"in o&&"doubleValue"in l){const h=ot(o.doubleValue),p=ot(l.doubleValue);return h===p?ju(h)===ju(p):isNaN(h)&&isNaN(p)}return!1}(r,e);case 9:return Io(r.arrayValue.values||[],e.arrayValue.values||[],mr);case 10:case 11:return function(o,l){const h=o.mapValue.fields||{},p=l.mapValue.fields||{};if(gg(h)!==gg(p))return!1;for(const g in h)if(h.hasOwnProperty(g)&&(p[g]===void 0||!mr(h[g],p[g])))return!1;return!0}(r,e);default:return Ee()}}function Ma(r,e){return(r.values||[]).find(t=>mr(t,e))!==void 0}function So(r,e){if(r===e)return 0;const t=gs(r),s=gs(e);if(t!==s)return Ue(t,s);switch(t){case 0:case 9007199254740991:return 0;case 1:return Ue(r.booleanValue,e.booleanValue);case 2:return function(l,h){const p=ot(l.integerValue||l.doubleValue),g=ot(h.integerValue||h.doubleValue);return p<g?-1:p>g?1:p===g?0:isNaN(p)?isNaN(g)?0:-1:1}(r,e);case 3:return _g(r.timestampValue,e.timestampValue);case 4:return _g(ba(r),ba(e));case 5:return Ue(r.stringValue,e.stringValue);case 6:return function(l,h){const p=ms(l),g=ms(h);return p.compareTo(g)}(r.bytesValue,e.bytesValue);case 7:return function(l,h){const p=l.split("/"),g=h.split("/");for(let _=0;_<p.length&&_<g.length;_++){const E=Ue(p[_],g[_]);if(E!==0)return E}return Ue(p.length,g.length)}(r.referenceValue,e.referenceValue);case 8:return function(l,h){const p=Ue(ot(l.latitude),ot(h.latitude));return p!==0?p:Ue(ot(l.longitude),ot(h.longitude))}(r.geoPointValue,e.geoPointValue);case 9:return vg(r.arrayValue,e.arrayValue);case 10:return function(l,h){var p,g,_,E;const R=l.fields||{},O=h.fields||{},j=(p=R.value)===null||p===void 0?void 0:p.arrayValue,q=(g=O.value)===null||g===void 0?void 0:g.arrayValue,Q=Ue(((_=j?.values)===null||_===void 0?void 0:_.length)||0,((E=q?.values)===null||E===void 0?void 0:E.length)||0);return Q!==0?Q:vg(j,q)}(r.mapValue,e.mapValue);case 11:return function(l,h){if(l===vu.mapValue&&h===vu.mapValue)return 0;if(l===vu.mapValue)return 1;if(h===vu.mapValue)return-1;const p=l.fields||{},g=Object.keys(p),_=h.fields||{},E=Object.keys(_);g.sort(),E.sort();for(let R=0;R<g.length&&R<E.length;++R){const O=Ue(g[R],E[R]);if(O!==0)return O;const j=So(p[g[R]],_[E[R]]);if(j!==0)return j}return Ue(g.length,E.length)}(r.mapValue,e.mapValue);default:throw Ee()}}function _g(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return Ue(r,e);const t=Ni(r),s=Ni(e),o=Ue(t.seconds,s.seconds);return o!==0?o:Ue(t.nanos,s.nanos)}function vg(r,e){const t=r.values||[],s=e.values||[];for(let o=0;o<t.length&&o<s.length;++o){const l=So(t[o],s[o]);if(l)return l}return Ue(t.length,s.length)}function Ao(r){return pd(r)}function pd(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(t){const s=Ni(t);return`time(${s.seconds},${s.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(t){return ms(t).toBase64()}(r.bytesValue):"referenceValue"in r?function(t){return me.fromName(t).toString()}(r.referenceValue):"geoPointValue"in r?function(t){return`geo(${t.latitude},${t.longitude})`}(r.geoPointValue):"arrayValue"in r?function(t){let s="[",o=!0;for(const l of t.values||[])o?o=!1:s+=",",s+=pd(l);return s+"]"}(r.arrayValue):"mapValue"in r?function(t){const s=Object.keys(t.fields||{}).sort();let o="{",l=!0;for(const h of s)l?l=!1:o+=",",o+=`${h}:${pd(t.fields[h])}`;return o+"}"}(r.mapValue):Ee()}function wg(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function md(r){return!!r&&"integerValue"in r}function Hd(r){return!!r&&"arrayValue"in r}function Eg(r){return!!r&&"nullValue"in r}function Tg(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Ru(r){return!!r&&"mapValue"in r}function nS(r){var e,t;return((t=(((e=r?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function Ra(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const e={mapValue:{fields:{}}};return vs(r.mapValue.fields,(t,s)=>e.mapValue.fields[t]=Ra(s)),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ra(r.arrayValue.values[t]);return e}return Object.assign({},r)}function rS(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e){this.value=e}static empty(){return new sn({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let s=0;s<e.length-1;++s)if(t=(t.mapValue.fields||{})[e.get(s)],!Ru(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ra(t)}setAll(e){let t=Dt.emptyPath(),s={},o=[];e.forEach((h,p)=>{if(!t.isImmediateParentOf(p)){const g=this.getFieldsMap(t);this.applyChanges(g,s,o),s={},o=[],t=p.popLast()}h?s[p.lastSegment()]=Ra(h):o.push(p.lastSegment())});const l=this.getFieldsMap(t);this.applyChanges(l,s,o)}delete(e){const t=this.field(e.popLast());Ru(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return mr(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let s=0;s<e.length;++s){let o=t.mapValue.fields[e.get(s)];Ru(o)&&o.mapValue.fields||(o={mapValue:{fields:{}}},t.mapValue.fields[e.get(s)]=o),t=o}return t.mapValue.fields}applyChanges(e,t,s){vs(t,(o,l)=>e[o]=l);for(const o of s)delete e[o]}clone(){return new sn(Ra(this.value))}}function g_(r){const e=[];return vs(r.fields,(t,s)=>{const o=new Dt([t]);if(Ru(s)){const l=g_(s.mapValue).fields;if(l.length===0)e.push(o);else for(const h of l)e.push(o.child(h))}else e.push(o)}),new mn(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e,t,s,o,l,h,p){this.key=e,this.documentType=t,this.version=s,this.readTime=o,this.createTime=l,this.data=h,this.documentState=p}static newInvalidDocument(e){return new Bt(e,0,Te.min(),Te.min(),Te.min(),sn.empty(),0)}static newFoundDocument(e,t,s,o){return new Bt(e,1,t,Te.min(),s,o,0)}static newNoDocument(e,t){return new Bt(e,2,t,Te.min(),Te.min(),sn.empty(),0)}static newUnknownDocument(e,t){return new Bt(e,3,t,Te.min(),Te.min(),sn.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Te.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=sn.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=sn.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Te.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Bt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Bt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zu{constructor(e,t){this.position=e,this.inclusive=t}}function Ig(r,e,t){let s=0;for(let o=0;o<r.position.length;o++){const l=e[o],h=r.position[o];if(l.field.isKeyField()?s=me.comparator(me.fromName(h.referenceValue),t.key):s=So(h,t.data.field(l.field)),l.dir==="desc"&&(s*=-1),s!==0)break}return s}function Sg(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!mr(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bu{constructor(e,t="asc"){this.field=e,this.dir=t}}function iS(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y_{}class dt extends y_{constructor(e,t,s){super(),this.field=e,this.op=t,this.value=s}static create(e,t,s){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,s):new oS(e,t,s):t==="array-contains"?new uS(e,s):t==="in"?new cS(e,s):t==="not-in"?new hS(e,s):t==="array-contains-any"?new dS(e,s):new dt(e,t,s)}static createKeyFieldInFilter(e,t,s){return t==="in"?new aS(e,s):new lS(e,s)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(So(t,this.value)):t!==null&&gs(this.value)===gs(t)&&this.matchesComparison(So(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Ee()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Gn extends y_{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new Gn(e,t)}matches(e){return __(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function __(r){return r.op==="and"}function v_(r){return sS(r)&&__(r)}function sS(r){for(const e of r.filters)if(e instanceof Gn)return!1;return!0}function gd(r){if(r instanceof dt)return r.field.canonicalString()+r.op.toString()+Ao(r.value);if(v_(r))return r.filters.map(e=>gd(e)).join(",");{const e=r.filters.map(t=>gd(t)).join(",");return`${r.op}(${e})`}}function w_(r,e){return r instanceof dt?function(s,o){return o instanceof dt&&s.op===o.op&&s.field.isEqual(o.field)&&mr(s.value,o.value)}(r,e):r instanceof Gn?function(s,o){return o instanceof Gn&&s.op===o.op&&s.filters.length===o.filters.length?s.filters.reduce((l,h,p)=>l&&w_(h,o.filters[p]),!0):!1}(r,e):void Ee()}function E_(r){return r instanceof dt?function(t){return`${t.field.canonicalString()} ${t.op} ${Ao(t.value)}`}(r):r instanceof Gn?function(t){return t.op.toString()+" {"+t.getFilters().map(E_).join(" ,")+"}"}(r):"Filter"}class oS extends dt{constructor(e,t,s){super(e,t,s),this.key=me.fromName(s.referenceValue)}matches(e){const t=me.comparator(e.key,this.key);return this.matchesComparison(t)}}class aS extends dt{constructor(e,t){super(e,"in",t),this.keys=T_("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class lS extends dt{constructor(e,t){super(e,"not-in",t),this.keys=T_("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function T_(r,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(s=>me.fromName(s.referenceValue))}class uS extends dt{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Hd(t)&&Ma(t.arrayValue,this.value)}}class cS extends dt{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ma(this.value.arrayValue,t)}}class hS extends dt{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ma(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Ma(this.value.arrayValue,t)}}class dS extends dt{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Hd(t)||!t.arrayValue.values)&&t.arrayValue.values.some(s=>Ma(this.value.arrayValue,s))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fS{constructor(e,t=null,s=[],o=[],l=null,h=null,p=null){this.path=e,this.collectionGroup=t,this.orderBy=s,this.filters=o,this.limit=l,this.startAt=h,this.endAt=p,this.ue=null}}function Ag(r,e=null,t=[],s=[],o=null,l=null,h=null){return new fS(r,e,t,s,o,l,h)}function Kd(r){const e=Ie(r);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(s=>gd(s)).join(","),t+="|ob:",t+=e.orderBy.map(s=>function(l){return l.field.canonicalString()+l.dir}(s)).join(","),nc(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(s=>Ao(s)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(s=>Ao(s)).join(",")),e.ue=t}return e.ue}function Gd(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!iS(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!w_(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!Sg(r.startAt,e.startAt)&&Sg(r.endAt,e.endAt)}function yd(r){return me.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa{constructor(e,t=null,s=[],o=[],l=null,h="F",p=null,g=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=s,this.filters=o,this.limit=l,this.limitType=h,this.startAt=p,this.endAt=g,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function pS(r,e,t,s,o,l,h,p){return new Qa(r,e,t,s,o,l,h,p)}function Qd(r){return new Qa(r)}function kg(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function I_(r){return r.collectionGroup!==null}function Ca(r){const e=Ie(r);if(e.ce===null){e.ce=[];const t=new Set;for(const l of e.explicitOrderBy)e.ce.push(l),t.add(l.field.canonicalString());const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(h){let p=new Ot(Dt.comparator);return h.filters.forEach(g=>{g.getFlattenedFilters().forEach(_=>{_.isInequality()&&(p=p.add(_.field))})}),p})(e).forEach(l=>{t.has(l.canonicalString())||l.isKeyField()||e.ce.push(new Bu(l,s))}),t.has(Dt.keyField().canonicalString())||e.ce.push(new Bu(Dt.keyField(),s))}return e.ce}function dr(r){const e=Ie(r);return e.le||(e.le=mS(e,Ca(r))),e.le}function mS(r,e){if(r.limitType==="F")return Ag(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map(o=>{const l=o.dir==="desc"?"asc":"desc";return new Bu(o.field,l)});const t=r.endAt?new zu(r.endAt.position,r.endAt.inclusive):null,s=r.startAt?new zu(r.startAt.position,r.startAt.inclusive):null;return Ag(r.path,r.collectionGroup,e,r.filters,r.limit,t,s)}}function _d(r,e){const t=r.filters.concat([e]);return new Qa(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function vd(r,e,t){return new Qa(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function rc(r,e){return Gd(dr(r),dr(e))&&r.limitType===e.limitType}function S_(r){return`${Kd(dr(r))}|lt:${r.limitType}`}function po(r){return`Query(target=${function(t){let s=t.path.canonicalString();return t.collectionGroup!==null&&(s+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(s+=`, filters: [${t.filters.map(o=>E_(o)).join(", ")}]`),nc(t.limit)||(s+=", limit: "+t.limit),t.orderBy.length>0&&(s+=`, orderBy: [${t.orderBy.map(o=>function(h){return`${h.field.canonicalString()} (${h.dir})`}(o)).join(", ")}]`),t.startAt&&(s+=", startAt: ",s+=t.startAt.inclusive?"b:":"a:",s+=t.startAt.position.map(o=>Ao(o)).join(",")),t.endAt&&(s+=", endAt: ",s+=t.endAt.inclusive?"a:":"b:",s+=t.endAt.position.map(o=>Ao(o)).join(",")),`Target(${s})`}(dr(r))}; limitType=${r.limitType})`}function ic(r,e){return e.isFoundDocument()&&function(s,o){const l=o.key.path;return s.collectionGroup!==null?o.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(l):me.isDocumentKey(s.path)?s.path.isEqual(l):s.path.isImmediateParentOf(l)}(r,e)&&function(s,o){for(const l of Ca(s))if(!l.field.isKeyField()&&o.data.field(l.field)===null)return!1;return!0}(r,e)&&function(s,o){for(const l of s.filters)if(!l.matches(o))return!1;return!0}(r,e)&&function(s,o){return!(s.startAt&&!function(h,p,g){const _=Ig(h,p,g);return h.inclusive?_<=0:_<0}(s.startAt,Ca(s),o)||s.endAt&&!function(h,p,g){const _=Ig(h,p,g);return h.inclusive?_>=0:_>0}(s.endAt,Ca(s),o))}(r,e)}function gS(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function A_(r){return(e,t)=>{let s=!1;for(const o of Ca(r)){const l=yS(o,e,t);if(l!==0)return l;s=s||o.field.isKeyField()}return 0}}function yS(r,e,t){const s=r.field.isKeyField()?me.comparator(e.key,t.key):function(l,h,p){const g=h.data.field(l),_=p.data.field(l);return g!==null&&_!==null?So(g,_):Ee()}(r.field,e,t);switch(r.dir){case"asc":return s;case"desc":return-1*s;default:return Ee()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class No{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s!==void 0){for(const[o,l]of s)if(this.equalsFn(o,e))return l}}has(e){return this.get(e)!==void 0}set(e,t){const s=this.mapKeyFn(e),o=this.inner[s];if(o===void 0)return this.inner[s]=[[e,t]],void this.innerSize++;for(let l=0;l<o.length;l++)if(this.equalsFn(o[l][0],e))return void(o[l]=[e,t]);o.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s===void 0)return!1;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],e))return s.length===1?delete this.inner[t]:s.splice(o,1),this.innerSize--,!0;return!1}forEach(e){vs(this.inner,(t,s)=>{for(const[o,l]of s)e(o,l)})}isEmpty(){return p_(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _S=new rt(me.comparator);function Wr(){return _S}const k_=new rt(me.comparator);function Ia(...r){let e=k_;for(const t of r)e=e.insert(t.key,t);return e}function R_(r){let e=k_;return r.forEach((t,s)=>e=e.insert(t,s.overlayedDocument)),e}function as(){return Pa()}function C_(){return Pa()}function Pa(){return new No(r=>r.toString(),(r,e)=>r.isEqual(e))}const vS=new rt(me.comparator),wS=new Ot(me.comparator);function Ce(...r){let e=wS;for(const t of r)e=e.add(t);return e}const ES=new Ot(Ue);function TS(){return ES}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yd(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ju(e)?"-0":e}}function P_(r){return{integerValue:""+r}}function IS(r,e){return ZI(e)?P_(e):Yd(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(){this._=void 0}}function SS(r,e,t){return r instanceof $u?function(o,l){const h={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:o.seconds,nanos:o.nanoseconds}}}};return l&&Wd(l)&&(l=qd(l)),l&&(h.fields.__previous_value__=l),{mapValue:h}}(t,e):r instanceof Fa?N_(r,e):r instanceof Ua?D_(r,e):function(o,l){const h=x_(o,l),p=Rg(h)+Rg(o.Pe);return md(h)&&md(o.Pe)?P_(p):Yd(o.serializer,p)}(r,e)}function AS(r,e,t){return r instanceof Fa?N_(r,e):r instanceof Ua?D_(r,e):t}function x_(r,e){return r instanceof Wu?function(s){return md(s)||function(l){return!!l&&"doubleValue"in l}(s)}(e)?e:{integerValue:0}:null}class $u extends sc{}class Fa extends sc{constructor(e){super(),this.elements=e}}function N_(r,e){const t=O_(e);for(const s of r.elements)t.some(o=>mr(o,s))||t.push(s);return{arrayValue:{values:t}}}class Ua extends sc{constructor(e){super(),this.elements=e}}function D_(r,e){let t=O_(e);for(const s of r.elements)t=t.filter(o=>!mr(o,s));return{arrayValue:{values:t}}}class Wu extends sc{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Rg(r){return ot(r.integerValue||r.doubleValue)}function O_(r){return Hd(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}function kS(r,e){return r.field.isEqual(e.field)&&function(s,o){return s instanceof Fa&&o instanceof Fa||s instanceof Ua&&o instanceof Ua?Io(s.elements,o.elements,mr):s instanceof Wu&&o instanceof Wu?mr(s.Pe,o.Pe):s instanceof $u&&o instanceof $u}(r.transform,e.transform)}class RS{constructor(e,t){this.version=e,this.transformResults=t}}class fr{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new fr}static exists(e){return new fr(void 0,e)}static updateTime(e){return new fr(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Cu(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class oc{}function V_(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new L_(r.key,fr.none()):new Ya(r.key,r.data,fr.none());{const t=r.data,s=sn.empty();let o=new Ot(Dt.comparator);for(let l of e.fields)if(!o.has(l)){let h=t.field(l);h===null&&l.length>1&&(l=l.popLast(),h=t.field(l)),h===null?s.delete(l):s.set(l,h),o=o.add(l)}return new bi(r.key,s,new mn(o.toArray()),fr.none())}}function CS(r,e,t){r instanceof Ya?function(o,l,h){const p=o.value.clone(),g=Pg(o.fieldTransforms,l,h.transformResults);p.setAll(g),l.convertToFoundDocument(h.version,p).setHasCommittedMutations()}(r,e,t):r instanceof bi?function(o,l,h){if(!Cu(o.precondition,l))return void l.convertToUnknownDocument(h.version);const p=Pg(o.fieldTransforms,l,h.transformResults),g=l.data;g.setAll(b_(o)),g.setAll(p),l.convertToFoundDocument(h.version,g).setHasCommittedMutations()}(r,e,t):function(o,l,h){l.convertToNoDocument(h.version).setHasCommittedMutations()}(0,e,t)}function xa(r,e,t,s){return r instanceof Ya?function(l,h,p,g){if(!Cu(l.precondition,h))return p;const _=l.value.clone(),E=xg(l.fieldTransforms,g,h);return _.setAll(E),h.convertToFoundDocument(h.version,_).setHasLocalMutations(),null}(r,e,t,s):r instanceof bi?function(l,h,p,g){if(!Cu(l.precondition,h))return p;const _=xg(l.fieldTransforms,g,h),E=h.data;return E.setAll(b_(l)),E.setAll(_),h.convertToFoundDocument(h.version,E).setHasLocalMutations(),p===null?null:p.unionWith(l.fieldMask.fields).unionWith(l.fieldTransforms.map(R=>R.field))}(r,e,t,s):function(l,h,p){return Cu(l.precondition,h)?(h.convertToNoDocument(h.version).setHasLocalMutations(),null):p}(r,e,t)}function PS(r,e){let t=null;for(const s of r.fieldTransforms){const o=e.data.field(s.field),l=x_(s.transform,o||null);l!=null&&(t===null&&(t=sn.empty()),t.set(s.field,l))}return t||null}function Cg(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!function(s,o){return s===void 0&&o===void 0||!(!s||!o)&&Io(s,o,(l,h)=>kS(l,h))}(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class Ya extends oc{constructor(e,t,s,o=[]){super(),this.key=e,this.value=t,this.precondition=s,this.fieldTransforms=o,this.type=0}getFieldMask(){return null}}class bi extends oc{constructor(e,t,s,o,l=[]){super(),this.key=e,this.data=t,this.fieldMask=s,this.precondition=o,this.fieldTransforms=l,this.type=1}getFieldMask(){return this.fieldMask}}function b_(r){const e=new Map;return r.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const s=r.data.field(t);e.set(t,s)}}),e}function Pg(r,e,t){const s=new Map;Be(r.length===t.length);for(let o=0;o<t.length;o++){const l=r[o],h=l.transform,p=e.data.field(l.field);s.set(l.field,AS(h,p,t[o]))}return s}function xg(r,e,t){const s=new Map;for(const o of r){const l=o.transform,h=t.data.field(o.field);s.set(o.field,SS(l,h,e))}return s}class L_ extends oc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class xS extends oc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NS{constructor(e,t,s,o){this.batchId=e,this.localWriteTime=t,this.baseMutations=s,this.mutations=o}applyToRemoteDocument(e,t){const s=t.mutationResults;for(let o=0;o<this.mutations.length;o++){const l=this.mutations[o];l.key.isEqual(e.key)&&CS(l,e,s[o])}}applyToLocalView(e,t){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(t=xa(s,e,t,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(t=xa(s,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const s=C_();return this.mutations.forEach(o=>{const l=e.get(o.key),h=l.overlayedDocument;let p=this.applyToLocalView(h,l.mutatedFields);p=t.has(o.key)?null:p;const g=V_(h,p);g!==null&&s.set(o.key,g),h.isValidDocument()||h.convertToNoDocument(Te.min())}),s}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Ce())}isEqual(e){return this.batchId===e.batchId&&Io(this.mutations,e.mutations,(t,s)=>Cg(t,s))&&Io(this.baseMutations,e.baseMutations,(t,s)=>Cg(t,s))}}class Xd{constructor(e,t,s,o){this.batch=e,this.commitVersion=t,this.mutationResults=s,this.docVersions=o}static from(e,t,s){Be(e.mutations.length===s.length);let o=function(){return vS}();const l=e.mutations;for(let h=0;h<l.length;h++)o=o.insert(l[h].key,s[h].version);return new Xd(e,t,s,o)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DS{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OS{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ht,Ve;function VS(r){switch(r){default:return Ee();case W.CANCELLED:case W.UNKNOWN:case W.DEADLINE_EXCEEDED:case W.RESOURCE_EXHAUSTED:case W.INTERNAL:case W.UNAVAILABLE:case W.UNAUTHENTICATED:return!1;case W.INVALID_ARGUMENT:case W.NOT_FOUND:case W.ALREADY_EXISTS:case W.PERMISSION_DENIED:case W.FAILED_PRECONDITION:case W.ABORTED:case W.OUT_OF_RANGE:case W.UNIMPLEMENTED:case W.DATA_LOSS:return!0}}function M_(r){if(r===void 0)return $r("GRPC error has no .code"),W.UNKNOWN;switch(r){case ht.OK:return W.OK;case ht.CANCELLED:return W.CANCELLED;case ht.UNKNOWN:return W.UNKNOWN;case ht.DEADLINE_EXCEEDED:return W.DEADLINE_EXCEEDED;case ht.RESOURCE_EXHAUSTED:return W.RESOURCE_EXHAUSTED;case ht.INTERNAL:return W.INTERNAL;case ht.UNAVAILABLE:return W.UNAVAILABLE;case ht.UNAUTHENTICATED:return W.UNAUTHENTICATED;case ht.INVALID_ARGUMENT:return W.INVALID_ARGUMENT;case ht.NOT_FOUND:return W.NOT_FOUND;case ht.ALREADY_EXISTS:return W.ALREADY_EXISTS;case ht.PERMISSION_DENIED:return W.PERMISSION_DENIED;case ht.FAILED_PRECONDITION:return W.FAILED_PRECONDITION;case ht.ABORTED:return W.ABORTED;case ht.OUT_OF_RANGE:return W.OUT_OF_RANGE;case ht.UNIMPLEMENTED:return W.UNIMPLEMENTED;case ht.DATA_LOSS:return W.DATA_LOSS;default:return Ee()}}(Ve=ht||(ht={}))[Ve.OK=0]="OK",Ve[Ve.CANCELLED=1]="CANCELLED",Ve[Ve.UNKNOWN=2]="UNKNOWN",Ve[Ve.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ve[Ve.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ve[Ve.NOT_FOUND=5]="NOT_FOUND",Ve[Ve.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ve[Ve.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ve[Ve.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ve[Ve.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ve[Ve.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ve[Ve.ABORTED=10]="ABORTED",Ve[Ve.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ve[Ve.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ve[Ve.INTERNAL=13]="INTERNAL",Ve[Ve.UNAVAILABLE=14]="UNAVAILABLE",Ve[Ve.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bS(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LS=new ls([4294967295,4294967295],0);function Ng(r){const e=bS().encode(r),t=new o_;return t.update(e),new Uint8Array(t.digest())}function Dg(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),s=e.getUint32(4,!0),o=e.getUint32(8,!0),l=e.getUint32(12,!0);return[new ls([t,s],0),new ls([o,l],0)]}class Jd{constructor(e,t,s){if(this.bitmap=e,this.padding=t,this.hashCount=s,t<0||t>=8)throw new Sa(`Invalid padding: ${t}`);if(s<0)throw new Sa(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new Sa(`Invalid hash count: ${s}`);if(e.length===0&&t!==0)throw new Sa(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=ls.fromNumber(this.Ie)}Ee(e,t,s){let o=e.add(t.multiply(ls.fromNumber(s)));return o.compare(LS)===1&&(o=new ls([o.getBits(0),o.getBits(1)],0)),o.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=Ng(e),[s,o]=Dg(t);for(let l=0;l<this.hashCount;l++){const h=this.Ee(s,o,l);if(!this.de(h))return!1}return!0}static create(e,t,s){const o=e%8==0?0:8-e%8,l=new Uint8Array(Math.ceil(e/8)),h=new Jd(l,o,t);return s.forEach(p=>h.insert(p)),h}insert(e){if(this.Ie===0)return;const t=Ng(e),[s,o]=Dg(t);for(let l=0;l<this.hashCount;l++){const h=this.Ee(s,o,l);this.Ae(h)}}Ae(e){const t=Math.floor(e/8),s=e%8;this.bitmap[t]|=1<<s}}class Sa extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(e,t,s,o,l){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=s,this.documentUpdates=o,this.resolvedLimboDocuments=l}static createSynthesizedRemoteEventForCurrentChange(e,t,s){const o=new Map;return o.set(e,Xa.createSynthesizedTargetChangeForCurrentChange(e,t,s)),new ac(Te.min(),o,new rt(Ue),Wr(),Ce())}}class Xa{constructor(e,t,s,o,l){this.resumeToken=e,this.current=t,this.addedDocuments=s,this.modifiedDocuments=o,this.removedDocuments=l}static createSynthesizedTargetChangeForCurrentChange(e,t,s){return new Xa(s,t,Ce(),Ce(),Ce())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pu{constructor(e,t,s,o){this.Re=e,this.removedTargetIds=t,this.key=s,this.Ve=o}}class F_{constructor(e,t){this.targetId=e,this.me=t}}class U_{constructor(e,t,s=Vt.EMPTY_BYTE_STRING,o=null){this.state=e,this.targetIds=t,this.resumeToken=s,this.cause=o}}class Og{constructor(){this.fe=0,this.ge=bg(),this.pe=Vt.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=Ce(),t=Ce(),s=Ce();return this.ge.forEach((o,l)=>{switch(l){case 0:e=e.add(o);break;case 2:t=t.add(o);break;case 1:s=s.add(o);break;default:Ee()}}),new Xa(this.pe,this.ye,e,t,s)}Ce(){this.we=!1,this.ge=bg()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,Be(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class MS{constructor(e){this.Le=e,this.Be=new Map,this.ke=Wr(),this.qe=Vg(),this.Qe=new rt(Ue)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const s=this.Ge(t);switch(e.state){case 0:this.ze(t)&&s.De(e.resumeToken);break;case 1:s.Oe(),s.Se||s.Ce(),s.De(e.resumeToken);break;case 2:s.Oe(),s.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(s.Ne(),s.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),s.De(e.resumeToken));break;default:Ee()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((s,o)=>{this.ze(o)&&t(o)})}He(e){const t=e.targetId,s=e.me.count,o=this.Je(t);if(o){const l=o.target;if(yd(l))if(s===0){const h=new me(l.path);this.Ue(t,h,Bt.newNoDocument(h,Te.min()))}else Be(s===1);else{const h=this.Ye(t);if(h!==s){const p=this.Ze(e),g=p?this.Xe(p,e,h):1;if(g!==0){this.je(t);const _=g===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,_)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:s="",padding:o=0},hashCount:l=0}=t;let h,p;try{h=ms(s).toUint8Array()}catch(g){if(g instanceof m_)return To("Decoding the base64 bloom filter in existence filter failed ("+g.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw g}try{p=new Jd(h,o,l)}catch(g){return To(g instanceof Sa?"BloomFilter error: ":"Applying bloom filter failed: ",g),null}return p.Ie===0?null:p}Xe(e,t,s){return t.me.count===s-this.nt(e,t.targetId)?0:2}nt(e,t){const s=this.Le.getRemoteKeysForTarget(t);let o=0;return s.forEach(l=>{const h=this.Le.tt(),p=`projects/${h.projectId}/databases/${h.database}/documents/${l.path.canonicalString()}`;e.mightContain(p)||(this.Ue(t,l,null),o++)}),o}rt(e){const t=new Map;this.Be.forEach((l,h)=>{const p=this.Je(h);if(p){if(l.current&&yd(p.target)){const g=new me(p.target.path);this.ke.get(g)!==null||this.it(h,g)||this.Ue(h,g,Bt.newNoDocument(g,e))}l.be&&(t.set(h,l.ve()),l.Ce())}});let s=Ce();this.qe.forEach((l,h)=>{let p=!0;h.forEachWhile(g=>{const _=this.Je(g);return!_||_.purpose==="TargetPurposeLimboResolution"||(p=!1,!1)}),p&&(s=s.add(l))}),this.ke.forEach((l,h)=>h.setReadTime(e));const o=new ac(e,t,this.Qe,this.ke,s);return this.ke=Wr(),this.qe=Vg(),this.Qe=new rt(Ue),o}$e(e,t){if(!this.ze(e))return;const s=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,s),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,s){if(!this.ze(e))return;const o=this.Ge(e);this.it(e,t)?o.Fe(t,1):o.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),s&&(this.ke=this.ke.insert(t,s))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new Og,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new Ot(Ue),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||le("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Og),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function Vg(){return new rt(me.comparator)}function bg(){return new rt(me.comparator)}const FS={asc:"ASCENDING",desc:"DESCENDING"},US={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},jS={and:"AND",or:"OR"};class zS{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function wd(r,e){return r.useProto3Json||nc(e)?e:{value:e}}function qu(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function j_(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function BS(r,e){return qu(r,e.toTimestamp())}function pr(r){return Be(!!r),Te.fromTimestamp(function(t){const s=Ni(t);return new gt(s.seconds,s.nanos)}(r))}function Zd(r,e){return Ed(r,e).canonicalString()}function Ed(r,e){const t=function(o){return new Ye(["projects",o.projectId,"databases",o.database])}(r).child("documents");return e===void 0?t:t.child(e)}function z_(r){const e=Ye.fromString(r);return Be(H_(e)),e}function Td(r,e){return Zd(r.databaseId,e.path)}function Zh(r,e){const t=z_(e);if(t.get(1)!==r.databaseId.projectId)throw new oe(W.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new oe(W.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new me($_(t))}function B_(r,e){return Zd(r.databaseId,e)}function $S(r){const e=z_(r);return e.length===4?Ye.emptyPath():$_(e)}function Id(r){return new Ye(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function $_(r){return Be(r.length>4&&r.get(4)==="documents"),r.popFirst(5)}function Lg(r,e,t){return{name:Td(r,e),fields:t.value.mapValue.fields}}function WS(r,e){let t;if("targetChange"in e){e.targetChange;const s=function(_){return _==="NO_CHANGE"?0:_==="ADD"?1:_==="REMOVE"?2:_==="CURRENT"?3:_==="RESET"?4:Ee()}(e.targetChange.targetChangeType||"NO_CHANGE"),o=e.targetChange.targetIds||[],l=function(_,E){return _.useProto3Json?(Be(E===void 0||typeof E=="string"),Vt.fromBase64String(E||"")):(Be(E===void 0||E instanceof Buffer||E instanceof Uint8Array),Vt.fromUint8Array(E||new Uint8Array))}(r,e.targetChange.resumeToken),h=e.targetChange.cause,p=h&&function(_){const E=_.code===void 0?W.UNKNOWN:M_(_.code);return new oe(E,_.message||"")}(h);t=new U_(s,o,l,p||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const o=Zh(r,s.document.name),l=pr(s.document.updateTime),h=s.document.createTime?pr(s.document.createTime):Te.min(),p=new sn({mapValue:{fields:s.document.fields}}),g=Bt.newFoundDocument(o,l,h,p),_=s.targetIds||[],E=s.removedTargetIds||[];t=new Pu(_,E,g.key,g)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const o=Zh(r,s.document),l=s.readTime?pr(s.readTime):Te.min(),h=Bt.newNoDocument(o,l),p=s.removedTargetIds||[];t=new Pu([],p,h.key,h)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const o=Zh(r,s.document),l=s.removedTargetIds||[];t=new Pu([],l,o,null)}else{if(!("filter"in e))return Ee();{e.filter;const s=e.filter;s.targetId;const{count:o=0,unchangedNames:l}=s,h=new OS(o,l),p=s.targetId;t=new F_(p,h)}}return t}function qS(r,e){let t;if(e instanceof Ya)t={update:Lg(r,e.key,e.value)};else if(e instanceof L_)t={delete:Td(r,e.key)};else if(e instanceof bi)t={update:Lg(r,e.key,e.data),updateMask:eA(e.fieldMask)};else{if(!(e instanceof xS))return Ee();t={verify:Td(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(s=>function(l,h){const p=h.transform;if(p instanceof $u)return{fieldPath:h.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(p instanceof Fa)return{fieldPath:h.field.canonicalString(),appendMissingElements:{values:p.elements}};if(p instanceof Ua)return{fieldPath:h.field.canonicalString(),removeAllFromArray:{values:p.elements}};if(p instanceof Wu)return{fieldPath:h.field.canonicalString(),increment:p.Pe};throw Ee()}(0,s))),e.precondition.isNone||(t.currentDocument=function(o,l){return l.updateTime!==void 0?{updateTime:BS(o,l.updateTime)}:l.exists!==void 0?{exists:l.exists}:Ee()}(r,e.precondition)),t}function HS(r,e){return r&&r.length>0?(Be(e!==void 0),r.map(t=>function(o,l){let h=o.updateTime?pr(o.updateTime):pr(l);return h.isEqual(Te.min())&&(h=pr(l)),new RS(h,o.transformResults||[])}(t,e))):[]}function KS(r,e){return{documents:[B_(r,e.path)]}}function GS(r,e){const t={structuredQuery:{}},s=e.path;let o;e.collectionGroup!==null?(o=s,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(o=s.popLast(),t.structuredQuery.from=[{collectionId:s.lastSegment()}]),t.parent=B_(r,o);const l=function(_){if(_.length!==0)return q_(Gn.create(_,"and"))}(e.filters);l&&(t.structuredQuery.where=l);const h=function(_){if(_.length!==0)return _.map(E=>function(O){return{field:mo(O.field),direction:XS(O.dir)}}(E))}(e.orderBy);h&&(t.structuredQuery.orderBy=h);const p=wd(r,e.limit);return p!==null&&(t.structuredQuery.limit=p),e.startAt&&(t.structuredQuery.startAt=function(_){return{before:_.inclusive,values:_.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(_){return{before:!_.inclusive,values:_.position}}(e.endAt)),{_t:t,parent:o}}function QS(r){let e=$S(r.parent);const t=r.structuredQuery,s=t.from?t.from.length:0;let o=null;if(s>0){Be(s===1);const E=t.from[0];E.allDescendants?o=E.collectionId:e=e.child(E.collectionId)}let l=[];t.where&&(l=function(R){const O=W_(R);return O instanceof Gn&&v_(O)?O.getFilters():[O]}(t.where));let h=[];t.orderBy&&(h=function(R){return R.map(O=>function(q){return new Bu(go(q.field),function(B){switch(B){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(q.direction))}(O))}(t.orderBy));let p=null;t.limit&&(p=function(R){let O;return O=typeof R=="object"?R.value:R,nc(O)?null:O}(t.limit));let g=null;t.startAt&&(g=function(R){const O=!!R.before,j=R.values||[];return new zu(j,O)}(t.startAt));let _=null;return t.endAt&&(_=function(R){const O=!R.before,j=R.values||[];return new zu(j,O)}(t.endAt)),pS(e,o,h,l,p,"F",g,_)}function YS(r,e){const t=function(o){switch(o){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Ee()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function W_(r){return r.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const s=go(t.unaryFilter.field);return dt.create(s,"==",{doubleValue:NaN});case"IS_NULL":const o=go(t.unaryFilter.field);return dt.create(o,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const l=go(t.unaryFilter.field);return dt.create(l,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const h=go(t.unaryFilter.field);return dt.create(h,"!=",{nullValue:"NULL_VALUE"});default:return Ee()}}(r):r.fieldFilter!==void 0?function(t){return dt.create(go(t.fieldFilter.field),function(o){switch(o){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return Ee()}}(t.fieldFilter.op),t.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(t){return Gn.create(t.compositeFilter.filters.map(s=>W_(s)),function(o){switch(o){case"AND":return"and";case"OR":return"or";default:return Ee()}}(t.compositeFilter.op))}(r):Ee()}function XS(r){return FS[r]}function JS(r){return US[r]}function ZS(r){return jS[r]}function mo(r){return{fieldPath:r.canonicalString()}}function go(r){return Dt.fromServerFormat(r.fieldPath)}function q_(r){return r instanceof dt?function(t){if(t.op==="=="){if(Tg(t.value))return{unaryFilter:{field:mo(t.field),op:"IS_NAN"}};if(Eg(t.value))return{unaryFilter:{field:mo(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Tg(t.value))return{unaryFilter:{field:mo(t.field),op:"IS_NOT_NAN"}};if(Eg(t.value))return{unaryFilter:{field:mo(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:mo(t.field),op:JS(t.op),value:t.value}}}(r):r instanceof Gn?function(t){const s=t.getFilters().map(o=>q_(o));return s.length===1?s[0]:{compositeFilter:{op:ZS(t.op),filters:s}}}(r):Ee()}function eA(r){const e=[];return r.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function H_(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{constructor(e,t,s,o,l=Te.min(),h=Te.min(),p=Vt.EMPTY_BYTE_STRING,g=null){this.target=e,this.targetId=t,this.purpose=s,this.sequenceNumber=o,this.snapshotVersion=l,this.lastLimboFreeSnapshotVersion=h,this.resumeToken=p,this.expectedCount=g}withSequenceNumber(e){return new Ai(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Ai(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Ai(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Ai(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tA{constructor(e){this.ct=e}}function nA(r){const e=QS({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?vd(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rA{constructor(){this.un=new iA}addToCollectionParentIndex(e,t){return this.un.add(t),G.resolve()}getCollectionParents(e,t){return G.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return G.resolve()}deleteFieldIndex(e,t){return G.resolve()}deleteAllFieldIndexes(e){return G.resolve()}createTargetIndexes(e,t){return G.resolve()}getDocumentsMatchingTarget(e,t){return G.resolve(null)}getIndexType(e,t){return G.resolve(0)}getFieldIndexes(e,t){return G.resolve([])}getNextCollectionGroupToUpdate(e){return G.resolve(null)}getMinOffset(e,t){return G.resolve(xi.min())}getMinOffsetFromCollectionGroup(e,t){return G.resolve(xi.min())}updateCollectionGroup(e,t,s){return G.resolve()}updateIndexEntries(e,t){return G.resolve()}}class iA{constructor(){this.index={}}add(e){const t=e.lastSegment(),s=e.popLast(),o=this.index[t]||new Ot(Ye.comparator),l=!o.has(s);return this.index[t]=o.add(s),l}has(e){const t=e.lastSegment(),s=e.popLast(),o=this.index[t];return o&&o.has(s)}getEntries(e){return(this.index[e]||new Ot(Ye.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new ko(0)}static kn(){return new ko(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sA{constructor(){this.changes=new No(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Bt.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const s=this.changes.get(t);return s!==void 0?G.resolve(s):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oA{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aA{constructor(e,t,s,o){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=s,this.indexManager=o}getDocument(e,t){let s=null;return this.documentOverlayCache.getOverlay(e,t).next(o=>(s=o,this.remoteDocumentCache.getEntry(e,t))).next(o=>(s!==null&&xa(s.mutation,o,mn.empty(),gt.now()),o))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(s=>this.getLocalViewOfDocuments(e,s,Ce()).next(()=>s))}getLocalViewOfDocuments(e,t,s=Ce()){const o=as();return this.populateOverlays(e,o,t).next(()=>this.computeViews(e,t,o,s).next(l=>{let h=Ia();return l.forEach((p,g)=>{h=h.insert(p,g.overlayedDocument)}),h}))}getOverlayedDocuments(e,t){const s=as();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,Ce()))}populateOverlays(e,t,s){const o=[];return s.forEach(l=>{t.has(l)||o.push(l)}),this.documentOverlayCache.getOverlays(e,o).next(l=>{l.forEach((h,p)=>{t.set(h,p)})})}computeViews(e,t,s,o){let l=Wr();const h=Pa(),p=function(){return Pa()}();return t.forEach((g,_)=>{const E=s.get(_.key);o.has(_.key)&&(E===void 0||E.mutation instanceof bi)?l=l.insert(_.key,_):E!==void 0?(h.set(_.key,E.mutation.getFieldMask()),xa(E.mutation,_,E.mutation.getFieldMask(),gt.now())):h.set(_.key,mn.empty())}),this.recalculateAndSaveOverlays(e,l).next(g=>(g.forEach((_,E)=>h.set(_,E)),t.forEach((_,E)=>{var R;return p.set(_,new oA(E,(R=h.get(_))!==null&&R!==void 0?R:null))}),p))}recalculateAndSaveOverlays(e,t){const s=Pa();let o=new rt((h,p)=>h-p),l=Ce();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(h=>{for(const p of h)p.keys().forEach(g=>{const _=t.get(g);if(_===null)return;let E=s.get(g)||mn.empty();E=p.applyToLocalView(_,E),s.set(g,E);const R=(o.get(p.batchId)||Ce()).add(g);o=o.insert(p.batchId,R)})}).next(()=>{const h=[],p=o.getReverseIterator();for(;p.hasNext();){const g=p.getNext(),_=g.key,E=g.value,R=C_();E.forEach(O=>{if(!l.has(O)){const j=V_(t.get(O),s.get(O));j!==null&&R.set(O,j),l=l.add(O)}}),h.push(this.documentOverlayCache.saveOverlays(e,_,R))}return G.waitFor(h)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(s=>this.recalculateAndSaveOverlays(e,s))}getDocumentsMatchingQuery(e,t,s,o){return function(h){return me.isDocumentKey(h.path)&&h.collectionGroup===null&&h.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):I_(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,s,o):this.getDocumentsMatchingCollectionQuery(e,t,s,o)}getNextDocuments(e,t,s,o){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,s,o).next(l=>{const h=o-l.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,s.largestBatchId,o-l.size):G.resolve(as());let p=-1,g=l;return h.next(_=>G.forEach(_,(E,R)=>(p<R.largestBatchId&&(p=R.largestBatchId),l.get(E)?G.resolve():this.remoteDocumentCache.getEntry(e,E).next(O=>{g=g.insert(E,O)}))).next(()=>this.populateOverlays(e,_,l)).next(()=>this.computeViews(e,g,_,Ce())).next(E=>({batchId:p,changes:R_(E)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new me(t)).next(s=>{let o=Ia();return s.isFoundDocument()&&(o=o.insert(s.key,s)),o})}getDocumentsMatchingCollectionGroupQuery(e,t,s,o){const l=t.collectionGroup;let h=Ia();return this.indexManager.getCollectionParents(e,l).next(p=>G.forEach(p,g=>{const _=function(R,O){return new Qa(O,null,R.explicitOrderBy.slice(),R.filters.slice(),R.limit,R.limitType,R.startAt,R.endAt)}(t,g.child(l));return this.getDocumentsMatchingCollectionQuery(e,_,s,o).next(E=>{E.forEach((R,O)=>{h=h.insert(R,O)})})}).next(()=>h))}getDocumentsMatchingCollectionQuery(e,t,s,o){let l;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,s.largestBatchId).next(h=>(l=h,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,s,l,o))).next(h=>{l.forEach((g,_)=>{const E=_.getKey();h.get(E)===null&&(h=h.insert(E,Bt.newInvalidDocument(E)))});let p=Ia();return h.forEach((g,_)=>{const E=l.get(g);E!==void 0&&xa(E.mutation,_,mn.empty(),gt.now()),ic(t,_)&&(p=p.insert(g,_))}),p})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lA{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return G.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(o){return{id:o.id,version:o.version,createTime:pr(o.createTime)}}(t)),G.resolve()}getNamedQuery(e,t){return G.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(o){return{name:o.name,query:nA(o.bundledQuery),readTime:pr(o.readTime)}}(t)),G.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uA{constructor(){this.overlays=new rt(me.comparator),this.Ir=new Map}getOverlay(e,t){return G.resolve(this.overlays.get(t))}getOverlays(e,t){const s=as();return G.forEach(t,o=>this.getOverlay(e,o).next(l=>{l!==null&&s.set(o,l)})).next(()=>s)}saveOverlays(e,t,s){return s.forEach((o,l)=>{this.ht(e,t,l)}),G.resolve()}removeOverlaysForBatchId(e,t,s){const o=this.Ir.get(s);return o!==void 0&&(o.forEach(l=>this.overlays=this.overlays.remove(l)),this.Ir.delete(s)),G.resolve()}getOverlaysForCollection(e,t,s){const o=as(),l=t.length+1,h=new me(t.child("")),p=this.overlays.getIteratorFrom(h);for(;p.hasNext();){const g=p.getNext().value,_=g.getKey();if(!t.isPrefixOf(_.path))break;_.path.length===l&&g.largestBatchId>s&&o.set(g.getKey(),g)}return G.resolve(o)}getOverlaysForCollectionGroup(e,t,s,o){let l=new rt((_,E)=>_-E);const h=this.overlays.getIterator();for(;h.hasNext();){const _=h.getNext().value;if(_.getKey().getCollectionGroup()===t&&_.largestBatchId>s){let E=l.get(_.largestBatchId);E===null&&(E=as(),l=l.insert(_.largestBatchId,E)),E.set(_.getKey(),_)}}const p=as(),g=l.getIterator();for(;g.hasNext()&&(g.getNext().value.forEach((_,E)=>p.set(_,E)),!(p.size()>=o)););return G.resolve(p)}ht(e,t,s){const o=this.overlays.get(s.key);if(o!==null){const h=this.Ir.get(o.largestBatchId).delete(s.key);this.Ir.set(o.largestBatchId,h)}this.overlays=this.overlays.insert(s.key,new DS(t,s));let l=this.Ir.get(t);l===void 0&&(l=Ce(),this.Ir.set(t,l)),this.Ir.set(t,l.add(s.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cA{constructor(){this.sessionToken=Vt.EMPTY_BYTE_STRING}getSessionToken(e){return G.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,G.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{constructor(){this.Tr=new Ot(It.Er),this.dr=new Ot(It.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const s=new It(e,t);this.Tr=this.Tr.add(s),this.dr=this.dr.add(s)}Rr(e,t){e.forEach(s=>this.addReference(s,t))}removeReference(e,t){this.Vr(new It(e,t))}mr(e,t){e.forEach(s=>this.removeReference(s,t))}gr(e){const t=new me(new Ye([])),s=new It(t,e),o=new It(t,e+1),l=[];return this.dr.forEachInRange([s,o],h=>{this.Vr(h),l.push(h.key)}),l}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new me(new Ye([])),s=new It(t,e),o=new It(t,e+1);let l=Ce();return this.dr.forEachInRange([s,o],h=>{l=l.add(h.key)}),l}containsKey(e){const t=new It(e,0),s=this.Tr.firstAfterOrEqual(t);return s!==null&&e.isEqual(s.key)}}class It{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return me.comparator(e.key,t.key)||Ue(e.wr,t.wr)}static Ar(e,t){return Ue(e.wr,t.wr)||me.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hA{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new Ot(It.Er)}checkEmpty(e){return G.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,s,o){const l=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const h=new NS(l,t,s,o);this.mutationQueue.push(h);for(const p of o)this.br=this.br.add(new It(p.key,l)),this.indexManager.addToCollectionParentIndex(e,p.key.path.popLast());return G.resolve(h)}lookupMutationBatch(e,t){return G.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const s=t+1,o=this.vr(s),l=o<0?0:o;return G.resolve(this.mutationQueue.length>l?this.mutationQueue[l]:null)}getHighestUnacknowledgedBatchId(){return G.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return G.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const s=new It(t,0),o=new It(t,Number.POSITIVE_INFINITY),l=[];return this.br.forEachInRange([s,o],h=>{const p=this.Dr(h.wr);l.push(p)}),G.resolve(l)}getAllMutationBatchesAffectingDocumentKeys(e,t){let s=new Ot(Ue);return t.forEach(o=>{const l=new It(o,0),h=new It(o,Number.POSITIVE_INFINITY);this.br.forEachInRange([l,h],p=>{s=s.add(p.wr)})}),G.resolve(this.Cr(s))}getAllMutationBatchesAffectingQuery(e,t){const s=t.path,o=s.length+1;let l=s;me.isDocumentKey(l)||(l=l.child(""));const h=new It(new me(l),0);let p=new Ot(Ue);return this.br.forEachWhile(g=>{const _=g.key.path;return!!s.isPrefixOf(_)&&(_.length===o&&(p=p.add(g.wr)),!0)},h),G.resolve(this.Cr(p))}Cr(e){const t=[];return e.forEach(s=>{const o=this.Dr(s);o!==null&&t.push(o)}),t}removeMutationBatch(e,t){Be(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let s=this.br;return G.forEach(t.mutations,o=>{const l=new It(o.key,t.batchId);return s=s.delete(l),this.referenceDelegate.markPotentiallyOrphaned(e,o.key)}).next(()=>{this.br=s})}On(e){}containsKey(e,t){const s=new It(t,0),o=this.br.firstAfterOrEqual(s);return G.resolve(t.isEqual(o&&o.key))}performConsistencyCheck(e){return this.mutationQueue.length,G.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dA{constructor(e){this.Mr=e,this.docs=function(){return new rt(me.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const s=t.key,o=this.docs.get(s),l=o?o.size:0,h=this.Mr(t);return this.docs=this.docs.insert(s,{document:t.mutableCopy(),size:h}),this.size+=h-l,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const s=this.docs.get(t);return G.resolve(s?s.document.mutableCopy():Bt.newInvalidDocument(t))}getEntries(e,t){let s=Wr();return t.forEach(o=>{const l=this.docs.get(o);s=s.insert(o,l?l.document.mutableCopy():Bt.newInvalidDocument(o))}),G.resolve(s)}getDocumentsMatchingQuery(e,t,s,o){let l=Wr();const h=t.path,p=new me(h.child("")),g=this.docs.getIteratorFrom(p);for(;g.hasNext();){const{key:_,value:{document:E}}=g.getNext();if(!h.isPrefixOf(_.path))break;_.path.length>h.length+1||QI(GI(E),s)<=0||(o.has(E.key)||ic(t,E))&&(l=l.insert(E.key,E.mutableCopy()))}return G.resolve(l)}getAllFromCollectionGroup(e,t,s,o){Ee()}Or(e,t){return G.forEach(this.docs,s=>t(s))}newChangeBuffer(e){return new fA(this)}getSize(e){return G.resolve(this.size)}}class fA extends sA{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((s,o)=>{o.isValidDocument()?t.push(this.cr.addEntry(e,o)):this.cr.removeEntry(s)}),G.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pA{constructor(e){this.persistence=e,this.Nr=new No(t=>Kd(t),Gd),this.lastRemoteSnapshotVersion=Te.min(),this.highestTargetId=0,this.Lr=0,this.Br=new ef,this.targetCount=0,this.kr=ko.Bn()}forEachTarget(e,t){return this.Nr.forEach((s,o)=>t(o)),G.resolve()}getLastRemoteSnapshotVersion(e){return G.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return G.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),G.resolve(this.highestTargetId)}setTargetsMetadata(e,t,s){return s&&(this.lastRemoteSnapshotVersion=s),t>this.Lr&&(this.Lr=t),G.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new ko(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,G.resolve()}updateTargetData(e,t){return this.Kn(t),G.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,G.resolve()}removeTargets(e,t,s){let o=0;const l=[];return this.Nr.forEach((h,p)=>{p.sequenceNumber<=t&&s.get(p.targetId)===null&&(this.Nr.delete(h),l.push(this.removeMatchingKeysForTargetId(e,p.targetId)),o++)}),G.waitFor(l).next(()=>o)}getTargetCount(e){return G.resolve(this.targetCount)}getTargetData(e,t){const s=this.Nr.get(t)||null;return G.resolve(s)}addMatchingKeys(e,t,s){return this.Br.Rr(t,s),G.resolve()}removeMatchingKeys(e,t,s){this.Br.mr(t,s);const o=this.persistence.referenceDelegate,l=[];return o&&t.forEach(h=>{l.push(o.markPotentiallyOrphaned(e,h))}),G.waitFor(l)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),G.resolve()}getMatchingKeysForTargetId(e,t){const s=this.Br.yr(t);return G.resolve(s)}containsKey(e,t){return G.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mA{constructor(e,t){this.qr={},this.overlays={},this.Qr=new $d(0),this.Kr=!1,this.Kr=!0,this.$r=new cA,this.referenceDelegate=e(this),this.Ur=new pA(this),this.indexManager=new rA,this.remoteDocumentCache=function(o){return new dA(o)}(s=>this.referenceDelegate.Wr(s)),this.serializer=new tA(t),this.Gr=new lA(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new uA,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let s=this.qr[e.toKey()];return s||(s=new hA(t,this.referenceDelegate),this.qr[e.toKey()]=s),s}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,s){le("MemoryPersistence","Starting transaction:",e);const o=new gA(this.Qr.next());return this.referenceDelegate.zr(),s(o).next(l=>this.referenceDelegate.jr(o).next(()=>l)).toPromise().then(l=>(o.raiseOnCommittedEvent(),l))}Hr(e,t){return G.or(Object.values(this.qr).map(s=>()=>s.containsKey(e,t)))}}class gA extends XI{constructor(e){super(),this.currentSequenceNumber=e}}class tf{constructor(e){this.persistence=e,this.Jr=new ef,this.Yr=null}static Zr(e){return new tf(e)}get Xr(){if(this.Yr)return this.Yr;throw Ee()}addReference(e,t,s){return this.Jr.addReference(s,t),this.Xr.delete(s.toString()),G.resolve()}removeReference(e,t,s){return this.Jr.removeReference(s,t),this.Xr.add(s.toString()),G.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),G.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(o=>this.Xr.add(o.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,t.targetId).next(o=>{o.forEach(l=>this.Xr.add(l.toString()))}).next(()=>s.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return G.forEach(this.Xr,s=>{const o=me.fromPath(s);return this.ei(e,o).next(l=>{l||t.removeEntry(o,Te.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(s=>{s?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return G.or([()=>G.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(e,t,s,o){this.targetId=e,this.fromCache=t,this.$i=s,this.Ui=o}static Wi(e,t){let s=Ce(),o=Ce();for(const l of t.docChanges)switch(l.type){case 0:s=s.add(l.doc.key);break;case 1:o=o.add(l.doc.key)}return new nf(e,t.fromCache,s,o)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yA{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _A{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return lw()?8:JI($t())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,s,o){const l={result:null};return this.Yi(e,t).next(h=>{l.result=h}).next(()=>{if(!l.result)return this.Zi(e,t,o,s).next(h=>{l.result=h})}).next(()=>{if(l.result)return;const h=new yA;return this.Xi(e,t,h).next(p=>{if(l.result=p,this.zi)return this.es(e,t,h,p.size)})}).next(()=>l.result)}es(e,t,s,o){return s.documentReadCount<this.ji?(ya()<=De.DEBUG&&le("QueryEngine","SDK will not create cache indexes for query:",po(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),G.resolve()):(ya()<=De.DEBUG&&le("QueryEngine","Query:",po(t),"scans",s.documentReadCount,"local documents and returns",o,"documents as results."),s.documentReadCount>this.Hi*o?(ya()<=De.DEBUG&&le("QueryEngine","The SDK decides to create cache indexes for query:",po(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,dr(t))):G.resolve())}Yi(e,t){if(kg(t))return G.resolve(null);let s=dr(t);return this.indexManager.getIndexType(e,s).next(o=>o===0?null:(t.limit!==null&&o===1&&(t=vd(t,null,"F"),s=dr(t)),this.indexManager.getDocumentsMatchingTarget(e,s).next(l=>{const h=Ce(...l);return this.Ji.getDocuments(e,h).next(p=>this.indexManager.getMinOffset(e,s).next(g=>{const _=this.ts(t,p);return this.ns(t,_,h,g.readTime)?this.Yi(e,vd(t,null,"F")):this.rs(e,_,t,g)}))})))}Zi(e,t,s,o){return kg(t)||o.isEqual(Te.min())?G.resolve(null):this.Ji.getDocuments(e,s).next(l=>{const h=this.ts(t,l);return this.ns(t,h,s,o)?G.resolve(null):(ya()<=De.DEBUG&&le("QueryEngine","Re-using previous result from %s to execute query: %s",o.toString(),po(t)),this.rs(e,h,t,KI(o,-1)).next(p=>p))})}ts(e,t){let s=new Ot(A_(e));return t.forEach((o,l)=>{ic(e,l)&&(s=s.add(l))}),s}ns(e,t,s,o){if(e.limit===null)return!1;if(s.size!==t.size)return!0;const l=e.limitType==="F"?t.last():t.first();return!!l&&(l.hasPendingWrites||l.version.compareTo(o)>0)}Xi(e,t,s){return ya()<=De.DEBUG&&le("QueryEngine","Using full collection scan to execute query:",po(t)),this.Ji.getDocumentsMatchingQuery(e,t,xi.min(),s)}rs(e,t,s,o){return this.Ji.getDocumentsMatchingQuery(e,s,o).next(l=>(t.forEach(h=>{l=l.insert(h.key,h)}),l))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vA{constructor(e,t,s,o){this.persistence=e,this.ss=t,this.serializer=o,this.os=new rt(Ue),this._s=new No(l=>Kd(l),Gd),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(s)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new aA(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function wA(r,e,t,s){return new vA(r,e,t,s)}async function K_(r,e){const t=Ie(r);return await t.persistence.runTransaction("Handle user change","readonly",s=>{let o;return t.mutationQueue.getAllMutationBatches(s).next(l=>(o=l,t.ls(e),t.mutationQueue.getAllMutationBatches(s))).next(l=>{const h=[],p=[];let g=Ce();for(const _ of o){h.push(_.batchId);for(const E of _.mutations)g=g.add(E.key)}for(const _ of l){p.push(_.batchId);for(const E of _.mutations)g=g.add(E.key)}return t.localDocuments.getDocuments(s,g).next(_=>({hs:_,removedBatchIds:h,addedBatchIds:p}))})})}function EA(r,e){const t=Ie(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const o=e.batch.keys(),l=t.cs.newChangeBuffer({trackRemovals:!0});return function(p,g,_,E){const R=_.batch,O=R.keys();let j=G.resolve();return O.forEach(q=>{j=j.next(()=>E.getEntry(g,q)).next(Q=>{const B=_.docVersions.get(q);Be(B!==null),Q.version.compareTo(B)<0&&(R.applyToRemoteDocument(Q,_),Q.isValidDocument()&&(Q.setReadTime(_.commitVersion),E.addEntry(Q)))})}),j.next(()=>p.mutationQueue.removeMutationBatch(g,R))}(t,s,e,l).next(()=>l.apply(s)).next(()=>t.mutationQueue.performConsistencyCheck(s)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(s,o,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(p){let g=Ce();for(let _=0;_<p.mutationResults.length;++_)p.mutationResults[_].transformResults.length>0&&(g=g.add(p.batch.mutations[_].key));return g}(e))).next(()=>t.localDocuments.getDocuments(s,o))})}function G_(r){const e=Ie(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function TA(r,e){const t=Ie(r),s=e.snapshotVersion;let o=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",l=>{const h=t.cs.newChangeBuffer({trackRemovals:!0});o=t.os;const p=[];e.targetChanges.forEach((E,R)=>{const O=o.get(R);if(!O)return;p.push(t.Ur.removeMatchingKeys(l,E.removedDocuments,R).next(()=>t.Ur.addMatchingKeys(l,E.addedDocuments,R)));let j=O.withSequenceNumber(l.currentSequenceNumber);e.targetMismatches.get(R)!==null?j=j.withResumeToken(Vt.EMPTY_BYTE_STRING,Te.min()).withLastLimboFreeSnapshotVersion(Te.min()):E.resumeToken.approximateByteSize()>0&&(j=j.withResumeToken(E.resumeToken,s)),o=o.insert(R,j),function(Q,B,ce){return Q.resumeToken.approximateByteSize()===0||B.snapshotVersion.toMicroseconds()-Q.snapshotVersion.toMicroseconds()>=3e8?!0:ce.addedDocuments.size+ce.modifiedDocuments.size+ce.removedDocuments.size>0}(O,j,E)&&p.push(t.Ur.updateTargetData(l,j))});let g=Wr(),_=Ce();if(e.documentUpdates.forEach(E=>{e.resolvedLimboDocuments.has(E)&&p.push(t.persistence.referenceDelegate.updateLimboDocument(l,E))}),p.push(IA(l,h,e.documentUpdates).next(E=>{g=E.Ps,_=E.Is})),!s.isEqual(Te.min())){const E=t.Ur.getLastRemoteSnapshotVersion(l).next(R=>t.Ur.setTargetsMetadata(l,l.currentSequenceNumber,s));p.push(E)}return G.waitFor(p).next(()=>h.apply(l)).next(()=>t.localDocuments.getLocalViewOfDocuments(l,g,_)).next(()=>g)}).then(l=>(t.os=o,l))}function IA(r,e,t){let s=Ce(),o=Ce();return t.forEach(l=>s=s.add(l)),e.getEntries(r,s).next(l=>{let h=Wr();return t.forEach((p,g)=>{const _=l.get(p);g.isFoundDocument()!==_.isFoundDocument()&&(o=o.add(p)),g.isNoDocument()&&g.version.isEqual(Te.min())?(e.removeEntry(p,g.readTime),h=h.insert(p,g)):!_.isValidDocument()||g.version.compareTo(_.version)>0||g.version.compareTo(_.version)===0&&_.hasPendingWrites?(e.addEntry(g),h=h.insert(p,g)):le("LocalStore","Ignoring outdated watch update for ",p,". Current version:",_.version," Watch version:",g.version)}),{Ps:h,Is:o}})}function SA(r,e){const t=Ie(r);return t.persistence.runTransaction("Get next mutation batch","readonly",s=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(s,e)))}function AA(r,e){const t=Ie(r);return t.persistence.runTransaction("Allocate target","readwrite",s=>{let o;return t.Ur.getTargetData(s,e).next(l=>l?(o=l,G.resolve(o)):t.Ur.allocateTargetId(s).next(h=>(o=new Ai(e,h,"TargetPurposeListen",s.currentSequenceNumber),t.Ur.addTargetData(s,o).next(()=>o))))}).then(s=>{const o=t.os.get(s.targetId);return(o===null||s.snapshotVersion.compareTo(o.snapshotVersion)>0)&&(t.os=t.os.insert(s.targetId,s),t._s.set(e,s.targetId)),s})}async function Sd(r,e,t){const s=Ie(r),o=s.os.get(e),l=t?"readwrite":"readwrite-primary";try{t||await s.persistence.runTransaction("Release target",l,h=>s.persistence.referenceDelegate.removeTarget(h,o))}catch(h){if(!Ga(h))throw h;le("LocalStore",`Failed to update sequence numbers for target ${e}: ${h}`)}s.os=s.os.remove(e),s._s.delete(o.target)}function Mg(r,e,t){const s=Ie(r);let o=Te.min(),l=Ce();return s.persistence.runTransaction("Execute query","readwrite",h=>function(g,_,E){const R=Ie(g),O=R._s.get(E);return O!==void 0?G.resolve(R.os.get(O)):R.Ur.getTargetData(_,E)}(s,h,dr(e)).next(p=>{if(p)return o=p.lastLimboFreeSnapshotVersion,s.Ur.getMatchingKeysForTargetId(h,p.targetId).next(g=>{l=g})}).next(()=>s.ss.getDocumentsMatchingQuery(h,e,t?o:Te.min(),t?l:Ce())).next(p=>(kA(s,gS(e),p),{documents:p,Ts:l})))}function kA(r,e,t){let s=r.us.get(e)||Te.min();t.forEach((o,l)=>{l.readTime.compareTo(s)>0&&(s=l.readTime)}),r.us.set(e,s)}class Fg{constructor(){this.activeTargetIds=TS()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class RA{constructor(){this.so=new Fg,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,s){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,s){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Fg,Promise.resolve()}handleUserChange(e,t,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CA{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){le("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){le("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wu=null;function ed(){return wu===null?wu=function(){return 268435456+Math.round(2147483648*Math.random())}():wu++,"0x"+wu.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PA={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xA{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jt="WebChannelConnection";class NA extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const s=t.ssl?"https":"http",o=encodeURIComponent(this.databaseId.projectId),l=encodeURIComponent(this.databaseId.database);this.Do=s+"://"+t.host,this.vo=`projects/${o}/databases/${l}`,this.Co=this.databaseId.database==="(default)"?`project_id=${o}`:`project_id=${o}&database_id=${l}`}get Fo(){return!1}Mo(t,s,o,l,h){const p=ed(),g=this.xo(t,s.toUriEncodedString());le("RestConnection",`Sending RPC '${t}' ${p}:`,g,o);const _={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(_,l,h),this.No(t,g,_,o).then(E=>(le("RestConnection",`Received RPC '${t}' ${p}: `,E),E),E=>{throw To("RestConnection",`RPC '${t}' ${p} failed with error: `,E,"url: ",g,"request:",o),E})}Lo(t,s,o,l,h,p){return this.Mo(t,s,o,l,h)}Oo(t,s,o){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+xo}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),s&&s.headers.forEach((l,h)=>t[h]=l),o&&o.headers.forEach((l,h)=>t[h]=l)}xo(t,s){const o=PA[t];return`${this.Do}/v1/${s}:${o}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,s,o){const l=ed();return new Promise((h,p)=>{const g=new a_;g.setWithCredentials(!0),g.listenOnce(l_.COMPLETE,()=>{try{switch(g.getLastErrorCode()){case ku.NO_ERROR:const E=g.getResponseJson();le(jt,`XHR for RPC '${e}' ${l} received:`,JSON.stringify(E)),h(E);break;case ku.TIMEOUT:le(jt,`RPC '${e}' ${l} timed out`),p(new oe(W.DEADLINE_EXCEEDED,"Request time out"));break;case ku.HTTP_ERROR:const R=g.getStatus();if(le(jt,`RPC '${e}' ${l} failed with status:`,R,"response text:",g.getResponseText()),R>0){let O=g.getResponseJson();Array.isArray(O)&&(O=O[0]);const j=O?.error;if(j&&j.status&&j.message){const q=function(B){const ce=B.toLowerCase().replace(/_/g,"-");return Object.values(W).indexOf(ce)>=0?ce:W.UNKNOWN}(j.status);p(new oe(q,j.message))}else p(new oe(W.UNKNOWN,"Server responded with status "+g.getStatus()))}else p(new oe(W.UNAVAILABLE,"Connection failed."));break;default:Ee()}}finally{le(jt,`RPC '${e}' ${l} completed.`)}});const _=JSON.stringify(o);le(jt,`RPC '${e}' ${l} sending request:`,o),g.send(t,"POST",_,s,15)})}Bo(e,t,s){const o=ed(),l=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],h=h_(),p=c_(),g={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},_=this.longPollingOptions.timeoutSeconds;_!==void 0&&(g.longPollingTimeout=Math.round(1e3*_)),this.useFetchStreams&&(g.useFetchStreams=!0),this.Oo(g.initMessageHeaders,t,s),g.encodeInitMessageHeaders=!0;const E=l.join("");le(jt,`Creating RPC '${e}' stream ${o}: ${E}`,g);const R=h.createWebChannel(E,g);let O=!1,j=!1;const q=new xA({Io:B=>{j?le(jt,`Not sending because RPC '${e}' stream ${o} is closed:`,B):(O||(le(jt,`Opening RPC '${e}' stream ${o} transport.`),R.open(),O=!0),le(jt,`RPC '${e}' stream ${o} sending:`,B),R.send(B))},To:()=>R.close()}),Q=(B,ce,_e)=>{B.listen(ce,de=>{try{_e(de)}catch(fe){setTimeout(()=>{throw fe},0)}})};return Q(R,Ta.EventType.OPEN,()=>{j||(le(jt,`RPC '${e}' stream ${o} transport opened.`),q.yo())}),Q(R,Ta.EventType.CLOSE,()=>{j||(j=!0,le(jt,`RPC '${e}' stream ${o} transport closed`),q.So())}),Q(R,Ta.EventType.ERROR,B=>{j||(j=!0,To(jt,`RPC '${e}' stream ${o} transport errored:`,B),q.So(new oe(W.UNAVAILABLE,"The operation could not be completed")))}),Q(R,Ta.EventType.MESSAGE,B=>{var ce;if(!j){const _e=B.data[0];Be(!!_e);const de=_e,fe=de.error||((ce=de[0])===null||ce===void 0?void 0:ce.error);if(fe){le(jt,`RPC '${e}' stream ${o} received error:`,fe);const Re=fe.status;let X=function(k){const A=ht[k];if(A!==void 0)return M_(A)}(Re),C=fe.message;X===void 0&&(X=W.INTERNAL,C="Unknown error status: "+Re+" with message "+fe.message),j=!0,q.So(new oe(X,C)),R.close()}else le(jt,`RPC '${e}' stream ${o} received:`,_e),q.bo(_e)}}),Q(p,u_.STAT_EVENT,B=>{B.stat===fd.PROXY?le(jt,`RPC '${e}' stream ${o} detected buffering proxy`):B.stat===fd.NOPROXY&&le(jt,`RPC '${e}' stream ${o} detected no buffering proxy`)}),setTimeout(()=>{q.wo()},0),q}}function td(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lc(r){return new zS(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q_{constructor(e,t,s=1e3,o=1.5,l=6e4){this.ui=e,this.timerId=t,this.ko=s,this.qo=o,this.Qo=l,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),s=Math.max(0,Date.now()-this.Uo),o=Math.max(0,t-s);o>0&&le("ExponentialBackoff",`Backing off for ${o} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${s} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,o,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y_{constructor(e,t,s,o,l,h,p,g){this.ui=e,this.Ho=s,this.Jo=o,this.connection=l,this.authCredentialsProvider=h,this.appCheckCredentialsProvider=p,this.listener=g,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Q_(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===W.RESOURCE_EXHAUSTED?($r(t.toString()),$r("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===W.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,o])=>{this.Yo===t&&this.P_(s,o)},s=>{e(()=>{const o=new oe(W.UNKNOWN,"Fetching auth token failed: "+s.message);return this.I_(o)})})}P_(e,t){const s=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{s(()=>this.listener.Eo())}),this.stream.Ro(()=>{s(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(o=>{s(()=>this.I_(o))}),this.stream.onMessage(o=>{s(()=>++this.e_==1?this.E_(o):this.onNext(o))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return le("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(le("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class DA extends Y_{constructor(e,t,s,o,l,h){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,s,o,h),this.serializer=l}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=WS(this.serializer,e),s=function(l){if(!("targetChange"in l))return Te.min();const h=l.targetChange;return h.targetIds&&h.targetIds.length?Te.min():h.readTime?pr(h.readTime):Te.min()}(e);return this.listener.d_(t,s)}A_(e){const t={};t.database=Id(this.serializer),t.addTarget=function(l,h){let p;const g=h.target;if(p=yd(g)?{documents:KS(l,g)}:{query:GS(l,g)._t},p.targetId=h.targetId,h.resumeToken.approximateByteSize()>0){p.resumeToken=j_(l,h.resumeToken);const _=wd(l,h.expectedCount);_!==null&&(p.expectedCount=_)}else if(h.snapshotVersion.compareTo(Te.min())>0){p.readTime=qu(l,h.snapshotVersion.toTimestamp());const _=wd(l,h.expectedCount);_!==null&&(p.expectedCount=_)}return p}(this.serializer,e);const s=YS(this.serializer,e);s&&(t.labels=s),this.a_(t)}R_(e){const t={};t.database=Id(this.serializer),t.removeTarget=e,this.a_(t)}}class OA extends Y_{constructor(e,t,s,o,l,h){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,s,o,h),this.serializer=l}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return Be(!!e.streamToken),this.lastStreamToken=e.streamToken,Be(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Be(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=HS(e.writeResults,e.commitTime),s=pr(e.commitTime);return this.listener.g_(s,t)}p_(){const e={};e.database=Id(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(s=>qS(this.serializer,s))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VA extends class{}{constructor(e,t,s,o){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=s,this.serializer=o,this.y_=!1}w_(){if(this.y_)throw new oe(W.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,s,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([l,h])=>this.connection.Mo(e,Ed(t,s),o,l,h)).catch(l=>{throw l.name==="FirebaseError"?(l.code===W.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),l):new oe(W.UNKNOWN,l.toString())})}Lo(e,t,s,o,l){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([h,p])=>this.connection.Lo(e,Ed(t,s),o,h,p,l)).catch(h=>{throw h.name==="FirebaseError"?(h.code===W.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),h):new oe(W.UNKNOWN,h.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class bA{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?($r(t),this.D_=!1):le("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LA{constructor(e,t,s,o,l){this.localStore=e,this.datastore=t,this.asyncQueue=s,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=l,this.k_._o(h=>{s.enqueueAndForget(async()=>{ws(this)&&(le("RemoteStore","Restarting streams for network reachability change."),await async function(g){const _=Ie(g);_.L_.add(4),await Ja(_),_.q_.set("Unknown"),_.L_.delete(4),await uc(_)}(this))})}),this.q_=new bA(s,o)}}async function uc(r){if(ws(r))for(const e of r.B_)await e(!0)}async function Ja(r){for(const e of r.B_)await e(!1)}function X_(r,e){const t=Ie(r);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),af(t)?of(t):Do(t).r_()&&sf(t,e))}function rf(r,e){const t=Ie(r),s=Do(t);t.N_.delete(e),s.r_()&&J_(t,e),t.N_.size===0&&(s.r_()?s.o_():ws(t)&&t.q_.set("Unknown"))}function sf(r,e){if(r.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Te.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Do(r).A_(e)}function J_(r,e){r.Q_.xe(e),Do(r).R_(e)}function of(r){r.Q_=new MS({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>r.N_.get(e)||null,tt:()=>r.datastore.serializer.databaseId}),Do(r).start(),r.q_.v_()}function af(r){return ws(r)&&!Do(r).n_()&&r.N_.size>0}function ws(r){return Ie(r).L_.size===0}function Z_(r){r.Q_=void 0}async function MA(r){r.q_.set("Online")}async function FA(r){r.N_.forEach((e,t)=>{sf(r,e)})}async function UA(r,e){Z_(r),af(r)?(r.q_.M_(e),of(r)):r.q_.set("Unknown")}async function jA(r,e,t){if(r.q_.set("Online"),e instanceof U_&&e.state===2&&e.cause)try{await async function(o,l){const h=l.cause;for(const p of l.targetIds)o.N_.has(p)&&(await o.remoteSyncer.rejectListen(p,h),o.N_.delete(p),o.Q_.removeTarget(p))}(r,e)}catch(s){le("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),s),await Hu(r,s)}else if(e instanceof Pu?r.Q_.Ke(e):e instanceof F_?r.Q_.He(e):r.Q_.We(e),!t.isEqual(Te.min()))try{const s=await G_(r.localStore);t.compareTo(s)>=0&&await function(l,h){const p=l.Q_.rt(h);return p.targetChanges.forEach((g,_)=>{if(g.resumeToken.approximateByteSize()>0){const E=l.N_.get(_);E&&l.N_.set(_,E.withResumeToken(g.resumeToken,h))}}),p.targetMismatches.forEach((g,_)=>{const E=l.N_.get(g);if(!E)return;l.N_.set(g,E.withResumeToken(Vt.EMPTY_BYTE_STRING,E.snapshotVersion)),J_(l,g);const R=new Ai(E.target,g,_,E.sequenceNumber);sf(l,R)}),l.remoteSyncer.applyRemoteEvent(p)}(r,t)}catch(s){le("RemoteStore","Failed to raise snapshot:",s),await Hu(r,s)}}async function Hu(r,e,t){if(!Ga(e))throw e;r.L_.add(1),await Ja(r),r.q_.set("Offline"),t||(t=()=>G_(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{le("RemoteStore","Retrying IndexedDB access"),await t(),r.L_.delete(1),await uc(r)})}function ev(r,e){return e().catch(t=>Hu(r,t,e))}async function cc(r){const e=Ie(r),t=Di(e);let s=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;zA(e);)try{const o=await SA(e.localStore,s);if(o===null){e.O_.length===0&&t.o_();break}s=o.batchId,BA(e,o)}catch(o){await Hu(e,o)}tv(e)&&nv(e)}function zA(r){return ws(r)&&r.O_.length<10}function BA(r,e){r.O_.push(e);const t=Di(r);t.r_()&&t.V_&&t.m_(e.mutations)}function tv(r){return ws(r)&&!Di(r).n_()&&r.O_.length>0}function nv(r){Di(r).start()}async function $A(r){Di(r).p_()}async function WA(r){const e=Di(r);for(const t of r.O_)e.m_(t.mutations)}async function qA(r,e,t){const s=r.O_.shift(),o=Xd.from(s,e,t);await ev(r,()=>r.remoteSyncer.applySuccessfulWrite(o)),await cc(r)}async function HA(r,e){e&&Di(r).V_&&await async function(s,o){if(function(h){return VS(h)&&h!==W.ABORTED}(o.code)){const l=s.O_.shift();Di(s).s_(),await ev(s,()=>s.remoteSyncer.rejectFailedWrite(l.batchId,o)),await cc(s)}}(r,e),tv(r)&&nv(r)}async function jg(r,e){const t=Ie(r);t.asyncQueue.verifyOperationInProgress(),le("RemoteStore","RemoteStore received new credentials");const s=ws(t);t.L_.add(3),await Ja(t),s&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await uc(t)}async function KA(r,e){const t=Ie(r);e?(t.L_.delete(2),await uc(t)):e||(t.L_.add(2),await Ja(t),t.q_.set("Unknown"))}function Do(r){return r.K_||(r.K_=function(t,s,o){const l=Ie(t);return l.w_(),new DA(s,l.connection,l.authCredentials,l.appCheckCredentials,l.serializer,o)}(r.datastore,r.asyncQueue,{Eo:MA.bind(null,r),Ro:FA.bind(null,r),mo:UA.bind(null,r),d_:jA.bind(null,r)}),r.B_.push(async e=>{e?(r.K_.s_(),af(r)?of(r):r.q_.set("Unknown")):(await r.K_.stop(),Z_(r))})),r.K_}function Di(r){return r.U_||(r.U_=function(t,s,o){const l=Ie(t);return l.w_(),new OA(s,l.connection,l.authCredentials,l.appCheckCredentials,l.serializer,o)}(r.datastore,r.asyncQueue,{Eo:()=>Promise.resolve(),Ro:$A.bind(null,r),mo:HA.bind(null,r),f_:WA.bind(null,r),g_:qA.bind(null,r)}),r.B_.push(async e=>{e?(r.U_.s_(),await cc(r)):(await r.U_.stop(),r.O_.length>0&&(le("RemoteStore",`Stopping write stream with ${r.O_.length} pending writes`),r.O_=[]))})),r.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lf{constructor(e,t,s,o,l){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=s,this.op=o,this.removalCallback=l,this.deferred=new us,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(h=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,s,o,l){const h=Date.now()+s,p=new lf(e,t,h,o,l);return p.start(s),p}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new oe(W.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function uf(r,e){if($r("AsyncQueue",`${e}: ${r}`),Ga(r))return new oe(W.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(e){this.comparator=e?(t,s)=>e(t,s)||me.comparator(t.key,s.key):(t,s)=>me.comparator(t.key,s.key),this.keyedMap=Ia(),this.sortedSet=new rt(this.comparator)}static emptySet(e){return new Eo(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,s)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Eo)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;t.hasNext();){const o=t.getNext().key,l=s.getNext().key;if(!o.isEqual(l))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const s=new Eo;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=t,s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zg{constructor(){this.W_=new rt(me.comparator)}track(e){const t=e.doc.key,s=this.W_.get(t);s?e.type!==0&&s.type===3?this.W_=this.W_.insert(t,e):e.type===3&&s.type!==1?this.W_=this.W_.insert(t,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.W_=this.W_.remove(t):e.type===1&&s.type===2?this.W_=this.W_.insert(t,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):Ee():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,s)=>{e.push(s)}),e}}class Ro{constructor(e,t,s,o,l,h,p,g,_){this.query=e,this.docs=t,this.oldDocs=s,this.docChanges=o,this.mutatedKeys=l,this.fromCache=h,this.syncStateChanged=p,this.excludesMetadataChanges=g,this.hasCachedResults=_}static fromInitialDocuments(e,t,s,o,l){const h=[];return t.forEach(p=>{h.push({type:0,doc:p})}),new Ro(e,t,Eo.emptySet(t),h,s,o,!0,!1,l)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&rc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,s=e.docChanges;if(t.length!==s.length)return!1;for(let o=0;o<t.length;o++)if(t[o].type!==s[o].type||!t[o].doc.isEqual(s[o].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GA{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class QA{constructor(){this.queries=Bg(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,s){const o=Ie(t),l=o.queries;o.queries=Bg(),l.forEach((h,p)=>{for(const g of p.j_)g.onError(s)})})(this,new oe(W.ABORTED,"Firestore shutting down"))}}function Bg(){return new No(r=>S_(r),rc)}async function YA(r,e){const t=Ie(r);let s=3;const o=e.query;let l=t.queries.get(o);l?!l.H_()&&e.J_()&&(s=2):(l=new GA,s=e.J_()?0:1);try{switch(s){case 0:l.z_=await t.onListen(o,!0);break;case 1:l.z_=await t.onListen(o,!1);break;case 2:await t.onFirstRemoteStoreListen(o)}}catch(h){const p=uf(h,`Initialization of query '${po(e.query)}' failed`);return void e.onError(p)}t.queries.set(o,l),l.j_.push(e),e.Z_(t.onlineState),l.z_&&e.X_(l.z_)&&cf(t)}async function XA(r,e){const t=Ie(r),s=e.query;let o=3;const l=t.queries.get(s);if(l){const h=l.j_.indexOf(e);h>=0&&(l.j_.splice(h,1),l.j_.length===0?o=e.J_()?0:1:!l.H_()&&e.J_()&&(o=2))}switch(o){case 0:return t.queries.delete(s),t.onUnlisten(s,!0);case 1:return t.queries.delete(s),t.onUnlisten(s,!1);case 2:return t.onLastRemoteStoreUnlisten(s);default:return}}function JA(r,e){const t=Ie(r);let s=!1;for(const o of e){const l=o.query,h=t.queries.get(l);if(h){for(const p of h.j_)p.X_(o)&&(s=!0);h.z_=o}}s&&cf(t)}function ZA(r,e,t){const s=Ie(r),o=s.queries.get(e);if(o)for(const l of o.j_)l.onError(t);s.queries.delete(e)}function cf(r){r.Y_.forEach(e=>{e.next()})}var Ad,$g;($g=Ad||(Ad={})).ea="default",$g.Cache="cache";class ek{constructor(e,t,s){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=s||{}}X_(e){if(!this.options.includeMetadataChanges){const s=[];for(const o of e.docChanges)o.type!==3&&s.push(o);e=new Ro(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const s=t!=="Offline";return(!this.options._a||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=Ro.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Ad.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rv{constructor(e){this.key=e}}class iv{constructor(e){this.key=e}}class tk{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=Ce(),this.mutatedKeys=Ce(),this.Aa=A_(e),this.Ra=new Eo(this.Aa)}get Va(){return this.Ta}ma(e,t){const s=t?t.fa:new zg,o=t?t.Ra:this.Ra;let l=t?t.mutatedKeys:this.mutatedKeys,h=o,p=!1;const g=this.query.limitType==="F"&&o.size===this.query.limit?o.last():null,_=this.query.limitType==="L"&&o.size===this.query.limit?o.first():null;if(e.inorderTraversal((E,R)=>{const O=o.get(E),j=ic(this.query,R)?R:null,q=!!O&&this.mutatedKeys.has(O.key),Q=!!j&&(j.hasLocalMutations||this.mutatedKeys.has(j.key)&&j.hasCommittedMutations);let B=!1;O&&j?O.data.isEqual(j.data)?q!==Q&&(s.track({type:3,doc:j}),B=!0):this.ga(O,j)||(s.track({type:2,doc:j}),B=!0,(g&&this.Aa(j,g)>0||_&&this.Aa(j,_)<0)&&(p=!0)):!O&&j?(s.track({type:0,doc:j}),B=!0):O&&!j&&(s.track({type:1,doc:O}),B=!0,(g||_)&&(p=!0)),B&&(j?(h=h.add(j),l=Q?l.add(E):l.delete(E)):(h=h.delete(E),l=l.delete(E)))}),this.query.limit!==null)for(;h.size>this.query.limit;){const E=this.query.limitType==="F"?h.last():h.first();h=h.delete(E.key),l=l.delete(E.key),s.track({type:1,doc:E})}return{Ra:h,fa:s,ns:p,mutatedKeys:l}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,s,o){const l=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const h=e.fa.G_();h.sort((E,R)=>function(j,q){const Q=B=>{switch(B){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Ee()}};return Q(j)-Q(q)}(E.type,R.type)||this.Aa(E.doc,R.doc)),this.pa(s),o=o!=null&&o;const p=t&&!o?this.ya():[],g=this.da.size===0&&this.current&&!o?1:0,_=g!==this.Ea;return this.Ea=g,h.length!==0||_?{snapshot:new Ro(this.query,e.Ra,l,h,e.mutatedKeys,g===0,_,!1,!!s&&s.resumeToken.approximateByteSize()>0),wa:p}:{wa:p}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new zg,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=Ce(),this.Ra.forEach(s=>{this.Sa(s.key)&&(this.da=this.da.add(s.key))});const t=[];return e.forEach(s=>{this.da.has(s)||t.push(new iv(s))}),this.da.forEach(s=>{e.has(s)||t.push(new rv(s))}),t}ba(e){this.Ta=e.Ts,this.da=Ce();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return Ro.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class nk{constructor(e,t,s){this.query=e,this.targetId=t,this.view=s}}class rk{constructor(e){this.key=e,this.va=!1}}class ik{constructor(e,t,s,o,l,h){this.localStore=e,this.remoteStore=t,this.eventManager=s,this.sharedClientState=o,this.currentUser=l,this.maxConcurrentLimboResolutions=h,this.Ca={},this.Fa=new No(p=>S_(p),rc),this.Ma=new Map,this.xa=new Set,this.Oa=new rt(me.comparator),this.Na=new Map,this.La=new ef,this.Ba={},this.ka=new Map,this.qa=ko.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function sk(r,e,t=!0){const s=cv(r);let o;const l=s.Fa.get(e);return l?(s.sharedClientState.addLocalQueryTarget(l.targetId),o=l.view.Da()):o=await sv(s,e,t,!0),o}async function ok(r,e){const t=cv(r);await sv(t,e,!0,!1)}async function sv(r,e,t,s){const o=await AA(r.localStore,dr(e)),l=o.targetId,h=r.sharedClientState.addLocalQueryTarget(l,t);let p;return s&&(p=await ak(r,e,l,h==="current",o.resumeToken)),r.isPrimaryClient&&t&&X_(r.remoteStore,o),p}async function ak(r,e,t,s,o){r.Ka=(R,O,j)=>async function(Q,B,ce,_e){let de=B.view.ma(ce);de.ns&&(de=await Mg(Q.localStore,B.query,!1).then(({documents:C})=>B.view.ma(C,de)));const fe=_e&&_e.targetChanges.get(B.targetId),Re=_e&&_e.targetMismatches.get(B.targetId)!=null,X=B.view.applyChanges(de,Q.isPrimaryClient,fe,Re);return qg(Q,B.targetId,X.wa),X.snapshot}(r,R,O,j);const l=await Mg(r.localStore,e,!0),h=new tk(e,l.Ts),p=h.ma(l.documents),g=Xa.createSynthesizedTargetChangeForCurrentChange(t,s&&r.onlineState!=="Offline",o),_=h.applyChanges(p,r.isPrimaryClient,g);qg(r,t,_.wa);const E=new nk(e,t,h);return r.Fa.set(e,E),r.Ma.has(t)?r.Ma.get(t).push(e):r.Ma.set(t,[e]),_.snapshot}async function lk(r,e,t){const s=Ie(r),o=s.Fa.get(e),l=s.Ma.get(o.targetId);if(l.length>1)return s.Ma.set(o.targetId,l.filter(h=>!rc(h,e))),void s.Fa.delete(e);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(o.targetId),s.sharedClientState.isActiveQueryTarget(o.targetId)||await Sd(s.localStore,o.targetId,!1).then(()=>{s.sharedClientState.clearQueryState(o.targetId),t&&rf(s.remoteStore,o.targetId),kd(s,o.targetId)}).catch(Ka)):(kd(s,o.targetId),await Sd(s.localStore,o.targetId,!0))}async function uk(r,e){const t=Ie(r),s=t.Fa.get(e),o=t.Ma.get(s.targetId);t.isPrimaryClient&&o.length===1&&(t.sharedClientState.removeLocalQueryTarget(s.targetId),rf(t.remoteStore,s.targetId))}async function ck(r,e,t){const s=yk(r);try{const o=await function(h,p){const g=Ie(h),_=gt.now(),E=p.reduce((j,q)=>j.add(q.key),Ce());let R,O;return g.persistence.runTransaction("Locally write mutations","readwrite",j=>{let q=Wr(),Q=Ce();return g.cs.getEntries(j,E).next(B=>{q=B,q.forEach((ce,_e)=>{_e.isValidDocument()||(Q=Q.add(ce))})}).next(()=>g.localDocuments.getOverlayedDocuments(j,q)).next(B=>{R=B;const ce=[];for(const _e of p){const de=PS(_e,R.get(_e.key).overlayedDocument);de!=null&&ce.push(new bi(_e.key,de,g_(de.value.mapValue),fr.exists(!0)))}return g.mutationQueue.addMutationBatch(j,_,ce,p)}).next(B=>{O=B;const ce=B.applyToLocalDocumentSet(R,Q);return g.documentOverlayCache.saveOverlays(j,B.batchId,ce)})}).then(()=>({batchId:O.batchId,changes:R_(R)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(o.batchId),function(h,p,g){let _=h.Ba[h.currentUser.toKey()];_||(_=new rt(Ue)),_=_.insert(p,g),h.Ba[h.currentUser.toKey()]=_}(s,o.batchId,t),await Za(s,o.changes),await cc(s.remoteStore)}catch(o){const l=uf(o,"Failed to persist write");t.reject(l)}}async function ov(r,e){const t=Ie(r);try{const s=await TA(t.localStore,e);e.targetChanges.forEach((o,l)=>{const h=t.Na.get(l);h&&(Be(o.addedDocuments.size+o.modifiedDocuments.size+o.removedDocuments.size<=1),o.addedDocuments.size>0?h.va=!0:o.modifiedDocuments.size>0?Be(h.va):o.removedDocuments.size>0&&(Be(h.va),h.va=!1))}),await Za(t,s,e)}catch(s){await Ka(s)}}function Wg(r,e,t){const s=Ie(r);if(s.isPrimaryClient&&t===0||!s.isPrimaryClient&&t===1){const o=[];s.Fa.forEach((l,h)=>{const p=h.view.Z_(e);p.snapshot&&o.push(p.snapshot)}),function(h,p){const g=Ie(h);g.onlineState=p;let _=!1;g.queries.forEach((E,R)=>{for(const O of R.j_)O.Z_(p)&&(_=!0)}),_&&cf(g)}(s.eventManager,e),o.length&&s.Ca.d_(o),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function hk(r,e,t){const s=Ie(r);s.sharedClientState.updateQueryState(e,"rejected",t);const o=s.Na.get(e),l=o&&o.key;if(l){let h=new rt(me.comparator);h=h.insert(l,Bt.newNoDocument(l,Te.min()));const p=Ce().add(l),g=new ac(Te.min(),new Map,new rt(Ue),h,p);await ov(s,g),s.Oa=s.Oa.remove(l),s.Na.delete(e),hf(s)}else await Sd(s.localStore,e,!1).then(()=>kd(s,e,t)).catch(Ka)}async function dk(r,e){const t=Ie(r),s=e.batch.batchId;try{const o=await EA(t.localStore,e);lv(t,s,null),av(t,s),t.sharedClientState.updateMutationState(s,"acknowledged"),await Za(t,o)}catch(o){await Ka(o)}}async function fk(r,e,t){const s=Ie(r);try{const o=await function(h,p){const g=Ie(h);return g.persistence.runTransaction("Reject batch","readwrite-primary",_=>{let E;return g.mutationQueue.lookupMutationBatch(_,p).next(R=>(Be(R!==null),E=R.keys(),g.mutationQueue.removeMutationBatch(_,R))).next(()=>g.mutationQueue.performConsistencyCheck(_)).next(()=>g.documentOverlayCache.removeOverlaysForBatchId(_,E,p)).next(()=>g.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(_,E)).next(()=>g.localDocuments.getDocuments(_,E))})}(s.localStore,e);lv(s,e,t),av(s,e),s.sharedClientState.updateMutationState(e,"rejected",t),await Za(s,o)}catch(o){await Ka(o)}}function av(r,e){(r.ka.get(e)||[]).forEach(t=>{t.resolve()}),r.ka.delete(e)}function lv(r,e,t){const s=Ie(r);let o=s.Ba[s.currentUser.toKey()];if(o){const l=o.get(e);l&&(t?l.reject(t):l.resolve(),o=o.remove(e)),s.Ba[s.currentUser.toKey()]=o}}function kd(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const s of r.Ma.get(e))r.Fa.delete(s),t&&r.Ca.$a(s,t);r.Ma.delete(e),r.isPrimaryClient&&r.La.gr(e).forEach(s=>{r.La.containsKey(s)||uv(r,s)})}function uv(r,e){r.xa.delete(e.path.canonicalString());const t=r.Oa.get(e);t!==null&&(rf(r.remoteStore,t),r.Oa=r.Oa.remove(e),r.Na.delete(t),hf(r))}function qg(r,e,t){for(const s of t)s instanceof rv?(r.La.addReference(s.key,e),pk(r,s)):s instanceof iv?(le("SyncEngine","Document no longer in limbo: "+s.key),r.La.removeReference(s.key,e),r.La.containsKey(s.key)||uv(r,s.key)):Ee()}function pk(r,e){const t=e.key,s=t.path.canonicalString();r.Oa.get(t)||r.xa.has(s)||(le("SyncEngine","New document in limbo: "+t),r.xa.add(s),hf(r))}function hf(r){for(;r.xa.size>0&&r.Oa.size<r.maxConcurrentLimboResolutions;){const e=r.xa.values().next().value;r.xa.delete(e);const t=new me(Ye.fromString(e)),s=r.qa.next();r.Na.set(s,new rk(t)),r.Oa=r.Oa.insert(t,s),X_(r.remoteStore,new Ai(dr(Qd(t.path)),s,"TargetPurposeLimboResolution",$d.oe))}}async function Za(r,e,t){const s=Ie(r),o=[],l=[],h=[];s.Fa.isEmpty()||(s.Fa.forEach((p,g)=>{h.push(s.Ka(g,e,t).then(_=>{var E;if((_||t)&&s.isPrimaryClient){const R=_?!_.fromCache:(E=t?.targetChanges.get(g.targetId))===null||E===void 0?void 0:E.current;s.sharedClientState.updateQueryState(g.targetId,R?"current":"not-current")}if(_){o.push(_);const R=nf.Wi(g.targetId,_);l.push(R)}}))}),await Promise.all(h),s.Ca.d_(o),await async function(g,_){const E=Ie(g);try{await E.persistence.runTransaction("notifyLocalViewChanges","readwrite",R=>G.forEach(_,O=>G.forEach(O.$i,j=>E.persistence.referenceDelegate.addReference(R,O.targetId,j)).next(()=>G.forEach(O.Ui,j=>E.persistence.referenceDelegate.removeReference(R,O.targetId,j)))))}catch(R){if(!Ga(R))throw R;le("LocalStore","Failed to update sequence numbers: "+R)}for(const R of _){const O=R.targetId;if(!R.fromCache){const j=E.os.get(O),q=j.snapshotVersion,Q=j.withLastLimboFreeSnapshotVersion(q);E.os=E.os.insert(O,Q)}}}(s.localStore,l))}async function mk(r,e){const t=Ie(r);if(!t.currentUser.isEqual(e)){le("SyncEngine","User change. New user:",e.toKey());const s=await K_(t.localStore,e);t.currentUser=e,function(l,h){l.ka.forEach(p=>{p.forEach(g=>{g.reject(new oe(W.CANCELLED,h))})}),l.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await Za(t,s.hs)}}function gk(r,e){const t=Ie(r),s=t.Na.get(e);if(s&&s.va)return Ce().add(s.key);{let o=Ce();const l=t.Ma.get(e);if(!l)return o;for(const h of l){const p=t.Fa.get(h);o=o.unionWith(p.view.Va)}return o}}function cv(r){const e=Ie(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=ov.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=gk.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=hk.bind(null,e),e.Ca.d_=JA.bind(null,e.eventManager),e.Ca.$a=ZA.bind(null,e.eventManager),e}function yk(r){const e=Ie(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=dk.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=fk.bind(null,e),e}class Ku{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=lc(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return wA(this.persistence,new _A,e.initialUser,this.serializer)}Ga(e){return new mA(tf.Zr,this.serializer)}Wa(e){return new RA}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ku.provider={build:()=>new Ku};class Rd{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>Wg(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=mk.bind(null,this.syncEngine),await KA(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new QA}()}createDatastore(e){const t=lc(e.databaseInfo.databaseId),s=function(l){return new NA(l)}(e.databaseInfo);return function(l,h,p,g){return new VA(l,h,p,g)}(e.authCredentials,e.appCheckCredentials,s,t)}createRemoteStore(e){return function(s,o,l,h,p){return new LA(s,o,l,h,p)}(this.localStore,this.datastore,e.asyncQueue,t=>Wg(this.syncEngine,t,0),function(){return Ug.D()?new Ug:new CA}())}createSyncEngine(e,t){return function(o,l,h,p,g,_,E){const R=new ik(o,l,h,p,g,_);return E&&(R.Qa=!0),R}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(o){const l=Ie(o);le("RemoteStore","RemoteStore shutting down."),l.L_.add(5),await Ja(l),l.k_.shutdown(),l.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Rd.provider={build:()=>new Rd};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _k{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):$r("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vk{constructor(e,t,s,o,l){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=s,this.databaseInfo=o,this.user=zt.UNAUTHENTICATED,this.clientId=f_.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=l,this.authCredentials.start(s,async h=>{le("FirestoreClient","Received user=",h.uid),await this.authCredentialListener(h),this.user=h}),this.appCheckCredentials.start(s,h=>(le("FirestoreClient","Received new app check token=",h),this.appCheckCredentialListener(h,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new us;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const s=uf(t,"Failed to shutdown persistence");e.reject(s)}}),e.promise}}async function nd(r,e){r.asyncQueue.verifyOperationInProgress(),le("FirestoreClient","Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let s=t.initialUser;r.setCredentialChangeListener(async o=>{s.isEqual(o)||(await K_(e.localStore,o),s=o)}),e.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=e}async function Hg(r,e){r.asyncQueue.verifyOperationInProgress();const t=await wk(r);le("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener(s=>jg(e.remoteStore,s)),r.setAppCheckTokenChangeListener((s,o)=>jg(e.remoteStore,o)),r._onlineComponents=e}async function wk(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){le("FirestoreClient","Using user provided OfflineComponentProvider");try{await nd(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(o){return o.name==="FirebaseError"?o.code===W.FAILED_PRECONDITION||o.code===W.UNIMPLEMENTED:!(typeof DOMException<"u"&&o instanceof DOMException)||o.code===22||o.code===20||o.code===11}(t))throw t;To("Error using user provided cache. Falling back to memory cache: "+t),await nd(r,new Ku)}}else le("FirestoreClient","Using default OfflineComponentProvider"),await nd(r,new Ku);return r._offlineComponents}async function hv(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(le("FirestoreClient","Using user provided OnlineComponentProvider"),await Hg(r,r._uninitializedComponentsProvider._online)):(le("FirestoreClient","Using default OnlineComponentProvider"),await Hg(r,new Rd))),r._onlineComponents}function Ek(r){return hv(r).then(e=>e.syncEngine)}async function Kg(r){const e=await hv(r),t=e.eventManager;return t.onListen=sk.bind(null,e.syncEngine),t.onUnlisten=lk.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=ok.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=uk.bind(null,e.syncEngine),t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dv(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gg=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fv(r,e,t){if(!t)throw new oe(W.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function Tk(r,e,t,s){if(e===!0&&s===!0)throw new oe(W.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function Qg(r){if(!me.isDocumentKey(r))throw new oe(W.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Yg(r){if(me.isDocumentKey(r))throw new oe(W.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function hc(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=function(s){return s.constructor?s.constructor.name:null}(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":Ee()}function cs(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new oe(W.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=hc(r);throw new oe(W.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xg{constructor(e){var t,s;if(e.host===void 0){if(e.ssl!==void 0)throw new oe(W.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new oe(W.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Tk("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=dv((s=e.experimentalLongPollingOptions)!==null&&s!==void 0?s:{}),function(l){if(l.timeoutSeconds!==void 0){if(isNaN(l.timeoutSeconds))throw new oe(W.INVALID_ARGUMENT,`invalid long polling timeout: ${l.timeoutSeconds} (must not be NaN)`);if(l.timeoutSeconds<5)throw new oe(W.INVALID_ARGUMENT,`invalid long polling timeout: ${l.timeoutSeconds} (minimum allowed value is 5)`);if(l.timeoutSeconds>30)throw new oe(W.INVALID_ARGUMENT,`invalid long polling timeout: ${l.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,o){return s.timeoutSeconds===o.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class dc{constructor(e,t,s,o){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=s,this._app=o,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Xg({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new oe(W.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new oe(W.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Xg(e),e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new FI;switch(s.type){case"firstParty":return new BI(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new oe(W.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const s=Gg.get(t);s&&(le("ComponentProvider","Removing Datastore"),Gg.delete(t),s.terminate())}(this),Promise.resolve()}}function Ik(r,e,t,s={}){var o;const l=(r=cs(r,dc))._getSettings(),h=`${e}:${t}`;if(l.host!=="firestore.googleapis.com"&&l.host!==h&&To("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),r._setSettings(Object.assign(Object.assign({},l),{host:h,ssl:!1})),s.mockUserToken){let p,g;if(typeof s.mockUserToken=="string")p=s.mockUserToken,g=zt.MOCK_USER;else{p=vy(s.mockUserToken,(o=r._app)===null||o===void 0?void 0:o.options.projectId);const _=s.mockUserToken.sub||s.mockUserToken.user_id;if(!_)throw new oe(W.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");g=new zt(_)}r._authCredentials=new UI(new d_(p,g))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo{constructor(e,t,s){this.converter=t,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new Oo(this.firestore,e,this._query)}}class on{constructor(e,t,s){this.converter=t,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ci(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new on(this.firestore,e,this._key)}}class Ci extends Oo{constructor(e,t,s){super(e,t,Qd(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new on(this.firestore,null,new me(e))}withConverter(e){return new Ci(this.firestore,e,this._path)}}function Jg(r,e,...t){if(r=yt(r),fv("collection","path",e),r instanceof dc){const s=Ye.fromString(e,...t);return Yg(s),new Ci(r,null,s)}{if(!(r instanceof on||r instanceof Ci))throw new oe(W.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=r._path.child(Ye.fromString(e,...t));return Yg(s),new Ci(r.firestore,null,s)}}function xu(r,e,...t){if(r=yt(r),arguments.length===1&&(e=f_.newId()),fv("doc","path",e),r instanceof dc){const s=Ye.fromString(e,...t);return Qg(s),new on(r,null,new me(s))}{if(!(r instanceof on||r instanceof Ci))throw new oe(W.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=r._path.child(Ye.fromString(e,...t));return Qg(s),new on(r.firestore,r instanceof Ci?r.converter:null,new me(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Q_(this,"async_queue_retry"),this.Vu=()=>{const s=td();s&&le("AsyncQueue","Visibility state changed to "+s.visibilityState),this.t_.jo()},this.mu=e;const t=td();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=td();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new us;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Ga(e))throw e;le("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(s=>{this.Eu=s,this.du=!1;const o=function(h){let p=h.message||"";return h.stack&&(p=h.stack.includes(h.message)?h.stack:h.message+`
`+h.stack),p}(s);throw $r("INTERNAL UNHANDLED ERROR: ",o),s}).then(s=>(this.du=!1,s))));return this.mu=t,t}enqueueAfterDelay(e,t,s){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const o=lf.createAndSchedule(this,e,t,s,l=>this.yu(l));return this.Tu.push(o),o}fu(){this.Eu&&Ee()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,s)=>t.targetTimeMs-s.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function ey(r){return function(t,s){if(typeof t!="object"||t===null)return!1;const o=t;for(const l of s)if(l in o&&typeof o[l]=="function")return!0;return!1}(r,["next","error","complete"])}class ja extends dc{constructor(e,t,s,o){super(e,t,s,o),this.type="firestore",this._queue=new Zg,this._persistenceKey=o?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Zg(e),this._firestoreClient=void 0,await e}}}function Sk(r,e){const t=typeof r=="object"?r:Dd(),s=typeof r=="string"?r:"(default)",o=Ju(t,"firestore").getImmediate({identifier:s});if(!o._initialized){const l=gy("firestore");l&&Ik(o,...l)}return o}function pv(r){if(r._terminated)throw new oe(W.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||Ak(r),r._firestoreClient}function Ak(r){var e,t,s;const o=r._freezeSettings(),l=function(p,g,_,E){return new tS(p,g,_,E.host,E.ssl,E.experimentalForceLongPolling,E.experimentalAutoDetectLongPolling,dv(E.experimentalLongPollingOptions),E.useFetchStreams)}(r._databaseId,((e=r._app)===null||e===void 0?void 0:e.options.appId)||"",r._persistenceKey,o);r._componentsProvider||!((t=o.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((s=o.localCache)===null||s===void 0)&&s._onlineComponentProvider)&&(r._componentsProvider={_offline:o.localCache._offlineComponentProvider,_online:o.localCache._onlineComponentProvider}),r._firestoreClient=new vk(r._authCredentials,r._appCheckCredentials,r._queue,l,r._componentsProvider&&function(p){const g=p?._online.build();return{_offline:p?._offline.build(g),_online:g}}(r._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Co{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Co(Vt.fromBase64String(e))}catch(t){throw new oe(W.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Co(Vt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new oe(W.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Dt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class df{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ff{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new oe(W.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new oe(W.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Ue(this._lat,e._lat)||Ue(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pf{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(s,o){if(s.length!==o.length)return!1;for(let l=0;l<s.length;++l)if(s[l]!==o[l])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kk=/^__.*__$/;class Rk{constructor(e,t,s){this.data=e,this.fieldMask=t,this.fieldTransforms=s}toMutation(e,t){return this.fieldMask!==null?new bi(e,this.data,this.fieldMask,t,this.fieldTransforms):new Ya(e,this.data,t,this.fieldTransforms)}}class mv{constructor(e,t,s){this.data=e,this.fieldMask=t,this.fieldTransforms=s}toMutation(e,t){return new bi(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function gv(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Ee()}}class mf{constructor(e,t,s,o,l,h){this.settings=e,this.databaseId=t,this.serializer=s,this.ignoreUndefinedProperties=o,l===void 0&&this.vu(),this.fieldTransforms=l||[],this.fieldMask=h||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new mf(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const s=(t=this.path)===null||t===void 0?void 0:t.child(e),o=this.Fu({path:s,xu:!1});return o.Ou(e),o}Nu(e){var t;const s=(t=this.path)===null||t===void 0?void 0:t.child(e),o=this.Fu({path:s,xu:!1});return o.vu(),o}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Gu(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(gv(this.Cu)&&kk.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class Ck{constructor(e,t,s){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=s||lc(e)}Qu(e,t,s,o=!1){return new mf({Cu:e,methodName:t,qu:s,path:Dt.emptyPath(),xu:!1,ku:o},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function gf(r){const e=r._freezeSettings(),t=lc(r._databaseId);return new Ck(r._databaseId,!!e.ignoreUndefinedProperties,t)}function Pk(r,e,t,s,o,l={}){const h=r.Qu(l.merge||l.mergeFields?2:0,e,t,o);yf("Data must be an object, but it was:",h,s);const p=yv(s,h);let g,_;if(l.merge)g=new mn(h.fieldMask),_=h.fieldTransforms;else if(l.mergeFields){const E=[];for(const R of l.mergeFields){const O=Cd(e,R,t);if(!h.contains(O))throw new oe(W.INVALID_ARGUMENT,`Field '${O}' is specified in your field mask but missing from your input data.`);vv(E,O)||E.push(O)}g=new mn(E),_=h.fieldTransforms.filter(R=>g.covers(R.field))}else g=null,_=h.fieldTransforms;return new Rk(new sn(p),g,_)}class pc extends df{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof pc}}function xk(r,e,t,s){const o=r.Qu(1,e,t);yf("Data must be an object, but it was:",o,s);const l=[],h=sn.empty();vs(s,(g,_)=>{const E=_f(e,g,t);_=yt(_);const R=o.Nu(E);if(_ instanceof pc)l.push(E);else{const O=el(_,R);O!=null&&(l.push(E),h.set(E,O))}});const p=new mn(l);return new mv(h,p,o.fieldTransforms)}function Nk(r,e,t,s,o,l){const h=r.Qu(1,e,t),p=[Cd(e,s,t)],g=[o];if(l.length%2!=0)throw new oe(W.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let O=0;O<l.length;O+=2)p.push(Cd(e,l[O])),g.push(l[O+1]);const _=[],E=sn.empty();for(let O=p.length-1;O>=0;--O)if(!vv(_,p[O])){const j=p[O];let q=g[O];q=yt(q);const Q=h.Nu(j);if(q instanceof pc)_.push(j);else{const B=el(q,Q);B!=null&&(_.push(j),E.set(j,B))}}const R=new mn(_);return new mv(E,R,h.fieldTransforms)}function Dk(r,e,t,s=!1){return el(t,r.Qu(s?4:3,e))}function el(r,e){if(_v(r=yt(r)))return yf("Unsupported field value:",e,r),yv(r,e);if(r instanceof df)return function(s,o){if(!gv(o.Cu))throw o.Bu(`${s._methodName}() can only be used with update() and set()`);if(!o.path)throw o.Bu(`${s._methodName}() is not currently supported inside arrays`);const l=s._toFieldTransform(o);l&&o.fieldTransforms.push(l)}(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(s,o){const l=[];let h=0;for(const p of s){let g=el(p,o.Lu(h));g==null&&(g={nullValue:"NULL_VALUE"}),l.push(g),h++}return{arrayValue:{values:l}}}(r,e)}return function(s,o){if((s=yt(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return IS(o.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const l=gt.fromDate(s);return{timestampValue:qu(o.serializer,l)}}if(s instanceof gt){const l=new gt(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:qu(o.serializer,l)}}if(s instanceof ff)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof Co)return{bytesValue:j_(o.serializer,s._byteString)};if(s instanceof on){const l=o.databaseId,h=s.firestore._databaseId;if(!h.isEqual(l))throw o.Bu(`Document reference is for database ${h.projectId}/${h.database} but should be for database ${l.projectId}/${l.database}`);return{referenceValue:Zd(s.firestore._databaseId||o.databaseId,s._key.path)}}if(s instanceof pf)return function(h,p){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:h.toArray().map(g=>{if(typeof g!="number")throw p.Bu("VectorValues must only contain numeric values.");return Yd(p.serializer,g)})}}}}}}(s,o);throw o.Bu(`Unsupported field value: ${hc(s)}`)}(r,e)}function yv(r,e){const t={};return p_(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):vs(r,(s,o)=>{const l=el(o,e.Mu(s));l!=null&&(t[s]=l)}),{mapValue:{fields:t}}}function _v(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof gt||r instanceof ff||r instanceof Co||r instanceof on||r instanceof df||r instanceof pf)}function yf(r,e,t){if(!_v(t)||!function(o){return typeof o=="object"&&o!==null&&(Object.getPrototypeOf(o)===Object.prototype||Object.getPrototypeOf(o)===null)}(t)){const s=hc(t);throw s==="an object"?e.Bu(r+" a custom object"):e.Bu(r+" "+s)}}function Cd(r,e,t){if((e=yt(e))instanceof fc)return e._internalPath;if(typeof e=="string")return _f(r,e);throw Gu("Field path arguments must be of type string or ",r,!1,void 0,t)}const Ok=new RegExp("[~\\*/\\[\\]]");function _f(r,e,t){if(e.search(Ok)>=0)throw Gu(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new fc(...e.split("."))._internalPath}catch{throw Gu(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function Gu(r,e,t,s,o){const l=s&&!s.isEmpty(),h=o!==void 0;let p=`Function ${e}() called with invalid data`;t&&(p+=" (via `toFirestore()`)"),p+=". ";let g="";return(l||h)&&(g+=" (found",l&&(g+=` in field ${s}`),h&&(g+=` in document ${o}`),g+=")"),new oe(W.INVALID_ARGUMENT,p+r+g)}function vv(r,e){return r.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wv{constructor(e,t,s,o,l){this._firestore=e,this._userDataWriter=t,this._key=s,this._document=o,this._converter=l}get id(){return this._key.path.lastSegment()}get ref(){return new on(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Vk(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Ev("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Vk extends wv{data(){return super.data()}}function Ev(r,e){return typeof e=="string"?_f(r,e):e instanceof fc?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bk(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new oe(W.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class vf{}class Lk extends vf{}function Mk(r,e,...t){let s=[];e instanceof vf&&s.push(e),s=s.concat(t),function(l){const h=l.filter(g=>g instanceof Ef).length,p=l.filter(g=>g instanceof wf).length;if(h>1||h>0&&p>0)throw new oe(W.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(s);for(const o of s)r=o._apply(r);return r}class wf extends Lk{constructor(e,t,s){super(),this._field=e,this._op=t,this._value=s,this.type="where"}static _create(e,t,s){return new wf(e,t,s)}_apply(e){const t=this._parse(e);return Tv(e._query,t),new Oo(e.firestore,e.converter,_d(e._query,t))}_parse(e){const t=gf(e.firestore);return function(l,h,p,g,_,E,R){let O;if(_.isKeyField()){if(E==="array-contains"||E==="array-contains-any")throw new oe(W.INVALID_ARGUMENT,`Invalid Query. You can't perform '${E}' queries on documentId().`);if(E==="in"||E==="not-in"){ny(R,E);const j=[];for(const q of R)j.push(ty(g,l,q));O={arrayValue:{values:j}}}else O=ty(g,l,R)}else E!=="in"&&E!=="not-in"&&E!=="array-contains-any"||ny(R,E),O=Dk(p,h,R,E==="in"||E==="not-in");return dt.create(_,E,O)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class Ef extends vf{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Ef(e,t)}_parse(e){const t=this._queryConstraints.map(s=>s._parse(e)).filter(s=>s.getFilters().length>0);return t.length===1?t[0]:Gn.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(o,l){let h=o;const p=l.getFlattenedFilters();for(const g of p)Tv(h,g),h=_d(h,g)}(e._query,t),new Oo(e.firestore,e.converter,_d(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function ty(r,e,t){if(typeof(t=yt(t))=="string"){if(t==="")throw new oe(W.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!I_(e)&&t.indexOf("/")!==-1)throw new oe(W.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const s=e.path.child(Ye.fromString(t));if(!me.isDocumentKey(s))throw new oe(W.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);return wg(r,new me(s))}if(t instanceof on)return wg(r,t._key);throw new oe(W.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${hc(t)}.`)}function ny(r,e){if(!Array.isArray(r)||r.length===0)throw new oe(W.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Tv(r,e){const t=function(o,l){for(const h of o)for(const p of h.getFlattenedFilters())if(l.indexOf(p.op)>=0)return p.op;return null}(r.filters,function(o){switch(o){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new oe(W.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new oe(W.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class Fk{convertValue(e,t="none"){switch(gs(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ot(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(ms(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw Ee()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const s={};return vs(e,(o,l)=>{s[o]=this.convertValue(l,t)}),s}convertVectorValue(e){var t,s,o;const l=(o=(s=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||s===void 0?void 0:s.values)===null||o===void 0?void 0:o.map(h=>ot(h.doubleValue));return new pf(l)}convertGeoPoint(e){return new ff(ot(e.latitude),ot(e.longitude))}convertArray(e,t){return(e.values||[]).map(s=>this.convertValue(s,t))}convertServerTimestamp(e,t){switch(t){case"previous":const s=qd(e);return s==null?null:this.convertValue(s,t);case"estimate":return this.convertTimestamp(ba(e));default:return null}}convertTimestamp(e){const t=Ni(e);return new gt(t.seconds,t.nanos)}convertDocumentKey(e,t){const s=Ye.fromString(e);Be(H_(s));const o=new La(s.get(1),s.get(3)),l=new me(s.popFirst(5));return o.isEqual(t)||$r(`Document ${l} contains a document reference within a different database (${o.projectId}/${o.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uk(r,e,t){let s;return s=r?r.toFirestore(e):e,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aa{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Iv extends wv{constructor(e,t,s,o,l,h){super(e,t,s,o,h),this._firestore=e,this._firestoreImpl=e,this.metadata=l}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Nu(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const s=this._document.data.field(Ev("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,t.serverTimestamps)}}}class Nu extends Iv{data(e={}){return super.data(e)}}class jk{constructor(e,t,s,o){this._firestore=e,this._userDataWriter=t,this._snapshot=o,this.metadata=new Aa(o.hasPendingWrites,o.fromCache),this.query=s}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(s=>{e.call(t,new Nu(this._firestore,this._userDataWriter,s.key,s,new Aa(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new oe(W.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(o,l){if(o._snapshot.oldDocs.isEmpty()){let h=0;return o._snapshot.docChanges.map(p=>{const g=new Nu(o._firestore,o._userDataWriter,p.doc.key,p.doc,new Aa(o._snapshot.mutatedKeys.has(p.doc.key),o._snapshot.fromCache),o.query.converter);return p.doc,{type:"added",doc:g,oldIndex:-1,newIndex:h++}})}{let h=o._snapshot.oldDocs;return o._snapshot.docChanges.filter(p=>l||p.type!==3).map(p=>{const g=new Nu(o._firestore,o._userDataWriter,p.doc.key,p.doc,new Aa(o._snapshot.mutatedKeys.has(p.doc.key),o._snapshot.fromCache),o.query.converter);let _=-1,E=-1;return p.type!==0&&(_=h.indexOf(p.doc.key),h=h.delete(p.doc.key)),p.type!==1&&(h=h.add(p.doc),E=h.indexOf(p.doc.key)),{type:zk(p.type),doc:g,oldIndex:_,newIndex:E}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function zk(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Ee()}}class Sv extends Fk{constructor(e){super(),this.firestore=e}convertBytes(e){return new Co(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new on(this.firestore,null,t)}}function ry(r,e,t,...s){r=cs(r,on);const o=cs(r.firestore,ja),l=gf(o);let h;return h=typeof(e=yt(e))=="string"||e instanceof fc?Nk(l,"updateDoc",r._key,e,t,s):xk(l,"updateDoc",r._key,e),Av(o,[h.toMutation(r._key,fr.exists(!0))])}function Bk(r,e){const t=cs(r.firestore,ja),s=xu(r),o=Uk(r.converter,e);return Av(t,[Pk(gf(r.firestore),"addDoc",s._key,o,r.converter!==null,{}).toMutation(s._key,fr.exists(!1))]).then(()=>s)}function iy(r,...e){var t,s,o;r=yt(r);let l={includeMetadataChanges:!1,source:"default"},h=0;typeof e[h]!="object"||ey(e[h])||(l=e[h],h++);const p={includeMetadataChanges:l.includeMetadataChanges,source:l.source};if(ey(e[h])){const R=e[h];e[h]=(t=R.next)===null||t===void 0?void 0:t.bind(R),e[h+1]=(s=R.error)===null||s===void 0?void 0:s.bind(R),e[h+2]=(o=R.complete)===null||o===void 0?void 0:o.bind(R)}let g,_,E;if(r instanceof on)_=cs(r.firestore,ja),E=Qd(r._key.path),g={next:R=>{e[h]&&e[h]($k(_,r,R))},error:e[h+1],complete:e[h+2]};else{const R=cs(r,Oo);_=cs(R.firestore,ja),E=R._query;const O=new Sv(_);g={next:j=>{e[h]&&e[h](new jk(_,O,R,j))},error:e[h+1],complete:e[h+2]},bk(r._query)}return function(O,j,q,Q){const B=new _k(Q),ce=new ek(j,B,q);return O.asyncQueue.enqueueAndForget(async()=>YA(await Kg(O),ce)),()=>{B.Za(),O.asyncQueue.enqueueAndForget(async()=>XA(await Kg(O),ce))}}(pv(_),E,p,g)}function Av(r,e){return function(s,o){const l=new us;return s.asyncQueue.enqueueAndForget(async()=>ck(await Ek(s),o,l)),l.promise}(pv(r),e)}function $k(r,e,t){const s=t.docs.get(e._key),o=new Sv(r);return new Iv(r,o,e._key,s,new Aa(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(o){xo=o})(ys),hs(new Pi("firestore",(s,{instanceIdentifier:o,options:l})=>{const h=s.getProvider("app").getImmediate(),p=new ja(new jI(s.getProvider("auth-internal")),new WI(s.getProvider("app-check-internal")),function(_,E){if(!Object.prototype.hasOwnProperty.apply(_.options,["projectId"]))throw new oe(W.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new La(_.options.projectId,E)}(h,o),h);return l=Object.assign({useFetchStreams:t},l),p._setSettings(l),p},"PUBLIC").setMultipleInstances(!0)),ur(mg,"4.7.3",e),ur(mg,"4.7.3","esm2017")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kv="firebasestorage.googleapis.com",Wk="storageBucket",qk=2*60*1e3,Hk=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r extends yr{constructor(e,t,s=0){super(rd(e),`Firebase Storage: ${t} (${rd(e)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,_r.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return rd(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var gr;(function(r){r.UNKNOWN="unknown",r.OBJECT_NOT_FOUND="object-not-found",r.BUCKET_NOT_FOUND="bucket-not-found",r.PROJECT_NOT_FOUND="project-not-found",r.QUOTA_EXCEEDED="quota-exceeded",r.UNAUTHENTICATED="unauthenticated",r.UNAUTHORIZED="unauthorized",r.UNAUTHORIZED_APP="unauthorized-app",r.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",r.INVALID_CHECKSUM="invalid-checksum",r.CANCELED="canceled",r.INVALID_EVENT_NAME="invalid-event-name",r.INVALID_URL="invalid-url",r.INVALID_DEFAULT_BUCKET="invalid-default-bucket",r.NO_DEFAULT_BUCKET="no-default-bucket",r.CANNOT_SLICE_BLOB="cannot-slice-blob",r.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",r.NO_DOWNLOAD_URL="no-download-url",r.INVALID_ARGUMENT="invalid-argument",r.INVALID_ARGUMENT_COUNT="invalid-argument-count",r.APP_DELETED="app-deleted",r.INVALID_ROOT_OPERATION="invalid-root-operation",r.INVALID_FORMAT="invalid-format",r.INTERNAL_ERROR="internal-error",r.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(gr||(gr={}));function rd(r){return"storage/"+r}function Kk(){const r="An unknown error occurred, please check the error payload for server response.";return new _r(gr.UNKNOWN,r)}function Gk(){return new _r(gr.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Qk(){return new _r(gr.CANCELED,"User canceled the upload/download.")}function Yk(r){return new _r(gr.INVALID_URL,"Invalid URL '"+r+"'.")}function Xk(r){return new _r(gr.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+r+"'.")}function sy(r){return new _r(gr.INVALID_ARGUMENT,r)}function Rv(){return new _r(gr.APP_DELETED,"The Firebase app was deleted.")}function Jk(r){return new _r(gr.INVALID_ROOT_OPERATION,"The operation '"+r+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let s;try{s=Hn.makeFromUrl(e,t)}catch{return new Hn(e,"")}if(s.path==="")return s;throw Xk(e)}static makeFromUrl(e,t){let s=null;const o="([A-Za-z0-9.\\-_]+)";function l(fe){fe.path.charAt(fe.path.length-1)==="/"&&(fe.path_=fe.path_.slice(0,-1))}const h="(/(.*))?$",p=new RegExp("^gs://"+o+h,"i"),g={bucket:1,path:3};function _(fe){fe.path_=decodeURIComponent(fe.path)}const E="v[A-Za-z0-9_]+",R=t.replace(/[.]/g,"\\."),O="(/([^?#]*).*)?$",j=new RegExp(`^https?://${R}/${E}/b/${o}/o${O}`,"i"),q={bucket:1,path:3},Q=t===kv?"(?:storage.googleapis.com|storage.cloud.google.com)":t,B="([^?#]*)",ce=new RegExp(`^https?://${Q}/${o}/${B}`,"i"),de=[{regex:p,indices:g,postModify:l},{regex:j,indices:q,postModify:_},{regex:ce,indices:{bucket:1,path:2},postModify:_}];for(let fe=0;fe<de.length;fe++){const Re=de[fe],X=Re.regex.exec(e);if(X){const C=X[Re.indices.bucket];let T=X[Re.indices.path];T||(T=""),s=new Hn(C,T),Re.postModify(s);break}}if(s==null)throw Yk(e);return s}}class Zk{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eR(r,e,t){let s=1,o=null,l=null,h=!1,p=0;function g(){return p===2}let _=!1;function E(...B){_||(_=!0,e.apply(null,B))}function R(B){o=setTimeout(()=>{o=null,r(j,g())},B)}function O(){l&&clearTimeout(l)}function j(B,...ce){if(_){O();return}if(B){O(),E.call(null,B,...ce);return}if(g()||h){O(),E.call(null,B,...ce);return}s<64&&(s*=2);let de;p===1?(p=2,de=0):de=(s+Math.random())*1e3,R(de)}let q=!1;function Q(B){q||(q=!0,O(),!_&&(o!==null?(B||(p=2),clearTimeout(o),R(0)):B||(p=1)))}return R(0),l=setTimeout(()=>{h=!0,Q(!0)},t),Q}function tR(r){r(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nR(r){return r!==void 0}function oy(r,e,t,s){if(s<e)throw sy(`Invalid value for '${r}'. Expected ${e} or greater.`);if(s>t)throw sy(`Invalid value for '${r}'. Expected ${t} or less.`)}function rR(r){const e=encodeURIComponent;let t="?";for(const s in r)if(r.hasOwnProperty(s)){const o=e(s)+"="+e(r[s]);t=t+o+"&"}return t=t.slice(0,-1),t}var Qu;(function(r){r[r.NO_ERROR=0]="NO_ERROR",r[r.NETWORK_ERROR=1]="NETWORK_ERROR",r[r.ABORT=2]="ABORT"})(Qu||(Qu={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iR(r,e){const t=r>=500&&r<600,o=[408,429].indexOf(r)!==-1,l=e.indexOf(r)!==-1;return t||o||l}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sR{constructor(e,t,s,o,l,h,p,g,_,E,R,O=!0){this.url_=e,this.method_=t,this.headers_=s,this.body_=o,this.successCodes_=l,this.additionalRetryCodes_=h,this.callback_=p,this.errorCallback_=g,this.timeout_=_,this.progressCallback_=E,this.connectionFactory_=R,this.retry=O,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((j,q)=>{this.resolve_=j,this.reject_=q,this.start_()})}start_(){const e=(s,o)=>{if(o){s(!1,new Eu(!1,null,!0));return}const l=this.connectionFactory_();this.pendingConnection_=l;const h=p=>{const g=p.loaded,_=p.lengthComputable?p.total:-1;this.progressCallback_!==null&&this.progressCallback_(g,_)};this.progressCallback_!==null&&l.addUploadProgressListener(h),l.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&l.removeUploadProgressListener(h),this.pendingConnection_=null;const p=l.getErrorCode()===Qu.NO_ERROR,g=l.getStatus();if(!p||iR(g,this.additionalRetryCodes_)&&this.retry){const E=l.getErrorCode()===Qu.ABORT;s(!1,new Eu(!1,null,E));return}const _=this.successCodes_.indexOf(g)!==-1;s(!0,new Eu(_,l))})},t=(s,o)=>{const l=this.resolve_,h=this.reject_,p=o.connection;if(o.wasSuccessCode)try{const g=this.callback_(p,p.getResponse());nR(g)?l(g):l()}catch(g){h(g)}else if(p!==null){const g=Kk();g.serverResponse=p.getErrorText(),this.errorCallback_?h(this.errorCallback_(p,g)):h(g)}else if(o.canceled){const g=this.appDelete_?Rv():Qk();h(g)}else{const g=Gk();h(g)}};this.canceled_?t(!1,new Eu(!1,null,!0)):this.backoffId_=eR(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&tR(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Eu{constructor(e,t,s){this.wasSuccessCode=e,this.connection=t,this.canceled=!!s}}function oR(r,e){e!==null&&e.length>0&&(r.Authorization="Firebase "+e)}function aR(r,e){r["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function lR(r,e){e&&(r["X-Firebase-GMPID"]=e)}function uR(r,e){e!==null&&(r["X-Firebase-AppCheck"]=e)}function cR(r,e,t,s,o,l,h=!0){const p=rR(r.urlParams),g=r.url+p,_=Object.assign({},r.headers);return lR(_,e),oR(_,t),aR(_,l),uR(_,s),new sR(g,r.method,_,r.body,r.successCodes,r.additionalRetryCodes,r.handler,r.errorHandler,r.timeout,r.progressCallback,o,h)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hR(r){if(r.length===0)return null;const e=r.lastIndexOf("/");return e===-1?"":r.slice(0,e)}function dR(r){const e=r.lastIndexOf("/",r.length-2);return e===-1?r:r.slice(e+1)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yu{constructor(e,t){this._service=e,t instanceof Hn?this._location=t:this._location=Hn.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Yu(e,t)}get root(){const e=new Hn(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return dR(this._location.path)}get storage(){return this._service}get parent(){const e=hR(this._location.path);if(e===null)return null;const t=new Hn(this._location.bucket,e);return new Yu(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw Jk(e)}}function ay(r,e){const t=e?.[Wk];return t==null?null:Hn.makeFromBucketSpec(t,r)}function fR(r,e,t,s={}){r.host=`${e}:${t}`,r._protocol="http";const{mockUserToken:o}=s;o&&(r._overrideAuthToken=typeof o=="string"?o:vy(o,r.app.options.projectId))}class pR{constructor(e,t,s,o,l){this.app=e,this._authProvider=t,this._appCheckProvider=s,this._url=o,this._firebaseVersion=l,this._bucket=null,this._host=kv,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=qk,this._maxUploadRetryTime=Hk,this._requests=new Set,o!=null?this._bucket=Hn.makeFromBucketSpec(o,this._host):this._bucket=ay(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Hn.makeFromBucketSpec(this._url,e):this._bucket=ay(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){oy("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){oy("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Yu(this,e)}_makeRequest(e,t,s,o,l=!0){if(this._deleted)return new Zk(Rv());{const h=cR(e,this._appId,s,o,t,this._firebaseVersion,l);return this._requests.add(h),h.getPromise().then(()=>this._requests.delete(h),()=>this._requests.delete(h)),h}}async makeRequestWithTokens(e,t){const[s,o]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,s,o).getPromise()}}const ly="@firebase/storage",uy="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cv="storage";function mR(r=Dd(),e){r=yt(r);const s=Ju(r,Cv).getImmediate({identifier:e}),o=gy("storage");return o&&gR(s,...o),s}function gR(r,e,t,s={}){fR(r,e,t,s)}function yR(r,{instanceIdentifier:e}){const t=r.getProvider("app").getImmediate(),s=r.getProvider("auth-internal"),o=r.getProvider("app-check-internal");return new pR(t,s,o,e,ys)}function _R(){hs(new Pi(Cv,yR,"PUBLIC").setMultipleInstances(!0)),ur(ly,uy,""),ur(ly,uy,"esm2017")}_R();/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vR=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Pv=(...r)=>r.filter((e,t,s)=>!!e&&s.indexOf(e)===t).join(" ");/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var wR={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ER=te.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:s,className:o="",children:l,iconNode:h,...p},g)=>te.createElement("svg",{ref:g,...wR,width:e,height:e,stroke:r,strokeWidth:s?Number(t)*24/Number(e):t,className:Pv("lucide",o),...p},[...h.map(([_,E])=>te.createElement(_,E)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const St=(r,e)=>{const t=te.forwardRef(({className:s,...o},l)=>te.createElement(ER,{ref:l,iconNode:e,className:Pv(`lucide-${vR(r)}`,s),...o}));return t.displayName=`${r}`,t};/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TR=St("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IR=St("BarChart2",[["line",{x1:"18",x2:"18",y1:"20",y2:"10",key:"1xfpm4"}],["line",{x1:"12",x2:"12",y1:"20",y2:"4",key:"be30l9"}],["line",{x1:"6",x2:"6",y1:"20",y2:"14",key:"1r4le6"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SR=St("Briefcase",[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AR=St("Building",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2",key:"76otgf"}],["path",{d:"M9 22v-4h6v4",key:"r93iot"}],["path",{d:"M8 6h.01",key:"1dz90k"}],["path",{d:"M16 6h.01",key:"1x0f13"}],["path",{d:"M12 6h.01",key:"1vi96p"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M8 14h.01",key:"6423bh"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xv=St("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kR=St("CirclePlus",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nv=St("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RR=St("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CR=St("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PR=St("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xR=St("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NR=St("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DR=St("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OR=St("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VR=St("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bR=St("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tf=St("Wrench",[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",key:"cbrjhi"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dv=St("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),LR=({setUserId:r})=>{const[e,t]=te.useState(!0),[s,o]=te.useState(""),[l,h]=te.useState(""),[p,g]=te.useState(""),[_,E]=te.useState(!1),R=s_(),O=async j=>{j.preventDefault(),g(""),E(!0);try{e?await IT(R,s,l):await TT(R,s,l)}catch(q){g(q.message)}finally{E(!1)}};return x.jsx("div",{className:"min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col justify-center items-center p-4",children:x.jsxs("div",{className:"w-full max-w-md",children:[x.jsxs("div",{className:"text-center mb-8",children:[x.jsx(Nv,{className:"mx-auto h-12 w-auto text-cyan-500"}),x.jsx("h2",{className:"mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white",children:e?"Sign in to your account":"Create a new account"})]}),x.jsxs("div",{className:"bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8",children:[x.jsxs("form",{className:"space-y-6",onSubmit:O,children:[x.jsxs("div",{children:[x.jsx("label",{htmlFor:"email",className:"block text-sm font-medium text-slate-700 dark:text-slate-300",children:"Email address"}),x.jsx("div",{className:"mt-1",children:x.jsx("input",{id:"email",name:"email",type:"email",autoComplete:"email",required:!0,value:s,onChange:j=>o(j.target.value),className:"block w-full appearance-none rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"})})]}),x.jsxs("div",{children:[x.jsx("label",{htmlFor:"password",className:"block text-sm font-medium text-slate-700 dark:text-slate-300",children:"Password"}),x.jsx("div",{className:"mt-1",children:x.jsx("input",{id:"password",name:"password",type:"password",autoComplete:"current-password",required:!0,value:l,onChange:j=>h(j.target.value),className:"block w-full appearance-none rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"})})]}),p&&x.jsx("div",{className:"rounded-md bg-red-50 p-4",children:x.jsx("p",{className:"text-sm text-red-700",children:p})}),x.jsx("div",{children:x.jsx("button",{type:"submit",disabled:_,className:"flex w-full justify-center rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:bg-slate-400",children:_?"Processing...":e?"Sign in":"Create account"})})]}),x.jsx("div",{className:"mt-6",children:x.jsxs("p",{className:"text-center text-sm text-slate-500 dark:text-slate-400",children:[e?"Don't have an account?":"Already have an account?",x.jsx("button",{onClick:()=>t(!e),className:"font-medium text-cyan-600 hover:text-cyan-500 ml-1",children:e?"Sign up":"Sign in"})]})})]})]})})},MR=({currentView:r,setCurrentView:e,onAddOrderClick:t})=>x.jsx("header",{className:"bg-white shadow-sm sticky top-0 z-10",children:x.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4",children:x.jsxs("div",{className:"flex items-center justify-between",children:[x.jsxs("div",{className:"flex items-center space-x-3",children:[r!=="dashboard"?x.jsx("button",{onClick:()=>e("dashboard"),className:"p-2 rounded-full hover:bg-gray-100",children:x.jsx(TR,{size:24})}):x.jsx(Tf,{className:"h-8 w-8 text-blue-600"}),x.jsx("h1",{className:"text-2xl font-bold text-gray-800",children:"HVAC Dispatch"})]}),x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsxs("button",{onClick:()=>e("billing"),className:"flex items-center gap-2 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors",children:[x.jsx(RR,{size:20})," Billing"]}),x.jsxs("button",{onClick:()=>e("reporting"),className:"flex items-center gap-2 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors",children:[x.jsx(IR,{size:20})," Reporting"]}),x.jsxs("button",{onClick:()=>e("route"),className:"flex items-center gap-2 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors",children:[x.jsx(PR,{size:20})," Route"]}),x.jsxs("button",{onClick:()=>e("dispatch"),className:"flex items-center gap-2 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors",children:[x.jsx(xv,{size:20})," Dispatch"]}),x.jsxs("button",{onClick:()=>e("customers"),className:"flex items-center gap-2 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors",children:[x.jsx(bR,{size:20})," Customers"]}),x.jsxs("button",{onClick:()=>e("technicians"),className:"flex items-center gap-2 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors",children:[x.jsx(VR,{size:20})," Technicians"]}),x.jsxs("button",{onClick:t,className:"flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors",children:[x.jsx(kR,{size:20})," Add Work Order"]})]})]})})}),Ov=r=>r&&typeof r=="number"?new Date(Math.round((r-25569)*86400*1e3)):null,Vv=r=>r?r.getTime()/864e5+25569:null,FR=r=>{const e=Ov(r);return e?e.toISOString().split("T")[0]:""},UR=r=>r?Vv(new Date(r+"T00:00:00")):null,jR=r=>r?new Date(r).toLocaleString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit",hour12:!0}):"",zR=r=>r==null?"N/A":new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(r),BR=r=>{const e=Ov(r);return e?e.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):null},$R=r=>({emergency:"bg-red-100 text-red-800 border-red-500",urgent:"bg-orange-100 text-orange-800 border-orange-500",regular:"bg-blue-100 text-blue-800 border-blue-500",low:"bg-gray-100 text-gray-800 border-gray-500"})[r?.toLowerCase()]||"bg-gray-100 text-gray-800 border-gray-500",WR=({order:r,onClose:e,onUpdate:t,onAddNote:s,technicians:o})=>{if(!r)return null;const[l,h]=te.useState(r["Order Status"]),[p,g]=te.useState(r.technician||[]),[_,E]=te.useState(FR(r["Schedule Date"])),[R,O]=te.useState(r.startTime||""),[j,q]=te.useState(r.endTime||""),[Q,B]=te.useState(""),[ce,_e]=te.useState(r.clientWO||""),de=X=>{const C=p.includes(X)?p.filter(T=>T!==X):[...p,X];g(C)},fe=()=>{const X={};l!==r["Order Status"]&&(X["Order Status"]=l,l==="Completed"&&!r["Completed Date"]&&(X["Completed Date"]=Vv(new Date))),JSON.stringify(p)!==JSON.stringify(r.technician)&&(X.technician=p);const C=UR(_);(C!==r["Schedule Date"]||R!==r.startTime||j!==r.endTime)&&(X["Schedule Date"]=C,X.startTime=R,X.endTime=j,l==="Open"&&_&&(X["Order Status"]="Scheduled")),ce!==r.clientWO&&(X.clientWO=ce),Object.keys(X).length>0&&t(r.id,X)},Re=[{label:"Work Order #",value:r["WO#"],icon:x.jsx(Tf,{})},{label:"Client WO#",value:r.clientWO,icon:x.jsx(SR,{})},{label:"Location",value:`${r.Company} (#${r["Loc #"]})`,icon:x.jsx(AR,{})},{label:"Address",value:`${r.City}, ${r.State}`,icon:x.jsx(CR,{})},{label:"Priority",value:r.Priority,icon:x.jsx(OR,{}),style:`${$R(r.Priority)} px-2 py-0.5 rounded-full text-xs font-semibold`},{label:"Task",value:r.Task},{label:"NTE Amount",value:zR(r.NTE)},{label:"Created Date",value:BR(r["Created Date"])}];return x.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4",children:x.jsxs("div",{className:"bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col",children:[x.jsxs("div",{className:"p-6 border-b flex justify-between items-center",children:[x.jsx("h2",{className:"text-2xl font-bold text-gray-800",children:"Work Order Details"}),x.jsx("button",{onClick:e,className:"text-gray-400 hover:text-gray-600",children:x.jsx(Dv,{size:28})})]}),x.jsxs("div",{className:"p-6 overflow-y-auto",children:[x.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4",children:Re.map(X=>x.jsxs("div",{className:"flex flex-col",children:[x.jsx("span",{className:"text-xs text-gray-500 font-medium",children:X.label}),x.jsxs("span",{className:`text-base text-gray-900 font-semibold flex items-center gap-2 mt-1 ${X.style||""}`,children:[X.icon&&x.jsx("span",{className:"text-gray-400",children:hy.cloneElement(X.icon,{size:16})}),x.jsx("span",{className:X.style||"",children:X.value})]})]},X.label))}),x.jsxs("div",{className:"mt-6 pt-6 border-t",children:[x.jsx("h3",{className:"text-lg font-semibold text-gray-700 mb-3",children:"Job Management"}),x.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[x.jsxs("div",{children:[x.jsx("label",{className:"text-sm font-medium text-gray-600 block mb-1",children:"Status"}),x.jsxs("select",{value:l,onChange:X=>h(X.target.value),className:"w-full p-2 border border-gray-300 rounded-lg",children:[x.jsx("option",{children:"Open"}),x.jsx("option",{children:"Scheduled"}),x.jsx("option",{children:"In Progress"}),x.jsx("option",{children:"On Hold"}),x.jsx("option",{children:"Completed"}),x.jsx("option",{children:"Cancelled"})]})]}),x.jsxs("div",{children:[x.jsx("label",{className:"text-sm font-medium text-gray-600 block mb-1",children:"Assigned Technicians"}),x.jsx("div",{className:"border p-2 rounded-lg max-h-24 overflow-y-auto",children:o.filter(X=>X.name!=="Unassigned").map(X=>x.jsxs("div",{className:"flex items-center",children:[x.jsx("input",{type:"checkbox",id:`tech-${X.id}`,checked:p.includes(X.name),onChange:()=>de(X.name),className:"mr-2"}),x.jsx("label",{htmlFor:`tech-${X.id}`,children:X.name})]},X.id))})]})]}),x.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 mt-4",children:[x.jsxs("div",{children:[x.jsx("label",{className:"text-sm font-medium text-gray-600 block mb-1",children:"Schedule Date"}),x.jsx("input",{type:"date",value:_,onChange:X=>E(X.target.value),className:"w-full p-2 border border-gray-300 rounded-lg"})]}),x.jsxs("div",{children:[x.jsx("label",{className:"text-sm font-medium text-gray-600 block mb-1",children:"Start Time"}),x.jsx("input",{type:"time",value:R,onChange:X=>O(X.target.value),className:"w-full p-2 border border-gray-300 rounded-lg"})]}),x.jsxs("div",{children:[x.jsx("label",{className:"text-sm font-medium text-gray-600 block mb-1",children:"End Time"}),x.jsx("input",{type:"time",value:j,onChange:X=>q(X.target.value),className:"w-full p-2 border border-gray-300 rounded-lg"})]})]}),x.jsxs("div",{className:"mt-4",children:[x.jsx("label",{className:"text-sm font-medium text-gray-600 block mb-1",children:"Client WO#"}),x.jsx("input",{type:"text",value:ce,onChange:X=>_e(X.target.value),className:"w-full p-2 border border-gray-300 rounded-lg"})]}),x.jsx("div",{className:"mt-4 flex justify-end",children:x.jsx("button",{onClick:fe,className:"bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700",children:"Save Changes"})})]}),x.jsxs("div",{className:"mt-6 pt-6 border-t",children:[x.jsxs("h3",{className:"text-lg font-semibold text-gray-700 mb-3 flex items-center",children:[x.jsx(xR,{size:20,className:"mr-2"}),"Work Notes"]}),x.jsx("div",{className:"space-y-3 max-h-48 overflow-y-auto bg-gray-50 p-3 rounded-lg",children:r.notes&&r.notes.length>0?r.notes.sort((X,C)=>new Date(C.timestamp)-new Date(X.timestamp)).map((X,C)=>x.jsxs("div",{className:"text-sm bg-white p-2 rounded shadow-sm",children:[x.jsx("p",{className:"text-gray-800",children:X.text}),x.jsx("p",{className:"text-xs text-gray-500 mt-1 text-right",children:jR(X.timestamp)})]},C)):x.jsx("p",{className:"text-sm text-gray-500 text-center py-4",children:"No notes for this job yet."})}),x.jsxs("div",{className:"mt-4",children:[x.jsx("textarea",{value:Q,onChange:X=>B(X.target.value),placeholder:"Add a new note...",rows:"3",className:"w-full p-2 border border-gray-300 rounded-lg"}),x.jsx("div",{className:"flex justify-end mt-2",children:x.jsx("button",{onClick:()=>s(r.id,Q,()=>B("")),disabled:!Q.trim(),className:"bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 disabled:bg-gray-400",children:"Add Note"})})]})]})]})]})})},qR=r=>r?r.getTime()/864e5+25569:null,HR=r=>r?qR(new Date(r+"T00:00:00")):null,KR=({onClose:r,onAddOrder:e,customers:t})=>{const[s,o]=te.useState(t[0]?.id||""),[l,h]=te.useState(""),[p,g]=te.useState(""),[_,E]=te.useState("Regular"),[R,O]=te.useState("Heating & Cooling"),[j,q]=te.useState(""),[Q,B]=te.useState(""),[ce,_e]=te.useState(""),[de,fe]=te.useState(""),[Re,X]=te.useState(""),C=te.useMemo(()=>t.find(A=>A.id===s),[s,t]);te.useEffect(()=>{if(C?.locations?.[0]){const A=C.locations[0];h(`${A.name}-${A.locNum}-0`)}else h("")},[C]);const T=A=>{h(A)},k=A=>{A.preventDefault();const[D,b]=l.split("-").slice(0,2),S=C.locations.find(Ke=>Ke.name===D&&Ke.locNum===b);if(!s||!S||!p){alert("Please fill out all required fields.");return}e({Client:C.name,Company:S.name,"Loc #":S.locNum,Task:p,Priority:_,Category:R,City:S.city,State:S.state,NTE:parseFloat(j)||0,"Schedule Date":HR(Q),startTime:ce,endTime:de,clientWO:Re})};return x.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4",children:x.jsxs("form",{onSubmit:k,className:"bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col",children:[x.jsxs("div",{className:"p-6 border-b flex justify-between items-center",children:[x.jsx("h2",{className:"text-2xl font-bold text-gray-800",children:"Add New Work Order"}),x.jsx("button",{type:"button",onClick:r,className:"text-gray-400 hover:text-gray-600 transition-colors",children:x.jsx(Dv,{size:28})})]}),x.jsxs("div",{className:"p-6 overflow-y-auto space-y-4",children:[x.jsxs("div",{children:[x.jsx("label",{className:"text-sm font-medium text-gray-600 block mb-1",children:"Client"}),x.jsx("select",{value:s,onChange:A=>o(parseInt(A.target.value)),className:"w-full p-2 border border-gray-300 rounded-lg",children:t.map(A=>x.jsx("option",{value:A.id,children:A.name},A.id))})]}),C&&x.jsxs("div",{children:[x.jsx("label",{className:"text-sm font-medium text-gray-600 block mb-1",children:"Location"}),x.jsx("select",{value:l,onChange:A=>T(A.target.value),className:"w-full p-2 border border-gray-300 rounded-lg",children:C.locations.map((A,D)=>x.jsxs("option",{value:`${A.name}-${A.locNum}-${D}`,children:[A.name," (#",A.locNum,")"]},`${A.name}-${A.locNum}-${D}`))})]}),x.jsxs("div",{children:[x.jsx("label",{className:"text-sm font-medium text-gray-600 block mb-1",children:"Client WO#"}),x.jsx("input",{type:"text",value:Re,onChange:A=>X(A.target.value),className:"w-full p-2 border border-gray-300 rounded-lg"})]}),x.jsxs("div",{children:[x.jsx("label",{className:"text-sm font-medium text-gray-600 block mb-1",children:"Task / Issue"}),x.jsx("textarea",{value:p,onChange:A=>g(A.target.value),rows:"3",className:"w-full p-2 border border-gray-300 rounded-lg",required:!0})]}),x.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[x.jsxs("div",{children:[x.jsx("label",{className:"text-sm font-medium text-gray-600 block mb-1",children:"Priority"}),x.jsxs("select",{value:_,onChange:A=>E(A.target.value),className:"w-full p-2 border border-gray-300 rounded-lg",children:[x.jsx("option",{children:"Regular"}),x.jsx("option",{children:"Low"}),x.jsx("option",{children:"Urgent"}),x.jsx("option",{children:"Emergency"})]})]}),x.jsxs("div",{children:[x.jsx("label",{className:"text-sm font-medium text-gray-600 block mb-1",children:"Category"}),x.jsxs("select",{value:R,onChange:A=>O(A.target.value),className:"w-full p-2 border border-gray-300 rounded-lg",children:[x.jsx("option",{children:"Heating & Cooling"}),x.jsx("option",{children:"Refrigeration"}),x.jsx("option",{children:"Maintenance"}),x.jsx("option",{children:"Plumbing"}),x.jsx("option",{children:"Other"})]})]}),x.jsxs("div",{children:[x.jsx("label",{className:"text-sm font-medium text-gray-600 block mb-1",children:"NTE Amount ($)"}),x.jsx("input",{type:"number",value:j,onChange:A=>q(A.target.value),className:"w-full p-2 border border-gray-300 rounded-lg",placeholder:"e.g., 500"})]})]}),x.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[x.jsxs("div",{children:[x.jsx("label",{className:"text-sm font-medium text-gray-600 block mb-1",children:"Schedule Date"}),x.jsx("input",{type:"date",value:Q,onChange:A=>B(A.target.value),className:"w-full p-2 border border-gray-300 rounded-lg"})]}),x.jsxs("div",{children:[x.jsx("label",{className:"text-sm font-medium text-gray-600 block mb-1",children:"Start Time"}),x.jsx("input",{type:"time",value:ce,onChange:A=>_e(A.target.value),className:"w-full p-2 border border-gray-300 rounded-lg"})]}),x.jsxs("div",{children:[x.jsx("label",{className:"text-sm font-medium text-gray-600 block mb-1",children:"End Time"}),x.jsx("input",{type:"time",value:de,onChange:A=>fe(A.target.value),className:"w-full p-2 border border-gray-300 rounded-lg"})]})]})]}),x.jsx("div",{className:"p-6 bg-gray-50 border-t mt-auto",children:x.jsx("button",{type:"submit",className:"w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700",children:"Create Work Order"})})]})})},GR={apiKey:"AIzaSyAlev0GFpv3rzRYCJaMALOqlPwaowNfynI",authDomain:"hvac-finance-dashboard.firebaseapp.com",projectId:"hvac-finance-dashboard",storageBucket:"hvac-finance-dashboard.firebasestorage.app",messagingSenderId:"917610618621",appId:"1:917610618621:web:83c621d154c5f62c9be894"},_a="hvac-master-dashboard",If=Ty(GR),QR=s_(If),va=Sk(If);mR(If);const YR=r=>r?r.getTime()/864e5+25569:null,XR=()=>{const[r,e]=te.useState(null),[t,s]=te.useState(!0),[o,l]=te.useState("finance"),[h,p]=te.useState("dashboard"),[g,_]=te.useState([]),[E,R]=te.useState([]),[O,j]=te.useState([]),[q,Q]=te.useState([]),[B,ce]=te.useState([]),[_e,de]=te.useState([]),[fe,Re]=te.useState([]),[X,C]=te.useState([]),[T,k]=te.useState([]),[A,D]=te.useState([]),[b,S]=te.useState([]),[Ke,_t]=te.useState([]),[At,je]=te.useState([]),[ee,pe]=te.useState([]),[ne,V]=te.useState([]),[$,he]=te.useState([]),[Se,Ae]=te.useState([]),[Pe,Le]=te.useState(""),[Me,$e]=te.useState("All"),[Ze,gn]=te.useState(null),[qr,yn]=te.useState(!1),[Gt,_n]=te.useState("dashboard"),[Es,Ts]=te.useState(!1),[Vo,Li]=te.useState(null),[Qn,Yn]=te.useState("bill"),[vr,Hr]=te.useState("dark"),[Mi,Is]=te.useState({key:"dueDay",direction:"ascending"}),[at,lt]=te.useState(""),[Xn,Ss]=te.useState(null),[wr,Kr]=te.useState(0),[Nn,As]=te.useState({start:new Date,end:new Date}),[ks,Rs]=te.useState("monthly"),[Cs,Ps]=te.useState(!0),[Gr,Qr]=te.useState({});te.useEffect(()=>{const kt=kT(QR,et=>{e(et?et.uid:null),s(!1)});return()=>kt()},[]);const Er=te.useMemo(()=>Nn.start.getFullYear()+"-"+String(Nn.start.getMonth()+1).padStart(2,"0"),[Nn]);te.useEffect(()=>{if(!r)return;const et=Object.entries({bills:_,debts:R,incomes:j,weeklyCosts:Q,jobs:ce,tasks:de,invoices:Re,taxPayments:C,goals:k,clients:pe,inventory:D,vehicles:S,maintenanceLogs:_t,recurringWork:je,workOrders:V,customers:he,technicians:Ae}).map(([xe,Jn])=>iy(Mk(Jg(va,"artifacts",_a,"users",r,xe)),bt=>{Jn(bt.docs.map(En=>({id:En.id,...En.data()})))},bt=>console.error(`Error fetching ${xe}:`,bt))),an=iy(xu(va,"artifacts",_a,"users",r,"paidStatus",Er),xe=>{Qr(xe.exists()?xe.data().status:{})},xe=>console.error("Error fetching paid status:",xe));return()=>{et.forEach(xe=>xe()),an()}},[r,Er]);const Qt=()=>Hr(vr==="light"?"dark":"light"),vn=(kt,et)=>{const an=xu(va,"artifacts",_a,"users",r,"workOrders",kt);ry(an,et),Ze&&Ze.id===kt&&gn(xe=>({...xe,...et}))},Yr=(kt,et,an)=>{if(!et.trim())return;const xe={text:et.trim(),timestamp:new Date().toISOString()},Jn=xu(va,"artifacts",_a,"users",r,"workOrders",kt),En=[...ne.find(Ir=>Ir.id===kt).notes||[],xe];ry(Jn,{notes:En}),an()},wn=kt=>{const et=`WO-${Date.now()}`,an={...kt,"WO#":et,id:et,"Created Date":YR(new Date),"Order Status":kt["Schedule Date"]?"Scheduled":"Open",notes:[],technician:[]};Bk(Jg(va,"artifacts",_a,"users",r,"workOrders"),an),yn(!1)},Fi=()=>x.jsxs(x.Fragment,{children:[x.jsxs("header",{className:"flex flex-col sm:flex-row justify-between items-center mb-6",children:[x.jsxs("div",{children:[x.jsx("h1",{className:"text-3xl font-bold",children:"Business Financial Dashboard"}),x.jsx("p",{className:"text-slate-500 dark:text-slate-400 mt-1",children:"Complete Business Management Solution"})]}),x.jsx("div",{className:"flex items-center gap-4",children:x.jsx("button",{onClick:Qt,className:"p-2 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700",children:vr==="light"?x.jsx(NR,{size:20}):x.jsx(DR,{size:20})})})]}),x.jsxs("nav",{className:"flex items-center border-b border-slate-200 dark:border-slate-700 mb-6 overflow-x-auto",children:[x.jsx("button",{onClick:()=>_n("dashboard"),className:`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${Gt==="dashboard"?"text-cyan-600 dark:text-white border-b-2 border-cyan-500":"text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"}`,children:"Dashboard"}),x.jsx("button",{onClick:()=>_n("reports"),className:`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${Gt==="reports"?"text-cyan-600 dark:text-white border-b-2 border-cyan-500":"text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"}`,children:"Reports"}),x.jsx("button",{onClick:()=>_n("invoices"),className:`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${Gt==="invoices"?"text-cyan-600 dark:text-white border-b-2 border-cyan-500":"text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"}`,children:"Invoices"}),x.jsx("button",{onClick:()=>_n("jobs"),className:`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${Gt==="jobs"?"text-cyan-600 dark:text-white border-b-2 border-cyan-500":"text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"}`,children:"Jobs"}),x.jsx("button",{onClick:()=>_n("recurring"),className:`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${Gt==="recurring"?"text-cyan-600 dark:text-white border-b-2 border-cyan-500":"text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"}`,children:"Recurring"})]}),x.jsx("main",{children:Gt==="dashboard"&&x.jsx(x.Fragment,{})})]}),Tr=()=>{};return t?x.jsx("div",{className:"bg-slate-900 text-white min-h-screen flex items-center justify-center",children:x.jsx("div",{className:"animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"})}):r?x.jsxs("div",{className:"bg-gray-50 min-h-screen font-sans",children:[x.jsx("header",{className:"bg-white shadow-sm sticky top-0 z-20",children:x.jsx("div",{className:"max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3",children:x.jsxs("div",{className:"flex items-center justify-between",children:[x.jsxs("div",{className:"flex items-center space-x-4",children:[x.jsx(Tf,{className:"h-8 w-8 text-blue-600"}),x.jsx("h1",{className:"text-2xl font-bold text-gray-800",children:"HVAC Business Suite"})]}),x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsxs("button",{onClick:()=>l("finance"),className:`font-semibold py-2 px-4 rounded-lg flex items-center gap-2 ${o==="finance"?"bg-blue-600 text-white":"hover:bg-gray-100"}`,children:[x.jsx(Nv,{size:20})," Finance"]}),x.jsxs("button",{onClick:()=>l("dispatch"),className:`font-semibold py-2 px-4 rounded-lg flex items-center gap-2 ${o==="dispatch"?"bg-blue-600 text-white":"hover:bg-gray-100"}`,children:[x.jsx(xv,{size:20})," Dispatch"]})]})]})})}),o==="dispatch"&&x.jsxs(x.Fragment,{children:[x.jsx(MR,{currentView:h,setCurrentView:p,onAddOrderClick:()=>yn(!0)}),x.jsx("main",{className:"max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:Tr()}),Ze&&x.jsx(WR,{order:Ze,onClose:()=>gn(null),onUpdate:vn,onAddNote:Yr,technicians:Se}),qr&&x.jsx(KR,{customers:$,onAddOrder:wn,onClose:()=>yn(!1)})]}),o==="finance"&&x.jsx("div",{className:`${vr} bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white`,children:x.jsx("div",{className:"max-w-7xl mx-auto p-4 sm:p-6 lg:p-8",children:Fi()})})]}):x.jsx(LR,{setUserId:e})};K0.createRoot(document.getElementById("root")).render(x.jsx(hy.StrictMode,{children:x.jsx(XR,{})}));
