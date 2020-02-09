var api;
if(window.location.hostname == 'localhost'){
     api = 'http://localhost:4000';
}else if(window.location.hostname == "diendorse.siapptn.com"){
     api = 'http://diendorse.appspot.com/';
}else{
     api = 'http://diendorse.appspot.com/';
}
export const koneksi = `${api}`