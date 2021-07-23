let lists = getByClass('list card');//mengambil list buku

function getById(id){//fungsi untuk mengambil elemen berdasarkan id tertentu
    return document.getElementById(id);
}

function getByClass(nama){//fungsi untuk mengambil elemen berdasarkan nama kelas
    return document.getElementsByClassName(nama);
}
function tambahBuku(ids, juduls, penuliss, tahuns, deskripsis, isComplete){
    const judul = juduls;
    const penulis = penuliss;
    const tahun = tahuns;
    const deskripsi = deskripsis;
    let buttonDone = null;

    let list = document.createElement('div');
    list.classList.add('list');
    list.classList.add('card');
    list.setAttribute('id',ids);

    let judulHTML = document.createElement('h3')
    judulHTML.innerText = judul;

    let penulisHTML = document.createElement('h4')
    penulisHTML.innerText = penulis;

    let tahunHTML = document.createElement('p')
    tahunHTML.innerText = tahun;

    let deskripsiHTML = document.createElement('p')
    deskripsiHTML.innerText = deskripsi;
    deskripsiHTML.classList.add('deskripsi-buku');

    if(isComplete){//isComplete==true, berarti buku sudah selesai dibaca, maka tombol yang dibuat akan memiliki event mengembalikan buku ke rak belum dibaca
        //selain itu, apabila buku belum selesai dibaca, tombol akan memindahkan buku ke rak sudah dibaca
        buttonDone = document.createElement('button');
        buttonDone.classList.add('belum-dibaca');
        buttonDone.innerText = 'belum dibaca';
        buttonDone.addEventListener('click', (item)=>{
            tambahKeBelumDibaca(item.target.parentElement);
        })

    } else {
        buttonDone = document.createElement('button');
        buttonDone.classList.add('sudah-dibaca');
        buttonDone.innerText = 'sudah dibaca';
        buttonDone.addEventListener('click', (item)=>{
            tambahKeSudahDibaca(item.target.parentElement);
        });
    }

    let buttonHapus = document.createElement('button');
    buttonHapus.classList.add('hapus');
    buttonHapus.innerText = 'hapus';
    buttonHapus.addEventListener('click',(item)=>{
        //ketika diklik, akan menghapus buku dari rak
        hapusBuku(item.target.parentElement);
    })

    const buku = [judulHTML,penulisHTML,tahunHTML,deskripsiHTML, buttonDone, buttonHapus];
    buku.forEach((item)=>{
        //looping untuk append elemen buku ke list/rak buku
        list.append(item);
    })

    if(isComplete){
        getById('completed-container').appendChild(list);
    } else {
        getById('uncompleted-container').appendChild(list);
        hapusInput();
    }

    updateList();//update list setelah menambah buku, agar fungsionalitas di sidebar bisa jalan
}

function makeBuku(){
    //fungsi yang digunakan saat memasukkan input di form registrasi buku
    const judul = getById('judul');
    const penulis = getById('penulis');
    const tahun = getById('tahun');
    const deskripsi = getById('deskripsi');
    
    const data = {
        id : +new Date(),
        judul : judul.value,
        penulis : penulis.value,
        tahun : tahun.value,
        deskripsi : deskripsi.value,
        isCompleted: false
    }
    
    if(data.judul=='' && data.penulis=='' && data.tahun=='' && data.deskripsi==''){
        alert('harap mengisi semua kolom');
    }else if(data.judul==''){
        alert('harap mengisi kolom judul');
    }else{
        tambahBuku(data.id, data.judul, data.penulis, data.tahun, data.deskripsi, data.isCompleted);
        addBook(data);
    }
    
}

function hapusInput(){//menghapus value input pada form registrasi
    const judul = getById('judul');
    const penulis = getById('penulis');
    const tahun = getById('tahun');
    const deskripsi = getById('deskripsi');

    judul.value='';
    penulis.value='';
    tahun.value='';
    deskripsi.value='';
}

function tambahKeSudahDibaca(item){
    let data = item;
    let judul = data.querySelector('h3');
    let penulis = data.querySelector('h4');
    let tahun = data.querySelectorAll('p')[0];//karena kembalian query selector all adalah array, kita perlu mengaksesnya melalui indexing
    let deskripsi = data.querySelectorAll('p')[1];
    let id = data.getAttribute('id');

    tambahBuku(id, judul.innerText, penulis.innerText, tahun.innerText, deskripsi.innerText, true);

    item.remove();//menghapus data buku tertentu setelah menambahkannya ke rak sudah dibaca
    isEmptyContainer();
}

function tambahKeBelumDibaca(item){
    let data = item;
    let judul = data.querySelector('h3');
    let penulis = data.querySelector('h4');
    let tahun = data.querySelectorAll('p')[0];
    let deskripsi = data.querySelectorAll('p')[1];//deskripsi berada di elemen kedua pada kembalian queryselectorall.
    let id = data.getAttribute('id');
    
    tambahBuku(id, judul.innerText, penulis.innerText, tahun.innerText, deskripsi.innerText, false);

    item.remove();//menghapus data buku tertentu setelah menambahkannya ke rak belum dibaca
    isEmptyContainer();
}

