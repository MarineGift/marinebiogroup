"use strict";(()=>{var e={};e.id=986,e.ids=[986],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},1282:e=>{e.exports=require("child_process")},4770:e=>{e.exports=require("crypto")},665:e=>{e.exports=require("dns")},7702:e=>{e.exports=require("events")},2048:e=>{e.exports=require("fs")},2615:e=>{e.exports=require("http")},8791:e=>{e.exports=require("https")},8216:e=>{e.exports=require("net")},9801:e=>{e.exports=require("os")},5315:e=>{e.exports=require("path")},6162:e=>{e.exports=require("stream")},2452:e=>{e.exports=require("tls")},7360:e=>{e.exports=require("url")},1764:e=>{e.exports=require("util")},1568:e=>{e.exports=require("zlib")},628:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>g,patchFetch:()=>m,requestAsyncStorage:()=>c,routeModule:()=>u,serverHooks:()=>x,staticGenerationAsyncStorage:()=>l});var s={};t.r(s),t.d(s,{POST:()=>d});var i=t(9303),o=t(8716),n=t(670),a=t(7070);let p=t(5245).createTransport({host:process.env.SMTP_HOST||"smtp.gmail.com",port:parseInt(process.env.SMTP_PORT||"587"),secure:!1,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});async function d(e,{params:r}){try{let t=parseInt(r.id),{subject:s,message:i,recipientEmail:o,recipientName:n}=await e.json();if(!s||!i||!o||!n)return a.NextResponse.json({success:!1,message:"필수 필드가 누락되었습니다."},{status:400});let d=`
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KICT Group 답변</title>
    <style>
        body {
            font-family: 'Malgun Gothic', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #ffffff;
            padding: 30px;
            border: 1px solid #e1e5e9;
            border-top: none;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            border: 1px solid #e1e5e9;
            border-top: none;
            border-radius: 0 0 10px 10px;
            font-size: 14px;
            color: #6c757d;
        }
        .message-box {
            background: #f8f9fa;
            border-left: 4px solid #007bff;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 5px 5px 0;
        }
        .contact-info {
            margin-top: 20px;
            padding: 15px;
            background: #e9ecef;
            border-radius: 5px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">KICT Group</div>
        <p>혁신적인 ICT 솔루션 파트너</p>
    </div>
    
    <div class="content">
        <h2>안녕하세요, ${n}님</h2>
        <p>KICT Group에 문의해주셔서 감사합니다.</p>
        <p>귀하의 문의사항에 대한 답변을 드립니다.</p>
        
        <div class="message-box">
            ${i.replace(/\n/g,"<br>")}
        </div>
        
        <p>추가 문의사항이 있으시면 언제든지 연락주시기 바랍니다.</p>
        
        <div class="contact-info">
            <strong>연락처 정보</strong><br>
            📍 주소: 1952 Gallows Rd, Vienna, VA 22182<br>
            📞 전화: +1 (703) 123-4567<br>
            ✉️ 이메일: contact@kictgroup.com<br>
            🕒 운영시간: 월-금 09:00-18:00
        </div>
    </div>
    
    <div class="footer">
        <p>&copy; 2025 KICT Group. All rights reserved.</p>
        <p>이 메일은 발신전용입니다. 회신이 필요하시면 contact@kictgroup.com으로 연락주세요.</p>
    </div>
</body>
</html>
    `;try{return await p.sendMail({from:{name:"KICT Group",address:process.env.SMTP_USER||"contact@kictgroup.com"},to:o,subject:s,html:d,text:i}),await fetch(`${e.url.replace(`/inquiries/${t}/reply`,"/inquiries")}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t,status:"processing",adminReply:i})}),a.NextResponse.json({success:!0,message:"답변이 성공적으로 전송되었습니다.",sentTo:o,sentAt:new Date().toISOString()})}catch(r){return console.error("Email sending failed:",r),await fetch(`${e.url.replace(`/inquiries/${t}/reply`,"/inquiries")}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t,status:"processing",adminReply:i})}),a.NextResponse.json({success:!0,message:"답변이 저장되었습니다. (이메일 전송 실패 - 수동으로 확인 필요)",warning:"이메일 전송에 실패했습니다. SMTP 설정을 확인해주세요.",savedReply:i})}}catch(e){return console.error("POST /api/inquiries/[id]/reply error:",e),a.NextResponse.json({success:!1,message:"답변 처리 중 오류가 발생했습니다."},{status:500})}}let u=new i.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/inquiries/route",pathname:"/api/inquiries",filename:"route",bundlePath:"app/api/inquiries/route"},resolvedPagePath:"D:\\0_프로그램개발\\Github\\marinebiogroup\\src\\app\\api\\inquiries\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:c,staticGenerationAsyncStorage:l,serverHooks:x}=u,g="/api/inquiries/route";function m(){return(0,n.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:l})}}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[948,972,245],()=>t(628));module.exports=s})();