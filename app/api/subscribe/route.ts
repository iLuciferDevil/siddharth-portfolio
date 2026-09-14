import { NextResponse } from 'next/server';

export async function POST(req:Request){
  try{
    const {name,email,source='website',tag} = await req.json();
    if(!email || typeof email!=='string') return NextResponse.json({error:'Please enter a valid email address.'},{status:400});
    const apiKey=process.env.KIT_API_KEY;
    if(!apiKey) return NextResponse.json({error:'Email capture is not connected yet. Add KIT_API_KEY in Vercel Environment Variables.'},{status:503});

    const fields:Record<string,string>={source:String(source)};
    if(process.env.KIT_SOURCE_FIELD_KEY) fields[process.env.KIT_SOURCE_FIELD_KEY]=String(source);

    const create=await fetch('https://api.kit.com/v4/subscribers',{method:'POST',headers:{'Content-Type':'application/json','X-Kit-Api-Key':apiKey},body:JSON.stringify({first_name:name||undefined,email_address:email,state:'active',fields})});
    const created=await create.json();
    if(!create.ok) return NextResponse.json({error:created?.errors?.join?.(', ')||'Kit could not add this subscriber.'},{status:502});

    const tagEnv = tag ? `KIT_TAG_${String(tag).toUpperCase().replace(/[^A-Z0-9]+/g,'_')}_ID` : '';
    const tagId = (tagEnv && process.env[tagEnv]) || process.env.KIT_TAG_ID;
    if(tagId){
      const tagRes=await fetch(`https://api.kit.com/v4/tags/${tagId}/subscribers`,{method:'POST',headers:{'Content-Type':'application/json','X-Kit-Api-Key':apiKey},body:JSON.stringify({email_address:email})});
      if(!tagRes.ok) console.error('Kit tag error',await tagRes.text());
    }
    return NextResponse.json({ok:true});
  }catch(error){
    console.error(error); return NextResponse.json({error:'Unable to subscribe right now.'},{status:500});
  }
}
