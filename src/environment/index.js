var api;
if(window.location.hostname == 'localhost'){
     api = 'http://localhost:4000';
}else if(window.location.hostname == "diendorse.siapptn.com"){
     api = 'https://diendorse.appspot.com';
}else{
     api = 'https://diendorse.appspot.com';
}
export const koneksi = `${api}`