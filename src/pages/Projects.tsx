import React from "react";
import Streamverse from "../assets/Macbook Streamverse.png";
import CareerSpot from "../assets/Macbook Careerspot.png";
import ImagineCup from "../assets/Mockup Imaginecup.png";
import NuatTime from "../assets/Macbook Nuattime.png";
import NusaTravel from "../assets/Macbook Nusatravel.png";
import BXplore from "../assets/Mockup BExplore.png";
import HealthyGood from "../assets/Mockup Healthygoods.png";

import StreamVerse1 from "../assets/streamverse (1).png";
import StreamVerse2 from "../assets/streamverse (2).png";
import StreamVerse3 from "../assets/streamverse (3).png";
import StreamVerse4 from "../assets/streamverse (4).png";

import NusaTravel1 from "../assets/nusatravel (1).png";
import NusaTravel2 from "../assets/nusatravel (2).png";
import NusaTravel3 from "../assets/nusatravel (3).png";
import NusaTravel4 from "../assets/nusatravel (4).png";

import CareerSpot1 from "../assets/careerspot (1).png";
import CareerSpot2 from "../assets/careerspot (2).png";
import CareerSpot3 from "../assets/careerspot (3).png";
import CareerSpot4 from "../assets/careerspot (4).png";

import NuatTime1 from "../assets/nuattime (1).png";
import NuatTime2 from "../assets/nuattime (2).png";
import NuatTime3 from "../assets/nuattime (3).png";
import NuatTime4 from "../assets/nuattime (4).png";

import Preform1 from "../assets/preform (1).png";
import Preform2 from "../assets/preform (2).png";
import Preform3 from "../assets/preform (3).png";
import Preform4 from "../assets/preform (4).png";
import Preform5 from "../assets/preform (5).png";

import BXplore1 from "../assets/bxplore (1).png";
import BXplore2 from "../assets/bxplore (2).png";
import BXplore3 from "../assets/bxplore (3).png";
import BXplore4 from "../assets/bxplore (4).png";
import BXplore5 from "../assets/bxplore (5).png";

import HealthyGoods1 from "../assets/healthygood (1).png";
import HealthyGoods2 from "../assets/healthygood (2).png";
import HealthyGoods3 from "../assets/healthygood (3).png";
import HealthyGoods4 from "../assets/healthygood (4).png";
import HealthyGoods5 from "../assets/healthygood (5).png";

import { useNavigate, useParams } from "react-router-dom";
import { pageTransitionIn } from "../utils/gsapAnimation";
import { ArrowForward } from "@mui/icons-material";

// Define the project type
interface Project {
  id: number;
  title: string;
  year: number;
  role: string;
  description: string;
  image: string;
  caseStudy: string;
  problemDefinition: string;
  solution: string;
  featuresScope: string;
  development: string;
  gallery: string[]; // Array of image URLs
  links: { name: string; url: string }[]; // Array of project links
}

