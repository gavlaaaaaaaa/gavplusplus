var style_cookie_name = "style" ;
var style_cookie_duration = 30 ;

var thePosts = [];
var dates = [];

// *** END OF CUSTOMISABLE SECTION ***

function switch_style ( css_title )
{
// You may use this script on your site free of charge provided
// you do not remove this notice or the URL below. Script from
// http://www.thesitewizard.com/javascripts/change-style-sheets.shtml
    var i, link_tag ;
    for (i = 0, link_tag = document.getElementsByTagName("link") ;
         i < link_tag.length ; i++ ) {
        if ((link_tag[i].rel.indexOf( "stylesheet" ) != -1) &&
            link_tag[i].title) {
            link_tag[i].disabled = true ;
            if (link_tag[i].title == css_title) {
                link_tag[i].disabled = false ;
            }
        }
        set_cookie( style_cookie_name, css_title,
            style_cookie_duration );
    }
}
function set_style_from_cookie()
{
    var css_title = get_cookie( style_cookie_name );
    if (css_title.length) {
        switch_style( css_title );
    }
}
function set_cookie ( cookie_name, cookie_value,
                      lifespan_in_days, valid_domain )
{
    // http://www.thesitewizard.com/javascripts/cookies.shtml
    var domain_string = valid_domain ?
        ("; domain=" + valid_domain) : '' ;
    document.cookie = cookie_name +
        "=" + encodeURIComponent( cookie_value ) +
        "; max-age=" + 60 * 60 *
        24 * lifespan_in_days +
        "; path=/" + domain_string ;
}
function get_cookie ( cookie_name )
{
    // http://www.thesitewizard.com/javascripts/cookies.shtml
    var cookie_string = document.cookie ;
    if (cookie_string.length != 0) {
        var cookie_value = cookie_string.match (
            '(^|;)[\s]*' +
                cookie_name +
                '=([^;]*)' );
        return decodeURIComponent ( cookie_value[2] ) ;
    }
    return '' ;
}
function post() {
    var mydiv = document.getElementById("submitted");
    var postvalue = document.getElementById("posttext").value;

    var currentdate = new Date();
    var datetime = "Submitted: " + currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    dates.push(datetime);
    localStorage["dates"] = JSON.stringify(dates);

    thePosts.push(postvalue);
    localStorage["posts"] = JSON.stringify(thePosts);
        mydiv.innerHTML += "<para><b>Post " + (thePosts.length-1) + " - " + (dates[dates.length-1]) + "</b><br><br>" + thePosts[thePosts.length-1] + "</para>";

}

function initialise(){
    set_style_from_cookie();
    /*dates.deleteContents();
    thePosts.deleteContents();
    localStorage["dates"] = dates;
    localStorage["posts"] = thePosts;*/
    thePosts = JSON.parse(localStorage["posts"]);
    dates = JSON.parse(localStorage["dates"]);

    var mydiv = document.getElementById("submitted");

        for(var i=0; i < thePosts.length || thePosts.length == null; i++){
            mydiv.innerHTML += "<para><b>Post " + i + " - " + dates[i] + "</b><br><br>" + thePosts[i] + "</para>";
        }

}
window.onload=initialise;

