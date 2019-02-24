if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js')
    .then((result) => {
        console.log("registered");
    }).catch((err) => {
        console.log("failed to register" + err);
    });
}