import fs from 'fs'
const g = JSON.parse(fs.readFileSync('/tmp/ne_110m_countries.geojson','utf8'))
const ORIGINS = { Romania:'romania', Spain:'spain', Bulgaria:'bulgaria', Greece:'greece', Cyprus:'cyprus' }
const CONTEXT = new Set(["France","Germany","Italy","Portugal","United Kingdom","Ireland","Belgium","Netherlands","Luxembourg","Switzerland","Austria","Poland","Czechia","Slovakia","Hungary","Slovenia","Croatia","Bosnia and Herzegovina","Republic of Serbia","Montenegro","Kosovo","Albania","North Macedonia","Moldova","Ukraine","Belarus","Lithuania","Latvia","Estonia","Denmark","Norway","Sweden","Finland","Turkey","Tunisia","Algeria","Morocco","Malta","Iceland","Russia","Georgia","Armenia","Azerbaijan","Syria","Lebanon","Israel","Palestine","Libya","Egypt","Northern Cyprus"])
const clamp=(v,lo,hi)=>v<lo?lo:v>hi?hi:v
function proj([lon,lat]){
  let x=40+((lon+11)/46)*840, y=30+((59-lat)/25)*440
  return [clamp(Math.round(x),-60,980), clamp(Math.round(y),-60,560)]
}
function ringPath(ring){
  let d='',lx=null,ly=null,n=0
  for(const pt of ring){const [x,y]=proj(pt); if(x===lx&&y===ly)continue; d+=(n===0?'M':'L')+x+' '+y; lx=x;ly=y;n++}
  return n>=3 ? d+'Z' : ''
}
function geomPath(geom){
  const polys = geom.type==='Polygon'?[geom.coordinates]:geom.type==='MultiPolygon'?geom.coordinates:[]
  let d=''; for(const poly of polys) for(const ring of poly) d+=ringPath(ring); return d
}
let land=''; const origins={}
for(const f of g.features){
  const name=f.properties.ADMIN
  if(ORIGINS[name]) origins[ORIGINS[name]]=geomPath(f.geometry)
  else if(CONTEXT.has(name)) land+=geomPath(f.geometry)
}
fs.writeFileSync('app/assets/europeGeo.json', JSON.stringify({land,origins}))
console.log('land chars:', land.length, '| origins:', Object.keys(origins).map(k=>k+':'+origins[k].length).join(' '))
console.log('total KB:', Math.round((land.length+Object.values(origins).join('').length)/1024))
