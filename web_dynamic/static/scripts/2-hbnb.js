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
};
