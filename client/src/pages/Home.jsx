import React from "react";
import front from "../Images/front.jpeg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const teamMembers = [
  {
    name: "Anirudha Udupa",
    image: "https://res.cloudinary.com/dgdxa7qqg/image/upload/v1723539601/1_x4znyx.jpg",
    title: "Team Lead",
    description: "2nd-year CSBS student at Canara Engineering College.",
    social: {
      instagram: "https://www.instagram.com/anirudhaudupa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      github: "https://github.com/Aniudupa15",
    }
  },
  {
    name: "Ananya Udupa",
    image: "https://res.cloudinary.com/dgdxa7qqg/image/upload/v1723539601/2_zk70te.jpg",
    title: "Frontend",
    description: "2nd-year AIML student at Srinivas Institute of Technology.",
    social: {
      instagram: "https://www.instagram.com/ananya_udupa6/",
      github: "https://github.com/ananyaudupa",
    }
  },
  {
    name: "Pratham P Shetty",
    image: "https://res.cloudinary.com/dgdxa7qqg/image/upload/v1723539602/3_jvhffo.jpg",
    title: "Backend",
    description: "2nd-year AIML student at Srinivas Institute of Technology.",
    social: {
      instagram: "https://www.instagram.com/prathamp.shetty?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      github: "https://github.com/prathampshetty",
    }
  },
  {
    name: "Vrushali A Poojary",
    image: "https://res.cloudinary.com/dgdxa7qqg/image/upload/v1723539602/4_rnbldo.jpg",
    title: "Frontend",
    description: "2nd-year AIML student at Srinivas Institute of Technology.",
    social: {
      twitter: "https://x.com/VrushaliAP04",
      github: "https://github.com/vrushaliapoojary",
    }
  },
  {
    name: "Prasanna P",
    image: "https://res.cloudinary.com/dgdxa7qqg/image/upload/v1723539603/5_hp4j1l.jpg",
    title: "Backend",
    description: "2nd-year AIML student at Srinivas Institute of Technology.",
    social: {
      instagram: "https://www.instagram.com/iamprasannap?utm_source=qr&igsh=MW93ZTQwZjMzeTBqZw==",
      github: "https://github.com/Aniudupa15",
    }
  },
];

const Home = () => {
  const navigate = useNavigate();
  const handleExploreClick = () => {
    navigate("/FileUpload");
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 flex flex-col items-center pt-48 py-10">
      <div className="flex flex-col lg:flex-row items-center w-full max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center lg:items-start lg:mr-16 mb-10 lg:mb-0">
          <h1 className="text-black text-6xl lg:text-8xl font-extrabold pb-5 text-center lg:text-left">
            File-Secure
          </h1>
          <h1 className="text-3xl lg:text-4xl font-bold mb-10 text-center lg:text-left">
            Protecting Your <span className="text-blue-700">Files</span> with Encryption
          </h1>
          <button
            onClick={handleExploreClick}
            className="w-48 h-14 bg-blue-800 text-white py-2 rounded-lg hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
          >
            Explore Now!
          </button>
        </div>
        <div className="flex justify-center lg:justify-end w-full lg:w-auto mt-8 lg:mt-0">
          <img
            src={front}
            alt="Encryption"
            className="shadow-lg rounded-lg w-96 lg:w-96 max-h-80 object-cover" // Adjusted width and height
          />
        </div>
      </div>
      <div className="mt-20 lg:mt-56 w-full max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-bold leading-tight py-5 text-black sm:text-4xl lg:text-5xl lg:leading-tight">
            The Team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 md:text-xl">
            The working hands behind the success of File-Secure!
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {teamMembers.map((member, i) => (
            <div key={i} className="mx-auto w-full max-w-xs rounded-md border">
              <img
                src={member.image}
                alt={member.name}
                className="h-48 w-full rounded-t-md object-cover"
              />
              <div className="p-4">
                <h1 className="text-lg font-semibold">{member.name}</h1>
                <h6 className="mt-2 font-medium">{member.title}</h6>
                <p className="mt-2 text-sm text-gray-600">{member.description}</p>
                <div className="mt-2 flex justify-center gap-4">
                  {member.social.facebook && (
                    <a
                      className="text-gray-700 transition hover:text-blue-600"
                      href={member.social.facebook}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="sr-only">Facebook</span>
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                  )}
                  {member.social.instagram && (
                    <a
                      className="text-gray-700 transition hover:text-pink-600"
                      href={member.social.instagram}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="sr-only">Instagram</span>
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      className="text-gray-700 transition hover:text-blue-600"
                      href={member.social.twitter}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="sr-only">Twitter</span>
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      className="text-gray-700 transition hover:text-black"
                      href={member.social.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="sr-only">GitHub</span>
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
