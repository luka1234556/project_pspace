import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { GiHadesSymbol } from "react-icons/gi";
import { CgAddR, CgRemoveR } from "react-icons/cg";
import { BiSolidImageAdd } from "react-icons/bi";
import { TbSettings } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiLogout, CiCircleRemove } from "react-icons/ci";
import { GoMoon } from "react-icons/go";
import { PiUserSwitchLight } from "react-icons/pi";


function Profile() {
  const navigate = useNavigate();
  const addPicInputRef = useRef(null);
  const postInputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [bioInputVisible, setBioInputVisible] = useState(false);
  const [bioText, setBioText] = useState("");
  const [tempPosts, setTempPosts] = useState([]);
  const [moreScreen, setMoreScreen] = useState(false);

  const generateAvatar = (username) => {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${username}`;
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (storedUser) {
      if (!storedUser.profilePicture) {
        storedUser.profilePicture = generateAvatar(storedUser.username);
        updateUser(storedUser);
      }

      setUser(storedUser);
      setBioText(storedUser.bio || "");
    } else {
      navigate("/");
    }
  }, []);

  const updateUser = (updatedUser) => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = allUsers.map((u) =>
      u.username === updatedUser.username ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const handleBioSave = () => {
    const updatedUser = { ...user, bio: bioText };
    updateUser(updatedUser);
    setBioInputVisible(false);
  };

  const handleAddPicture = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      const updatedUser = { ...user, profilePicture: base64Image };
      updateUser(updatedUser);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePicture = () => {
    const updatedUser = {
      ...user,
      profilePicture: generateAvatar(user.username),
    };
    updateUser(updatedUser);
  };

  const handlePostUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setTempPosts((prev) => [...prev, base64Image]);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePost = (index) => {
    setTempPosts((prev) => prev.filter((_, i) => i !== index));
  };

  if (!user) return null;

  const handleSwitch = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/register");
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }

  return (
    <div 
    className="min-h-screen bg-gradient-to-b px-4 py-6 flex gap-5
    flex-row items-center from-blue-100 to-blue-200">

{/*--Aside Buttons-----------------------------------------*/}
      <aside 
      className="h-[40rem] w-[18rem] bg-gradient-to-b hidden md:block p-5
      from-blue-50 to-blue-100 rounded-xl border border-gray-300 ml-10">

        <h1 
        className="flex items-center gap-2 text-4xl border-b-2 pb-5
        font-sans text-blue-500 cursor-default select-none">
          <GiHadesSymbol/>
          PSpace
        </h1>

        <div className="flex flex-col gap-5 justify-start items-start
        mt-10 relative">

          {[{id:1, text: "Go Back", click:() => navigate("/personalPage"),
            icon: <BsChevronLeft />
            },

            {id:2, text: "Change Profile", click:() => addPicInputRef.current.click(),
            icon: <CgAddR/>
            },

            {id:3, text: "Remove Profile", click:handleRemovePicture,
            icon: <CgRemoveR/>
            },

            {id:4, text: "New Post", click:() => postInputRef.current.click(),
            icon: <BiSolidImageAdd />
            },

            {id:5, text: "Settings", icon: <TbSettings />
            },

            {id:6, text: "More", click:() => setMoreScreen(!moreScreen),
              icon: <RxHamburgerMenu />
            },
          ].map((button) => (
            <button
            key={button.id}
            onClick={button.click}
            className="flex items-center gap-1 justify-start cursor-pointer group
            py-2 hover:scale-110 transition-all duration-200 hover:text-blue-50
            text-gray-600 hover:bg-blue-500 w-full rounded-xl p-2 text-lg
            active:bg-blue-300"
            >
              <p 
              className="group-hover:-translate-x-1 transition-transform
              duration-200 mr-2">
              {button.icon}
              </p>

              {button.text}
            </button>
          ))}

        {moreScreen && (
          <div 
          className="absolute w-full h-50 bg-gradient-to-b flex flex-col
          from-sky-100 to-blue-100 p-2 rounded-xl bottom-12 left-5
          items-start justify-evenly px-4 gap-5 border border-gray-500">
            {[{idx:1, text: "Log Out", click:handleLogout, icon:<CiLogout />}, 
              {idx:2, text: "Switch Appearance", icon:<GoMoon />}, 
              {idx:3, text: "Switch Account", click:handleSwitch, icon:<PiUserSwitchLight />}
             ].map((setting) => (
              <button
              onClick={setting.click}
              key={setting.idx}
              className="flex items-center gap-2 hover:scale-110 transition-all
              duration-200 hover:text-blue-50 text-gray-600 hover:bg-gradient-to-b
              from-sky-500 to-blue-500 p-2 cursor-pointer w-full rounded-lg text-lg
              group"
              >
                <p className="group-hover:text-2xl transition-all duration-200">
                  {setting.icon}
                </p>
                {setting.text}
              </button>
            ))}
          </div>
        )}

        {/*Profile buttons*/}           
          <input
          ref={addPicInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAddPicture}
          />

        {/*New Post button*/}
          <input
          ref={postInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePostUpload}
          />
        </div>

      </aside>

{/*--------------------------------------------------------------*/}

      <div className="w-[65rem]">
      {/* Back Button */}
        <div 
        className="w-full max-w-5xl mb-4 md:hidden">
          <button
          onClick={() => navigate("/personalPage")}
          className="flex items-center gap-1 text-blue-400 md:text-gray-500
          hover:text-blue-500 cursor-pointer hover:scale-110
          transition-all duration-200"
          >
            <BsChevronLeft />
            Go Back
          </button>
        </div>

        {/* Profile Info */}
        <div 
        className="flex-1/2 md:flex gap-5 bg-gradient-to-t 
        shadow-md p-6 rounded-xl w-full max-w-5xl from-blue-50
      to-white border-1 border-gray-300">
          <div 
          className="flex md:border-r-1 border-gray-300">
            <img
            src={user.profilePicture}
            alt="Profile"
            className="md:w-[11rem] md:h-[11rem] aspect-square object-cover rounded-[4rem]
            border-2 p-1 border-gray-400 w-[8rem] h-[8rem]"
            />

            {/* Bio Section */}
            <div>
              {bioInputVisible ? (
                <div 
                className="flex flex-col items-start gap-3 relative">
                  <textarea
                  placeholder="Add Your Bio Text"
                  value={bioText}
                  maxLength={100}
                  onChange={(e) => setBioText(e.target.value)}
                  className="z-20 md:min-w-[50rem] md:max-w-[50rem] bg-gradient-to-b shadow-lg
                  min-w-[24rem] max-w-full md:min-h-[25rem] md:max-h-[25rem]
                  text-2xl p-3 text-sky-700 rounded-3xl border-2 border-sky-200
                  shadow-blue-100 font-mono absolute md:right-[-33rem]
                  left-[-10.5rem]
                  min-h-[16rem] max-h-[16rem] from-blue-100 to-sky-50" 
                  />

                  <div 
                  className="flex gap-3 z-20 absolute md:top-[20rem] md:left-[20rem]
                  left-[-1rem] top-[12rem] w-[20rem]">
                    <button
                    onClick={handleBioSave}
                    className="bg-gradient-to-b from-blue-100 to-sky-200 hover:bg-blue-400
                  text-gray-800 text-sm md:px-10 px-5 py-3 rounded-md transition-all
                  hover:text-white hover:scale-105 cursor-pointer"
                    >
                      Save Bio
                    </button>

                    <button
                      onClick={() => setBioText("")}
                      className="bg-gradient-to-b from-blue-100 to-sky-200 hover:bg-red-400
                      text-gray-800 text-sm md:px-10 px-5 py-3 rounded-md transition-all
                      hover:text-white hover:scale-105 cursor-pointer"
                    >
                      Delete Bio
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex ml-3">
                  <div className="flex md:hidden gap-2 flex-col w-40">
                    {[{ id: 1, text: "Update Profile", click: () => addPicInputRef.current.click() },
                      { id: 2, text: "Delete Profile", click: handleRemovePicture },
                      { id: 3, text: `${user.bio ? "Edit Bio" : "Add Bio"}`, click: () => setBioInputVisible(true) }
                    ].map((buttons) => (
                      <button
                      onClick={buttons.click}
                      key={buttons.id}
                      className="flex items-center justify-center bg-gradient-to-b
                    from-blue-200 to-sky-200 text-gray-600 rounded-xl border
                    border-gray-400 px-4 py-1 active:bg-gradient-to-t"
                      >
                        {buttons.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
            
          {/*For Bio dark background*/}
          {bioInputVisible && (
            <div
            onClick={() => setBioInputVisible(false)} 
            className="inset-0 bio-bg opacity-80 fixed z-10"/>
          )}

          <div 
          className="flex-1/2 md:flex-col gap-3 mt-5">
              <div className="md:flex gap-2">
                <h1 
                className="text-2xl text-gray-600 md:text-3xl">
                  {user.username}
                </h1>
                
                <button
                onClick={() => setBioInputVisible(true)}
                className="bg-gray-300 px-5 rounded-lg hover:bg-blue-400
                cursor-pointer active:bg-blue-200 hover:text-blue-50 transition-all
                duration-200 hidden md:block md:ml-5"
                >
                  {user.bio ? "Edit Bio" : "Add Bio"}
                </button>

              </div>
              
              <div 
              className="flex gap-5 items-center mt-3 mb-5">
                {[{text:"posts", number: tempPosts.length}, 
                  {text:"Followers", number: 0}, 
                  {text:"Friends", number: 0}].map((stats, index) => (
                    <div 
                    key={index}
                    className="flex text-xl"
                    >
                      <h1 
                      className="pr-1 text-gray-700">
                        {stats.number}
                      </h1>

                      <h1 className="text-gray-500 hover:text-blue-500 select-none
                      cursor-default">
                        {stats.text}
                      </h1>
                    </div>
                ))}
              </div>

              <p 
              className="text-gray-500 break-words whitespace-pre-wrap 
              max-w-sm w-full md:w-[400px] bg-gradient-to-b p-1 rounded-md
            from-sky-50 to-blue-50 border border-gray-400 overflow-hidden">
                {user.bio || "Bio Text"}
              </p>
            </div>
          </div>

          <div className="md:hidden flex items-center justify-center
          bg-gradient-to-b from-blue-100 to-sky-100 rounded-lg mt-1
          border border-gray-300 p-1">
            <button
            onClick={() => postInputRef.current.click()}
            className="flex items-center gap-2 bg-blue-300 p-3 rounded-lg
            text-sky-50 px-5 active:bg-blue-200 font-sans"
            >
            <CgAddR className="text-2xl"/>
              New Post
            </button>
          </div>

          {/* Render Posts */}
          {tempPosts && (
            <div
            className="w-full max-w-5xl mt-1 border rounded-xl p-2
            max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200
            h-[400px] border-gray-300 bg-gradient-to-t from-blue-100 to-blue-50
            flex items-start justify-center relative"
          >
            {tempPosts.length === 0 ? (
              <div 
              className="text-center text-gray-400 absolute top-20
              md:text-[15rem] md:top-10 opacity-80 font-serif cursor-default
              select-none text-[10rem]">
                <GiHadesSymbol 
                className="mx-auto mb-2 text-blue-300" />
                
                <p className="text-2xl">
                  No posts yet. Add a picture!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-0.5 w-full px-1">
                {tempPosts.map((post, idx) => (
                  <div
                  key={idx}
                  className="relative bg-gradient-to-t from-black 
                to-black/80 overflow-hidden rounded-md w-full group"
                  >
                    <img
                    src={post}
                    alt={`post-${idx}`}
                    className="w-full h-60 md:h-75 object-cover shadow-sm 
                    border opacity-70 hover:opacity-100 hover:scale-105
                    transition-all duration-200 rounded-md"
                    />

                    <button
                    onClick={() => handleRemovePost(idx)}
                    className="absolute top-1 right-1 hover:text-rose-500 
                    shadow cursor-pointer hover:border-red-500 p-1
                  md:text-gray-500 text-white rounded-full group-hover:bg-gray-200"
                    title="Remove"
                    >
                      <CiCircleRemove 
                      className="text-3xl group-hover:scale-110 transition-all duration-200"/>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          )}
        </div>
    </div>
  );
}

export default Profile;