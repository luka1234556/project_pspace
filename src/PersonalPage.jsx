import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";

/*------------ICONS FOR NAVIGATIONS----------------*/
import { IoExitOutline } from "react-icons/io5";
import { LuMessageCircleWarning } from "react-icons/lu";
import { HiHome } from "react-icons/hi2";
import { GrInfo } from "react-icons/gr";
import { IoPerson } from "react-icons/io5";
import { TbArrowDownToArc, TbMessageChatbotFilled, TbDentalBroken } from "react-icons/tb";
import { GiHadesSymbol, GiPalette } from "react-icons/gi";
import { AiOutlineApi, AiOutlineMessage } from "react-icons/ai";
import { IoIosBug } from "react-icons/io";
import { CgDetailsMore } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { MdOutlinePersonSearch, MdSupportAgent } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { RiUserHeartLine, RiFireLine } from "react-icons/ri";
/*---------------------------------------------*/

/*------------ICONS FOR SECTION 3----------------*/
import { BsChevronLeft, BsChevronRight, BsInstagram, BsTwitter } from "react-icons/bs";
import { FaUserCheck } from "react-icons/fa6";
import { GoProject } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { GiStarProminences, GiPolarStar } from "react-icons/gi";
import { RiMoonFill } from "react-icons/ri";
import { ImStatsDots } from "react-icons/im";
import { FaReact, FaHandsHelping, FaLevelUpAlt } from "react-icons/fa";
import { GiBearFace } from "react-icons/gi";
import { VscRobot, VscCompassActive } from "react-icons/vsc";
import { SiFuturelearn } from "react-icons/si";
import { BiMath } from "react-icons/bi";
import { FiUsers, FiDelete } from "react-icons/fi";
import { FcApproval } from "react-icons/fc";
import { AiTwotonePieChart } from "react-icons/ai";
import { TbBackground } from "react-icons/tb";
import { LuBrainCircuit } from "react-icons/lu";
/*---------------------------------------------*/


/*------------ICONS FOR SECTION 4----------------*/
import { BsAwardFill } from "react-icons/bs";
import { VscEye } from "react-icons/vsc";
import { PiEyeClosedThin } from "react-icons/pi";
/*---------------------------------------------*/

/*--------------Footer Icons-------------------*/
import { FaFacebookF, FaInstagram,
FaYoutube, FaTiktok, FaLinkedinIn, FaAppStore,
FaGooglePlay, FaPlus, FaMinus } from "react-icons/fa";
import { FaEarthEurope } from "react-icons/fa6";

const footerIcons = [
  {id: 1, text: "FACEBOOK" ,icon:<FaFacebookF />, 
  color: "hover:text-blue-600", link: "https://www.facebook.com/"},

  {id: 2, text: "INSTAGRAM" ,icon:<FaInstagram />, 
  color: "hover:text-pink-500", link: "https://www.instagram.com/"},

  {id: 3, text: "YOUTUBE" ,icon:<FaYoutube />, 
  color: "hover:text-red-500", link: "https://www.youtube.com/"},

  {id: 4, text: "TIKTOK" ,icon:<FaTiktok />, 
  color: "hover:text-sky-200", link: "https://www.tiktok.com/"},

  {id: 5, text: "LINKEDIN" ,icon:<FaLinkedinIn />, 
  color: "hover:text-blue-400", link: "https://www.linkedin.com/"},
]
/*----------------------------------------------*/


/*SECTION 3 slide 3 stats */
const stats = [
  {id: 1, label: "lines of code", number:3000},
  {id: 2, label: "cups of coffee", number: 50},
  {id: 3, label: "Bugs squashed", number: 120},
  {id: 4, label: "Features tested", number: 30},
  {id: 5, label: "Hours Spent", number: 100},
];


/*SECTION 2 creators & icons */
import { GiGiftOfKnowledge } from "react-icons/gi";
import { IoCalendarNumber } from "react-icons/io5";
import { IoMdMore, IoIosClose } from "react-icons/io";
import { FaRegCheckCircle, FaLaptopCode, FaPaintBrush } from "react-icons/fa";
import { BsPersonGear, BsLinkedin, BsInfoCircle } from "react-icons/bs";

const Creators = [
  {id:1, name: "Luka Kartvelishvili", status: "Front-End Developer",
  age: 22, hobby: "Boxing", img: "/luka.jpg", 
  role: "junior", experience:1},

  {id:2, name: "Matiu Teit", status: "Back-End Developer", 
  age: 21, hobby: "drawing", img: "/Matiu.jpg", 
  role: "junior", experience:1},

  {id:3, name: "Grace Henderson", status: "Front-end developer",
  age: 27, hobby: "Dancing", img: "/Grace.png", 
  role: "Senior", experience:7},

  {id:4, name: "Mr. Chat-Gpt", status: "Full-stuck developer",
  age: 40, hobby: "playing on piano", img: "/chat.png", 
  role: "Senior", experience:10},

  {id:5, name: "Temraz Kartvelishvili", status: "UI/UX designer", 
  age: 19, hobby: "painting", img: "/temraz.jpg", 
  role: "Middle", experience:2},

  {id:6, name: "Ava Sullivan", status: "Back-end developer",
  age: 35, hobby: "swimming", img: "/Ava.png", 
  role: "Senior", experience:8},

  {id:7, name: "Liam Cooper", status: "UI/UX designer", 
  age: 35, hobby: "Gym", img: "/Liam.png", 
  role: "Senior", experience:9},
]

/*------------------------------------------------------- */

