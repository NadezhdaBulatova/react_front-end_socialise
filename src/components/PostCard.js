const PostCard = ({ img, content, time }) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl w-auto h-fit m-3">
      {img && (
        <figure>
          <img className="w-40 object-contain" src={img} alt="" />
        </figure>
      )}
      <div className="card-body flex flex-col justify-evenly flex-1">
        <p className="text-base">{content}</p>
        <div className="badge badge-accent">{time}</div>
      </div>
    </div>
  );
};

export default PostCard;
