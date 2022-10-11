const db = firebase.firestore();
var provider = new firebase.auth.GoogleAuthProvider();

function getCookie(name) {
  var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? value[2] : null;
}

$("#register").click(function () {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      document.cookie = `uuid=${user.uid}`;
      document.cookie = `username=${user.displayName}`;
      document.cookie = `email=${user.email}`;
      alert("로그인에 성공하였습니다.");
      window.location = "/";
      // ...
    })
    .catch((error) => {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(error);
    });
});

if (
  document.location.href == "https://ymgng-wiki.eungyolee.studio/write.html"
) {
  var [cookieValue] = getCookie("uuid");
  console.log(cookieValue);
  if (cookieValue !== null) {
    const db = firebase.firestore();

    $("#send").click(function () {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var userid = getCookie("uuid");
      var useremail = getCookie("email");
      var username = getCookie("username");
      var data = {
        제목: $("#title").val(),
        내용: $("#content").val(),
        날짜: `${year}.${month}.${day}`,
        작성자_아이디: userid,
        작성자_이메일: useremail,
        작성자: username,
      };
      db.collection("wiki")
        .add(data)
        .then(() => {
          alert("작성에 성공하였습니다.");
          window.location.href = "/";
        })
        .catch((err) => {
          alert(`작성에 실패하였습니다.\n실패 이유 : ${err}`);
        });
    });
  } else {
    alert("로그인되어 있지 않습니다. 로그인해주세요.");
    window.location.href = "./login.html";
  }
}
