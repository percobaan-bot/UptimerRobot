function indexDb(title){
  var index = 0
  var all = db.getAll();
  all.forEach(([ttl], i)=>{
    if(String(ttl) == title) index = i+db.baris
  })
  return index
}

function editDb(title, url){
  try{
  var init_title = db.has(title)
  }catch(e){
    init_title = false
  }
  if(!init_title){
    var kol = db.sheet.getLastRow()+1
    db.setValue('A'+kol, title)
    db.setValue('B'+kol, url)
    return;
  }
  var kol = indexDb(title)
  db.setValue('A'+kol, title)
  db.setValue('B'+kol, url)
}

function dbAll(){
  var hasil = []
  var all = db.getAll()
  for([title, url] of all){
    var init = {
      title, url
    }
    hasil.push(init) 
  }
  return hasil
}

function deleteDb(title){
  var check = db.has(title)
  if(!check) return;
  var index = indexDb(title)
  db.sheet.deleteRow(index)
}