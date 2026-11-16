/* Road to Secret Wars - behaviour.
 * Same engine as The Doomsday Protocol. Reads PARTS / DOMES / POSTERS /
 * COMPOSED from data.js, which must already have loaded.
 */
(function(){
"use strict";

/* Honour the OS "reduce motion" setting for programmatic scrolling too. */
var RM = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
function sb(){ return (RM && RM.matches) ? 'auto' : 'smooth'; }

/* ============================================================
   BATTLEWORLD, INSIDE THE MARK
   A patchwork planet: Voronoi cells welded together with dark seams,
   each cell faintly tinted as if cut from a different universe.
   Outside the ring, the leftovers drift as shards. Seeded, so it is
   identical on every load.
   ============================================================ */
(function buildWorld(){
  var cellsG=document.getElementById('paneCells'),
      seamsG=document.getElementById('paneSeams');
  if(!cellsG||!seamsG) return;
  var seed=20271217;
  function rnd(){ seed=(seed*1664525+1013904223)%4294967296; return seed/4294967296; }

  // --- sites: spread across the disc, never too close together
  var sites=[], tries=0;
  while(sites.length<44 && tries<4000){
    tries++;
    var a=rnd()*Math.PI*2, r=Math.sqrt(rnd())*190;
    var x=300+Math.cos(a)*r, y=300+Math.sin(a)*r, ok=true;
    for(var i=0;i<sites.length;i++){
      var dx=sites[i][0]-x, dy=sites[i][1]-y;
      if(dx*dx+dy*dy<30*30){ ok=false; break; }
    }
    if(ok) sites.push([x,y]);
  }

  // --- each cell = the square clipped by the bisector with every other site
  function clip(poly,px,py,nx,ny){        // keep points where (p-P)·n <= 0
    var out=[];
    for(var k=0;k<poly.length;k++){
      var A=poly[k], B=poly[(k+1)%poly.length];
      var da=(A[0]-px)*nx+(A[1]-py)*ny, db=(B[0]-px)*nx+(B[1]-py)*ny;
      if(da<=0) out.push(A);
      if((da<=0)!==(db<=0)){
        var t=da/(da-db);
        out.push([A[0]+(B[0]-A[0])*t, A[1]+(B[1]-A[1])*t]);
      }
    }
    return out;
  }
  var TINTS=['#ffd98a','#8fdcff','#ff8fb4','#c9a2ff','#9dffd2','#ffffff','#ffb07a','#2a0f52','#140628'];
  var cells=[], seams=[], cores=[];
  sites.forEach(function(s,si){
    var poly=[[100,100],[500,100],[500,500],[100,500]];
    sites.forEach(function(o,oi){
      if(oi===si||!poly.length) return;
      poly=clip(poly,(s[0]+o[0])/2,(s[1]+o[1])/2,o[0]-s[0],o[1]-s[1]);
    });
    if(poly.length<3) return;
    var d='M'+poly.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' L')+' Z';
    var tint=TINTS[Math.floor(rnd()*TINTS.length)];
    var dark=(tint==='#2a0f52'||tint==='#140628');
    cells.push('<path d="'+d+'" fill="'+tint+'" opacity="'+(dark?(0.30+rnd()*0.30):(0.06+rnd()*0.22)).toFixed(2)+'"/>');
    // a few cells carry a small dome on their horizon
    if(!dark && rnd()>0.62){
      var rr=7+rnd()*9;
      cells.push('<path d="M'+(s[0]-rr).toFixed(1)+','+s[1].toFixed(1)+' A'+rr.toFixed(1)+','+(rr*0.86).toFixed(1)+' 0 0 1 '+
                 (s[0]+rr).toFixed(1)+','+s[1].toFixed(1)+'" fill="none" stroke="#fbf0ff" stroke-width="1.3" opacity="'+(0.18+rnd()*0.22).toFixed(2)+'"/>');
    }
    seams.push('<path d="'+d+'" stroke="#11051f" stroke-width="'+(2.6+rnd()*2.6).toFixed(1)+'" opacity="'+(0.55+rnd()*0.3).toFixed(2)+'"/>');
    seams.push('<path d="'+d+'" stroke="#f2e2ff" stroke-width="0.7" opacity="'+(0.10+rnd()*0.12).toFixed(2)+'"/>');
  });
  // hot cores glowing through the patchwork
  for(var c=0;c<20;c++){
    var ca=rnd()*Math.PI*2, cr=rnd()*150, cx=300+Math.cos(ca)*cr, cy=320+Math.sin(ca)*cr*0.86;
    cores.push('<ellipse cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" rx="'+(9+rnd()*24).toFixed(1)+'" ry="'+(12+rnd()*30).toFixed(1)+'" '+
               'transform="rotate('+(rnd()*180).toFixed(0)+' '+cx.toFixed(1)+' '+cy.toFixed(1)+')" fill="#f6e8ff" opacity="'+(0.05+rnd()*0.15).toFixed(2)+'"/>');
  }
  cellsG.innerHTML=cells.join('')+cores.join('');
  seamsG.innerHTML=seams.join('');

  // --- shards: pieces of dead universes drifting outside the ring
  function shard(cx,cy,size){
    var n=3+Math.floor(rnd()*3), pts=[], base=rnd()*Math.PI*2;
    for(var k=0;k<n;k++){
      var ang=base+(k/n)*Math.PI*2+(rnd()-0.5)*0.9, rad=size*(0.5+rnd()*0.7);
      pts.push((cx+Math.cos(ang)*rad).toFixed(1)+','+(cy+Math.sin(ang)*rad).toFixed(1));
    }
    return 'M'+pts.join(' L')+' Z';
  }
  var dim=[], lit=[];
  for(var s2=0;s2<46;s2++){
    var sa=rnd()*Math.PI*2, sr=214+Math.pow(rnd(),0.8)*86;
    var sx=300+Math.cos(sa)*sr*1.08, sy=300+Math.sin(sa)*sr*0.94;
    var sz=4+rnd()*13;
    dim.push('<path d="'+shard(sx,sy,sz)+'" fill="rgba(150,100,230,'+(0.05+rnd()*0.12).toFixed(2)+')" stroke="url(#shardG)" stroke-width="'+(0.8+rnd()*1.1).toFixed(2)+'" opacity="'+(0.35+rnd()*0.5).toFixed(2)+'"/>');
  }
  // stitch lines: the planet's seams carrying on past the ring and fading
  for(var l=0;l<14;l++){
    var la=(l/14)*Math.PI*2+(rnd()-0.5)*0.3, r0=206, r1=260+rnd()*60, bend=(rnd()-0.5)*0.25;
    var x0=300+Math.cos(la)*r0, y0=300+Math.sin(la)*r0;
    var xm=300+Math.cos(la+bend)*(r0+r1)/2, ym=300+Math.sin(la+bend)*(r0+r1)/2;
    var x1=300+Math.cos(la+bend*1.6)*r1, y1=300+Math.sin(la+bend*1.6)*r1;
    lit.push('<path d="M'+x0.toFixed(1)+','+y0.toFixed(1)+' Q'+xm.toFixed(1)+','+ym.toFixed(1)+' '+x1.toFixed(1)+','+y1.toFixed(1)+
             '" stroke="#b48cff" stroke-width="'+(1+rnd()*1.4).toFixed(2)+'" fill="none" stroke-dasharray="'+(3+rnd()*6).toFixed(0)+' '+(4+rnd()*8).toFixed(0)+'" opacity="'+(0.25+rnd()*0.35).toFixed(2)+'"/>');
  }
  document.getElementById('shardsDim').innerHTML=dim.join('');
  document.getElementById('shardsLit').innerHTML=lit.join('');

  // --- etched detailing around the ring band
  var etch=document.getElementById('ringEtch'), ep=[];
  if(etch){
    for(var e2=0;e2<96;e2++){
      var ea=(e2/96)*Math.PI*2, long=(e2%8===0);
      var r1e=long?175:182, r2e=long?201:194;
      ep.push('<path d="M'+(300+Math.cos(ea)*r1e).toFixed(1)+','+(300+Math.sin(ea)*r1e).toFixed(1)+
              ' L'+(300+Math.cos(ea)*r2e).toFixed(1)+','+(300+Math.sin(ea)*r2e).toFixed(1)+
              '" opacity="'+(long?0.55:0.26)+'"/>');
    }
    etch.innerHTML=ep.join('');
  }

  // --- particle field
  var stars=document.getElementById('stars'), sp=[];
  for(var st=0;st<130;st++){
    var ta=rnd()*Math.PI*2, tr=180+rnd()*280;
    sp.push('<circle cx="'+(300+Math.cos(ta)*tr).toFixed(1)+'" cy="'+(300+Math.sin(ta)*tr).toFixed(1)+
            '" r="'+(0.6+rnd()*1.8).toFixed(2)+'" fill="#e2d6f2" opacity="'+(0.10+rnd()*0.42).toFixed(2)+'"/>');
  }
  if(stars) stars.innerHTML=sp.join('');

  /* motes: two seeded tiles of small dark specks */
  (function motes(){
    var layer=document.getElementById('motes'); if(!layer) return;
    var seed2=990617;
    function r2(){ seed2=(seed2*1664525+1013904223)%4294967296; return seed2/4294967296; }
    function tile(size,count,rmin,rmax,alpha){
      var out='';
      for(var i=0;i<count;i++){
        var x=(r2()*size).toFixed(1), y=(r2()*size).toFixed(1);
        var r=(rmin+r2()*(rmax-rmin)).toFixed(2);
        var a=(alpha*(0.35+r2()*0.65)).toFixed(3);
        out+='<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="#000" opacity="'+a+'"/>';
        if(r2()>0.86) out+='<circle cx="'+x+'" cy="'+y+'" r="'+(+r+0.9).toFixed(2)+
          '" fill="none" stroke="#b48cff" stroke-width="0.5" opacity="'+(a*0.5).toFixed(3)+'"/>';
      }
      var svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+size+'" height="'+size+
              '" viewBox="0 0 '+size+' '+size+'">'+out+'</svg>';
      return 'url("data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg).replace(/"/g,'%22')+'")';
    }
    layer.style.backgroundImage=tile(520,46,0.8,2.6,0.85)+', '+tile(340,26,0.5,1.5,0.55);
  })();

  /* Draw the mark once and hand the browser a finished image. Live, this is
     hundreds of paths inside blur filters and every repaint re-runs them. */
  var vec=document.getElementById('emblemWrap');
  (function bakeMark(){
    var layer=document.getElementById('markLayer');
    if(!layer||!vec) return;
    fetch('assets/avengers-a.png').then(function(r){return r.blob();}).then(function(b){
      var fr=new FileReader();
      fr.onload=function(){
        var clone=vec.cloneNode(true);
        clone.removeAttribute('id'); clone.removeAttribute('style'); clone.removeAttribute('class');
        clone.setAttribute('width','1200'); clone.setAttribute('height','1200');
        clone.querySelectorAll('image').forEach(function(im){ im.setAttribute('href',fr.result); });
        var xml=new XMLSerializer().serializeToString(clone);
        var url='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(xml).replace(/"/g,'%22');
        var probe=new Image();
        probe.onload=function(){
          layer.style.backgroundImage='url("'+url+'")';
          vec.classList.add('baked');
        };
        probe.onerror=function(){};          // leave the live SVG showing
        probe.src=url;
      };
      fr.readAsDataURL(b);
    }).catch(function(){});
  })();
})();

/* ============================================================
   BUILD
   Watch entries are keyed by their id; domes by "dome:<id>", because
   a dome and a film can share a name (Apocalypse).
   ============================================================ */
var KEY='roadToSecretWars.v2';
var CORE=[];
PARTS.forEach(function(p){ p.items.forEach(function(it){ it.key=it.id; it.kind='watch'; CORE.push(it); }); });
CORE.forEach(function(it,i){ it.n=i+1; });
DOMES.forEach(function(d){ d.key='dome:'+d.id; d.kind='dome'; });
var DOMEPART={no:'Part IV', title:'The Domes of Battleworld', sub:'22 dossiers · 3 grades',
  blurb:'Tick a dome once you know what it is and where it comes from. Open a row for the dossier: what the dome is, who rules it, the comic it comes from, the case for it on screen, and which titles on the road above explain it.',
  items:DOMES, isDome:true};
var DOMEBYID={}; DOMES.forEach(function(d){ DOMEBYID[d.id]=d; });

/* which rewatch titles explain each dome — derived, never typed twice */
var DOME_SOURCES={};
CORE.forEach(function(it){ (it.domes||[]).forEach(function(id){
  (DOME_SOURCES[id]=DOME_SOURCES[id]||[]).push(it);
}); });

/* Essential + Recommended: the titles Secret Wars actually leans on. */
var EXPERIENCE=CORE.filter(function(i){return i.tier==='essential'||i.tier==='recommended';});

var watched={};
try{ watched=JSON.parse(localStorage.getItem(KEY)||'null'); }catch(e){ watched=null; }
if(!watched || typeof watched!=='object'){
  watched={};
  /* carry ticks over from the first version of this site */
  try{
    var OLD={bnd:'brandnewday',visionquest:'visionquest',doomsday:'doomsday',ddba3:'bornagain3',
             xm97s3:'xmen97s3',anim27:'anim27',reread:'sw2015'};
    var ow=JSON.parse(localStorage.getItem('roadToSecretWars.watched.v1')||'[]');
    var od=JSON.parse(localStorage.getItem('roadToSecretWars.domes.v1')||'[]');
    ow.forEach(function(k){ if(OLD[k]) watched[OLD[k]]=1; });
    od.forEach(function(k){ if(DOMEBYID[k]) watched['dome:'+k]=1; });
    if(Object.keys(watched).length) localStorage.setItem(KEY,JSON.stringify(watched));
  }catch(e){ /* old data unreadable: start clean */ }
}

var state={filter:'all',q:''};

function hrs(m){return Math.round(m/60);}
function fmtRun(it){
  if(!it.run) return 'TBA';
  if(it.type==='comic') return it.eps+' issues · ~'+hrs(it.run)+'h read';
  if(it.type==='film'||it.type==='special') return it.run+' min';
  return it.eps+' eps · ~'+hrs(it.run)+'h';
}
function typeLabel(t){return t==='film'?'Film':t==='series'?'Series':t==='special'?'Special':t==='comic'?'Comic':'Short';}
function tierLabel(t){
  return t==='essential'?'Essential':t==='recommended'?'Recommended':t==='optional'?'Optional':
         t==='locked'?'Locked in':t==='strong'?'Strong case':'Wildcard';
}
function tierClass(t){ return (t==='essential'||t==='locked')?'ess':(t==='recommended'||t==='strong')?'rec':'opt'; }
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }

