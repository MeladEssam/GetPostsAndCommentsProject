// let usersContainer = document.querySelector(".users-content");
// let postsContainer = document.querySelector(".posts-content");

//function that show users
function showUsersData(users) {
  let usersContainer = document.querySelector(".users-content");
  for (let i = 0; i < users.length; i++) {
    //create main div
    let userBox = document.createElement("div");
    userBox.setAttribute("userId", users[i].id);
    //set class name
    userBox.className = "user-box";
    //create h3 for user name
    let userNameHeader = document.createElement("h3");
    //set class name for the h3
    userNameHeader.className = "user-name";
    //create username text
    let userNameText = document.createTextNode(users[i].name);
    //append the name into h3
    userNameHeader.appendChild(userNameText);
    //create h4 element for the email of the user
    let userEmailElement = document.createElement("h4");
    //set class name for h4 element
    userEmailElement.className = "user-email";
    //create email text
    let emailText = document.createTextNode(users[i].email);
    //append email text into h4 email elemnt
    userEmailElement.appendChild(emailText);
    //append h3 element into main div user box
    userBox.appendChild(userNameHeader);
    //append email element into main div
    userBox.appendChild(userEmailElement);
    //append main div into conatiner
    usersContainer.appendChild(userBox);
  }
}
//function to show user posts
function showUserPostsData(userPostsList, userName) {
  let postsContainer = document.querySelector(".posts-content");

  postsContainer.innerHTML = "";
  for (let i = 0; i < userPostsList.length; i++) {
    //create main div box
    let postBox = document.createElement("div");
    //set class for the post box element
    postBox.className = "post-box";
    //set attribute : post id
    // postBox.setAttribute("postId", userPostsList[i].id);
    //create h2 for the name of user
    let userNameElement = document.createElement("h2");
    userNameElement.appendChild(document.createTextNode(userName));
    postBox.appendChild(userNameElement);

    //create h3 post title element
    let postTitleElement = document.createElement("h3");
    //set class name for post title element
    postTitleElement.className = "post-title";

    //create post title text
    let titleText = document.createTextNode(userPostsList[i].title);
    //append the text title into the title element h3
    postTitleElement.appendChild(titleText);

    //append post title element into main div
    postBox.appendChild(postTitleElement);

    //create post par element
    let postParElement = document.createElement("p");
    //create par text
    let parText = document.createTextNode(userPostsList[i].body);
    //append the text into post par element
    postParElement.appendChild(parText);
    //append the post par element into post box

    postBox.appendChild(postParElement);

    //create comments btn as link to comments page

    let commentsBtn = document.createElement("h4");
    commentsBtn.className = "post-comments";
    // commentsBtn.href = "comments.html";
    commentsBtn.setAttribute("postId", userPostsList[i].id);
    commentsBtn.appendChild(document.createTextNode("View Comments"));

    postBox.appendChild(commentsBtn);
    //append the main div box
    postsContainer.appendChild(postBox);
  }
}

//function to get all users from api

function getAllUsers() {
  return new Promise(function (resolveFunc, rejectFunc) {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((fullHttpResponse) => {
        if (fullHttpResponse.ok) {
          return fullHttpResponse.json(); //return a promise
        } else {
          rejectFunc("There Is An Error Can't Get Users Data");
          throw "I Handle the error";
        }
      })
      .then((users) => {
        showUsersData(users);
        resolveFunc();
      })
      .catch((e) => console.log("Errorrr: " + e));
  });
}

function getAllUsersUsingAxios() {
  return new Promise(function (resolveFunc, rejectFunc) {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        let users = response.data;
        console.log(users);
        showUsersData(users);
        resolveFunc(); //resolve promise
      })
      .catch((error) => {
        rejectFunc(error.message); //reject the promise
      });
  });
}

