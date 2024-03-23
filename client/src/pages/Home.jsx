import React, { useEffect } from "react";
import Aos from "aos";
import Cookies from 'js-cookie';
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
export default function Home() {
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    Aos.init({ duration: 1000, once: true, easing: "ease" });
  }, []);
  useEffect(() => {
    const token = Cookies.get('session');
    const user= Cookies.get('user')
    console.log(user)
    if(token && user)
    setAuth({
      ...auth,
      user:JSON.parse(user),
      token:token
    })
    console.log(auth)
  }, []);
  return (
    <Layout>
      <div className="hero" id="top" data-aos="fade-in">
        <div className="hero-content">
          <h1 className="hero-header">JobSeeker</h1>
          <p>Empowering job seekers to take the next step in their career.</p>
        </div>
        <svg
          version="1.1"
          id="Puzzles"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024  "
          xmlSpace="preserve"
        >
          <path
            className="piece-1"
            fill="#48bb78"
            d="M493.714,0H274.286c0,8.319,0,84.971,0,94.903c0,14.069-15.265,22.86-27.427,15.837
            c-19.885-11.477-45.716,2.515-45.716,26.403c0,23.834,25.777,37.912,45.716,26.403c12.187-7.034,27.427,1.791,27.427,15.837
			v58.331h33.716c-3.407-37.132,25.433-73.143,66.855-73.143c41.123,0,70.292,35.688,66.855,73.143c7.543,0,62.708,0,70.288,0
			V18.286C512,8.187,503.813,0,493.714,0z"
          />

          <path
            className="piece-2"
            fill="#af99ff"
            d="M237.714,70.289c0-7.543,0-62.709,0-70.289H18.286C8.187,0,0,8.187,0,18.286v219.429c8.319,0,84.971,0,94.903,0
            c13.995,0,22.897,15.197,15.837,27.427c-11.421,19.786,2.408,45.716,26.403,45.716c23.885,0,37.889-25.818,26.403-45.714
            c-7.034-12.186,1.792-27.429,15.837-27.429h58.331v-33.718c-37.18,3.417-73.143-25.482-73.143-66.854
            C164.571,95.367,200.978,66.907,237.714,70.289z"
          />

          <path
            className="piece-3"
            fill="#af99ff"
            d="M417.097,274.286c-14.196,0-22.784-15.39-15.837-27.427c11.348-19.656-2.281-45.716-26.403-45.716
            c-23.942,0-37.861,25.868-26.403,45.716c7.034,12.187-1.793,27.427-15.837,27.427h-58.331v33.704
            c37.244-3.413,73.143,25.539,73.143,66.854c0,41.246-35.835,70.281-73.143,66.855V512h219.429
            c10.099,0,18.286-8.187,18.286-18.286V274.286C503.68,274.286,427.03,274.286,417.097,274.286z"
          />

          <path
            className="piece-4"
            fill="#48bb78"
            d="M265.142,348.442c-12.209,7.047-27.427-1.792-27.427-15.837v-58.319h-33.718c3.41,37.146-25.449,73.143-66.854,73.143
			c-41.217,0-70.281-35.812-66.854-73.143c-7.545,0-62.709,0-70.289,0v219.429C0,503.813,8.187,512,18.286,512h219.429v-94.915
			c0-14.069,15.265-22.86,27.427-15.837c19.956,11.518,45.716-2.589,45.716-26.403C310.857,351.01,285.079,336.934,265.142,348.442z
			"
          />

          <text
            className="puzzle-text-1"
            dominantBaseline="middle"
            textAnchor="middle"
            x="192"
            y="192"
            fill="white"
            fontSize="48pt"
          >
            Opportunity
          </text>
          <text
            className="puzzle-text-2"
            dominantBaseline="middle"
            textAnchor="middle"
            x="832"
            y="192"
            fill="white"
            fontSize="48pt"
          >
            Employee
          </text>
          <text
            className="puzzle-text-3"
            dominantBaseline="middle"
            textAnchor="middle"
            x="832"
            y="832"
            fill="white"
            fontSize="48pt"
          >
            Experience
          </text>
          <text
            className="puzzle-text-4"
            dominantBaseline="middle"
            textAnchor="middle"
            x="192"
            y="832"
            fill="white"
            fontSize="48pt"
          >
            Employer
          </text>
        </svg>
      </div>
      <section className="hook-line" style={{ backgroundColor: "#af99ff" }}>
        <div>
          <h2
            style={{ color: "#541f69", fontWeight: "bold", fontSize: "3xl" }}
            data-aos="fade-right"
          >
            Unlock your potential with our job matching technology.
          </h2>
          {auth?.token ? (
            <>
              <a
                href="/user/dashboard"
                style={{
                  borderColor: "#453d65",
                  backgroundColor: "#453d65",
                  padding: "1rem 2rem",
                  fontSize: "xl",
                  justifySelf: "center",
                  textDecoration: "none",
                  color: "white",
                  display: "inline-block",
                  marginTop: "1rem",
                }}
                data-aos="fade-right"
                data-aos-delay="200"
              >
                Profile
              </a>
            </>
          ) : (
            <>
              <a
                href="/signup"
                style={{
                  borderColor: "#453d65",
                  backgroundColor: "#453d65",
                  padding: "1rem 2rem",
                  fontSize: "xl",
                  justifySelf: "center",
                  textDecoration: "none",
                  color: "white",
                  display: "inline-block",
                  marginTop: "1rem",
                }}
                data-aos="fade-right"
                data-aos-delay="200"
              >
                Sign up Now!
              </a>
            </>
          )}
        </div>
        <img
          src="https://media.istockphoto.com/id/1212675428/vector/group-of-businessmen-working-in-business-space-statistical-analysis-and-management.jpg?s=612x612&w=0&k=20&c=p2HdGGYOmcjJzC8hOG8jwnu1arvy7vTuXK3tX1o_JMw="
          alt="Businessmen working"
          style={{ animation: "zoom-in-left 1s" }}
        />
      </section>
      <section
        className="steps-path"
        style={{ padding: "2rem 0" }}
        data-aos="fade"
      >
        <h2
          style={{
            fontSize: "4rem",
            lineHeight: "1",
            marginBottom: "1em",
            textAlign: "center",
          }}
        >
          How-It-Works
        </h2>
        <h3
          style={{ fontSize: "3xl", color: "#af99ff", marginLeft: "2rem" }}
          data-aos="fade"
          data-aos-anchor=".steps-path"
        >
          Looking to be Hired?
        </h3>
        <svg viewBox="0 0 1000 400" id="stepPath">
          <path
            className="steps"
            pathLength="100"
            d="M 100 200 C 250 200 150 50 300 50 L 500 50 C 650 50 550 200 700 200 L 900 200"
          />
          <path
            className="steps"
            pathLength="100"
            d="M 100 200 C 250 200 150 350 300 350 L 500 350 C 650 350 550 200 700 200 L 900 200 "
          />
          <text
            className="path-text-1"
            dominantBaseline="middle"
            textAnchor="middle"
            x="50"
            y="200"
            fill="white"
            fontSize="16pt"
          >
            Sign Up
          </text>
          <text
            className="path-text-2"
            dominantBaseline="middle"
            textAnchor="middle"
            x="275"
            y="25"
            fill="white"
            fontSize="16pt"
          >
            Apply for Jobs
          </text>
          <text
            className="path-text-2"
            dominantBaseline="middle"
            textAnchor="middle"
            x="275"
            y="375"
            fill="white"
            fontSize="16pt"
          >
            Post Jobs
          </text>
          <text
            className="path-text-3"
            dominantBaseline="middle"
            textAnchor="middle"
            x="525"
            y="375"
            fill="white"
            fontSize="16pt"
          >
            Get Shortlisted
          </text>
          <text
            className="path-text-3"
            dominantBaseline="middle"
            textAnchor="middle"
            x="525"
            y="25"
            fill="white"
            fontSize="16pt"
          >
            Get Top Candidates
          </text>
          <text
            className="path-text-4"
            dominantBaseline="middle"
            textAnchor="middle"
            x="700"
            y="175"
            fill="white"
            fontSize="16pt"
          >
            Interview
          </text>
          <text
            className="path-text-5"
            dominantBaseline="middle"
            textAnchor="middle"
            x="950"
            y="200"
            fill="white"
            fontSize="16pt"
          >
            Done!
          </text>
          <circle
            cx="100"
            cy="200"
            r={10}
            className="path-point path-point-1"
          ></circle>
          <circle
            cx="300"
            cy="50"
            r={10}
            className="path-point path-point-2"
          ></circle>
          <circle
            cx="300"
            cy="350"
            r={10}
            className="path-point path-point-3"
          ></circle>
          <circle
            cx="500"
            cy="50"
            r={10}
            className="path-point path-point-4"
          ></circle>
          <circle
            cx="500"
            cy="350"
            r={10}
            className="path-point path-point-5"
          ></circle>
          <circle
            cx="700"
            cy="200"
            r={10}
            className="path-point path-point-6"
          ></circle>
          <circle
            cx="900"
            cy="200"
            r={10}
            className="path-point path-point-7"
          ></circle>
        </svg>
        <h3
          style={{ fontSize: "3xl", color: "#af99ff", marginLeft: "2rem" }}
          data-aos="fade"
          data-aos-anchor=".steps-path"
        >
          Looking to Hire?
        </h3>
      </section>
      <section
        className="help-section"
        style={{
          backgroundColor: "#af99ff",
          padding: "2rem 0",
          textAlign: "center",
        }}
      >
        <h2
          style={{ fontSize: "4rem", color: "#1a202c" }}
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-anchor=".help-section"
        >
          Who we can help?
        </h2>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            padding: "2rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#B5D0FF",
              padding: "32px",
              borderRadius: "10%",
              textAlign: "center",
              width: "250px",
            }}
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <img
              src="/graduate.png"
              alt="Recent Graduate"
              style={{ width: "7rem" }}
            />
            <h2
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "4xl",
                marginTop: "1rem",
              }}
            >
              Recent Graduate
            </h2>
          </div>
          <div
            style={{
              backgroundColor: "#B5D0FF",
              padding: "32px",
              borderRadius: "10%",
              textAlign: "center",
              width: "250px",
            }}
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <img src="/job.png" alt="Job" style={{ width: "7rem" }} />
            <h2
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "4xl",
                marginTop: "1rem",
              }}
            >
              Switching Jobs
            </h2>
          </div>
          <div
            style={{
              backgroundColor: "#B5D0FF",
              padding: "32px",
              borderRadius: "10%",
              textAlign: "center",
              width: "250px",
            }}
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <img src="/startup.png" alt="Startup" style={{ width: "7rem" }} />
            <h2
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "4xl",
                marginTop: "1rem",
              }}
            >
              Budding Startup
            </h2>
          </div>
          <div
            style={{
              backgroundColor: "#B5D0FF",
              padding: "32px",
              borderRadius: "10%",
              textAlign: "center",
              width: "250px",
            }}
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <img src="/upskill.png" alt="Upskill" style={{ width: "7rem" }} />
            <h2
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "4xl",
                marginTop: "1rem",
              }}
            >
              Upskilling
            </h2>
          </div>
        </div>
        <div>
          {auth?.token ? (
            <>
              <a
                href="/user/dashboard"
                style={{
                  borderColor: "#453d65",
                  borderRadius: "10%",
                  backgroundColor: "#453d65",
                  padding: "1.5rem 3rem",
                  fontSize: "2xl",
                  textDecoration: "none",
                  width: "150px",
                  height: "20px",
                  color: "white",
                  marginTop: "2rem",
                  display: "inline-block",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s ease",
                }}
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-anchor=".help-section"
              >
                Profile
              </a>
            </>
          ) : (
            <>
              <a
                href="/signup"
                style={{
                  borderColor: "#453d65",
                  borderRadius: "10%",
                  backgroundColor: "#453d65",
                  padding: "1.5rem 3rem",
                  fontSize: "2xl",
                  textDecoration: "none",
                  width: "150px",
                  height: "20px",
                  color: "white",
                  marginTop: "2rem",
                  display: "inline-block",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s ease",
                }}
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-anchor=".help-section"
              >
                Sign up Now!
              </a>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
