const STORAGE_KEY = "BOOKS_MANAGEMENT";
let booksCompleted = [];
let booksUnCompleted = [];
let booksSearch = [];
let books = [];

function storageExist(){//mengecek apakah penyimpanan tersedia
    if(typeof(localStorage)!==undefined){
        return true;
    }
    alert('storage tidak tersedia');
    return false;
}

function getBooks(id=null, judul=null, isComplete=null){//fungsi mengambil/load buku berdasarkan argumen tertentu

    if(storageExist()){
        let datas = localStorage.getItem(STORAGE_KEY);
        datas = JSON.parse(datas);

        if(judul==null && id==null && isComplete==null){//mengambil seluruh data
            if(datas!=null){
                books=datas;
                saveBooks();
                return books;
            }
        } else if(judul!=null && id==null && isComplete==null){//jika memasukkan judul di parameter
            judul = judul.toLowerCase();//melowercasekan judul sehingga bisa diproses dengan lebih akurat di pencarian
            booksSearch = [];//mengosongkan booksSearch agar tidak ada hasil pencarian yang tertimpa
            if(datas!=null){
                for(let data of datas){//looping untuk mengambil buku dengan judul yang sesuai dengan argumen
                if(data.judul.toLowerCase().includes(judul) && judul!=''){//lower case kembalian data,
                    // agar judul yang telah dilowercase bisa tersaring tidak berdasarkan kapitalisasi huruf
                        booksSearch.push(data);
                    }
                }
                return booksSearch;
            } else {
                console.log('belum ada data');
                return false;//jika tidak ditemukan, kembalikan false, berguna untuk pengkondisian tampilan pencarian
            }
            
        } else if(judul==null && id!=null && isComplete==null){//mendapatkan index urutan buku menggunakan id
            let index = 0;
            for(let data of datas){
                if(data.id==id){
                    return index;
                }
                index++;
            }
            return 'id tidak ditemukan';

        } else if(judul==null && id==null && isComplete!=null){//mencari berdasarkan status penyelesaian
            if(isComplete){//jika yang dicari yang sudah selesai dibaca
                booksCompleted = [];
                for(let data of datas){
                    if(data.isCompleted){
                        booksCompleted.push(data);
                    }
                }
                return booksCompleted;

            } else{//jika yang dicari yang belum selesai dibaca
                booksUnCompleted = [];
                for(let data of datas){
                    if(!data.isCompleted){
                        booksUnCompleted.push(data);
                    }
                }
                return booksUnCompleted;
            }
        } else{
            console.log('fungsi tidak menerima argumen demikian');
        }
    } else {
        alert('local storage tidak tersedia, buku yang anda request tidak ada');
    }
    

}

function addBook(item){//fungsi menambahkan buku ke localStorage

    if(storageExist()){
        let data = {
            id : item.id,
            judul : item.judul,
            penulis : item.penulis,
            tahun : item.tahun,
            deskripsi : item.deskripsi,
            isCompleted: item.isCompleted
        }
        books.push(data);
        saveBooks();
    } else{
        alert('local storage tidak tersedia, buku yang anda tambahkan tidak akan tersimpan')
    }
    
}

function saveBooks(){//fungsi untuk menyimpan data buku ke localStorage
    books = JSON.stringify(books);//mengubah buku menjadi string agar bisa disimpan di local storage
    localStorage.setItem(STORAGE_KEY,books);
    books = JSON.parse(books);//mengubah kembali buku menjadi array of object sehingga nanti bisa menggunakan method milik array
}

function deleteBook(id){
    let index = getBooks(id,null,null);//mengambil indeks buku dengan id tertentu
    books.splice(index,1);//menghapus buku dengan indeks tertentu
    saveBooks();
}

function updateBook(item){

    if(storageExist()){
        let data = {
            id : item.id,
            judul : item.judul,
            penulis : item.penulis,
            tahun : item.tahun,
            deskripsi : item.deskripsi,
            isCompleted: item.isCompleted
        }
        let index = getBooks(data.id,null,null);

        books[index].judul = data.judul;
        books[index].penulis = data.penulis;
        books[index].tahun = data.tahun;
        books[index].deskripsi = data.deskripsi;
        books[index].isCompleted = data.isCompleted;

        saveBooks();
    } else{
        alert('local storage tidak tersedia, buku yang anda ubah tidak akan tersimpan')
    }
}


