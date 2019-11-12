

export async function makeTweet() {
    const $root = $('#root');
    const result = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
      });
    let tweets = `<div id="tweets">`;
    for (let i = 0; i < 50; i++) {
        if (result.data[i]["isMine"] == true) {
        tweets += `<div class="tweet">
        <h2>${result.data[i]["author"]}<button class="edit" id="${result.data[i]["id"]}" value="${result.data[i]["body"]}">Edit</button>
        <button class="delete" id="${result.data[i]["id"]}">Delete</button></p></h2>
        <p>${result.data[i]["body"]}</p>
        <p>Likes: ${result.data[i]["likeCount"]}  
        <button class="like" id="${result.data[i]["id"]}" value="${result.data[i]["isLiked"]}"><3</button>  
        Replies:  ${result.data[i]["replyCount"]} <button id="${result.data[i]["id"]}" class="reply">Reply</button>
         Retweets:  ${result.data[i]["retweetCount"]} <button>Retweet</button> </p>
        <div id="${result.data[i]["id"]}"></div>
        </div>`;
        } else {
        tweets += `<div class="tweet">
        <h2>${result.data[i]["author"]}</h2>
        <p>${result.data[i]["body"]}</p>
        <p>Likes: ${result.data[i]["likeCount"]}  
        <button class="like" id="${result.data[i]["id"]}" value="${result.data[i]["isLiked"]}"><3</button>  
        Replies:  ${result.data[i]["replyCount"]} <button id="${result.data[i]["id"]}" class="reply">Reply</button>
        Retweets:  ${result.data[i]["retweetCount"]} <button id="${result.data[i]["id"]}" class="retweet">Retweet</button> </p>
        <div id="${result.data[i]["id"]}"></div></div>`;
        }
        
    }
    tweets += `</div>`;
    $root.append(tweets);
}

export async function likeTweet(event) {
    if (event.target.value=="false") {
        let url = "https://comp426fa19.cs.unc.edu/a09/tweets/" + event.target.id + "/like";
        const result = await axios({
            method: 'put',
            url: url,
            withCredentials: true,
          });     
    } else {
        let url = "https://comp426fa19.cs.unc.edu/a09/tweets/" + event.target.id + "/unlike";
        const result2 = await axios({
            method: 'put',
            url: url,
            withCredentials: true,
          });   
    }
    $('#tweets').replaceWith(makeTweet());
}

export async function deleteTweet(event) {
let url = "https://comp426fa19.cs.unc.edu/a09/tweets/" + event.target.id;
    const result = await axios({
        method: 'delete',
        url: url,
        withCredentials: true,
      }); 
    $('#tweets').replaceWith(makeTweet());
}

export async function editTweet(event) {  
    $('div[id='+ event.target.id +']').html(`<form id="${event.target.id}" class="editForm">
    <textarea id="edit">${event.target.value}</textarea>
    <button id="${event.target.id}" class="editsubmit" type="submit">Submit</button></form>`);
    $(document).on("submit", ".editsubmit", submitEdit);
}

export async function submitEdit(event) {
    event.preventDefault();
    let string = "" + $("textarea[id=edit]").val() + "";
    $('div[id='+ event.target.id +']').html(``);
    let link = "https://comp426fa19.cs.unc.edu/a09/tweets/" + event.target.id;
    const result = await axios({
        method: 'put',
        url: link,
        withCredentials: true,
        data: {
           "body": string,
        },
    });
    $('#tweets').replaceWith(makeTweet());
}

async function replyTweet(event) {
    $('div[id='+ event.target.id +']').html(`<form id="${event.target.id}" class="replyForm">
    <textarea id="reply">Enter Your Reply...</textarea>
    <button id="${event.target.id}" class="replySubmit" type="submit">Submit</button></form>`);
}

async function submitReply(event) {
    event.preventDefault();
    $('div[id='+ event.target.id +']').html(``);
    let string = "" + $("textarea[id=reply]").val() + "";
    let link = "https://comp426fa19.cs.unc.edu/a09/tweets";
    const result = await axios({
        method: 'post',
        url: link,
        withCredentials: true,
        data: {
          "type": "reply",
          "parent": event.target.id,
          "body": string
        },
      });
      $('#tweets').replaceWith(makeTweet());
}

async function retweet(event){
    $('div[id='+ event.target.id +']').html(`<form id="${event.target.id}" class="retweetForm">
    <textarea id="reet">Enter Your Retweet...</textarea>
    <button type="submit" class="submitRetweet">Submit</button></form>`);
}

async function submitRetweet(event) {
    event.preventDefault();
    $('div[id='+ event.target.id +']').html(``);
    let string = "" + $("textarea[id=reet]").val() + ""; //this is returning undefined for some reason...
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          "type": "retweet",
          "parent": event.target.id,
          "body": string
        },
      });
    $('#tweets').replaceWith(makeTweet());
}


async function composeTweet(event) {
    const $root = $('#root');
    event.preventDefault();
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        data: {
            "type": "tweet",
            "body":  $("textarea[id=body]").val(),
          },
        withCredentials: true,
      });
      $('#tweets').replaceWith(makeTweet());

}


export const renderSite = function() {
    const $root = $('#root');
    $root.append(`<div id="form">
    <form class="form">
        <label>Compose New Tweet</label><br>
        <textarea id="body">Enter Text Message Here...</textarea>
        <button type="submit">Submit</button>
    </form>
</div>`);
    makeTweet();

    $(document).on("submit", ".form", composeTweet);
    $(document).on("click", ".like", likeTweet);
    $(document).on("click", ".delete", deleteTweet);
    $(document).on("click", ".edit", editTweet);
    $(document).on("submit", ".editForm", submitEdit);
    $(document).on("click", ".reply", replyTweet);
    $(document).on("submit", ".replyForm", submitReply);
    $(document).on("click", ".retweet", retweet);
    $(document).on("submit", ".retweetForm", submitRetweet);

}


$(function () {
    renderSite();
    });