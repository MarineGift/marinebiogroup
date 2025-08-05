"use strict";(()=>{var e={};e.id=386,e.ids=[386],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},1282:e=>{e.exports=require("child_process")},4770:e=>{e.exports=require("crypto")},665:e=>{e.exports=require("dns")},7702:e=>{e.exports=require("events")},2048:e=>{e.exports=require("fs")},2615:e=>{e.exports=require("http")},8791:e=>{e.exports=require("https")},8216:e=>{e.exports=require("net")},9801:e=>{e.exports=require("os")},5315:e=>{e.exports=require("path")},6162:e=>{e.exports=require("stream")},2452:e=>{e.exports=require("tls")},7360:e=>{e.exports=require("url")},1764:e=>{e.exports=require("util")},1568:e=>{e.exports=require("zlib")},6658:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>f,patchFetch:()=>v,requestAsyncStorage:()=>x,routeModule:()=>m,serverHooks:()=>b,staticGenerationAsyncStorage:()=>h});var o={};r.r(o),r.d(o,{GET:()=>g,POST:()=>u});var s=r(9303),a=r(8716),n=r(670),p=r(7070),i=r(5245);let d=[{id:1,name:"김철수",email:"kimcs@example.com",phone:"010-1234-5678",company:"ABC Company",subject:"시스템 개발 문의",message:"안녕하세요. 웹사이트 개발을 의뢰하고 싶습니다. React와 Next.js를 사용한 현대적인 웹사이트를 구축하고 싶고, 관리자 시스템도 포함되어야 합니다. 예산은 500만원 정도로 생각하고 있습니다. 견적을 부탁드립니다.",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),status:"new"}],c=d.length+1,l=()=>i.createTransport({host:process.env.SMTP_HOST||"smtp.gmail.com",port:parseInt(process.env.SMTP_PORT||"587"),secure:!1,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});async function u(e){try{let{name:t,email:r,phone:o,company:s,subject:a,message:n}=await e.json();if(!t||!r||!a||!n)return p.NextResponse.json({success:!1,message:"필수 필드를 모두 입력해주세요."},{status:400});if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r))return p.NextResponse.json({success:!1,message:"올바른 이메일 주소를 입력해주세요."},{status:400});let i={id:c++,name:t.trim(),email:r.trim().toLowerCase(),phone:o?.trim()||null,company:s?.trim()||null,subject:a.trim(),message:n.trim(),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),status:"new"};d.unshift(i);try{let e=l();if(process.env.SMTP_USER&&process.env.SMTP_PASS){let t=`
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>새로운 문의가 접수되었습니다</title>
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
            background: #2563eb;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #ffffff;
            padding: 30px;
            border: 1px solid #e1e5e9;
            border-top: none;
        }
        .info-box {
            background: #f8f9fa;
            border-left: 4px solid #2563eb;
            padding: 15px;
            margin: 15px 0;
            border-radius: 0 5px 5px 0;
        }
        .message-box {
            background: #f1f5f9;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            background: #f8f9fa;
            padding: 15px;
            text-align: center;
            border: 1px solid #e1e5e9;
            border-top: none;
            border-radius: 0 0 10px 10px;
            font-size: 14px;
            color: #6c757d;
        }
        .label {
            font-weight: bold;
            color: #2563eb;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🔔 새로운 문의 접수</h1>
        <p>KICT Group 웹사이트를 통해 새로운 문의가 접수되었습니다.</p>
    </div>
    
    <div class="content">
        <h2>문의자 정보</h2>
        
        <div class="info-box">
            <p><span class="label">문의 번호:</span> #${i.id}</p>
            <p><span class="label">이름:</span> ${i.name}</p>
            <p><span class="label">이메일:</span> ${i.email}</p>
            ${i.phone?`<p><span class="label">전화번호:</span> ${i.phone}</p>`:""}
            ${i.company?`<p><span class="label">회사명:</span> ${i.company}</p>`:""}
            <p><span class="label">문의유형:</span> ${i.subject}</p>
            <p><span class="label">접수일시:</span> ${new Date(i.createdAt).toLocaleString("ko-KR")}</p>
        </div>
        
        <h3>문의 내용</h3>
        <div class="message-box">
            ${i.message.replace(/\n/g,"<br>")}
        </div>
        
        <p style="text-align: center; margin-top: 30px;">
            <a href="${process.env.NEXTAUTH_URL||"http://localhost:3000"}/admin/login" 
               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                관리자 페이지에서 답변하기
            </a>
        </p>
    </div>
    
    <div class="footer">
        <p>이 이메일은 KICT Group 웹사이트에서 자동으로 발송되었습니다.</p>
        <p>관리자 페이지: ${process.env.NEXTAUTH_URL||"http://localhost:3000"}/admin</p>
    </div>
</body>
</html>
        `;await e.sendMail({from:{name:"KICT Group Website",address:process.env.SMTP_USER},to:process.env.ADMIN_EMAIL||process.env.SMTP_USER,subject:`[KICT Group] 새로운 문의: ${i.subject}`,html:t})}}catch(e){console.error("Failed to send admin notification email:",e)}try{let e=l();if(process.env.SMTP_USER&&process.env.SMTP_PASS){let t=`
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>문의 접수 완료</title>
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
        .inquiry-box {
            background: #f8f9fa;
            border-left: 4px solid #2563eb;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 5px 5px 0;
        }
        .contact-info {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
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
        <h2>안녕하세요, ${i.name}님</h2>
        <p>KICT Group에 문의해주셔서 감사합니다.</p>
        <p>귀하의 문의가 성공적으로 접수되었습니다.</p>
        
        <div class="inquiry-box">
            <h3>접수된 문의 정보</h3>
            <p><strong>문의 번호:</strong> #${i.id}</p>
            <p><strong>문의 유형:</strong> ${i.subject}</p>
            <p><strong>접수 일시:</strong> ${new Date(i.createdAt).toLocaleString("ko-KR")}</p>
        </div>
        
        <p>담당자가 검토 후 <strong>1-2 영업일 내</strong>에 답변 드리겠습니다.</p>
        <p>급하신 사항은 아래 연락처로 직접 연락 부탁드립니다.</p>
        
        <div class="contact-info">
            <h3>연락처 정보</h3>
            <p>📍 <strong>주소:</strong> 1952 Gallows Rd, Vienna, VA 22182</p>
            <p>📞 <strong>전화:</strong> +1 (703) 123-4567</p>
            <p>✉️ <strong>이메일:</strong> contact@kictgroup.com</p>
            <p>🕒 <strong>운영시간:</strong> 월-금 09:00-18:00</p>
        </div>
    </div>
    
    <div class="footer">
        <p>&copy; 2025 KICT Group. All rights reserved.</p>
        <p>이 메일은 발신전용입니다. 회신이 필요하시면 contact@kictgroup.com으로 연락주세요.</p>
    </div>
</body>
</html>
        `;await e.sendMail({from:{name:"KICT Group",address:process.env.SMTP_USER},to:i.email,subject:"[KICT Group] 문의 접수 완료 - 감사합니다",html:t})}}catch(e){console.error("Failed to send customer confirmation email:",e)}return p.NextResponse.json({success:!0,message:"문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.",inquiryId:i.id,inquiry:{id:i.id,name:i.name,subject:i.subject,createdAt:i.createdAt}})}catch(e){return console.error("POST /api/contact error:",e),p.NextResponse.json({success:!1,message:"문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."},{status:500})}}async function g(e){try{return p.NextResponse.json({success:!0,message:"문의 접수 API가 정상 작동 중입니다.",endpoint:"/api/contact",methods:["POST"],requiredFields:["name","email","subject","message"],optionalFields:["phone","company"]})}catch(e){return console.error("GET /api/contact error:",e),p.NextResponse.json({success:!1,message:"서버 오류가 발생했습니다."},{status:500})}}let m=new s.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/contact/route",pathname:"/api/contact",filename:"route",bundlePath:"app/api/contact/route"},resolvedPagePath:"D:\\0_프로그램개발\\Github\\marinebiogroup\\src\\app\\api\\contact\\route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:x,staticGenerationAsyncStorage:h,serverHooks:b}=m,f="/api/contact/route";function v(){return(0,n.patchFetch)({serverHooks:b,staticGenerationAsyncStorage:h})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[948,972,245],()=>r(6658));module.exports=o})();