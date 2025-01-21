import { useEffect, useRef, useState } from "react";
import FadeIn from "./FadeIn";
import Input from "./Input";
import { handlePostInput } from "../utility/util";

export function Modal({ type, user, setType }) {
  const [banner, setBanner] = useState("");
  const [pfp, setPfp] = useState("");

  const pfpInput = useRef(null);
  const bannerInput = useRef(null);

  useEffect(() => {
    if (type) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    };
  }, [type]);

  return (
    <div className="w-screen h-screen grid place-items-center absolute z-50 bg-black bg-opacity-50 top-0 left-0 backdrop-blur-md">
      <button
        onClick={() => setType(null)}
        className="absolute top-10 left-10 w-10 h-10 rounded-full grid place-items-center hover:bg-white hover:bg-opacity-10 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="M20 20L4 4m16 0L4 20"
          />
        </svg>
      </button>
      <FadeIn>
        {type === "pfp" && (
          <img
            className="ml-4 border-[#222] w-80 h-80 rounded-full object-cover"
            src={`http://localhost:8080/` + user.imageUrl}
            alt="Pfp"
          />
        )}
        {type === "banner" && (
          <img
            className="w-full h-[25rem] object-cover"
            src={`http://localhost:8080` + user.bannerImage}
            alt="Banner"
          />
        )}
        {type === "change-image" && (
          <div className="bg-[#222] w-[30rem] px-16 py-12 rounded-xl shadow-xl relative">
            <button
              onClick={() => setType(null)}
              className="absolute top-4 left-4 w-10 h-10 rounded-full grid place-items-center hover:bg-white hover:bg-opacity-10 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="M20 20L4 4m16 0L4 20"
                />
              </svg>
            </button>
            <div className="flex flex-col gap-8">
              <Input
                // error={error}
                type="file"
                input="file"
                placeholder="Banner"
                name="banner"
                label="Change your banner?"
                onChange={(e) =>
                  handlePostInput(
                    e.target.value,
                    e.target.files,
                    setBanner,
                    "1"
                  )
                }
                ref={bannerInput}
              />
              <Input
                // error={error}
                type="file"
                input="file"
                placeholder="Profile Picture"
                name="pfp"
                label="Change your profile picture?"
                onChange={(e) =>
                  handlePostInput(e.target.value, e.target.files, setPfp, "2")
                }
                ref={pfpInput}
              />
            </div>
            {banner ? (
              <img
                className="mt-20 w-full h-[10rem] object-cover"
                src={banner}
                alt="Banner"
              />
            ) : (
              <img
                className="mt-20 w-full h-[10rem] object-cover"
                src={`http://localhost:8080` + user.bannerImage}
                alt="Banner"
              />
            )}
            {pfp ? (
              <img
                className="w-[4rem] h-[4rem] rounded-full object-cover ml-4 relative -top-8 border-2 border-[#222]"
                src={pfp}
                alt="Pfp"
              />
            ) : (
              <img
                className="w-[4rem] h-[4rem] rounded-full object-cover ml-4 relative -top-8 border-2 border-[#222]"
                src={`http://localhost:8080/` + user.imageUrl}
                alt="Pfp"
              />
            )}
            <div className="flex mt-8 justify-end items-center gap-2">
              <button className="bg-purple-400 font-semibold py-3 w-1/2 hover:bg-orange-500 transition-all rounded-[2rem] hover:rounded-none">
                Save
              </button>
              <button
                onClick={() => setType(null)}
                className="bg-white bg-opacity-10 w-1/2 py-3 hover:bg-opacity-20"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {type === "123" && (
          <div className="bg-[#222] px-16 py-12 rounded-xl flex gap-4 shadow-xl relative">
            <button
              onClick={() => setType(null)}
              className="absolute top-4 left-4 w-10 h-10 rounded-full grid place-items-center hover:bg-white hover:bg-opacity-10 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="M20 20L4 4m16 0L4 20"
                />
              </svg>
            </button>
            <div className="w-[25rem]">
              <h1 className="text-lg font-bold mb-4">Personal</h1>
              <div className="flex gap-2">
                <Input
                  onErrorClass="border-red-600 bg-[#191919] text-white"
                  normalClass="bg-[#191919] border-[#191919] text-white"
                  type="text"
                  input="input"
                  placeholder="First Name"
                  value={user.fname}
                  name="fname"
                  label="First Name"
                />
                <Input
                  onErrorClass="border-red-600 bg-[#191919] text-white"
                  normalClass="bg-[#191919] border-[#191919] text-white"
                  type="text"
                  input="input"
                  placeholder="Last Name"
                  value={user.lname}
                  name="lname"
                  label="Last Name"
                />
              </div>
              <Input
                extraClasses="border-2 text-white w-full py-2 px-4 rounded-lg h-[10rem] min-h-[10rem] max-h-[10rem]"
                normalClass="bg-[#191919] border-[#222]"
                onErrorClass="border-red-600 bg-[#222]"
                type="text"
                input="textarea"
                placeholder="About..."
                name="about"
                value={user.about}
                label="About you (bio)"
              />
              <Input
                extraClasses="border-2 text-white w-full py-2 px-4 rounded-lg mt-1 mb"
                normalClass="bg-[#191919] border-[#222]"
                onErrorClass="border-red-600"
                type="date"
                input="input"
                placeholder="Date"
                name="birth"
                label="Date of birth"
              />
              <Input
                onErrorClass="border-red-600 bg-[#191919] text-white"
                normalClass="bg-[#191919] border-[#191919] text-white"
                type="text"
                input="input"
                placeholder="Location"
                name="location"
                label="Location"
              />
              <div className="pb-4">
                <label htmlFor="gender">Gender</label>
                <select
                  name="gender"
                  id="gender"
                  className="px-4 w-full bg-[#191919] py-2 rounded-md text-white cursor-pointer appearance-none"
                >
                  <option className="bg-[#222]" value="">
                    Male
                  </option>
                  <option className="bg-[#222]" value="female">
                    Female
                  </option>
                  <option className="bg-[#222]" value="other">
                    Other
                  </option>
                </select>
              </div>
              <Input
                onErrorClass="border-red-600 bg-[#191919] text-white"
                normalClass="bg-[#191919] border-[#191919] text-white"
                type="text"
                input="input"
                placeholder="Phone Number"
                name="phone"
                label="Phone Number"
              />
            </div>

            <div className="w-[25rem]">
              <h1 className="text-lg font-bold mb-4">Business</h1>
              <Input
                onErrorClass="border-red-600 bg-[#191919] text-white"
                normalClass="bg-[#191919] border-[#191919] text-white"
                type="text"
                input="input"
                placeholder="Website"
                name="website"
                label="Add your website"
              />
              <Input
                onErrorClass="border-red-600 bg-[#191919] text-white"
                normalClass="bg-[#191919] border-[#191919] text-white"
                type="text"
                input="input"
                placeholder="Instagram"
                name="instagram"
                label="Add your Instagram"
              />
              <Input
                onErrorClass="border-red-600 bg-[#191919] text-white"
                normalClass="bg-[#191919] border-[#191919] text-white"
                type="text"
                input="input"
                placeholder="LinkedIn"
                name="linkedin"
                label="Add your LinkedIn"
              />
              <Input
                onErrorClass="border-red-600 bg-[#191919] text-white"
                normalClass="bg-[#191919] border-[#191919] text-white"
                type="text"
                input="input"
                placeholder="Twitter"
                name="twitter"
                label="Add your Twitter"
              />
            </div>

            <div className="w-[25rem]">
              <h1 className="text-lg font-bold mb-4">Preferences</h1>
              <Input
                onErrorClass="border-red-600 bg-[#191919] text-white"
                normalClass="bg-[#191919] border-[#191919] text-white"
                type="text"
                input="input"
                placeholder="Preferred Language"
                name="language"
                label="Preferred Language"
              />
              <div className="pb-4">
                <label htmlFor="notifications">Notification Preference</label>
                <select
                  name="notifications"
                  id="notifications"
                  className="px-4 w-full bg-[#191919] py-2 rounded-md text-white cursor-pointer appearance-none"
                >
                  <option className="bg-[#222]" value="email">
                    Email
                  </option>
                  <option className="bg-[#222]" value="sms">
                    SMS
                  </option>
                  <option className="bg-[#222]" value="push">
                    Push Notifications
                  </option>
                </select>
              </div>
            </div>
          </div>
        )}
      </FadeIn>
    </div>
  );
}
