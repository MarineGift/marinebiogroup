(()=>{var a={};a.id=746,a.ids=[746],a.modules={261:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/app-paths")},3295:a=>{"use strict";a.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},29294:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-async-storage.external.js")},42454:(a,b,c)=>{"use strict";c.r(b),c.d(b,{handler:()=>C,patchFetch:()=>B,routeModule:()=>x,serverHooks:()=>A,workAsyncStorage:()=>y,workUnitAsyncStorage:()=>z});var d={};c.r(d),c.d(d,{POST:()=>w});var e=c(96559),f=c(48088),g=c(37719),h=c(26191),i=c(81289),j=c(261),k=c(92603),l=c(39893),m=c(14823),n=c(47220),o=c(66946),p=c(47912),q=c(99786),r=c(46143),s=c(86439),t=c(43365),u=c(32190);async function v(a){try{let b=Object(function(){var a=Error("Cannot find module 'nodemailer'");throw a.code="MODULE_NOT_FOUND",a}())({host:process.env.SMTP_HOST,port:parseInt(process.env.SMTP_PORT||"587"),secure:"465"===process.env.SMTP_PORT,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}}),c={from:process.env.SMTP_FROM,to:process.env.SMTP_FROM,subject:`[MarineBioGroup 문의] ${a.subject}`,html:`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #0ea5e9, #0369a1); color: white; padding: 20px; border-radius: 10px 10px 0 0; margin: -20px -20px 20px -20px;">
            <h2 style="margin: 0; font-size: 24px;">MarineBioGroup 웹사이트 문의</h2>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #0369a1; border-bottom: 2px solid #0ea5e9; padding-bottom: 5px;">문의자 정보</h3>
            <p><strong>이름:</strong> ${a.name}</p>
            <p><strong>이메일:</strong> <a href="mailto:${a.email}" style="color: #0ea5e9;">${a.email}</a></p>
            ${a.phone?`<p><strong>전화번호:</strong> ${a.phone}</p>`:""}
          </div>

          <div style="margin-bottom: 20px;">
            <h3 style="color: #0369a1; border-bottom: 2px solid #0ea5e9; padding-bottom: 5px;">문의 내용</h3>
            <p><strong>제목:</strong> ${a.subject}</p>
            <div style="background: #f8fafc; padding: 15px; border-left: 4px solid #0ea5e9; border-radius: 5px;">
              <p style="margin: 0; line-height: 1.6;">${a.message.replace(/\n/g,"<br>")}</p>
            </div>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
              이 메일은 MarineBioGroup 웹사이트 연락처 폼을 통해 자동 발송되었습니다.
            </p>
          </div>
        </div>
      `},d={from:process.env.SMTP_FROM,to:a.email,subject:"[MarineBioGroup] 문의해 주셔서 감사합니다",html:`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #0ea5e9, #0369a1); color: white; padding: 20px; border-radius: 10px 10px 0 0; margin: -20px -20px 20px -20px;">
            <h2 style="margin: 0; font-size: 24px;">MarineBioGroup</h2>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Marine Nano-Fiber Technology</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #0369a1;">안녕하세요, ${a.name}님!</h3>
            <p>MarineBioGroup에 문의해 주셔서 감사합니다.</p>
            <p>귀하의 문의사항을 잘 받았으며, 담당자가 검토 후 빠른 시일 내에 답변드리겠습니다.</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: #0369a1; margin-top: 0;">접수된 문의 내용</h4>
            <p><strong>제목:</strong> ${a.subject}</p>
            <p><strong>내용:</strong> ${a.message}</p>
          </div>

          <div style="margin: 20px 0;">
            <h4 style="color: #0369a1;">MarineBioGroup 소개</h4>
            <p>저희는 해양 나노섬유 기술을 활용한 지속 가능한 뷰티 및 라이프스타일 제품을 개발하는 회사입니다.</p>
            <p>혁신적인 해양 생명공학 솔루션으로 더 나은 미래를 만들어가고 있습니다.</p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
              MarineBioGroup | Marine Nano-Fiber Technology<br>
              이 메일은 자동 발송된 확인 메일입니다.
            </p>
          </div>
        </div>
      `};return await b.sendMail(c),await b.sendMail(d),{success:!0,message:"문의 메일이 성공적으로 발송되었습니다."}}catch(a){return console.error("메일 발송 오류:",a),{success:!1,message:"메일 발송 중 오류가 발생했습니다."}}}async function w(a){try{let b=await a.json();if(!b.name||!b.email||!b.subject||!b.message)return u.NextResponse.json({error:"모든 필수 필드를 입력해주세요."},{status:400});if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email))return u.NextResponse.json({error:"올바른 이메일 형식을 입력해주세요."},{status:400});let c=await v({name:b.name,email:b.email,phone:b.phone,subject:b.subject,message:b.message});if(c.success)return u.NextResponse.json({message:"문의사항이 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다."});return u.NextResponse.json({error:c.message},{status:500})}catch(a){return console.error("연락처 API 오류:",a),u.NextResponse.json({error:"서버 오류가 발생했습니다."},{status:500})}}!function(){var a=Error("Cannot find module 'nodemailer'");throw a.code="MODULE_NOT_FOUND",a}();let x=new e.AppRouteRouteModule({definition:{kind:f.RouteKind.APP_ROUTE,page:"/api/contact/route",pathname:"/api/contact",filename:"route",bundlePath:"app/api/contact/route"},distDir:".next",projectDir:"",resolvedPagePath:"D:\\0_프로그램개발\\Github\\marinebiogroup\\src\\app\\api\\contact\\route.ts",nextConfigOutput:"standalone",userland:d}),{workAsyncStorage:y,workUnitAsyncStorage:z,serverHooks:A}=x;function B(){return(0,g.patchFetch)({workAsyncStorage:y,workUnitAsyncStorage:z})}async function C(a,b,c){var d;let e="/api/contact/route";"/index"===e&&(e="/");let g=await x.prepare(a,b,{srcPage:e,multiZoneDraftMode:"false"});if(!g)return b.statusCode=400,b.end("Bad Request"),null==c.waitUntil||c.waitUntil.call(c,Promise.resolve()),null;let{buildId:u,params:v,nextConfig:w,isDraftMode:y,prerenderManifest:z,routerServerContext:A,isOnDemandRevalidate:B,revalidateOnlyGenerated:C,resolvedPathname:D}=g,E=(0,j.normalizeAppPath)(e),F=!!(z.dynamicRoutes[E]||z.routes[D]);if(F&&!y){let a=!!z.routes[D],b=z.dynamicRoutes[E];if(b&&!1===b.fallback&&!a)throw new s.NoFallbackError}let G=null;!F||x.isDev||y||(G="/index"===(G=D)?"/":G);let H=!0===x.isDev||!F,I=F&&!H,J=a.method||"GET",K=(0,i.getTracer)(),L=K.getActiveScopeSpan(),M={params:v,prerenderManifest:z,renderOpts:{experimental:{dynamicIO:!!w.experimental.dynamicIO,authInterrupts:!!w.experimental.authInterrupts},supportsDynamicResponse:H,incrementalCache:(0,h.getRequestMeta)(a,"incrementalCache"),cacheLifeProfiles:null==(d=w.experimental)?void 0:d.cacheLife,isRevalidate:I,waitUntil:c.waitUntil,onClose:a=>{b.on("close",a)},onAfterTaskError:void 0,onInstrumentationRequestError:(b,c,d)=>x.onRequestError(a,b,d,A)},sharedContext:{buildId:u}},N=new k.NodeNextRequest(a),O=new k.NodeNextResponse(b),P=l.NextRequestAdapter.fromNodeNextRequest(N,(0,l.signalFromNodeResponse)(b));try{let d=async c=>x.handle(P,M).finally(()=>{if(!c)return;c.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let d=K.getRootSpanAttributes();if(!d)return;if(d.get("next.span_type")!==m.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${d.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let e=d.get("next.route");if(e){let a=`${J} ${e}`;c.setAttributes({"next.route":e,"http.route":e,"next.span_name":a}),c.updateName(a)}else c.updateName(`${J} ${a.url}`)}),g=async g=>{var i,j;let k=async({previousCacheEntry:f})=>{try{if(!(0,h.getRequestMeta)(a,"minimalMode")&&B&&C&&!f)return b.statusCode=404,b.setHeader("x-nextjs-cache","REVALIDATED"),b.end("This page could not be found"),null;let e=await d(g);a.fetchMetrics=M.renderOpts.fetchMetrics;let i=M.renderOpts.pendingWaitUntil;i&&c.waitUntil&&(c.waitUntil(i),i=void 0);let j=M.renderOpts.collectedTags;if(!F)return await (0,o.I)(N,O,e,M.renderOpts.pendingWaitUntil),null;{let a=await e.blob(),b=(0,p.toNodeOutgoingHttpHeaders)(e.headers);j&&(b[r.NEXT_CACHE_TAGS_HEADER]=j),!b["content-type"]&&a.type&&(b["content-type"]=a.type);let c=void 0!==M.renderOpts.collectedRevalidate&&!(M.renderOpts.collectedRevalidate>=r.INFINITE_CACHE)&&M.renderOpts.collectedRevalidate,d=void 0===M.renderOpts.collectedExpire||M.renderOpts.collectedExpire>=r.INFINITE_CACHE?void 0:M.renderOpts.collectedExpire;return{value:{kind:t.CachedRouteKind.APP_ROUTE,status:e.status,body:Buffer.from(await a.arrayBuffer()),headers:b},cacheControl:{revalidate:c,expire:d}}}}catch(b){throw(null==f?void 0:f.isStale)&&await x.onRequestError(a,b,{routerKind:"App Router",routePath:e,routeType:"route",revalidateReason:(0,n.c)({isRevalidate:I,isOnDemandRevalidate:B})},A),b}},l=await x.handleResponse({req:a,nextConfig:w,cacheKey:G,routeKind:f.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:z,isRoutePPREnabled:!1,isOnDemandRevalidate:B,revalidateOnlyGenerated:C,responseGenerator:k,waitUntil:c.waitUntil});if(!F)return null;if((null==l||null==(i=l.value)?void 0:i.kind)!==t.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==l||null==(j=l.value)?void 0:j.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});(0,h.getRequestMeta)(a,"minimalMode")||b.setHeader("x-nextjs-cache",B?"REVALIDATED":l.isMiss?"MISS":l.isStale?"STALE":"HIT"),y&&b.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,p.fromNodeOutgoingHttpHeaders)(l.value.headers);return(0,h.getRequestMeta)(a,"minimalMode")&&F||m.delete(r.NEXT_CACHE_TAGS_HEADER),!l.cacheControl||b.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,q.getCacheControlHeader)(l.cacheControl)),await (0,o.I)(N,O,new Response(l.value.body,{headers:m,status:l.value.status||200})),null};L?await g(L):await K.withPropagatedContext(a.headers,()=>K.trace(m.BaseServerSpan.handleRequest,{spanName:`${J} ${a.url}`,kind:i.SpanKind.SERVER,attributes:{"http.method":J,"http.target":a.url}},g))}catch(b){if(L||b instanceof s.NoFallbackError||await x.onRequestError(a,b,{routerKind:"App Router",routePath:E,routeType:"route",revalidateReason:(0,n.c)({isRevalidate:I,isOnDemandRevalidate:B})}),F)throw b;return await (0,o.I)(N,O,new Response(null,{status:500})),null}}},44870:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},63033:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},78335:()=>{},86439:a=>{"use strict";a.exports=require("next/dist/shared/lib/no-fallback-error.external")},96487:()=>{}};var b=require("../../../webpack-runtime.js");b.C(a);var c=b.X(0,[431,55],()=>b(b.s=42454));module.exports=c})();