/**
 * Github Repo Lister
 * github_repo_lister.js
 * by Kevin Yang
 * 
 * Processes repository data received from GitHub API and
 * formats the data to display available repositories in a table.
 */

(function() {
    /**
     * Get provided username's repo from Github.
     * @param {String} username 
     * @return {undefined}
     */
    function getUserRepo(username) {
        // Remove the status message if any exists. 
        if ($("#status_msg p").length > 0) {
            $("#status_msg p").remove();
        }

        // Get the JSON data from GitHub API for a user's repo.
        $.get("https://api.github.com/users/" + username + "/repos", function(data) {
            if ($("#github_list_table tr").length > 0) {
                $("#github_list_table tr:gt(0)").remove();
            }

            // Populate the table with each repo's data on each row.
            for (var i = 0; i < data.length; i++) {
                $("#github_list_table").append(
                    "<tr>" + 
                        "<td>" + data[i]["name"] + "</td>" + 
                        "<td><a href='" + data[i]["html_url"] + "'>" + data[i]["html_url"] +"</a></td>" + 
                        "<td>" + data[i]["owner"]["login"] + "</td>" + 
                        "<td><img src='" + data[i]["owner"]["avatar_url"] + "' alt='Avatar' height='42' width='42'></td>" + 
                    "</tr>"
                );
            }
        });
    }

    /* Sets the "404 Not Found" HTTP error 
       handler to display a message to the user 
       if the provided username doesn't exist. 
    */
    $.ajaxSetup({
        statusCode : {
            404 : function (jqxhr, textStatus, errorThrown) {
                //Remove the status message if any exists. 
                if ($("#status_msg p").length > 0) {
                    $("#status_msg p").remove();
                }

                $("#status_msg").append("<p>User " + $("#username_form > input").val() + " not found!</p>");
            }
        }
    });

    /* Handles the "click" and "submit" scenarios
       for when a user clicks the Submit button. 
    */
    $("#username_submit").on("click submit", function() {
        getUserRepo($("#username_form > input").val());
    });

    /* Handles the scenario when a user
       pressed the Enter key to submit username.
    */
    $("#username_form input").keypress(function(e) {
        // Get user's repo data if keycode 13 (Enter) is pressed.
        if (e.which == 13) {
            e.preventDefault();
            getUserRepo($("#username_form > input").val());
        }
    });
})();