import { useEffect, useRef, useState } from "react";
import FadeIn from "./FadeIn";
import Input from "./Input";
import { handlePostInput } from "../utility/util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { protectedPutData } from "../utility/async";
import { Spinner } from "../assets/icons";
import { useSelector } from "react-redux";

export function Modal({ type, user, setType }) {
  const queryClient = useQueryClient();
  const stillLogged = useSelector((state) => state.auth.user);

  const [bannerPreview, setBannerPreview] = useState("");
  const [pfpPreview, setPfpPreview] = useState("");

  const [error, setError] = useState([]);

  /* Edit profile modal */
  const [profileFields, setProfileFields] = useState(user);
  console.log(profileFields);

  const token = localStorage.getItem("token");

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: ({ body, type }) => {
      const formData = new FormData();

      Object.entries(body).forEach(([key, value]) => {
        if (value instanceof File) return;

        if (typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      if (type === "images") {
        if (body.imageUrl && body.imageUrl instanceof File) {
          console.log("image");
          formData.append("image", body.imageUrl);
        }
        if (body.bannerImage && body.bannerImage instanceof File) {
          console.log("banner");
          formData.append("banner", body.bannerImage);
        }
      }
      return protectedPutData(
        "/users/" + profileFields._id + "/edit-profile",
        formData,
        token
      );
    },
    onError: (error) => {
      setError(error.data || "An error occurred");
      setTimeout(() => {
        setError(false);
      }, 3000);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profile", profileFields.slug]);
      setType(null);
    },
  });
  const handleChangeImage = (img) =>
    setProfileFields({ ...profileFields, imageUrl: img });

  const handleChangeBanner = (img) =>
    setProfileFields({ ...profileFields, bannerImage: img });

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
    <>
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
              src={`http://localhost:8080/` + user.bannerImage}
              alt="Banner"
            />
          )}
        </FadeIn>
      </div>
      {stillLogged && (type === "edit-profile" || type === "change-image") && (
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
                        setBannerPreview,
                        handleChangeBanner
                      )
                    }
                  />
                  <Input
                    // error={error}
                    type="file"
                    input="file"
                    placeholder="Profile Picture"
                    name="pfp"
                    label="Change your profile picture?"
                    onChange={(e) =>
                      handlePostInput(
                        e.target.value,
                        e.target.files,
                        setPfpPreview,
                        handleChangeImage
                      )
                    }
                  />
                </div>
                {bannerPreview ? (
                  <img
                    className="mt-20 w-full h-[10rem] object-cover"
                    src={bannerPreview}
                    alt="Banner"
                  />
                ) : (
                  <img
                    className="mt-20 w-full h-[10rem] object-cover"
                    src={`http://localhost:8080/` + user.bannerImage}
                    alt="Banner"
                  />
                )}
                {pfpPreview ? (
                  <img
                    className="w-[4rem] h-[4rem] rounded-full object-cover ml-4 relative -top-8 border-2 border-[#222]"
                    src={pfpPreview}
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
                  <button
                    disabled={isPending}
                    onClick={async () =>
                      await updateUser({
                        body: profileFields,
                        type: "images",
                      })
                    }
                    className="bg-purple-400 font-semibold py-3 w-1/2 hover:bg-orange-500 transition-all rounded-[2rem] hover:rounded-none"
                  >
                    {isPending ? (
                      <div className="flex items-center gap-2 justify-center">
                        <p>Saving</p> <Spinner />
                      </div>
                    ) : (
                      "Save"
                    )}
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
            {type === "edit-profile" && (
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
                      error={error}
                      onErrorClass="border-red-600 bg-[#191919] text-white"
                      normalClass="bg-[#191919] border-[#191919] text-white"
                      type="text"
                      input="input"
                      placeholder="First Name"
                      value={profileFields.fname}
                      name="fname"
                      label="First Name"
                      onChange={(e) =>
                        setProfileFields({
                          ...profileFields,
                          fname: e.target.value,
                        })
                      }
                    />
                    <Input
                      error={error}
                      onErrorClass="border-red-600 bg-[#191919] text-white"
                      normalClass="bg-[#191919] border-[#191919] text-white"
                      type="text"
                      input="input"
                      placeholder="Last Name"
                      value={profileFields.lname}
                      name="lname"
                      label="Last Name"
                      onChange={(e) =>
                        setProfileFields({
                          ...profileFields,
                          lname: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Input
                    error={error}
                    extraClasses="border-2 text-white w-full py-2 px-4 rounded-lg h-[10rem] min-h-[10rem] max-h-[10rem]"
                    normalClass="bg-[#191919] border-[#222]"
                    onErrorClass="border-red-600 bg-[#222]"
                    type="text"
                    input="textarea"
                    placeholder="About..."
                    name="about"
                    value={profileFields.about}
                    label="About you (bio)"
                    onChange={(e) =>
                      setProfileFields({
                        ...profileFields,
                        about: e.target.value,
                      })
                    }
                  />
                  <Input
                    error={error}
                    extraClasses="border-2 text-white w-full py-2 px-4 rounded-lg mt-1 mb"
                    normalClass="bg-[#191919] border-[#222]"
                    onErrorClass="border-red-600"
                    type="date"
                    input="input"
                    placeholder="Date"
                    name="birth"
                    value={profileFields.birth}
                    label="Date of birth"
                    onChange={(e) =>
                      setProfileFields({
                        ...profileFields,
                        birth: e.target.value,
                      })
                    }
                  />
                  <Input
                    error={error}
                    onErrorClass="border-red-600 bg-[#191919] text-white"
                    normalClass="bg-[#191919] border-[#191919] text-white"
                    type="text"
                    input="input"
                    placeholder="Location"
                    name="location"
                    value={profileFields.location}
                    label="Location"
                    onChange={(e) =>
                      setProfileFields({
                        ...profileFields,
                        location: e.target.value,
                      })
                    }
                  />
                  <div className="pb-4">
                    <label htmlFor="gender">Gender</label>
                    <select
                      name="gender"
                      id="gender"
                      className="px-4 w-full bg-[#191919] py-2 rounded-md text-white cursor-pointer appearance-none"
                      value={profileFields.gender}
                      onChange={(e) =>
                        setProfileFields({
                          ...profileFields,
                          gender: e.target.value,
                        })
                      }
                    >
                      <option className="bg-[#222]" value="Male">
                        Male
                      </option>
                      <option className="bg-[#222]" value="Female">
                        Female
                      </option>
                      <option className="bg-[#222]" value="Other">
                        Other
                      </option>
                    </select>
                  </div>
                  <Input
                    error={error}
                    onErrorClass="border-red-600 bg-[#191919] text-white"
                    normalClass="bg-[#191919] border-[#191919] text-white"
                    type="text"
                    input="input"
                    placeholder="Phone Number"
                    name="phone"
                    value={profileFields.phone}
                    label="Phone Number"
                    onChange={(e) =>
                      setProfileFields({
                        ...profileFields,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="w-[25rem]">
                  <h1 className="text-lg font-bold mb-4">Business</h1>
                  <Input
                    error={error}
                    onErrorClass="border-red-600 bg-[#191919] text-white"
                    normalClass="bg-[#191919] border-[#191919] text-white"
                    type="text"
                    input="input"
                    placeholder="Website"
                    name="website"
                    value={profileFields.website}
                    label="Add your website"
                    onChange={(e) =>
                      setProfileFields({
                        ...profileFields,
                        website: e.target.value,
                      })
                    }
                  />
                  <Input
                    error={error}
                    onErrorClass="border-red-600 bg-[#191919] text-white"
                    normalClass="bg-[#191919] border-[#191919] text-white"
                    type="text"
                    input="input"
                    placeholder="Instagram"
                    name="instagram"
                    value={profileFields.instagram}
                    label="Add your Instagram"
                    onChange={(e) =>
                      setProfileFields({
                        ...profileFields,
                        instagram: e.target.value,
                      })
                    }
                  />
                  <Input
                    error={error}
                    onErrorClass="border-red-600 bg-[#191919] text-white"
                    normalClass="bg-[#191919] border-[#191919] text-white"
                    type="text"
                    input="input"
                    placeholder="LinkedIn"
                    name="linkedin"
                    value={profileFields.linkedin}
                    label="Add your LinkedIn"
                    onChange={(e) =>
                      setProfileFields({
                        ...profileFields,
                        linkedin: e.target.value,
                      })
                    }
                  />
                  <Input
                    error={error}
                    onErrorClass="border-red-600 bg-[#191919] text-white"
                    normalClass="bg-[#191919] border-[#191919] text-white"
                    type="text"
                    input="input"
                    placeholder="Twitter"
                    name="twitter"
                    value={profileFields.twitter}
                    label="Add your Twitter"
                    onChange={(e) =>
                      setProfileFields({
                        ...profileFields,
                        twitter: e.target.value,
                      })
                    }
                  />
                  <Input
                    error={error}
                    onErrorClass="border-red-600 bg-[#191919] text-white"
                    normalClass="bg-[#191919] border-[#191919] text-white"
                    type="text"
                    input="input"
                    placeholder="Skills"
                    name="skills"
                    value={profileFields.skills}
                    label="Mention your skills"
                    onChange={(e) =>
                      setProfileFields({
                        ...profileFields,
                        skills: e.target.value,
                      })
                    }
                  />
                  <h1 className="text-lg font-bold mb-4">Privacy</h1>
                  <div className="pb-4">
                    <label htmlFor="profile-visisbility">
                      Profile Visibility
                    </label>
                    <select
                      name="profile-visibility"
                      id="profile-visibility"
                      className="px-4 w-full bg-[#191919] py-2 rounded-md text-white cursor-pointer appearance-none"
                      value={profileFields.visibility}
                      onChange={(e) =>
                        setProfileFields({
                          ...profileFields,
                          visibility: e.target.value,
                        })
                      }
                    >
                      <option className="bg-[#222]" value="public">
                        Public
                      </option>
                      <option className="bg-[#222]" value="private">
                        Private
                      </option>
                    </select>
                  </div>
                  <div className="pb-4">
                    <label htmlFor="profile-visisbility">Allow comments</label>
                    <select
                      name="allow-comments"
                      id="allow-comments"
                      className="px-4 w-full bg-[#191919] py-2 rounded-md text-white cursor-pointer appearance-none"
                      value={profileFields.comments}
                      onChange={(e) =>
                        setProfileFields({
                          ...profileFields,
                          comments: e.target.value,
                        })
                      }
                    >
                      <option className="bg-[#222]" value="public">
                        Yes
                      </option>
                      <option className="bg-[#222]" value="private">
                        No
                      </option>
                    </select>
                  </div>
                  <div className="flex mt-8 justify-end items-center gap-2">
                    <button
                      onClick={async () =>
                        await updateUser({
                          body: profileFields,
                          type: "edit",
                        })
                      }
                      disabled={isPending}
                      className="bg-purple-400 font-semibold py-3 w-1/2 hover:bg-orange-500 transition-all rounded-[2rem] hover:rounded-none"
                    >
                      {isPending ? (
                        <div className="flex items-center gap-2 justify-center">
                          <p>Saving</p> <Spinner />
                        </div>
                      ) : (
                        "Save"
                      )}
                    </button>
                    <button
                      onClick={() => setType(null)}
                      className="bg-white bg-opacity-10 w-1/2 py-3 hover:bg-opacity-20"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      )}
    </>
  );
}
