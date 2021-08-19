var api;
if(window.location.hostname == 'localhost'){
     api = 'https://api.meylendra.com:2021';
}else if(window.location.hostname == "adsfluencer.siapptn.com"){
     api = 'https://api.meylendra.com:2021';
}else{
     api = 'https://api.meylendra.com:2021';
}
export const koneksi = `${api}`