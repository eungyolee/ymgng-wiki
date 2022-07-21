const db = firebase.firestore();

$("#register").click(function () {
  var email = $("#email-new").val();
  var password = $("#pw-new").val();

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      document.cookie = `user=${user.uid}`;
      alert("로그인에 성공하였습니다.");
      window.location.href = "/";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      if (
        errorMessage ===
        "Firebase: The email address is badly formatted. (auth/invalid-email)."
      ) {
        alert("이메일 형식을 입력하여 주십시오.");
      } else if (
        errorMessage ===
        "Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)."
      ) {
        alert("존재하지 않는 계정입니다.");
      } else if (
        errorMessage ===
        "Firebase: The password is invalid or the user does not have a password. (auth/wrong-password)."
      ) {
        alert("잘못된 비밀번호입니다.");
      }
    });
});

if (document.location.href === "https://yeomgyeong-wiki.web.app/write.html") {
  var [cookieValue] = document.cookie.split("=", 1);
  if (cookieValue === "user") {
    const db = firebase.firestore();

    $("#send").click(function () {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var user = document.cookie.substr(5);
      var data = {
        제목: $("#title").val(),
        내용: $("#content").val(),
        날짜: `${year}.${month}.${day}`,
        작성자: user,
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
