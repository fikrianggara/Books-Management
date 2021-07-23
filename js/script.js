document.addEventListener("DOMContentLoaded", ()=>{
    const submission = getById('form');
    submission.addEventListener('submit',(event)=>{
        event.preventDefault();
        makeBuku();    
    });

    const cari = getById('search-form');
    cari.addEventListener('submit',(event)=>{
        event.preventDefault();
        search();
    });

    renderList(getBooks(),false);//render list pertama kali

    isEmptyContainer();//pengecekan untuk menampilkan sidebar;
    
})