function hapusBuku(item){
    let id = item.getAttribute('id');
    deleteBook(id);
    item.remove();
    isEmptyContainer();

}

function renderList(datas, isSearch){//fungsi untuk merender data dari localStorage

    for(let data of datas){

        let list = document.createElement('div');
        list.classList.add('list');
        list.classList.add('card');

        let judulHTML = document.createElement('h3');
        let penulisHTML = document.createElement('h4');
        let tahunHTML = document.createElement('p');
        let deskripsiHTML = document.createElement('p');//kasi pengkondisian nanti di bawah
        deskripsiHTML.classList.add('deskripsi-buku');
        let buttonDone = null;
        let buttonHapus = null;

        list.setAttribute('id',data.id);
        judulHTML.innerText = data.judul;
        penulisHTML.innerText = data.penulis;
        tahunHTML.innerText = data.tahun;
        deskripsiHTML.innerText = data.deskripsi;

        if(data.isCompleted){//isCompleted==true, berarti buku sudah selesai dibaca, maka tombol yang dibuat akan memiliki event mengembalikan buku ke rak belum dibaca
                //selain itu, apabila buku belum selesai dibaca, tombol akan memindahkan buku ke rak sudah dibaca
                // while (getById('completed-container').firstChild) {//menghapus list
                //     getById('completed-container').removeChild(getById('completed-container').lastChild);
                // }
                buttonDone = document.createElement('button');
                buttonDone.classList.add('belum-dibaca');
                buttonDone.innerText = 'belum dibaca';
                buttonDone.addEventListener('click', (item)=>{
                    tambahKeBelumDibaca(item.target.parentElement);
                })
        } else {
                buttonDone = document.createElement('button');
                buttonDone.classList.add('sudah-dibaca');
                buttonDone.innerText = 'sudah dibaca';
                buttonDone.addEventListener('click', (item)=>{
                    tambahKeSudahDibaca(item.target.parentElement);
                });
        }
        buttonHapus = document.createElement('button');
        buttonHapus.classList.add('hapus');
        buttonHapus.innerText = 'hapus';
        buttonHapus.addEventListener('click',(item)=>{
                //ketika diklik, akan menghapus buku dari rak
            hapusBuku(item.target.parentElement);
        })

            list.append(judulHTML);
            list.append(penulisHTML);
            list.append(tahunHTML);
            list.append(deskripsiHTML);
            list.append(buttonDone);
            list.append(buttonHapus);

        if(isSearch){//kalau renderList dipanggil dari search, tempel data ke container hasil pencarian
            list.removeChild(buttonDone);
            list.removeChild(buttonHapus);
            getById('search-result-container').appendChild(list);
        } else {

            if(data.isCompleted){
            getById('completed-container').appendChild(list);
            } else {

                getById('uncompleted-container').appendChild(list);
                hapusInput();
            }
        }
            updateList();
    }
    isEmptyContainer();
}

function updateList(){//fungsi untuk mengupdate daftar buku
    let lists = getByClass('list card');

    for(let list of lists){//looping untuk memberi event pada deskripsi list buku yang di click. 
        //berguna untuk menampilkan deskripsi buku di sidebar
        let deskripsi = list.querySelectorAll('p')[1]
        deskripsi.addEventListener('click',(item)=>{
            
            let buku = item.target.parentElement;
            let textDeskripsi = buku.querySelectorAll('p')[1].innerText;

            if(buku.parentElement.getAttribute('id')=="uncompleted-container"){
                getByClass('deskripsi belum')[0].innerText=textDeskripsi;

            }else if(buku.parentElement.getAttribute('id')=="completed-container"){
                getByClass('deskripsi sudah')[0].innerText=textDeskripsi;
            } else {
                getByClass('deskripsi search')[0].innerText=textDeskripsi;
            }
        })
    }
}

function isEmptyContainer(){//funcgsi untuk melakukan pengecekan apakah container kosong
    //jika kosong, sidebar deskripsi disembunyikan, jika tidak, maka dimunculkan
    if(getById('uncompleted-container').getElementsByTagName('div').length!=0){
        getById('deskripsi-belum').removeAttribute('hidden');
    } else {
        getById('deskripsi-belum').setAttribute('hidden',true);
    }

    if(getById('completed-container').getElementsByTagName('div').length!=0){
        getById('deskripsi-sudah').removeAttribute('hidden');
    }else {
        getById('deskripsi-sudah').setAttribute('hidden',true);
    }

    if(getById('search-result-container').getElementsByTagName('div').length>1){
        getById('search-description').removeAttribute("hidden");
    } else {
        getById('search-description').setAttribute('hidden',true);
    }
}

getById('search-bar').addEventListener('input',search);//live search

function search(){
    while (getById('search-result-container').childNodes.length>2) {//menghapus list
            getById('search-result-container').removeChild(getById('search-result-container').lastChild);
    }
    let input = getById('search-bar').value;
    let buku = getBooks(null,input,null);
    renderList(buku,true);
}








