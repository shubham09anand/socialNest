import React, { useState, useEffect } from "react";
import moment from "moment";
import noProfilePicture from '../../Assets/NoProileImage.png';
import API from "../../Services/API";
import SettingAnimation from "../Animation/SettingAnimation";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

const UpdateProfile = () => {

  const userId = useSelector((state) => state.LoginSlice.loggedUserId);
  const bannerBAckground = "https://www.google.com/imgres?q=linkedin%20background%20photo&imgurl=https%3A%2F%2Fmedia.licdn.com%2Fdms%2Fimage%2Fv2%2FC4D12AQHMPBvE3avWzg%2Farticle-inline_image-shrink_1000_1488%2Farticle-inline_image-shrink_1000_1488%2F0%2F1616872522462%3Fe%3D1732752000%26v%3Dbeta%26t%3D4GbV0gZU8iRv8QI4QMaWx9GtAfK-VbO0KnTmw9NTBQI&imgrefurl=https%3A%2F%2Fwww.linkedin.com%2Fpulse%2Fjust-like-profile-picture-linkedin-background-image-can-monareng&docid=n2xl_VYcG3e2-M&tbnid=ZbWQH2QId0Xn5M&vet=12ahUKEwiGgebmw-OIAxVFzDgGHRlwBe8QM3oECDgQAA..i&w=1124&h=366&hcb=2&ved=2ahUKEwiGgebmw-OIAxVFzDgGHRlwBe8QM3oECDgQAA";

  const [newProfilePhoto, setNewProfilePhoto] = useState();
  // eslint-disable-next-line
  const [newBackGroundPhoto, setNewBackGroundPhoto] = useState();
  const [imageBuffer, setImageBUffer] = useState(null);
  const [backGroundImageBuffer, setBackGroundImageBuffer] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [youare, setYouare] = useState("");
  const [studied, setStudied] = useState("");
  const [description, setDescription] = useState("");
  const [button, setButton] = useState(false);

  useEffect(() => {
    if (newProfilePhoto) {
      if (newProfilePhoto.size < 5 * 1024 * 1024) {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/gif', 'image/avif', 'image/png'];
        if (!allowedTypes.includes(newProfilePhoto.type)) {
          toast.warning("Only JPEG, JPG, GIF, PNG, or AVIF allowed.");
        } else {
          const reader = new FileReader();
          reader.onload = function (event) {
            const base64String = event.target.result;
            setImageBUffer(base64String);
          };
          reader.readAsDataURL(newProfilePhoto);
        }
      } else {
        toast.warning("Maximum 5MB is allowed.");
      }
    }
  }, [newProfilePhoto]);

  useEffect(() => {
    if (newBackGroundPhoto) {
      if (newBackGroundPhoto.size < 5 * 1024 * 1024) {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/gif', 'image/avif', 'image/png'];
        if (!allowedTypes.includes(newBackGroundPhoto.type)) {
          toast.warning("Only JPEG, JPG, GIF, PNG, or AVIF allowed.");
        } else {
          const reader = new FileReader();
          reader.onload = function (event) {
            const base64String = event.target.result;
            setBackGroundImageBuffer(base64String);
          };
          reader.readAsDataURL(newBackGroundPhoto);
        }
      } else {
        toast.warning("Maximum 5MB is allowed.");
      }
    }
  }, [newBackGroundPhoto]);

  const getUserProfile = async () => {
    const response = await API.post("/getUserProfile", { userId: userId });
    return response.data;
  }

  const { data: userProfile, isLoading, isError, isSuccess } = useQuery({
    queryKey: (['getUserProfile', userId]),
    queryFn: getUserProfile,
    enabled: !!userId,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (isSuccess) {
      setFirstName(userProfile?.userProfile1?.firstName);
      setLastName(userProfile?.userProfile1?.lastName);
      setUserName(userProfile?.userProfile1?.userName);
      setBirthday(moment(userProfile?.userProfile2?.dateOfBirth).format("DD-MM-YYYY"));
      setPhone(userProfile?.userProfile2?.phoneNumber);
      setCity(userProfile?.userProfile2?.city);
      setState(userProfile?.userProfile2?.state);
      setCountry(userProfile?.userProfile2?.country);
      setYouare(userProfile?.userProfile2?.youAre);
      setStudied(userProfile?.userProfile2?.studiedAt);
      setDescription(userProfile?.userProfile2?.description);
    }
    // eslint-disable-next-line
  }, [isLoading, isSuccess])

  const handleSubmit = (e) => {
    e.preventDefault();

    setButton(true)

    const updatedData = {
      profilePhoto: imageBuffer == null ? userProfile?.userProfile2?.profilePhoto : imageBuffer,
      backGroundPhoto: backGroundImageBuffer == null ? userProfile?.userProfile2?.backGroundPhoto : backGroundImageBuffer,
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      phoneNumber: phone,
      dateOfBirth: moment(birthday, "DD-MM-YYYY").toISOString(),
      city: city,
      state: state,
      country: country,
      youAre: youare,
      studiedAt: studied,
      description: description,
    };
    API.post("/updateProfile", updatedData)
      .then((res) => {
        if (res.data?.status === 1) {
          setButton(false)
        }
        toast.success("Your Profile Has Been Updated");
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        setButton(false)
      })
  };

  return (
    <>
      <ToastContainer />

      <div className="border-l w-full lg:w-[80%] lg:p-2 lg:absolute right-0 lg:pt-[30px]">

        {isError && (
          <div className="text-base font-semibold text-center pt-20">Something Went Wrong. Please Try Again Later !!!</div>
        )}

        <form className="w-full" onSubmit={handleSubmit}>

          <div className='text-3xl font-bold mb-2 md:mb-0 pt-2 pl-4 pr-4'>Edit Profile</div>

          {isLoading && (<SettingAnimation />)}

          {!isLoading && userProfile && (
            <>
              <div className="flex md:gap-8 gap-4 pb-5 items-center md:p-8 md:pt-4 p-6 md:pb-4 border-b space-x-5">
                <div className="relative md:w-20 md:h-20 w-20 h-20 shrink-0">
                  <label htmlFor="file" className="cursor-pointer">
                    {
                      !userProfile?.userProfile2 && imageBuffer === null ? (
                        <><img onError={(e) => e.target.src = noProfilePicture} src={noProfilePicture} className="object-cover w-20 h-20 rounded-full" style={{ border: '4px solid' }} alt="" /></>
                      ) : (
                        imageBuffer === null ? (
                          <img onError={(e) => e.target.src = noProfilePicture} src={userProfile?.userProfile2?.profilePhoto || noProfilePicture} className="object-cover w-20 h-20 rounded-full border-4 border-black" style={{ border: '4px solid' }} alt="" />
                        ) : (
                          <img onError={(e) => e.target.src = bannerBAckground} src={imageBuffer || bannerBAckground} className="object-cover w-20 h-20 rounded-full border-4 border-black" style={{ border: '4px solid' }} alt="" />
                        )
                      )
                    }
                    <input onChange={(e) => { setNewProfilePhoto(e.target.files[0]) }} accept="image/*" type="file" id="file" className="hidden" />
                    <div className="font-extrabold mx-auto w-fit">profile</div>
                  </label>

                  <label htmlFor="file" className="md:p-1 p-0.5 rounded-full bg-[#2d51ab] border-4 border-white absolute -bottom-2 -right-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="g" className="md:w-4 md:h-4 w-5 h-5 fill-white">
                      <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z"></path>
                      <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" ></path>
                    </svg>
                    <input accept="image/*" id="file" type="file" className="hidden" />
                  </label>
                </div>

                {/* background photo */}
                <div className="relative md:w-20 md:h-20 w-20 h-20 shrink-0">
                  <label htmlFor="file1" className="cursor-pointer">
                    {
                      !userProfile?.userProfile2 && !backGroundImageBuffer ? (
                        <img onError={(e) => (e.target.src = noProfilePicture)} src={noProfilePicture} className="object-cover w-20 h-20 rounded-full border-4 border-black" style={{ border: '4px solid' }} alt="Default Background" />
                      ) : (
                        <img onError={(e) => (e.target.src = noProfilePicture)} src={backGroundImageBuffer || userProfile?.userProfile2?.backGroundPhoto || noProfilePicture} className="object-cover w-20 h-20 rounded-full border-4 border-black" style={{ border: '4px solid' }} alt="User Background" />
                      )
                    }
                    <input onChange={(e) => { const file = e.target.files[0]; setNewBackGroundPhoto(file); }} accept="image/*" type="file" id="file1" className="hidden" />
                    <div className="font-extrabold mx-auto w-fit">Background</div>

                  </label>

                  <label htmlFor="file1" className="md:p-1 p-0.5 rounded-full bg-[#2d51ab] border-4 border-white absolute -bottom-2 -right-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="md:w-4 md:h-4 w-5 h-5 fill-white">
                      <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z"></path>
                      <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" ></path>
                    </svg>
                    <input id="file1" type="file" className="hidden" />
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-center w-full">
                <div className="bg-white w-full p-4 px-4 md:p-8 mb-6 space-y-2">

                  <div className="w-full sm:flex sm:space-x-10">
                    <div className="w-full -space-y-1">
                      <label htmlFor="Fname"> First Name <span className="text-red-700">*</span></label>
                      <input onChange={(e) => setFirstName(e.target.value)} value={firstName} type="text" name="Fname" id="Fname" className="h-10 mt-1 outline-none border-[#7885b0] focus:border-[#475994] border-2 rounded px-2 sm:px-4 w-full" placeholder="Jhon" required />
                    </div>

                    <div className="w-full -space-y-1">
                      <label htmlFor="Lname"> Last Name <span className="text-red-700">*</span></label>
                      <input onChange={(e) => setLastName(e.target.value)} value={lastName} type="text" name="Lname" id="Lname" className="h-10 mt-1 outline-none border-[#7885b0] focus:border-[#475994] border-2 rounded px-2 sm:px-4 w-full" placeholder="Patrik" required />
                    </div>
                  </div>

                  <div className="w-full sm:flex sm:space-x-10">
                    <div className="w-full -space-y-1">
                      <label htmlFor="phone">Phone <span className="text-[10px] font-semibold">(only digits)</span></label>
                      <input onChange={(e) => setPhone(e.target.value)} value={phone} type="text" maxLength="10" name="phone" id="phone" pattern="[0-9]*" className="h-10 mt-1 outline-none border-[#7885b0] focus:border-[#475994] border-2 rounded px-2 sm:px-4 w-full" placeholder="7623569909" />
                    </div>

                    <div className="w-full -space-y-1">
                      <label htmlFor="birthday"> Birth Day <span className="text-[10px] font-semibold">(DD-MM-YYYY)</span> <span className="text-red-700">*</span></label>
                      <input onChange={(e) => setBirthday(e.target.value)} value={birthday} type="text" name="birthday" id="birthday" className="h-10 mt-1 outline-none border-[#7885b0] focus:border-[#475994] border-2 rounded px-2 sm:px-4 w-full" required placeholder="DD-MM-YYYY" pattern="\d{2}-\d{2}-\d{4}" />
                    </div>
                  </div>

                  <div className="sm:flex sm:space-x-5 w-full justify-between">
                    <div className="w-full -space-y-1">
                      <label htmlFor="city">City</label>
                      <input onChange={(e) => setCity(e.target.value)} value={city} type="text" name="city" id="city" className="h-10 mt-1 outline-none border-[#7885b0] focus:border-[#475994] border-2 rounded px-2 sm:px-4 w-full" placeholder="City" />
                    </div>

                    <div className="w-full -space-y-1">
                      <label htmlFor="address">State</label>
                      <input onChange={(e) => setState(e.target.value)} value={state} type="text" name="address" id="address" className="h-10 mt-1 outline-none border-[#7885b0] focus:border-[#475994] border-2 rounded px-2 sm:px-4 w-full" placeholder="State" />
                    </div>

                    <div className="w-full -space-y-1">
                      <label htmlFor="country">Country</label>
                      <div className="h-10 bg-gray-50 outline-none border-[#7885b0] focus:border-[#475994] border-2 flex rounded items-center mt-1"> <input onChange={(e) => setCountry(e.target.value)} value={country} name="country" id="country" placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                      </div>
                    </div>
                  </div>

                  <div className="w-full -space-y-1">
                    <div className="w-full -space-y-1">
                      <label htmlFor="youare"> You Are <span className="text-red-700">*</span></label>
                      <input onChange={(e) => setYouare(e.target.value)} value={youare} type="text" name="youare" id="youare" className="h-10 mt-1 outline-none border-[#7885b0] focus:border-[#475994] border-2 rounded px-2 sm:px-4 w-full" placeholder="Profess..." required />
                    </div>

                    <div className="w-full mt-1">
                      <label htmlFor="studied"> Studied At</label>
                      <input onChange={(e) => setStudied(e.target.value)} value={studied} type="text" name="studied" id="studied" className="h-10 mt-1 outline-none border-[#7885b0] focus:border-[#475994] border-2 rounded px-2 sm:px-4 w-full" placeholder="Collage" />
                    </div>
                  </div>

                  <div className="">
                    <label htmlFor="description">Description <span className="text-red-700">*</span></label>
                    <textarea maxLength={200} onChange={(e) => setDescription(e.target.value)} value={description} type="text" name="description" id="description" className="transition-all flex items-center py-2 resize-none h-24 mt-1 rounded px-2 sm:px-4 w-full outline-none border-2 border-[#7885b0] focus:border-[#475994]" placeholder="" required />
                  </div>

                  <button disabled={button} type="submit" className={`active:opacity-75 bg-[#2d51ab] hover:bg-[#405ba0] text-white font-semibold py-2 px-4 rounded ${button ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>Save Changes</button>

                </div>
              </div>
            </>
          )}

        </form>

      </div>

    </>
  );
};

export default React.memo(UpdateProfile);
