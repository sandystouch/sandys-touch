(function(){
const ls={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};
let S=window.SHOP;
if(location.search.includes('preview')){try{const d=JSON.parse(ls.get('shop_draft'));if(d)S=d}catch(e){}}
const $=s=>document.querySelector(s),st=S.settings,th=S.theme,b=S.banner;
const R=document.documentElement.style;
R.setProperty('--primary',th.primary);R.setProperty('--accent',th.accent);R.setProperty('--bg',th.background);R.setProperty('--text',th.text);R.setProperty('--r',th.radius+'px');R.setProperty('--cols',th.columns);
const fonts=['Amiri:wght@400;700','Montserrat:wght@600;700'];if(th.font&&th.font!=='system'){fonts.push(th.font.replace(/ /g,'+')+':wght@400;500;700;800');document.body.style.fontFamily="'"+th.font+"',system-ui,sans-serif"}
const l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family='+fonts.join('&family=')+'&display=swap';document.head.appendChild(l);
document.title=st.name+(st.nameAr?' - '+st.nameAr:'')+' | '+st.tagline;
const I={
 flower:'<svg viewBox="0 0 24 24"><g opacity=".92"><circle cx="12" cy="5.5" r="4"/><circle cx="12" cy="5.5" r="4" transform="rotate(72 12 12)"/><circle cx="12" cy="5.5" r="4" transform="rotate(144 12 12)"/><circle cx="12" cy="5.5" r="4" transform="rotate(216 12 12)"/><circle cx="12" cy="5.5" r="4" transform="rotate(288 12 12)"/></g><circle cx="12" cy="12" r="2.8" fill="#c9a063"/></svg>',
 bag:'<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 13H6z"/><path d="M9 8V7a3 3 0 016 0v1" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
 wa:'<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 00-8.600 15L2 22l5.200-1.400A10 10 0 1012 2zm5.200 14.200c-.2.600-1.300 1.200-1.800 1.200-.5.100-1 .2-3.300-.7-2.800-1.100-4.600-4-4.700-4.200-.1-.2-1.100-1.500-1.100-2.800s.7-2 1-2.300c.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.9 2.100c.1.200.1.400 0 .5l-.4.600-.3.400c-.1.200-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.100 1 2.100 1.300 2.400 1.500.3.100.5.100.6-.1l.9-1.100c.2-.3.400-.2.600-.1l2 1c.3.100.5.200.5.300.1.200.1.800-.1 1.400z"/></svg>',
 tg:'<svg viewBox="0 0 24 24"><path d="M21.500 3.500L2.800 10.700c-.9.400-.9 1.200 0 1.400l4.800 1.500 1.800 5.600c.2.600.4.800.9.800s.7-.2 1-.5l2.300-2.200 4.700 3.500c.9.500 1.500.2 1.700-.8l3.100-14.600c.3-1.200-.5-1.800-1.600-1.400zM8.800 13l9.700-6.100c.5-.3.9-.1.600.2l-8.100 7.300-.3 3.600L8.800 13z"/></svg>',
 star:'<svg viewBox="0 0 24 24"><path d="M12 2l3 6.500 7 .8-5.200 4.800 1.400 7L12 17.600 5.800 21.100l1.400-7L2 9.300l7-.8z"/></svg>',
 truck:'<svg viewBox="0 0 24 24"><path d="M1 5h13v11H1zM14 8h5l4 4v4h-9zM6 20a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4z"/></svg>',
 leaf:'<svg viewBox="0 0 24 24"><path d="M20 3C9 3 4 9 4 15c0 1.500.4 2.800 1 4 1.500-4 5-7 9-8-4 2-7 6-8 10 .6.300 1.300.600 2 .8C17 21 21 14 20 3z"/></svg>',
 gift:'<svg viewBox="0 0 24 24"><path d="M3 8h18v4H3zM4 13h16v8H4zM11 8h2v13h-2zM12 8C9 8 7 4 9.500 3.500 11 3.200 12 6 12 8zm0 0c0-2 1-4.800 2.500-4.500C17 4 15 8 12 8z"/></svg>',
 cash:'<svg viewBox="0 0 24 24"><path d="M2 6h20v12H2zm10 2.500a3.500 3.500 0 100 7 3.500 3.500 0 000-7z"/></svg>'
};
const money=n=>Number(n).toLocaleString('ar-EG')+' '+st.currency;
let area=(st.areas&&st.areas[0]||{}).name;let cat='الكل',q='',cart=(function(){try{return JSON.parse(ls.get('cart')||'{}')}catch(e){return {}}})();
const vis=()=>S.products.filter(p=>p.hidden!==true);
const pic=p=>p.image?`<img loading="lazy" src="${p.image}" alt="${p.name}">`:I.flower.replace('<svg','<svg class="ph"');
const card=p=>`<div class="card">${p.badge?`<span class="badge">${p.badge}</span>`:''}<div class="pic">${pic(p)}</div>
 <div class="info"><h3>${p.name}</h3><small>${p.desc||''}</small><div class="price">${p.oldPrice?`<s>${money(p.oldPrice)}</s>`:''}${money(p.price)}</div>
 <button class="add" data-id="${p.id}">أضف للسلة</button></div></div>`;
const heroBg=b.image?`style="background-image:url('${b.image}')"`:'style="background-image:linear-gradient(135deg,#6b2340,#b4465f)"';
const X=Object.assign({navOffers:'العروض',navOcc:'المناسبات',navShop:'المنتجات',navWhy:'ليه إحنا',navReviews:'آراء العملاء',cta:'اطلب دلوقتي',btn2:'شوف العروض',offersTitle:'عروض مميزة',offersSub:'أسعار مخفّضة لفترة محدودة',occTitle:'اختار حسب المناسبة',occSub:'إحنا جاهزين لكل لحظة حلوة',shopTitle:'كل المنتجات',shopSub:'اضغط "أضف للسلة" وكمّل الطلب في دقيقة',whyTitle:'ليه تختارنا؟',reviewsTitle:'بيقولوا إيه عننا',strip1:'ورد طازة كل يوم',strip2:'توصيل سريع',strip3:'تغليف فاخر',strip4:'الدفع عند الاستلام',footerNote:''},S.texts||{});const AB=S.about||{};
const strip=[[I.leaf,X.strip1],[I.truck,X.strip2],[I.gift,X.strip3],[I.cash,X.strip4]];
const offers=vis().filter(p=>p.oldPrice>0);
$('#root').innerHTML=`${b.show?`<div class="promo">${b.text}</div>`:''}
<header><div class="logo">${st.logo?`<img src="${st.logo}" alt="">`:I.flower}<span>${st.name}</span></div>
<nav><a href="#offers">${X.navOffers}</a><a href="#occasions">${X.navOcc}</a><a href="#shop">${X.navShop}</a><a href="#why">${X.navWhy}</a><a href="#reviews">${X.navReviews}</a></nav>
<button class="cartbtn" id="cb">${I.bag}<span>السلة</span><b id="cc">0</b></button></header>
<div class="hero cover" ${heroBg}></div>
<div class="intro"><small>${st.nameAr||''} • ${st.city}</small><h1>${b.title}</h1><p>${b.subtitle}</p><div class="cta"><a class="btn" href="#shop">${b.button}</a><a class="btn o" href="#offers">${X.btn2}</a></div></div>
<div class="strip">${strip.map(s=>`<div>${s[0]}${s[1]}</div>`).join('')}</div>
${offers.length?`<section id="offers" class="rv"><div class="sh"><h2>${X.offersTitle}</h2><p>${X.offersSub}</p></div><div class="h-scroll">${offers.map(card).join('')}</div></section>`:''}
<section id="occasions" class="rv"><div class="sh"><h2>${X.occTitle}</h2><p>${X.occSub}</p></div><div class="occ">${(S.occasions||[]).map(o=>`<a data-oc="${o.category}"><img loading="lazy" src="${o.image}" alt=""><span>${o.name}</span></a>`).join('')}</div></section>
<section id="shop" class="rv"><div class="sh"><h2>${X.shopTitle}</h2><p>${X.shopSub}</p></div>
<div class="tools"><input class="search" id="q" placeholder="دوّر على منتج..."><div class="cats" id="cats">${['الكل',...S.categories].map(c=>`<button class="${c===cat?'on':''}" data-c="${c}">${c}</button>`).join('')}</div></div><div class="grid" id="grid"></div></section>
<div class="dark"><section id="why" class="rv"><div class="sh"><h2>${X.whyTitle}</h2></div><div class="why">${(S.why||[]).map((w,i)=>`<div><i>${['١','٢','٣','٤','٥','٦'][i]}</i><b>${w.t}</b><p>${w.d}</p></div>`).join('')}</div></section></div>
${AB.show&&AB.text?`<section id="about" class="rv"><div class="sh"><h2>${AB.title||''}</h2></div><p class="about" style="max-width:640px;margin:0 auto;padding:0 18px;text-align:center;line-height:1.9;white-space:pre-line">${AB.text}</p></section>`:''}
<section id="reviews" class="rv"><div class="sh"><h2>${X.reviewsTitle}</h2></div><div class="revs">${(S.reviews||[]).map(r=>`<div class="rev"><div class="st">${I.star.repeat(r.s||5)}</div><p>${r.t}</p><b>${r.n}</b></div>`).join('')}</div>${st.ordersUrl?`<div class="rvform"><h3>اكتب رأيك</h3><input id="rn" placeholder="اسمك" maxlength="40"><select id="rs"><option value="5">★★★★★</option><option value="4">★★★★</option><option value="3">★★★</option><option value="2">★★</option><option value="1">★</option></select><textarea id="rc" rows="3" maxlength="500" placeholder="رأيك في الورد والخدمة"></textarea><input id="rhp" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px;opacity:0" aria-hidden="true"><button class="btn" id="rsend">ابعت رأيك</button><div id="rmsg"></div></div>`:''}</section>
<footer>${st.logoWhite?`<img src="${st.logoWhite}" alt="${st.name}">`:`<h3>${st.name}</h3>`}${st.nameAr?`<h3>${st.nameAr}</h3>`:''}<div>${st.tagline}</div><a class="btn" id="fwa" href="#">${X.cta}</a><div>${st.deliveryNote}</div>${X.footerNote?`<small>${X.footerNote}</small>`:''}</footer>
<a class="wa-float" id="wa" href="#">${st.channel==='telegram'?I.tg:I.wa}<span>${X.cta}</span></a>
<div class="overlay" id="ov"></div>
<aside class="drawer" id="dr"><h2><span class="serif">سلتك</span><button id="x" style="background:none;font-size:24px">✕</button></h2><div class="items" id="items"></div><div id="fm"></div></aside>`;
const H=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
if(st.ordersUrl){
 fetch(st.ordersUrl+'?action=reviews').then(r=>r.json()).then(j=>{const box=document.querySelector('.revs');if(!box||!j.reviews)return;box.insertAdjacentHTML('beforeend',j.reviews.map(r=>`<div class="rev"><div class="st">${I.star.repeat(Math.max(1,Math.min(5,r.stars|0)))}</div><p>${H(r.comment)}</p><b>${H(r.name)}</b></div>`).join(''))}).catch(()=>{});
 const rb=document.getElementById('rsend');
 if(rb)rb.onclick=()=>{const n=document.getElementById('rn').value.trim(),c=document.getElementById('rc').value.trim(),m=document.getElementById('rmsg');
  if(!n||!c){m.textContent='اكتب اسمك ورأيك';return}
  rb.disabled=true;
  fetch(st.ordersUrl,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({kind:'review',name:n,stars:+document.getElementById('rs').value,comment:c,hp:document.getElementById('rhp').value})}).then(()=>{m.textContent='شكرًا! رأيك هيظهر بعد ما نراجعه.';document.getElementById('rn').value='';document.getElementById('rc').value=''}).catch(()=>{m.textContent='حصل خطأ، جرب تاني.';rb.disabled=false})}
}
function grid(){
 const list=vis().filter(p=>(cat==='الكل'||p.category===cat)&&p.name.includes(q));
 $('#grid').innerHTML=list.length?list.map(card).join(''):'<div class="empty">مفيش منتجات هنا</div>';
}
function setCat(c){cat=c;document.querySelectorAll('#cats button').forEach(x=>x.classList.toggle('on',x.dataset.c===c));grid()}
document.body.onclick=e=>{
 const t=e.target.closest('[data-id],[data-c],[data-oc],[data-p],[data-m]');if(!t)return;const d=t.dataset;
 if(d.c)setCat(d.c);
 if(d.oc){setCat(d.oc);$('#shop').scrollIntoView({behavior:'smooth'})}
 if(d.id&&t.classList.contains('add')){cart[d.id]=(cart[d.id]||0)+1;save();t.textContent='✓ اتضافت';t.classList.add('ok');setTimeout(()=>{t.textContent='أضف للسلة';t.classList.remove('ok')},900)}
 if(d.p){cart[d.p]++;save()}if(d.m){if(--cart[d.m]<=0)delete cart[d.m];save()}
};
$('#q').oninput=e=>{q=e.target.value;grid()};
$('#cb').onclick=$('#wa').onclick=$('#fwa').onclick=e=>{e.preventDefault();open_(true)};$('#x').onclick=$('#ov').onclick=()=>open_(false);
function open_(o){$('#dr').classList.toggle('open',o);$('#ov').classList.toggle('open',o);if(o)cartUI()}
function save(){ls.set('cart',JSON.stringify(cart));cartUI()}
const P=id=>S.products.find(p=>p.id==id);
function totals(){let sub=0;Object.entries(cart).forEach(([id,n])=>{const p=P(id);if(p)sub+=p.price*n});const ar=(st.areas||[]).find(x=>x.name===area),base=ar?ar.fee:st.deliveryFee,fee=sub===0?0:(st.freeDeliveryFrom&&sub>=st.freeDeliveryFrom?0:base);return{sub,fee,total:sub+fee}}
function cartUI(){
 const ids=Object.keys(cart).filter(i=>P(i));$('#cc').textContent=ids.reduce((a,i)=>a+cart[i],0);
 const keep=['nm','ph','ad','nt'].map(i=>$('#'+i)&&$('#'+i).value);
 const t=totals();
 $('#items').innerHTML=ids.length?ids.map(i=>{const p=P(i);return`<div class="row">${p.image?`<img src="${p.image}">`:'<span class="ph"></span>'}<span class="n">${p.name}<br><small>${money(p.price)}</small></span><span class="qty"><button data-m="${i}">−</button>${cart[i]}<button data-p="${i}">+</button></span></div>`}).join(''):'<div class="empty">السلة فاضية، ضيف ورد حلو</div>';
 $('#fm').innerHTML=ids.length?`<div class="form"><input id="nm" placeholder="الاسم"><input id="ph" type="tel" placeholder="رقم الموبايل">${(st.areas&&st.areas.length)?`<select id="ar" style="font:inherit;padding:11px 14px;border:1px solid #0002;border-radius:12px;background:#fff">${st.areas.map(x=>`<option ${x.name===area?'selected':''}>${x.name}</option>`).join('')}</select>`:''}<textarea id="ad" rows="2" placeholder="العنوان بالتفصيل"></textarea><input id="nt" placeholder="ملاحظات / كارت إهداء (اختياري)">
 <div class="sum"><span>المنتجات</span><span>${money(t.sub)}</span></div><div class="sum"><span>التوصيل</span><span>${t.fee?money(t.fee):'مجاني'}</span></div><div class="sum t"><span>الإجمالي</span><span>${money(t.total)}</span></div>
 <button class="send ${st.channel==='telegram'?'tg':''}" id="go">${st.channel==='telegram'?I.tg+' ابعت الطلب على تليجرام':I.wa+' ابعت الطلب على واتساب'}</button><small style="text-align:center;color:#888">الدفع عند الاستلام</small></div>`:'';
 ['nm','ph','ad','nt'].forEach((i,k)=>{if($('#'+i)&&keep[k])$('#'+i).value=keep[k]});
 if($('#ar'))$('#ar').onchange=e=>{area=e.target.value;cartUI()};
 if($('#go'))$('#go').onclick=send;
}
function send(){
 const nm=$('#nm').value.trim(),ph=$('#ph').value.trim(),ad=$('#ad').value.trim();
 if(!nm||!ph||!ad){alert('من فضلك اكتب الاسم والموبايل والعنوان');return}
 const t=totals(),L=Object.keys(cart).filter(i=>P(i)).map(i=>`• ${P(i).name} × ${cart[i]} = ${money(P(i).price*cart[i])}`);
 const msg=`🌸 طلب جديد من ${st.name}${st.nameAr?' ('+st.nameAr+')':''}\n\n${L.join('\n')}\n\nالمنتجات: ${money(t.sub)}\nالتوصيل: ${t.fee?money(t.fee):'مجاني'}\nالإجمالي: ${money(t.total)}\n\n👤 الاسم: ${nm}\n📞 الموبايل: ${ph}\n📍 المنطقة: ${area||st.city}\n🏠 العنوان: ${ad}${$('#nt').value?'\n📝 '+$('#nt').value:''}`;
 if(st.ordersUrl){try{fetch(st.ordersUrl,{method:'POST',mode:'no-cors',keepalive:true,headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({name:nm,phone:ph,area:area||st.city||'',address:ad,note:$('#nt').value||'',items:L.join('\n'),subtotal:t.sub,delivery:t.fee,total:t.total,hp:''})})}catch(e){}}
 if(st.channel==='telegram'){navigator.clipboard&&navigator.clipboard.writeText(msg);alert('تم نسخ الطلب. الصقه في المحادثة وابعته.');location.href='https://t.me/'+st.telegram}
 else location.href='https://wa.me/'+st.whatsapp+'?text='+encodeURIComponent(msg);
}
grid();cartUI();
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.08});document.querySelectorAll('.rv').forEach(x=>io.observe(x))}else document.querySelectorAll('.rv').forEach(x=>x.classList.add('in'));
})();
