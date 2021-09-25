window.onload = (function () {
    // We leave the variable outside bc it needs to be updated eith every event
    // if we put the variable inside the event, this will be isolated for only the event
    const amenityIds = {};
    const subtitleElement = $('DIV.amenities > H4');
    $('DIV.amenities DIV.popover INPUT[type="checkbox"]').change(function () {
        const id = $(this).attr('data-id');
        if ($(this).is(":checked")) {
            const name = $(this).attr('data-name');
            amenityIds[id] = name;
        } else {
            delete amenityIds[id];
        }
        const nameAmenities = Object.values(amenityIds).join(', ');
        subtitleElement.text(nameAmenities);
    });
});
