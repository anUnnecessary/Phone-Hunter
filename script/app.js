const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json()
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container')
    phonesContainer.textContent = '';
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 5) {
        phones = phones.slice(0, 5);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');

    }

    const noPhone = document.getElementById('no-found-message')
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none')
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card" p-4>
        <img src="${phone.image}" class="card-img-top mt-2 p-2" alt="...">
        <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">A New Phone indeed. Press "Show-Details" to know more.</p>
        <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary"data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
        </div>
        </div>
    `;
        phonesContainer.appendChild(phoneDiv)
    })
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText,dataLimit)
}


document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(5);
});


// enter key button
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(5);
    }
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }

}

// not the best way to show all

document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found!'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Found!'}</p>
    <p>Chipset: ${phone.mainFeatures? phone.mainFeatures.chipSet : 'No Chipset Found!'}</p>
    <p>Memory: ${phone.mainFeatures? phone.mainFeatures.memory : 'No Memory Found!'}</p>
    <p>Sensors: ${phone.mainFeatures? phone.mainFeatures.sensors : 'No Sensor Found!'}</p>
    `
}


// loadPhone();