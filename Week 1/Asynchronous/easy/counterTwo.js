let cnt = 0;

function callback(ms){
    cnt++;
    console.clear();
    console.log(cnt);
    setTimeout(()=> callback(ms), ms);
}

callback(1000);