const projects: Project[] = [
  {
    id: 1,
    title: "StreamVerse",
    year: 2024,
    role: "Frontend Developer",
    description:
      "Streamverse is a game-changing digital content creation platform built on the Hedera network, embracing Web3 principles. It empowers creators with full ownership and control over their work, eliminating intermediaries.",
    image: Streamverse,
    caseStudy:
      "In this case study, we explored the challenges creators face in the digital content space and how StreamVerse addresses these pain points.",
    problemDefinition:
      "Many content creators struggle with platform fees and lack of ownership over their content, leading to a reliance on intermediaries.",
    solution:
      "StreamVerse leverages the Hedera network to provide creators with full ownership, ensuring they can monetize their work directly without intermediaries.",
    featuresScope:
      "Key features include content minting, real-time analytics, Streaming and direct payment integration, allowing creators to track performance and earnings.",
    development:
      "Developed using React for the frontend, with smart contracts implemented in Solidity on the Hedera network to ensure transparency and security.",
    gallery: [StreamVerse1, StreamVerse2, StreamVerse3, StreamVerse4], // Array of image sources
    links: [
      { name: "Deployment", url: "https://streamverse-testnet.vercel.app/" },
      { name: "Github", url: "https://github.com/Marcodave03/StreamVerse-Hedera-Frontend.git" },
      { name: "Youtube", url: "https://www.youtube.com/watch?v=Mlv9aaIK1ZI" },
      {
        name: "Pitchdeck",
        url: "https://drive.google.com/file/d/1VDo_5y3BHKXPjUDTbfmYcTl6oaZVl5JX/view",
      },
    ],
  },
  {
    id: 2,
    title: "NusaTravel",
    year: 2023,
    role: "UI UX Designer | Frontend Developer",
    description:
      "Embarking on a journey through Nusa Tenggara Timur unveils a world of natural wonders and vibrant cultural experiences. From the enchanting shores of Flores to the legendary Komodo dragons, NTT captivates with its diverse landscapes and rich heritage. Explore our website to discover how NTT offers an unforgettable adventure off the beaten path",
    image: NusaTravel,
    caseStudy:
      "This case study highlights the user research conducted to understand traveler preferences and how NusaTravel enhances the travel booking experience.",
    problemDefinition:
      "Potential travelers often find it difficult to discover unique travel destinations and experiences in Nusa Tenggara Timur.",
    solution:
      "NusaTravel presents a curated selection of travel packages that showcase the beauty and culture of NTT, making planning easy and enjoyable.",
    featuresScope:
      "The website includes information about Nusa Tenggara, hotel bookings, interesting places, preparation, and user-generated content showcasing real traveler experiences.",
    development: "",
    gallery: [NusaTravel1, NusaTravel2, NusaTravel3, NusaTravel4],
    links: [
      { name: "Deployment", url: "https://nusatravel.vercel.app/" },
      { name: "Github", url: "https://github.com/Marcodave03/WebIFest" },
    ],
  },
  {
    id: 3,
    title: "CareerSpots",
    year: 2023,
    role: "Full Stack Developer",
    description:
      "CareerSpots is an innovative online platform designed to connect job seekers with the best employment opportunities tailored to their skills and aspirations. Whether you’re a recent graduate, a seasoned professional, or someone looking to pivot careers, CareerSpots simplifies the job search process, making it accessible, efficient, and personalized",
    image: CareerSpot,
    caseStudy:
      "This case study discusses the research and design process for creating a user-friendly platform for job seekers and employers.",
    problemDefinition:
      "Job seekers often face overwhelming competition and difficulty in finding positions that match their skills and aspirations.",
    solution:
      "CareerSpots offers a personalized job search experience, utilizing algorithms to match users with opportunities that align with their career goals.",
    featuresScope:
      "Features include an advanced search engine, resume builder, and personalized job alerts, enhancing the job search experience.",
    development:
      "Developed using a MERN stack (MySQL, Express, React, Node.js), ensuring a scalable and dynamic user experience.",
    gallery: [CareerSpot1, CareerSpot2, CareerSpot3, CareerSpot4], // Array of image sources
    links: [
      { name: "Github", url: "https://github.com/Marcodave03/CareerSpots" },
      { name: "Ptchdeck", url: "https://drive.google.com/file/d/1JcNCqCtxSKYNW_zLe_2I601VF0jtEOik/view?usp=sharing" },
    ], 
  },
  {
    id: 4,
    title: "NuatTime",
    year: 2023,
    role: "UI UX Designer | Frontend Developer",
    description:
      "NuatTime is a premier wellness center located at Ruko Gold Island PIK, specializing in authentic Thai reflexology and soothing oil massages. The purpose of the NuatTime website is to introduce our unique reflexology services to the online community, allowing potential customers to explore the benefits of our therapies and the expertise of our therapists in a visually appealing manner.",
    image: NuatTime,
    caseStudy:
      "This case study focuses on the web design process, highlighting how user-centered design principles were applied to create an informative and engaging online presence for NuatTime.",
    problemDefinition:
      "Many users seeking wellness services struggle to find comprehensive online information about reflexology treatments and the expertise of qualified therapists.",
    solution:
      "The NuatTime website addresses this gap by providing detailed descriptions of our reflexology services and therapist qualifications, all presented in a visually soothing design that reflects the tranquility of our wellness center.",
    featuresScope:
      "Key features include an intuitive layout for easy navigation, comprehensive service descriptions, therapist profiles, and imagery that evokes a sense of relaxation.",
    development:
      "The front end was developed using Vanilla, ensuring a responsive and engaging user experience across devices, making it easy for visitors to learn about our offerings.",
    gallery: [NuatTime1, NuatTime2, NuatTime3, NuatTime4], // Array of image sources
    links: [
      { name: "Deployment", url: "https://nuattime.com/" },
      {
        name: "Github",
        url: "https://github.com/Marcodave03/NuatTime-ThaiReflexology",
      },
    ],
  },
  {
    id: 5,
    title: "PreForm",
    year: 2023,
    role: "UI UX Designer | App Dev",
    description:
      "Preform is an app that enables users to engage in mock interviews with real-time interaction and feedback from an AI, powered by the OpenAI API. Preform is designed to empower job seekers by providing a platform to practice and enhance their skills, ultimately boosting their knowledge and confidence for upcoming job interviews.",
    image: ImagineCup,
    caseStudy:
      "This case study highlights user feedback and iterations that led to the final design of the PreForm app for mock interviews.",
    problemDefinition:
      "Job seekers often lack practice opportunities for interviews, resulting in anxiety and poor performance during real interviews.",
    solution:
      "PreForm provides a platform for users to engage in mock interviews with real-time feedback, building confidence and skills.",
    featuresScope:
      "The app includes customizable interview scenarios, AI feedback on responses, and performance tracking to help users improve over time.",
    development:
      "Developed using Flutter for a native app feel on both iOS and Android, leveraging OpenAI API for real-time interaction.",
    gallery: [Preform1, Preform2, Preform3, Preform4, Preform5], // Array of image sources
    links: [
      { name: "Github", url: "https://github.com/Marcodave03/Preform" },
      {
        name: "Youtube",
        url: "https://youtu.be/YnQpDJse2ug?si=zlSiZPvx3G1GZt_c",
      },
    ], 
  },
  {
    id: 6,
    title: "BXplore",
    year: 2023,
    role: "UI UX Designer | App Dev",
    description:
      "Binus Xplore is a user-centric, indoor navigation application specifically designed to enhance the navigation experience of all visitors to BINUS @Alam Sutera campus. The key objective of the project was to provide seamless, independent navigation capabilities, ensuring accessibility for both disabled and able-bodied individuals.",
    image: BXplore,
    caseStudy:
      "This case study discusses the research conducted with campus visitors and how it informed the design of the BXplore app.",
    problemDefinition:
      "Visitors to the BINUS @Alam Sutera campus often struggle with navigating the campus layout, leading to confusion and frustration.",
    solution:
      "BXplore provides an indoor navigation solution that enables users to find their way easily, ensuring accessibility for everyone.",
    featuresScope:
      "Features include interactive maps, location sharing, and accessibility options for disabled users.",
    development:
      "Built with Swift for Ios devices, incorporating geolocation and map services for real-time navigation.",
    gallery: [BXplore1, BXplore2, BXplore3, BXplore4, BXplore5], // Array of image sources
    links: [
      { name: "Github", url: "https://github.com/Marcodave03/Binus-Xplore" },
      {
        name: "Pitchdeck",
        url: "https://www.icloud.com/keynote/0fc03jYN5C1Q3G3eqyqFMtXXA",
      },
    ],
  },
  {
    id: 7,
    title: "HealthyGoods",
    year: 2023,
    role: "UI UX Designer",
    description:
      "HealthyGoods is a user-friendly mobile application designed to empower individuals to lead healthier lifestyles by providing a seamless platform for ordering nutritious food, fresh ingredients, and wholesome recipes. The app combines intuitive design with robust functionality to create an engaging user experience.",
    image: HealthyGood,
    caseStudy:
      "This case study examines user testing results that informed the app's design and feature set, ensuring it meets user needs effectively.",
    problemDefinition:
      "Individuals looking to eat healthier often struggle to find convenient sources for nutritious food and recipes.",
    solution:
      "HealthyGoods offers a seamless platform for ordering food and finding healthy recipes, promoting better eating habits.",
    featuresScope:
      "Key features include a shopping list, personalized recipe recommendations, and nutritional information for all food items.",
    development:
      "Developed using React for the frontend and Node.js for the backend, focusing on performance and user engagement through a responsive design.",
    gallery: [
      HealthyGoods1,
      HealthyGoods2,
      HealthyGoods3,
      HealthyGoods4,
      HealthyGoods5,
    ], 
    links: [
      {
        name: "Design",
        url: "https://www.figma.com/design/68YDyFZtrS9W4Gs8M7yUCt/HealthyGoods?node-id=0-1&t=70Jkm0iDppgG7F9t-1",
      },
    ],
  },
];