var listEl=document.getElementById('list');
var domeEl=document.getElementById('domeList');

var openIds={};
var rendered=[];

function render(){
  rendered=[];
  var shown=renderGroups(PARTS,listEl,false);
  var shownD=renderGroups([DOMEPART],domeEl,true);
  document.getElementById('countNote').textContent='Showing '+shown+' of '+CORE.length+' titles · '+shownD+' of '+DOMES.length+' domes';
  indexRendered();
  updateStats();
}

function renderGroups(groups,target,isDome){
  var html='',shown=0,gi=0;
  groups.forEach(function(part){
    var items=part.items;
    var visible=items.filter(passFilter);
    if(!visible.length){ gi++; return; }
    shown+=visible.length;

    var totalRun=items.reduce(function(s,i){return s+(i.run||0);},0);
    var doneCount=items.filter(function(i){return watched[i.key];}).length;
    var pctPart=Math.round(doneCount/items.length*100);
    var key=(isDome?'d':'p')+(gi++);
    var verb=isDome?'briefed':'done', all=isDome?'Mark all briefed':'Mark all ticked';

    html+='<div class="part'+(isDome?' domes':'')+'" data-part="'+key+'" id="part-'+key+'">';
    html+='<div class="part-head"><div class="no">'+part.no+'</div><h3>'+part.title+'</h3><p>'+part.blurb+'</p></div>';
    html+='<div class="part-meta"><span>'+part.sub+'</span><span>'+items.length+' '+(isDome?'domes':'entries')+'</span>'+
          (isDome?'':'<span>~'+(totalRun<120?totalRun+' min':hrs(totalRun)+' hours')+'</span>')+
          '<span class="pm-done">'+doneCount+'/'+items.length+' '+verb+'</span>'+
          '<button class="mark-all" data-markpart="'+key+'">'+(doneCount===items.length?'Clear this part':all)+'</button></div>';
    html+='<div class="part-bar"><i style="width:'+pctPart+'%"></i></div>';
    html+='<div class="part-list lglass">';
    visible.forEach(function(it){
      html+=entryHTML(it);
      if(it.gate && !state.q && state.filter==='all'){
        html+='<div class="stop"><span class="ico">■</span><div>'+it.gate+'</div></div>';
      }
    });
    html+='</div></div>';
  });

  if(!shown) html='<div class="card empty glass">'+emptyMessage(isDome)+'</div>';
  target.innerHTML=html;
  return shown;
}

