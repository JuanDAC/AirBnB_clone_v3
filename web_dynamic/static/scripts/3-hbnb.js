window.onload = () => {
  // Gloval variables for current view
  const amenityIds = {};
  const $amenitySubtitle = document.querySelector('DIV.amenities > H4');
  const $apiStatus = document.querySelector('DIV#api_status');
  const amenitiesCheckboxs = [...document.querySelectorAll('DIV.amenities DIV.popover INPUT[type="checkbox"]')];
  /*
   * loop in the all amenities checkboxs
   */
  amenitiesCheckbox.forEach(($checkbox) => {
    const id = $checkbox.getAttribute('data-id');
    const name = $checkbox.getAttribute('data-name');
    /*
     * add event change to checkbox
     */
    $checkbox.addEventListener('change', () => {
      const { checked } = $checkbox;
      if (checked) {
        amenity_ids[id] = name;
      } else {
        delete amenity_ids[id];
      }
      /*
       * Add amenities selected to H4
       */
      // delete old text
      while ($amenitySubtitle?.firstChild) {
        $amenitySubtitle.firstChild.remove();
      }
      // add new text from new list of name that amenities checked
      const nameAmenities = document.createTextNode(Object.values(amenityIds).join(', '));
      $amenitySubtitle?.appendChild(nameAmenities);
    });
  });
  // GET request of status code
  fetch('http://0.0.0.0:5001/api/v1/status/')
    .then(dataRaw => dataRaw.json())
    .then(({status}) => {
      if (status.includes('OK')) {
        $apiStatus.classList.add('available');
      } else {
        $apiStatus.classList.remove('available');
      }
  });
  // POST request of items-places
  const requestPlaces = (response) => {
    const $sectionPlaces = document.querySelector('SECTION.places');
    while ($sectionPlaces?.firstChild) {
      $sectionPlaces.firstChild.remove();
    }
    response.forEach(({name, description, number_rooms, number_bathrooms, price_by_night, max_guest}) => {
      const $article = document.createElement('ARTICLE');
      const  $divTitleBox = document.createElement('DIV');
      const    $h2TitleName = document.createElement('H2');
      const      $h2TitleNameText = document.createTextNode(name);
      const    $divPriceByNight = document.createElement('DIV');
      const      $divPriceByNightText = document.createTextNode(price_by_night);
      const  $divInfo = document.createElement('DIV');
      const    $divMaxGuest = document.createElement('DIV');
      const      $divMaxGuestText = document.createTextNode(`${max_guest} Guest${max_guest !== 1 ? 's' : ''}`);
      const    $divRooms = document.createElement('DIV');
      const      $divRoomsText = document.createTextNode(`${number_rooms} Bedroom${number_rooms !== 1 ? 's' : ''}`);
      const    $divBathRooms = document.createElement('DIV');
      const      $divBathRoomsText = document.createTextNode(`${number_bathrooms} Bathroom${number_bathrooms !== 1 ? 's' : ''}`);
      const  $divDesc = document.createElement('DIV');
      const      $divDescText = document.createTextNode(description);
      if ($article && $divTitleBox && $h2TitleName && $divPriceByNight && $divInfo && $divMaxGuest && $divRooms && $divBathRooms) {
        // add classes
        $divBathRooms.classList.add('number_bathrooms');
        $divRooms.classList.add('number_rooms');
        $divMaxGuest.classList.add('max_guest');
        $divInfo.classList.add('information');
        $divPriceByNight.classList.add('price_by_night');
        // add text node
        $h2TitleName.appendChild($h2TitleNameText);
        $divPriceByNight.appendChild($divPriceByNightText);
        $divMaxGuest.appendChild($divMaxGuestText);
        $divRooms.appendChild($divRoomsText);
        $divBathRooms.appendChild($divBathRoomsText);
        $divDesc.appendChild($divDescText);
        // add add childen
        [$divMaxGuest, $divRooms, $divBathRooms].forEach($element => $divInfo.appendChild($element));
        [$divPriceByNight, $h2TitleName].forEach($element => $divTitleBox.appendChild($element));
        [$divInfo, $divTitleBox, $divDesc].forEach($element => $article.appendChild($element));
        $sectionPlaces.appendChild($article);
      }
    });
  };
  const placesPostConfig = {
    method: 'POST',
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch('http://0.0.0.0:5001/api/v1/places_search/', placesConfig)
    .then(dataRaw => dataRaw.json())
    .then(requestPlaces);
};
