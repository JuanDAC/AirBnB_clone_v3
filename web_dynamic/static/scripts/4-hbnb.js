window.onload = () => {
    // Gloval variables for current view
    const amenityIds= {};
    const $apiStatus = $("div#api_status");
    const $subtitle = $('DIV.amenities > H4');
    const $buttonFilters = $('.filters > button:nth-child(3)');
    // Add amenities selected to H4
    $('DIV.amenities DIV.popover INPUT[type="checkbox"]').change(function () {
        const id = $(this).attr('data-id');
        if ($(this).is(":checked")) {
            const name = $(this).attr('data-name');
            amenityIds[id] = name;
        } else {
            delete amenityIds[id];
        }
        const nameAmenities = Object.values(amenityIds).join(', ');
        $subtitle.text(nameAmenities);
    });
    $buttonFilters.click(() => getPlaces({amenities: Object.values(amenityIds)}));
    // GET request of status code
    $.get('http://0.0.0.0:5001/api/v1/status/', function ( {status} ) {
        if (status === 'OK') {
            $apiStatus.addClass("available");
        } else {
            $apiStatus.removeClass("available");
        }
    });
    // POST request of items-places
    getPlaces();
};



function requestPlaces (response) {
  response.forEach(({name, description, number_rooms, number_bathrooms, price_by_night, max_guest}) => {
      $(`
      <article>
      <div class="title_box">
          <h2>${name || 'I have no a name'}</h2>
          <div class="price_by_night">${price_by_night || '$$'}</div>
      </div>
      <div class="information">
          <div class="max_guest">${max_guest} Guest${max_guest !== 1 ? 's' : ''}</div>
          <div class="number_rooms">${number_rooms} Bedroom${number_rooms !== 1 ? 's' : ''}</div>
          <div class="number_bathrooms">${number_bathrooms} Bathroom${number_bathrooms !== 1 ? 's' : ''}</div>
      </div>
      <div class="description">${description || 'I have no description'}</div>
      </article>
      `).appendTo('SECTION.places');
  });
};

function getPlaces(filters = {}) {
const placesPostConfig = {
  method: 'POST',
  body: JSON.stringify({}),
  headers: {
    'Content-Type': 'application/json'
  },
};

const $places = document.querySelector('SECTION.places');
if ($places instanceof HTMLElement) {
  $places.innerHTML = '';
}

fetch('http://0.0.0.0:5001/api/v1/places_search/', placesPostConfig)
  .then(dataRaw => dataRaw.json())
  .then(requestPlaces);
}
