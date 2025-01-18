import { Star } from "../../assets/icons";

export default function Review({ review }) {
  return (
    <div className="min-w-[20rem] bg-[#191919] p-4 rounded-lg shadow-md shadow-purple-500 flex justify-between">
      <div className="flex flex-col text-gray-300">
        {review.anonymous && <p className="font-semibold">Anonymous</p>}
        {!review.anonymous && (
          <div className="flex flex-col">
            <p className="font-semibold">
              {review.user.fname}. {review.user.lname[0]}
            </p>
            <p className="text-xs text-orange-500">{review.user.email}</p>
          </div>
        )}
        <p className="my-4 text-gray-400">"{review.message}"</p>
      </div>
      <div>
        {[...Array(Math.floor(review.rating))].map((_, index) => (
          <Star key={index} h="12" w="12" />
        ))}
        {review.rating % 1 === 0.5 && (
          <div className="w-[6px] overflow-hidden">
            <Star h="12" w="12" />
          </div>
        )}
      </div>
    </div>
  );
}
