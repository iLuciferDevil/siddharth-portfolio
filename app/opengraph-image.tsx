import { ImageResponse } from 'next/og';

export const alt = 'Siddharth Bhattacharjee — Marketing Leader, Strategist & Consultant';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',background:'#f5f5f1',color:'#11110f',padding:'64px 72px',fontFamily:'Arial'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontSize:28,fontWeight:700,letterSpacing:'-1px'}}>SIDDHARTH.</div>
        <div style={{fontSize:18,letterSpacing:'3px',textTransform:'uppercase',color:'#686861'}}>Marketing / Growth / Strategy</div>
      </div>
      <div style={{display:'flex',flexDirection:'column',maxWidth:950}}>
        <div style={{fontSize:76,fontWeight:700,lineHeight:0.98,letterSpacing:'-4px'}}>I turn marketing problems</div>
        <div style={{fontSize:76,fontWeight:700,lineHeight:0.98,letterSpacing:'-4px',color:'#777770'}}>into measurable growth.</div>
        <div style={{display:'flex',marginTop:34,fontSize:24,color:'#4d4d47'}}>Marketing leader · strategist · consultant · 11+ years · Ex-Amazon</div>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontSize:20,color:'#696963'}}>siddharthbhattacharjee.in</div>
        <div style={{background:'#dfff4f',border:'2px solid #11110f',padding:'12px 20px',fontSize:20,fontWeight:700}}>200M+ customers reached</div>
      </div>
    </div>,
    { ...size }
  );
}
