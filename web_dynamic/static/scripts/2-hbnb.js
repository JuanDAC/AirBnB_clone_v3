window.onload = (function () {
    const amenityIds = {};
    const $apiStatus = $("div#api_status");
    const $subtitle = $('DIV.amenities > H4');
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
    $.get('http://0.0.0.0:5001/api/v1/status/', function ( {status} ) {
        if (status === 'OK') {
            $apiStatus.addClass("available");
        } else {
            $apiStatus.removeClass("available");
        }
    });
});