const Projects: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === Number(projectId));
  const navigate = useNavigate();

  const handleNavigation = (target: string) => {
    const targetText = target.substring(1).toUpperCase() || "HOME";
    pageTransitionIn(targetText, () => {
      navigate(target);
    });
  };

  if (!project) {
    return <div>Project not found</div>; // Handle case where project is not found
  }

  return (
    <div>
      <div className="flex">
        <div
          className="sidebar ml-8 h-screen w-[0vw] lg:w-[25vw] border-r-[2px] hidden lg:flex"
          style={{ borderColor: "#D6D6D6FF" }}
        >
          <div className="m-4">
            <div className="text-xl text-gray-500 mt-10">Project Title</div>
            <div className="text-lg">{project.title}</div>
            <div className="text-xl text-gray-500 mt-8">Year</div>
            <div className="text-lg">{project.year}</div>
            <div className="text-xl text-gray-500 mt-8">Role Position</div>
            <div className="text-lg">{project.role}</div>
            <div className="text-xl text-gray-500 mt-8">Publication</div>
            <ul className="mt-2">
              {project.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black-500 underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20  w-[100vw] lg:w-[75vw]">
          <div className="flex flex-col mr-20 ml-14">
            <div>
              <div className="text-4xl mt-8">{project.title}</div>
              <div className="text-wrap w-[80vw] lg:w-[60vw] mt-8 mb-8">
                {project.description}
              </div>
            </div>
            <div className="p-2 lg:p-5 bg-gray-300 bg-opacity-60 rounded-lg">
              <img className="w-full rounded-lg" src={project.image} alt="" />
            </div>

            <div>
              <div className="text-4xl mt-8">Case Study</div>
              <div className="text-wrap w-[80vw] lg:w-[60vw] mt-8 mb-8">
                {project.caseStudy}
              </div>
            </div>

            <div className="h-[1px] w-[70vw] bg-black my-4"></div>

            <div>
              <div className="text-4xl mt-8">Problem Definition</div>
              <div className="text-wrap w-[80vw] lg:w-[60vw] mt-8 mb-8">
                {project.problemDefinition}
              </div>
            </div>
            <div>
              <div className="text-4xl mt-8">Solution</div>
              <div className="text-wrap w-[80vw] lg:w-[60vw] mt-8 mb-8">
                {project.solution}
              </div>
            </div>
            <div>
              <div className="text-4xl mt-8">Feature & Scope</div>
              <div className="text-wrap w-[80vw] lg:w-[60vw] mt-8 mb-8">
                {project.featuresScope}
              </div>
            </div>
            <div>
              <div className="text-4xl mt-8">Development</div>
              <div className="text-wrap w-[80vw] lg:w-[60vw] mt-8 mb-8">
                {project.development}
              </div>
            </div>
            <div>
              <div className="text-4xl mt-36 mb-8">Project Gallery</div>
              <div className="flex flex-wrap">
                {project.gallery.map((image, index) => (
                  <div
                    className="p-2 m-1 bg-gray-300 bg-opacity-60 rounded-lg"
                    key={index}
                  >
                    <img
                      className="w-auto rounded-lg"
                      src={image}
                      alt={`Project ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20  w-[100vw] lg:w-[75vw] lg:hidden">
        <div className="flex flex-col mr-20 ml-14">
          <div>
            <div className="text-4xl mt-8">Solution</div>
            <div className="text-wrap w-[80vw] lg:w-[60vw] mt-8 mb-8">
              <ul className="text-2xl mt-2">
                {project.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black-500 underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="text-4xl col-span-2 text-start lg:text-right w-[100vw] mb-40 mt-14 pr-24 ml-4 lg:ml-0 group relative z-[10]">
        <span className="inline-flex items-center relative group-hover:cursor-pointer">
          <ArrowForward
            fontSize="large"
            sx={{ color: "black" }}
            className="transition-transform duration-300 transform group-hover:-rotate-45 z-30"
          />
          <span
            className="ml-2 relative animated-underline"
            onClick={() => handleNavigation("/work")}
          >
            All Projects
            <span className="animated-underline"></span>
          </span>
        </span>
      </div>

  
    </div>
  );
};

export default Projects;