function emptyMessage(isDome){
  var pool=isDome?DOMES:CORE;
  if(state.q) return 'No '+(isDome?'dome':'title')+' matches <b>“'+esc(state.q)+'”</b>.';
  if(state.filter==='todo' && !pool.filter(function(i){return !watched[i.key];}).length)
    return isDome ? '<b>Every dome is briefed.</b> You know the map better than most of Battleworld does.'
                  : '<b>Everything is ticked.</b> The whole road is behind you.';
  return 'Nothing here matches the current filter. Switch back to Everything to see it all.';
}

function passFilter(it){
  if(state.q){
    var hay=(it.t+' '+(it.alt||'')+' '+(it.baron||'')).toLowerCase().replace(/&amp;/g,'&');
    if(hay.indexOf(state.q)===-1) return false;
  }
  if(state.filter==='essential' && !(it.tier==='essential'||it.tier==='locked')) return false;
  if(state.filter==='experience' && (it.tier==='optional'||it.tier==='wild')) return false;
  if(state.filter==='todo' && watched[it.key]) return false;
  return true;
}

function entryHTML(it){
  var on=!!watched[it.key], open=!!openIds[it.key];
  var plain=it.t.replace(/&amp;/g,'and').replace(/"/g,'');
  var dome=it.kind==='dome';
  var h='<div class="entry'+(on?' done':'')+(open?' open':'')+'" data-id="'+it.key+'"'+(dome?' id="dome-'+it.id+'"':'')+'>';
  h+= dome ? domePosterHTML(it,plain,on) : posterHTML(it,plain,on);
  h+= '<div class="e-body" role="button" tabindex="0" aria-expanded="'+open+'">';
  h+=  '<div class="e-line1"><span class="e-no">'+(dome?'D':'')+String(it.n).padStart(2,'0')+'</span>';
  h+=   '<span class="e-title">'+it.t+'</span>';
  h+=   '<span class="e-year">'+(dome?it.alt:it.y)+'</span></div>';
  h+=  '<div class="e-line2">';
  if(dome){
    h+= '<span class="tag '+tierClass(it.tier)+'">'+tierLabel(it.tier)+'</span>';
    h+= '<span class="tag run">Baron · '+it.baron+'</span>';
  } else {
    h+= '<span class="tag '+it.type+'">'+typeLabel(it.type)+'</span>';
    h+= '<span class="tag '+tierClass(it.tier)+'">'+tierLabel(it.tier)+'</span>';
    h+= '<span class="tag run">'+fmtRun(it)+'</span>';
    if(it.soon) h+='<span class="tag soon">Not out yet</span>';
  }
  h+=  '</div>';
  h+=  '<div class="detail">';
  if(dome){
    var src=DOME_SOURCES[it.id]||[];
    h+= '<div class="why"><b>What it is</b>'+it.what+'</div>';
    h+= '<div class="dgrid">';
    h+=  '<div><span>Baron</span><em>'+it.baron+'</em></div>';
    h+=  '<div><span>Comes from</span><em>'+it.src+'</em></div>';
    h+=  '<div><span>Grade</span><em>'+tierLabel(it.tier)+'</em></div>';
    h+= '</div>';
    h+= '<div class="dsub"><span>The MCU case</span>'+it.mcu+'</div>';
    if(src.length) h+='<div class="dsub"><span>Watch first · on the road above</span>'+
      src.map(function(s){return '<a href="#" class="golink" data-go="'+s.key+'">'+s.t+'</a>';}).join(' · ')+'</div>';
  } else {
    h+= '<div class="why"><b>Why it is on the road</b>'+it.why+'</div>';
    h+= '<div class="dgrid">';
    h+=  '<div><span>'+(it.type==='comic'?'Written &amp; drawn by':it.type==='series'?'Made by':'Director')+'</span><em>'+it.dir+'</em></div>';
    h+=  '<div><span>Where</span><em>'+it.where+'</em></div>';
    h+=  '<div><span>'+(it.type==='comic'?'Length':'Runtime')+'</span><em>'+fmtRun(it)+'</em></div>';
    h+=  '<div><span>When</span><em>'+(it.when||it.y)+'</em></div>';
    if(it.type!=='comic') h+='<div><span>Post-credits scenes</span><em>'+(it.soon?'Unknown':it.pc)+'</em></div>';
    h+=  '<div><span>Priority</span><em>'+tierLabel(it.tier)+'</em></div>';
    h+= '</div>';
    if(it.watch) h+='<div class="dsub"><span>Watch for</span>'+it.watch+'</div>';
    if(it.ties) h+='<div class="dsub"><span>How it ties in</span>'+it.ties+'</div>';
    if(it.domes && it.domes.length) h+='<div class="dsub"><span>Domes it explains</span>'+
      it.domes.map(function(id){ var d=DOMEBYID[id];
        return '<a href="#" class="golink" data-go="dome:'+id+'">'+d.t+'</a>'; }).join(' · ')+'</div>';
    if(it.note) h+='<div class="dnote">Note: '+it.note+'</div>';
  }
  h+=  '</div>';
  h+= '</div>';
  h+= '<div class="e-caret">&#9656;</div>';
  h+='</div>';
  return h;
}

/* A poster if one exists, otherwise a generated card carrying the title.
   The card sits underneath; a failed image simply uncovers it. */
function posterHTML(it,plain,on){
  var words=plain.replace(/^The\s+/,'').split(/[:—-]/)[0].trim().split(/\s+/);
  var initials=words.slice(0,3).map(function(w){return w[0];}).join('');
  var url=POSTERS[it.id], theme=COMPOSED[it.id];
  var h='<button type="button" class="cb e-poster'+(theme?' composed':'')+(on?' on':'')+'"'+
        ' data-cb="'+it.key+'" role="checkbox" aria-checked="'+on+'"'+
        ' aria-label="Mark '+plain+' as '+(it.type==='comic'?'read':'watched')+'"'+
        (theme?' style="--pt:'+theme+'"':'')+'>';
  h+= '<span class="pfall"><b>'+initials.toUpperCase()+'</b><i>'+plain+'</i><u>'+it.y+'</u></span>';
  if(url){
    if(theme){
      h+= '<span class="pwash"></span>';
      h+= '<img class="plogo" src="'+url+'" alt="" loading="lazy" decoding="async" '+
          'referrerpolicy="no-referrer" onerror="this.remove()">';
      h+= '<span class="pyear">'+(/— Season (\d)/.test(it.t)?'S'+it.t.match(/— Season (\d)/)[1]+' · ':'')+it.y+'</span>';
    } else {
      h+= '<img src="'+url+'" alt="" loading="lazy" decoding="async" '+
          'referrerpolicy="no-referrer" onerror="this.remove()">';
    }
  }
  h+= '<span class="ptick" aria-hidden="true"></span>';
  h+='</button>';
  return h;
}

/* Domes have no poster in existence, so each gets a designed one-sheet:
   its own tinted sky, a dome on the horizon, its number and its name. */
function domePosterHTML(d,plain,on){
  var h='<button type="button" class="cb e-poster domep t-'+d.tier+(on?' on':'')+'"'+
        ' data-cb="'+d.key+'" role="checkbox" aria-checked="'+on+'"'+
        ' aria-label="Mark '+plain+' as briefed" style="--pt:'+d.pt+'">';
  h+= '<span class="dp-sky"></span>';
  h+= '<span class="dp-dome"></span>';
  h+= '<span class="dp-n">'+String(d.n).padStart(2,'0')+'</span>';
  h+= '<span class="dp-name">'+d.t.replace(/^The /,'')+'</span>';
  h+= '<span class="ptick" aria-hidden="true"></span>';
  h+='</button>';
  return h;
}

/* One delegated listener per container, bound once */
function delegate(root){
  root.addEventListener('click',function(e){
    var cb=e.target.closest('.cb');
    if(cb){ e.preventDefault(); e.stopPropagation(); toggle(cb.dataset.cb); return; }
    var go=e.target.closest('.golink');
    if(go){ e.preventDefault(); e.stopPropagation(); goTo(go.dataset.go); return; }
    var mark=e.target.closest('[data-markpart]');
    if(mark){ markPart(mark.dataset.markpart); return; }
    var car=e.target.closest('.e-caret');
    if(car){ var en=car.parentNode; setOpen(en,!en.classList.contains('open')); return; }
    var body=e.target.closest('.e-body');
    if(body) setOpen(body.parentNode, !body.parentNode.classList.contains('open'));
  });
  root.addEventListener('keydown',function(e){
    if(e.key!==' ' && e.key!=='Enter') return;
    // .cb and links are real controls: the browser already turns the key into a click
    if(e.target.closest('.cb') || e.target.closest('a')) return;
    var body=e.target.closest('.e-body');
    if(body){ e.preventDefault(); setOpen(body.parentNode, !body.parentNode.classList.contains('open')); }
  });
}
delegate(listEl); delegate(domeEl);

function setOpen(entry,open){
  entry.classList.toggle('open',open);
  entry.querySelector('.e-body').setAttribute('aria-expanded',open);
  if(open) openIds[entry.dataset.id]=1; else delete openIds[entry.dataset.id];
}

/* jump from a cross-link to the entry it names, and open it */
function goTo(key){
  var el=document.querySelector('.entry[data-id="'+key+'"]');
  if(!el){   // hidden by a filter or search: clear them, then try again
    state.filter='all'; state.q=''; searchEl.value=''; searchSticky.value='';
    document.querySelectorAll('[data-filter]').forEach(function(x){x.classList.toggle('on',x.dataset.filter==='all');});
    render();
    el=document.querySelector('.entry[data-id="'+key+'"]');
  }
  if(!el) return;
  setOpen(el,true);
  el.scrollIntoView({behavior:sb(),block:'center'});
  el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
}

function save(){ try{ localStorage.setItem(KEY,JSON.stringify(watched)); }catch(e){} }

/* Surgical: touch only the affected rows and counters. */
function toggle(key){
  if(watched[key]) delete watched[key]; else watched[key]=1;
  save(); paintEntry(key); refreshCounters(); updateStats();
  if(state.filter==='todo') render();
}

function paintEntry(key){
  var on=!!watched[key];
  document.querySelectorAll('.entry[data-id="'+key+'"]').forEach(function(e){
    e.classList.toggle('done',on);
    var cb=e.querySelector('.cb');
    if(cb){ cb.classList.toggle('on',on); cb.setAttribute('aria-checked',on); }
  });
}

function indexRendered(){
  rendered=[];
  PARTS.concat([DOMEPART]).forEach(function(part){
    var el=null;
    document.querySelectorAll('.part').forEach(function(p){
      var h=p.querySelector('.part-head h3');
      if(h && h.textContent===part.title.replace(/&amp;/g,'&')) el=p;
    });
    if(el) rendered.push({part:part,el:el});
  });
}

function refreshCounters(){
  rendered.forEach(function(r){
    var items=r.part.items, dome=!!r.part.isDome;
    var done=items.filter(function(i){return watched[i.key];}).length;
    var pct=Math.round(done/items.length*100);
    var lbl=r.el.querySelector('.pm-done'), bar=r.el.querySelector('.part-bar i'),
        btn=r.el.querySelector('[data-markpart]');
    if(lbl) lbl.textContent=done+'/'+items.length+(dome?' briefed':' done');
    if(bar) bar.style.width=pct+'%';
    if(btn) btn.textContent=(done===items.length?'Clear this part':(dome?'Mark all briefed':'Mark all ticked'));
  });
}

function markPart(key){
  var el=document.querySelector('.part[data-part="'+key+'"]'); if(!el) return;
  var r=null; rendered.forEach(function(x){ if(x.el===el) r=x; });
  if(!r) return;
  var items=r.part.items;
  var allDone=items.every(function(i){return watched[i.key];});
  items.forEach(function(i){ if(allDone) delete watched[i.key]; else watched[i.key]=1; });
  save();
  items.forEach(function(i){ paintEntry(i.key); });
  refreshCounters(); updateStats();
  if(state.filter==='todo') render();
  toast(allDone?'Part cleared':(r.part.isDome?'Every dome marked briefed':'Part marked as ticked'));
}

/* ============================================================
   STATS
   ============================================================ */
var DOOMSDAY=new Date('2026-12-18T00:00:00');
var SECRETWARS=new Date('2027-12-17T00:00:00');

function pick(pct,arr){ return arr[pct>=100?6 : pct>=90?5 : pct>=75?4 : pct>=50?3 : pct>=25?2 : pct>0?1 : 0]; }

function updateStats(){
  var done=CORE.filter(function(i){return watched[i.key];});
  var totalMin=CORE.reduce(function(s,i){return s+i.run;},0);
  var doneMin=done.reduce(function(s,i){return s+i.run;},0);
  var leftMin=totalMin-doneMin;
  var pct=Math.round(done.length/CORE.length*100);

  document.getElementById('pct').textContent=pct+'%';
  document.getElementById('barFill').style.width=pct+'%';
  document.getElementById('sDone').textContent=done.length+' / '+CORE.length;
  document.getElementById('sHoursDone').textContent=hrs(doneMin)+'h';
  document.getElementById('sHoursLeft').textContent=hrs(leftMin)+'h';

  var daysLeft=Math.max(0,Math.ceil((SECRETWARS-new Date())/86400000));
  var weeksLeft=Math.max(1,Math.ceil(daysLeft/7));
  document.getElementById('sWeeks').textContent=Math.ceil(daysLeft/7);
  document.getElementById('sPace').textContent=(leftMin/60/weeksLeft).toFixed(1)+'h';
  document.getElementById('sDaily').textContent=Math.round(leftMin/Math.max(1,daysLeft))+'m';

  document.getElementById('pcMsg').textContent=pick(pct,[
    'Nothing ticked yet. The road starts at the last mile before Doomsday.',
    'Started. There is a whole year for this — no rush.',
    'A quarter of the road behind you.',
    'Halfway. You will recognise half of Battleworld on sight.',
    'Three quarters done. Mostly rewatches left.',
    'Almost there. A handful of titles to go.',
    'Road complete. See you on 17 December 2027.'
  ]);

  var expDone=EXPERIENCE.filter(function(i){return watched[i.key];});
  var expTotalMin=EXPERIENCE.reduce(function(a,i){return a+i.run;},0);
  var expDoneMin=expDone.reduce(function(a,i){return a+i.run;},0);
  var expLeftMin=expTotalMin-expDoneMin;
  var expPct=Math.round(expDone.length/EXPERIENCE.length*100);
  document.getElementById('expPct').textContent=expPct+'%';
  document.getElementById('expFill').style.width=expPct+'%';
  document.getElementById('expDone').textContent=expDone.length+' / '+EXPERIENCE.length;
  document.getElementById('expLeft').textContent=hrs(expLeftMin)+'h';
  document.getElementById('expPace').textContent=Math.round(expLeftMin/Math.max(1,daysLeft))+'m';
  document.getElementById('expMsg').textContent=pick(expPct,[
    'Nothing ticked yet. '+EXPERIENCE.length+' titles stand between you and the must-sees.',
    'Started. This is the set Secret Wars actually leans on.',
    'A quarter of what matters is behind you.',
    'Halfway through the must-sees.',
    'Three quarters. The rest is mostly the gap-year shows.',
    'Nearly there — only a handful of the ones that matter left.',
    'Must-sees done. Anything else is for the love of it.'
  ]);
  document.getElementById('srExp').textContent=
    expPct+' per cent of the must-sees ticked, '+expDone.length+' of '+EXPERIENCE.length+'.';
  document.getElementById('srProgress').textContent=
    pct+' per cent complete. '+done.length+' of '+CORE.length+' entries ticked, '+hrs(leftMin)+' hours remaining.';

  // --- Battleworld briefing
  var dDone=DOMES.filter(function(d){return watched[d.key];});
  var dPct=Math.round(dDone.length/DOMES.length*100);
  document.getElementById('domePct').textContent=dPct+'%';
  document.getElementById('domeFill').style.width=dPct+'%';
  ['locked','strong','wild'].forEach(function(t,ti){
    var all=DOMES.filter(function(d){return d.tier===t;});
    var on=all.filter(function(d){return watched[d.key];});
    document.getElementById(['dLocked','dStrong','dWild'][ti]).textContent=on.length+' / '+all.length;
  });
  document.getElementById('domeMsg').textContent=pick(dPct,[
    'Nothing briefed yet. Start with the three that are locked in.',
    'Briefing started. Every dome you know is one fewer surprise.',
    'A quarter of the map memorised.',
    'Half of Battleworld briefed.',
    'Three quarters. Only the wildcards left, probably.',
    'Almost the whole map.',
    'All 22 domes briefed. Sheriff Strange would be impressed.'
  ]);

  updatePlanner(leftMin);
}

function updatePlanner(leftMin){
  var el=document.getElementById('targetDate');
  var out=document.getElementById('plannerOut');
  if(!el.value){ out.textContent='—'; return; }
  var d=new Date(el.value+'T00:00:00');
  var days=Math.ceil((d-new Date())/86400000);
  if(isNaN(days)){ out.textContent='—'; return; }
  if(days<=0){ out.textContent='That date has passed.'; return; }
  if(leftMin<=0){ out.textContent='Nothing left to watch.'; return; }
  var perDay=leftMin/days;
  out.textContent=Math.round(perDay)+' min/day for '+days+' days ('+(perDay/60).toFixed(1)+'h daily)';
}
document.getElementById('targetDate').addEventListener('change',function(){ updateStats(); });

/* ============================================================
   COUNTDOWN
   ============================================================ */
var cdTarget=SECRETWARS;
var LABELS={
  '2027-12-17T00:00:00':'17 December 2027',
  '2026-12-18T00:00:00':'18 December 2026 · the gate'
};
/* once Doomsday is out, its chip has nothing left to count */
if(new Date()>DOOMSDAY){
  var ddBtn=document.querySelector('#cdSwitch [data-t="2026-12-18T00:00:00"]');
  if(ddBtn) ddBtn.remove();
}
document.getElementById('cdSwitch').addEventListener('click',function(e){
  var b=e.target.closest('button'); if(!b) return;
  document.querySelectorAll('#cdSwitch button').forEach(function(x){x.classList.remove('on');});
  b.classList.add('on');
  cdTarget=new Date(b.dataset.t);
  document.getElementById('cdTarget').textContent=LABELS[b.dataset.t];
  tick();
});

function paint(prefix,target){
  var diff=target-new Date();
  if(diff<0) diff=0;
  var s=Math.floor(diff/1000);
  document.getElementById(prefix+'D').textContent=Math.floor(s/86400);
  document.getElementById(prefix+'H').textContent=String(Math.floor(s%86400/3600)).padStart(2,'0');
  document.getElementById(prefix+'M').textContent=String(Math.floor(s%3600/60)).padStart(2,'0');
  document.getElementById(prefix+'S').textContent=String(s%60).padStart(2,'0');
}
function tick(){ paint('cd',cdTarget); paint('sw',SECRETWARS); }
tick(); setInterval(tick,1000);

document.getElementById('swGap').textContent=Math.round((SECRETWARS-DOOMSDAY)/86400000)+' days';

/* ============================================================
   CONTROLS
   ============================================================ */
document.querySelectorAll('[data-filter]').forEach(function(b){
  b.addEventListener('click',function(){
    document.querySelectorAll('[data-filter]').forEach(function(x){x.classList.remove('on');});
    b.classList.add('on'); state.filter=b.dataset.filter; render();
  });
});
var searchEl=document.getElementById('search');
var searchSticky=document.getElementById('searchSticky');
var stickyBar=document.getElementById('stickySearch');

function applySearch(v,from){
  state.q=v.trim().toLowerCase();
  if(from!==searchEl) searchEl.value=v;
  if(from!==searchSticky) searchSticky.value=v;
  render();
}
searchEl.addEventListener('input',function(){ applySearch(searchEl.value,searchEl); });
searchSticky.addEventListener('input',function(){ applySearch(searchSticky.value,searchSticky); });

/* the bare search tile follows you down; everything else stays at the top */
var ctlWrap=document.getElementById('controls'), sPending=false;
function stickyCheck(){
  sPending=false;
  var past=ctlWrap.getBoundingClientRect().bottom < 4;
  var listEnd=document.getElementById('listZone').getBoundingClientRect().bottom > 120;
  stickyBar.classList.toggle('show', past && listEnd);
}
addEventListener('scroll',function(){ if(!sPending){ sPending=true; requestAnimationFrame(stickyCheck); } },{passive:true});
addEventListener('resize',stickyCheck);
stickyCheck();

document.getElementById('btnUp').addEventListener('click',function(){
  ctlWrap.scrollIntoView({behavior:sb(),block:'start'});
  setTimeout(function(){ searchEl.focus(); },450);
});

document.addEventListener('keydown',function(e){
  if(e.key!=='/' ) return;
  var a=document.activeElement;
  if(a===searchEl||a===searchSticky) return;
  e.preventDefault();
  (stickyBar.classList.contains('show')?searchSticky:searchEl).focus();
});

function toast(msg){
  var t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(function(){ t.classList.remove('show'); },2200);
}

document.getElementById('btnReset').addEventListener('click',function(){
  if(!confirm('Clear every tick and every briefed dome, and start the road from zero?')) return;
  watched={};
  try{ localStorage.setItem(KEY,'{}'); }catch(e){}
  render(); toast('Progress cleared');
});

/* fold the filter rows away on small screens */
var ctlEl=document.getElementById('controls'), foldBtn=document.getElementById('btnFold');
foldBtn.addEventListener('click',function(){
  var folded=ctlEl.classList.toggle('folded');
  foldBtn.setAttribute('aria-expanded',String(!folded));
  foldBtn.textContent=folded?'Filters':'Hide filters';
});
if(window.innerWidth>760) ctlEl.classList.remove('folded');

/* jump-to-part navigation */
document.getElementById('partNav').innerHTML=PARTS.map(function(p,i){
  return '<button class="chip nav" data-jump="part-p'+i+'">'+p.no.replace('Part ','')+'. '+p.title+'</button>';
}).join('')+'<button class="chip nav" data-jump="domes">IV. The Domes</button>'+
  '<button class="chip nav" data-jump="laws">The Laws</button>';
document.getElementById('partNav').addEventListener('click',function(e){
  var b=e.target.closest('[data-jump]'); if(!b) return;
  var target=document.getElementById(b.dataset.jump);
  if(target) target.scrollIntoView({behavior:sb(),block:'start'});
});

document.getElementById('btnExpFilter').addEventListener('click',function(){
  document.querySelectorAll('[data-filter]').forEach(function(x){x.classList.toggle('on',x.dataset.filter==='experience');});
  state.filter='experience'; render();
  document.getElementById('listZone').scrollIntoView({behavior:sb(),block:'start'});
});

/* save / load progress as a file, so it can move between devices */
document.getElementById('btnExport').addEventListener('click',function(){
  var payload={app:'road-to-secret-wars',version:2,saved:new Date().toISOString(),watched:watched};
  var blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  var a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='road-to-secret-wars-progress.json';
  document.body.appendChild(a); a.click();
  setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); },0);
  toast('Progress saved to a file');
});
document.getElementById('btnImport').addEventListener('click',function(){ document.getElementById('fileIn').click(); });
document.getElementById('fileIn').addEventListener('change',function(e){
  var f=e.target.files && e.target.files[0]; if(!f) return;
  var fr=new FileReader();
  fr.onload=function(){
    try{
      var data=JSON.parse(fr.result);
      var w=(data && data.watched) ? data.watched : data;
      if(!w || typeof w!=='object') throw new Error('shape');
      var valid={},known={},n=0;
      CORE.concat(DOMES).forEach(function(i){ known[i.key]=1; });
      Object.keys(w).forEach(function(k){ if(known[k]){ valid[k]=1; n++; } });
      watched=valid; save(); render();
      toast(n+' ticks restored');
    }catch(err){ toast('That file could not be read'); }
    e.target.value='';
  };
  fr.onerror=function(){ toast('That file could not be read'); e.target.value=''; };
  fr.readAsText(f);
});

