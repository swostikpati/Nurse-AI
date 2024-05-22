import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";

function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-[#d8e0e8] font-montserrat flex flex-col items-center justify-center">
      {/*header*/}
      <div className="px-5 py-4 w-full">
        {/*welcome bit*/}
        <h1 className="float-left text-[#4545ba] font-bold text-3xl">
          NurseAI
        </h1>
        {/*user button*/}
        <div className="float-right flex justify-center pb-8">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: {
                  height: "60px",
                  width: "60px",
                },
              },
            }}
          />
        </div>
      </div>

      {/*main content*/}
      <div className="w-auto m-auto px-5 py-8 text-center">
        <h1 className="font-medium mb-6 text-[#0c1454] text-3xl">
          Your Personal Nursing Communication Assistant
        </h1>
        <h4>Start giving better patient updates today!</h4>
      </div>

      {/*action buttons*/}
      {isSignedIn ? (
        <div className="text-xl text-white">
          <Link to={"/update"}>
            <div className="my-8 text-center bg-[#4545ba] rounded-lg p-4 hover:bg-[#282890]">
              Practice an Update
            </div>
          </Link>

          <Link to={"/patientdata"}>
            <div className="my-8 text-center bg-[#4545ba] rounded-lg p-4 hover:bg-[#282890]">
              Practice with Patient Data
            </div>
          </Link>

          <Link to={"/practice"}>
            <div className="my-8 text-center bg-[#4545ba] rounded-lg p-4 hover:bg-[#282890]">
              Practice with a case
            </div>
          </Link>

          <Link to={"/audioHistory"}>
            <div className="my-8 text-center bg-[#4545ba] rounded-lg p-4 hover:bg-[#282890]">
              Audio History
            </div>
          </Link>
        </div>
      ) : (
        <div className="text-xl text-white">
          <Link to="/sign-up">
            <div className="my-8 text-center bg-[#4545ba] rounded-lg p-4 hover:bg-[#282890]">
              Sign Up
            </div>
          </Link>

          <Link to="/sign-in">
            <div className="my-8 text-center bg-[#4545ba] rounded-lg p-4 hover:bg-[#282890]">
              Sign In
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
