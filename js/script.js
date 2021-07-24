document.addEventListener("DOMContentLoaded", ()=>{
    const submission = getById('form');
    submission.addEventListener('submit',(event)=>{
        event.preventDefault();
        if(getById('submit').value=='Tambah Buku'){
            makeBuku(); 
        } else if(getById('submit').value=='Update Data Buku'){
            updateBuku();
            getById('submit').value='Tambah Buku';
            getById('form-keterangan').innerText='Tambah Buku';
        }   
    });

    const cari = getById('search-form');
    cari.addEventListener('submit',(event)=>{
        event.preventDefault();
        search();
    });

    getById('search-bar').addEventListener('input',search);//live search

    renderList(getBooks(),false);//render list pertama kali

    isEmptyContainer();//pengecekan untuk menampilkan sidebar;
    
})