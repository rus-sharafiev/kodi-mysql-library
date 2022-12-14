(()=>{try{self["workbox:core:6.5.3"]&&_()}catch{}var ce=(r,...e)=>{let t=r;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t};var Q=ce;var u=class extends Error{constructor(e,t){let o=Q(e,t);super(o),this.name=e,this.details=t}};try{self["workbox:routing:6.5.3"]&&_()}catch{}var O="GET";var E=r=>r&&typeof r=="object"?r:{handle:r};var p=class{constructor(e,t,o=O){this.handler=E(t),this.match=e,this.method=o}setCatchHandler(e){this.catchHandler=E(e)}};var y=class extends p{constructor(e,t,o){let s=({url:a})=>{let n=e.exec(a.href);if(!!n&&!(a.origin!==location.origin&&n.index!==0))return n.slice(1)};super(s,t,o)}};var P=r=>new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),"");var x=class{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{let{request:t}=e,o=this.handleRequest({request:t,event:e});o&&e.respondWith(o)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){let{payload:t}=e.data,o=Promise.all(t.urlsToCache.map(s=>{typeof s=="string"&&(s=[s]);let a=new Request(...s);return this.handleRequest({request:a,event:e})}));e.waitUntil(o),e.ports&&e.ports[0]&&o.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){let o=new URL(e.url,location.href);if(!o.protocol.startsWith("http"))return;let s=o.origin===location.origin,{params:a,route:n}=this.findMatchingRoute({event:t,request:e,sameOrigin:s,url:o}),i=n&&n.handler,c=[],l=e.method;if(!i&&this._defaultHandlerMap.has(l)&&(i=this._defaultHandlerMap.get(l)),!i)return;let g;try{g=i.handle({url:o,request:e,event:t,params:a})}catch(N){g=Promise.reject(N)}let m=n&&n.catchHandler;return g instanceof Promise&&(this._catchHandler||m)&&(g=g.catch(async N=>{if(m)try{return await m.handle({url:o,request:e,event:t,params:a})}catch(K){K instanceof Error&&(N=K)}if(this._catchHandler)return this._catchHandler.handle({url:o,request:e,event:t});throw N})),g}findMatchingRoute({url:e,sameOrigin:t,request:o,event:s}){let a=this._routes.get(o.method)||[];for(let n of a){let i,c=n.match({url:e,sameOrigin:t,request:o,event:s});if(c)return i=c,(Array.isArray(i)&&i.length===0||c.constructor===Object&&Object.keys(c).length===0||typeof c=="boolean")&&(i=void 0),{route:n,params:i}}return{}}setDefaultHandler(e,t=O){this._defaultHandlerMap.set(t,E(e))}setCatchHandler(e){this._catchHandler=E(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new u("unregister-route-but-not-found-with-method",{method:e.method});let t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new u("unregister-route-route-not-registered")}};var b,C=()=>(b||(b=new x,b.addFetchListener(),b.addCacheListener()),b);function R(r,e,t){let o;if(typeof r=="string"){let a=new URL(r,location.href),n=({url:i})=>i.href===a.href;o=new p(n,e,t)}else if(r instanceof RegExp)o=new y(r,e,t);else if(typeof r=="function")o=new p(r,e,t);else if(r instanceof p)o=r;else throw new u("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return C().registerRoute(o),o}var d={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration<"u"?registration.scope:""},M=r=>[d.prefix,r,d.suffix].filter(e=>e&&e.length>0).join("-"),ue=r=>{for(let e of Object.keys(d))r(e)},T={updateDetails:r=>{ue(e=>{typeof r[e]=="string"&&(d[e]=r[e])})},getGoogleAnalyticsName:r=>r||M(d.googleAnalytics),getPrecacheName:r=>r||M(d.precache),getPrefix:()=>d.prefix,getRuntimeName:r=>r||M(d.runtime),getSuffix:()=>d.suffix};function J(r,e){let t=new URL(r);for(let o of e)t.searchParams.delete(o);return t.href}async function Y(r,e,t,o){let s=J(e.url,t);if(e.url===s)return r.match(e,o);let a=Object.assign(Object.assign({},o),{ignoreSearch:!0}),n=await r.keys(e,a);for(let i of n){let c=J(i.url,t);if(s===c)return r.match(i,o)}}var S=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var U=new Set;async function z(){for(let r of U)await r()}function F(r){return new Promise(e=>setTimeout(e,r))}try{self["workbox:strategies:6.5.3"]&&_()}catch{}function q(r){return typeof r=="string"?new Request(r):r}var k=class{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new S,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(let o of this._plugins)this._pluginStateMap.set(o,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){let{event:t}=this,o=q(e);if(o.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){let n=await t.preloadResponse;if(n)return n}let s=this.hasCallback("fetchDidFail")?o.clone():null;try{for(let n of this.iterateCallbacks("requestWillFetch"))o=await n({request:o.clone(),event:t})}catch(n){if(n instanceof Error)throw new u("plugin-error-request-will-fetch",{thrownErrorMessage:n.message})}let a=o.clone();try{let n;n=await fetch(o,o.mode==="navigate"?void 0:this._strategy.fetchOptions);for(let i of this.iterateCallbacks("fetchDidSucceed"))n=await i({event:t,request:a,response:n});return n}catch(n){throw s&&await this.runCallbacks("fetchDidFail",{error:n,event:t,originalRequest:s.clone(),request:a.clone()}),n}}async fetchAndCachePut(e){let t=await this.fetch(e),o=t.clone();return this.waitUntil(this.cachePut(e,o)),t}async cacheMatch(e){let t=q(e),o,{cacheName:s,matchOptions:a}=this._strategy,n=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},a),{cacheName:s});o=await caches.match(n,i);for(let c of this.iterateCallbacks("cachedResponseWillBeUsed"))o=await c({cacheName:s,matchOptions:a,cachedResponse:o,request:n,event:this.event})||void 0;return o}async cachePut(e,t){let o=q(e);await F(0);let s=await this.getCacheKey(o,"write");if(!t)throw new u("cache-put-with-no-response",{url:P(s.url)});let a=await this._ensureResponseSafeToCache(t);if(!a)return!1;let{cacheName:n,matchOptions:i}=this._strategy,c=await self.caches.open(n),l=this.hasCallback("cacheDidUpdate"),g=l?await Y(c,s.clone(),["__WB_REVISION__"],i):null;try{await c.put(s,l?a.clone():a)}catch(m){if(m instanceof Error)throw m.name==="QuotaExceededError"&&await z(),m}for(let m of this.iterateCallbacks("cacheDidUpdate"))await m({cacheName:n,oldResponse:g,newResponse:a.clone(),request:s,event:this.event});return!0}async getCacheKey(e,t){let o=`${e.url} | ${t}`;if(!this._cacheKeys[o]){let s=e;for(let a of this.iterateCallbacks("cacheKeyWillBeUsed"))s=q(await a({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[o]=s}return this._cacheKeys[o]}hasCallback(e){for(let t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(let o of this.iterateCallbacks(e))await o(t)}*iterateCallbacks(e){for(let t of this._strategy.plugins)if(typeof t[e]=="function"){let o=this._pluginStateMap.get(t);yield a=>{let n=Object.assign(Object.assign({},a),{state:o});return t[e](n)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,o=!1;for(let s of this.iterateCallbacks("cacheWillUpdate"))if(t=await s({request:this.request,response:t,event:this.event})||void 0,o=!0,!t)break;return o||t&&t.status!==200&&(t=void 0),t}};var f=class{constructor(e={}){this.cacheName=T.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){let[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});let t=e.event,o=typeof e.request=="string"?new Request(e.request):e.request,s="params"in e?e.params:void 0,a=new k(this,{event:t,request:o,params:s}),n=this._getResponse(a,o,t),i=this._awaitComplete(n,a,o,t);return[n,i]}async _getResponse(e,t,o){await e.runCallbacks("handlerWillStart",{event:o,request:t});let s;try{if(s=await this._handle(t,e),!s||s.type==="error")throw new u("no-response",{url:t.url})}catch(a){if(a instanceof Error){for(let n of e.iterateCallbacks("handlerDidError"))if(s=await n({error:a,event:o,request:t}),s)break}if(!s)throw a}for(let a of e.iterateCallbacks("handlerWillRespond"))s=await a({event:o,request:t,response:s});return s}async _awaitComplete(e,t,o,s){let a,n;try{a=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:s,request:o,response:a}),await t.doneWaiting()}catch(i){i instanceof Error&&(n=i)}if(await t.runCallbacks("handlerDidComplete",{event:s,request:o,response:a,error:n}),t.destroy(),n)throw n}};var W={cacheWillUpdate:async({response:r})=>r.status===200||r.status===0?r:null};var w=class extends f{constructor(e={}){super(e),this.plugins.some(t=>"cacheWillUpdate"in t)||this.plugins.unshift(W)}async _handle(e,t){let o=[],s=t.fetchAndCachePut(e).catch(()=>{});t.waitUntil(s);let a=await t.cacheMatch(e),n;if(!a)try{a=await s}catch(i){i instanceof Error&&(n=i)}if(!a)throw new u("no-response",{url:e.url,error:n});return a}};function V(r){r.then(()=>{})}var le=(r,e)=>e.some(t=>r instanceof t),X,Z;function pe(){return X||(X=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function he(){return Z||(Z=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var ee=new WeakMap,B=new WeakMap,te=new WeakMap,I=new WeakMap,j=new WeakMap;function me(r){let e=new Promise((t,o)=>{let s=()=>{r.removeEventListener("success",a),r.removeEventListener("error",n)},a=()=>{t(h(r.result)),s()},n=()=>{o(r.error),s()};r.addEventListener("success",a),r.addEventListener("error",n)});return e.then(t=>{t instanceof IDBCursor&&ee.set(t,r)}).catch(()=>{}),j.set(e,r),e}function de(r){if(B.has(r))return;let e=new Promise((t,o)=>{let s=()=>{r.removeEventListener("complete",a),r.removeEventListener("error",n),r.removeEventListener("abort",n)},a=()=>{t(),s()},n=()=>{o(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",a),r.addEventListener("error",n),r.addEventListener("abort",n)});B.set(r,e)}var H={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return B.get(r);if(e==="objectStoreNames")return r.objectStoreNames||te.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return h(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function re(r){H=r(H)}function fe(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let o=r.call(L(this),e,...t);return te.set(o,e.sort?e.sort():[e]),h(o)}:he().includes(r)?function(...e){return r.apply(L(this),e),h(ee.get(this))}:function(...e){return h(r.apply(L(this),e))}}function ge(r){return typeof r=="function"?fe(r):(r instanceof IDBTransaction&&de(r),le(r,pe())?new Proxy(r,H):r)}function h(r){if(r instanceof IDBRequest)return me(r);if(I.has(r))return I.get(r);let e=ge(r);return e!==r&&(I.set(r,e),j.set(e,r)),e}var L=r=>j.get(r);function se(r,e,{blocked:t,upgrade:o,blocking:s,terminated:a}={}){let n=indexedDB.open(r,e),i=h(n);return o&&n.addEventListener("upgradeneeded",c=>{o(h(n.result),c.oldVersion,c.newVersion,h(n.transaction),c)}),t&&n.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),i.then(c=>{a&&c.addEventListener("close",()=>a()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),i}function ne(r,{blocked:e}={}){let t=indexedDB.deleteDatabase(r);return e&&t.addEventListener("blocked",o=>e(o.oldVersion,o)),h(t).then(()=>{})}var we=["get","getKey","getAll","getAllKeys","count"],Ee=["put","add","delete","clear"],G=new Map;function oe(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(G.get(e))return G.get(e);let t=e.replace(/FromIndex$/,""),o=e!==t,s=Ee.includes(t);if(!(t in(o?IDBIndex:IDBObjectStore).prototype)||!(s||we.includes(t)))return;let a=async function(n,...i){let c=this.transaction(n,s?"readwrite":"readonly"),l=c.store;return o&&(l=l.index(i.shift())),(await Promise.all([l[t](...i),s&&c.done]))[0]};return G.set(e,a),a}re(r=>({...r,get:(e,t,o)=>oe(e,t)||r.get(e,t,o),has:(e,t)=>!!oe(e,t)||r.has(e,t)}));try{self["workbox:expiration:6.5.3"]&&_()}catch{}var Ne="workbox-expiration",v="cache-entries",ae=r=>{let e=new URL(r,location.href);return e.hash="",e.href},A=class{constructor(e){this._db=null,this._cacheName=e}_upgradeDb(e){let t=e.createObjectStore(v,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){this._upgradeDb(e),this._cacheName&&ne(this._cacheName)}async setTimestamp(e,t){e=ae(e);let o={url:e,timestamp:t,cacheName:this._cacheName,id:this._getId(e)},a=(await this.getDb()).transaction(v,"readwrite",{durability:"relaxed"});await a.store.put(o),await a.done}async getTimestamp(e){let o=await(await this.getDb()).get(v,this._getId(e));return o?.timestamp}async expireEntries(e,t){let o=await this.getDb(),s=await o.transaction(v).store.index("timestamp").openCursor(null,"prev"),a=[],n=0;for(;s;){let c=s.value;c.cacheName===this._cacheName&&(e&&c.timestamp<e||t&&n>=t?a.push(s.value):n++),s=await s.continue()}let i=[];for(let c of a)await o.delete(v,c.id),i.push(c.url);return i}_getId(e){return this._cacheName+"|"+ae(e)}async getDb(){return this._db||(this._db=await se(Ne,1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}};var D=class{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new A(e)}async expireEntries(){if(this._isRunning){this._rerunRequested=!0;return}this._isRunning=!0;let e=this._maxAgeSeconds?Date.now()-this._maxAgeSeconds*1e3:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),o=await self.caches.open(this._cacheName);for(let s of t)await o.delete(s,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,V(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){let t=await this._timestampModel.getTimestamp(e),o=Date.now()-this._maxAgeSeconds*1e3;return t!==void 0?t<o:!0}else return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}};function ie(r){U.add(r)}var $=class{constructor(e={}){this.cachedResponseWillBeUsed=async({event:t,request:o,cacheName:s,cachedResponse:a})=>{if(!a)return null;let n=this._isResponseDateFresh(a),i=this._getCacheExpiration(s);V(i.expireEntries());let c=i.updateTimestamp(o.url);if(t)try{t.waitUntil(c)}catch{}return n?a:null},this.cacheDidUpdate=async({cacheName:t,request:o})=>{let s=this._getCacheExpiration(t);await s.updateTimestamp(o.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&ie(()=>this.deleteCacheAndMetadata())}_getCacheExpiration(e){if(e===T.getRuntimeName())throw new u("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new D(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;let t=this._getDateHeaderTimestamp(e);if(t===null)return!0;let o=Date.now();return t>=o-this._maxAgeSeconds*1e3}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;let t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(let[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}};var ye=new p(({request:r})=>r.destination==="image",new w({cacheName:"images",plugins:[new $({maxAgeSeconds:60*60*24*30})]})),xe=new p(({request:r})=>r.destination==="script",new w({cacheName:"scripts"})),be=new p(({request:r})=>r.destination==="style",new w({cacheName:"styles"}));R(ye);R(xe);R(be);})();