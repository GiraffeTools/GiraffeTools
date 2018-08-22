import React from "react";

const Contributors = () => (
  <div className="container right">
    <h3>All contributors</h3>
    <div className="card mb-12 text-center">
      <div id="contributors" />
    </div>
  </div>
);

export default Contributors;


// <script>
// $.getJSON( "https://api.github.com/repos/TimVanMourik/GiraffeTools/contributors", function (data) {
//   var users = [];
//   $.each(data, function(key, val) {
//     users.push( `<li>
//                     <img class="avatar-image" src=${val.avatar_url} /><br />
//                     <a href=${val.html_url} target=_blank> <b>@${val.login}</b></a>
//                 </li>`);
//   });
//
//   $( "<ul/>", {
//     "class": "contributor-list",
//     html: users.join( "" )
//   }).appendTo( "#contributors" );
// });
// </script>
