window.onload = () => {
  const amenityIds = {};
  const $amenitySubtitle = document.querySelector('DIV.amenities > H4');
  const amenitiesCheckboxs = [...document.querySelectorAll('DIV.amenities DIV.popover INPUT[type="checkbox"]')];
  amenitiesCheckbox.forEach(($checkbox) => {
    const id = $checkbox.getAttribute('data-id');
    const name = $checkbox.getAttribute('data-name');
    $checkbox.addEventListener('change', () => {
      const { checked } = $checkbox;
      if (checked) {
        amenity_ids[id] = name;
      } else {
        delete amenity_ids[id];
      }
      // delete old text
      while ($amenitySubtitle?.firstChild) {
        $amenitySubtitle.firstChild.remove();
      }
      // add new text from new list of name that amenities checked
      const nameAmenities = document.createTextNode(Object.values(amenityIds).join(', '));
      $amenitySubtitle?.appendChild(nameAmenities);
    });
  });
}
