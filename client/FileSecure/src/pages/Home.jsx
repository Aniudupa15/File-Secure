import React from "react";
import front from "../Images/front.jpeg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Don't forget to import axios
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const teamMembers = [
  {
    name: "Anirudha Udupa",
    image: "./src/Images/1.jpg",
    title:"Team Lead",
    description: "2nd-year CSBS student at Canara Engineering College.",
    social: {
      instagram: "https://www.instagram.com/anirudhaudupa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      github: "https://github.com/Aniudupa15",
    }
  },
  {
    name: "Ananya Udupa",
    image: "./src/Images/2.jpg",
    title:"Frontend",
    description: "2nd-year AIML student at Srinivas Institute of Technology.",
    social: {
      instagram: "https://www.instagram.com/ananya_udupa6/",
      github: "https://github.com/ananyaudupa",
    }
  },
  {
    name: "Pratham P Shetty",
    image: "./src/Images/3.jpg",
    title:"Backend",
    description: "2nd-year AIML student at Srinivas Institute of Technology.",
    social: {
      instagram: "https://www.instagram.com/prathamp.shetty?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      github: "https://github.com/prathampshetty",
    }
  },
  {
    name: "Vrushali A Poojary",
    image: "./src/Images/4.jpg",
    title:"Frontend",
    description: "2nd-year AIML student at Srinivas Institute of Technology.",
    social: {
      twitter: "https://x.com/VrushaliAP04",
      github: "https://github.com/vrushaliapoojary",
    }
  }
];

const Home = () => {
  const navigate = useNavigate();

  const checkLogin = (e) => {
    e.preventDefault();
    const Name = "your-name"; // Define or get these from state/form
    const Password = "your-password";

    axios
      .post("http://localhost:3001/Login", { Name, Password })
      .then((response) => {
        console.log(response.data);
        if (response.data === "success") {
          navigate('/Register');
        } else {
          navigate('/FileUpload');
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div className="max-h-fit mt-4 pt-44 pr-16 pb-16 bg-gradient-to-r from-blue-200 to-blue-400">
      <div className="flex place-content-between w-full">
        <div className="w-auto mt-24 ms-64 place-content-center">
          <h1 className="text-black text-8xl font-extrabold pb-5">
            File-Secure
          </h1>
          <h1 className="text-4xl font-bold mb-10">
            Protecting Your<span className="text-blue-700 "> Files</span> with
            Encryption
          </h1>
          <button
            onClick={checkLogin}
            className="w-48 h-14 bg-blue-800 text-white py-2 rounded-lg hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
          >
            Explore Now!
          </button>
        </div>
        <div className="w-auto mt-24 ms-64 place-content-center">
          <img
            src={front}
            alt="Encryption"
            className="shadow-lg rounded-lg max-w-2xl"
          />
        </div>
      </div>
      <div className="mx-auto mt-56 max-w-7xl px-2 lg:px-0">
        <div className="mx-auto max-w-3xl md:text-center">
          <h2 className="text-xl font-bold leading-tight py-5 text-black sm:text-4xl lg:text-5xl lg:leading-tight">
            The Team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 md:text-xl">
            The working hands behind the success of File-Secure!
          </p>
        </div>
        <div className="mt-8 grid md:text-center grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, i) => (
            <div key={i} className="mx-auto w-[250px] rounded-md border">
              <img
                src={member.image}
                alt={member.name}
                className="h-[200px] w-full rounded-t-md object-cover"
              />
              <div className="p-4">
                <h1 className="text-lg font-semibold">{member.name}</h1>
                <h6 className="mt-2 font-medium">{member.title}</h6>
                <p className="mt-2 text-sm text-gray-600">
                  {member.description}
                </p>
                <div className="mt-2 flex gap-4 lg:justify-center">
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