document.getElementById('btnShare').addEventListener('click',function(){
  var done=CORE.filter(function(i){return watched[i.key];});
  var dDone=DOMES.filter(function(d){return watched[d.key];});
  var pct=Math.round(done.length/CORE.length*100);
  var daysLeft=Math.max(0,Math.ceil((SECRETWARS-new Date())/86400000));
  var clean=function(i){return '  '+String(i.n).padStart(2,'0')+'. '+i.t.replace(/&amp;/g,'&');};
  var txt='Road to Secret Wars — '+pct+'% of the road ('+done.length+'/'+CORE.length+'), '+
          dDone.length+'/'+DOMES.length+' domes briefed. '+daysLeft+' days until Avengers: Secret Wars.\n\nTicked:\n'+
          (done.length?done.map(clean).join('\n'):'  (nothing yet)')+
          '\n\nDomes briefed:\n'+(dDone.length?dDone.map(function(d){return '  '+d.t;}).join('\n'):'  (none yet)');
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(function(){ toast('Progress copied to clipboard'); },
                                           function(){ toast('Could not copy — clipboard blocked'); });
  } else { toast('Clipboard not available in this browser'); }
});

/* the nineteen domes not given a dossier */
document.getElementById('deepNames').innerHTML=['Dystopia','Limbo','2099','The Hydra Empire','Higher Avalon','Doomgard',
  'Utopolis','New Mars','The Regency','Valley of Doom','The Far West','Valley of Flame','King James’ England',
  'Hala Field','The City','Killville','New Quack City','Marville','Arachnia']
  .map(function(n){return '<span>'+n+'</span>';}).join('');

