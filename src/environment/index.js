var api;
if(window.location.hostname == 'localhost'){
     api = 'http://api.meylendra.com:2021';
}else if(window.location.hostname == "adsfluencer.siapptn.com"){
     api = 'http://api.meylendra.com:2021';
}else{
     api = 'http://api.meylendra.com:2021';
}
export const koneksi = `${api}`