function PersonalPage() {

/*---FOR HEADER ANIMATION--------------- */
  const [showHeader, setShowHeader] = useState(true);
  /*thats for input animation ;) */
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [headerInput, setHeaderInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  /*For mobile size header functionallity */
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);
  /*--------------------------------------------*/
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
    // adjust the 300 value as you need
      if (window.scrollY < 300) { 
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };  

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

/*use effect for mobile size header */
  useEffect(() => {
    const handleScroll = () => {
      const distanceFromBottom =
        document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
        setIsNearBottom(distanceFromBottom < 100); // 100px from bottom
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

/*------------------------------------------------------*/

  /*Message help section */
  const [message, setMessage] = useState(false);
  const [user, setUser] = useState(null); 
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser")); // Get user data from localStorage
    const allUsers = JSON.parse(localStorage.getItem("users")) || []; // Get all users from localStorage

    // If there's a logged-in user
    if (storedUser) {
      // If user doesn't have a profile picture, create a default one
      if (!storedUser.profilePicture) {
        const avatarUrl = generateAvatar(storedUser.username);
        storedUser.profilePicture = avatarUrl;

        // Update the list of users in localStorage with the new profile picture
        const updatedUsers = allUsers.map((u) =>
          u.username === storedUser.username
            ? { ...u, profilePicture: avatarUrl } // Update the user's picture
            : u
        );

        localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save updated users list
        localStorage.setItem("loggedInUser", JSON.stringify(storedUser)); // Save updated user
      }

      setUser(storedUser); // Set user state
    } else {
      navigate("/"); // Redirect to login page if no user is found
    }
  }, []);


  const logOut = () => {
    try {
      localStorage.removeItem("loggedInUser");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  /*-------------------------- */
/*-------SECTION 2 button TOOLS--------*/

const scrollRef2 = useRef(null);
const [creatorInfo, setCreatorInfo] = useState(false);
const [creatorInfo2, setCreatorInfo2] = useState(false);

const scrollLeft2 = () => {
  scrollRef2.current.scrollBy({
    left: -1290, // adjust based on your card width
    behavior: "smooth",
  });
};

const scrollRight2 = () => {
  scrollRef2.current.scrollBy({
    left: 1290,
    behavior: "smooth",
  });
};

  /*-------------------------- */
/*-------SECTION THREE TOOLS--------*/

  /*For Large screen stats (slide 3) */

  const getHeightClass = (number) => {
    if (number > 500) return "h-85";
    else if (number > 110) return "h-55";
    else if (number > 90) return "h-45";
    else if (number > 45) return "h-30";
    else if (number > 20) return "h-15";
    else return "h-1";
  };

/* Section 3. slide 2, 3 and 4 animation references */
  const slide1Ref = useRef(null);
  const isInView1 = useInView(slide1Ref, { once: true, amount: 0.5 });
  const slide2Ref = useRef(null);
  const isInView2 = useInView(slide2Ref, { once: true, amount: 0.5 });
  const slide3Ref = useRef(null);
  const isInView3 = useInView(slide3Ref, { once: true, amount: 0.6});
  const slide4Ref = useRef(null);
  const isInView4 = useInView(slide4Ref, { once: true, amount: 0.5 });
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = 4; // Change based on your content
  const section2Ref = useRef(null);

  const scroll = (direction) => {
    const container = section2Ref.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth;

    if (direction === "right") {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    const scrollLeft = section2Ref.current.scrollLeft;
    const width = section2Ref.current.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  const scrollToSlide = (index) => {
    const width = section2Ref.current.offsetWidth;
    section2Ref.current.scrollTo({ left: index * width, behavior: "smooth" });
    setActiveIndex(index);
  };
/*----------------------------------------------------*/


/*SECTION 4 Tools*/
  const users = [
    {id:1, status: "Mentor of Thousands", name: "Alex", image: "alex.jpg"},
    {id:2, status: "Mastermind of the Month", name: "John", image: "john.jpg"},
    {id:3, status: "Most Inspiring Creator", name: "Max", image: "max.jpg"},
    {id:4, status: "Fastest Growing Profile", name: "Lukas", image: "lukas.jpg"},
    {id:5, status: "Best physic", name: "David", image: "david.jpg"},
    {id:6, status: "#1 Most Followed Member", name: "Anna", image: "anna.jpg"},
    {id:7, status: "Photogenic Fame Icon", name: "Clara", image: "clara.jpg"},
    {id:8, status: "Brilliant Idea Generator", name: "Eve", image: "Eve.jpg"},
    {id:9, status: "Innovation Award Winner", name: "Matiu", image: "mate.jpg"}
  ];

  const scrollRef4 = useRef(null);

  const scrollLeft4 = () => {
    scrollRef4.current.scrollBy({
      left: -655, // adjust based on your card width
      behavior: "smooth",
    });
  };

  const scrollRight4 = () => {
    scrollRef4.current.scrollBy({
      left: 655,
      behavior: "smooth",
    });
  };


  /*--------------------------*/
/*---Responsive Footer tools here!---*/
const footerSections = [
  {
    id: "help",
    title: "HELP",
    items: ["FAQ", "Delivery Information",
    "Submit a Fake", "Can't find a friend", "Can't sign in", "more..."
    ]
  },
  {
    id: "account",
    title: "MY ACCOUNT",
    items: ["Log Out", "Register"],
    links: ["/", "/register"]
  },
  {
    id: "pages",
    title: "PAGES",
    items: ["About Us", "Student Discount", 
    "Military Discount", "Sustainability", "Factory List", "Refer a Friend"
    ]
  }
];

const [openSection, setOpenSection] = useState(null);

/*--------------------------------------*/

  return (
    <div 
    className="min-h-screen flex flex-col justify-center items-center
    bg-gradient-to-b from-gray-100 to-blue-100 z-100 relative 
    max-w-full md:max-w-full overflow-x-hidden">

{/*------HEADER SECTION--------------------*/} 
    {/*1 For large sized header */}
      <AnimatePresence>
        {showHeader && (
          <motion.header
          initial={{ opacity: 0, y: -40 }} // Start hidden and above
          animate={{ opacity: 1, y: 0 }}    // Fade in and slide down
          /*exit - How it disappears (hidden again) */
          exit={{ opacity: 0, y: -40 }}      // Fade out and slide up
          transition={{ duration: 0.4 }}     // Smooth timing
          className="bg-gradient-to-l from-blue-300 to-blue-200 
          hidden items-center justify-between
          md:py-0 w-full h-20 fixed top-0 z-40 shadow-2xl md:px-20 sm:flex "
          >    
          {/*Web Name*/}  
            <div>
              <span
              className="absolute top-0 left-0 w-80 h-20 bg-gradient-to-t
              from-blue-500 to-gray-800"
              style={{
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 60% 100%, 0% 100%)'
              }}
              />
              
              <h1 
              className="flex items-center gap-2 md:text-xl lg:text-2xl 
              z-10 relative text-gray-200">
                PSpace
                <GiHadesSymbol className="text-blue-500 text-3xl" />
              </h1>
            </div>

          
          {/*input and navigations */}
            <div className="flex gap-5 items-center">

              <nav 
              className="flex">
                <ul 
                className="flex">
                {[
                  {id:1, text: "HOME", icon: <HiHome />, link: "#home" },
                  {id:2, text: "CREATORS", icon: <IoPerson />, link: "#creators" },
                  {id:3, text: "ABOUT", icon: <GrInfo />, link: "#about" },
                  {id:4, text: "STARS", icon: <RiUserHeartLine />, link: "#Tops" },
                  {id:5, text: "LASTLINE", icon: <TbArrowDownToArc />, link: "#lastline" },
                  {id:6, text: "HELP", icon: <TbMessageChatbotFilled />, click:() => setMessage(true) },
                  {id:7, text: "PROFILE", icon: <VscAccount />,  click:() => navigate("/Profile") }
                ].map((nav) => (
                  <li 
                  key={`nav-${nav.id}`}
                  className="group relative"
                  > 
                    <a 
                    onClick={nav.click}
                    href={nav.link} 
                    className="flex items-center gap-2 group-hover:bg-gradient-to-b
                    from-blue-300 to-blue-400 h-20 w-25 p-1 justify-center
                    text-sm md:text-[15px] cursor-pointer">
                      <h2 
                      className="group-hover:scale-150 transition-all duration-200
                      group-hover:text-blue-100 text-gray-600">
                        {nav.icon}
                      </h2>
                      <h1
                      className="group-hover:text-blue-100">
                        {nav.text}
                      </h1>
                    </a>
                  </li>
                  ))}
                </ul>
              </nav>

              <div className="relative group">
                <input
                onFocus={() => {
                  setShowSuggestions(false);
                  setIsSearchActive(true)
                }}
                onChange={(event) => setHeaderInput(event.target.value)}
                placeholder="What're you looking for today?"
                className="h-10 w-[17rem] border-1 border-gray-500 p-2 pr-10 
                rounded-2xl bg-gradient-to-r opacity-[0.8] hover:opacity-[1]  
                from-blue-50 to-blue-100 hover:bg-gradient-to-t overflow-hidden" 
                type="text" 
                />

                <FiSearch className="absolute top-[0.8rem] -translate-x-1/2 right-1
                text-gray-500 group-hover:text-gray-900" />
              </div>

            </div>

            {/*To make background dark on input click */}
            {isSearchActive && (
              <div 
              onClick={() => setIsSearchActive(false)}
              className="fixed inset-0 bg-black/60 z-30" />
            )}
          </motion.header>
        )}
      </AnimatePresence>
    
    {/*2 opening input with options */}
      <AnimatePresence>
        {/* Full search input */}
        {isSearchActive && showSuggestions && (
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }} 
          className="bg-gradient-to-b from-blue-300 to-blue-300 
          rounded-xl shadow-lg w-[29rem] p-2 h-90 border-1 
        border-gray-500 md:w-150 absolute z-50 top-16">
                  
            {[
              {num:1, text: "How to add friend on Pspace", icon: <FiSearch />},
              {num:2, text: "Meet the Stars", icon: <FiSearch />},
              {num:3, text: "PSpace Highlights", icon: <FiSearch />},
              {num:4, text: "How to Become a Creator", icon: <FiSearch />},
              {num:5, text: "Rising Stars 2025", icon: <FiSearch />},
              {num:6, text: "Interstellar News", icon: <FiSearch />},
              {num:7, text: "Creator Leaderboard", icon: <FiSearch />},
              {num:8, text: "Top PSpace Creators", icon: <FiSearch />}
              ].map((item) => 
                <p 
                key={`suggestion-${item.num}`}   // <-- prefix is important!!
                onClick={() => setHeaderInput(item.text)}
                className="hover:bg-gradient-to-r from-blue-300 to-blue-400
                cursor-pointer py-2 p-2 rounded-xl hover:text-blue-100 transition-all
                duraiton-200 flex items-center justify-between 
                hover:scale-110 select-none"
                >
                  {item.text}
                  {item.icon}
                </p>
                )}
                {/* You can map here real search results later */}
            </motion.div>
        )}

        {isSearchActive && (
          <React.Fragment 
          key="search-bar-and-exit">
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setIsSearchActive(false);
            }}
            />
              <div 
              className="fixed top-0 left-1/2 -translate-x-1/2 
              w-full flex flex-col items-center z-40">
                <div 
                className="bg-gradient-to-r to-blue-300 w-full py-[15px]
              from-blue-200 flex items-center 
                justify-center">
                  <input
                  onFocus={() => {
                    setIsSearchActive(true);
                    setShowSuggestions(true);
                  }}
                  value={headerInput}
                  onChange={(event) => {
                    setHeaderInput(event.target.value);
                  }}
                  placeholder="Search..."
                  className="h-12 text-xl p-4 pr-12 text-gray-800
                  shadow-lg w-[19rem] border-b-1 border-t-1 bg-gradient-to-r
                  from-blue-100 to-blue-200
                  border-l-1 rounded-tl-2xl rounded-bl-2xl
                  md:w-[30rem] lg:w-[35rem] sm:w-[30rem]"
                  type="text"
                  />
                  <h1 
                  onClick={() => setHeaderInput("")}
                  className="text-gray-600 text-xl p-2 group
                  cursor-pointer bg-blue-200 h-12 rounded-tr-2xl 
                  rounded-br-2xl flex items-center border-t-1 border-b-1
                  border-r-1 md:border-r-2">

                    <FiDelete 
                    className="mr-2 group-hover:scale-110 
                    group-hover:text-blue-50 duration-300
                    group-hover:transition-all" 
                    />
                  </h1>

                  <button 
                  onClick={() => setIsSearchActive(false)}
                  className="absolute right-2 top-[1.6rem] flex items-center 
                  gap-2 md:right-20 md:top-[1rem] hover:scale-105 transition-all duration-300
                  cursor-pointer hover:text-blue-100 md:hover:bg-gradient-to-t
                  md:p-2 rounded-full from-blue-400 md:border border-blue-100
                  text-gray-600 md:px-7 md:py-2">
                    Exit
                  <IoExitOutline />
                  </button>
                </div>

              </div>
          </React.Fragment>
        )}
      </AnimatePresence>
    
    {/*3 side panel for only large screen */}
      <AnimatePresence>
        {!showHeader && (
          <motion.nav
          initial={{ opacity: 0, x: -50 }}  // Start hidden to the left
          animate={{ opacity: 1, x: 0 }}     // Fade in and slide right
          exit={{ opacity: 0, x: -50 }}       // Fade out and slide left
          transition={{ duration: 0.5 }}      // Smooth timing
          className="hidden md:block fixed top-1/2 left-0 -translate-y-1/2 z-20"
          > 
            <ul 
            className="flex flex-col gap-4">
              {[
                {id:1, text: "HOME", icon: <HiHome />, link: "#home" },
                {id:2, text: "CREATORS", icon: <IoPerson />, link: "#creators" },
                {id:3, text: "ABOUT", icon: <GrInfo />, link: "#about" },
                {id:4, text: "STARS", icon: <RiUserHeartLine />, link: "#Tops" },
                {id:5, text: "LASTLINE", icon: <TbArrowDownToArc />, link: "#lastline" },
                {id:6, text: "HELP", icon: <TbMessageChatbotFilled />, click:() => setMessage(true) },
                {id:7, text: "PROFILE", icon: <VscAccount />, click: () => navigate("/Profile")  }
              ].map((navs) => (
                <li 
                key={`nav-${navs.id}`}
                className="flex items-center gap-2">
                  
                  <a 
                  onClick={navs.click}
                  href={navs.link} 
                  className="flex items-center gap-2 bg-gradient-to-r group
                from-blue-300 to-blue-200 p-2 cursor-pointer h-[3.5rem]
                  rounded-tr-4xl rounded-br-4xl border border-blue-300
                  transition-all duration-300 hover:shadow-lg">
                    <h1
                    className="transition-all w-0 opacity-0 group-hover:w-auto 
                    group-hover:opacity-100 text-blue-100">
                      {navs.text}
                    </h1>
                    
                    <h2 
                    className="transition-transform text-blue-500 pr-2
                    group-hover:text-blue-100 group-hover:scale-110">
                      {navs.icon}
                    </h2>
                    
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

    {/*4 for mobile size header */}
      <AnimatePresence>
        <motion.header
          className={`sticky top-0 z-40 transition-all duration-300 border-b-1 px-2
          ${isNearBottom ? "opacity-30" : "opacity-100"} w-full md:hidden flex
          bg-gradient-to-l from-blue-200 to-blue-300 border-blue-700
          justify-between items-center relative`}>
          {/*PSpace name */}
            <div>
              <h1 
              className="flex items-center gap-1 text-3xl font-bold
              text-blue-400 z-10 opacity-50">
                <GiHadesSymbol 
                className="text-blue-600 text-5xl" />
              </h1>
            </div>
          
          {/*Navigations */}
            <ul 
            className="flex gap-10 z-20 mr-10 text-3xl h-20 
            items-center w-[25rem] justify-evenly">
              <li>
                <a
                onClick={() => setActiveIcon("home")}
                className={`flex items-center gap-1 transition-all duration-200 
                ${activeIcon === "home"
                ? "text-blue-50 font-bold scale-120"
                : "text-gray-700"}`}
                href="#home"
                >
                  <HiHome />
                </a>
              </li>

              <li>
                <a
                onClick={() => setActiveIcon("lastline")}
                className={`flex items-center gap-1 transition-all duration-200
                ${activeIcon === "lastline"
                ? "text-blue-100 font-bold scale-120"
                : "text-gray-700"}`} 
                href="#lastline"
                >
                  <TbArrowDownToArc />
                </a>
              </li>

              <li>
                <a
                className={`flex items-center gap-1 transition-all duration-200
                ${activeIcon === "HELP"
                ? "text-blue-100 font-bold scale-120"
                : "text-gray-700"}`}  
                onClick={() => setMessage(true)}
                href="#HELP"
                >
                 <LuMessageCircleWarning />
                </a>
              </li>

              <li>
                <a
                onClick={() => navigate("/Profile")}
                className={`flex items-center gap-1 transition-all duration-200
                ${activeIcon === "account"
                ? "text-blue-100 font-bold scale-120"
                : "text-gray-700"}`}
                href="#account"
                >
                  <VscAccount />
                </a>
              </li>
            </ul>
          </motion.header>
      </AnimatePresence>
{/*--------------------------------------- */}    


{/*-------MESSAGE HELP BOX----------- */}
    <div className={`top-0 w-80 right-0 z-50 duration-300 border-l-2
    border-gray-200 flex flex-col justify-between bg-gradient-to-t
    from-blue-200 via-indigo-200 to-blue-100
    fixed h-full shadow-2xl p-6 transform transition-transform
    ${message ? "translate-x-0" : "translate-x-full"}`}>
      <GiHadesSymbol
      className="absolute text-[30rem] z-1 top-20 left-[-5rem]
      text-gray-900 opacity-30"/>

      <div className="absolute bottom-25 w-full h-[1px] bg-blue-500
      right-0"/>

      {/* Content container */}
      <div className="relative">
        <h1
        className="flex items-center gap-2 justify-center text-5xl font-bold 
      text-blue-500 mb-10 z-10 drop-shadow-xl relative">
          PSpace
          <GiHadesSymbol />
        </h1>

      {/* Triangle background behind h1 */}
        <p 
        className="font-semibold text-gray-600 text-3xl ml-5 z-100 
        relative">
          Hello
        </p>

        <p 
        className="text-2xl text-center select-none cursor-default
      text-blue-500 z-100 relative w-full">
          How can we help?
        </p>

        <ul 
        className="message-bg rounded-xl space-y-2 bg-gradient-to-b
        from-blue-300 to-indigo-300
        p-2 mt-10 h-auto border-1 border-gray-500 z-100 relative">
          {[{id: 1, text: "Search", icon: <FiSearch />},
            {id: 2, text: "Can't Find a Friend", icon: <MdOutlinePersonSearch />},
            {id: 3, text: "Something isn't working", icon: <TbDentalBroken />},
            {id: 4, text: "found Bag", icon: <IoIosBug />},
            {id: 5, text: "Support help", icon: <MdSupportAgent />},
            {id: 6, text: "Other", icon: <CgDetailsMore />}
           ].map((list) => 
            <li key={list.id}>
              <a 
              href="#"
              className="hover:text-blue-100 flex items-center justify-between
              hover:bg-gradient-to-l from-blue-400 to-blue-300 rounded-lg 
              transition-all duration-200 p-2 active:bg-blue-300 group"
              >
                {list.text}
                <h1 className="group-hover:scale-140 transition-transform duration-200">{list.icon}</h1>
              </a>
            </li>          
           )}
        </ul>

        <div 
        className="bg-blue-400 p-3 rounded-2xl border-1
      border-gray-500 mt-10">
          <h1 className="text-md w-100 text-gray-800">
            Visit Chanel for more information:
          </h1> 
            
          <a
          title="PSpace Page"
          className="underline text-blue-100 text-sm overflow-x-visible
          cursor-pointer" 
          href="https://www.youtube.com/@PSpace">
            https://www.youtube.com/@PSpace
          </a>
        </div>
        
      </div>
      

      <div className="flex flex-row gap-5 ml-5">
        {/* Close button at the bottom */}
          <button 
          className="hover:bg-gradient-to-t from-blue-400 to-blue-300
          transition-all p-3 cursor-pointer hover:text-blue-200 text-blue-500
          rounded-lg mt-4 group flex w-24 items-center gap-2 justify-center
          login-pulse border-1 border-blue-400 hover:border-blue-200 active:bg-gradient-to-t"
          onClick={() => setMessage(false)}>
            Close
            <AiOutlineApi className="opacity-0 group-hover:opacity-100 
            text-blue-200 text-xl w-0 group-hover:w-full transition-all
            duration-300 delay-200"
            />
          </button>

        {/* Exit button at the bottom */}
          <button 
          className="hover:bg-gradient-to-t from-blue-400 to-blue-300
          transition-all p-3 cursor-pointer hover:text-blue-200 text-blue-500
          rounded-lg mt-4 group flex w-27 items-center gap-2 justify-center
          login-pulse border-1 border-blue-400 hover:border-blue-200 active:bg-gradient-to-t"
          onClick={logOut}>
            LogOut
            <CiLogout className="opacity-0 group-hover:opacity-100 
            text-blue-200 text-xl w-0 group-hover:w-full transition-all
            duration-300 delay-200"
            />
          </button>
      </div>
    </div>

    {message && (
      <div
      onClick={() => setMessage(false)} 
        className="fixed inset-0 bg-black/90 z-40"
      />
    )}


{/*------------------------SECTION ONE------------------------*/}
      <section 
      id="home"
      className="scroll-mt-24 px-10 py-15 sm:px-18 md:px-35 lg:w-[90%]
      rounded-md mt-1 border-2 border-gray-200 md:mt-20 w-full
      z-10 bg-gradient-to-tl from-blue-400 to-gray-950 relative"
      >
        <GiHadesSymbol 
        className="absolute md:right-0 text-[20rem] top-0 opacity-40
        text-gray-700 lg:text-[40rem] right-[-4rem]"
        />

        <div 
        className="lg:flex flex-col justify-center items-start 
        relative lg:h-130">
          <h1 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10
        text-gray-200">
            Unleash Your Potential with PSpace
          </h1>

          <p 
          className="text-md md:text-2xl text-gray-400 mb-6 w-90 md:w-130">
          Connect with creators, build your network, and turn your ideas into influence.
          </p>

          <button 
          className="bg-gradient-to-br from-blue-500 to-purple-600 gap-2
          text-white px-8 py-3 rounded-xl shadow-md hover:scale-105 flex
          hover:shadow-lg transition-transform duration-200 cursor-pointer items-center
          active:text-blue-300 border border-blue-400 active:bg-gradient-to-r">
            <VscEye className="text-xl" />
            Get Started
          </button>
      </div>

      </section>

{/*------------------------SECTION TWO------------------------*/}
      <section 
      id="creators"
      className="px-5 py-10 sm:px-12 md:py-20 md:h-[52rem] md:w-[55rem]
      mx-auto rounded-md z-10 flex flex-col items-start gap-10 w-full
      justify-center scroll-mt-[-5rem] lg:w-[88rem]">

        <div 
        className="flex justify-between items-center md:mb-15 w-full">
          <h2 
          className="text-xl md:text-5xl font-semibold text-blue-500 flex items-center gap-3">
            <BsPersonGear />
            Meet the Creators
          </h2>

          <span 
            className="hidden md:flex items-center gap-5">
            <button 
              onClick={scrollLeft2} 
              className="group bg-white/70 backdrop-blur-md text-gray-800 px-4 py-3 text-2xl 
              transition-all duration-300 ease-in-out cursor-pointer hover:bg-blue-500 
              hover:text-white hover:scale-105 rounded-tl-full rounded-bl-full 
              border border-indigo-300 hover:border-transparent shadow-md h-[3.5rem]">
              <BsChevronLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            </button>

            <button 
              onClick={scrollRight2} 
              className="group bg-white/70 backdrop-blur-md text-gray-800 px-4 py-3 text-2xl 
              transition-all duration-300 ease-in-out cursor-pointer hover:bg-blue-500 
              hover:text-white hover:scale-105 rounded-tr-full rounded-br-full 
              border border-indigo-300 hover:border-transparent shadow-md h-[3.5rem]">
              <BsChevronRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </span>
        </div>
        
        {/* Horizontal Scroll Wrapper */}
        <div 
        ref={scrollRef2}
        className="flex gap-1 md:gap-3 overflow-x-auto scroll-smooth 
        scrollbar-hide w-full h-auto no-scrollbar relative">        
          {Creators.map((creator) => (
            <div
            className="overflow-hidden
            bg-gradient-to-b from-black/70 to-black
            h-auto md:min-w-[350px] min-w-[10rem] w-full
            md:h-[30rem] group border-2 border-blue-200
            max-w-[250px] flex-shrink-0 rounded-lg relative"
            key={`creators_list-${creator.id}`}
            >
              <img 
              src={creator.img}
              alt="Creators-list" 
              className="object-cover md:h-[30rem] h-[20rem] w-full
              md:opacity-60 group-hover:opacity-90 group-hover:scale-120
              transition-all duration-300"
              />
              
              <div
              className="absolute md:bottom-5 md:left-5 left-2 bottom-2"
              >
                <h1 
                className="text-gray-200 text-sm md:text-2xl
                flex gap-2 items-center">
                  <FaRegCheckCircle className="text-green-300" />
                  {creator.name} 
                </h1>

                <h2 
                className="text-green-500 text-sm md:text-lg">
                {creator.role} developer
                </h2>
              </div>

              {/*Buttons with info */}
              <div 
              className="absolute top-3 left-3 md:left-[17.9rem] md:right-5 z-50 flex flex-col 
              gap-1 md:gap-2 bg-white/30 rounded-full">

                <button
                onClick={() => {
                setCreatorInfo2(false);
                setCreatorInfo(creatorInfo === creator.id 
                ? null 
                : creator.id);
                }}
                className={`rounded-full p-2 cursor-pointer
                md:hover:scale-110 transition-all duration-300 
                ${creatorInfo !== creator.id 
                  ? "bg-gray-200 hover:bg-gray-300" 
                  : "bg-red-500 hover:bg-red-600 md:border-1 border-white"
                }`}
                >
                  {creatorInfo !== creator.id 
                  ?
                  <BsInfoCircle
                  className="text-gray-700 text-sm md:text-2xl" />
                  : 
                  <IoIosClose
                  className="text-white text-sm md:text-2xl" 
                  />
                  }
                </button>

                <button
                onClick={() => {
                setCreatorInfo(false);
                setCreatorInfo2(creatorInfo2 === creator.id 
                ? null 
                : creator.id)
                }}
                className={`rounded-full p-2 cursor-pointer
                md:hover:scale-110 transition-all duration-300 
                ${creatorInfo2 !== creator.id 
                  ? "bg-gray-200 hover:bg-gray-300" 
                  : "bg-red-500 hover:bg-red-600 md:border-1 border-white"
                }`}
                >

                {creatorInfo2 !== creator.id 
                ?
                <IoMdMore 
                className="text-gray-700 text-sm md:text-2xl" />
                : 
                <IoIosClose
                className="text-white text-sm md:text-2xl" 
                />
                }
                </button>
              </div>

              {/* If the current creator is open, show info */}
              {creatorInfo === creator.id && (
                <div 
                className="absolute inset-0 bg-gradient-to-b 
                p-4 flex from-gray-900/50 to-blue-500/40
                flex-col gap-2 items-center justify-center rounded-lg
                z-30 img-blur text-start">
                  <div
                  className="bg-gradient-to-t from-blue-100 to-gray-100
                  md:p-5 p-2 rounded-md md:w-[18rem] md:h-[16rem] border border-blue-900
                  w-[10rem] h-[12rem]"
                  >
                    <h1 
                    className="font-bold mb-5 text-sm md:text-lg lg:text-xl
                    text-gray-700 border-b-2 pb-1 border-blue-300">
                      {creator.name}
                    </h1>

                    <span 
                    className="space-y-3 text-gray-600 text-sm md:text-lg 
                    font-light">
                      <p 
                      className="flex items-center gap-2">
                        <FaLaptopCode />
                        {creator.status}
                      </p>

                      <p 
                      className="flex items-center gap-2">
                        <FaPaintBrush />
                        Hobby: {creator.hobby}
                      </p>

                      <p 
                      className="flex items-center gap-2">
                        <IoCalendarNumber />
                        Age: {creator.age}
                      </p>

                      <p 
                      className="flex items-center gap-2">
                        <GiGiftOfKnowledge />
                        Experience: {creator.experience}
                      </p>
                    </span>
                  </div>

                </div>
              )}

              {creatorInfo2 === creator.id && (
                <div 
                className="absolute inset-0 bg-gradient-to-b 
                flex from-gray-900/50 to-blue-500/40 p-4
                flex-col gap-2 items-center justify-center rounded-lg
                z-30 img-blur">
                  <div
                  className="bg-gradient-to-t from-blue-100 to-gray-100
                  md:p-5 p-2 rounded-md md:w-[18rem] md:h-[16rem] border
                border-blue-900 w-[10rem] h-[12rem]" 
                  >
                    <h1 className="text-sm md:text-lg lg:text-xl mb-5 pb-1
                    border-b-1 border-blue-500 text-blue-500">
                      Developer links:
                    </h1>

                    <ul 
                    className="space-y-3 text-sm md:text-lg font-light
                    text-gray-800">
                    {/*#1 LinkedIN */}
                      <li className="hover:text-xl hover:text-blue-500 transition-all
                      duraiton-300" >
                        <a
                        className="flex items-center gap-2"
                        target="_blank"
                        href={`https://www.linkedin.com/in/${creator.name}/`}
                        rel="noopener noreferrer"
                        >
                        <BsLinkedin />
                        LinkedIn
                      </a>
                      </li>

                    {/*#2 Facebook*/}
                      <li className="hover:text-xl hover:text-blue-500 transition-all
                      duraiton-300" >
                        <a
                        className="flex items-center gap-2"
                        target="_blank"
                        href={`https://www.linkedin.com/in/${creator.name}/`}
                        rel="noopener noreferrer"
                        >
                        <FaFacebookF/>
                        Facebook
                      </a>
                      </li>

                    {/*#3 Instagram*/}
                      <li className="hover:text-xl hover:text-blue-500 transition-all
                      duraiton-300" >
                        <a
                        className="flex items-center gap-2"
                        target="_blank"
                        href={`https://www.linkedin.com/in/${creator.name}/`}
                        rel="noopener noreferrer"
                        >
                        <BsInstagram />
                        Instagram
                      </a>
                      </li>

                    {/*#4 Twitter */}
                      <li className="hover:text-xl hover:text-blue-500 transition-all
                      duraiton-300" >
                        <a
                        className="flex items-center gap-2"
                        target="_blank"
                        href={`https://www.linkedin.com/in/${creator.name}/`}
                        rel="noopener noreferrer"
                        >
                        <BsTwitter />
                        Twitter
                      </a>
                      </li>

                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}           
     
        </div>
      </section>

{/*------------------------SECTION THREE------------------------*/}
      <section 
      id="about"
      className="scroll-mt-[-2rem] relative px-10 py-18 sm:px-15 md:px-20 
      lg:w-full hidden md:block">

        {/* Scrollable Content */}
        <div
        onScroll={handleScroll}
        ref={section2Ref}
        className="flex overflow-x-auto scroll-smooth snap-x 
        snap-mandatory space-x-2 no-scrollbar lg:min-h-[500px] 
        overflow-hidden"
        >
        {/* Scroll Buttons */}
        <div 
        className="hidden lg:flex justify-between absolute top-1/2 right-15 
        z-10 px-3 left-17 -translate-y-10">
        
        <button
          onClick={() => scroll("left")}
          className="group bg-white/30 backdrop-blur-md text-black px-4 py-3 text-2xl 
          transition-all duration-300 ease-in-out cursor-pointer hover:bg-blue-500 
          hover:text-white hover:scale-105 rounded-tr-full rounded-br-full 
          border border-indigo-300 hover:border-transparent shadow-md h-[4rem]"
        >
          <BsChevronLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
        </button>

        <button
        onClick={() => scroll("right")}
        className="group bg-white/30 backdrop-blur-md text-black px-4 py-3 text-2xl 
        transition-all duration-300 ease-in-out cursor-pointer hover:bg-blue-500 
        hover:text-white hover:scale-105 rounded-tl-full rounded-bl-full 
        border border-indigo-300 hover:border-transparent shadow-md"
        >
          <BsChevronRight className="group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

        {/* Slide 1 - Stats */}
          <div 
          className="min-w-full snap-center  items-center pt-20
          rounded-md shrink-1 p-3 lg:flex flex-col justify-between lg:px-10
          relative border-1 border-gray-500 crazybackground">
            <div 
            className="flex gap-10 max-w-[93%] border-b-1 border-gray-300
            pb-5 h-90">
              {/*Info */}
              <motion.span
              initial={{opacity: 0, y:80}}
              animate={isInView1 ? {opacity: 1, y:0} : {}}
              transition={{duration: 1}}
              className="w-2/5 p-2 shadow-lg rounded-xl
              bg-blue-50 mb-1 backdrop-blur-xl border border-white/20">
                <h2 className="flex items-center gap-4 text-2xl md:text-3xl
                font-bold mb-6">
                <FiUsers className="text-blue-500" />
                  About Us
                </h2>

                <p 
                className="text-md md:text-md text-gray-600 mb-2">
                  Our mission is to build a strong, independent platform where people can connect, share, and grow—without the fear of scams or privacy concerns that often exist on larger social networks like Facebook or Instagram.
                </p>

                <p 
                className="text-md md:text-md lg:text-md text-gray-600 mb-4">
                  Thanks to our robust security system, every interaction is protected, ensuring a safe and trustworthy space for everyone in the community.
                </p>
              </motion.span>

              {/*hopes */}
              <motion.span
              initial={{opacity: 0, y:-80}}
              animate={isInView1 ? {opacity: 1, y:0} : {}}
              transition={{duration: 1, delay: 1}} 
              className="w-2/5 p-2 shadow-lg rounded-xl
              bg-blue-50 mb-1 backdrop-blur-xl border border-white/20">
                <h2 
                className="flex items-center gap-4 text-2xl md:text-3xl
                font-bold mb-6">
                  <VscCompassActive className="text-blue-500" />
                  Our Hopes
                </h2>
                <p 
                className="text-md md:text-md lg:text-lg text-gray-600 mb-2">
                  We hope this platform becomes a safe, inclusive, and positive place for people from all walks of life. Whether you're here to collaborate, learn, or just hang out—we’re building this space for you.
                </p>

                <p
                className="text-md md:text-md lg:text-lg text-gray-600 mb-4">
                  As more users join and contribute, we believe the platform will only grow stronger, smarter, and more impactful for the entire community.
                </p>
              </motion.span>

              {/*more */}
              <motion.span
              initial={{opacity: 0, y:80}}
              animate={isInView1 ? {opacity: 1, y:0} : {}}
              transition={{duration: 1}} 
              className="w-2/5 p-2 shadow-lg rounded-xl
              bg-blue-50 mb-1 backdrop-blur-xl border border-white/20"> 
                <h2 
                className="flex items-center gap-4 text-2xl md:text-3xl
                font-bold mb-6">
                  <FaLevelUpAlt className="text-blue-500" />
                  More to Come
                </h2>
                <p 
                className="text-md md:text-md lg:text-lg text-gray-600 mb-2">
                  We're constantly working on exciting new features to make your experience even better. Soon, you'll be able to access video tutorials, community events, helpful guides, and direct support—all in one place.
                </p>
                <p 
                className="text-md md:text-md lg:text-lg text-gray-600 mb-4">
                  This is just the beginning. Stay with us and be part of something meaningful. 🚀
                </p>
              </motion.span>
            </div>

            <div 
            ref={slide1Ref}
            className="pb-5 lg:mt-5">
              <p 
              className="text-md md:text-lg lg:text-xl text-gray-700
              mb-6 lg:font-mono flex items-center gap-2">
                <FcApproval className="text-blue-500" />
                We're a small team, building tools for the creative world. Here's what we've achieved:
              </p>

              <motion.div
              initial={{opacity: 0, y: 20}}
              animate={isInView1 ? {opacity: 1, y:0}: {}}
              transition={{duration: 1, ease: "easeInOut"}}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 
              bg-gradient-to-br from-white via-blue-50 to-indigo-100 
              text-center p-6 rounded-xl shadow-lg border border-gray-200">
                <div>
                <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView1 ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
                >
                  <h3 className="text-2xl font-bold text-blue-600 cursor-default
                  flex gap-2 items-center justify-center hover:text-blue-500">
                   <FaUserCheck />
                    10K+
                  </h3>
                  <p className="text-gray-600">Active Users</p>
                </motion.div>
                </div>

                <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView1 ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
                >
                  <h3 
                  className="text-2xl font-bold text-blue-600 cursor-default
                  flex gap-2 items-center justify-center hover:text-blue-500">
                    <GoProject />
                    500+
                  </h3>
                  <p className="text-gray-600">Projects Created</p>
                </motion.div>

                <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView1 ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
                >
                  <h3 className="text-2xl font-bold text-blue-600 cursor-default
                  flex gap-1 items-center justify-center hover:text-blue-500">
                    <CiStar/>
                    4.9/5
                  </h3>

                  <p className="text-gray-600 ml-2">User Rating</p>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Slide 2 - Timeline */}
          <div
          ref={slide2Ref} 
          className="min-w-full snap-center p-3 relative items-center
          rounded-md shrink-0 lg:flex flex-col justify-evenly border border-gray-500
          bg-gradient-to-b from-blue-50 via-white to-indigo-100">
            <motion.h3 
            initial={{opacity: 0, x:-100}}
            animate={isInView2 ? {opacity: 1, x:0} : {}}
            transition={{duration: 1}}
            className="text-2xl lg:text-4xl font-bold mb-4 border-b-1 justify-center
            border-blue-300 w-120 text-center text-blue-400 flex items-center
            cursor-default select-none z-20">
              <AiTwotonePieChart className="text-blue-500"/>
              Project Timeline
            </motion.h3>

            {/*INSANE SUN AND MOON */}
            <motion.div
            initial={{opacity: 0, y: 0}}
            animate={isInView2 ? {opacity: 1, y:0} : {}}
            transition={{duration: 1, ease: "easeInOut"}}
            >
              <span 
              className="absolute top-20 left-20 opacity-80 text-9xl
              text-yellow-400">
                <GiStarProminences 
                className="text-yellow-400 text-9xl z-10" />
                <div 
                className="bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400
                w-100 h-100 opacity-50 shadow-yellow-300 shadow-lg
                top-[-5rem] left-[-5rem] absolute rounded-br-full
                border-r-2 border-b-2 border-yellow-100" 
                />
              </span>

              <span
              className="absolute bottom-20 right-20 text-9xl">
                <RiMoonFill  
                className="text-blue-300 block z-100 absolute bottom-0 left-[-5rem]" />
                
                <div 
                className="bg-gradient-to-tl from-indigo-200 via-blue-100 to-blue-300
                w-100 h-100 opacity-100 border-gray-50 shadow-2xl shadow-blue-500
                bottom-[-5rem] right-[-5rem] absolute rounded-tl-full
                border-l-2 border-t-2" 
                />
                <motion.ul 
                initial={{opacity: 0, y:0}}
                animate={isInView2 ? {opacity: 1, y:0} : {}}
                transition={{duration: 1, delay: 1.5}}
                className="z-100 text-[1.3rem] text-blue-50">
                  <li
                  className="bottom-0 right-40 absolute"><GiPolarStar />
                  </li>
                  <li
                  className="bottom-40 left-10 absolute"><GiPolarStar />
                  </li>
                  <li
                  className="top-10 right-10 absolute"><GiPolarStar />
                  </li>
                  <li
                  className="bottom-0 right-[-2rem] absolute"><GiPolarStar />
                  </li>
                  <li
                  className="bottom-10 right-20 absolute"><GiPolarStar />
                  </li>
                  <li
                  className="top-0 right-30 absolute"><GiPolarStar />
                  </li>
                  <li
                  className="bottom-60 left-0 absolute"><GiPolarStar />
                  </li>
                  <li
                  className="top-10 left-10 absolute"><GiPolarStar />
                  </li>
                  <li
                  className="top-10 right-50 absolute"><GiPolarStar />
                  </li>
                  <li
                  className="bottom-40 right-0 absolute"><GiPolarStar />
                  </li>
                </motion.ul>
              </span>
            </motion.div>  
            {/*------------------------------------------------------*/}

            <div 
            className="relative w-[80%] min-h-[500px] overflow-hidden
            bg-gradient-to-br from-blue-50 via-white to-indigo-100
            rounded-full border-1 border-blue-300">
              {/* Crooked SVG Path (EPIC LINE)*/}
              <motion.svg
              initial="hidden"
              animate={isInView2 ? "visible" : "hidden"}
              variants={{hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.5 }}}}
              transition={{ duration: 1 }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2"
              width="400"
              height="500"
              viewBox="-200 0 400 900"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M320,30 
                C240,200 130,190 100,205 
                C-500,300 10,600 200,500 
                C400,400 400,700 -200,900"
                stroke="#3b82f5"
                strokeWidth="5"
                fill="none"
                initial={{
                pathLength: 0,
                pathOffset: 0, // to Start from the top to end
                }}
                animate={isInView2 
                ? {pathLength: 1,
                  pathOffset: 0, //0 to don't leave the box
                  }: {}}
                transition={{
                duration: 2,
                ease: "easeInOut",}}
              />
            </motion.svg>

              {/* Zigzag Items */}
              <ul 
              className="w-full h-full flex flex-col justify-around z-10">
                {/* 1 */}
                <li
                style={{position: "absolute", left: '37.7rem', top: "2rem" }}>
                  <div className="flex flex-row items-center gap-2">
                    <p 
                    className="text-lg text-gray-800 font-semibold">
                      Dec 2024
                    </p>
                    <div 
                    className="w-4 h-4 bg-blue-500 rounded-full shadow-lg border-1
                    hover:bg-blue-200 transition-all duration-300 circle_light 
                    hover:border-gray-100 cursor-pointer hover:scale-140 group" 
                    />
                    <p className="text-lg text-gray-300">Idea was born</p>
                  </div>
                </li>

                {/* 2 */}
                <li 
                style={{position: "absolute", left: '17rem', top: "8rem" }}>
                  <div className="flex flex-row-reverse items-center gap-2">
                    <p className="text-lg text-gray-300 font-semibold">Feb 2025</p>
                    <div 
                    className="w-4 h-4 bg-blue-500 rounded-full shadow-lg border-1
                    hover:bg-blue-200 transition-all duration-300 circle_light
                    hover:border-gray-100 cursor-pointer hover:scale-140" 
                    />
                    <p className="text-lg text-gray-800">First lines of code written</p>
                  </div>
                </li>

                {/* 3 */}
                <li
                style={{position: "absolute", left: '28rem', top: "16.7rem" }}>
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-lg text-gray-800 font-semibold">Mar 2025</p>
                    <div 
                    className="w-4 h-4 bg-blue-500 rounded-full shadow-lg border-1
                    hover:bg-gradient-to-br from-blue-300 to-gray-300 transition-all duration-300 circle_light 
                    hover:border-gray-100 cursor-pointer hover:scale-140" 
                    />
                    <p className="text-lg text-gray-300">Web Became fully responsive!</p>
                  </div>
                </li>

                {/* 4 */}
                <li
                style={{position: "absolute", left: '30.2rem', top: "19rem" }}>
                  <div className="flex flex-row-reverse items-center gap-2">
                    <p className="text-lg text-gray-300 font-semibold">Apr 2025</p>
                    <div 
                    className="w-4 h-4 bg-blue-500 rounded-full shadow-lg border-1
                  hover:bg-blue-200 transition-all duration-300 circle_light
                    hover:border-gray-100 cursor-pointer hover:scale-140" 
                    />
                    <p className="text-lg text-gray-800">Major features completed</p>
                  </div>
                </li>

                {/* 5 */}
                <li
                style={{position: "absolute", left: '33.5rem', top: "24rem" }}>
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-lg text-gray-900 font-semibold">May 2025</p>
                    <div 
                    className="w-4 h-4 bg-blue-500 rounded-full shadow-lg border-1
                    hover:bg-blue-200 transition-all duration-300 circle_light
                    hover:border-gray-100 cursor-pointer hover:scale-140" 
                    />
                    <p className="text-lg text-gray-300">Project got visual updates</p>
                  </div>
                </li>

                {/* 6 */}
                <li 
                style={{position: "absolute", left: '23rem', top: "28rem" }}>
                  <div className="flex flex-row-reverse items-center gap-2">
                    <p className="text-lg text-gray-300 font-semibold">
                      Mai 2025
                    </p>
                    <div 
                    className="w-4 h-4 bg-blue-500 rounded-full shadow-lg border-1
                    hover:bg-gradient-to-br from-blue-200 to-gray-300 transition-all duration-300 circle_light
                    hover:border-gray-100 cursor-pointer hover:scale-140"
                    />
                    <p className="text-lg text-gray-900">Project went live!</p>
                  </div>
                </li>
              </ul>
            </div>
            
          </div>

          {/* Slide 3 - Fun Stats */}
          <div
          ref={slide3Ref}
          className="min-w-full snap-start p-3  rounded-md
          shrink-0 lg:flex flex-col justify-evenly items-center relative
          bg-gradient-to-b from-indigo-900 via-violet-600 to-violet-300
          border border-gray-500 crazybackground">

          <h3 className="sm:text-2xl md:text-3xl lg:text-4xl font-mono
          text-indigo-700
          flex items-center justify-center gap-2">
            <ImStatsDots />
            Fun Web Stats
          </h3>

          <div 
          className="flex justify-around items-end w-[80%] h-120
          border-b-2 border-t border-violet-300 rounded-md
          stat-shadow stat-bg"
          >
            {stats.map((stat, index) => (
              <ul 
              key={stat.id} 
              className="text-center flex flex-col items-center"
              >
                <li className="text-violet-100 text-lg font-mono">{stat.number}</li>
                <motion.span
                initial={{ scaleY: 0 }}
                animate={isInView3 ? { scaleY: 1 } : {}}
                transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                className={`w-8 ${getHeightClass(stat.number)}
                origin-bottom bg-gradient-to-t from-fuchsia-300 to-violet-300
                mt-1 border border-violet-100 rounded-sm`}
                />

                <li 
                className="mt-3 text-xl text-violet-50 pt-3 pb-5">
                  {stat.label}
                </li>
              </ul>
            ))}
          </div>
          </div>

          {/* Slide 4 - Outro */}
          <div
          ref={slide4Ref}
          className="min-w-full snap-center shrink-0 flex flex-col lg:flex-row
          rounded-md bg-gradient-to-b justify-center items-start 
          from-blue-200 via-violet-100 to-violet-300 gap-10 border
          pt-[5vh] md:pt-14 lg:pt-30 overflow-visible border-violet-100"
          >
            <motion.div
            initial={{opacity: 0, scaleY: 0.5}}
            animate={isInView4 ? {opacity: 1, scaleY: 1} : {}}
            transition={{duration: 0.5}}
            className="bg-gradient-to-b from-blue-200 via-indigo-100 to-blue-300
            p-5 rounded-2xl letter-shadow hover:scale-110 transition-all duration-200
            z-30 relative"
            >
              <h1
              className="pb-5 text-lg md:text-xl lg:text-2xl text-blue-50 flex
              gap-2 items-center"
              >
                <SiFuturelearn />
                FUTURE UPDATES
              </h1>

              <ul 
              className="w-70 text-sm md:text-md lg:text-lg font-extralight 
              space-y-2 text-gray-600 list-decimal list-inside">
                {[
                "Job/Hire System",
                "More Flexible web",
                "Payment methods",
                "Following/Adding person",
                "Video Tutorials",
                "Buying/Selling stuff"
                ].map((item, index) => 
                  <motion.li
                  className="group relative cursor-default hover:text-white
                  transition-all duration-300 hover:scale-105" 
                  initial={{opacity: 0, x: -10}}
                  animate={isInView4 ? {opacity: 1, x: 0} : {}}
                  transition={{duration: 2, delay: index * 0.2}}
                  key={index}>
                    {item}
                    <span className="group-hover:w-full w-0 bottom-0 left-0
                    bg-blue-50 h-[2px] absolute transition-all duration-300" />
                  </motion.li>
                )}
              </ul>
            </motion.div>

            <motion.div
            initial={{opacity: 0, y: 70}}
            animate={isInView4 ? {opacity: 1, y: 0} : {}}
            transition={{delay: 1, duration: 0.5}}
            className="bg-gradient-to-b from-blue-200 via-indigo-100 to-blue-300
            p-5 rounded-2xl letter-shadow hover:scale-110 transition-all duration-200
            z-30 relative">
              <h1 
              className="pb-5 text-lg md:text-xl lg:text-2xl text-gray-100 flex
              gap-2 items-center">
                <BiMath />
                FUN FUCTS
              </h1>

              <div 
              className="w-70 text-sm md:text-md lg:text-lg font-extralight 
              space-y-2 text-gray-600">
                <p>In the Creators section the chat's picture was created by chatgpt it's own</p>
                <p>Web used more the 100+ React icons to style the webpage</p>
                <p>The current webpage's version is 2.0, version 1 got deleted</p>
              </div>
            </motion.div>

            <motion.div
            initial={{opacity: 0, y: -70}}
            animate={isInView4 ? {opacity: 1, y: 0} : {}}
            transition={{duration: 1, ease: "easeInOut"}}
            className="bg-gradient-to-b from-blue-200 via-indigo-100 to-blue-300
            p-5 rounded-2xl md:h-[15rem] lg:h-[19rem] letter-shadow hover:scale-110 
            transition-all duration-200 z-30 relative w-[20rem]"
            >
              <h1 className="pb-5 text-lg md:text-xl lg:text-2xl text-blue-50 flex
              gap-2 items-center">
                <FaHandsHelping />
                ADDITIONAL HELP
              </h1>

              <div 
              className="space-y-2 text-sm md:text-md lg:text-lg font-extralight">
                {[
                  { name: 'React', icon: <FaReact />, 
                    url: 'https://react-icons.github.io/react-icons/',
                    hoverColor: 'hover:text-red-500', 
                    hoverUnderline: 'group-hover:bg-red-500',
                  },

                  { name: 'Dicebear', icon: <GiBearFace />, 
                    url: 'https://www.dicebear.com', 
                    hoverColor: 'hover:text-blue-400', 
                    hoverUnderline: "group-hover:bg-blue-500",
                  },

                  { name: 'Chat-Gpt', icon: <VscRobot />, 
                    url: 'https://chatgpt.com', 
                    hoverColor: 'hover:text-gray-500',
                    hoverUnderline: "group-hover:bg-gray-500", 
                  },
                ].map((link, idx) => (
                  <motion.a
                  initial={{opacity: 0, x: -20}}
                  animate={isInView4 ? {opacity: 1, x: 0} : {}}
                  transition={{duration: 1, delay: idx * 1, ease: "easeInOut"}}
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-2 text-gray-700 relative group
                  transition duration-300 pb-1 ${link.hoverColor} hover:scale-105`}
                  >
                      {link.icon}
                      {link.name}
                    <span
                      className={`absolute w-0 group-hover:w-full h-[2px]
                      bg-pink-500 transition-all duration-300 bottom-0 left-1/2
                      group-hover:left-0 group-hover:right-0 ${link.hoverUnderline}`}
                    ></span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

      {/*Unique Scroll visor */}
        <div 
        className="scroll-indicators flex items-center justify-center">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div
              key={i}
              className={`dot ${i === activeIndex ? "active" : ""}`}
              onClick={() => scrollToSlide(i)}
              />
            ))}
        </div>
      </section>
{/*--------------------- MOBILE SECTION THREE (COOLED UP) ---------------------*/}
      <section
        id="about-mobile"
        className="block md:hidden px-4 py-8 bg-gradient-to-b from-gray-50 to-gray-100"
      >
        {/* About / Hopes / More cards */}
        <div className="space-y-8">
          {[
            {
              title: "About Us",
              icon: <FiUsers className="text-blue-500" />,
              texts: [
                "Our mission is to build a strong, independent platform where people can connect, share, and grow—without fear of scams or privacy breaches.",
                "Every interaction is protected, ensuring a safe and trustworthy space for everyone."
              ]
            },
            {
              title: "Our Hopes",
              icon: <VscCompassActive className="text-blue-500" />,
              texts: [
                "We hope this platform becomes a safe, inclusive, and positive place for all.",
                "As our community grows, so will our impact and the value we provide."
              ]
            },
            {
              title: "More to Come",
              icon: <FaLevelUpAlt className="text-blue-500" />,
              texts: [
                "Video tutorials, community events, and direct support are on the way.",
                "Stay with us—this is only the beginning! 🚀"
              ]
            },
          ].map((section) => (
            <div
              key={section.title}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-5"
            >
              <div 
              className="absolute inset-0 bg-gradient-to-t from-blue-200 
              to-transparent opacity-30 pointer-events-none" 
              />

              <h2 
              className="relative flex items-center gap-3 text-2xl font-bold 
              text-blue-600 mb-3">
                {section.icon}
                {section.title}
              </h2>
              {section.texts.map((text, index) => (
                <p
                key={index}
                className="relative text-gray-600 mb-2 last:mb-0"
                >
                  {text}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div 
        className="mt-8 p-5 bg-white rounded-2xl shadow-lg">
          <h1 
          className="text-center text-xl font-bold text-blue-700 
          mb-4 relative flex items-center justify-center gap-2">
            <ImStatsDots />
            Quick Stats
          </h1>

          <div 
          className="grid grid-cols-2 gap-4 text-center">
            {[
              { icon: <FaUserCheck className="text-2xl" />, label: "10K+", sub: "Users" },
              { icon: <GoProject className="text-2xl" />, label: "500+", sub: "Projects" },
              { icon: <CiStar className="text-2xl" />, label: "4.9/5", sub: "Rating" },
              { icon: <FiUsers className="text-2xl" />, label: "Small Team", sub: "Creative Tools" },
            ].map((s) => (
              <div
                key={s.label}
                className="group relative p-4 bg-gradient-to-br from-indigo-50 to-white rounded-xl hover:shadow-xl transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-blue-400 to-blue-200 text-white group-hover:from-blue-500 group-hover:to-blue-300 transition-colors duration-300">
                  {s.icon}
                </div>
                <p className="text-lg font-semibold text-gray-800">{s.label}</p>
                <p className="text-gray-500">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="mt-8 p-5 bg-white rounded-2xl shadow-lg">
          <h3 
          className="text-center text-2xl font-bold text-blue-700
          mb-6 flex items-center justify-center gap-2">
            <AiTwotonePieChart className="text-blue-500"/>
            Timeline
          </h3>

          <div className="relative pl-6">
            <span className="absolute left-3 top-0 h-full w-1 bg-blue-200 rounded-full" />
            {[
              { id: "Dec 2024", text: "Idea was born" },
              { id: "Feb 2025", text: "First lines of code" },
              { id: "Mar 2025", text: "Fully responsive web" },
              { id: "Apr 2025", text: "Major features completed" },
              { id: "May 2025", text: "Visual updates released" },
              { id: "Jun 2025", text: "Project goes live!" },
            ].map((item) => (
              <div 
              key={item.id} 
              className="mb-8 flex items-center gap-3">
                <div
                className="mt-1 w-4 h-4 bg-blue-500 rounded-full 
                animate-pulse"/>
                <div>
                  <p 
                  className="font-semibold text-gray-800">{item.id}</p>
                  <p 
                  className="text-gray-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outro & Links */}
        <div 
        className="mt-8 space-y-6">
          <div 
          className="p-5 bg-gradient-to-br from-violet-100 to-white 
          rounded-2xl shadow-lg">
            <h1 
            className="text-lg font-bold text-indigo-700 mb-3
            flex items-center gap-2">
              <SiFuturelearn />
              Future Updates
            </h1>

            <ul 
            className="list-disc list-inside text-blue-500 
            space-y-1 grid grid-cols-2">
              {["job/Hire System",
                "More Flexible web",
                "Payment methods", 
                "Following/Adding person", 
                "Video Tutorials", 
                "Buying/Selling stuff"].map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
          </div>

          <div 
          className="p-5 bg-gradient-to-br rounded-3xl shadow-lg
          from-violet-50 to-transparent">
            <h1 
            className="text-lg font-bold text-blue-400 mb-7
            flex items-center gap-2">
              <FaHandsHelping />
              Built With
            </h1>

            <div 
            className="grid grid-cols-2 flex-wrap gap-4">

              {[{id:1, href: "https://react-icons.github.io/react-icons/", 
                 icon: <FaReact/>, text: "React-Icons"},   

                {id:2, href: "https://www.dicebear.com", 
                 icon: <GiBearFace />, text: "Dicebear"}, 

                {id:3, href: "https://chat.openai.com",
                icon: <VscRobot />, text: "ChatGPT"}, 

                {id:4, href: "https://generated.photos", 
                icon: <LuBrainCircuit/>, text: "AI Pic-Generator"}, 

                {id:5, href: "https://www.facebook.com", 
                icon: <FaFacebookF/>, text: "Facebook"}, 

                {id:6, href: "https://heropatterns.com", 
                icon: <TbBackground/>, text: "HeroPatterns"}
              ].map((link) => (
                <a 
                key={link.id}
                target="_blank"
                href={link.href}
                className={`flex items-center gap-1 pl-3 rounded-full p-1
                hover:text-gray-800 transition-colors border w-50  

                ${link.id === 1 
                ? "bg-gradient-to-r from-rose-200 to-red-300 text-rose-500 border-rose-500" 
                : "bg-gradient-to-l from-black/30 to-gray-300 text-gray-200"}

                ${link.id === 2 
                ? "bg-gradient-to-l from-blue-400 to-violet-400  text-blue-500 border-violet-500" 
                : "bg-gradient-to-l from-black/30 to-gray-300 text-gray-200"}

                ${link.id === 3 
                ? "bg-gradient-to-l from-black/30 to-gray-300 text-gray-800 border-gray-600" 
                : ""}

                ${link.id === 4 
                ? "bg-gradient-to-l from-orange-500 to-sky-400 text-sky-100 border-sky-200" 
                : "bg-gradient-to-l from-black/30 to-gray-300 text-gray-200"}

                ${link.id === 5 
                ? "bg-gradient-to-l from-blue-500 to-sky-300 border-blue-500" 
                : "bg-gradient-to-l from-black/30 to-gray-300"}

                ${link.id === 6 
                ? "bg-gradient-to-l from-green-500 to-violet-300 border-purple-500" 
                : "bg-gradient-to-l from-black/30 to-gray-300"}

                `}>
                  {link.icon} {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
{/*------------------------SECTION FOUR------------------------*/}
      <section 
      id="Tops"
      className="px-1 py-12 mb-20 md:h-[40rem] md:w-[50rem] scroll-mt-10
      w-[33rem] h-[25rem] lg:w-[83rem] lg:h-[42rem]">
        <div className="flex justify-between items-center pb-10">
          <h2 
          className="text-xl md:text-4xl font-bold md:mb-10 text-gray-600 flex 
          items-center gap-2">
            <RiUserHeartLine />
            Top Rated Members
          </h2>

          <div 
          className="text-gray-800 space-x-4 mb-5 hidden md:block">
            <button 
            onClick={scrollLeft4} 
            className="group bg-white/70 backdrop-blur-md text-gray-800 px-4 py-3 text-2xl 
            transition-all duration-300 ease-in-out cursor-pointer hover:bg-blue-500 
           hover:text-white hover:scale-105 rounded-tl-full rounded-bl-full 
            border border-indigo-300 hover:border-transparent shadow-md h-[3.5rem]">
              <BsChevronLeft 
              className="group-hover:-translate-x-1 transition-transform duration-300" />
            </button>

            <button 
            onClick={scrollRight4} 
            className="group bg-white/70 backdrop-blur-md text-gray-800 px-4 py-3 text-2xl 
            transition-all duration-300 ease-in-out cursor-pointer hover:bg-blue-500 
           hover:text-white hover:scale-105 rounded-tr-full rounded-br-full 
            border border-indigo-300 hover:border-transparent shadow-md h-[3.5rem]">
              <BsChevronRight 
              className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Scrollable wrapper */}
        <div 
        className="relative overflow-hidden">
          <div
          ref={scrollRef4}
          className="flex overflow-x-auto md:gap-2.5 scroll-smooth scrollbar-hide
          no-scrollbar space-x-1 p-2"
          >
            {users.map((user) => (
              <div
              key={user.id}
              className="md:min-w-[19rem] md:max-w-[30rem] h-[20rem] md:h-[30rem]
              min-w-[10rem] max-w-[15rem] member-shadow
              p-[1px] rounded-sm shadow-md flex-shrink-0 bg-gradient-to-b
              from-blue-500 via-gray-400 to-indigo-100 relative group"
              >
                <div
                className="overflow-hidden w-full h-full rounded-md 
                bg-black md:member-shadow"
                >
                  <img 
                  className="object-cover h-full w-[15rem] md:w-[19.5rem] transform 
                  transition-transform duration-300 group-hover:scale-110
                  group-hover:opacity-100 opacity-80"
                  src={user?.image || fallbackImage} 
                  alt={user?.name || "Person"} 
                  />
                </div>

                <div 
                className="absolute bottom-[1rem] text-gray-200 md:left-5
                text-sm left-1 sm:text-md md:text-lg lg:text-2xl">
                  <div className="flex items-center gap-2 group">
                    <VscEye 
                    className="md:opacity-0 group-hover:opacity-100 absolute 
                    md:bottom-19 bottom-13 left-0 transition-opacity duration-300"/>
                    
                    <PiEyeClosedThin 
                    className="group-hover:opacity-0 transition-opacity duration-300
                    opacity-0 md:opacity-100"/>
                    <h3 className="font-mono">
                      {user.name}
                    </h3>
                  </div>
                
                  <p 
                  className="relative text-xs md:text-xl text-gray-300 flex 
                  items-center gap-2 pt-2 font-semibold">
                    <span className="relative">
                    <BsAwardFill 
                    className="text-yellow-400 fire-glow" 
                    />
                    <span 
                    className="absolute top-0 left-0 w-full h-full  
                    z-[-1]" />
                    </span>
                    {user.status}
                  </p>

                  <div 
                  className="flex items-center gap-[0.4rem] italic
                  md:opacity-0 md:group-hover:opacity-100 mt-2">
                    <GiHadesSymbol className="text-blue-400" />
                    <a
                    title={`${user.name}'s page`}
                    href="#"
                    className="text-xs md:text-md lg:text-lg hover:underline
                    hover:text-blue-400 transition-all"
                    >
                    https://www.PSpace.com/{user.name}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*------------------------FINAL SECTION------------------------*/}
      <footer 
      id="lastline"
      className="w-full md:w-full bg-gray-100 mt-10 md:mt-20 border-t-1
    border-gray-700">
      {/*-----main footer tools for large screen only------*/}
        <div className="hidden md:block">
          <div 
          className="flex md:py-20 border-t-1 gap-10 justify-center
          border-gray-400 shadow-md shadow-gray-200 bg-gradient-to-b
          from-gray-100 to-blue-50">
            <div
            className="flex justify-evenly w-full"
            >
              <div 
              className="grid grid-cols-1 md:grid-cols-5 gap-15">
                {/*Help */}
                <div
                className="flex flex-col justify-start items-start gap-1"
                >
                  <h1
                  className="text-md md:text-lg font-semibold text-gray-900
                  pb-4"
                  >
                    HELP
                  </h1>
                  <ul
                  className="space-y-1" 
                  >
                    {["FAQ","Delivery Information",
                      "Submit a Fake","Can't find a friend",
                      "Can't sign in","more..."
                    ].map((help, index) => 
                        <li
                        className="text-start text-gray-600 hover:text-gray-900
                        transition-all"
                        key={index}>
                        <a href="#">
                          {help}
                        </a>
                        </li>
                    )}
                  </ul>
                </div>

                {/*Account*/}
                <div 
                className="flex flex-col justify-start items-start">
                  <h1
                  className="text-md md:text-lg font-semibold text-gray-900
                  pb-4"
                  >
                    MY ACCOUNT
                  </h1>
                  <ul 
                  className="text-gray-600">
                    <li 
                    className="py-1"
                    >
                      <a 
                      className="hover:text-gray-900"
                      onClick={() => navigate("/")}
                      href="">
                        Log Out
                      </a>
                    </li>

                    <li>
                      <a 
                      className="hover:text-gray-900"
                      onClick={() => navigate("/register")}
                      href="">
                        Register
                      </a>
                    </li>
                  </ul>
                </div>
                
                {/*Pages*/}
                <div 
                className="flex flex-col justify-start items-start">
                  <h1
                  className="text-md md:text-lg font-semibold text-gray-900 
                  pb-4"
                  >
                    PAGES
                  </h1>

                  <ul
                  className="space-y-1" 
                    >
                    {["About Us","Student Discount","Military Discount",
                      "Sustainability","Factory List","Refer a Friend"
                    ].map((page, index) =>
                      <li 
                      className="text-start text-gray-600 hover:text-gray-900
                      text-semibold transition-all"
                      key={index}>
                        <a 
                        href="#"
                        >
                          {page}
                        </a>
                      </li>
                    )}
                  </ul>                  
                </div>
                
                {/*links for stores */}
                <div className="flex flex-col gap-2 ">
                  <h1 
                  className="text-md md:text-lg font-semibold 
                  text-gray-900 pb-3 text-start">
                    GET THE APP
                  </h1>
                  <p 
                  className="text-sm text-gray-600 text-start w-50">
                    Soon on iOS and Android. Stay tuned!
                  </p>

                  <nav
                  className="flex gap-3 flex-col">
                    <a
                    target="_blank"
                    href="https://www.apple.com/app-store/" 
                    title="App Store"
                    className="flex items-center gap-2 group
                    hover:bg-blue-300 p-2 cursor-pointer w-35
                    transition-all duration-200 rounded-xl">
                      <FaAppStore className="group-hover:text-blue-100" />
                      <h1 className="group-hover:text-blue-100">App Store</h1>
                    </a>

                    <a
                    href="https://play.google.com/store/games?device=windows"
                    target="_blank"
                    title="Google Play"
                    className="flex items-center gap-2 group
                    hover:bg-gray-700 p-2 cursor-pointer w-35
                    transition-all duration-200 rounded-xl">
                      <FaGooglePlay className="group-hover:text-blue-200"/>
                      <h1 className="group-hover:text-blue-200">Google Play</h1>
                    </a>
                  </nav>
                </div>
                
                {/*Ps Stats */}
                  <div className="flex flex-col gap-2">
                    <h1 className="text-md md:text-lg font-semibold text-gray-900
                    pb-2 text-start">
                      PS STATS
                    </h1>
                    <ul 
                    className="space-y-1">
                      {[
                        {id: 1, text: "1,200+ members", icon:<FaEarthEurope /> },
                        {id: 2, text: "300+ creators active", icon: <GiPalette />},
                        {id: 3, text: "5,000+ messages sent", icon: <AiOutlineMessage />},
                        {id: 4, text: "Est. 2025", icon:<RiFireLine /> },
                      ].map((stat) =>
                        <li 
                        className="flex items-center gap-2 text-start 
                        text-gray-600 hover:text-gray-900 transition-all
                        text-md md:text-lg group cursor-default pb-2"
                        key={stat.id}>
                          <p 
                          className="text-gray-500 group-hover:text-blue-500">{stat.icon}</p>
                          {stat.text}
                        </li> 
                      )}
                    </ul>
                  </div>
              </div>
            </div>
          </div>

          {/*Links */}
          <nav 
          className="flex items-center md:py-5 md:px-[8.5rem] border-t-1
          border-gray-500 border-b-1 
          bg-gradient-to-r from-blue-100 to-gray-100 shadow-lg">
          <h1
            className="text-md md:text-lg font-semibold text-gray-600 mr-10"
          >
            FOLLOW US:
          </h1>

          {footerIcons.map((ficon) => (
            <a
            href={ficon.link}
            target="_blank"
            key={ficon.id}
            className={`group bg-gray-800 rounded-full text-white p-2 mb-1
            flex items-center justify-evenly gap-2 transition-all 
            duration-300 mr-4 cursor-pointer ${ficon.color}`}
            >
              <span 
              className="pl-2 py-2 group-hover:scale-140 transition-transform 
              duration-300"
              >
                {ficon.icon}
              </span>

              <span
              className="max-w-0 opacity-0 overflow-hidden transition-all 
              hidden md:block group-hover:opacity-100
              duration-500 group-hover:max-w-[200px]"
              >
                {ficon.text}
              </span>
            </a>
          ))}
          </nav>

        </div>

      {/* Mobile footer (collapsible) */}
        <div 
        className="md:hidden pt-[5px]">
        {/*3 main mobile text */}
          {footerSections.map((section) => (
            <div
            key={section.id}
            >
              <div  
              className="border-b-1 py-4 border-gray-400 mx-5">
                <button
                onClick={() => 
                setOpenSection(openSection === section.id ? null : section.id)}
                className={`flex justify-between items-center w-full font-bold 
                text-gray-800 px-15
                ${section.id === "help" ? "border-t-1 pt-3 border-gray-400" : "border-0"}`}
                >
                  {section.title}
                  <span>
                    {openSection === section.id ? <FaMinus /> : <FaPlus />}
                  </span>
                </button>

                <ul
                className={`pl-4 pr-2 mt-2 space-y-1 text-gray-600 transition-all duration-300 ${
                  openSection === section.id ? "max-h-[500px] opacity-100" : "max-h-0 overflow-hidden opacity-0"
                }`}
                >
                  {section.items.map((item, idx) => (
                    <li 
                    key={idx} 
                    className="hover:text-blue-500 transition-all flex">
                      <a 
                      href="#">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <div 
          className="flex justify-center items-center gap-8 mt-5
          border-t-1 border-b-1 border-gray-200 py-5 bg-gradient-to-r
          from-blue-50 to-transparent">
            {footerIcons.map((symbol) => (
              <a
              key={symbol.id}
              href={symbol.link}
              target="_blank"
              className="text-white text-2xl border-2 border-blue-100
              bg-gray-700 rounded-full p-2"
              >
                {symbol.icon}
              </a>
            ))}
          </div>

        </div>


        {/*-----all rights------*/}
          <div 
          className="flex flex-col-reverse md:grid md:grid-cols-2 h-auto md:py-4
          place-items-center">
            <h1 
            className="text-sm md:text-[1rem] text-gray-700 border-t-1 w-full
            md:border-0 justify-center items-center text-center flex p-3 md:p-0 
            md:pt-0 border-gray-400" 
            >
            &copy; 2021-{new Date().getFullYear()} {" "}
            | PSPACE | All Rights Reserved. | 
            <br className="md:hidden" />  Your Space Our comport.
            </h1>

            <ul 
            className="text-gray-700 text-sm md:text-[0.9rem]
            flex flex-col py-5 md:flex-row gap-3 font-semibold
            items-center">
              {[{id:1, text:"Terms & Conditions"},
                {id:2, text:"Terms of Use"},
                {id:3, text:"Privacy Notice"}, 
                {id:4, text:"Cookie Policy"}, 
                {id:5, text:"Modern Slavery"}
              ].map((list) => 
                <li
                key={list.id} 
                className="hover:text-blue-500">
                  <a href="#">
                    {list.text}
                  </a>
                </li>
              )}
            </ul>
          </div>

      </footer>

    </div>
  );
}

export default PersonalPage;