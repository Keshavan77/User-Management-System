// asstes/index.js


$("#add_user").submit(function(event){
    alert("Data Inserted Successfully!");
});


$("#update_user").submit(function(event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {};

    $.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value'];
    });

    var userId = data.id;
    var apiUrl = `/api/users/${userId}`;

    $.ajax({
        url: apiUrl,
        type: 'PUT',
        data: data,
        success: function(response) {
            alert("Data Updated Successfully!");
            // Optionally, redirect or update the UI
        },
        error: function(error) {
            alert("Error updating data");
        }
    });
});


if (window.location.pathname == "/") {
    var $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id");

        var request = {
            "url": `http://localhost:3000/api/users/${id}`,
            "method": 'DELETE',
        };

        if (confirm("Do you really want to delete this record?")) {
            $.ajax(request).done(function (response) {
                alert("Data Deleted Successfully!");
                location.reload();
            });
        }
    });
}