function getPostsForSpecificUserUsingAxios(user_id, userName) {
  let url = `https://jsonplaceholder.typicode.com/posts?userId=${user_id}`;
  axios
    .get(url)
    .then((response) => {
      let userPostsList = response.data;
      showUserPostsData(userPostsList, userName);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

//fun get posts and use async and await
async function getPostsForSpecificUserUsingAxiosSyncAwait(user_id, userName) {
  try {
    let url = `https://jsonplaceholder.typicode.com/posts?userId=${user_id}`;
    let response = await axios.get(url);
    let userPostsList = response.data;
    showUserPostsData(userPostsList, userName);
  } catch (e) {
    throw new Error(e.message);
  }
}

///function get users using async and await

async function getAllUsersUsingAxiosAsyncAwait() {
  try {
    let response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    let users = response.data;
    showUsersData(users);
  } catch (e) {
    throw new Error(e.message);
  }
}

async function initApp() {
  try {
    await getAllUsersUsingAxiosAsyncAwait();
    await getPostsForSpecificUserUsingAxiosSyncAwait(1, "Leanne Graham");
  } catch (e) {
    alert("Errorrrrr Is : " + e);
  }
}
//start app
initApp();

// getAllUsersUsingAxiosAsyncAwait()
//   .then(() => {
//     getPostsForSpecificUserUsingAxiosSyncAwait(1, "Leanne Graham");
//   })
//   .catch((error) => {
//     alert("Error Is :" + error);
//   });

// getAllUsersUsingAxios()
//   .then(() => {
//     getPostsForSpecificUserUsingAxios(1, "Leanne Graham");
//   })
//   .catch((error) => {
//     alert("Error Is :" + error);
//   });

// getAllUsers()
//   .then(() => {
//     getPostsForSpecificUser(1, "Leanne Graham");
//   })
//   .catch((error) => {
//     alert(error);
//   });

function getPostsForSpecificUser(user_id, userName) {
  let myReq = new XMLHttpRequest();
  myReq.open(
    "GET",
    `https://jsonplaceholder.typicode.com/posts?userId=${user_id}`
  ); //get post for user that id is user_id
  myReq.responseType = "json";
  myReq.send();
  myReq.onload = function () {
    if (myReq.status >= 200 && myReq.status < 300) {
      let userPostsList = myReq.response;

      showUserPostsData(userPostsList, userName);
    } else {
      alert("There Is An Error");
    }
  };
}

document.addEventListener("click", function (e) {
  if (e.target.closest(".user-box")) {
    console.log(e.target.closest(".user-box").getAttribute("userId"));
    let userBox = e.target.closest(".user-box");
    let userName = userBox.children[0].innerHTML;
    let userId = userBox.getAttribute("userId");
    // getPostsForSpecificUserUsingAxios(userId, userName);
    getPostsForSpecificUserUsingAxiosSyncAwait(userId, userName);
  }
});

document.addEventListener("click", function (event) {
  if (event.target.className == "post-comments") {
    let Popup = document.querySelector(".pop-menu");
    Popup.classList.add("opend");

    let postId = parseInt(event.target.getAttribute("postId"));
    // getCommentsUsingAxios(postId);
    getCommentsUsingAxiosAsyncAwait(postId);
  }
});

document.querySelector(".pop-menu .close-btn").onclick = function () {
  document.querySelector(".pop-menu").classList.remove("opend");
};

//function that get comments for specific post

function getCommentsForSpecificPost(postId) {
  let myReq = new XMLHttpRequest();
  myReq.open(
    "GET",
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  myReq.responseType = "json";
  myReq.send();
  myReq.onload = function () {
    // console.log(myReq.response);

    if (myReq.status >= 200 && myReq.status < 300) {
      //get response
      let postComments = myReq.response;
      showPostComments(postComments);
    }
  };
}

///function get comments using axios liberary

function getCommentsUsingAxios(postId) {
  axios
    .get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((response) => {
      let postComments = response.data;
      showPostComments(postComments);
    })
    .catch((error) => {
      alert("Error In Get Comments " + error.message);
    });
}

//get comments async await
async function getCommentsUsingAxiosAsyncAwait(postId) {
  try {
    let response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    let postComments = response.data;
    showPostComments(postComments);
  } catch (e) {
    alert("Error In Get Comments: " + e.message);
  }
}

//function to show comments

function showPostComments(postComments) {
  let commentsContainer = document.querySelector(
    ".pop-menu .comments-conatiner"
  );

  commentsContainer.innerHTML = "";
  for (let i = 0; i < postComments.length; i++) {
    //create main comment box
    let commentBox = document.createElement("div");
    //set class name for main comment box
    commentBox.className = "comment-box";

    //create comment title element h3
    let commentTitleElement = document.createElement("h3");
    //set class name for  comment title element
    commentTitleElement.className = "comment-title";
    //create comment text title
    let textTitle = document.createTextNode(postComments[i].name);
    //append the text into comment element title
    commentTitleElement.appendChild(textTitle);

    //append comment title element into the comment box
    commentBox.appendChild(commentTitleElement);

    //create Comment par element
    let commentBodyElement = document.createElement("p");
    //set class name for comment body element
    commentBodyElement.className = "comment-text";
    //create text body
    let textBody = document.createTextNode(postComments[i].body);
    //append the text into comment body element
    commentBodyElement.appendChild(textBody);
    //append the comment body element into main box
    commentBox.appendChild(commentBodyElement);

    //append main comment box into comments container
    commentsContainer.appendChild(commentBox);
  }
}
