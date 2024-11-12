// /* eslint-disable no-unused-vars */
// /* eslint-disable react/jsx-key */
import "./Post.css";
import userImg from "../../../public/user.jpg";
import { MdVerified } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoIosMore, IoMdShare } from "react-icons/io";
import { useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";

const Post = ({
  id,
  user,
  date,
  time,
  img,
  video,
  caption,
  initialLike,
  initialShare,
}) => {
  // handle like
  const [likes, setLikes] = useState(initialLike);
  const [isLiked, setIsLiked] = useState(true);

  const handleLikeClick = () => {
    {
      isLiked ? setLikes(likes + 1) : setLikes(likes - 1);
    }
    setIsLiked(!isLiked);
  };

  // share handle
  const [share, setShare] = useState(initialShare);
  const handleShareClick = () => {
    const newShare = share + 1;
    setShare(newShare);
  };

  // Line ellipsis
  const [ellipsis, setEllipsis] = useState(false);
  const handleEllipsis = () => setEllipsis(!ellipsis);
// Reaction number format
function formatNumber(num) {
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toString();
}


  return (
    <>
      <section className="container">
        <div className="post_card border-b mb-5">
          <div className="row">
            <div className="col user_panel flex items-center justify-between px-5">
              <div className="post_userPanel_wrapper flex gap-2 items-center">
                {/* user img */}
                <label htmlFor="userImg">
                  <div className="avatar online ">
                    <div className="w-12 rounded-full ring-slate-400 ring-offset-base-100 ring-2 ring-offset-1">
                      <img src={userImg} />
                    </div>
                  </div>
                </label>
                {/* expanded userImg*/}
                <input type="checkbox" id="userImg" className="modal-toggle" />
                <div className="modal" role="dialog">
                  <div className="modal-box">
                    <img src={userImg} alt="userImg" />
                  </div>
                  <label className="modal-backdrop" htmlFor="userImg">
                    Close
                  </label>
                </div>
                {/* user name */}
                <div className="post_userName_wrapper">
                  <h4 className="userName font-bold flex gap-1 items-center  dark:text-[#fbfcfc]">
                    {user}{" "}
                    <MdVerified
                      title="verified user"
                      className="text-[#228BE6]"
                    />
                  </h4>
                  <div className="timeSection flex gap-1 items-center">
                  <p className="post_Time text-xs text-slate-600  dark:text-[#fbfcfc]">
                    {date}
                  </p>
                  <span className="-mt-1">|</span>
                  <p className="post_Time text-xs text-slate-600  dark:text-[#fbfcfc]">
                    {time}
                  </p>
                  </div>
                </div>
              </div>
              {/* more btn */}
              <IoIosMore
                className="dark:text-white font-bold text-3xl"
                title="More"
              />
            </div>
            <div className="col content_panel">
              <div className="content flex flex-col justify-center">
                {ellipsis ? (
                  <p
                    onClick={handleEllipsis}
                    className="cursor-pointer caption whitespace-pre pt-5 pl-5 text-sm text-slate-700 dark:text-[#fbfcfc]"
                  >
                    {caption}
                  </p>
                ) : (
                  <div
                    onClick={handleEllipsis}
                    className="cursor-pointer caption whitespace-pre pt-5 pl-5 text-sm text-slate-700 dark:text-[#fbfcfc]"
                  >
                    <LinesEllipsis
                      text={caption}
                      maxLine={3}
                      ellipsis={<span>...see more</span>}
                      trimRight
                      basedOn="letters"
                    />
                  </div>
                )}
                {video ? ( // Conditional rendering for video
                  <video
                    className="mt-3 rounded-xl border shadow-md max-h-[80vh]"
                    controls
                    src={video}
                    alt={`Post ${id}`}
                  />
                ) : (
                  <img
                    className="mt-3 rounded-xl border shadow-md"
                    src={img}
                    alt={`Post ${id}`}
                  />
                )}
              </div>
            </div>
            <div className="col reaction_panel pt-5 flex justify-between px-10 pb-5">
              <p className="share flex items-center gap-1 text-2xl text-slate-600 ">
                <span onClick={handleLikeClick}>
                  {isLiked ? (
                    <FaRegHeart className="" />
                  ) : (
                    <FaHeart className="text-[#ff0000]" />
                  )}
                </span>
                <span className="text-base text-slate-400">{formatNumber(likes)}</span>
              </p>
              <p className="share flex items-center gap-1 text-2xl text-slate-600">
                <span>
                  <IoMdShare onClick={handleShareClick} />
                </span>
                <span className="text-base text-slate-400">{formatNumber(share)}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Post;
