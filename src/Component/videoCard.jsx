import { useContext, useEffect, useState } from "react";
import "../css/videocard.css";
import { firestore } from "../firebase";
import { AuthContext } from "./authProvider";

let VideoCard = (props) => {
  let [playing, setPlaying] = useState(false);
  let [openCommentBox, setOpenCommentBox] = useState(false);
  let [currentComment, setCurrentComment] = useState("");
  let [allComments, setAllComments] = useState([]);
  let [liked, setLiked] = useState(false);

  // useEffect(() => {
  //   let allcommentsId = props.post.comments;
  //   let arr = [];
  //   for (let i = 0; i < allcommentsId.length; i++) {
  //     let id = allcommentsId[i];

  //     let docRef = firestore.collection("comment").doc(id);
  //     console.log(typeof(docRef.get()));
  //     docRef.get().then((doc) => {
  //       let commentData = { ...doc.data(), id: doc.id }; // Har bar id nikali hai kabhi bhi kaam aa sakti hai
  //       arr.push(commentData);
  //     });
  //   }

  //   setAllComments(arr);
  //   console.log(allComments);
  // }, [props]);

  useEffect(() => {
    let f = async () => {
      let allCommentId = props.post.comments; // Ispe humpe sare comments hain jo is post ke uski id's hai.
      let arr = [];

      for (let i = 0; i < allCommentId.length; i++) {
        let id = allCommentId[i];

        let doc = await firestore.collection("comment").doc(id).get();

        let commentData = { ...doc.data(), id: doc.id };
        arr.push(commentData);
      }
      setAllComments(arr);
      console.log(allComments);
    };

    f();
  }, [props]);

  let user = useContext(AuthContext);
  let { email } = user;

  let userAlterName = email.split("@")[0];
  console.log(userAlterName);
  console.log(props.post);
  return (
    <div className="video_container">
      <video
        loop
        src={props.post.downloadURL}
        onClick={(e) => {
          if (playing) {
            e.target.pause();
            setPlaying(false);
          } else {
            e.target.play();
            setPlaying(true);
          }
        }}
      ></video>
      <span
        class="material-icons comment"
        onClick={() => {
          if (openCommentBox) {
            setOpenCommentBox(false);
          } else {
            setOpenCommentBox(true);
          }
        }}
      >
        chat_bubble_outline
      </span>
      <p className="likes_quantity">{props.post.likes}</p>

      {liked ? (
        <span
          class="material-icons like"
          onClick={() => {
            setLiked(false);
            if (props.post.like == 0) {
              return;
            }
            let likes = props.post.likes - 1;
            firestore
              .collection("posts")
              .doc(props.post.id)
              .update({ likes: likes });
          }}
        >
          favorite
        </span>
      ) : (
        <span
          class="material-icons like"
          onClick={() => {
            setLiked(true);
            let likes = props.post.likes + 1;
            firestore
              .collection("posts")
              .doc(props.post.id)
              .update({ likes: likes });
          }}
        >
          favorite_border
        </span>
      )}

      {openCommentBox ? (
        <div className="comment_box">
          <div className="all_comments">
            {allComments.map((comment, index) => {
              return (
                <div className="single_comment" key={index}>
                  <div className="image-container">
                    <img src={comment.pic} />
                  </div>

                  <div>
                    <p>
                      <b>{comment.username}</b>
                    </p>
                    <p className="inner-comment">{comment.comment}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <input
            className="post_comment_ipt"
            value={currentComment}
            onChange={(e) => {
              setCurrentComment(e.target.value);
            }}
          ></input>
          <button
            className="post_comment_btn"
            onClick={() => {
              if (currentComment == "") {
                return;
              }
              let p = firestore.collection("comment").add({
                comment: currentComment,
                username: user.displayName ? user.displayName : userAlterName,
                pic: user.photoURL
                  ? user.photoURL
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
              });

              setCurrentComment("");

              p.then((docRef) => {
                return docRef.get();
              }).then((doc) => {
                firestore
                  .collection("posts")
                  .doc(props.post.id)
                  .update({ comments: [...props.post.comments, doc.id] });
              });
            }}
          >
            Post
          </button>
          <button
            className="comment_box_btn"
            onClick={() => {
              setOpenCommentBox(false);
            }}
          >
            X
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="username">
        <p>{props.post.username}</p>
      </div>
      <div className="song">
        <span class="material-icons">audiotrack</span>
        <marquee>Let's do this...</marquee>
      </div>
    </div>
  );
};

export default VideoCard;
