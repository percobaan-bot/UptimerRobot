/*
LANGKAH AWAL :
1. Masukan lib butthx, (1OnTWLtbd0GD3qGd2pSZUxWD1j_G4Rki75baKIgFdTN5WB78qLnjZj7qj)
2. Masukan lib minisheetdb (1NLQhvkXR9BHzlLELujjwFuEwY9rKaSPGZdE9Fqlfuccza0T4Fe3n5kXk)
3. Isi variable dibawah ini, lalu deploy
 */

//Isi dengan owner id, dalam bentuk nomor!
let OWNER_ID = 1234

//Isi dengan bot token, dalam bentuk string!
let BOT_TOKEN = "BOT_TOKEN_DARI_BOT_FATHER"

//Isi dengan sheet id, dalam bentuk string!
let sheet_id = "SHEET_ID_DAPET_DARI_URL_SPREAD_SHEET"

//Isi variable ini setelah deploy, dalam bentuk string!
let url_deploy = "URL_HASIL_DEPLOY"

//Isi dengan true jika anda ingin mendapat pesan dri bot, setiap function uptime dieksekusi
let SEND_OWNER = false


//DARI SINI JANGAN ADA DI EDIT!!
let sheet = new miniSheetDB.init(sheet_id)
let db = sheet
let tg = new butthx.bot(BOT_TOKEN)
let bot = tg

/*
4. Setelah deploy dan mengisi variable url_deploy silakan jalankan fungsi dibawah ini
5. Buat pemicu untuk fungsi uptime.

Tes bot sudah berjalan atau tidak
 */

var pesan_start = ["Hai saya adalah uptime robot hehe."]
pesan_start.push("Command list : ")
pesan_start.push("/all => Mengecek all url yang akan di uptime")
pesan_start.push("/add => Menambah url ke database")
pesan_start.push("/delete => Menghapus sebuah ")
pesan_start.push("/get => Mendapat info tentang title2 di database")
pesan_start = pesan_start.join("\n")

function set_webhook(){
  let res = tg.setWebhook(url_deploy)
  Logger.log(res)
  return res
}