const searchClicked = () => {
    const typedInput = document.getElementById('input-field');
    const typedText = typedInput.value;
    typedInput.value = '';
    spinner('block');
    if (typedText.length === 0) {
        document.getElementById('input-field').placeholder = 'Please Type to search your book.....';
        document.getElementById('noResultFound').style.display = 'block';
        spinner('none');
        const sectionForTotal = document.getElementById("totalResult");
        sectionForTotal.textContent = '';
        const section = document.getElementById('bookResult');
        section.textContent = '';
    }
    else {
        document.getElementById('input-field').placeholder = 'search your book...';
        document.getElementById('noResultFound').style.display = 'none';
        const section = document.getElementById('bookResult');
        section.textContent = '';
        const sectionForTotal = document.getElementById("totalResult");
        sectionForTotal.textContent = '';
        const url = `https://openlibrary.org/search.json?q=${typedText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => booksList(data))
    }

}
// spinner function 
const spinner = displaySpin => {
    document.getElementById('loading-spin').style.display = displaySpin;
}

const booksList = data => {

    // for total search result 
    const sectionForTotal = document.getElementById("totalResult");
    sectionForTotal.textContent = '';
    const totalSearchResult = data.docs.length;
    if (totalSearchResult === 0) {
        document.getElementById('noResultFound').style.display = 'block';
        document.getElementById('input-field').placeholder = 'Please enter correct name of your book...';
        spinner('none');
    }
    else {
        const divT = document.createElement('div');
        divT.innerHTML = `
        <h4 class="text-center">Total Search Result: ${totalSearchResult}</h4>
    `;
        sectionForTotal.appendChild(divT);
        // for search result div 
        const section = document.getElementById('bookResult');
        section.textContent = '';
        const books = (data.docs);
        books.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : 9096320}-M.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-title">${book.title}</h3>
            <h6 class="card-title">Author name: ${book.author_name ? book.author_name : ''}</h6>
            <p class="card-text">First Publish Date: ${book.first_publish_year}</p>
            <p class="card-text">Publisher: ${book.publisher ? book.publisher : ""}</p>
        </div>
    </div>
        `;
            section.appendChild(div);


        })
        spinner('none');
    }
}