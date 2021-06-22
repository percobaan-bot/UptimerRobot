function doPost(e) {
  tg.handleUpdate(e) //Menghandle update
  
  //Jika ada update message maka akan dijalankan fungsi prosesMessage
  tg.command('start', (update)=>{
    return bot.reply(pesan_start)
  })
  tg.on('message', (update)=>{
    var userid = update.message.from.id
    if(userid != OWNER_ID) return false
    if(update.message.chat.type != "private") return false
    return prosesMessage(bot, update)
  })  
}

function prosesMessage(bot, update){
  var {message} = update
  try{
    var database = dbAll()
  }catch(e){
    var database = []
  }
  if("text" in message){
    var text = message.text
    var regex = /^[!\/]([^@\s]+)@?(?:(\S+)|)\s?([\s\S]+)?$/i.exec(text)
    if(!regex) return false
    var cmd = regex[1]
    var arg = regex[3]||false
    if(cmd.toLowerCase() == "all"){
      var pesan = "Berikut semua url anda yang ada didatabase saya :\n"
      var arr = database;
      arr.forEach((e, i)=>{
        var num = i+1
        var url = e.url
        var title = e.title
        pesan +=`${num}. ${title}\n`
      })
      pesan += `\nTotal ada ${arr.length} url yang anda miliki`
      return bot.reply(pesan)
    }else if(cmd.toLowerCase() == "add"){
      if(!arg) return bot.reply('Format command `/add <title>|<url>`')
      var [title, url=false] = arg.split("|")
      if(!url){
        return bot.reply("Mohon masukan url dalam format command!!")
      }
      editDb(title, url)
      return bot.reply('Berhasil menambahkan url ke database')
    }else if(cmd.toLowerCase() == "delete"){
      if(!arg) return bot.reply('Format command `/delete <title>`')
      var check = db.has(arg)
      if(!check){
        return bot.reply(`${arg} tidak ditemukan didalam database`)
      }
      deleteDb(arg)
      return bot.reply(`${arg} sudah dihapus dalam database!`)
    }else if(cmd.toLowerCase() == "get"){
      if(!arg) return bot.reply('Format command /get <title>')
      var check = db.has(arg)
      if(!check){
        return bot.reply(`${arg} tidak ditemukan dalam database!`)
      }
      var ini = db.get(arg)
      var {id, data} = ini
      return bot.reply(`=> Title : ${id}\n=> URL : ${data}`)
    }
  }
}

function uptime(){
  try{
    var database = dbAll()
  }catch(e){
    var database = []
  }
  if(!database.length) return false
  var psn = []
  var num = 0
  for(i of database){
    num++
    var {url, title} = i 
    try{
    var res = UrlFetchApp.fetch(url)
    var code = res.getResponseCode()
    if(code >= 200){
      if(code < 300){
        var pesan = `${num}. ${title}\nStatus : BANGUN`
        psn.push(pesan)
      }else{
        var pesan = `${num}. ${title}\nStatus : TIDUR`
        psn.push(pesan)
      }
    }else{
      var pesan = `${num}. ${title}\nStatus : TIDUR`
      psn.push(pesan)
    }
  }catch(e){
      var pesan = `${num}. ${title}\nStatus : TIDUR`
      psn.push(pesan)
    }
  }
    var pesan = "UPTIMER ROBOT :\n"
    pesan += psn.join('\n')
    Logger.log(pesan)
    if(!SEND_OWNER) return;
    return bot.sendMessage(OWNER_ID, pesan)
}