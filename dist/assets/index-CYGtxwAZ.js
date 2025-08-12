(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const u of a)if(u.type==="childList")for(const h of u.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function t(a){const u={};return a.integrity&&(u.integrity=a.integrity),a.referrerPolicy&&(u.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?u.credentials="include":a.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(a){if(a.ep)return;a.ep=!0;const u=t(a);fetch(a.href,u)}})();function qg(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var wh={exports:{}},ca={},Th={exports:{}},Se={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var um;function tE(){if(um)return Se;um=1;var i=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),h=Symbol.for("react.context"),m=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),v=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),N=Symbol.iterator;function b(O){return O===null||typeof O!="object"?null:(O=N&&O[N]||O["@@iterator"],typeof O=="function"?O:null)}var j={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Q=Object.assign,X={};function B(O,z,ae){this.props=O,this.context=z,this.refs=X,this.updater=ae||j}B.prototype.isReactComponent={},B.prototype.setState=function(O,z){if(typeof O!="object"&&typeof O!="function"&&O!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,O,z,"setState")},B.prototype.forceUpdate=function(O){this.updater.enqueueForceUpdate(this,O,"forceUpdate")};function ye(){}ye.prototype=B.prototype;function Ie(O,z,ae){this.props=O,this.context=z,this.refs=X,this.updater=ae||j}var me=Ie.prototype=new ye;me.constructor=Ie,Q(me,B.prototype),me.isPureReactComponent=!0;var fe=Array.isArray,Me=Object.prototype.hasOwnProperty,ve={current:null},P={key:!0,ref:!0,__self:!0,__source:!0};function T(O,z,ae){var we,Te={},Ae=null,Ve=null;if(z!=null)for(we in z.ref!==void 0&&(Ve=z.ref),z.key!==void 0&&(Ae=""+z.key),z)Me.call(z,we)&&!P.hasOwnProperty(we)&&(Te[we]=z[we]);var xe=arguments.length-2;if(xe===1)Te.children=ae;else if(1<xe){for(var ze=Array(xe),ht=0;ht<xe;ht++)ze[ht]=arguments[ht+2];Te.children=ze}if(O&&O.defaultProps)for(we in xe=O.defaultProps,xe)Te[we]===void 0&&(Te[we]=xe[we]);return{$$typeof:i,type:O,key:Ae,ref:Ve,props:Te,_owner:ve.current}}function A(O,z){return{$$typeof:i,type:O.type,key:z,ref:O.ref,props:O.props,_owner:O._owner}}function k(O){return typeof O=="object"&&O!==null&&O.$$typeof===i}function D(O){var z={"=":"=0",":":"=2"};return"$"+O.replace(/[=:]/g,function(ae){return z[ae]})}var V=/\/+/g;function S(O,z){return typeof O=="object"&&O!==null&&O.key!=null?D(""+O.key):z.toString(36)}function Ze(O,z,ae,we,Te){var Ae=typeof O;(Ae==="undefined"||Ae==="boolean")&&(O=null);var Ve=!1;if(O===null)Ve=!0;else switch(Ae){case"string":case"number":Ve=!0;break;case"object":switch(O.$$typeof){case i:case e:Ve=!0}}if(Ve)return Ve=O,Te=Te(Ve),O=we===""?"."+S(Ve,0):we,fe(Te)?(ae="",O!=null&&(ae=O.replace(V,"$&/")+"/"),Ze(Te,z,ae,"",function(ht){return ht})):Te!=null&&(k(Te)&&(Te=A(Te,ae+(!Te.key||Ve&&Ve.key===Te.key?"":(""+Te.key).replace(V,"$&/")+"/")+O)),z.push(Te)),1;if(Ve=0,we=we===""?".":we+":",fe(O))for(var xe=0;xe<O.length;xe++){Ae=O[xe];var ze=we+S(Ae,xe);Ve+=Ze(Ae,z,ae,ze,Te)}else if(ze=b(O),typeof ze=="function")for(O=ze.call(O),xe=0;!(Ae=O.next()).done;)Ae=Ae.value,ze=we+S(Ae,xe++),Ve+=Ze(Ae,z,ae,ze,Te);else if(Ae==="object")throw z=String(O),Error("Objects are not valid as a React child (found: "+(z==="[object Object]"?"object with keys {"+Object.keys(O).join(", ")+"}":z)+"). If you meant to render a collection of children, use an array instead.");return Ve}function mt(O,z,ae){if(O==null)return O;var we=[],Te=0;return Ze(O,we,"","",function(Ae){return z.call(ae,Ae,Te++)}),we}function Tt(O){if(O._status===-1){var z=O._result;z=z(),z.then(function(ae){(O._status===0||O._status===-1)&&(O._status=1,O._result=ae)},function(ae){(O._status===0||O._status===-1)&&(O._status=2,O._result=ae)}),O._status===-1&&(O._status=0,O._result=z)}if(O._status===1)return O._result.default;throw O._result}var Fe={current:null},J={transition:null},le={ReactCurrentDispatcher:Fe,ReactCurrentBatchConfig:J,ReactCurrentOwner:ve};function ee(){throw Error("act(...) is not supported in production builds of React.")}return Se.Children={map:mt,forEach:function(O,z,ae){mt(O,function(){z.apply(this,arguments)},ae)},count:function(O){var z=0;return mt(O,function(){z++}),z},toArray:function(O){return mt(O,function(z){return z})||[]},only:function(O){if(!k(O))throw Error("React.Children.only expected to receive a single React element child.");return O}},Se.Component=B,Se.Fragment=t,Se.Profiler=a,Se.PureComponent=Ie,Se.StrictMode=s,Se.Suspense=g,Se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=le,Se.act=ee,Se.cloneElement=function(O,z,ae){if(O==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+O+".");var we=Q({},O.props),Te=O.key,Ae=O.ref,Ve=O._owner;if(z!=null){if(z.ref!==void 0&&(Ae=z.ref,Ve=ve.current),z.key!==void 0&&(Te=""+z.key),O.type&&O.type.defaultProps)var xe=O.type.defaultProps;for(ze in z)Me.call(z,ze)&&!P.hasOwnProperty(ze)&&(we[ze]=z[ze]===void 0&&xe!==void 0?xe[ze]:z[ze])}var ze=arguments.length-2;if(ze===1)we.children=ae;else if(1<ze){xe=Array(ze);for(var ht=0;ht<ze;ht++)xe[ht]=arguments[ht+2];we.children=xe}return{$$typeof:i,type:O.type,key:Te,ref:Ae,props:we,_owner:Ve}},Se.createContext=function(O){return O={$$typeof:h,_currentValue:O,_currentValue2:O,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},O.Provider={$$typeof:u,_context:O},O.Consumer=O},Se.createElement=T,Se.createFactory=function(O){var z=T.bind(null,O);return z.type=O,z},Se.createRef=function(){return{current:null}},Se.forwardRef=function(O){return{$$typeof:m,render:O}},Se.isValidElement=k,Se.lazy=function(O){return{$$typeof:w,_payload:{_status:-1,_result:O},_init:Tt}},Se.memo=function(O,z){return{$$typeof:v,type:O,compare:z===void 0?null:z}},Se.startTransition=function(O){var z=J.transition;J.transition={};try{O()}finally{J.transition=z}},Se.unstable_act=ee,Se.useCallback=function(O,z){return Fe.current.useCallback(O,z)},Se.useContext=function(O){return Fe.current.useContext(O)},Se.useDebugValue=function(){},Se.useDeferredValue=function(O){return Fe.current.useDeferredValue(O)},Se.useEffect=function(O,z){return Fe.current.useEffect(O,z)},Se.useId=function(){return Fe.current.useId()},Se.useImperativeHandle=function(O,z,ae){return Fe.current.useImperativeHandle(O,z,ae)},Se.useInsertionEffect=function(O,z){return Fe.current.useInsertionEffect(O,z)},Se.useLayoutEffect=function(O,z){return Fe.current.useLayoutEffect(O,z)},Se.useMemo=function(O,z){return Fe.current.useMemo(O,z)},Se.useReducer=function(O,z,ae){return Fe.current.useReducer(O,z,ae)},Se.useRef=function(O){return Fe.current.useRef(O)},Se.useState=function(O){return Fe.current.useState(O)},Se.useSyncExternalStore=function(O,z,ae){return Fe.current.useSyncExternalStore(O,z,ae)},Se.useTransition=function(){return Fe.current.useTransition()},Se.version="18.3.1",Se}var cm;function dd(){return cm||(cm=1,Th.exports=tE()),Th.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hm;function nE(){if(hm)return ca;hm=1;var i=dd(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,a=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,u={key:!0,ref:!0,__self:!0,__source:!0};function h(m,g,v){var w,N={},b=null,j=null;v!==void 0&&(b=""+v),g.key!==void 0&&(b=""+g.key),g.ref!==void 0&&(j=g.ref);for(w in g)s.call(g,w)&&!u.hasOwnProperty(w)&&(N[w]=g[w]);if(m&&m.defaultProps)for(w in g=m.defaultProps,g)N[w]===void 0&&(N[w]=g[w]);return{$$typeof:e,type:m,key:b,ref:j,props:N,_owner:a.current}}return ca.Fragment=t,ca.jsx=h,ca.jsxs=h,ca}var dm;function rE(){return dm||(dm=1,wh.exports=nE()),wh.exports}var je=rE(),de=dd();const iE=qg(de);var nu={},Ih={exports:{}},Xt={},Sh={exports:{}},Ah={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fm;function sE(){return fm||(fm=1,function(i){function e(J,le){var ee=J.length;J.push(le);e:for(;0<ee;){var O=ee-1>>>1,z=J[O];if(0<a(z,le))J[O]=le,J[ee]=z,ee=O;else break e}}function t(J){return J.length===0?null:J[0]}function s(J){if(J.length===0)return null;var le=J[0],ee=J.pop();if(ee!==le){J[0]=ee;e:for(var O=0,z=J.length,ae=z>>>1;O<ae;){var we=2*(O+1)-1,Te=J[we],Ae=we+1,Ve=J[Ae];if(0>a(Te,ee))Ae<z&&0>a(Ve,Te)?(J[O]=Ve,J[Ae]=ee,O=Ae):(J[O]=Te,J[we]=ee,O=we);else if(Ae<z&&0>a(Ve,ee))J[O]=Ve,J[Ae]=ee,O=Ae;else break e}}return le}function a(J,le){var ee=J.sortIndex-le.sortIndex;return ee!==0?ee:J.id-le.id}if(typeof performance=="object"&&typeof performance.now=="function"){var u=performance;i.unstable_now=function(){return u.now()}}else{var h=Date,m=h.now();i.unstable_now=function(){return h.now()-m}}var g=[],v=[],w=1,N=null,b=3,j=!1,Q=!1,X=!1,B=typeof setTimeout=="function"?setTimeout:null,ye=typeof clearTimeout=="function"?clearTimeout:null,Ie=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function me(J){for(var le=t(v);le!==null;){if(le.callback===null)s(v);else if(le.startTime<=J)s(v),le.sortIndex=le.expirationTime,e(g,le);else break;le=t(v)}}function fe(J){if(X=!1,me(J),!Q)if(t(g)!==null)Q=!0,Tt(Me);else{var le=t(v);le!==null&&Fe(fe,le.startTime-J)}}function Me(J,le){Q=!1,X&&(X=!1,ye(T),T=-1),j=!0;var ee=b;try{for(me(le),N=t(g);N!==null&&(!(N.expirationTime>le)||J&&!D());){var O=N.callback;if(typeof O=="function"){N.callback=null,b=N.priorityLevel;var z=O(N.expirationTime<=le);le=i.unstable_now(),typeof z=="function"?N.callback=z:N===t(g)&&s(g),me(le)}else s(g);N=t(g)}if(N!==null)var ae=!0;else{var we=t(v);we!==null&&Fe(fe,we.startTime-le),ae=!1}return ae}finally{N=null,b=ee,j=!1}}var ve=!1,P=null,T=-1,A=5,k=-1;function D(){return!(i.unstable_now()-k<A)}function V(){if(P!==null){var J=i.unstable_now();k=J;var le=!0;try{le=P(!0,J)}finally{le?S():(ve=!1,P=null)}}else ve=!1}var S;if(typeof Ie=="function")S=function(){Ie(V)};else if(typeof MessageChannel<"u"){var Ze=new MessageChannel,mt=Ze.port2;Ze.port1.onmessage=V,S=function(){mt.postMessage(null)}}else S=function(){B(V,0)};function Tt(J){P=J,ve||(ve=!0,S())}function Fe(J,le){T=B(function(){J(i.unstable_now())},le)}i.unstable_IdlePriority=5,i.unstable_ImmediatePriority=1,i.unstable_LowPriority=4,i.unstable_NormalPriority=3,i.unstable_Profiling=null,i.unstable_UserBlockingPriority=2,i.unstable_cancelCallback=function(J){J.callback=null},i.unstable_continueExecution=function(){Q||j||(Q=!0,Tt(Me))},i.unstable_forceFrameRate=function(J){0>J||125<J?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<J?Math.floor(1e3/J):5},i.unstable_getCurrentPriorityLevel=function(){return b},i.unstable_getFirstCallbackNode=function(){return t(g)},i.unstable_next=function(J){switch(b){case 1:case 2:case 3:var le=3;break;default:le=b}var ee=b;b=le;try{return J()}finally{b=ee}},i.unstable_pauseExecution=function(){},i.unstable_requestPaint=function(){},i.unstable_runWithPriority=function(J,le){switch(J){case 1:case 2:case 3:case 4:case 5:break;default:J=3}var ee=b;b=J;try{return le()}finally{b=ee}},i.unstable_scheduleCallback=function(J,le,ee){var O=i.unstable_now();switch(typeof ee=="object"&&ee!==null?(ee=ee.delay,ee=typeof ee=="number"&&0<ee?O+ee:O):ee=O,J){case 1:var z=-1;break;case 2:z=250;break;case 5:z=1073741823;break;case 4:z=1e4;break;default:z=5e3}return z=ee+z,J={id:w++,callback:le,priorityLevel:J,startTime:ee,expirationTime:z,sortIndex:-1},ee>O?(J.sortIndex=ee,e(v,J),t(g)===null&&J===t(v)&&(X?(ye(T),T=-1):X=!0,Fe(fe,ee-O))):(J.sortIndex=z,e(g,J),Q||j||(Q=!0,Tt(Me))),J},i.unstable_shouldYield=D,i.unstable_wrapCallback=function(J){var le=b;return function(){var ee=b;b=le;try{return J.apply(this,arguments)}finally{b=ee}}}}(Ah)),Ah}var pm;function oE(){return pm||(pm=1,Sh.exports=sE()),Sh.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mm;function aE(){if(mm)return Xt;mm=1;var i=dd(),e=oE();function t(n){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+n,o=1;o<arguments.length;o++)r+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+n+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s=new Set,a={};function u(n,r){h(n,r),h(n+"Capture",r)}function h(n,r){for(a[n]=r,n=0;n<r.length;n++)s.add(r[n])}var m=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),g=Object.prototype.hasOwnProperty,v=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,w={},N={};function b(n){return g.call(N,n)?!0:g.call(w,n)?!1:v.test(n)?N[n]=!0:(w[n]=!0,!1)}function j(n,r,o,c){if(o!==null&&o.type===0)return!1;switch(typeof r){case"function":case"symbol":return!0;case"boolean":return c?!1:o!==null?!o.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function Q(n,r,o,c){if(r===null||typeof r>"u"||j(n,r,o,c))return!0;if(c)return!1;if(o!==null)switch(o.type){case 3:return!r;case 4:return r===!1;case 5:return isNaN(r);case 6:return isNaN(r)||1>r}return!1}function X(n,r,o,c,d,p,_){this.acceptsBooleans=r===2||r===3||r===4,this.attributeName=c,this.attributeNamespace=d,this.mustUseProperty=o,this.propertyName=n,this.type=r,this.sanitizeURL=p,this.removeEmptyString=_}var B={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){B[n]=new X(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var r=n[0];B[r]=new X(r,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){B[n]=new X(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){B[n]=new X(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){B[n]=new X(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){B[n]=new X(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){B[n]=new X(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){B[n]=new X(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){B[n]=new X(n,5,!1,n.toLowerCase(),null,!1,!1)});var ye=/[\-:]([a-z])/g;function Ie(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var r=n.replace(ye,Ie);B[r]=new X(r,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var r=n.replace(ye,Ie);B[r]=new X(r,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var r=n.replace(ye,Ie);B[r]=new X(r,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){B[n]=new X(n,1,!1,n.toLowerCase(),null,!1,!1)}),B.xlinkHref=new X("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){B[n]=new X(n,1,!1,n.toLowerCase(),null,!0,!0)});function me(n,r,o,c){var d=B.hasOwnProperty(r)?B[r]:null;(d!==null?d.type!==0:c||!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(Q(r,o,d,c)&&(o=null),c||d===null?b(r)&&(o===null?n.removeAttribute(r):n.setAttribute(r,""+o)):d.mustUseProperty?n[d.propertyName]=o===null?d.type===3?!1:"":o:(r=d.attributeName,c=d.attributeNamespace,o===null?n.removeAttribute(r):(d=d.type,o=d===3||d===4&&o===!0?"":""+o,c?n.setAttributeNS(c,r,o):n.setAttribute(r,o))))}var fe=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Me=Symbol.for("react.element"),ve=Symbol.for("react.portal"),P=Symbol.for("react.fragment"),T=Symbol.for("react.strict_mode"),A=Symbol.for("react.profiler"),k=Symbol.for("react.provider"),D=Symbol.for("react.context"),V=Symbol.for("react.forward_ref"),S=Symbol.for("react.suspense"),Ze=Symbol.for("react.suspense_list"),mt=Symbol.for("react.memo"),Tt=Symbol.for("react.lazy"),Fe=Symbol.for("react.offscreen"),J=Symbol.iterator;function le(n){return n===null||typeof n!="object"?null:(n=J&&n[J]||n["@@iterator"],typeof n=="function"?n:null)}var ee=Object.assign,O;function z(n){if(O===void 0)try{throw Error()}catch(o){var r=o.stack.trim().match(/\n( *(at )?)/);O=r&&r[1]||""}return`
`+O+n}var ae=!1;function we(n,r){if(!n||ae)return"";ae=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(r)if(r=function(){throw Error()},Object.defineProperty(r.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(r,[])}catch(F){var c=F}Reflect.construct(n,[],r)}else{try{r.call()}catch(F){c=F}n.call(r.prototype)}else{try{throw Error()}catch(F){c=F}n()}}catch(F){if(F&&c&&typeof F.stack=="string"){for(var d=F.stack.split(`
`),p=c.stack.split(`
`),_=d.length-1,I=p.length-1;1<=_&&0<=I&&d[_]!==p[I];)I--;for(;1<=_&&0<=I;_--,I--)if(d[_]!==p[I]){if(_!==1||I!==1)do if(_--,I--,0>I||d[_]!==p[I]){var R=`
`+d[_].replace(" at new "," at ");return n.displayName&&R.includes("<anonymous>")&&(R=R.replace("<anonymous>",n.displayName)),R}while(1<=_&&0<=I);break}}}finally{ae=!1,Error.prepareStackTrace=o}return(n=n?n.displayName||n.name:"")?z(n):""}function Te(n){switch(n.tag){case 5:return z(n.type);case 16:return z("Lazy");case 13:return z("Suspense");case 19:return z("SuspenseList");case 0:case 2:case 15:return n=we(n.type,!1),n;case 11:return n=we(n.type.render,!1),n;case 1:return n=we(n.type,!0),n;default:return""}}function Ae(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case P:return"Fragment";case ve:return"Portal";case A:return"Profiler";case T:return"StrictMode";case S:return"Suspense";case Ze:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case D:return(n.displayName||"Context")+".Consumer";case k:return(n._context.displayName||"Context")+".Provider";case V:var r=n.render;return n=n.displayName,n||(n=r.displayName||r.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case mt:return r=n.displayName||null,r!==null?r:Ae(n.type)||"Memo";case Tt:r=n._payload,n=n._init;try{return Ae(n(r))}catch{}}return null}function Ve(n){var r=n.type;switch(n.tag){case 24:return"Cache";case 9:return(r.displayName||"Context")+".Consumer";case 10:return(r._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=r.render,n=n.displayName||n.name||"",r.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return r;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ae(r);case 8:return r===T?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof r=="function")return r.displayName||r.name||null;if(typeof r=="string")return r}return null}function xe(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function ze(n){var r=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(r==="checkbox"||r==="radio")}function ht(n){var r=ze(n)?"checked":"value",o=Object.getOwnPropertyDescriptor(n.constructor.prototype,r),c=""+n[r];if(!n.hasOwnProperty(r)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var d=o.get,p=o.set;return Object.defineProperty(n,r,{configurable:!0,get:function(){return d.call(this)},set:function(_){c=""+_,p.call(this,_)}}),Object.defineProperty(n,r,{enumerable:o.enumerable}),{getValue:function(){return c},setValue:function(_){c=""+_},stopTracking:function(){n._valueTracker=null,delete n[r]}}}}function Un(n){n._valueTracker||(n._valueTracker=ht(n))}function wi(n){if(!n)return!1;var r=n._valueTracker;if(!r)return!0;var o=r.getValue(),c="";return n&&(c=ze(n)?n.checked?"true":"false":n.value),n=c,n!==o?(r.setValue(n),!0):!1}function lr(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function Or(n,r){var o=r.checked;return ee({},r,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??n._wrapperState.initialChecked})}function Ti(n,r){var o=r.defaultValue==null?"":r.defaultValue,c=r.checked!=null?r.checked:r.defaultChecked;o=xe(r.value!=null?r.value:o),n._wrapperState={initialChecked:c,initialValue:o,controlled:r.type==="checkbox"||r.type==="radio"?r.checked!=null:r.value!=null}}function hs(n,r){r=r.checked,r!=null&&me(n,"checked",r,!1)}function ds(n,r){hs(n,r);var o=xe(r.value),c=r.type;if(o!=null)c==="number"?(o===0&&n.value===""||n.value!=o)&&(n.value=""+o):n.value!==""+o&&(n.value=""+o);else if(c==="submit"||c==="reset"){n.removeAttribute("value");return}r.hasOwnProperty("value")?Ii(n,r.type,o):r.hasOwnProperty("defaultValue")&&Ii(n,r.type,xe(r.defaultValue)),r.checked==null&&r.defaultChecked!=null&&(n.defaultChecked=!!r.defaultChecked)}function Co(n,r,o){if(r.hasOwnProperty("value")||r.hasOwnProperty("defaultValue")){var c=r.type;if(!(c!=="submit"&&c!=="reset"||r.value!==void 0&&r.value!==null))return;r=""+n._wrapperState.initialValue,o||r===n.value||(n.value=r),n.defaultValue=r}o=n.name,o!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,o!==""&&(n.name=o)}function Ii(n,r,o){(r!=="number"||lr(n.ownerDocument)!==n)&&(o==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+o&&(n.defaultValue=""+o))}var jn=Array.isArray;function zn(n,r,o,c){if(n=n.options,r){r={};for(var d=0;d<o.length;d++)r["$"+o[d]]=!0;for(o=0;o<n.length;o++)d=r.hasOwnProperty("$"+n[o].value),n[o].selected!==d&&(n[o].selected=d),d&&c&&(n[o].defaultSelected=!0)}else{for(o=""+xe(o),r=null,d=0;d<n.length;d++){if(n[d].value===o){n[d].selected=!0,c&&(n[d].defaultSelected=!0);return}r!==null||n[d].disabled||(r=n[d])}r!==null&&(r.selected=!0)}}function fs(n,r){if(r.dangerouslySetInnerHTML!=null)throw Error(t(91));return ee({},r,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function Si(n,r){var o=r.value;if(o==null){if(o=r.children,r=r.defaultValue,o!=null){if(r!=null)throw Error(t(92));if(jn(o)){if(1<o.length)throw Error(t(93));o=o[0]}r=o}r==null&&(r=""),o=r}n._wrapperState={initialValue:xe(o)}}function Ai(n,r){var o=xe(r.value),c=xe(r.defaultValue);o!=null&&(o=""+o,o!==n.value&&(n.value=o),r.defaultValue==null&&n.defaultValue!==o&&(n.defaultValue=o)),c!=null&&(n.defaultValue=""+c)}function ps(n){var r=n.textContent;r===n._wrapperState.initialValue&&r!==""&&r!==null&&(n.value=r)}function st(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ot(n,r){return n==null||n==="http://www.w3.org/1999/xhtml"?st(r):n==="http://www.w3.org/2000/svg"&&r==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Bn,ms=function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(r,o,c,d){MSApp.execUnsafeLocalFunction(function(){return n(r,o,c,d)})}:n}(function(n,r){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=r;else{for(Bn=Bn||document.createElement("div"),Bn.innerHTML="<svg>"+r.valueOf().toString()+"</svg>",r=Bn.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;r.firstChild;)n.appendChild(r.firstChild)}});function ur(n,r){if(r){var o=n.firstChild;if(o&&o===n.lastChild&&o.nodeType===3){o.nodeValue=r;return}}n.textContent=r}var Vr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},xr=["Webkit","ms","Moz","O"];Object.keys(Vr).forEach(function(n){xr.forEach(function(r){r=r+n.charAt(0).toUpperCase()+n.substring(1),Vr[r]=Vr[n]})});function gs(n,r,o){return r==null||typeof r=="boolean"||r===""?"":o||typeof r!="number"||r===0||Vr.hasOwnProperty(n)&&Vr[n]?(""+r).trim():r+"px"}function ys(n,r){n=n.style;for(var o in r)if(r.hasOwnProperty(o)){var c=o.indexOf("--")===0,d=gs(o,r[o],c);o==="float"&&(o="cssFloat"),c?n.setProperty(o,d):n[o]=d}}var _s=ee({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function vs(n,r){if(r){if(_s[n]&&(r.children!=null||r.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(r.dangerouslySetInnerHTML!=null){if(r.children!=null)throw Error(t(60));if(typeof r.dangerouslySetInnerHTML!="object"||!("__html"in r.dangerouslySetInnerHTML))throw Error(t(61))}if(r.style!=null&&typeof r.style!="object")throw Error(t(62))}}function Es(n,r){if(n.indexOf("-")===-1)return typeof r.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Lr=null;function Ri(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var ki=null,Zt=null,_n=null;function Ci(n){if(n=Qo(n)){if(typeof ki!="function")throw Error(t(280));var r=n.stateNode;r&&(r=yl(r),ki(n.stateNode,n.type,r))}}function vn(n){Zt?_n?_n.push(n):_n=[n]:Zt=n}function Pi(){if(Zt){var n=Zt,r=_n;if(_n=Zt=null,Ci(n),r)for(n=0;n<r.length;n++)Ci(r[n])}}function cr(n,r){return n(r)}function Ut(){}var En=!1;function hr(n,r,o){if(En)return n(r,o);En=!0;try{return cr(n,r,o)}finally{En=!1,(Zt!==null||_n!==null)&&(Ut(),Pi())}}function Ge(n,r){var o=n.stateNode;if(o===null)return null;var c=yl(o);if(c===null)return null;o=c[r];e:switch(r){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(n=n.type,c=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!c;break e;default:n=!1}if(n)return null;if(o&&typeof o!="function")throw Error(t(231,r,typeof o));return o}var ws=!1;if(m)try{var wn={};Object.defineProperty(wn,"passive",{get:function(){ws=!0}}),window.addEventListener("test",wn,wn),window.removeEventListener("test",wn,wn)}catch{ws=!1}function Ni(n,r,o,c,d,p,_,I,R){var F=Array.prototype.slice.call(arguments,3);try{r.apply(o,F)}catch(q){this.onError(q)}}var Di=!1,Ts=null,Tn=!1,Po=null,Qu={onError:function(n){Di=!0,Ts=n}};function Is(n,r,o,c,d,p,_,I,R){Di=!1,Ts=null,Ni.apply(Qu,arguments)}function Ba(n,r,o,c,d,p,_,I,R){if(Is.apply(this,arguments),Di){if(Di){var F=Ts;Di=!1,Ts=null}else throw Error(t(198));Tn||(Tn=!0,Po=F)}}function In(n){var r=n,o=n;if(n.alternate)for(;r.return;)r=r.return;else{n=r;do r=n,(r.flags&4098)!==0&&(o=r.return),n=r.return;while(n)}return r.tag===3?o:null}function Oi(n){if(n.tag===13){var r=n.memoizedState;if(r===null&&(n=n.alternate,n!==null&&(r=n.memoizedState)),r!==null)return r.dehydrated}return null}function Sn(n){if(In(n)!==n)throw Error(t(188))}function $a(n){var r=n.alternate;if(!r){if(r=In(n),r===null)throw Error(t(188));return r!==n?null:n}for(var o=n,c=r;;){var d=o.return;if(d===null)break;var p=d.alternate;if(p===null){if(c=d.return,c!==null){o=c;continue}break}if(d.child===p.child){for(p=d.child;p;){if(p===o)return Sn(d),n;if(p===c)return Sn(d),r;p=p.sibling}throw Error(t(188))}if(o.return!==c.return)o=d,c=p;else{for(var _=!1,I=d.child;I;){if(I===o){_=!0,o=d,c=p;break}if(I===c){_=!0,c=d,o=p;break}I=I.sibling}if(!_){for(I=p.child;I;){if(I===o){_=!0,o=p,c=d;break}if(I===c){_=!0,c=p,o=d;break}I=I.sibling}if(!_)throw Error(t(189))}}if(o.alternate!==c)throw Error(t(190))}if(o.tag!==3)throw Error(t(188));return o.stateNode.current===o?n:r}function No(n){return n=$a(n),n!==null?Ss(n):null}function Ss(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var r=Ss(n);if(r!==null)return r;n=n.sibling}return null}var As=e.unstable_scheduleCallback,Do=e.unstable_cancelCallback,qa=e.unstable_shouldYield,Yu=e.unstable_requestPaint,$e=e.unstable_now,Ha=e.unstable_getCurrentPriorityLevel,Vi=e.unstable_ImmediatePriority,Mr=e.unstable_UserBlockingPriority,un=e.unstable_NormalPriority,Oo=e.unstable_LowPriority,Wa=e.unstable_IdlePriority,xi=null,en=null;function Ka(n){if(en&&typeof en.onCommitFiberRoot=="function")try{en.onCommitFiberRoot(xi,n,void 0,(n.current.flags&128)===128)}catch{}}var jt=Math.clz32?Math.clz32:Qa,Vo=Math.log,Ga=Math.LN2;function Qa(n){return n>>>=0,n===0?32:31-(Vo(n)/Ga|0)|0}var Rs=64,ks=4194304;function br(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function Li(n,r){var o=n.pendingLanes;if(o===0)return 0;var c=0,d=n.suspendedLanes,p=n.pingedLanes,_=o&268435455;if(_!==0){var I=_&~d;I!==0?c=br(I):(p&=_,p!==0&&(c=br(p)))}else _=o&~d,_!==0?c=br(_):p!==0&&(c=br(p));if(c===0)return 0;if(r!==0&&r!==c&&(r&d)===0&&(d=c&-c,p=r&-r,d>=p||d===16&&(p&4194240)!==0))return r;if((c&4)!==0&&(c|=o&16),r=n.entangledLanes,r!==0)for(n=n.entanglements,r&=c;0<r;)o=31-jt(r),d=1<<o,c|=n[o],r&=~d;return c}function Xu(n,r){switch(n){case 1:case 2:case 4:return r+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return r+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function dr(n,r){for(var o=n.suspendedLanes,c=n.pingedLanes,d=n.expirationTimes,p=n.pendingLanes;0<p;){var _=31-jt(p),I=1<<_,R=d[_];R===-1?((I&o)===0||(I&c)!==0)&&(d[_]=Xu(I,r)):R<=r&&(n.expiredLanes|=I),p&=~I}}function tn(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function Mi(){var n=Rs;return Rs<<=1,(Rs&4194240)===0&&(Rs=64),n}function Fr(n){for(var r=[],o=0;31>o;o++)r.push(n);return r}function Ur(n,r,o){n.pendingLanes|=r,r!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,r=31-jt(r),n[r]=o}function Be(n,r){var o=n.pendingLanes&~r;n.pendingLanes=r,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=r,n.mutableReadLanes&=r,n.entangledLanes&=r,r=n.entanglements;var c=n.eventTimes;for(n=n.expirationTimes;0<o;){var d=31-jt(o),p=1<<d;r[d]=0,c[d]=-1,n[d]=-1,o&=~p}}function jr(n,r){var o=n.entangledLanes|=r;for(n=n.entanglements;o;){var c=31-jt(o),d=1<<c;d&r|n[c]&r&&(n[c]|=r),o&=~d}}var Re=0;function zr(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var Ya,Cs,Xa,Ja,Za,xo=!1,$n=[],It=null,An=null,Rn=null,Br=new Map,cn=new Map,qn=[],Ju="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function el(n,r){switch(n){case"focusin":case"focusout":It=null;break;case"dragenter":case"dragleave":An=null;break;case"mouseover":case"mouseout":Rn=null;break;case"pointerover":case"pointerout":Br.delete(r.pointerId);break;case"gotpointercapture":case"lostpointercapture":cn.delete(r.pointerId)}}function qt(n,r,o,c,d,p){return n===null||n.nativeEvent!==p?(n={blockedOn:r,domEventName:o,eventSystemFlags:c,nativeEvent:p,targetContainers:[d]},r!==null&&(r=Qo(r),r!==null&&Cs(r)),n):(n.eventSystemFlags|=c,r=n.targetContainers,d!==null&&r.indexOf(d)===-1&&r.push(d),n)}function Zu(n,r,o,c,d){switch(r){case"focusin":return It=qt(It,n,r,o,c,d),!0;case"dragenter":return An=qt(An,n,r,o,c,d),!0;case"mouseover":return Rn=qt(Rn,n,r,o,c,d),!0;case"pointerover":var p=d.pointerId;return Br.set(p,qt(Br.get(p)||null,n,r,o,c,d)),!0;case"gotpointercapture":return p=d.pointerId,cn.set(p,qt(cn.get(p)||null,n,r,o,c,d)),!0}return!1}function tl(n){var r=zi(n.target);if(r!==null){var o=In(r);if(o!==null){if(r=o.tag,r===13){if(r=Oi(o),r!==null){n.blockedOn=r,Za(n.priority,function(){Xa(o)});return}}else if(r===3&&o.stateNode.current.memoizedState.isDehydrated){n.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}n.blockedOn=null}function fr(n){if(n.blockedOn!==null)return!1;for(var r=n.targetContainers;0<r.length;){var o=Ps(n.domEventName,n.eventSystemFlags,r[0],n.nativeEvent);if(o===null){o=n.nativeEvent;var c=new o.constructor(o.type,o);Lr=c,o.target.dispatchEvent(c),Lr=null}else return r=Qo(o),r!==null&&Cs(r),n.blockedOn=o,!1;r.shift()}return!0}function bi(n,r,o){fr(n)&&o.delete(r)}function nl(){xo=!1,It!==null&&fr(It)&&(It=null),An!==null&&fr(An)&&(An=null),Rn!==null&&fr(Rn)&&(Rn=null),Br.forEach(bi),cn.forEach(bi)}function kn(n,r){n.blockedOn===r&&(n.blockedOn=null,xo||(xo=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,nl)))}function Cn(n){function r(d){return kn(d,n)}if(0<$n.length){kn($n[0],n);for(var o=1;o<$n.length;o++){var c=$n[o];c.blockedOn===n&&(c.blockedOn=null)}}for(It!==null&&kn(It,n),An!==null&&kn(An,n),Rn!==null&&kn(Rn,n),Br.forEach(r),cn.forEach(r),o=0;o<qn.length;o++)c=qn[o],c.blockedOn===n&&(c.blockedOn=null);for(;0<qn.length&&(o=qn[0],o.blockedOn===null);)tl(o),o.blockedOn===null&&qn.shift()}var pr=fe.ReactCurrentBatchConfig,$r=!0;function Qe(n,r,o,c){var d=Re,p=pr.transition;pr.transition=null;try{Re=1,Lo(n,r,o,c)}finally{Re=d,pr.transition=p}}function ec(n,r,o,c){var d=Re,p=pr.transition;pr.transition=null;try{Re=4,Lo(n,r,o,c)}finally{Re=d,pr.transition=p}}function Lo(n,r,o,c){if($r){var d=Ps(n,r,o,c);if(d===null)hc(n,r,c,Fi,o),el(n,c);else if(Zu(d,n,r,o,c))c.stopPropagation();else if(el(n,c),r&4&&-1<Ju.indexOf(n)){for(;d!==null;){var p=Qo(d);if(p!==null&&Ya(p),p=Ps(n,r,o,c),p===null&&hc(n,r,c,Fi,o),p===d)break;d=p}d!==null&&c.stopPropagation()}else hc(n,r,c,null,o)}}var Fi=null;function Ps(n,r,o,c){if(Fi=null,n=Ri(c),n=zi(n),n!==null)if(r=In(n),r===null)n=null;else if(o=r.tag,o===13){if(n=Oi(r),n!==null)return n;n=null}else if(o===3){if(r.stateNode.current.memoizedState.isDehydrated)return r.tag===3?r.stateNode.containerInfo:null;n=null}else r!==n&&(n=null);return Fi=n,null}function Mo(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ha()){case Vi:return 1;case Mr:return 4;case un:case Oo:return 16;case Wa:return 536870912;default:return 16}default:return 16}}var nn=null,Ns=null,Ht=null;function bo(){if(Ht)return Ht;var n,r=Ns,o=r.length,c,d="value"in nn?nn.value:nn.textContent,p=d.length;for(n=0;n<o&&r[n]===d[n];n++);var _=o-n;for(c=1;c<=_&&r[o-c]===d[p-c];c++);return Ht=d.slice(n,1<c?1-c:void 0)}function Ds(n){var r=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&r===13&&(n=13)):n=r,n===10&&(n=13),32<=n||n===13?n:0}function Hn(){return!0}function Fo(){return!1}function St(n){function r(o,c,d,p,_){this._reactName=o,this._targetInst=d,this.type=c,this.nativeEvent=p,this.target=_,this.currentTarget=null;for(var I in n)n.hasOwnProperty(I)&&(o=n[I],this[I]=o?o(p):p[I]);return this.isDefaultPrevented=(p.defaultPrevented!=null?p.defaultPrevented:p.returnValue===!1)?Hn:Fo,this.isPropagationStopped=Fo,this}return ee(r.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=Hn)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=Hn)},persist:function(){},isPersistent:Hn}),r}var Pn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Os=St(Pn),Wn=ee({},Pn,{view:0,detail:0}),tc=St(Wn),Vs,mr,qr,Ui=ee({},Wn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Kn,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==qr&&(qr&&n.type==="mousemove"?(Vs=n.screenX-qr.screenX,mr=n.screenY-qr.screenY):mr=Vs=0,qr=n),Vs)},movementY:function(n){return"movementY"in n?n.movementY:mr}}),xs=St(Ui),Uo=ee({},Ui,{dataTransfer:0}),rl=St(Uo),Ls=ee({},Wn,{relatedTarget:0}),Ms=St(Ls),il=ee({},Pn,{animationName:0,elapsedTime:0,pseudoElement:0}),gr=St(il),sl=ee({},Pn,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),ol=St(sl),al=ee({},Pn,{data:0}),jo=St(al),bs={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},zt={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ll={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ul(n){var r=this.nativeEvent;return r.getModifierState?r.getModifierState(n):(n=ll[n])?!!r[n]:!1}function Kn(){return ul}var l=ee({},Wn,{key:function(n){if(n.key){var r=bs[n.key]||n.key;if(r!=="Unidentified")return r}return n.type==="keypress"?(n=Ds(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?zt[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Kn,charCode:function(n){return n.type==="keypress"?Ds(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Ds(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),f=St(l),y=ee({},Ui,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),E=St(y),x=ee({},Wn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Kn}),U=St(x),Y=ee({},Pn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ue=St(Y),dt=ee({},Ui,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),Ce=St(dt),gt=[9,13,27,32],at=m&&"CompositionEvent"in window,hn=null;m&&"documentMode"in document&&(hn=document.documentMode);var rn=m&&"TextEvent"in window&&!hn,ji=m&&(!at||hn&&8<hn&&11>=hn),Fs=" ",nf=!1;function rf(n,r){switch(n){case"keyup":return gt.indexOf(r.keyCode)!==-1;case"keydown":return r.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function sf(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var Us=!1;function J_(n,r){switch(n){case"compositionend":return sf(r);case"keypress":return r.which!==32?null:(nf=!0,Fs);case"textInput":return n=r.data,n===Fs&&nf?null:n;default:return null}}function Z_(n,r){if(Us)return n==="compositionend"||!at&&rf(n,r)?(n=bo(),Ht=Ns=nn=null,Us=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(r.ctrlKey||r.altKey||r.metaKey)||r.ctrlKey&&r.altKey){if(r.char&&1<r.char.length)return r.char;if(r.which)return String.fromCharCode(r.which)}return null;case"compositionend":return ji&&r.locale!=="ko"?null:r.data;default:return null}}var ev={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function of(n){var r=n&&n.nodeName&&n.nodeName.toLowerCase();return r==="input"?!!ev[n.type]:r==="textarea"}function af(n,r,o,c){vn(c),r=pl(r,"onChange"),0<r.length&&(o=new Os("onChange","change",null,o,c),n.push({event:o,listeners:r}))}var zo=null,Bo=null;function tv(n){Af(n,0)}function cl(n){var r=qs(n);if(wi(r))return n}function nv(n,r){if(n==="change")return r}var lf=!1;if(m){var nc;if(m){var rc="oninput"in document;if(!rc){var uf=document.createElement("div");uf.setAttribute("oninput","return;"),rc=typeof uf.oninput=="function"}nc=rc}else nc=!1;lf=nc&&(!document.documentMode||9<document.documentMode)}function cf(){zo&&(zo.detachEvent("onpropertychange",hf),Bo=zo=null)}function hf(n){if(n.propertyName==="value"&&cl(Bo)){var r=[];af(r,Bo,n,Ri(n)),hr(tv,r)}}function rv(n,r,o){n==="focusin"?(cf(),zo=r,Bo=o,zo.attachEvent("onpropertychange",hf)):n==="focusout"&&cf()}function iv(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return cl(Bo)}function sv(n,r){if(n==="click")return cl(r)}function ov(n,r){if(n==="input"||n==="change")return cl(r)}function av(n,r){return n===r&&(n!==0||1/n===1/r)||n!==n&&r!==r}var Nn=typeof Object.is=="function"?Object.is:av;function $o(n,r){if(Nn(n,r))return!0;if(typeof n!="object"||n===null||typeof r!="object"||r===null)return!1;var o=Object.keys(n),c=Object.keys(r);if(o.length!==c.length)return!1;for(c=0;c<o.length;c++){var d=o[c];if(!g.call(r,d)||!Nn(n[d],r[d]))return!1}return!0}function df(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function ff(n,r){var o=df(n);n=0;for(var c;o;){if(o.nodeType===3){if(c=n+o.textContent.length,n<=r&&c>=r)return{node:o,offset:r-n};n=c}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=df(o)}}function pf(n,r){return n&&r?n===r?!0:n&&n.nodeType===3?!1:r&&r.nodeType===3?pf(n,r.parentNode):"contains"in n?n.contains(r):n.compareDocumentPosition?!!(n.compareDocumentPosition(r)&16):!1:!1}function mf(){for(var n=window,r=lr();r instanceof n.HTMLIFrameElement;){try{var o=typeof r.contentWindow.location.href=="string"}catch{o=!1}if(o)n=r.contentWindow;else break;r=lr(n.document)}return r}function ic(n){var r=n&&n.nodeName&&n.nodeName.toLowerCase();return r&&(r==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||r==="textarea"||n.contentEditable==="true")}function lv(n){var r=mf(),o=n.focusedElem,c=n.selectionRange;if(r!==o&&o&&o.ownerDocument&&pf(o.ownerDocument.documentElement,o)){if(c!==null&&ic(o)){if(r=c.start,n=c.end,n===void 0&&(n=r),"selectionStart"in o)o.selectionStart=r,o.selectionEnd=Math.min(n,o.value.length);else if(n=(r=o.ownerDocument||document)&&r.defaultView||window,n.getSelection){n=n.getSelection();var d=o.textContent.length,p=Math.min(c.start,d);c=c.end===void 0?p:Math.min(c.end,d),!n.extend&&p>c&&(d=c,c=p,p=d),d=ff(o,p);var _=ff(o,c);d&&_&&(n.rangeCount!==1||n.anchorNode!==d.node||n.anchorOffset!==d.offset||n.focusNode!==_.node||n.focusOffset!==_.offset)&&(r=r.createRange(),r.setStart(d.node,d.offset),n.removeAllRanges(),p>c?(n.addRange(r),n.extend(_.node,_.offset)):(r.setEnd(_.node,_.offset),n.addRange(r)))}}for(r=[],n=o;n=n.parentNode;)n.nodeType===1&&r.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<r.length;o++)n=r[o],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var uv=m&&"documentMode"in document&&11>=document.documentMode,js=null,sc=null,qo=null,oc=!1;function gf(n,r,o){var c=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;oc||js==null||js!==lr(c)||(c=js,"selectionStart"in c&&ic(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),qo&&$o(qo,c)||(qo=c,c=pl(sc,"onSelect"),0<c.length&&(r=new Os("onSelect","select",null,r,o),n.push({event:r,listeners:c}),r.target=js)))}function hl(n,r){var o={};return o[n.toLowerCase()]=r.toLowerCase(),o["Webkit"+n]="webkit"+r,o["Moz"+n]="moz"+r,o}var zs={animationend:hl("Animation","AnimationEnd"),animationiteration:hl("Animation","AnimationIteration"),animationstart:hl("Animation","AnimationStart"),transitionend:hl("Transition","TransitionEnd")},ac={},yf={};m&&(yf=document.createElement("div").style,"AnimationEvent"in window||(delete zs.animationend.animation,delete zs.animationiteration.animation,delete zs.animationstart.animation),"TransitionEvent"in window||delete zs.transitionend.transition);function dl(n){if(ac[n])return ac[n];if(!zs[n])return n;var r=zs[n],o;for(o in r)if(r.hasOwnProperty(o)&&o in yf)return ac[n]=r[o];return n}var _f=dl("animationend"),vf=dl("animationiteration"),Ef=dl("animationstart"),wf=dl("transitionend"),Tf=new Map,If="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Hr(n,r){Tf.set(n,r),u(r,[n])}for(var lc=0;lc<If.length;lc++){var uc=If[lc],cv=uc.toLowerCase(),hv=uc[0].toUpperCase()+uc.slice(1);Hr(cv,"on"+hv)}Hr(_f,"onAnimationEnd"),Hr(vf,"onAnimationIteration"),Hr(Ef,"onAnimationStart"),Hr("dblclick","onDoubleClick"),Hr("focusin","onFocus"),Hr("focusout","onBlur"),Hr(wf,"onTransitionEnd"),h("onMouseEnter",["mouseout","mouseover"]),h("onMouseLeave",["mouseout","mouseover"]),h("onPointerEnter",["pointerout","pointerover"]),h("onPointerLeave",["pointerout","pointerover"]),u("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),u("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),u("onBeforeInput",["compositionend","keypress","textInput","paste"]),u("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ho="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),dv=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ho));function Sf(n,r,o){var c=n.type||"unknown-event";n.currentTarget=o,Ba(c,r,void 0,n),n.currentTarget=null}function Af(n,r){r=(r&4)!==0;for(var o=0;o<n.length;o++){var c=n[o],d=c.event;c=c.listeners;e:{var p=void 0;if(r)for(var _=c.length-1;0<=_;_--){var I=c[_],R=I.instance,F=I.currentTarget;if(I=I.listener,R!==p&&d.isPropagationStopped())break e;Sf(d,I,F),p=R}else for(_=0;_<c.length;_++){if(I=c[_],R=I.instance,F=I.currentTarget,I=I.listener,R!==p&&d.isPropagationStopped())break e;Sf(d,I,F),p=R}}}if(Tn)throw n=Po,Tn=!1,Po=null,n}function He(n,r){var o=r[yc];o===void 0&&(o=r[yc]=new Set);var c=n+"__bubble";o.has(c)||(Rf(r,n,2,!1),o.add(c))}function cc(n,r,o){var c=0;r&&(c|=4),Rf(o,n,c,r)}var fl="_reactListening"+Math.random().toString(36).slice(2);function Wo(n){if(!n[fl]){n[fl]=!0,s.forEach(function(o){o!=="selectionchange"&&(dv.has(o)||cc(o,!1,n),cc(o,!0,n))});var r=n.nodeType===9?n:n.ownerDocument;r===null||r[fl]||(r[fl]=!0,cc("selectionchange",!1,r))}}function Rf(n,r,o,c){switch(Mo(r)){case 1:var d=Qe;break;case 4:d=ec;break;default:d=Lo}o=d.bind(null,r,o,n),d=void 0,!ws||r!=="touchstart"&&r!=="touchmove"&&r!=="wheel"||(d=!0),c?d!==void 0?n.addEventListener(r,o,{capture:!0,passive:d}):n.addEventListener(r,o,!0):d!==void 0?n.addEventListener(r,o,{passive:d}):n.addEventListener(r,o,!1)}function hc(n,r,o,c,d){var p=c;if((r&1)===0&&(r&2)===0&&c!==null)e:for(;;){if(c===null)return;var _=c.tag;if(_===3||_===4){var I=c.stateNode.containerInfo;if(I===d||I.nodeType===8&&I.parentNode===d)break;if(_===4)for(_=c.return;_!==null;){var R=_.tag;if((R===3||R===4)&&(R=_.stateNode.containerInfo,R===d||R.nodeType===8&&R.parentNode===d))return;_=_.return}for(;I!==null;){if(_=zi(I),_===null)return;if(R=_.tag,R===5||R===6){c=p=_;continue e}I=I.parentNode}}c=c.return}hr(function(){var F=p,q=Ri(o),W=[];e:{var $=Tf.get(n);if($!==void 0){var Z=Os,ne=n;switch(n){case"keypress":if(Ds(o)===0)break e;case"keydown":case"keyup":Z=f;break;case"focusin":ne="focus",Z=Ms;break;case"focusout":ne="blur",Z=Ms;break;case"beforeblur":case"afterblur":Z=Ms;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Z=xs;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Z=rl;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Z=U;break;case _f:case vf:case Ef:Z=gr;break;case wf:Z=Ue;break;case"scroll":Z=tc;break;case"wheel":Z=Ce;break;case"copy":case"cut":case"paste":Z=ol;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Z=E}var re=(r&4)!==0,nt=!re&&n==="scroll",L=re?$!==null?$+"Capture":null:$;re=[];for(var C=F,M;C!==null;){M=C;var K=M.stateNode;if(M.tag===5&&K!==null&&(M=K,L!==null&&(K=Ge(C,L),K!=null&&re.push(Ko(C,K,M)))),nt)break;C=C.return}0<re.length&&($=new Z($,ne,null,o,q),W.push({event:$,listeners:re}))}}if((r&7)===0){e:{if($=n==="mouseover"||n==="pointerover",Z=n==="mouseout"||n==="pointerout",$&&o!==Lr&&(ne=o.relatedTarget||o.fromElement)&&(zi(ne)||ne[yr]))break e;if((Z||$)&&($=q.window===q?q:($=q.ownerDocument)?$.defaultView||$.parentWindow:window,Z?(ne=o.relatedTarget||o.toElement,Z=F,ne=ne?zi(ne):null,ne!==null&&(nt=In(ne),ne!==nt||ne.tag!==5&&ne.tag!==6)&&(ne=null)):(Z=null,ne=F),Z!==ne)){if(re=xs,K="onMouseLeave",L="onMouseEnter",C="mouse",(n==="pointerout"||n==="pointerover")&&(re=E,K="onPointerLeave",L="onPointerEnter",C="pointer"),nt=Z==null?$:qs(Z),M=ne==null?$:qs(ne),$=new re(K,C+"leave",Z,o,q),$.target=nt,$.relatedTarget=M,K=null,zi(q)===F&&(re=new re(L,C+"enter",ne,o,q),re.target=M,re.relatedTarget=nt,K=re),nt=K,Z&&ne)t:{for(re=Z,L=ne,C=0,M=re;M;M=Bs(M))C++;for(M=0,K=L;K;K=Bs(K))M++;for(;0<C-M;)re=Bs(re),C--;for(;0<M-C;)L=Bs(L),M--;for(;C--;){if(re===L||L!==null&&re===L.alternate)break t;re=Bs(re),L=Bs(L)}re=null}else re=null;Z!==null&&kf(W,$,Z,re,!1),ne!==null&&nt!==null&&kf(W,nt,ne,re,!0)}}e:{if($=F?qs(F):window,Z=$.nodeName&&$.nodeName.toLowerCase(),Z==="select"||Z==="input"&&$.type==="file")var oe=nv;else if(of($))if(lf)oe=ov;else{oe=iv;var ce=rv}else(Z=$.nodeName)&&Z.toLowerCase()==="input"&&($.type==="checkbox"||$.type==="radio")&&(oe=sv);if(oe&&(oe=oe(n,F))){af(W,oe,o,q);break e}ce&&ce(n,$,F),n==="focusout"&&(ce=$._wrapperState)&&ce.controlled&&$.type==="number"&&Ii($,"number",$.value)}switch(ce=F?qs(F):window,n){case"focusin":(of(ce)||ce.contentEditable==="true")&&(js=ce,sc=F,qo=null);break;case"focusout":qo=sc=js=null;break;case"mousedown":oc=!0;break;case"contextmenu":case"mouseup":case"dragend":oc=!1,gf(W,o,q);break;case"selectionchange":if(uv)break;case"keydown":case"keyup":gf(W,o,q)}var he;if(at)e:{switch(n){case"compositionstart":var ge="onCompositionStart";break e;case"compositionend":ge="onCompositionEnd";break e;case"compositionupdate":ge="onCompositionUpdate";break e}ge=void 0}else Us?rf(n,o)&&(ge="onCompositionEnd"):n==="keydown"&&o.keyCode===229&&(ge="onCompositionStart");ge&&(ji&&o.locale!=="ko"&&(Us||ge!=="onCompositionStart"?ge==="onCompositionEnd"&&Us&&(he=bo()):(nn=q,Ns="value"in nn?nn.value:nn.textContent,Us=!0)),ce=pl(F,ge),0<ce.length&&(ge=new jo(ge,n,null,o,q),W.push({event:ge,listeners:ce}),he?ge.data=he:(he=sf(o),he!==null&&(ge.data=he)))),(he=rn?J_(n,o):Z_(n,o))&&(F=pl(F,"onBeforeInput"),0<F.length&&(q=new jo("onBeforeInput","beforeinput",null,o,q),W.push({event:q,listeners:F}),q.data=he))}Af(W,r)})}function Ko(n,r,o){return{instance:n,listener:r,currentTarget:o}}function pl(n,r){for(var o=r+"Capture",c=[];n!==null;){var d=n,p=d.stateNode;d.tag===5&&p!==null&&(d=p,p=Ge(n,o),p!=null&&c.unshift(Ko(n,p,d)),p=Ge(n,r),p!=null&&c.push(Ko(n,p,d))),n=n.return}return c}function Bs(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function kf(n,r,o,c,d){for(var p=r._reactName,_=[];o!==null&&o!==c;){var I=o,R=I.alternate,F=I.stateNode;if(R!==null&&R===c)break;I.tag===5&&F!==null&&(I=F,d?(R=Ge(o,p),R!=null&&_.unshift(Ko(o,R,I))):d||(R=Ge(o,p),R!=null&&_.push(Ko(o,R,I)))),o=o.return}_.length!==0&&n.push({event:r,listeners:_})}var fv=/\r\n?/g,pv=/\u0000|\uFFFD/g;function Cf(n){return(typeof n=="string"?n:""+n).replace(fv,`
`).replace(pv,"")}function ml(n,r,o){if(r=Cf(r),Cf(n)!==r&&o)throw Error(t(425))}function gl(){}var dc=null,fc=null;function pc(n,r){return n==="textarea"||n==="noscript"||typeof r.children=="string"||typeof r.children=="number"||typeof r.dangerouslySetInnerHTML=="object"&&r.dangerouslySetInnerHTML!==null&&r.dangerouslySetInnerHTML.__html!=null}var mc=typeof setTimeout=="function"?setTimeout:void 0,mv=typeof clearTimeout=="function"?clearTimeout:void 0,Pf=typeof Promise=="function"?Promise:void 0,gv=typeof queueMicrotask=="function"?queueMicrotask:typeof Pf<"u"?function(n){return Pf.resolve(null).then(n).catch(yv)}:mc;function yv(n){setTimeout(function(){throw n})}function gc(n,r){var o=r,c=0;do{var d=o.nextSibling;if(n.removeChild(o),d&&d.nodeType===8)if(o=d.data,o==="/$"){if(c===0){n.removeChild(d),Cn(r);return}c--}else o!=="$"&&o!=="$?"&&o!=="$!"||c++;o=d}while(o);Cn(r)}function Wr(n){for(;n!=null;n=n.nextSibling){var r=n.nodeType;if(r===1||r===3)break;if(r===8){if(r=n.data,r==="$"||r==="$!"||r==="$?")break;if(r==="/$")return null}}return n}function Nf(n){n=n.previousSibling;for(var r=0;n;){if(n.nodeType===8){var o=n.data;if(o==="$"||o==="$!"||o==="$?"){if(r===0)return n;r--}else o==="/$"&&r++}n=n.previousSibling}return null}var $s=Math.random().toString(36).slice(2),Gn="__reactFiber$"+$s,Go="__reactProps$"+$s,yr="__reactContainer$"+$s,yc="__reactEvents$"+$s,_v="__reactListeners$"+$s,vv="__reactHandles$"+$s;function zi(n){var r=n[Gn];if(r)return r;for(var o=n.parentNode;o;){if(r=o[yr]||o[Gn]){if(o=r.alternate,r.child!==null||o!==null&&o.child!==null)for(n=Nf(n);n!==null;){if(o=n[Gn])return o;n=Nf(n)}return r}n=o,o=n.parentNode}return null}function Qo(n){return n=n[Gn]||n[yr],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function qs(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function yl(n){return n[Go]||null}var _c=[],Hs=-1;function Kr(n){return{current:n}}function We(n){0>Hs||(n.current=_c[Hs],_c[Hs]=null,Hs--)}function qe(n,r){Hs++,_c[Hs]=n.current,n.current=r}var Gr={},Nt=Kr(Gr),Wt=Kr(!1),Bi=Gr;function Ws(n,r){var o=n.type.contextTypes;if(!o)return Gr;var c=n.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===r)return c.__reactInternalMemoizedMaskedChildContext;var d={},p;for(p in o)d[p]=r[p];return c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=r,n.__reactInternalMemoizedMaskedChildContext=d),d}function Kt(n){return n=n.childContextTypes,n!=null}function _l(){We(Wt),We(Nt)}function Df(n,r,o){if(Nt.current!==Gr)throw Error(t(168));qe(Nt,r),qe(Wt,o)}function Of(n,r,o){var c=n.stateNode;if(r=r.childContextTypes,typeof c.getChildContext!="function")return o;c=c.getChildContext();for(var d in c)if(!(d in r))throw Error(t(108,Ve(n)||"Unknown",d));return ee({},o,c)}function vl(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||Gr,Bi=Nt.current,qe(Nt,n),qe(Wt,Wt.current),!0}function Vf(n,r,o){var c=n.stateNode;if(!c)throw Error(t(169));o?(n=Of(n,r,Bi),c.__reactInternalMemoizedMergedChildContext=n,We(Wt),We(Nt),qe(Nt,n)):We(Wt),qe(Wt,o)}var _r=null,El=!1,vc=!1;function xf(n){_r===null?_r=[n]:_r.push(n)}function Ev(n){El=!0,xf(n)}function Qr(){if(!vc&&_r!==null){vc=!0;var n=0,r=Re;try{var o=_r;for(Re=1;n<o.length;n++){var c=o[n];do c=c(!0);while(c!==null)}_r=null,El=!1}catch(d){throw _r!==null&&(_r=_r.slice(n+1)),As(Vi,Qr),d}finally{Re=r,vc=!1}}return null}var Ks=[],Gs=0,wl=null,Tl=0,dn=[],fn=0,$i=null,vr=1,Er="";function qi(n,r){Ks[Gs++]=Tl,Ks[Gs++]=wl,wl=n,Tl=r}function Lf(n,r,o){dn[fn++]=vr,dn[fn++]=Er,dn[fn++]=$i,$i=n;var c=vr;n=Er;var d=32-jt(c)-1;c&=~(1<<d),o+=1;var p=32-jt(r)+d;if(30<p){var _=d-d%5;p=(c&(1<<_)-1).toString(32),c>>=_,d-=_,vr=1<<32-jt(r)+d|o<<d|c,Er=p+n}else vr=1<<p|o<<d|c,Er=n}function Ec(n){n.return!==null&&(qi(n,1),Lf(n,1,0))}function wc(n){for(;n===wl;)wl=Ks[--Gs],Ks[Gs]=null,Tl=Ks[--Gs],Ks[Gs]=null;for(;n===$i;)$i=dn[--fn],dn[fn]=null,Er=dn[--fn],dn[fn]=null,vr=dn[--fn],dn[fn]=null}var sn=null,on=null,Ye=!1,Dn=null;function Mf(n,r){var o=yn(5,null,null,0);o.elementType="DELETED",o.stateNode=r,o.return=n,r=n.deletions,r===null?(n.deletions=[o],n.flags|=16):r.push(o)}function bf(n,r){switch(n.tag){case 5:var o=n.type;return r=r.nodeType!==1||o.toLowerCase()!==r.nodeName.toLowerCase()?null:r,r!==null?(n.stateNode=r,sn=n,on=Wr(r.firstChild),!0):!1;case 6:return r=n.pendingProps===""||r.nodeType!==3?null:r,r!==null?(n.stateNode=r,sn=n,on=null,!0):!1;case 13:return r=r.nodeType!==8?null:r,r!==null?(o=$i!==null?{id:vr,overflow:Er}:null,n.memoizedState={dehydrated:r,treeContext:o,retryLane:1073741824},o=yn(18,null,null,0),o.stateNode=r,o.return=n,n.child=o,sn=n,on=null,!0):!1;default:return!1}}function Tc(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Ic(n){if(Ye){var r=on;if(r){var o=r;if(!bf(n,r)){if(Tc(n))throw Error(t(418));r=Wr(o.nextSibling);var c=sn;r&&bf(n,r)?Mf(c,o):(n.flags=n.flags&-4097|2,Ye=!1,sn=n)}}else{if(Tc(n))throw Error(t(418));n.flags=n.flags&-4097|2,Ye=!1,sn=n}}}function Ff(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;sn=n}function Il(n){if(n!==sn)return!1;if(!Ye)return Ff(n),Ye=!0,!1;var r;if((r=n.tag!==3)&&!(r=n.tag!==5)&&(r=n.type,r=r!=="head"&&r!=="body"&&!pc(n.type,n.memoizedProps)),r&&(r=on)){if(Tc(n))throw Uf(),Error(t(418));for(;r;)Mf(n,r),r=Wr(r.nextSibling)}if(Ff(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,r=0;n;){if(n.nodeType===8){var o=n.data;if(o==="/$"){if(r===0){on=Wr(n.nextSibling);break e}r--}else o!=="$"&&o!=="$!"&&o!=="$?"||r++}n=n.nextSibling}on=null}}else on=sn?Wr(n.stateNode.nextSibling):null;return!0}function Uf(){for(var n=on;n;)n=Wr(n.nextSibling)}function Qs(){on=sn=null,Ye=!1}function Sc(n){Dn===null?Dn=[n]:Dn.push(n)}var wv=fe.ReactCurrentBatchConfig;function Yo(n,r,o){if(n=o.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(t(309));var c=o.stateNode}if(!c)throw Error(t(147,n));var d=c,p=""+n;return r!==null&&r.ref!==null&&typeof r.ref=="function"&&r.ref._stringRef===p?r.ref:(r=function(_){var I=d.refs;_===null?delete I[p]:I[p]=_},r._stringRef=p,r)}if(typeof n!="string")throw Error(t(284));if(!o._owner)throw Error(t(290,n))}return n}function Sl(n,r){throw n=Object.prototype.toString.call(r),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(r).join(", ")+"}":n))}function jf(n){var r=n._init;return r(n._payload)}function zf(n){function r(L,C){if(n){var M=L.deletions;M===null?(L.deletions=[C],L.flags|=16):M.push(C)}}function o(L,C){if(!n)return null;for(;C!==null;)r(L,C),C=C.sibling;return null}function c(L,C){for(L=new Map;C!==null;)C.key!==null?L.set(C.key,C):L.set(C.index,C),C=C.sibling;return L}function d(L,C){return L=ri(L,C),L.index=0,L.sibling=null,L}function p(L,C,M){return L.index=M,n?(M=L.alternate,M!==null?(M=M.index,M<C?(L.flags|=2,C):M):(L.flags|=2,C)):(L.flags|=1048576,C)}function _(L){return n&&L.alternate===null&&(L.flags|=2),L}function I(L,C,M,K){return C===null||C.tag!==6?(C=mh(M,L.mode,K),C.return=L,C):(C=d(C,M),C.return=L,C)}function R(L,C,M,K){var oe=M.type;return oe===P?q(L,C,M.props.children,K,M.key):C!==null&&(C.elementType===oe||typeof oe=="object"&&oe!==null&&oe.$$typeof===Tt&&jf(oe)===C.type)?(K=d(C,M.props),K.ref=Yo(L,C,M),K.return=L,K):(K=Gl(M.type,M.key,M.props,null,L.mode,K),K.ref=Yo(L,C,M),K.return=L,K)}function F(L,C,M,K){return C===null||C.tag!==4||C.stateNode.containerInfo!==M.containerInfo||C.stateNode.implementation!==M.implementation?(C=gh(M,L.mode,K),C.return=L,C):(C=d(C,M.children||[]),C.return=L,C)}function q(L,C,M,K,oe){return C===null||C.tag!==7?(C=Ji(M,L.mode,K,oe),C.return=L,C):(C=d(C,M),C.return=L,C)}function W(L,C,M){if(typeof C=="string"&&C!==""||typeof C=="number")return C=mh(""+C,L.mode,M),C.return=L,C;if(typeof C=="object"&&C!==null){switch(C.$$typeof){case Me:return M=Gl(C.type,C.key,C.props,null,L.mode,M),M.ref=Yo(L,null,C),M.return=L,M;case ve:return C=gh(C,L.mode,M),C.return=L,C;case Tt:var K=C._init;return W(L,K(C._payload),M)}if(jn(C)||le(C))return C=Ji(C,L.mode,M,null),C.return=L,C;Sl(L,C)}return null}function $(L,C,M,K){var oe=C!==null?C.key:null;if(typeof M=="string"&&M!==""||typeof M=="number")return oe!==null?null:I(L,C,""+M,K);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case Me:return M.key===oe?R(L,C,M,K):null;case ve:return M.key===oe?F(L,C,M,K):null;case Tt:return oe=M._init,$(L,C,oe(M._payload),K)}if(jn(M)||le(M))return oe!==null?null:q(L,C,M,K,null);Sl(L,M)}return null}function Z(L,C,M,K,oe){if(typeof K=="string"&&K!==""||typeof K=="number")return L=L.get(M)||null,I(C,L,""+K,oe);if(typeof K=="object"&&K!==null){switch(K.$$typeof){case Me:return L=L.get(K.key===null?M:K.key)||null,R(C,L,K,oe);case ve:return L=L.get(K.key===null?M:K.key)||null,F(C,L,K,oe);case Tt:var ce=K._init;return Z(L,C,M,ce(K._payload),oe)}if(jn(K)||le(K))return L=L.get(M)||null,q(C,L,K,oe,null);Sl(C,K)}return null}function ne(L,C,M,K){for(var oe=null,ce=null,he=C,ge=C=0,vt=null;he!==null&&ge<M.length;ge++){he.index>ge?(vt=he,he=null):vt=he.sibling;var Le=$(L,he,M[ge],K);if(Le===null){he===null&&(he=vt);break}n&&he&&Le.alternate===null&&r(L,he),C=p(Le,C,ge),ce===null?oe=Le:ce.sibling=Le,ce=Le,he=vt}if(ge===M.length)return o(L,he),Ye&&qi(L,ge),oe;if(he===null){for(;ge<M.length;ge++)he=W(L,M[ge],K),he!==null&&(C=p(he,C,ge),ce===null?oe=he:ce.sibling=he,ce=he);return Ye&&qi(L,ge),oe}for(he=c(L,he);ge<M.length;ge++)vt=Z(he,L,ge,M[ge],K),vt!==null&&(n&&vt.alternate!==null&&he.delete(vt.key===null?ge:vt.key),C=p(vt,C,ge),ce===null?oe=vt:ce.sibling=vt,ce=vt);return n&&he.forEach(function(ii){return r(L,ii)}),Ye&&qi(L,ge),oe}function re(L,C,M,K){var oe=le(M);if(typeof oe!="function")throw Error(t(150));if(M=oe.call(M),M==null)throw Error(t(151));for(var ce=oe=null,he=C,ge=C=0,vt=null,Le=M.next();he!==null&&!Le.done;ge++,Le=M.next()){he.index>ge?(vt=he,he=null):vt=he.sibling;var ii=$(L,he,Le.value,K);if(ii===null){he===null&&(he=vt);break}n&&he&&ii.alternate===null&&r(L,he),C=p(ii,C,ge),ce===null?oe=ii:ce.sibling=ii,ce=ii,he=vt}if(Le.done)return o(L,he),Ye&&qi(L,ge),oe;if(he===null){for(;!Le.done;ge++,Le=M.next())Le=W(L,Le.value,K),Le!==null&&(C=p(Le,C,ge),ce===null?oe=Le:ce.sibling=Le,ce=Le);return Ye&&qi(L,ge),oe}for(he=c(L,he);!Le.done;ge++,Le=M.next())Le=Z(he,L,ge,Le.value,K),Le!==null&&(n&&Le.alternate!==null&&he.delete(Le.key===null?ge:Le.key),C=p(Le,C,ge),ce===null?oe=Le:ce.sibling=Le,ce=Le);return n&&he.forEach(function(eE){return r(L,eE)}),Ye&&qi(L,ge),oe}function nt(L,C,M,K){if(typeof M=="object"&&M!==null&&M.type===P&&M.key===null&&(M=M.props.children),typeof M=="object"&&M!==null){switch(M.$$typeof){case Me:e:{for(var oe=M.key,ce=C;ce!==null;){if(ce.key===oe){if(oe=M.type,oe===P){if(ce.tag===7){o(L,ce.sibling),C=d(ce,M.props.children),C.return=L,L=C;break e}}else if(ce.elementType===oe||typeof oe=="object"&&oe!==null&&oe.$$typeof===Tt&&jf(oe)===ce.type){o(L,ce.sibling),C=d(ce,M.props),C.ref=Yo(L,ce,M),C.return=L,L=C;break e}o(L,ce);break}else r(L,ce);ce=ce.sibling}M.type===P?(C=Ji(M.props.children,L.mode,K,M.key),C.return=L,L=C):(K=Gl(M.type,M.key,M.props,null,L.mode,K),K.ref=Yo(L,C,M),K.return=L,L=K)}return _(L);case ve:e:{for(ce=M.key;C!==null;){if(C.key===ce)if(C.tag===4&&C.stateNode.containerInfo===M.containerInfo&&C.stateNode.implementation===M.implementation){o(L,C.sibling),C=d(C,M.children||[]),C.return=L,L=C;break e}else{o(L,C);break}else r(L,C);C=C.sibling}C=gh(M,L.mode,K),C.return=L,L=C}return _(L);case Tt:return ce=M._init,nt(L,C,ce(M._payload),K)}if(jn(M))return ne(L,C,M,K);if(le(M))return re(L,C,M,K);Sl(L,M)}return typeof M=="string"&&M!==""||typeof M=="number"?(M=""+M,C!==null&&C.tag===6?(o(L,C.sibling),C=d(C,M),C.return=L,L=C):(o(L,C),C=mh(M,L.mode,K),C.return=L,L=C),_(L)):o(L,C)}return nt}var Ys=zf(!0),Bf=zf(!1),Al=Kr(null),Rl=null,Xs=null,Ac=null;function Rc(){Ac=Xs=Rl=null}function kc(n){var r=Al.current;We(Al),n._currentValue=r}function Cc(n,r,o){for(;n!==null;){var c=n.alternate;if((n.childLanes&r)!==r?(n.childLanes|=r,c!==null&&(c.childLanes|=r)):c!==null&&(c.childLanes&r)!==r&&(c.childLanes|=r),n===o)break;n=n.return}}function Js(n,r){Rl=n,Ac=Xs=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&r)!==0&&(Gt=!0),n.firstContext=null)}function pn(n){var r=n._currentValue;if(Ac!==n)if(n={context:n,memoizedValue:r,next:null},Xs===null){if(Rl===null)throw Error(t(308));Xs=n,Rl.dependencies={lanes:0,firstContext:n}}else Xs=Xs.next=n;return r}var Hi=null;function Pc(n){Hi===null?Hi=[n]:Hi.push(n)}function $f(n,r,o,c){var d=r.interleaved;return d===null?(o.next=o,Pc(r)):(o.next=d.next,d.next=o),r.interleaved=o,wr(n,c)}function wr(n,r){n.lanes|=r;var o=n.alternate;for(o!==null&&(o.lanes|=r),o=n,n=n.return;n!==null;)n.childLanes|=r,o=n.alternate,o!==null&&(o.childLanes|=r),o=n,n=n.return;return o.tag===3?o.stateNode:null}var Yr=!1;function Nc(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function qf(n,r){n=n.updateQueue,r.updateQueue===n&&(r.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Tr(n,r){return{eventTime:n,lane:r,tag:0,payload:null,callback:null,next:null}}function Xr(n,r,o){var c=n.updateQueue;if(c===null)return null;if(c=c.shared,(De&2)!==0){var d=c.pending;return d===null?r.next=r:(r.next=d.next,d.next=r),c.pending=r,wr(n,o)}return d=c.interleaved,d===null?(r.next=r,Pc(c)):(r.next=d.next,d.next=r),c.interleaved=r,wr(n,o)}function kl(n,r,o){if(r=r.updateQueue,r!==null&&(r=r.shared,(o&4194240)!==0)){var c=r.lanes;c&=n.pendingLanes,o|=c,r.lanes=o,jr(n,o)}}function Hf(n,r){var o=n.updateQueue,c=n.alternate;if(c!==null&&(c=c.updateQueue,o===c)){var d=null,p=null;if(o=o.firstBaseUpdate,o!==null){do{var _={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};p===null?d=p=_:p=p.next=_,o=o.next}while(o!==null);p===null?d=p=r:p=p.next=r}else d=p=r;o={baseState:c.baseState,firstBaseUpdate:d,lastBaseUpdate:p,shared:c.shared,effects:c.effects},n.updateQueue=o;return}n=o.lastBaseUpdate,n===null?o.firstBaseUpdate=r:n.next=r,o.lastBaseUpdate=r}function Cl(n,r,o,c){var d=n.updateQueue;Yr=!1;var p=d.firstBaseUpdate,_=d.lastBaseUpdate,I=d.shared.pending;if(I!==null){d.shared.pending=null;var R=I,F=R.next;R.next=null,_===null?p=F:_.next=F,_=R;var q=n.alternate;q!==null&&(q=q.updateQueue,I=q.lastBaseUpdate,I!==_&&(I===null?q.firstBaseUpdate=F:I.next=F,q.lastBaseUpdate=R))}if(p!==null){var W=d.baseState;_=0,q=F=R=null,I=p;do{var $=I.lane,Z=I.eventTime;if((c&$)===$){q!==null&&(q=q.next={eventTime:Z,lane:0,tag:I.tag,payload:I.payload,callback:I.callback,next:null});e:{var ne=n,re=I;switch($=r,Z=o,re.tag){case 1:if(ne=re.payload,typeof ne=="function"){W=ne.call(Z,W,$);break e}W=ne;break e;case 3:ne.flags=ne.flags&-65537|128;case 0:if(ne=re.payload,$=typeof ne=="function"?ne.call(Z,W,$):ne,$==null)break e;W=ee({},W,$);break e;case 2:Yr=!0}}I.callback!==null&&I.lane!==0&&(n.flags|=64,$=d.effects,$===null?d.effects=[I]:$.push(I))}else Z={eventTime:Z,lane:$,tag:I.tag,payload:I.payload,callback:I.callback,next:null},q===null?(F=q=Z,R=W):q=q.next=Z,_|=$;if(I=I.next,I===null){if(I=d.shared.pending,I===null)break;$=I,I=$.next,$.next=null,d.lastBaseUpdate=$,d.shared.pending=null}}while(!0);if(q===null&&(R=W),d.baseState=R,d.firstBaseUpdate=F,d.lastBaseUpdate=q,r=d.shared.interleaved,r!==null){d=r;do _|=d.lane,d=d.next;while(d!==r)}else p===null&&(d.shared.lanes=0);Gi|=_,n.lanes=_,n.memoizedState=W}}function Wf(n,r,o){if(n=r.effects,r.effects=null,n!==null)for(r=0;r<n.length;r++){var c=n[r],d=c.callback;if(d!==null){if(c.callback=null,c=o,typeof d!="function")throw Error(t(191,d));d.call(c)}}}var Xo={},Qn=Kr(Xo),Jo=Kr(Xo),Zo=Kr(Xo);function Wi(n){if(n===Xo)throw Error(t(174));return n}function Dc(n,r){switch(qe(Zo,r),qe(Jo,n),qe(Qn,Xo),n=r.nodeType,n){case 9:case 11:r=(r=r.documentElement)?r.namespaceURI:ot(null,"");break;default:n=n===8?r.parentNode:r,r=n.namespaceURI||null,n=n.tagName,r=ot(r,n)}We(Qn),qe(Qn,r)}function Zs(){We(Qn),We(Jo),We(Zo)}function Kf(n){Wi(Zo.current);var r=Wi(Qn.current),o=ot(r,n.type);r!==o&&(qe(Jo,n),qe(Qn,o))}function Oc(n){Jo.current===n&&(We(Qn),We(Jo))}var Xe=Kr(0);function Pl(n){for(var r=n;r!==null;){if(r.tag===13){var o=r.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return r}else if(r.tag===19&&r.memoizedProps.revealOrder!==void 0){if((r.flags&128)!==0)return r}else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===n)break;for(;r.sibling===null;){if(r.return===null||r.return===n)return null;r=r.return}r.sibling.return=r.return,r=r.sibling}return null}var Vc=[];function xc(){for(var n=0;n<Vc.length;n++)Vc[n]._workInProgressVersionPrimary=null;Vc.length=0}var Nl=fe.ReactCurrentDispatcher,Lc=fe.ReactCurrentBatchConfig,Ki=0,Je=null,ft=null,yt=null,Dl=!1,ea=!1,ta=0,Tv=0;function Dt(){throw Error(t(321))}function Mc(n,r){if(r===null)return!1;for(var o=0;o<r.length&&o<n.length;o++)if(!Nn(n[o],r[o]))return!1;return!0}function bc(n,r,o,c,d,p){if(Ki=p,Je=r,r.memoizedState=null,r.updateQueue=null,r.lanes=0,Nl.current=n===null||n.memoizedState===null?Rv:kv,n=o(c,d),ea){p=0;do{if(ea=!1,ta=0,25<=p)throw Error(t(301));p+=1,yt=ft=null,r.updateQueue=null,Nl.current=Cv,n=o(c,d)}while(ea)}if(Nl.current=xl,r=ft!==null&&ft.next!==null,Ki=0,yt=ft=Je=null,Dl=!1,r)throw Error(t(300));return n}function Fc(){var n=ta!==0;return ta=0,n}function Yn(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return yt===null?Je.memoizedState=yt=n:yt=yt.next=n,yt}function mn(){if(ft===null){var n=Je.alternate;n=n!==null?n.memoizedState:null}else n=ft.next;var r=yt===null?Je.memoizedState:yt.next;if(r!==null)yt=r,ft=n;else{if(n===null)throw Error(t(310));ft=n,n={memoizedState:ft.memoizedState,baseState:ft.baseState,baseQueue:ft.baseQueue,queue:ft.queue,next:null},yt===null?Je.memoizedState=yt=n:yt=yt.next=n}return yt}function na(n,r){return typeof r=="function"?r(n):r}function Uc(n){var r=mn(),o=r.queue;if(o===null)throw Error(t(311));o.lastRenderedReducer=n;var c=ft,d=c.baseQueue,p=o.pending;if(p!==null){if(d!==null){var _=d.next;d.next=p.next,p.next=_}c.baseQueue=d=p,o.pending=null}if(d!==null){p=d.next,c=c.baseState;var I=_=null,R=null,F=p;do{var q=F.lane;if((Ki&q)===q)R!==null&&(R=R.next={lane:0,action:F.action,hasEagerState:F.hasEagerState,eagerState:F.eagerState,next:null}),c=F.hasEagerState?F.eagerState:n(c,F.action);else{var W={lane:q,action:F.action,hasEagerState:F.hasEagerState,eagerState:F.eagerState,next:null};R===null?(I=R=W,_=c):R=R.next=W,Je.lanes|=q,Gi|=q}F=F.next}while(F!==null&&F!==p);R===null?_=c:R.next=I,Nn(c,r.memoizedState)||(Gt=!0),r.memoizedState=c,r.baseState=_,r.baseQueue=R,o.lastRenderedState=c}if(n=o.interleaved,n!==null){d=n;do p=d.lane,Je.lanes|=p,Gi|=p,d=d.next;while(d!==n)}else d===null&&(o.lanes=0);return[r.memoizedState,o.dispatch]}function jc(n){var r=mn(),o=r.queue;if(o===null)throw Error(t(311));o.lastRenderedReducer=n;var c=o.dispatch,d=o.pending,p=r.memoizedState;if(d!==null){o.pending=null;var _=d=d.next;do p=n(p,_.action),_=_.next;while(_!==d);Nn(p,r.memoizedState)||(Gt=!0),r.memoizedState=p,r.baseQueue===null&&(r.baseState=p),o.lastRenderedState=p}return[p,c]}function Gf(){}function Qf(n,r){var o=Je,c=mn(),d=r(),p=!Nn(c.memoizedState,d);if(p&&(c.memoizedState=d,Gt=!0),c=c.queue,zc(Jf.bind(null,o,c,n),[n]),c.getSnapshot!==r||p||yt!==null&&yt.memoizedState.tag&1){if(o.flags|=2048,ra(9,Xf.bind(null,o,c,d,r),void 0,null),_t===null)throw Error(t(349));(Ki&30)!==0||Yf(o,r,d)}return d}function Yf(n,r,o){n.flags|=16384,n={getSnapshot:r,value:o},r=Je.updateQueue,r===null?(r={lastEffect:null,stores:null},Je.updateQueue=r,r.stores=[n]):(o=r.stores,o===null?r.stores=[n]:o.push(n))}function Xf(n,r,o,c){r.value=o,r.getSnapshot=c,Zf(r)&&ep(n)}function Jf(n,r,o){return o(function(){Zf(r)&&ep(n)})}function Zf(n){var r=n.getSnapshot;n=n.value;try{var o=r();return!Nn(n,o)}catch{return!0}}function ep(n){var r=wr(n,1);r!==null&&Ln(r,n,1,-1)}function tp(n){var r=Yn();return typeof n=="function"&&(n=n()),r.memoizedState=r.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:na,lastRenderedState:n},r.queue=n,n=n.dispatch=Av.bind(null,Je,n),[r.memoizedState,n]}function ra(n,r,o,c){return n={tag:n,create:r,destroy:o,deps:c,next:null},r=Je.updateQueue,r===null?(r={lastEffect:null,stores:null},Je.updateQueue=r,r.lastEffect=n.next=n):(o=r.lastEffect,o===null?r.lastEffect=n.next=n:(c=o.next,o.next=n,n.next=c,r.lastEffect=n)),n}function np(){return mn().memoizedState}function Ol(n,r,o,c){var d=Yn();Je.flags|=n,d.memoizedState=ra(1|r,o,void 0,c===void 0?null:c)}function Vl(n,r,o,c){var d=mn();c=c===void 0?null:c;var p=void 0;if(ft!==null){var _=ft.memoizedState;if(p=_.destroy,c!==null&&Mc(c,_.deps)){d.memoizedState=ra(r,o,p,c);return}}Je.flags|=n,d.memoizedState=ra(1|r,o,p,c)}function rp(n,r){return Ol(8390656,8,n,r)}function zc(n,r){return Vl(2048,8,n,r)}function ip(n,r){return Vl(4,2,n,r)}function sp(n,r){return Vl(4,4,n,r)}function op(n,r){if(typeof r=="function")return n=n(),r(n),function(){r(null)};if(r!=null)return n=n(),r.current=n,function(){r.current=null}}function ap(n,r,o){return o=o!=null?o.concat([n]):null,Vl(4,4,op.bind(null,r,n),o)}function Bc(){}function lp(n,r){var o=mn();r=r===void 0?null:r;var c=o.memoizedState;return c!==null&&r!==null&&Mc(r,c[1])?c[0]:(o.memoizedState=[n,r],n)}function up(n,r){var o=mn();r=r===void 0?null:r;var c=o.memoizedState;return c!==null&&r!==null&&Mc(r,c[1])?c[0]:(n=n(),o.memoizedState=[n,r],n)}function cp(n,r,o){return(Ki&21)===0?(n.baseState&&(n.baseState=!1,Gt=!0),n.memoizedState=o):(Nn(o,r)||(o=Mi(),Je.lanes|=o,Gi|=o,n.baseState=!0),r)}function Iv(n,r){var o=Re;Re=o!==0&&4>o?o:4,n(!0);var c=Lc.transition;Lc.transition={};try{n(!1),r()}finally{Re=o,Lc.transition=c}}function hp(){return mn().memoizedState}function Sv(n,r,o){var c=ti(n);if(o={lane:c,action:o,hasEagerState:!1,eagerState:null,next:null},dp(n))fp(r,o);else if(o=$f(n,r,o,c),o!==null){var d=$t();Ln(o,n,c,d),pp(o,r,c)}}function Av(n,r,o){var c=ti(n),d={lane:c,action:o,hasEagerState:!1,eagerState:null,next:null};if(dp(n))fp(r,d);else{var p=n.alternate;if(n.lanes===0&&(p===null||p.lanes===0)&&(p=r.lastRenderedReducer,p!==null))try{var _=r.lastRenderedState,I=p(_,o);if(d.hasEagerState=!0,d.eagerState=I,Nn(I,_)){var R=r.interleaved;R===null?(d.next=d,Pc(r)):(d.next=R.next,R.next=d),r.interleaved=d;return}}catch{}finally{}o=$f(n,r,d,c),o!==null&&(d=$t(),Ln(o,n,c,d),pp(o,r,c))}}function dp(n){var r=n.alternate;return n===Je||r!==null&&r===Je}function fp(n,r){ea=Dl=!0;var o=n.pending;o===null?r.next=r:(r.next=o.next,o.next=r),n.pending=r}function pp(n,r,o){if((o&4194240)!==0){var c=r.lanes;c&=n.pendingLanes,o|=c,r.lanes=o,jr(n,o)}}var xl={readContext:pn,useCallback:Dt,useContext:Dt,useEffect:Dt,useImperativeHandle:Dt,useInsertionEffect:Dt,useLayoutEffect:Dt,useMemo:Dt,useReducer:Dt,useRef:Dt,useState:Dt,useDebugValue:Dt,useDeferredValue:Dt,useTransition:Dt,useMutableSource:Dt,useSyncExternalStore:Dt,useId:Dt,unstable_isNewReconciler:!1},Rv={readContext:pn,useCallback:function(n,r){return Yn().memoizedState=[n,r===void 0?null:r],n},useContext:pn,useEffect:rp,useImperativeHandle:function(n,r,o){return o=o!=null?o.concat([n]):null,Ol(4194308,4,op.bind(null,r,n),o)},useLayoutEffect:function(n,r){return Ol(4194308,4,n,r)},useInsertionEffect:function(n,r){return Ol(4,2,n,r)},useMemo:function(n,r){var o=Yn();return r=r===void 0?null:r,n=n(),o.memoizedState=[n,r],n},useReducer:function(n,r,o){var c=Yn();return r=o!==void 0?o(r):r,c.memoizedState=c.baseState=r,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:r},c.queue=n,n=n.dispatch=Sv.bind(null,Je,n),[c.memoizedState,n]},useRef:function(n){var r=Yn();return n={current:n},r.memoizedState=n},useState:tp,useDebugValue:Bc,useDeferredValue:function(n){return Yn().memoizedState=n},useTransition:function(){var n=tp(!1),r=n[0];return n=Iv.bind(null,n[1]),Yn().memoizedState=n,[r,n]},useMutableSource:function(){},useSyncExternalStore:function(n,r,o){var c=Je,d=Yn();if(Ye){if(o===void 0)throw Error(t(407));o=o()}else{if(o=r(),_t===null)throw Error(t(349));(Ki&30)!==0||Yf(c,r,o)}d.memoizedState=o;var p={value:o,getSnapshot:r};return d.queue=p,rp(Jf.bind(null,c,p,n),[n]),c.flags|=2048,ra(9,Xf.bind(null,c,p,o,r),void 0,null),o},useId:function(){var n=Yn(),r=_t.identifierPrefix;if(Ye){var o=Er,c=vr;o=(c&~(1<<32-jt(c)-1)).toString(32)+o,r=":"+r+"R"+o,o=ta++,0<o&&(r+="H"+o.toString(32)),r+=":"}else o=Tv++,r=":"+r+"r"+o.toString(32)+":";return n.memoizedState=r},unstable_isNewReconciler:!1},kv={readContext:pn,useCallback:lp,useContext:pn,useEffect:zc,useImperativeHandle:ap,useInsertionEffect:ip,useLayoutEffect:sp,useMemo:up,useReducer:Uc,useRef:np,useState:function(){return Uc(na)},useDebugValue:Bc,useDeferredValue:function(n){var r=mn();return cp(r,ft.memoizedState,n)},useTransition:function(){var n=Uc(na)[0],r=mn().memoizedState;return[n,r]},useMutableSource:Gf,useSyncExternalStore:Qf,useId:hp,unstable_isNewReconciler:!1},Cv={readContext:pn,useCallback:lp,useContext:pn,useEffect:zc,useImperativeHandle:ap,useInsertionEffect:ip,useLayoutEffect:sp,useMemo:up,useReducer:jc,useRef:np,useState:function(){return jc(na)},useDebugValue:Bc,useDeferredValue:function(n){var r=mn();return ft===null?r.memoizedState=n:cp(r,ft.memoizedState,n)},useTransition:function(){var n=jc(na)[0],r=mn().memoizedState;return[n,r]},useMutableSource:Gf,useSyncExternalStore:Qf,useId:hp,unstable_isNewReconciler:!1};function On(n,r){if(n&&n.defaultProps){r=ee({},r),n=n.defaultProps;for(var o in n)r[o]===void 0&&(r[o]=n[o]);return r}return r}function $c(n,r,o,c){r=n.memoizedState,o=o(c,r),o=o==null?r:ee({},r,o),n.memoizedState=o,n.lanes===0&&(n.updateQueue.baseState=o)}var Ll={isMounted:function(n){return(n=n._reactInternals)?In(n)===n:!1},enqueueSetState:function(n,r,o){n=n._reactInternals;var c=$t(),d=ti(n),p=Tr(c,d);p.payload=r,o!=null&&(p.callback=o),r=Xr(n,p,d),r!==null&&(Ln(r,n,d,c),kl(r,n,d))},enqueueReplaceState:function(n,r,o){n=n._reactInternals;var c=$t(),d=ti(n),p=Tr(c,d);p.tag=1,p.payload=r,o!=null&&(p.callback=o),r=Xr(n,p,d),r!==null&&(Ln(r,n,d,c),kl(r,n,d))},enqueueForceUpdate:function(n,r){n=n._reactInternals;var o=$t(),c=ti(n),d=Tr(o,c);d.tag=2,r!=null&&(d.callback=r),r=Xr(n,d,c),r!==null&&(Ln(r,n,c,o),kl(r,n,c))}};function mp(n,r,o,c,d,p,_){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(c,p,_):r.prototype&&r.prototype.isPureReactComponent?!$o(o,c)||!$o(d,p):!0}function gp(n,r,o){var c=!1,d=Gr,p=r.contextType;return typeof p=="object"&&p!==null?p=pn(p):(d=Kt(r)?Bi:Nt.current,c=r.contextTypes,p=(c=c!=null)?Ws(n,d):Gr),r=new r(o,p),n.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=Ll,n.stateNode=r,r._reactInternals=n,c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=d,n.__reactInternalMemoizedMaskedChildContext=p),r}function yp(n,r,o,c){n=r.state,typeof r.componentWillReceiveProps=="function"&&r.componentWillReceiveProps(o,c),typeof r.UNSAFE_componentWillReceiveProps=="function"&&r.UNSAFE_componentWillReceiveProps(o,c),r.state!==n&&Ll.enqueueReplaceState(r,r.state,null)}function qc(n,r,o,c){var d=n.stateNode;d.props=o,d.state=n.memoizedState,d.refs={},Nc(n);var p=r.contextType;typeof p=="object"&&p!==null?d.context=pn(p):(p=Kt(r)?Bi:Nt.current,d.context=Ws(n,p)),d.state=n.memoizedState,p=r.getDerivedStateFromProps,typeof p=="function"&&($c(n,r,p,o),d.state=n.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(r=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),r!==d.state&&Ll.enqueueReplaceState(d,d.state,null),Cl(n,o,d,c),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308)}function eo(n,r){try{var o="",c=r;do o+=Te(c),c=c.return;while(c);var d=o}catch(p){d=`
Error generating stack: `+p.message+`
`+p.stack}return{value:n,source:r,stack:d,digest:null}}function Hc(n,r,o){return{value:n,source:null,stack:o??null,digest:r??null}}function Wc(n,r){try{console.error(r.value)}catch(o){setTimeout(function(){throw o})}}var Pv=typeof WeakMap=="function"?WeakMap:Map;function _p(n,r,o){o=Tr(-1,o),o.tag=3,o.payload={element:null};var c=r.value;return o.callback=function(){Bl||(Bl=!0,ah=c),Wc(n,r)},o}function vp(n,r,o){o=Tr(-1,o),o.tag=3;var c=n.type.getDerivedStateFromError;if(typeof c=="function"){var d=r.value;o.payload=function(){return c(d)},o.callback=function(){Wc(n,r)}}var p=n.stateNode;return p!==null&&typeof p.componentDidCatch=="function"&&(o.callback=function(){Wc(n,r),typeof c!="function"&&(Zr===null?Zr=new Set([this]):Zr.add(this));var _=r.stack;this.componentDidCatch(r.value,{componentStack:_!==null?_:""})}),o}function Ep(n,r,o){var c=n.pingCache;if(c===null){c=n.pingCache=new Pv;var d=new Set;c.set(r,d)}else d=c.get(r),d===void 0&&(d=new Set,c.set(r,d));d.has(o)||(d.add(o),n=$v.bind(null,n,r,o),r.then(n,n))}function wp(n){do{var r;if((r=n.tag===13)&&(r=n.memoizedState,r=r!==null?r.dehydrated!==null:!0),r)return n;n=n.return}while(n!==null);return null}function Tp(n,r,o,c,d){return(n.mode&1)===0?(n===r?n.flags|=65536:(n.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(r=Tr(-1,1),r.tag=2,Xr(o,r,1))),o.lanes|=1),n):(n.flags|=65536,n.lanes=d,n)}var Nv=fe.ReactCurrentOwner,Gt=!1;function Bt(n,r,o,c){r.child=n===null?Bf(r,null,o,c):Ys(r,n.child,o,c)}function Ip(n,r,o,c,d){o=o.render;var p=r.ref;return Js(r,d),c=bc(n,r,o,c,p,d),o=Fc(),n!==null&&!Gt?(r.updateQueue=n.updateQueue,r.flags&=-2053,n.lanes&=~d,Ir(n,r,d)):(Ye&&o&&Ec(r),r.flags|=1,Bt(n,r,c,d),r.child)}function Sp(n,r,o,c,d){if(n===null){var p=o.type;return typeof p=="function"&&!ph(p)&&p.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(r.tag=15,r.type=p,Ap(n,r,p,c,d)):(n=Gl(o.type,null,c,r,r.mode,d),n.ref=r.ref,n.return=r,r.child=n)}if(p=n.child,(n.lanes&d)===0){var _=p.memoizedProps;if(o=o.compare,o=o!==null?o:$o,o(_,c)&&n.ref===r.ref)return Ir(n,r,d)}return r.flags|=1,n=ri(p,c),n.ref=r.ref,n.return=r,r.child=n}function Ap(n,r,o,c,d){if(n!==null){var p=n.memoizedProps;if($o(p,c)&&n.ref===r.ref)if(Gt=!1,r.pendingProps=c=p,(n.lanes&d)!==0)(n.flags&131072)!==0&&(Gt=!0);else return r.lanes=n.lanes,Ir(n,r,d)}return Kc(n,r,o,c,d)}function Rp(n,r,o){var c=r.pendingProps,d=c.children,p=n!==null?n.memoizedState:null;if(c.mode==="hidden")if((r.mode&1)===0)r.memoizedState={baseLanes:0,cachePool:null,transitions:null},qe(no,an),an|=o;else{if((o&1073741824)===0)return n=p!==null?p.baseLanes|o:o,r.lanes=r.childLanes=1073741824,r.memoizedState={baseLanes:n,cachePool:null,transitions:null},r.updateQueue=null,qe(no,an),an|=n,null;r.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=p!==null?p.baseLanes:o,qe(no,an),an|=c}else p!==null?(c=p.baseLanes|o,r.memoizedState=null):c=o,qe(no,an),an|=c;return Bt(n,r,d,o),r.child}function kp(n,r){var o=r.ref;(n===null&&o!==null||n!==null&&n.ref!==o)&&(r.flags|=512,r.flags|=2097152)}function Kc(n,r,o,c,d){var p=Kt(o)?Bi:Nt.current;return p=Ws(r,p),Js(r,d),o=bc(n,r,o,c,p,d),c=Fc(),n!==null&&!Gt?(r.updateQueue=n.updateQueue,r.flags&=-2053,n.lanes&=~d,Ir(n,r,d)):(Ye&&c&&Ec(r),r.flags|=1,Bt(n,r,o,d),r.child)}function Cp(n,r,o,c,d){if(Kt(o)){var p=!0;vl(r)}else p=!1;if(Js(r,d),r.stateNode===null)bl(n,r),gp(r,o,c),qc(r,o,c,d),c=!0;else if(n===null){var _=r.stateNode,I=r.memoizedProps;_.props=I;var R=_.context,F=o.contextType;typeof F=="object"&&F!==null?F=pn(F):(F=Kt(o)?Bi:Nt.current,F=Ws(r,F));var q=o.getDerivedStateFromProps,W=typeof q=="function"||typeof _.getSnapshotBeforeUpdate=="function";W||typeof _.UNSAFE_componentWillReceiveProps!="function"&&typeof _.componentWillReceiveProps!="function"||(I!==c||R!==F)&&yp(r,_,c,F),Yr=!1;var $=r.memoizedState;_.state=$,Cl(r,c,_,d),R=r.memoizedState,I!==c||$!==R||Wt.current||Yr?(typeof q=="function"&&($c(r,o,q,c),R=r.memoizedState),(I=Yr||mp(r,o,I,c,$,R,F))?(W||typeof _.UNSAFE_componentWillMount!="function"&&typeof _.componentWillMount!="function"||(typeof _.componentWillMount=="function"&&_.componentWillMount(),typeof _.UNSAFE_componentWillMount=="function"&&_.UNSAFE_componentWillMount()),typeof _.componentDidMount=="function"&&(r.flags|=4194308)):(typeof _.componentDidMount=="function"&&(r.flags|=4194308),r.memoizedProps=c,r.memoizedState=R),_.props=c,_.state=R,_.context=F,c=I):(typeof _.componentDidMount=="function"&&(r.flags|=4194308),c=!1)}else{_=r.stateNode,qf(n,r),I=r.memoizedProps,F=r.type===r.elementType?I:On(r.type,I),_.props=F,W=r.pendingProps,$=_.context,R=o.contextType,typeof R=="object"&&R!==null?R=pn(R):(R=Kt(o)?Bi:Nt.current,R=Ws(r,R));var Z=o.getDerivedStateFromProps;(q=typeof Z=="function"||typeof _.getSnapshotBeforeUpdate=="function")||typeof _.UNSAFE_componentWillReceiveProps!="function"&&typeof _.componentWillReceiveProps!="function"||(I!==W||$!==R)&&yp(r,_,c,R),Yr=!1,$=r.memoizedState,_.state=$,Cl(r,c,_,d);var ne=r.memoizedState;I!==W||$!==ne||Wt.current||Yr?(typeof Z=="function"&&($c(r,o,Z,c),ne=r.memoizedState),(F=Yr||mp(r,o,F,c,$,ne,R)||!1)?(q||typeof _.UNSAFE_componentWillUpdate!="function"&&typeof _.componentWillUpdate!="function"||(typeof _.componentWillUpdate=="function"&&_.componentWillUpdate(c,ne,R),typeof _.UNSAFE_componentWillUpdate=="function"&&_.UNSAFE_componentWillUpdate(c,ne,R)),typeof _.componentDidUpdate=="function"&&(r.flags|=4),typeof _.getSnapshotBeforeUpdate=="function"&&(r.flags|=1024)):(typeof _.componentDidUpdate!="function"||I===n.memoizedProps&&$===n.memoizedState||(r.flags|=4),typeof _.getSnapshotBeforeUpdate!="function"||I===n.memoizedProps&&$===n.memoizedState||(r.flags|=1024),r.memoizedProps=c,r.memoizedState=ne),_.props=c,_.state=ne,_.context=R,c=F):(typeof _.componentDidUpdate!="function"||I===n.memoizedProps&&$===n.memoizedState||(r.flags|=4),typeof _.getSnapshotBeforeUpdate!="function"||I===n.memoizedProps&&$===n.memoizedState||(r.flags|=1024),c=!1)}return Gc(n,r,o,c,p,d)}function Gc(n,r,o,c,d,p){kp(n,r);var _=(r.flags&128)!==0;if(!c&&!_)return d&&Vf(r,o,!1),Ir(n,r,p);c=r.stateNode,Nv.current=r;var I=_&&typeof o.getDerivedStateFromError!="function"?null:c.render();return r.flags|=1,n!==null&&_?(r.child=Ys(r,n.child,null,p),r.child=Ys(r,null,I,p)):Bt(n,r,I,p),r.memoizedState=c.state,d&&Vf(r,o,!0),r.child}function Pp(n){var r=n.stateNode;r.pendingContext?Df(n,r.pendingContext,r.pendingContext!==r.context):r.context&&Df(n,r.context,!1),Dc(n,r.containerInfo)}function Np(n,r,o,c,d){return Qs(),Sc(d),r.flags|=256,Bt(n,r,o,c),r.child}var Qc={dehydrated:null,treeContext:null,retryLane:0};function Yc(n){return{baseLanes:n,cachePool:null,transitions:null}}function Dp(n,r,o){var c=r.pendingProps,d=Xe.current,p=!1,_=(r.flags&128)!==0,I;if((I=_)||(I=n!==null&&n.memoizedState===null?!1:(d&2)!==0),I?(p=!0,r.flags&=-129):(n===null||n.memoizedState!==null)&&(d|=1),qe(Xe,d&1),n===null)return Ic(r),n=r.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((r.mode&1)===0?r.lanes=1:n.data==="$!"?r.lanes=8:r.lanes=1073741824,null):(_=c.children,n=c.fallback,p?(c=r.mode,p=r.child,_={mode:"hidden",children:_},(c&1)===0&&p!==null?(p.childLanes=0,p.pendingProps=_):p=Ql(_,c,0,null),n=Ji(n,c,o,null),p.return=r,n.return=r,p.sibling=n,r.child=p,r.child.memoizedState=Yc(o),r.memoizedState=Qc,n):Xc(r,_));if(d=n.memoizedState,d!==null&&(I=d.dehydrated,I!==null))return Dv(n,r,_,c,I,d,o);if(p){p=c.fallback,_=r.mode,d=n.child,I=d.sibling;var R={mode:"hidden",children:c.children};return(_&1)===0&&r.child!==d?(c=r.child,c.childLanes=0,c.pendingProps=R,r.deletions=null):(c=ri(d,R),c.subtreeFlags=d.subtreeFlags&14680064),I!==null?p=ri(I,p):(p=Ji(p,_,o,null),p.flags|=2),p.return=r,c.return=r,c.sibling=p,r.child=c,c=p,p=r.child,_=n.child.memoizedState,_=_===null?Yc(o):{baseLanes:_.baseLanes|o,cachePool:null,transitions:_.transitions},p.memoizedState=_,p.childLanes=n.childLanes&~o,r.memoizedState=Qc,c}return p=n.child,n=p.sibling,c=ri(p,{mode:"visible",children:c.children}),(r.mode&1)===0&&(c.lanes=o),c.return=r,c.sibling=null,n!==null&&(o=r.deletions,o===null?(r.deletions=[n],r.flags|=16):o.push(n)),r.child=c,r.memoizedState=null,c}function Xc(n,r){return r=Ql({mode:"visible",children:r},n.mode,0,null),r.return=n,n.child=r}function Ml(n,r,o,c){return c!==null&&Sc(c),Ys(r,n.child,null,o),n=Xc(r,r.pendingProps.children),n.flags|=2,r.memoizedState=null,n}function Dv(n,r,o,c,d,p,_){if(o)return r.flags&256?(r.flags&=-257,c=Hc(Error(t(422))),Ml(n,r,_,c)):r.memoizedState!==null?(r.child=n.child,r.flags|=128,null):(p=c.fallback,d=r.mode,c=Ql({mode:"visible",children:c.children},d,0,null),p=Ji(p,d,_,null),p.flags|=2,c.return=r,p.return=r,c.sibling=p,r.child=c,(r.mode&1)!==0&&Ys(r,n.child,null,_),r.child.memoizedState=Yc(_),r.memoizedState=Qc,p);if((r.mode&1)===0)return Ml(n,r,_,null);if(d.data==="$!"){if(c=d.nextSibling&&d.nextSibling.dataset,c)var I=c.dgst;return c=I,p=Error(t(419)),c=Hc(p,c,void 0),Ml(n,r,_,c)}if(I=(_&n.childLanes)!==0,Gt||I){if(c=_t,c!==null){switch(_&-_){case 4:d=2;break;case 16:d=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:d=32;break;case 536870912:d=268435456;break;default:d=0}d=(d&(c.suspendedLanes|_))!==0?0:d,d!==0&&d!==p.retryLane&&(p.retryLane=d,wr(n,d),Ln(c,n,d,-1))}return fh(),c=Hc(Error(t(421))),Ml(n,r,_,c)}return d.data==="$?"?(r.flags|=128,r.child=n.child,r=qv.bind(null,n),d._reactRetry=r,null):(n=p.treeContext,on=Wr(d.nextSibling),sn=r,Ye=!0,Dn=null,n!==null&&(dn[fn++]=vr,dn[fn++]=Er,dn[fn++]=$i,vr=n.id,Er=n.overflow,$i=r),r=Xc(r,c.children),r.flags|=4096,r)}function Op(n,r,o){n.lanes|=r;var c=n.alternate;c!==null&&(c.lanes|=r),Cc(n.return,r,o)}function Jc(n,r,o,c,d){var p=n.memoizedState;p===null?n.memoizedState={isBackwards:r,rendering:null,renderingStartTime:0,last:c,tail:o,tailMode:d}:(p.isBackwards=r,p.rendering=null,p.renderingStartTime=0,p.last=c,p.tail=o,p.tailMode=d)}function Vp(n,r,o){var c=r.pendingProps,d=c.revealOrder,p=c.tail;if(Bt(n,r,c.children,o),c=Xe.current,(c&2)!==0)c=c&1|2,r.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=r.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Op(n,o,r);else if(n.tag===19)Op(n,o,r);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===r)break e;for(;n.sibling===null;){if(n.return===null||n.return===r)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}c&=1}if(qe(Xe,c),(r.mode&1)===0)r.memoizedState=null;else switch(d){case"forwards":for(o=r.child,d=null;o!==null;)n=o.alternate,n!==null&&Pl(n)===null&&(d=o),o=o.sibling;o=d,o===null?(d=r.child,r.child=null):(d=o.sibling,o.sibling=null),Jc(r,!1,d,o,p);break;case"backwards":for(o=null,d=r.child,r.child=null;d!==null;){if(n=d.alternate,n!==null&&Pl(n)===null){r.child=d;break}n=d.sibling,d.sibling=o,o=d,d=n}Jc(r,!0,o,null,p);break;case"together":Jc(r,!1,null,null,void 0);break;default:r.memoizedState=null}return r.child}function bl(n,r){(r.mode&1)===0&&n!==null&&(n.alternate=null,r.alternate=null,r.flags|=2)}function Ir(n,r,o){if(n!==null&&(r.dependencies=n.dependencies),Gi|=r.lanes,(o&r.childLanes)===0)return null;if(n!==null&&r.child!==n.child)throw Error(t(153));if(r.child!==null){for(n=r.child,o=ri(n,n.pendingProps),r.child=o,o.return=r;n.sibling!==null;)n=n.sibling,o=o.sibling=ri(n,n.pendingProps),o.return=r;o.sibling=null}return r.child}function Ov(n,r,o){switch(r.tag){case 3:Pp(r),Qs();break;case 5:Kf(r);break;case 1:Kt(r.type)&&vl(r);break;case 4:Dc(r,r.stateNode.containerInfo);break;case 10:var c=r.type._context,d=r.memoizedProps.value;qe(Al,c._currentValue),c._currentValue=d;break;case 13:if(c=r.memoizedState,c!==null)return c.dehydrated!==null?(qe(Xe,Xe.current&1),r.flags|=128,null):(o&r.child.childLanes)!==0?Dp(n,r,o):(qe(Xe,Xe.current&1),n=Ir(n,r,o),n!==null?n.sibling:null);qe(Xe,Xe.current&1);break;case 19:if(c=(o&r.childLanes)!==0,(n.flags&128)!==0){if(c)return Vp(n,r,o);r.flags|=128}if(d=r.memoizedState,d!==null&&(d.rendering=null,d.tail=null,d.lastEffect=null),qe(Xe,Xe.current),c)break;return null;case 22:case 23:return r.lanes=0,Rp(n,r,o)}return Ir(n,r,o)}var xp,Zc,Lp,Mp;xp=function(n,r){for(var o=r.child;o!==null;){if(o.tag===5||o.tag===6)n.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===r)break;for(;o.sibling===null;){if(o.return===null||o.return===r)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},Zc=function(){},Lp=function(n,r,o,c){var d=n.memoizedProps;if(d!==c){n=r.stateNode,Wi(Qn.current);var p=null;switch(o){case"input":d=Or(n,d),c=Or(n,c),p=[];break;case"select":d=ee({},d,{value:void 0}),c=ee({},c,{value:void 0}),p=[];break;case"textarea":d=fs(n,d),c=fs(n,c),p=[];break;default:typeof d.onClick!="function"&&typeof c.onClick=="function"&&(n.onclick=gl)}vs(o,c);var _;o=null;for(F in d)if(!c.hasOwnProperty(F)&&d.hasOwnProperty(F)&&d[F]!=null)if(F==="style"){var I=d[F];for(_ in I)I.hasOwnProperty(_)&&(o||(o={}),o[_]="")}else F!=="dangerouslySetInnerHTML"&&F!=="children"&&F!=="suppressContentEditableWarning"&&F!=="suppressHydrationWarning"&&F!=="autoFocus"&&(a.hasOwnProperty(F)?p||(p=[]):(p=p||[]).push(F,null));for(F in c){var R=c[F];if(I=d?.[F],c.hasOwnProperty(F)&&R!==I&&(R!=null||I!=null))if(F==="style")if(I){for(_ in I)!I.hasOwnProperty(_)||R&&R.hasOwnProperty(_)||(o||(o={}),o[_]="");for(_ in R)R.hasOwnProperty(_)&&I[_]!==R[_]&&(o||(o={}),o[_]=R[_])}else o||(p||(p=[]),p.push(F,o)),o=R;else F==="dangerouslySetInnerHTML"?(R=R?R.__html:void 0,I=I?I.__html:void 0,R!=null&&I!==R&&(p=p||[]).push(F,R)):F==="children"?typeof R!="string"&&typeof R!="number"||(p=p||[]).push(F,""+R):F!=="suppressContentEditableWarning"&&F!=="suppressHydrationWarning"&&(a.hasOwnProperty(F)?(R!=null&&F==="onScroll"&&He("scroll",n),p||I===R||(p=[])):(p=p||[]).push(F,R))}o&&(p=p||[]).push("style",o);var F=p;(r.updateQueue=F)&&(r.flags|=4)}},Mp=function(n,r,o,c){o!==c&&(r.flags|=4)};function ia(n,r){if(!Ye)switch(n.tailMode){case"hidden":r=n.tail;for(var o=null;r!==null;)r.alternate!==null&&(o=r),r=r.sibling;o===null?n.tail=null:o.sibling=null;break;case"collapsed":o=n.tail;for(var c=null;o!==null;)o.alternate!==null&&(c=o),o=o.sibling;c===null?r||n.tail===null?n.tail=null:n.tail.sibling=null:c.sibling=null}}function Ot(n){var r=n.alternate!==null&&n.alternate.child===n.child,o=0,c=0;if(r)for(var d=n.child;d!==null;)o|=d.lanes|d.childLanes,c|=d.subtreeFlags&14680064,c|=d.flags&14680064,d.return=n,d=d.sibling;else for(d=n.child;d!==null;)o|=d.lanes|d.childLanes,c|=d.subtreeFlags,c|=d.flags,d.return=n,d=d.sibling;return n.subtreeFlags|=c,n.childLanes=o,r}function Vv(n,r,o){var c=r.pendingProps;switch(wc(r),r.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ot(r),null;case 1:return Kt(r.type)&&_l(),Ot(r),null;case 3:return c=r.stateNode,Zs(),We(Wt),We(Nt),xc(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(n===null||n.child===null)&&(Il(r)?r.flags|=4:n===null||n.memoizedState.isDehydrated&&(r.flags&256)===0||(r.flags|=1024,Dn!==null&&(ch(Dn),Dn=null))),Zc(n,r),Ot(r),null;case 5:Oc(r);var d=Wi(Zo.current);if(o=r.type,n!==null&&r.stateNode!=null)Lp(n,r,o,c,d),n.ref!==r.ref&&(r.flags|=512,r.flags|=2097152);else{if(!c){if(r.stateNode===null)throw Error(t(166));return Ot(r),null}if(n=Wi(Qn.current),Il(r)){c=r.stateNode,o=r.type;var p=r.memoizedProps;switch(c[Gn]=r,c[Go]=p,n=(r.mode&1)!==0,o){case"dialog":He("cancel",c),He("close",c);break;case"iframe":case"object":case"embed":He("load",c);break;case"video":case"audio":for(d=0;d<Ho.length;d++)He(Ho[d],c);break;case"source":He("error",c);break;case"img":case"image":case"link":He("error",c),He("load",c);break;case"details":He("toggle",c);break;case"input":Ti(c,p),He("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!p.multiple},He("invalid",c);break;case"textarea":Si(c,p),He("invalid",c)}vs(o,p),d=null;for(var _ in p)if(p.hasOwnProperty(_)){var I=p[_];_==="children"?typeof I=="string"?c.textContent!==I&&(p.suppressHydrationWarning!==!0&&ml(c.textContent,I,n),d=["children",I]):typeof I=="number"&&c.textContent!==""+I&&(p.suppressHydrationWarning!==!0&&ml(c.textContent,I,n),d=["children",""+I]):a.hasOwnProperty(_)&&I!=null&&_==="onScroll"&&He("scroll",c)}switch(o){case"input":Un(c),Co(c,p,!0);break;case"textarea":Un(c),ps(c);break;case"select":case"option":break;default:typeof p.onClick=="function"&&(c.onclick=gl)}c=d,r.updateQueue=c,c!==null&&(r.flags|=4)}else{_=d.nodeType===9?d:d.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=st(o)),n==="http://www.w3.org/1999/xhtml"?o==="script"?(n=_.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof c.is=="string"?n=_.createElement(o,{is:c.is}):(n=_.createElement(o),o==="select"&&(_=n,c.multiple?_.multiple=!0:c.size&&(_.size=c.size))):n=_.createElementNS(n,o),n[Gn]=r,n[Go]=c,xp(n,r,!1,!1),r.stateNode=n;e:{switch(_=Es(o,c),o){case"dialog":He("cancel",n),He("close",n),d=c;break;case"iframe":case"object":case"embed":He("load",n),d=c;break;case"video":case"audio":for(d=0;d<Ho.length;d++)He(Ho[d],n);d=c;break;case"source":He("error",n),d=c;break;case"img":case"image":case"link":He("error",n),He("load",n),d=c;break;case"details":He("toggle",n),d=c;break;case"input":Ti(n,c),d=Or(n,c),He("invalid",n);break;case"option":d=c;break;case"select":n._wrapperState={wasMultiple:!!c.multiple},d=ee({},c,{value:void 0}),He("invalid",n);break;case"textarea":Si(n,c),d=fs(n,c),He("invalid",n);break;default:d=c}vs(o,d),I=d;for(p in I)if(I.hasOwnProperty(p)){var R=I[p];p==="style"?ys(n,R):p==="dangerouslySetInnerHTML"?(R=R?R.__html:void 0,R!=null&&ms(n,R)):p==="children"?typeof R=="string"?(o!=="textarea"||R!=="")&&ur(n,R):typeof R=="number"&&ur(n,""+R):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(a.hasOwnProperty(p)?R!=null&&p==="onScroll"&&He("scroll",n):R!=null&&me(n,p,R,_))}switch(o){case"input":Un(n),Co(n,c,!1);break;case"textarea":Un(n),ps(n);break;case"option":c.value!=null&&n.setAttribute("value",""+xe(c.value));break;case"select":n.multiple=!!c.multiple,p=c.value,p!=null?zn(n,!!c.multiple,p,!1):c.defaultValue!=null&&zn(n,!!c.multiple,c.defaultValue,!0);break;default:typeof d.onClick=="function"&&(n.onclick=gl)}switch(o){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(r.flags|=4)}r.ref!==null&&(r.flags|=512,r.flags|=2097152)}return Ot(r),null;case 6:if(n&&r.stateNode!=null)Mp(n,r,n.memoizedProps,c);else{if(typeof c!="string"&&r.stateNode===null)throw Error(t(166));if(o=Wi(Zo.current),Wi(Qn.current),Il(r)){if(c=r.stateNode,o=r.memoizedProps,c[Gn]=r,(p=c.nodeValue!==o)&&(n=sn,n!==null))switch(n.tag){case 3:ml(c.nodeValue,o,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&ml(c.nodeValue,o,(n.mode&1)!==0)}p&&(r.flags|=4)}else c=(o.nodeType===9?o:o.ownerDocument).createTextNode(c),c[Gn]=r,r.stateNode=c}return Ot(r),null;case 13:if(We(Xe),c=r.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(Ye&&on!==null&&(r.mode&1)!==0&&(r.flags&128)===0)Uf(),Qs(),r.flags|=98560,p=!1;else if(p=Il(r),c!==null&&c.dehydrated!==null){if(n===null){if(!p)throw Error(t(318));if(p=r.memoizedState,p=p!==null?p.dehydrated:null,!p)throw Error(t(317));p[Gn]=r}else Qs(),(r.flags&128)===0&&(r.memoizedState=null),r.flags|=4;Ot(r),p=!1}else Dn!==null&&(ch(Dn),Dn=null),p=!0;if(!p)return r.flags&65536?r:null}return(r.flags&128)!==0?(r.lanes=o,r):(c=c!==null,c!==(n!==null&&n.memoizedState!==null)&&c&&(r.child.flags|=8192,(r.mode&1)!==0&&(n===null||(Xe.current&1)!==0?pt===0&&(pt=3):fh())),r.updateQueue!==null&&(r.flags|=4),Ot(r),null);case 4:return Zs(),Zc(n,r),n===null&&Wo(r.stateNode.containerInfo),Ot(r),null;case 10:return kc(r.type._context),Ot(r),null;case 17:return Kt(r.type)&&_l(),Ot(r),null;case 19:if(We(Xe),p=r.memoizedState,p===null)return Ot(r),null;if(c=(r.flags&128)!==0,_=p.rendering,_===null)if(c)ia(p,!1);else{if(pt!==0||n!==null&&(n.flags&128)!==0)for(n=r.child;n!==null;){if(_=Pl(n),_!==null){for(r.flags|=128,ia(p,!1),c=_.updateQueue,c!==null&&(r.updateQueue=c,r.flags|=4),r.subtreeFlags=0,c=o,o=r.child;o!==null;)p=o,n=c,p.flags&=14680066,_=p.alternate,_===null?(p.childLanes=0,p.lanes=n,p.child=null,p.subtreeFlags=0,p.memoizedProps=null,p.memoizedState=null,p.updateQueue=null,p.dependencies=null,p.stateNode=null):(p.childLanes=_.childLanes,p.lanes=_.lanes,p.child=_.child,p.subtreeFlags=0,p.deletions=null,p.memoizedProps=_.memoizedProps,p.memoizedState=_.memoizedState,p.updateQueue=_.updateQueue,p.type=_.type,n=_.dependencies,p.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),o=o.sibling;return qe(Xe,Xe.current&1|2),r.child}n=n.sibling}p.tail!==null&&$e()>ro&&(r.flags|=128,c=!0,ia(p,!1),r.lanes=4194304)}else{if(!c)if(n=Pl(_),n!==null){if(r.flags|=128,c=!0,o=n.updateQueue,o!==null&&(r.updateQueue=o,r.flags|=4),ia(p,!0),p.tail===null&&p.tailMode==="hidden"&&!_.alternate&&!Ye)return Ot(r),null}else 2*$e()-p.renderingStartTime>ro&&o!==1073741824&&(r.flags|=128,c=!0,ia(p,!1),r.lanes=4194304);p.isBackwards?(_.sibling=r.child,r.child=_):(o=p.last,o!==null?o.sibling=_:r.child=_,p.last=_)}return p.tail!==null?(r=p.tail,p.rendering=r,p.tail=r.sibling,p.renderingStartTime=$e(),r.sibling=null,o=Xe.current,qe(Xe,c?o&1|2:o&1),r):(Ot(r),null);case 22:case 23:return dh(),c=r.memoizedState!==null,n!==null&&n.memoizedState!==null!==c&&(r.flags|=8192),c&&(r.mode&1)!==0?(an&1073741824)!==0&&(Ot(r),r.subtreeFlags&6&&(r.flags|=8192)):Ot(r),null;case 24:return null;case 25:return null}throw Error(t(156,r.tag))}function xv(n,r){switch(wc(r),r.tag){case 1:return Kt(r.type)&&_l(),n=r.flags,n&65536?(r.flags=n&-65537|128,r):null;case 3:return Zs(),We(Wt),We(Nt),xc(),n=r.flags,(n&65536)!==0&&(n&128)===0?(r.flags=n&-65537|128,r):null;case 5:return Oc(r),null;case 13:if(We(Xe),n=r.memoizedState,n!==null&&n.dehydrated!==null){if(r.alternate===null)throw Error(t(340));Qs()}return n=r.flags,n&65536?(r.flags=n&-65537|128,r):null;case 19:return We(Xe),null;case 4:return Zs(),null;case 10:return kc(r.type._context),null;case 22:case 23:return dh(),null;case 24:return null;default:return null}}var Fl=!1,Vt=!1,Lv=typeof WeakSet=="function"?WeakSet:Set,te=null;function to(n,r){var o=n.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(c){et(n,r,c)}else o.current=null}function eh(n,r,o){try{o()}catch(c){et(n,r,c)}}var bp=!1;function Mv(n,r){if(dc=$r,n=mf(),ic(n)){if("selectionStart"in n)var o={start:n.selectionStart,end:n.selectionEnd};else e:{o=(o=n.ownerDocument)&&o.defaultView||window;var c=o.getSelection&&o.getSelection();if(c&&c.rangeCount!==0){o=c.anchorNode;var d=c.anchorOffset,p=c.focusNode;c=c.focusOffset;try{o.nodeType,p.nodeType}catch{o=null;break e}var _=0,I=-1,R=-1,F=0,q=0,W=n,$=null;t:for(;;){for(var Z;W!==o||d!==0&&W.nodeType!==3||(I=_+d),W!==p||c!==0&&W.nodeType!==3||(R=_+c),W.nodeType===3&&(_+=W.nodeValue.length),(Z=W.firstChild)!==null;)$=W,W=Z;for(;;){if(W===n)break t;if($===o&&++F===d&&(I=_),$===p&&++q===c&&(R=_),(Z=W.nextSibling)!==null)break;W=$,$=W.parentNode}W=Z}o=I===-1||R===-1?null:{start:I,end:R}}else o=null}o=o||{start:0,end:0}}else o=null;for(fc={focusedElem:n,selectionRange:o},$r=!1,te=r;te!==null;)if(r=te,n=r.child,(r.subtreeFlags&1028)!==0&&n!==null)n.return=r,te=n;else for(;te!==null;){r=te;try{var ne=r.alternate;if((r.flags&1024)!==0)switch(r.tag){case 0:case 11:case 15:break;case 1:if(ne!==null){var re=ne.memoizedProps,nt=ne.memoizedState,L=r.stateNode,C=L.getSnapshotBeforeUpdate(r.elementType===r.type?re:On(r.type,re),nt);L.__reactInternalSnapshotBeforeUpdate=C}break;case 3:var M=r.stateNode.containerInfo;M.nodeType===1?M.textContent="":M.nodeType===9&&M.documentElement&&M.removeChild(M.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(K){et(r,r.return,K)}if(n=r.sibling,n!==null){n.return=r.return,te=n;break}te=r.return}return ne=bp,bp=!1,ne}function sa(n,r,o){var c=r.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var d=c=c.next;do{if((d.tag&n)===n){var p=d.destroy;d.destroy=void 0,p!==void 0&&eh(r,o,p)}d=d.next}while(d!==c)}}function Ul(n,r){if(r=r.updateQueue,r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&n)===n){var c=o.create;o.destroy=c()}o=o.next}while(o!==r)}}function th(n){var r=n.ref;if(r!==null){var o=n.stateNode;switch(n.tag){case 5:n=o;break;default:n=o}typeof r=="function"?r(n):r.current=n}}function Fp(n){var r=n.alternate;r!==null&&(n.alternate=null,Fp(r)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(r=n.stateNode,r!==null&&(delete r[Gn],delete r[Go],delete r[yc],delete r[_v],delete r[vv])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Up(n){return n.tag===5||n.tag===3||n.tag===4}function jp(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||Up(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function nh(n,r,o){var c=n.tag;if(c===5||c===6)n=n.stateNode,r?o.nodeType===8?o.parentNode.insertBefore(n,r):o.insertBefore(n,r):(o.nodeType===8?(r=o.parentNode,r.insertBefore(n,o)):(r=o,r.appendChild(n)),o=o._reactRootContainer,o!=null||r.onclick!==null||(r.onclick=gl));else if(c!==4&&(n=n.child,n!==null))for(nh(n,r,o),n=n.sibling;n!==null;)nh(n,r,o),n=n.sibling}function rh(n,r,o){var c=n.tag;if(c===5||c===6)n=n.stateNode,r?o.insertBefore(n,r):o.appendChild(n);else if(c!==4&&(n=n.child,n!==null))for(rh(n,r,o),n=n.sibling;n!==null;)rh(n,r,o),n=n.sibling}var At=null,Vn=!1;function Jr(n,r,o){for(o=o.child;o!==null;)zp(n,r,o),o=o.sibling}function zp(n,r,o){if(en&&typeof en.onCommitFiberUnmount=="function")try{en.onCommitFiberUnmount(xi,o)}catch{}switch(o.tag){case 5:Vt||to(o,r);case 6:var c=At,d=Vn;At=null,Jr(n,r,o),At=c,Vn=d,At!==null&&(Vn?(n=At,o=o.stateNode,n.nodeType===8?n.parentNode.removeChild(o):n.removeChild(o)):At.removeChild(o.stateNode));break;case 18:At!==null&&(Vn?(n=At,o=o.stateNode,n.nodeType===8?gc(n.parentNode,o):n.nodeType===1&&gc(n,o),Cn(n)):gc(At,o.stateNode));break;case 4:c=At,d=Vn,At=o.stateNode.containerInfo,Vn=!0,Jr(n,r,o),At=c,Vn=d;break;case 0:case 11:case 14:case 15:if(!Vt&&(c=o.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){d=c=c.next;do{var p=d,_=p.destroy;p=p.tag,_!==void 0&&((p&2)!==0||(p&4)!==0)&&eh(o,r,_),d=d.next}while(d!==c)}Jr(n,r,o);break;case 1:if(!Vt&&(to(o,r),c=o.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=o.memoizedProps,c.state=o.memoizedState,c.componentWillUnmount()}catch(I){et(o,r,I)}Jr(n,r,o);break;case 21:Jr(n,r,o);break;case 22:o.mode&1?(Vt=(c=Vt)||o.memoizedState!==null,Jr(n,r,o),Vt=c):Jr(n,r,o);break;default:Jr(n,r,o)}}function Bp(n){var r=n.updateQueue;if(r!==null){n.updateQueue=null;var o=n.stateNode;o===null&&(o=n.stateNode=new Lv),r.forEach(function(c){var d=Hv.bind(null,n,c);o.has(c)||(o.add(c),c.then(d,d))})}}function xn(n,r){var o=r.deletions;if(o!==null)for(var c=0;c<o.length;c++){var d=o[c];try{var p=n,_=r,I=_;e:for(;I!==null;){switch(I.tag){case 5:At=I.stateNode,Vn=!1;break e;case 3:At=I.stateNode.containerInfo,Vn=!0;break e;case 4:At=I.stateNode.containerInfo,Vn=!0;break e}I=I.return}if(At===null)throw Error(t(160));zp(p,_,d),At=null,Vn=!1;var R=d.alternate;R!==null&&(R.return=null),d.return=null}catch(F){et(d,r,F)}}if(r.subtreeFlags&12854)for(r=r.child;r!==null;)$p(r,n),r=r.sibling}function $p(n,r){var o=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(xn(r,n),Xn(n),c&4){try{sa(3,n,n.return),Ul(3,n)}catch(re){et(n,n.return,re)}try{sa(5,n,n.return)}catch(re){et(n,n.return,re)}}break;case 1:xn(r,n),Xn(n),c&512&&o!==null&&to(o,o.return);break;case 5:if(xn(r,n),Xn(n),c&512&&o!==null&&to(o,o.return),n.flags&32){var d=n.stateNode;try{ur(d,"")}catch(re){et(n,n.return,re)}}if(c&4&&(d=n.stateNode,d!=null)){var p=n.memoizedProps,_=o!==null?o.memoizedProps:p,I=n.type,R=n.updateQueue;if(n.updateQueue=null,R!==null)try{I==="input"&&p.type==="radio"&&p.name!=null&&hs(d,p),Es(I,_);var F=Es(I,p);for(_=0;_<R.length;_+=2){var q=R[_],W=R[_+1];q==="style"?ys(d,W):q==="dangerouslySetInnerHTML"?ms(d,W):q==="children"?ur(d,W):me(d,q,W,F)}switch(I){case"input":ds(d,p);break;case"textarea":Ai(d,p);break;case"select":var $=d._wrapperState.wasMultiple;d._wrapperState.wasMultiple=!!p.multiple;var Z=p.value;Z!=null?zn(d,!!p.multiple,Z,!1):$!==!!p.multiple&&(p.defaultValue!=null?zn(d,!!p.multiple,p.defaultValue,!0):zn(d,!!p.multiple,p.multiple?[]:"",!1))}d[Go]=p}catch(re){et(n,n.return,re)}}break;case 6:if(xn(r,n),Xn(n),c&4){if(n.stateNode===null)throw Error(t(162));d=n.stateNode,p=n.memoizedProps;try{d.nodeValue=p}catch(re){et(n,n.return,re)}}break;case 3:if(xn(r,n),Xn(n),c&4&&o!==null&&o.memoizedState.isDehydrated)try{Cn(r.containerInfo)}catch(re){et(n,n.return,re)}break;case 4:xn(r,n),Xn(n);break;case 13:xn(r,n),Xn(n),d=n.child,d.flags&8192&&(p=d.memoizedState!==null,d.stateNode.isHidden=p,!p||d.alternate!==null&&d.alternate.memoizedState!==null||(oh=$e())),c&4&&Bp(n);break;case 22:if(q=o!==null&&o.memoizedState!==null,n.mode&1?(Vt=(F=Vt)||q,xn(r,n),Vt=F):xn(r,n),Xn(n),c&8192){if(F=n.memoizedState!==null,(n.stateNode.isHidden=F)&&!q&&(n.mode&1)!==0)for(te=n,q=n.child;q!==null;){for(W=te=q;te!==null;){switch($=te,Z=$.child,$.tag){case 0:case 11:case 14:case 15:sa(4,$,$.return);break;case 1:to($,$.return);var ne=$.stateNode;if(typeof ne.componentWillUnmount=="function"){c=$,o=$.return;try{r=c,ne.props=r.memoizedProps,ne.state=r.memoizedState,ne.componentWillUnmount()}catch(re){et(c,o,re)}}break;case 5:to($,$.return);break;case 22:if($.memoizedState!==null){Wp(W);continue}}Z!==null?(Z.return=$,te=Z):Wp(W)}q=q.sibling}e:for(q=null,W=n;;){if(W.tag===5){if(q===null){q=W;try{d=W.stateNode,F?(p=d.style,typeof p.setProperty=="function"?p.setProperty("display","none","important"):p.display="none"):(I=W.stateNode,R=W.memoizedProps.style,_=R!=null&&R.hasOwnProperty("display")?R.display:null,I.style.display=gs("display",_))}catch(re){et(n,n.return,re)}}}else if(W.tag===6){if(q===null)try{W.stateNode.nodeValue=F?"":W.memoizedProps}catch(re){et(n,n.return,re)}}else if((W.tag!==22&&W.tag!==23||W.memoizedState===null||W===n)&&W.child!==null){W.child.return=W,W=W.child;continue}if(W===n)break e;for(;W.sibling===null;){if(W.return===null||W.return===n)break e;q===W&&(q=null),W=W.return}q===W&&(q=null),W.sibling.return=W.return,W=W.sibling}}break;case 19:xn(r,n),Xn(n),c&4&&Bp(n);break;case 21:break;default:xn(r,n),Xn(n)}}function Xn(n){var r=n.flags;if(r&2){try{e:{for(var o=n.return;o!==null;){if(Up(o)){var c=o;break e}o=o.return}throw Error(t(160))}switch(c.tag){case 5:var d=c.stateNode;c.flags&32&&(ur(d,""),c.flags&=-33);var p=jp(n);rh(n,p,d);break;case 3:case 4:var _=c.stateNode.containerInfo,I=jp(n);nh(n,I,_);break;default:throw Error(t(161))}}catch(R){et(n,n.return,R)}n.flags&=-3}r&4096&&(n.flags&=-4097)}function bv(n,r,o){te=n,qp(n)}function qp(n,r,o){for(var c=(n.mode&1)!==0;te!==null;){var d=te,p=d.child;if(d.tag===22&&c){var _=d.memoizedState!==null||Fl;if(!_){var I=d.alternate,R=I!==null&&I.memoizedState!==null||Vt;I=Fl;var F=Vt;if(Fl=_,(Vt=R)&&!F)for(te=d;te!==null;)_=te,R=_.child,_.tag===22&&_.memoizedState!==null?Kp(d):R!==null?(R.return=_,te=R):Kp(d);for(;p!==null;)te=p,qp(p),p=p.sibling;te=d,Fl=I,Vt=F}Hp(n)}else(d.subtreeFlags&8772)!==0&&p!==null?(p.return=d,te=p):Hp(n)}}function Hp(n){for(;te!==null;){var r=te;if((r.flags&8772)!==0){var o=r.alternate;try{if((r.flags&8772)!==0)switch(r.tag){case 0:case 11:case 15:Vt||Ul(5,r);break;case 1:var c=r.stateNode;if(r.flags&4&&!Vt)if(o===null)c.componentDidMount();else{var d=r.elementType===r.type?o.memoizedProps:On(r.type,o.memoizedProps);c.componentDidUpdate(d,o.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var p=r.updateQueue;p!==null&&Wf(r,p,c);break;case 3:var _=r.updateQueue;if(_!==null){if(o=null,r.child!==null)switch(r.child.tag){case 5:o=r.child.stateNode;break;case 1:o=r.child.stateNode}Wf(r,_,o)}break;case 5:var I=r.stateNode;if(o===null&&r.flags&4){o=I;var R=r.memoizedProps;switch(r.type){case"button":case"input":case"select":case"textarea":R.autoFocus&&o.focus();break;case"img":R.src&&(o.src=R.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(r.memoizedState===null){var F=r.alternate;if(F!==null){var q=F.memoizedState;if(q!==null){var W=q.dehydrated;W!==null&&Cn(W)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}Vt||r.flags&512&&th(r)}catch($){et(r,r.return,$)}}if(r===n){te=null;break}if(o=r.sibling,o!==null){o.return=r.return,te=o;break}te=r.return}}function Wp(n){for(;te!==null;){var r=te;if(r===n){te=null;break}var o=r.sibling;if(o!==null){o.return=r.return,te=o;break}te=r.return}}function Kp(n){for(;te!==null;){var r=te;try{switch(r.tag){case 0:case 11:case 15:var o=r.return;try{Ul(4,r)}catch(R){et(r,o,R)}break;case 1:var c=r.stateNode;if(typeof c.componentDidMount=="function"){var d=r.return;try{c.componentDidMount()}catch(R){et(r,d,R)}}var p=r.return;try{th(r)}catch(R){et(r,p,R)}break;case 5:var _=r.return;try{th(r)}catch(R){et(r,_,R)}}}catch(R){et(r,r.return,R)}if(r===n){te=null;break}var I=r.sibling;if(I!==null){I.return=r.return,te=I;break}te=r.return}}var Fv=Math.ceil,jl=fe.ReactCurrentDispatcher,ih=fe.ReactCurrentOwner,gn=fe.ReactCurrentBatchConfig,De=0,_t=null,lt=null,Rt=0,an=0,no=Kr(0),pt=0,oa=null,Gi=0,zl=0,sh=0,aa=null,Qt=null,oh=0,ro=1/0,Sr=null,Bl=!1,ah=null,Zr=null,$l=!1,ei=null,ql=0,la=0,lh=null,Hl=-1,Wl=0;function $t(){return(De&6)!==0?$e():Hl!==-1?Hl:Hl=$e()}function ti(n){return(n.mode&1)===0?1:(De&2)!==0&&Rt!==0?Rt&-Rt:wv.transition!==null?(Wl===0&&(Wl=Mi()),Wl):(n=Re,n!==0||(n=window.event,n=n===void 0?16:Mo(n.type)),n)}function Ln(n,r,o,c){if(50<la)throw la=0,lh=null,Error(t(185));Ur(n,o,c),((De&2)===0||n!==_t)&&(n===_t&&((De&2)===0&&(zl|=o),pt===4&&ni(n,Rt)),Yt(n,c),o===1&&De===0&&(r.mode&1)===0&&(ro=$e()+500,El&&Qr()))}function Yt(n,r){var o=n.callbackNode;dr(n,r);var c=Li(n,n===_t?Rt:0);if(c===0)o!==null&&Do(o),n.callbackNode=null,n.callbackPriority=0;else if(r=c&-c,n.callbackPriority!==r){if(o!=null&&Do(o),r===1)n.tag===0?Ev(Qp.bind(null,n)):xf(Qp.bind(null,n)),gv(function(){(De&6)===0&&Qr()}),o=null;else{switch(zr(c)){case 1:o=Vi;break;case 4:o=Mr;break;case 16:o=un;break;case 536870912:o=Wa;break;default:o=un}o=rm(o,Gp.bind(null,n))}n.callbackPriority=r,n.callbackNode=o}}function Gp(n,r){if(Hl=-1,Wl=0,(De&6)!==0)throw Error(t(327));var o=n.callbackNode;if(io()&&n.callbackNode!==o)return null;var c=Li(n,n===_t?Rt:0);if(c===0)return null;if((c&30)!==0||(c&n.expiredLanes)!==0||r)r=Kl(n,c);else{r=c;var d=De;De|=2;var p=Xp();(_t!==n||Rt!==r)&&(Sr=null,ro=$e()+500,Yi(n,r));do try{zv();break}catch(I){Yp(n,I)}while(!0);Rc(),jl.current=p,De=d,lt!==null?r=0:(_t=null,Rt=0,r=pt)}if(r!==0){if(r===2&&(d=tn(n),d!==0&&(c=d,r=uh(n,d))),r===1)throw o=oa,Yi(n,0),ni(n,c),Yt(n,$e()),o;if(r===6)ni(n,c);else{if(d=n.current.alternate,(c&30)===0&&!Uv(d)&&(r=Kl(n,c),r===2&&(p=tn(n),p!==0&&(c=p,r=uh(n,p))),r===1))throw o=oa,Yi(n,0),ni(n,c),Yt(n,$e()),o;switch(n.finishedWork=d,n.finishedLanes=c,r){case 0:case 1:throw Error(t(345));case 2:Xi(n,Qt,Sr);break;case 3:if(ni(n,c),(c&130023424)===c&&(r=oh+500-$e(),10<r)){if(Li(n,0)!==0)break;if(d=n.suspendedLanes,(d&c)!==c){$t(),n.pingedLanes|=n.suspendedLanes&d;break}n.timeoutHandle=mc(Xi.bind(null,n,Qt,Sr),r);break}Xi(n,Qt,Sr);break;case 4:if(ni(n,c),(c&4194240)===c)break;for(r=n.eventTimes,d=-1;0<c;){var _=31-jt(c);p=1<<_,_=r[_],_>d&&(d=_),c&=~p}if(c=d,c=$e()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*Fv(c/1960))-c,10<c){n.timeoutHandle=mc(Xi.bind(null,n,Qt,Sr),c);break}Xi(n,Qt,Sr);break;case 5:Xi(n,Qt,Sr);break;default:throw Error(t(329))}}}return Yt(n,$e()),n.callbackNode===o?Gp.bind(null,n):null}function uh(n,r){var o=aa;return n.current.memoizedState.isDehydrated&&(Yi(n,r).flags|=256),n=Kl(n,r),n!==2&&(r=Qt,Qt=o,r!==null&&ch(r)),n}function ch(n){Qt===null?Qt=n:Qt.push.apply(Qt,n)}function Uv(n){for(var r=n;;){if(r.flags&16384){var o=r.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var c=0;c<o.length;c++){var d=o[c],p=d.getSnapshot;d=d.value;try{if(!Nn(p(),d))return!1}catch{return!1}}}if(o=r.child,r.subtreeFlags&16384&&o!==null)o.return=r,r=o;else{if(r===n)break;for(;r.sibling===null;){if(r.return===null||r.return===n)return!0;r=r.return}r.sibling.return=r.return,r=r.sibling}}return!0}function ni(n,r){for(r&=~sh,r&=~zl,n.suspendedLanes|=r,n.pingedLanes&=~r,n=n.expirationTimes;0<r;){var o=31-jt(r),c=1<<o;n[o]=-1,r&=~c}}function Qp(n){if((De&6)!==0)throw Error(t(327));io();var r=Li(n,0);if((r&1)===0)return Yt(n,$e()),null;var o=Kl(n,r);if(n.tag!==0&&o===2){var c=tn(n);c!==0&&(r=c,o=uh(n,c))}if(o===1)throw o=oa,Yi(n,0),ni(n,r),Yt(n,$e()),o;if(o===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=r,Xi(n,Qt,Sr),Yt(n,$e()),null}function hh(n,r){var o=De;De|=1;try{return n(r)}finally{De=o,De===0&&(ro=$e()+500,El&&Qr())}}function Qi(n){ei!==null&&ei.tag===0&&(De&6)===0&&io();var r=De;De|=1;var o=gn.transition,c=Re;try{if(gn.transition=null,Re=1,n)return n()}finally{Re=c,gn.transition=o,De=r,(De&6)===0&&Qr()}}function dh(){an=no.current,We(no)}function Yi(n,r){n.finishedWork=null,n.finishedLanes=0;var o=n.timeoutHandle;if(o!==-1&&(n.timeoutHandle=-1,mv(o)),lt!==null)for(o=lt.return;o!==null;){var c=o;switch(wc(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&_l();break;case 3:Zs(),We(Wt),We(Nt),xc();break;case 5:Oc(c);break;case 4:Zs();break;case 13:We(Xe);break;case 19:We(Xe);break;case 10:kc(c.type._context);break;case 22:case 23:dh()}o=o.return}if(_t=n,lt=n=ri(n.current,null),Rt=an=r,pt=0,oa=null,sh=zl=Gi=0,Qt=aa=null,Hi!==null){for(r=0;r<Hi.length;r++)if(o=Hi[r],c=o.interleaved,c!==null){o.interleaved=null;var d=c.next,p=o.pending;if(p!==null){var _=p.next;p.next=d,c.next=_}o.pending=c}Hi=null}return n}function Yp(n,r){do{var o=lt;try{if(Rc(),Nl.current=xl,Dl){for(var c=Je.memoizedState;c!==null;){var d=c.queue;d!==null&&(d.pending=null),c=c.next}Dl=!1}if(Ki=0,yt=ft=Je=null,ea=!1,ta=0,ih.current=null,o===null||o.return===null){pt=1,oa=r,lt=null;break}e:{var p=n,_=o.return,I=o,R=r;if(r=Rt,I.flags|=32768,R!==null&&typeof R=="object"&&typeof R.then=="function"){var F=R,q=I,W=q.tag;if((q.mode&1)===0&&(W===0||W===11||W===15)){var $=q.alternate;$?(q.updateQueue=$.updateQueue,q.memoizedState=$.memoizedState,q.lanes=$.lanes):(q.updateQueue=null,q.memoizedState=null)}var Z=wp(_);if(Z!==null){Z.flags&=-257,Tp(Z,_,I,p,r),Z.mode&1&&Ep(p,F,r),r=Z,R=F;var ne=r.updateQueue;if(ne===null){var re=new Set;re.add(R),r.updateQueue=re}else ne.add(R);break e}else{if((r&1)===0){Ep(p,F,r),fh();break e}R=Error(t(426))}}else if(Ye&&I.mode&1){var nt=wp(_);if(nt!==null){(nt.flags&65536)===0&&(nt.flags|=256),Tp(nt,_,I,p,r),Sc(eo(R,I));break e}}p=R=eo(R,I),pt!==4&&(pt=2),aa===null?aa=[p]:aa.push(p),p=_;do{switch(p.tag){case 3:p.flags|=65536,r&=-r,p.lanes|=r;var L=_p(p,R,r);Hf(p,L);break e;case 1:I=R;var C=p.type,M=p.stateNode;if((p.flags&128)===0&&(typeof C.getDerivedStateFromError=="function"||M!==null&&typeof M.componentDidCatch=="function"&&(Zr===null||!Zr.has(M)))){p.flags|=65536,r&=-r,p.lanes|=r;var K=vp(p,I,r);Hf(p,K);break e}}p=p.return}while(p!==null)}Zp(o)}catch(oe){r=oe,lt===o&&o!==null&&(lt=o=o.return);continue}break}while(!0)}function Xp(){var n=jl.current;return jl.current=xl,n===null?xl:n}function fh(){(pt===0||pt===3||pt===2)&&(pt=4),_t===null||(Gi&268435455)===0&&(zl&268435455)===0||ni(_t,Rt)}function Kl(n,r){var o=De;De|=2;var c=Xp();(_t!==n||Rt!==r)&&(Sr=null,Yi(n,r));do try{jv();break}catch(d){Yp(n,d)}while(!0);if(Rc(),De=o,jl.current=c,lt!==null)throw Error(t(261));return _t=null,Rt=0,pt}function jv(){for(;lt!==null;)Jp(lt)}function zv(){for(;lt!==null&&!qa();)Jp(lt)}function Jp(n){var r=nm(n.alternate,n,an);n.memoizedProps=n.pendingProps,r===null?Zp(n):lt=r,ih.current=null}function Zp(n){var r=n;do{var o=r.alternate;if(n=r.return,(r.flags&32768)===0){if(o=Vv(o,r,an),o!==null){lt=o;return}}else{if(o=xv(o,r),o!==null){o.flags&=32767,lt=o;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{pt=6,lt=null;return}}if(r=r.sibling,r!==null){lt=r;return}lt=r=n}while(r!==null);pt===0&&(pt=5)}function Xi(n,r,o){var c=Re,d=gn.transition;try{gn.transition=null,Re=1,Bv(n,r,o,c)}finally{gn.transition=d,Re=c}return null}function Bv(n,r,o,c){do io();while(ei!==null);if((De&6)!==0)throw Error(t(327));o=n.finishedWork;var d=n.finishedLanes;if(o===null)return null;if(n.finishedWork=null,n.finishedLanes=0,o===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var p=o.lanes|o.childLanes;if(Be(n,p),n===_t&&(lt=_t=null,Rt=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||$l||($l=!0,rm(un,function(){return io(),null})),p=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||p){p=gn.transition,gn.transition=null;var _=Re;Re=1;var I=De;De|=4,ih.current=null,Mv(n,o),$p(o,n),lv(fc),$r=!!dc,fc=dc=null,n.current=o,bv(o),Yu(),De=I,Re=_,gn.transition=p}else n.current=o;if($l&&($l=!1,ei=n,ql=d),p=n.pendingLanes,p===0&&(Zr=null),Ka(o.stateNode),Yt(n,$e()),r!==null)for(c=n.onRecoverableError,o=0;o<r.length;o++)d=r[o],c(d.value,{componentStack:d.stack,digest:d.digest});if(Bl)throw Bl=!1,n=ah,ah=null,n;return(ql&1)!==0&&n.tag!==0&&io(),p=n.pendingLanes,(p&1)!==0?n===lh?la++:(la=0,lh=n):la=0,Qr(),null}function io(){if(ei!==null){var n=zr(ql),r=gn.transition,o=Re;try{if(gn.transition=null,Re=16>n?16:n,ei===null)var c=!1;else{if(n=ei,ei=null,ql=0,(De&6)!==0)throw Error(t(331));var d=De;for(De|=4,te=n.current;te!==null;){var p=te,_=p.child;if((te.flags&16)!==0){var I=p.deletions;if(I!==null){for(var R=0;R<I.length;R++){var F=I[R];for(te=F;te!==null;){var q=te;switch(q.tag){case 0:case 11:case 15:sa(8,q,p)}var W=q.child;if(W!==null)W.return=q,te=W;else for(;te!==null;){q=te;var $=q.sibling,Z=q.return;if(Fp(q),q===F){te=null;break}if($!==null){$.return=Z,te=$;break}te=Z}}}var ne=p.alternate;if(ne!==null){var re=ne.child;if(re!==null){ne.child=null;do{var nt=re.sibling;re.sibling=null,re=nt}while(re!==null)}}te=p}}if((p.subtreeFlags&2064)!==0&&_!==null)_.return=p,te=_;else e:for(;te!==null;){if(p=te,(p.flags&2048)!==0)switch(p.tag){case 0:case 11:case 15:sa(9,p,p.return)}var L=p.sibling;if(L!==null){L.return=p.return,te=L;break e}te=p.return}}var C=n.current;for(te=C;te!==null;){_=te;var M=_.child;if((_.subtreeFlags&2064)!==0&&M!==null)M.return=_,te=M;else e:for(_=C;te!==null;){if(I=te,(I.flags&2048)!==0)try{switch(I.tag){case 0:case 11:case 15:Ul(9,I)}}catch(oe){et(I,I.return,oe)}if(I===_){te=null;break e}var K=I.sibling;if(K!==null){K.return=I.return,te=K;break e}te=I.return}}if(De=d,Qr(),en&&typeof en.onPostCommitFiberRoot=="function")try{en.onPostCommitFiberRoot(xi,n)}catch{}c=!0}return c}finally{Re=o,gn.transition=r}}return!1}function em(n,r,o){r=eo(o,r),r=_p(n,r,1),n=Xr(n,r,1),r=$t(),n!==null&&(Ur(n,1,r),Yt(n,r))}function et(n,r,o){if(n.tag===3)em(n,n,o);else for(;r!==null;){if(r.tag===3){em(r,n,o);break}else if(r.tag===1){var c=r.stateNode;if(typeof r.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(Zr===null||!Zr.has(c))){n=eo(o,n),n=vp(r,n,1),r=Xr(r,n,1),n=$t(),r!==null&&(Ur(r,1,n),Yt(r,n));break}}r=r.return}}function $v(n,r,o){var c=n.pingCache;c!==null&&c.delete(r),r=$t(),n.pingedLanes|=n.suspendedLanes&o,_t===n&&(Rt&o)===o&&(pt===4||pt===3&&(Rt&130023424)===Rt&&500>$e()-oh?Yi(n,0):sh|=o),Yt(n,r)}function tm(n,r){r===0&&((n.mode&1)===0?r=1:(r=ks,ks<<=1,(ks&130023424)===0&&(ks=4194304)));var o=$t();n=wr(n,r),n!==null&&(Ur(n,r,o),Yt(n,o))}function qv(n){var r=n.memoizedState,o=0;r!==null&&(o=r.retryLane),tm(n,o)}function Hv(n,r){var o=0;switch(n.tag){case 13:var c=n.stateNode,d=n.memoizedState;d!==null&&(o=d.retryLane);break;case 19:c=n.stateNode;break;default:throw Error(t(314))}c!==null&&c.delete(r),tm(n,o)}var nm;nm=function(n,r,o){if(n!==null)if(n.memoizedProps!==r.pendingProps||Wt.current)Gt=!0;else{if((n.lanes&o)===0&&(r.flags&128)===0)return Gt=!1,Ov(n,r,o);Gt=(n.flags&131072)!==0}else Gt=!1,Ye&&(r.flags&1048576)!==0&&Lf(r,Tl,r.index);switch(r.lanes=0,r.tag){case 2:var c=r.type;bl(n,r),n=r.pendingProps;var d=Ws(r,Nt.current);Js(r,o),d=bc(null,r,c,n,d,o);var p=Fc();return r.flags|=1,typeof d=="object"&&d!==null&&typeof d.render=="function"&&d.$$typeof===void 0?(r.tag=1,r.memoizedState=null,r.updateQueue=null,Kt(c)?(p=!0,vl(r)):p=!1,r.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,Nc(r),d.updater=Ll,r.stateNode=d,d._reactInternals=r,qc(r,c,n,o),r=Gc(null,r,c,!0,p,o)):(r.tag=0,Ye&&p&&Ec(r),Bt(null,r,d,o),r=r.child),r;case 16:c=r.elementType;e:{switch(bl(n,r),n=r.pendingProps,d=c._init,c=d(c._payload),r.type=c,d=r.tag=Kv(c),n=On(c,n),d){case 0:r=Kc(null,r,c,n,o);break e;case 1:r=Cp(null,r,c,n,o);break e;case 11:r=Ip(null,r,c,n,o);break e;case 14:r=Sp(null,r,c,On(c.type,n),o);break e}throw Error(t(306,c,""))}return r;case 0:return c=r.type,d=r.pendingProps,d=r.elementType===c?d:On(c,d),Kc(n,r,c,d,o);case 1:return c=r.type,d=r.pendingProps,d=r.elementType===c?d:On(c,d),Cp(n,r,c,d,o);case 3:e:{if(Pp(r),n===null)throw Error(t(387));c=r.pendingProps,p=r.memoizedState,d=p.element,qf(n,r),Cl(r,c,null,o);var _=r.memoizedState;if(c=_.element,p.isDehydrated)if(p={element:c,isDehydrated:!1,cache:_.cache,pendingSuspenseBoundaries:_.pendingSuspenseBoundaries,transitions:_.transitions},r.updateQueue.baseState=p,r.memoizedState=p,r.flags&256){d=eo(Error(t(423)),r),r=Np(n,r,c,o,d);break e}else if(c!==d){d=eo(Error(t(424)),r),r=Np(n,r,c,o,d);break e}else for(on=Wr(r.stateNode.containerInfo.firstChild),sn=r,Ye=!0,Dn=null,o=Bf(r,null,c,o),r.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(Qs(),c===d){r=Ir(n,r,o);break e}Bt(n,r,c,o)}r=r.child}return r;case 5:return Kf(r),n===null&&Ic(r),c=r.type,d=r.pendingProps,p=n!==null?n.memoizedProps:null,_=d.children,pc(c,d)?_=null:p!==null&&pc(c,p)&&(r.flags|=32),kp(n,r),Bt(n,r,_,o),r.child;case 6:return n===null&&Ic(r),null;case 13:return Dp(n,r,o);case 4:return Dc(r,r.stateNode.containerInfo),c=r.pendingProps,n===null?r.child=Ys(r,null,c,o):Bt(n,r,c,o),r.child;case 11:return c=r.type,d=r.pendingProps,d=r.elementType===c?d:On(c,d),Ip(n,r,c,d,o);case 7:return Bt(n,r,r.pendingProps,o),r.child;case 8:return Bt(n,r,r.pendingProps.children,o),r.child;case 12:return Bt(n,r,r.pendingProps.children,o),r.child;case 10:e:{if(c=r.type._context,d=r.pendingProps,p=r.memoizedProps,_=d.value,qe(Al,c._currentValue),c._currentValue=_,p!==null)if(Nn(p.value,_)){if(p.children===d.children&&!Wt.current){r=Ir(n,r,o);break e}}else for(p=r.child,p!==null&&(p.return=r);p!==null;){var I=p.dependencies;if(I!==null){_=p.child;for(var R=I.firstContext;R!==null;){if(R.context===c){if(p.tag===1){R=Tr(-1,o&-o),R.tag=2;var F=p.updateQueue;if(F!==null){F=F.shared;var q=F.pending;q===null?R.next=R:(R.next=q.next,q.next=R),F.pending=R}}p.lanes|=o,R=p.alternate,R!==null&&(R.lanes|=o),Cc(p.return,o,r),I.lanes|=o;break}R=R.next}}else if(p.tag===10)_=p.type===r.type?null:p.child;else if(p.tag===18){if(_=p.return,_===null)throw Error(t(341));_.lanes|=o,I=_.alternate,I!==null&&(I.lanes|=o),Cc(_,o,r),_=p.sibling}else _=p.child;if(_!==null)_.return=p;else for(_=p;_!==null;){if(_===r){_=null;break}if(p=_.sibling,p!==null){p.return=_.return,_=p;break}_=_.return}p=_}Bt(n,r,d.children,o),r=r.child}return r;case 9:return d=r.type,c=r.pendingProps.children,Js(r,o),d=pn(d),c=c(d),r.flags|=1,Bt(n,r,c,o),r.child;case 14:return c=r.type,d=On(c,r.pendingProps),d=On(c.type,d),Sp(n,r,c,d,o);case 15:return Ap(n,r,r.type,r.pendingProps,o);case 17:return c=r.type,d=r.pendingProps,d=r.elementType===c?d:On(c,d),bl(n,r),r.tag=1,Kt(c)?(n=!0,vl(r)):n=!1,Js(r,o),gp(r,c,d),qc(r,c,d,o),Gc(null,r,c,!0,n,o);case 19:return Vp(n,r,o);case 22:return Rp(n,r,o)}throw Error(t(156,r.tag))};function rm(n,r){return As(n,r)}function Wv(n,r,o,c){this.tag=n,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=r,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function yn(n,r,o,c){return new Wv(n,r,o,c)}function ph(n){return n=n.prototype,!(!n||!n.isReactComponent)}function Kv(n){if(typeof n=="function")return ph(n)?1:0;if(n!=null){if(n=n.$$typeof,n===V)return 11;if(n===mt)return 14}return 2}function ri(n,r){var o=n.alternate;return o===null?(o=yn(n.tag,r,n.key,n.mode),o.elementType=n.elementType,o.type=n.type,o.stateNode=n.stateNode,o.alternate=n,n.alternate=o):(o.pendingProps=r,o.type=n.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=n.flags&14680064,o.childLanes=n.childLanes,o.lanes=n.lanes,o.child=n.child,o.memoizedProps=n.memoizedProps,o.memoizedState=n.memoizedState,o.updateQueue=n.updateQueue,r=n.dependencies,o.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},o.sibling=n.sibling,o.index=n.index,o.ref=n.ref,o}function Gl(n,r,o,c,d,p){var _=2;if(c=n,typeof n=="function")ph(n)&&(_=1);else if(typeof n=="string")_=5;else e:switch(n){case P:return Ji(o.children,d,p,r);case T:_=8,d|=8;break;case A:return n=yn(12,o,r,d|2),n.elementType=A,n.lanes=p,n;case S:return n=yn(13,o,r,d),n.elementType=S,n.lanes=p,n;case Ze:return n=yn(19,o,r,d),n.elementType=Ze,n.lanes=p,n;case Fe:return Ql(o,d,p,r);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case k:_=10;break e;case D:_=9;break e;case V:_=11;break e;case mt:_=14;break e;case Tt:_=16,c=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return r=yn(_,o,r,d),r.elementType=n,r.type=c,r.lanes=p,r}function Ji(n,r,o,c){return n=yn(7,n,c,r),n.lanes=o,n}function Ql(n,r,o,c){return n=yn(22,n,c,r),n.elementType=Fe,n.lanes=o,n.stateNode={isHidden:!1},n}function mh(n,r,o){return n=yn(6,n,null,r),n.lanes=o,n}function gh(n,r,o){return r=yn(4,n.children!==null?n.children:[],n.key,r),r.lanes=o,r.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},r}function Gv(n,r,o,c,d){this.tag=r,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Fr(0),this.expirationTimes=Fr(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Fr(0),this.identifierPrefix=c,this.onRecoverableError=d,this.mutableSourceEagerHydrationData=null}function yh(n,r,o,c,d,p,_,I,R){return n=new Gv(n,r,o,I,R),r===1?(r=1,p===!0&&(r|=8)):r=0,p=yn(3,null,null,r),n.current=p,p.stateNode=n,p.memoizedState={element:c,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},Nc(p),n}function Qv(n,r,o){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ve,key:c==null?null:""+c,children:n,containerInfo:r,implementation:o}}function im(n){if(!n)return Gr;n=n._reactInternals;e:{if(In(n)!==n||n.tag!==1)throw Error(t(170));var r=n;do{switch(r.tag){case 3:r=r.stateNode.context;break e;case 1:if(Kt(r.type)){r=r.stateNode.__reactInternalMemoizedMergedChildContext;break e}}r=r.return}while(r!==null);throw Error(t(171))}if(n.tag===1){var o=n.type;if(Kt(o))return Of(n,o,r)}return r}function sm(n,r,o,c,d,p,_,I,R){return n=yh(o,c,!0,n,d,p,_,I,R),n.context=im(null),o=n.current,c=$t(),d=ti(o),p=Tr(c,d),p.callback=r??null,Xr(o,p,d),n.current.lanes=d,Ur(n,d,c),Yt(n,c),n}function Yl(n,r,o,c){var d=r.current,p=$t(),_=ti(d);return o=im(o),r.context===null?r.context=o:r.pendingContext=o,r=Tr(p,_),r.payload={element:n},c=c===void 0?null:c,c!==null&&(r.callback=c),n=Xr(d,r,_),n!==null&&(Ln(n,d,_,p),kl(n,d,_)),_}function Xl(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function om(n,r){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var o=n.retryLane;n.retryLane=o!==0&&o<r?o:r}}function _h(n,r){om(n,r),(n=n.alternate)&&om(n,r)}function Yv(){return null}var am=typeof reportError=="function"?reportError:function(n){console.error(n)};function vh(n){this._internalRoot=n}Jl.prototype.render=vh.prototype.render=function(n){var r=this._internalRoot;if(r===null)throw Error(t(409));Yl(n,r,null,null)},Jl.prototype.unmount=vh.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var r=n.containerInfo;Qi(function(){Yl(null,n,null,null)}),r[yr]=null}};function Jl(n){this._internalRoot=n}Jl.prototype.unstable_scheduleHydration=function(n){if(n){var r=Ja();n={blockedOn:null,target:n,priority:r};for(var o=0;o<qn.length&&r!==0&&r<qn[o].priority;o++);qn.splice(o,0,n),o===0&&tl(n)}};function Eh(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function Zl(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function lm(){}function Xv(n,r,o,c,d){if(d){if(typeof c=="function"){var p=c;c=function(){var F=Xl(_);p.call(F)}}var _=sm(r,c,n,0,null,!1,!1,"",lm);return n._reactRootContainer=_,n[yr]=_.current,Wo(n.nodeType===8?n.parentNode:n),Qi(),_}for(;d=n.lastChild;)n.removeChild(d);if(typeof c=="function"){var I=c;c=function(){var F=Xl(R);I.call(F)}}var R=yh(n,0,!1,null,null,!1,!1,"",lm);return n._reactRootContainer=R,n[yr]=R.current,Wo(n.nodeType===8?n.parentNode:n),Qi(function(){Yl(r,R,o,c)}),R}function eu(n,r,o,c,d){var p=o._reactRootContainer;if(p){var _=p;if(typeof d=="function"){var I=d;d=function(){var R=Xl(_);I.call(R)}}Yl(r,_,n,d)}else _=Xv(o,r,n,d,c);return Xl(_)}Ya=function(n){switch(n.tag){case 3:var r=n.stateNode;if(r.current.memoizedState.isDehydrated){var o=br(r.pendingLanes);o!==0&&(jr(r,o|1),Yt(r,$e()),(De&6)===0&&(ro=$e()+500,Qr()))}break;case 13:Qi(function(){var c=wr(n,1);if(c!==null){var d=$t();Ln(c,n,1,d)}}),_h(n,1)}},Cs=function(n){if(n.tag===13){var r=wr(n,134217728);if(r!==null){var o=$t();Ln(r,n,134217728,o)}_h(n,134217728)}},Xa=function(n){if(n.tag===13){var r=ti(n),o=wr(n,r);if(o!==null){var c=$t();Ln(o,n,r,c)}_h(n,r)}},Ja=function(){return Re},Za=function(n,r){var o=Re;try{return Re=n,r()}finally{Re=o}},ki=function(n,r,o){switch(r){case"input":if(ds(n,o),r=o.name,o.type==="radio"&&r!=null){for(o=n;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+r)+'][type="radio"]'),r=0;r<o.length;r++){var c=o[r];if(c!==n&&c.form===n.form){var d=yl(c);if(!d)throw Error(t(90));wi(c),ds(c,d)}}}break;case"textarea":Ai(n,o);break;case"select":r=o.value,r!=null&&zn(n,!!o.multiple,r,!1)}},cr=hh,Ut=Qi;var Jv={usingClientEntryPoint:!1,Events:[Qo,qs,yl,vn,Pi,hh]},ua={findFiberByHostInstance:zi,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Zv={bundleType:ua.bundleType,version:ua.version,rendererPackageName:ua.rendererPackageName,rendererConfig:ua.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:fe.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=No(n),n===null?null:n.stateNode},findFiberByHostInstance:ua.findFiberByHostInstance||Yv,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var tu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!tu.isDisabled&&tu.supportsFiber)try{xi=tu.inject(Zv),en=tu}catch{}}return Xt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Jv,Xt.createPortal=function(n,r){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Eh(r))throw Error(t(200));return Qv(n,r,null,o)},Xt.createRoot=function(n,r){if(!Eh(n))throw Error(t(299));var o=!1,c="",d=am;return r!=null&&(r.unstable_strictMode===!0&&(o=!0),r.identifierPrefix!==void 0&&(c=r.identifierPrefix),r.onRecoverableError!==void 0&&(d=r.onRecoverableError)),r=yh(n,1,!1,null,null,o,!1,c,d),n[yr]=r.current,Wo(n.nodeType===8?n.parentNode:n),new vh(r)},Xt.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var r=n._reactInternals;if(r===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=No(r),n=n===null?null:n.stateNode,n},Xt.flushSync=function(n){return Qi(n)},Xt.hydrate=function(n,r,o){if(!Zl(r))throw Error(t(200));return eu(null,n,r,!0,o)},Xt.hydrateRoot=function(n,r,o){if(!Eh(n))throw Error(t(405));var c=o!=null&&o.hydratedSources||null,d=!1,p="",_=am;if(o!=null&&(o.unstable_strictMode===!0&&(d=!0),o.identifierPrefix!==void 0&&(p=o.identifierPrefix),o.onRecoverableError!==void 0&&(_=o.onRecoverableError)),r=sm(r,null,n,1,o??null,d,!1,p,_),n[yr]=r.current,Wo(n),c)for(n=0;n<c.length;n++)o=c[n],d=o._getVersion,d=d(o._source),r.mutableSourceEagerHydrationData==null?r.mutableSourceEagerHydrationData=[o,d]:r.mutableSourceEagerHydrationData.push(o,d);return new Jl(r)},Xt.render=function(n,r,o){if(!Zl(r))throw Error(t(200));return eu(null,n,r,!1,o)},Xt.unmountComponentAtNode=function(n){if(!Zl(n))throw Error(t(40));return n._reactRootContainer?(Qi(function(){eu(null,null,n,!1,function(){n._reactRootContainer=null,n[yr]=null})}),!0):!1},Xt.unstable_batchedUpdates=hh,Xt.unstable_renderSubtreeIntoContainer=function(n,r,o,c){if(!Zl(o))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return eu(n,r,o,!1,c)},Xt.version="18.3.1-next-f1338f8080-20240426",Xt}var gm;function lE(){if(gm)return Ih.exports;gm=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(e){console.error(e)}}return i(),Ih.exports=aE(),Ih.exports}var ym;function uE(){if(ym)return nu;ym=1;var i=lE();return nu.createRoot=i.createRoot,nu.hydrateRoot=i.hydrateRoot,nu}var cE=uE();const hE=qg(cE);var _m={};/**
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
 */const Hg=function(i){const e=[];let t=0;for(let s=0;s<i.length;s++){let a=i.charCodeAt(s);a<128?e[t++]=a:a<2048?(e[t++]=a>>6|192,e[t++]=a&63|128):(a&64512)===55296&&s+1<i.length&&(i.charCodeAt(s+1)&64512)===56320?(a=65536+((a&1023)<<10)+(i.charCodeAt(++s)&1023),e[t++]=a>>18|240,e[t++]=a>>12&63|128,e[t++]=a>>6&63|128,e[t++]=a&63|128):(e[t++]=a>>12|224,e[t++]=a>>6&63|128,e[t++]=a&63|128)}return e},dE=function(i){const e=[];let t=0,s=0;for(;t<i.length;){const a=i[t++];if(a<128)e[s++]=String.fromCharCode(a);else if(a>191&&a<224){const u=i[t++];e[s++]=String.fromCharCode((a&31)<<6|u&63)}else if(a>239&&a<365){const u=i[t++],h=i[t++],m=i[t++],g=((a&7)<<18|(u&63)<<12|(h&63)<<6|m&63)-65536;e[s++]=String.fromCharCode(55296+(g>>10)),e[s++]=String.fromCharCode(56320+(g&1023))}else{const u=i[t++],h=i[t++];e[s++]=String.fromCharCode((a&15)<<12|(u&63)<<6|h&63)}}return e.join("")},Wg={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(i,e){if(!Array.isArray(i))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let a=0;a<i.length;a+=3){const u=i[a],h=a+1<i.length,m=h?i[a+1]:0,g=a+2<i.length,v=g?i[a+2]:0,w=u>>2,N=(u&3)<<4|m>>4;let b=(m&15)<<2|v>>6,j=v&63;g||(j=64,h||(b=64)),s.push(t[w],t[N],t[b],t[j])}return s.join("")},encodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(i):this.encodeByteArray(Hg(i),e)},decodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(i):dE(this.decodeStringToByteArray(i,e))},decodeStringToByteArray(i,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let a=0;a<i.length;){const u=t[i.charAt(a++)],m=a<i.length?t[i.charAt(a)]:0;++a;const v=a<i.length?t[i.charAt(a)]:64;++a;const N=a<i.length?t[i.charAt(a)]:64;if(++a,u==null||m==null||v==null||N==null)throw new fE;const b=u<<2|m>>4;if(s.push(b),v!==64){const j=m<<4&240|v>>2;if(s.push(j),N!==64){const Q=v<<6&192|N;s.push(Q)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let i=0;i<this.ENCODED_VALS.length;i++)this.byteToCharMap_[i]=this.ENCODED_VALS.charAt(i),this.charToByteMap_[this.byteToCharMap_[i]]=i,this.byteToCharMapWebSafe_[i]=this.ENCODED_VALS_WEBSAFE.charAt(i),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]]=i,i>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)]=i,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)]=i)}}};class fE extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const pE=function(i){const e=Hg(i);return Wg.encodeByteArray(e,!0)},_u=function(i){return pE(i).replace(/\./g,"")},Kg=function(i){try{return Wg.decodeString(i,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function mE(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const gE=()=>mE().__FIREBASE_DEFAULTS__,yE=()=>{if(typeof process>"u"||typeof _m>"u")return;const i=_m.__FIREBASE_DEFAULTS__;if(i)return JSON.parse(i)},_E=()=>{if(typeof document>"u")return;let i;try{i=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=i&&Kg(i[1]);return e&&JSON.parse(e)},xu=()=>{try{return gE()||yE()||_E()}catch(i){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${i}`);return}},Gg=i=>{var e,t;return(t=(e=xu())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[i]},Qg=i=>{const e=Gg(i);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},Yg=()=>{var i;return(i=xu())===null||i===void 0?void 0:i.config},Xg=i=>{var e;return(e=xu())===null||e===void 0?void 0:e[`_${i}`]};/**
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
 */class vE{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
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
 */function Jg(i,e){if(i.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",a=i.iat||0,u=i.sub||i.user_id;if(!u)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const h=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:a,exp:a+3600,auth_time:a,sub:u,user_id:u,firebase:{sign_in_provider:"custom",identities:{}}},i);return[_u(JSON.stringify(t)),_u(JSON.stringify(h)),""].join(".")}/**
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
 */function Ft(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function EE(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ft())}function wE(){var i;const e=(i=xu())===null||i===void 0?void 0:i.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function TE(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function IE(){const i=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof i=="object"&&i.id!==void 0}function SE(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function AE(){const i=Ft();return i.indexOf("MSIE ")>=0||i.indexOf("Trident/")>=0}function RE(){return!wE()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function kE(){try{return typeof indexedDB=="object"}catch{return!1}}function CE(){return new Promise((i,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(s);a.onsuccess=()=>{a.result.close(),t||self.indexedDB.deleteDatabase(s),i(!0)},a.onupgradeneeded=()=>{t=!1},a.onerror=()=>{var u;e(((u=a.error)===null||u===void 0?void 0:u.message)||"")}}catch(t){e(t)}})}/**
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
 */const PE="FirebaseError";class or extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=PE,Object.setPrototypeOf(this,or.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Na.prototype.create)}}class Na{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},a=`${this.service}/${e}`,u=this.errors[e],h=u?NE(u,s):"Error",m=`${this.serviceName}: ${h} (${a}).`;return new or(a,m,s)}}function NE(i,e){return i.replace(DE,(t,s)=>{const a=e[s];return a!=null?String(a):`<${s}?>`})}const DE=/\{\$([^}]+)}/g;function OE(i){for(const e in i)if(Object.prototype.hasOwnProperty.call(i,e))return!1;return!0}function vu(i,e){if(i===e)return!0;const t=Object.keys(i),s=Object.keys(e);for(const a of t){if(!s.includes(a))return!1;const u=i[a],h=e[a];if(vm(u)&&vm(h)){if(!vu(u,h))return!1}else if(u!==h)return!1}for(const a of s)if(!t.includes(a))return!1;return!0}function vm(i){return i!==null&&typeof i=="object"}/**
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
 */function Da(i){const e=[];for(const[t,s]of Object.entries(i))Array.isArray(s)?s.forEach(a=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(a))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function da(i){const e={};return i.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[a,u]=s.split("=");e[decodeURIComponent(a)]=decodeURIComponent(u)}}),e}function fa(i){const e=i.indexOf("?");if(!e)return"";const t=i.indexOf("#",e);return i.substring(e,t>0?t:void 0)}function VE(i,e){const t=new xE(i,e);return t.subscribe.bind(t)}class xE{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,s){let a;if(e===void 0&&t===void 0&&s===void 0)throw new Error("Missing Observer.");LE(e,["next","error","complete"])?a=e:a={next:e,error:t,complete:s},a.next===void 0&&(a.next=Rh),a.error===void 0&&(a.error=Rh),a.complete===void 0&&(a.complete=Rh);const u=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?a.error(this.finalError):a.complete()}catch{}}),this.observers.push(a),u}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function LE(i,e){if(typeof i!="object"||i===null)return!1;for(const t of e)if(t in i&&typeof i[t]=="function")return!0;return!1}function Rh(){}/**
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
 */function Jt(i){return i&&i._delegate?i._delegate:i}class mi{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Zi="[DEFAULT]";/**
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
 */class ME{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new vE;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const a=this.getOrInitializeService({instanceIdentifier:t});a&&s.resolve(a)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const s=this.normalizeInstanceIdentifier(e?.identifier),a=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(u){if(a)return null;throw u}else{if(a)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(FE(e))try{this.getOrInitializeService({instanceIdentifier:Zi})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(t);try{const u=this.getOrInitializeService({instanceIdentifier:a});s.resolve(u)}catch{}}}}clearInstance(e=Zi){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Zi){return this.instances.has(e)}getOptions(e=Zi){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const a=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[u,h]of this.instancesDeferred.entries()){const m=this.normalizeInstanceIdentifier(u);s===m&&h.resolve(a)}return a}onInit(e,t){var s;const a=this.normalizeInstanceIdentifier(t),u=(s=this.onInitCallbacks.get(a))!==null&&s!==void 0?s:new Set;u.add(e),this.onInitCallbacks.set(a,u);const h=this.instances.get(a);return h&&e(h,a),()=>{u.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const a of s)try{a(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:bE(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Zi){return this.component?this.component.multipleInstances?e:Zi:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function bE(i){return i===Zi?void 0:i}function FE(i){return i.instantiationMode==="EAGER"}/**
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
 */class UE{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new ME(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var ke;(function(i){i[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT"})(ke||(ke={}));const jE={debug:ke.DEBUG,verbose:ke.VERBOSE,info:ke.INFO,warn:ke.WARN,error:ke.ERROR,silent:ke.SILENT},zE=ke.INFO,BE={[ke.DEBUG]:"log",[ke.VERBOSE]:"log",[ke.INFO]:"info",[ke.WARN]:"warn",[ke.ERROR]:"error"},$E=(i,e,...t)=>{if(e<i.logLevel)return;const s=new Date().toISOString(),a=BE[e];if(a)console[a](`[${s}]  ${i.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class fd{constructor(e){this.name=e,this._logLevel=zE,this._logHandler=$E,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ke))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?jE[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ke.DEBUG,...e),this._logHandler(this,ke.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ke.VERBOSE,...e),this._logHandler(this,ke.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ke.INFO,...e),this._logHandler(this,ke.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ke.WARN,...e),this._logHandler(this,ke.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ke.ERROR,...e),this._logHandler(this,ke.ERROR,...e)}}const qE=(i,e)=>e.some(t=>i instanceof t);let Em,wm;function HE(){return Em||(Em=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function WE(){return wm||(wm=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Zg=new WeakMap,Uh=new WeakMap,ey=new WeakMap,kh=new WeakMap,pd=new WeakMap;function KE(i){const e=new Promise((t,s)=>{const a=()=>{i.removeEventListener("success",u),i.removeEventListener("error",h)},u=()=>{t(di(i.result)),a()},h=()=>{s(i.error),a()};i.addEventListener("success",u),i.addEventListener("error",h)});return e.then(t=>{t instanceof IDBCursor&&Zg.set(t,i)}).catch(()=>{}),pd.set(e,i),e}function GE(i){if(Uh.has(i))return;const e=new Promise((t,s)=>{const a=()=>{i.removeEventListener("complete",u),i.removeEventListener("error",h),i.removeEventListener("abort",h)},u=()=>{t(),a()},h=()=>{s(i.error||new DOMException("AbortError","AbortError")),a()};i.addEventListener("complete",u),i.addEventListener("error",h),i.addEventListener("abort",h)});Uh.set(i,e)}let jh={get(i,e,t){if(i instanceof IDBTransaction){if(e==="done")return Uh.get(i);if(e==="objectStoreNames")return i.objectStoreNames||ey.get(i);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return di(i[e])},set(i,e,t){return i[e]=t,!0},has(i,e){return i instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in i}};function QE(i){jh=i(jh)}function YE(i){return i===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=i.call(Ch(this),e,...t);return ey.set(s,e.sort?e.sort():[e]),di(s)}:WE().includes(i)?function(...e){return i.apply(Ch(this),e),di(Zg.get(this))}:function(...e){return di(i.apply(Ch(this),e))}}function XE(i){return typeof i=="function"?YE(i):(i instanceof IDBTransaction&&GE(i),qE(i,HE())?new Proxy(i,jh):i)}function di(i){if(i instanceof IDBRequest)return KE(i);if(kh.has(i))return kh.get(i);const e=XE(i);return e!==i&&(kh.set(i,e),pd.set(e,i)),e}const Ch=i=>pd.get(i);function JE(i,e,{blocked:t,upgrade:s,blocking:a,terminated:u}={}){const h=indexedDB.open(i,e),m=di(h);return s&&h.addEventListener("upgradeneeded",g=>{s(di(h.result),g.oldVersion,g.newVersion,di(h.transaction),g)}),t&&h.addEventListener("blocked",g=>t(g.oldVersion,g.newVersion,g)),m.then(g=>{u&&g.addEventListener("close",()=>u()),a&&g.addEventListener("versionchange",v=>a(v.oldVersion,v.newVersion,v))}).catch(()=>{}),m}const ZE=["get","getKey","getAll","getAllKeys","count"],ew=["put","add","delete","clear"],Ph=new Map;function Tm(i,e){if(!(i instanceof IDBDatabase&&!(e in i)&&typeof e=="string"))return;if(Ph.get(e))return Ph.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,a=ew.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(a||ZE.includes(t)))return;const u=async function(h,...m){const g=this.transaction(h,a?"readwrite":"readonly");let v=g.store;return s&&(v=v.index(m.shift())),(await Promise.all([v[t](...m),a&&g.done]))[0]};return Ph.set(e,u),u}QE(i=>({...i,get:(e,t,s)=>Tm(e,t)||i.get(e,t,s),has:(e,t)=>!!Tm(e,t)||i.has(e,t)}));/**
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
 */class tw{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(nw(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function nw(i){const e=i.getComponent();return e?.type==="VERSION"}const zh="@firebase/app",Im="0.10.13";/**
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
 */const Pr=new fd("@firebase/app"),rw="@firebase/app-compat",iw="@firebase/analytics-compat",sw="@firebase/analytics",ow="@firebase/app-check-compat",aw="@firebase/app-check",lw="@firebase/auth",uw="@firebase/auth-compat",cw="@firebase/database",hw="@firebase/data-connect",dw="@firebase/database-compat",fw="@firebase/functions",pw="@firebase/functions-compat",mw="@firebase/installations",gw="@firebase/installations-compat",yw="@firebase/messaging",_w="@firebase/messaging-compat",vw="@firebase/performance",Ew="@firebase/performance-compat",ww="@firebase/remote-config",Tw="@firebase/remote-config-compat",Iw="@firebase/storage",Sw="@firebase/storage-compat",Aw="@firebase/firestore",Rw="@firebase/vertexai-preview",kw="@firebase/firestore-compat",Cw="firebase",Pw="10.14.1";/**
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
 */const Bh="[DEFAULT]",Nw={[zh]:"fire-core",[rw]:"fire-core-compat",[sw]:"fire-analytics",[iw]:"fire-analytics-compat",[aw]:"fire-app-check",[ow]:"fire-app-check-compat",[lw]:"fire-auth",[uw]:"fire-auth-compat",[cw]:"fire-rtdb",[hw]:"fire-data-connect",[dw]:"fire-rtdb-compat",[fw]:"fire-fn",[pw]:"fire-fn-compat",[mw]:"fire-iid",[gw]:"fire-iid-compat",[yw]:"fire-fcm",[_w]:"fire-fcm-compat",[vw]:"fire-perf",[Ew]:"fire-perf-compat",[ww]:"fire-rc",[Tw]:"fire-rc-compat",[Iw]:"fire-gcs",[Sw]:"fire-gcs-compat",[Aw]:"fire-fst",[kw]:"fire-fst-compat",[Rw]:"fire-vertex","fire-js":"fire-js",[Cw]:"fire-js-all"};/**
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
 */const Eu=new Map,Dw=new Map,$h=new Map;function Sm(i,e){try{i.container.addComponent(e)}catch(t){Pr.debug(`Component ${e.name} failed to register with FirebaseApp ${i.name}`,t)}}function rs(i){const e=i.name;if($h.has(e))return Pr.debug(`There were multiple attempts to register component ${e}.`),!1;$h.set(e,i);for(const t of Eu.values())Sm(t,i);for(const t of Dw.values())Sm(t,i);return!0}function Lu(i,e){const t=i.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),i.container.getProvider(e)}function Zn(i){return i.settings!==void 0}/**
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
 */const Ow={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},fi=new Na("app","Firebase",Ow);/**
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
 */class Vw{constructor(e,t,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new mi("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw fi.create("app-deleted",{appName:this._name})}}/**
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
 */const us=Pw;function ty(i,e={}){let t=i;typeof e!="object"&&(e={name:e});const s=Object.assign({name:Bh,automaticDataCollectionEnabled:!1},e),a=s.name;if(typeof a!="string"||!a)throw fi.create("bad-app-name",{appName:String(a)});if(t||(t=Yg()),!t)throw fi.create("no-options");const u=Eu.get(a);if(u){if(vu(t,u.options)&&vu(s,u.config))return u;throw fi.create("duplicate-app",{appName:a})}const h=new UE(a);for(const g of $h.values())h.addComponent(g);const m=new Vw(t,s,h);return Eu.set(a,m),m}function md(i=Bh){const e=Eu.get(i);if(!e&&i===Bh&&Yg())return ty();if(!e)throw fi.create("no-app",{appName:i});return e}function er(i,e,t){var s;let a=(s=Nw[i])!==null&&s!==void 0?s:i;t&&(a+=`-${t}`);const u=a.match(/\s|\//),h=e.match(/\s|\//);if(u||h){const m=[`Unable to register library "${a}" with version "${e}":`];u&&m.push(`library name "${a}" contains illegal characters (whitespace or "/")`),u&&h&&m.push("and"),h&&m.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Pr.warn(m.join(" "));return}rs(new mi(`${a}-version`,()=>({library:a,version:e}),"VERSION"))}/**
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
 */const xw="firebase-heartbeat-database",Lw=1,Ia="firebase-heartbeat-store";let Nh=null;function ny(){return Nh||(Nh=JE(xw,Lw,{upgrade:(i,e)=>{switch(e){case 0:try{i.createObjectStore(Ia)}catch(t){console.warn(t)}}}}).catch(i=>{throw fi.create("idb-open",{originalErrorMessage:i.message})})),Nh}async function Mw(i){try{const t=(await ny()).transaction(Ia),s=await t.objectStore(Ia).get(ry(i));return await t.done,s}catch(e){if(e instanceof or)Pr.warn(e.message);else{const t=fi.create("idb-get",{originalErrorMessage:e?.message});Pr.warn(t.message)}}}async function Am(i,e){try{const s=(await ny()).transaction(Ia,"readwrite");await s.objectStore(Ia).put(e,ry(i)),await s.done}catch(t){if(t instanceof or)Pr.warn(t.message);else{const s=fi.create("idb-set",{originalErrorMessage:t?.message});Pr.warn(s.message)}}}function ry(i){return`${i.name}!${i.options.appId}`}/**
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
 */const bw=1024,Fw=30*24*60*60*1e3;class Uw{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new zw(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const a=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),u=Rm();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===u||this._heartbeatsCache.heartbeats.some(h=>h.date===u)?void 0:(this._heartbeatsCache.heartbeats.push({date:u,agent:a}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(h=>{const m=new Date(h.date).valueOf();return Date.now()-m<=Fw}),this._storage.overwrite(this._heartbeatsCache))}catch(s){Pr.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Rm(),{heartbeatsToSend:s,unsentEntries:a}=jw(this._heartbeatsCache.heartbeats),u=_u(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,a.length>0?(this._heartbeatsCache.heartbeats=a,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),u}catch(t){return Pr.warn(t),""}}}function Rm(){return new Date().toISOString().substring(0,10)}function jw(i,e=bw){const t=[];let s=i.slice();for(const a of i){const u=t.find(h=>h.agent===a.agent);if(u){if(u.dates.push(a.date),km(t)>e){u.dates.pop();break}}else if(t.push({agent:a.agent,dates:[a.date]}),km(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class zw{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return kE()?CE().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Mw(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const a=await this.read();return Am(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:a.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const a=await this.read();return Am(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:a.lastSentHeartbeatDate,heartbeats:[...a.heartbeats,...e.heartbeats]})}else return}}function km(i){return _u(JSON.stringify({version:2,heartbeats:i})).length}/**
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
 */function Bw(i){rs(new mi("platform-logger",e=>new tw(e),"PRIVATE")),rs(new mi("heartbeat",e=>new Uw(e),"PRIVATE")),er(zh,Im,i),er(zh,Im,"esm2017"),er("fire-js","")}Bw("");var $w="firebase",qw="10.14.1";/**
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
 */er($w,qw,"app");function gd(i,e){var t={};for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&e.indexOf(s)<0&&(t[s]=i[s]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,s=Object.getOwnPropertySymbols(i);a<s.length;a++)e.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(i,s[a])&&(t[s[a]]=i[s[a]]);return t}function iy(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Hw=iy,sy=new Na("auth","Firebase",iy());/**
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
 */const wu=new fd("@firebase/auth");function Ww(i,...e){wu.logLevel<=ke.WARN&&wu.warn(`Auth (${us}): ${i}`,...e)}function uu(i,...e){wu.logLevel<=ke.ERROR&&wu.error(`Auth (${us}): ${i}`,...e)}/**
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
 */function bn(i,...e){throw yd(i,...e)}function tr(i,...e){return yd(i,...e)}function oy(i,e,t){const s=Object.assign(Object.assign({},Hw()),{[e]:t});return new Na("auth","Firebase",s).create(e,{appName:i.name})}function Cr(i){return oy(i,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function yd(i,...e){if(typeof i!="string"){const t=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=i.name),i._errorFactory.create(t,...s)}return sy.create(i,...e)}function pe(i,e,...t){if(!i)throw yd(e,...t)}function Ar(i){const e="INTERNAL ASSERTION FAILED: "+i;throw uu(e),new Error(e)}function Nr(i,e){i||Ar(e)}/**
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
 */function qh(){var i;return typeof self<"u"&&((i=self.location)===null||i===void 0?void 0:i.href)||""}function Kw(){return Cm()==="http:"||Cm()==="https:"}function Cm(){var i;return typeof self<"u"&&((i=self.location)===null||i===void 0?void 0:i.protocol)||null}/**
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
 */function Gw(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Kw()||IE()||"connection"in navigator)?navigator.onLine:!0}function Qw(){if(typeof navigator>"u")return null;const i=navigator;return i.languages&&i.languages[0]||i.language||null}/**
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
 */class Oa{constructor(e,t){this.shortDelay=e,this.longDelay=t,Nr(t>e,"Short delay should be less than long delay!"),this.isMobile=EE()||SE()}get(){return Gw()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function _d(i,e){Nr(i.emulator,"Emulator should always be set here");const{url:t}=i.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class ay{static initialize(e,t,s){this.fetchImpl=e,t&&(this.headersImpl=t),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ar("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ar("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ar("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Yw={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Xw=new Oa(3e4,6e4);function vi(i,e){return i.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:i.tenantId}):e}async function Ei(i,e,t,s,a={}){return ly(i,a,async()=>{let u={},h={};s&&(e==="GET"?h=s:u={body:JSON.stringify(s)});const m=Da(Object.assign({key:i.config.apiKey},h)).slice(1),g=await i._getAdditionalHeaders();g["Content-Type"]="application/json",i.languageCode&&(g["X-Firebase-Locale"]=i.languageCode);const v=Object.assign({method:e,headers:g},u);return TE()||(v.referrerPolicy="no-referrer"),ay.fetch()(uy(i,i.config.apiHost,t,m),v)})}async function ly(i,e,t){i._canInitEmulator=!1;const s=Object.assign(Object.assign({},Yw),e);try{const a=new Zw(i),u=await Promise.race([t(),a.promise]);a.clearNetworkTimeout();const h=await u.json();if("needConfirmation"in h)throw ru(i,"account-exists-with-different-credential",h);if(u.ok&&!("errorMessage"in h))return h;{const m=u.ok?h.errorMessage:h.error.message,[g,v]=m.split(" : ");if(g==="FEDERATED_USER_ID_ALREADY_LINKED")throw ru(i,"credential-already-in-use",h);if(g==="EMAIL_EXISTS")throw ru(i,"email-already-in-use",h);if(g==="USER_DISABLED")throw ru(i,"user-disabled",h);const w=s[g]||g.toLowerCase().replace(/[_\s]+/g,"-");if(v)throw oy(i,w,v);bn(i,w)}}catch(a){if(a instanceof or)throw a;bn(i,"network-request-failed",{message:String(a)})}}async function Va(i,e,t,s,a={}){const u=await Ei(i,e,t,s,a);return"mfaPendingCredential"in u&&bn(i,"multi-factor-auth-required",{_serverResponse:u}),u}function uy(i,e,t,s){const a=`${e}${t}?${s}`;return i.config.emulator?_d(i.config,a):`${i.config.apiScheme}://${a}`}function Jw(i){switch(i){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Zw{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,s)=>{this.timer=setTimeout(()=>s(tr(this.auth,"network-request-failed")),Xw.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function ru(i,e,t){const s={appName:i.name};t.email&&(s.email=t.email),t.phoneNumber&&(s.phoneNumber=t.phoneNumber);const a=tr(i,e,s);return a.customData._tokenResponse=t,a}function Pm(i){return i!==void 0&&i.enterprise!==void 0}class e0{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Jw(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function t0(i,e){return Ei(i,"GET","/v2/recaptchaConfig",vi(i,e))}/**
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
 */async function n0(i,e){return Ei(i,"POST","/v1/accounts:delete",e)}async function cy(i,e){return Ei(i,"POST","/v1/accounts:lookup",e)}/**
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
 */function _a(i){if(i)try{const e=new Date(Number(i));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function r0(i,e=!1){const t=Jt(i),s=await t.getIdToken(e),a=vd(s);pe(a&&a.exp&&a.auth_time&&a.iat,t.auth,"internal-error");const u=typeof a.firebase=="object"?a.firebase:void 0,h=u?.sign_in_provider;return{claims:a,token:s,authTime:_a(Dh(a.auth_time)),issuedAtTime:_a(Dh(a.iat)),expirationTime:_a(Dh(a.exp)),signInProvider:h||null,signInSecondFactor:u?.sign_in_second_factor||null}}function Dh(i){return Number(i)*1e3}function vd(i){const[e,t,s]=i.split(".");if(e===void 0||t===void 0||s===void 0)return uu("JWT malformed, contained fewer than 3 sections"),null;try{const a=Kg(t);return a?JSON.parse(a):(uu("Failed to decode base64 JWT payload"),null)}catch(a){return uu("Caught error parsing JWT payload as JSON",a?.toString()),null}}function Nm(i){const e=vd(i);return pe(e,"internal-error"),pe(typeof e.exp<"u","internal-error"),pe(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Sa(i,e,t=!1){if(t)return e;try{return await e}catch(s){throw s instanceof or&&i0(s)&&i.auth.currentUser===i&&await i.auth.signOut(),s}}function i0({code:i}){return i==="auth/user-disabled"||i==="auth/user-token-expired"}/**
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
 */class s0{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const a=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,a)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Hh{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=_a(this.lastLoginAt),this.creationTime=_a(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Tu(i){var e;const t=i.auth,s=await i.getIdToken(),a=await Sa(i,cy(t,{idToken:s}));pe(a?.users.length,t,"internal-error");const u=a.users[0];i._notifyReloadListener(u);const h=!((e=u.providerUserInfo)===null||e===void 0)&&e.length?hy(u.providerUserInfo):[],m=a0(i.providerData,h),g=i.isAnonymous,v=!(i.email&&u.passwordHash)&&!m?.length,w=g?v:!1,N={uid:u.localId,displayName:u.displayName||null,photoURL:u.photoUrl||null,email:u.email||null,emailVerified:u.emailVerified||!1,phoneNumber:u.phoneNumber||null,tenantId:u.tenantId||null,providerData:m,metadata:new Hh(u.createdAt,u.lastLoginAt),isAnonymous:w};Object.assign(i,N)}async function o0(i){const e=Jt(i);await Tu(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function a0(i,e){return[...i.filter(s=>!e.some(a=>a.providerId===s.providerId)),...e]}function hy(i){return i.map(e=>{var{providerId:t}=e,s=gd(e,["providerId"]);return{providerId:t,uid:s.rawId||"",displayName:s.displayName||null,email:s.email||null,phoneNumber:s.phoneNumber||null,photoURL:s.photoUrl||null}})}/**
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
 */async function l0(i,e){const t=await ly(i,{},async()=>{const s=Da({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:a,apiKey:u}=i.config,h=uy(i,a,"/v1/token",`key=${u}`),m=await i._getAdditionalHeaders();return m["Content-Type"]="application/x-www-form-urlencoded",ay.fetch()(h,{method:"POST",headers:m,body:s})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function u0(i,e){return Ei(i,"POST","/v2/accounts:revokeToken",vi(i,e))}/**
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
 */class uo{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){pe(e.idToken,"internal-error"),pe(typeof e.idToken<"u","internal-error"),pe(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Nm(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){pe(e.length!==0,"internal-error");const t=Nm(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(pe(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:s,refreshToken:a,expiresIn:u}=await l0(e,t);this.updateTokensAndExpiration(s,a,Number(u))}updateTokensAndExpiration(e,t,s){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,t){const{refreshToken:s,accessToken:a,expirationTime:u}=t,h=new uo;return s&&(pe(typeof s=="string","internal-error",{appName:e}),h.refreshToken=s),a&&(pe(typeof a=="string","internal-error",{appName:e}),h.accessToken=a),u&&(pe(typeof u=="number","internal-error",{appName:e}),h.expirationTime=u),h}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new uo,this.toJSON())}_performRefresh(){return Ar("not implemented")}}/**
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
 */function si(i,e){pe(typeof i=="string"||typeof i>"u","internal-error",{appName:e})}class Rr{constructor(e){var{uid:t,auth:s,stsTokenManager:a}=e,u=gd(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new s0(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=s,this.stsTokenManager=a,this.accessToken=a.accessToken,this.displayName=u.displayName||null,this.email=u.email||null,this.emailVerified=u.emailVerified||!1,this.phoneNumber=u.phoneNumber||null,this.photoURL=u.photoURL||null,this.isAnonymous=u.isAnonymous||!1,this.tenantId=u.tenantId||null,this.providerData=u.providerData?[...u.providerData]:[],this.metadata=new Hh(u.createdAt||void 0,u.lastLoginAt||void 0)}async getIdToken(e){const t=await Sa(this,this.stsTokenManager.getToken(this.auth,e));return pe(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return r0(this,e)}reload(){return o0(this)}_assign(e){this!==e&&(pe(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Rr(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){pe(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),t&&await Tu(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Zn(this.auth.app))return Promise.reject(Cr(this.auth));const e=await this.getIdToken();return await Sa(this,n0(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var s,a,u,h,m,g,v,w;const N=(s=t.displayName)!==null&&s!==void 0?s:void 0,b=(a=t.email)!==null&&a!==void 0?a:void 0,j=(u=t.phoneNumber)!==null&&u!==void 0?u:void 0,Q=(h=t.photoURL)!==null&&h!==void 0?h:void 0,X=(m=t.tenantId)!==null&&m!==void 0?m:void 0,B=(g=t._redirectEventId)!==null&&g!==void 0?g:void 0,ye=(v=t.createdAt)!==null&&v!==void 0?v:void 0,Ie=(w=t.lastLoginAt)!==null&&w!==void 0?w:void 0,{uid:me,emailVerified:fe,isAnonymous:Me,providerData:ve,stsTokenManager:P}=t;pe(me&&P,e,"internal-error");const T=uo.fromJSON(this.name,P);pe(typeof me=="string",e,"internal-error"),si(N,e.name),si(b,e.name),pe(typeof fe=="boolean",e,"internal-error"),pe(typeof Me=="boolean",e,"internal-error"),si(j,e.name),si(Q,e.name),si(X,e.name),si(B,e.name),si(ye,e.name),si(Ie,e.name);const A=new Rr({uid:me,auth:e,email:b,emailVerified:fe,displayName:N,isAnonymous:Me,photoURL:Q,phoneNumber:j,tenantId:X,stsTokenManager:T,createdAt:ye,lastLoginAt:Ie});return ve&&Array.isArray(ve)&&(A.providerData=ve.map(k=>Object.assign({},k))),B&&(A._redirectEventId=B),A}static async _fromIdTokenResponse(e,t,s=!1){const a=new uo;a.updateFromServerResponse(t);const u=new Rr({uid:t.localId,auth:e,stsTokenManager:a,isAnonymous:s});return await Tu(u),u}static async _fromGetAccountInfoResponse(e,t,s){const a=t.users[0];pe(a.localId!==void 0,"internal-error");const u=a.providerUserInfo!==void 0?hy(a.providerUserInfo):[],h=!(a.email&&a.passwordHash)&&!u?.length,m=new uo;m.updateFromIdToken(s);const g=new Rr({uid:a.localId,auth:e,stsTokenManager:m,isAnonymous:h}),v={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:u,metadata:new Hh(a.createdAt,a.lastLoginAt),isAnonymous:!(a.email&&a.passwordHash)&&!u?.length};return Object.assign(g,v),g}}/**
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
 */const Dm=new Map;function kr(i){Nr(i instanceof Function,"Expected a class definition");let e=Dm.get(i);return e?(Nr(e instanceof i,"Instance stored in cache mismatched with class"),e):(e=new i,Dm.set(i,e),e)}/**
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
 */class dy{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}dy.type="NONE";const Om=dy;/**
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
 */function cu(i,e,t){return`firebase:${i}:${e}:${t}`}class co{constructor(e,t,s){this.persistence=e,this.auth=t,this.userKey=s;const{config:a,name:u}=this.auth;this.fullUserKey=cu(this.userKey,a.apiKey,u),this.fullPersistenceKey=cu("persistence",a.apiKey,u),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Rr._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,s="authUser"){if(!t.length)return new co(kr(Om),e,s);const a=(await Promise.all(t.map(async v=>{if(await v._isAvailable())return v}))).filter(v=>v);let u=a[0]||kr(Om);const h=cu(s,e.config.apiKey,e.name);let m=null;for(const v of t)try{const w=await v._get(h);if(w){const N=Rr._fromJSON(e,w);v!==u&&(m=N),u=v;break}}catch{}const g=a.filter(v=>v._shouldAllowMigration);return!u._shouldAllowMigration||!g.length?new co(u,e,s):(u=g[0],m&&await u._set(h,m.toJSON()),await Promise.all(t.map(async v=>{if(v!==u)try{await v._remove(h)}catch{}})),new co(u,e,s))}}/**
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
 */function Vm(i){const e=i.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(gy(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(fy(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(_y(e))return"Blackberry";if(vy(e))return"Webos";if(py(e))return"Safari";if((e.includes("chrome/")||my(e))&&!e.includes("edge/"))return"Chrome";if(yy(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=i.match(t);if(s?.length===2)return s[1]}return"Other"}function fy(i=Ft()){return/firefox\//i.test(i)}function py(i=Ft()){const e=i.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function my(i=Ft()){return/crios\//i.test(i)}function gy(i=Ft()){return/iemobile/i.test(i)}function yy(i=Ft()){return/android/i.test(i)}function _y(i=Ft()){return/blackberry/i.test(i)}function vy(i=Ft()){return/webos/i.test(i)}function Ed(i=Ft()){return/iphone|ipad|ipod/i.test(i)||/macintosh/i.test(i)&&/mobile/i.test(i)}function c0(i=Ft()){var e;return Ed(i)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function h0(){return AE()&&document.documentMode===10}function Ey(i=Ft()){return Ed(i)||yy(i)||vy(i)||_y(i)||/windows phone/i.test(i)||gy(i)}/**
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
 */function wy(i,e=[]){let t;switch(i){case"Browser":t=Vm(Ft());break;case"Worker":t=`${Vm(Ft())}-${i}`;break;default:t=i}const s=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${us}/${s}`}/**
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
 */class d0{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const s=u=>new Promise((h,m)=>{try{const g=e(u);h(g)}catch(g){m(g)}});s.onAbort=t,this.queue.push(s);const a=this.queue.length-1;return()=>{this.queue[a]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const s of this.queue)await s(e),s.onAbort&&t.push(s.onAbort)}catch(s){t.reverse();for(const a of t)try{a()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s?.message})}}}/**
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
 */async function f0(i,e={}){return Ei(i,"GET","/v2/passwordPolicy",vi(i,e))}/**
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
 */const p0=6;class m0{constructor(e){var t,s,a,u;const h=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=h.minPasswordLength)!==null&&t!==void 0?t:p0,h.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=h.maxPasswordLength),h.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=h.containsLowercaseCharacter),h.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=h.containsUppercaseCharacter),h.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=h.containsNumericCharacter),h.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=h.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(a=(s=e.allowedNonAlphanumericCharacters)===null||s===void 0?void 0:s.join(""))!==null&&a!==void 0?a:"",this.forceUpgradeOnSignin=(u=e.forceUpgradeOnSignin)!==null&&u!==void 0?u:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,s,a,u,h,m;const g={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,g),this.validatePasswordCharacterOptions(e,g),g.isValid&&(g.isValid=(t=g.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),g.isValid&&(g.isValid=(s=g.meetsMaxPasswordLength)!==null&&s!==void 0?s:!0),g.isValid&&(g.isValid=(a=g.containsLowercaseLetter)!==null&&a!==void 0?a:!0),g.isValid&&(g.isValid=(u=g.containsUppercaseLetter)!==null&&u!==void 0?u:!0),g.isValid&&(g.isValid=(h=g.containsNumericCharacter)!==null&&h!==void 0?h:!0),g.isValid&&(g.isValid=(m=g.containsNonAlphanumericCharacter)!==null&&m!==void 0?m:!0),g}validatePasswordLengthOptions(e,t){const s=this.customStrengthOptions.minPasswordLength,a=this.customStrengthOptions.maxPasswordLength;s&&(t.meetsMinPasswordLength=e.length>=s),a&&(t.meetsMaxPasswordLength=e.length<=a)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let s;for(let a=0;a<e.length;a++)s=e.charAt(a),this.updatePasswordCharacterOptionsStatuses(t,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,t,s,a,u){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=a)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=u))}}/**
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
 */class g0{constructor(e,t,s,a){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=s,this.config=a,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new xm(this),this.idTokenSubscription=new xm(this),this.beforeStateQueue=new d0(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=sy,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=a.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=kr(t)),this._initializationPromise=this.queue(async()=>{var s,a;if(!this._deleted&&(this.persistenceManager=await co.create(this,e),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((a=this.currentUser)===null||a===void 0?void 0:a.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await cy(this,{idToken:e}),s=await Rr._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(s)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Zn(this.app)){const h=this.app.settings.authIdToken;return h?new Promise(m=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(h).then(m,m))}):this.directlySetCurrentUser(null)}const s=await this.assertedPersistence.getCurrentUser();let a=s,u=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const h=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,m=a?._redirectEventId,g=await this.tryRedirectSignIn(e);(!h||h===m)&&g?.user&&(a=g.user,u=!0)}if(!a)return this.directlySetCurrentUser(null);if(!a._redirectEventId){if(u)try{await this.beforeStateQueue.runMiddleware(a)}catch(h){a=s,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(h))}return a?this.reloadAndSetCurrentUserOrClear(a):this.directlySetCurrentUser(null)}return pe(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===a._redirectEventId?this.directlySetCurrentUser(a):this.reloadAndSetCurrentUserOrClear(a)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Tu(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Qw()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Zn(this.app))return Promise.reject(Cr(this));const t=e?Jt(e):null;return t&&pe(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&pe(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Zn(this.app)?Promise.reject(Cr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Zn(this.app)?Promise.reject(Cr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(kr(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await f0(this),t=new m0(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Na("auth","Firebase",e())}onAuthStateChanged(e,t,s){return this.registerStateListener(this.authStateSubscription,e,t,s)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,s){return this.registerStateListener(this.idTokenSubscription,e,t,s)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(s.tenantId=this.tenantId),await u0(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const s=await this.getOrInitRedirectPersistenceManager(t);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&kr(e)||this._popupRedirectResolver;pe(t,this,"argument-error"),this.redirectPersistenceManager=await co.create(this,[kr(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,s;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((s=this.redirectUser)===null||s===void 0?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const s=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==s&&(this.lastNotifiedUid=s,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,s,a){if(this._deleted)return()=>{};const u=typeof t=="function"?t:t.next.bind(t);let h=!1;const m=this._isInitialized?Promise.resolve():this._initializationPromise;if(pe(m,this,"internal-error"),m.then(()=>{h||u(this.currentUser)}),typeof t=="function"){const g=e.addObserver(t,s,a);return()=>{h=!0,g()}}else{const g=e.addObserver(t);return()=>{h=!0,g()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return pe(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=wy(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const s=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());s&&(t["X-Firebase-Client"]=s);const a=await this._getAppCheckToken();return a&&(t["X-Firebase-AppCheck"]=a),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&Ww(`Error while retrieving App Check token: ${t.error}`),t?.token}}function cs(i){return Jt(i)}class xm{constructor(e){this.auth=e,this.observer=null,this.addObserver=VE(t=>this.observer=t)}get next(){return pe(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Mu={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function y0(i){Mu=i}function Ty(i){return Mu.loadJS(i)}function _0(){return Mu.recaptchaEnterpriseScript}function v0(){return Mu.gapiScript}function E0(i){return`__${i}${Math.floor(Math.random()*1e6)}`}const w0="recaptcha-enterprise",T0="NO_RECAPTCHA";class I0{constructor(e){this.type=w0,this.auth=cs(e)}async verify(e="verify",t=!1){async function s(u){if(!t){if(u.tenantId==null&&u._agentRecaptchaConfig!=null)return u._agentRecaptchaConfig.siteKey;if(u.tenantId!=null&&u._tenantRecaptchaConfigs[u.tenantId]!==void 0)return u._tenantRecaptchaConfigs[u.tenantId].siteKey}return new Promise(async(h,m)=>{t0(u,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(g=>{if(g.recaptchaKey===void 0)m(new Error("recaptcha Enterprise site key undefined"));else{const v=new e0(g);return u.tenantId==null?u._agentRecaptchaConfig=v:u._tenantRecaptchaConfigs[u.tenantId]=v,h(v.siteKey)}}).catch(g=>{m(g)})})}function a(u,h,m){const g=window.grecaptcha;Pm(g)?g.enterprise.ready(()=>{g.enterprise.execute(u,{action:e}).then(v=>{h(v)}).catch(()=>{h(T0)})}):m(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((u,h)=>{s(this.auth).then(m=>{if(!t&&Pm(window.grecaptcha))a(m,u,h);else{if(typeof window>"u"){h(new Error("RecaptchaVerifier is only supported in browser"));return}let g=_0();g.length!==0&&(g+=m),Ty(g).then(()=>{a(m,u,h)}).catch(v=>{h(v)})}}).catch(m=>{h(m)})})}}async function Lm(i,e,t,s=!1){const a=new I0(i);let u;try{u=await a.verify(t)}catch{u=await a.verify(t,!0)}const h=Object.assign({},e);return s?Object.assign(h,{captchaResp:u}):Object.assign(h,{captchaResponse:u}),Object.assign(h,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(h,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),h}async function Wh(i,e,t,s){var a;if(!((a=i._getRecaptchaConfig())===null||a===void 0)&&a.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const u=await Lm(i,e,t,t==="getOobCode");return s(i,u)}else return s(i,e).catch(async u=>{if(u.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const h=await Lm(i,e,t,t==="getOobCode");return s(i,h)}else return Promise.reject(u)})}/**
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
 */function S0(i,e){const t=Lu(i,"auth");if(t.isInitialized()){const a=t.getImmediate(),u=t.getOptions();if(vu(u,e??{}))return a;bn(a,"already-initialized")}return t.initialize({options:e})}function A0(i,e){const t=e?.persistence||[],s=(Array.isArray(t)?t:[t]).map(kr);e?.errorMap&&i._updateErrorMap(e.errorMap),i._initializeWithPersistence(s,e?.popupRedirectResolver)}function R0(i,e,t){const s=cs(i);pe(s._canInitEmulator,s,"emulator-config-failed"),pe(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const a=!1,u=Iy(e),{host:h,port:m}=k0(e),g=m===null?"":`:${m}`;s.config.emulator={url:`${u}//${h}${g}/`},s.settings.appVerificationDisabledForTesting=!0,s.emulatorConfig=Object.freeze({host:h,port:m,protocol:u.replace(":",""),options:Object.freeze({disableWarnings:a})}),C0()}function Iy(i){const e=i.indexOf(":");return e<0?"":i.substr(0,e+1)}function k0(i){const e=Iy(i),t=/(\/\/)?([^?#/]+)/.exec(i.substr(e.length));if(!t)return{host:"",port:null};const s=t[2].split("@").pop()||"",a=/^(\[[^\]]+\])(:|$)/.exec(s);if(a){const u=a[1];return{host:u,port:Mm(s.substr(u.length+1))}}else{const[u,h]=s.split(":");return{host:u,port:Mm(h)}}}function Mm(i){if(!i)return null;const e=Number(i);return isNaN(e)?null:e}function C0(){function i(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",i):i())}/**
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
 */class wd{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ar("not implemented")}_getIdTokenResponse(e){return Ar("not implemented")}_linkToIdToken(e,t){return Ar("not implemented")}_getReauthenticationResolver(e){return Ar("not implemented")}}async function P0(i,e){return Ei(i,"POST","/v1/accounts:signUp",e)}/**
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
 */async function N0(i,e){return Va(i,"POST","/v1/accounts:signInWithPassword",vi(i,e))}/**
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
 */async function D0(i,e){return Va(i,"POST","/v1/accounts:signInWithEmailLink",vi(i,e))}async function O0(i,e){return Va(i,"POST","/v1/accounts:signInWithEmailLink",vi(i,e))}/**
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
 */class Aa extends wd{constructor(e,t,s,a=null){super("password",s),this._email=e,this._password=t,this._tenantId=a}static _fromEmailAndPassword(e,t){return new Aa(e,t,"password")}static _fromEmailAndCode(e,t,s=null){return new Aa(e,t,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Wh(e,t,"signInWithPassword",N0);case"emailLink":return D0(e,{email:this._email,oobCode:this._password});default:bn(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const s={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Wh(e,s,"signUpPassword",P0);case"emailLink":return O0(e,{idToken:t,email:this._email,oobCode:this._password});default:bn(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function ho(i,e){return Va(i,"POST","/v1/accounts:signInWithIdp",vi(i,e))}/**
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
 */const V0="http://localhost";class is extends wd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new is(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):bn("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:a}=t,u=gd(t,["providerId","signInMethod"]);if(!s||!a)return null;const h=new is(s,a);return h.idToken=u.idToken||void 0,h.accessToken=u.accessToken||void 0,h.secret=u.secret,h.nonce=u.nonce,h.pendingToken=u.pendingToken||null,h}_getIdTokenResponse(e){const t=this.buildRequest();return ho(e,t)}_linkToIdToken(e,t){const s=this.buildRequest();return s.idToken=t,ho(e,s)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,ho(e,t)}buildRequest(){const e={requestUri:V0,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Da(t)}return e}}/**
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
 */function x0(i){switch(i){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function L0(i){const e=da(fa(i)).link,t=e?da(fa(e)).deep_link_id:null,s=da(fa(i)).deep_link_id;return(s?da(fa(s)).link:null)||s||t||e||i}class Td{constructor(e){var t,s,a,u,h,m;const g=da(fa(e)),v=(t=g.apiKey)!==null&&t!==void 0?t:null,w=(s=g.oobCode)!==null&&s!==void 0?s:null,N=x0((a=g.mode)!==null&&a!==void 0?a:null);pe(v&&w&&N,"argument-error"),this.apiKey=v,this.operation=N,this.code=w,this.continueUrl=(u=g.continueUrl)!==null&&u!==void 0?u:null,this.languageCode=(h=g.languageCode)!==null&&h!==void 0?h:null,this.tenantId=(m=g.tenantId)!==null&&m!==void 0?m:null}static parseLink(e){const t=L0(e);try{return new Td(t)}catch{return null}}}/**
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
 */class Io{constructor(){this.providerId=Io.PROVIDER_ID}static credential(e,t){return Aa._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const s=Td.parseLink(t);return pe(s,"argument-error"),Aa._fromEmailAndCode(e,s.code,s.tenantId)}}Io.PROVIDER_ID="password";Io.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Io.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Sy{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class xa extends Sy{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class oi extends xa{constructor(){super("facebook.com")}static credential(e){return is._fromParams({providerId:oi.PROVIDER_ID,signInMethod:oi.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return oi.credentialFromTaggedObject(e)}static credentialFromError(e){return oi.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return oi.credential(e.oauthAccessToken)}catch{return null}}}oi.FACEBOOK_SIGN_IN_METHOD="facebook.com";oi.PROVIDER_ID="facebook.com";/**
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
 */class ai extends xa{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return is._fromParams({providerId:ai.PROVIDER_ID,signInMethod:ai.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ai.credentialFromTaggedObject(e)}static credentialFromError(e){return ai.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:s}=e;if(!t&&!s)return null;try{return ai.credential(t,s)}catch{return null}}}ai.GOOGLE_SIGN_IN_METHOD="google.com";ai.PROVIDER_ID="google.com";/**
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
 */class li extends xa{constructor(){super("github.com")}static credential(e){return is._fromParams({providerId:li.PROVIDER_ID,signInMethod:li.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return li.credentialFromTaggedObject(e)}static credentialFromError(e){return li.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return li.credential(e.oauthAccessToken)}catch{return null}}}li.GITHUB_SIGN_IN_METHOD="github.com";li.PROVIDER_ID="github.com";/**
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
 */class ui extends xa{constructor(){super("twitter.com")}static credential(e,t){return is._fromParams({providerId:ui.PROVIDER_ID,signInMethod:ui.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return ui.credentialFromTaggedObject(e)}static credentialFromError(e){return ui.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:s}=e;if(!t||!s)return null;try{return ui.credential(t,s)}catch{return null}}}ui.TWITTER_SIGN_IN_METHOD="twitter.com";ui.PROVIDER_ID="twitter.com";/**
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
 */async function M0(i,e){return Va(i,"POST","/v1/accounts:signUp",vi(i,e))}/**
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
 */class ss{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,s,a=!1){const u=await Rr._fromIdTokenResponse(e,s,a),h=bm(s);return new ss({user:u,providerId:h,_tokenResponse:s,operationType:t})}static async _forOperation(e,t,s){await e._updateTokensIfNecessary(s,!0);const a=bm(s);return new ss({user:e,providerId:a,_tokenResponse:s,operationType:t})}}function bm(i){return i.providerId?i.providerId:"phoneNumber"in i?"phone":null}/**
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
 */class Iu extends or{constructor(e,t,s,a){var u;super(t.code,t.message),this.operationType=s,this.user=a,Object.setPrototypeOf(this,Iu.prototype),this.customData={appName:e.name,tenantId:(u=e.tenantId)!==null&&u!==void 0?u:void 0,_serverResponse:t.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,t,s,a){return new Iu(e,t,s,a)}}function Ay(i,e,t,s){return(e==="reauthenticate"?t._getReauthenticationResolver(i):t._getIdTokenResponse(i)).catch(u=>{throw u.code==="auth/multi-factor-auth-required"?Iu._fromErrorAndOperation(i,u,e,s):u})}async function b0(i,e,t=!1){const s=await Sa(i,e._linkToIdToken(i.auth,await i.getIdToken()),t);return ss._forOperation(i,"link",s)}/**
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
 */async function F0(i,e,t=!1){const{auth:s}=i;if(Zn(s.app))return Promise.reject(Cr(s));const a="reauthenticate";try{const u=await Sa(i,Ay(s,a,e,i),t);pe(u.idToken,s,"internal-error");const h=vd(u.idToken);pe(h,s,"internal-error");const{sub:m}=h;return pe(i.uid===m,s,"user-mismatch"),ss._forOperation(i,a,u)}catch(u){throw u?.code==="auth/user-not-found"&&bn(s,"user-mismatch"),u}}/**
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
 */async function Ry(i,e,t=!1){if(Zn(i.app))return Promise.reject(Cr(i));const s="signIn",a=await Ay(i,s,e),u=await ss._fromIdTokenResponse(i,s,a);return t||await i._updateCurrentUser(u.user),u}async function U0(i,e){return Ry(cs(i),e)}/**
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
 */async function ky(i){const e=cs(i);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function j0(i,e,t){if(Zn(i.app))return Promise.reject(Cr(i));const s=cs(i),h=await Wh(s,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",M0).catch(g=>{throw g.code==="auth/password-does-not-meet-requirements"&&ky(i),g}),m=await ss._fromIdTokenResponse(s,"signIn",h);return await s._updateCurrentUser(m.user),m}function z0(i,e,t){return Zn(i.app)?Promise.reject(Cr(i)):U0(Jt(i),Io.credential(e,t)).catch(async s=>{throw s.code==="auth/password-does-not-meet-requirements"&&ky(i),s})}function B0(i,e,t,s){return Jt(i).onIdTokenChanged(e,t,s)}function $0(i,e,t){return Jt(i).beforeAuthStateChanged(e,t)}const Su="__sak";/**
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
 */class Cy{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Su,"1"),this.storage.removeItem(Su),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const q0=1e3,H0=10;class Py extends Cy{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ey(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const s=this.storage.getItem(t),a=this.localCache[t];s!==a&&e(t,a,s)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((h,m,g)=>{this.notifyListeners(h,g)});return}const s=e.key;t?this.detachListener():this.stopPolling();const a=()=>{const h=this.storage.getItem(s);!t&&this.localCache[s]===h||this.notifyListeners(s,h)},u=this.storage.getItem(s);h0()&&u!==e.newValue&&e.newValue!==e.oldValue?setTimeout(a,H0):a()}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const a of Array.from(s))a(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:s}),!0)})},q0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Py.type="LOCAL";const W0=Py;/**
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
 */class Ny extends Cy{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Ny.type="SESSION";const Dy=Ny;/**
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
 */function K0(i){return Promise.all(i.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class bu{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(a=>a.isListeningto(e));if(t)return t;const s=new bu(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:s,eventType:a,data:u}=t.data,h=this.handlersMap[a];if(!h?.size)return;t.ports[0].postMessage({status:"ack",eventId:s,eventType:a});const m=Array.from(h).map(async v=>v(t.origin,u)),g=await K0(m);t.ports[0].postMessage({status:"done",eventId:s,eventType:a,response:g})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}bu.receivers=[];/**
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
 */function Id(i="",e=10){let t="";for(let s=0;s<e;s++)t+=Math.floor(Math.random()*10);return i+t}/**
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
 */class G0{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,s=50){const a=typeof MessageChannel<"u"?new MessageChannel:null;if(!a)throw new Error("connection_unavailable");let u,h;return new Promise((m,g)=>{const v=Id("",20);a.port1.start();const w=setTimeout(()=>{g(new Error("unsupported_event"))},s);h={messageChannel:a,onMessage(N){const b=N;if(b.data.eventId===v)switch(b.data.status){case"ack":clearTimeout(w),u=setTimeout(()=>{g(new Error("timeout"))},3e3);break;case"done":clearTimeout(u),m(b.data.response);break;default:clearTimeout(w),clearTimeout(u),g(new Error("invalid_response"));break}}},this.handlers.add(h),a.port1.addEventListener("message",h.onMessage),this.target.postMessage({eventType:e,eventId:v,data:t},[a.port2])}).finally(()=>{h&&this.removeMessageHandler(h)})}}/**
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
 */function nr(){return window}function Q0(i){nr().location.href=i}/**
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
 */function Oy(){return typeof nr().WorkerGlobalScope<"u"&&typeof nr().importScripts=="function"}async function Y0(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function X0(){var i;return((i=navigator?.serviceWorker)===null||i===void 0?void 0:i.controller)||null}function J0(){return Oy()?self:null}/**
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
 */const Vy="firebaseLocalStorageDb",Z0=1,Au="firebaseLocalStorage",xy="fbase_key";class La{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Fu(i,e){return i.transaction([Au],e?"readwrite":"readonly").objectStore(Au)}function eT(){const i=indexedDB.deleteDatabase(Vy);return new La(i).toPromise()}function Kh(){const i=indexedDB.open(Vy,Z0);return new Promise((e,t)=>{i.addEventListener("error",()=>{t(i.error)}),i.addEventListener("upgradeneeded",()=>{const s=i.result;try{s.createObjectStore(Au,{keyPath:xy})}catch(a){t(a)}}),i.addEventListener("success",async()=>{const s=i.result;s.objectStoreNames.contains(Au)?e(s):(s.close(),await eT(),e(await Kh()))})})}async function Fm(i,e,t){const s=Fu(i,!0).put({[xy]:e,value:t});return new La(s).toPromise()}async function tT(i,e){const t=Fu(i,!1).get(e),s=await new La(t).toPromise();return s===void 0?null:s.value}function Um(i,e){const t=Fu(i,!0).delete(e);return new La(t).toPromise()}const nT=800,rT=3;class Ly{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Kh(),this.db)}async _withRetries(e){let t=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(t++>rT)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Oy()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=bu._getInstance(J0()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Y0(),!this.activeServiceWorker)return;this.sender=new G0(this.activeServiceWorker);const s=await this.sender._send("ping",{},800);s&&!((e=s[0])===null||e===void 0)&&e.fulfilled&&!((t=s[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||X0()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Kh();return await Fm(e,Su,"1"),await Um(e,Su),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(s=>Fm(s,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(s=>tT(s,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Um(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(a=>{const u=Fu(a,!1).getAll();return new La(u).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],s=new Set;if(e.length!==0)for(const{fbase_key:a,value:u}of e)s.add(a),JSON.stringify(this.localCache[a])!==JSON.stringify(u)&&(this.notifyListeners(a,u),t.push(a));for(const a of Object.keys(this.localCache))this.localCache[a]&&!s.has(a)&&(this.notifyListeners(a,null),t.push(a));return t}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const a of Array.from(s))a(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),nT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ly.type="LOCAL";const iT=Ly;new Oa(3e4,6e4);/**
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
 */function sT(i,e){return e?kr(e):(pe(i._popupRedirectResolver,i,"argument-error"),i._popupRedirectResolver)}/**
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
 */class Sd extends wd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ho(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ho(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ho(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function oT(i){return Ry(i.auth,new Sd(i),i.bypassAuthState)}function aT(i){const{auth:e,user:t}=i;return pe(t,e,"internal-error"),F0(t,new Sd(i),i.bypassAuthState)}async function lT(i){const{auth:e,user:t}=i;return pe(t,e,"internal-error"),b0(t,new Sd(i),i.bypassAuthState)}/**
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
 */class My{constructor(e,t,s,a,u=!1){this.auth=e,this.resolver=s,this.user=a,this.bypassAuthState=u,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:s,postBody:a,tenantId:u,error:h,type:m}=e;if(h){this.reject(h);return}const g={auth:this.auth,requestUri:t,sessionId:s,tenantId:u||void 0,postBody:a||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(m)(g))}catch(v){this.reject(v)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return oT;case"linkViaPopup":case"linkViaRedirect":return lT;case"reauthViaPopup":case"reauthViaRedirect":return aT;default:bn(this.auth,"internal-error")}}resolve(e){Nr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Nr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const uT=new Oa(2e3,1e4);class lo extends My{constructor(e,t,s,a,u){super(e,t,a,u),this.provider=s,this.authWindow=null,this.pollId=null,lo.currentPopupAction&&lo.currentPopupAction.cancel(),lo.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return pe(e,this.auth,"internal-error"),e}async onExecution(){Nr(this.filter.length===1,"Popup operations only handle one event");const e=Id();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(tr(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(tr(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,lo.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,s;if(!((s=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||s===void 0)&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(tr(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,uT.get())};e()}}lo.currentPopupAction=null;/**
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
 */const cT="pendingRedirect",hu=new Map;class hT extends My{constructor(e,t,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,s),this.eventId=null}async execute(){let e=hu.get(this.auth._key());if(!e){try{const s=await dT(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(t){e=()=>Promise.reject(t)}hu.set(this.auth._key(),e)}return this.bypassAuthState||hu.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function dT(i,e){const t=mT(e),s=pT(i);if(!await s._isAvailable())return!1;const a=await s._get(t)==="true";return await s._remove(t),a}function fT(i,e){hu.set(i._key(),e)}function pT(i){return kr(i._redirectPersistence)}function mT(i){return cu(cT,i.config.apiKey,i.name)}async function gT(i,e,t=!1){if(Zn(i.app))return Promise.reject(Cr(i));const s=cs(i),a=sT(s,e),h=await new hT(s,a,t).execute();return h&&!t&&(delete h.user._redirectEventId,await s._persistUserIfCurrent(h.user),await s._setRedirectUser(null,e)),h}/**
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
 */const yT=10*60*1e3;class _T{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(t=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!vT(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var s;if(e.error&&!by(e)){const a=((s=e.error.code)===null||s===void 0?void 0:s.split("auth/")[1])||"internal-error";t.onError(tr(this.auth,a))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const s=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=yT&&this.cachedEventUids.clear(),this.cachedEventUids.has(jm(e))}saveEventToCache(e){this.cachedEventUids.add(jm(e)),this.lastProcessedEventTime=Date.now()}}function jm(i){return[i.type,i.eventId,i.sessionId,i.tenantId].filter(e=>e).join("-")}function by({type:i,error:e}){return i==="unknown"&&e?.code==="auth/no-auth-event"}function vT(i){switch(i.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return by(i);default:return!1}}/**
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
 */async function ET(i,e={}){return Ei(i,"GET","/v1/projects",e)}/**
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
 */const wT=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,TT=/^https?/;async function IT(i){if(i.config.emulator)return;const{authorizedDomains:e}=await ET(i);for(const t of e)try{if(ST(t))return}catch{}bn(i,"unauthorized-domain")}function ST(i){const e=qh(),{protocol:t,hostname:s}=new URL(e);if(i.startsWith("chrome-extension://")){const h=new URL(i);return h.hostname===""&&s===""?t==="chrome-extension:"&&i.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&h.hostname===s}if(!TT.test(t))return!1;if(wT.test(i))return s===i;const a=i.replace(/\./g,"\\.");return new RegExp("^(.+\\."+a+"|"+a+")$","i").test(s)}/**
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
 */const AT=new Oa(3e4,6e4);function zm(){const i=nr().___jsl;if(i?.H){for(const e of Object.keys(i.H))if(i.H[e].r=i.H[e].r||[],i.H[e].L=i.H[e].L||[],i.H[e].r=[...i.H[e].L],i.CP)for(let t=0;t<i.CP.length;t++)i.CP[t]=null}}function RT(i){return new Promise((e,t)=>{var s,a,u;function h(){zm(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{zm(),t(tr(i,"network-request-failed"))},timeout:AT.get()})}if(!((a=(s=nr().gapi)===null||s===void 0?void 0:s.iframes)===null||a===void 0)&&a.Iframe)e(gapi.iframes.getContext());else if(!((u=nr().gapi)===null||u===void 0)&&u.load)h();else{const m=E0("iframefcb");return nr()[m]=()=>{gapi.load?h():t(tr(i,"network-request-failed"))},Ty(`${v0()}?onload=${m}`).catch(g=>t(g))}}).catch(e=>{throw du=null,e})}let du=null;function kT(i){return du=du||RT(i),du}/**
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
 */const CT=new Oa(5e3,15e3),PT="__/auth/iframe",NT="emulator/auth/iframe",DT={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},OT=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function VT(i){const e=i.config;pe(e.authDomain,i,"auth-domain-config-required");const t=e.emulator?_d(e,NT):`https://${i.config.authDomain}/${PT}`,s={apiKey:e.apiKey,appName:i.name,v:us},a=OT.get(i.config.apiHost);a&&(s.eid=a);const u=i._getFrameworks();return u.length&&(s.fw=u.join(",")),`${t}?${Da(s).slice(1)}`}async function xT(i){const e=await kT(i),t=nr().gapi;return pe(t,i,"internal-error"),e.open({where:document.body,url:VT(i),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:DT,dontclear:!0},s=>new Promise(async(a,u)=>{await s.restyle({setHideOnLeave:!1});const h=tr(i,"network-request-failed"),m=nr().setTimeout(()=>{u(h)},CT.get());function g(){nr().clearTimeout(m),a(s)}s.ping(g).then(g,()=>{u(h)})}))}/**
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
 */const LT={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},MT=500,bT=600,FT="_blank",UT="http://localhost";class Bm{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function jT(i,e,t,s=MT,a=bT){const u=Math.max((window.screen.availHeight-a)/2,0).toString(),h=Math.max((window.screen.availWidth-s)/2,0).toString();let m="";const g=Object.assign(Object.assign({},LT),{width:s.toString(),height:a.toString(),top:u,left:h}),v=Ft().toLowerCase();t&&(m=my(v)?FT:t),fy(v)&&(e=e||UT,g.scrollbars="yes");const w=Object.entries(g).reduce((b,[j,Q])=>`${b}${j}=${Q},`,"");if(c0(v)&&m!=="_self")return zT(e||"",m),new Bm(null);const N=window.open(e||"",m,w);pe(N,i,"popup-blocked");try{N.focus()}catch{}return new Bm(N)}function zT(i,e){const t=document.createElement("a");t.href=i,t.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(s)}/**
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
 */const BT="__/auth/handler",$T="emulator/auth/handler",qT=encodeURIComponent("fac");async function $m(i,e,t,s,a,u){pe(i.config.authDomain,i,"auth-domain-config-required"),pe(i.config.apiKey,i,"invalid-api-key");const h={apiKey:i.config.apiKey,appName:i.name,authType:t,redirectUrl:s,v:us,eventId:a};if(e instanceof Sy){e.setDefaultLanguage(i.languageCode),h.providerId=e.providerId||"",OE(e.getCustomParameters())||(h.customParameters=JSON.stringify(e.getCustomParameters()));for(const[w,N]of Object.entries({}))h[w]=N}if(e instanceof xa){const w=e.getScopes().filter(N=>N!=="");w.length>0&&(h.scopes=w.join(","))}i.tenantId&&(h.tid=i.tenantId);const m=h;for(const w of Object.keys(m))m[w]===void 0&&delete m[w];const g=await i._getAppCheckToken(),v=g?`#${qT}=${encodeURIComponent(g)}`:"";return`${HT(i)}?${Da(m).slice(1)}${v}`}function HT({config:i}){return i.emulator?_d(i,$T):`https://${i.authDomain}/${BT}`}/**
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
 */const Oh="webStorageSupport";class WT{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Dy,this._completeRedirectFn=gT,this._overrideRedirectResult=fT}async _openPopup(e,t,s,a){var u;Nr((u=this.eventManagers[e._key()])===null||u===void 0?void 0:u.manager,"_initialize() not called before _openPopup()");const h=await $m(e,t,s,qh(),a);return jT(e,h,Id())}async _openRedirect(e,t,s,a){await this._originValidation(e);const u=await $m(e,t,s,qh(),a);return Q0(u),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:a,promise:u}=this.eventManagers[t];return a?Promise.resolve(a):(Nr(u,"If manager is not set, promise should be"),u)}const s=this.initAndGetManager(e);return this.eventManagers[t]={promise:s},s.catch(()=>{delete this.eventManagers[t]}),s}async initAndGetManager(e){const t=await xT(e),s=new _T(e);return t.register("authEvent",a=>(pe(a?.authEvent,e,"invalid-auth-event"),{status:s.onEvent(a.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=t,s}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Oh,{type:Oh},a=>{var u;const h=(u=a?.[0])===null||u===void 0?void 0:u[Oh];h!==void 0&&t(!!h),bn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=IT(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Ey()||py()||Ed()}}const KT=WT;var qm="@firebase/auth",Hm="1.7.9";/**
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
 */class GT{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(s=>{e(s?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){pe(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function QT(i){switch(i){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function YT(i){rs(new mi("auth",(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),a=e.getProvider("heartbeat"),u=e.getProvider("app-check-internal"),{apiKey:h,authDomain:m}=s.options;pe(h&&!h.includes(":"),"invalid-api-key",{appName:s.name});const g={apiKey:h,authDomain:m,clientPlatform:i,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:wy(i)},v=new g0(s,a,u,g);return A0(v,t),v},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,s)=>{e.getProvider("auth-internal").initialize()})),rs(new mi("auth-internal",e=>{const t=cs(e.getProvider("auth").getImmediate());return(s=>new GT(s))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),er(qm,Hm,QT(i)),er(qm,Hm,"esm2017")}/**
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
 */const XT=5*60,JT=Xg("authIdTokenMaxAge")||XT;let Wm=null;const ZT=i=>async e=>{const t=e&&await e.getIdTokenResult(),s=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(s&&s>JT)return;const a=t?.token;Wm!==a&&(Wm=a,await fetch(i,{method:a?"POST":"DELETE",headers:a?{Authorization:`Bearer ${a}`}:{}}))};function Fy(i=md()){const e=Lu(i,"auth");if(e.isInitialized())return e.getImmediate();const t=S0(i,{popupRedirectResolver:KT,persistence:[iT,W0,Dy]}),s=Xg("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const u=new URL(s,location.origin);if(location.origin===u.origin){const h=ZT(u.toString());$0(t,h,()=>h(t.currentUser)),B0(t,m=>h(m))}}const a=Gg("auth");return a&&R0(t,`http://${a}`),t}function eI(){var i,e;return(e=(i=document.getElementsByTagName("head"))===null||i===void 0?void 0:i[0])!==null&&e!==void 0?e:document}y0({loadJS(i){return new Promise((e,t)=>{const s=document.createElement("script");s.setAttribute("src",i),s.onload=e,s.onerror=a=>{const u=tr("internal-error");u.customData=a,t(u)},s.type="text/javascript",s.charset="UTF-8",eI().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});YT("Browser");var Km=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ts,Uy;(function(){var i;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(P,T){function A(){}A.prototype=T.prototype,P.D=T.prototype,P.prototype=new A,P.prototype.constructor=P,P.C=function(k,D,V){for(var S=Array(arguments.length-2),Ze=2;Ze<arguments.length;Ze++)S[Ze-2]=arguments[Ze];return T.prototype[D].apply(k,S)}}function t(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(s,t),s.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function a(P,T,A){A||(A=0);var k=Array(16);if(typeof T=="string")for(var D=0;16>D;++D)k[D]=T.charCodeAt(A++)|T.charCodeAt(A++)<<8|T.charCodeAt(A++)<<16|T.charCodeAt(A++)<<24;else for(D=0;16>D;++D)k[D]=T[A++]|T[A++]<<8|T[A++]<<16|T[A++]<<24;T=P.g[0],A=P.g[1],D=P.g[2];var V=P.g[3],S=T+(V^A&(D^V))+k[0]+3614090360&4294967295;T=A+(S<<7&4294967295|S>>>25),S=V+(D^T&(A^D))+k[1]+3905402710&4294967295,V=T+(S<<12&4294967295|S>>>20),S=D+(A^V&(T^A))+k[2]+606105819&4294967295,D=V+(S<<17&4294967295|S>>>15),S=A+(T^D&(V^T))+k[3]+3250441966&4294967295,A=D+(S<<22&4294967295|S>>>10),S=T+(V^A&(D^V))+k[4]+4118548399&4294967295,T=A+(S<<7&4294967295|S>>>25),S=V+(D^T&(A^D))+k[5]+1200080426&4294967295,V=T+(S<<12&4294967295|S>>>20),S=D+(A^V&(T^A))+k[6]+2821735955&4294967295,D=V+(S<<17&4294967295|S>>>15),S=A+(T^D&(V^T))+k[7]+4249261313&4294967295,A=D+(S<<22&4294967295|S>>>10),S=T+(V^A&(D^V))+k[8]+1770035416&4294967295,T=A+(S<<7&4294967295|S>>>25),S=V+(D^T&(A^D))+k[9]+2336552879&4294967295,V=T+(S<<12&4294967295|S>>>20),S=D+(A^V&(T^A))+k[10]+4294925233&4294967295,D=V+(S<<17&4294967295|S>>>15),S=A+(T^D&(V^T))+k[11]+2304563134&4294967295,A=D+(S<<22&4294967295|S>>>10),S=T+(V^A&(D^V))+k[12]+1804603682&4294967295,T=A+(S<<7&4294967295|S>>>25),S=V+(D^T&(A^D))+k[13]+4254626195&4294967295,V=T+(S<<12&4294967295|S>>>20),S=D+(A^V&(T^A))+k[14]+2792965006&4294967295,D=V+(S<<17&4294967295|S>>>15),S=A+(T^D&(V^T))+k[15]+1236535329&4294967295,A=D+(S<<22&4294967295|S>>>10),S=T+(D^V&(A^D))+k[1]+4129170786&4294967295,T=A+(S<<5&4294967295|S>>>27),S=V+(A^D&(T^A))+k[6]+3225465664&4294967295,V=T+(S<<9&4294967295|S>>>23),S=D+(T^A&(V^T))+k[11]+643717713&4294967295,D=V+(S<<14&4294967295|S>>>18),S=A+(V^T&(D^V))+k[0]+3921069994&4294967295,A=D+(S<<20&4294967295|S>>>12),S=T+(D^V&(A^D))+k[5]+3593408605&4294967295,T=A+(S<<5&4294967295|S>>>27),S=V+(A^D&(T^A))+k[10]+38016083&4294967295,V=T+(S<<9&4294967295|S>>>23),S=D+(T^A&(V^T))+k[15]+3634488961&4294967295,D=V+(S<<14&4294967295|S>>>18),S=A+(V^T&(D^V))+k[4]+3889429448&4294967295,A=D+(S<<20&4294967295|S>>>12),S=T+(D^V&(A^D))+k[9]+568446438&4294967295,T=A+(S<<5&4294967295|S>>>27),S=V+(A^D&(T^A))+k[14]+3275163606&4294967295,V=T+(S<<9&4294967295|S>>>23),S=D+(T^A&(V^T))+k[3]+4107603335&4294967295,D=V+(S<<14&4294967295|S>>>18),S=A+(V^T&(D^V))+k[8]+1163531501&4294967295,A=D+(S<<20&4294967295|S>>>12),S=T+(D^V&(A^D))+k[13]+2850285829&4294967295,T=A+(S<<5&4294967295|S>>>27),S=V+(A^D&(T^A))+k[2]+4243563512&4294967295,V=T+(S<<9&4294967295|S>>>23),S=D+(T^A&(V^T))+k[7]+1735328473&4294967295,D=V+(S<<14&4294967295|S>>>18),S=A+(V^T&(D^V))+k[12]+2368359562&4294967295,A=D+(S<<20&4294967295|S>>>12),S=T+(A^D^V)+k[5]+4294588738&4294967295,T=A+(S<<4&4294967295|S>>>28),S=V+(T^A^D)+k[8]+2272392833&4294967295,V=T+(S<<11&4294967295|S>>>21),S=D+(V^T^A)+k[11]+1839030562&4294967295,D=V+(S<<16&4294967295|S>>>16),S=A+(D^V^T)+k[14]+4259657740&4294967295,A=D+(S<<23&4294967295|S>>>9),S=T+(A^D^V)+k[1]+2763975236&4294967295,T=A+(S<<4&4294967295|S>>>28),S=V+(T^A^D)+k[4]+1272893353&4294967295,V=T+(S<<11&4294967295|S>>>21),S=D+(V^T^A)+k[7]+4139469664&4294967295,D=V+(S<<16&4294967295|S>>>16),S=A+(D^V^T)+k[10]+3200236656&4294967295,A=D+(S<<23&4294967295|S>>>9),S=T+(A^D^V)+k[13]+681279174&4294967295,T=A+(S<<4&4294967295|S>>>28),S=V+(T^A^D)+k[0]+3936430074&4294967295,V=T+(S<<11&4294967295|S>>>21),S=D+(V^T^A)+k[3]+3572445317&4294967295,D=V+(S<<16&4294967295|S>>>16),S=A+(D^V^T)+k[6]+76029189&4294967295,A=D+(S<<23&4294967295|S>>>9),S=T+(A^D^V)+k[9]+3654602809&4294967295,T=A+(S<<4&4294967295|S>>>28),S=V+(T^A^D)+k[12]+3873151461&4294967295,V=T+(S<<11&4294967295|S>>>21),S=D+(V^T^A)+k[15]+530742520&4294967295,D=V+(S<<16&4294967295|S>>>16),S=A+(D^V^T)+k[2]+3299628645&4294967295,A=D+(S<<23&4294967295|S>>>9),S=T+(D^(A|~V))+k[0]+4096336452&4294967295,T=A+(S<<6&4294967295|S>>>26),S=V+(A^(T|~D))+k[7]+1126891415&4294967295,V=T+(S<<10&4294967295|S>>>22),S=D+(T^(V|~A))+k[14]+2878612391&4294967295,D=V+(S<<15&4294967295|S>>>17),S=A+(V^(D|~T))+k[5]+4237533241&4294967295,A=D+(S<<21&4294967295|S>>>11),S=T+(D^(A|~V))+k[12]+1700485571&4294967295,T=A+(S<<6&4294967295|S>>>26),S=V+(A^(T|~D))+k[3]+2399980690&4294967295,V=T+(S<<10&4294967295|S>>>22),S=D+(T^(V|~A))+k[10]+4293915773&4294967295,D=V+(S<<15&4294967295|S>>>17),S=A+(V^(D|~T))+k[1]+2240044497&4294967295,A=D+(S<<21&4294967295|S>>>11),S=T+(D^(A|~V))+k[8]+1873313359&4294967295,T=A+(S<<6&4294967295|S>>>26),S=V+(A^(T|~D))+k[15]+4264355552&4294967295,V=T+(S<<10&4294967295|S>>>22),S=D+(T^(V|~A))+k[6]+2734768916&4294967295,D=V+(S<<15&4294967295|S>>>17),S=A+(V^(D|~T))+k[13]+1309151649&4294967295,A=D+(S<<21&4294967295|S>>>11),S=T+(D^(A|~V))+k[4]+4149444226&4294967295,T=A+(S<<6&4294967295|S>>>26),S=V+(A^(T|~D))+k[11]+3174756917&4294967295,V=T+(S<<10&4294967295|S>>>22),S=D+(T^(V|~A))+k[2]+718787259&4294967295,D=V+(S<<15&4294967295|S>>>17),S=A+(V^(D|~T))+k[9]+3951481745&4294967295,P.g[0]=P.g[0]+T&4294967295,P.g[1]=P.g[1]+(D+(S<<21&4294967295|S>>>11))&4294967295,P.g[2]=P.g[2]+D&4294967295,P.g[3]=P.g[3]+V&4294967295}s.prototype.u=function(P,T){T===void 0&&(T=P.length);for(var A=T-this.blockSize,k=this.B,D=this.h,V=0;V<T;){if(D==0)for(;V<=A;)a(this,P,V),V+=this.blockSize;if(typeof P=="string"){for(;V<T;)if(k[D++]=P.charCodeAt(V++),D==this.blockSize){a(this,k),D=0;break}}else for(;V<T;)if(k[D++]=P[V++],D==this.blockSize){a(this,k),D=0;break}}this.h=D,this.o+=T},s.prototype.v=function(){var P=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);P[0]=128;for(var T=1;T<P.length-8;++T)P[T]=0;var A=8*this.o;for(T=P.length-8;T<P.length;++T)P[T]=A&255,A/=256;for(this.u(P),P=Array(16),T=A=0;4>T;++T)for(var k=0;32>k;k+=8)P[A++]=this.g[T]>>>k&255;return P};function u(P,T){var A=m;return Object.prototype.hasOwnProperty.call(A,P)?A[P]:A[P]=T(P)}function h(P,T){this.h=T;for(var A=[],k=!0,D=P.length-1;0<=D;D--){var V=P[D]|0;k&&V==T||(A[D]=V,k=!1)}this.g=A}var m={};function g(P){return-128<=P&&128>P?u(P,function(T){return new h([T|0],0>T?-1:0)}):new h([P|0],0>P?-1:0)}function v(P){if(isNaN(P)||!isFinite(P))return N;if(0>P)return B(v(-P));for(var T=[],A=1,k=0;P>=A;k++)T[k]=P/A|0,A*=4294967296;return new h(T,0)}function w(P,T){if(P.length==0)throw Error("number format error: empty string");if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(P.charAt(0)=="-")return B(w(P.substring(1),T));if(0<=P.indexOf("-"))throw Error('number format error: interior "-" character');for(var A=v(Math.pow(T,8)),k=N,D=0;D<P.length;D+=8){var V=Math.min(8,P.length-D),S=parseInt(P.substring(D,D+V),T);8>V?(V=v(Math.pow(T,V)),k=k.j(V).add(v(S))):(k=k.j(A),k=k.add(v(S)))}return k}var N=g(0),b=g(1),j=g(16777216);i=h.prototype,i.m=function(){if(X(this))return-B(this).m();for(var P=0,T=1,A=0;A<this.g.length;A++){var k=this.i(A);P+=(0<=k?k:4294967296+k)*T,T*=4294967296}return P},i.toString=function(P){if(P=P||10,2>P||36<P)throw Error("radix out of range: "+P);if(Q(this))return"0";if(X(this))return"-"+B(this).toString(P);for(var T=v(Math.pow(P,6)),A=this,k="";;){var D=fe(A,T).g;A=ye(A,D.j(T));var V=((0<A.g.length?A.g[0]:A.h)>>>0).toString(P);if(A=D,Q(A))return V+k;for(;6>V.length;)V="0"+V;k=V+k}},i.i=function(P){return 0>P?0:P<this.g.length?this.g[P]:this.h};function Q(P){if(P.h!=0)return!1;for(var T=0;T<P.g.length;T++)if(P.g[T]!=0)return!1;return!0}function X(P){return P.h==-1}i.l=function(P){return P=ye(this,P),X(P)?-1:Q(P)?0:1};function B(P){for(var T=P.g.length,A=[],k=0;k<T;k++)A[k]=~P.g[k];return new h(A,~P.h).add(b)}i.abs=function(){return X(this)?B(this):this},i.add=function(P){for(var T=Math.max(this.g.length,P.g.length),A=[],k=0,D=0;D<=T;D++){var V=k+(this.i(D)&65535)+(P.i(D)&65535),S=(V>>>16)+(this.i(D)>>>16)+(P.i(D)>>>16);k=S>>>16,V&=65535,S&=65535,A[D]=S<<16|V}return new h(A,A[A.length-1]&-2147483648?-1:0)};function ye(P,T){return P.add(B(T))}i.j=function(P){if(Q(this)||Q(P))return N;if(X(this))return X(P)?B(this).j(B(P)):B(B(this).j(P));if(X(P))return B(this.j(B(P)));if(0>this.l(j)&&0>P.l(j))return v(this.m()*P.m());for(var T=this.g.length+P.g.length,A=[],k=0;k<2*T;k++)A[k]=0;for(k=0;k<this.g.length;k++)for(var D=0;D<P.g.length;D++){var V=this.i(k)>>>16,S=this.i(k)&65535,Ze=P.i(D)>>>16,mt=P.i(D)&65535;A[2*k+2*D]+=S*mt,Ie(A,2*k+2*D),A[2*k+2*D+1]+=V*mt,Ie(A,2*k+2*D+1),A[2*k+2*D+1]+=S*Ze,Ie(A,2*k+2*D+1),A[2*k+2*D+2]+=V*Ze,Ie(A,2*k+2*D+2)}for(k=0;k<T;k++)A[k]=A[2*k+1]<<16|A[2*k];for(k=T;k<2*T;k++)A[k]=0;return new h(A,0)};function Ie(P,T){for(;(P[T]&65535)!=P[T];)P[T+1]+=P[T]>>>16,P[T]&=65535,T++}function me(P,T){this.g=P,this.h=T}function fe(P,T){if(Q(T))throw Error("division by zero");if(Q(P))return new me(N,N);if(X(P))return T=fe(B(P),T),new me(B(T.g),B(T.h));if(X(T))return T=fe(P,B(T)),new me(B(T.g),T.h);if(30<P.g.length){if(X(P)||X(T))throw Error("slowDivide_ only works with positive integers.");for(var A=b,k=T;0>=k.l(P);)A=Me(A),k=Me(k);var D=ve(A,1),V=ve(k,1);for(k=ve(k,2),A=ve(A,2);!Q(k);){var S=V.add(k);0>=S.l(P)&&(D=D.add(A),V=S),k=ve(k,1),A=ve(A,1)}return T=ye(P,D.j(T)),new me(D,T)}for(D=N;0<=P.l(T);){for(A=Math.max(1,Math.floor(P.m()/T.m())),k=Math.ceil(Math.log(A)/Math.LN2),k=48>=k?1:Math.pow(2,k-48),V=v(A),S=V.j(T);X(S)||0<S.l(P);)A-=k,V=v(A),S=V.j(T);Q(V)&&(V=b),D=D.add(V),P=ye(P,S)}return new me(D,P)}i.A=function(P){return fe(this,P).h},i.and=function(P){for(var T=Math.max(this.g.length,P.g.length),A=[],k=0;k<T;k++)A[k]=this.i(k)&P.i(k);return new h(A,this.h&P.h)},i.or=function(P){for(var T=Math.max(this.g.length,P.g.length),A=[],k=0;k<T;k++)A[k]=this.i(k)|P.i(k);return new h(A,this.h|P.h)},i.xor=function(P){for(var T=Math.max(this.g.length,P.g.length),A=[],k=0;k<T;k++)A[k]=this.i(k)^P.i(k);return new h(A,this.h^P.h)};function Me(P){for(var T=P.g.length+1,A=[],k=0;k<T;k++)A[k]=P.i(k)<<1|P.i(k-1)>>>31;return new h(A,P.h)}function ve(P,T){var A=T>>5;T%=32;for(var k=P.g.length-A,D=[],V=0;V<k;V++)D[V]=0<T?P.i(V+A)>>>T|P.i(V+A+1)<<32-T:P.i(V+A);return new h(D,P.h)}s.prototype.digest=s.prototype.v,s.prototype.reset=s.prototype.s,s.prototype.update=s.prototype.u,Uy=s,h.prototype.add=h.prototype.add,h.prototype.multiply=h.prototype.j,h.prototype.modulo=h.prototype.A,h.prototype.compare=h.prototype.l,h.prototype.toNumber=h.prototype.m,h.prototype.toString=h.prototype.toString,h.prototype.getBits=h.prototype.i,h.fromNumber=v,h.fromString=w,ts=h}).apply(typeof Km<"u"?Km:typeof self<"u"?self:typeof window<"u"?window:{});var iu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var jy,pa,zy,fu,Gh,By,$y,qy;(function(){var i,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(l,f,y){return l==Array.prototype||l==Object.prototype||(l[f]=y.value),l};function t(l){l=[typeof globalThis=="object"&&globalThis,l,typeof window=="object"&&window,typeof self=="object"&&self,typeof iu=="object"&&iu];for(var f=0;f<l.length;++f){var y=l[f];if(y&&y.Math==Math)return y}throw Error("Cannot find global object")}var s=t(this);function a(l,f){if(f)e:{var y=s;l=l.split(".");for(var E=0;E<l.length-1;E++){var x=l[E];if(!(x in y))break e;y=y[x]}l=l[l.length-1],E=y[l],f=f(E),f!=E&&f!=null&&e(y,l,{configurable:!0,writable:!0,value:f})}}function u(l,f){l instanceof String&&(l+="");var y=0,E=!1,x={next:function(){if(!E&&y<l.length){var U=y++;return{value:f(U,l[U]),done:!1}}return E=!0,{done:!0,value:void 0}}};return x[Symbol.iterator]=function(){return x},x}a("Array.prototype.values",function(l){return l||function(){return u(this,function(f,y){return y})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var h=h||{},m=this||self;function g(l){var f=typeof l;return f=f!="object"?f:l?Array.isArray(l)?"array":f:"null",f=="array"||f=="object"&&typeof l.length=="number"}function v(l){var f=typeof l;return f=="object"&&l!=null||f=="function"}function w(l,f,y){return l.call.apply(l.bind,arguments)}function N(l,f,y){if(!l)throw Error();if(2<arguments.length){var E=Array.prototype.slice.call(arguments,2);return function(){var x=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(x,E),l.apply(f,x)}}return function(){return l.apply(f,arguments)}}function b(l,f,y){return b=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?w:N,b.apply(null,arguments)}function j(l,f){var y=Array.prototype.slice.call(arguments,1);return function(){var E=y.slice();return E.push.apply(E,arguments),l.apply(this,E)}}function Q(l,f){function y(){}y.prototype=f.prototype,l.aa=f.prototype,l.prototype=new y,l.prototype.constructor=l,l.Qb=function(E,x,U){for(var Y=Array(arguments.length-2),Ue=2;Ue<arguments.length;Ue++)Y[Ue-2]=arguments[Ue];return f.prototype[x].apply(E,Y)}}function X(l){const f=l.length;if(0<f){const y=Array(f);for(let E=0;E<f;E++)y[E]=l[E];return y}return[]}function B(l,f){for(let y=1;y<arguments.length;y++){const E=arguments[y];if(g(E)){const x=l.length||0,U=E.length||0;l.length=x+U;for(let Y=0;Y<U;Y++)l[x+Y]=E[Y]}else l.push(E)}}class ye{constructor(f,y){this.i=f,this.j=y,this.h=0,this.g=null}get(){let f;return 0<this.h?(this.h--,f=this.g,this.g=f.next,f.next=null):f=this.i(),f}}function Ie(l){return/^[\s\xa0]*$/.test(l)}function me(){var l=m.navigator;return l&&(l=l.userAgent)?l:""}function fe(l){return fe[" "](l),l}fe[" "]=function(){};var Me=me().indexOf("Gecko")!=-1&&!(me().toLowerCase().indexOf("webkit")!=-1&&me().indexOf("Edge")==-1)&&!(me().indexOf("Trident")!=-1||me().indexOf("MSIE")!=-1)&&me().indexOf("Edge")==-1;function ve(l,f,y){for(const E in l)f.call(y,l[E],E,l)}function P(l,f){for(const y in l)f.call(void 0,l[y],y,l)}function T(l){const f={};for(const y in l)f[y]=l[y];return f}const A="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function k(l,f){let y,E;for(let x=1;x<arguments.length;x++){E=arguments[x];for(y in E)l[y]=E[y];for(let U=0;U<A.length;U++)y=A[U],Object.prototype.hasOwnProperty.call(E,y)&&(l[y]=E[y])}}function D(l){var f=1;l=l.split(":");const y=[];for(;0<f&&l.length;)y.push(l.shift()),f--;return l.length&&y.push(l.join(":")),y}function V(l){m.setTimeout(()=>{throw l},0)}function S(){var l=le;let f=null;return l.g&&(f=l.g,l.g=l.g.next,l.g||(l.h=null),f.next=null),f}class Ze{constructor(){this.h=this.g=null}add(f,y){const E=mt.get();E.set(f,y),this.h?this.h.next=E:this.g=E,this.h=E}}var mt=new ye(()=>new Tt,l=>l.reset());class Tt{constructor(){this.next=this.g=this.h=null}set(f,y){this.h=f,this.g=y,this.next=null}reset(){this.next=this.g=this.h=null}}let Fe,J=!1,le=new Ze,ee=()=>{const l=m.Promise.resolve(void 0);Fe=()=>{l.then(O)}};var O=()=>{for(var l;l=S();){try{l.h.call(l.g)}catch(y){V(y)}var f=mt;f.j(l),100>f.h&&(f.h++,l.next=f.g,f.g=l)}J=!1};function z(){this.s=this.s,this.C=this.C}z.prototype.s=!1,z.prototype.ma=function(){this.s||(this.s=!0,this.N())},z.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ae(l,f){this.type=l,this.g=this.target=f,this.defaultPrevented=!1}ae.prototype.h=function(){this.defaultPrevented=!0};var we=function(){if(!m.addEventListener||!Object.defineProperty)return!1;var l=!1,f=Object.defineProperty({},"passive",{get:function(){l=!0}});try{const y=()=>{};m.addEventListener("test",y,f),m.removeEventListener("test",y,f)}catch{}return l}();function Te(l,f){if(ae.call(this,l?l.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,l){var y=this.type=l.type,E=l.changedTouches&&l.changedTouches.length?l.changedTouches[0]:null;if(this.target=l.target||l.srcElement,this.g=f,f=l.relatedTarget){if(Me){e:{try{fe(f.nodeName);var x=!0;break e}catch{}x=!1}x||(f=null)}}else y=="mouseover"?f=l.fromElement:y=="mouseout"&&(f=l.toElement);this.relatedTarget=f,E?(this.clientX=E.clientX!==void 0?E.clientX:E.pageX,this.clientY=E.clientY!==void 0?E.clientY:E.pageY,this.screenX=E.screenX||0,this.screenY=E.screenY||0):(this.clientX=l.clientX!==void 0?l.clientX:l.pageX,this.clientY=l.clientY!==void 0?l.clientY:l.pageY,this.screenX=l.screenX||0,this.screenY=l.screenY||0),this.button=l.button,this.key=l.key||"",this.ctrlKey=l.ctrlKey,this.altKey=l.altKey,this.shiftKey=l.shiftKey,this.metaKey=l.metaKey,this.pointerId=l.pointerId||0,this.pointerType=typeof l.pointerType=="string"?l.pointerType:Ae[l.pointerType]||"",this.state=l.state,this.i=l,l.defaultPrevented&&Te.aa.h.call(this)}}Q(Te,ae);var Ae={2:"touch",3:"pen",4:"mouse"};Te.prototype.h=function(){Te.aa.h.call(this);var l=this.i;l.preventDefault?l.preventDefault():l.returnValue=!1};var Ve="closure_listenable_"+(1e6*Math.random()|0),xe=0;function ze(l,f,y,E,x){this.listener=l,this.proxy=null,this.src=f,this.type=y,this.capture=!!E,this.ha=x,this.key=++xe,this.da=this.fa=!1}function ht(l){l.da=!0,l.listener=null,l.proxy=null,l.src=null,l.ha=null}function Un(l){this.src=l,this.g={},this.h=0}Un.prototype.add=function(l,f,y,E,x){var U=l.toString();l=this.g[U],l||(l=this.g[U]=[],this.h++);var Y=lr(l,f,E,x);return-1<Y?(f=l[Y],y||(f.fa=!1)):(f=new ze(f,this.src,U,!!E,x),f.fa=y,l.push(f)),f};function wi(l,f){var y=f.type;if(y in l.g){var E=l.g[y],x=Array.prototype.indexOf.call(E,f,void 0),U;(U=0<=x)&&Array.prototype.splice.call(E,x,1),U&&(ht(f),l.g[y].length==0&&(delete l.g[y],l.h--))}}function lr(l,f,y,E){for(var x=0;x<l.length;++x){var U=l[x];if(!U.da&&U.listener==f&&U.capture==!!y&&U.ha==E)return x}return-1}var Or="closure_lm_"+(1e6*Math.random()|0),Ti={};function hs(l,f,y,E,x){if(Array.isArray(f)){for(var U=0;U<f.length;U++)hs(l,f[U],y,E,x);return null}return y=ps(y),l&&l[Ve]?l.K(f,y,v(E)?!!E.capture:!1,x):ds(l,f,y,!1,E,x)}function ds(l,f,y,E,x,U){if(!f)throw Error("Invalid event type");var Y=v(x)?!!x.capture:!!x,Ue=Si(l);if(Ue||(l[Or]=Ue=new Un(l)),y=Ue.add(f,y,E,Y,U),y.proxy)return y;if(E=Co(),y.proxy=E,E.src=l,E.listener=y,l.addEventListener)we||(x=Y),x===void 0&&(x=!1),l.addEventListener(f.toString(),E,x);else if(l.attachEvent)l.attachEvent(zn(f.toString()),E);else if(l.addListener&&l.removeListener)l.addListener(E);else throw Error("addEventListener and attachEvent are unavailable.");return y}function Co(){function l(y){return f.call(l.src,l.listener,y)}const f=fs;return l}function Ii(l,f,y,E,x){if(Array.isArray(f))for(var U=0;U<f.length;U++)Ii(l,f[U],y,E,x);else E=v(E)?!!E.capture:!!E,y=ps(y),l&&l[Ve]?(l=l.i,f=String(f).toString(),f in l.g&&(U=l.g[f],y=lr(U,y,E,x),-1<y&&(ht(U[y]),Array.prototype.splice.call(U,y,1),U.length==0&&(delete l.g[f],l.h--)))):l&&(l=Si(l))&&(f=l.g[f.toString()],l=-1,f&&(l=lr(f,y,E,x)),(y=-1<l?f[l]:null)&&jn(y))}function jn(l){if(typeof l!="number"&&l&&!l.da){var f=l.src;if(f&&f[Ve])wi(f.i,l);else{var y=l.type,E=l.proxy;f.removeEventListener?f.removeEventListener(y,E,l.capture):f.detachEvent?f.detachEvent(zn(y),E):f.addListener&&f.removeListener&&f.removeListener(E),(y=Si(f))?(wi(y,l),y.h==0&&(y.src=null,f[Or]=null)):ht(l)}}}function zn(l){return l in Ti?Ti[l]:Ti[l]="on"+l}function fs(l,f){if(l.da)l=!0;else{f=new Te(f,this);var y=l.listener,E=l.ha||l.src;l.fa&&jn(l),l=y.call(E,f)}return l}function Si(l){return l=l[Or],l instanceof Un?l:null}var Ai="__closure_events_fn_"+(1e9*Math.random()>>>0);function ps(l){return typeof l=="function"?l:(l[Ai]||(l[Ai]=function(f){return l.handleEvent(f)}),l[Ai])}function st(){z.call(this),this.i=new Un(this),this.M=this,this.F=null}Q(st,z),st.prototype[Ve]=!0,st.prototype.removeEventListener=function(l,f,y,E){Ii(this,l,f,y,E)};function ot(l,f){var y,E=l.F;if(E)for(y=[];E;E=E.F)y.push(E);if(l=l.M,E=f.type||f,typeof f=="string")f=new ae(f,l);else if(f instanceof ae)f.target=f.target||l;else{var x=f;f=new ae(E,l),k(f,x)}if(x=!0,y)for(var U=y.length-1;0<=U;U--){var Y=f.g=y[U];x=Bn(Y,E,!0,f)&&x}if(Y=f.g=l,x=Bn(Y,E,!0,f)&&x,x=Bn(Y,E,!1,f)&&x,y)for(U=0;U<y.length;U++)Y=f.g=y[U],x=Bn(Y,E,!1,f)&&x}st.prototype.N=function(){if(st.aa.N.call(this),this.i){var l=this.i,f;for(f in l.g){for(var y=l.g[f],E=0;E<y.length;E++)ht(y[E]);delete l.g[f],l.h--}}this.F=null},st.prototype.K=function(l,f,y,E){return this.i.add(String(l),f,!1,y,E)},st.prototype.L=function(l,f,y,E){return this.i.add(String(l),f,!0,y,E)};function Bn(l,f,y,E){if(f=l.i.g[String(f)],!f)return!0;f=f.concat();for(var x=!0,U=0;U<f.length;++U){var Y=f[U];if(Y&&!Y.da&&Y.capture==y){var Ue=Y.listener,dt=Y.ha||Y.src;Y.fa&&wi(l.i,Y),x=Ue.call(dt,E)!==!1&&x}}return x&&!E.defaultPrevented}function ms(l,f,y){if(typeof l=="function")y&&(l=b(l,y));else if(l&&typeof l.handleEvent=="function")l=b(l.handleEvent,l);else throw Error("Invalid listener argument");return 2147483647<Number(f)?-1:m.setTimeout(l,f||0)}function ur(l){l.g=ms(()=>{l.g=null,l.i&&(l.i=!1,ur(l))},l.l);const f=l.h;l.h=null,l.m.apply(null,f)}class Vr extends z{constructor(f,y){super(),this.m=f,this.l=y,this.h=null,this.i=!1,this.g=null}j(f){this.h=arguments,this.g?this.i=!0:ur(this)}N(){super.N(),this.g&&(m.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function xr(l){z.call(this),this.h=l,this.g={}}Q(xr,z);var gs=[];function ys(l){ve(l.g,function(f,y){this.g.hasOwnProperty(y)&&jn(f)},l),l.g={}}xr.prototype.N=function(){xr.aa.N.call(this),ys(this)},xr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var _s=m.JSON.stringify,vs=m.JSON.parse,Es=class{stringify(l){return m.JSON.stringify(l,void 0)}parse(l){return m.JSON.parse(l,void 0)}};function Lr(){}Lr.prototype.h=null;function Ri(l){return l.h||(l.h=l.i())}function ki(){}var Zt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function _n(){ae.call(this,"d")}Q(_n,ae);function Ci(){ae.call(this,"c")}Q(Ci,ae);var vn={},Pi=null;function cr(){return Pi=Pi||new st}vn.La="serverreachability";function Ut(l){ae.call(this,vn.La,l)}Q(Ut,ae);function En(l){const f=cr();ot(f,new Ut(f))}vn.STAT_EVENT="statevent";function hr(l,f){ae.call(this,vn.STAT_EVENT,l),this.stat=f}Q(hr,ae);function Ge(l){const f=cr();ot(f,new hr(f,l))}vn.Ma="timingevent";function ws(l,f){ae.call(this,vn.Ma,l),this.size=f}Q(ws,ae);function wn(l,f){if(typeof l!="function")throw Error("Fn must not be null and must be a function");return m.setTimeout(function(){l()},f)}function Ni(){this.g=!0}Ni.prototype.xa=function(){this.g=!1};function Di(l,f,y,E,x,U){l.info(function(){if(l.g)if(U)for(var Y="",Ue=U.split("&"),dt=0;dt<Ue.length;dt++){var Ce=Ue[dt].split("=");if(1<Ce.length){var gt=Ce[0];Ce=Ce[1];var at=gt.split("_");Y=2<=at.length&&at[1]=="type"?Y+(gt+"="+Ce+"&"):Y+(gt+"=redacted&")}}else Y=null;else Y=U;return"XMLHTTP REQ ("+E+") [attempt "+x+"]: "+f+`
`+y+`
`+Y})}function Ts(l,f,y,E,x,U,Y){l.info(function(){return"XMLHTTP RESP ("+E+") [ attempt "+x+"]: "+f+`
`+y+`
`+U+" "+Y})}function Tn(l,f,y,E){l.info(function(){return"XMLHTTP TEXT ("+f+"): "+Qu(l,y)+(E?" "+E:"")})}function Po(l,f){l.info(function(){return"TIMEOUT: "+f})}Ni.prototype.info=function(){};function Qu(l,f){if(!l.g)return f;if(!f)return null;try{var y=JSON.parse(f);if(y){for(l=0;l<y.length;l++)if(Array.isArray(y[l])){var E=y[l];if(!(2>E.length)){var x=E[1];if(Array.isArray(x)&&!(1>x.length)){var U=x[0];if(U!="noop"&&U!="stop"&&U!="close")for(var Y=1;Y<x.length;Y++)x[Y]=""}}}}return _s(y)}catch{return f}}var Is={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Ba={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},In;function Oi(){}Q(Oi,Lr),Oi.prototype.g=function(){return new XMLHttpRequest},Oi.prototype.i=function(){return{}},In=new Oi;function Sn(l,f,y,E){this.j=l,this.i=f,this.l=y,this.R=E||1,this.U=new xr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new $a}function $a(){this.i=null,this.g="",this.h=!1}var No={},Ss={};function As(l,f,y){l.L=1,l.v=jr(tn(f)),l.m=y,l.P=!0,Do(l,null)}function Do(l,f){l.F=Date.now(),$e(l),l.A=tn(l.v);var y=l.A,E=l.R;Array.isArray(E)||(E=[String(E)]),Br(y.i,"t",E),l.C=0,y=l.j.J,l.h=new $a,l.g=al(l.j,y?f:null,!l.m),0<l.O&&(l.M=new Vr(b(l.Y,l,l.g),l.O)),f=l.U,y=l.g,E=l.ca;var x="readystatechange";Array.isArray(x)||(x&&(gs[0]=x.toString()),x=gs);for(var U=0;U<x.length;U++){var Y=hs(y,x[U],E||f.handleEvent,!1,f.h||f);if(!Y)break;f.g[Y.key]=Y}f=l.H?T(l.H):{},l.m?(l.u||(l.u="POST"),f["Content-Type"]="application/x-www-form-urlencoded",l.g.ea(l.A,l.u,l.m,f)):(l.u="GET",l.g.ea(l.A,l.u,null,f)),En(),Di(l.i,l.u,l.A,l.l,l.R,l.m)}Sn.prototype.ca=function(l){l=l.target;const f=this.M;f&&Ht(l)==3?f.j():this.Y(l)},Sn.prototype.Y=function(l){try{if(l==this.g)e:{const at=Ht(this.g);var f=this.g.Ba();const hn=this.g.Z();if(!(3>at)&&(at!=3||this.g&&(this.h.h||this.g.oa()||bo(this.g)))){this.J||at!=4||f==7||(f==8||0>=hn?En(3):En(2)),Vi(this);var y=this.g.Z();this.X=y;t:if(qa(this)){var E=bo(this.g);l="";var x=E.length,U=Ht(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){un(this),Mr(this);var Y="";break t}this.h.i=new m.TextDecoder}for(f=0;f<x;f++)this.h.h=!0,l+=this.h.i.decode(E[f],{stream:!(U&&f==x-1)});E.length=0,this.h.g+=l,this.C=0,Y=this.h.g}else Y=this.g.oa();if(this.o=y==200,Ts(this.i,this.u,this.A,this.l,this.R,at,y),this.o){if(this.T&&!this.K){t:{if(this.g){var Ue,dt=this.g;if((Ue=dt.g?dt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Ie(Ue)){var Ce=Ue;break t}}Ce=null}if(y=Ce)Tn(this.i,this.l,y,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Oo(this,y);else{this.o=!1,this.s=3,Ge(12),un(this),Mr(this);break e}}if(this.P){y=!0;let rn;for(;!this.J&&this.C<Y.length;)if(rn=Yu(this,Y),rn==Ss){at==4&&(this.s=4,Ge(14),y=!1),Tn(this.i,this.l,null,"[Incomplete Response]");break}else if(rn==No){this.s=4,Ge(15),Tn(this.i,this.l,Y,"[Invalid Chunk]"),y=!1;break}else Tn(this.i,this.l,rn,null),Oo(this,rn);if(qa(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),at!=4||Y.length!=0||this.h.h||(this.s=1,Ge(16),y=!1),this.o=this.o&&y,!y)Tn(this.i,this.l,Y,"[Invalid Chunked Response]"),un(this),Mr(this);else if(0<Y.length&&!this.W){this.W=!0;var gt=this.j;gt.g==this&&gt.ba&&!gt.M&&(gt.j.info("Great, no buffering proxy detected. Bytes received: "+Y.length),Uo(gt),gt.M=!0,Ge(11))}}else Tn(this.i,this.l,Y,null),Oo(this,Y);at==4&&un(this),this.o&&!this.J&&(at==4?Ms(this.j,this):(this.o=!1,$e(this)))}else Ds(this.g),y==400&&0<Y.indexOf("Unknown SID")?(this.s=3,Ge(12)):(this.s=0,Ge(13)),un(this),Mr(this)}}}catch{}finally{}};function qa(l){return l.g?l.u=="GET"&&l.L!=2&&l.j.Ca:!1}function Yu(l,f){var y=l.C,E=f.indexOf(`
`,y);return E==-1?Ss:(y=Number(f.substring(y,E)),isNaN(y)?No:(E+=1,E+y>f.length?Ss:(f=f.slice(E,E+y),l.C=E+y,f)))}Sn.prototype.cancel=function(){this.J=!0,un(this)};function $e(l){l.S=Date.now()+l.I,Ha(l,l.I)}function Ha(l,f){if(l.B!=null)throw Error("WatchDog timer not null");l.B=wn(b(l.ba,l),f)}function Vi(l){l.B&&(m.clearTimeout(l.B),l.B=null)}Sn.prototype.ba=function(){this.B=null;const l=Date.now();0<=l-this.S?(Po(this.i,this.A),this.L!=2&&(En(),Ge(17)),un(this),this.s=2,Mr(this)):Ha(this,this.S-l)};function Mr(l){l.j.G==0||l.J||Ms(l.j,l)}function un(l){Vi(l);var f=l.M;f&&typeof f.ma=="function"&&f.ma(),l.M=null,ys(l.U),l.g&&(f=l.g,l.g=null,f.abort(),f.ma())}function Oo(l,f){try{var y=l.j;if(y.G!=0&&(y.g==l||jt(y.h,l))){if(!l.K&&jt(y.h,l)&&y.G==3){try{var E=y.Da.g.parse(f)}catch{E=null}if(Array.isArray(E)&&E.length==3){var x=E;if(x[0]==0){e:if(!y.u){if(y.g)if(y.g.F+3e3<l.F)Ls(y),Pn(y);else break e;xs(y),Ge(18)}}else y.za=x[1],0<y.za-y.T&&37500>x[2]&&y.F&&y.v==0&&!y.C&&(y.C=wn(b(y.Za,y),6e3));if(1>=Ka(y.h)&&y.ca){try{y.ca()}catch{}y.ca=void 0}}else gr(y,11)}else if((l.K||y.g==l)&&Ls(y),!Ie(f))for(x=y.Da.g.parse(f),f=0;f<x.length;f++){let Ce=x[f];if(y.T=Ce[0],Ce=Ce[1],y.G==2)if(Ce[0]=="c"){y.K=Ce[1],y.ia=Ce[2];const gt=Ce[3];gt!=null&&(y.la=gt,y.j.info("VER="+y.la));const at=Ce[4];at!=null&&(y.Aa=at,y.j.info("SVER="+y.Aa));const hn=Ce[5];hn!=null&&typeof hn=="number"&&0<hn&&(E=1.5*hn,y.L=E,y.j.info("backChannelRequestTimeoutMs_="+E)),E=y;const rn=l.g;if(rn){const ji=rn.g?rn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ji){var U=E.h;U.g||ji.indexOf("spdy")==-1&&ji.indexOf("quic")==-1&&ji.indexOf("h2")==-1||(U.j=U.l,U.g=new Set,U.h&&(Vo(U,U.h),U.h=null))}if(E.D){const Fs=rn.g?rn.g.getResponseHeader("X-HTTP-Session-Id"):null;Fs&&(E.ya=Fs,Be(E.I,E.D,Fs))}}y.G=3,y.l&&y.l.ua(),y.ba&&(y.R=Date.now()-l.F,y.j.info("Handshake RTT: "+y.R+"ms")),E=y;var Y=l;if(E.qa=ol(E,E.J?E.ia:null,E.W),Y.K){Ga(E.h,Y);var Ue=Y,dt=E.L;dt&&(Ue.I=dt),Ue.B&&(Vi(Ue),$e(Ue)),E.g=Y}else Ui(E);0<y.i.length&&Wn(y)}else Ce[0]!="stop"&&Ce[0]!="close"||gr(y,7);else y.G==3&&(Ce[0]=="stop"||Ce[0]=="close"?Ce[0]=="stop"?gr(y,7):St(y):Ce[0]!="noop"&&y.l&&y.l.ta(Ce),y.v=0)}}En(4)}catch{}}var Wa=class{constructor(l,f){this.g=l,this.map=f}};function xi(l){this.l=l||10,m.PerformanceNavigationTiming?(l=m.performance.getEntriesByType("navigation"),l=0<l.length&&(l[0].nextHopProtocol=="hq"||l[0].nextHopProtocol=="h2")):l=!!(m.chrome&&m.chrome.loadTimes&&m.chrome.loadTimes()&&m.chrome.loadTimes().wasFetchedViaSpdy),this.j=l?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function en(l){return l.h?!0:l.g?l.g.size>=l.j:!1}function Ka(l){return l.h?1:l.g?l.g.size:0}function jt(l,f){return l.h?l.h==f:l.g?l.g.has(f):!1}function Vo(l,f){l.g?l.g.add(f):l.h=f}function Ga(l,f){l.h&&l.h==f?l.h=null:l.g&&l.g.has(f)&&l.g.delete(f)}xi.prototype.cancel=function(){if(this.i=Qa(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const l of this.g.values())l.cancel();this.g.clear()}};function Qa(l){if(l.h!=null)return l.i.concat(l.h.D);if(l.g!=null&&l.g.size!==0){let f=l.i;for(const y of l.g.values())f=f.concat(y.D);return f}return X(l.i)}function Rs(l){if(l.V&&typeof l.V=="function")return l.V();if(typeof Map<"u"&&l instanceof Map||typeof Set<"u"&&l instanceof Set)return Array.from(l.values());if(typeof l=="string")return l.split("");if(g(l)){for(var f=[],y=l.length,E=0;E<y;E++)f.push(l[E]);return f}f=[],y=0;for(E in l)f[y++]=l[E];return f}function ks(l){if(l.na&&typeof l.na=="function")return l.na();if(!l.V||typeof l.V!="function"){if(typeof Map<"u"&&l instanceof Map)return Array.from(l.keys());if(!(typeof Set<"u"&&l instanceof Set)){if(g(l)||typeof l=="string"){var f=[];l=l.length;for(var y=0;y<l;y++)f.push(y);return f}f=[],y=0;for(const E in l)f[y++]=E;return f}}}function br(l,f){if(l.forEach&&typeof l.forEach=="function")l.forEach(f,void 0);else if(g(l)||typeof l=="string")Array.prototype.forEach.call(l,f,void 0);else for(var y=ks(l),E=Rs(l),x=E.length,U=0;U<x;U++)f.call(void 0,E[U],y&&y[U],l)}var Li=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Xu(l,f){if(l){l=l.split("&");for(var y=0;y<l.length;y++){var E=l[y].indexOf("="),x=null;if(0<=E){var U=l[y].substring(0,E);x=l[y].substring(E+1)}else U=l[y];f(U,x?decodeURIComponent(x.replace(/\+/g," ")):"")}}}function dr(l){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,l instanceof dr){this.h=l.h,Mi(this,l.j),this.o=l.o,this.g=l.g,Fr(this,l.s),this.l=l.l;var f=l.i,y=new $n;y.i=f.i,f.g&&(y.g=new Map(f.g),y.h=f.h),Ur(this,y),this.m=l.m}else l&&(f=String(l).match(Li))?(this.h=!1,Mi(this,f[1]||"",!0),this.o=Re(f[2]||""),this.g=Re(f[3]||"",!0),Fr(this,f[4]),this.l=Re(f[5]||"",!0),Ur(this,f[6]||"",!0),this.m=Re(f[7]||"")):(this.h=!1,this.i=new $n(null,this.h))}dr.prototype.toString=function(){var l=[],f=this.j;f&&l.push(zr(f,Cs,!0),":");var y=this.g;return(y||f=="file")&&(l.push("//"),(f=this.o)&&l.push(zr(f,Cs,!0),"@"),l.push(encodeURIComponent(String(y)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),y=this.s,y!=null&&l.push(":",String(y))),(y=this.l)&&(this.g&&y.charAt(0)!="/"&&l.push("/"),l.push(zr(y,y.charAt(0)=="/"?Ja:Xa,!0))),(y=this.i.toString())&&l.push("?",y),(y=this.m)&&l.push("#",zr(y,xo)),l.join("")};function tn(l){return new dr(l)}function Mi(l,f,y){l.j=y?Re(f,!0):f,l.j&&(l.j=l.j.replace(/:$/,""))}function Fr(l,f){if(f){if(f=Number(f),isNaN(f)||0>f)throw Error("Bad port number "+f);l.s=f}else l.s=null}function Ur(l,f,y){f instanceof $n?(l.i=f,qn(l.i,l.h)):(y||(f=zr(f,Za)),l.i=new $n(f,l.h))}function Be(l,f,y){l.i.set(f,y)}function jr(l){return Be(l,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),l}function Re(l,f){return l?f?decodeURI(l.replace(/%25/g,"%2525")):decodeURIComponent(l):""}function zr(l,f,y){return typeof l=="string"?(l=encodeURI(l).replace(f,Ya),y&&(l=l.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l):null}function Ya(l){return l=l.charCodeAt(0),"%"+(l>>4&15).toString(16)+(l&15).toString(16)}var Cs=/[#\/\?@]/g,Xa=/[#\?:]/g,Ja=/[#\?]/g,Za=/[#\?@]/g,xo=/#/g;function $n(l,f){this.h=this.g=null,this.i=l||null,this.j=!!f}function It(l){l.g||(l.g=new Map,l.h=0,l.i&&Xu(l.i,function(f,y){l.add(decodeURIComponent(f.replace(/\+/g," ")),y)}))}i=$n.prototype,i.add=function(l,f){It(this),this.i=null,l=cn(this,l);var y=this.g.get(l);return y||this.g.set(l,y=[]),y.push(f),this.h+=1,this};function An(l,f){It(l),f=cn(l,f),l.g.has(f)&&(l.i=null,l.h-=l.g.get(f).length,l.g.delete(f))}function Rn(l,f){return It(l),f=cn(l,f),l.g.has(f)}i.forEach=function(l,f){It(this),this.g.forEach(function(y,E){y.forEach(function(x){l.call(f,x,E,this)},this)},this)},i.na=function(){It(this);const l=Array.from(this.g.values()),f=Array.from(this.g.keys()),y=[];for(let E=0;E<f.length;E++){const x=l[E];for(let U=0;U<x.length;U++)y.push(f[E])}return y},i.V=function(l){It(this);let f=[];if(typeof l=="string")Rn(this,l)&&(f=f.concat(this.g.get(cn(this,l))));else{l=Array.from(this.g.values());for(let y=0;y<l.length;y++)f=f.concat(l[y])}return f},i.set=function(l,f){return It(this),this.i=null,l=cn(this,l),Rn(this,l)&&(this.h-=this.g.get(l).length),this.g.set(l,[f]),this.h+=1,this},i.get=function(l,f){return l?(l=this.V(l),0<l.length?String(l[0]):f):f};function Br(l,f,y){An(l,f),0<y.length&&(l.i=null,l.g.set(cn(l,f),X(y)),l.h+=y.length)}i.toString=function(){if(this.i)return this.i;if(!this.g)return"";const l=[],f=Array.from(this.g.keys());for(var y=0;y<f.length;y++){var E=f[y];const U=encodeURIComponent(String(E)),Y=this.V(E);for(E=0;E<Y.length;E++){var x=U;Y[E]!==""&&(x+="="+encodeURIComponent(String(Y[E]))),l.push(x)}}return this.i=l.join("&")};function cn(l,f){return f=String(f),l.j&&(f=f.toLowerCase()),f}function qn(l,f){f&&!l.j&&(It(l),l.i=null,l.g.forEach(function(y,E){var x=E.toLowerCase();E!=x&&(An(this,E),Br(this,x,y))},l)),l.j=f}function Ju(l,f){const y=new Ni;if(m.Image){const E=new Image;E.onload=j(qt,y,"TestLoadImage: loaded",!0,f,E),E.onerror=j(qt,y,"TestLoadImage: error",!1,f,E),E.onabort=j(qt,y,"TestLoadImage: abort",!1,f,E),E.ontimeout=j(qt,y,"TestLoadImage: timeout",!1,f,E),m.setTimeout(function(){E.ontimeout&&E.ontimeout()},1e4),E.src=l}else f(!1)}function el(l,f){const y=new Ni,E=new AbortController,x=setTimeout(()=>{E.abort(),qt(y,"TestPingServer: timeout",!1,f)},1e4);fetch(l,{signal:E.signal}).then(U=>{clearTimeout(x),U.ok?qt(y,"TestPingServer: ok",!0,f):qt(y,"TestPingServer: server error",!1,f)}).catch(()=>{clearTimeout(x),qt(y,"TestPingServer: error",!1,f)})}function qt(l,f,y,E,x){try{x&&(x.onload=null,x.onerror=null,x.onabort=null,x.ontimeout=null),E(y)}catch{}}function Zu(){this.g=new Es}function tl(l,f,y){const E=y||"";try{br(l,function(x,U){let Y=x;v(x)&&(Y=_s(x)),f.push(E+U+"="+encodeURIComponent(Y))})}catch(x){throw f.push(E+"type="+encodeURIComponent("_badmap")),x}}function fr(l){this.l=l.Ub||null,this.j=l.eb||!1}Q(fr,Lr),fr.prototype.g=function(){return new bi(this.l,this.j)},fr.prototype.i=function(l){return function(){return l}}({});function bi(l,f){st.call(this),this.D=l,this.o=f,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}Q(bi,st),i=bi.prototype,i.open=function(l,f){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=l,this.A=f,this.readyState=1,Cn(this)},i.send=function(l){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const f={headers:this.u,method:this.B,credentials:this.m,cache:void 0};l&&(f.body=l),(this.D||m).fetch(new Request(this.A,f)).then(this.Sa.bind(this),this.ga.bind(this))},i.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,kn(this)),this.readyState=0},i.Sa=function(l){if(this.g&&(this.l=l,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=l.headers,this.readyState=2,Cn(this)),this.g&&(this.readyState=3,Cn(this),this.g)))if(this.responseType==="arraybuffer")l.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof m.ReadableStream<"u"&&"body"in l){if(this.j=l.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;nl(this)}else l.text().then(this.Ra.bind(this),this.ga.bind(this))};function nl(l){l.j.read().then(l.Pa.bind(l)).catch(l.ga.bind(l))}i.Pa=function(l){if(this.g){if(this.o&&l.value)this.response.push(l.value);else if(!this.o){var f=l.value?l.value:new Uint8Array(0);(f=this.v.decode(f,{stream:!l.done}))&&(this.response=this.responseText+=f)}l.done?kn(this):Cn(this),this.readyState==3&&nl(this)}},i.Ra=function(l){this.g&&(this.response=this.responseText=l,kn(this))},i.Qa=function(l){this.g&&(this.response=l,kn(this))},i.ga=function(){this.g&&kn(this)};function kn(l){l.readyState=4,l.l=null,l.j=null,l.v=null,Cn(l)}i.setRequestHeader=function(l,f){this.u.append(l,f)},i.getResponseHeader=function(l){return this.h&&this.h.get(l.toLowerCase())||""},i.getAllResponseHeaders=function(){if(!this.h)return"";const l=[],f=this.h.entries();for(var y=f.next();!y.done;)y=y.value,l.push(y[0]+": "+y[1]),y=f.next();return l.join(`\r
`)};function Cn(l){l.onreadystatechange&&l.onreadystatechange.call(l)}Object.defineProperty(bi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(l){this.m=l?"include":"same-origin"}});function pr(l){let f="";return ve(l,function(y,E){f+=E,f+=":",f+=y,f+=`\r
`}),f}function $r(l,f,y){e:{for(E in y){var E=!1;break e}E=!0}E||(y=pr(y),typeof l=="string"?y!=null&&encodeURIComponent(String(y)):Be(l,f,y))}function Qe(l){st.call(this),this.headers=new Map,this.o=l||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}Q(Qe,st);var ec=/^https?$/i,Lo=["POST","PUT"];i=Qe.prototype,i.Ha=function(l){this.J=l},i.ea=function(l,f,y,E){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+l);f=f?f.toUpperCase():"GET",this.D=l,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():In.g(),this.v=this.o?Ri(this.o):Ri(In),this.g.onreadystatechange=b(this.Ea,this);try{this.B=!0,this.g.open(f,String(l),!0),this.B=!1}catch(U){Fi(this,U);return}if(l=y||"",y=new Map(this.headers),E)if(Object.getPrototypeOf(E)===Object.prototype)for(var x in E)y.set(x,E[x]);else if(typeof E.keys=="function"&&typeof E.get=="function")for(const U of E.keys())y.set(U,E.get(U));else throw Error("Unknown input type for opt_headers: "+String(E));E=Array.from(y.keys()).find(U=>U.toLowerCase()=="content-type"),x=m.FormData&&l instanceof m.FormData,!(0<=Array.prototype.indexOf.call(Lo,f,void 0))||E||x||y.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[U,Y]of y)this.g.setRequestHeader(U,Y);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ns(this),this.u=!0,this.g.send(l),this.u=!1}catch(U){Fi(this,U)}};function Fi(l,f){l.h=!1,l.g&&(l.j=!0,l.g.abort(),l.j=!1),l.l=f,l.m=5,Ps(l),nn(l)}function Ps(l){l.A||(l.A=!0,ot(l,"complete"),ot(l,"error"))}i.abort=function(l){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=l||7,ot(this,"complete"),ot(this,"abort"),nn(this))},i.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),nn(this,!0)),Qe.aa.N.call(this)},i.Ea=function(){this.s||(this.B||this.u||this.j?Mo(this):this.bb())},i.bb=function(){Mo(this)};function Mo(l){if(l.h&&typeof h<"u"&&(!l.v[1]||Ht(l)!=4||l.Z()!=2)){if(l.u&&Ht(l)==4)ms(l.Ea,0,l);else if(ot(l,"readystatechange"),Ht(l)==4){l.h=!1;try{const Y=l.Z();e:switch(Y){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var f=!0;break e;default:f=!1}var y;if(!(y=f)){var E;if(E=Y===0){var x=String(l.D).match(Li)[1]||null;!x&&m.self&&m.self.location&&(x=m.self.location.protocol.slice(0,-1)),E=!ec.test(x?x.toLowerCase():"")}y=E}if(y)ot(l,"complete"),ot(l,"success");else{l.m=6;try{var U=2<Ht(l)?l.g.statusText:""}catch{U=""}l.l=U+" ["+l.Z()+"]",Ps(l)}}finally{nn(l)}}}}function nn(l,f){if(l.g){Ns(l);const y=l.g,E=l.v[0]?()=>{}:null;l.g=null,l.v=null,f||ot(l,"ready");try{y.onreadystatechange=E}catch{}}}function Ns(l){l.I&&(m.clearTimeout(l.I),l.I=null)}i.isActive=function(){return!!this.g};function Ht(l){return l.g?l.g.readyState:0}i.Z=function(){try{return 2<Ht(this)?this.g.status:-1}catch{return-1}},i.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},i.Oa=function(l){if(this.g){var f=this.g.responseText;return l&&f.indexOf(l)==0&&(f=f.substring(l.length)),vs(f)}};function bo(l){try{if(!l.g)return null;if("response"in l.g)return l.g.response;switch(l.H){case"":case"text":return l.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in l.g)return l.g.mozResponseArrayBuffer}return null}catch{return null}}function Ds(l){const f={};l=(l.g&&2<=Ht(l)&&l.g.getAllResponseHeaders()||"").split(`\r
`);for(let E=0;E<l.length;E++){if(Ie(l[E]))continue;var y=D(l[E]);const x=y[0];if(y=y[1],typeof y!="string")continue;y=y.trim();const U=f[x]||[];f[x]=U,U.push(y)}P(f,function(E){return E.join(", ")})}i.Ba=function(){return this.m},i.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Hn(l,f,y){return y&&y.internalChannelParams&&y.internalChannelParams[l]||f}function Fo(l){this.Aa=0,this.i=[],this.j=new Ni,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Hn("failFast",!1,l),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Hn("baseRetryDelayMs",5e3,l),this.cb=Hn("retryDelaySeedMs",1e4,l),this.Wa=Hn("forwardChannelMaxRetries",2,l),this.wa=Hn("forwardChannelRequestTimeoutMs",2e4,l),this.pa=l&&l.xmlHttpFactory||void 0,this.Xa=l&&l.Tb||void 0,this.Ca=l&&l.useFetchStreams||!1,this.L=void 0,this.J=l&&l.supportsCrossDomainXhr||!1,this.K="",this.h=new xi(l&&l.concurrentRequestLimit),this.Da=new Zu,this.P=l&&l.fastHandshake||!1,this.O=l&&l.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=l&&l.Rb||!1,l&&l.xa&&this.j.xa(),l&&l.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&l&&l.detectBufferingProxy||!1,this.ja=void 0,l&&l.longPollingTimeout&&0<l.longPollingTimeout&&(this.ja=l.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}i=Fo.prototype,i.la=8,i.G=1,i.connect=function(l,f,y,E){Ge(0),this.W=l,this.H=f||{},y&&E!==void 0&&(this.H.OSID=y,this.H.OAID=E),this.F=this.X,this.I=ol(this,null,this.W),Wn(this)};function St(l){if(Os(l),l.G==3){var f=l.U++,y=tn(l.I);if(Be(y,"SID",l.K),Be(y,"RID",f),Be(y,"TYPE","terminate"),mr(l,y),f=new Sn(l,l.j,f),f.L=2,f.v=jr(tn(y)),y=!1,m.navigator&&m.navigator.sendBeacon)try{y=m.navigator.sendBeacon(f.v.toString(),"")}catch{}!y&&m.Image&&(new Image().src=f.v,y=!0),y||(f.g=al(f.j,null),f.g.ea(f.v)),f.F=Date.now(),$e(f)}sl(l)}function Pn(l){l.g&&(Uo(l),l.g.cancel(),l.g=null)}function Os(l){Pn(l),l.u&&(m.clearTimeout(l.u),l.u=null),Ls(l),l.h.cancel(),l.s&&(typeof l.s=="number"&&m.clearTimeout(l.s),l.s=null)}function Wn(l){if(!en(l.h)&&!l.s){l.s=!0;var f=l.Ga;Fe||ee(),J||(Fe(),J=!0),le.add(f,l),l.B=0}}function tc(l,f){return Ka(l.h)>=l.h.j-(l.s?1:0)?!1:l.s?(l.i=f.D.concat(l.i),!0):l.G==1||l.G==2||l.B>=(l.Va?0:l.Wa)?!1:(l.s=wn(b(l.Ga,l,f),il(l,l.B)),l.B++,!0)}i.Ga=function(l){if(this.s)if(this.s=null,this.G==1){if(!l){this.U=Math.floor(1e5*Math.random()),l=this.U++;const x=new Sn(this,this.j,l);let U=this.o;if(this.S&&(U?(U=T(U),k(U,this.S)):U=this.S),this.m!==null||this.O||(x.H=U,U=null),this.P)e:{for(var f=0,y=0;y<this.i.length;y++){t:{var E=this.i[y];if("__data__"in E.map&&(E=E.map.__data__,typeof E=="string")){E=E.length;break t}E=void 0}if(E===void 0)break;if(f+=E,4096<f){f=y;break e}if(f===4096||y===this.i.length-1){f=y+1;break e}}f=1e3}else f=1e3;f=qr(this,x,f),y=tn(this.I),Be(y,"RID",l),Be(y,"CVER",22),this.D&&Be(y,"X-HTTP-Session-Id",this.D),mr(this,y),U&&(this.O?f="headers="+encodeURIComponent(String(pr(U)))+"&"+f:this.m&&$r(y,this.m,U)),Vo(this.h,x),this.Ua&&Be(y,"TYPE","init"),this.P?(Be(y,"$req",f),Be(y,"SID","null"),x.T=!0,As(x,y,null)):As(x,y,f),this.G=2}}else this.G==3&&(l?Vs(this,l):this.i.length==0||en(this.h)||Vs(this))};function Vs(l,f){var y;f?y=f.l:y=l.U++;const E=tn(l.I);Be(E,"SID",l.K),Be(E,"RID",y),Be(E,"AID",l.T),mr(l,E),l.m&&l.o&&$r(E,l.m,l.o),y=new Sn(l,l.j,y,l.B+1),l.m===null&&(y.H=l.o),f&&(l.i=f.D.concat(l.i)),f=qr(l,y,1e3),y.I=Math.round(.5*l.wa)+Math.round(.5*l.wa*Math.random()),Vo(l.h,y),As(y,E,f)}function mr(l,f){l.H&&ve(l.H,function(y,E){Be(f,E,y)}),l.l&&br({},function(y,E){Be(f,E,y)})}function qr(l,f,y){y=Math.min(l.i.length,y);var E=l.l?b(l.l.Na,l.l,l):null;e:{var x=l.i;let U=-1;for(;;){const Y=["count="+y];U==-1?0<y?(U=x[0].g,Y.push("ofs="+U)):U=0:Y.push("ofs="+U);let Ue=!0;for(let dt=0;dt<y;dt++){let Ce=x[dt].g;const gt=x[dt].map;if(Ce-=U,0>Ce)U=Math.max(0,x[dt].g-100),Ue=!1;else try{tl(gt,Y,"req"+Ce+"_")}catch{E&&E(gt)}}if(Ue){E=Y.join("&");break e}}}return l=l.i.splice(0,y),f.D=l,E}function Ui(l){if(!l.g&&!l.u){l.Y=1;var f=l.Fa;Fe||ee(),J||(Fe(),J=!0),le.add(f,l),l.v=0}}function xs(l){return l.g||l.u||3<=l.v?!1:(l.Y++,l.u=wn(b(l.Fa,l),il(l,l.v)),l.v++,!0)}i.Fa=function(){if(this.u=null,rl(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var l=2*this.R;this.j.info("BP detection timer enabled: "+l),this.A=wn(b(this.ab,this),l)}},i.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ge(10),Pn(this),rl(this))};function Uo(l){l.A!=null&&(m.clearTimeout(l.A),l.A=null)}function rl(l){l.g=new Sn(l,l.j,"rpc",l.Y),l.m===null&&(l.g.H=l.o),l.g.O=0;var f=tn(l.qa);Be(f,"RID","rpc"),Be(f,"SID",l.K),Be(f,"AID",l.T),Be(f,"CI",l.F?"0":"1"),!l.F&&l.ja&&Be(f,"TO",l.ja),Be(f,"TYPE","xmlhttp"),mr(l,f),l.m&&l.o&&$r(f,l.m,l.o),l.L&&(l.g.I=l.L);var y=l.g;l=l.ia,y.L=1,y.v=jr(tn(f)),y.m=null,y.P=!0,Do(y,l)}i.Za=function(){this.C!=null&&(this.C=null,Pn(this),xs(this),Ge(19))};function Ls(l){l.C!=null&&(m.clearTimeout(l.C),l.C=null)}function Ms(l,f){var y=null;if(l.g==f){Ls(l),Uo(l),l.g=null;var E=2}else if(jt(l.h,f))y=f.D,Ga(l.h,f),E=1;else return;if(l.G!=0){if(f.o)if(E==1){y=f.m?f.m.length:0,f=Date.now()-f.F;var x=l.B;E=cr(),ot(E,new ws(E,y)),Wn(l)}else Ui(l);else if(x=f.s,x==3||x==0&&0<f.X||!(E==1&&tc(l,f)||E==2&&xs(l)))switch(y&&0<y.length&&(f=l.h,f.i=f.i.concat(y)),x){case 1:gr(l,5);break;case 4:gr(l,10);break;case 3:gr(l,6);break;default:gr(l,2)}}}function il(l,f){let y=l.Ta+Math.floor(Math.random()*l.cb);return l.isActive()||(y*=2),y*f}function gr(l,f){if(l.j.info("Error code "+f),f==2){var y=b(l.fb,l),E=l.Xa;const x=!E;E=new dr(E||"//www.google.com/images/cleardot.gif"),m.location&&m.location.protocol=="http"||Mi(E,"https"),jr(E),x?Ju(E.toString(),y):el(E.toString(),y)}else Ge(2);l.G=0,l.l&&l.l.sa(f),sl(l),Os(l)}i.fb=function(l){l?(this.j.info("Successfully pinged google.com"),Ge(2)):(this.j.info("Failed to ping google.com"),Ge(1))};function sl(l){if(l.G=0,l.ka=[],l.l){const f=Qa(l.h);(f.length!=0||l.i.length!=0)&&(B(l.ka,f),B(l.ka,l.i),l.h.i.length=0,X(l.i),l.i.length=0),l.l.ra()}}function ol(l,f,y){var E=y instanceof dr?tn(y):new dr(y);if(E.g!="")f&&(E.g=f+"."+E.g),Fr(E,E.s);else{var x=m.location;E=x.protocol,f=f?f+"."+x.hostname:x.hostname,x=+x.port;var U=new dr(null);E&&Mi(U,E),f&&(U.g=f),x&&Fr(U,x),y&&(U.l=y),E=U}return y=l.D,f=l.ya,y&&f&&Be(E,y,f),Be(E,"VER",l.la),mr(l,E),E}function al(l,f,y){if(f&&!l.J)throw Error("Can't create secondary domain capable XhrIo object.");return f=l.Ca&&!l.pa?new Qe(new fr({eb:y})):new Qe(l.pa),f.Ha(l.J),f}i.isActive=function(){return!!this.l&&this.l.isActive(this)};function jo(){}i=jo.prototype,i.ua=function(){},i.ta=function(){},i.sa=function(){},i.ra=function(){},i.isActive=function(){return!0},i.Na=function(){};function bs(){}bs.prototype.g=function(l,f){return new zt(l,f)};function zt(l,f){st.call(this),this.g=new Fo(f),this.l=l,this.h=f&&f.messageUrlParams||null,l=f&&f.messageHeaders||null,f&&f.clientProtocolHeaderRequired&&(l?l["X-Client-Protocol"]="webchannel":l={"X-Client-Protocol":"webchannel"}),this.g.o=l,l=f&&f.initMessageHeaders||null,f&&f.messageContentType&&(l?l["X-WebChannel-Content-Type"]=f.messageContentType:l={"X-WebChannel-Content-Type":f.messageContentType}),f&&f.va&&(l?l["X-WebChannel-Client-Profile"]=f.va:l={"X-WebChannel-Client-Profile":f.va}),this.g.S=l,(l=f&&f.Sb)&&!Ie(l)&&(this.g.m=l),this.v=f&&f.supportsCrossDomainXhr||!1,this.u=f&&f.sendRawJson||!1,(f=f&&f.httpSessionIdParam)&&!Ie(f)&&(this.g.D=f,l=this.h,l!==null&&f in l&&(l=this.h,f in l&&delete l[f])),this.j=new Kn(this)}Q(zt,st),zt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},zt.prototype.close=function(){St(this.g)},zt.prototype.o=function(l){var f=this.g;if(typeof l=="string"){var y={};y.__data__=l,l=y}else this.u&&(y={},y.__data__=_s(l),l=y);f.i.push(new Wa(f.Ya++,l)),f.G==3&&Wn(f)},zt.prototype.N=function(){this.g.l=null,delete this.j,St(this.g),delete this.g,zt.aa.N.call(this)};function ll(l){_n.call(this),l.__headers__&&(this.headers=l.__headers__,this.statusCode=l.__status__,delete l.__headers__,delete l.__status__);var f=l.__sm__;if(f){e:{for(const y in f){l=y;break e}l=void 0}(this.i=l)&&(l=this.i,f=f!==null&&l in f?f[l]:void 0),this.data=f}else this.data=l}Q(ll,_n);function ul(){Ci.call(this),this.status=1}Q(ul,Ci);function Kn(l){this.g=l}Q(Kn,jo),Kn.prototype.ua=function(){ot(this.g,"a")},Kn.prototype.ta=function(l){ot(this.g,new ll(l))},Kn.prototype.sa=function(l){ot(this.g,new ul)},Kn.prototype.ra=function(){ot(this.g,"b")},bs.prototype.createWebChannel=bs.prototype.g,zt.prototype.send=zt.prototype.o,zt.prototype.open=zt.prototype.m,zt.prototype.close=zt.prototype.close,qy=function(){return new bs},$y=function(){return cr()},By=vn,Gh={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Is.NO_ERROR=0,Is.TIMEOUT=8,Is.HTTP_ERROR=6,fu=Is,Ba.COMPLETE="complete",zy=Ba,ki.EventType=Zt,Zt.OPEN="a",Zt.CLOSE="b",Zt.ERROR="c",Zt.MESSAGE="d",st.prototype.listen=st.prototype.K,pa=ki,Qe.prototype.listenOnce=Qe.prototype.L,Qe.prototype.getLastError=Qe.prototype.Ka,Qe.prototype.getLastErrorCode=Qe.prototype.Ba,Qe.prototype.getStatus=Qe.prototype.Z,Qe.prototype.getResponseJson=Qe.prototype.Oa,Qe.prototype.getResponseText=Qe.prototype.oa,Qe.prototype.send=Qe.prototype.ea,Qe.prototype.setWithCredentials=Qe.prototype.Ha,jy=Qe}).apply(typeof iu<"u"?iu:typeof self<"u"?self:typeof window<"u"?window:{});const Gm="@firebase/firestore";/**
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
 */class Lt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Lt.UNAUTHENTICATED=new Lt(null),Lt.GOOGLE_CREDENTIALS=new Lt("google-credentials-uid"),Lt.FIRST_PARTY=new Lt("first-party-uid"),Lt.MOCK_USER=new Lt("mock-user");/**
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
 */let So="10.14.0";/**
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
 */const os=new fd("@firebase/firestore");function ha(){return os.logLevel}function ie(i,...e){if(os.logLevel<=ke.DEBUG){const t=e.map(Ad);os.debug(`Firestore (${So}): ${i}`,...t)}}function Dr(i,...e){if(os.logLevel<=ke.ERROR){const t=e.map(Ad);os.error(`Firestore (${So}): ${i}`,...t)}}function go(i,...e){if(os.logLevel<=ke.WARN){const t=e.map(Ad);os.warn(`Firestore (${So}): ${i}`,...t)}}function Ad(i){if(typeof i=="string")return i;try{/**
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
*/return function(t){return JSON.stringify(t)}(i)}catch{return i}}/**
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
 */function Ee(i="Unexpected state"){const e=`FIRESTORE (${So}) INTERNAL ASSERTION FAILED: `+i;throw Dr(e),new Error(e)}function tt(i,e){i||Ee()}function Ne(i,e){return i}/**
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
 */const G={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class se extends or{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class fo{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class Hy{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class tI{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Lt.UNAUTHENTICATED))}shutdown(){}}class nI{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class rI{constructor(e){this.t=e,this.currentUser=Lt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){tt(this.o===void 0);let s=this.i;const a=g=>this.i!==s?(s=this.i,t(g)):Promise.resolve();let u=new fo;this.o=()=>{this.i++,this.currentUser=this.u(),u.resolve(),u=new fo,e.enqueueRetryable(()=>a(this.currentUser))};const h=()=>{const g=u;e.enqueueRetryable(async()=>{await g.promise,await a(this.currentUser)})},m=g=>{ie("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=g,this.o&&(this.auth.addAuthTokenListener(this.o),h())};this.t.onInit(g=>m(g)),setTimeout(()=>{if(!this.auth){const g=this.t.getImmediate({optional:!0});g?m(g):(ie("FirebaseAuthCredentialsProvider","Auth not yet detected"),u.resolve(),u=new fo)}},0),h()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(s=>this.i!==e?(ie("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(tt(typeof s.accessToken=="string"),new Hy(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return tt(e===null||typeof e=="string"),new Lt(e)}}class iI{constructor(e,t,s){this.l=e,this.h=t,this.P=s,this.type="FirstParty",this.user=Lt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class sI{constructor(e,t,s){this.l=e,this.h=t,this.P=s}getToken(){return Promise.resolve(new iI(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Lt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class oI{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class aI{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){tt(this.o===void 0);const s=u=>{u.error!=null&&ie("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${u.error.message}`);const h=u.token!==this.R;return this.R=u.token,ie("FirebaseAppCheckTokenProvider",`Received ${h?"new":"existing"} token.`),h?t(u.token):Promise.resolve()};this.o=u=>{e.enqueueRetryable(()=>s(u))};const a=u=>{ie("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=u,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(u=>a(u)),setTimeout(()=>{if(!this.appCheck){const u=this.A.getImmediate({optional:!0});u?a(u):ie("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(tt(typeof t.token=="string"),this.R=t.token,new oI(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function lI(i){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(i);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let s=0;s<i;s++)t[s]=Math.floor(256*Math.random());return t}/**
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
 */class Wy{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let s="";for(;s.length<20;){const a=lI(40);for(let u=0;u<a.length;++u)s.length<20&&a[u]<t&&(s+=e.charAt(a[u]%e.length))}return s}}function be(i,e){return i<e?-1:i>e?1:0}function yo(i,e,t){return i.length===e.length&&i.every((s,a)=>t(s,e[a]))}/**
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
 */class wt{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new se(G.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new se(G.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new se(G.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new se(G.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return wt.fromMillis(Date.now())}static fromDate(e){return wt.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),s=Math.floor(1e6*(e-1e3*t));return new wt(t,s)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?be(this.nanoseconds,e.nanoseconds):be(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class _e{constructor(e){this.timestamp=e}static fromTimestamp(e){return new _e(e)}static min(){return new _e(new wt(0,0))}static max(){return new _e(new wt(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class Ra{constructor(e,t,s){t===void 0?t=0:t>e.length&&Ee(),s===void 0?s=e.length-t:s>e.length-t&&Ee(),this.segments=e,this.offset=t,this.len=s}get length(){return this.len}isEqual(e){return Ra.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ra?e.forEach(s=>{t.push(s)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,s=this.limit();t<s;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const s=Math.min(e.length,t.length);for(let a=0;a<s;a++){const u=e.get(a),h=t.get(a);if(u<h)return-1;if(u>h)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class Ke extends Ra{construct(e,t,s){return new Ke(e,t,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const s of e){if(s.indexOf("//")>=0)throw new se(G.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);t.push(...s.split("/").filter(a=>a.length>0))}return new Ke(t)}static emptyPath(){return new Ke([])}}const uI=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class bt extends Ra{construct(e,t,s){return new bt(e,t,s)}static isValidIdentifier(e){return uI.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),bt.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new bt(["__name__"])}static fromServerFormat(e){const t=[];let s="",a=0;const u=()=>{if(s.length===0)throw new se(G.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(s),s=""};let h=!1;for(;a<e.length;){const m=e[a];if(m==="\\"){if(a+1===e.length)throw new se(G.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const g=e[a+1];if(g!=="\\"&&g!=="."&&g!=="`")throw new se(G.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=g,a+=2}else m==="`"?(h=!h,a++):m!=="."||h?(s+=m,a++):(u(),a++)}if(u(),h)throw new se(G.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new bt(t)}static emptyPath(){return new bt([])}}/**
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
 */class ue{constructor(e){this.path=e}static fromPath(e){return new ue(Ke.fromString(e))}static fromName(e){return new ue(Ke.fromString(e).popFirst(5))}static empty(){return new ue(Ke.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ke.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Ke.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new ue(new Ke(e.slice()))}}function cI(i,e){const t=i.toTimestamp().seconds,s=i.toTimestamp().nanoseconds+1,a=_e.fromTimestamp(s===1e9?new wt(t+1,0):new wt(t,s));return new gi(a,ue.empty(),e)}function hI(i){return new gi(i.readTime,i.key,-1)}class gi{constructor(e,t,s){this.readTime=e,this.documentKey=t,this.largestBatchId=s}static min(){return new gi(_e.min(),ue.empty(),-1)}static max(){return new gi(_e.max(),ue.empty(),-1)}}function dI(i,e){let t=i.readTime.compareTo(e.readTime);return t!==0?t:(t=ue.comparator(i.documentKey,e.documentKey),t!==0?t:be(i.largestBatchId,e.largestBatchId))}/**
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
 */const fI="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class pI{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Rd(i){if(i.code!==G.FAILED_PRECONDITION||i.message!==fI)throw i;ie("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class H{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&Ee(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new H((s,a)=>{this.nextCallback=u=>{this.wrapSuccess(e,u).next(s,a)},this.catchCallback=u=>{this.wrapFailure(t,u).next(s,a)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof H?t:H.resolve(t)}catch(t){return H.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):H.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):H.reject(t)}static resolve(e){return new H((t,s)=>{t(e)})}static reject(e){return new H((t,s)=>{s(e)})}static waitFor(e){return new H((t,s)=>{let a=0,u=0,h=!1;e.forEach(m=>{++a,m.next(()=>{++u,h&&u===a&&t()},g=>s(g))}),h=!0,u===a&&t()})}static or(e){let t=H.resolve(!1);for(const s of e)t=t.next(a=>a?H.resolve(a):s());return t}static forEach(e,t){const s=[];return e.forEach((a,u)=>{s.push(t.call(this,a,u))}),this.waitFor(s)}static mapArray(e,t){return new H((s,a)=>{const u=e.length,h=new Array(u);let m=0;for(let g=0;g<u;g++){const v=g;t(e[v]).next(w=>{h[v]=w,++m,m===u&&s(h)},w=>a(w))}})}static doWhile(e,t){return new H((s,a)=>{const u=()=>{e()===!0?t().next(()=>{u()},a):s()};u()})}}function mI(i){const e=i.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Ma(i){return i.name==="IndexedDbTransactionError"}/**
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
 */class kd{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=s=>this.ie(s),this.se=s=>t.writeSequenceNumber(s))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}kd.oe=-1;function Uu(i){return i==null}function Ru(i){return i===0&&1/i==-1/0}function gI(i){return typeof i=="number"&&Number.isInteger(i)&&!Ru(i)&&i<=Number.MAX_SAFE_INTEGER&&i>=Number.MIN_SAFE_INTEGER}/**
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
 */function Qm(i){let e=0;for(const t in i)Object.prototype.hasOwnProperty.call(i,t)&&e++;return e}function ba(i,e){for(const t in i)Object.prototype.hasOwnProperty.call(i,t)&&e(t,i[t])}function Ky(i){for(const e in i)if(Object.prototype.hasOwnProperty.call(i,e))return!1;return!0}/**
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
 */class it{constructor(e,t){this.comparator=e,this.root=t||kt.EMPTY}insert(e,t){return new it(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,kt.BLACK,null,null))}remove(e){return new it(this.comparator,this.root.remove(e,this.comparator).copy(null,null,kt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const s=this.comparator(e,t.key);if(s===0)return t.value;s<0?t=t.left:s>0&&(t=t.right)}return null}indexOf(e){let t=0,s=this.root;for(;!s.isEmpty();){const a=this.comparator(e,s.key);if(a===0)return t+s.left.size;a<0?s=s.left:(t+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,s)=>(e(t,s),!1))}toString(){const e=[];return this.inorderTraversal((t,s)=>(e.push(`${t}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new su(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new su(this.root,e,this.comparator,!1)}getReverseIterator(){return new su(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new su(this.root,e,this.comparator,!0)}}class su{constructor(e,t,s,a){this.isReverse=a,this.nodeStack=[];let u=1;for(;!e.isEmpty();)if(u=t?s(e.key,t):1,t&&a&&(u*=-1),u<0)e=this.isReverse?e.left:e.right;else{if(u===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class kt{constructor(e,t,s,a,u){this.key=e,this.value=t,this.color=s??kt.RED,this.left=a??kt.EMPTY,this.right=u??kt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,s,a,u){return new kt(e??this.key,t??this.value,s??this.color,a??this.left,u??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let a=this;const u=s(e,a.key);return a=u<0?a.copy(null,null,null,a.left.insert(e,t,s),null):u===0?a.copy(null,t,null,null,null):a.copy(null,null,null,null,a.right.insert(e,t,s)),a.fixUp()}removeMin(){if(this.left.isEmpty())return kt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let s,a=this;if(t(e,a.key)<0)a.left.isEmpty()||a.left.isRed()||a.left.left.isRed()||(a=a.moveRedLeft()),a=a.copy(null,null,null,a.left.remove(e,t),null);else{if(a.left.isRed()&&(a=a.rotateRight()),a.right.isEmpty()||a.right.isRed()||a.right.left.isRed()||(a=a.moveRedRight()),t(e,a.key)===0){if(a.right.isEmpty())return kt.EMPTY;s=a.right.min(),a=a.copy(s.key,s.value,null,null,a.right.removeMin())}a=a.copy(null,null,null,null,a.right.remove(e,t))}return a.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,kt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,kt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw Ee();const e=this.left.check();if(e!==this.right.check())throw Ee();return e+(this.isRed()?0:1)}}kt.EMPTY=null,kt.RED=!0,kt.BLACK=!1;kt.EMPTY=new class{constructor(){this.size=0}get key(){throw Ee()}get value(){throw Ee()}get color(){throw Ee()}get left(){throw Ee()}get right(){throw Ee()}copy(e,t,s,a,u){return this}insert(e,t,s){return new kt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Ct{constructor(e){this.comparator=e,this.data=new it(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,s)=>(e(t),!1))}forEachInRange(e,t){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const a=s.getNext();if(this.comparator(a.key,e[1])>=0)return;t(a.key)}}forEachWhile(e,t){let s;for(s=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ym(this.data.getIterator())}getIteratorFrom(e){return new Ym(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(s=>{t=t.add(s)}),t}isEqual(e){if(!(e instanceof Ct)||this.size!==e.size)return!1;const t=this.data.getIterator(),s=e.data.getIterator();for(;t.hasNext();){const a=t.getNext().key,u=s.getNext().key;if(this.comparator(a,u)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ct(this.comparator);return t.data=e,t}}class Ym{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class ci{constructor(e){this.fields=e,e.sort(bt.comparator)}static empty(){return new ci([])}unionWith(e){let t=new Ct(bt.comparator);for(const s of this.fields)t=t.add(s);for(const s of e)t=t.add(s);return new ci(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return yo(this.fields,e.fields,(t,s)=>t.isEqual(s))}}/**
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
 */class Gy extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Pt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(a){try{return atob(a)}catch(u){throw typeof DOMException<"u"&&u instanceof DOMException?new Gy("Invalid base64 string: "+u):u}}(e);return new Pt(t)}static fromUint8Array(e){const t=function(a){let u="";for(let h=0;h<a.length;++h)u+=String.fromCharCode(a[h]);return u}(e);return new Pt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const s=new Uint8Array(t.length);for(let a=0;a<t.length;a++)s[a]=t.charCodeAt(a);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return be(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Pt.EMPTY_BYTE_STRING=new Pt("");const yI=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function yi(i){if(tt(!!i),typeof i=="string"){let e=0;const t=yI.exec(i);if(tt(!!t),t[1]){let a=t[1];a=(a+"000000000").substr(0,9),e=Number(a)}const s=new Date(i);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:rt(i.seconds),nanos:rt(i.nanos)}}function rt(i){return typeof i=="number"?i:typeof i=="string"?Number(i):0}function as(i){return typeof i=="string"?Pt.fromBase64String(i):Pt.fromUint8Array(i)}/**
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
 */function Cd(i){var e,t;return((t=(((e=i?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Pd(i){const e=i.mapValue.fields.__previous_value__;return Cd(e)?Pd(e):e}function ka(i){const e=yi(i.mapValue.fields.__local_write_time__.timestampValue);return new wt(e.seconds,e.nanos)}/**
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
 */class _I{constructor(e,t,s,a,u,h,m,g,v){this.databaseId=e,this.appId=t,this.persistenceKey=s,this.host=a,this.ssl=u,this.forceLongPolling=h,this.autoDetectLongPolling=m,this.longPollingOptions=g,this.useFetchStreams=v}}class Ca{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new Ca("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Ca&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const ou={mapValue:{}};function ls(i){return"nullValue"in i?0:"booleanValue"in i?1:"integerValue"in i||"doubleValue"in i?2:"timestampValue"in i?3:"stringValue"in i?5:"bytesValue"in i?6:"referenceValue"in i?7:"geoPointValue"in i?8:"arrayValue"in i?9:"mapValue"in i?Cd(i)?4:EI(i)?9007199254740991:vI(i)?10:11:Ee()}function ir(i,e){if(i===e)return!0;const t=ls(i);if(t!==ls(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return i.booleanValue===e.booleanValue;case 4:return ka(i).isEqual(ka(e));case 3:return function(a,u){if(typeof a.timestampValue=="string"&&typeof u.timestampValue=="string"&&a.timestampValue.length===u.timestampValue.length)return a.timestampValue===u.timestampValue;const h=yi(a.timestampValue),m=yi(u.timestampValue);return h.seconds===m.seconds&&h.nanos===m.nanos}(i,e);case 5:return i.stringValue===e.stringValue;case 6:return function(a,u){return as(a.bytesValue).isEqual(as(u.bytesValue))}(i,e);case 7:return i.referenceValue===e.referenceValue;case 8:return function(a,u){return rt(a.geoPointValue.latitude)===rt(u.geoPointValue.latitude)&&rt(a.geoPointValue.longitude)===rt(u.geoPointValue.longitude)}(i,e);case 2:return function(a,u){if("integerValue"in a&&"integerValue"in u)return rt(a.integerValue)===rt(u.integerValue);if("doubleValue"in a&&"doubleValue"in u){const h=rt(a.doubleValue),m=rt(u.doubleValue);return h===m?Ru(h)===Ru(m):isNaN(h)&&isNaN(m)}return!1}(i,e);case 9:return yo(i.arrayValue.values||[],e.arrayValue.values||[],ir);case 10:case 11:return function(a,u){const h=a.mapValue.fields||{},m=u.mapValue.fields||{};if(Qm(h)!==Qm(m))return!1;for(const g in h)if(h.hasOwnProperty(g)&&(m[g]===void 0||!ir(h[g],m[g])))return!1;return!0}(i,e);default:return Ee()}}function Pa(i,e){return(i.values||[]).find(t=>ir(t,e))!==void 0}function _o(i,e){if(i===e)return 0;const t=ls(i),s=ls(e);if(t!==s)return be(t,s);switch(t){case 0:case 9007199254740991:return 0;case 1:return be(i.booleanValue,e.booleanValue);case 2:return function(u,h){const m=rt(u.integerValue||u.doubleValue),g=rt(h.integerValue||h.doubleValue);return m<g?-1:m>g?1:m===g?0:isNaN(m)?isNaN(g)?0:-1:1}(i,e);case 3:return Xm(i.timestampValue,e.timestampValue);case 4:return Xm(ka(i),ka(e));case 5:return be(i.stringValue,e.stringValue);case 6:return function(u,h){const m=as(u),g=as(h);return m.compareTo(g)}(i.bytesValue,e.bytesValue);case 7:return function(u,h){const m=u.split("/"),g=h.split("/");for(let v=0;v<m.length&&v<g.length;v++){const w=be(m[v],g[v]);if(w!==0)return w}return be(m.length,g.length)}(i.referenceValue,e.referenceValue);case 8:return function(u,h){const m=be(rt(u.latitude),rt(h.latitude));return m!==0?m:be(rt(u.longitude),rt(h.longitude))}(i.geoPointValue,e.geoPointValue);case 9:return Jm(i.arrayValue,e.arrayValue);case 10:return function(u,h){var m,g,v,w;const N=u.fields||{},b=h.fields||{},j=(m=N.value)===null||m===void 0?void 0:m.arrayValue,Q=(g=b.value)===null||g===void 0?void 0:g.arrayValue,X=be(((v=j?.values)===null||v===void 0?void 0:v.length)||0,((w=Q?.values)===null||w===void 0?void 0:w.length)||0);return X!==0?X:Jm(j,Q)}(i.mapValue,e.mapValue);case 11:return function(u,h){if(u===ou.mapValue&&h===ou.mapValue)return 0;if(u===ou.mapValue)return 1;if(h===ou.mapValue)return-1;const m=u.fields||{},g=Object.keys(m),v=h.fields||{},w=Object.keys(v);g.sort(),w.sort();for(let N=0;N<g.length&&N<w.length;++N){const b=be(g[N],w[N]);if(b!==0)return b;const j=_o(m[g[N]],v[w[N]]);if(j!==0)return j}return be(g.length,w.length)}(i.mapValue,e.mapValue);default:throw Ee()}}function Xm(i,e){if(typeof i=="string"&&typeof e=="string"&&i.length===e.length)return be(i,e);const t=yi(i),s=yi(e),a=be(t.seconds,s.seconds);return a!==0?a:be(t.nanos,s.nanos)}function Jm(i,e){const t=i.values||[],s=e.values||[];for(let a=0;a<t.length&&a<s.length;++a){const u=_o(t[a],s[a]);if(u)return u}return be(t.length,s.length)}function vo(i){return Qh(i)}function Qh(i){return"nullValue"in i?"null":"booleanValue"in i?""+i.booleanValue:"integerValue"in i?""+i.integerValue:"doubleValue"in i?""+i.doubleValue:"timestampValue"in i?function(t){const s=yi(t);return`time(${s.seconds},${s.nanos})`}(i.timestampValue):"stringValue"in i?i.stringValue:"bytesValue"in i?function(t){return as(t).toBase64()}(i.bytesValue):"referenceValue"in i?function(t){return ue.fromName(t).toString()}(i.referenceValue):"geoPointValue"in i?function(t){return`geo(${t.latitude},${t.longitude})`}(i.geoPointValue):"arrayValue"in i?function(t){let s="[",a=!0;for(const u of t.values||[])a?a=!1:s+=",",s+=Qh(u);return s+"]"}(i.arrayValue):"mapValue"in i?function(t){const s=Object.keys(t.fields||{}).sort();let a="{",u=!0;for(const h of s)u?u=!1:a+=",",a+=`${h}:${Qh(t.fields[h])}`;return a+"}"}(i.mapValue):Ee()}function Zm(i,e){return{referenceValue:`projects/${i.projectId}/databases/${i.database}/documents/${e.path.canonicalString()}`}}function Yh(i){return!!i&&"integerValue"in i}function Nd(i){return!!i&&"arrayValue"in i}function eg(i){return!!i&&"nullValue"in i}function tg(i){return!!i&&"doubleValue"in i&&isNaN(Number(i.doubleValue))}function Vh(i){return!!i&&"mapValue"in i}function vI(i){var e,t;return((t=(((e=i?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function va(i){if(i.geoPointValue)return{geoPointValue:Object.assign({},i.geoPointValue)};if(i.timestampValue&&typeof i.timestampValue=="object")return{timestampValue:Object.assign({},i.timestampValue)};if(i.mapValue){const e={mapValue:{fields:{}}};return ba(i.mapValue.fields,(t,s)=>e.mapValue.fields[t]=va(s)),e}if(i.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(i.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=va(i.arrayValue.values[t]);return e}return Object.assign({},i)}function EI(i){return(((i.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class Jn{constructor(e){this.value=e}static empty(){return new Jn({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let s=0;s<e.length-1;++s)if(t=(t.mapValue.fields||{})[e.get(s)],!Vh(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=va(t)}setAll(e){let t=bt.emptyPath(),s={},a=[];e.forEach((h,m)=>{if(!t.isImmediateParentOf(m)){const g=this.getFieldsMap(t);this.applyChanges(g,s,a),s={},a=[],t=m.popLast()}h?s[m.lastSegment()]=va(h):a.push(m.lastSegment())});const u=this.getFieldsMap(t);this.applyChanges(u,s,a)}delete(e){const t=this.field(e.popLast());Vh(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ir(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let s=0;s<e.length;++s){let a=t.mapValue.fields[e.get(s)];Vh(a)&&a.mapValue.fields||(a={mapValue:{fields:{}}},t.mapValue.fields[e.get(s)]=a),t=a}return t.mapValue.fields}applyChanges(e,t,s){ba(t,(a,u)=>e[a]=u);for(const a of s)delete e[a]}clone(){return new Jn(va(this.value))}}/**
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
 */class Mt{constructor(e,t,s,a,u,h,m){this.key=e,this.documentType=t,this.version=s,this.readTime=a,this.createTime=u,this.data=h,this.documentState=m}static newInvalidDocument(e){return new Mt(e,0,_e.min(),_e.min(),_e.min(),Jn.empty(),0)}static newFoundDocument(e,t,s,a){return new Mt(e,1,t,_e.min(),s,a,0)}static newNoDocument(e,t){return new Mt(e,2,t,_e.min(),_e.min(),Jn.empty(),0)}static newUnknownDocument(e,t){return new Mt(e,3,t,_e.min(),_e.min(),Jn.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(_e.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Jn.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Jn.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=_e.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Mt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Mt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class ku{constructor(e,t){this.position=e,this.inclusive=t}}function ng(i,e,t){let s=0;for(let a=0;a<i.position.length;a++){const u=e[a],h=i.position[a];if(u.field.isKeyField()?s=ue.comparator(ue.fromName(h.referenceValue),t.key):s=_o(h,t.data.field(u.field)),u.dir==="desc"&&(s*=-1),s!==0)break}return s}function rg(i,e){if(i===null)return e===null;if(e===null||i.inclusive!==e.inclusive||i.position.length!==e.position.length)return!1;for(let t=0;t<i.position.length;t++)if(!ir(i.position[t],e.position[t]))return!1;return!0}/**
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
 */class Cu{constructor(e,t="asc"){this.field=e,this.dir=t}}function wI(i,e){return i.dir===e.dir&&i.field.isEqual(e.field)}/**
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
 */class Qy{}class ct extends Qy{constructor(e,t,s){super(),this.field=e,this.op=t,this.value=s}static create(e,t,s){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,s):new II(e,t,s):t==="array-contains"?new RI(e,s):t==="in"?new kI(e,s):t==="not-in"?new CI(e,s):t==="array-contains-any"?new PI(e,s):new ct(e,t,s)}static createKeyFieldInFilter(e,t,s){return t==="in"?new SI(e,s):new AI(e,s)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(_o(t,this.value)):t!==null&&ls(this.value)===ls(t)&&this.matchesComparison(_o(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Ee()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Fn extends Qy{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new Fn(e,t)}matches(e){return Yy(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Yy(i){return i.op==="and"}function Xy(i){return TI(i)&&Yy(i)}function TI(i){for(const e of i.filters)if(e instanceof Fn)return!1;return!0}function Xh(i){if(i instanceof ct)return i.field.canonicalString()+i.op.toString()+vo(i.value);if(Xy(i))return i.filters.map(e=>Xh(e)).join(",");{const e=i.filters.map(t=>Xh(t)).join(",");return`${i.op}(${e})`}}function Jy(i,e){return i instanceof ct?function(s,a){return a instanceof ct&&s.op===a.op&&s.field.isEqual(a.field)&&ir(s.value,a.value)}(i,e):i instanceof Fn?function(s,a){return a instanceof Fn&&s.op===a.op&&s.filters.length===a.filters.length?s.filters.reduce((u,h,m)=>u&&Jy(h,a.filters[m]),!0):!1}(i,e):void Ee()}function Zy(i){return i instanceof ct?function(t){return`${t.field.canonicalString()} ${t.op} ${vo(t.value)}`}(i):i instanceof Fn?function(t){return t.op.toString()+" {"+t.getFilters().map(Zy).join(" ,")+"}"}(i):"Filter"}class II extends ct{constructor(e,t,s){super(e,t,s),this.key=ue.fromName(s.referenceValue)}matches(e){const t=ue.comparator(e.key,this.key);return this.matchesComparison(t)}}class SI extends ct{constructor(e,t){super(e,"in",t),this.keys=e_("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class AI extends ct{constructor(e,t){super(e,"not-in",t),this.keys=e_("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function e_(i,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(s=>ue.fromName(s.referenceValue))}class RI extends ct{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Nd(t)&&Pa(t.arrayValue,this.value)}}class kI extends ct{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Pa(this.value.arrayValue,t)}}class CI extends ct{constructor(e,t){super(e,"not-in",t)}matches(e){if(Pa(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Pa(this.value.arrayValue,t)}}class PI extends ct{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Nd(t)||!t.arrayValue.values)&&t.arrayValue.values.some(s=>Pa(this.value.arrayValue,s))}}/**
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
 */class NI{constructor(e,t=null,s=[],a=[],u=null,h=null,m=null){this.path=e,this.collectionGroup=t,this.orderBy=s,this.filters=a,this.limit=u,this.startAt=h,this.endAt=m,this.ue=null}}function ig(i,e=null,t=[],s=[],a=null,u=null,h=null){return new NI(i,e,t,s,a,u,h)}function Dd(i){const e=Ne(i);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(s=>Xh(s)).join(","),t+="|ob:",t+=e.orderBy.map(s=>function(u){return u.field.canonicalString()+u.dir}(s)).join(","),Uu(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(s=>vo(s)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(s=>vo(s)).join(",")),e.ue=t}return e.ue}function Od(i,e){if(i.limit!==e.limit||i.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<i.orderBy.length;t++)if(!wI(i.orderBy[t],e.orderBy[t]))return!1;if(i.filters.length!==e.filters.length)return!1;for(let t=0;t<i.filters.length;t++)if(!Jy(i.filters[t],e.filters[t]))return!1;return i.collectionGroup===e.collectionGroup&&!!i.path.isEqual(e.path)&&!!rg(i.startAt,e.startAt)&&rg(i.endAt,e.endAt)}function Jh(i){return ue.isDocumentKey(i.path)&&i.collectionGroup===null&&i.filters.length===0}/**
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
 */class Fa{constructor(e,t=null,s=[],a=[],u=null,h="F",m=null,g=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=s,this.filters=a,this.limit=u,this.limitType=h,this.startAt=m,this.endAt=g,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function DI(i,e,t,s,a,u,h,m){return new Fa(i,e,t,s,a,u,h,m)}function Vd(i){return new Fa(i)}function sg(i){return i.filters.length===0&&i.limit===null&&i.startAt==null&&i.endAt==null&&(i.explicitOrderBy.length===0||i.explicitOrderBy.length===1&&i.explicitOrderBy[0].field.isKeyField())}function t_(i){return i.collectionGroup!==null}function Ea(i){const e=Ne(i);if(e.ce===null){e.ce=[];const t=new Set;for(const u of e.explicitOrderBy)e.ce.push(u),t.add(u.field.canonicalString());const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(h){let m=new Ct(bt.comparator);return h.filters.forEach(g=>{g.getFlattenedFilters().forEach(v=>{v.isInequality()&&(m=m.add(v.field))})}),m})(e).forEach(u=>{t.has(u.canonicalString())||u.isKeyField()||e.ce.push(new Cu(u,s))}),t.has(bt.keyField().canonicalString())||e.ce.push(new Cu(bt.keyField(),s))}return e.ce}function rr(i){const e=Ne(i);return e.le||(e.le=OI(e,Ea(i))),e.le}function OI(i,e){if(i.limitType==="F")return ig(i.path,i.collectionGroup,e,i.filters,i.limit,i.startAt,i.endAt);{e=e.map(a=>{const u=a.dir==="desc"?"asc":"desc";return new Cu(a.field,u)});const t=i.endAt?new ku(i.endAt.position,i.endAt.inclusive):null,s=i.startAt?new ku(i.startAt.position,i.startAt.inclusive):null;return ig(i.path,i.collectionGroup,e,i.filters,i.limit,t,s)}}function Zh(i,e){const t=i.filters.concat([e]);return new Fa(i.path,i.collectionGroup,i.explicitOrderBy.slice(),t,i.limit,i.limitType,i.startAt,i.endAt)}function ed(i,e,t){return new Fa(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),e,t,i.startAt,i.endAt)}function ju(i,e){return Od(rr(i),rr(e))&&i.limitType===e.limitType}function n_(i){return`${Dd(rr(i))}|lt:${i.limitType}`}function so(i){return`Query(target=${function(t){let s=t.path.canonicalString();return t.collectionGroup!==null&&(s+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(s+=`, filters: [${t.filters.map(a=>Zy(a)).join(", ")}]`),Uu(t.limit)||(s+=", limit: "+t.limit),t.orderBy.length>0&&(s+=`, orderBy: [${t.orderBy.map(a=>function(h){return`${h.field.canonicalString()} (${h.dir})`}(a)).join(", ")}]`),t.startAt&&(s+=", startAt: ",s+=t.startAt.inclusive?"b:":"a:",s+=t.startAt.position.map(a=>vo(a)).join(",")),t.endAt&&(s+=", endAt: ",s+=t.endAt.inclusive?"a:":"b:",s+=t.endAt.position.map(a=>vo(a)).join(",")),`Target(${s})`}(rr(i))}; limitType=${i.limitType})`}function zu(i,e){return e.isFoundDocument()&&function(s,a){const u=a.key.path;return s.collectionGroup!==null?a.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(u):ue.isDocumentKey(s.path)?s.path.isEqual(u):s.path.isImmediateParentOf(u)}(i,e)&&function(s,a){for(const u of Ea(s))if(!u.field.isKeyField()&&a.data.field(u.field)===null)return!1;return!0}(i,e)&&function(s,a){for(const u of s.filters)if(!u.matches(a))return!1;return!0}(i,e)&&function(s,a){return!(s.startAt&&!function(h,m,g){const v=ng(h,m,g);return h.inclusive?v<=0:v<0}(s.startAt,Ea(s),a)||s.endAt&&!function(h,m,g){const v=ng(h,m,g);return h.inclusive?v>=0:v>0}(s.endAt,Ea(s),a))}(i,e)}function VI(i){return i.collectionGroup||(i.path.length%2==1?i.path.lastSegment():i.path.get(i.path.length-2))}function r_(i){return(e,t)=>{let s=!1;for(const a of Ea(i)){const u=xI(a,e,t);if(u!==0)return u;s=s||a.field.isKeyField()}return 0}}function xI(i,e,t){const s=i.field.isKeyField()?ue.comparator(e.key,t.key):function(u,h,m){const g=h.data.field(u),v=m.data.field(u);return g!==null&&v!==null?_o(g,v):Ee()}(i.field,e,t);switch(i.dir){case"asc":return s;case"desc":return-1*s;default:return Ee()}}/**
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
 */class Ao{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s!==void 0){for(const[a,u]of s)if(this.equalsFn(a,e))return u}}has(e){return this.get(e)!==void 0}set(e,t){const s=this.mapKeyFn(e),a=this.inner[s];if(a===void 0)return this.inner[s]=[[e,t]],void this.innerSize++;for(let u=0;u<a.length;u++)if(this.equalsFn(a[u][0],e))return void(a[u]=[e,t]);a.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s===void 0)return!1;for(let a=0;a<s.length;a++)if(this.equalsFn(s[a][0],e))return s.length===1?delete this.inner[t]:s.splice(a,1),this.innerSize--,!0;return!1}forEach(e){ba(this.inner,(t,s)=>{for(const[a,u]of s)e(a,u)})}isEmpty(){return Ky(this.inner)}size(){return this.innerSize}}/**
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
 */const LI=new it(ue.comparator);function _i(){return LI}const i_=new it(ue.comparator);function ma(...i){let e=i_;for(const t of i)e=e.insert(t.key,t);return e}function MI(i){let e=i_;return i.forEach((t,s)=>e=e.insert(t,s.overlayedDocument)),e}function es(){return wa()}function s_(){return wa()}function wa(){return new Ao(i=>i.toString(),(i,e)=>i.isEqual(e))}const bI=new Ct(ue.comparator);function Oe(...i){let e=bI;for(const t of i)e=e.add(t);return e}const FI=new Ct(be);function UI(){return FI}/**
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
 */function xd(i,e){if(i.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ru(e)?"-0":e}}function o_(i){return{integerValue:""+i}}function jI(i,e){return gI(e)?o_(e):xd(i,e)}/**
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
 */class Bu{constructor(){this._=void 0}}function zI(i,e,t){return i instanceof td?function(a,u){const h={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:a.seconds,nanos:a.nanoseconds}}}};return u&&Cd(u)&&(u=Pd(u)),u&&(h.fields.__previous_value__=u),{mapValue:h}}(t,e):i instanceof Pu?a_(i,e):i instanceof Nu?l_(i,e):function(a,u){const h=$I(a,u),m=og(h)+og(a.Pe);return Yh(h)&&Yh(a.Pe)?o_(m):xd(a.serializer,m)}(i,e)}function BI(i,e,t){return i instanceof Pu?a_(i,e):i instanceof Nu?l_(i,e):t}function $I(i,e){return i instanceof nd?function(s){return Yh(s)||function(u){return!!u&&"doubleValue"in u}(s)}(e)?e:{integerValue:0}:null}class td extends Bu{}class Pu extends Bu{constructor(e){super(),this.elements=e}}function a_(i,e){const t=u_(e);for(const s of i.elements)t.some(a=>ir(a,s))||t.push(s);return{arrayValue:{values:t}}}class Nu extends Bu{constructor(e){super(),this.elements=e}}function l_(i,e){let t=u_(e);for(const s of i.elements)t=t.filter(a=>!ir(a,s));return{arrayValue:{values:t}}}class nd extends Bu{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function og(i){return rt(i.integerValue||i.doubleValue)}function u_(i){return Nd(i)&&i.arrayValue.values?i.arrayValue.values.slice():[]}function qI(i,e){return i.field.isEqual(e.field)&&function(s,a){return s instanceof Pu&&a instanceof Pu||s instanceof Nu&&a instanceof Nu?yo(s.elements,a.elements,ir):s instanceof nd&&a instanceof nd?ir(s.Pe,a.Pe):s instanceof td&&a instanceof td}(i.transform,e.transform)}class ns{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ns}static exists(e){return new ns(void 0,e)}static updateTime(e){return new ns(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function pu(i,e){return i.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(i.updateTime):i.exists===void 0||i.exists===e.isFoundDocument()}class Ld{}function c_(i,e){if(!i.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return i.isNoDocument()?new WI(i.key,ns.none()):new Md(i.key,i.data,ns.none());{const t=i.data,s=Jn.empty();let a=new Ct(bt.comparator);for(let u of e.fields)if(!a.has(u)){let h=t.field(u);h===null&&u.length>1&&(u=u.popLast(),h=t.field(u)),h===null?s.delete(u):s.set(u,h),a=a.add(u)}return new $u(i.key,s,new ci(a.toArray()),ns.none())}}function HI(i,e,t){i instanceof Md?function(a,u,h){const m=a.value.clone(),g=lg(a.fieldTransforms,u,h.transformResults);m.setAll(g),u.convertToFoundDocument(h.version,m).setHasCommittedMutations()}(i,e,t):i instanceof $u?function(a,u,h){if(!pu(a.precondition,u))return void u.convertToUnknownDocument(h.version);const m=lg(a.fieldTransforms,u,h.transformResults),g=u.data;g.setAll(h_(a)),g.setAll(m),u.convertToFoundDocument(h.version,g).setHasCommittedMutations()}(i,e,t):function(a,u,h){u.convertToNoDocument(h.version).setHasCommittedMutations()}(0,e,t)}function Ta(i,e,t,s){return i instanceof Md?function(u,h,m,g){if(!pu(u.precondition,h))return m;const v=u.value.clone(),w=ug(u.fieldTransforms,g,h);return v.setAll(w),h.convertToFoundDocument(h.version,v).setHasLocalMutations(),null}(i,e,t,s):i instanceof $u?function(u,h,m,g){if(!pu(u.precondition,h))return m;const v=ug(u.fieldTransforms,g,h),w=h.data;return w.setAll(h_(u)),w.setAll(v),h.convertToFoundDocument(h.version,w).setHasLocalMutations(),m===null?null:m.unionWith(u.fieldMask.fields).unionWith(u.fieldTransforms.map(N=>N.field))}(i,e,t,s):function(u,h,m){return pu(u.precondition,h)?(h.convertToNoDocument(h.version).setHasLocalMutations(),null):m}(i,e,t)}function ag(i,e){return i.type===e.type&&!!i.key.isEqual(e.key)&&!!i.precondition.isEqual(e.precondition)&&!!function(s,a){return s===void 0&&a===void 0||!(!s||!a)&&yo(s,a,(u,h)=>qI(u,h))}(i.fieldTransforms,e.fieldTransforms)&&(i.type===0?i.value.isEqual(e.value):i.type!==1||i.data.isEqual(e.data)&&i.fieldMask.isEqual(e.fieldMask))}class Md extends Ld{constructor(e,t,s,a=[]){super(),this.key=e,this.value=t,this.precondition=s,this.fieldTransforms=a,this.type=0}getFieldMask(){return null}}class $u extends Ld{constructor(e,t,s,a,u=[]){super(),this.key=e,this.data=t,this.fieldMask=s,this.precondition=a,this.fieldTransforms=u,this.type=1}getFieldMask(){return this.fieldMask}}function h_(i){const e=new Map;return i.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const s=i.data.field(t);e.set(t,s)}}),e}function lg(i,e,t){const s=new Map;tt(i.length===t.length);for(let a=0;a<t.length;a++){const u=i[a],h=u.transform,m=e.data.field(u.field);s.set(u.field,BI(h,m,t[a]))}return s}function ug(i,e,t){const s=new Map;for(const a of i){const u=a.transform,h=t.data.field(a.field);s.set(a.field,zI(u,h,e))}return s}class WI extends Ld{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class KI{constructor(e,t,s,a){this.batchId=e,this.localWriteTime=t,this.baseMutations=s,this.mutations=a}applyToRemoteDocument(e,t){const s=t.mutationResults;for(let a=0;a<this.mutations.length;a++){const u=this.mutations[a];u.key.isEqual(e.key)&&HI(u,e,s[a])}}applyToLocalView(e,t){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(t=Ta(s,e,t,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(t=Ta(s,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const s=s_();return this.mutations.forEach(a=>{const u=e.get(a.key),h=u.overlayedDocument;let m=this.applyToLocalView(h,u.mutatedFields);m=t.has(a.key)?null:m;const g=c_(h,m);g!==null&&s.set(a.key,g),h.isValidDocument()||h.convertToNoDocument(_e.min())}),s}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Oe())}isEqual(e){return this.batchId===e.batchId&&yo(this.mutations,e.mutations,(t,s)=>ag(t,s))&&yo(this.baseMutations,e.baseMutations,(t,s)=>ag(t,s))}}/**
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
 */class GI{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class QI{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var ut,Pe;function d_(i){if(i===void 0)return Dr("GRPC error has no .code"),G.UNKNOWN;switch(i){case ut.OK:return G.OK;case ut.CANCELLED:return G.CANCELLED;case ut.UNKNOWN:return G.UNKNOWN;case ut.DEADLINE_EXCEEDED:return G.DEADLINE_EXCEEDED;case ut.RESOURCE_EXHAUSTED:return G.RESOURCE_EXHAUSTED;case ut.INTERNAL:return G.INTERNAL;case ut.UNAVAILABLE:return G.UNAVAILABLE;case ut.UNAUTHENTICATED:return G.UNAUTHENTICATED;case ut.INVALID_ARGUMENT:return G.INVALID_ARGUMENT;case ut.NOT_FOUND:return G.NOT_FOUND;case ut.ALREADY_EXISTS:return G.ALREADY_EXISTS;case ut.PERMISSION_DENIED:return G.PERMISSION_DENIED;case ut.FAILED_PRECONDITION:return G.FAILED_PRECONDITION;case ut.ABORTED:return G.ABORTED;case ut.OUT_OF_RANGE:return G.OUT_OF_RANGE;case ut.UNIMPLEMENTED:return G.UNIMPLEMENTED;case ut.DATA_LOSS:return G.DATA_LOSS;default:return Ee()}}(Pe=ut||(ut={}))[Pe.OK=0]="OK",Pe[Pe.CANCELLED=1]="CANCELLED",Pe[Pe.UNKNOWN=2]="UNKNOWN",Pe[Pe.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Pe[Pe.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Pe[Pe.NOT_FOUND=5]="NOT_FOUND",Pe[Pe.ALREADY_EXISTS=6]="ALREADY_EXISTS",Pe[Pe.PERMISSION_DENIED=7]="PERMISSION_DENIED",Pe[Pe.UNAUTHENTICATED=16]="UNAUTHENTICATED",Pe[Pe.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Pe[Pe.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Pe[Pe.ABORTED=10]="ABORTED",Pe[Pe.OUT_OF_RANGE=11]="OUT_OF_RANGE",Pe[Pe.UNIMPLEMENTED=12]="UNIMPLEMENTED",Pe[Pe.INTERNAL=13]="INTERNAL",Pe[Pe.UNAVAILABLE=14]="UNAVAILABLE",Pe[Pe.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function YI(){return new TextEncoder}/**
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
 */const XI=new ts([4294967295,4294967295],0);function cg(i){const e=YI().encode(i),t=new Uy;return t.update(e),new Uint8Array(t.digest())}function hg(i){const e=new DataView(i.buffer),t=e.getUint32(0,!0),s=e.getUint32(4,!0),a=e.getUint32(8,!0),u=e.getUint32(12,!0);return[new ts([t,s],0),new ts([a,u],0)]}class bd{constructor(e,t,s){if(this.bitmap=e,this.padding=t,this.hashCount=s,t<0||t>=8)throw new ga(`Invalid padding: ${t}`);if(s<0)throw new ga(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new ga(`Invalid hash count: ${s}`);if(e.length===0&&t!==0)throw new ga(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=ts.fromNumber(this.Ie)}Ee(e,t,s){let a=e.add(t.multiply(ts.fromNumber(s)));return a.compare(XI)===1&&(a=new ts([a.getBits(0),a.getBits(1)],0)),a.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=cg(e),[s,a]=hg(t);for(let u=0;u<this.hashCount;u++){const h=this.Ee(s,a,u);if(!this.de(h))return!1}return!0}static create(e,t,s){const a=e%8==0?0:8-e%8,u=new Uint8Array(Math.ceil(e/8)),h=new bd(u,a,t);return s.forEach(m=>h.insert(m)),h}insert(e){if(this.Ie===0)return;const t=cg(e),[s,a]=hg(t);for(let u=0;u<this.hashCount;u++){const h=this.Ee(s,a,u);this.Ae(h)}}Ae(e){const t=Math.floor(e/8),s=e%8;this.bitmap[t]|=1<<s}}class ga extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class qu{constructor(e,t,s,a,u){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=s,this.documentUpdates=a,this.resolvedLimboDocuments=u}static createSynthesizedRemoteEventForCurrentChange(e,t,s){const a=new Map;return a.set(e,Ua.createSynthesizedTargetChangeForCurrentChange(e,t,s)),new qu(_e.min(),a,new it(be),_i(),Oe())}}class Ua{constructor(e,t,s,a,u){this.resumeToken=e,this.current=t,this.addedDocuments=s,this.modifiedDocuments=a,this.removedDocuments=u}static createSynthesizedTargetChangeForCurrentChange(e,t,s){return new Ua(s,t,Oe(),Oe(),Oe())}}/**
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
 */class mu{constructor(e,t,s,a){this.Re=e,this.removedTargetIds=t,this.key=s,this.Ve=a}}class f_{constructor(e,t){this.targetId=e,this.me=t}}class p_{constructor(e,t,s=Pt.EMPTY_BYTE_STRING,a=null){this.state=e,this.targetIds=t,this.resumeToken=s,this.cause=a}}class dg{constructor(){this.fe=0,this.ge=pg(),this.pe=Pt.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=Oe(),t=Oe(),s=Oe();return this.ge.forEach((a,u)=>{switch(u){case 0:e=e.add(a);break;case 2:t=t.add(a);break;case 1:s=s.add(a);break;default:Ee()}}),new Ua(this.pe,this.ye,e,t,s)}Ce(){this.we=!1,this.ge=pg()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,tt(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class JI{constructor(e){this.Le=e,this.Be=new Map,this.ke=_i(),this.qe=fg(),this.Qe=new it(be)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const s=this.Ge(t);switch(e.state){case 0:this.ze(t)&&s.De(e.resumeToken);break;case 1:s.Oe(),s.Se||s.Ce(),s.De(e.resumeToken);break;case 2:s.Oe(),s.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(s.Ne(),s.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),s.De(e.resumeToken));break;default:Ee()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((s,a)=>{this.ze(a)&&t(a)})}He(e){const t=e.targetId,s=e.me.count,a=this.Je(t);if(a){const u=a.target;if(Jh(u))if(s===0){const h=new ue(u.path);this.Ue(t,h,Mt.newNoDocument(h,_e.min()))}else tt(s===1);else{const h=this.Ye(t);if(h!==s){const m=this.Ze(e),g=m?this.Xe(m,e,h):1;if(g!==0){this.je(t);const v=g===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,v)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:s="",padding:a=0},hashCount:u=0}=t;let h,m;try{h=as(s).toUint8Array()}catch(g){if(g instanceof Gy)return go("Decoding the base64 bloom filter in existence filter failed ("+g.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw g}try{m=new bd(h,a,u)}catch(g){return go(g instanceof ga?"BloomFilter error: ":"Applying bloom filter failed: ",g),null}return m.Ie===0?null:m}Xe(e,t,s){return t.me.count===s-this.nt(e,t.targetId)?0:2}nt(e,t){const s=this.Le.getRemoteKeysForTarget(t);let a=0;return s.forEach(u=>{const h=this.Le.tt(),m=`projects/${h.projectId}/databases/${h.database}/documents/${u.path.canonicalString()}`;e.mightContain(m)||(this.Ue(t,u,null),a++)}),a}rt(e){const t=new Map;this.Be.forEach((u,h)=>{const m=this.Je(h);if(m){if(u.current&&Jh(m.target)){const g=new ue(m.target.path);this.ke.get(g)!==null||this.it(h,g)||this.Ue(h,g,Mt.newNoDocument(g,e))}u.be&&(t.set(h,u.ve()),u.Ce())}});let s=Oe();this.qe.forEach((u,h)=>{let m=!0;h.forEachWhile(g=>{const v=this.Je(g);return!v||v.purpose==="TargetPurposeLimboResolution"||(m=!1,!1)}),m&&(s=s.add(u))}),this.ke.forEach((u,h)=>h.setReadTime(e));const a=new qu(e,t,this.Qe,this.ke,s);return this.ke=_i(),this.qe=fg(),this.Qe=new it(be),a}$e(e,t){if(!this.ze(e))return;const s=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,s),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,s){if(!this.ze(e))return;const a=this.Ge(e);this.it(e,t)?a.Fe(t,1):a.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),s&&(this.ke=this.ke.insert(t,s))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new dg,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new Ct(be),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||ie("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new dg),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function fg(){return new it(ue.comparator)}function pg(){return new it(ue.comparator)}const ZI={asc:"ASCENDING",desc:"DESCENDING"},eS={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},tS={and:"AND",or:"OR"};class nS{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function rd(i,e){return i.useProto3Json||Uu(e)?e:{value:e}}function id(i,e){return i.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function m_(i,e){return i.useProto3Json?e.toBase64():e.toUint8Array()}function po(i){return tt(!!i),_e.fromTimestamp(function(t){const s=yi(t);return new wt(s.seconds,s.nanos)}(i))}function g_(i,e){return sd(i,e).canonicalString()}function sd(i,e){const t=function(a){return new Ke(["projects",a.projectId,"databases",a.database])}(i).child("documents");return e===void 0?t:t.child(e)}function y_(i){const e=Ke.fromString(i);return tt(T_(e)),e}function xh(i,e){const t=y_(e);if(t.get(1)!==i.databaseId.projectId)throw new se(G.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+i.databaseId.projectId);if(t.get(3)!==i.databaseId.database)throw new se(G.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+i.databaseId.database);return new ue(v_(t))}function __(i,e){return g_(i.databaseId,e)}function rS(i){const e=y_(i);return e.length===4?Ke.emptyPath():v_(e)}function mg(i){return new Ke(["projects",i.databaseId.projectId,"databases",i.databaseId.database]).canonicalString()}function v_(i){return tt(i.length>4&&i.get(4)==="documents"),i.popFirst(5)}function iS(i,e){let t;if("targetChange"in e){e.targetChange;const s=function(v){return v==="NO_CHANGE"?0:v==="ADD"?1:v==="REMOVE"?2:v==="CURRENT"?3:v==="RESET"?4:Ee()}(e.targetChange.targetChangeType||"NO_CHANGE"),a=e.targetChange.targetIds||[],u=function(v,w){return v.useProto3Json?(tt(w===void 0||typeof w=="string"),Pt.fromBase64String(w||"")):(tt(w===void 0||w instanceof Buffer||w instanceof Uint8Array),Pt.fromUint8Array(w||new Uint8Array))}(i,e.targetChange.resumeToken),h=e.targetChange.cause,m=h&&function(v){const w=v.code===void 0?G.UNKNOWN:d_(v.code);return new se(w,v.message||"")}(h);t=new p_(s,a,u,m||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const a=xh(i,s.document.name),u=po(s.document.updateTime),h=s.document.createTime?po(s.document.createTime):_e.min(),m=new Jn({mapValue:{fields:s.document.fields}}),g=Mt.newFoundDocument(a,u,h,m),v=s.targetIds||[],w=s.removedTargetIds||[];t=new mu(v,w,g.key,g)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const a=xh(i,s.document),u=s.readTime?po(s.readTime):_e.min(),h=Mt.newNoDocument(a,u),m=s.removedTargetIds||[];t=new mu([],m,h.key,h)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const a=xh(i,s.document),u=s.removedTargetIds||[];t=new mu([],u,a,null)}else{if(!("filter"in e))return Ee();{e.filter;const s=e.filter;s.targetId;const{count:a=0,unchangedNames:u}=s,h=new QI(a,u),m=s.targetId;t=new f_(m,h)}}return t}function sS(i,e){return{documents:[__(i,e.path)]}}function oS(i,e){const t={structuredQuery:{}},s=e.path;let a;e.collectionGroup!==null?(a=s,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(a=s.popLast(),t.structuredQuery.from=[{collectionId:s.lastSegment()}]),t.parent=__(i,a);const u=function(v){if(v.length!==0)return w_(Fn.create(v,"and"))}(e.filters);u&&(t.structuredQuery.where=u);const h=function(v){if(v.length!==0)return v.map(w=>function(b){return{field:oo(b.field),direction:uS(b.dir)}}(w))}(e.orderBy);h&&(t.structuredQuery.orderBy=h);const m=rd(i,e.limit);return m!==null&&(t.structuredQuery.limit=m),e.startAt&&(t.structuredQuery.startAt=function(v){return{before:v.inclusive,values:v.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(v){return{before:!v.inclusive,values:v.position}}(e.endAt)),{_t:t,parent:a}}function aS(i){let e=rS(i.parent);const t=i.structuredQuery,s=t.from?t.from.length:0;let a=null;if(s>0){tt(s===1);const w=t.from[0];w.allDescendants?a=w.collectionId:e=e.child(w.collectionId)}let u=[];t.where&&(u=function(N){const b=E_(N);return b instanceof Fn&&Xy(b)?b.getFilters():[b]}(t.where));let h=[];t.orderBy&&(h=function(N){return N.map(b=>function(Q){return new Cu(ao(Q.field),function(B){switch(B){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(Q.direction))}(b))}(t.orderBy));let m=null;t.limit&&(m=function(N){let b;return b=typeof N=="object"?N.value:N,Uu(b)?null:b}(t.limit));let g=null;t.startAt&&(g=function(N){const b=!!N.before,j=N.values||[];return new ku(j,b)}(t.startAt));let v=null;return t.endAt&&(v=function(N){const b=!N.before,j=N.values||[];return new ku(j,b)}(t.endAt)),DI(e,a,h,u,m,"F",g,v)}function lS(i,e){const t=function(a){switch(a){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Ee()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function E_(i){return i.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const s=ao(t.unaryFilter.field);return ct.create(s,"==",{doubleValue:NaN});case"IS_NULL":const a=ao(t.unaryFilter.field);return ct.create(a,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const u=ao(t.unaryFilter.field);return ct.create(u,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const h=ao(t.unaryFilter.field);return ct.create(h,"!=",{nullValue:"NULL_VALUE"});default:return Ee()}}(i):i.fieldFilter!==void 0?function(t){return ct.create(ao(t.fieldFilter.field),function(a){switch(a){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return Ee()}}(t.fieldFilter.op),t.fieldFilter.value)}(i):i.compositeFilter!==void 0?function(t){return Fn.create(t.compositeFilter.filters.map(s=>E_(s)),function(a){switch(a){case"AND":return"and";case"OR":return"or";default:return Ee()}}(t.compositeFilter.op))}(i):Ee()}function uS(i){return ZI[i]}function cS(i){return eS[i]}function hS(i){return tS[i]}function oo(i){return{fieldPath:i.canonicalString()}}function ao(i){return bt.fromServerFormat(i.fieldPath)}function w_(i){return i instanceof ct?function(t){if(t.op==="=="){if(tg(t.value))return{unaryFilter:{field:oo(t.field),op:"IS_NAN"}};if(eg(t.value))return{unaryFilter:{field:oo(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(tg(t.value))return{unaryFilter:{field:oo(t.field),op:"IS_NOT_NAN"}};if(eg(t.value))return{unaryFilter:{field:oo(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:oo(t.field),op:cS(t.op),value:t.value}}}(i):i instanceof Fn?function(t){const s=t.getFilters().map(a=>w_(a));return s.length===1?s[0]:{compositeFilter:{op:hS(t.op),filters:s}}}(i):Ee()}function T_(i){return i.length>=4&&i.get(0)==="projects"&&i.get(2)==="databases"}/**
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
 */class hi{constructor(e,t,s,a,u=_e.min(),h=_e.min(),m=Pt.EMPTY_BYTE_STRING,g=null){this.target=e,this.targetId=t,this.purpose=s,this.sequenceNumber=a,this.snapshotVersion=u,this.lastLimboFreeSnapshotVersion=h,this.resumeToken=m,this.expectedCount=g}withSequenceNumber(e){return new hi(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new hi(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new hi(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new hi(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class dS{constructor(e){this.ct=e}}function fS(i){const e=aS({parent:i.parent,structuredQuery:i.structuredQuery});return i.limitType==="LAST"?ed(e,e.limit,"L"):e}/**
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
 */class pS{constructor(){this.un=new mS}addToCollectionParentIndex(e,t){return this.un.add(t),H.resolve()}getCollectionParents(e,t){return H.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return H.resolve()}deleteFieldIndex(e,t){return H.resolve()}deleteAllFieldIndexes(e){return H.resolve()}createTargetIndexes(e,t){return H.resolve()}getDocumentsMatchingTarget(e,t){return H.resolve(null)}getIndexType(e,t){return H.resolve(0)}getFieldIndexes(e,t){return H.resolve([])}getNextCollectionGroupToUpdate(e){return H.resolve(null)}getMinOffset(e,t){return H.resolve(gi.min())}getMinOffsetFromCollectionGroup(e,t){return H.resolve(gi.min())}updateCollectionGroup(e,t,s){return H.resolve()}updateIndexEntries(e,t){return H.resolve()}}class mS{constructor(){this.index={}}add(e){const t=e.lastSegment(),s=e.popLast(),a=this.index[t]||new Ct(Ke.comparator),u=!a.has(s);return this.index[t]=a.add(s),u}has(e){const t=e.lastSegment(),s=e.popLast(),a=this.index[t];return a&&a.has(s)}getEntries(e){return(this.index[e]||new Ct(Ke.comparator)).toArray()}}/**
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
 */class Eo{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Eo(0)}static kn(){return new Eo(-1)}}/**
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
 */class gS{constructor(){this.changes=new Ao(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Mt.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const s=this.changes.get(t);return s!==void 0?H.resolve(s):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class yS{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class _S{constructor(e,t,s,a){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=s,this.indexManager=a}getDocument(e,t){let s=null;return this.documentOverlayCache.getOverlay(e,t).next(a=>(s=a,this.remoteDocumentCache.getEntry(e,t))).next(a=>(s!==null&&Ta(s.mutation,a,ci.empty(),wt.now()),a))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(s=>this.getLocalViewOfDocuments(e,s,Oe()).next(()=>s))}getLocalViewOfDocuments(e,t,s=Oe()){const a=es();return this.populateOverlays(e,a,t).next(()=>this.computeViews(e,t,a,s).next(u=>{let h=ma();return u.forEach((m,g)=>{h=h.insert(m,g.overlayedDocument)}),h}))}getOverlayedDocuments(e,t){const s=es();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,Oe()))}populateOverlays(e,t,s){const a=[];return s.forEach(u=>{t.has(u)||a.push(u)}),this.documentOverlayCache.getOverlays(e,a).next(u=>{u.forEach((h,m)=>{t.set(h,m)})})}computeViews(e,t,s,a){let u=_i();const h=wa(),m=function(){return wa()}();return t.forEach((g,v)=>{const w=s.get(v.key);a.has(v.key)&&(w===void 0||w.mutation instanceof $u)?u=u.insert(v.key,v):w!==void 0?(h.set(v.key,w.mutation.getFieldMask()),Ta(w.mutation,v,w.mutation.getFieldMask(),wt.now())):h.set(v.key,ci.empty())}),this.recalculateAndSaveOverlays(e,u).next(g=>(g.forEach((v,w)=>h.set(v,w)),t.forEach((v,w)=>{var N;return m.set(v,new yS(w,(N=h.get(v))!==null&&N!==void 0?N:null))}),m))}recalculateAndSaveOverlays(e,t){const s=wa();let a=new it((h,m)=>h-m),u=Oe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(h=>{for(const m of h)m.keys().forEach(g=>{const v=t.get(g);if(v===null)return;let w=s.get(g)||ci.empty();w=m.applyToLocalView(v,w),s.set(g,w);const N=(a.get(m.batchId)||Oe()).add(g);a=a.insert(m.batchId,N)})}).next(()=>{const h=[],m=a.getReverseIterator();for(;m.hasNext();){const g=m.getNext(),v=g.key,w=g.value,N=s_();w.forEach(b=>{if(!u.has(b)){const j=c_(t.get(b),s.get(b));j!==null&&N.set(b,j),u=u.add(b)}}),h.push(this.documentOverlayCache.saveOverlays(e,v,N))}return H.waitFor(h)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(s=>this.recalculateAndSaveOverlays(e,s))}getDocumentsMatchingQuery(e,t,s,a){return function(h){return ue.isDocumentKey(h.path)&&h.collectionGroup===null&&h.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):t_(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,s,a):this.getDocumentsMatchingCollectionQuery(e,t,s,a)}getNextDocuments(e,t,s,a){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,s,a).next(u=>{const h=a-u.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,s.largestBatchId,a-u.size):H.resolve(es());let m=-1,g=u;return h.next(v=>H.forEach(v,(w,N)=>(m<N.largestBatchId&&(m=N.largestBatchId),u.get(w)?H.resolve():this.remoteDocumentCache.getEntry(e,w).next(b=>{g=g.insert(w,b)}))).next(()=>this.populateOverlays(e,v,u)).next(()=>this.computeViews(e,g,v,Oe())).next(w=>({batchId:m,changes:MI(w)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new ue(t)).next(s=>{let a=ma();return s.isFoundDocument()&&(a=a.insert(s.key,s)),a})}getDocumentsMatchingCollectionGroupQuery(e,t,s,a){const u=t.collectionGroup;let h=ma();return this.indexManager.getCollectionParents(e,u).next(m=>H.forEach(m,g=>{const v=function(N,b){return new Fa(b,null,N.explicitOrderBy.slice(),N.filters.slice(),N.limit,N.limitType,N.startAt,N.endAt)}(t,g.child(u));return this.getDocumentsMatchingCollectionQuery(e,v,s,a).next(w=>{w.forEach((N,b)=>{h=h.insert(N,b)})})}).next(()=>h))}getDocumentsMatchingCollectionQuery(e,t,s,a){let u;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,s.largestBatchId).next(h=>(u=h,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,s,u,a))).next(h=>{u.forEach((g,v)=>{const w=v.getKey();h.get(w)===null&&(h=h.insert(w,Mt.newInvalidDocument(w)))});let m=ma();return h.forEach((g,v)=>{const w=u.get(g);w!==void 0&&Ta(w.mutation,v,ci.empty(),wt.now()),zu(t,v)&&(m=m.insert(g,v))}),m})}}/**
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
 */class vS{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return H.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(a){return{id:a.id,version:a.version,createTime:po(a.createTime)}}(t)),H.resolve()}getNamedQuery(e,t){return H.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(a){return{name:a.name,query:fS(a.bundledQuery),readTime:po(a.readTime)}}(t)),H.resolve()}}/**
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
 */class ES{constructor(){this.overlays=new it(ue.comparator),this.Ir=new Map}getOverlay(e,t){return H.resolve(this.overlays.get(t))}getOverlays(e,t){const s=es();return H.forEach(t,a=>this.getOverlay(e,a).next(u=>{u!==null&&s.set(a,u)})).next(()=>s)}saveOverlays(e,t,s){return s.forEach((a,u)=>{this.ht(e,t,u)}),H.resolve()}removeOverlaysForBatchId(e,t,s){const a=this.Ir.get(s);return a!==void 0&&(a.forEach(u=>this.overlays=this.overlays.remove(u)),this.Ir.delete(s)),H.resolve()}getOverlaysForCollection(e,t,s){const a=es(),u=t.length+1,h=new ue(t.child("")),m=this.overlays.getIteratorFrom(h);for(;m.hasNext();){const g=m.getNext().value,v=g.getKey();if(!t.isPrefixOf(v.path))break;v.path.length===u&&g.largestBatchId>s&&a.set(g.getKey(),g)}return H.resolve(a)}getOverlaysForCollectionGroup(e,t,s,a){let u=new it((v,w)=>v-w);const h=this.overlays.getIterator();for(;h.hasNext();){const v=h.getNext().value;if(v.getKey().getCollectionGroup()===t&&v.largestBatchId>s){let w=u.get(v.largestBatchId);w===null&&(w=es(),u=u.insert(v.largestBatchId,w)),w.set(v.getKey(),v)}}const m=es(),g=u.getIterator();for(;g.hasNext()&&(g.getNext().value.forEach((v,w)=>m.set(v,w)),!(m.size()>=a)););return H.resolve(m)}ht(e,t,s){const a=this.overlays.get(s.key);if(a!==null){const h=this.Ir.get(a.largestBatchId).delete(s.key);this.Ir.set(a.largestBatchId,h)}this.overlays=this.overlays.insert(s.key,new GI(t,s));let u=this.Ir.get(t);u===void 0&&(u=Oe(),this.Ir.set(t,u)),this.Ir.set(t,u.add(s.key))}}/**
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
 */class wS{constructor(){this.sessionToken=Pt.EMPTY_BYTE_STRING}getSessionToken(e){return H.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,H.resolve()}}/**
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
 */class Fd{constructor(){this.Tr=new Ct(Et.Er),this.dr=new Ct(Et.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const s=new Et(e,t);this.Tr=this.Tr.add(s),this.dr=this.dr.add(s)}Rr(e,t){e.forEach(s=>this.addReference(s,t))}removeReference(e,t){this.Vr(new Et(e,t))}mr(e,t){e.forEach(s=>this.removeReference(s,t))}gr(e){const t=new ue(new Ke([])),s=new Et(t,e),a=new Et(t,e+1),u=[];return this.dr.forEachInRange([s,a],h=>{this.Vr(h),u.push(h.key)}),u}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new ue(new Ke([])),s=new Et(t,e),a=new Et(t,e+1);let u=Oe();return this.dr.forEachInRange([s,a],h=>{u=u.add(h.key)}),u}containsKey(e){const t=new Et(e,0),s=this.Tr.firstAfterOrEqual(t);return s!==null&&e.isEqual(s.key)}}class Et{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return ue.comparator(e.key,t.key)||be(e.wr,t.wr)}static Ar(e,t){return be(e.wr,t.wr)||ue.comparator(e.key,t.key)}}/**
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
 */class TS{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new Ct(Et.Er)}checkEmpty(e){return H.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,s,a){const u=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const h=new KI(u,t,s,a);this.mutationQueue.push(h);for(const m of a)this.br=this.br.add(new Et(m.key,u)),this.indexManager.addToCollectionParentIndex(e,m.key.path.popLast());return H.resolve(h)}lookupMutationBatch(e,t){return H.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const s=t+1,a=this.vr(s),u=a<0?0:a;return H.resolve(this.mutationQueue.length>u?this.mutationQueue[u]:null)}getHighestUnacknowledgedBatchId(){return H.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return H.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const s=new Et(t,0),a=new Et(t,Number.POSITIVE_INFINITY),u=[];return this.br.forEachInRange([s,a],h=>{const m=this.Dr(h.wr);u.push(m)}),H.resolve(u)}getAllMutationBatchesAffectingDocumentKeys(e,t){let s=new Ct(be);return t.forEach(a=>{const u=new Et(a,0),h=new Et(a,Number.POSITIVE_INFINITY);this.br.forEachInRange([u,h],m=>{s=s.add(m.wr)})}),H.resolve(this.Cr(s))}getAllMutationBatchesAffectingQuery(e,t){const s=t.path,a=s.length+1;let u=s;ue.isDocumentKey(u)||(u=u.child(""));const h=new Et(new ue(u),0);let m=new Ct(be);return this.br.forEachWhile(g=>{const v=g.key.path;return!!s.isPrefixOf(v)&&(v.length===a&&(m=m.add(g.wr)),!0)},h),H.resolve(this.Cr(m))}Cr(e){const t=[];return e.forEach(s=>{const a=this.Dr(s);a!==null&&t.push(a)}),t}removeMutationBatch(e,t){tt(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let s=this.br;return H.forEach(t.mutations,a=>{const u=new Et(a.key,t.batchId);return s=s.delete(u),this.referenceDelegate.markPotentiallyOrphaned(e,a.key)}).next(()=>{this.br=s})}On(e){}containsKey(e,t){const s=new Et(t,0),a=this.br.firstAfterOrEqual(s);return H.resolve(t.isEqual(a&&a.key))}performConsistencyCheck(e){return this.mutationQueue.length,H.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class IS{constructor(e){this.Mr=e,this.docs=function(){return new it(ue.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const s=t.key,a=this.docs.get(s),u=a?a.size:0,h=this.Mr(t);return this.docs=this.docs.insert(s,{document:t.mutableCopy(),size:h}),this.size+=h-u,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const s=this.docs.get(t);return H.resolve(s?s.document.mutableCopy():Mt.newInvalidDocument(t))}getEntries(e,t){let s=_i();return t.forEach(a=>{const u=this.docs.get(a);s=s.insert(a,u?u.document.mutableCopy():Mt.newInvalidDocument(a))}),H.resolve(s)}getDocumentsMatchingQuery(e,t,s,a){let u=_i();const h=t.path,m=new ue(h.child("")),g=this.docs.getIteratorFrom(m);for(;g.hasNext();){const{key:v,value:{document:w}}=g.getNext();if(!h.isPrefixOf(v.path))break;v.path.length>h.length+1||dI(hI(w),s)<=0||(a.has(w.key)||zu(t,w))&&(u=u.insert(w.key,w.mutableCopy()))}return H.resolve(u)}getAllFromCollectionGroup(e,t,s,a){Ee()}Or(e,t){return H.forEach(this.docs,s=>t(s))}newChangeBuffer(e){return new SS(this)}getSize(e){return H.resolve(this.size)}}class SS extends gS{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((s,a)=>{a.isValidDocument()?t.push(this.cr.addEntry(e,a)):this.cr.removeEntry(s)}),H.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
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
 */class AS{constructor(e){this.persistence=e,this.Nr=new Ao(t=>Dd(t),Od),this.lastRemoteSnapshotVersion=_e.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Fd,this.targetCount=0,this.kr=Eo.Bn()}forEachTarget(e,t){return this.Nr.forEach((s,a)=>t(a)),H.resolve()}getLastRemoteSnapshotVersion(e){return H.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return H.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),H.resolve(this.highestTargetId)}setTargetsMetadata(e,t,s){return s&&(this.lastRemoteSnapshotVersion=s),t>this.Lr&&(this.Lr=t),H.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new Eo(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,H.resolve()}updateTargetData(e,t){return this.Kn(t),H.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,H.resolve()}removeTargets(e,t,s){let a=0;const u=[];return this.Nr.forEach((h,m)=>{m.sequenceNumber<=t&&s.get(m.targetId)===null&&(this.Nr.delete(h),u.push(this.removeMatchingKeysForTargetId(e,m.targetId)),a++)}),H.waitFor(u).next(()=>a)}getTargetCount(e){return H.resolve(this.targetCount)}getTargetData(e,t){const s=this.Nr.get(t)||null;return H.resolve(s)}addMatchingKeys(e,t,s){return this.Br.Rr(t,s),H.resolve()}removeMatchingKeys(e,t,s){this.Br.mr(t,s);const a=this.persistence.referenceDelegate,u=[];return a&&t.forEach(h=>{u.push(a.markPotentiallyOrphaned(e,h))}),H.waitFor(u)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),H.resolve()}getMatchingKeysForTargetId(e,t){const s=this.Br.yr(t);return H.resolve(s)}containsKey(e,t){return H.resolve(this.Br.containsKey(t))}}/**
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
 */class RS{constructor(e,t){this.qr={},this.overlays={},this.Qr=new kd(0),this.Kr=!1,this.Kr=!0,this.$r=new wS,this.referenceDelegate=e(this),this.Ur=new AS(this),this.indexManager=new pS,this.remoteDocumentCache=function(a){return new IS(a)}(s=>this.referenceDelegate.Wr(s)),this.serializer=new dS(t),this.Gr=new vS(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new ES,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let s=this.qr[e.toKey()];return s||(s=new TS(t,this.referenceDelegate),this.qr[e.toKey()]=s),s}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,s){ie("MemoryPersistence","Starting transaction:",e);const a=new kS(this.Qr.next());return this.referenceDelegate.zr(),s(a).next(u=>this.referenceDelegate.jr(a).next(()=>u)).toPromise().then(u=>(a.raiseOnCommittedEvent(),u))}Hr(e,t){return H.or(Object.values(this.qr).map(s=>()=>s.containsKey(e,t)))}}class kS extends pI{constructor(e){super(),this.currentSequenceNumber=e}}class Ud{constructor(e){this.persistence=e,this.Jr=new Fd,this.Yr=null}static Zr(e){return new Ud(e)}get Xr(){if(this.Yr)return this.Yr;throw Ee()}addReference(e,t,s){return this.Jr.addReference(s,t),this.Xr.delete(s.toString()),H.resolve()}removeReference(e,t,s){return this.Jr.removeReference(s,t),this.Xr.add(s.toString()),H.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),H.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(a=>this.Xr.add(a.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,t.targetId).next(a=>{a.forEach(u=>this.Xr.add(u.toString()))}).next(()=>s.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return H.forEach(this.Xr,s=>{const a=ue.fromPath(s);return this.ei(e,a).next(u=>{u||t.removeEntry(a,_e.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(s=>{s?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return H.or([()=>H.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
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
 */class jd{constructor(e,t,s,a){this.targetId=e,this.fromCache=t,this.$i=s,this.Ui=a}static Wi(e,t){let s=Oe(),a=Oe();for(const u of t.docChanges)switch(u.type){case 0:s=s.add(u.doc.key);break;case 1:a=a.add(u.doc.key)}return new jd(e,t.fromCache,s,a)}}/**
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
 */class CS{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class PS{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return RE()?8:mI(Ft())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,s,a){const u={result:null};return this.Yi(e,t).next(h=>{u.result=h}).next(()=>{if(!u.result)return this.Zi(e,t,a,s).next(h=>{u.result=h})}).next(()=>{if(u.result)return;const h=new CS;return this.Xi(e,t,h).next(m=>{if(u.result=m,this.zi)return this.es(e,t,h,m.size)})}).next(()=>u.result)}es(e,t,s,a){return s.documentReadCount<this.ji?(ha()<=ke.DEBUG&&ie("QueryEngine","SDK will not create cache indexes for query:",so(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),H.resolve()):(ha()<=ke.DEBUG&&ie("QueryEngine","Query:",so(t),"scans",s.documentReadCount,"local documents and returns",a,"documents as results."),s.documentReadCount>this.Hi*a?(ha()<=ke.DEBUG&&ie("QueryEngine","The SDK decides to create cache indexes for query:",so(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,rr(t))):H.resolve())}Yi(e,t){if(sg(t))return H.resolve(null);let s=rr(t);return this.indexManager.getIndexType(e,s).next(a=>a===0?null:(t.limit!==null&&a===1&&(t=ed(t,null,"F"),s=rr(t)),this.indexManager.getDocumentsMatchingTarget(e,s).next(u=>{const h=Oe(...u);return this.Ji.getDocuments(e,h).next(m=>this.indexManager.getMinOffset(e,s).next(g=>{const v=this.ts(t,m);return this.ns(t,v,h,g.readTime)?this.Yi(e,ed(t,null,"F")):this.rs(e,v,t,g)}))})))}Zi(e,t,s,a){return sg(t)||a.isEqual(_e.min())?H.resolve(null):this.Ji.getDocuments(e,s).next(u=>{const h=this.ts(t,u);return this.ns(t,h,s,a)?H.resolve(null):(ha()<=ke.DEBUG&&ie("QueryEngine","Re-using previous result from %s to execute query: %s",a.toString(),so(t)),this.rs(e,h,t,cI(a,-1)).next(m=>m))})}ts(e,t){let s=new Ct(r_(e));return t.forEach((a,u)=>{zu(e,u)&&(s=s.add(u))}),s}ns(e,t,s,a){if(e.limit===null)return!1;if(s.size!==t.size)return!0;const u=e.limitType==="F"?t.last():t.first();return!!u&&(u.hasPendingWrites||u.version.compareTo(a)>0)}Xi(e,t,s){return ha()<=ke.DEBUG&&ie("QueryEngine","Using full collection scan to execute query:",so(t)),this.Ji.getDocumentsMatchingQuery(e,t,gi.min(),s)}rs(e,t,s,a){return this.Ji.getDocumentsMatchingQuery(e,s,a).next(u=>(t.forEach(h=>{u=u.insert(h.key,h)}),u))}}/**
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
 */class NS{constructor(e,t,s,a){this.persistence=e,this.ss=t,this.serializer=a,this.os=new it(be),this._s=new Ao(u=>Dd(u),Od),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(s)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new _S(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function DS(i,e,t,s){return new NS(i,e,t,s)}async function I_(i,e){const t=Ne(i);return await t.persistence.runTransaction("Handle user change","readonly",s=>{let a;return t.mutationQueue.getAllMutationBatches(s).next(u=>(a=u,t.ls(e),t.mutationQueue.getAllMutationBatches(s))).next(u=>{const h=[],m=[];let g=Oe();for(const v of a){h.push(v.batchId);for(const w of v.mutations)g=g.add(w.key)}for(const v of u){m.push(v.batchId);for(const w of v.mutations)g=g.add(w.key)}return t.localDocuments.getDocuments(s,g).next(v=>({hs:v,removedBatchIds:h,addedBatchIds:m}))})})}function S_(i){const e=Ne(i);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function OS(i,e){const t=Ne(i),s=e.snapshotVersion;let a=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",u=>{const h=t.cs.newChangeBuffer({trackRemovals:!0});a=t.os;const m=[];e.targetChanges.forEach((w,N)=>{const b=a.get(N);if(!b)return;m.push(t.Ur.removeMatchingKeys(u,w.removedDocuments,N).next(()=>t.Ur.addMatchingKeys(u,w.addedDocuments,N)));let j=b.withSequenceNumber(u.currentSequenceNumber);e.targetMismatches.get(N)!==null?j=j.withResumeToken(Pt.EMPTY_BYTE_STRING,_e.min()).withLastLimboFreeSnapshotVersion(_e.min()):w.resumeToken.approximateByteSize()>0&&(j=j.withResumeToken(w.resumeToken,s)),a=a.insert(N,j),function(X,B,ye){return X.resumeToken.approximateByteSize()===0||B.snapshotVersion.toMicroseconds()-X.snapshotVersion.toMicroseconds()>=3e8?!0:ye.addedDocuments.size+ye.modifiedDocuments.size+ye.removedDocuments.size>0}(b,j,w)&&m.push(t.Ur.updateTargetData(u,j))});let g=_i(),v=Oe();if(e.documentUpdates.forEach(w=>{e.resolvedLimboDocuments.has(w)&&m.push(t.persistence.referenceDelegate.updateLimboDocument(u,w))}),m.push(VS(u,h,e.documentUpdates).next(w=>{g=w.Ps,v=w.Is})),!s.isEqual(_e.min())){const w=t.Ur.getLastRemoteSnapshotVersion(u).next(N=>t.Ur.setTargetsMetadata(u,u.currentSequenceNumber,s));m.push(w)}return H.waitFor(m).next(()=>h.apply(u)).next(()=>t.localDocuments.getLocalViewOfDocuments(u,g,v)).next(()=>g)}).then(u=>(t.os=a,u))}function VS(i,e,t){let s=Oe(),a=Oe();return t.forEach(u=>s=s.add(u)),e.getEntries(i,s).next(u=>{let h=_i();return t.forEach((m,g)=>{const v=u.get(m);g.isFoundDocument()!==v.isFoundDocument()&&(a=a.add(m)),g.isNoDocument()&&g.version.isEqual(_e.min())?(e.removeEntry(m,g.readTime),h=h.insert(m,g)):!v.isValidDocument()||g.version.compareTo(v.version)>0||g.version.compareTo(v.version)===0&&v.hasPendingWrites?(e.addEntry(g),h=h.insert(m,g)):ie("LocalStore","Ignoring outdated watch update for ",m,". Current version:",v.version," Watch version:",g.version)}),{Ps:h,Is:a}})}function xS(i,e){const t=Ne(i);return t.persistence.runTransaction("Allocate target","readwrite",s=>{let a;return t.Ur.getTargetData(s,e).next(u=>u?(a=u,H.resolve(a)):t.Ur.allocateTargetId(s).next(h=>(a=new hi(e,h,"TargetPurposeListen",s.currentSequenceNumber),t.Ur.addTargetData(s,a).next(()=>a))))}).then(s=>{const a=t.os.get(s.targetId);return(a===null||s.snapshotVersion.compareTo(a.snapshotVersion)>0)&&(t.os=t.os.insert(s.targetId,s),t._s.set(e,s.targetId)),s})}async function od(i,e,t){const s=Ne(i),a=s.os.get(e),u=t?"readwrite":"readwrite-primary";try{t||await s.persistence.runTransaction("Release target",u,h=>s.persistence.referenceDelegate.removeTarget(h,a))}catch(h){if(!Ma(h))throw h;ie("LocalStore",`Failed to update sequence numbers for target ${e}: ${h}`)}s.os=s.os.remove(e),s._s.delete(a.target)}function gg(i,e,t){const s=Ne(i);let a=_e.min(),u=Oe();return s.persistence.runTransaction("Execute query","readwrite",h=>function(g,v,w){const N=Ne(g),b=N._s.get(w);return b!==void 0?H.resolve(N.os.get(b)):N.Ur.getTargetData(v,w)}(s,h,rr(e)).next(m=>{if(m)return a=m.lastLimboFreeSnapshotVersion,s.Ur.getMatchingKeysForTargetId(h,m.targetId).next(g=>{u=g})}).next(()=>s.ss.getDocumentsMatchingQuery(h,e,t?a:_e.min(),t?u:Oe())).next(m=>(LS(s,VI(e),m),{documents:m,Ts:u})))}function LS(i,e,t){let s=i.us.get(e)||_e.min();t.forEach((a,u)=>{u.readTime.compareTo(s)>0&&(s=u.readTime)}),i.us.set(e,s)}class yg{constructor(){this.activeTargetIds=UI()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class MS{constructor(){this.so=new yg,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,s){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,s){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new yg,Promise.resolve()}handleUserChange(e,t,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class bS{_o(e){}shutdown(){}}/**
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
 */class _g{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){ie("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){ie("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let au=null;function Lh(){return au===null?au=function(){return 268435456+Math.round(2147483648*Math.random())}():au++,"0x"+au.toString(16)}/**
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
 */const FS={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class US{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
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
 */const xt="WebChannelConnection";class jS extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const s=t.ssl?"https":"http",a=encodeURIComponent(this.databaseId.projectId),u=encodeURIComponent(this.databaseId.database);this.Do=s+"://"+t.host,this.vo=`projects/${a}/databases/${u}`,this.Co=this.databaseId.database==="(default)"?`project_id=${a}`:`project_id=${a}&database_id=${u}`}get Fo(){return!1}Mo(t,s,a,u,h){const m=Lh(),g=this.xo(t,s.toUriEncodedString());ie("RestConnection",`Sending RPC '${t}' ${m}:`,g,a);const v={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(v,u,h),this.No(t,g,v,a).then(w=>(ie("RestConnection",`Received RPC '${t}' ${m}: `,w),w),w=>{throw go("RestConnection",`RPC '${t}' ${m} failed with error: `,w,"url: ",g,"request:",a),w})}Lo(t,s,a,u,h,m){return this.Mo(t,s,a,u,h)}Oo(t,s,a){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+So}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),s&&s.headers.forEach((u,h)=>t[h]=u),a&&a.headers.forEach((u,h)=>t[h]=u)}xo(t,s){const a=FS[t];return`${this.Do}/v1/${s}:${a}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,s,a){const u=Lh();return new Promise((h,m)=>{const g=new jy;g.setWithCredentials(!0),g.listenOnce(zy.COMPLETE,()=>{try{switch(g.getLastErrorCode()){case fu.NO_ERROR:const w=g.getResponseJson();ie(xt,`XHR for RPC '${e}' ${u} received:`,JSON.stringify(w)),h(w);break;case fu.TIMEOUT:ie(xt,`RPC '${e}' ${u} timed out`),m(new se(G.DEADLINE_EXCEEDED,"Request time out"));break;case fu.HTTP_ERROR:const N=g.getStatus();if(ie(xt,`RPC '${e}' ${u} failed with status:`,N,"response text:",g.getResponseText()),N>0){let b=g.getResponseJson();Array.isArray(b)&&(b=b[0]);const j=b?.error;if(j&&j.status&&j.message){const Q=function(B){const ye=B.toLowerCase().replace(/_/g,"-");return Object.values(G).indexOf(ye)>=0?ye:G.UNKNOWN}(j.status);m(new se(Q,j.message))}else m(new se(G.UNKNOWN,"Server responded with status "+g.getStatus()))}else m(new se(G.UNAVAILABLE,"Connection failed."));break;default:Ee()}}finally{ie(xt,`RPC '${e}' ${u} completed.`)}});const v=JSON.stringify(a);ie(xt,`RPC '${e}' ${u} sending request:`,a),g.send(t,"POST",v,s,15)})}Bo(e,t,s){const a=Lh(),u=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],h=qy(),m=$y(),g={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},v=this.longPollingOptions.timeoutSeconds;v!==void 0&&(g.longPollingTimeout=Math.round(1e3*v)),this.useFetchStreams&&(g.useFetchStreams=!0),this.Oo(g.initMessageHeaders,t,s),g.encodeInitMessageHeaders=!0;const w=u.join("");ie(xt,`Creating RPC '${e}' stream ${a}: ${w}`,g);const N=h.createWebChannel(w,g);let b=!1,j=!1;const Q=new US({Io:B=>{j?ie(xt,`Not sending because RPC '${e}' stream ${a} is closed:`,B):(b||(ie(xt,`Opening RPC '${e}' stream ${a} transport.`),N.open(),b=!0),ie(xt,`RPC '${e}' stream ${a} sending:`,B),N.send(B))},To:()=>N.close()}),X=(B,ye,Ie)=>{B.listen(ye,me=>{try{Ie(me)}catch(fe){setTimeout(()=>{throw fe},0)}})};return X(N,pa.EventType.OPEN,()=>{j||(ie(xt,`RPC '${e}' stream ${a} transport opened.`),Q.yo())}),X(N,pa.EventType.CLOSE,()=>{j||(j=!0,ie(xt,`RPC '${e}' stream ${a} transport closed`),Q.So())}),X(N,pa.EventType.ERROR,B=>{j||(j=!0,go(xt,`RPC '${e}' stream ${a} transport errored:`,B),Q.So(new se(G.UNAVAILABLE,"The operation could not be completed")))}),X(N,pa.EventType.MESSAGE,B=>{var ye;if(!j){const Ie=B.data[0];tt(!!Ie);const me=Ie,fe=me.error||((ye=me[0])===null||ye===void 0?void 0:ye.error);if(fe){ie(xt,`RPC '${e}' stream ${a} received error:`,fe);const Me=fe.status;let ve=function(A){const k=ut[A];if(k!==void 0)return d_(k)}(Me),P=fe.message;ve===void 0&&(ve=G.INTERNAL,P="Unknown error status: "+Me+" with message "+fe.message),j=!0,Q.So(new se(ve,P)),N.close()}else ie(xt,`RPC '${e}' stream ${a} received:`,Ie),Q.bo(Ie)}}),X(m,By.STAT_EVENT,B=>{B.stat===Gh.PROXY?ie(xt,`RPC '${e}' stream ${a} detected buffering proxy`):B.stat===Gh.NOPROXY&&ie(xt,`RPC '${e}' stream ${a} detected no buffering proxy`)}),setTimeout(()=>{Q.wo()},0),Q}}function Mh(){return typeof document<"u"?document:null}/**
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
 */function Hu(i){return new nS(i,!0)}/**
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
 */class A_{constructor(e,t,s=1e3,a=1.5,u=6e4){this.ui=e,this.timerId=t,this.ko=s,this.qo=a,this.Qo=u,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),s=Math.max(0,Date.now()-this.Uo),a=Math.max(0,t-s);a>0&&ie("ExponentialBackoff",`Backing off for ${a} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${s} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,a,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class zS{constructor(e,t,s,a,u,h,m,g){this.ui=e,this.Ho=s,this.Jo=a,this.connection=u,this.authCredentialsProvider=h,this.appCheckCredentialsProvider=m,this.listener=g,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new A_(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===G.RESOURCE_EXHAUSTED?(Dr(t.toString()),Dr("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===G.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,a])=>{this.Yo===t&&this.P_(s,a)},s=>{e(()=>{const a=new se(G.UNKNOWN,"Fetching auth token failed: "+s.message);return this.I_(a)})})}P_(e,t){const s=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{s(()=>this.listener.Eo())}),this.stream.Ro(()=>{s(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(a=>{s(()=>this.I_(a))}),this.stream.onMessage(a=>{s(()=>++this.e_==1?this.E_(a):this.onNext(a))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return ie("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(ie("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class BS extends zS{constructor(e,t,s,a,u,h){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,s,a,h),this.serializer=u}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=iS(this.serializer,e),s=function(u){if(!("targetChange"in u))return _e.min();const h=u.targetChange;return h.targetIds&&h.targetIds.length?_e.min():h.readTime?po(h.readTime):_e.min()}(e);return this.listener.d_(t,s)}A_(e){const t={};t.database=mg(this.serializer),t.addTarget=function(u,h){let m;const g=h.target;if(m=Jh(g)?{documents:sS(u,g)}:{query:oS(u,g)._t},m.targetId=h.targetId,h.resumeToken.approximateByteSize()>0){m.resumeToken=m_(u,h.resumeToken);const v=rd(u,h.expectedCount);v!==null&&(m.expectedCount=v)}else if(h.snapshotVersion.compareTo(_e.min())>0){m.readTime=id(u,h.snapshotVersion.toTimestamp());const v=rd(u,h.expectedCount);v!==null&&(m.expectedCount=v)}return m}(this.serializer,e);const s=lS(this.serializer,e);s&&(t.labels=s),this.a_(t)}R_(e){const t={};t.database=mg(this.serializer),t.removeTarget=e,this.a_(t)}}/**
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
 */class $S extends class{}{constructor(e,t,s,a){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=s,this.serializer=a,this.y_=!1}w_(){if(this.y_)throw new se(G.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,s,a){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([u,h])=>this.connection.Mo(e,sd(t,s),a,u,h)).catch(u=>{throw u.name==="FirebaseError"?(u.code===G.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),u):new se(G.UNKNOWN,u.toString())})}Lo(e,t,s,a,u){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([h,m])=>this.connection.Lo(e,sd(t,s),a,h,m,u)).catch(h=>{throw h.name==="FirebaseError"?(h.code===G.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),h):new se(G.UNKNOWN,h.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class qS{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Dr(t),this.D_=!1):ie("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class HS{constructor(e,t,s,a,u){this.localStore=e,this.datastore=t,this.asyncQueue=s,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=u,this.k_._o(h=>{s.enqueueAndForget(async()=>{za(this)&&(ie("RemoteStore","Restarting streams for network reachability change."),await async function(g){const v=Ne(g);v.L_.add(4),await ja(v),v.q_.set("Unknown"),v.L_.delete(4),await Wu(v)}(this))})}),this.q_=new qS(s,a)}}async function Wu(i){if(za(i))for(const e of i.B_)await e(!0)}async function ja(i){for(const e of i.B_)await e(!1)}function R_(i,e){const t=Ne(i);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),qd(t)?$d(t):Ro(t).r_()&&Bd(t,e))}function zd(i,e){const t=Ne(i),s=Ro(t);t.N_.delete(e),s.r_()&&k_(t,e),t.N_.size===0&&(s.r_()?s.o_():za(t)&&t.q_.set("Unknown"))}function Bd(i,e){if(i.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(_e.min())>0){const t=i.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Ro(i).A_(e)}function k_(i,e){i.Q_.xe(e),Ro(i).R_(e)}function $d(i){i.Q_=new JI({getRemoteKeysForTarget:e=>i.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>i.N_.get(e)||null,tt:()=>i.datastore.serializer.databaseId}),Ro(i).start(),i.q_.v_()}function qd(i){return za(i)&&!Ro(i).n_()&&i.N_.size>0}function za(i){return Ne(i).L_.size===0}function C_(i){i.Q_=void 0}async function WS(i){i.q_.set("Online")}async function KS(i){i.N_.forEach((e,t)=>{Bd(i,e)})}async function GS(i,e){C_(i),qd(i)?(i.q_.M_(e),$d(i)):i.q_.set("Unknown")}async function QS(i,e,t){if(i.q_.set("Online"),e instanceof p_&&e.state===2&&e.cause)try{await async function(a,u){const h=u.cause;for(const m of u.targetIds)a.N_.has(m)&&(await a.remoteSyncer.rejectListen(m,h),a.N_.delete(m),a.Q_.removeTarget(m))}(i,e)}catch(s){ie("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),s),await vg(i,s)}else if(e instanceof mu?i.Q_.Ke(e):e instanceof f_?i.Q_.He(e):i.Q_.We(e),!t.isEqual(_e.min()))try{const s=await S_(i.localStore);t.compareTo(s)>=0&&await function(u,h){const m=u.Q_.rt(h);return m.targetChanges.forEach((g,v)=>{if(g.resumeToken.approximateByteSize()>0){const w=u.N_.get(v);w&&u.N_.set(v,w.withResumeToken(g.resumeToken,h))}}),m.targetMismatches.forEach((g,v)=>{const w=u.N_.get(g);if(!w)return;u.N_.set(g,w.withResumeToken(Pt.EMPTY_BYTE_STRING,w.snapshotVersion)),k_(u,g);const N=new hi(w.target,g,v,w.sequenceNumber);Bd(u,N)}),u.remoteSyncer.applyRemoteEvent(m)}(i,t)}catch(s){ie("RemoteStore","Failed to raise snapshot:",s),await vg(i,s)}}async function vg(i,e,t){if(!Ma(e))throw e;i.L_.add(1),await ja(i),i.q_.set("Offline"),t||(t=()=>S_(i.localStore)),i.asyncQueue.enqueueRetryable(async()=>{ie("RemoteStore","Retrying IndexedDB access"),await t(),i.L_.delete(1),await Wu(i)})}async function Eg(i,e){const t=Ne(i);t.asyncQueue.verifyOperationInProgress(),ie("RemoteStore","RemoteStore received new credentials");const s=za(t);t.L_.add(3),await ja(t),s&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Wu(t)}async function YS(i,e){const t=Ne(i);e?(t.L_.delete(2),await Wu(t)):e||(t.L_.add(2),await ja(t),t.q_.set("Unknown"))}function Ro(i){return i.K_||(i.K_=function(t,s,a){const u=Ne(t);return u.w_(),new BS(s,u.connection,u.authCredentials,u.appCheckCredentials,u.serializer,a)}(i.datastore,i.asyncQueue,{Eo:WS.bind(null,i),Ro:KS.bind(null,i),mo:GS.bind(null,i),d_:QS.bind(null,i)}),i.B_.push(async e=>{e?(i.K_.s_(),qd(i)?$d(i):i.q_.set("Unknown")):(await i.K_.stop(),C_(i))})),i.K_}/**
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
 */class Hd{constructor(e,t,s,a,u){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=s,this.op=a,this.removalCallback=u,this.deferred=new fo,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(h=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,s,a,u){const h=Date.now()+s,m=new Hd(e,t,h,a,u);return m.start(s),m}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new se(G.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function P_(i,e){if(Dr("AsyncQueue",`${e}: ${i}`),Ma(i))return new se(G.UNAVAILABLE,`${e}: ${i}`);throw i}/**
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
 */class mo{constructor(e){this.comparator=e?(t,s)=>e(t,s)||ue.comparator(t.key,s.key):(t,s)=>ue.comparator(t.key,s.key),this.keyedMap=ma(),this.sortedSet=new it(this.comparator)}static emptySet(e){return new mo(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,s)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof mo)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;t.hasNext();){const a=t.getNext().key,u=s.getNext().key;if(!a.isEqual(u))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const s=new mo;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=t,s}}/**
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
 */class wg{constructor(){this.W_=new it(ue.comparator)}track(e){const t=e.doc.key,s=this.W_.get(t);s?e.type!==0&&s.type===3?this.W_=this.W_.insert(t,e):e.type===3&&s.type!==1?this.W_=this.W_.insert(t,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.W_=this.W_.remove(t):e.type===1&&s.type===2?this.W_=this.W_.insert(t,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):Ee():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,s)=>{e.push(s)}),e}}class wo{constructor(e,t,s,a,u,h,m,g,v){this.query=e,this.docs=t,this.oldDocs=s,this.docChanges=a,this.mutatedKeys=u,this.fromCache=h,this.syncStateChanged=m,this.excludesMetadataChanges=g,this.hasCachedResults=v}static fromInitialDocuments(e,t,s,a,u){const h=[];return t.forEach(m=>{h.push({type:0,doc:m})}),new wo(e,t,mo.emptySet(t),h,s,a,!0,!1,u)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ju(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,s=e.docChanges;if(t.length!==s.length)return!1;for(let a=0;a<t.length;a++)if(t[a].type!==s[a].type||!t[a].doc.isEqual(s[a].doc))return!1;return!0}}/**
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
 */class XS{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class JS{constructor(){this.queries=Tg(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,s){const a=Ne(t),u=a.queries;a.queries=Tg(),u.forEach((h,m)=>{for(const g of m.j_)g.onError(s)})})(this,new se(G.ABORTED,"Firestore shutting down"))}}function Tg(){return new Ao(i=>n_(i),ju)}async function ZS(i,e){const t=Ne(i);let s=3;const a=e.query;let u=t.queries.get(a);u?!u.H_()&&e.J_()&&(s=2):(u=new XS,s=e.J_()?0:1);try{switch(s){case 0:u.z_=await t.onListen(a,!0);break;case 1:u.z_=await t.onListen(a,!1);break;case 2:await t.onFirstRemoteStoreListen(a)}}catch(h){const m=P_(h,`Initialization of query '${so(e.query)}' failed`);return void e.onError(m)}t.queries.set(a,u),u.j_.push(e),e.Z_(t.onlineState),u.z_&&e.X_(u.z_)&&Wd(t)}async function eA(i,e){const t=Ne(i),s=e.query;let a=3;const u=t.queries.get(s);if(u){const h=u.j_.indexOf(e);h>=0&&(u.j_.splice(h,1),u.j_.length===0?a=e.J_()?0:1:!u.H_()&&e.J_()&&(a=2))}switch(a){case 0:return t.queries.delete(s),t.onUnlisten(s,!0);case 1:return t.queries.delete(s),t.onUnlisten(s,!1);case 2:return t.onLastRemoteStoreUnlisten(s);default:return}}function tA(i,e){const t=Ne(i);let s=!1;for(const a of e){const u=a.query,h=t.queries.get(u);if(h){for(const m of h.j_)m.X_(a)&&(s=!0);h.z_=a}}s&&Wd(t)}function nA(i,e,t){const s=Ne(i),a=s.queries.get(e);if(a)for(const u of a.j_)u.onError(t);s.queries.delete(e)}function Wd(i){i.Y_.forEach(e=>{e.next()})}var ad,Ig;(Ig=ad||(ad={})).ea="default",Ig.Cache="cache";class rA{constructor(e,t,s){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=s||{}}X_(e){if(!this.options.includeMetadataChanges){const s=[];for(const a of e.docChanges)a.type!==3&&s.push(a);e=new wo(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const s=t!=="Offline";return(!this.options._a||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=wo.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==ad.Cache}}/**
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
 */class N_{constructor(e){this.key=e}}class D_{constructor(e){this.key=e}}class iA{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=Oe(),this.mutatedKeys=Oe(),this.Aa=r_(e),this.Ra=new mo(this.Aa)}get Va(){return this.Ta}ma(e,t){const s=t?t.fa:new wg,a=t?t.Ra:this.Ra;let u=t?t.mutatedKeys:this.mutatedKeys,h=a,m=!1;const g=this.query.limitType==="F"&&a.size===this.query.limit?a.last():null,v=this.query.limitType==="L"&&a.size===this.query.limit?a.first():null;if(e.inorderTraversal((w,N)=>{const b=a.get(w),j=zu(this.query,N)?N:null,Q=!!b&&this.mutatedKeys.has(b.key),X=!!j&&(j.hasLocalMutations||this.mutatedKeys.has(j.key)&&j.hasCommittedMutations);let B=!1;b&&j?b.data.isEqual(j.data)?Q!==X&&(s.track({type:3,doc:j}),B=!0):this.ga(b,j)||(s.track({type:2,doc:j}),B=!0,(g&&this.Aa(j,g)>0||v&&this.Aa(j,v)<0)&&(m=!0)):!b&&j?(s.track({type:0,doc:j}),B=!0):b&&!j&&(s.track({type:1,doc:b}),B=!0,(g||v)&&(m=!0)),B&&(j?(h=h.add(j),u=X?u.add(w):u.delete(w)):(h=h.delete(w),u=u.delete(w)))}),this.query.limit!==null)for(;h.size>this.query.limit;){const w=this.query.limitType==="F"?h.last():h.first();h=h.delete(w.key),u=u.delete(w.key),s.track({type:1,doc:w})}return{Ra:h,fa:s,ns:m,mutatedKeys:u}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,s,a){const u=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const h=e.fa.G_();h.sort((w,N)=>function(j,Q){const X=B=>{switch(B){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Ee()}};return X(j)-X(Q)}(w.type,N.type)||this.Aa(w.doc,N.doc)),this.pa(s),a=a!=null&&a;const m=t&&!a?this.ya():[],g=this.da.size===0&&this.current&&!a?1:0,v=g!==this.Ea;return this.Ea=g,h.length!==0||v?{snapshot:new wo(this.query,e.Ra,u,h,e.mutatedKeys,g===0,v,!1,!!s&&s.resumeToken.approximateByteSize()>0),wa:m}:{wa:m}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new wg,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=Oe(),this.Ra.forEach(s=>{this.Sa(s.key)&&(this.da=this.da.add(s.key))});const t=[];return e.forEach(s=>{this.da.has(s)||t.push(new D_(s))}),this.da.forEach(s=>{e.has(s)||t.push(new N_(s))}),t}ba(e){this.Ta=e.Ts,this.da=Oe();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return wo.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class sA{constructor(e,t,s){this.query=e,this.targetId=t,this.view=s}}class oA{constructor(e){this.key=e,this.va=!1}}class aA{constructor(e,t,s,a,u,h){this.localStore=e,this.remoteStore=t,this.eventManager=s,this.sharedClientState=a,this.currentUser=u,this.maxConcurrentLimboResolutions=h,this.Ca={},this.Fa=new Ao(m=>n_(m),ju),this.Ma=new Map,this.xa=new Set,this.Oa=new it(ue.comparator),this.Na=new Map,this.La=new Fd,this.Ba={},this.ka=new Map,this.qa=Eo.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function lA(i,e,t=!0){const s=M_(i);let a;const u=s.Fa.get(e);return u?(s.sharedClientState.addLocalQueryTarget(u.targetId),a=u.view.Da()):a=await O_(s,e,t,!0),a}async function uA(i,e){const t=M_(i);await O_(t,e,!0,!1)}async function O_(i,e,t,s){const a=await xS(i.localStore,rr(e)),u=a.targetId,h=i.sharedClientState.addLocalQueryTarget(u,t);let m;return s&&(m=await cA(i,e,u,h==="current",a.resumeToken)),i.isPrimaryClient&&t&&R_(i.remoteStore,a),m}async function cA(i,e,t,s,a){i.Ka=(N,b,j)=>async function(X,B,ye,Ie){let me=B.view.ma(ye);me.ns&&(me=await gg(X.localStore,B.query,!1).then(({documents:P})=>B.view.ma(P,me)));const fe=Ie&&Ie.targetChanges.get(B.targetId),Me=Ie&&Ie.targetMismatches.get(B.targetId)!=null,ve=B.view.applyChanges(me,X.isPrimaryClient,fe,Me);return Ag(X,B.targetId,ve.wa),ve.snapshot}(i,N,b,j);const u=await gg(i.localStore,e,!0),h=new iA(e,u.Ts),m=h.ma(u.documents),g=Ua.createSynthesizedTargetChangeForCurrentChange(t,s&&i.onlineState!=="Offline",a),v=h.applyChanges(m,i.isPrimaryClient,g);Ag(i,t,v.wa);const w=new sA(e,t,h);return i.Fa.set(e,w),i.Ma.has(t)?i.Ma.get(t).push(e):i.Ma.set(t,[e]),v.snapshot}async function hA(i,e,t){const s=Ne(i),a=s.Fa.get(e),u=s.Ma.get(a.targetId);if(u.length>1)return s.Ma.set(a.targetId,u.filter(h=>!ju(h,e))),void s.Fa.delete(e);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(a.targetId),s.sharedClientState.isActiveQueryTarget(a.targetId)||await od(s.localStore,a.targetId,!1).then(()=>{s.sharedClientState.clearQueryState(a.targetId),t&&zd(s.remoteStore,a.targetId),ld(s,a.targetId)}).catch(Rd)):(ld(s,a.targetId),await od(s.localStore,a.targetId,!0))}async function dA(i,e){const t=Ne(i),s=t.Fa.get(e),a=t.Ma.get(s.targetId);t.isPrimaryClient&&a.length===1&&(t.sharedClientState.removeLocalQueryTarget(s.targetId),zd(t.remoteStore,s.targetId))}async function V_(i,e){const t=Ne(i);try{const s=await OS(t.localStore,e);e.targetChanges.forEach((a,u)=>{const h=t.Na.get(u);h&&(tt(a.addedDocuments.size+a.modifiedDocuments.size+a.removedDocuments.size<=1),a.addedDocuments.size>0?h.va=!0:a.modifiedDocuments.size>0?tt(h.va):a.removedDocuments.size>0&&(tt(h.va),h.va=!1))}),await L_(t,s,e)}catch(s){await Rd(s)}}function Sg(i,e,t){const s=Ne(i);if(s.isPrimaryClient&&t===0||!s.isPrimaryClient&&t===1){const a=[];s.Fa.forEach((u,h)=>{const m=h.view.Z_(e);m.snapshot&&a.push(m.snapshot)}),function(h,m){const g=Ne(h);g.onlineState=m;let v=!1;g.queries.forEach((w,N)=>{for(const b of N.j_)b.Z_(m)&&(v=!0)}),v&&Wd(g)}(s.eventManager,e),a.length&&s.Ca.d_(a),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function fA(i,e,t){const s=Ne(i);s.sharedClientState.updateQueryState(e,"rejected",t);const a=s.Na.get(e),u=a&&a.key;if(u){let h=new it(ue.comparator);h=h.insert(u,Mt.newNoDocument(u,_e.min()));const m=Oe().add(u),g=new qu(_e.min(),new Map,new it(be),h,m);await V_(s,g),s.Oa=s.Oa.remove(u),s.Na.delete(e),Kd(s)}else await od(s.localStore,e,!1).then(()=>ld(s,e,t)).catch(Rd)}function ld(i,e,t=null){i.sharedClientState.removeLocalQueryTarget(e);for(const s of i.Ma.get(e))i.Fa.delete(s),t&&i.Ca.$a(s,t);i.Ma.delete(e),i.isPrimaryClient&&i.La.gr(e).forEach(s=>{i.La.containsKey(s)||x_(i,s)})}function x_(i,e){i.xa.delete(e.path.canonicalString());const t=i.Oa.get(e);t!==null&&(zd(i.remoteStore,t),i.Oa=i.Oa.remove(e),i.Na.delete(t),Kd(i))}function Ag(i,e,t){for(const s of t)s instanceof N_?(i.La.addReference(s.key,e),pA(i,s)):s instanceof D_?(ie("SyncEngine","Document no longer in limbo: "+s.key),i.La.removeReference(s.key,e),i.La.containsKey(s.key)||x_(i,s.key)):Ee()}function pA(i,e){const t=e.key,s=t.path.canonicalString();i.Oa.get(t)||i.xa.has(s)||(ie("SyncEngine","New document in limbo: "+t),i.xa.add(s),Kd(i))}function Kd(i){for(;i.xa.size>0&&i.Oa.size<i.maxConcurrentLimboResolutions;){const e=i.xa.values().next().value;i.xa.delete(e);const t=new ue(Ke.fromString(e)),s=i.qa.next();i.Na.set(s,new oA(t)),i.Oa=i.Oa.insert(t,s),R_(i.remoteStore,new hi(rr(Vd(t.path)),s,"TargetPurposeLimboResolution",kd.oe))}}async function L_(i,e,t){const s=Ne(i),a=[],u=[],h=[];s.Fa.isEmpty()||(s.Fa.forEach((m,g)=>{h.push(s.Ka(g,e,t).then(v=>{var w;if((v||t)&&s.isPrimaryClient){const N=v?!v.fromCache:(w=t?.targetChanges.get(g.targetId))===null||w===void 0?void 0:w.current;s.sharedClientState.updateQueryState(g.targetId,N?"current":"not-current")}if(v){a.push(v);const N=jd.Wi(g.targetId,v);u.push(N)}}))}),await Promise.all(h),s.Ca.d_(a),await async function(g,v){const w=Ne(g);try{await w.persistence.runTransaction("notifyLocalViewChanges","readwrite",N=>H.forEach(v,b=>H.forEach(b.$i,j=>w.persistence.referenceDelegate.addReference(N,b.targetId,j)).next(()=>H.forEach(b.Ui,j=>w.persistence.referenceDelegate.removeReference(N,b.targetId,j)))))}catch(N){if(!Ma(N))throw N;ie("LocalStore","Failed to update sequence numbers: "+N)}for(const N of v){const b=N.targetId;if(!N.fromCache){const j=w.os.get(b),Q=j.snapshotVersion,X=j.withLastLimboFreeSnapshotVersion(Q);w.os=w.os.insert(b,X)}}}(s.localStore,u))}async function mA(i,e){const t=Ne(i);if(!t.currentUser.isEqual(e)){ie("SyncEngine","User change. New user:",e.toKey());const s=await I_(t.localStore,e);t.currentUser=e,function(u,h){u.ka.forEach(m=>{m.forEach(g=>{g.reject(new se(G.CANCELLED,h))})}),u.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await L_(t,s.hs)}}function gA(i,e){const t=Ne(i),s=t.Na.get(e);if(s&&s.va)return Oe().add(s.key);{let a=Oe();const u=t.Ma.get(e);if(!u)return a;for(const h of u){const m=t.Fa.get(h);a=a.unionWith(m.view.Va)}return a}}function M_(i){const e=Ne(i);return e.remoteStore.remoteSyncer.applyRemoteEvent=V_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=gA.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=fA.bind(null,e),e.Ca.d_=tA.bind(null,e.eventManager),e.Ca.$a=nA.bind(null,e.eventManager),e}class Du{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Hu(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return DS(this.persistence,new PS,e.initialUser,this.serializer)}Ga(e){return new RS(Ud.Zr,this.serializer)}Wa(e){return new MS}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Du.provider={build:()=>new Du};class ud{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>Sg(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=mA.bind(null,this.syncEngine),await YS(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new JS}()}createDatastore(e){const t=Hu(e.databaseInfo.databaseId),s=function(u){return new jS(u)}(e.databaseInfo);return function(u,h,m,g){return new $S(u,h,m,g)}(e.authCredentials,e.appCheckCredentials,s,t)}createRemoteStore(e){return function(s,a,u,h,m){return new HS(s,a,u,h,m)}(this.localStore,this.datastore,e.asyncQueue,t=>Sg(this.syncEngine,t,0),function(){return _g.D()?new _g:new bS}())}createSyncEngine(e,t){return function(a,u,h,m,g,v,w){const N=new aA(a,u,h,m,g,v);return w&&(N.Qa=!0),N}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(a){const u=Ne(a);ie("RemoteStore","RemoteStore shutting down."),u.L_.add(5),await ja(u),u.k_.shutdown(),u.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}ud.provider={build:()=>new ud};/**
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
 */class yA{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Dr("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */class _A{constructor(e,t,s,a,u){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=s,this.databaseInfo=a,this.user=Lt.UNAUTHENTICATED,this.clientId=Wy.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=u,this.authCredentials.start(s,async h=>{ie("FirestoreClient","Received user=",h.uid),await this.authCredentialListener(h),this.user=h}),this.appCheckCredentials.start(s,h=>(ie("FirestoreClient","Received new app check token=",h),this.appCheckCredentialListener(h,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new fo;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const s=P_(t,"Failed to shutdown persistence");e.reject(s)}}),e.promise}}async function bh(i,e){i.asyncQueue.verifyOperationInProgress(),ie("FirestoreClient","Initializing OfflineComponentProvider");const t=i.configuration;await e.initialize(t);let s=t.initialUser;i.setCredentialChangeListener(async a=>{s.isEqual(a)||(await I_(e.localStore,a),s=a)}),e.persistence.setDatabaseDeletedListener(()=>i.terminate()),i._offlineComponents=e}async function Rg(i,e){i.asyncQueue.verifyOperationInProgress();const t=await vA(i);ie("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,i.configuration),i.setCredentialChangeListener(s=>Eg(e.remoteStore,s)),i.setAppCheckTokenChangeListener((s,a)=>Eg(e.remoteStore,a)),i._onlineComponents=e}async function vA(i){if(!i._offlineComponents)if(i._uninitializedComponentsProvider){ie("FirestoreClient","Using user provided OfflineComponentProvider");try{await bh(i,i._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(a){return a.name==="FirebaseError"?a.code===G.FAILED_PRECONDITION||a.code===G.UNIMPLEMENTED:!(typeof DOMException<"u"&&a instanceof DOMException)||a.code===22||a.code===20||a.code===11}(t))throw t;go("Error using user provided cache. Falling back to memory cache: "+t),await bh(i,new Du)}}else ie("FirestoreClient","Using default OfflineComponentProvider"),await bh(i,new Du);return i._offlineComponents}async function EA(i){return i._onlineComponents||(i._uninitializedComponentsProvider?(ie("FirestoreClient","Using user provided OnlineComponentProvider"),await Rg(i,i._uninitializedComponentsProvider._online)):(ie("FirestoreClient","Using default OnlineComponentProvider"),await Rg(i,new ud))),i._onlineComponents}async function kg(i){const e=await EA(i),t=e.eventManager;return t.onListen=lA.bind(null,e.syncEngine),t.onUnlisten=hA.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=uA.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=dA.bind(null,e.syncEngine),t}/**
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
 */function b_(i){const e={};return i.timeoutSeconds!==void 0&&(e.timeoutSeconds=i.timeoutSeconds),e}/**
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
 */const Cg=new Map;/**
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
 */function F_(i,e,t){if(!t)throw new se(G.INVALID_ARGUMENT,`Function ${i}() cannot be called with an empty ${e}.`)}function wA(i,e,t,s){if(e===!0&&s===!0)throw new se(G.INVALID_ARGUMENT,`${i} and ${t} cannot be used together.`)}function Pg(i){if(!ue.isDocumentKey(i))throw new se(G.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${i} has ${i.length}.`)}function Ng(i){if(ue.isDocumentKey(i))throw new se(G.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${i} has ${i.length}.`)}function Ku(i){if(i===void 0)return"undefined";if(i===null)return"null";if(typeof i=="string")return i.length>20&&(i=`${i.substring(0,20)}...`),JSON.stringify(i);if(typeof i=="number"||typeof i=="boolean")return""+i;if(typeof i=="object"){if(i instanceof Array)return"an array";{const e=function(s){return s.constructor?s.constructor.name:null}(i);return e?`a custom ${e} object`:"an object"}}return typeof i=="function"?"a function":Ee()}function gu(i,e){if("_delegate"in i&&(i=i._delegate),!(i instanceof e)){if(e.name===i.constructor.name)throw new se(G.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Ku(i);throw new se(G.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return i}/**
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
 */class Dg{constructor(e){var t,s;if(e.host===void 0){if(e.ssl!==void 0)throw new se(G.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new se(G.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}wA("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=b_((s=e.experimentalLongPollingOptions)!==null&&s!==void 0?s:{}),function(u){if(u.timeoutSeconds!==void 0){if(isNaN(u.timeoutSeconds))throw new se(G.INVALID_ARGUMENT,`invalid long polling timeout: ${u.timeoutSeconds} (must not be NaN)`);if(u.timeoutSeconds<5)throw new se(G.INVALID_ARGUMENT,`invalid long polling timeout: ${u.timeoutSeconds} (minimum allowed value is 5)`);if(u.timeoutSeconds>30)throw new se(G.INVALID_ARGUMENT,`invalid long polling timeout: ${u.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,a){return s.timeoutSeconds===a.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Gu{constructor(e,t,s,a){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=s,this._app=a,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Dg({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new se(G.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new se(G.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Dg(e),e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new tI;switch(s.type){case"firstParty":return new sI(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new se(G.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const s=Cg.get(t);s&&(ie("ComponentProvider","Removing Datastore"),Cg.delete(t),s.terminate())}(this),Promise.resolve()}}function TA(i,e,t,s={}){var a;const u=(i=gu(i,Gu))._getSettings(),h=`${e}:${t}`;if(u.host!=="firestore.googleapis.com"&&u.host!==h&&go("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),i._setSettings(Object.assign(Object.assign({},u),{host:h,ssl:!1})),s.mockUserToken){let m,g;if(typeof s.mockUserToken=="string")m=s.mockUserToken,g=Lt.MOCK_USER;else{m=Jg(s.mockUserToken,(a=i._app)===null||a===void 0?void 0:a.options.projectId);const v=s.mockUserToken.sub||s.mockUserToken.user_id;if(!v)throw new se(G.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");g=new Lt(v)}i._authCredentials=new nI(new Hy(m,g))}}/**
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
 */class ko{constructor(e,t,s){this.converter=t,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new ko(this.firestore,e,this._query)}}class ln{constructor(e,t,s){this.converter=t,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new pi(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ln(this.firestore,e,this._key)}}class pi extends ko{constructor(e,t,s){super(e,t,Vd(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ln(this.firestore,null,new ue(e))}withConverter(e){return new pi(this.firestore,e,this._path)}}function IA(i,e,...t){if(i=Jt(i),F_("collection","path",e),i instanceof Gu){const s=Ke.fromString(e,...t);return Ng(s),new pi(i,null,s)}{if(!(i instanceof ln||i instanceof pi))throw new se(G.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=i._path.child(Ke.fromString(e,...t));return Ng(s),new pi(i.firestore,null,s)}}function SA(i,e,...t){if(i=Jt(i),arguments.length===1&&(e=Wy.newId()),F_("doc","path",e),i instanceof Gu){const s=Ke.fromString(e,...t);return Pg(s),new ln(i,null,new ue(s))}{if(!(i instanceof ln||i instanceof pi))throw new se(G.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=i._path.child(Ke.fromString(e,...t));return Pg(s),new ln(i.firestore,i instanceof pi?i.converter:null,new ue(s))}}/**
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
 */class Og{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new A_(this,"async_queue_retry"),this.Vu=()=>{const s=Mh();s&&ie("AsyncQueue","Visibility state changed to "+s.visibilityState),this.t_.jo()},this.mu=e;const t=Mh();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=Mh();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new fo;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Ma(e))throw e;ie("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(s=>{this.Eu=s,this.du=!1;const a=function(h){let m=h.message||"";return h.stack&&(m=h.stack.includes(h.message)?h.stack:h.message+`
`+h.stack),m}(s);throw Dr("INTERNAL UNHANDLED ERROR: ",a),s}).then(s=>(this.du=!1,s))));return this.mu=t,t}enqueueAfterDelay(e,t,s){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const a=Hd.createAndSchedule(this,e,t,s,u=>this.yu(u));return this.Tu.push(a),a}fu(){this.Eu&&Ee()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,s)=>t.targetTimeMs-s.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function Vg(i){return function(t,s){if(typeof t!="object"||t===null)return!1;const a=t;for(const u of s)if(u in a&&typeof a[u]=="function")return!0;return!1}(i,["next","error","complete"])}class cd extends Gu{constructor(e,t,s,a){super(e,t,s,a),this.type="firestore",this._queue=new Og,this._persistenceKey=a?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Og(e),this._firestoreClient=void 0,await e}}}function AA(i,e){const t=typeof i=="object"?i:md(),s=typeof i=="string"?i:"(default)",a=Lu(t,"firestore").getImmediate({identifier:s});if(!a._initialized){const u=Qg("firestore");u&&TA(a,...u)}return a}function RA(i){if(i._terminated)throw new se(G.FAILED_PRECONDITION,"The client has already been terminated.");return i._firestoreClient||kA(i),i._firestoreClient}function kA(i){var e,t,s;const a=i._freezeSettings(),u=function(m,g,v,w){return new _I(m,g,v,w.host,w.ssl,w.experimentalForceLongPolling,w.experimentalAutoDetectLongPolling,b_(w.experimentalLongPollingOptions),w.useFetchStreams)}(i._databaseId,((e=i._app)===null||e===void 0?void 0:e.options.appId)||"",i._persistenceKey,a);i._componentsProvider||!((t=a.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((s=a.localCache)===null||s===void 0)&&s._onlineComponentProvider)&&(i._componentsProvider={_offline:a.localCache._offlineComponentProvider,_online:a.localCache._onlineComponentProvider}),i._firestoreClient=new _A(i._authCredentials,i._appCheckCredentials,i._queue,u,i._componentsProvider&&function(m){const g=m?._online.build();return{_offline:m?._offline.build(g),_online:g}}(i._componentsProvider))}/**
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
 */class To{constructor(e){this._byteString=e}static fromBase64String(e){try{return new To(Pt.fromBase64String(e))}catch(t){throw new se(G.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new To(Pt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class U_{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new se(G.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new bt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class j_{constructor(e){this._methodName=e}}/**
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
 */class Gd{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new se(G.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new se(G.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return be(this._lat,e._lat)||be(this._long,e._long)}}/**
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
 */class Qd{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(s,a){if(s.length!==a.length)return!1;for(let u=0;u<s.length;++u)if(s[u]!==a[u])return!1;return!0}(this._values,e._values)}}/**
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
 */const CA=/^__.*__$/;function z_(i){switch(i){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Ee()}}class Yd{constructor(e,t,s,a,u,h){this.settings=e,this.databaseId=t,this.serializer=s,this.ignoreUndefinedProperties=a,u===void 0&&this.vu(),this.fieldTransforms=u||[],this.fieldMask=h||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Yd(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const s=(t=this.path)===null||t===void 0?void 0:t.child(e),a=this.Fu({path:s,xu:!1});return a.Ou(e),a}Nu(e){var t;const s=(t=this.path)===null||t===void 0?void 0:t.child(e),a=this.Fu({path:s,xu:!1});return a.vu(),a}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return hd(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(z_(this.Cu)&&CA.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class PA{constructor(e,t,s){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=s||Hu(e)}Qu(e,t,s,a=!1){return new Yd({Cu:e,methodName:t,qu:s,path:bt.emptyPath(),xu:!1,ku:a},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function NA(i){const e=i._freezeSettings(),t=Hu(i._databaseId);return new PA(i._databaseId,!!e.ignoreUndefinedProperties,t)}function DA(i,e,t,s=!1){return Xd(t,i.Qu(s?4:3,e))}function Xd(i,e){if(B_(i=Jt(i)))return VA("Unsupported field value:",e,i),OA(i,e);if(i instanceof j_)return function(s,a){if(!z_(a.Cu))throw a.Bu(`${s._methodName}() can only be used with update() and set()`);if(!a.path)throw a.Bu(`${s._methodName}() is not currently supported inside arrays`);const u=s._toFieldTransform(a);u&&a.fieldTransforms.push(u)}(i,e),null;if(i===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),i instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(s,a){const u=[];let h=0;for(const m of s){let g=Xd(m,a.Lu(h));g==null&&(g={nullValue:"NULL_VALUE"}),u.push(g),h++}return{arrayValue:{values:u}}}(i,e)}return function(s,a){if((s=Jt(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return jI(a.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const u=wt.fromDate(s);return{timestampValue:id(a.serializer,u)}}if(s instanceof wt){const u=new wt(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:id(a.serializer,u)}}if(s instanceof Gd)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof To)return{bytesValue:m_(a.serializer,s._byteString)};if(s instanceof ln){const u=a.databaseId,h=s.firestore._databaseId;if(!h.isEqual(u))throw a.Bu(`Document reference is for database ${h.projectId}/${h.database} but should be for database ${u.projectId}/${u.database}`);return{referenceValue:g_(s.firestore._databaseId||a.databaseId,s._key.path)}}if(s instanceof Qd)return function(h,m){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:h.toArray().map(g=>{if(typeof g!="number")throw m.Bu("VectorValues must only contain numeric values.");return xd(m.serializer,g)})}}}}}}(s,a);throw a.Bu(`Unsupported field value: ${Ku(s)}`)}(i,e)}function OA(i,e){const t={};return Ky(i)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):ba(i,(s,a)=>{const u=Xd(a,e.Mu(s));u!=null&&(t[s]=u)}),{mapValue:{fields:t}}}function B_(i){return!(typeof i!="object"||i===null||i instanceof Array||i instanceof Date||i instanceof wt||i instanceof Gd||i instanceof To||i instanceof ln||i instanceof j_||i instanceof Qd)}function VA(i,e,t){if(!B_(t)||!function(a){return typeof a=="object"&&a!==null&&(Object.getPrototypeOf(a)===Object.prototype||Object.getPrototypeOf(a)===null)}(t)){const s=Ku(t);throw s==="an object"?e.Bu(i+" a custom object"):e.Bu(i+" "+s)}}const xA=new RegExp("[~\\*/\\[\\]]");function LA(i,e,t){if(e.search(xA)>=0)throw hd(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,i,!1,void 0,t);try{return new U_(...e.split("."))._internalPath}catch{throw hd(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,i,!1,void 0,t)}}function hd(i,e,t,s,a){const u=s&&!s.isEmpty(),h=a!==void 0;let m=`Function ${e}() called with invalid data`;t&&(m+=" (via `toFirestore()`)"),m+=". ";let g="";return(u||h)&&(g+=" (found",u&&(g+=` in field ${s}`),h&&(g+=` in document ${a}`),g+=")"),new se(G.INVALID_ARGUMENT,m+i+g)}/**
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
 */class $_{constructor(e,t,s,a,u){this._firestore=e,this._userDataWriter=t,this._key=s,this._document=a,this._converter=u}get id(){return this._key.path.lastSegment()}get ref(){return new ln(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new MA(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(q_("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class MA extends $_{data(){return super.data()}}function q_(i,e){return typeof e=="string"?LA(i,e):e instanceof U_?e._internalPath:e._delegate._internalPath}/**
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
 */function bA(i){if(i.limitType==="L"&&i.explicitOrderBy.length===0)throw new se(G.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Jd{}class FA extends Jd{}function UA(i,e,...t){let s=[];e instanceof Jd&&s.push(e),s=s.concat(t),function(u){const h=u.filter(g=>g instanceof ef).length,m=u.filter(g=>g instanceof Zd).length;if(h>1||h>0&&m>0)throw new se(G.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(s);for(const a of s)i=a._apply(i);return i}class Zd extends FA{constructor(e,t,s){super(),this._field=e,this._op=t,this._value=s,this.type="where"}static _create(e,t,s){return new Zd(e,t,s)}_apply(e){const t=this._parse(e);return H_(e._query,t),new ko(e.firestore,e.converter,Zh(e._query,t))}_parse(e){const t=NA(e.firestore);return function(u,h,m,g,v,w,N){let b;if(v.isKeyField()){if(w==="array-contains"||w==="array-contains-any")throw new se(G.INVALID_ARGUMENT,`Invalid Query. You can't perform '${w}' queries on documentId().`);if(w==="in"||w==="not-in"){Lg(N,w);const j=[];for(const Q of N)j.push(xg(g,u,Q));b={arrayValue:{values:j}}}else b=xg(g,u,N)}else w!=="in"&&w!=="not-in"&&w!=="array-contains-any"||Lg(N,w),b=DA(m,h,N,w==="in"||w==="not-in");return ct.create(v,w,b)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class ef extends Jd{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new ef(e,t)}_parse(e){const t=this._queryConstraints.map(s=>s._parse(e)).filter(s=>s.getFilters().length>0);return t.length===1?t[0]:Fn.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(a,u){let h=a;const m=u.getFlattenedFilters();for(const g of m)H_(h,g),h=Zh(h,g)}(e._query,t),new ko(e.firestore,e.converter,Zh(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function xg(i,e,t){if(typeof(t=Jt(t))=="string"){if(t==="")throw new se(G.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!t_(e)&&t.indexOf("/")!==-1)throw new se(G.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const s=e.path.child(Ke.fromString(t));if(!ue.isDocumentKey(s))throw new se(G.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);return Zm(i,new ue(s))}if(t instanceof ln)return Zm(i,t._key);throw new se(G.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ku(t)}.`)}function Lg(i,e){if(!Array.isArray(i)||i.length===0)throw new se(G.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function H_(i,e){const t=function(a,u){for(const h of a)for(const m of h.getFlattenedFilters())if(u.indexOf(m.op)>=0)return m.op;return null}(i.filters,function(a){switch(a){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new se(G.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new se(G.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class jA{convertValue(e,t="none"){switch(ls(e)){case 0:return null;case 1:return e.booleanValue;case 2:return rt(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(as(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw Ee()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const s={};return ba(e,(a,u)=>{s[a]=this.convertValue(u,t)}),s}convertVectorValue(e){var t,s,a;const u=(a=(s=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||s===void 0?void 0:s.values)===null||a===void 0?void 0:a.map(h=>rt(h.doubleValue));return new Qd(u)}convertGeoPoint(e){return new Gd(rt(e.latitude),rt(e.longitude))}convertArray(e,t){return(e.values||[]).map(s=>this.convertValue(s,t))}convertServerTimestamp(e,t){switch(t){case"previous":const s=Pd(e);return s==null?null:this.convertValue(s,t);case"estimate":return this.convertTimestamp(ka(e));default:return null}}convertTimestamp(e){const t=yi(e);return new wt(t.seconds,t.nanos)}convertDocumentKey(e,t){const s=Ke.fromString(e);tt(T_(s));const a=new Ca(s.get(1),s.get(3)),u=new ue(s.popFirst(5));return a.isEqual(t)||Dr(`Document ${u} contains a document reference within a different database (${a.projectId}/${a.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),u}}/**
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
 */class ya{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class W_ extends $_{constructor(e,t,s,a,u,h){super(e,t,s,a,h),this._firestore=e,this._firestoreImpl=e,this.metadata=u}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new yu(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const s=this._document.data.field(q_("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,t.serverTimestamps)}}}class yu extends W_{data(e={}){return super.data(e)}}class zA{constructor(e,t,s,a){this._firestore=e,this._userDataWriter=t,this._snapshot=a,this.metadata=new ya(a.hasPendingWrites,a.fromCache),this.query=s}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(s=>{e.call(t,new yu(this._firestore,this._userDataWriter,s.key,s,new ya(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new se(G.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(a,u){if(a._snapshot.oldDocs.isEmpty()){let h=0;return a._snapshot.docChanges.map(m=>{const g=new yu(a._firestore,a._userDataWriter,m.doc.key,m.doc,new ya(a._snapshot.mutatedKeys.has(m.doc.key),a._snapshot.fromCache),a.query.converter);return m.doc,{type:"added",doc:g,oldIndex:-1,newIndex:h++}})}{let h=a._snapshot.oldDocs;return a._snapshot.docChanges.filter(m=>u||m.type!==3).map(m=>{const g=new yu(a._firestore,a._userDataWriter,m.doc.key,m.doc,new ya(a._snapshot.mutatedKeys.has(m.doc.key),a._snapshot.fromCache),a.query.converter);let v=-1,w=-1;return m.type!==0&&(v=h.indexOf(m.doc.key),h=h.delete(m.doc.key)),m.type!==1&&(h=h.add(m.doc),w=h.indexOf(m.doc.key)),{type:BA(m.type),doc:g,oldIndex:v,newIndex:w}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function BA(i){switch(i){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Ee()}}class K_ extends jA{constructor(e){super(),this.firestore=e}convertBytes(e){return new To(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ln(this.firestore,null,t)}}function Mg(i,...e){var t,s,a;i=Jt(i);let u={includeMetadataChanges:!1,source:"default"},h=0;typeof e[h]!="object"||Vg(e[h])||(u=e[h],h++);const m={includeMetadataChanges:u.includeMetadataChanges,source:u.source};if(Vg(e[h])){const N=e[h];e[h]=(t=N.next)===null||t===void 0?void 0:t.bind(N),e[h+1]=(s=N.error)===null||s===void 0?void 0:s.bind(N),e[h+2]=(a=N.complete)===null||a===void 0?void 0:a.bind(N)}let g,v,w;if(i instanceof ln)v=gu(i.firestore,cd),w=Vd(i._key.path),g={next:N=>{e[h]&&e[h]($A(v,i,N))},error:e[h+1],complete:e[h+2]};else{const N=gu(i,ko);v=gu(N.firestore,cd),w=N._query;const b=new K_(v);g={next:j=>{e[h]&&e[h](new zA(v,b,N,j))},error:e[h+1],complete:e[h+2]},bA(i._query)}return function(b,j,Q,X){const B=new yA(X),ye=new rA(j,B,Q);return b.asyncQueue.enqueueAndForget(async()=>ZS(await kg(b),ye)),()=>{B.Za(),b.asyncQueue.enqueueAndForget(async()=>eA(await kg(b),ye))}}(RA(v),w,m,g)}function $A(i,e,t){const s=t.docs.get(e._key),a=new K_(i);return new W_(i,a,e._key,s,new ya(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(a){So=a})(us),rs(new mi("firestore",(s,{instanceIdentifier:a,options:u})=>{const h=s.getProvider("app").getImmediate(),m=new cd(new rI(s.getProvider("auth-internal")),new aI(s.getProvider("app-check-internal")),function(v,w){if(!Object.prototype.hasOwnProperty.apply(v.options,["projectId"]))throw new se(G.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ca(v.options.projectId,w)}(h,a),h);return u=Object.assign({useFetchStreams:t},u),m._setSettings(u),m},"PUBLIC").setMultipleInstances(!0)),er(Gm,"4.7.3",e),er(Gm,"4.7.3","esm2017")})();/**
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
 */const G_="firebasestorage.googleapis.com",qA="storageBucket",HA=2*60*1e3,WA=10*60*1e3;/**
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
 */class ar extends or{constructor(e,t,s=0){super(Fh(e),`Firebase Storage: ${t} (${Fh(e)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,ar.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Fh(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var sr;(function(i){i.UNKNOWN="unknown",i.OBJECT_NOT_FOUND="object-not-found",i.BUCKET_NOT_FOUND="bucket-not-found",i.PROJECT_NOT_FOUND="project-not-found",i.QUOTA_EXCEEDED="quota-exceeded",i.UNAUTHENTICATED="unauthenticated",i.UNAUTHORIZED="unauthorized",i.UNAUTHORIZED_APP="unauthorized-app",i.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",i.INVALID_CHECKSUM="invalid-checksum",i.CANCELED="canceled",i.INVALID_EVENT_NAME="invalid-event-name",i.INVALID_URL="invalid-url",i.INVALID_DEFAULT_BUCKET="invalid-default-bucket",i.NO_DEFAULT_BUCKET="no-default-bucket",i.CANNOT_SLICE_BLOB="cannot-slice-blob",i.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",i.NO_DOWNLOAD_URL="no-download-url",i.INVALID_ARGUMENT="invalid-argument",i.INVALID_ARGUMENT_COUNT="invalid-argument-count",i.APP_DELETED="app-deleted",i.INVALID_ROOT_OPERATION="invalid-root-operation",i.INVALID_FORMAT="invalid-format",i.INTERNAL_ERROR="internal-error",i.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(sr||(sr={}));function Fh(i){return"storage/"+i}function KA(){const i="An unknown error occurred, please check the error payload for server response.";return new ar(sr.UNKNOWN,i)}function GA(){return new ar(sr.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function QA(){return new ar(sr.CANCELED,"User canceled the upload/download.")}function YA(i){return new ar(sr.INVALID_URL,"Invalid URL '"+i+"'.")}function XA(i){return new ar(sr.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+i+"'.")}function bg(i){return new ar(sr.INVALID_ARGUMENT,i)}function Q_(){return new ar(sr.APP_DELETED,"The Firebase app was deleted.")}function JA(i){return new ar(sr.INVALID_ROOT_OPERATION,"The operation '"+i+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
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
 */class Mn{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let s;try{s=Mn.makeFromUrl(e,t)}catch{return new Mn(e,"")}if(s.path==="")return s;throw XA(e)}static makeFromUrl(e,t){let s=null;const a="([A-Za-z0-9.\\-_]+)";function u(fe){fe.path.charAt(fe.path.length-1)==="/"&&(fe.path_=fe.path_.slice(0,-1))}const h="(/(.*))?$",m=new RegExp("^gs://"+a+h,"i"),g={bucket:1,path:3};function v(fe){fe.path_=decodeURIComponent(fe.path)}const w="v[A-Za-z0-9_]+",N=t.replace(/[.]/g,"\\."),b="(/([^?#]*).*)?$",j=new RegExp(`^https?://${N}/${w}/b/${a}/o${b}`,"i"),Q={bucket:1,path:3},X=t===G_?"(?:storage.googleapis.com|storage.cloud.google.com)":t,B="([^?#]*)",ye=new RegExp(`^https?://${X}/${a}/${B}`,"i"),me=[{regex:m,indices:g,postModify:u},{regex:j,indices:Q,postModify:v},{regex:ye,indices:{bucket:1,path:2},postModify:v}];for(let fe=0;fe<me.length;fe++){const Me=me[fe],ve=Me.regex.exec(e);if(ve){const P=ve[Me.indices.bucket];let T=ve[Me.indices.path];T||(T=""),s=new Mn(P,T),Me.postModify(s);break}}if(s==null)throw YA(e);return s}}class ZA{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
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
 */function eR(i,e,t){let s=1,a=null,u=null,h=!1,m=0;function g(){return m===2}let v=!1;function w(...B){v||(v=!0,e.apply(null,B))}function N(B){a=setTimeout(()=>{a=null,i(j,g())},B)}function b(){u&&clearTimeout(u)}function j(B,...ye){if(v){b();return}if(B){b(),w.call(null,B,...ye);return}if(g()||h){b(),w.call(null,B,...ye);return}s<64&&(s*=2);let me;m===1?(m=2,me=0):me=(s+Math.random())*1e3,N(me)}let Q=!1;function X(B){Q||(Q=!0,b(),!v&&(a!==null?(B||(m=2),clearTimeout(a),N(0)):B||(m=1)))}return N(0),u=setTimeout(()=>{h=!0,X(!0)},t),X}function tR(i){i(!1)}/**
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
 */function nR(i){return i!==void 0}function Fg(i,e,t,s){if(s<e)throw bg(`Invalid value for '${i}'. Expected ${e} or greater.`);if(s>t)throw bg(`Invalid value for '${i}'. Expected ${t} or less.`)}function rR(i){const e=encodeURIComponent;let t="?";for(const s in i)if(i.hasOwnProperty(s)){const a=e(s)+"="+e(i[s]);t=t+a+"&"}return t=t.slice(0,-1),t}var Ou;(function(i){i[i.NO_ERROR=0]="NO_ERROR",i[i.NETWORK_ERROR=1]="NETWORK_ERROR",i[i.ABORT=2]="ABORT"})(Ou||(Ou={}));/**
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
 */function iR(i,e){const t=i>=500&&i<600,a=[408,429].indexOf(i)!==-1,u=e.indexOf(i)!==-1;return t||a||u}/**
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
 */class sR{constructor(e,t,s,a,u,h,m,g,v,w,N,b=!0){this.url_=e,this.method_=t,this.headers_=s,this.body_=a,this.successCodes_=u,this.additionalRetryCodes_=h,this.callback_=m,this.errorCallback_=g,this.timeout_=v,this.progressCallback_=w,this.connectionFactory_=N,this.retry=b,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((j,Q)=>{this.resolve_=j,this.reject_=Q,this.start_()})}start_(){const e=(s,a)=>{if(a){s(!1,new lu(!1,null,!0));return}const u=this.connectionFactory_();this.pendingConnection_=u;const h=m=>{const g=m.loaded,v=m.lengthComputable?m.total:-1;this.progressCallback_!==null&&this.progressCallback_(g,v)};this.progressCallback_!==null&&u.addUploadProgressListener(h),u.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&u.removeUploadProgressListener(h),this.pendingConnection_=null;const m=u.getErrorCode()===Ou.NO_ERROR,g=u.getStatus();if(!m||iR(g,this.additionalRetryCodes_)&&this.retry){const w=u.getErrorCode()===Ou.ABORT;s(!1,new lu(!1,null,w));return}const v=this.successCodes_.indexOf(g)!==-1;s(!0,new lu(v,u))})},t=(s,a)=>{const u=this.resolve_,h=this.reject_,m=a.connection;if(a.wasSuccessCode)try{const g=this.callback_(m,m.getResponse());nR(g)?u(g):u()}catch(g){h(g)}else if(m!==null){const g=KA();g.serverResponse=m.getErrorText(),this.errorCallback_?h(this.errorCallback_(m,g)):h(g)}else if(a.canceled){const g=this.appDelete_?Q_():QA();h(g)}else{const g=GA();h(g)}};this.canceled_?t(!1,new lu(!1,null,!0)):this.backoffId_=eR(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&tR(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class lu{constructor(e,t,s){this.wasSuccessCode=e,this.connection=t,this.canceled=!!s}}function oR(i,e){e!==null&&e.length>0&&(i.Authorization="Firebase "+e)}function aR(i,e){i["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function lR(i,e){e&&(i["X-Firebase-GMPID"]=e)}function uR(i,e){e!==null&&(i["X-Firebase-AppCheck"]=e)}function cR(i,e,t,s,a,u,h=!0){const m=rR(i.urlParams),g=i.url+m,v=Object.assign({},i.headers);return lR(v,e),oR(v,t),aR(v,u),uR(v,s),new sR(g,i.method,v,i.body,i.successCodes,i.additionalRetryCodes,i.handler,i.errorHandler,i.timeout,i.progressCallback,a,h)}/**
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
 */function hR(i){if(i.length===0)return null;const e=i.lastIndexOf("/");return e===-1?"":i.slice(0,e)}function dR(i){const e=i.lastIndexOf("/",i.length-2);return e===-1?i:i.slice(e+1)}/**
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
 */class Vu{constructor(e,t){this._service=e,t instanceof Mn?this._location=t:this._location=Mn.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Vu(e,t)}get root(){const e=new Mn(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return dR(this._location.path)}get storage(){return this._service}get parent(){const e=hR(this._location.path);if(e===null)return null;const t=new Mn(this._location.bucket,e);return new Vu(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw JA(e)}}function Ug(i,e){const t=e?.[qA];return t==null?null:Mn.makeFromBucketSpec(t,i)}function fR(i,e,t,s={}){i.host=`${e}:${t}`,i._protocol="http";const{mockUserToken:a}=s;a&&(i._overrideAuthToken=typeof a=="string"?a:Jg(a,i.app.options.projectId))}class pR{constructor(e,t,s,a,u){this.app=e,this._authProvider=t,this._appCheckProvider=s,this._url=a,this._firebaseVersion=u,this._bucket=null,this._host=G_,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=HA,this._maxUploadRetryTime=WA,this._requests=new Set,a!=null?this._bucket=Mn.makeFromBucketSpec(a,this._host):this._bucket=Ug(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Mn.makeFromBucketSpec(this._url,e):this._bucket=Ug(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Fg("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Fg("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Vu(this,e)}_makeRequest(e,t,s,a,u=!0){if(this._deleted)return new ZA(Q_());{const h=cR(e,this._appId,s,a,t,this._firebaseVersion,u);return this._requests.add(h),h.getPromise().then(()=>this._requests.delete(h),()=>this._requests.delete(h)),h}}async makeRequestWithTokens(e,t){const[s,a]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,s,a).getPromise()}}const jg="@firebase/storage",zg="0.13.2";/**
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
 */const Y_="storage";function mR(i=md(),e){i=Jt(i);const s=Lu(i,Y_).getImmediate({identifier:e}),a=Qg("storage");return a&&gR(s,...a),s}function gR(i,e,t,s={}){fR(i,e,t,s)}function yR(i,{instanceIdentifier:e}){const t=i.getProvider("app").getImmediate(),s=i.getProvider("auth-internal"),a=i.getProvider("app-check-internal");return new pR(t,s,a,e,us)}function _R(){rs(new mi(Y_,yR,"PUBLIC").setMultipleInstances(!0)),er(jg,zg,""),er(jg,zg,"esm2017")}_R();/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vR=i=>i.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),X_=(...i)=>i.filter((e,t,s)=>!!e&&s.indexOf(e)===t).join(" ");/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ER={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wR=de.forwardRef(({color:i="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:s,className:a="",children:u,iconNode:h,...m},g)=>de.createElement("svg",{ref:g,...ER,width:e,height:e,stroke:i,strokeWidth:s?Number(t)*24/Number(e):t,className:X_("lucide",a),...m},[...h.map(([v,w])=>de.createElement(v,w)),...Array.isArray(u)?u:[u]]));/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TR=(i,e)=>{const t=de.forwardRef(({className:s,...a},u)=>de.createElement(wR,{ref:u,iconNode:e,className:X_(`lucide-${vR(i)}`,s),...a}));return t.displayName=`${i}`,t};/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IR=TR("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]),SR=({setUserId:i})=>{const[e,t]=de.useState(!0),[s,a]=de.useState(""),[u,h]=de.useState(""),[m,g]=de.useState(""),[v,w]=de.useState(!1),N=Fy(),b=async j=>{j.preventDefault(),g(""),w(!0);try{e?await z0(N,s,u):await j0(N,s,u)}catch(Q){g(Q.message)}finally{w(!1)}};return je.jsx("div",{className:"min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col justify-center items-center p-4",children:je.jsxs("div",{className:"w-full max-w-md",children:[je.jsxs("div",{className:"text-center mb-8",children:[je.jsx(IR,{className:"mx-auto h-12 w-auto text-cyan-500"}),je.jsx("h2",{className:"mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white",children:e?"Sign in to your account":"Create a new account"})]}),je.jsxs("div",{className:"bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8",children:[je.jsxs("form",{className:"space-y-6",onSubmit:b,children:[je.jsxs("div",{children:[je.jsx("label",{htmlFor:"email",className:"block text-sm font-medium text-slate-700 dark:text-slate-300",children:"Email address"}),je.jsx("div",{className:"mt-1",children:je.jsx("input",{id:"email",name:"email",type:"email",autoComplete:"email",required:!0,value:s,onChange:j=>a(j.target.value),className:"block w-full appearance-none rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"})})]}),je.jsxs("div",{children:[je.jsx("label",{htmlFor:"password",className:"block text-sm font-medium text-slate-700 dark:text-slate-300",children:"Password"}),je.jsx("div",{className:"mt-1",children:je.jsx("input",{id:"password",name:"password",type:"password",autoComplete:"current-password",required:!0,value:u,onChange:j=>h(j.target.value),className:"block w-full appearance-none rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"})})]}),m&&je.jsx("div",{className:"rounded-md bg-red-50 p-4",children:je.jsx("p",{className:"text-sm text-red-700",children:m})}),je.jsx("div",{children:je.jsx("button",{type:"submit",disabled:v,className:"flex w-full justify-center rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:bg-slate-400",children:v?"Processing...":e?"Sign in":"Create account"})})]}),je.jsx("div",{className:"mt-6",children:je.jsxs("p",{className:"text-center text-sm text-slate-500 dark:text-slate-400",children:[e?"Don't have an account?":"Already have an account?",je.jsx("button",{onClick:()=>t(!e),className:"font-medium text-cyan-600 hover:text-cyan-500 ml-1",children:e?"Sign up":"Sign in"})]})})]})]})})},AR={apiKey:"AIzaSyAlev0GFpv3rzRYCJaMALOqlPwaowNfynI",authDomain:"hvac-finance-dashboard.firebaseapp.com",projectId:"hvac-finance-dashboard",storageBucket:"hvac-finance-dashboard.firebasestorage.app",messagingSenderId:"917610618621",appId:"1:917610618621:web:83c621d154c5f62c9be894"},Bg="hvac-master-dashboard",tf=ty(AR);Fy(tf);const $g=AA(tf);mR(tf);const RR=()=>{console.log("1. App component is rendering...");const[i,e]=de.useState(null),[t,s]=de.useState(!0),[a,u]=de.useState("finance"),[h,m]=de.useState("dashboard"),[g,v]=de.useState([]),[w,N]=de.useState([]),[b,j]=de.useState([]),[Q,X]=de.useState([]),[B,ye]=de.useState([]),[Ie,me]=de.useState([]),[fe,Me]=de.useState([]),[ve,P]=de.useState([]),[T,A]=de.useState([]),[k,D]=de.useState([]),[V,S]=de.useState([]),[Ze,mt]=de.useState([]),[Tt,Fe]=de.useState([]),[J,le]=de.useState([]),[ee,O]=de.useState([]),[z,ae]=de.useState([]),[we,Te]=de.useState([]),[Ae,Ve]=de.useState(""),[xe,ze]=de.useState("All"),[ht,Un]=de.useState(null),[wi,lr]=de.useState(!1),[Or,Ti]=de.useState("dashboard"),[hs,ds]=de.useState(!1),[Co,Ii]=de.useState(null),[jn,zn]=de.useState("bill"),[fs,Si]=de.useState("dark"),[Ai,ps]=de.useState({key:"dueDay",direction:"ascending"}),[st,ot]=de.useState(""),[Bn,ms]=de.useState(null),[ur,Vr]=de.useState(0),[xr,gs]=de.useState({start:new Date,end:new Date}),[ys,_s]=de.useState("monthly"),[vs,Es]=de.useState(!0),[Lr,Ri]=de.useState([]),[ki,Zt]=de.useState({show:!1,data:[],headers:[],type:"",fileName:""}),[_n,Ci]=de.useState({});return de.useEffect(()=>{if(!i)return;const Pi=Object.entries({bills:v,debts:N,incomes:j,weeklyCosts:X,jobs:ye,tasks:me,invoices:Me,taxPayments:P,goals:A,clients:le,inventory:D,vehicles:S,maintenanceLogs:mt,recurringWork:Fe,workOrders:O,customers:ae,technicians:Te}).map(([Ut,En])=>Mg(UA(IA($g,"artifacts",Bg,"users",i,Ut)),hr=>{En(hr.docs.map(Ge=>({id:Ge.id,...Ge.data()})))},hr=>console.error(`Error fetching ${Ut}:`,hr))),cr=Mg(SA($g,"artifacts",Bg,"users",i,"paidStatus",selectedMonthYear),Ut=>{setPaidStatus(Ut.exists()?Ut.data().status:{})},Ut=>console.error("Error fetching paid status:",Ut));return()=>{Pi.forEach(Ut=>Ut()),cr()}},[i,selectedMonthYear]),t?je.jsx("div",{className:"bg-slate-900 text-white min-h-screen flex items-center justify-center",children:je.jsx("div",{className:"animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"})}):i?je.jsx("div",{children:"Your App Content"}):je.jsx(SR,{setUserId:e})};hE.createRoot(document.getElementById("root")).render(je.jsx(iE.StrictMode,{children:je.jsx(RR,{})}));
