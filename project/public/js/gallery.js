function openImage(url){

    document.getElementById("imageModal").style.display="flex";

    document.getElementById("modalImage").src=url;

}

function closeImage(){

    document.getElementById("imageModal").style.display="none";

}
