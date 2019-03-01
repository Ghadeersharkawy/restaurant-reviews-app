if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js')
    .then((reg)=>{
        console.log("registered");
    })
    .catch((err) =>{
        console.log("Error Not registrred" + err);
    });

}