/* ============================================================
   INSTALL AS AN APP
   ============================================================ */
if('serviceWorker' in navigator){
  addEventListener('load',function(){
    navigator.serviceWorker.register('sw.js',{scope:'./'}).then(function(reg){
      reg.addEventListener('updatefound',function(){
        var w=reg.installing;
        if(w) w.addEventListener('statechange',function(){
          if(w.state==='installed' && navigator.serviceWorker.controller) w.postMessage('skip-waiting');
        });
      });
    }).catch(function(){ /* offline support simply stays off */ });
  });
}

var deferredPrompt=null, installBtn=document.getElementById('btnInstall');
addEventListener('beforeinstallprompt',function(e){
  e.preventDefault(); deferredPrompt=e;
  if(installBtn) installBtn.hidden=false;
});
if(installBtn) installBtn.addEventListener('click',function(){
  if(!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(function(c){
    if(c.outcome==='accepted'){ installBtn.hidden=true; toast('Installing…'); }
    deferredPrompt=null;
  });
});
addEventListener('appinstalled',function(){
  if(installBtn) installBtn.hidden=true;
  toast('Installed. Look for it with your apps.');
});

document.getElementById('stamp').textContent=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
document.getElementById('topTally').textContent=
  CORE.length+' titles · '+DOMES.length+' domes · ~'+hrs(CORE.reduce(function(s,i){return s+i.run;},0))+'h';

render();

/* ============================================================
   PART ONE, ABOVE THE PAGE
   The Doomsday Protocol sits in a full-screen frame directly above this
   page. Opening it and scrolling down by its height happen in the same
   frame, so nobody ever sees it on load: the page opens on Secret Wars,
   and scrolling up past the top arrives at the END of Doomsday (that page
   jumps to its own bottom when it sees ?embed=sw), from where you can keep
   scrolling up through all of it.
   ============================================================ */
/* The first screen of the page (fluid.js): its top quarter is a dark liquid
   of Doomsday's green and black with this site's violet particles flowing
   through it; the rest of the screen carries a faint violet liquid. On
   everywhere, including when this page is shown inside the Doomsday
   Protocol, because that is exactly where the handover is seen. */
(function edgeLiquid(){
  var host=document.getElementById('edgeFluid');
  if(!host) return;
  if(!window.EdgeLiquid){ host.classList.add('no-fluid'); return; }
  try{ window.EdgeLiquid(host,{edge:'top',edgeColor:[0.50,0.95,0.36],ownColor:[0.70,0.55,1.00]}); }catch(err){ host.classList.add('no-fluid'); }
})();

(function partOne(){
  var wrap=document.getElementById('partOne');
  var seam=document.getElementById('seam');
  var back=document.getElementById('p1Back');
  var hint=document.getElementById('p1Hint');
  if(!wrap) return;

  /* Shown inside the Doomsday Protocol (it frames this page below its own,
     ?embed=dd): never put Doomsday above again, and let the "part one"
     controls hand back to the page around us instead. */
  if(window.parent!==window){
    wrap.remove(); if(seam) seam.remove(); if(back) back.remove();
    function up(e){ if(e) e.preventDefault(); window.parent.postMessage({rtsw:'part-one'},'*'); }
    if(hint){ hint.innerHTML='&#9650; Part one &middot; The Doomsday Protocol is just above'; hint.addEventListener('click',up); }
    document.querySelectorAll('a[href*="whattowatchbeforedoomsday"]').forEach(function(a){
      a.removeAttribute('target'); a.addEventListener('click',up);
    });
    return;
  }

  var LOCAL=/^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  var SRC=(LOCAL?'http://'+location.hostname+':8127/':'https://claude28claude.github.io/whattowatchbeforedoomsday/')+'?embed=sw';
  var ORIGIN=new URL(SRC).origin;

  function jump(y){                // instant, whatever html's scroll-behavior says
    var el=document.documentElement, was=el.style.scrollBehavior;
    el.style.scrollBehavior='auto'; window.scrollTo(0,y); el.style.scrollBehavior=was;
  }
  // H = the Doomsday frame, S = the liquid seam; Secret Wars starts at H+S
  var H=0, S=0;
  function measure(){ H=wrap.offsetHeight; S=seam?seam.offsetHeight:0; }
  function start(){ return H+S; }

  /* Open both and place the view in the same frame. The browser's own scroll
     restoration is switched off in <head>, because it would restore a
     position that already counted the frame before the frame exists. So
     this page remembers its own place, relative to the start of Secret Wars,
     and only uses it on a reload or a back/forward visit. */
  var SPOT='roadToSecretWars.spot';
  var nav=(performance.getEntriesByType && performance.getEntriesByType('navigation')[0]||{}).type;
  var saved=null;
  if(nav==='reload'||nav==='back_forward'){ try{ saved=sessionStorage.getItem(SPOT); }catch(e){} }
  wrap.classList.add('on'); if(seam) seam.classList.add('on');
  measure();
  var anchor=location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if(saved!==null && saved!=='' && !isNaN(+saved)) jump(Math.max(0,start()+(+saved)));
  else if(anchor){ jump(0); jump(anchor.getBoundingClientRect().top); }
  else jump(start());
  function remember(){ try{ sessionStorage.setItem(SPOT,String(Math.round(window.scrollY-start()))); }catch(e){} }
  addEventListener('pagehide',remember);

  // keep the reader where they were if the frame or the seam changes height
  if(window.ResizeObserver){
    var ro=new ResizeObserver(function(){
      var before=start(), inPage=window.scrollY>=before-1;
      measure();
      if(inPage && start()!==before) jump(window.scrollY+start()-before);
    });
    ro.observe(wrap); if(seam) ro.observe(seam);
  }

  // load Doomsday once this page is settled, or straight away if someone heads up
  var frame=null;
  function load(){
    if(frame) return;
    frame=document.createElement('iframe');
    frame.title='Part one: The Doomsday Protocol';
    frame.src=SRC;
    frame.addEventListener('load',function(){
      var w=document.getElementById('p1Wait'); if(w) w.remove();
      /* Same address on the live site, so the wheel can be caught inside the
         frame: while the frame is only partly on screen, scrolling up over it
         moves this page (to reveal the rest) instead of the page inside it. */
      try{
        frame.contentWindow.addEventListener('wheel',function(e){
          if(e.deltaY<0 && window.scrollY>0){ e.preventDefault(); snapping=false; window.scrollBy(0,e.deltaY); }
        },{passive:false});
      }catch(err){ /* a different address (local testing): the browser keeps them apart */ }
    });
    wrap.appendChild(frame);
  }
  addEventListener('load',function(){ setTimeout(load,1200); });

  /* an automatic move runs until it arrives, the reader takes over (wheel,
     touch, keys), or the browser says scrolling ended - never on a short
     timer, which cut moves off half way on slow devices */
  var snapT=null, snapping=false, target=0;
  function go(y){ snapping=true; target=y; clearTimeout(snapT); snapT=setTimeout(function(){ snapping=false; },4000);
    scrollTo({top:y,behavior:sb()}); }
  function goUp(){ load(); go(0); }
  function goDown(){ go(start()); }
  ['wheel','touchstart','keydown'].forEach(function(ev){ addEventListener(ev,function(){ snapping=false; },{passive:true}); });
  addEventListener('scrollend',function(){ if(snapping && Math.abs(window.scrollY-target)<2) snapping=false; });
  if(hint) hint.addEventListener('click',goUp);
  if(back) back.addEventListener('click',goDown);
  // links to the Doomsday Protocol on this page scroll up to it instead
  document.querySelectorAll('a[href*="whattowatchbeforedoomsday"]').forEach(function(a){
    a.addEventListener('click',function(e){
      if(e.ctrlKey||e.metaKey||e.shiftKey||e.button!==0) return;   // new-tab clicks still open the real site
      e.preventDefault(); goUp();
    });
  });
  // Doomsday's own "Part two" link, from inside the frame
  addEventListener('message',function(e){
    if(!frame || e.source!==frame.contentWindow || e.origin!==ORIGIN) return;
    if(e.data && e.data.rtsw==='part-two') goDown();
  });

  /* Where scrolling stops decides what happens:
     - the whole liquid seam on screen: stay - that is someone looking at it;
     - otherwise, caught between the two sites: finish the move in the
       direction they were going (a nudge under 60px springs back). */
  var lastY=window.scrollY, dir='down', timer=null, touching=false;
  function settle(){
    if(snapping||touching) return;
    var y=window.scrollY, vh=window.innerHeight, B=start();
    if(y<=1 || y>=B-1) return;
    if(S && y<=H && y+vh>=H+S) return;
    go(dir==='up' ? (B-y>60 ? 0 : B) : (y>60 ? B : 0));
  }
  addEventListener('scroll',function(){
    var y=window.scrollY;
    if(y!==lastY) dir = y<lastY ? 'up' : 'down';
    lastY=y;
    if(y<start()+500) load();
    if(back) back.hidden = y>H*0.5;
    if(snapping && Math.abs(y-target)<2) snapping=false;
    clearTimeout(timer); timer=setTimeout(settle,160);
  },{passive:true});
  addEventListener('touchstart',function(){ touching=true; },{passive:true});
  addEventListener('touchend',function(){ touching=false; clearTimeout(timer); timer=setTimeout(settle,160); },{passive:true});
})();
})();
