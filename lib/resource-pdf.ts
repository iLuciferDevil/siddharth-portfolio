import type { Resource } from './resources';

const W=595;
const H=842;
const INK='0A1018';
const PEARL='ECEFF3';
const WHITE='F2F5F8';
const MUTE='94A1B1';
const BRASS='C69B4E';
const BRASS_LIGHT='EFD9A6';

function safe(value:string){return value.replace(/[\u2018\u2019]/g,"'").replace(/[\u201C\u201D]/g,'"').replace(/[\u2013\u2014]/g,'-').replace(/[^\x20-\x7E]/g,'');}
function esc(value:string){return safe(value).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)');}
function rgb(hex:string){const n=parseInt(hex,16);return `${((n>>16)&255)/255} ${((n>>8)&255)/255} ${(n&255)/255}`;}
function text(cmd:string[],x:number,y:number,size:number,value:string,color=WHITE,font='F1'){cmd.push(`BT /${font} ${size} Tf ${rgb(color)} rg ${x} ${y} Td (${esc(value)}) Tj ET`);}
function wrap(value:string,max:number){const words=safe(value).split(/\s+/);const out:string[]=[];let line='';for(const word of words){const next=line?`${line} ${word}`:word;if(next.length>max&&line){out.push(line);line=word}else line=next}if(line)out.push(line);return out;}

export function buildResourcePdf(resource:Resource){
  const pages:string[][]=[];
  const cover:string[]=[];
  cover.push(`q ${rgb(INK)} rg 0 0 ${W} ${H} re f Q`);
  cover.push(`q ${rgb(BRASS)} rg 0 0 9 ${H} re f Q`);
  text(cover,54,760,11,'SIDDHARTH BHATTACHARJEE',BRASS,'F2');
  text(cover,54,704,42,resource.title,WHITE,'F2');
  let y=650;for(const line of wrap(resource.description,48)){text(cover,54,y,15,line,MUTE);y-=23}
  cover.push(`q ${rgb(BRASS_LIGHT)} rg 54 500 487 2 re f Q`);
  text(cover,54,458,12,'A PRACTICAL WORKING FRAMEWORK',BRASS,'F2');
  y=425;for(const line of wrap(resource.promise,58)){text(cover,54,y,19,line,WHITE,'F2');y-=28}
  text(cover,54,92,11,'siddharthbhattacharjee.in',MUTE,'F1');
  text(cover,54,70,10,'email@siddharthbhattacharjee.in  |  +91 70931 42389',MUTE,'F1');
  pages.push(cover);

  let current:string[]=[];let yPos=760;
  const startPage=()=>{current=[`q ${rgb(PEARL)} rg 0 0 ${W} ${H} re f Q`,`q ${rgb(BRASS)} rg 0 ${H-9} ${W} 9 re f Q`];text(current,48,800,9,'SIDDHARTH BHATTACHARJEE  /  '+resource.category,BRASS,'F2');yPos=758;};
  const finishPage=()=>{text(current,48,30,8,'siddharthbhattacharjee.in', '5D6875');text(current,445,30,8,'Consulting  |  Strategy  |  Growth','5D6875');pages.push(current);};
  startPage();
  for(const section of resource.sections){
    const headingLines=wrap(section.heading,48);
    if(yPos<150){finishPage();startPage();}
    for(const line of headingLines){text(current,48,yPos,19,line,INK,'F2');yPos-=23}
    yPos-=5;
    for(const item of section.items){
      const lines=wrap(item,76);const needed=lines.length*17+13;
      if(yPos-needed<55){finishPage();startPage();}
      current.push(`q ${rgb(BRASS)} rg 48 ${yPos+2} 4 4 re f Q`);
      let yy=yPos;for(const line of lines){text(current,64,yy,11.5,line,'25303A');yy-=17}yPos=yy-13;
    }
    yPos-=13;
  }
  finishPage();

  const finalPage:string[]=[];
  finalPage.push(`q ${rgb(INK)} rg 0 0 ${W} ${H} re f Q`);
  text(finalPage,54,760,11,'THE NEXT QUESTION',BRASS,'F2');
  text(finalPage,54,700,34,'What would this look like',WHITE,'F2');
  text(finalPage,54,660,34,'inside your business?',WHITE,'F2');
  let fy=602;for(const line of wrap('A framework is useful. Applying it to a real business is where the difficult decisions begin.',54)){text(finalPage,54,fy,15,line,MUTE);fy-=23}
  finalPage.push(`q ${rgb(BRASS)} rg 54 500 487 1 re f Q`);
  text(finalPage,54,468,12,'WORK WITH SIDDHARTH',BRASS,'F2');
  fy=432;for(const line of wrap('If you are dealing with a growth, positioning, demand, product marketing, CRM or go-to-market problem, send me a short brief.',56)){text(finalPage,54,fy,15,line,WHITE);fy-=23}
  text(finalPage,54,300,13,'email@siddharthbhattacharjee.in',BRASS_LIGHT,'F2');
  text(finalPage,54,274,13,'+91 70931 42389',BRASS_LIGHT,'F2');
  text(finalPage,54,248,13,'siddharthbhattacharjee.in',BRASS_LIGHT,'F2');
  pages.push(finalPage);

  const objects:string[]=[];
  objects.push('<< /Type /Catalog /Pages 2 0 R >>');
  const pageIds:number[]=[];let next=4;
  for(let i=0;i<pages.length;i++){pageIds.push(next);next+=2;}
  objects.push(`<< /Type /Pages /Kids [${pageIds.map(id=>`${id} 0 R`).join(' ')}] /Count ${pages.length} >>`);
  for(let i=0;i<pages.length;i++){
    const pageId=pageIds[i];const contentId=pageId+1;
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 ${next} 0 R /F2 ${next+1} 0 R >> >> /Contents ${contentId} 0 R >>`);
    const stream=pages[i].join('\n');objects.push(`STREAM:${stream}`);
  }
  const font1Id=next;const font2Id=next+1;
  objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');

  let pdf='%PDF-1.4\n';const offsets:number[]=[0];let objNo=1;
  for(const object of objects){offsets[objNo]=Buffer.byteLength(pdf,'latin1');if(object.startsWith('STREAM:')){const stream=object.slice(7);pdf+=`${objNo} 0 obj\n<< /Length ${Buffer.byteLength(stream,'latin1')} >>\nstream\n${stream}\nendstream\nendobj\n`;}else{pdf+=`${objNo} 0 obj\n${object}\nendobj\n`;}objNo++;}
  const xref=Buffer.byteLength(pdf,'latin1');pdf+=`xref\n0 ${objNo}\n0000000000 65535 f \n`;for(let i=1;i<objNo;i++)pdf+=`${String(offsets[i]).padStart(10,'0')} 00000 n \n`;pdf+=`trailer\n<< /Size ${objNo} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(pdf,'latin1');
}
