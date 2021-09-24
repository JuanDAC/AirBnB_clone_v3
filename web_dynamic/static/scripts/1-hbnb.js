$(window).load (function () {
    // We leave the variable outside bc it needs to be updated eith every event
    // if we put the variable inside the event, this will be isolated for only the event
    const amenity_ids = {};
    const subtitleElement = $('DIV.amenities > H4');
    $('DIV.amenities DIV.popover INPUT[type="checkbox"]').change(function () {
        const id = $(this).attr('data-id');
        if ($(this).is(":checked")) {
            const name = $(this).attr('data-name');
            amenity_ids[id] = name;
        } else {
            delete amenity_ids[id];
        }
        const nameAmenities = Object.values(amenity_ids).join(', ');
        subtitleElement.text(nameAmenities);
    });
});
