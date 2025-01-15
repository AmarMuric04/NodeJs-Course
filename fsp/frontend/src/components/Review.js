export default function Review({ review }) {
  return (
    <div className="min-w-[20rem] bg-[#191919] p-4 rounded-lg shadow-md shadow-purple-500">
      <div className="flex justify-between text-gray-300">
        {review.anonymous && <p className="font-semibold">Anonymous</p>}
        {!review.anonymous && (
          <div className="flex flex-col">
            <p className="font-semibold">
              {review.user.fname}. {review.user.lname[0]}
            </p>
            <p className="text-xs text-orange-500">{review.user.email}</p>
          </div>
        )}
        <p>
          {"⭐".repeat(review.rating)} {review.rating % 1 === 0.5 && "½"}
        </p>
      </div>
      <p className="my-4 text-gray-400">"{review.message}"</p>
    </div>
  );
}
